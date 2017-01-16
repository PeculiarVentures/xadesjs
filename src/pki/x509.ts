namespace xadesjs.pki {

    const EXTENTION_EXTENDED_KEY_USAGE = "2.5.29.37";
    const EXTENTION_SUBJECT_KEY_IDENTIFIER = "2.5.29.14";
    const EXTENTION_AUTHORITY_INFO_ACCESS = "1.3.6.1.5.5.7.1.1";
    const EXTENTION_CRL_DISTRIBUTION_POINTS = "2.5.29.31";


    /**
     * Represents an <X509Certificate> element.
     */
    export class X509Certificate extends ASN1Object {

        protected simpl: any;
        protected raw: Uint8Array;
        protected publicKey: CryptoKey;
        protected extensions: Collection<Extension>;

        constructor(raw?: Uint8Array) {
            super();
            this.publicKey = null;

            if (raw) {
                this.Decode(raw);
                this.raw = raw;
            }
        }

        public get NotBefore(): Date {
            return this.simpl.notBefore.value;
        }

        public get NotAfter(): Date {
            return this.simpl.notAfter.value;
        }

        /**
         * Gets a serial number of the certificate in HEX format  
         */
        public get SerialNumber(): string {
            return Convert.ToHex(this.simpl.serialNumber.value_block.value_hex);
        }

        /**
         * Gets a issuer name of the certificate 
         */
        public get Issuer(): string {
            return NameToString(this.simpl.issuer);
        }

        /**
         * Gets a subject name of the certificate 
         */
        public get Subject(): string {
            return NameToString(this.simpl.subject);
        }

        public get Extensions(): Collection<Extension> {
            let extensions = this.simpl.extensions;
            if (extensions && extensions.length && !this.extensions.Count)
                for (let i = 0; i < extensions.length; i++) {
                    let extn = new Extension();
                    (extn as any).simpl = extensions[i];
                    this.extensions.Add(extn);
                }
            return this.extensions;
        }

        /**
         * Returns a thumbrint of the certififcate
         * @param  {DigestAlgorithm="SHA-1"} algName Digest algorithm name
         * @returns PromiseLike
         */
        public Thumbprint(algName: DigestAlgorithm = "SHA-1"): PromiseLike<ArrayBuffer> {
            return Application.crypto.subtle.digest(algName, this.raw);
        }


        /**
         * Gets the public key from the X509Certificate
         */
        get PublicKey(): CryptoKey {
            return this.publicKey;
        }

        /**
         * Loads X509Certificate from DER data
         * @param  {Uint8Array} rawData
         */
        public Decode(raw: Uint8Array) {
            this.raw = raw;
            let asn1 = org.pkijs.fromBER(raw.buffer);
            this.simpl = new org.pkijs.simpl.CERT({ schema: asn1.result });
            this.extensions = new Collection<Extension>();
            if (this.simpl.extensions)
                for (let ext of this.simpl.extensions) {
                    let extension = new Extension();
                    extension.Decode(ext);
                    this.extensions.Add(extension);
                }
        }

        /**
         * Returns DER raw of X509Certificate
         */
        public Encode(): Uint8Array {
            return this.raw;
        }

        /**
         * Returns public key from X509Certificate
         * @param  {Algorithm} algorithm
         * @returns Promise
         */
        exportKey(algorithm: Algorithm): Promise {
            return new Promise((resolve, reject) => {
                let asn1_publicKey = org.pkijs.fromBER(this.simpl.subjectPublicKeyInfo.subjectPublicKey.value_block.value_hex);
                let alg_oid = this.simpl.subjectPublicKeyInfo.algorithm.algorithm_id;
                let jwk: any = null;
                switch (alg_oid) {
                    // RSA
                    case "1.2.840.113549.1.1.1":
                        let rsa_publicKey_simple = new org.pkijs.simpl.x509.RSAPublicKey({ schema: asn1_publicKey.result });
                        let modulus_view = new Uint8Array(rsa_publicKey_simple.modulus.value_block.value_hex);
                        let public_exponent_view = new Uint8Array(rsa_publicKey_simple.publicExponent.value_block.value_hex);
                        if (modulus_view[0] === 0x00)
                            modulus_view = modulus_view.slice(1);
                        let b64uModulus = Convert.ToBase64UrlString(Convert.FromBufferString(modulus_view));
                        let b64uPublicExponent = Convert.ToBase64UrlString(Convert.FromBufferString(public_exponent_view));
                        let alg = "RS";
                        switch ((<any>algorithm).hash.name) {
                            case "SHA-1":
                                alg += "1";
                                break;
                            case "SHA-256":
                                alg += "256";
                                break;
                            case "SHA-516":
                                alg += "516";
                                break;
                        }
                        jwk = {
                            kty: "RSA",
                            e: b64uPublicExponent,
                            n: b64uModulus,
                            alg: alg,
                            ext: true,
                        };
                        break;
                    default:
                        throw new XmlError(XE.ALGORITHM_NOT_SUPPORTED, alg_oid);
                }

                Application.crypto.subtle.importKey("jwk", jwk, algorithm, true, ["verify"])
                    .then(resolve, reject);
            });
        }

        IsSelfSigned(): boolean {
            return this.simpl.issuer.isEqual(this.simpl.subject);
        }

        static Fetch(uri: string, options?: RequestInit): PromiseLike<X509Certificate> {
            let x509 = new X509Certificate();
            return x509.Fetch(uri, options);
        }

        Fetch(uri: string, options?: RequestInit): PromiseLike<X509Certificate> {
            return new Promise((resolve, reject) => {
                fetch(uri, options)
                    .then((resp: any) => {
                        return resp.arrayBuffer();
                    })
                    .then((buffer: ArrayBuffer) => {
                        let uint8Buf = new Uint8Array(buffer);
                        this.Decode(uint8Buf);
                        resolve(this);
                    })
                    .catch(reject);
            });
        }

        /**
         * Return Extensions with specified Id
         * @param {ASN1ObjectIdentifier} id Extension identificator
         */
        GetExtension(id: ASN1ObjectIdentifier): Extension {
            for (let ext of this.Extensions.GetIterator()) {
                if (ext.Id === id)
                    return ext;
            }
            return null;
        }

        // Extentions

        // Extended Key Usage
        get ExtendedKeyUsage(): ASN1ObjectIdentifier[] {
            let res: ASN1ObjectIdentifier[] = [];
            let ext = this.GetExtension(EXTENTION_EXTENDED_KEY_USAGE);
            if (ext) {
                return (ext as any).simpl.parsedValue.keyPurposes;
            }
            return res;
        }

        // Subject Key Identifier
        get SubjectKeyIdentifier() {
            let res: Uint8Array = null;
            let ext = this.GetExtension(EXTENTION_SUBJECT_KEY_IDENTIFIER);
            if (ext) {
                return new Uint8Array((ext as any).simpl.parsedValue.value_block.value_hex);
            }
            return res;
        }

        // Authority Information Access
        get AuthorityInfoAccess(): extension.InfoAccess {
            let res: extension.InfoAccess = null;
            let ext = this.GetExtension(EXTENTION_AUTHORITY_INFO_ACCESS);
            if (ext) {
                res = new extension.InfoAccess();
                (res as any).Decode(ext.Value);
            }
            return res;
        }

        // CRL Distribution points
        get CrlDistributionPoints(): extension.CrlDistributionPoints {
            let res: extension.CrlDistributionPoints = null;
            let ext = this.GetExtension(EXTENTION_CRL_DISTRIBUTION_POINTS);
            if (ext) {
                res = new extension.CrlDistributionPoints();
                (res as any).Decode(ext.Value);
            }
            return res;
        }

    }
}