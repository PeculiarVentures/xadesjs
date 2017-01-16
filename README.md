# XAdESjs

[![license](https://img.shields.io/badge/license-MIT-green.svg?style=flat)](https://raw.githubusercontent.com/PeculiarVentures/xadesjs/master/LICENSE.md)
[![CircleCI](https://circleci.com/gh/PeculiarVentures/xadesjs.svg?style=svg)](https://circleci.com/gh/PeculiarVentures/xadesjs)
[![Coverage Status](https://coveralls.io/repos/github/PeculiarVentures/xadesjs/badge.svg?branch=master)](https://coveralls.io/github/PeculiarVentures/xadesjs?branch=master) 
[![npm version](https://badge.fury.io/js/xadesjs.svg)](https://badge.fury.io/js/xadesjs)

[![NPM](https://nodei.co/npm-dl/xadesjs.png?months=2&height=2)](https://nodei.co/npm/xadesjs/)


[XAdES](https://en.wikipedia.org/wiki/XAdES) is short for "XML Advanced Electronic Signatures", it is a superset of XMLDSIG. This library aims to provide an implementation of both XMLDSIG and XAdES-BES in Typescript/Javascript that uses Web Crypto for cryptographic operations so it can be used both in browsers and in Node.js (when used with a polyfill like [node-webcrypto-ossl](https://github.com/PeculiarVentures/node-webcrypto-ossl) or [node-webcrypto-p11](https://github.com/PeculiarVentures/node-webcrypto-p11)).

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
| **XAdES-BES**  | **Yes**                        | **No**                               | **No**                             | **No**                       | **No**                                       |
| XAdES-EPES | Yes                        | No                               | No                             | No                       | No                                       |
| XAdES-T    | Yes                        | Yes                              | No                             | No                       | No                                       |
| XAdES-C    | Yes                        | Yes                              | Yes                            | No                       | No                                       |
| XAdES-X    | Yes                        | Yes                              | Yes                            | No                       | No                                       |
| XAdES-X-L  | Yes                        | Yes                              | Yes                            | Yes                      | No                                       |
| XAdES-A    | Yes                        | Yes                              | Yes                            | Yes                      | Yes                                      |

- Only XAdES-BES is fully (as shown in **BOLD**) supported by XAdESjs
- Other variants are supported by XAdESjs-PRO which is a layer on XAdESjs. XAdESjs-PRO is availible under a commercial license, [email](mailto:info@peculiarventures.com) for more information.

## INSTALLING

```
npm install xadesjs
```

npm module has `dist` foldder with files

| Name            | Size   | Description                                    |
|-----------------|--------|------------------------------------------------|
| index.js        | 105 Kb | UMD module with external modules. Has comments | 
| xades.js        | 806 Kb | UMD bundle module. Has comments                | 
| xades.min.js    | 296 Kb | minified UMD bundle module                     |

There is `lib` folder with ES2015 JS file which you can use with `rollup` compiler
 
## COMPATABILITY

### CRYPTOGRAPHIC ALGORITHM SUPPORT 

|                   | SHA1 | SHA2-256 | SHA2-384 | SHA2-512 |
|-------------------|------|----------|----------|----------|
| RSASSA-PKCS1-v1_5 | X    | X        | X        | X        |
| RSA-PSS           | X    | X        | X        | X        |
| ECDSA             | X    | X        | X        | X        |
| HMAC              | X    | X        | X        | X        |

### CANONICALIZATION ALGORITHM SUPPORT

- XmlDsigC14NTransform
- XmlDsigC14NWithCommentsTransform
- XmlDsigExcC14NTransform
- XmlDsigExcC14NWithCommentsTransform
- XmlDsigEnvelopedSignatureTransform
- XmlDsigBase64Transform


### PLATFORM SUPPORT

XAdESjs works with any browser that suppports Web Crypto. Since node does not have Web Crypto you will need a polyfill on this platform, for this reason the npm package includes [node-webcrypto-ossl](https://github.com/PeculiarVentures/node-webcrypto-ossl); browsers do not need this dependency and in those cases though it will be installed it will be ignored.

If you need to use a Hardware Security Module we have also created a polyfill for Web Crypto that supports PKCS #11. Our polyfill for this is [node-webcrypto-p11](https://github.com/PeculiarVentures/node-webcrypto-p11).

To use [node-webcrypto-ossl](https://github.com/PeculiarVentures/node-webcrypto-ossl) you need to specify you want to use it, that looks like this:

```javascript
var xadesjs = require("./built/xades.js");
var WebCrypto = require("node-webcrypto-ossl").default;

xadesjs.Application.setEngine("OpenSSL", new WebCrypto());
```

The [node-webcrypto-p11](https://github.com/PeculiarVentures/node-webcrypto-p11) polyfill will work the same way. The only difference is that you have to specify the details about your PKCS #11 device when you instansiate it:

```javascript
var xadesjs = require("./built/xades.js");
var WebCrypto = require("node-webcrypto-p11").WebCrypto;

xadesjs.Application.setEngine("PKCS11", new WebCrypto({
    library: "/path/to/pkcs11.so",
	name: "Name of PKCS11 lib",
	slot: 0,
    sessionFlags: 2 | 4, // RW_SESSION | SERIAL_SESSION
	pin: "token pin"
}));
```

## WARNING

**Using XMLDSIG is a bit like running with scissors, that said it is needed for interoperability with a number of systems, for this reason, we have done this implementation.** 

**Given the nuances in handling XMLDSIG securely at this time you should consider this solution suitable for research and experimentation, further code and security review is needed before utilization in a production application.**


## EXAMPLES

### Create XAdES Signature

#### In Node

```javascript
var xadesjs = require("xadesjs");
var WebCrypto = require("node-webcrypto-ossl");

xadesjs.Application.setEngine("OpenSSL", new WebCrypto());

// Generate RSA key pair
var privateKey, publicKey;
xadesjs.Application.crypto.subtle.generateKey(
    {
        name: "RSASSA-PKCS1-v1_5",
        modulusLength: 1024, //can be 1024, 2048, or 4096,
        publicExponent: new Uint8Array([1, 0, 1]),
        hash: { name: "SHA-1" }, //can be "SHA-1", "SHA-256", "SHA-384", or "SHA-512"
    },
    false, //whether the key is extractable (i.e. can be used in exportKey)
    ["sign", "verify"] //can be any combination of "sign" and "verify"
)
    .then(function (keyPair) {
        // Push ganerated keys to global variable
        privateKey = keyPair.privateKey;
        publicKey = keyPair.publicKey;

        // Call sign function
        var xmlString = '<player bats="left" id="10012" throws="right">\n\t<!-- Here\'s a comment -->\n\t<name>Alfonso Soriano</name>\n\t<position>2B</position>\n\t<team>New York Yankees</team>\n</player>';
        return SignXml(xmlString, keyPair, { name: "RSASSA-PKCS1-v1_5", hash: { name: "SHA-1" } });
    })
    .then(function (signedDocument) {
        console.log("Signed document:\n\n", signedDocument);
    })
    .catch(function (e) {
        console.error(e);
    });


function SignXml(xmlString, keys, algorithm) {
    return Promise.resolve()
        .then(() => {
            var xmlDoc = xadesjs.Parse(xmlString);
            var signedXml = new xadesjs.SignedXml();

            return signedXml.Sign(               // Signing document
                algorithm,                              // algorithm 
                keys.privateKey,                        // key 
                xmlDoc,                                 // document
                {                                       // options
                    keyValue: keys.publicKey,
                    references: [
                        { hash: "SHA-256", transforms: ["enveloped"] }
                    ],
                    productionPlace: {
                        country: "Country",
                        state: "State",
                        city: "City",
                        code: "Code",
                    },
                    signingCertificate: "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"
                })
            })
            .then(signature => signature.toString());
}
```


#### In the browser
```html
<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8" />
    <title>XADESJS Signature Sample</title>
</head>

<body>
    <pre id="signature"><code></code></pre>
    <script src="https://peculiarventures.github.io/pv-webcrypto-tests/src/promise.js"></script>
    <script src="https://peculiarventures.github.io/pv-webcrypto-tests/src/webcrypto-liner.min.js"></script>
    <script src="https://peculiarventures.github.io/pv-webcrypto-tests/src/asmcrypto.js"></script>
    <script src="https://peculiarventures.github.io/pv-webcrypto-tests/src/elliptic.js"></script>
    <script type="text/javascript" src="dist/xades.js"></script>
    <script type="text/javascript">
        // Generate RSA key pair
        var privateKey, publicKey;
        window.crypto.subtle.generateKey(
            {
                name: "ECDSA",
                namedCurve: "P-256"
            },
            false, //whether the key is extractable (i.e. can be used in exportKey)
            ["sign", "verify"] //can be any combination of "sign" and "verify"
        )
            .then(function (keyPair) {
                // Push ganerated keys to global variable
                privateKey = keyPair.privateKey;
                publicKey = keyPair.publicKey;
                // Call sign function
                var xmlString = '<player bats="left" id="10012" throws="right">\n\t<!-- Here\'s a comment -->\n\t<name>Alfonso Soriano</name>\n\t<position>2B</position>\n\t<team>New York Yankees</team>\n</player>';
                return SignXml(xmlString, keyPair, { name: "ECDSA", hash: { name: "SHA-1" } });
            })
            .then(function (signedDocument) {
                document.getElementById("signature").textContent = signedDocument;
                console.log("Signed document:\n\n", signedDocument);
            })
            .catch(function (e) {
                console.error(e);
            });

        function SignXml(xmlString, keys, algorithm) {
            var signedXml;
            return Promise.resolve()
                .then(() => {
                    var xmlDoc = XAdES.Parse(xmlString);
                    signedXml = new XAdES.SignedXml();

                    return signedXml.Sign(               // Signing document
                        algorithm,                              // algorithm 
                        keys.privateKey,                        // key 
                        xmlDoc,                                 // document
                        {                                       // options
                            keyValue: keys.publicKey,
                            references: [
                                { hash: "SHA-256", transforms: ["enveloped"] }
                            ],
                            productionPlace: {
                                country: "Country",
                                state: "State",
                                city: "City",
                                code: "Code",
                            },
                            signerRoles: {
                                claimed: ["Some role"]
                            }
                        })
                })
                .then(() => signedXml.toString());
        }
    </script>
</body>

</html>
````

### Check XMLDSIG Signature 

#### In Node

```javascript
var xadesjs = require("./built/xades.js");
var DOMParser = require("xmldom").DOMParser;
var WebCrypto = require("node-webcrypto-ossl").default;

xadesjs.Application.setEngine("OpenSSL", new WebCrypto());

var fs = require("fs");
var xmlString = fs.readFileSync("./xadesjs/test/static/valid_signature.xml","utf8");

var signedDocument = new DOMParser().parseFromString(xmlString, "application/xml");
var xmlSignature = signedDocument.getElementsByTagNameNS("http://www.w3.org/2000/09/xmldsig#", "Signature");

var signedXml = new xadesjs.SignedXml(signedDocument);
signedXml.LoadXml(xmlSignature[0]);
signedXml.CheckSignature()
.then(function (signedDocument) {
        console.log("Successfully Verified");
})
.catch(function (e) {
        console.error(e);
});
```

#### In the browser
```HTML
<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8"/>
    <title>XADESJS Verify Sample</title>
</head>

<body>
    <script type="text/javascript" src="https://cdn.rawgit.com/GlobalSign/ASN1.js/master/org/pkijs/common.js"></script>
    <script type="text/javascript" src="https://cdn.rawgit.com/GlobalSign/ASN1.js/master/org/pkijs/asn1.js"></script>
    <script type="text/javascript" src="https://cdn.rawgit.com/GlobalSign/PKI.js/master/org/pkijs/x509_schema.js"></script>
    <script type="text/javascript" src="https://cdn.rawgit.com/GlobalSign/PKI.js/master/org/pkijs/x509_simpl.js"></script>
    <script type="text/javascript" src="https://cdn.rawgit.com/PeculiarVentures/xadesjs/master/built/xades.js"></script>
    
    <script type="text/javascript">
        fetch("https://cdn.rawgit.com/PeculiarVentures/xadesjs/master/test/static/valid_signature.xml")
        .then(function(response) {
            return response.text()
        }).then(function(body) {
            var xmlString = body;
            
            var signedDocument = new DOMParser().parseFromString(xmlString, "application/xml");
            var xmlSignature = signedDocument.getElementsByTagNameNS("http://www.w3.org/2000/09/xmldsig#", "Signature");

            var signedXml = new xadesjs.SignedXml(signedDocument);
            signedXml.LoadXml(xmlSignature[0]);
            signedXml.CheckSignature()
            .then(function (signedDocument) {
                    console.log("Successfully Verified");
            })
            .catch(function (e) {
                    console.error(e);
            });
        })
    </script>
</body>
</html>
```

## TESTING

### In NodeJS:

```
npm test
```

### In the browser
To run the browser test you need to run the server, from the test directory run: 
```
npm start
```

And the then browse to `http://localhost:3000'.

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
