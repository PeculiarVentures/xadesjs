var select, xadesjs, DOMParser, readXml, assert;

if (typeof module !== "undefined") {
    var config = require("./config");
    select = config.select;
    xadesjs = config.xadesjs;
    DOMParser = config.DOMParser;
    assert = config.assert;
    readXml = config.readXml;
}

describe("xadesjs", function() {

    function verifyXML(name, done, res) {
        if (res === void 0) res = true;
        readXml("./test/static/" + name, function(xml) {
            var signature = select(xml, "//*//*[local-name(.)='Signature' and namespace-uri(.)='http://www.w3.org/2000/09/xmldsig#']")[0];
            var sig = new xadesjs.SignedXml();
            sig.loadXml(signature);
            sig.checkSignature(xml)
                .then(function(v) {
                    assert.equal(v, res, "Wrong signature verifing");
                    done();
                })
                .catch(done);
        })
    }

    it("Verify valid-signature.xml EXEC-C14N RSA-SHA1", function(done) {
        // test validating SAML response
        verifyXML("valid_signature.xml", done)
    })

    it("Verify valid_signature_utf8.xml EXEC-C14N RSA-SHA256", function(done) {
        verifyXML("valid_signature_utf8.xml", done)
    })

    it("Verify valid_saml.xml SAML EXEC C14N RSA-SHA1", function(done) {
        verifyXML("valid_saml.xml", done)
    })

    it("test validating SAML response WithComments", function(done) {
        console.warn("This doesn't matter, just want to make sure that we don't fail due to unknown algorithm");
        verifyXML("valid_saml_with_comments.xml", done, false);
    })

    it("test validating SAML response where a namespace is defined outside the signed element", function(done) {
        verifyXML("saml_external_ns.xml", done);
    })
    
    it("Verify valid_signature_wsu.xml", function(done) {
        verifyXML("valid_signature_wsu.xml", done)
    })

    it("Verify valid_signature_with_reference_keyInfo.xml", function(done) {
        verifyXML("valid_signature_with_reference_keyInfo.xml", done)
    })

    it("Verify valid_signature_with_root_level_sig_namespace.xml", function(done) {
        verifyXML("valid_signature_with_root_level_sig_namespace.xml", done)
    })

})