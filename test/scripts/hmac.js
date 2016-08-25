var select, xadesjs, DOMParser, XMLSerializer, readXml, assert;

if (typeof module !== "undefined") {
    var config = require("./config");
    select = config.select;
    xadesjs = config.xadesjs;
    DOMParser = config.DOMParser;
    XMLSerializer = config.XMLSerializer;
    assert = config.assert;
    readXml = config.readXml;
}

describe("HMAC", function () {

    function isNode() {
        if (typeof window === "undefined") {
            warn("NodeJS");
            return true;
        }
        return false;
    }

    function warn(name) {
        console.warn("    \x1b[33mWARN:\x1b[0m Test is not supported for %s. Ossl doesn't support HMAC algs", name);
    }

    if (isNode()) return;

    function CheckSignature(xmlString, key) {
        return new Promise(function (resolve, reject) {
            var xml = new DOMParser().parseFromString(xmlString, "application/xml");
            var signature = select(xml, "//*//*[local-name(.)='Signature' and namespace-uri(.)='http://www.w3.org/2000/09/xmldsig#']")[0];
            var sig = new xadesjs.SignedXml(xml);
            sig.LoadXml(signature);
            sig.CheckSignature(key)
                .then(resolve, reject);
        })
    }

    var hmacKeySHA1 = null;
    var hmacKeySHA256 = null;
    var hmacKeySHA256Length128 = null;
    var hmacKeySHA384 = null;
    var hmacKeySHA512 = null;

    function generateHmacKey(hash, length) {
        var alg = {
            name: "HMAC",
            hash: { name: hash },
        };
        if (length != void 0)
            alg.length = length;
        return xadesjs.Application.crypto.subtle.generateKey(
            alg,
            false,
            ["sign", "verify"]
        );
    }

    before(function (done) {
        generateHmacKey("SHA-1")
            .then(function (k) {
                hmacKeySHA1 = k;
                return generateHmacKey("SHA-256")
            })
            .then(function (k) {
                hmacKeySHA256 = k;
                return generateHmacKey("SHA-384")
            })
            .then(function (k) {
                hmacKeySHA384 = k;
                return generateHmacKey("SHA-512")
            })
            .then(function (k) {
                hmacKeySHA512 = k;
                return generateHmacKey("SHA-256", 128)
            })
            .then(function (k) {
                hmacKeySHA256Length128 = k;
                return Promise.resolve();
            })
            .then(done, done);
    })

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
            // Set prefix for Signature namespace
            signedXml.Prefix = "ds";

            // Compute the signature.
            signedXml.ComputeSignature(algorithm)
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

    function Test(key, keyName, done, length) {
        SignXml("<root><child1/><child2/><child3/></root>", key, { name: "HMAC" })
            .then(function (xmlSig) {
                assert.equal(!!xmlSig, true, "Empty XML signature string for " + keyName);
                return CheckSignature(xmlSig, key);
            })
            .then(function (v) {
                assert.equal(v, true, "Wrong signature verification for " + keyName);
                return Promise.resolve();
            })
            .then(done, done);
    }

    it("Sign/verify HMAC SHA1", function (done) {
        Test(hmacKeySHA1, "HMAC-SHA1", done);
    })
    
    it("Sign/verify HMAC SHA256", function (done) {
        Test(hmacKeySHA1, "HMAC-SHA256", done);
    })
    
    it("Sign/verify HMAC SHA384", function (done) {
        Test(hmacKeySHA1, "HMAC-SHA384", done);
    })
    
    it("Sign/verify HMAC SHA512", function (done) {
        Test(hmacKeySHA1, "HMAC-SHA512", done);
    })

})