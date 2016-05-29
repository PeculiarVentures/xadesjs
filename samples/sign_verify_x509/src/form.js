// const
var RSA = "RSA";
var EC = "EC";
var X509_COMMON_DEFAULT = "Test"

// IDs
var RSA_PARAMS = "rsa_params";
var EC_PARAMS = "ec_params";
var RSA_MODULUS_LENGTH = "rsa_modulus_length";
var RSA_PUBLIC_EXPONENT = "rsa_public_exponent";
var EC_NAMED_CURVE = "ec_named_curve";
var X509_COMMON = "x509_common";
var X509_COUNTRY = "x509_country";
var X509_STATE = "x509_state";
var X509_LOCALITY = "x509_locality";
var X509_ORGANIZATION = "x509_organization";
var DIGEST = "digest";
var XML_URI = "xml_uri";
var XML_FILE = "xml_file";
var XML_DOCUMENT = "xml_document";
var OUTPUT_KEY = "output_key";
var ASN1_KEY = "asn1_key";
var ASN1_CERT = "asn1_cert";
var OUTPUT_CERTIFICATE = "output_certificate";
var OUTPUT_XML = "output_xml";
var XML_ALEKSEY = "xml_aleksey";
var OUTPUT = "output";

// Parameters
var keyType = RSA;
var signedXml = "";
var key_raw = null;
var cert_raw = null;

// Functions
function selectKeyGen() {
    keyType = this.value;
    console.log("Prams changed:KeyType:", keyType);

    var rsa_params = document.getElementById(RSA_PARAMS);
    var ec_params = document.getElementById(EC_PARAMS);

    if (keyType === RSA) {
        rsa_params.hidden = false;
        ec_params.hidden = true;
    }
    else {
        rsa_params.hidden = true;
        ec_params.hidden = false;
    }
}

function generateKey() {
    var error = "Cann't generate. Unknown key type in use.";

    return new Promise(function (resolve, reject) {
        switch (keyType) {
            case RSA:
                console.log("Generate: Key RSA");

                // Digest alg name
                var digest_name = document.getElementById(DIGEST).value
                // Modulus length
                var modulus_length = +document.getElementById(RSA_MODULUS_LENGTH).value;
                // Public exponent
                var public_exponent = document.getElementById(RSA_PUBLIC_EXPONENT).value === "1" ? new Uint8Array([3]) : new Uint8Array([1, 0, 1]);

                window.crypto.subtle.generateKey(
                    {
                        name: "RSASSA-PKCS1-v1_5",
                        hash: {
                            name: digest_name
                        },
                        modulusLength: modulus_length,
                        publicExponent: public_exponent
                    },
                    true,
                    ["sign", "verify"]
                ).then(resolve, reject);
                break;
            case EC:
                console.log("Generate: Key ECDSA");

                // Named curve
                var named_curve = document.getElementById(EC_NAMED_CURVE).value;

                window.crypto.subtle.generateKey(
                    {
                        name: "ECDSA",
                        namedCurve: named_curve
                    },
                    true,
                    ["sign", "verify"]
                ).then(resolve, reject);
                break;
            default:
                reject(new Error(error))
        }
    })
}

function getX500Name() {
    var x500Name = {};
    x500Name.common = document.getElementById(X509_COMMON).value || X509_COMMON_DEFAULT;
    x500Name.country = document.getElementById(X509_COUNTRY).value || null;
    x500Name.state = document.getElementById(X509_STATE).value || null;
    x500Name.locality = document.getElementById(X509_LOCALITY).value || null;
    x500Name.organization = document.getElementById(X509_ORGANIZATION).value || null;
    return x500Name;
}

function getXmlHttp() {
    var xmlhttp;
    try {
        xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
    } catch (e) {
        try {
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        } catch (E) {
            xmlhttp = false;
        }
    }
    if (!xmlhttp && typeof XMLHttpRequest != 'undefined') {
        xmlhttp = new XMLHttpRequest();
    }
    return xmlhttp;
}

