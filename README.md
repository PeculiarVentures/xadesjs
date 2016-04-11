# XAdESjs

[XAdES](https://en.wikipedia.org/wiki/XAdES) is short for "XML Advanced Electronic Signatures"). This library aims to provide a implementation of the associated standards in pure Javascript based on Web Crypto so it can be used both in browsers and in Node.js (when used with a polyfill like [node-webcrypto-ossl](https://github.com/PeculiarVentures/node-webcrypto-ossl)).

There are seven different profiles of XAdES, they are:
- Basic Electronic Signature (XAdES-BES)
- XAdES with Timestamp (XAdES-T)
- XAdES with Complete Validation Data (XAdES-C)
- XAdES with Extended Validation Data (XAdES-X)
- XAdES with Extended Long Term Validation Data (XAdES-X-L)
- XAdES with Archiving Validation Data (XAdES-A)
- XAdES with Explicit policy electronic signatures (XAdES-EPES)

They differ slightly based on what is included in the signature:

|            | Provides Digital Signature | Includes Cryptographic Timestamp | Includes Revocation References | Includes Revocation Data | Allows Secure Timestamp Countersignature |
|------------|----------------------------|----------------------------------|--------------------------------|--------------------------|------------------------------------------|
| **XAdES-BES**  | Yes                        | No                               | No                             | No                       | No                                       |
| XAdES-EPES | Yes                        | No                               | No                             | No                       | No                                       |
| XAdES-T    | Yes                        | Yes                              | No                             | No                       | No                                       |
| XAdES-C    | Yes                        | Yes                              | Yes                            | No                       | No                                       |
| XAdES-X    | Yes                        | Yes                              | Yes                            | No                       | No                                       |
| XAdES-X-L  | Yes                        | Yes                              | Yes                            | Yes                      | No                                       |
| XAdES-A    | Yes                        | Yes                              | Yes                            | Yes                      | Yes                                      |

- Variants in **BOLD** are currently supported by XAdESjs
 
## ALGORITHM SUPPORT 

|                   | SHA1 | SHA2-256 | SHA2-384 | SHA2-512 |
|-------------------|------|----------|----------|----------|
| RSASSA-PKCS1-v1_5 | X    | X        | X        | X        |
| RSA-PSS           | X    | X        | X        | X        |
| ECDSA             | X    | X        | X        | X        |

 
## WARNING

**Using XMLDSIG is a bit like running with scissors, that said it is needed for interopability with a number of systems, for this reason we have done this implementation.** 

**Given the nuances in handling XMLDSIG securely at this time you should consider this solution suitable for research and experimentation, further code and security review is needed before utilization in a production application.**

## EXAMPLES

### Create XAdES-BES Signature

```Javascript
```

### Check XAdES-BES Signature 

```Javascript
var xadesjs = require("../built/xades.js");

var XMLSerializer = require("xmldom").XMLSerializer;
var DOMParser = require("xmldom").DOMParser;
var DOMImplementation = require("xmldom").DOMImplementation;
var document = new DOMImplementation().createDocument("http://www.w3.org/1999/xhtml", "html", null);

var fs = require("fs");
var ref = fs.readFileSync("./test/files/document.signed.t.bes.xml","utf8");

var parser = new DOMParser();
var xmlDoc = parser.parseFromString(ref, "application/xml");
var xmlSignature = xmlDoc.getElementsByTagNameNS("http://www.w3.org/2000/09/xmldsig#", "Signature");

var sxml = new xadesjs.SignedXml(xmlDoc);
sxml.loadXml(xmlSignature[0]);
sxml.CheckSignature();
```

### Validate XAdES-BES Signature

```Javascript
```

## RELATED
- [Why XML Security is Broken](https://www.cs.auckland.ac.nz/~pgut001/pubs/xmlsec.txt)
- [ETSI EN 319 132-1 - XML Advanced Electronic Signatures (XAdES)](http://www.etsi.org/deliver/etsi_en/319100_319199/31913201/01.01.00_30/en_31913201v010100v.pdf)
- [ETSI EN 319 132-2 - XML Advanced Electronic Signatures (XAdES)](http://www.etsi.org/deliver/etsi_en/319100_319199/31913202/01.01.00_30/en_31913202v010100v.pdf)
- [XML Signature Syntax and Processing](https://www.w3.org/TR/xmldsig-core/)
- [XML Security Algorithm Cross-Reference](https://tools.ietf.org/html/rfc6931)
- [Canonical XML](https://www.w3.org/TR/xml-c14n)
- [Exclusive XML Canonicalization](https://www.w3.org/TR/xml-exc-c14n/)
- [Internet X.509 Public Key Infrastructure Time-Stamp Protocol](https://www.ietf.org/rfc/rfc3161.txt)
- [XAdESj](https://github.com/luisgoncalves/xades4j)
- [PKIjs](pkijs.org)
- [node-webcrypto-ossl](https://github.com/PeculiarVentures/node-webcrypto-ossl)
- [node-webcrypto-p11](https://github.com/PeculiarVentures/node-webcrypto-p11)
