namespace xadesjs.pki {

    export class CRL extends ASN1Object {

        protected revokedCertificates = new Collection<RevokedCertificate>();
        protected extensions = new Collection<Extension>();

        get Version(): number {
            return this.simpl.version;
        }

        get NextUpdate(): Date {
            return this.simpl.nextUpdate.value;
        }

        get ThisUpdate(): Date {
            return this.simpl.thisUpdate.value;
        }

        get Extensions(): Collection<Extension> {
            if (this.simpl.crlExtensions.length && !this.extensions.Count)
                for (let i = 0; i < this.simpl.crlExtensions.length; i++) {
                    let extn = new Extension();
                    (extn as any).simpl = this.simpl.crlExtensions[i];
                    this.extensions.Add(extn);
                }
            return this.extensions;
        }

        get Issuer(): string {
            return NameToString(this.simpl.issuer);
        }

        get SignatureAlgorithm(): any {
            throw new PKIError("Not implemented");
        }

        get Signature(): Uint8Array {
            return new Uint8Array(this.simpl.signatureValue.value_block.value_hex);
        }

        get RevokedCertificates(): Collection<RevokedCertificate> {
            if (this.simpl.revokedCertificates.length && !this.revokedCertificates.Count)
                for (let i = 0; i < this.simpl.revokedCertificates.length; i++) {
                    let revokedCertificate = new RevokedCertificate();
                    (revokedCertificate as any).simpl = this.simpl.revokedCertificates[i];
                    this.revokedCertificates.Add(revokedCertificate);
                }
            return this.revokedCertificates;
        }

        public Encode(): Uint8Array {
            return new Uint8Array(this.asn1.result.value_before_decode);
        }

        /**
         * Decode the encoded ASN1 raw 
         */
        Decode(raw: Uint8Array): void {
            // Decode CRL
            this.asn1 = org.pkijs.fromBER(raw.buffer);
            this.simpl = new org.pkijs.simpl.CRL({ schema: this.asn1.result });
        }

        HasCertificate(cert: X509Certificate): boolean {
            return this.simpl.isCertificateRevoked((cert as any).simpl);
        }

        Verify(issuerCertificate: X509Certificate): PromiseLike<boolean> {
            return this.simpl.verify((issuerCertificate as any).simpl);
        }

        static Fetch(uri: string, options?: RequestInit): PromiseLike<CRL> {
            let crl = new CRL();
            return crl.Fetch(uri, options);
        }

        Fetch(uri: string, options?: RequestInit): PromiseLike<CRL> {
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

    }

    export class RevokedCertificate extends ASN1 {
        protected extensions = new Collection<Extension>();

        get UserCertificate(): string {
            return Convert.ToHex(this.simpl.userCertificate.value_block.value_hex);
        }

        get Revoked(): Date {
            return this.simpl.revocationDate.value;
        }

        get Extensions(): Collection<Extension> {
            if (this.simpl.crlExtensions.length && !this.extensions.Count)
                for (let i = 0; i < this.simpl.crlExtensions.length; i++) {
                    let extn = new Extension();
                    (extn as any).simpl = this.simpl.crlExtensions[i];
                    this.extensions.Add(extn);
                }
            return this.extensions;
        }

    }
}