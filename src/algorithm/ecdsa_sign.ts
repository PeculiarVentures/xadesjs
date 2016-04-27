namespace xadesjs {

    const ECDSA_SIGN_ALGORITHM = "ECDSA";

    export class EcdsaSha1 extends SignatureAlgorithm {
        algorithm: any = {
            name: ECDSA_SIGN_ALGORITHM,
            hash: {
                name: SHA1
            }
        };
        xmlNamespace = "http://www.w3.org/2001/04/xmldsig-more#ecdsa-sha1";
    }

    export class EcdsaSha224 extends SignatureAlgorithm {
        algorithm: any = {
            name: ECDSA_SIGN_ALGORITHM,
            hash: {
                name: SHA224
            }
        };
        xmlNamespace = "http://www.w3.org/2001/04/xmldsig-more#ecdsa-sha224";
    }

    export class EcdsaSha256 extends SignatureAlgorithm {
        algorithm: any = {
            name: ECDSA_SIGN_ALGORITHM,
            hash: {
                name: SHA256
            }
        };
        xmlNamespace = "http://www.w3.org/2001/04/xmldsig-more#ecdsa-sha256";
    }

    export class EcdsaSha384 extends SignatureAlgorithm {
        algorithm: any = {
            name: ECDSA_SIGN_ALGORITHM,
            hash: {
                name: SHA384
            }
        };
        xmlNamespace = "http://www.w3.org/2001/04/xmldsig-more#ecdsa-sha384";
    }

    export class EcdsaSha512 extends SignatureAlgorithm {
        algorithm: any = {
            name: ECDSA_SIGN_ALGORITHM,
            hash: {
                name: SHA512
            }
        };
        xmlNamespace = "http://www.w3.org/2001/04/xmldsig-more#ecdsa-sha512";
    }

}