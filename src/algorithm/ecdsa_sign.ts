namespace xadesjs {

    export const ECDSA_SIGN_ALGORITHM = "ECDSA";

    export const ECDSA_SHA1_NAMESPACE = "http://www.w3.org/2001/04/xmldsig-more#ecdsa-sha1";
    export const ECDSA_SHA224_NAMESPACE = "http://www.w3.org/2001/04/xmldsig-more#ecdsa-sha224";
    export const ECDSA_SHA256_NAMESPACE = "http://www.w3.org/2001/04/xmldsig-more#ecdsa-sha256";
    export const ECDSA_SHA384_NAMESPACE = "http://www.w3.org/2001/04/xmldsig-more#ecdsa-sha384";
    export const ECDSA_SHA512_NAMESPACE = "http://www.w3.org/2001/04/xmldsig-more#ecdsa-sha512";

    export class EcdsaSha1 extends SignatureAlgorithm {
        algorithm: any = {
            name: ECDSA_SIGN_ALGORITHM,
            hash: {
                name: SHA1
            }
        };
        xmlNamespace = ECDSA_SHA1_NAMESPACE;
    }

    export class EcdsaSha224 extends SignatureAlgorithm {
        algorithm: any = {
            name: ECDSA_SIGN_ALGORITHM,
            hash: {
                name: SHA224
            }
        };
        xmlNamespace = ECDSA_SHA224_NAMESPACE;
    }

    export class EcdsaSha256 extends SignatureAlgorithm {
        algorithm: any = {
            name: ECDSA_SIGN_ALGORITHM,
            hash: {
                name: SHA256
            }
        };
        xmlNamespace = ECDSA_SHA256_NAMESPACE;
    }

    export class EcdsaSha384 extends SignatureAlgorithm {
        algorithm: any = {
            name: ECDSA_SIGN_ALGORITHM,
            hash: {
                name: SHA384
            }
        };
        xmlNamespace = ECDSA_SHA384_NAMESPACE;
    }

    export class EcdsaSha512 extends SignatureAlgorithm {
        algorithm: any = {
            name: ECDSA_SIGN_ALGORITHM,
            hash: {
                name: SHA512
            }
        };
        xmlNamespace = ECDSA_SHA512_NAMESPACE;
    }

}