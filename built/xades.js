var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/// <reference path="../typings/xmldom/xmldom.d.ts" />
/// <reference path="./typings/promise.d.ts" />
/// <reference path="./typings/xpath.d.ts" /> 
var XMLSerializer = XMLSerializer || require("xmldom").XMLSerializer;
var DOMParser = DOMParser || require("xmldom").DOMParser;
var DOMImplementation = DOMImplementation || require("xmldom").DOMImplementation;
var document = document || new DOMImplementation().createDocument("http://www.w3.org/1999/xhtml", "html", null);
// PKIjs
var org = org || null;
if (!org) {
    var merge = require("node.extend");
    var co = require("co");
    var common = require("pkijs/org/pkijs/common");
    var _asn1js = require("asn1js");
    var _pkijs = require("pkijs");
    var _x509schema = require("pkijs/org/pkijs/x509_schema");
    var asn1js = merge(true, _asn1js, common);
    var x509schema = merge(true, _x509schema, asn1js);
    var pkijs_1 = merge(true, _pkijs, asn1js);
    var pkijs_2 = merge(true, pkijs_1, co);
    org = merge(true, pkijs_1, x509schema).org;
}
function SelectNodesEx(node, xpath) {
    var doc = node.ownerDocument == null ? node : node.ownerDocument;
    var nsResolver = document.createNSResolver(node.ownerDocument == null ? node.documentElement : node.ownerDocument.documentElement);
    var personIterator = doc.evaluate(xpath, node, nsResolver, XPathResult.ANY_TYPE, null);
    var ns = [];
    var n;
    while (n = personIterator.iterateNext())
        ns.push(n);
    return ns;
}
var select = (typeof module === "undefined") ? SelectNodesEx : require("xpath.js");
var xadesjs;
(function (xadesjs) {
    function printf(text) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var msg = text;
        var regFind = /[^%](%\d+)/g;
        var match = null;
        var matches = [];
        while (match = regFind.exec(msg)) {
            matches.push({ arg: match[1], index: match.index });
        }
        // replace matches
        for (var i = matches.length - 1; i >= 0; i--) {
            var item = matches[i];
            var arg = item.arg.substring(1);
            var index = item.index + 1;
            msg = msg.substring(0, index) + arguments[+arg] + msg.substring(index + 1 + arg.length);
        }
        // convert %% -> %
        msg = msg.replace("%%", "%");
        return msg;
    }
    function padNum(num, size) {
        var s = num + "";
        while (s.length < size)
            s = "0" + s;
        return s;
    }
    var XmlError = (function (_super) {
        __extends(XmlError, _super);
        function XmlError(code) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            _super.call(this);
            var _code = code;
            arguments[0] = xes[_code];
            var message = printf.apply(this, arguments);
            this.message = "XADESJS" + padNum(_code, 4) + ": " + message;
            this.stack = (new Error(this.message)).stack;
        }
        return XmlError;
    }(Error));
    xadesjs.XmlError = XmlError;
    (function (XE) {
        XE[XE["NONE"] = 0] = "NONE";
        XE[XE["NULL_REFERENCE"] = 1] = "NULL_REFERENCE";
        XE[XE["METHOD_NOT_IMPLEMENTED"] = 2] = "METHOD_NOT_IMPLEMENTED";
        XE[XE["METHOD_NOT_SUPPORTED"] = 3] = "METHOD_NOT_SUPPORTED";
        XE[XE["PARAM_REQUIRED"] = 4] = "PARAM_REQUIRED";
        XE[XE["CONVERTER_UNSUPPORTED"] = 5] = "CONVERTER_UNSUPPORTED";
        XE[XE["ELEMENT_MALFORMED"] = 6] = "ELEMENT_MALFORMED";
        XE[XE["CRYPTOGRAPHIC"] = 7] = "CRYPTOGRAPHIC";
        XE[XE["CRYPTOGRAPHIC_NO_MODULE"] = 8] = "CRYPTOGRAPHIC_NO_MODULE";
        XE[XE["CRYPTOGRAPHIC_UNKNOWN_TRANSFORM"] = 9] = "CRYPTOGRAPHIC_UNKNOWN_TRANSFORM";
        XE[XE["ALGORITHM_NOT_SUPPORTED"] = 10] = "ALGORITHM_NOT_SUPPORTED";
        XE[XE["ALGORITHM_WRONG_NAME"] = 11] = "ALGORITHM_WRONG_NAME";
        XE[XE["XML_EXCEPTION"] = 12] = "XML_EXCEPTION";
    })(xadesjs.XE || (xadesjs.XE = {}));
    var XE = xadesjs.XE;
    var xes = {};
    xes[XE.NONE] = "No decription";
    xes[XE.NULL_REFERENCE] = "Null reference";
    xes[XE.METHOD_NOT_IMPLEMENTED] = "Method is not implemented";
    xes[XE.METHOD_NOT_SUPPORTED] = "Method is not supported";
    xes[XE.PARAM_REQUIRED] = "Required parameter is missing '%1'";
    xes[XE.CONVERTER_UNSUPPORTED] = "Converter is not supported";
    xes[XE.ELEMENT_MALFORMED] = "Malformed element '%1'";
    xes[XE.CRYPTOGRAPHIC] = "Cryptographic error: %1";
    xes[XE.CRYPTOGRAPHIC_NO_MODULE] = "WebCrypto module is not found";
    xes[XE.CRYPTOGRAPHIC_UNKNOWN_TRANSFORM] = "Unknown transform %1";
    xes[XE.ALGORITHM_NOT_SUPPORTED] = "Algorithm is not supported '%1'";
    xes[XE.ALGORITHM_WRONG_NAME] = "Algorithm wrong name in use '%1'";
    xes[XE.XML_EXCEPTION] = "XML exception: %1";
})(xadesjs || (xadesjs = {}));
var xadesjs;
(function (xadesjs) {
    var _crypto = null;
    var Application = (function () {
        function Application() {
        }
        /**
         * Sets crypto engine for the current Application
         * @param  {string} name
         * @param  {Crypto} crypto
         * @returns void
         */
        Application.setEngine = function (name, crypto) {
            _crypto = crypto;
            _crypto.name = name;
        };
        Object.defineProperty(Application, "crypto", {
            /**
             * Gets the crypto module from the Application
             */
            get: function () {
                if (!_crypto)
                    throw new xadesjs.XmlError(xadesjs.XE.CRYPTOGRAPHIC_NO_MODULE);
                return _crypto;
            },
            enumerable: true,
            configurable: true
        });
        Application.isNodePlugin = function () {
            return (typeof module !== "undefined");
        };
        return Application;
    }());
    xadesjs.Application = Application;
    // set default w3 WebCrypto
    +function init() {
        if (!Application.isNodePlugin()) {
            Application.setEngine("W3 WebCrypto module", window.crypto);
        }
    }();
})(xadesjs || (xadesjs = {}));
var xadesjs;
(function (xadesjs) {
    (function (XmlNodeType) {
        XmlNodeType[XmlNodeType["None"] = 0] = "None";
        XmlNodeType[XmlNodeType["Element"] = 1] = "Element";
        XmlNodeType[XmlNodeType["Attribute"] = 2] = "Attribute";
        XmlNodeType[XmlNodeType["Text"] = 3] = "Text";
        XmlNodeType[XmlNodeType["CDATA"] = 4] = "CDATA";
        XmlNodeType[XmlNodeType["EntityReference"] = 5] = "EntityReference";
        XmlNodeType[XmlNodeType["Entity"] = 6] = "Entity";
        XmlNodeType[XmlNodeType["ProcessingInstruction"] = 7] = "ProcessingInstruction";
        XmlNodeType[XmlNodeType["Comment"] = 8] = "Comment";
        XmlNodeType[XmlNodeType["Document"] = 9] = "Document";
        // provides access to the entire XML document.        
        XmlNodeType[XmlNodeType["DocumentType"] = 10] = "DocumentType";
        XmlNodeType[XmlNodeType["DocumentFragment"] = 11] = "DocumentFragment";
        XmlNodeType[XmlNodeType["Notation"] = 12] = "Notation";
        XmlNodeType[XmlNodeType["Whitespace"] = 13] = "Whitespace";
        XmlNodeType[XmlNodeType["SignificantWhitespace"] = 14] = "SignificantWhitespace";
        // or white space within the xml:space="preserve" scope.
        XmlNodeType[XmlNodeType["EndElement"] = 15] = "EndElement";
        XmlNodeType[XmlNodeType["EndEntity"] = 16] = "EndEntity";
        // replacement as a result of a call to XmlReader.ResolveEntity()
        XmlNodeType[XmlNodeType["XmlDeclaration"] = 17] = "XmlDeclaration";
    })(xadesjs.XmlNodeType || (xadesjs.XmlNodeType = {}));
    var XmlNodeType = xadesjs.XmlNodeType;
    var XmlObject = (function () {
        function XmlObject() {
            this.m_prefix = xadesjs.XmlSignature.DefaultPrefix;
        }
        Object.defineProperty(XmlObject.prototype, "Prefix", {
            get: function () {
                return this.m_prefix;
            },
            set: function (value) {
                this.m_prefix = value;
            },
            enumerable: true,
            configurable: true
        });
        XmlObject.prototype.GetPrefix = function () {
            return (this.Prefix) ? this.m_prefix + ":" : "";
        };
        XmlObject.prototype.GetXml = function (document) {
            if (document === void 0) { document = null; }
            throw new xadesjs.XmlError(xadesjs.XE.METHOD_NOT_IMPLEMENTED);
        };
        XmlObject.prototype.LoadXml = function (node) {
            throw new xadesjs.XmlError(xadesjs.XE.METHOD_NOT_IMPLEMENTED);
        };
        XmlObject.prototype.toString = function () {
            var xml = this.GetXml();
            return new XMLSerializer().serializeToString(xml);
        };
        XmlObject.prototype.getAttribute = function (xel, attribute) {
            if (xel.hasAttribute(attribute))
                return xel.getAttribute(attribute);
            return null;
        };
        XmlObject.prototype.GetElementById = function (document, idValue) {
            if ((document == null) || (idValue == null))
                return null;
            // this works only if there's a DTD or XSD available to define the ID
            var xel = document.getElementById(idValue);
            if (xel == null) {
                // search an "undefined" ID
                xel = xadesjs.SelectSingleNode(document, "//*[@Id='" + idValue + "']");
                if (xel == null) {
                    xel = xadesjs.SelectSingleNode(document, "//*[@ID='" + idValue + "']");
                    if (xel == null) {
                        xel = xadesjs.SelectSingleNode(document, "//*[@id='" + idValue + "']");
                    }
                }
            }
            return xel;
        };
        return XmlObject;
    }());
    xadesjs.XmlObject = XmlObject;
})(xadesjs || (xadesjs = {}));
var xadesjs;
(function (xadesjs) {
    xadesjs.DEFAULT_ROOT_NAME = "xadesjs_root";
    function IsEqualsEmptyStrings(s1, s2) {
        // If values is null or undefined, set valute to ""
        var _s1 = (s1) ? s1 : "";
        var _s2 = (s2) ? s2 : "";
        return _s1 === _s2;
    }
    xadesjs.IsEqualsEmptyStrings = IsEqualsEmptyStrings;
    /**
     * Creates new instance of XmlDocument with given name of root element
     * @param  {string} root Name of root element
     * @param  {string} namespaceUri
     * @param  {string} prefix
     * @returns Document
     */
    function CreateDocument(root, namespaceUri, prefix) {
        if (root === void 0) { root = xadesjs.DEFAULT_ROOT_NAME; }
        if (namespaceUri === void 0) { namespaceUri = xadesjs.XmlSignature.NamespaceURI; }
        if (prefix === void 0) { prefix = xadesjs.XmlSignature.Prefix; }
        var name_prefix = "", ns_prefix = "", namespace_uri = "";
        if (prefix) {
            name_prefix = prefix + ":";
            ns_prefix = ":" + prefix;
        }
        if (namespaceUri) {
            namespace_uri = " xmlns" + ns_prefix + "=\"" + namespaceUri + "\"";
        }
        var name = "" + name_prefix + root;
        var doc = new DOMParser().parseFromString("<" + name + namespace_uri + "></" + name + ">", xadesjs.APPLICATION_XML);
        return doc;
    }
    xadesjs.CreateDocument = CreateDocument;
    /**
     * Returns signle Node from given Node
     * @param  {Node} node
     * @param  {string} path
     * @returns Node
     */
    function SelectSingleNode(node, path) {
        var ns = select(node, path);
        if (ns && ns.length > 0)
            return ns[0];
        return null;
    }
    xadesjs.SelectSingleNode = SelectSingleNode;
    function findAttr(node, localName, nameSpace) {
        for (var i = 0; i < node.attributes.length; i++) {
            var attr = node.attributes[i];
            if (attrEqualsExplicitly(attr, localName, nameSpace) || attrEqualsImplicitly(attr, localName, nameSpace, node)) {
                return attr;
            }
        }
        return null;
    }
    xadesjs.findAttr = findAttr;
    function findFirst(doc, xpath) {
        var nodes = select(doc, xpath);
        if (nodes.length === 0)
            throw "could not find xpath " + xpath;
        return nodes[0];
    }
    xadesjs.findFirst = findFirst;
    function findChilds(node, localName, nameSpace) {
        node = node.documentElement || node;
        var res = [];
        for (var i = 0; i < node.childNodes.length; i++) {
            var child = node.childNodes[i];
            if (child.localName === localName && (child.namespaceURI === nameSpace || !nameSpace)) {
                res.push(child);
            }
        }
        return res;
    }
    xadesjs.findChilds = findChilds;
    function attrEqualsExplicitly(attr, localName, nameSpace) {
        return attr.localName === localName && (attr.namespaceURI === nameSpace || !nameSpace);
    }
    function attrEqualsImplicitly(attr, localName, nameSpace, node) {
        return attr.localName === localName && ((!attr.namespaceURI && node.namespaceURI === nameSpace) || !nameSpace);
    }
    var xml_special_to_encoded_attribute = {
        "&": "&amp;",
        "<": "&lt;",
        "\"": "&quot;",
        "\r": "&#xD;",
        "\n": "&#xA;",
        "\t": "&#x9;"
    };
    var xml_special_to_encoded_text = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        "\r": "&#xD;"
    };
    function encodeSpecialCharactersInAttribute(attributeValue) {
        return attributeValue
            .replace(/[\r\n\t ]+/g, " ") // White space normalization (Note: this should normally be done by the xml parser) See: https://www.w3.org/TR/xml/#AVNormalize
            .replace(/([&<"\r\n\t])/g, function (str, item) {
            // Special character normalization. See:
            // - https://www.w3.org/TR/xml-c14n#ProcessingModel (Attribute Nodes)
            // - https://www.w3.org/TR/xml-c14n#Example-Chars
            return xml_special_to_encoded_attribute[item];
        });
    }
    xadesjs.encodeSpecialCharactersInAttribute = encodeSpecialCharactersInAttribute;
    function encodeSpecialCharactersInText(text) {
        return text
            .replace(/\r\n?/g, "\n") // Line ending normalization (Note: this should normally be done by the xml parser). See: https://www.w3.org/TR/xml/#sec-line-ends
            .replace(/([&<>\r])/g, function (str, item) {
            // Special character normalization. See:
            // - https://www.w3.org/TR/xml-c14n#ProcessingModel (Text Nodes)
            // - https://www.w3.org/TR/xml-c14n#Example-Chars
            return xml_special_to_encoded_text[item];
        });
    }
    xadesjs.encodeSpecialCharactersInText = encodeSpecialCharactersInText;
    function _SelectNamespaces(node, selectedNodes) {
        if (selectedNodes === void 0) { selectedNodes = {}; }
        if (node.namespaceURI !== "http://www.w3.org/XML/1998/namespace")
            selectedNodes[node.prefix ? node.prefix : ""] = node.namespaceURI;
        for (var i = 0; i < node.childNodes.length; i++) {
            var _node = node.childNodes.item(i);
            if (_node.nodeType === xadesjs.XmlNodeType.Element)
                _SelectNamespaces(_node, selectedNodes);
        }
    }
    function SelectNamespaces(node) {
        var attrs = {};
        _SelectNamespaces(node, attrs);
        return attrs;
    }
    xadesjs.SelectNamespaces = SelectNamespaces;
})(xadesjs || (xadesjs = {}));
var xadesjs;
(function (xadesjs) {
    var Convert = (function () {
        function Convert() {
        }
        Convert.ToBase64UrlString = function (text) {
            return this.ToBase64String(text).replace(/\+/g, "-").replace(/\//g, "_").replace(/\=/g, "");
        };
        Convert.FromBase64UrlString = function (base64UrlText) {
            return this.FromBase64String(this.Base64UrlToBase64(base64UrlText));
        };
        Convert.ToBase64String = function (text) {
            if (typeof btoa !== "undefined") {
                return btoa(text);
            }
            else if (typeof Buffer !== "undefined") {
                return new Buffer(text, "binary").toString("base64");
            }
            else {
                throw new xadesjs.XmlError(xadesjs.XE.CONVERTER_UNSUPPORTED);
            }
        };
        Convert.FromBase64String = function (base64Text) {
            // Prepare string
            base64Text = base64Text.replace(/\n/g, "").replace(/\r/g, "").replace(/\t/g, "").replace(/\s/g, "");
            if (typeof atob !== "undefined") {
                return atob(base64Text);
            }
            else if (typeof Buffer !== "undefined") {
                return new Buffer(base64Text, "base64").toString("binary");
            }
            else {
                throw new xadesjs.XmlError(xadesjs.XE.CONVERTER_UNSUPPORTED);
            }
        };
        Convert.Base64Padding = function (base64) {
            var padCount = 4 - (base64.length % 4);
            if (padCount < 4)
                for (var i = 0; i < padCount; i++)
                    base64 += "=";
            return base64;
        };
        Convert.Base64UrlToBase64 = function (base64url) {
            return this.Base64Padding(base64url.replace(/\-/g, "+").replace(/\_/g, "/"));
        };
        Convert.Base64ToBase64Url = function (base64) {
            return base64.replace(/\+/g, "-").replace(/\//g, "_");
        };
        Convert.ToBufferUtf8String = function (text) {
            var s = unescape(encodeURIComponent(text)), uintArray = new Uint8Array(s.length);
            for (var i = 0; i < s.length; i++) {
                uintArray[i] = s.charCodeAt(i);
            }
            return uintArray;
        };
        Convert.FromBufferUtf8String = function (buffer) {
            var encodedString = String.fromCharCode.apply(null, buffer), decodedString = decodeURIComponent(escape(atob(encodedString)));
            return decodedString;
        };
        Convert.ToBufferString = function (text) {
            var stringLength = text.length;
            var resultView = new Uint8Array(stringLength);
            for (var i = 0; i < stringLength; i++)
                resultView[i] = text.charCodeAt(i);
            return resultView;
        };
        Convert.FromBufferString = function (buffer) {
            var result_string = "";
            if (buffer instanceof ArrayBuffer)
                buffer = new Uint8Array(buffer);
            for (var i = 0; i < buffer.length; i++)
                result_string = result_string + String.fromCharCode(buffer[i]);
            return result_string;
        };
        Convert.ToHex = function (buffer) {
            var splitter = "";
            var u8buf = new Uint8Array(buffer);
            var res = [];
            for (var i = 0; i < u8buf.length; i++) {
                var char = u8buf[i].toString(16);
                res.push(char.length === 1 ? "0" + char : char);
            }
            return res.join(splitter);
        };
        Convert.ToDateTime = function (dateTime) {
            return new Date(dateTime);
        };
        Convert.FromDateTime = function (dateTime) {
            var str = dateTime.toISOString();
            return str;
        };
        return Convert;
    }());
    xadesjs.Convert = Convert;
})(xadesjs || (xadesjs = {}));
var xadesjs;
(function (xadesjs) {
    var XmlAlgorithm = (function () {
        function XmlAlgorithm() {
        }
        XmlAlgorithm.prototype.getAlgorithmName = function () {
            return this.xmlNamespace;
        };
        return XmlAlgorithm;
    }());
    xadesjs.XmlAlgorithm = XmlAlgorithm;
    var HashAlgorithm = (function (_super) {
        __extends(HashAlgorithm, _super);
        function HashAlgorithm() {
            _super.apply(this, arguments);
        }
        HashAlgorithm.prototype.getHash = function (xml) {
            // console.log("HashedInfo:", xml);
            return xadesjs.Application.crypto.subtle.digest(this.algorithm, xadesjs.Convert.ToBufferUtf8String(xml));
        };
        return HashAlgorithm;
    }(XmlAlgorithm));
    xadesjs.HashAlgorithm = HashAlgorithm;
    var SignatureAlgorithm = (function (_super) {
        __extends(SignatureAlgorithm, _super);
        function SignatureAlgorithm() {
            _super.apply(this, arguments);
        }
        /**
         * Sign the given string using the given key
         */
        SignatureAlgorithm.prototype.getSignature = function (signedInfo, signingKey, algorithm) {
            return xadesjs.Application.crypto.subtle.sign(algorithm, signingKey, xadesjs.Convert.ToBufferString(signedInfo));
        };
        /**
        * Verify the given signature of the given string using key
        */
        SignatureAlgorithm.prototype.verifySignature = function (signedInfo, key, signatureValue, algorithm) {
            var _signatureValue = xadesjs.Convert.ToBufferString(signatureValue);
            // console.log("SignatureValue:", Convert.ToBase64String(Convert.FromBufferString(_signatureValue)));
            var _signedInfo = xadesjs.Convert.ToBufferUtf8String(signedInfo);
            // console.log("SignedInfo:", Convert.FromBufferString(_signedInfo));
            return xadesjs.Application.crypto.subtle.verify(algorithm || this.algorithm, key, _signatureValue, _signedInfo);
        };
        return SignatureAlgorithm;
    }(XmlAlgorithm));
    xadesjs.SignatureAlgorithm = SignatureAlgorithm;
})(xadesjs || (xadesjs = {}));
var xadesjs;
(function (xadesjs) {
    xadesjs.SHA1 = "SHA-1";
    xadesjs.SHA224 = "SHA-224";
    xadesjs.SHA256 = "SHA-256";
    xadesjs.SHA384 = "SHA-384";
    xadesjs.SHA512 = "SHA-512";
    xadesjs.SHA1_NAMESPACE = "http://www.w3.org/2000/09/xmldsig#sha1";
    xadesjs.SHA224_NAMESPACE = "http://www.w3.org/2001/04/xmlenc#sha224";
    xadesjs.SHA256_NAMESPACE = "http://www.w3.org/2001/04/xmlenc#sha256";
    xadesjs.SHA384_NAMESPACE = "http://www.w3.org/2001/04/xmlenc#sha384";
    xadesjs.SHA512_NAMESPACE = "http://www.w3.org/2001/04/xmlenc#sha512";
    var Sha1 = (function (_super) {
        __extends(Sha1, _super);
        function Sha1() {
            _super.apply(this, arguments);
            this.algorithm = { name: xadesjs.SHA1 };
            this.xmlNamespace = xadesjs.SHA1_NAMESPACE;
        }
        return Sha1;
    }(xadesjs.HashAlgorithm));
    xadesjs.Sha1 = Sha1;
    var Sha224 = (function (_super) {
        __extends(Sha224, _super);
        function Sha224() {
            _super.apply(this, arguments);
            this.algorithm = { name: xadesjs.SHA224 };
            this.xmlNamespace = xadesjs.SHA224_NAMESPACE;
        }
        return Sha224;
    }(xadesjs.HashAlgorithm));
    xadesjs.Sha224 = Sha224;
    var Sha256 = (function (_super) {
        __extends(Sha256, _super);
        function Sha256() {
            _super.apply(this, arguments);
            this.algorithm = { name: xadesjs.SHA256 };
            this.xmlNamespace = xadesjs.SHA256_NAMESPACE;
        }
        return Sha256;
    }(xadesjs.HashAlgorithm));
    xadesjs.Sha256 = Sha256;
    var Sha384 = (function (_super) {
        __extends(Sha384, _super);
        function Sha384() {
            _super.apply(this, arguments);
            this.algorithm = { name: xadesjs.SHA384 };
            this.xmlNamespace = xadesjs.SHA384_NAMESPACE;
        }
        return Sha384;
    }(xadesjs.HashAlgorithm));
    xadesjs.Sha384 = Sha384;
    var Sha512 = (function (_super) {
        __extends(Sha512, _super);
        function Sha512() {
            _super.apply(this, arguments);
            this.algorithm = { name: xadesjs.SHA512 };
            this.xmlNamespace = xadesjs.SHA512_NAMESPACE;
        }
        return Sha512;
    }(xadesjs.HashAlgorithm));
    xadesjs.Sha512 = Sha512;
})(xadesjs || (xadesjs = {}));
var xadesjs;
(function (xadesjs) {
    xadesjs.RSA_PKCS1 = "RSASSA-PKCS1-v1_5";
    xadesjs.RSA_PKCS1_SHA1_NAMESPACE = "http://www.w3.org/2000/09/xmldsig#rsa-sha1";
    xadesjs.RSA_PKCS1_SHA224_NAMESPACE = "http://www.w3.org/2001/04/xmldsig-more#rsa-sha224";
    xadesjs.RSA_PKCS1_SHA256_NAMESPACE = "http://www.w3.org/2001/04/xmldsig-more#rsa-sha256";
    xadesjs.RSA_PKCS1_SHA384_NAMESPACE = "http://www.w3.org/2001/04/xmldsig-more#rsa-sha384";
    xadesjs.RSA_PKCS1_SHA512_NAMESPACE = "http://www.w3.org/2001/04/xmldsig-more#rsa-sha512";
    var RsaPkcs1Sha1 = (function (_super) {
        __extends(RsaPkcs1Sha1, _super);
        function RsaPkcs1Sha1() {
            _super.apply(this, arguments);
            this.algorithm = {
                name: xadesjs.RSA_PKCS1,
                hash: {
                    name: xadesjs.SHA1
                }
            };
            this.xmlNamespace = xadesjs.RSA_PKCS1_SHA1_NAMESPACE;
        }
        return RsaPkcs1Sha1;
    }(xadesjs.SignatureAlgorithm));
    xadesjs.RsaPkcs1Sha1 = RsaPkcs1Sha1;
    var RsaPkcs1Sha224 = (function (_super) {
        __extends(RsaPkcs1Sha224, _super);
        function RsaPkcs1Sha224() {
            _super.apply(this, arguments);
            this.algorithm = {
                name: xadesjs.RSA_PKCS1,
                hash: {
                    name: xadesjs.SHA224
                }
            };
            this.xmlNamespace = xadesjs.RSA_PKCS1_SHA224_NAMESPACE;
        }
        return RsaPkcs1Sha224;
    }(xadesjs.SignatureAlgorithm));
    xadesjs.RsaPkcs1Sha224 = RsaPkcs1Sha224;
    var RsaPkcs1Sha256 = (function (_super) {
        __extends(RsaPkcs1Sha256, _super);
        function RsaPkcs1Sha256() {
            _super.apply(this, arguments);
            this.algorithm = {
                name: xadesjs.RSA_PKCS1,
                hash: {
                    name: xadesjs.SHA256
                }
            };
            this.xmlNamespace = xadesjs.RSA_PKCS1_SHA256_NAMESPACE;
        }
        return RsaPkcs1Sha256;
    }(xadesjs.SignatureAlgorithm));
    xadesjs.RsaPkcs1Sha256 = RsaPkcs1Sha256;
    var RsaPkcs1Sha384 = (function (_super) {
        __extends(RsaPkcs1Sha384, _super);
        function RsaPkcs1Sha384() {
            _super.apply(this, arguments);
            this.algorithm = {
                name: xadesjs.RSA_PKCS1,
                hash: {
                    name: xadesjs.SHA384
                }
            };
            this.xmlNamespace = xadesjs.RSA_PKCS1_SHA384_NAMESPACE;
        }
        return RsaPkcs1Sha384;
    }(xadesjs.SignatureAlgorithm));
    xadesjs.RsaPkcs1Sha384 = RsaPkcs1Sha384;
    var RsaPkcs1Sha512 = (function (_super) {
        __extends(RsaPkcs1Sha512, _super);
        function RsaPkcs1Sha512() {
            _super.apply(this, arguments);
            this.algorithm = {
                name: xadesjs.RSA_PKCS1,
                hash: {
                    name: xadesjs.SHA512
                }
            };
            this.xmlNamespace = xadesjs.RSA_PKCS1_SHA512_NAMESPACE;
        }
        return RsaPkcs1Sha512;
    }(xadesjs.SignatureAlgorithm));
    xadesjs.RsaPkcs1Sha512 = RsaPkcs1Sha512;
})(xadesjs || (xadesjs = {}));
var xadesjs;
(function (xadesjs) {
    xadesjs.RSA_PSS = "RSA-PSS";
    xadesjs.RSA_PSS_WITH_PARAMS_NAMESPACE = "http://www.w3.org/2007/05/xmldsig-more#rsa-pss";
    xadesjs.RSA_PSS_WITH_PARAMS_MGF1_NAMESPACE = "http://www.w3.org/2007/05/xmldsig-more#MGF1";
    var RsaPssSha1 = (function (_super) {
        __extends(RsaPssSha1, _super);
        function RsaPssSha1() {
            _super.apply(this, arguments);
            this.algorithm = {
                name: xadesjs.RSA_PSS,
                hash: {
                    name: xadesjs.SHA1
                }
            };
            this.xmlNamespace = xadesjs.RSA_PSS_WITH_PARAMS_MGF1_NAMESPACE;
        }
        return RsaPssSha1;
    }(xadesjs.SignatureAlgorithm));
    xadesjs.RsaPssSha1 = RsaPssSha1;
    var RsaPssSha224 = (function (_super) {
        __extends(RsaPssSha224, _super);
        function RsaPssSha224() {
            _super.apply(this, arguments);
            this.algorithm = {
                name: xadesjs.RSA_PSS,
                hash: {
                    name: xadesjs.SHA224
                }
            };
            this.xmlNamespace = xadesjs.RSA_PSS_WITH_PARAMS_MGF1_NAMESPACE;
        }
        return RsaPssSha224;
    }(xadesjs.SignatureAlgorithm));
    xadesjs.RsaPssSha224 = RsaPssSha224;
    var RsaPssSha256 = (function (_super) {
        __extends(RsaPssSha256, _super);
        function RsaPssSha256() {
            _super.apply(this, arguments);
            this.algorithm = {
                name: xadesjs.RSA_PSS,
                hash: {
                    name: xadesjs.SHA256
                }
            };
            this.xmlNamespace = xadesjs.RSA_PSS_WITH_PARAMS_MGF1_NAMESPACE;
        }
        return RsaPssSha256;
    }(xadesjs.SignatureAlgorithm));
    xadesjs.RsaPssSha256 = RsaPssSha256;
    var RsaPssSha384 = (function (_super) {
        __extends(RsaPssSha384, _super);
        function RsaPssSha384() {
            _super.apply(this, arguments);
            this.algorithm = {
                name: xadesjs.RSA_PSS,
                hash: {
                    name: xadesjs.SHA384
                }
            };
            this.xmlNamespace = xadesjs.RSA_PSS_WITH_PARAMS_MGF1_NAMESPACE;
        }
        return RsaPssSha384;
    }(xadesjs.SignatureAlgorithm));
    xadesjs.RsaPssSha384 = RsaPssSha384;
    var RsaPssSha512 = (function (_super) {
        __extends(RsaPssSha512, _super);
        function RsaPssSha512() {
            _super.apply(this, arguments);
            this.algorithm = {
                name: xadesjs.RSA_PSS,
                hash: {
                    name: xadesjs.SHA512
                }
            };
            this.xmlNamespace = xadesjs.RSA_PSS_WITH_PARAMS_MGF1_NAMESPACE;
        }
        return RsaPssSha512;
    }(xadesjs.SignatureAlgorithm));
    xadesjs.RsaPssSha512 = RsaPssSha512;
    var PssAlgorithmParams = (function (_super) {
        __extends(PssAlgorithmParams, _super);
        function PssAlgorithmParams() {
            _super.apply(this, arguments);
        }
        Object.defineProperty(PssAlgorithmParams.prototype, "DigestMethod", {
            get: function () {
                return this.m_digest_method;
            },
            set: function (value) {
                this.m_digest_method = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PssAlgorithmParams.prototype, "SaltLength", {
            get: function () {
                return this.m_salt_length;
            },
            set: function (v) {
                this.m_salt_length = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PssAlgorithmParams.prototype, "MGF", {
            get: function () {
                return this.m_mgf;
            },
            set: function (v) {
                this.m_mgf = v;
            },
            enumerable: true,
            configurable: true
        });
        PssAlgorithmParams.prototype.GetXml = function () {
            if (this.element != null)
                return this.element;
            if (this.DigestMethod == null)
                throw new xadesjs.XmlError(xadesjs.XE.CRYPTOGRAPHIC, "DigestMethod");
            var prefix = this.GetPrefix();
            var ds_prefix = this.dsPrefix ? this.dsPrefix + ":" : "";
            var doc = xadesjs.CreateDocument();
            var xel = doc.createElementNS(xadesjs.XmlSignature.NamespaceURIPss, prefix + xadesjs.XmlSignature.ElementNames.RSAPSSParams);
            var dsDigestMethod = doc.createElementNS(xadesjs.XmlSignature.NamespaceURI, ds_prefix + xadesjs.XmlSignature.ElementNames.DigestMethod);
            dsDigestMethod.setAttribute(xadesjs.XmlSignature.AttributeNames.Algorithm, this.DigestMethod);
            xel.appendChild(dsDigestMethod);
            var SaltLength = doc.createElementNS(xadesjs.XmlSignature.NamespaceURIPss, prefix + xadesjs.XmlSignature.ElementNames.SaltLength);
            SaltLength.textContent = this.SaltLength.toString();
            xel.appendChild(SaltLength);
            return xel;
        };
        PssAlgorithmParams.prototype.LoadXml = function (value) {
            if (value == null)
                throw new xadesjs.XmlError(xadesjs.XE.PARAM_REQUIRED, "value");
            if ((value.localName !== xadesjs.XmlSignature.ElementNames.RSAPSSParams) || (value.namespaceURI !== xadesjs.XmlSignature.NamespaceURIPss))
                throw new xadesjs.XmlError(xadesjs.XE.CRYPTOGRAPHIC, "value");
            var digest_mode = xadesjs.XmlSignature.GetChildElement(value, xadesjs.XmlSignature.ElementNames.DigestMethod, xadesjs.XmlSignature.NamespaceURI);
            if (digest_mode)
                this.m_digest_method = digest_mode.getAttribute(xadesjs.XmlSignature.AttributeNames.Algorithm);
            var salt_length = xadesjs.XmlSignature.GetChildElement(value, xadesjs.XmlSignature.ElementNames.SaltLength, xadesjs.XmlSignature.NamespaceURIPss);
            if (salt_length)
                this.m_salt_length = +salt_length.textContent;
            var mgf = xadesjs.XmlSignature.GetChildElement(value, xadesjs.XmlSignature.ElementNames.MaskGenerationFunction, xadesjs.XmlSignature.NamespaceURIPss);
            if (mgf)
                this.m_mgf = mgf.firstChild.getAttribute(xadesjs.XmlSignature.AttributeNames.Algorithm);
            this.element = value;
        };
        return PssAlgorithmParams;
    }(xadesjs.XmlObject));
    xadesjs.PssAlgorithmParams = PssAlgorithmParams;
})(xadesjs || (xadesjs = {}));
var xadesjs;
(function (xadesjs) {
    xadesjs.HMAC_ALGORITHM = "HMAC";
    xadesjs.HMAC_SHA1_NAMESPACE = "http://www.w3.org/2000/09/xmldsig#hmac-sha1";
    xadesjs.HMAC_SHA256_NAMESPACE = "http://www.w3.org/2001/04/xmldsig-more#hmac-sha256";
    xadesjs.HMAC_SHA384_NAMESPACE = "http://www.w3.org/2001/04/xmldsig-more#hmac-sha384";
    xadesjs.HMAC_SHA512_NAMESPACE = "http://www.w3.org/2001/04/xmldsig-more#hmac-sha512";
    var HmacSha1 = (function (_super) {
        __extends(HmacSha1, _super);
        function HmacSha1() {
            _super.apply(this, arguments);
            this.algorithm = {
                name: xadesjs.HMAC_ALGORITHM,
                hash: {
                    name: xadesjs.SHA1
                }
            };
            this.xmlNamespace = xadesjs.HMAC_SHA1_NAMESPACE;
        }
        return HmacSha1;
    }(xadesjs.SignatureAlgorithm));
    xadesjs.HmacSha1 = HmacSha1;
    var HmacSha256 = (function (_super) {
        __extends(HmacSha256, _super);
        function HmacSha256() {
            _super.apply(this, arguments);
            this.algorithm = {
                name: xadesjs.HMAC_ALGORITHM,
                hash: {
                    name: xadesjs.SHA256
                }
            };
            this.xmlNamespace = xadesjs.HMAC_SHA256_NAMESPACE;
        }
        return HmacSha256;
    }(xadesjs.SignatureAlgorithm));
    xadesjs.HmacSha256 = HmacSha256;
    var HmacSha384 = (function (_super) {
        __extends(HmacSha384, _super);
        function HmacSha384() {
            _super.apply(this, arguments);
            this.algorithm = {
                name: xadesjs.HMAC_ALGORITHM,
                hash: {
                    name: xadesjs.SHA384
                }
            };
            this.xmlNamespace = xadesjs.HMAC_SHA384_NAMESPACE;
        }
        return HmacSha384;
    }(xadesjs.SignatureAlgorithm));
    xadesjs.HmacSha384 = HmacSha384;
    var HmacSha512 = (function (_super) {
        __extends(HmacSha512, _super);
        function HmacSha512() {
            _super.apply(this, arguments);
            this.algorithm = {
                name: xadesjs.HMAC_ALGORITHM,
                hash: {
                    name: xadesjs.SHA512
                }
            };
            this.xmlNamespace = xadesjs.HMAC_SHA512_NAMESPACE;
        }
        return HmacSha512;
    }(xadesjs.SignatureAlgorithm));
    xadesjs.HmacSha512 = HmacSha512;
})(xadesjs || (xadesjs = {}));
var xadesjs;
(function (xadesjs) {
    xadesjs.ECDSA_SIGN_ALGORITHM = "ECDSA";
    xadesjs.ECDSA_SHA1_NAMESPACE = "http://www.w3.org/2001/04/xmldsig-more#ecdsa-sha1";
    xadesjs.ECDSA_SHA224_NAMESPACE = "http://www.w3.org/2001/04/xmldsig-more#ecdsa-sha224";
    xadesjs.ECDSA_SHA256_NAMESPACE = "http://www.w3.org/2001/04/xmldsig-more#ecdsa-sha256";
    xadesjs.ECDSA_SHA384_NAMESPACE = "http://www.w3.org/2001/04/xmldsig-more#ecdsa-sha384";
    xadesjs.ECDSA_SHA512_NAMESPACE = "http://www.w3.org/2001/04/xmldsig-more#ecdsa-sha512";
    var EcdsaSha1 = (function (_super) {
        __extends(EcdsaSha1, _super);
        function EcdsaSha1() {
            _super.apply(this, arguments);
            this.algorithm = {
                name: xadesjs.ECDSA_SIGN_ALGORITHM,
                hash: {
                    name: xadesjs.SHA1
                }
            };
            this.xmlNamespace = xadesjs.ECDSA_SHA1_NAMESPACE;
        }
        return EcdsaSha1;
    }(xadesjs.SignatureAlgorithm));
    xadesjs.EcdsaSha1 = EcdsaSha1;
    var EcdsaSha224 = (function (_super) {
        __extends(EcdsaSha224, _super);
        function EcdsaSha224() {
            _super.apply(this, arguments);
            this.algorithm = {
                name: xadesjs.ECDSA_SIGN_ALGORITHM,
                hash: {
                    name: xadesjs.SHA224
                }
            };
            this.xmlNamespace = xadesjs.ECDSA_SHA224_NAMESPACE;
        }
        return EcdsaSha224;
    }(xadesjs.SignatureAlgorithm));
    xadesjs.EcdsaSha224 = EcdsaSha224;
    var EcdsaSha256 = (function (_super) {
        __extends(EcdsaSha256, _super);
        function EcdsaSha256() {
            _super.apply(this, arguments);
            this.algorithm = {
                name: xadesjs.ECDSA_SIGN_ALGORITHM,
                hash: {
                    name: xadesjs.SHA256
                }
            };
            this.xmlNamespace = xadesjs.ECDSA_SHA256_NAMESPACE;
        }
        return EcdsaSha256;
    }(xadesjs.SignatureAlgorithm));
    xadesjs.EcdsaSha256 = EcdsaSha256;
    var EcdsaSha384 = (function (_super) {
        __extends(EcdsaSha384, _super);
        function EcdsaSha384() {
            _super.apply(this, arguments);
            this.algorithm = {
                name: xadesjs.ECDSA_SIGN_ALGORITHM,
                hash: {
                    name: xadesjs.SHA384
                }
            };
            this.xmlNamespace = xadesjs.ECDSA_SHA384_NAMESPACE;
        }
        return EcdsaSha384;
    }(xadesjs.SignatureAlgorithm));
    xadesjs.EcdsaSha384 = EcdsaSha384;
    var EcdsaSha512 = (function (_super) {
        __extends(EcdsaSha512, _super);
        function EcdsaSha512() {
            _super.apply(this, arguments);
            this.algorithm = {
                name: xadesjs.ECDSA_SIGN_ALGORITHM,
                hash: {
                    name: xadesjs.SHA512
                }
            };
            this.xmlNamespace = xadesjs.ECDSA_SHA512_NAMESPACE;
        }
        return EcdsaSha512;
    }(xadesjs.SignatureAlgorithm));
    xadesjs.EcdsaSha512 = EcdsaSha512;
})(xadesjs || (xadesjs = {}));
var xadesjs;
(function (xadesjs) {
    /**
     * List of OIDs
     * Source: https://msdn.microsoft.com/ru-ru/library/windows/desktop/aa386991(v=vs.85).aspx
     */
    var OID = {
        "2.5.4.3": {
            short: "CN",
            long: "CommonName"
        },
        "2.5.4.6": {
            short: "C",
            long: "Country"
        },
        "2.5.4.5": {
            short: null,
            long: "DeviceSerialNumber"
        },
        "0.9.2342.19200300.100.1.25": {
            short: "DC",
            long: "DomainComponent"
        },
        "1.2.840.113549.1.9.1": {
            short: "E",
            long: "EMail"
        },
        "2.5.4.42": {
            short: "G",
            long: "GivenName"
        },
        "2.5.4.43": {
            short: "I",
            long: "Initials"
        },
        "2.5.4.7": {
            short: "L",
            long: "Locality"
        },
        "2.5.4.10": {
            short: "O",
            long: "Organization"
        },
        "2.5.4.11": {
            short: "OU",
            long: "OrganizationUnit"
        },
        "2.5.4.8": {
            short: "ST",
            long: "State"
        },
        "2.5.4.9": {
            short: "Street",
            long: "StreetAddress"
        },
        "2.5.4.4": {
            short: "SN",
            long: "SurName"
        },
        "2.5.4.12": {
            short: "T",
            long: "Title"
        },
        "1.2.840.113549.1.9.8": {
            short: null,
            long: "UnstructuredAddress"
        },
        "1.2.840.113549.1.9.2": {
            short: null,
            long: "UnstructuredName"
        }
    };
    /**
     * Represents an <X509Certificate> element.
     */
    var X509Certificate = (function () {
        function X509Certificate(rawData) {
            this.publicKey = null;
            if (rawData) {
                this.LoadFromRawData(rawData);
                this.raw = rawData;
            }
        }
        Object.defineProperty(X509Certificate.prototype, "SerialNumber", {
            /**
             * Gets a serial number of the certificate in HEX format
             */
            get: function () {
                return xadesjs.Convert.ToHex(this.cert_simpl.serialNumber.value_block.value_hex);
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Converts X500Name to string
         * @param  {RDN} name X500Name
         * @param  {string} spliter Splitter char. Default ','
         * @returns string Formated string
         * Example:
         * > C=Some name, O=Some organization name, C=RU
         */
        X509Certificate.prototype.NameToString = function (name, spliter) {
            if (spliter === void 0) { spliter = ","; }
            var res = [];
            for (var _i = 0, _a = name.types_and_values; _i < _a.length; _i++) {
                var type_and_value = _a[_i];
                var type = type_and_value.type;
                var name_1 = OID[type].short;
                res.push((name_1 ? name_1 : type) + "=" + type_and_value.value.value_block.value);
            }
            return res.join(spliter + " ");
        };
        Object.defineProperty(X509Certificate.prototype, "Issuer", {
            /**
             * Gets a issuer name of the certificate
             */
            get: function () {
                return this.NameToString(this.cert_simpl.issuer);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(X509Certificate.prototype, "Subject", {
            /**
             * Gets a subject name of the certificate
             */
            get: function () {
                return this.NameToString(this.cert_simpl.subject);
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Returns a thumbrint of the certififcate
         * @param  {DigestAlgorithm="SHA-1"} algName Digest algorithm name
         * @returns PromiseLike
         */
        X509Certificate.prototype.Thumbprint = function (algName) {
            if (algName === void 0) { algName = "SHA-1"; }
            return xadesjs.Application.crypto.subtle.digest(algName, this.raw);
        };
        /**
         * Loads X509Certificate from DER data
         * @param  {Uint8Array} rawData
         */
        X509Certificate.prototype.LoadFromRawData = function (rawData) {
            this.raw = rawData;
            var asn1 = org.pkijs.fromBER(rawData.buffer);
            this.cert_simpl = new org.pkijs.simpl.CERT({ schema: asn1.result });
        };
        Object.defineProperty(X509Certificate.prototype, "PublicKey", {
            /**
             * Gets the public key from the X509Certificate
             */
            get: function () {
                return this.publicKey;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Returns DER raw of X509Certificate
         */
        X509Certificate.prototype.GetRawCertData = function () {
            return this.raw;
        };
        /**
         * Returns public key from X509Certificate
         * @param  {Algorithm} algorithm
         * @returns Promise
         */
        X509Certificate.prototype.exportKey = function (algorithm) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var asn1_publicKey = org.pkijs.fromBER(_this.cert_simpl.subjectPublicKeyInfo.subjectPublicKey.value_block.value_hex);
                var alg_oid = _this.cert_simpl.subjectPublicKeyInfo.algorithm.algorithm_id;
                var jwk = null;
                switch (alg_oid) {
                    // RSA
                    case "1.2.840.113549.1.1.1":
                        var rsa_publicKey_simple = new org.pkijs.simpl.x509.RSAPublicKey({ schema: asn1_publicKey.result });
                        var modulus_view = new Uint8Array(rsa_publicKey_simple.modulus.value_block.value_hex);
                        var public_exponent_view = new Uint8Array(rsa_publicKey_simple.publicExponent.value_block.value_hex);
                        if (modulus_view[0] === 0x00)
                            modulus_view = modulus_view.slice(1);
                        var b64uModulus = xadesjs.Convert.ToBase64UrlString(xadesjs.Convert.FromBufferString(modulus_view));
                        var b64uPublicExponent = xadesjs.Convert.ToBase64UrlString(xadesjs.Convert.FromBufferString(public_exponent_view));
                        var alg = "RS";
                        switch (algorithm.hash.name) {
                            case "SHA-1":
                                alg += "1";
                                break;
                            case "SHA-256":
                                alg += "256";
                                break;
                            case "SHA-516":
                                alg += "516";
                                break;
                        }
                        jwk = {
                            kty: "RSA",
                            e: b64uPublicExponent,
                            n: b64uModulus,
                            alg: alg,
                            ext: true,
                        };
                        break;
                    default:
                        throw new xadesjs.XmlError(xadesjs.XE.ALGORITHM_NOT_SUPPORTED, alg_oid);
                }
                xadesjs.Application.crypto.subtle.importKey("jwk", jwk, algorithm, true, ["verify"])
                    .then(resolve, reject);
            });
        };
        return X509Certificate;
    }());
    xadesjs.X509Certificate = X509Certificate;
})(xadesjs || (xadesjs = {}));
var xadesjs;
(function (xadesjs) {
    (function (X509IncludeOption) {
        X509IncludeOption[X509IncludeOption["None"] = 0] = "None";
        X509IncludeOption[X509IncludeOption["EndCertOnly"] = 1] = "EndCertOnly";
        X509IncludeOption[X509IncludeOption["ExcludeRoot"] = 2] = "ExcludeRoot";
        X509IncludeOption[X509IncludeOption["WholeChain"] = 3] = "WholeChain";
    })(xadesjs.X509IncludeOption || (xadesjs.X509IncludeOption = {}));
    var X509IncludeOption = xadesjs.X509IncludeOption;
    /**
     * Represents an <X509Data> subelement of an XMLDSIG or XML Encryption <KeyInfo> element.
     */
    var KeyInfoX509Data = (function (_super) {
        __extends(KeyInfoX509Data, _super);
        function KeyInfoX509Data(cert, includeOptions) {
            _super.call(this);
            this.key = null;
            if (cert) {
                if (cert instanceof Uint8Array)
                    this.AddCertificate(new xadesjs.X509Certificate(cert));
                else if (cert instanceof xadesjs.X509Certificate) {
                    if (!includeOptions)
                        this.AddCertificate(cert);
                    else {
                        switch (includeOptions) {
                            case X509IncludeOption.None:
                            case X509IncludeOption.EndCertOnly:
                                this.AddCertificate(cert);
                                break;
                            case X509IncludeOption.ExcludeRoot:
                                this.AddCertificatesChainFrom(cert, false);
                                break;
                            case X509IncludeOption.WholeChain:
                                this.AddCertificatesChainFrom(cert, true);
                                break;
                        }
                    }
                }
            }
        }
        Object.defineProperty(KeyInfoX509Data.prototype, "Key", {
            /**
             * Gets public key of the X509Data
             */
            get: function () {
                return this.key;
            },
            enumerable: true,
            configurable: true
        });
        KeyInfoX509Data.prototype.importKey = function (key) {
            return Promise.reject(new xadesjs.XmlError(xadesjs.XE.METHOD_NOT_SUPPORTED));
        };
        /**
         * Exports key from X509Data object
         * @param  {Algorithm} alg
         * @returns Promise
         */
        KeyInfoX509Data.prototype.exportKey = function (alg) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                if (_this.Certificates.length)
                    _this.Certificates[0].exportKey(alg)
                        .then(resolve, reject);
            });
        };
        // this gets complicated because we must:
        // 1. build the chain using a X509Certificate2 class;
        // 2. test for root using the Mono.Security.X509.X509Certificate class;
        // 3. add the certificates as X509Certificate instances;
        KeyInfoX509Data.prototype.AddCertificatesChainFrom = function (cert, root) {
            throw new xadesjs.XmlError(xadesjs.XE.METHOD_NOT_IMPLEMENTED);
        };
        Object.defineProperty(KeyInfoX509Data.prototype, "Certificates", {
            /**
             * Gets a list of the X.509v3 certificates contained in the KeyInfoX509Data object.
             */
            get: function () {
                return this.X509CertificateList;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(KeyInfoX509Data.prototype, "CRL", {
            /**
             * Gets or sets the Certificate Revocation List (CRL) contained within the KeyInfoX509Data object.
             */
            get: function () {
                return this.x509crl;
            },
            set: function (value) {
                this.x509crl = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(KeyInfoX509Data.prototype, "IssuerSerials", {
            /**
             * Gets a list of X509IssuerSerial structures that represent an issuer name and serial number pair.
             */
            get: function () {
                return this.IssuerSerialList;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(KeyInfoX509Data.prototype, "SubjectKeyIds", {
            /**
             * Gets a list of the subject key identifiers (SKIs) contained in the KeyInfoX509Data object.
             */
            get: function () {
                return this.SubjectKeyIdList;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(KeyInfoX509Data.prototype, "SubjectNames", {
            /**
             * Gets a list of the subject names of the entities contained in the KeyInfoX509Data object.
             */
            get: function () {
                return this.SubjectNameList;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Adds the specified X.509v3 certificate to the KeyInfoX509Data.
         * @param  {X509Certificate} certificate
         * @returns void
         */
        KeyInfoX509Data.prototype.AddCertificate = function (certificate) {
            if (certificate == null)
                throw new xadesjs.XmlError(xadesjs.XE.PARAM_REQUIRED, "certificate");
            if (this.X509CertificateList == null)
                this.X509CertificateList = [];
            this.X509CertificateList.push(certificate);
        };
        /**
         * Adds the specified issuer name and serial number pair to the KeyInfoX509Data object.
         * @param  {string} issuerName
         * @param  {string} serialNumber
         * @returns void
         */
        KeyInfoX509Data.prototype.AddIssuerSerial = function (issuerName, serialNumber) {
            if (issuerName == null)
                throw new xadesjs.XmlError(xadesjs.XE.PARAM_REQUIRED, "issuerName");
            if (this.IssuerSerialList == null)
                this.IssuerSerialList = [];
            var xis = { issuerName: issuerName, serialNumber: serialNumber };
            this.IssuerSerialList.push(xis);
        };
        KeyInfoX509Data.prototype.AddSubjectKeyId = function (subjectKeyId) {
            if (this.SubjectKeyIdList == null)
                this.SubjectKeyIdList = [];
            if (typeof subjectKeyId === "string") {
                var id = null;
                if (subjectKeyId != null)
                    id = xadesjs.Convert.ToBufferString(xadesjs.Convert.FromBase64String(subjectKeyId));
                this.SubjectKeyIdList.push(id);
            }
            else {
                this.SubjectKeyIdList.push(subjectKeyId);
            }
        };
        /**
         * Adds the subject name of the entity that was issued an X.509v3 certificate to the KeyInfoX509Data object.
         * @param  {string} subjectName
         * @returns void
         */
        KeyInfoX509Data.prototype.AddSubjectName = function (subjectName) {
            if (this.SubjectNameList == null)
                this.SubjectNameList = [];
            this.SubjectNameList.push(subjectName);
        };
        /**
         * Returns an XML representation of the KeyInfoX509Data object.
         * @returns Element
         */
        KeyInfoX509Data.prototype.GetXml = function () {
            var doc = xadesjs.CreateDocument();
            var xel = doc.createElementNS(xadesjs.XmlSignature.NamespaceURI, xadesjs.XmlSignature.ElementNames.X509Data);
            // FIXME: hack to match MS implementation
            xel.setAttribute("xmlns", xadesjs.XmlSignature.NamespaceURI);
            var prefix = this.GetPrefix();
            // <X509IssuerSerial>
            if ((this.IssuerSerialList != null) && (this.IssuerSerialList.length > 0)) {
                for (var _i = 0, _a = this.IssuerSerialList; _i < _a.length; _i++) {
                    var iser = _a[_i];
                    var isl = doc.createElementNS(xadesjs.XmlSignature.NamespaceURI, prefix + xadesjs.XmlSignature.ElementNames.X509IssuerSerial);
                    var xin = doc.createElementNS(xadesjs.XmlSignature.NamespaceURI, prefix + xadesjs.XmlSignature.ElementNames.X509IssuerName);
                    xin.textContent = iser.issuerName;
                    isl.appendChild(xin);
                    var xsn = doc.createElementNS(xadesjs.XmlSignature.NamespaceURI, prefix + xadesjs.XmlSignature.ElementNames.X509SerialNumber);
                    xsn.textContent = iser.serialNumber;
                    isl.appendChild(xsn);
                    xel.appendChild(isl);
                }
            }
            // <X509SKI>
            if ((this.SubjectKeyIdList != null) && (this.SubjectKeyIdList.length > 0)) {
                for (var _b = 0, _c = this.SubjectKeyIdList; _b < _c.length; _b++) {
                    var skid = _c[_b];
                    var ski = doc.createElementNS(xadesjs.XmlSignature.NamespaceURI, prefix + xadesjs.XmlSignature.ElementNames.X509SKI);
                    ski.textContent = xadesjs.Convert.ToBase64String(xadesjs.Convert.FromBufferString(skid));
                    xel.appendChild(ski);
                }
            }
            // <X509SubjectName>
            if ((this.SubjectNameList != null) && (this.SubjectNameList.length > 0)) {
                for (var _d = 0, _e = this.SubjectNameList; _d < _e.length; _d++) {
                    var subject = _e[_d];
                    var sn = doc.createElementNS(xadesjs.XmlSignature.NamespaceURI, prefix + xadesjs.XmlSignature.ElementNames.X509SubjectName);
                    sn.textContent = subject;
                    xel.appendChild(sn);
                }
            }
            // <X509Certificate>
            if ((this.X509CertificateList != null) && (this.X509CertificateList.length > 0)) {
                for (var _f = 0, _g = this.X509CertificateList; _f < _g.length; _f++) {
                    var x509 = _g[_f];
                    var cert = doc.createElementNS(xadesjs.XmlSignature.NamespaceURI, prefix + xadesjs.XmlSignature.ElementNames.X509Certificate);
                    cert.textContent = xadesjs.Convert.ToBase64String(xadesjs.Convert.FromBufferString(x509.GetRawCertData()));
                    xel.appendChild(cert);
                }
            }
            // only one <X509CRL> 
            if (this.x509crl != null) {
                var crl = doc.createElementNS(xadesjs.XmlSignature.NamespaceURI, prefix + xadesjs.XmlSignature.ElementNames.X509CRL);
                crl.textContent = xadesjs.Convert.ToBase64String(xadesjs.Convert.FromBufferString(this.x509crl));
                xel.appendChild(crl);
            }
            return xel;
        };
        /**
         * Parses the input XmlElement object and configures the internal state of the KeyInfoX509Data object to match.
         * @param  {Element} element
         * @returns void
         */
        KeyInfoX509Data.prototype.LoadXml = function (element) {
            if (element == null)
                throw new xadesjs.XmlError(xadesjs.XE.PARAM_REQUIRED, "element");
            if (this.IssuerSerialList != null)
                this.IssuerSerialList = [];
            if (this.SubjectKeyIdList != null)
                this.SubjectKeyIdList = [];
            if (this.SubjectNameList != null)
                this.SubjectNameList = [];
            if (this.X509CertificateList != null)
                this.X509CertificateList = [];
            this.x509crl = null;
            if ((element.localName !== xadesjs.XmlSignature.ElementNames.X509Data) || (element.namespaceURI !== xadesjs.XmlSignature.NamespaceURI))
                throw new xadesjs.XmlError(xadesjs.XE.CRYPTOGRAPHIC, "element");
            // <X509IssuerSerial>
            var xnl = xadesjs.XmlSignature.GetChildElements(element, xadesjs.XmlSignature.ElementNames.X509IssuerSerial);
            if (xnl != null) {
                for (var _i = 0, xnl_1 = xnl; _i < xnl_1.length; _i++) {
                    var xel = xnl_1[_i];
                    var issuer = xadesjs.XmlSignature.GetChildElement(xel, xadesjs.XmlSignature.ElementNames.X509IssuerName, xadesjs.XmlSignature.NamespaceURI);
                    var serial = xadesjs.XmlSignature.GetChildElement(xel, xadesjs.XmlSignature.ElementNames.X509SerialNumber, xadesjs.XmlSignature.NamespaceURI);
                    this.AddIssuerSerial(issuer.textContent, serial.textContent);
                }
            }
            // <X509SKI>
            xnl = xadesjs.XmlSignature.GetChildElements(element, xadesjs.XmlSignature.ElementNames.X509SKI);
            if (xnl != null) {
                for (var _a = 0, xnl_2 = xnl; _a < xnl_2.length; _a++) {
                    var xel = xnl_2[_a];
                    var skid = xadesjs.Convert.ToBufferString(xadesjs.Convert.FromBase64String(xel.textContent));
                    this.AddSubjectKeyId(skid);
                }
            }
            // <X509SubjectName>
            xnl = xadesjs.XmlSignature.GetChildElements(element, xadesjs.XmlSignature.ElementNames.X509SubjectName);
            if (xnl != null) {
                for (var _b = 0, xnl_3 = xnl; _b < xnl_3.length; _b++) {
                    var xel = xnl_3[_b];
                    this.AddSubjectName(xel.textContent);
                }
            }
            // <X509Certificate>
            xnl = xadesjs.XmlSignature.GetChildElements(element, xadesjs.XmlSignature.ElementNames.X509Certificate);
            if (xnl != null) {
                for (var _c = 0, xnl_4 = xnl; _c < xnl_4.length; _c++) {
                    var xel = xnl_4[_c];
                    var cert = xadesjs.Convert.ToBufferString(xadesjs.Convert.FromBase64String(xel.textContent));
                    this.AddCertificate(new xadesjs.X509Certificate(cert));
                }
            }
            // only one <X509CRL> 
            var x509el = xadesjs.XmlSignature.GetChildElement(element, xadesjs.XmlSignature.ElementNames.X509CRL, xadesjs.XmlSignature.NamespaceURI);
            if (x509el != null) {
                this.x509crl = xadesjs.Convert.ToBufferString(xadesjs.Convert.FromBase64String(x509el.textContent));
            }
        };
        return KeyInfoX509Data;
    }(xadesjs.XmlObject));
    xadesjs.KeyInfoX509Data = KeyInfoX509Data;
})(xadesjs || (xadesjs = {}));
var xadesjs;
(function (xadesjs) {
    /**
     * Represents the <RSAKeyValue> element of an XML signature.
     */
    var RsaKeyValue = (function (_super) {
        __extends(RsaKeyValue, _super);
        function RsaKeyValue() {
            _super.call(this);
            this.m_key = null;
            this.m_element = null;
            this.m_jwk = null;
            this.m_algorithm = null;
            this.m_modulus = null;
            this.m_exponent = null;
            this.m_keyusage = null;
        }
        Object.defineProperty(RsaKeyValue.prototype, "Key", {
            /**
             * Gets or sets the instance of RSA that holds the public key.
             */
            get: function () {
                return this.m_key;
            },
            set: function (value) {
                this.m_key = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RsaKeyValue.prototype, "Algorithm", {
            /**
             * Gets the algorithm of the public key
             */
            get: function () {
                return this.m_algorithm;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RsaKeyValue.prototype, "Modulus", {
            /**
             * Gets the Modulus of the public key
             */
            get: function () {
                return this.m_modulus;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RsaKeyValue.prototype, "Exponent", {
            /**
             * Gets the Exponent of the public key
             */
            get: function () {
                return this.m_exponent;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Imports key to the RSAKeyValue object
         * @param  {CryptoKey} key
         * @returns Promise
         */
        RsaKeyValue.prototype.importKey = function (key) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                if (key.algorithm.name.toUpperCase() !== xadesjs.RSA_PKCS1.toUpperCase())
                    throw new xadesjs.XmlError(xadesjs.XE.ALGORITHM_WRONG_NAME, key.algorithm.name);
                _this.m_key = key;
                xadesjs.Application.crypto.subtle.exportKey("jwk", key)
                    .then(function (jwk) {
                    _this.m_jwk = jwk;
                    _this.m_modulus = xadesjs.Convert.ToBufferString(xadesjs.Convert.Base64UrlToBase64(jwk.n));
                    _this.m_exponent = xadesjs.Convert.ToBufferString(xadesjs.Convert.Base64UrlToBase64(jwk.e));
                    _this.m_keyusage = key.usages;
                    return Promise.resolve();
                })
                    .then(resolve, reject);
            });
        };
        /**
         * Exports key from the RSAKeyValue object
         * @param  {Algorithm} alg
         * @returns Promise
         */
        RsaKeyValue.prototype.exportKey = function (alg) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                if (_this.m_key)
                    return resolve(_this.m_key);
                // fill jwk
                var modulus = xadesjs.Convert.ToBase64UrlString(xadesjs.Convert.FromBufferString(_this.m_modulus));
                var exponent = xadesjs.Convert.ToBase64UrlString(xadesjs.Convert.FromBufferString(_this.m_exponent));
                var algJwk = null;
                switch (alg.name.toUpperCase()) {
                    case xadesjs.RSA_PKCS1.toUpperCase():
                        algJwk = "R";
                        break;
                    case xadesjs.RSA_PSS.toUpperCase():
                        algJwk = "P";
                        break;
                    default:
                        throw new xadesjs.XmlError(xadesjs.XE.ALGORITHM_NOT_SUPPORTED, alg.name);
                }
                // Convert hash to JWK name
                switch (alg.hash.name.toUpperCase()) {
                    case xadesjs.SHA1:
                        algJwk += "S1";
                        break;
                    case xadesjs.SHA224:
                        algJwk += "S224";
                        break;
                    case xadesjs.SHA256:
                        algJwk += "S256";
                        break;
                    case xadesjs.SHA384:
                        algJwk += "S384";
                        break;
                    case xadesjs.SHA512:
                        algJwk += "S512";
                        break;
                }
                var jwk = {
                    kty: "RSA",
                    alg: algJwk,
                    n: modulus,
                    e: exponent,
                    ext: true
                };
                xadesjs.Application.crypto.subtle.importKey("jwk", jwk, alg, true, _this.m_keyusage)
                    .then(resolve, reject);
            });
        };
        /**
         * Returns the XML representation of the RSA key clause.
         * @returns Element
         */
        RsaKeyValue.prototype.GetXml = function () {
            if (this.m_element)
                return this.m_element;
            var prefix = this.GetPrefix();
            var doc = xadesjs.CreateDocument();
            // KeyValue
            var xnKeyValue = doc.createElementNS(xadesjs.XmlSignature.NamespaceURI, prefix + xadesjs.XmlSignature.ElementNames.KeyValue);
            // RsaKeyValue
            var xnRsaKeyValue = doc.createElementNS(xadesjs.XmlSignature.NamespaceURI, prefix + xadesjs.XmlSignature.ElementNames.RSAKeyValue);
            xnKeyValue.appendChild(xnRsaKeyValue);
            // Modulus
            var xnModulus = doc.createElementNS(xadesjs.XmlSignature.NamespaceURI, prefix + xadesjs.XmlSignature.ElementNames.Modulus);
            xnModulus.textContent = xadesjs.Convert.Base64UrlToBase64(this.m_jwk.n);
            xnRsaKeyValue.appendChild(xnModulus);
            // Exponent
            var xnExponent = doc.createElementNS(xadesjs.XmlSignature.NamespaceURI, prefix + xadesjs.XmlSignature.ElementNames.Exponent);
            xnExponent.textContent = xadesjs.Convert.Base64UrlToBase64(this.m_jwk.e);
            xnRsaKeyValue.appendChild(xnExponent);
            return xnKeyValue;
        };
        /**
         * Loads an RSA key clause from an XML element.
         * @param  {Element} element
         * @returns void
         */
        RsaKeyValue.prototype.LoadXml = function (element) {
            if ((element.localName !== xadesjs.XmlSignature.ElementNames.RSAKeyValue) || (element.namespaceURI !== xadesjs.XmlSignature.NamespaceURI))
                throw new xadesjs.XmlError(xadesjs.XE.CRYPTOGRAPHIC, "element");
            // <Modulus>
            var xnModulus = xadesjs.XmlSignature.GetChildElement(element, xadesjs.XmlSignature.ElementNames.Modulus, xadesjs.XmlSignature.NamespaceURI);
            if (xnModulus != null)
                this.m_modulus = xadesjs.Convert.ToBufferString(xadesjs.Convert.FromBase64String(xnModulus.textContent));
            else
                throw new xadesjs.XmlError(xadesjs.XE.CRYPTOGRAPHIC, xadesjs.XmlSignature.ElementNames.Modulus);
            // <Exponent>
            var xnExponent = xadesjs.XmlSignature.GetChildElement(element, xadesjs.XmlSignature.ElementNames.Exponent, xadesjs.XmlSignature.NamespaceURI);
            if (xnExponent != null)
                this.m_exponent = xadesjs.Convert.ToBufferString(xadesjs.Convert.FromBase64String(xnExponent.textContent));
            else
                throw new xadesjs.XmlError(xadesjs.XE.CRYPTOGRAPHIC, xadesjs.XmlSignature.ElementNames.Exponent);
            this.m_element = element;
            this.m_keyusage = ["verify"];
        };
        return RsaKeyValue;
    }(xadesjs.XmlObject));
    xadesjs.RsaKeyValue = RsaKeyValue;
})(xadesjs || (xadesjs = {}));
var xadesjs;
(function (xadesjs) {
    /**
     * Represents the <ECKeyValue> element of an XML signature.
     */
    var EcdsaKeyValue = (function (_super) {
        __extends(EcdsaKeyValue, _super);
        function EcdsaKeyValue() {
            _super.call(this);
            this.m_key = null;
            this.m_element = null;
            this.m_jwk = null;
            this.m_algorithm = null;
            this.m_x = null;
            this.m_y = null;
            this.m_curve = null;
            this.m_keyusage = null;
        }
        Object.defineProperty(EcdsaKeyValue.prototype, "Key", {
            /**
             * Gets or sets the instance of ECDSA that holds the public key.
             */
            get: function () {
                return this.m_key;
            },
            set: function (value) {
                this.m_key = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EcdsaKeyValue.prototype, "Algorithm", {
            /**
             * Gets the algorithm of the public key
             */
            get: function () {
                return this.m_algorithm;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EcdsaKeyValue.prototype, "X", {
            /**
             * Gets the X point value of then public key
             */
            get: function () {
                return this.m_x;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EcdsaKeyValue.prototype, "Y", {
            /**
             * Gets the Y point value of then public key
             */
            get: function () {
                return this.m_y;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EcdsaKeyValue.prototype, "NamedCurve", {
            /**
             * Gets the NamedCurve value of then public key
             */
            get: function () {
                return this.m_curve;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Imports key to the ECKeyValue object
         * @param  {CryptoKey} key
         * @returns Promise
         */
        EcdsaKeyValue.prototype.importKey = function (key) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                if (key.algorithm.name.toUpperCase() !== "ECDSA")
                    throw new xadesjs.XmlError(xadesjs.XE.ALGORITHM_WRONG_NAME, key.algorithm.name);
                _this.m_key = key;
                xadesjs.Application.crypto.subtle.exportKey("jwk", key)
                    .then(function (jwk) {
                    _this.m_jwk = jwk;
                    console.log(jwk);
                    _this.m_x = xadesjs.Convert.ToBufferString(xadesjs.Convert.FromBase64UrlString(jwk.x));
                    _this.m_y = xadesjs.Convert.ToBufferString(xadesjs.Convert.FromBase64UrlString(jwk.y));
                    _this.m_curve = jwk.crv;
                    _this.m_keyusage = key.usages;
                    return Promise.resolve();
                })
                    .then(resolve, reject);
            });
        };
        /**
         * Exports key from the ECKeyValue object
         * @param  {Algorithm} alg
         * @returns Promise
         */
        EcdsaKeyValue.prototype.exportKey = function (alg) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                if (_this.m_key)
                    return resolve(_this.m_key);
                // fill jwk
                var x = xadesjs.Convert.ToBase64UrlString(xadesjs.Convert.FromBufferString(_this.m_x));
                var y = xadesjs.Convert.ToBase64UrlString(xadesjs.Convert.FromBufferString(_this.m_y));
                var crv = _this.m_curve;
                var algJwk = null;
                var jwk = {
                    kty: "EC",
                    crv: crv,
                    x: x,
                    y: y,
                    ext: true
                };
                xadesjs.Application.crypto.subtle.importKey("jwk", jwk, { name: "ECDSA", namedCurve: crv }, true, _this.m_keyusage)
                    .then(resolve, reject);
            });
        };
        /**
         * Returns the XML representation of the ECDSA key clause.
         * @returns Element
         */
        EcdsaKeyValue.prototype.GetXml = function () {
            if (this.m_element)
                return this.m_element;
            var prefix = this.GetPrefix();
            var doc = xadesjs.CreateDocument();
            // KeyValue
            var xnKeyValue = doc.createElementNS(xadesjs.XmlSignature.NamespaceURI, prefix + xadesjs.XmlSignature.ElementNames.KeyValue);
            // EcdsaKeyValue
            var xnEcdsaKeyValue = doc.createElementNS(xadesjs.XmlSignature.NamespaceURI, prefix + xadesjs.XmlSignature.ElementNames.ECKeyValue);
            xnKeyValue.appendChild(xnEcdsaKeyValue);
            // NamedCurve
            var xnNamedCurve = doc.createElementNS(xadesjs.XmlSignature.NamespaceURI, prefix + xadesjs.XmlSignature.ElementNames.NamedCurve);
            xnNamedCurve.setAttribute("URI", "urn:oid:" + GetNamedCurveOid(this.m_curve));
            xnEcdsaKeyValue.appendChild(xnNamedCurve);
            // PublicKey
            var xnPublicKey = doc.createElementNS(xadesjs.XmlSignature.NamespaceURI, prefix + xadesjs.XmlSignature.ElementNames.PublicKey);
            // Conactinate point values 
            if (this.m_x.length !== this.m_y.length)
                throw new xadesjs.XmlError(xadesjs.XE.CRYPTOGRAPHIC, "ECDSA lenght of X value must be equal length of Y value");
            var pubkey = new Uint8Array(this.m_x.length + this.m_y.length);
            for (var i = 0; i < this.m_x.length; i++) {
                pubkey[i] = this.m_x[i];
                pubkey[this.m_x.length + i] = this.m_y[i];
            }
            xnPublicKey.textContent = xadesjs.Convert.ToBase64String(xadesjs.Convert.FromBufferString(pubkey));
            xnEcdsaKeyValue.appendChild(xnPublicKey);
            return xnKeyValue;
        };
        /**
         * Loads an ECDSA key clause from an XML element.
         * @param  {Element} element
         * @returns void
         */
        EcdsaKeyValue.prototype.LoadXml = function (element) {
            if ((element.localName !== xadesjs.XmlSignature.ElementNames.ECKeyValue) || (element.namespaceURI !== xadesjs.XmlSignature.NamespaceURI))
                throw new xadesjs.XmlError(xadesjs.XE.CRYPTOGRAPHIC, "element");
            // <NamedCurve>
            var xnNamedCurve = xadesjs.XmlSignature.GetChildElement(element, xadesjs.XmlSignature.ElementNames.NamedCurve, xadesjs.XmlSignature.NamespaceURI);
            if (xnNamedCurve != null) {
                var value = /urn\:oid\:(.+)/.exec(xnNamedCurve.getAttribute("URI"))[1];
                this.m_curve = GetNamedCurveFromOid(value);
            }
            else
                throw new xadesjs.XmlError(xadesjs.XE.CRYPTOGRAPHIC, xadesjs.XmlSignature.ElementNames.NamedCurve);
            // <PublicKey>
            var xnPublicKey = xadesjs.XmlSignature.GetChildElement(element, xadesjs.XmlSignature.ElementNames.PublicKey, xadesjs.XmlSignature.NamespaceURI);
            if (xnPublicKey != null) {
                var pubkey = xadesjs.Convert.ToBufferString(xadesjs.Convert.FromBase64String(xnPublicKey.textContent));
                if (pubkey.length % 2)
                    throw new xadesjs.XmlError(xadesjs.XE.CRYPTOGRAPHIC, "ECDSA PublicKey point mustbw odd");
                var point_size = pubkey.length / 2;
                this.m_x = pubkey.slice(0, point_size);
                this.m_y = pubkey.slice(point_size);
            }
            else
                throw new xadesjs.XmlError(xadesjs.XE.CRYPTOGRAPHIC, xadesjs.XmlSignature.ElementNames.PublicKey);
            this.m_element = element;
            this.m_keyusage = ["verify"];
        };
        return EcdsaKeyValue;
    }(xadesjs.XmlObject));
    xadesjs.EcdsaKeyValue = EcdsaKeyValue;
    function GetNamedCurveOid(namedCurve) {
        switch (namedCurve) {
            case "P-256":
                return "1.2.840.10045.3.1.7";
            case "P-384":
                return "1.3.132.0.34";
            case "P-521":
                return "1.3.132.0.35";
        }
        throw new xadesjs.XmlError(xadesjs.XE.CRYPTOGRAPHIC, "Unknown NamedCurve");
    }
    function GetNamedCurveFromOid(oid) {
        switch (oid) {
            case "1.2.840.10045.3.1.7":
                return "P-256";
            case "1.3.132.0.34":
                return "P-384";
            case "1.3.132.0.35":
                return "P-521";
        }
        throw new xadesjs.XmlError(xadesjs.XE.CRYPTOGRAPHIC, "Unknown NamedCurve OID");
    }
})(xadesjs || (xadesjs = {}));
var xadesjs;
(function (xadesjs) {
    var NamespaceManager = (function () {
        function NamespaceManager() {
            this.items = [];
        }
        Object.defineProperty(NamespaceManager.prototype, "Count", {
            get: function () {
                return this.items.length;
            },
            enumerable: true,
            configurable: true
        });
        NamespaceManager.prototype.Item = function (index) {
            return this.items[index];
        };
        NamespaceManager.prototype.RemoveAt = function (index) {
            this.items = this.items.filter(function (item, _index) {
                return index !== _index;
            });
        };
        NamespaceManager.prototype.IsEmpry = function () {
            return this.Count === 0;
        };
        NamespaceManager.prototype.Add = function (item) {
            item.prefix = item.prefix || "";
            item.namespace = item.namespace || "";
            this.items.push(item);
        };
        NamespaceManager.prototype.Pop = function () {
            return this.items.pop();
        };
        NamespaceManager.prototype.GetPrefix = function (prefix, start) {
            if (start === void 0) { start = this.Count - 1; }
            var lim = this.Count - 1;
            prefix = prefix || "";
            if (start > lim)
                start = lim;
            for (var i = start; i >= 0; i--) {
                var item = this.items[i];
                if (item.prefix === prefix)
                    return item;
            }
            return null;
        };
        NamespaceManager.prototype.GetNamespace = function (namespaceUrl, start) {
            if (start === void 0) { start = this.Count - 1; }
            var lim = this.Count - 1;
            namespaceUrl = namespaceUrl || "";
            if (start > lim)
                start = lim;
            for (var i = start; i >= 0; i--) {
                var item = this.items[i];
                if (item.namespace === namespaceUrl)
                    return item;
            }
            return null;
        };
        NamespaceManager.prototype.GetIterator = function () {
            return this.items;
        };
        return NamespaceManager;
    }());
    xadesjs.NamespaceManager = NamespaceManager;
})(xadesjs || (xadesjs = {}));
var xadesjs;
(function (xadesjs) {
    (function (XmlCanonicalizerState) {
        XmlCanonicalizerState[XmlCanonicalizerState["BeforeDocElement"] = 0] = "BeforeDocElement";
        XmlCanonicalizerState[XmlCanonicalizerState["InsideDocElement"] = 1] = "InsideDocElement";
        XmlCanonicalizerState[XmlCanonicalizerState["AfterDocElement"] = 2] = "AfterDocElement";
    })(xadesjs.XmlCanonicalizerState || (xadesjs.XmlCanonicalizerState = {}));
    var XmlCanonicalizerState = xadesjs.XmlCanonicalizerState;
    var XmlCanonicalizer = (function () {
        function XmlCanonicalizer(withComments, excC14N, propagatedNamespaces) {
            if (propagatedNamespaces === void 0) { propagatedNamespaces = new xadesjs.NamespaceManager; }
            this.propagatedNamespaces = new xadesjs.NamespaceManager();
            this.visibleNamespaces = new xadesjs.NamespaceManager();
            this.inclusiveNamespacesPrefixList = [];
            this.state = XmlCanonicalizerState.BeforeDocElement;
            this.withComments = withComments;
            this.exclusive = excC14N;
            this.propagatedNamespaces = propagatedNamespaces;
            this.result = [];
            this.state = XmlCanonicalizerState.BeforeDocElement;
        }
        Object.defineProperty(XmlCanonicalizer.prototype, "InclusiveNamespacesPrefixList", {
            // See xml-enc-c14n specification
            get: function () {
                return this.inclusiveNamespacesPrefixList.join(" ");
            },
            set: function (value) {
                this.inclusiveNamespacesPrefixList = value.split(" ");
            },
            enumerable: true,
            configurable: true
        });
        XmlCanonicalizer.prototype.Canonicalize = function (node) {
            if (!node)
                throw new xadesjs.XmlError(xadesjs.XE.CRYPTOGRAPHIC, "Parameter 1 is not Node");
            var _node;
            if (node.nodeType === xadesjs.XmlNodeType.Document) {
                this.document = node;
                _node = this.document.documentElement;
            }
            else {
                this.document = node.ownerDocument;
                _node = node;
            }
            // get nss from document
            // this.nsManager = new XmlNamespaceManager(this.document);
            this.WriteNode(_node);
            var res = this.result.join("");
            return res;
        };
        XmlCanonicalizer.prototype.WriteNode = function (node) {
            switch (node.nodeType) {
                case xadesjs.XmlNodeType.Document:
                case xadesjs.XmlNodeType.DocumentFragment:
                    this.WriteDocumentNode(node);
                    break;
                case xadesjs.XmlNodeType.Element:
                    this.WriteElementNode(node);
                    break;
                case xadesjs.XmlNodeType.CDATA:
                case xadesjs.XmlNodeType.SignificantWhitespace:
                case xadesjs.XmlNodeType.Text:
                    // CDATA sections are processed as text nodes
                    this.WriteTextNode(node);
                    break;
                case xadesjs.XmlNodeType.Whitespace:
                    if (this.state === XmlCanonicalizerState.InsideDocElement)
                        this.WriteTextNode(node);
                    break;
                case xadesjs.XmlNodeType.Comment:
                    this.WriteCommentNode(node);
                    break;
                case xadesjs.XmlNodeType.ProcessingInstruction:
                    this.WriteProcessingInstructionNode(node);
                    break;
                case xadesjs.XmlNodeType.EntityReference:
                    for (var i = 0; i < node.childNodes.length; i++)
                        this.WriteNode(node.childNodes[i]);
                    break;
                case xadesjs.XmlNodeType.Attribute:
                    throw new xadesjs.XmlError(xadesjs.XE.CRYPTOGRAPHIC, "Attribute node is impossible here");
                case xadesjs.XmlNodeType.EndElement:
                    throw new xadesjs.XmlError(xadesjs.XE.CRYPTOGRAPHIC, "Attribute node is impossible here");
                case xadesjs.XmlNodeType.EndEntity:
                    throw new xadesjs.XmlError(xadesjs.XE.CRYPTOGRAPHIC, "Attribute node is impossible here");
                case xadesjs.XmlNodeType.DocumentType:
                case xadesjs.XmlNodeType.Entity:
                case xadesjs.XmlNodeType.Notation:
                case xadesjs.XmlNodeType.XmlDeclaration:
                    // just do nothing
                    break;
            }
        };
        XmlCanonicalizer.prototype.WriteDocumentNode = function (node) {
            this.state = XmlCanonicalizerState.BeforeDocElement;
            for (var child = node.firstChild; child != null; child = child.nextSibling)
                this.WriteNode(child);
        };
        // Text Nodes
        // the string value, except all ampersands are replaced 
        // by &amp;, all open angle brackets (<) are replaced by &lt;, all closing 
        // angle brackets (>) are replaced by &gt;, and all #xD characters are 
        // replaced by &#xD;.
        XmlCanonicalizer.prototype.WriteTextNode = function (node) {
            // console.log(`WriteTextNode: ${node.nodeName}`);
            this.result.push(this.NormalizeString(node.nodeValue, node.nodeType));
        };
        XmlCanonicalizer.prototype.WriteCommentNode = function (node) {
            // console.log(`WriteCommentNode: ${node.nodeName}`);
            // Console.WriteLine ("Debug: comment node");
            if (this.withComments) {
                if (this.state === XmlCanonicalizerState.AfterDocElement)
                    this.result.push(String.fromCharCode(10) + "<!--");
                else
                    this.result.push("<!--");
                this.result.push(this.NormalizeString(node.nodeValue, xadesjs.XmlNodeType.Comment));
                if (this.state === XmlCanonicalizerState.BeforeDocElement)
                    this.result.push("-->" + String.fromCharCode(10));
                else
                    this.result.push("-->");
            }
        };
        // Processing Instruction (PI) Nodes- 
        // The opening PI symbol (<?), the PI target name of the node, 
        // a leading space and the string value if it is not empty, and 
        // the closing PI symbol (?>). If the string value is empty, 
        // then the leading space is not added. Also, a trailing #xA is 
        // rendered after the closing PI symbol for PI children of the 
        // root node with a lesser document order than the document 
        // element, and a leading #xA is rendered before the opening PI 
        // symbol of PI children of the root node with a greater document 
        // order than the document element.
        XmlCanonicalizer.prototype.WriteProcessingInstructionNode = function (node) {
            // console.log(`WriteProcessingInstructionNode: ${node.nodeName}`);
            if (this.state === XmlCanonicalizerState.AfterDocElement)
                this.result.push("\u000A<?");
            else
                this.result.push("<?");
            this.result.push(node.nodeName);
            if (node.nodeValue) {
                this.result.push(" ");
                this.result.push(this.NormalizeString(node.nodeValue, xadesjs.XmlNodeType.ProcessingInstruction));
            }
            if (this.state === XmlCanonicalizerState.BeforeDocElement)
                this.result.push("?>\u000A");
            else
                this.result.push("?>");
        };
        XmlCanonicalizer.prototype.WriteElementNode = function (node) {
            // console.log(`WriteElementNode: ${node.nodeName}`);
            if (this.state === XmlCanonicalizerState.BeforeDocElement)
                this.state = XmlCanonicalizerState.InsideDocElement;
            // open tag
            this.result.push("<");
            this.result.push(node.nodeName);
            // namespaces
            var visibleNamespacesCount = this.WriteNamespacesAxis(node);
            // attributes
            this.WriteAttributesAxis(node);
            this.result.push(">");
            for (var n = node.firstChild; n != null; n = n.nextSibling) {
                // if (!(n.nodeType === XmlNodeType.Text && node.childNodes.length > 1))
                this.WriteNode(n);
            }
            // close tag
            this.result.push("</");
            this.result.push(node.nodeName);
            this.result.push(">");
            if (this.state === XmlCanonicalizerState.BeforeDocElement)
                this.state = XmlCanonicalizerState.AfterDocElement;
            // remove added namespaces
            while (visibleNamespacesCount--)
                this.visibleNamespaces.Pop();
        };
        XmlCanonicalizer.prototype.WriteNamespacesAxis = function (node) {
            var list = [];
            var visibleNamespacesCount = 0;
            for (var i = 0; i < node.attributes.length; i++) {
                var attribute = node.attributes[i];
                if (!IsNamespaceNode(attribute)) {
                    // render namespace for attribute, if needed
                    if (attribute.prefix && !this.IsNamespaceRendered(attribute.prefix, attribute.namespaceURI)) {
                        var ns = { prefix: attribute.prefix, namespace: attribute.namespaceURI };
                        list.push(ns);
                        this.visibleNamespaces.Add(ns);
                        visibleNamespacesCount++;
                    }
                    continue;
                }
                if (attribute.localName === "xmlns" && !attribute.prefix && !attribute.nodeValue) {
                    var ns = { prefix: attribute.prefix, namespace: attribute.nodeValue };
                    list.push(ns);
                    this.visibleNamespaces.Add(ns);
                    visibleNamespacesCount++;
                }
                if (attribute.localName === "xmlns")
                    continue;
                // get namespace prefix
                var prefix = void 0;
                var matches = null;
                if (matches = /xmlns:(\w+)/.exec(attribute.nodeName))
                    prefix = matches[1];
                var printable = true;
                if (this.exclusive && !this.IsNamespaceInclusive(node, prefix)) {
                    var used = IsNamespaceUsed(node, prefix);
                    if (used > 1)
                        printable = false;
                    else if (used === 0)
                        continue;
                }
                if (this.IsNamespaceRendered(prefix, attribute.nodeValue))
                    continue;
                if (printable) {
                    var ns = { prefix: prefix, namespace: attribute.nodeValue };
                    list.push(ns);
                    this.visibleNamespaces.Add(ns);
                    visibleNamespacesCount++;
                }
            }
            if (!this.IsNamespaceRendered(node.prefix, node.namespaceURI) && node.namespaceURI !== "http://www.w3.org/2000/xmlns/") {
                var ns = { prefix: node.prefix, namespace: node.namespaceURI };
                list.push(ns);
                this.visibleNamespaces.Add(ns);
                visibleNamespacesCount++;
            }
            // sort nss
            list.sort(XmlDsigC14NTransformNamespacesComparer);
            var prevPrefix = null;
            for (var _i = 0, list_1 = list; _i < list_1.length; _i++) {
                var n = list_1[_i];
                if (n.prefix === prevPrefix) {
                    continue;
                }
                prevPrefix = n.prefix;
                this.result.push(" xmlns");
                if (n.prefix)
                    this.result.push(":" + n.prefix);
                this.result.push("=\"");
                this.result.push(n.namespace);
                this.result.push("\"");
            }
            return visibleNamespacesCount;
        };
        XmlCanonicalizer.prototype.WriteAttributesAxis = function (node) {
            // Console.WriteLine ("Debug: attributes");
            var list = [];
            for (var i = 0; i < node.attributes.length; i++) {
                var attribute = node.attributes[i];
                if (!IsNamespaceNode(attribute))
                    list.push(attribute);
            }
            // sort namespaces and write results	    
            list.sort(XmlDsigC14NTransformAttributesComparer);
            for (var _i = 0, list_2 = list; _i < list_2.length; _i++) {
                var attribute = list_2[_i];
                if (attribute != null) {
                    this.result.push(" ");
                    this.result.push(attribute.nodeName);
                    this.result.push("=\"");
                    this.result.push(this.NormalizeString(attribute.nodeValue, xadesjs.XmlNodeType.Attribute));
                    this.result.push("\"");
                }
            }
        };
        XmlCanonicalizer.prototype.NormalizeString = function (input, type) {
            var sb = [];
            for (var i = 0; i < input.length; i++) {
                var ch = input[i];
                if (ch === "<" && (type === xadesjs.XmlNodeType.Attribute || this.IsTextNode(type)))
                    sb.push("&lt;");
                else if (ch === ">" && this.IsTextNode(type))
                    sb.push("&gt;");
                else if (ch === "&" && (type === xadesjs.XmlNodeType.Attribute || this.IsTextNode(type)))
                    sb.push("&amp;");
                else if (ch === "\"" && type === xadesjs.XmlNodeType.Attribute)
                    sb.push("&quot;");
                else if (ch === "\u0009" && type === xadesjs.XmlNodeType.Attribute)
                    sb.push("&#x9;");
                else if (ch === "\u000A" && type === xadesjs.XmlNodeType.Attribute)
                    sb.push("&#xA;");
                else if (ch === "\u000D")
                    sb.push("&#xD;");
                else
                    sb.push(ch);
            }
            return sb.join("");
        };
        XmlCanonicalizer.prototype.IsTextNode = function (type) {
            switch (type) {
                case xadesjs.XmlNodeType.Text:
                case xadesjs.XmlNodeType.CDATA:
                case xadesjs.XmlNodeType.SignificantWhitespace:
                case xadesjs.XmlNodeType.Whitespace:
                    return true;
            }
            return false;
        };
        XmlCanonicalizer.prototype.IsNamespaceInclusive = function (node, prefix) {
            prefix = prefix || null;
            if (node.prefix === prefix)
                return false;
            return this.inclusiveNamespacesPrefixList.indexOf(prefix) !== -1; // && node.prefix === prefix;
        };
        XmlCanonicalizer.prototype.IsNamespaceRendered = function (prefix, uri) {
            prefix = prefix || "";
            uri = uri || "";
            if (!prefix && !uri)
                return true;
            if (prefix === "xml" && uri === "http://www.w3.org/XML/1998/namespace")
                return true;
            var ns = this.visibleNamespaces.GetPrefix(prefix);
            if (ns)
                return ns.namespace === uri;
            return false;
        };
        return XmlCanonicalizer;
    }());
    xadesjs.XmlCanonicalizer = XmlCanonicalizer;
    function XmlDsigC14NTransformNamespacesComparer(x, y) {
        // simple cases
        if (x == y)
            return 0;
        else if (!x)
            return -1;
        else if (!y)
            return 1;
        else if (!x.prefix)
            return -1;
        else if (!y.prefix)
            return 1;
        return x.prefix.localeCompare(y.prefix);
    }
    function XmlDsigC14NTransformAttributesComparer(x, y) {
        if (!x.namespaceURI && y.namespaceURI) {
            return -1;
        }
        if (!y.namespaceURI && x.namespaceURI) {
            return 1;
        }
        var left = x.namespaceURI + x.localName;
        var right = y.namespaceURI + y.localName;
        if (left === right)
            return 0;
        else if (left < right)
            return -1;
        else
            return 1;
    }
    function IsNamespaceUsed(node, prefix, result) {
        if (result === void 0) { result = 0; }
        prefix = prefix || null;
        if (node.prefix === prefix)
            return ++result;
        // prefix of attributes
        if (node.attributes)
            for (var i = 0; i < node.attributes.length; i++) {
                var attr = node.attributes[i];
                if (!IsNamespaceNode(attr) && prefix && node.attributes[i].prefix === prefix)
                    return ++result;
            }
        // check prefix of Element
        for (var n = node.firstChild; !!n; n = n.nextSibling) {
            var res = IsNamespaceUsed(n, prefix, result);
            if (n.nodeType === xadesjs.XmlNodeType.Element && res)
                return ++result + res;
        }
        return result;
    }
    function IsNamespaceNode(node) {
        var reg = /xmlns:/;
        if (node !== null && node.nodeType === xadesjs.XmlNodeType.Attribute && (node.nodeName === "xmlns" || reg.test(node.nodeName)))
            return true;
        return false;
    }
})(xadesjs || (xadesjs = {}));
/// <reference path="../common.ts" />
var xadesjs;
(function (xadesjs) {
    /**
     * Represents the abstract base class from which all <Transform> elements
     * that can be used in an XML digital signature derive.
     */
    var Transform = (function (_super) {
        __extends(Transform, _super);
        function Transform() {
            _super.apply(this, arguments);
            this.innerXml = null;
        }
        /**
         * When overridden in a derived class, returns the output of the current Transform object.
         */
        Transform.prototype.GetOutput = function () {
            throw new xadesjs.XmlError(xadesjs.XE.METHOD_NOT_IMPLEMENTED);
        };
        Transform.prototype.LoadInnerXml = function (node) {
            if (!node)
                throw new xadesjs.XmlError(xadesjs.XE.PARAM_REQUIRED, "node");
            this.innerXml = node;
        };
        Transform.prototype.GetInnerXml = function () {
            return this.innerXml;
        };
        Transform.prototype.LoadXml = function (value) {
            if (value == null)
                throw new xadesjs.XmlError(xadesjs.XE.PARAM_REQUIRED, "value");
            if ((value.localName !== xadesjs.XmlSignature.ElementNames.Transform) || (value.namespaceURI !== xadesjs.XmlSignature.NamespaceURI))
                throw new xadesjs.XmlError(xadesjs.XE.CRYPTOGRAPHIC, "value");
            var alg = value.getAttribute(xadesjs.XmlSignature.AttributeNames.Algorithm);
            if (this.Algorithm !== alg)
                throw new xadesjs.XmlError(xadesjs.XE.ALGORITHM_WRONG_NAME, alg);
        };
        /**
         * Returns the XML representation of the current Transform object.
         * @returns Element
         */
        Transform.prototype.GetXml = function () {
            var document = xadesjs.CreateDocument();
            var xel = document.createElementNS(xadesjs.XmlSignature.NamespaceURI, "" + this.GetPrefix() + xadesjs.XmlSignature.ElementNames.Transform);
            xel.setAttribute(xadesjs.XmlSignature.AttributeNames.Algorithm, this.Algorithm);
            return xel;
        };
        return Transform;
    }(xadesjs.XmlObject));
    xadesjs.Transform = Transform;
})(xadesjs || (xadesjs = {}));
var xadesjs;
(function (xadesjs) {
    // http://www.w3.org/2000/09/xmldsig#base64
    var XmlDsigBase64Transform = (function (_super) {
        __extends(XmlDsigBase64Transform, _super);
        function XmlDsigBase64Transform() {
            _super.apply(this, arguments);
            this.Algorithm = xadesjs.XmlSignature.AlgorithmNamespaces.XmlDsigBase64Transform;
        }
        /**
         * Returns the output of the current XmlDsigBase64Transform object
         */
        XmlDsigBase64Transform.prototype.GetOutput = function () {
            return xadesjs.Convert.FromBase64String(this.innerXml.textContent);
        };
        return XmlDsigBase64Transform;
    }(xadesjs.Transform));
    xadesjs.XmlDsigBase64Transform = XmlDsigBase64Transform;
})(xadesjs || (xadesjs = {}));
var xadesjs;
(function (xadesjs) {
    /**
     * Represents the enveloped signature transform for an XML digital signature as defined by the W3C.
     */
    var XmlDsigEnvelopedSignatureTransform = (function (_super) {
        __extends(XmlDsigEnvelopedSignatureTransform, _super);
        function XmlDsigEnvelopedSignatureTransform() {
            _super.apply(this, arguments);
            this.Algorithm = "http://www.w3.org/2000/09/xmldsig#enveloped-signature";
        }
        /**
         * Returns the output of the current XmlDsigEnvelopedSignatureTransform object.
         * @returns string
         */
        XmlDsigEnvelopedSignatureTransform.prototype.GetOutput = function () {
            var signature = select(this.innerXml, ".//*[local-name(.)='Signature' and namespace-uri(.)='http://www.w3.org/2000/09/xmldsig#']")[0];
            if (signature)
                signature.parentNode.removeChild(signature);
            var res = new XMLSerializer().serializeToString(this.innerXml); // .replace(/\r/g, "");
            return res;
        };
        return XmlDsigEnvelopedSignatureTransform;
    }(xadesjs.Transform));
    xadesjs.XmlDsigEnvelopedSignatureTransform = XmlDsigEnvelopedSignatureTransform;
})(xadesjs || (xadesjs = {}));
var xadesjs;
(function (xadesjs) {
    /**
     * Represents the C14N XML canonicalization transform for a digital signature
     * as defined by the World Wide Web Consortium (W3C), without comments.
     */
    var XmlDsigC14NTransform = (function (_super) {
        __extends(XmlDsigC14NTransform, _super);
        function XmlDsigC14NTransform() {
            _super.apply(this, arguments);
            this.xmlCanonicalizer = new xadesjs.XmlCanonicalizer(false, false, []);
            this.Algorithm = "http://www.w3.org/TR/2001/REC-xml-c14n-20010315";
        }
        /**
         * Returns the output of the current XmlDsigC14NTransform object.
         * @returns string
         */
        XmlDsigC14NTransform.prototype.GetOutput = function () {
            return this.xmlCanonicalizer.Canonicalize(this.innerXml);
        };
        return XmlDsigC14NTransform;
    }(xadesjs.Transform));
    xadesjs.XmlDsigC14NTransform = XmlDsigC14NTransform;
    ;
    /**
     * Represents the C14N XML canonicalization transform for a digital signature
     * as defined by the World Wide Web Consortium (W3C), with comments.
     */
    var XmlDsigC14NWithCommentsTransform = (function (_super) {
        __extends(XmlDsigC14NWithCommentsTransform, _super);
        function XmlDsigC14NWithCommentsTransform() {
            _super.apply(this, arguments);
            this.Algorithm = "http://www.w3.org/TR/2001/REC-xml-c14n-20010315#WithComments";
            this.xmlCanonicalizer = new xadesjs.XmlCanonicalizer(true, true, []);
        }
        return XmlDsigC14NWithCommentsTransform;
    }(XmlDsigC14NTransform));
    xadesjs.XmlDsigC14NWithCommentsTransform = XmlDsigC14NWithCommentsTransform;
})(xadesjs || (xadesjs = {}));
var xadesjs;
(function (xadesjs) {
    /**
     * Represents the exclusive C14N XML canonicalization transform for a digital signature
     * as defined by the World Wide Web Consortium (W3C), without comments.
     */
    var XmlDsigExcC14NTransform = (function (_super) {
        __extends(XmlDsigExcC14NTransform, _super);
        function XmlDsigExcC14NTransform() {
            _super.apply(this, arguments);
            this.xmlCanonicalizer = new xadesjs.XmlCanonicalizer(false, true, []);
            this.Algorithm = "http://www.w3.org/2001/10/xml-exc-c14n#";
        }
        Object.defineProperty(XmlDsigExcC14NTransform.prototype, "InclusiveNamespacesPrefixList", {
            /**
             * Gets or sets a string that contains namespace prefixes to canonicalize
             * using the standard canonicalization algorithm.
             */
            get: function () {
                return this.xmlCanonicalizer.InclusiveNamespacesPrefixList;
            },
            set: function (value) {
                this.xmlCanonicalizer.InclusiveNamespacesPrefixList = value;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Returns the output of the current XmlDsigExcC14NTransform object
         */
        XmlDsigExcC14NTransform.prototype.GetOutput = function () {
            return this.xmlCanonicalizer.Canonicalize(this.innerXml);
        };
        return XmlDsigExcC14NTransform;
    }(xadesjs.Transform));
    xadesjs.XmlDsigExcC14NTransform = XmlDsigExcC14NTransform;
    ;
    /**
     * Represents the exclusive C14N XML canonicalization transform for a digital signature
     * as defined by the World Wide Web Consortium (W3C), with comments.
     */
    var XmlDsigExcC14NWithCommentsTransform = (function (_super) {
        __extends(XmlDsigExcC14NWithCommentsTransform, _super);
        function XmlDsigExcC14NWithCommentsTransform() {
            _super.apply(this, arguments);
            this.Algorithm = "http://www.w3.org/2001/10/xml-exc-c14n#WithComments";
            this.xmlCanonicalizer = new xadesjs.XmlCanonicalizer(true, true, []);
        }
        return XmlDsigExcC14NWithCommentsTransform;
    }(XmlDsigExcC14NTransform));
    xadesjs.XmlDsigExcC14NWithCommentsTransform = XmlDsigExcC14NWithCommentsTransform;
})(xadesjs || (xadesjs = {}));
var xadesjs;
(function (xadesjs) {
    var SignatureAlgorithms = {};
    SignatureAlgorithms[xadesjs.RSA_PKCS1_SHA1_NAMESPACE] = xadesjs.RsaPkcs1Sha1;
    SignatureAlgorithms[xadesjs.RSA_PKCS1_SHA224_NAMESPACE] = xadesjs.RsaPkcs1Sha224;
    SignatureAlgorithms[xadesjs.RSA_PKCS1_SHA256_NAMESPACE] = xadesjs.RsaPkcs1Sha256;
    SignatureAlgorithms[xadesjs.RSA_PKCS1_SHA384_NAMESPACE] = xadesjs.RsaPkcs1Sha384;
    SignatureAlgorithms[xadesjs.RSA_PKCS1_SHA512_NAMESPACE] = xadesjs.RsaPkcs1Sha512;
    SignatureAlgorithms[xadesjs.RSA_PSS_WITH_PARAMS_MGF1_NAMESPACE] = xadesjs.RsaPssSha1;
    SignatureAlgorithms[xadesjs.RSA_PSS_WITH_PARAMS_MGF1_NAMESPACE] = xadesjs.RsaPssSha224;
    SignatureAlgorithms[xadesjs.RSA_PSS_WITH_PARAMS_MGF1_NAMESPACE] = xadesjs.RsaPssSha256;
    SignatureAlgorithms[xadesjs.RSA_PSS_WITH_PARAMS_MGF1_NAMESPACE] = xadesjs.RsaPssSha384;
    SignatureAlgorithms[xadesjs.RSA_PSS_WITH_PARAMS_MGF1_NAMESPACE] = xadesjs.RsaPssSha512;
    SignatureAlgorithms[xadesjs.ECDSA_SHA1_NAMESPACE] = xadesjs.EcdsaSha1;
    SignatureAlgorithms[xadesjs.ECDSA_SHA224_NAMESPACE] = xadesjs.EcdsaSha224;
    SignatureAlgorithms[xadesjs.ECDSA_SHA256_NAMESPACE] = xadesjs.EcdsaSha256;
    SignatureAlgorithms[xadesjs.ECDSA_SHA384_NAMESPACE] = xadesjs.EcdsaSha384;
    SignatureAlgorithms[xadesjs.ECDSA_SHA512_NAMESPACE] = xadesjs.EcdsaSha512;
    SignatureAlgorithms[xadesjs.HMAC_SHA1_NAMESPACE] = xadesjs.HmacSha1;
    SignatureAlgorithms[xadesjs.HMAC_SHA256_NAMESPACE] = xadesjs.HmacSha256;
    SignatureAlgorithms[xadesjs.HMAC_SHA384_NAMESPACE] = xadesjs.HmacSha384;
    SignatureAlgorithms[xadesjs.HMAC_SHA512_NAMESPACE] = xadesjs.HmacSha512;
    var HashAlgorithms = {};
    HashAlgorithms[xadesjs.SHA1_NAMESPACE] = xadesjs.Sha1;
    HashAlgorithms[xadesjs.SHA224_NAMESPACE] = xadesjs.Sha224;
    HashAlgorithms[xadesjs.SHA256_NAMESPACE] = xadesjs.Sha256;
    HashAlgorithms[xadesjs.SHA384_NAMESPACE] = xadesjs.Sha384;
    HashAlgorithms[xadesjs.SHA512_NAMESPACE] = xadesjs.Sha512;
    var CryptoConfig = (function () {
        function CryptoConfig() {
        }
        CryptoConfig.CreateFromName = function (name) {
            var t = null;
            switch (name) {
                case xadesjs.XmlSignature.AlgorithmNamespaces.XmlDsigBase64Transform:
                    t = new xadesjs.XmlDsigBase64Transform();
                    break;
                case xadesjs.XmlSignature.AlgorithmNamespaces.XmlDsigC14NTransform:
                    t = new xadesjs.XmlDsigC14NTransform();
                    break;
                case xadesjs.XmlSignature.AlgorithmNamespaces.XmlDsigC14NWithCommentsTransform:
                    t = new xadesjs.XmlDsigC14NWithCommentsTransform();
                    break;
                case xadesjs.XmlSignature.AlgorithmNamespaces.XmlDsigEnvelopedSignatureTransform:
                    t = new xadesjs.XmlDsigEnvelopedSignatureTransform();
                    break;
                case xadesjs.XmlSignature.AlgorithmNamespaces.XmlDsigXPathTransform:
                    throw new xadesjs.XmlError(xadesjs.XE.ALGORITHM_NOT_SUPPORTED, name);
                // t = new XmlDsigXPathTransform();
                // break;
                case xadesjs.XmlSignature.AlgorithmNamespaces.XmlDsigXsltTransform:
                    throw new xadesjs.XmlError(xadesjs.XE.ALGORITHM_NOT_SUPPORTED, name);
                // t = new XmlDsigXsltTransform();
                // break;
                case xadesjs.XmlSignature.AlgorithmNamespaces.XmlDsigExcC14NTransform:
                    t = new xadesjs.XmlDsigExcC14NTransform();
                    break;
                case xadesjs.XmlSignature.AlgorithmNamespaces.XmlDsigExcC14NWithCommentsTransform:
                    t = new xadesjs.XmlDsigExcC14NWithCommentsTransform();
                    break;
                case xadesjs.XmlSignature.AlgorithmNamespaces.XmlDecryptionTransform:
                    throw new xadesjs.XmlError(xadesjs.XE.ALGORITHM_NOT_SUPPORTED, name);
                // t = new XmlDecryptionTransform();
                // break;
                default:
                    throw new xadesjs.XmlError(xadesjs.XE.ALGORITHM_NOT_SUPPORTED, name);
            }
            return t;
        };
        CryptoConfig.CreateSignatureAlgorithm = function (namespace) {
            var alg = SignatureAlgorithms[namespace] || null;
            if (alg)
                return new alg();
            else
                throw new Error("signature algorithm '" + namespace + "' is not supported");
        };
        ;
        CryptoConfig.CreateHashAlgorithm = function (namespace) {
            var algo = HashAlgorithms[namespace];
            if (algo)
                return new algo();
            else
                throw new Error("hash algorithm '" + namespace + "' is not supported");
        };
        return CryptoConfig;
    }());
    xadesjs.CryptoConfig = CryptoConfig;
})(xadesjs || (xadesjs = {}));
var xadesjs;
(function (xadesjs) {
    // XmlElement part of the signature
    // Note: Looks like KeyInfoNode (but the later is XmlElement inside KeyInfo)
    // required for "enveloping signatures"
    /**
     * Represents the object element of an XML signature that holds data to be signed.
     */
    var DataObject = (function (_super) {
        __extends(DataObject, _super);
        function DataObject(id, mimeType, encoding, data) {
            if (id === void 0) { id = null; }
            if (mimeType === void 0) { mimeType = null; }
            if (encoding === void 0) { encoding = null; }
            if (data === void 0) { data = null; }
            _super.call(this);
            this.Build(id, mimeType, encoding, data);
        }
        // this one accept a null "data" parameter
        DataObject.prototype.Build = function (id, mimeType, encoding, data) {
            var document = xadesjs.CreateDocument();
            var prefix = this.GetPrefix();
            var xel = document.createElementNS(xadesjs.XmlSignature.NamespaceURI, prefix + xadesjs.XmlSignature.ElementNames.Object);
            if (id != null) {
                xel.setAttribute(xadesjs.XmlSignature.AttributeNames.Id, id);
            }
            if (mimeType != null) {
                xel.setAttribute(xadesjs.XmlSignature.AttributeNames.MimeType, mimeType);
            }
            if (encoding != null) {
                xel.setAttribute(xadesjs.XmlSignature.AttributeNames.Encoding, encoding);
            }
            if (data != null) {
                var newNode = document.importNode(data, true);
                xel.appendChild(newNode);
            }
            this.element = xel;
        };
        Object.defineProperty(DataObject.prototype, "Data", {
            /**
             * Gets or sets the data value of the current DataObject object.
             */
            get: function () {
                return this.element.childNodes;
            },
            set: function (value) {
                if (value == null)
                    throw new xadesjs.XmlError(xadesjs.XE.PARAM_REQUIRED, "value");
                var doc = xadesjs.CreateDocument();
                var el = doc.importNode(this.element, true);
                while (el.lastChild != null)
                    el.removeChild(el.lastChild);
                for (var i = 0; i < value.length; i++) {
                    var n = value[i];
                    el.appendChild(doc.importNode(n, true));
                }
                this.element = el;
                this.propertyModified = true;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DataObject.prototype, "Encoding", {
            /**
             * Gets or sets the encoding of the current DataObject object.
             */
            get: function () {
                return this.GetField(xadesjs.XmlSignature.AttributeNames.Encoding);
            },
            set: function (value) {
                this.SetField(xadesjs.XmlSignature.AttributeNames.Encoding, value);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DataObject.prototype, "Id", {
            /**
             * Gets or sets the identification of the current DataObject object.
             */
            get: function () {
                return this.GetField(xadesjs.XmlSignature.AttributeNames.Id);
            },
            set: function (value) {
                this.SetField(xadesjs.XmlSignature.AttributeNames.Id, value);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DataObject.prototype, "MimeType", {
            /**
             * Gets or sets the MIME type of the current DataObject object.
             */
            get: function () {
                return this.GetField(xadesjs.XmlSignature.AttributeNames.MimeType);
            },
            set: function (value) {
                this.SetField(xadesjs.XmlSignature.AttributeNames.MimeType, value);
            },
            enumerable: true,
            configurable: true
        });
        DataObject.prototype.GetField = function (attribute) {
            return this.element.hasAttribute(attribute) ? this.element.getAttribute(attribute) : null;
        };
        DataObject.prototype.SetField = function (attribute, value) {
            // MS-BUGS: it never cleans attribute value up.
            if (value == null)
                return;
            if (this.propertyModified)
                this.element.setAttribute(attribute, value);
            else {
                var doc = xadesjs.CreateDocument();
                var el = doc.importNode(this.element, true);
                el.setAttribute(attribute, value);
                this.element = el;
                this.propertyModified = true;
            }
        };
        /**
         * Returns the XML representation of the DataObject object.
         * @returns Element
         */
        DataObject.prototype.GetXml = function () {
            if (this.propertyModified) {
                // It looks MS.NET returns element which comes from new XmlDocument every time
                var oldElement = this.element;
                var doc = xadesjs.CreateDocument();
                var prefix = this.GetPrefix();
                this.element = doc.createElementNS(xadesjs.XmlSignature.NamespaceURI, prefix + xadesjs.XmlSignature.ElementNames.Object);
                for (var i = 0; i < oldElement.attributes.length; i++) {
                    var attribute = oldElement.attributes[i];
                    switch (attribute.nodeName) {
                        case xadesjs.XmlSignature.AttributeNames.Id:
                        case xadesjs.XmlSignature.AttributeNames.Encoding:
                        case xadesjs.XmlSignature.AttributeNames.MimeType:
                            this.element.setAttribute(attribute.nodeName, attribute.nodeValue);
                            break;
                    }
                }
                for (var i = 0; i < oldElement.childNodes.length; i++) {
                    var n = oldElement.childNodes[i];
                    this.element.appendChild(doc.importNode(n, true));
                }
            }
            return this.element;
        };
        /**
         * Loads a DataObject state from an XML element.
         * @param  {Element} value
         * @returns void
         */
        DataObject.prototype.LoadXml = function (value) {
            if (value == null)
                throw new xadesjs.XmlError(xadesjs.XE.PARAM_REQUIRED, "value");
            this.element = value;
            this.propertyModified = false;
        };
        return DataObject;
    }(xadesjs.XmlObject));
    xadesjs.DataObject = DataObject;
})(xadesjs || (xadesjs = {}));
/// <reference path="./xml.ts" />
var xadesjs;
(function (xadesjs) {
    /**
     * Represents the <reference> element of an XML signature.
     */
    var Reference = (function (_super) {
        __extends(Reference, _super);
        function Reference(p) {
            _super.call(this);
            // 
            this.chain = [];
            this.digestMethod = "http://www.w3.org/2001/04/xmlenc#sha256";
            if (typeof p === "string") {
                this.uri = p;
            }
        }
        Object.defineProperty(Reference.prototype, "DigestMethod", {
            /**
             * Gets or sets the digest method Uniform Resource Identifier (URI) of the current
             */
            get: function () {
                return this.digestMethod;
            },
            set: function (value) {
                this.element = null;
                this.digestMethod = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Reference.prototype, "DigestValue", {
            /**
             * Gets or sets the digest value of the current Reference.
             */
            get: function () {
                return this.digestValue;
            },
            set: function (value) {
                this.element = null;
                this.digestValue = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Reference.prototype, "Id", {
            /**
             * Gets or sets the ID of the current Reference.
             */
            get: function () {
                return this.id;
            },
            set: function (value) {
                this.element = null;
                this.id = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Reference.prototype, "TransformChain", {
            /**
             * Gets the transform chain of the current Reference.
             */
            get: function () {
                return this.chain;
            },
            set: function (value) {
                this.chain = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Reference.prototype, "Type", {
            /**
             * Gets or sets the type of the object being signed.
             */
            get: function () {
                return this.type;
            },
            set: function (value) {
                this.element = null;
                this.type = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Reference.prototype, "Uri", {
            /**
             * Gets or sets the Uri of the current Reference.
             */
            get: function () {
                return this.uri;
            },
            set: function (value) {
                this.element = null;
                this.uri = value;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Adds a Transform object to the list of transforms to be performed
         * on the data before passing it to the digest algorithm.
         * @param  {Transform} transform The transform to be added to the list of transforms.
         * @returns void
         */
        Reference.prototype.AddTransform = function (transform) {
            this.chain.push(transform);
        };
        /**
         * Returns the XML representation of the Reference.
         * @returns Element
         */
        Reference.prototype.GetXml = function () {
            if (this.element != null)
                return this.element;
            if (this.digestMethod == null)
                throw new xadesjs.XmlError(xadesjs.XE.CRYPTOGRAPHIC, "DigestMethod");
            if (this.digestValue == null)
                throw new xadesjs.XmlError(xadesjs.XE.PARAM_REQUIRED, "DigestValue");
            var prefix = this.GetPrefix();
            var doc = xadesjs.CreateDocument();
            var xel = doc.createElementNS(xadesjs.XmlSignature.NamespaceURI, prefix + xadesjs.XmlSignature.ElementNames.Reference);
            if (this.id != null)
                xel.setAttribute(xadesjs.XmlSignature.AttributeNames.Id, this.id);
            if (this.uri != null)
                xel.setAttribute(xadesjs.XmlSignature.AttributeNames.URI, this.uri);
            if (this.type != null)
                xel.setAttribute(xadesjs.XmlSignature.AttributeNames.Type, this.type);
            if (this.chain.length > 0) {
                var ts = doc.createElementNS(xadesjs.XmlSignature.NamespaceURI, prefix + xadesjs.XmlSignature.ElementNames.Transforms);
                for (var i in this.chain) {
                    var t = this.chain[i];
                    t.Prefix = this.Prefix;
                    var xn = t.GetXml();
                    var newNode = doc.importNode(xn, true);
                    ts.appendChild(newNode);
                }
                xel.appendChild(ts);
            }
            var dm = doc.createElementNS(xadesjs.XmlSignature.NamespaceURI, prefix + xadesjs.XmlSignature.ElementNames.DigestMethod);
            dm.setAttribute(xadesjs.XmlSignature.AttributeNames.Algorithm, this.digestMethod);
            xel.appendChild(dm);
            var dv = doc.createElementNS(xadesjs.XmlSignature.NamespaceURI, prefix + xadesjs.XmlSignature.ElementNames.DigestValue);
            dv.textContent = xadesjs.Convert.ToBase64String(xadesjs.Convert.FromBufferString(this.digestValue));
            xel.appendChild(dv);
            return xel;
        };
        // note: we do NOT return null -on purpose- if attribute isn't found
        Reference.prototype.GetAttribute = function (xel, attribute) {
            return xel.hasAttribute(attribute) ? xel.getAttribute(attribute) : null;
        };
        /**
         * Loads a Reference state from an XML element.
         * @param  {Element} value
         */
        Reference.prototype.LoadXml = function (value) {
            if (value == null)
                throw new xadesjs.XmlError(xadesjs.XE.PARAM_REQUIRED, "value");
            if ((value.localName !== xadesjs.XmlSignature.ElementNames.Reference) || (value.namespaceURI !== xadesjs.XmlSignature.NamespaceURI))
                throw new xadesjs.XmlError(xadesjs.XE.CRYPTOGRAPHIC, "value");
            this.id = this.GetAttribute(value, xadesjs.XmlSignature.AttributeNames.Id);
            this.uri = this.GetAttribute(value, xadesjs.XmlSignature.AttributeNames.URI);
            this.type = this.GetAttribute(value, xadesjs.XmlSignature.AttributeNames.Type);
            // Note: order is important for validations
            var xnl = value.getElementsByTagNameNS(xadesjs.XmlSignature.NamespaceURI, xadesjs.XmlSignature.ElementNames.Transform);
            if ((xnl != null) && (xnl.length > 0)) {
                var t = null;
                for (var i = 0; i < xnl.length; i++) {
                    var xn = xnl[i];
                    var a = this.GetAttribute(xn, xadesjs.XmlSignature.AttributeNames.Algorithm);
                    t = xadesjs.CryptoConfig.CreateFromName(a);
                    if (t == null)
                        throw new xadesjs.XmlError(xadesjs.XE.CRYPTOGRAPHIC_UNKNOWN_TRANSFORM, a);
                    // if (xn.childNodes.length > 0) {
                    //     t.LoadInnerXml(xn.childNodes);
                    // }
                    // ***workaround for validating windows mobile store signatures - it uses c14n but does not state it in the transforms
                    // if (transforms.length === 1 && transforms[0] === "http://www.w3.org/2000/09/xmldsig#enveloped-signature")
                    //     transforms.push("http://www.w3.org/2001/10/xml-exc-c14n#");
                    this.AddTransform(t);
                }
            }
            // get DigestMethod
            this.DigestMethod = xadesjs.XmlSignature.GetAttributeFromElement(value, xadesjs.XmlSignature.AttributeNames.Algorithm, xadesjs.XmlSignature.ElementNames.DigestMethod);
            // get DigestValue
            var dig = xadesjs.XmlSignature.GetChildElement(value, xadesjs.XmlSignature.ElementNames.DigestValue, xadesjs.XmlSignature.NamespaceURI);
            if (dig != null)
                this.DigestValue = xadesjs.Convert.ToBufferString(xadesjs.Convert.FromBase64String(dig.textContent));
            this.element = value;
        };
        return Reference;
    }(xadesjs.XmlObject));
    xadesjs.Reference = Reference;
})(xadesjs || (xadesjs = {}));
var xadesjs;
(function (xadesjs) {
    /**
     * Represents an XML digital signature or XML encryption <KeyInfo> element.
     */
    var KeyInfo = (function (_super) {
        __extends(KeyInfo, _super);
        function KeyInfo() {
            _super.call(this);
            this.Info = [];
        }
        Object.defineProperty(KeyInfo.prototype, "length", {
            /**
             * Gets the number of KeyInfoClause objects contained in the KeyInfo object.
             */
            get: function () {
                return this.Info.length;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(KeyInfo.prototype, "Id", {
            /**
             * Gets or sets the key information identity.
             */
            get: function () {
                return this.id;
            },
            set: function (value) {
                this.id = value;
            },
            enumerable: true,
            configurable: true
        });
        KeyInfo.prototype.GetEnumerator = function (requestedObjectType) {
            if (!requestedObjectType)
                return this.Info;
            var TypeList = [];
            for (var _i = 0, _a = this.Info; _i < _a.length; _i++) {
                var el = _a[_i];
                // ...with all object of specified type...
                if (el instanceof requestedObjectType)
                    TypeList.push(el);
            }
            // ...and return its enumerator
            return TypeList;
        };
        /**
         * Returns an enumerator of the KeyInfoClause objects in the KeyInfo object.
         * @param  {KeyInfoClause} clause The KeyInfoClause to add to the KeyInfo object.
         * @returns void
         */
        KeyInfo.prototype.AddClause = function (clause) {
            this.Info.push(clause);
        };
        /**
         * Returns the XML representation of the KeyInfo object.
         * @returns Node
         */
        KeyInfo.prototype.GetXml = function () {
            var doc = xadesjs.CreateDocument();
            var prefix = this.GetPrefix();
            var xel = doc.createElementNS(xadesjs.XmlSignature.NamespaceURI, prefix + xadesjs.XmlSignature.ElementNames.KeyInfo);
            // we add References afterward so we don't end up with extraneous
            // xmlns="..." in each reference elements.
            for (var i in this.Info) {
                var kic = this.Info[i];
                kic.Prefix = this.Prefix;
                var xn = kic.GetXml();
                var newNode = doc.importNode(xn, true);
                xel.appendChild(newNode);
            }
            return xel;
        };
        /**
         * Loads a KeyInfo state from an XML element.
         * @param  {Element} value
         * @returns void
         */
        KeyInfo.prototype.LoadXml = function (value) {
            if (value == null)
                throw new xadesjs.XmlError(xadesjs.XE.PARAM_REQUIRED, "value");
            this.Id = value.hasAttribute("Id") ? value.getAttribute("Id") : null;
            if ((value.localName === xadesjs.XmlSignature.ElementNames.KeyInfo) && (value.namespaceURI === xadesjs.XmlSignature.NamespaceURI)) {
                for (var i = 0; i < value.childNodes.length; i++) {
                    var n = value.childNodes[i];
                    if (n.nodeType !== xadesjs.XmlNodeType.Element)
                        continue;
                    var kic = null;
                    switch (n.localName) {
                        case xadesjs.XmlSignature.ElementNames.KeyValue:
                            var xnl = n.childNodes;
                            if (xnl.length > 0) {
                                // we must now treat the whitespace !
                                for (var j = 0; j < xnl.length; j++) {
                                    var m = xnl[j];
                                    switch (m.localName) {
                                        case xadesjs.XmlSignature.ElementNames.ECKeyValue:
                                            kic = new xadesjs.EcdsaKeyValue();
                                            n = m;
                                            break;
                                        case xadesjs.XmlSignature.ElementNames.RSAKeyValue:
                                            kic = new xadesjs.RsaKeyValue();
                                            n = m;
                                            break;
                                    }
                                }
                            }
                            break;
                        case xadesjs.XmlSignature.ElementNames.KeyName:
                            throw new xadesjs.XmlError(xadesjs.XE.METHOD_NOT_IMPLEMENTED);
                        // kic = <KeyInfoClause>new KeyInfoName();
                        // break;
                        case xadesjs.XmlSignature.ElementNames.RetrievalMethod:
                            throw new xadesjs.XmlError(xadesjs.XE.METHOD_NOT_IMPLEMENTED);
                        // kic = <KeyInfoClause>new KeyInfoRetrievalMethod();
                        // break;
                        case xadesjs.XmlSignature.ElementNames.X509Data:
                            kic = new xadesjs.KeyInfoX509Data();
                            break;
                        case xadesjs.XmlSignature.ElementNames.RSAKeyValue:
                            kic = new xadesjs.RsaKeyValue();
                            break;
                        case xadesjs.XmlSignature.ElementNames.EncryptedKey:
                            throw new xadesjs.XmlError(xadesjs.XE.METHOD_NOT_IMPLEMENTED);
                        // kic = <KeyInfoClause>new KeyInfoEncryptedKey();
                        // break;
                        default:
                            throw new xadesjs.XmlError(xadesjs.XE.METHOD_NOT_IMPLEMENTED);
                    }
                    if (kic != null) {
                        kic.LoadXml(n);
                        this.AddClause(kic);
                    }
                }
            }
            // No check is performed on MS.NET...
        };
        return KeyInfo;
    }(xadesjs.XmlObject));
    xadesjs.KeyInfo = KeyInfo;
})(xadesjs || (xadesjs = {}));
var xadesjs;
(function (xadesjs) {
    /**
     * Represents the <Signature> element of an XML signature.
     */
    var Signature = (function (_super) {
        __extends(Signature, _super);
        function Signature() {
            _super.call(this);
            this.list = [];
        }
        Object.defineProperty(Signature.prototype, "Id", {
            get: function () {
                return this.id;
            },
            /**
             * Gets or sets the ID of the current Signature.
             */
            set: function (value) {
                this.element = null;
                this.id = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Signature.prototype, "KeyInfo", {
            /**
             * Gets or sets the KeyInfo of the current Signature.
             */
            get: function () {
                return this.key;
            },
            set: function (value) {
                this.element = null;
                this.key = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Signature.prototype, "ObjectList", {
            /**
             * Gets or sets a list of objects to be signed.
             */
            get: function () {
                return this.list;
            },
            set: function (value) {
                this.list = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Signature.prototype, "SignatureValue", {
            /**
             * Gets or sets the value of the digital signature.
             */
            get: function () {
                return this.signature;
            },
            set: function (value) {
                this.element = null;
                this.signature = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Signature.prototype, "SignedInfo", {
            /**
             * Gets or sets the SignedInfo of the current Signature.
             */
            get: function () {
                return this.info;
            },
            set: function (value) {
                this.element = null;
                this.info = value;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Adds a DataObject to the list of objects to be signed.
         * @param  {DataObject} dataObject The DataObject to be added to the list of objects to be signed.
         * @returns void
         */
        Signature.prototype.AddObject = function (dataObject) {
            this.list.push(dataObject);
        };
        /**
         * Returns the XML representation of the Signature.
         * @returns Element
         */
        Signature.prototype.GetXml = function () {
            if (this.element != null)
                return this.element;
            if (this.info == null)
                throw new xadesjs.XmlError(xadesjs.XE.PARAM_REQUIRED, "SignedInfo");
            if (this.signature == null)
                throw new xadesjs.XmlError(xadesjs.XE.PARAM_REQUIRED, "SignatureValue");
            var document = xadesjs.CreateDocument();
            var prefix = this.GetPrefix();
            var xel = document.createElementNS(xadesjs.XmlSignature.NamespaceURI, prefix + xadesjs.XmlSignature.ElementNames.Signature);
            // add xmlns for xmldom
            if (xadesjs.Application.isNodePlugin()) {
                xel.setAttribute("xmlns:" + this.Prefix, xadesjs.XmlSignature.NamespaceURI);
            }
            if (this.id != null)
                xel.setAttribute(xadesjs.XmlSignature.AttributeNames.Id, this.id);
            this.info.Prefix = this.Prefix;
            var xn = this.info.GetXml();
            var newNode = document.importNode(xn, true);
            xel.appendChild(newNode);
            if (this.signature != null) {
                var sv = document.createElementNS(xadesjs.XmlSignature.NamespaceURI, prefix + xadesjs.XmlSignature.ElementNames.SignatureValue);
                sv.textContent = xadesjs.Convert.ToBase64String(xadesjs.Convert.FromBufferString(this.signature));
                xel.appendChild(sv);
            }
            if (this.key != null) {
                this.key.Prefix = this.Prefix;
                xn = this.key.GetXml();
                newNode = document.importNode(xn, true);
                xel.appendChild(newNode);
            }
            if (this.list.length > 0) {
                for (var i in this.list) {
                    var obj = this.list[i];
                    obj.Prefix = this.Prefix;
                    xn = obj.GetXml();
                    newNode = document.importNode(xn, true);
                    xel.appendChild(newNode);
                }
            }
            return xel;
        };
        /**
         * Loads a Signature state from an XML element.
         * @param  {Element} value
         * @returns void
         */
        Signature.prototype.LoadXml = function (value) {
            if (value == null)
                throw new xadesjs.XmlError(xadesjs.XE.PARAM_REQUIRED, "value");
            if ((value.localName === xadesjs.XmlSignature.ElementNames.Signature) && (value.namespaceURI === xadesjs.XmlSignature.NamespaceURI)) {
                this.id = this.getAttribute(value, xadesjs.XmlSignature.AttributeNames.Id);
                // LAMESPEC: This library is totally useless against eXtensibly Marked-up document.
                var i = this.NextElementPos(value.childNodes, 0, xadesjs.XmlSignature.ElementNames.SignedInfo, xadesjs.XmlSignature.NamespaceURI, true);
                var sinfo = value.childNodes[i];
                this.info = new xadesjs.SignedInfo();
                this.info.LoadXml(sinfo);
                i = this.NextElementPos(value.childNodes, ++i, xadesjs.XmlSignature.ElementNames.SignatureValue, xadesjs.XmlSignature.NamespaceURI, true);
                var sigValue = value.childNodes[i];
                this.signature = xadesjs.Convert.ToBufferString(xadesjs.Convert.FromBase64String(sigValue.textContent));
                // signature isn't required: <element ref="ds:KeyInfo" minOccurs="0"/> 
                i = this.NextElementPos(value.childNodes, ++i, xadesjs.XmlSignature.ElementNames.KeyInfo, xadesjs.XmlSignature.NamespaceURI, false);
                if (i > 0) {
                    var kinfo = value.childNodes[i];
                    this.key = new xadesjs.KeyInfo();
                    this.key.LoadXml(kinfo);
                }
                var xnl = value.getElementsByTagNameNS(xadesjs.XmlSignature.NamespaceURI, "Object");
                for (var i_1 = 0; i_1 < xnl.length; i_1++) {
                    var xn = xnl[i_1];
                    var obj = new xadesjs.DataObject();
                    obj.LoadXml(xn);
                    this.AddObject(obj);
                }
            }
            else
                throw new xadesjs.XmlError(xadesjs.XE.ELEMENT_MALFORMED, "Signature");
            // if invalid
            if (this.info == null)
                throw new xadesjs.XmlError(xadesjs.XE.PARAM_REQUIRED, "SignedInfo");
            if (this.signature == null)
                throw new xadesjs.XmlError(xadesjs.XE.PARAM_REQUIRED, "SignatureValue");
        };
        Signature.prototype.NextElementPos = function (nl, pos, name, ns, required) {
            while (pos < nl.length) {
                if (nl[pos].nodeType === xadesjs.XmlNodeType.Element) {
                    if (nl[pos].localName !== name || nl[pos].namespaceURI !== ns) {
                        if (required)
                            throw new xadesjs.XmlError(xadesjs.XE.ELEMENT_MALFORMED, name);
                        else
                            return -2;
                    }
                    else
                        return pos;
                }
                else
                    pos++;
            }
            if (required)
                throw new xadesjs.XmlError(xadesjs.XE.ELEMENT_MALFORMED, name);
            return -1;
        };
        return Signature;
    }(xadesjs.XmlObject));
    xadesjs.Signature = Signature;
    xadesjs.XmlSignature = {
        DefaultPrefix: "ds",
        ElementNames: {
            CanonicalizationMethod: "CanonicalizationMethod",
            DigestMethod: "DigestMethod",
            DigestValue: "DigestValue",
            DSAKeyValue: "DSAKeyValue",
            EncryptedKey: "EncryptedKey",
            HMACOutputLength: "HMACOutputLength",
            RSAPSSParams: "RSAPSSParams",
            MaskGenerationFunction: "MaskGenerationFunction",
            SaltLength: "SaltLength",
            KeyInfo: "KeyInfo",
            KeyName: "KeyName",
            KeyValue: "KeyValue",
            Modulus: "Modulus",
            Exponent: "Exponent",
            Manifest: "Manifest",
            Object: "Object",
            Reference: "Reference",
            RetrievalMethod: "RetrievalMethod",
            RSAKeyValue: "RSAKeyValue",
            ECKeyValue: "ECKeyValue",
            NamedCurve: "NamedCurve",
            PublicKey: "PublicKey",
            Signature: "Signature",
            SignatureMethod: "SignatureMethod",
            SignatureValue: "SignatureValue",
            SignedInfo: "SignedInfo",
            Transform: "Transform",
            Transforms: "Transforms",
            X509Data: "X509Data",
            X509IssuerSerial: "X509IssuerSerial",
            X509IssuerName: "X509IssuerName",
            X509SerialNumber: "X509SerialNumber",
            X509SKI: "X509SKI",
            X509SubjectName: "X509SubjectName",
            X509Certificate: "X509Certificate",
            X509CRL: "X509CRL"
        },
        AttributeNames: {
            Algorithm: "Algorithm",
            Encoding: "Encoding",
            Id: "Id",
            MimeType: "MimeType",
            Type: "Type",
            URI: "URI",
        },
        AlgorithmNamespaces: {
            XmlDsigBase64Transform: "http://www.w3.org/2000/09/xmldsig#base64",
            XmlDsigC14NTransform: "http://www.w3.org/TR/2001/REC-xml-c14n-20010315",
            XmlDsigC14NWithCommentsTransform: "http://www.w3.org/TR/2001/REC-xml-c14n-20010315#WithComments",
            XmlDsigEnvelopedSignatureTransform: "http://www.w3.org/2000/09/xmldsig#enveloped-signature",
            XmlDsigXPathTransform: "http://www.w3.org/TR/1999/REC-xpath-19991116",
            XmlDsigXsltTransform: "http://www.w3.org/TR/1999/REC-xslt-19991116",
            XmlDsigExcC14NTransform: "http://www.w3.org/2001/10/xml-exc-c14n#",
            XmlDsigExcC14NWithCommentsTransform: "http://www.w3.org/2001/10/xml-exc-c14n#WithComments",
            XmlDecryptionTransform: "http://www.w3.org/2002/07/decrypt#XML",
            XmlLicenseTransform: "urn:mpeg:mpeg21:2003:01-REL-R-NS:licenseTransform"
        },
        Uri: {
            Manifest: "http://www.w3.org/2000/09/xmldsig#Manifest"
        },
        NamespaceURI: "http://www.w3.org/2000/09/xmldsig#",
        NamespaceURIMore: "http://www.w3.org/2007/05/xmldsig-more#",
        NamespaceURIPss: "http://www.example.org/xmldsig-pss/#",
        Prefix: "ds",
        GetChildElement: function GetChildElement(xel, element, ns) {
            for (var i = 0; i < xel.childNodes.length; i++) {
                var n = xel.childNodes[i];
                if (n.nodeType === xadesjs.XmlNodeType.Element && n.localName === element && n.namespaceURI === ns)
                    return n;
            }
            return null;
        },
        GetAttributeFromElement: function GetAttributeFromElement(xel, attribute, element) {
            var el = this.GetChildElement(xel, element, xadesjs.XmlSignature.NamespaceURI);
            return el != null ? el.getAttribute(attribute) : null;
        },
        GetChildElements: function GetChildElements(xel, element) {
            var al = [];
            for (var i = 0; i < xel.childNodes.length; i++) {
                var n = xel.childNodes[i];
                if (n.nodeType === xadesjs.XmlNodeType.Element && n.localName === element && n.namespaceURI === xadesjs.XmlSignature.NamespaceURI)
                    al.push(n);
            }
            return al;
        }
    };
})(xadesjs || (xadesjs = {}));
var xadesjs;
(function (xadesjs) {
    /**
     * The SignedInfo class represents the <SignedInfo> element
     * of an XML signature defined by the XML digital signature specification
     */
    var SignedInfo = (function (_super) {
        __extends(SignedInfo, _super);
        function SignedInfo(signedXml) {
            _super.call(this);
            this.signedXml = null;
            if (signedXml)
                this.signedXml = signedXml;
            this.references = new Array();
            this.c14nMethod = xadesjs.XmlSignature.AlgorithmNamespaces.XmlDsigC14NTransform;
        }
        Object.defineProperty(SignedInfo.prototype, "CanonicalizationMethod", {
            /**
             * Gets or sets the canonicalization algorithm that is used before signing
             * for the current SignedInfo object.
             */
            get: function () {
                return this.c14nMethod;
            },
            set: function (value) {
                this.c14nMethod = value;
                this.element = null;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SignedInfo.prototype, "CanonicalizationMethodObject", {
            /**
             * Gets a Transform object used for canonicalization.
             * @returns Transform
             */
            get: function () {
                return xadesjs.CryptoConfig.CreateFromName(this.CanonicalizationMethod);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SignedInfo.prototype, "Count", {
            /**
             * Gets the number of references in the current SignedInfo object.
             */
            get: function () {
                return this.References.length;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SignedInfo.prototype, "Id", {
            /**
             * Gets or sets the ID of the current SignedInfo object.
             */
            get: function () {
                return this.id;
            },
            set: function (value) {
                this.element = null;
                this.id = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SignedInfo.prototype, "IsReadOnly", {
            /**
             * Gets a value that indicates whether the collection is read-only.
             * @returns boolean
             */
            get: function () {
                throw new xadesjs.XmlError(xadesjs.XE.METHOD_NOT_SUPPORTED);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SignedInfo.prototype, "IsSynchronized", {
            /**
             * Gets a value that indicates whether the collection is synchronized.
             * @returns boolean
             */
            get: function () {
                throw new xadesjs.XmlError(xadesjs.XE.METHOD_NOT_SUPPORTED);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SignedInfo.prototype, "References", {
            /**
             * Gets a list of the Reference objects of the current SignedInfo object.
             */
            get: function () {
                return this.references;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SignedInfo.prototype, "SignatureLength", {
            /**
             * Gets or sets the length of the signature for the current SignedInfo object.
             */
            get: function () {
                return this.signatureLength;
            },
            set: function (value) {
                this.element = null;
                this.signatureLength = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SignedInfo.prototype, "SignatureMethod", {
            /**
             * Gets or sets the name of the algorithm used for signature generation
             * and validation for the current SignedInfo object.
             */
            get: function () {
                return this.signatureMethod;
            },
            set: function (value) {
                this.element = null;
                this.signatureMethod = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SignedInfo.prototype, "SignatureParams", {
            get: function () {
                return this.signatureParams;
            },
            set: function (v) {
                this.signatureParams = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SignedInfo.prototype, "SyncRoot", {
            /**
             * Gets an object to use for synchronization.
             */
            get: function () {
                throw new xadesjs.XmlError(xadesjs.XE.METHOD_NOT_SUPPORTED);
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Adds a Reference object to the list of references to digest and sign.
         * @param  {Reference} reference The reference to add to the list of references.
         * @returns void
         */
        SignedInfo.prototype.AddReference = function (reference) {
            this.references.push(reference);
        };
        /**
         * Copies the elements of this instance into an Array object, starting at a specified index in the array.
         * @param  {any[]} array
         * @param  {number} index
         * @returns void
         */
        SignedInfo.prototype.CopyTo = function (array, index) {
            throw new xadesjs.XmlError(xadesjs.XE.METHOD_NOT_SUPPORTED);
        };
        /**
         * Returns the XML representation of the SignedInfo object.
         * @returns Node
         */
        SignedInfo.prototype.GetXml = function () {
            if (this.element != null)
                return this.element;
            if (this.signatureMethod == null)
                throw new xadesjs.XmlError(xadesjs.XE.CRYPTOGRAPHIC, "SignatureMethod");
            if (this.references.length === 0)
                throw new xadesjs.XmlError(xadesjs.XE.CRYPTOGRAPHIC, "References empty");
            var prefix = this.GetPrefix();
            var doc = xadesjs.CreateDocument();
            var xel = doc.createElementNS(xadesjs.XmlSignature.NamespaceURI, prefix + xadesjs.XmlSignature.ElementNames.SignedInfo);
            if (this.id != null)
                xel.setAttribute(xadesjs.XmlSignature.AttributeNames.Id, this.id);
            if (this.c14nMethod) {
                var c14n = doc.createElementNS(xadesjs.XmlSignature.NamespaceURI, prefix + xadesjs.XmlSignature.ElementNames.CanonicalizationMethod);
                c14n.setAttribute(xadesjs.XmlSignature.AttributeNames.Algorithm, this.c14nMethod);
                xel.appendChild(c14n);
            }
            if (this.signatureMethod) {
                var sm = doc.createElementNS(xadesjs.XmlSignature.NamespaceURI, prefix + xadesjs.XmlSignature.ElementNames.SignatureMethod);
                sm.setAttribute(xadesjs.XmlSignature.AttributeNames.Algorithm, this.signatureMethod);
                if (this.signedXml && this.signedXml.SigningKey) {
                    // HMAC
                    if (this.signedXml.SigningKey.algorithm.name === xadesjs.HMAC_ALGORITHM) {
                        var hmac = doc.createElementNS(xadesjs.XmlSignature.NamespaceURI, prefix + xadesjs.XmlSignature.ElementNames.HMACOutputLength);
                        hmac.textContent = this.signedXml.SigningKey.algorithm.length;
                        sm.appendChild(hmac);
                    }
                    else if (this.signedXml.SigningKey.algorithm.name === xadesjs.RSA_PSS) {
                        this.signatureParams.Prefix = "pss";
                        this.signatureParams.dsPrefix = this.Prefix;
                        var pss = this.signatureParams.GetXml();
                        sm.appendChild(pss);
                    }
                }
                xel.appendChild(sm);
            }
            // This check is only done when element is created here.
            if (this.references.length === 0)
                throw new xadesjs.XmlError(xadesjs.XE.CRYPTOGRAPHIC, "At least one Reference element is required in SignedInfo.");
            // we add References afterward so we don't end up with extraneous
            // xmlns="..." in each reference elements.
            for (var i in this.references) {
                var r = this.references[i];
                r.Prefix = this.Prefix;
                var xn = r.GetXml();
                var newNode = doc.importNode(xn, true);
                xel.appendChild(newNode);
            }
            return xel;
        };
        SignedInfo.prototype.GetAttribute = function (xel, attribute) {
            if (!xel.hasAttribute(attribute))
                return null;
            return xel.getAttribute(attribute);
        };
        /**
         * Loads a SignedInfo state from an XML element.
         * @param  {Element} value
         * @returns void
         */
        SignedInfo.prototype.LoadXml = function (value) {
            if (value == null)
                throw new xadesjs.XmlError(xadesjs.XE.PARAM_REQUIRED, "value");
            if ((value.localName !== xadesjs.XmlSignature.ElementNames.SignedInfo) || (value.namespaceURI !== xadesjs.XmlSignature.NamespaceURI))
                throw new xadesjs.XmlError(xadesjs.XE.CRYPTOGRAPHIC, "value");
            this.id = this.GetAttribute(value, xadesjs.XmlSignature.AttributeNames.Id);
            this.c14nMethod = xadesjs.XmlSignature.GetAttributeFromElement(value, xadesjs.XmlSignature.AttributeNames.Algorithm, xadesjs.XmlSignature.ElementNames.CanonicalizationMethod);
            var sm = xadesjs.XmlSignature.GetChildElement(value, xadesjs.XmlSignature.ElementNames.SignatureMethod, xadesjs.XmlSignature.NamespaceURI);
            if (sm !== null) {
                this.signatureMethod = sm.getAttribute(xadesjs.XmlSignature.AttributeNames.Algorithm);
                if (sm.hasChildNodes) {
                    var pss = xadesjs.XmlSignature.GetChildElement(sm, xadesjs.XmlSignature.ElementNames.RSAPSSParams, xadesjs.XmlSignature.NamespaceURIPss);
                    if (pss) {
                        this.signatureParams = new xadesjs.PssAlgorithmParams();
                        this.signatureParams.LoadXml(pss);
                    }
                }
            }
            for (var i = 0; i < value.childNodes.length; i++) {
                var n = value.childNodes[i];
                if (n.nodeType === xadesjs.XmlNodeType.Element &&
                    n.localName === xadesjs.XmlSignature.ElementNames.Reference &&
                    n.namespaceURI === xadesjs.XmlSignature.NamespaceURI) {
                    var r = new xadesjs.Reference();
                    r.LoadXml(n);
                    this.AddReference(r);
                }
            }
            this.element = value;
        };
        return SignedInfo;
    }(xadesjs.XmlObject));
    xadesjs.SignedInfo = SignedInfo;
})(xadesjs || (xadesjs = {}));
var xadesjs;
(function (xadesjs) {
    xadesjs.APPLICATION_XML = "application/xml";
    /**
    * Provides a wrapper on a core XML signature object to facilitate creating XML signatures.
    */
    var SignedXml = (function (_super) {
        __extends(SignedXml, _super);
        function SignedXml(node) {
            _super.call(this);
            // Internal properties
            this.m_element = null;
            /**
             * Represents the Signature object of the current SignedXml object
             */
            this.m_signature = null;
            this.m_signature_algorithm = null;
            this.envdoc = null;
            this.validationErrors = [];
            this.key = null;
            this.idAttributes = ["Id", "ID"];
            // constructor();
            this.m_signature = new xadesjs.Signature();
            this.m_signature.SignedInfo = new xadesjs.SignedInfo(this);
            // this.hashes = new Hashtable(2); // 98% SHA1 for now
            if (node && node.nodeType === xadesjs.XmlNodeType.Document) {
                // constructor(node: Document);
                this.envdoc = node;
            }
            else if (node && node.nodeType === xadesjs.XmlNodeType.Element) {
                // constructor(node: Element);
                var xmlText = new XMLSerializer().serializeToString(node);
                this.envdoc = new DOMParser().parseFromString(xmlText, xadesjs.APPLICATION_XML);
            }
        }
        Object.defineProperty(SignedXml.prototype, "KeyInfo", {
            /**
             * Gets or sets the KeyInfo object of the current SignedXml object.
             */
            get: function () {
                if (this.m_signature.KeyInfo == null)
                    this.m_signature.KeyInfo = new xadesjs.KeyInfo();
                return this.m_signature.KeyInfo;
            },
            set: function (value) {
                this.m_signature.KeyInfo = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SignedXml.prototype, "Signature", {
            /**
             * Gets the Signature object of the current SignedXml object.
             */
            get: function () {
                return this.m_signature;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SignedXml.prototype, "Prefix", {
            get: function () {
                return this.m_prefix;
            },
            /**
             * Gets or sets the prefix for the current SignedXml object.
             */
            set: function (value) {
                this.m_prefix = value;
                this.SignedInfo.Prefix = this.m_prefix;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SignedXml.prototype, "SignatureLength", {
            /**
             * Gets the length of the signature for the current SignedXml object.
             */
            get: function () {
                return this.m_signature.SignatureValue.length;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SignedXml.prototype, "SignatureMethod", {
            get: function () {
                return this.m_signature.SignedInfo.SignatureMethod;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SignedXml.prototype, "SignatureValue", {
            /**
             * Gets the signature value of the current SignedXml object.
             */
            get: function () {
                return this.m_signature.SignatureValue;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SignedXml.prototype, "CanonicalizationMethod", {
            /**
             * Gets the CanonicalizationMethod of the current SignedXml object.
             */
            get: function () {
                return this.m_signature.SignedInfo.CanonicalizationMethod;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SignedXml.prototype, "SignedInfo", {
            /**
             * Gets the SignedInfo object of the current SignedXml object.
             */
            get: function () {
                return this.m_signature.SignedInfo;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SignedXml.prototype, "SigningKey", {
            /**
             * Gets or sets the asymmetric algorithm key used for signing a SignedXml object.
             */
            get: function () {
                return this.key;
            },
            set: function (value) {
                this.key = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SignedXml.prototype, "SigningKeyName", {
            /**
             * Gets or sets the name of the installed key to be used for signing the SignedXml object.
             */
            get: function () {
                throw new xadesjs.XmlError(xadesjs.XE.METHOD_NOT_IMPLEMENTED);
            },
            set: function (value) {
                throw new xadesjs.XmlError(xadesjs.XE.METHOD_NOT_IMPLEMENTED);
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Returns the public key of a signature.
         */
        SignedXml.prototype.GetPublicKey = function () {
            var _this = this;
            return new Promise(function (resolve, reject) {
                if (_this.key !== null)
                    return resolve(_this.key);
                var pkEnumerator = _this.KeyInfo.GetEnumerator();
                for (var _i = 0, pkEnumerator_1 = pkEnumerator; _i < pkEnumerator_1.length; _i++) {
                    var kic = pkEnumerator_1[_i];
                    var alg = xadesjs.CryptoConfig.CreateSignatureAlgorithm(_this.SignatureMethod);
                    kic.exportKey(alg.algorithm)
                        .then(function (key) {
                        _this.key = key;
                        return Promise.resolve(key);
                    })
                        .then(resolve, reject);
                }
            });
        };
        /**
         * Adds a Reference object to the SignedXml object that describes a digest method,
         * digest value, and transform to use for creating an XML digital signature.
         * @param  {Reference} reference The Reference object that describes a digest method, digest value,
         * and transform to use for creating an XML digital signature.
         * @returns void
         */
        SignedXml.prototype.AddReference = function (reference) {
            if (reference == null)
                throw new xadesjs.XmlError(xadesjs.XE.PARAM_REQUIRED, "reference");
            this.m_signature.SignedInfo.AddReference(reference);
        };
        SignedXml.prototype.DigestReferences = function () {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var promise = Promise.resolve();
                // we must tell each reference which hash algorithm to use 
                // before asking for the SignedInfo XML !
                var _loop_1 = function(r) {
                    // assume SHA-1 if nothing is specified
                    if (r.DigestMethod == null)
                        r.DigestMethod = new xadesjs.Sha1().xmlNamespace;
                    promise = promise.then(function () {
                        return _this.GetReferenceHash(r, false);
                    })
                        .then(function (hashValue) {
                        r.DigestValue = hashValue;
                        return Promise.resolve();
                    });
                };
                for (var _i = 0, _a = _this.m_signature.SignedInfo.References; _i < _a.length; _i++) {
                    var r = _a[_i];
                    _loop_1(r);
                }
                promise.then(resolve, reject);
            });
        };
        SignedXml.prototype.FixupNamespaceNodes = function (src, dst, ignoreDefault) {
            // add namespace nodes
            var namespaces = xadesjs.SelectNamespaces(src);
            for (var i in namespaces) {
                var uri = namespaces[i];
                dst.setAttribute("xmlns" + (i ? ":" + i : ""), uri);
            }
        };
        SignedXml.prototype.findById = function (element, id) {
            if (element.nodeType !== xadesjs.XmlNodeType.Element)
                return null;
            if (element.hasAttribute("Id") && element.getAttribute("Id") === id)
                return element;
            if (element.childNodes && element.childNodes.length)
                for (var i = 0; i < element.childNodes.length; i++) {
                    var el = this.findById(element.childNodes[i], id);
                    if (el)
                        return el;
                }
            return null;
        };
        SignedXml.prototype.GetReferenceHash = function (r, check_hmac) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var doc = null;
                var s = null;
                if (!r.Uri) {
                    doc = _this.envdoc;
                }
                else {
                    doc = xadesjs.CreateDocument();
                    var objectName = null;
                    if (r.Uri.indexOf("#xpointer") === 0) {
                        var uri_1 = r.Uri;
                        SignedXml.whitespaceChars.forEach(function (c) {
                            uri_1 = uri_1.substring(9).split(c).join("");
                        });
                        if (uri_1.length < 2 || uri_1[0] !== "(" || uri_1[uri_1.length - 1] !== ")")
                            // FIXME: how to handle invalid xpointer?
                            uri_1 = ""; // String.Empty
                        else
                            uri_1 = uri_1.substring(1, uri_1.length - 2);
                        if (uri_1 === "/")
                            doc = _this.envdoc;
                        else if (uri_1.length > 6 && uri_1.indexOf("id(") === 0 && uri_1[uri_1.length - 1] === ")")
                            // id('foo'), id("foo")
                            objectName = uri_1.substring(4, uri_1.length - 6);
                    }
                    else if (r.Uri[0] === "#") {
                        objectName = r.Uri.substring(1);
                    }
                    if (objectName != null) {
                        var found = null;
                        for (var i in _this.m_signature.ObjectList) {
                            var obj = _this.m_signature.ObjectList[i];
                            found = _this.findById(obj.element, objectName);
                            if (found) {
                                doc = doc.importNode(found, true);
                                // FIXME: there should be theoretical justification of copying namespace declaration nodes this way.
                                for (var j = 0; j < found.childNodes.length; j++) {
                                    var n = found.childNodes[j];
                                    // Do not copy default namespace as it must be xmldsig namespace for "Object" element.
                                    if (n.nodeType === xadesjs.XmlNodeType.Element)
                                        _this.FixupNamespaceNodes(n, doc, true);
                                }
                                break;
                            }
                        }
                        if (found == null && _this.envdoc != null) {
                            found = _this.GetElementById(_this.envdoc, objectName);
                            if (found != null) {
                                doc = doc.importNode(found, true);
                                _this.FixupNamespaceNodes(found, doc, false);
                            }
                        }
                        if (found == null)
                            throw new xadesjs.XmlError(xadesjs.XE.CRYPTOGRAPHIC, "Malformed reference object: " + objectName);
                    }
                }
                if (r.TransformChain.length > 0) {
                    // Sort transforms. Enveloped should be first transform
                    r.TransformChain.sort(function (a, b) {
                        if (b instanceof xadesjs.XmlDsigEnvelopedSignatureTransform)
                            return 1;
                        return 0;
                    });
                    for (var i in r.TransformChain) {
                        var t = r.TransformChain[i];
                        if (t instanceof xadesjs.XmlDsigC14NWithCommentsTransform)
                            t = new xadesjs.XmlDsigC14NTransform(); // TODO: Check RFC for it
                        if (t instanceof xadesjs.XmlDsigExcC14NWithCommentsTransform)
                            t = new xadesjs.XmlDsigExcC14NTransform(); // TODO: Check RFC for it
                        t.LoadInnerXml(doc);
                        s = t.GetOutput();
                    }
                    // Apply C14N transform if Reference has only one transform EnvelopdeSignature
                    if (r.TransformChain.length === 1 && r.TransformChain[0] instanceof xadesjs.XmlDsigEnvelopedSignatureTransform) {
                        var c14n = new xadesjs.XmlDsigC14NTransform();
                        c14n.LoadInnerXml(doc);
                        s = c14n.GetOutput();
                    }
                }
                else if (s == null) {
                    // we must not C14N references from outside the document
                    // e.g. non-xml documents
                    if (r.Uri && r.Uri[0] !== "#") {
                        s = new XMLSerializer().serializeToString(doc);
                    }
                    else {
                        // apply default C14N transformation
                        var excC14N = new xadesjs.XmlDsigC14NTransform();
                        excC14N.LoadInnerXml(doc);
                        s = excC14N.GetOutput();
                    }
                }
                var digest = xadesjs.CryptoConfig.CreateHashAlgorithm(r.DigestMethod);
                if (digest == null)
                    resolve(null);
                else {
                    if (typeof s === "object")
                        s = new XMLSerializer().serializeToString(s);
                    digest.getHash(s)
                        .then(resolve, reject);
                }
            });
        };
        SignedXml.prototype.GetC14NMethod = function () {
            var t = xadesjs.CryptoConfig.CreateFromName(this.m_signature.SignedInfo.CanonicalizationMethod);
            if (t == null)
                throw new xadesjs.XmlError(xadesjs.XE.CRYPTOGRAPHIC, "Unknown Canonicalization Method " + this.m_signature.SignedInfo.CanonicalizationMethod);
            return t;
        };
        SignedXml.prototype.SignedInfoTransformed = function () {
            var t = this.GetC14NMethod();
            var xml = new XMLSerializer().serializeToString(this.m_signature.SignedInfo.GetXml());
            var doc = new DOMParser().parseFromString(xml, xadesjs.APPLICATION_XML);
            if (this.envdoc) {
                var namespaces = xadesjs.SelectNamespaces(this.envdoc.documentElement);
                for (var i in namespaces) {
                    var uri = namespaces[i];
                    if (i === doc.documentElement.prefix)
                        continue;
                    doc.documentElement.setAttribute("xmlns" + (i ? ":" + i : ""), uri);
                }
            }
            t.LoadInnerXml(doc);
            return t.GetOutput();
        };
        /**
         * Computes an XML digital signature using the specified algorithm.
         * @param  {Algorithm} algorithm Specified WebCrypto Algoriithm
         * @returns Promise
         */
        SignedXml.prototype.ComputeSignature = function (algorithm) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                if (_this.key != null) {
                    var alg_1 = GetSignatureAlgorithm(_this.key.algorithm.hash ? _this.key.algorithm : algorithm);
                    if (_this.m_signature.SignedInfo.SignatureMethod == null)
                        // required before hashing
                        _this.m_signature.SignedInfo.SignatureMethod = alg_1.xmlNamespace;
                    else if (_this.m_signature.SignedInfo.SignatureMethod !== alg_1.xmlNamespace)
                        throw new xadesjs.XmlError(xadesjs.XE.CRYPTOGRAPHIC, "Specified SignatureAlgorithm is not supported by the signing key.");
                    if (_this.key.algorithm.name.toUpperCase() === xadesjs.RSA_PSS) {
                        var pss = _this.SignedInfo.SignatureParams = new xadesjs.PssAlgorithmParams();
                        pss.SaltLength = algorithm.saltLength;
                        switch (_this.key.algorithm.hash.name.toUpperCase()) {
                            case xadesjs.SHA1:
                                pss.DigestMethod = xadesjs.SHA1_NAMESPACE;
                                break;
                            case xadesjs.SHA256:
                                pss.DigestMethod = xadesjs.SHA256_NAMESPACE;
                                break;
                            case xadesjs.SHA384:
                                pss.DigestMethod = xadesjs.SHA384_NAMESPACE;
                                break;
                            case xadesjs.SHA512:
                                pss.DigestMethod = xadesjs.SHA512_NAMESPACE;
                                break;
                        }
                    }
                    _this.DigestReferences()
                        .then(function () {
                        // let si = this.getCanonXml([this.SignedInfo.CanonicalizationMethodObject], this.SignedInfo.getXml());
                        var si = _this.SignedInfoTransformed();
                        alg_1.getSignature(si, _this.key, algorithm)
                            .then(function (signature) {
                            _this.m_signature.SignatureValue = signature;
                            resolve(signature);
                        })
                            .catch(reject);
                    })
                        .catch(reject);
                }
                else
                    throw new xadesjs.XmlError(xadesjs.XE.CRYPTOGRAPHIC, "signing key is not specified");
            });
        };
        SignedXml.prototype.CheckSignature = function (param) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                _this.validationErrors = [];
                var xml = _this.envdoc;
                _this.ValidateReferences(xml)
                    .then(function () {
                    if (param) {
                        var signer_1 = xadesjs.CryptoConfig.CreateSignatureAlgorithm(_this.SignatureMethod);
                        if (!signer_1)
                            return reject(new xadesjs.XmlError(xadesjs.XE.ALGORITHM_NOT_SUPPORTED, _this.SignedInfo.SignatureMethod));
                        var promise = Promise.resolve();
                        var key_1 = param;
                        if (param instanceof xadesjs.X509Certificate) {
                            // certificate
                            var cert_1 = param;
                            promise = promise
                                .then(function () {
                                return cert_1.exportKey(signer_1.algorithm);
                            })
                                .then(function (ckey) {
                                key_1 = ckey;
                                return Promise.resolve();
                            });
                        }
                        var signedInfoCanon_1;
                        return promise.then(function () {
                            signedInfoCanon_1 = _this.SignedInfoTransformed();
                            var alg = null;
                            if (_this.SignedInfo.SignatureParams && _this.SignatureMethod === xadesjs.RSA_PSS_WITH_PARAMS_MGF1_NAMESPACE) {
                                var sp = _this.SignedInfo.SignatureParams;
                                alg = { name: xadesjs.RSA_PSS };
                                if (sp.SaltLength)
                                    alg.saltLength = sp.SaltLength;
                            }
                            return signer_1.verifySignature(signedInfoCanon_1, key_1, xadesjs.Convert.FromBufferString(_this.SignatureValue), alg);
                        });
                    }
                    else
                        return _this.validateSignatureValue();
                })
                    .then(resolve, reject);
            });
        };
        SignedXml.prototype.validateSignatureValue = function () {
            var _this = this;
            var signer;
            var signedInfoCanon;
            return new Promise(function (resolve, reject) {
                signedInfoCanon = _this.SignedInfoTransformed();
                signer = xadesjs.CryptoConfig.CreateSignatureAlgorithm(_this.SignatureMethod);
                _this.GetPublicKey()
                    .then(function (key) {
                    return signer.verifySignature(signedInfoCanon, key, xadesjs.Convert.FromBufferString(_this.SignatureValue));
                })
                    .then(resolve, reject);
            });
        };
        SignedXml.prototype.findCanonicalizationAlgorithm = function (name) {
            var algo = SignedXml.CanonicalizationAlgorithms[name];
            if (algo)
                return new algo();
            else
                throw new Error("canonicalization algorithm '" + name + "' is not supported");
        };
        SignedXml.prototype.ValidateReferences = function (doc) {
            var _this = this;
            var that = this;
            return new Promise(function (resolve, reject) {
                var refs = that.SignedInfo.References;
                var promise = Promise.resolve();
                var _loop_2 = function(ref) {
                    promise = promise.then(function () {
                        return _this.GetReferenceHash(ref, false);
                    })
                        .then(function (digest) {
                        var b64Digest = xadesjs.Convert.ToBase64String(xadesjs.Convert.FromBufferString(digest));
                        var b64DigestValue = xadesjs.Convert.ToBase64String(xadesjs.Convert.FromBufferString(ref.DigestValue));
                        if (b64Digest !== b64DigestValue) {
                            var err_text = "invalid signature: for uri '" + ref.Uri + "'' calculated digest is " + b64Digest + " but the xml to validate supplies digest " + b64DigestValue;
                            _this.validationErrors.push(err_text);
                            throw new xadesjs.XmlError(xadesjs.XE.CRYPTOGRAPHIC, err_text);
                        }
                        return Promise.resolve();
                    });
                };
                for (var _i = 0, refs_1 = refs; _i < refs_1.length; _i++) {
                    var ref = refs_1[_i];
                    _loop_2(ref);
                }
                promise.then(resolve, reject);
            });
        };
        SignedXml.prototype.getCanonXml = function (transforms, node) {
            var res = "";
            var canonXml = node;
            for (var _i = 0, transforms_1 = transforms; _i < transforms_1.length; _i++) {
                var transform = transforms_1[_i];
                if (res)
                    canonXml = new DOMParser().parseFromString(res, xadesjs.APPLICATION_XML);
                transform.LoadInnerXml(canonXml);
                res = transform.GetOutput();
            }
            if (!res)
                res = new XMLSerializer().serializeToString(canonXml);
            return res;
        };
        /**
         * Loads a SignedXml state from an XML element.
         * @param  {Element} value The XML element to load the SignedXml state from.
         * @returns void
         */
        SignedXml.prototype.LoadXml = function (value) {
            if (value == null)
                throw new xadesjs.XmlError(xadesjs.XE.PARAM_REQUIRED, "value");
            this.m_element = value;
            this.m_signature.LoadXml(value);
            // Need to give the EncryptedXml object to the 
            // XmlDecryptionTransform to give it a fighting 
            // chance at decrypting the document.
            // for (let r of this.m_signature.SignedInfo.References) {
            //     for (let t of r.TransformChain) {
            //         if (t instanceof XmlDecryptionTransform)
            //             (<XmlDecryptionTransform>t).EncryptedXml = this.EncryptedXml;
            //     }
            // }
        };
        /**
         * Returns the XML representation of a SignedXml object.
         * @returns Element
         */
        SignedXml.prototype.GetXml = function () {
            this.m_signature.Prefix = this.Prefix;
            return this.m_signature.GetXml();
        };
        /**
         * Represents the Uniform Resource Identifier (URI) for the standard canonicalization
         * algorithm for XML digital signatures. This field is constant.
         */
        SignedXml.XmlDsigCanonicalizationUrl = "http://www.w3.org/TR/2001/REC-xml-c14n-20010315";
        /**
         * Represents the Uniform Resource Identifier (URI) for the standard canonicalization algorithm
         * for XML digital signatures and includes comments. This field is constant.
         */
        SignedXml.XmlDsigCanonicalizationWithCommentsUrl = SignedXml.XmlDsigCanonicalizationUrl + "#WithComments";
        /**
         * Represents the Uniform Resource Identifier (URI) for the standard namespace for XML digital signatures.
         * This field is constant.
         */
        SignedXml.XmlDsigNamespaceUrl = "http://www.w3.org/2000/09/xmldsig#";
        SignedXml.XmlDsigDSAUrl = SignedXml.XmlDsigNamespaceUrl + "dsa-sha1";
        /**
         * Represents the Uniform Resource Identifier (URI) for the standard HMACSHA1 algorithm for XML digital signatures.
         * This field is constant.
         */
        SignedXml.XmlDsigHMACSHA1Url = SignedXml.XmlDsigNamespaceUrl + "hmac-sha1";
        /**
         * Represents the Uniform Resource Identifier (URI) for the standard minimal canonicalization algorithm
         * for XML digital signatures. This field is constant.
         */
        SignedXml.XmlDsigMinimalCanonicalizationUrl = SignedXml.XmlDsigNamespaceUrl + "minimal";
        /**
         * Represents the Uniform Resource Identifier (URI) for the standard RSA signature method
         * for XML digital signatures. This field is constant.
         */
        SignedXml.XmlDsigRSASHA1Url = SignedXml.XmlDsigNamespaceUrl + "rsa-sha1";
        /**
         * Represents the Uniform Resource Identifier (URI) for the standard SHA1 digest method for
         * XML digital signatures. This field is constant.
         */
        SignedXml.XmlDsigSHA1Url = SignedXml.XmlDsigNamespaceUrl + "sha1";
        /**
         * Represents the Uniform Resource Identifier (URI) for the XML mode
         * decryption transformation. This field is constant.
         */
        SignedXml.XmlDecryptionTransformUrl = "http://www.w3.org/2002/07/decrypt#XML";
        /**
         * Represents the Uniform Resource Identifier (URI) for the base 64 transformation. This field is constant.
         */
        SignedXml.XmlDsigBase64TransformUrl = SignedXml.XmlDsigNamespaceUrl + "base64";
        /**
         * Represents the Uniform Resource Identifier (URI)
         * for the Canonical XML transformation. This field is constant.
         */
        SignedXml.XmlDsigC14NTransformUrl = SignedXml.XmlDsigCanonicalizationUrl;
        /**
         * Represents the Uniform Resource Identifier (URI) for the Canonical XML transformation,
         * with comments. This field is constant.
         */
        SignedXml.XmlDsigC14NWithCommentsTransformUrl = SignedXml.XmlDsigCanonicalizationWithCommentsUrl;
        /**
         * Represents the Uniform Resource Identifier (URI) for enveloped signature transformation.
         * This field is constant.
         */
        SignedXml.XmlDsigEnvelopedSignatureTransformUrl = SignedXml.XmlDsigNamespaceUrl + "enveloped-signature";
        /**
         * Represents the Uniform Resource Identifier (URI) for exclusive XML canonicalization.
         * This field is constant.
         */
        SignedXml.XmlDsigExcC14NTransformUrl = "http://www.w3.org/2001/10/xml-exc-c14n#";
        /**
         * Represents the Uniform Resource Identifier (URI) for exclusive XML canonicalization, with comments.
         * This field is constant.
         */
        SignedXml.XmlDsigExcC14NWithCommentsTransformUrl = SignedXml.XmlDsigExcC14NTransformUrl + "WithComments";
        /**
         * Represents the Uniform Resource Identifier (URI) for the XML Path Language (XPath).
         * This field is constant.
         */
        SignedXml.XmlDsigXPathTransformUrl = "http://www.w3.org/TR/1999/REC-xpath-19991116";
        /**
         * Represents the Uniform Resource Identifier (URI) for XSLT transformations.
         * This field is constant.
         */
        SignedXml.XmlDsigXsltTransformUrl = "http://www.w3.org/TR/1999/REC-xslt-19991116";
        /**
         * Represents the Uniform Resource Identifier (URI) for the license transform algorithm
         * used to normalize XrML licenses for signatures.
         */
        SignedXml.XmlLicenseTransformUrl = "urn:mpeg:mpeg21:2003:01-REL-R-NS:licenseTransform";
        SignedXml.whitespaceChars = [" ", "\r", "\n", "\t"];
        return SignedXml;
    }(xadesjs.XmlObject));
    xadesjs.SignedXml = SignedXml;
    function GetSignatureAlgorithm(algorithm) {
        if (algorithm.name.toUpperCase() === xadesjs.RSA_PKCS1.toUpperCase()) {
            var hashName = algorithm.hash.name;
            var alg = void 0;
            switch (hashName.toUpperCase()) {
                case xadesjs.SHA1:
                    alg = new xadesjs.RsaPkcs1Sha1();
                    break;
                case xadesjs.SHA224:
                    alg = new xadesjs.RsaPkcs1Sha224();
                    break;
                case xadesjs.SHA256:
                    alg = new xadesjs.RsaPkcs1Sha256();
                    break;
                case xadesjs.SHA384:
                    alg = new xadesjs.RsaPkcs1Sha384();
                    break;
                case xadesjs.SHA512:
                    alg = new xadesjs.RsaPkcs1Sha512();
                    break;
                default:
                    throw new xadesjs.XmlError(xadesjs.XE.ALGORITHM_NOT_SUPPORTED, algorithm.name + ":" + hashName);
            }
            return alg;
        }
        else if (algorithm.name.toUpperCase() === xadesjs.RSA_PSS.toUpperCase()) {
            var hashName = algorithm.hash.name;
            var alg = void 0;
            switch (hashName.toUpperCase()) {
                case xadesjs.SHA1:
                    alg = new xadesjs.RsaPssSha1();
                    break;
                case xadesjs.SHA224:
                    alg = new xadesjs.RsaPssSha224();
                    break;
                case xadesjs.SHA256:
                    alg = new xadesjs.RsaPssSha256();
                    break;
                case xadesjs.SHA384:
                    alg = new xadesjs.RsaPssSha384();
                    break;
                case xadesjs.SHA512:
                    alg = new xadesjs.RsaPssSha512();
                    break;
                default:
                    throw new xadesjs.XmlError(xadesjs.XE.ALGORITHM_NOT_SUPPORTED, algorithm.name + ":" + hashName);
            }
            return alg;
        }
        else if (algorithm.name.toUpperCase() === "ECDSA") {
            var hashName = algorithm.hash.name;
            var alg = void 0;
            switch (hashName.toUpperCase()) {
                case xadesjs.SHA1:
                    alg = new xadesjs.EcdsaSha1();
                    break;
                case xadesjs.SHA224:
                    alg = new xadesjs.EcdsaSha224();
                    break;
                case xadesjs.SHA256:
                    alg = new xadesjs.EcdsaSha256();
                    break;
                case xadesjs.SHA384:
                    alg = new xadesjs.EcdsaSha384();
                    break;
                case xadesjs.SHA512:
                    alg = new xadesjs.EcdsaSha512();
                    break;
                default:
                    throw new xadesjs.XmlError(xadesjs.XE.ALGORITHM_NOT_SUPPORTED, algorithm.name + ":" + hashName);
            }
            return alg;
        }
        else if (algorithm.name.toUpperCase() === xadesjs.HMAC_ALGORITHM) {
            var hashName = algorithm.hash.name;
            var alg = void 0;
            switch (hashName.toUpperCase()) {
                case xadesjs.SHA1:
                    alg = new xadesjs.HmacSha1();
                    break;
                case xadesjs.SHA256:
                    alg = new xadesjs.HmacSha256();
                    break;
                case xadesjs.SHA384:
                    alg = new xadesjs.HmacSha384();
                    break;
                case xadesjs.SHA512:
                    alg = new xadesjs.HmacSha512();
                    break;
                default:
                    throw new xadesjs.XmlError(xadesjs.XE.ALGORITHM_NOT_SUPPORTED, algorithm.name + ":" + hashName);
            }
            return alg;
        }
        else {
            throw new xadesjs.XmlError(xadesjs.XE.ALGORITHM_NOT_SUPPORTED, algorithm.name);
        }
    }
})(xadesjs || (xadesjs = {}));
if (typeof module !== "undefined")
    module.exports = xadesjs;
