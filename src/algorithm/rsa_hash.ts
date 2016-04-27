namespace xadesjs {

    export const SHA1 = "SHA-1";
    export const SHA224 = "SHA-224";
    export const SHA256 = "SHA-256";
    export const SHA384 = "SHA-384";
    export const SHA512 = "SHA-512";

    export const SHA1_NAMESPACE = "http://www.w3.org/2000/09/xmldsig#sha1";
    export const SHA224_NAMESPACE = "http://www.w3.org/2001/04/xmlenc#sha224";
    export const SHA256_NAMESPACE = "http://www.w3.org/2001/04/xmlenc#sha256";
    export const SHA384_NAMESPACE = "http://www.w3.org/2001/04/xmlenc#sha384";
    export const SHA512_NAMESPACE = "http://www.w3.org/2001/04/xmlenc#sha512";

    export class Sha1 extends HashAlgorithm {
        algorithm = { name: SHA1 };
        xmlNamespace = SHA1_NAMESPACE;
    }

    export class Sha224 extends HashAlgorithm {
        algorithm = { name: SHA224 };
        xmlNamespace = SHA224_NAMESPACE;
    }

    export class Sha256 extends HashAlgorithm {
        algorithm = { name: SHA256 };
        xmlNamespace = SHA256_NAMESPACE;
    }

    export class Sha384 extends HashAlgorithm {
        algorithm = { name: SHA384 };
        xmlNamespace = SHA384_NAMESPACE;
    }

    export class Sha512 extends HashAlgorithm {
        algorithm = { name: SHA512 };
        xmlNamespace = SHA512_NAMESPACE;
    }

}