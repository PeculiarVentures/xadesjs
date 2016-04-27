# XAdESjs

[XAdES](https://en.wikipedia.org/wiki/XAdES) is short for "XML Advanced Electronic Signatures", it is a superset of XMLDSIG. This library aims to provide an implementation of both XMLDSIG and XAdES (inprogress) in pure Javascript that uses Web Crypto for cryptographic operations so it can be used both in browsers and in Node.js (when used with a polyfill like [node-webcrypto-ossl](https://github.com/PeculiarVentures/node-webcrypto-ossl) or [node-webcrypto-p11](https://github.com/PeculiarVentures/node-webcrypto-p11)).

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
 
## CRYPTOGRAPHIC ALGORITHM SUPPORT 

|                   | SHA1 | SHA2-256 | SHA2-384 | SHA2-512 |
|-------------------|------|----------|----------|----------|
| RSASSA-PKCS1-v1_5 | X    | X        | X        | X        |
| RSA-PSS           | X    | X        | X        | X        |
| ECDSA             | X    | X        | X        | X        |
| HMAC              | X    | X        | X        | X        |

## CANONICALIZATION ALGORITHM SUPPORT

- XmlDsigC14NTransform
- XmlDsigC14NWithCommentsTransform
- XmlDsigExcC14NTransform
- XmlDsigExcC14NWithCommentsTransform
- XmlDsigEnvelopedSignatureTransform

 
## WARNING

**Using XMLDSIG is a bit like running with scissors, that said it is needed for interopability with a number of systems, for this reason we have done this implementation.** 

**Given the nuances in handling XMLDSIG securely at this time you should consider this solution suitable for research and experimentation, further code and security review is needed before utilization in a production application.**

## EXAMPLES

### Declaring Dependencies
```html
<script type="text/javascript" src="../node_modules/asn1js/org/pkijs/common.js"></script>
<script type="text/javascript" src="../node_modules/asn1js/org/pkijs/asn1.js"></script>
<script type="text/javascript" src="../node_modules/pkijs/org/pkijs/x509_schema.js"></script>
<script type="text/javascript" src="../node_modules/pkijs/org/pkijs/x509_simpl.js"></script>
<script src="../built/xades.js"></script>
```

### Create XMLDSIG Signature

```javascript
// Generate RSA key pair
var privateKey, publicKey;
xadesjs.Application.crypto.subtle.generateKey(
    {
        name: "RSASSA-PKCS1-v1_5",
        hash: { name: "SHA-1" },
        publicExponent: new Uint8Array([1, 0, 1]),
        modulusLength: 1024
    },
    false,
    ["sign", "verify"]
)
    .then(function (keyPair) {
        // Push ganerated keys to global variable
        privateKey = keyPair.privateKey;
        publicKey = keyPair.publicKey;

        // Call sign function
        var xmlString = '<player bats="left" id="10012" throws="right">\n\t<!-- Here\'s a comment -->\n\t<name>Alfonso Soriano</name>\n\t<position>2B</position>\n\t<team>New York Yankees</team>\n</player>';
        return SignXml(xmlString, privateKey, { name: "RSASSA-PKCS1-v1_5", hash: { name: "SHA-1" } });
    })
    .then(function (signedDocument) {
        console.log("Signed document:\n\n", signedDocument);
    })
    .catch(function (e) {
        console.error(e);
    });


function SignXml(xmlString, key, algorithm) {
    return new Promise(function (resolve, reject) {
        var xmlDoc = new DOMParser().parseFromString(xmlString, "application/xml");
        var signedXml = new xadesjs.SignedXml(xmlDoc);

        // Add the key to the SignedXml document.
        signedXml.SigningKey = key;

        // Create a reference to be signed.
        var reference = new xadesjs.Reference();
        reference.Uri = "";

        // Add an enveloped transformation to the reference.
        reference.AddTransform(new xadesjs.XmlDsigEnvelopedSignatureTransform());

        // Add the reference to the SignedXml object.
        signedXml.AddReference(reference);

        // Add KeyInfo
        signedXml.KeyInfo = new xadesjs.KeyInfo();
        var keyInfoClause = new xadesjs.RsaKeyValue();
        signedXml.KeyInfo.AddClause(keyInfoClause);

        // Set prefix for Signature namespace
        signedXml.Prefix = "ds";

        // Compute the signature.
        signedXml.ComputeSignature(algorithm)
            .then(function () {
                return keyInfoClause.importKey(publicKey);
            })
            .then(function () {
                // Append signature
                var xmlDigitalSignature = signedXml.GetXml();
                xmlDoc.documentElement.appendChild(xmlDigitalSignature);

                // Serialize XML document
                var signedDocument = new XMLSerializer().serializeToString(xmlDoc);
                return Promise.resolve(signedDocument);
            })
            .then(resolve, reject);
    })
}
```

### Check XMLDSIG Signature 

```javascript
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
sxml.LoadXml(xmlSignature[0]);
sxml.CheckSignature();
```

## THANKS AND ACKNOWLEDGEMENT
This project takes inspiration (style, approach, design and code) from both the [Mono System.Security.Cryptography.Xml](https://github.com/mono/mono/tree/master/mcs/class/System.Security/System.Security.Cryptography.Xml) implementation as well as [xml-crypto](https://github.com/yaronn/xml-crypto).

## RELATED
- [Why XML Security is Broken](https://www.cs.auckland.ac.nz/~pgut001/pubs/xmlsec.txt)
- [ETSI EN 319 132-1 - XML Advanced Electronic Signatures (XAdES)](http://www.etsi.org/deliver/etsi_en/319100_319199/31913201/01.01.00_30/en_31913201v010100v.pdf)
- [ETSI EN 319 132-2 - XML Advanced Electronic Signatures (XAdES)](http://www.etsi.org/deliver/etsi_en/319100_319199/31913202/01.01.00_30/en_31913202v010100v.pdf)
- [XML Signature Syntax and Processing](https://www.w3.org/TR/xmldsig-core/)
- [XML Security Algorithm Cross-Reference](https://tools.ietf.org/html/rfc6931)
- [XMLDSIG HTML Signing Profile](https://www.w3.org/2007/11/h6n/)
- [Canonical XML](https://www.w3.org/TR/xml-c14n)
- [Exclusive XML Canonicalization](https://www.w3.org/TR/xml-exc-c14n/)
- [Internet X.509 Public Key Infrastructure Time-Stamp Protocol](https://www.ietf.org/rfc/rfc3161.txt)
- [XAdESj](https://github.com/luisgoncalves/xades4j)
- [PKIjs](pkijs.org)
- [node-webcrypto-ossl](https://github.com/PeculiarVentures/node-webcrypto-ossl)
- [node-webcrypto-p11](https://github.com/PeculiarVentures/node-webcrypto-p11)
