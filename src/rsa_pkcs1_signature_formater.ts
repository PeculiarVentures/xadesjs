namespace xadesjs {

    export interface ISignatureFormater {
        CreateSignature(rgbHash: Uint8Array): Promise;
        SetKey(key: CryptoKey): void;
    }

    export class RSAPKCS1SignatureFormatter implements ISignatureFormater {

        private rsa: CryptoKey;
        private hash: string;

        public RSAPKCS1SignatureFormatter(key?: CryptoKey) {
            if (key)
                this.SetKey(key);
        }

        public CreateSignature(rgbHash: Uint8Array): Promise {
            return new Promise((resolve, reject) => {
                if (this.rsa == null) {
                    throw new XmlError(XE.CRYPTOGRAPHIC, "No key pair available.");
                }
                if (this.hash == null) {
                    throw new XmlError(XE.CRYPTOGRAPHIC, "Missing hash algorithm.");
                }
                if (rgbHash == null)
                    throw new XmlError(XE.PARAM_REQUIRED, "rgbHash");

                // PKCS1.Sign_v15(rsa, hash, rgbHash);
                crypto.subtle.sign(this.hash, this.rsa, rgbHash)
                    .than(resolve, reject);
            });
        }

        public SetHashAlgorithm(strName: string): void {
            if (strName == null)
                throw new XmlError(XE.PARAM_REQUIRED, "strName");
            this.hash = strName;
        }

        public SetKey(key: CryptoKey): void {
            if (key == null)
                throw new XmlError(XE.PARAM_REQUIRED, "key");
            this.rsa = key;
        }
    }
}