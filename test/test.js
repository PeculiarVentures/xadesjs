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

    function verifyXML(name, done) {
        readXml("./test/static/"+name, function(xml) {
            var signature = select(xml, "/*/*[local-name(.)='Signature' and namespace-uri(.)='http://www.w3.org/2000/09/xmldsig#']")[0];
            var sig = new xadesjs.SignedXml();
            sig.loadXml(signature);
            sig.checkSignature(xml)
                .then(function(v) {
                    assert.equal(v, true, "Wrong signature verifing");
                    done();
                })
                .catch(done);
        })
    }

    it("Verify EXEC C14N RSA-SHA1", function(done) {
        verifyXML("valid-signature.xml", done)
    })
    
    it("Verify SAML EXEC C14N RSA-SHA1", function(done) {
        verifyXML("valid-saml.xml", done)
    })

})