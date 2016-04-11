/// <reference path="../typings/mocha/mocha.d.ts" />

var select, xadesjs, DOMParser, readXml, assert;

if (typeof module !== "undefined") {
    var config = require("./config");
    select = config.select;
    xadesjs = config.xadesjs;
    DOMParser = config.DOMParser;
    assert = config.assert;
    readXml = config.readXml;
}

describe("SignedXml class", function() {

    var privateKey = null;
    var publicKey = null;

    before(function(done) {
        // Generate RSA key
        xadesjs.Application.crypto.subtle.generateKey(
            {
                name: "RSASSA-PKCS1-v1_5",
                hash: { name: "SHA-256" },
                publicExponent: new Uint8Array([1, 0, 1]),
                modulusLength: 2048
            },
            false,
            ["sign", "verify"]
        )
            .then(function(keyPair) {
                privateKey = keyPair.privateKey;
                publicKey = keyPair.publicKey;
                done();
            })
            .catch(function(e) {
                done(e);
            });
    })

    it("Create SignedXml from Document", function(done) {
        var xmlStr = "<root><first/><second/></root>"
        var xmlDoc = new DOMParser().parseFromString(xmlStr, "application/xml");
        var xsd = new xadesjs.SignedXml(xmlDoc);
        assert.equal(!!xsd.envdoc, true);
        done();
    })

    it("Create SignedXml from Element", function(done) {
        var xmlStr = "<root><first/><second/></root>"
        var xmlDoc = new DOMParser().parseFromString(xmlStr, "application/xml");
        var xsd = new xadesjs.SignedXml(xmlDoc.getElementsByTagName("first")[0]);
        assert.equal(!!xsd.envdoc, true);
        assert.equal(xsd.envdoc.childNodes.length, 1);
        assert.equal(xsd.envdoc.childNodes[0].nodeName, "first");
        done();
    })

    it("Sign XML", function(done) {
        var xmlStr = "<root><first/><second/></root>"
        var xmlDoc = new DOMParser().parseFromString(xmlStr, "application/xml");
        var signedXml = new xadesjs.SignedXml(xmlDoc);

        // Add the key to the SignedXml document.
        signedXml.SigningKey = privateKey;

        // Create a reference to be signed.
        let reference = new xadesjs.Reference();
        reference.Uri = "";

        // Add an enveloped transformation to the reference.
        var env = new xadesjs.XmlDsigEnvelopedSignatureTransform();
        reference.AddTransform(env);

        // Add the reference to the SignedXml object.
        signedXml.AddReference(reference);

        // Compute the signature.
        signedXml.ComputeSignature();

        // Get the XML representation of the signature and save
        // it to an XmlElement object.
        var xmlDigitalSignature = signedXml.GetXml();


        done();
    })

});