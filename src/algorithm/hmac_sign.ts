namespace xadesjs {

    export const RSA_HMAC_ALGORITHM = "HMAC";

    export class HmacSha1 extends SignatureAlgorithm {
        algorithm: any = {
            name: RSA_HMAC_ALGORITHM,
            hash: {
                name: SHA1
            }
        };
        xmlNamespace = "http://www.w3.org/2000/09/xmldsig#hmac-sha1";
    }

    export class HmacSha256 extends SignatureAlgorithm {
        algorithm: any = {
            name: RSA_HMAC_ALGORITHM,
            hash: {
                name: SHA256
            }
        };
        xmlNamespace = "http://www.w3.org/2001/04/xmldsig-more#hmac-sha256";
    }

    export class HmacSha384 extends SignatureAlgorithm {
        algorithm: any = {
            name: RSA_HMAC_ALGORITHM,
            hash: {
                name: SHA384
            }
        };
        xmlNamespace = "http://www.w3.org/2001/04/xmldsig-more#hmac-sha384";
    }

    export class HmacSha512 extends SignatureAlgorithm {
        algorithm: any = {
            name: RSA_HMAC_ALGORITHM,
            hash: {
                name: SHA512
            }
        };
        xmlNamespace = "http://www.w3.org/2001/04/xmldsig-more#hmac-sha512";
    }

}