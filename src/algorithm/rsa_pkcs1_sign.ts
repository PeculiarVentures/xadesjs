namespace xadesjs {

    export const RSA_PKCS1 = "RSASSA-PKCS1-v1_5";

    export class RsaPkcs1Sha1 extends SignatureAlgorithm {
        algorithm: any = {
            name: RSA_PKCS1,
            hash: {
                name: SHA1
            }
        };
        xmlNamespace = "http://www.w3.org/2000/09/xmldsig#rsa-sha1";
    }

    export class RsaPkcs1Sha224 extends SignatureAlgorithm {
        algorithm: any = {
            name: RSA_PKCS1,
            hash: {
                name: SHA224
            }
        };
        xmlNamespace = "http://www.w3.org/2001/04/xmldsig-more#rsa-sha224";
    }

    export class RsaPkcs1Sha256 extends SignatureAlgorithm {
        algorithm: any = {
            name: RSA_PKCS1,
            hash: {
                name: SHA256
            }
        };
        xmlNamespace = "http://www.w3.org/2001/04/xmldsig-more#rsa-sha256";
    }

    export class RsaPkcs1Sha384 extends SignatureAlgorithm {
        algorithm: any = {
            name: RSA_PKCS1,
            hash: {
                name: SHA384
            }
        };
        xmlNamespace = "http://www.w3.org/2001/04/xmldsig-more#rsa-sha384";
    }

    export class RsaPkcs1Sha512 extends SignatureAlgorithm {
        algorithm: any = {
            name: RSA_PKCS1,
            hash: {
                name: SHA512
            }
        };
        xmlNamespace = "http://www.w3.org/2001/04/xmldsig-more#rsa-sha512";
    }

}