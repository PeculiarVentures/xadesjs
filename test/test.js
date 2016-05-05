var select, xadesjs, DOMParser, XMLSerializer, readXml, assert;


if (typeof module !== "undefined") {
    // If NodeJS, then import modules
    var config = require("./config");
    select = config.select;
    xadesjs = config.xadesjs;
    DOMParser = config.DOMParser;
    XMLSerializer = config.XMLSerializer;
    assert = config.assert;
    readXml = config.readXml;
}

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