# XAdESjs

[![license](https://img.shields.io/badge/license-MIT-green.svg?style=flat)](https://raw.githubusercontent.com/PeculiarVentures/xadesjs/master/LICENSE.md)
[![CircleCI](https://circleci.com/gh/PeculiarVentures/xadesjs.svg?style=svg)](https://circleci.com/gh/PeculiarVentures/xadesjs)
[![Coverage Status](https://coveralls.io/repos/github/PeculiarVentures/xadesjs/badge.svg?branch=master)](https://coveralls.io/github/PeculiarVentures/xadesjs?branch=master)
[![npm version](https://badge.fury.io/js/xadesjs.svg)](https://badge.fury.io/js/xadesjs)

[![NPM](https://nodei.co/npm/xadesjs.png)](https://nodei.co/npm/xadesjs/)


[XAdES](https://en.wikipedia.org/wiki/XAdES) is short for "XML Advanced Electronic Signatures", it is a superset of XMLDSIG. This library aims to provide an implementation of XAdES in Typescript/Javascript that is built on [XMLDSIGjs](https://github.com/PeculiarVentures/xmldsigjs).

Since it is based on [XMLDSIGjs](https://github.com/PeculiarVentures/xmldsigjs) and that library uses Web Crypto for cryptographic operations it can be used both in browsers and in Node.js (when used with a polyfill like [webcrypto](https://github.com/PeculiarVentures/webcrypto), [node-webcrypto-ossl](https://github.com/PeculiarVentures/node-webcrypto-ossl) or [node-webcrypto-p11](https://github.com/PeculiarVentures/node-webcrypto-p11)).

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

- Only XAdES-BES (in *BOLD*) is fully supported by XAdESjs. For the other variants can be created, decoded and verified but the caller must do the construction and policy to ensure compliant messages on their own.

## INSTALLING

```
npm install xadesjs
```

The npm module has a `dist` folder with the following files:

| Name            | Size   | Description                                    |
|-----------------|--------|------------------------------------------------|
| index.js        | 105 Kb | UMD module with external modules. Has comments |
| xades.js        | 803 Kb | UMD bundle module. Has comments                |
| xades.min.js    | 296 Kb | minified UMD bundle module                     |

There is also a `lib` folder with an ES2015 JS file which you can use with `rollup` bundler.

## COMPATABILITY

### CRYPTOGRAPHIC ALGORITHM SUPPORT

| Name              | SHA1 | SHA2-256 | SHA2-384 | SHA2-512 |
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

XAdESjs works with any browser that suppports Web Crypto. Since node does not have Web Crypto you will need a polyfill on this platform, for this reason the npm package includes [webcrypto](https://github.com/PeculiarVentures/webcrypto); browsers do not need this dependency and in those cases though it will be installed it will be ignored.

If you need to use a Hardware Security Module we have also created a polyfill for Web Crypto that supports PKCS #11. Our polyfill for this is [node-webcrypto-p11](https://github.com/PeculiarVentures/node-webcrypto-p11).

To use [node-webcrypto-ossl](https://github.com/PeculiarVentures/node-webcrypto-ossl) you need to specify you want to use it, that looks like this:

```javascript
var xadesjs = require("./built/xades.js");
var { Crypto } = require("@peculiar/webcrypto");

xadesjs.Application.setEngine("NodeJS", new Crypto());
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

## Usage

### Sign

```typescript
SignedXml.Sign(algorithm: Algorithm, key: CryptoKey, data: Document, options?: OptionsXAdES): PromiseLike<Signature>;
```

__Parameters__

| Name          | Description                                                             |
|:--------------|:------------------------------------------------------------------------|
| algorithm     | Signing [Algorithm](https://www.w3.org/TR/WebCryptoAPI/#algorithms)     |
| key           | Signing [Key](https://www.w3.org/TR/WebCryptoAPI/#cryptokey-interface)  |
| data          | XML document which must be signed                                       |
| options       | Additional options                                                      |

#### Options
```typescript
interface OptionsXAdES {
    /**
     * Public key for KeyInfo block
     */
    keyValue?: CryptoKey;
    /**
     * List of X509 Certificates
     */
    x509?: string[];
    /**
     * List of Reference
     * Default is Reference with hash alg SHA-256 and exc-c14n transform  
     */
    references?: OptionsSignReference[];

    // Signed signature properties

    signingCertificate?: string;
    signingTime?: OptionsSigningTime;
    policy?: OptionsPolicyId;
    productionPlace?: OptionsProductionPlace;
    signerRole?: OptionsSignerRole;
}

interface OptionsSignReference {
    /**
     * Id of Reference
     */
    id?: string;
    uri?: string;
    /**
     * Hash algorithm
     */
    hash: AlgorithmIdentifier;
    /**
     * List of transforms
     */
    transforms?: OptionsSignTransform[];
}

type OptionsSignTransform = "enveloped" | "c14n" | "exc-c14n" | "c14n-com" | "exc-c14n-com" | "base64";

interface OptionsSigningTime {
    value?: Date;
    format?: string;
}

interface OptionsSignerRole {
    claimed?: string[];
    certified?: string[];
}

interface OptionsProductionPlace {
    city?: string;
    state?: string;
    code?: string;
    country?: string;
}

interface OptionsPolicyId {
}
```

### Verify

```typescript
Verify(key?: CryptoKey): PromiseLike<boolean>;
```

__Parameters__

| Name          | Description                                                             |
|:--------------|:------------------------------------------------------------------------|
| key           | Verifying [Key](https://www.w3.org/TR/WebCryptoAPI/#cryptokey-interface). Optional. If key not set it looks for keys in KeyInfo element of Signature.  |

## EXAMPLES

### Create XAdES-BES Signature

#### In Node

```javascript
var xadesjs = require("xadesjs");
var { Crypto } = require("@peculiar/webcrypto");

xadesjs.Application.setEngine("NodeJS", new Crypto());

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
    <script src="https://cdnjs.cloudflare.com/ajax/libs/babel-polyfill/7.7.0/polyfill.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/asmCrypto/2.3.2/asmcrypto.all.es5.min.js"></script>
    <script src="https://cdn.rawgit.com/indutny/elliptic/master/dist/elliptic.min.js"></script>
    <script src="https://unpkg.com/webcrypto-liner@1.1.2/build/webcrypto-liner.shim.min.js"></script>
    <script src="https://unpkg.com/xadesjs@2.0.16/build/xades.js"></script>
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
                            signerRole: {
                                claimed: ["Some role"]
                            }
                        })
                })
                .then(() => signedXml.toString());
        }
    </script>
</body>

</html>
```

### Check XAdES-BES Signature

#### In Node

```js
var XAdES = require("xadesjs");
var { Crypto } = require("@peculiar/webcrypto");

XAdES.Application.setEngine("NodeJS", new Crypto());

var fs = require("fs");
var xmlString = fs.readFileSync("some.xml","utf8");

var signedDocument = XAdES.Parse(xmlString, "application/xml");
var xmlSignature = signedDocument.getElementsByTagNameNS("http://www.w3.org/2000/09/xmldsig#", "Signature");

var signedXml = new xadesjs.SignedXml(signedDocument);
signedXml.LoadXml(xmlSignature[0]);
signedXml.Verify()
    .then(res => {
        console.log((res ? "Valid" : "Invalid") + " signature");
    })
    .catch(function (e) {
        console.error(e);
    });
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
    <script src="https://cdnjs.cloudflare.com/ajax/libs/babel-polyfill/7.7.0/polyfill.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/asmCrypto/2.3.2/asmcrypto.all.es5.min.js"></script>
    <script src="https://cdn.rawgit.com/indutny/elliptic/master/dist/elliptic.min.js"></script>
    <script src="https://unpkg.com/webcrypto-liner@1.1.2/build/webcrypto-liner.shim.min.js"></script>
    <script src="https://unpkg.com/xadesjs@2.0.16/build/xades.js"></script>
    <script type="text/javascript">
        "use strict";
        fetch("https://cdn.rawgit.com/PeculiarVentures/xadesjs/master/test/static/valid_signature.xml")
            .then(response => response.text())
            .then(body => {
                var xmlString = body;

                var signedDocument = XAdES.Parse(xmlString);
                var xmlSignature = signedDocument.getElementsByTagNameNS("http://www.w3.org/2000/09/xmldsig#", "Signature");

                var signedXml = new xadesjs.SignedXml(signedDocument);
                signedXml.LoadXml(xmlSignature[0]);
                signedXml.Verify()
                    .then(function (signedDocument) {
                        alert((res ? "Valid" : "Invalid") + " signature");
                    })
                    .catch(function (e) {
                        alert(e.message);
                    });
            })
    </script>
</body>

</html>
```

### XAdES-EPES signature

```js
const fs = require("fs");
var { Crypto } = require("@peculiar/webcrypto");
const xadesjs = require("xadesjs");
const { XMLSerializer } = require("xmldom-alpha");


const crypto = new Crypto();
xadesjs.Application.setEngine("NodeJS", );

function preparePem(pem) {
    return pem
        // remove BEGIN/END
        .replace(/-----(BEGIN|END)[\w\d\s]+-----/g, "")
        // remove \r, \n
        .replace(/[\r\n]/g, "");
}

function pem2der(pem) {
    pem = preparePem(pem);
    // convert base64 to ArrayBuffer
    return new Uint8Array(Buffer.from(pem, "base64")).buffer;
}

async function main() {
    const hash = "SHA-256"
    const alg = {
        name: "RSASSA-PKCS1-v1_5",
        hash,
    }

    // Read cert
    const certPem = fs.readFileSync("cert.pem", { encoding: "utf8" });
    const certDer = pem2der(certPem);

    // Read key
    const keyPem = fs.readFileSync("key.pem", { encoding: "utf8" });
    const keyDer = pem2der(keyPem);
    const key = await crypto.subtle.importKey("pkcs8", keyDer, alg, false, ["sign"]);

    // XAdES-EPES
    var xmlString = `<Test><Document attr="Hello"/></Test>`;
    var xml = xadesjs.Parse(xmlString);

    var xadesXml = new xadesjs.SignedXml();
    const x509 = preparePem(certPem);
    const signature = await xadesXml.Sign(   // Signing document
        alg,                                    // algorithm
        key,                                    // key
        xml,                                    // document
        {                                       // options
            references: [
                { hash, transforms: ["c14n", "enveloped"] }
            ],
            policy: {
                hash,
                identifier: {
                    qualifier: "OIDAsURI",
                    value: "quilifier.uri",
                },
                qualifiers: [
                    {
                        noticeRef: {
                            organization: "PeculiarVentures",
                            noticeNumbers: [1, 2, 3, 4, 5]
                        }
                    }
                ]
            },
            productionPlace: {
                country: "Russia",
                state: "Marij El",
                city: "Yoshkar-Ola",
                code: "424000",
            },
            signingCertificate: x509
        });

    // append signature
    xml.documentElement.appendChild(signature.GetXml());

    // serialize XML
    const oSerializer = new XMLSerializer();
    const sXML = oSerializer.serializeToString(xml);
    console.log(sXML.toString())
}

main()
    .catch((err) => {
        console.error(err);
    });
```

## TESTING

### In NodeJS:

```
npm test
```

## THANKS AND ACKNOWLEDGEMENT
This project takes inspiration (style, approach, design and code) from both the [Mono System.Security.Cryptography.Xml](https://github.com/mono/mono/tree/master/mcs/class/System.Security/System.Security.Cryptography.Xml) implementation as well as [xml-crypto](https://github.com/yaronn/xml-crypto).

## RELATED
- [xmldsigjs](https://github.com/PeculiarVentures/xmldsigjs)
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
- [@peculiar/webcrypto](https://github.com/PeculiarVentures/webcrypto)
- [node-webcrypto-ossl](https://github.com/PeculiarVentures/node-webcrypto-ossl)
- [node-webcrypto-p11](https://github.com/PeculiarVentures/node-webcrypto-p11)
