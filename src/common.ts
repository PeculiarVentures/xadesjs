/// <reference path="../typings/xmldom/xmldom.d.ts" />
/// <reference path="./typings/promise.d.ts" />
/// <reference path="./typings/xpath.d.ts" /> 

let XMLSerializer = XMLSerializer || require("xmldom-alpha").XMLSerializer;
let DOMParser = DOMParser || require("xmldom-alpha").DOMParser;
let DOMImplementation = DOMImplementation || require("xmldom-alpha").DOMImplementation;
let document = document || new DOMImplementation().createDocument("http://www.w3.org/1999/xhtml", "html", null);

// PKIjs
let org = org || null;
if (!org) {
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
    org = merge(true, pkijs_1, x509schema).org;
}

function SelectNodesEx(node: Node, xpath: string): Node[] {
    let doc: Document = node.ownerDocument == null ? node as Document : node.ownerDocument;
    let nsResolver = document.createNSResolver(node.ownerDocument == null ? (node as Document).documentElement : node.ownerDocument.documentElement);
    let personIterator = doc.evaluate(xpath, node, nsResolver, XPathResult.ANY_TYPE, null);
    let ns: Node[] = [];
    let n: Node;
    while (n = personIterator.iterateNext())
        ns.push(n);
    return ns;
}

let select: SelectNodes = (typeof module === "undefined") ? SelectNodesEx : require("xpath.js");