namespace xadesjs {

    interface IJwkRsa {
        alg: string;
        kty: string;
        e: string;
        n: string;
        ext: boolean;
    }

    export class RsaKeyValue extends XmlObject implements KeyInfoClause {

        protected m_key: CryptoKey = null;
        protected m_element: Element = null;
        protected m_jwk: IJwkRsa = null;
        protected m_algorithm: ISignatureAlgorithm = null;
        protected m_modulus: Uint8Array = null;
        protected m_exponent: Uint8Array = null;
        protected m_keyusage: string[] = null;

        get Key(): CryptoKey {
            return this.m_key;
        }
        set Key(value: CryptoKey) {
            this.m_key = value;
        }

        get Algorithm(): ISignatureAlgorithm {
            return this.m_algorithm;
        }

        get Modulus(): Uint8Array {
            return this.m_modulus;
        }

        get Exponent(): Uint8Array {
            return this.m_exponent;
        }

        constructor() {
            super();
        }

        importKey(key: CryptoKey): Promise {
            return new Promise((resolve, reject) => {
                if (key.algorithm.name.toUpperCase() !== "RSASSA-PKCS1-V1_5")
                    throw new XmlError(XE.ALGORITHM_WRONG_NAME, key.algorithm.name);
                this.m_key = key;
                Application.crypto.subtle.exportKey("jwk", key)
                    .then((jwk: IJwkRsa) => {
                        this.m_jwk = jwk;
                        this.m_modulus = Convert.ToBufferString(Convert.Base64UrlToBase64(jwk.n));
                        this.m_exponent = Convert.ToBufferString(Convert.Base64UrlToBase64(jwk.e));
                        this.m_keyusage = key.usages;
                        return Promise.resolve();
                    })
                    .then(resolve, reject);
            });
        }

        exportKey(alg: Algorithm): Promise {
            return new Promise((resolve, reject) => {
                if (this.m_key)
                    return resolve(this.m_key);
                // fill jwk
                let modulus = Convert.ToBase64UrlString(Convert.FromBufferString(this.m_modulus));
                let exponent = Convert.ToBase64UrlString(Convert.FromBufferString(this.m_exponent));
                let algJwk: string = null;
                switch ((alg as any).hash.name.toUpperCase()) {
                    case "SHA-1":
                        algJwk = "RS1";
                        break;
                    case "SHA-224":
                        algJwk = "RS224";
                        break;
                    case "SHA-256":
                        algJwk = "RS256";
                        break;
                    case "SHA-384":
                        algJwk = "RS384";
                        break;
                    case "SHA-512":
                        algJwk = "RS512";
                        break;
                }
                let jwk: IJwkRsa = {
                    kty: "RSA",
                    alg: algJwk,
                    n: modulus,
                    e: exponent,
                    ext: true
                };
                Application.crypto.subtle.importKey("jwk", jwk as any, alg, true, this.m_keyusage)
                    .then(resolve, reject);
            });
        }

        getXml(): Element {
            if (this.m_element)
                return this.m_element;

            let prefix = this.GetPrefix();

            let doc = CreateDocument();

            // KeyValue
            let xnKeyValue = doc.createElementNS(XmlSignature.NamespaceURI, prefix + XmlSignature.ElementNames.KeyValue);

            // RsaKeyValue
            let xnRsaKeyValue = doc.createElementNS(XmlSignature.NamespaceURI, prefix + XmlSignature.ElementNames.RSAKeyValue);
            xnKeyValue.appendChild(xnRsaKeyValue);

            // Modulus
            let xnModulus = doc.createElementNS(XmlSignature.NamespaceURI, prefix + XmlSignature.ElementNames.Modulus);
            xnModulus.textContent = Convert.Base64UrlToBase64(this.m_jwk.n);
            xnRsaKeyValue.appendChild(xnModulus);

            // Exponent
            let xnExponent = doc.createElementNS(XmlSignature.NamespaceURI, prefix + XmlSignature.ElementNames.Exponent);
            xnExponent.textContent = Convert.Base64UrlToBase64(this.m_jwk.e);
            xnRsaKeyValue.appendChild(xnExponent);

            return xnKeyValue;
        }

        loadXml(element: Element): void {
            if ((element.localName !== XmlSignature.ElementNames.RSAKeyValue) || (element.namespaceURI !== XmlSignature.NamespaceURI))
                throw new XmlError(XE.CRYPTOGRAPHIC, "element");

            // <Modulus>
            let xnModulus = XmlSignature.GetChildElement(element, XmlSignature.ElementNames.Modulus, XmlSignature.NamespaceURI);
            if (xnModulus != null)
                this.m_modulus = Convert.ToBufferString(Convert.FromBase64String(xnModulus.textContent));
            else
                throw new XmlError(XE.CRYPTOGRAPHIC, XmlSignature.ElementNames.Modulus);

            // <Exponent>
            let xnExponent = XmlSignature.GetChildElement(element, XmlSignature.ElementNames.Exponent, XmlSignature.NamespaceURI);
            if (xnExponent != null)
                this.m_exponent = Convert.ToBufferString(Convert.FromBase64String(xnExponent.textContent));
            else
                throw new XmlError(XE.CRYPTOGRAPHIC, XmlSignature.ElementNames.Exponent);

            this.m_element = element;
            this.m_keyusage = ["verify"];
        }

    }

}