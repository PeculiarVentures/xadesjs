namespace xadesjs {

    export const RSA_PSS = "RSA-PSS";

    export const RSA_PSS_WITH_PARAMS_NAMESPACE = "http://www.w3.org/2007/05/xmldsig-more#rsa-pss";
    export const RSA_PSS_WITH_PARAMS_MGF1_NAMESPACE = "http://www.w3.org/2007/05/xmldsig-more#MGF1";

    export class RsaPssSha1 extends SignatureAlgorithm {
        algorithm: any = {
            name: RSA_PSS,
            hash: {
                name: SHA1
            }
        };
        xmlNamespace = RSA_PSS_WITH_PARAMS_MGF1_NAMESPACE;
    }

    export class RsaPssSha224 extends SignatureAlgorithm {
        algorithm: any = {
            name: RSA_PSS,
            hash: {
                name: SHA224
            }
        };
        xmlNamespace = RSA_PSS_WITH_PARAMS_MGF1_NAMESPACE;
    }

    export class RsaPssSha256 extends SignatureAlgorithm {
        algorithm: any = {
            name: RSA_PSS,
            hash: {
                name: SHA256
            }
        };
        xmlNamespace = RSA_PSS_WITH_PARAMS_MGF1_NAMESPACE;
    }

    export class RsaPssSha384 extends SignatureAlgorithm {
        algorithm: any = {
            name: RSA_PSS,
            hash: {
                name: SHA384
            }
        };
        xmlNamespace = RSA_PSS_WITH_PARAMS_MGF1_NAMESPACE;
    }

    export class RsaPssSha512 extends SignatureAlgorithm {
        algorithm: any = {
            name: RSA_PSS,
            hash: {
                name: SHA512
            }
        };
        xmlNamespace = RSA_PSS_WITH_PARAMS_MGF1_NAMESPACE;
    }

    export class PssAlgorithmParams extends XmlObject {
        private m_digest_method: string;
        private m_salt_length: number;
        private m_mgf: string;
        private element: Element;

        dsPrefix: string;

        get DigestMethod(): string {
            return this.m_digest_method;
        }
        set DigestMethod(value: string) {
            this.m_digest_method = value;
        }

        public get SaltLength(): number {
            return this.m_salt_length;
        }

        public set SaltLength(v: number) {
            this.m_salt_length = v;
        }


        public get MGF(): string {
            return this.m_mgf;
        }

        public set MGF(v: string) {
            this.m_mgf = v;
        }

        GetXml(): Element {
            if (this.element != null)
                return this.element;

            if (this.DigestMethod == null)
                throw new XmlError(XE.CRYPTOGRAPHIC, "DigestMethod");

            let prefix = this.GetPrefix();
            let ds_prefix = this.dsPrefix ? this.dsPrefix + ":" : "";

            let doc = CreateDocument();
            let xel = doc.createElementNS(XmlSignature.NamespaceURIPss, prefix + XmlSignature.ElementNames.RSAPSSParams);

            let dsDigestMethod = doc.createElementNS(XmlSignature.NamespaceURI, ds_prefix + XmlSignature.ElementNames.DigestMethod);
            dsDigestMethod.setAttribute(XmlSignature.AttributeNames.Algorithm, this.DigestMethod);
            xel.appendChild(dsDigestMethod);

            let SaltLength = doc.createElementNS(XmlSignature.NamespaceURIPss, prefix + XmlSignature.ElementNames.SaltLength);
            SaltLength.textContent = this.SaltLength.toString();
            xel.appendChild(SaltLength);

            return xel;
        }

        LoadXml(value: Element) {
            if (value == null)
                throw new XmlError(XE.PARAM_REQUIRED, "value");

            if ((value.localName !== XmlSignature.ElementNames.RSAPSSParams) || (value.namespaceURI !== XmlSignature.NamespaceURIPss))
                throw new XmlError(XE.CRYPTOGRAPHIC, "value");

            let digest_mode = XmlSignature.GetChildElement(value, XmlSignature.ElementNames.DigestMethod, XmlSignature.NamespaceURI);
            if (digest_mode)
                this.m_digest_method = digest_mode.getAttribute(XmlSignature.AttributeNames.Algorithm);

            let salt_length = XmlSignature.GetChildElement(value, XmlSignature.ElementNames.SaltLength, XmlSignature.NamespaceURIPss);
            if (salt_length)
                this.m_salt_length = +salt_length.textContent;

            let mgf = XmlSignature.GetChildElement(value, XmlSignature.ElementNames.MaskGenerationFunction, XmlSignature.NamespaceURIPss);
            if (mgf)
                this.m_mgf = (mgf.firstChild as Element).getAttribute(XmlSignature.AttributeNames.Algorithm);

            this.element = value;
        }

    }

}