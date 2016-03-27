/// <reference path="../typings/node/node.d.ts" />
/// <reference path="../typings/xmldom/xmldom.d.ts" />
var xadesjs = require("../built/xades.js");

// console.log(xadesjs);

var XMLSerializer = require("xmldom").XMLSerializer;
var DOMParser = require("xmldom").DOMParser;
var DOMImplementation = require("xmldom").DOMImplementation;
var document = new DOMImplementation().createDocument("http://www.w3.org/1999/xhtml", "html", null);

var fs = require("fs");
var ref = fs.readFileSync("./test/files/document.signed.t.bes.xml","utf8");

var parser = new DOMParser();
var xmlDoc = parser.parseFromString(ref, "application/xml");
var xmlSignature = xmlDoc.getElementsByTagNameNS("http://www.w3.org/2000/09/xmldsig#", "Signature");
console.log(xmlSignature);
var sxml = new xadesjs.SignedXml(xmlDoc);
sxml.loadXml(xmlSignature[0]);
sxml.CheckSignature();
console.log(sxml);

// ==============================================================

// var merge = require("node.extend");
// var co = require("co");

// var common = require("pkijs/org/pkijs/common");
// var _asn1js = require("asn1js");
// var _pkijs = require("pkijs");
// var _x509schema = require("pkijs/org/pkijs/x509_schema");
// var asn1js = merge(true, _asn1js, common);
// var x509schema = merge(true, _x509schema, asn1js);
// var pkijs_1 = merge(true, _pkijs, asn1js);
// var pkijs_2 = merge(true, pkijs_1, co);
// var org = merge(true, pkijs_1, x509schema).org;

// var b64Cert = "MIICbTCCAdqgAwIBAgIQpkK0uals+ItHxBlpJuypOTAJBgUrDgMCHQUAMD8xCzAJBgNVBAYTAlBUMQ0wCwYDVQQKEwRJU0VMMQswCQYDVQQLEwJDQzEUMBIGA1UEAxMLSXRlcm1lZGlhdGUwHhcNMTAwNjI1MTc1ODQ5WhcNMzkxMjMxMjM1OTU5WjBCMQswCQYDVQQGEwJQVDENMAsGA1UEChMESVNFTDELMAkGA1UECxMCQ0MxFzAVBgNVBAMTDkx1aXMgR29uY2FsdmVzMIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCpP9acMX69Dbg9ciMLFc5dm1tlpTY9OTNZ/EaCYoGVhh/3+DFgyIbEer6SA24hpREmAhNG9+Ca0AurDPPgb3aKWFY9pj1WcOctis0VsR0YvzqP+2IGFqKDCd7bXFvv2tI0dEvpdc0oO6PFQ02xvJG0kxQf44XljOCjUBU43jkJawIDAQABo28wbTBrBgNVHQEEZDBigBBdbbL4pDKLT56PpOpA/56toTwwOjELMAkGA1UEBhMCUFQxDTALBgNVBAoTBElTRUwxCzAJBgNVBAsTAkNDMQ8wDQYDVQQDEwZUZXN0Q0GCEN00x9qe7SuWQvpLK0/oay8wCQYFKw4DAh0FAAOBgQBSma8g9dQjiQo4WUljRRuGyMUVRyCqW/9oRz8+0EoLNR/AhrIlGqdNbqQ1BkncgNNdqMAus5VD34v/EhgrkgWN5fZajMpYsmcRAhu4PzJ6hggAlWWMy245JwIYuV0s1Oi39GVTxVNOBIX//AONZlGWO4S2Psb1mqdZ99b/MugsaA==";
// var bufCert = new Buffer(b64Cert, "base64");
// var uaCert = new Uint8Array(bufCert.length);
// for (var i = 0; i < bufCert.length; i++)
//     uaCert[i] = bufCert[i];

// var asn1 = org.pkijs.fromBER(uaCert.buffer);
// var cert_simpl = new org.pkijs.simpl.CERT({ schema: asn1.result });

// console.log(cert_simpl);

// var asn1_publicKey = org.pkijs.fromBER(cert_simpl.subjectPublicKeyInfo.subjectPublicKey.value_block.value_hex);
// var rsa_publicKey_simple = new org.pkijs.simpl.x509.RSAPublicKey({ schema: asn1_publicKey.result });
// var modulus_view = new Uint8Array(rsa_publicKey_simple.modulus.value_block.value_hex);
// var public_exponent_view = new Uint8Array(rsa_publicKey_simple.publicExponent.value_block.value_hex);
// if (modulus_view[0] === 0x00)
//     modulus_view = modulus_view.slice(1);
// console.log(modulus_view.length * 8);
// console.log(new Buffer(modulus_view).toString("hex"));
// var b64uModulus = new Buffer(modulus_view).toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/\=/g, "");
// var b64uPublicExponent = new Buffer(public_exponent_view).toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/\=/g, "");

// var jwkRsa = {   //this is an example jwk key, other key types are Uint8Array objects
//     kty: "RSA",
//     e: b64uPublicExponent,
//     n: b64uModulus,
//     alg: "RS256",
//     ext: true,
// }

// console.log(JSON.stringify(jwkRsa));

// console.log(new Buffer(modulus_view).toString("hex"));
// console.log(new Buffer(public_exponent_view).toString("hex"));