function getXmlDocument() {
    return new Promise(function (resolve, reject) {
        var xml_source = document.querySelector("input[name=xml-document]:checked")
        switch (xml_source.id) {
            case "r1":
                var uri = document.getElementById(XML_URI).value;
                var xmlhttp = getXmlHttp()
                xmlhttp.open('GET', uri, true);
                xmlhttp.onreadystatechange = function () {
                    if (xmlhttp.readyState == 4) {
                        if (xmlhttp.status == 200) {
                            response(xmlhttp.responseText);
                        }
                        else {
                            reject(new Error("XMLHttpRequest:" + xmlhttp.statusText));
                        }
                    }
                };
                xmlhttp.send(null);
                break;
            case "r2":
                var file = document.getElementById(XML_FILE).files[0];
                if (!file)
                    throw new Error("No one file is selected");
                // Check for the various File API support.
                if (window.File && window.FileReader && window.FileList && window.Blob) {
                    var r = new FileReader();
                    r.onload = function (e) {
                        resolve(e.target.result);
                    }
                    r.readAsText(file);
                } else {
                    alert('The File APIs are not fully supported by your browser.');
                }
                break;
            case "r3":
                resolve(document.getElementById(XML_DOCUMENT).value);
                break;
            default:
                throw new Error("Unknown type of selected XML document");
        }
    });
}

function sign() {
    var keyPair;
    var result_key = [];
    var result_cert = [];
    generateKey()
        .then(function (kp) {
            keyPair = kp;
            return crypto.subtle.exportKey("pkcs8", keyPair.privateKey);
        })
        .then(function (pkcs8) {
            result_key.push(formatPEM(pkcs8, "PRIVATE KEY"));
            key_raw = pkcs8;

            console.log("Private key exported successfully!");

            // X500 name
            var x500Name = getX500Name();
            // Digest alg name
            var digest_name = document.getElementById(DIGEST).value

            return generateX509(x500Name, keyPair, digest_name);
        })
        .then(function (cert) {
            cert_raw = cert.toSchema(true).toBER(false);

            result_cert.push(formatPEM(cert_raw, "CERTIFICATE"));

            console.log("Certificate created successfully!");
            return getXmlDocument();
        })
        .then(function (xmlString) {
            // get signing algorithm
            var alg = null;
            switch (keyType) {
                case RSA:
                    alg = {
                        name: "RSASSA-PKCS1-v1_5",
                        hash: {
                            name: document.getElementById(DIGEST).value
                        }
                    };
                    break;
                case EC:
                    alg = {
                        name: "ECDSA",
                        hash: {
                            name: document.getElementById(DIGEST).value
                        }
                    };
                    break;
                default:
                    throw new Error("Unknown key type in use");
            }

            return SignXml(xmlString, keyPair, alg, cert_raw);
        })
        .then(function (_signedXml) {
            console.log("Signing XML document: Ok");
            signedXml = _signedXml

            // Print information

            //KEY
            var output_key = document.getElementById(OUTPUT_KEY);
            output_key.value = result_key.join("\r\n");
            var asn1_key = document.getElementById(ASN1_KEY);
            asn1_key.href = "http://lapo.it/asn1js/#" + bufferToHEX(key_raw);

            //CERTIFICATE
            var output_cert = document.getElementById(OUTPUT_CERTIFICATE);
            output_cert.value = result_cert.join("\r\n");
            var asn1_cert = document.getElementById(ASN1_CERT);
            asn1_cert.href = "http://lapo.it/asn1js/#" + bufferToHEX(cert_raw);

            //XML
            var output_xml = document.getElementById(OUTPUT_XML);
            output_xml.value = signedXml;
            // Prism.highlightElement(output_xml)

            // set value for online verifing
            let xml_aleksey = document.getElementById(XML_ALEKSEY);
            xml_aleksey.value = signedXml;

            // show output
            document.getElementById(OUTPUT).hidden = false;
            var url = location.href.replace(/(#.+)/, "");               
            location.href = url + "#" + OUTPUT;
        })
        .catch(function (e) {
            console.error(e);
            alert("Error: " + e.message);
        })
}

function verify() {
    // get signed XML from input field
    var _signedXml = document.getElementById(OUTPUT_XML).value;
    VerifyXml(_signedXml)
        .then(function (v) {
            alert("Signed XML document has " + (v ? "valid" : "wrong") + " signature");
        })
        .catch(function (e) {
            console.error(e);
            alert("Error: " + e.message);
        })
}