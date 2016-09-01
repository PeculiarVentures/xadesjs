var select, xadesjs, DOMParser, readXml, assert;

if (typeof module !== "undefined") {
    var config = require("./config");
    select = config.select;
    xadesjs = config.xadesjs;
    DOMParser = config.DOMParser;
    assert = config.assert;
    readXml = config.readXml;
}

describe("Verify XML signatures", function () {
    this.timeout(6000);
    function verifyXML(name, done, res) {
        if (res === void 0) res = true;
        var folder = (typeof module === "undefined") ? "./static/" : "./test/static/";
        readXml(folder + name, function (xml) {
            var signature = select(xml, "//*[local-name(.)='Signature' and namespace-uri(.)='http://www.w3.org/2000/09/xmldsig#']")[0];
            var sig = new xadesjs.SignedXml(xml);
            sig.LoadXml(signature);
            sig.CheckSignature()
                .then(function (v) {
                    assert.equal(v, res, "Wrong signature verifing");
                    done();
                })
                .catch(done);
        })
    }

    it("Init SignedXml from Element", function () {
        var xmlText = "<root><first></first><second/></root>";
        var xmlDoc = new DOMParser().parseFromString(xmlText, "application/xml");
        assert.equal(!!xmlDoc, true);
        assert.equal(xmlDoc.documentElement.nodeName, "root");

        var first = select(xmlDoc, "//*[local-name()='first']");
        assert.equal(!!first, true);
        
        var sx = new xadesjs.SignedXml(first);
        assert.equal(!!sx, true); 
    })

    it("Verify valid-signature.xml EXEC-C14N RSA-SHA1", function (done) {
        // test validating SAML response
        verifyXML("valid_signature.xml", done)
    })

    it("Verify valid_signature_utf8.xml EXEC-C14N RSA-SHA256", function (done) {
        verifyXML("valid_signature_utf8.xml", done)
    })

    it("Verify valid_saml.xml SAML EXEC C14N RSA-SHA1", function (done) {
        verifyXML("valid_saml.xml", done)
    })

    it("test validating SAML response WithComments", function (done) {
        verifyXML("valid_saml_with_comments.xml", done, false);
    })

    it("test validating SAML response where a namespace is defined outside the signed element", function (done) {
        verifyXML("saml_external_ns.xml", done);
    })

    it("test validating WS-Fed Metadata", function (done) {
        verifyXML("wsfederation_metadata.xml", done)
    })

    it("test validating tl-mp.xml", function (done) {
        verifyXML("tl-mp.xml", done)
    })

})
