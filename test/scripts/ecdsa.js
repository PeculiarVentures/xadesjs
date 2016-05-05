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

describe("ECDSA", function () {

    function CheckSignature(xmlString, key) {
        return new Promise(function (resolve, reject) {
            var xml = new DOMParser().parseFromString(xmlString, "application/xml");
            var signature = select(xml, "//*[local-name(.)='Signature' and namespace-uri(.)='http://www.w3.org/2000/09/xmldsig#']")[0];
            var sig = new xadesjs.SignedXml(xml);
            sig.LoadXml(signature);
            sig.CheckSignature(key)
                .then(resolve, reject);
        })
    }

    var ecdsaKeyP256 = null;
    var ecdsaKeyP384 = null;
    var ecdsaKeyP521 = null;

    function generateRsaKey(namedCurve) {
        var alg = {
            name: "ECDSA",
            namedCurve: namedCurve
        };
        return xadesjs.Application.crypto.subtle.generateKey(
            alg,
            false,
            ["sign", "verify"]
        );
    }

    before(function (done) {
        generateRsaKey("P-256")
            .then(function (k) {
                ecdsaKeyP256 = k;
                return generateRsaKey("P-384");
            })
            .then(function (k) {
                ecdsaKeyP384 = k;
                return generateRsaKey("P-521");
            })
            .then(function (k) {
                ecdsaKeyP521 = k;
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

    function Test(key, keyName, done, hash) {
        SignXml("<root><child1/><child2/><child3/></root>", key.privateKey, { name: "ECDSA", hash: { name: hash }, saltLength: 12 })
            .then(function (xmlSig) {
                assert.equal(!!xmlSig, true, "Empty XML signature string for " + keyName);
                return CheckSignature(xmlSig, key.publicKey);
            })
            .then(function (v) {
                assert.equal(v, true, "Wrong signature verification for " + keyName);
                return Promise.resolve();
            })
            .then(done, done);
    }

    it("Sign/verify ECDSA-P256-SHA1", function (done) {
        Test(ecdsaKeyP256, "ECDSA-P256-SHA1", done, "SHA-1");
    })
    it("Sign/verify ECDSA-P256-SHA256", function (done) {
        Test(ecdsaKeyP256, "ECDSA-P256-SHA256", done, "SHA-256");
    })
    it("Sign/verify ECDSA-P256-SHA384", function (done) {
        Test(ecdsaKeyP256, "ECDSA-P256-SHA384", done, "SHA-384");
    })
    it("Sign/verify ECDSA-P256-SHA512", function (done) {
        Test(ecdsaKeyP256, "ECDSA-P256-SHA512", done, "SHA-512");
    })
    
    it("Sign/verify ECDSA-P384-SHA1", function (done) {
        Test(ecdsaKeyP384, "ECDSA-P384-SHA1", done, "SHA-1");
    })
    it("Sign/verify ECDSA-P384-SHA256", function (done) {
        Test(ecdsaKeyP384, "ECDSA-P384-SHA256", done, "SHA-256");
    })
    it("Sign/verify ECDSA-P384-SHA384", function (done) {
        Test(ecdsaKeyP384, "ECDSA-P384-SHA384", done, "SHA-384");
    })
    it("Sign/verify ECDSA-P384-SHA512", function (done) {
        Test(ecdsaKeyP384, "ECDSA-P384-SHA512", done, "SHA-512");
    })
    
    it("Sign/verify ECDSA-P521-SHA1", function (done) {
        Test(ecdsaKeyP521, "ECDSA-P521-SHA1", done, "SHA-1");
    })
    it("Sign/verify ECDSA-P521-SHA256", function (done) {
        Test(ecdsaKeyP521, "ECDSA-P521-SHA256", done, "SHA-256");
    })
    it("Sign/verify ECDSA-P521-SHA384", function (done) {
        Test(ecdsaKeyP521, "ECDSA-P521-SHA384", done, "SHA-384");
    })
    it("Sign/verify ECDSA-P521-SHA512", function (done) {
        Test(ecdsaKeyP521, "ECDSA-P521-SHA512", done, "SHA-512");
    })

})