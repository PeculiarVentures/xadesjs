namespace xadesjs {

    export class SHA1 extends HashAlgorithm {
        algorithm = { name: "SHA-1" };
        xmlNamespace = "http://www.w3.org/2000/09/xmldsig#sha1";
    }

    export class SHA224 extends HashAlgorithm {
        algorithm = { name: "SHA-224" };
        xmlNamespace = "http://www.w3.org/2001/04/xmlenc#sha224";
    }

    export class SHA256 extends HashAlgorithm {
        algorithm = { name: "SHA-256" };
        xmlNamespace = "http://www.w3.org/2001/04/xmlenc#sha256";
    }

    export class SHA384 extends HashAlgorithm {
        algorithm = { name: "SHA-384" };
        xmlNamespace = "http://www.w3.org/2001/04/xmlenc#sha384";
    }

    export class SHA512 extends HashAlgorithm {
        algorithm = { name: "SHA-512" };
        xmlNamespace = "http://www.w3.org/2001/04/xmlenc#sha512";
    }

}