/// <reference path="../typings/xmldom/xmldom.d.ts" />
/// <reference path="./promise.d.ts" />

let XMLSerializer = require("xmldom").XMLSerializer;
let DOMParser = require("xmldom").DOMParser;
let DOMImplementation = require("xmldom").DOMImplementation;
let document = new DOMImplementation().createDocument("http://www.w3.org/1999/xhtml", "html", null);

/// <reference path="./error.ts" />