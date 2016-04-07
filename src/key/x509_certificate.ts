namespace xadesjs {
    export class X509Certificate {

        protected raw: Uint8Array;
        protected cert_simpl: any;
        protected publicKey: CryptoKey;

        constructor(rawData?: Uint8Array) {
            this.publicKey = null;

            if (rawData) {
                this.raw = rawData;
                let asn1 = org.pkijs.fromBER(rawData.buffer);
                this.cert_simpl = new org.pkijs.simpl.CERT({ schema: asn1.result });
            }
        }

        get PublicKey(): CryptoKey {
            return this.publicKey;
        }

        GetRawCertData(): Uint8Array {
            return this.raw;
        }

        exportKey(algorithm: Algorithm): Promise {
            return new Promise((resolve, reject) => {
                let asn1_publicKey = org.pkijs.fromBER(this.cert_simpl.subjectPublicKeyInfo.subjectPublicKey.value_block.value_hex);
                let alg_oid = this.cert_simpl.subjectPublicKeyInfo.algorithm.algorithm_id;
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

        getXml(): Element {
            throw new XmlError(XE.METHOD_NOT_IMPLEMENTED);
        }

        loadXml(value: Element): void {
            throw new XmlError(XE.METHOD_NOT_IMPLEMENTED);
        }
    }
}