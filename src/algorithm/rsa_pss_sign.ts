namespace xadesjs {

    export const RSA_PSS = "RSA-PSS";

    export const RSA_PSS_SHA1_NAMESPACE = "http://www.w3.org/2000/09/xmldsig#rsa-sha1";
    export const RSA_PSS_SHA224_NAMESPACE = "http://www.w3.org/2001/04/xmldsig-more#rsa-sha224";
    export const RSA_PSS_SHA256_NAMESPACE = "http://www.w3.org/2001/04/xmldsig-more#rsa-sha256";
    export const RSA_PSS_SHA384_NAMESPACE = "http://www.w3.org/2001/04/xmldsig-more#rsa-sha384";
    export const RSA_PSS_SHA512_NAMESPACE = "http://www.w3.org/2001/04/xmldsig-more#rsa-sha512";

    export class RsaPssSha1 extends SignatureAlgorithm {
        algorithm: any = {
            name: RSA_PKCS1,
            hash: {
                name: SHA1
            }
        };
        xmlNamespace = RSA_PSS_SHA1_NAMESPACE;
    }

    export class RsaPssSha224 extends SignatureAlgorithm {
        algorithm: any = {
            name: RSA_PKCS1,
            hash: {
                name: SHA224
            }
        };
        xmlNamespace = RSA_PKCS1_SHA224_NAMESPACE;
    }

    export class RsaPssSha256 extends SignatureAlgorithm {
        algorithm: any = {
            name: RSA_PKCS1,
            hash: {
                name: SHA256
            }
        };
        xmlNamespace = RSA_PSS_SHA256_NAMESPACE;
    }

    export class RsaPssSha384 extends SignatureAlgorithm {
        algorithm: any = {
            name: RSA_PKCS1,
            hash: {
                name: SHA384
            }
        };
        xmlNamespace = RSA_PSS_SHA384_NAMESPACE;
    }

    export class RsaPssSha512 extends SignatureAlgorithm {
        algorithm: any = {
            name: RSA_PKCS1,
            hash: {
                name: SHA512
            }
        };
        xmlNamespace = RSA_PSS_SHA512_NAMESPACE;
    }

}