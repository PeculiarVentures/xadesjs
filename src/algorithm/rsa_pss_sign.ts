namespace xadesjs {

    export const RSA_PSS = "RSA-PSS";

    export class RsaPssSha1 extends SignatureAlgorithm {
        algorithm: any = {
            name: RSA_PKCS1,
            hash: {
                name: SHA1
            }
        };
        xmlNamespace = "http://www.w3.org/2000/09/xmldsig#rsa-sha1";
    }

    export class RsaPssSha224 extends SignatureAlgorithm {
        algorithm: any = {
            name: RSA_PKCS1,
            hash: {
                name: SHA224
            }
        };
        xmlNamespace = "http://www.w3.org/2001/04/xmldsig-more#rsa-sha224";
    }

    export class RsaPssSha256 extends SignatureAlgorithm {
        algorithm: any = {
            name: RSA_PKCS1,
            hash: {
                name: SHA256
            }
        };
        xmlNamespace = "http://www.w3.org/2001/04/xmldsig-more#rsa-sha256";
    }

    export class RsaPssSha384 extends SignatureAlgorithm {
        algorithm: any = {
            name: RSA_PKCS1,
            hash: {
                name: SHA384
            }
        };
        xmlNamespace = "http://www.w3.org/2001/04/xmldsig-more#rsa-sha384";
    }

    export class RsaPssSha512 extends SignatureAlgorithm {
        algorithm: any = {
            name: RSA_PKCS1,
            hash: {
                name: SHA512
            }
        };
        xmlNamespace = "http://www.w3.org/2001/04/xmldsig-more#rsa-sha512";
    }

}