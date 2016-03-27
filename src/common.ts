/// <reference path="../typings/xmldom/xmldom.d.ts" />
/// <reference path="./promise.d.ts" />

let XMLSerializer = require("xmldom").XMLSerializer;
let DOMParser = require("xmldom").DOMParser;
let DOMImplementation = require("xmldom").DOMImplementation;
let document = new DOMImplementation().createDocument("http://www.w3.org/1999/xhtml", "html", null);

// PKIjs
let merge = require("node.extend");
let co = require("co");

let common = require("pkijs/org/pkijs/common");
let _asn1js = require("asn1js");
let _pkijs = require("pkijs");
let _x509schema = require("pkijs/org/pkijs/x509_schema");
let asn1js = merge(true, _asn1js, common);
let x509schema = merge(true, _x509schema, asn1js);
let pkijs_1 = merge(true, _pkijs, asn1js);
let pkijs_2 = merge(true, pkijs_1, co);
let org = merge(true, pkijs_1, x509schema).org;

/// <reference path="./error.ts" />