namespace xadesjs {

    const RSA_SIGN_ALGORITHM = "RSASSA-PKCS1-v1_5";
    const RSA_HMAC_ALGORITHM = "HMAC";

    export class RSASHA1 extends SignatureAlgorithm {
        algorithm: any = {
            name: RSA_SIGN_ALGORITHM,
            hash: {
                name: "SHA-1"
            }
        };
        xmlNamespace = "http://www.w3.org/2000/09/xmldsig#rsa-sha1";
    }

    export class RSASHA224 extends SignatureAlgorithm {
        algorithm: any = {
            name: RSA_SIGN_ALGORITHM,
            hash: {
                name: "SHA-224"
            }
        };
        xmlNamespace = "http://www.w3.org/2001/04/xmldsig-more#rsa-sha224";
    }

    export class RSASHA256 extends SignatureAlgorithm {
        algorithm: any = {
            name: RSA_SIGN_ALGORITHM,
            hash: {
                name: "SHA-256"
            }
        };
        xmlNamespace = "http://www.w3.org/2001/04/xmldsig-more#rsa-sha256";
    }

    export class RSASHA384 extends SignatureAlgorithm {
        algorithm: any = {
            name: RSA_SIGN_ALGORITHM,
            hash: {
                name: "SHA-384"
            }
        };
        xmlNamespace = "http://www.w3.org/2001/04/xmldsig-more#rsa-sha384";
    }

    export class RSASHA512 extends SignatureAlgorithm {
        algorithm: any = {
            name: RSA_SIGN_ALGORITHM,
            hash: {
                name: "SHA-512"
            }
        };
        xmlNamespace = "http://www.w3.org/2001/04/xmldsig-more#rsa-sha512";
    }

    export class HMACSHA1 extends SignatureAlgorithm {
        algorithm: any = {
            name: RSA_HMAC_ALGORITHM,
            hash: {
                name: "SHA-1"
            }
        };
        xmlNamespace = "http://www.w3.org/2000/09/xmldsig#hmac-sha1";

    }

}