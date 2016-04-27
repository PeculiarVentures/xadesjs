namespace xadesjs {

    let SignatureAlgorithms: { [index: string]: ISignatureAlgorithmConstructable } = {};
    SignatureAlgorithms[RSA_PKCS1_SHA1_NAMESPACE] = RsaPkcs1Sha1;
    SignatureAlgorithms[RSA_PKCS1_SHA224_NAMESPACE] = RsaPkcs1Sha224;
    SignatureAlgorithms[RSA_PKCS1_SHA256_NAMESPACE] = RsaPkcs1Sha256;
    SignatureAlgorithms[RSA_PKCS1_SHA384_NAMESPACE] = RsaPkcs1Sha384;
    SignatureAlgorithms[RSA_PKCS1_SHA512_NAMESPACE] = RsaPkcs1Sha512;
    SignatureAlgorithms[RSA_PSS_SHA1_NAMESPACE] = RsaPssSha1;
    SignatureAlgorithms[RSA_PSS_SHA224_NAMESPACE] = RsaPssSha224;
    SignatureAlgorithms[RSA_PSS_SHA256_NAMESPACE] = RsaPssSha256;
    SignatureAlgorithms[RSA_PSS_SHA384_NAMESPACE] = RsaPssSha384;
    SignatureAlgorithms[RSA_PSS_SHA512_NAMESPACE] = RsaPssSha512;
    SignatureAlgorithms[ECDSA_SHA1_NAMESPACE] = EcdsaSha1;
    SignatureAlgorithms[ECDSA_SHA224_NAMESPACE] = EcdsaSha224;
    SignatureAlgorithms[ECDSA_SHA256_NAMESPACE] = EcdsaSha256;
    SignatureAlgorithms[ECDSA_SHA384_NAMESPACE] = EcdsaSha384;
    SignatureAlgorithms[ECDSA_SHA512_NAMESPACE] = EcdsaSha512;
    SignatureAlgorithms[HMAC_SHA1_NAMESPACE] = HmacSha1;
    SignatureAlgorithms[HMAC_SHA256_NAMESPACE] = HmacSha256;
    SignatureAlgorithms[HMAC_SHA384_NAMESPACE] = HmacSha384;
    SignatureAlgorithms[HMAC_SHA512_NAMESPACE] = HmacSha512;

    let HashAlgorithms: { [namespace: string]: IHashAlgorithmConstructable } = {};
    HashAlgorithms[SHA1_NAMESPACE] = Sha1;
    HashAlgorithms[SHA224_NAMESPACE] = Sha224;
    HashAlgorithms[SHA256_NAMESPACE] = Sha256;
    HashAlgorithms[SHA384_NAMESPACE] = Sha384;
    HashAlgorithms[SHA512_NAMESPACE] = Sha512;

    export class CryptoConfig {
        static CreateFromName(name: string): Transform {
            let t: Transform = null;
            switch (name) {
                case XmlSignature.AlgorithmNamespaces.XmlDsigBase64Transform:
                    throw new XmlError(XE.ALGORITHM_NOT_SUPPORTED, name);
                // t = new XmlDsigBase64Transform();
                // break;
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
                    throw new XmlError(XE.ALGORITHM_NOT_SUPPORTED, name);
                // t = new XmlDsigXPathTransform();
                // break;
                case XmlSignature.AlgorithmNamespaces.XmlDsigXsltTransform:
                    throw new XmlError(XE.ALGORITHM_NOT_SUPPORTED, name);
                // t = new XmlDsigXsltTransform();
                // break;
                case XmlSignature.AlgorithmNamespaces.XmlDsigExcC14NTransform:
                    t = new XmlDsigExcC14NTransform();
                    break;
                case XmlSignature.AlgorithmNamespaces.XmlDsigExcC14NWithCommentsTransform:
                    t = new XmlDsigExcC14NWithCommentsTransform();
                    break;
                case XmlSignature.AlgorithmNamespaces.XmlDecryptionTransform:
                    throw new XmlError(XE.ALGORITHM_NOT_SUPPORTED, name);
                // t = new XmlDecryptionTransform();
                // break;
                default:
                    throw new XmlError(XE.ALGORITHM_NOT_SUPPORTED, name);
            }
            return t;
        }

        static CreateSignatureAlgorithm(namespace: string): SignatureAlgorithm {
            let alg = SignatureAlgorithms[namespace] || null;
            if (alg)
                return new alg();
            else throw new Error(`signature algorithm '${namespace}' is not supported`);
        };

        static CreateHashAlgorithm(namespace: string): HashAlgorithm {
            let algo = HashAlgorithms[namespace];
            if (algo)
                return new algo();
            else throw new Error("hash algorithm '" + namespace + "' is not supported");
        }
    }
}