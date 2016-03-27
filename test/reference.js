/// <reference path="../typings/mocha/mocha.d.ts" />
/// <reference path="../typings/node/node.d.ts" />
/// <reference path="../typings/node/node.d.ts" />
/// <reference path="../typings/xmldom/xmldom.d.ts" />

var assert = require("assert");
var xadesjs = require("../built/xades.js");
var fs = require("fs");
var XMLSerializer = require("xmldom").XMLSerializer;
var DOMParser = require("xmldom").DOMParser;
var DOMImplementation = require("xmldom").DOMImplementation;
var document = new DOMImplementation().createDocument("http://www.w3.org/1999/xhtml", "html", null);

describe("Reference", function() {

    before(function() {
        
    })

    it("loadXml", function() {
        var ref = fs.readFileSync("./test/files/document.signed.t.bes.xml", "utf8");

        var parser = new DOMParser();
        var nodeRef = parser.parseFromString(ref, "application/xml");
        var els = nodeRef.getElementsByTagNameNS("http://www.w3.org/2000/09/xmldsig#", "Reference");
        var reference = new xadesjs.Reference();
        reference.loadXml(els[0]);
        assert.equal(!!reference, true);
        // TODO: add more checks
    })

})