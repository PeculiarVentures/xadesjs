/// <reference path="./xml_transform_enveloped_signature.ts" />

namespace xadesjs {
    export class CryptoConfig {
        static CreateFromName(name: string): Transform {
            let t: Transform = null;
            switch (name) {
                case XmlSignature.AlgorithmNamespaces.XmlDsigBase64Transform:
                    t = new XmlDsigBase64Transform();
                    break;
                case XmlSignature.AlgorithmNamespaces.XmlDsigC14NTransform:
                    t = new XmlDsigC14NTransform();
                    break;
                case XmlSignature.AlgorithmNamespaces.XmlDsigC14NWithCommentsTransform:
                    t = new XmlDsigC14NWithCommentsTransform();
                    break;
                case XmlSignature.AlgorithmNamespaces.XmlDsigEnvelopedSignatureTransform:
                    t = new XmlDsigEnvelopedSignatureTransform();
                    break;
                case XmlSignature.AlgorithmNamespaces.XmlDsigXPathTransform:
                    t = new XmlDsigXPathTransform();
                    break;
                case XmlSignature.AlgorithmNamespaces.XmlDsigXsltTransform:
                    t = new XmlDsigXsltTransform();
                    break;
                case XmlSignature.AlgorithmNamespaces.XmlDsigExcC14NTransform:
                    t = new XmlDsigExcC14NTransform();
                    break;
                case XmlSignature.AlgorithmNamespaces.XmlDecryptionTransform:
                    t = new XmlDecryptionTransform();
                    break;
                default:
                    throw new XmlError(XE.ALGORITHM_NOT_SUPPORTED, name);
            }
            return t;
        }
    }
}