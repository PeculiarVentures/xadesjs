'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function (global, factory) {
	(typeof exports === 'undefined' ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' ? factory(exports) : typeof define === 'function' && define.amd ? define(['exports'], factory) : factory(global.XAdES = global.XAdES || {});
})(this, function (exports) {
	'use strict';

	/*! *****************************************************************************
 Copyright (c) Microsoft Corporation. All rights reserved.
 Licensed under the Apache License, Version 2.0 (the "License"); you may not use
 this file except in compliance with the License. You may obtain a copy of the
 License at http://www.apache.org/licenses/LICENSE-2.0
 
 THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
 WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
 MERCHANTABLITY OR NON-INFRINGEMENT.
 
 See the Apache Version 2.0 License for specific language governing permissions
 and limitations under the License.
 ***************************************************************************** */
	/* global Reflect, Promise */

	var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
		d.__proto__ = b;
	} || function (d, b) {
		for (var p in b) {
			if (b.hasOwnProperty(p)) d[p] = b[p];
		}
	};

	function __extends(d, b) {
		extendStatics(d, b);
		function __() {
			this.constructor = d;
		}
		d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	}

	function __decorate(decorators, target, key, desc) {
		var c = arguments.length,
		    r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
		    d;
		if ((typeof Reflect === 'undefined' ? 'undefined' : _typeof(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
			if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
		}return c > 3 && r && Object.defineProperty(target, key, r), r;
	}

	function __awaiter(thisArg, _arguments, P, generator) {
		return new (P || (P = Promise))(function (resolve, reject) {
			function fulfilled(value) {
				try {
					step(generator.next(value));
				} catch (e) {
					reject(e);
				}
			}
			function rejected(value) {
				try {
					step(generator.throw(value));
				} catch (e) {
					reject(e);
				}
			}
			function step(result) {
				result.done ? resolve(result.value) : new P(function (resolve) {
					resolve(result.value);
				}).then(fulfilled, rejected);
			}
			step((generator = generator.apply(thisArg, _arguments || [])).next());
		});
	}

	function __generator(thisArg, body) {
		var _ = { label: 0, sent: function sent() {
				if (t[0] & 1) throw t[1];return t[1];
			}, trys: [], ops: [] },
		    f,
		    y,
		    t;
		return { next: verb(0), "throw": verb(1), "return": verb(2) };
		function verb(n) {
			return function (v) {
				return step([n, v]);
			};
		}
		function step(op) {
			if (f) throw new TypeError("Generator is already executing.");
			while (_) {
				try {
					if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
					if (y = 0, t) op = [0, t.value];
					switch (op[0]) {
						case 0:case 1:
							t = op;break;
						case 4:
							_.label++;return { value: op[1], done: false };
						case 5:
							_.label++;y = op[1];op = [0];continue;
						case 7:
							op = _.ops.pop();_.trys.pop();continue;
						default:
							if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
								_ = 0;continue;
							}
							if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
								_.label = op[1];break;
							}
							if (op[0] === 6 && _.label < t[1]) {
								_.label = t[1];t = op;break;
							}
							if (t && _.label < t[2]) {
								_.label = t[2];_.ops.push(op);break;
							}
							if (t[2]) _.ops.pop();
							_.trys.pop();continue;
					}
					op = body.call(thisArg, _);
				} catch (e) {
					op = [6, e];y = 0;
				} finally {
					f = t = 0;
				}
			}if (op[0] & 5) throw op[1];return { value: op[0] ? op[1] : void 0, done: true };
		}
	}

	var ELEMENT = "element";
	var ATTRIBUTE = "attribute";
	var CONTENT = "content";

	var MAX = 1e9;
	function assign(target) {
		for (var _len = arguments.length, sources = Array(_len > 1 ? _len - 1 : 0), _key2 = 1; _key2 < _len; _key2++) {
			sources[_key2 - 1] = arguments[_key2];
		}

		var res = arguments[0];
		for (var i = 1; i < arguments.length; i++) {
			var obj = arguments[i];
			for (var prop in obj) {
				res[prop] = obj[prop];
			}
		}
		return res;
	}
	function XmlElement(params) {
		return function (target) {
			var t = target;
			t.localName = params.localName || t.name;
			t.namespaceURI = params.namespaceURI || t.namespaceURI || null;
			t.prefix = params.prefix || t.prefix || null;
			t.parser = params.parser || t.parser;
			if (t.target !== t) t.items = assign({}, t.items);
			t.target = target;
		};
	}
	function XmlChildElement() {
		var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

		return function (target, propertyKey) {
			var t = target.constructor;
			var key = propertyKey;
			if (!t.items) t.items = {};
			if (t.target !== t) t.items = assign({}, t.items);
			t.target = target;
			if (params.parser) {
				t.items[key] = {
					parser: params.parser,
					required: params.required || false,
					maxOccurs: params.maxOccurs || MAX,
					minOccurs: params.minOccurs === void 0 ? 0 : params.minOccurs,
					noRoot: params.noRoot || false
				};
			} else {
				t.items[key] = {
					namespaceURI: params.namespaceURI || null,
					required: params.required || false,
					prefix: params.prefix || null,
					defaultValue: params.defaultValue,
					converter: params.converter
				};
			}
			params.localName = params.localName || params.parser && params.parser.localName || key;
			t.items[key].namespaceURI = params.namespaceURI || params.parser && params.parser.namespaceURI || null;
			t.items[key].prefix = params.prefix || params.parser && params.parser.prefix || null;
			t.items[key].localName = params.localName;
			t.items[key].type = ELEMENT;
			defineProperty(target, key, params);
		};
	}
	function XmlAttribute() {
		var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { required: false, namespaceURI: null };

		return function (target, propertyKey) {
			var t = target.constructor;
			var key = propertyKey;
			if (!params.localName) params.localName = propertyKey;
			if (!t.items) t.items = {};
			if (t.target !== t) t.items = assign({}, t.items);
			t.target = target;
			t.items[propertyKey] = params;
			t.items[propertyKey].type = ATTRIBUTE;
			defineProperty(target, key, params);
		};
	}

	function XmlContent() {
		var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { required: false };

		return function (target, propertyKey) {
			var t = target.constructor;
			var key = propertyKey;
			if (!t.items) t.items = {};
			if (t.target !== t) t.items = assign({}, t.items);
			t.target = target;
			t.items[propertyKey] = params;
			t.items[propertyKey].type = CONTENT;
			defineProperty(target, key, params);
		};
	}
	function defineProperty(target, key, params) {
		var _key = '_' + key;
		var opt = {
			set: function set(v) {
				if (this[_key] !== v) {
					this.element = null;
					this[_key] = v;
				}
			},
			get: function get() {
				if (this[_key] === void 0) {
					var defaultValue = params.defaultValue;
					if (params.parser) {
						defaultValue = new params.parser();
						defaultValue.localName = params.localName;
					}
					this[_key] = defaultValue;
				}
				return this[_key];
			}
		};
		Object.defineProperty(target, _key, { writable: true, enumerable: false });
		Object.defineProperty(target, key, opt);
	}

	var Collection = function () {
		function Collection(items) {
			_classCallCheck(this, Collection);

			this.items = new Array();
			if (items) this.items = items;
		}

		_createClass(Collection, [{
			key: 'Item',
			value: function Item(index) {
				return this.items[index] || null;
			}
		}, {
			key: 'Add',
			value: function Add(item) {
				this.items.push(item);
			}
		}, {
			key: 'Pop',
			value: function Pop() {
				return this.items.pop();
			}
		}, {
			key: 'RemoveAt',
			value: function RemoveAt(index) {
				this.items = this.items.filter(function (item, _index) {
					return _index !== index;
				});
			}
		}, {
			key: 'Clear',
			value: function Clear() {
				this.items = new Array();
			}
		}, {
			key: 'GetIterator',
			value: function GetIterator() {
				return this.items;
			}
		}, {
			key: 'ForEach',
			value: function ForEach(cb) {
				this.GetIterator().forEach(cb);
			}
		}, {
			key: 'Map',
			value: function Map(cb) {
				return new Collection(this.GetIterator().map(cb));
			}
		}, {
			key: 'Filter',
			value: function Filter(cb) {
				return new Collection(this.GetIterator().filter(cb));
			}
		}, {
			key: 'Sort',
			value: function Sort(cb) {
				return new Collection(this.GetIterator().sort(cb));
			}
		}, {
			key: 'Every',
			value: function Every(cb) {
				return this.GetIterator().every(cb);
			}
		}, {
			key: 'Some',
			value: function Some(cb) {
				return this.GetIterator().some(cb);
			}
		}, {
			key: 'IsEmpty',
			value: function IsEmpty() {
				return this.Count === 0;
			}
		}, {
			key: 'Count',
			get: function get() {
				return this.items.length;
			}
		}]);

		return Collection;
	}();

	var APPLICATION_XML = "application/xml";
	var XmlNodeType;
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
		XmlNodeType[XmlNodeType["DocumentType"] = 10] = "DocumentType";
		XmlNodeType[XmlNodeType["DocumentFragment"] = 11] = "DocumentFragment";
		XmlNodeType[XmlNodeType["Notation"] = 12] = "Notation";
		XmlNodeType[XmlNodeType["Whitespace"] = 13] = "Whitespace";
		XmlNodeType[XmlNodeType["SignificantWhitespace"] = 14] = "SignificantWhitespace";
		XmlNodeType[XmlNodeType["EndElement"] = 15] = "EndElement";
		XmlNodeType[XmlNodeType["EndEntity"] = 16] = "EndEntity";
		XmlNodeType[XmlNodeType["XmlDeclaration"] = 17] = "XmlDeclaration";
	})(XmlNodeType || (XmlNodeType = {}));

	var xpath = function xpath(node, _xpath) {
		throw new Error("Not implemented");
	};
	var _w = void 0;
	if (typeof self === "undefined") {
		_w = global;
		var xmldom = require("xmldom-alpha");
		xpath = require("xpath.js");
		_w.XMLSerializer = xmldom.XMLSerializer;
		_w.DOMParser = xmldom.DOMParser;
		_w.DOMImplementation = xmldom.DOMImplementation;
		_w.document = new DOMImplementation().createDocument("http://www.w3.org/1999/xhtml", "html", null);
	} else _w = self;
	function SelectNodesEx(node, xpath) {
		var doc = node.ownerDocument == null ? node : node.ownerDocument;
		var nsResolver = document.createNSResolver(node.ownerDocument == null ? node.documentElement : node.ownerDocument.documentElement);
		var personIterator = doc.evaluate(xpath, node, nsResolver, XPathResult.ANY_TYPE, null);
		var ns = [];
		var n = void 0;
		while (n = personIterator.iterateNext()) {
			ns.push(n);
		}return ns;
	}
	var Select = typeof self !== "undefined" ? SelectNodesEx : xpath;
	function Parse(xmlstring) {
		return new DOMParser().parseFromString(xmlstring, APPLICATION_XML);
	}
	function SelectSingleNode(node, path) {
		var ns = Select(node, path);
		if (ns && ns.length > 0) return ns[0];
		return null;
	}
	function _SelectNamespaces(node) {
		var selectedNodes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

		if (node && node.nodeType === XmlNodeType.Element) {
			var el = node;
			if (el.namespaceURI && el.namespaceURI !== "http://www.w3.org/XML/1998/namespace" && !selectedNodes[el.prefix || ""]) selectedNodes[el.prefix ? el.prefix : ""] = node.namespaceURI;
			for (var i = 0; i < node.childNodes.length; i++) {
				var childNode = node.childNodes.item(i);
				if (childNode && childNode.nodeType === XmlNodeType.Element) _SelectNamespaces(childNode, selectedNodes);
			}
		}
	}
	function SelectNamespaces(node) {
		var attrs = {};
		_SelectNamespaces(node, attrs);
		return attrs;
	}
	function assign$1(target) {
		for (var _len2 = arguments.length, sources = Array(_len2 > 1 ? _len2 - 1 : 0), _key3 = 1; _key3 < _len2; _key3++) {
			sources[_key3 - 1] = arguments[_key3];
		}

		var res = arguments[0];
		for (var i = 1; i < arguments.length; i++) {
			var obj = arguments[i];
			for (var prop in obj) {
				res[prop] = obj[prop];
			}
		}
		return res;
	}

	function printf(text) {
		for (var _len3 = arguments.length, args = Array(_len3 > 1 ? _len3 - 1 : 0), _key4 = 1; _key4 < _len3; _key4++) {
			args[_key4 - 1] = arguments[_key4];
		}

		var msg = text;
		var regFind = /[^%](%\d+)/g;
		var match = null;
		var matches = [];
		while (match = regFind.exec(msg)) {
			matches.push({ arg: match[1], index: match.index });
		}
		for (var i = matches.length - 1; i >= 0; i--) {
			var item = matches[i];
			var arg = item.arg.substring(1);
			var index = item.index + 1;
			msg = msg.substring(0, index) + arguments[+arg] + msg.substring(index + 1 + arg.length);
		}
		msg = msg.replace("%%", "%");
		return msg;
	}
	function padNum(num, size) {
		var s = num + "";
		while (s.length < size) {
			s = "0" + s;
		}return s;
	}

	var XmlError = function XmlError(code) {
		for (var _len4 = arguments.length, args = Array(_len4 > 1 ? _len4 - 1 : 0), _key5 = 1; _key5 < _len4; _key5++) {
			args[_key5 - 1] = arguments[_key5];
		}

		_classCallCheck(this, XmlError);

		this.prefix = "XMLJS";
		this.code = code;
		this.name = this.constructor.name;
		arguments[0] = xes[code];
		var message = printf.apply(this, arguments);
		this.message = '' + this.prefix + padNum(code, 4) + ': ' + message;
		this.stack = new Error(this.message).stack;
	};

	var XE;
	(function (XE) {
		XE[XE["NONE"] = 0] = "NONE";
		XE[XE["NULL_REFERENCE"] = 1] = "NULL_REFERENCE";
		XE[XE["NULL_PARAM"] = 2] = "NULL_PARAM";
		XE[XE["DECORATOR_NULL_PARAM"] = 3] = "DECORATOR_NULL_PARAM";
		XE[XE["COLLECTION_LIMIT"] = 4] = "COLLECTION_LIMIT";
		XE[XE["METHOD_NOT_IMPLEMENTED"] = 5] = "METHOD_NOT_IMPLEMENTED";
		XE[XE["METHOD_NOT_SUPPORTED"] = 6] = "METHOD_NOT_SUPPORTED";
		XE[XE["PARAM_REQUIRED"] = 7] = "PARAM_REQUIRED";
		XE[XE["CONVERTER_UNSUPPORTED"] = 8] = "CONVERTER_UNSUPPORTED";
		XE[XE["ELEMENT_MALFORMED"] = 9] = "ELEMENT_MALFORMED";
		XE[XE["ELEMENT_MISSING"] = 10] = "ELEMENT_MISSING";
		XE[XE["ATTRIBUTE_MISSING"] = 11] = "ATTRIBUTE_MISSING";
		XE[XE["CONTENT_MISSING"] = 12] = "CONTENT_MISSING";
		XE[XE["CRYPTOGRAPHIC"] = 13] = "CRYPTOGRAPHIC";
		XE[XE["CRYPTOGRAPHIC_NO_MODULE"] = 14] = "CRYPTOGRAPHIC_NO_MODULE";
		XE[XE["CRYPTOGRAPHIC_UNKNOWN_TRANSFORM"] = 15] = "CRYPTOGRAPHIC_UNKNOWN_TRANSFORM";
		XE[XE["ALGORITHM_NOT_SUPPORTED"] = 16] = "ALGORITHM_NOT_SUPPORTED";
		XE[XE["ALGORITHM_WRONG_NAME"] = 17] = "ALGORITHM_WRONG_NAME";
		XE[XE["XML_EXCEPTION"] = 18] = "XML_EXCEPTION";
	})(XE || (XE = {}));
	var xes = {};
	xes[XE.NONE] = "No decription";
	xes[XE.NULL_REFERENCE] = "Null reference";
	xes[XE.NULL_PARAM] = "'%1' has empty '%2' object";
	xes[XE.DECORATOR_NULL_PARAM] = "Decorator '%1' has empty '%2' parameter";
	xes[XE.COLLECTION_LIMIT] = "Collection of '%1' in element '%2' has wrong amount of items";
	xes[XE.METHOD_NOT_IMPLEMENTED] = "Method is not implemented";
	xes[XE.METHOD_NOT_SUPPORTED] = "Method is not supported";
	xes[XE.PARAM_REQUIRED] = "Required parameter is missing '%1'";
	xes[XE.CONVERTER_UNSUPPORTED] = "Converter is not supported";
	xes[XE.ELEMENT_MALFORMED] = "Malformed element '%1'";
	xes[XE.ELEMENT_MISSING] = "Element '%1' is missing in '%2'";
	xes[XE.ATTRIBUTE_MISSING] = "Attribute '%1' is missing in '%2'";
	xes[XE.CONTENT_MISSING] = "Content is missing in '%1'";
	xes[XE.CRYPTOGRAPHIC] = "Cryptographic error: %1";
	xes[XE.CRYPTOGRAPHIC_NO_MODULE] = "WebCrypto module is not found";
	xes[XE.CRYPTOGRAPHIC_UNKNOWN_TRANSFORM] = "Unknown transform %1";
	xes[XE.ALGORITHM_NOT_SUPPORTED] = "Algorithm is not supported '%1'";
	xes[XE.ALGORITHM_WRONG_NAME] = "Algorithm wrong name in use '%1'";
	xes[XE.XML_EXCEPTION] = "XML exception: %1";

	var Convert = function () {
		function Convert() {
			_classCallCheck(this, Convert);
		}

		_createClass(Convert, null, [{
			key: 'ToString',
			value: function ToString(buffer) {
				var enc = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "utf8";

				var buf = new Uint8Array(buffer);
				switch (enc.toLowerCase()) {
					case "utf8":
						return this.ToUtf8String(buf);
					case "binary":
						return this.ToBinary(buf);
					case "hex":
						return this.ToHex(buf);
					case "base64":
						return this.ToBase64(buf);
					case "base64url":
						return this.ToBase64Url(buf);
					default:
						throw new XmlError(XE.CONVERTER_UNSUPPORTED);
				}
			}
		}, {
			key: 'FromString',
			value: function FromString(str) {
				var enc = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "utf8";

				switch (enc.toLowerCase()) {
					case "utf8":
						return this.FromUtf8String(str);
					case "binary":
						return this.FromBinary(str);
					case "hex":
						return this.FromHex(str);
					case "base64":
						return this.FromBase64(str);
					case "base64url":
						return this.FromBase64Url(str);
					default:
						throw new XmlError(XE.CONVERTER_UNSUPPORTED);
				}
			}
		}, {
			key: 'ToBase64',
			value: function ToBase64(buf) {
				if (typeof btoa !== "undefined") {
					var binary = this.ToString(buf, "binary");
					return btoa(binary);
				} else if (typeof Buffer !== "undefined") {
					return new Buffer(buf).toString("base64");
				} else {
					throw new XmlError(XE.CONVERTER_UNSUPPORTED);
				}
			}
		}, {
			key: 'FromBase64',
			value: function FromBase64(base64Text) {
				base64Text = base64Text.replace(/\n/g, "").replace(/\r/g, "").replace(/\t/g, "").replace(/\s/g, "");
				if (typeof atob !== "undefined") {
					return this.FromBinary(atob(base64Text));
				} else if (typeof Buffer !== "undefined") {
					return new Buffer(base64Text, "base64");
				} else {
					throw new XmlError(XE.CONVERTER_UNSUPPORTED);
				}
			}
		}, {
			key: 'Base64Padding',
			value: function Base64Padding(base64) {
				var padCount = 4 - base64.length % 4;
				if (padCount < 4) for (var i = 0; i < padCount; i++) {
					base64 += "=";
				}return base64;
			}
		}, {
			key: 'FromBase64Url',
			value: function FromBase64Url(base64url) {
				return this.FromBase64(this.Base64Padding(base64url.replace(/\-/g, "+").replace(/\_/g, "/")));
			}
		}, {
			key: 'ToBase64Url',
			value: function ToBase64Url(data) {
				return this.ToBase64(data).replace(/\+/g, "-").replace(/\//g, "_").replace(/\=/g, "");
			}
		}, {
			key: 'FromUtf8String',
			value: function FromUtf8String(text) {
				var s = unescape(encodeURIComponent(text)),
				    uintArray = new Uint8Array(s.length);
				for (var i = 0; i < s.length; i++) {
					uintArray[i] = s.charCodeAt(i);
				}
				return uintArray;
			}
		}, {
			key: 'ToUtf8String',
			value: function ToUtf8String(buffer) {
				var encodedString = String.fromCharCode.apply(null, buffer),
				    decodedString = decodeURIComponent(escape(encodedString));
				return decodedString;
			}
		}, {
			key: 'FromBinary',
			value: function FromBinary(text) {
				var stringLength = text.length;
				var resultView = new Uint8Array(stringLength);
				for (var i = 0; i < stringLength; i++) {
					resultView[i] = text.charCodeAt(i);
				}return resultView;
			}
		}, {
			key: 'ToBinary',
			value: function ToBinary(buffer) {
				var result_string = "";
				for (var i = 0; i < buffer.length; i++) {
					result_string = result_string + String.fromCharCode(buffer[i]);
				}return result_string;
			}
		}, {
			key: 'ToHex',
			value: function ToHex(buffer) {
				var splitter = "";
				var res = [];
				for (var i = 0; i < buffer.length; i++) {
					var char = buffer[i].toString(16);
					res.push(char.length === 1 ? "0" + char : char);
				}
				return res.join(splitter);
			}
		}, {
			key: 'FromHex',
			value: function FromHex(hexString) {
				var res = new Uint8Array(hexString.length / 2);
				for (var i = 0; i < hexString.length; i = i + 2) {
					var c = hexString.slice(i, i + 2);
					res[i / 2] = parseInt(c, 16);
				}
				return res;
			}
		}, {
			key: 'ToDateTime',
			value: function ToDateTime(dateTime) {
				return new Date(dateTime);
			}
		}, {
			key: 'FromDateTime',
			value: function FromDateTime(dateTime) {
				var str = dateTime.toISOString();
				return str;
			}
		}]);

		return Convert;
	}();

	var XmlBase64Converter = {
		get: function get(value) {
			if (value) return Convert.ToBase64(value);
			return void 0;
		},
		set: function set(value) {
			return Convert.FromBase64(value);
		}
	};
	var XmlNumberConverter = {
		get: function get(value) {
			if (value) return value.toString();
			return "0";
		},
		set: function set(value) {
			return Number(value);
		}
	};
	var DEFAULT_ROOT_NAME = "xml_root";

	var XmlObject = function () {
		function XmlObject() {
			_classCallCheck(this, XmlObject);

			this.prefix = this.GetStatic().prefix || null;
			this.localName = this.GetStatic().localName;
			this.namespaceURI = this.GetStatic().namespaceURI;
		}

		_createClass(XmlObject, [{
			key: 'GetStatic',
			value: function GetStatic() {
				return this.constructor;
			}
		}, {
			key: 'GetPrefix',
			value: function GetPrefix() {
				return this.Prefix ? this.prefix + ":" : "";
			}
		}, {
			key: 'HasChanged',
			value: function HasChanged() {
				var self = this.GetStatic();
				if (self.items) for (var key in self.items) {
					var item = self.items[key];
					var value = this[key];
					if (item.parser && value && value.HasChanged()) return true;
				}
				return this.element === null;
			}
		}, {
			key: 'OnGetXml',
			value: function OnGetXml(element) {}
		}, {
			key: 'GetXml',
			value: function GetXml(hard) {
				if (!(hard || this.HasChanged())) return this.element || null;
				var doc = this.CreateDocument();
				var el = this.CreateElement();
				var self = this.GetStatic();
				var localName = this.localName;
				if (self.items) {
					for (var key in self.items) {
						var _parser = this[key];
						var selfItem = self.items[key];
						switch (selfItem.type) {
							case CONTENT:
								{
									var schema = selfItem;
									var value = schema.converter ? schema.converter.get(_parser) : _parser;
									if (schema.required && (value === null || value === void 0)) throw new XmlError(XE.CONTENT_MISSING, localName);
									if (schema.defaultValue !== _parser || schema.required) el.textContent = value;
									break;
								}
							case ATTRIBUTE:
								{
									var _schema = selfItem;
									var _value2 = _schema.converter ? _schema.converter.get(_parser) : _parser;
									if (_schema.required && (_value2 === null || _value2 === void 0)) throw new XmlError(XE.ATTRIBUTE_MISSING, _schema.localName, localName);
									if (_schema.defaultValue !== _parser || _schema.required) if (!_schema.namespaceURI) el.setAttribute(_schema.localName, _value2);else el.setAttributeNS(_schema.namespaceURI, _schema.localName, _value2);
									break;
								}
							case ELEMENT:
								{
									var _schema2 = selfItem;
									var node = null;
									if (_schema2.parser) {
										if (_schema2.required && !_parser || _schema2.minOccurs && !_parser.Count) throw new XmlError(XE.ELEMENT_MISSING, _parser.localName, localName);
										if (_parser) node = _parser.GetXml(_parser.element === void 0 && (_schema2.required || _parser.Count));
									} else {
										var _value3 = _schema2.converter ? _schema2.converter.get(_parser) : _parser;
										if (_schema2.required && _value3 === void 0) throw new XmlError(XE.ELEMENT_MISSING, _schema2.localName, localName);
										if (_parser !== _schema2.defaultValue || _schema2.required) {
											if (!_schema2.namespaceURI) node = doc.createElement('' + (_schema2.prefix ? _schema2.prefix + ":" : "") + _schema2.localName);else {
												node = doc.createElementNS(_schema2.namespaceURI, '' + (_schema2.prefix ? _schema2.prefix + ":" : "") + _schema2.localName);
											}
											node.textContent = _value3;
										}
									}
									if (node) {
										if (_schema2.noRoot) {
											var els = [];
											for (var i = 0; i < node.childNodes.length; i++) {
												var colNode = node.childNodes.item(i);
												if (colNode.nodeType === XmlNodeType.Element) els.push(colNode);
											}
											if (els.length < _schema2.minOccurs || els.length > _schema2.maxOccurs) throw new XmlError(XE.COLLECTION_LIMIT, _parser.localName, self.localName);
											els.forEach(function (e) {
												return el.appendChild(e.cloneNode(true));
											});
										} else if (node.childNodes.length < _schema2.minOccurs || node.childNodes.length > _schema2.maxOccurs) throw new XmlError(XE.COLLECTION_LIMIT, _parser.localName, self.localName);else el.appendChild(node);
									}
									break;
								}
						}
					}
				}
				this.OnGetXml(el);
				this.element = el;
				return el;
			}
		}, {
			key: 'OnLoadXml',
			value: function OnLoadXml(element) {}
		}, {
			key: 'LoadXml',
			value: function LoadXml(param) {
				var element = void 0;
				if (typeof param === "string") {
					var doc = Parse(param);
					element = doc.documentElement;
				} else element = param;
				if (!element) {
					throw new XmlError(XE.PARAM_REQUIRED, "element");
				}
				var self = this.GetStatic();
				var localName = this.localName;
				if (!(element.localName === localName && element.namespaceURI == this.NamespaceURI)) throw new XmlError(XE.ELEMENT_MALFORMED, localName);
				if (self.items) {
					for (var key in self.items) {
						var selfItem = self.items[key];
						switch (selfItem.type) {
							case CONTENT:
								{
									var schema = selfItem;
									if (schema.required && !element.textContent) throw new XmlError(XE.CONTENT_MISSING, localName);
									if (!element.textContent) this[key] = schema.defaultValue;else {
										var value = schema.converter ? schema.converter.set(element.textContent) : element.textContent;
										this[key] = value;
									}
									break;
								}
							case ATTRIBUTE:
								{
									var _schema3 = selfItem;
									var hasAttribute = void 0;
									var getAttribute = void 0;
									if (_schema3.namespaceURI) {
										hasAttribute = element.hasAttributeNS.bind(element, _schema3.namespaceURI, _schema3.localName);
										getAttribute = element.getAttributeNS.bind(element, _schema3.namespaceURI, _schema3.localName);
									} else {
										hasAttribute = element.hasAttribute.bind(element, _schema3.localName);
										getAttribute = element.getAttribute.bind(element, _schema3.localName);
									}
									if (_schema3.required && !hasAttribute()) throw new XmlError(XE.ATTRIBUTE_MISSING, _schema3.localName, localName);
									if (!hasAttribute()) this[key] = _schema3.defaultValue;else {
										var _value4 = _schema3.converter ? _schema3.converter.set(getAttribute()) : getAttribute();
										this[key] = _value4;
									}
									break;
								}
							case ELEMENT:
								{
									var _schema4 = selfItem;
									if (_schema4.noRoot) {
										if (!_schema4.parser) throw new XmlError(XE.XML_EXCEPTION, 'Schema for \'' + _schema4.localName + '\' with flag noRoot must have \'parser\'');
										var col = new _schema4.parser();
										if (!(col instanceof XmlCollection)) throw new XmlError(XE.XML_EXCEPTION, 'Schema for \'' + _schema4.localName + '\' with flag noRoot must have \'parser\' like instance of XmlCollection');
										col.OnLoadXml(element);
										delete col.element;
										if (col.Count < _schema4.minOccurs || col.Count > _schema4.maxOccurs) throw new XmlError(XE.COLLECTION_LIMIT, _schema4.parser.localName, localName);
										this[key] = col;
										continue;
									}
									var foundElement = null;
									for (var i = 0; i < element.childNodes.length; i++) {
										var node = element.childNodes.item(i);
										if (node.nodeType !== XmlNodeType.Element) continue;
										var el = node;
										if (el.localName === _schema4.localName && el.namespaceURI == _schema4.namespaceURI) {
											foundElement = el;
											break;
										}
									}
									if (_schema4.required && !foundElement) throw new XmlError(XE.ELEMENT_MISSING, _schema4.parser ? _schema4.parser.localName : _schema4.localName, localName);
									if (!_schema4.parser) {
										if (!foundElement) this[key] = _schema4.defaultValue;else {
											var _value5 = _schema4.converter ? _schema4.converter.set(foundElement.textContent) : foundElement.textContent;
											this[key] = _value5;
										}
									} else {
										if (foundElement) {
											var _value6 = new _schema4.parser();
											_value6.localName = _schema4.localName;
											_value6.namespaceURI = _schema4.namespaceURI;
											this[key] = _value6;
											_value6.LoadXml(foundElement);
										}
									}
									break;
								}
						}
					}
				}
				this.OnLoadXml(element);
				this.prefix = element.prefix || "";
				this.element = element;
			}
		}, {
			key: 'toString',
			value: function toString() {
				var xml = this.GetXml();
				return xml ? new XMLSerializer().serializeToString(xml) : "";
			}
		}, {
			key: 'GetElement',
			value: function GetElement(name) {
				var required = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

				if (!this.element) throw new XmlError(XE.NULL_PARAM, this.localName);
				return XmlObject.GetElement(this.element, name, required);
			}
		}, {
			key: 'GetAttribute',
			value: function GetAttribute(name, defaultValue) {
				var required = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

				if (!this.element) throw new XmlError(XE.NULL_PARAM, this.localName);
				return XmlObject.GetAttribute(this.element, name, defaultValue, required);
			}
		}, {
			key: 'CreateElement',
			value: function CreateElement(document, localName) {
				var namespaceUri = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
				var prefix = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

				if (!document) document = this.CreateDocument();
				localName = localName || this.localName;
				namespaceUri = namespaceUri || this.NamespaceURI;
				prefix = prefix || this.prefix;
				var xn = document.createElementNS(this.NamespaceURI, (prefix ? prefix + ':' : "") + localName);
				document.importNode(xn, true);
				return xn;
			}
		}, {
			key: 'CreateDocument',
			value: function CreateDocument() {
				return XmlObject.CreateDocument(this.localName, this.NamespaceURI, this.Prefix);
			}
		}, {
			key: 'GetChildren',
			value: function GetChildren(localName, nameSpace) {
				if (!this.element) throw new XmlError(XE.NULL_PARAM, this.localName);
				return XmlObject.GetChildren(this.element, localName, nameSpace || this.NamespaceURI || undefined);
			}
		}, {
			key: 'GetChild',
			value: function GetChild(localName) {
				var required = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

				if (!this.element) throw new XmlError(XE.NULL_PARAM, this.localName);
				return XmlObject.GetChild(this.element, localName, this.NamespaceURI || undefined, required);
			}
		}, {
			key: 'GetFirstChild',
			value: function GetFirstChild(localName, namespace) {
				if (!this.element) throw new XmlError(XE.NULL_PARAM, this.localName);
				return XmlObject.GetFirstChild(this.element, localName, namespace);
			}
		}, {
			key: 'IsEmpty',
			value: function IsEmpty() {
				return this.Element === void 0;
			}
		}, {
			key: 'Element',
			get: function get() {
				return this.element;
			}
		}, {
			key: 'Prefix',
			get: function get() {
				return this.prefix;
			},
			set: function set(value) {
				this.prefix = value;
			}
		}, {
			key: 'LocalName',
			get: function get() {
				return this.localName;
			}
		}, {
			key: 'NamespaceURI',
			get: function get() {
				return this.namespaceURI || null;
			}
		}], [{
			key: 'LoadXml',
			value: function LoadXml(param) {
				var xml = new this();
				xml.LoadXml(param);
				return xml;
			}
		}, {
			key: 'GetElement',
			value: function GetElement(element, name) {
				var required = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

				var xmlNodeList = element.getElementsByTagName(name);
				if (required && xmlNodeList.length === 0) {
					throw new XmlError(XE.ELEMENT_MISSING, name, element.localName);
				}
				return xmlNodeList[0] || null;
			}
		}, {
			key: 'GetAttribute',
			value: function GetAttribute(element, attrName, defaultValue) {
				var required = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;

				if (element.hasAttribute(attrName)) {
					return element.getAttribute(attrName);
				} else {
					if (required) throw new XmlError(XE.ATTRIBUTE_MISSING, attrName, element.localName);
					return defaultValue;
				}
			}
		}, {
			key: 'GetElementById',
			value: function GetElementById(node, idValue) {
				if (node == null || idValue == null) return null;
				var xel = null;
				if (node.nodeType === XmlNodeType.Document) xel = node.getElementById(idValue);
				if (xel == null) {
					xel = SelectSingleNode(node, '//*[@Id=\'' + idValue + '\']');
					if (xel == null) {
						xel = SelectSingleNode(node, '//*[@ID=\'' + idValue + '\']');
						if (xel == null) {
							xel = SelectSingleNode(node, '//*[@id=\'' + idValue + '\']');
						}
					}
				}
				return xel;
			}
		}, {
			key: 'CreateDocument',
			value: function CreateDocument() {
				var root = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : DEFAULT_ROOT_NAME;
				var namespaceUri = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
				var prefix = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

				var name_prefix = "",
				    ns_prefix = "",
				    namespace_uri = "";
				if (prefix) {
					name_prefix = prefix + ":";
					ns_prefix = ":" + prefix;
				}
				if (namespaceUri) {
					namespace_uri = ' xmlns' + ns_prefix + '="' + namespaceUri + '"';
				}
				var name = '' + name_prefix + root;
				var doc = new DOMParser().parseFromString('<' + name + namespace_uri + '></' + name + '>', APPLICATION_XML);
				return doc;
			}
		}, {
			key: 'GetChildren',
			value: function GetChildren(node, localName, nameSpace) {
				node = node.documentElement || node;
				var res = [];
				for (var i = 0; i < node.childNodes.length; i++) {
					var child = node.childNodes[i];
					if (child.nodeType === XmlNodeType.Element && child.localName === localName && (child.namespaceURI === nameSpace || !nameSpace)) {
						res.push(child);
					}
				}
				return res;
			}
		}, {
			key: 'GetFirstChild',
			value: function GetFirstChild(node, localName, nameSpace) {
				node = node.documentElement || node;
				for (var i = 0; i < node.childNodes.length; i++) {
					var child = node.childNodes[i];
					if (child.nodeType === XmlNodeType.Element && child.localName === localName && (child.namespaceURI === nameSpace || !nameSpace)) {
						return child;
					}
				}
				return null;
			}
		}, {
			key: 'GetChild',
			value: function GetChild(node, localName, nameSpace) {
				var required = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;

				for (var i = 0; i < node.childNodes.length; i++) {
					var child = node.childNodes[i];
					if (child.nodeType === XmlNodeType.Element && child.localName === localName && (child.namespaceURI === nameSpace || !nameSpace)) {
						return child;
					}
				}
				if (required) throw new XmlError(XE.ELEMENT_MISSING, localName, node.localName);
				return null;
			}
		}]);

		return XmlObject;
	}();

	var XmlCollection = function (_XmlObject) {
		_inherits(XmlCollection, _XmlObject);

		function XmlCollection() {
			_classCallCheck(this, XmlCollection);

			var _this2 = _possibleConstructorReturn(this, (XmlCollection.__proto__ || Object.getPrototypeOf(XmlCollection)).apply(this, arguments));

			_this2.items = new Array();
			return _this2;
		}

		_createClass(XmlCollection, [{
			key: 'HasChanged',
			value: function HasChanged() {
				var res = _get(XmlCollection.prototype.__proto__ || Object.getPrototypeOf(XmlCollection.prototype), 'HasChanged', this).call(this);
				var changed = this.Some(function (item) {
					return item.HasChanged();
				});
				return res || changed;
			}
		}, {
			key: 'OnGetXml',
			value: function OnGetXml(element) {
				var _iteratorNormalCompletion = true;
				var _didIteratorError = false;
				var _iteratorError = undefined;

				try {
					for (var _iterator = this.GetIterator()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
						var item = _step.value;

						var el = item.GetXml();
						if (el) element.appendChild(el);
					}
				} catch (err) {
					_didIteratorError = true;
					_iteratorError = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion && _iterator.return) {
							_iterator.return();
						}
					} finally {
						if (_didIteratorError) {
							throw _iteratorError;
						}
					}
				}
			}
		}, {
			key: 'OnLoadXml',
			value: function OnLoadXml(element) {
				var self = this.GetStatic();
				if (!self.parser) throw new XmlError(XE.XML_EXCEPTION, self.localName + ' doesn\'t have required \'parser\' in @XmlElement');
				for (var i = 0; i < element.childNodes.length; i++) {
					var node = element.childNodes.item(i);
					if (!(node.nodeType === XmlNodeType.Element && node.localName === self.parser.localName && node.namespaceURI == self.namespaceURI)) continue;
					var el = node;
					var item = new self.parser();
					item.LoadXml(el);
					this.Add(item);
				}
			}
		}, {
			key: 'Item',
			value: function Item(index) {
				return this.items[index] || null;
			}
		}, {
			key: 'Add',
			value: function Add(item) {
				this.items.push(item);
				this.element = null;
			}
		}, {
			key: 'Pop',
			value: function Pop() {
				this.element = null;
				return this.items.pop();
			}
		}, {
			key: 'RemoveAt',
			value: function RemoveAt(index) {
				this.items = this.items.filter(function (item, _index) {
					return _index !== index;
				});
				this.element = null;
			}
		}, {
			key: 'Clear',
			value: function Clear() {
				this.items = new Array();
				this.element = null;
			}
		}, {
			key: 'GetIterator',
			value: function GetIterator() {
				return this.items;
			}
		}, {
			key: 'ForEach',
			value: function ForEach(cb) {
				this.GetIterator().forEach(cb);
			}
		}, {
			key: 'Map',
			value: function Map(cb) {
				return new Collection(this.GetIterator().map(cb));
			}
		}, {
			key: 'Filter',
			value: function Filter(cb) {
				return new Collection(this.GetIterator().filter(cb));
			}
		}, {
			key: 'Sort',
			value: function Sort(cb) {
				return new Collection(this.GetIterator().sort(cb));
			}
		}, {
			key: 'Every',
			value: function Every(cb) {
				return this.GetIterator().every(cb);
			}
		}, {
			key: 'Some',
			value: function Some(cb) {
				return this.GetIterator().some(cb);
			}
		}, {
			key: 'IsEmpty',
			value: function IsEmpty() {
				return this.Count === 0;
			}
		}, {
			key: 'Count',
			get: function get() {
				return this.items.length;
			}
		}]);

		return XmlCollection;
	}(XmlObject);

	var NamespaceManager = function (_Collection) {
		_inherits(NamespaceManager, _Collection);

		function NamespaceManager() {
			_classCallCheck(this, NamespaceManager);

			return _possibleConstructorReturn(this, (NamespaceManager.__proto__ || Object.getPrototypeOf(NamespaceManager)).apply(this, arguments));
		}

		_createClass(NamespaceManager, [{
			key: 'Add',
			value: function Add(item) {
				item.prefix = item.prefix || "";
				item.namespace = item.namespace || "";
				_get(NamespaceManager.prototype.__proto__ || Object.getPrototypeOf(NamespaceManager.prototype), 'Add', this).call(this, item);
			}
		}, {
			key: 'GetPrefix',
			value: function GetPrefix(prefix) {
				var start = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.Count - 1;

				var lim = this.Count - 1;
				prefix = prefix || "";
				if (start > lim) start = lim;
				for (var i = start; i >= 0; i--) {
					var item = this.items[i];
					if (item.prefix === prefix) return item;
				}
				return null;
			}
		}, {
			key: 'GetNamespace',
			value: function GetNamespace(namespaceUrl) {
				var start = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.Count - 1;

				var lim = this.Count - 1;
				namespaceUrl = namespaceUrl || "";
				if (start > lim) start = lim;
				for (var i = start; i >= 0; i--) {
					var item = this.items[i];
					if (item.namespace === namespaceUrl) return item;
				}
				return null;
			}
		}]);

		return NamespaceManager;
	}(Collection);

	var XmlXades = {
		DefaultPrefix: "xades",
		/**
   * The XAdES XML namespace URI
   */
		NamespaceURI: "http://uri.etsi.org/01903/v1.3.2#",
		/**
   * Mandated type name for the Uri reference to the SignedProperties element
   */
		SignedPropertiesType: "http://uri.etsi.org/01903/v1.3.2#SignedProperties",
		ElementNames: {
			Any: "Any",
			ByName: "ByName",
			ByKey: "ByKey",
			AttrAuthoritiesCertValues: "AttrAuthoritiesCertValues",
			AttributeRevocationValues: "AttributeRevocationValues",
			AttributeCertificateRefs: "AttributeCertificateRefs",
			AttributeRevocationRefs: "AttributeRevocationRefs",
			QualifyingProperties: "QualifyingProperties",
			QualifyingPropertiesReference: "QualifyingPropertiesReference",
			SignedProperties: "SignedProperties",
			SignedSignatureProperties: "SignedSignatureProperties",
			SignedDataObjectProperties: "SignedDataObjectProperties",
			UnsignedProperties: "UnsignedProperties",
			UnsignedSignatureProperties: "UnsignedSignatureProperties",
			UnsignedDataObjectProperties: "UnsignedDataObjectProperties",
			UnsignedDataObjectProperty: "UnsignedDataObjectProperty",
			SigningTime: "SigningTime",
			SigningCertificate: "SigningCertificate",
			SignaturePolicyIdentifier: "SignaturePolicyIdentifier",
			SignatureProductionPlace: "SignatureProductionPlace",
			SignerRole: "SignerRole",
			Cert: "Cert",
			CertDigest: "CertDigest",
			IssuerSerial: "IssuerSerial",
			DataObjectFormat: "DataObjectFormat",
			CommitmentTypeIndication: "CommitmentTypeIndication",
			AllDataObjectsTimeStamp: "AllDataObjectsTimeStamp",
			IndividualDataObjectsTimeStamp: "IndividualDataObjectsTimeStamp",
			HashDataInfo: "HashDataInfo",
			EncapsulatedTimeStamp: "EncapsulatedTimeStamp",
			XMLTimeStamp: "XMLTimeStamp",
			XAdESTimeStamp: "XAdESTimeStamp",
			OtherTimeStamp: "OtherTimeStamp",
			Description: "Description",
			ObjectIdentifier: "ObjectIdentifier",
			MimeType: "MimeType",
			Encoding: "Encoding",
			Identifier: "Identifier",
			DocumentationReferences: "DocumentationReferences",
			DocumentationReference: "DocumentationReference",
			CommitmentTypeId: "CommitmentTypeId",
			ObjectReference: "ObjectReference",
			CommitmentTypeQualifiers: "CommitmentTypeQualifiers",
			AllSignedDataObjects: "AllSignedDataObjects",
			CommitmentTypeQualifier: "CommitmentTypeQualifier",
			SignaturePolicyId: "SignaturePolicyId",
			SignaturePolicyImplied: "SignaturePolicyImplied",
			SigPolicyId: "SigPolicyId",
			SigPolicyHash: "SigPolicyHash",
			SigPolicyQualifier: "SigPolicyQualifier",
			SigPolicyQualifiers: "SigPolicyQualifiers",
			SPURI: "SPURI",
			SPUserNotice: "SPUserNotice",
			NoticeRef: "NoticeRef",
			ExplicitText: "ExplicitText",
			ClaimedRoles: "ClaimedRoles",
			ClaimedRole: "ClaimedRole",
			CertifiedRoles: "CertifiedRoles",
			CertifiedRole: "CertifiedRole",
			Organization: "Organization",
			NoticeNumbers: "NoticeNumbers",
			Int: "int",
			City: "City",
			PostalCode: "PostalCode",
			StateOrProvince: "StateOrProvince",
			CountryName: "CountryName",
			CounterSignature: "CounterSignature",
			SignatureTimeStamp: "SignatureTimeStamp",
			CompleteCertificateRefs: "CompleteCertificateRefs",
			CompleteRevocationRefs: "CompleteRevocationRefs",
			SigAndRefsTimeStamp: "SigAndRefsTimeStamp",
			RefsOnlyTimeStamp: "RefsOnlyTimeStamp",
			CertificateValues: "CertificateValues",
			RevocationValues: "RevocationValues",
			ArchiveTimeStamp: "ArchiveTimeStamp",
			CertRefs: "CertRefs",
			CRLRefs: "CRLRefs",
			CRLRef: "CRLRef",
			OCSPRefs: "OCSPRefs",
			OtherRefs: "OtherRefs",
			OtherRef: "OtherRef",
			DigestAlgAndValue: "DigestAlgAndValue",
			CRLIdentifier: "CRLIdentifier",
			Issuer: "Issuer",
			IssueTime: "IssueTime",
			Number: "Number",
			OCSPRef: "OCSPRef",
			OCSPIdentifier: "OCSPIdentifier",
			ResponderID: "ResponderID",
			ProducedAt: "ProducedAt",
			EncapsulatedX509Certificate: "EncapsulatedX509Certificate",
			OtherCertificate: "OtherCertificate",
			CRLValues: "CRLValues",
			OCSPValues: "OCSPValues",
			OtherValues: "OtherValues",
			OtherValue: "OtherValue",
			EncapsulatedCRLValue: "EncapsulatedCRLValue",
			EncapsulatedOCSPValue: "EncapsulatedOCSPValue",
			ReferenceInfo: "ReferenceInfo",
			Include: "Include"
		},
		AttributeNames: {
			Id: "Id",
			Encoding: "Encoding",
			Target: "Target",
			ObjectReference: "ObjectReference",
			Qualifier: "Qualifier",
			Uri: "uri",
			URI: "URI",
			ReferencedData: "referencedData"
		}
	};

	var XadesObject = function (_super) {
		__extends(XadesObject, _super);
		function XadesObject() {
			return _super !== null && _super.apply(this, arguments) || this;
		}
		return XadesObject;
	}(XmlObject);
	XadesObject = __decorate([XmlElement({
		localName: "xades",
		namespaceURI: XmlXades.NamespaceURI,
		prefix: XmlXades.DefaultPrefix
	})], XadesObject);
	var XadesCollection = function (_super) {
		__extends(XadesCollection, _super);
		function XadesCollection() {
			return _super !== null && _super.apply(this, arguments) || this;
		}
		return XadesCollection;
	}(XmlCollection);
	XadesCollection = __decorate([XmlElement({
		localName: "xades_collection",
		namespaceURI: XmlXades.NamespaceURI,
		prefix: XmlXades.DefaultPrefix
	})], XadesCollection);

	/**
  * <xsd:element name="Any" type="AnyType"/>
  * <xsd:complexType name="AnyType" mixed="true">
  * 	 <xsd:sequence minOccurs="0" maxOccurs="unbounded">
  * 	   <xsd:any namespace="##any" processContents="lax"/>
  * 	 </xsd:sequence>
  * 	 <xsd:anyAttribute namespace="##any"/>
  * </xsd:complexType>
  */
	var Any = function (_super) {
		__extends(Any, _super);
		function Any() {
			return _super !== null && _super.apply(this, arguments) || this;
		}
		return Any;
	}(XadesObject);
	__decorate([XmlContent()], Any.prototype, "Value", void 0);
	Any = __decorate([XmlElement({
		localName: XmlXades.ElementNames.Any
	})], Any);

	/**
  *
  * <xsd:element name="EncapsulatedPKIData" type="EncapsulatedPKIDataType"/>
  * <xsd:complexType name="EncapsulatedPKIDataType">
  *   <xsd:simpleContent>
  *     <xsd:extension base="xsd:base64Binary">
  * 	     <xsd:attribute name="Id" type="xsd:ID" use="optional"/>
  *       <xsd:attribute name="Encoding" type="xsd:anyURI" use="optional"/>
  * 	   </xsd:extension>
  *   </xsd:simpleContent>
  * </xsd:complexType>
  *
  */
	var XmlEncodingConverter = {
		get: function get(value) {
			switch (value) {
				case "der":
				case "ber":
				case "cer":
				case "per":
				case "xer":
					return "http://uri.etsi.org/01903/v1.2.2#" + value.toUpperCase();
			}
			return void 0;
		},
		set: function set(value) {
			var regexp = /#(\w+)$/;
			var res = regexp.exec(value);
			if (res) return res[1].toLowerCase();
			return null;
		}
	};
	var EncapsulatedPKIData = function (_super) {
		__extends(EncapsulatedPKIData, _super);
		function EncapsulatedPKIData() {
			return _super !== null && _super.apply(this, arguments) || this;
		}
		return EncapsulatedPKIData;
	}(XadesObject);
	__decorate([XmlAttribute({
		localName: XmlXades.AttributeNames.Id,
		defaultValue: ""
	})], EncapsulatedPKIData.prototype, "Id", void 0);
	__decorate([XmlAttribute({
		localName: XmlXades.AttributeNames.Encoding,
		defaultValue: null,
		converter: XmlEncodingConverter
	})], EncapsulatedPKIData.prototype, "Encoding", void 0);
	__decorate([XmlContent({
		required: true,
		converter: XmlBase64Converter
	})], EncapsulatedPKIData.prototype, "Value", void 0);
	EncapsulatedPKIData = __decorate([XmlElement({
		localName: "EncapsulatedPKIData"
	})], EncapsulatedPKIData);

	/**
  *
  * <xsd:element name="CertificateValues" type="CertificateValuesType"/>
  * <xsd:complexType name="CertificateValuesType">
  *     <xsd:choice minOccurs="0" maxOccurs="unbounded">
  *         <xsd:element name="EncapsulatedX509Certificate" type="EncapsulatedPKIDataType"/>
  *         <xsd:element name="OtherCertificate" type="AnyType"/>
  *     </xsd:choice>
  *     <xsd:attribute name="Id" type="xsd:ID" use="optional"/>
  * </xsd:complexType>
  *
  */
	var OtherCertificate = function (_super) {
		__extends(OtherCertificate, _super);
		function OtherCertificate() {
			return _super !== null && _super.apply(this, arguments) || this;
		}
		return OtherCertificate;
	}(Any);
	OtherCertificate = __decorate([XmlElement({ localName: XmlXades.ElementNames.OtherCertificate })], OtherCertificate);
	var OtherCertificateCollection = function (_super) {
		__extends(OtherCertificateCollection, _super);
		function OtherCertificateCollection() {
			return _super !== null && _super.apply(this, arguments) || this;
		}
		return OtherCertificateCollection;
	}(XadesCollection);
	OtherCertificateCollection = __decorate([XmlElement({ localName: "OtherCertificateCollection", parser: OtherCertificate })], OtherCertificateCollection);
	var EncapsulatedX509Certificate = function (_super) {
		__extends(EncapsulatedX509Certificate, _super);
		function EncapsulatedX509Certificate() {
			return _super !== null && _super.apply(this, arguments) || this;
		}
		return EncapsulatedX509Certificate;
	}(EncapsulatedPKIData);
	EncapsulatedX509Certificate = __decorate([XmlElement({ localName: XmlXades.ElementNames.EncapsulatedX509Certificate })], EncapsulatedX509Certificate);
	var EncapsulatedX509CertificateCollection = function (_super) {
		__extends(EncapsulatedX509CertificateCollection, _super);
		function EncapsulatedX509CertificateCollection() {
			return _super !== null && _super.apply(this, arguments) || this;
		}
		return EncapsulatedX509CertificateCollection;
	}(XadesCollection);
	EncapsulatedX509CertificateCollection = __decorate([XmlElement({ localName: "EncapsulatedX509CertificateCollection", parser: EncapsulatedX509Certificate })], EncapsulatedX509CertificateCollection);
	var CertificateValues = function (_super) {
		__extends(CertificateValues, _super);
		function CertificateValues() {
			return _super !== null && _super.apply(this, arguments) || this;
		}
		return CertificateValues;
	}(XadesObject);
	__decorate([XmlAttribute({ localName: XmlXades.AttributeNames.Id, defaultValue: "" })], CertificateValues.prototype, "Id", void 0);
	__decorate([XmlChildElement({ parser: EncapsulatedX509CertificateCollection, noRoot: true })], CertificateValues.prototype, "EncapsulatedX509Certificates", void 0);
	__decorate([XmlChildElement({ parser: OtherCertificateCollection, noRoot: true })], CertificateValues.prototype, "OtherCertificates", void 0);
	CertificateValues = __decorate([XmlElement({ localName: XmlXades.ElementNames.CertificateValues })], CertificateValues);

	// import * as XmlCore from "xml-core";
	/**
  *
  * <!-- Start ObjectIdentifierType-->
  * <xsd:element name="ObjectIdentifier" type="ObjectIdentifierType"/>
  * <xsd:complexType name="ObjectIdentifierType">
  *   <xsd:sequence>
  *     <xsd:element name="Identifier" type="IdentifierType"/>
  *     <xsd:element name="Description" type="xsd:string" minOccurs="0"/>
  *     <xsd:element name="DocumentationReferences" type="DocumentationReferencesType" minOccurs="0"/>
  *   </xsd:sequence>
  * </xsd:complexType>
  * <xsd:complexType name="IdentifierType">
  *   <xsd:simpleContent>
  *     <xsd:extension base="xsd:anyURI">
  *       <xsd:attribute name="Qualifier" type="QualifierType" use="optional"/>
  *     </xsd:extension>
  *   </xsd:simpleContent>
  * </xsd:complexType>
  * <xsd:simpleType name="QualifierType">
  *   <xsd:restriction base="xsd:string">
  *     <xsd:enumeration value="OIDAsURI"/>
  *     <xsd:enumeration value="OIDAsURN"/>
  *   </xsd:restriction>
  * </xsd:simpleType>
  * <xsd:complexType name="DocumentationReferencesType">
  *   <xsd:sequence maxOccurs="unbounded">
  *      <xsd:element name="DocumentationReference" type="xsd:anyURI"/>
  *   </xsd:sequence>
  * </xsd:complexType>
  * <!-- End ObjectIdentifierType-->
  *
  */
	var Identifier = function (_super) {
		__extends(Identifier, _super);
		function Identifier() {
			return _super !== null && _super.apply(this, arguments) || this;
		}
		return Identifier;
	}(XadesObject);
	__decorate([XmlAttribute({
		localName: XmlXades.AttributeNames.Qualifier
	})], Identifier.prototype, "Qualifier", void 0);
	__decorate([XmlContent({
		defaultValue: "",
		required: true
	})], Identifier.prototype, "Value", void 0);
	Identifier = __decorate([XmlElement({
		localName: XmlXades.ElementNames.Identifier
	})], Identifier);
	var DocumentationReference = function (_super) {
		__extends(DocumentationReference, _super);
		function DocumentationReference() {
			return _super !== null && _super.apply(this, arguments) || this;
		}
		DocumentationReference.prototype.OnLoadXml = function (e) {
			if (e.textContent) this.Uri = e.textContent;
		};
		DocumentationReference.prototype.OnGetXml = function (e) {
			if (this.Uri) e.textContent = this.Uri;
		};
		return DocumentationReference;
	}(XadesObject);
	__decorate([XmlContent({
		defaultValue: "",
		required: true
	})], DocumentationReference.prototype, "Uri", void 0);
	DocumentationReference = __decorate([XmlElement({
		localName: XmlXades.ElementNames.DocumentationReference
	})], DocumentationReference);
	var DocumentationReferences = function (_super) {
		__extends(DocumentationReferences, _super);
		function DocumentationReferences() {
			return _super !== null && _super.apply(this, arguments) || this;
		}
		return DocumentationReferences;
	}(XadesCollection);
	DocumentationReferences = __decorate([XmlElement({
		localName: XmlXades.ElementNames.DocumentationReferences,
		parser: DocumentationReference
	})], DocumentationReferences);
	var ObjectIdentifier = function (_super) {
		__extends(ObjectIdentifier, _super);
		function ObjectIdentifier() {
			return _super !== null && _super.apply(this, arguments) || this;
		}
		return ObjectIdentifier;
	}(XadesObject);
	__decorate([XmlChildElement({
		parser: Identifier,
		required: true
	})], ObjectIdentifier.prototype, "Identifier", void 0);
	__decorate([XmlChildElement({
		localName: XmlXades.ElementNames.Description,
		namespaceURI: XmlXades.NamespaceURI,
		prefix: XmlXades.DefaultPrefix,
		defaultValue: ""
	})], ObjectIdentifier.prototype, "Description", void 0);
	__decorate([XmlChildElement({
		parser: DocumentationReferences
	})], ObjectIdentifier.prototype, "DocumentationReferences", void 0);
	ObjectIdentifier = __decorate([XmlElement({
		localName: XmlXades.ElementNames.ObjectIdentifier
	})], ObjectIdentifier);

	/**
  *
  * <xsd:element name="CommitmentTypeIndication" type="CommitmentTypeIndicationType"/>
  * <xsd:complexType name="CommitmentTypeIndicationType">
  *     <xsd:sequence>
  *         <xsd:element name="CommitmentTypeId" type="ObjectIdentifierType"/>
  *         <xsd:choice>
  *             <xsd:element name="ObjectReference" type="xsd:anyURI" maxOccurs="unbounded"/>
  *             <xsd:element name="AllSignedDataObjects"/>
  *         </xsd:choice>
  *         <xsd:element name="CommitmentTypeQualifiers" type="CommitmentTypeQualifiersListType" minOccurs="0"/>
  *     </xsd:sequence>
  * </xsd:complexType>
  * <xsd:complexType name="CommitmentTypeQualifiersListType">
  *     <xsd:sequence>
  *         <xsd:element name="CommitmentTypeQualifier" type="AnyType" minOccurs="0" maxOccurs="unbounded"/>
  *     </xsd:sequence>
  * </xsd:complexType>
  *
  */
	var CommitmentTypeQualifier = function (_super) {
		__extends(CommitmentTypeQualifier, _super);
		function CommitmentTypeQualifier() {
			return _super !== null && _super.apply(this, arguments) || this;
		}
		return CommitmentTypeQualifier;
	}(Any);
	CommitmentTypeQualifier = __decorate([XmlElement({ localName: XmlXades.ElementNames.CommitmentTypeQualifier })], CommitmentTypeQualifier);
	var CommitmentTypeQualifiers = function (_super) {
		__extends(CommitmentTypeQualifiers, _super);
		function CommitmentTypeQualifiers() {
			return _super !== null && _super.apply(this, arguments) || this;
		}
		return CommitmentTypeQualifiers;
	}(XadesCollection);
	CommitmentTypeQualifiers = __decorate([XmlElement({ localName: XmlXades.ElementNames.CommitmentTypeQualifiers, parser: CommitmentTypeQualifier })], CommitmentTypeQualifiers);
	var ObjectReference = function (_super) {
		__extends(ObjectReference, _super);
		function ObjectReference() {
			return _super !== null && _super.apply(this, arguments) || this;
		}
		return ObjectReference;
	}(XadesObject);
	__decorate([XmlContent({ required: true })], ObjectReference.prototype, "Value", void 0);
	ObjectReference = __decorate([XmlElement({ localName: XmlXades.ElementNames.ObjectReference })], ObjectReference);
	var ObjectReferenceCollection = function (_super) {
		__extends(ObjectReferenceCollection, _super);
		function ObjectReferenceCollection() {
			return _super !== null && _super.apply(this, arguments) || this;
		}
		return ObjectReferenceCollection;
	}(XadesCollection);
	ObjectReferenceCollection = __decorate([XmlElement({ localName: "ObjectReferences", parser: ObjectReference })], ObjectReferenceCollection);
	var XmlAllSignedDataObjectsConverter = {
		set: function set(value) {
			// if SignaturePolicyImplied exists then return true
			return true;
		},
		get: function get(value) {
			return void 0;
		}
	};
	var CommitmentTypeIndication = function (_super) {
		__extends(CommitmentTypeIndication, _super);
		function CommitmentTypeIndication() {
			return _super !== null && _super.apply(this, arguments) || this;
		}
		return CommitmentTypeIndication;
	}(XadesObject);
	__decorate([XmlChildElement({
		localName: XmlXades.ElementNames.CommitmentTypeId,
		required: true,
		namespaceURI: XmlXades.NamespaceURI,
		prefix: XmlXades.DefaultPrefix,
		parser: ObjectIdentifier
	})], CommitmentTypeIndication.prototype, "CommitmentTypeId", void 0);
	__decorate([XmlChildElement({ parser: ObjectReferenceCollection, noRoot: true })], CommitmentTypeIndication.prototype, "ObjectReference", void 0);
	__decorate([XmlChildElement({
		localName: XmlXades.ElementNames.AllSignedDataObjects,
		namespaceURI: XmlXades.NamespaceURI,
		prefix: XmlXades.DefaultPrefix,
		converter: XmlAllSignedDataObjectsConverter,
		defaultValue: false
	})], CommitmentTypeIndication.prototype, "AllSignedDataObjects", void 0);
	__decorate([XmlChildElement({ localName: XmlXades.ElementNames.CommitmentTypeQualifiers, parser: CommitmentTypeQualifier })], CommitmentTypeIndication.prototype, "CommitmentTypeQualifiers", void 0);
	CommitmentTypeIndication = __decorate([XmlElement({ localName: XmlXades.ElementNames.CommitmentTypeIndication })], CommitmentTypeIndication);

	//**************************************************************************************
	/**
  * Making UTC date from local date
  * @param {Date} date Date to convert from
  * @returns {Date}
  */

	//**************************************************************************************
	/**
  * Get value for input parameters, or set a default value
  * @param {Object} parameters
  * @param {string} name
  * @param defaultValue
  */
	function getParametersValue(parameters, name, defaultValue) {
		if (parameters instanceof Object === false) return defaultValue;

		if (name in parameters) return parameters[name];

		return defaultValue;
	}
	//**************************************************************************************
	/**
  * Converts "ArrayBuffer" into a hexdecimal string
  * @param {ArrayBuffer} inputBuffer
  * @param {number} [inputOffset=0]
  * @param {number} [inputLength=inputBuffer.byteLength]
  * @returns {string}
  */
	function bufferToHexCodes(inputBuffer) {
		var inputOffset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
		var inputLength = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : inputBuffer.byteLength;

		var result = "";

		var _iteratorNormalCompletion2 = true;
		var _didIteratorError2 = false;
		var _iteratorError2 = undefined;

		try {
			for (var _iterator2 = new Uint8Array(inputBuffer, inputOffset, inputLength)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
				var item = _step2.value;

				var str = item.toString(16).toUpperCase();
				result = result + (str.length === 1 ? "0" : "") + str;
			}
		} catch (err) {
			_didIteratorError2 = true;
			_iteratorError2 = err;
		} finally {
			try {
				if (!_iteratorNormalCompletion2 && _iterator2.return) {
					_iterator2.return();
				}
			} finally {
				if (_didIteratorError2) {
					throw _iteratorError2;
				}
			}
		}

		return result;
	}
	//**************************************************************************************
	/**
  * Check input "ArrayBuffer" for common functions
  * @param {LocalBaseBlock} baseBlock
  * @param {ArrayBuffer} inputBuffer
  * @param {number} inputOffset
  * @param {number} inputLength
  * @returns {boolean}
  */
	function checkBufferParams(baseBlock, inputBuffer, inputOffset, inputLength) {
		if (inputBuffer instanceof ArrayBuffer === false) {
			baseBlock.error = "Wrong parameter: inputBuffer must be \"ArrayBuffer\"";
			return false;
		}

		if (inputBuffer.byteLength === 0) {
			baseBlock.error = "Wrong parameter: inputBuffer has zero length";
			return false;
		}

		if (inputOffset < 0) {
			baseBlock.error = "Wrong parameter: inputOffset less than zero";
			return false;
		}

		if (inputLength < 0) {
			baseBlock.error = "Wrong parameter: inputLength less than zero";
			return false;
		}

		if (inputBuffer.byteLength - inputOffset - inputLength < 0) {
			baseBlock.error = "End of input reached before message was fully decoded (inconsistent offset and length values)";
			return false;
		}

		return true;
	}
	//**************************************************************************************
	/**
  * Convert number from 2^base to 2^10
  * @param {Uint8Array} inputBuffer
  * @param {number} inputBase
  * @returns {number}
  */
	function utilFromBase(inputBuffer, inputBase) {
		var result = 0;

		for (var i = inputBuffer.length - 1; i >= 0; i--) {
			result += inputBuffer[inputBuffer.length - 1 - i] * Math.pow(2, inputBase * i);
		}return result;
	}
	//**************************************************************************************
	/**
  * Convert number from 2^10 to 2^base
  * @param {!number} value The number to convert
  * @param {!number} base The base for 2^base
  * @param {number} [reserved=0] Pre-defined number of bytes in output array (-1 = limited by function itself)
  * @returns {ArrayBuffer}
  */
	function utilToBase(value, base) {
		var reserved = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

		var internalReserved = reserved || -1;
		var internalValue = value;

		var result = 0;
		var biggest = Math.pow(2, base);

		for (var i = 1; i < 8; i++) {
			if (value < biggest) {
				var retBuf = void 0;

				if (internalReserved < 0) {
					retBuf = new ArrayBuffer(i);
					result = i;
				} else {
					if (internalReserved < i) return new ArrayBuffer(0);

					retBuf = new ArrayBuffer(internalReserved);

					result = internalReserved;
				}

				var retView = new Uint8Array(retBuf);

				for (var j = i - 1; j >= 0; j--) {
					var basis = Math.pow(2, j * base);

					retView[result - j - 1] = Math.floor(internalValue / basis);
					internalValue -= retView[result - j - 1] * basis;
				}

				return retBuf;
			}

			biggest *= Math.pow(2, base);
		}

		return new ArrayBuffer(0);
	}
	//**************************************************************************************
	/**
  * Concatenate two ArrayBuffers
  * @param {...ArrayBuffer} buffers First ArrayBuffer (first part of concatenated array)
  */
	function utilConcatBuf() {
		//region Initial variables
		var outputLength = 0;
		var prevLength = 0;
		//endregion

		//region Calculate output length

		for (var _len5 = arguments.length, buffers = Array(_len5), _key6 = 0; _key6 < _len5; _key6++) {
			buffers[_key6] = arguments[_key6];
		}

		var _iteratorNormalCompletion3 = true;
		var _didIteratorError3 = false;
		var _iteratorError3 = undefined;

		try {
			for (var _iterator3 = buffers[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
				var buffer = _step3.value;

				outputLength += buffer.byteLength;
			} //endregion
		} catch (err) {
			_didIteratorError3 = true;
			_iteratorError3 = err;
		} finally {
			try {
				if (!_iteratorNormalCompletion3 && _iterator3.return) {
					_iterator3.return();
				}
			} finally {
				if (_didIteratorError3) {
					throw _iteratorError3;
				}
			}
		}

		var retBuf = new ArrayBuffer(outputLength);
		var retView = new Uint8Array(retBuf);

		var _iteratorNormalCompletion4 = true;
		var _didIteratorError4 = false;
		var _iteratorError4 = undefined;

		try {
			for (var _iterator4 = buffers[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
				var _buffer = _step4.value;

				retView.set(new Uint8Array(_buffer), prevLength);
				prevLength += _buffer.byteLength;
			}
		} catch (err) {
			_didIteratorError4 = true;
			_iteratorError4 = err;
		} finally {
			try {
				if (!_iteratorNormalCompletion4 && _iterator4.return) {
					_iterator4.return();
				}
			} finally {
				if (_didIteratorError4) {
					throw _iteratorError4;
				}
			}
		}

		return retBuf;
	}
	//**************************************************************************************
	/**
  * Decoding of "two complement" values
  * The function must be called in scope of instance of "hexBlock" class ("valueHex" and "warnings" properties must be present)
  * @returns {number}
  */
	function utilDecodeTC() {
		var buf = new Uint8Array(this.valueHex);

		if (this.valueHex.byteLength >= 2) {
			//noinspection JSBitwiseOperatorUsage
			var condition1 = buf[0] === 0xFF && buf[1] & 0x80;
			var condition2 = buf[0] === 0x00 && (buf[1] & 0x80) === 0x00;

			if (condition1 || condition2) this.warnings.push("Needlessly long format");
		}

		//region Create big part of the integer
		var bigIntBuffer = new ArrayBuffer(this.valueHex.byteLength);
		var bigIntView = new Uint8Array(bigIntBuffer);
		for (var i = 0; i < this.valueHex.byteLength; i++) {
			bigIntView[i] = 0;
		}bigIntView[0] = buf[0] & 0x80; // mask only the biggest bit

		var bigInt = utilFromBase(bigIntView, 8);
		//endregion

		//region Create small part of the integer
		var smallIntBuffer = new ArrayBuffer(this.valueHex.byteLength);
		var smallIntView = new Uint8Array(smallIntBuffer);
		for (var j = 0; j < this.valueHex.byteLength; j++) {
			smallIntView[j] = buf[j];
		}smallIntView[0] &= 0x7F; // mask biggest bit

		var smallInt = utilFromBase(smallIntView, 8);
		//endregion

		return smallInt - bigInt;
	}
	//**************************************************************************************
	/**
  * Encode integer value to "two complement" format
  * @param {number} value Value to encode
  * @returns {ArrayBuffer}
  */
	function utilEncodeTC(value) {
		var modValue = value < 0 ? value * -1 : value;
		var bigInt = 128;

		for (var i = 1; i < 8; i++) {
			if (modValue <= bigInt) {
				if (value < 0) {
					var smallInt = bigInt - modValue;

					var _retBuf = utilToBase(smallInt, 8, i);
					var _retView = new Uint8Array(_retBuf);

					_retView[0] |= 0x80;

					return _retBuf;
				}

				var retBuf = utilToBase(modValue, 8, i);
				var retView = new Uint8Array(retBuf);

				//noinspection JSBitwiseOperatorUsage
				if (retView[0] & 0x80) {
					//noinspection JSCheckFunctionSignatures
					var tempBuf = retBuf.slice(0);
					var tempView = new Uint8Array(tempBuf);

					retBuf = new ArrayBuffer(retBuf.byteLength + 1);
					retView = new Uint8Array(retBuf);

					for (var k = 0; k < tempBuf.byteLength; k++) {
						retView[k + 1] = tempView[k];
					}retView[0] = 0x00;
				}

				return retBuf;
			}

			bigInt *= Math.pow(2, 8);
		}

		return new ArrayBuffer(0);
	}
	//**************************************************************************************
	/**
  * Compare two array buffers
  * @param {!ArrayBuffer} inputBuffer1
  * @param {!ArrayBuffer} inputBuffer2
  * @returns {boolean}
  */
	function isEqualBuffer(inputBuffer1, inputBuffer2) {
		if (inputBuffer1.byteLength !== inputBuffer2.byteLength) return false;

		var view1 = new Uint8Array(inputBuffer1);
		var view2 = new Uint8Array(inputBuffer2);

		for (var i = 0; i < view1.length; i++) {
			if (view1[i] !== view2[i]) return false;
		}

		return true;
	}
	//**************************************************************************************
	/**
  * Pad input number with leade "0" if needed
  * @returns {string}
  * @param {number} inputNumber
  * @param {number} fullLength
  */
	function padNumber(inputNumber, fullLength) {
		var str = inputNumber.toString(10);
		var dif = fullLength - str.length;

		var padding = new Array(dif);
		for (var i = 0; i < dif; i++) {
			padding[i] = "0";
		}var paddingString = padding.join("");

		return paddingString.concat(str);
	}
	//**************************************************************************************
	var base64Template = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
	var base64UrlTemplate = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_=";
	//**************************************************************************************
	/**
  * Encode string into BASE64 (or "base64url")
  * @param {string} input
  * @param {boolean} useUrlTemplate If "true" then output would be encoded using "base64url"
  * @param {boolean} skipPadding Skip BASE-64 padding or not
  * @returns {string}
  */
	function toBase64(input) {
		var useUrlTemplate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
		var skipPadding = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

		var i = 0;

		var flag1 = 0;
		var flag2 = 0;

		var output = "";

		var template = useUrlTemplate ? base64UrlTemplate : base64Template;

		while (i < input.length) {
			var chr1 = input.charCodeAt(i++);
			if (i >= input.length) flag1 = 1;
			var chr2 = input.charCodeAt(i++);
			if (i >= input.length) flag2 = 1;
			var chr3 = input.charCodeAt(i++);

			var enc1 = chr1 >> 2;
			var enc2 = (chr1 & 0x03) << 4 | chr2 >> 4;
			var enc3 = (chr2 & 0x0F) << 2 | chr3 >> 6;
			var enc4 = chr3 & 0x3F;

			if (flag1 === 1) enc3 = enc4 = 64;else {
				if (flag2 === 1) enc4 = 64;
			}

			if (skipPadding) {
				if (enc3 === 64) output += '' + template.charAt(enc1) + template.charAt(enc2);else {
					if (enc4 === 64) output += '' + template.charAt(enc1) + template.charAt(enc2) + template.charAt(enc3);else output += '' + template.charAt(enc1) + template.charAt(enc2) + template.charAt(enc3) + template.charAt(enc4);
				}
			} else output += '' + template.charAt(enc1) + template.charAt(enc2) + template.charAt(enc3) + template.charAt(enc4);
		}

		return output;
	}
	//**************************************************************************************
	/**
  * Decode string from BASE64 (or "base64url")
  * @param {string} input
  * @param {boolean} [useUrlTemplate=false] If "true" then output would be encoded using "base64url"
  * @param {boolean} [cutTailZeros=false] If "true" then cut tailing zeroz from function result
  * @returns {string}
  */
	function fromBase64(input) {
		var useUrlTemplate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
		var cutTailZeros = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

		var template = useUrlTemplate ? base64UrlTemplate : base64Template;

		//region Aux functions
		function indexof(toSearch) {
			for (var _i = 0; _i < 64; _i++) {
				if (template.charAt(_i) === toSearch) return _i;
			}

			return 64;
		}

		function test(incoming) {
			return incoming === 64 ? 0x00 : incoming;
		}
		//endregion

		var i = 0;

		var output = "";

		while (i < input.length) {
			var enc1 = indexof(input.charAt(i++));
			var enc2 = i >= input.length ? 0x00 : indexof(input.charAt(i++));
			var enc3 = i >= input.length ? 0x00 : indexof(input.charAt(i++));
			var enc4 = i >= input.length ? 0x00 : indexof(input.charAt(i++));

			var chr1 = test(enc1) << 2 | test(enc2) >> 4;
			var chr2 = (test(enc2) & 0x0F) << 4 | test(enc3) >> 2;
			var chr3 = (test(enc3) & 0x03) << 6 | test(enc4);

			output += String.fromCharCode(chr1);

			if (enc3 !== 64) output += String.fromCharCode(chr2);

			if (enc4 !== 64) output += String.fromCharCode(chr3);
		}

		if (cutTailZeros) {
			var outputLength = output.length;
			var nonZeroStart = -1;

			for (var _i2 = outputLength - 1; _i2 >= 0; _i2--) {
				if (output.charCodeAt(_i2) !== 0) {
					nonZeroStart = _i2;
					break;
				}
			}

			if (nonZeroStart !== -1) output = output.slice(0, nonZeroStart + 1);
		}

		return output;
	}
	//**************************************************************************************
	function arrayBufferToString(buffer) {
		var resultString = "";
		var view = new Uint8Array(buffer);

		var _iteratorNormalCompletion5 = true;
		var _didIteratorError5 = false;
		var _iteratorError5 = undefined;

		try {
			for (var _iterator5 = view[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
				var element = _step5.value;

				resultString = resultString + String.fromCharCode(element);
			}
		} catch (err) {
			_didIteratorError5 = true;
			_iteratorError5 = err;
		} finally {
			try {
				if (!_iteratorNormalCompletion5 && _iterator5.return) {
					_iterator5.return();
				}
			} finally {
				if (_didIteratorError5) {
					throw _iteratorError5;
				}
			}
		}

		return resultString;
	}
	//**************************************************************************************
	function stringToArrayBuffer(str) {
		var stringLength = str.length;

		var resultBuffer = new ArrayBuffer(stringLength);
		var resultView = new Uint8Array(resultBuffer);

		for (var i = 0; i < stringLength; i++) {
			resultView[i] = str.charCodeAt(i);
		}return resultBuffer;
	}
	//**************************************************************************************
	var log2 = Math.log(2);
	//**************************************************************************************
	/**
  * Get nearest to input length power of 2
  * @param {number} length Current length of existing array
  * @returns {number}
  */
	function nearestPowerOf2(length) {
		var base = Math.log(length) / log2;

		var floor = Math.floor(base);
		var round = Math.round(base);

		return floor === round ? floor : round;
	}
	//**************************************************************************************

	/*
  * Copyright (c) 2016, Peculiar Ventures
  * All rights reserved.
  *
  * Author 2016, Yury Strozhevsky <www.strozhevsky.com>.
  *
  * Redistribution and use in source and binary forms, with or without modification,
  * are permitted provided that the following conditions are met:
  *
  * 1. Redistributions of source code must retain the above copyright notice,
  *    this list of conditions and the following disclaimer.
  *
  * 2. Redistributions in binary form must reproduce the above copyright notice,
  *    this list of conditions and the following disclaimer in the documentation
  *    and/or other materials provided with the distribution.
  *
  * 3. Neither the name of the copyright holder nor the names of its contributors
  *    may be used to endorse or promote products derived from this software without
  *    specific prior written permission.
  *
  * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
  * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
  * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
  * IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
  * INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
  * NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
  * PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
  * WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
  * ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY
  * OF SUCH DAMAGE.
  *
  */
	//**************************************************************************************
	//**************************************************************************************
	//region Declaration for "LocalBaseBlock" class
	//**************************************************************************************
	/**
  * Class used as a base block for all remaining ASN.1 classes
  * @typedef LocalBaseBlock
  * @interface
  * @property {number} blockLength
  * @property {string} error
  * @property {Array.<string>} warnings
  * @property {ArrayBuffer} valueBeforeDecode
  */

	var LocalBaseBlock = function () {
		//**********************************************************************************
		/**
   * Constructor for "LocalBaseBlock" class
   * @param {Object} [parameters={}]
   * @property {ArrayBuffer} [valueBeforeDecode]
   */
		function LocalBaseBlock() {
			var parameters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

			_classCallCheck(this, LocalBaseBlock);

			/**
    * @type {number} blockLength
    */
			this.blockLength = getParametersValue(parameters, "blockLength", 0);
			/**
    * @type {string} error
    */
			this.error = getParametersValue(parameters, "error", "");
			/**
    * @type {Array.<string>} warnings
    */
			this.warnings = getParametersValue(parameters, "warnings", []);
			//noinspection JSCheckFunctionSignatures
			/**
    * @type {ArrayBuffer} valueBeforeDecode
    */
			if ("valueBeforeDecode" in parameters) this.valueBeforeDecode = parameters.valueBeforeDecode.slice(0);else this.valueBeforeDecode = new ArrayBuffer(0);
		}
		//**********************************************************************************
		/**
   * Aux function, need to get a block name. Need to have it here for inhiritence
   * @returns {string}
   */


		_createClass(LocalBaseBlock, [{
			key: 'toJSON',

			//**********************************************************************************
			/**
    * Convertion for the block to JSON object
    * @returns {{blockName: string, blockLength: number, error: string, warnings: Array.<string>, valueBeforeDecode: string}}
    */
			value: function toJSON() {
				return {
					blockName: this.constructor.blockName(),
					blockLength: this.blockLength,
					error: this.error,
					warnings: this.warnings,
					valueBeforeDecode: bufferToHexCodes(this.valueBeforeDecode, 0, this.valueBeforeDecode.byteLength)
				};
			}
			//**********************************************************************************

		}], [{
			key: 'blockName',
			value: function blockName() {
				return "baseBlock";
			}
		}]);

		return LocalBaseBlock;
	}();
	//**************************************************************************************
	//endregion
	//**************************************************************************************
	//region Description for "LocalHexBlock" class
	//**************************************************************************************
	/**
  * Class used as a base block for all remaining ASN.1 classes
  * @extends LocalBaseBlock
  * @typedef LocalHexBlock
  * @property {number} blockLength
  * @property {string} error
  * @property {Array.<string>} warnings
  * @property {ArrayBuffer} valueBeforeDecode
  * @property {boolean} isHexOnly
  * @property {ArrayBuffer} valueHex
  */
	//noinspection JSUnusedLocalSymbols


	var LocalHexBlock = function LocalHexBlock(BaseClass) {
		return function (_BaseClass) {
			_inherits(LocalHexBlockMixin, _BaseClass);

			//**********************************************************************************
			//noinspection JSUnusedGlobalSymbols
			/**
    * Constructor for "LocalHexBlock" class
    * @param {Object} [parameters={}]
    * @property {ArrayBuffer} [valueHex]
    */
			function LocalHexBlockMixin() {
				var parameters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

				_classCallCheck(this, LocalHexBlockMixin);

				/**
     * @type {boolean}
     */
				var _this4 = _possibleConstructorReturn(this, (LocalHexBlockMixin.__proto__ || Object.getPrototypeOf(LocalHexBlockMixin)).call(this, parameters));

				_this4.isHexOnly = getParametersValue(parameters, "isHexOnly", false);
				/**
     * @type {ArrayBuffer}
     */
				if ("valueHex" in parameters) _this4.valueHex = parameters.valueHex.slice(0);else _this4.valueHex = new ArrayBuffer(0);
				return _this4;
			}
			//**********************************************************************************
			/**
    * Aux function, need to get a block name. Need to have it here for inhiritence
    * @returns {string}
    */


			_createClass(LocalHexBlockMixin, [{
				key: 'fromBER',

				//**********************************************************************************
				/**
     * Base function for converting block from BER encoded array of bytes
     * @param {!ArrayBuffer} inputBuffer ASN.1 BER encoded array
     * @param {!number} inputOffset Offset in ASN.1 BER encoded array where decoding should be started
     * @param {!number} inputLength Maximum length of array of bytes which can be using in this function
     * @returns {number} Offset after least decoded byte
     */
				value: function fromBER(inputBuffer, inputOffset, inputLength) {
					//region Basic check for parameters
					//noinspection JSCheckFunctionSignatures
					if (checkBufferParams(this, inputBuffer, inputOffset, inputLength) === false) return -1;
					//endregion

					//region Getting Uint8Array from ArrayBuffer
					var intBuffer = new Uint8Array(inputBuffer, inputOffset, inputLength);
					//endregion

					//region Initial checks
					if (intBuffer.length === 0) {
						this.warnings.push("Zero buffer length");
						return inputOffset;
					}
					//endregion

					//region Copy input buffer to internal buffer
					this.valueHex = inputBuffer.slice(inputOffset, inputOffset + inputLength);
					//endregion

					this.blockLength = inputLength;

					return inputOffset + inputLength;
				}
				//**********************************************************************************
				/**
     * Encoding of current ASN.1 block into ASN.1 encoded array (BER rules)
     * @param {boolean} [sizeOnly=false] Flag that we need only a size of encoding, not a real array of bytes
     * @returns {ArrayBuffer}
     */

			}, {
				key: 'toBER',
				value: function toBER() {
					var sizeOnly = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

					if (this.isHexOnly !== true) {
						this.error = "Flag \"isHexOnly\" is not set, abort";
						return new ArrayBuffer(0);
					}

					if (sizeOnly === true) return new ArrayBuffer(this.valueHex.byteLength);

					//noinspection JSCheckFunctionSignatures
					return this.valueHex.slice(0);
				}
				//**********************************************************************************
				/**
     * Convertion for the block to JSON object
     * @returns {Object}
     */

			}, {
				key: 'toJSON',
				value: function toJSON() {
					var object = {};

					//region Seems at the moment (Sep 2016) there is no way how to check method is supported in "super" object
					try {
						object = _get(LocalHexBlockMixin.prototype.__proto__ || Object.getPrototypeOf(LocalHexBlockMixin.prototype), 'toJSON', this).call(this);
					} catch (ex) {}
					//endregion

					object.blockName = this.constructor.blockName();
					object.isHexOnly = this.isHexOnly;
					object.valueHex = bufferToHexCodes(this.valueHex, 0, this.valueHex.byteLength);

					return object;
				}
				//**********************************************************************************

			}], [{
				key: 'blockName',
				value: function blockName() {
					return "hexBlock";
				}
			}]);

			return LocalHexBlockMixin;
		}(BaseClass);
	};
	//**************************************************************************************
	//endregion
	//**************************************************************************************
	//region Declaration of identification block class
	//**************************************************************************************

	var LocalIdentificationBlock = function (_LocalHexBlock) {
		_inherits(LocalIdentificationBlock, _LocalHexBlock);

		//**********************************************************************************
		/**
   * Constructor for "LocalBaseBlock" class
   * @param {Object} [parameters={}]
   * @property {Object} [idBlock]
   */
		function LocalIdentificationBlock() {
			var parameters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

			_classCallCheck(this, LocalIdentificationBlock);

			var _this5 = _possibleConstructorReturn(this, (LocalIdentificationBlock.__proto__ || Object.getPrototypeOf(LocalIdentificationBlock)).call(this));

			if ("idBlock" in parameters) {
				//region Properties from hexBlock class
				_this5.isHexOnly = getParametersValue(parameters.idBlock, "isHexOnly", false);
				_this5.valueHex = getParametersValue(parameters.idBlock, "valueHex", new ArrayBuffer(0));
				//endregion

				_this5.tagClass = getParametersValue(parameters.idBlock, "tagClass", -1);
				_this5.tagNumber = getParametersValue(parameters.idBlock, "tagNumber", -1);
				_this5.isConstructed = getParametersValue(parameters.idBlock, "isConstructed", false);
			} else {
				_this5.tagClass = -1;
				_this5.tagNumber = -1;
				_this5.isConstructed = false;
			}
			return _this5;
		}
		//**********************************************************************************
		/**
   * Aux function, need to get a block name. Need to have it here for inhiritence
   * @returns {string}
   */


		_createClass(LocalIdentificationBlock, [{
			key: 'toBER',

			//**********************************************************************************
			/**
    * Encoding of current ASN.1 block into ASN.1 encoded array (BER rules)
    * @param {boolean} [sizeOnly=false] Flag that we need only a size of encoding, not a real array of bytes
    * @returns {ArrayBuffer}
    */
			value: function toBER() {
				var sizeOnly = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

				//region Initial variables
				var firstOctet = 0;
				var retBuf = void 0;
				var retView = void 0;
				//endregion

				switch (this.tagClass) {
					case 1:
						firstOctet |= 0x00; // UNIVERSAL
						break;
					case 2:
						firstOctet |= 0x40; // APPLICATION
						break;
					case 3:
						firstOctet |= 0x80; // CONTEXT-SPECIFIC
						break;
					case 4:
						firstOctet |= 0xC0; // PRIVATE
						break;
					default:
						this.error = "Unknown tag class";
						return new ArrayBuffer(0);
				}

				if (this.isConstructed) firstOctet |= 0x20;

				if (this.tagNumber < 31 && !this.isHexOnly) {
					retBuf = new ArrayBuffer(1);
					retView = new Uint8Array(retBuf);

					if (!sizeOnly) {
						var number = this.tagNumber;
						number &= 0x1F;
						firstOctet |= number;

						retView[0] = firstOctet;
					}

					return retBuf;
				}

				if (this.isHexOnly === false) {
					var encodedBuf = utilToBase(this.tagNumber, 7);
					var encodedView = new Uint8Array(encodedBuf);
					var size = encodedBuf.byteLength;

					retBuf = new ArrayBuffer(size + 1);
					retView = new Uint8Array(retBuf);
					retView[0] = firstOctet | 0x1F;

					if (!sizeOnly) {
						for (var i = 0; i < size - 1; i++) {
							retView[i + 1] = encodedView[i] | 0x80;
						}retView[size] = encodedView[size - 1];
					}

					return retBuf;
				}

				retBuf = new ArrayBuffer(this.valueHex.byteLength + 1);
				retView = new Uint8Array(retBuf);

				retView[0] = firstOctet | 0x1F;

				if (sizeOnly === false) {
					var curView = new Uint8Array(this.valueHex);

					for (var _i3 = 0; _i3 < curView.length - 1; _i3++) {
						retView[_i3 + 1] = curView[_i3] | 0x80;
					}retView[this.valueHex.byteLength] = curView[curView.length - 1];
				}

				return retBuf;
			}
			//**********************************************************************************
			/**
    * Base function for converting block from BER encoded array of bytes
    * @param {!ArrayBuffer} inputBuffer ASN.1 BER encoded array
    * @param {!number} inputOffset Offset in ASN.1 BER encoded array where decoding should be started
    * @param {!number} inputLength Maximum length of array of bytes which can be using in this function
    * @returns {number}
    */

		}, {
			key: 'fromBER',
			value: function fromBER(inputBuffer, inputOffset, inputLength) {
				//region Basic check for parameters
				//noinspection JSCheckFunctionSignatures
				if (checkBufferParams(this, inputBuffer, inputOffset, inputLength) === false) return -1;
				//endregion

				//region Getting Uint8Array from ArrayBuffer
				var intBuffer = new Uint8Array(inputBuffer, inputOffset, inputLength);
				//endregion

				//region Initial checks
				if (intBuffer.length === 0) {
					this.error = "Zero buffer length";
					return -1;
				}
				//endregion

				//region Find tag class
				var tagClassMask = intBuffer[0] & 0xC0;

				switch (tagClassMask) {
					case 0x00:
						this.tagClass = 1; // UNIVERSAL
						break;
					case 0x40:
						this.tagClass = 2; // APPLICATION
						break;
					case 0x80:
						this.tagClass = 3; // CONTEXT-SPECIFIC
						break;
					case 0xC0:
						this.tagClass = 4; // PRIVATE
						break;
					default:
						this.error = "Unknown tag class";
						return -1;
				}
				//endregion

				//region Find it's constructed or not
				this.isConstructed = (intBuffer[0] & 0x20) === 0x20;
				//endregion

				//region Find tag number
				this.isHexOnly = false;

				var tagNumberMask = intBuffer[0] & 0x1F;

				//region Simple case (tag number < 31)
				if (tagNumberMask !== 0x1F) {
					this.tagNumber = tagNumberMask;
					this.blockLength = 1;
				}
				//endregion
				//region Tag number bigger or equal to 31
				else {
						var count = 1;

						this.valueHex = new ArrayBuffer(255);
						var tagNumberBufferMaxLength = 255;
						var intTagNumberBuffer = new Uint8Array(this.valueHex);

						//noinspection JSBitwiseOperatorUsage
						while (intBuffer[count] & 0x80) {
							intTagNumberBuffer[count - 1] = intBuffer[count] & 0x7F;
							count++;

							if (count >= intBuffer.length) {
								this.error = "End of input reached before message was fully decoded";
								return -1;
							}

							//region In case if tag number length is greater than 255 bytes (rare but possible case)
							if (count === tagNumberBufferMaxLength) {
								tagNumberBufferMaxLength += 255;

								var _tempBuffer = new ArrayBuffer(tagNumberBufferMaxLength);
								var _tempBufferView = new Uint8Array(_tempBuffer);

								for (var i = 0; i < intTagNumberBuffer.length; i++) {
									_tempBufferView[i] = intTagNumberBuffer[i];
								}this.valueHex = new ArrayBuffer(tagNumberBufferMaxLength);
								intTagNumberBuffer = new Uint8Array(this.valueHex);
							}
							//endregion
						}

						this.blockLength = count + 1;
						intTagNumberBuffer[count - 1] = intBuffer[count] & 0x7F; // Write last byte to buffer

						//region Cut buffer
						var tempBuffer = new ArrayBuffer(count);
						var tempBufferView = new Uint8Array(tempBuffer);

						for (var _i4 = 0; _i4 < count; _i4++) {
							tempBufferView[_i4] = intTagNumberBuffer[_i4];
						}this.valueHex = new ArrayBuffer(count);
						intTagNumberBuffer = new Uint8Array(this.valueHex);
						intTagNumberBuffer.set(tempBufferView);
						//endregion

						//region Try to convert long tag number to short form
						if (this.blockLength <= 9) this.tagNumber = utilFromBase(intTagNumberBuffer, 7);else {
							this.isHexOnly = true;
							this.warnings.push("Tag too long, represented as hex-coded");
						}
						//endregion
					}
				//endregion
				//endregion

				//region Check if constructed encoding was using for primitive type
				if (this.tagClass === 1 && this.isConstructed) {
					switch (this.tagNumber) {
						case 1: // Boolean
						case 2: // REAL
						case 5: // Null
						case 6: // OBJECT IDENTIFIER
						case 9: // REAL
						case 14: // Time
						case 23:
						case 24:
						case 31:
						case 32:
						case 33:
						case 34:
							this.error = "Constructed encoding used for primitive type";
							return -1;
						default:
					}
				}
				//endregion

				return inputOffset + this.blockLength; // Return current offset in input buffer
			}
			//**********************************************************************************
			/**
    * Convertion for the block to JSON object
    * @returns {{blockName: string,
    *  tagClass: number,
    *  tagNumber: number,
    *  isConstructed: boolean,
    *  isHexOnly: boolean,
    *  valueHex: ArrayBuffer,
    *  blockLength: number,
    *  error: string, warnings: Array.<string>,
    *  valueBeforeDecode: string}}
    */

		}, {
			key: 'toJSON',
			value: function toJSON() {
				var object = {};

				//region Seems at the moment (Sep 2016) there is no way how to check method is supported in "super" object
				try {
					object = _get(LocalIdentificationBlock.prototype.__proto__ || Object.getPrototypeOf(LocalIdentificationBlock.prototype), 'toJSON', this).call(this);
				} catch (ex) {}
				//endregion

				object.blockName = this.constructor.blockName();
				object.tagClass = this.tagClass;
				object.tagNumber = this.tagNumber;
				object.isConstructed = this.isConstructed;

				return object;
			}
			//**********************************************************************************

		}], [{
			key: 'blockName',
			value: function blockName() {
				return "identificationBlock";
			}
		}]);

		return LocalIdentificationBlock;
	}(LocalHexBlock(LocalBaseBlock));
	//**************************************************************************************
	//endregion
	//**************************************************************************************
	//region Declaration of length block class
	//**************************************************************************************


	var LocalLengthBlock = function (_LocalBaseBlock) {
		_inherits(LocalLengthBlock, _LocalBaseBlock);

		//**********************************************************************************
		/**
   * Constructor for "LocalLengthBlock" class
   * @param {Object} [parameters={}]
   * @property {Object} [lenBlock]
   */
		function LocalLengthBlock() {
			var parameters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

			_classCallCheck(this, LocalLengthBlock);

			var _this6 = _possibleConstructorReturn(this, (LocalLengthBlock.__proto__ || Object.getPrototypeOf(LocalLengthBlock)).call(this));

			if ("lenBlock" in parameters) {
				_this6.isIndefiniteForm = getParametersValue(parameters.lenBlock, "isIndefiniteForm", false);
				_this6.longFormUsed = getParametersValue(parameters.lenBlock, "longFormUsed", false);
				_this6.length = getParametersValue(parameters.lenBlock, "length", 0);
			} else {
				_this6.isIndefiniteForm = false;
				_this6.longFormUsed = false;
				_this6.length = 0;
			}
			return _this6;
		}
		//**********************************************************************************
		/**
   * Aux function, need to get a block name. Need to have it here for inhiritence
   * @returns {string}
   */


		_createClass(LocalLengthBlock, [{
			key: 'fromBER',

			//**********************************************************************************
			/**
    * Base function for converting block from BER encoded array of bytes
    * @param {!ArrayBuffer} inputBuffer ASN.1 BER encoded array
    * @param {!number} inputOffset Offset in ASN.1 BER encoded array where decoding should be started
    * @param {!number} inputLength Maximum length of array of bytes which can be using in this function
    * @returns {number}
    */
			value: function fromBER(inputBuffer, inputOffset, inputLength) {
				//region Basic check for parameters
				//noinspection JSCheckFunctionSignatures
				if (checkBufferParams(this, inputBuffer, inputOffset, inputLength) === false) return -1;
				//endregion

				//region Getting Uint8Array from ArrayBuffer
				var intBuffer = new Uint8Array(inputBuffer, inputOffset, inputLength);
				//endregion

				//region Initial checks
				if (intBuffer.length === 0) {
					this.error = "Zero buffer length";
					return -1;
				}

				if (intBuffer[0] === 0xFF) {
					this.error = "Length block 0xFF is reserved by standard";
					return -1;
				}
				//endregion

				//region Check for length form type
				this.isIndefiniteForm = intBuffer[0] === 0x80;
				//endregion

				//region Stop working in case of indefinite length form
				if (this.isIndefiniteForm === true) {
					this.blockLength = 1;
					return inputOffset + this.blockLength;
				}
				//endregion

				//region Check is long form of length encoding using
				this.longFormUsed = !!(intBuffer[0] & 0x80);
				//endregion

				//region Stop working in case of short form of length value
				if (this.longFormUsed === false) {
					this.length = intBuffer[0];
					this.blockLength = 1;
					return inputOffset + this.blockLength;
				}
				//endregion

				//region Calculate length value in case of long form
				var count = intBuffer[0] & 0x7F;

				if (count > 8) // Too big length value
					{
						this.error = "Too big integer";
						return -1;
					}

				if (count + 1 > intBuffer.length) {
					this.error = "End of input reached before message was fully decoded";
					return -1;
				}

				var lengthBufferView = new Uint8Array(count);

				for (var i = 0; i < count; i++) {
					lengthBufferView[i] = intBuffer[i + 1];
				}if (lengthBufferView[count - 1] === 0x00) this.warnings.push("Needlessly long encoded length");

				this.length = utilFromBase(lengthBufferView, 8);

				if (this.longFormUsed && this.length <= 127) this.warnings.push("Unneccesary usage of long length form");

				this.blockLength = count + 1;
				//endregion

				return inputOffset + this.blockLength; // Return current offset in input buffer
			}
			//**********************************************************************************
			/**
    * Encoding of current ASN.1 block into ASN.1 encoded array (BER rules)
    * @param {boolean} [sizeOnly=false] Flag that we need only a size of encoding, not a real array of bytes
    * @returns {ArrayBuffer}
    */

		}, {
			key: 'toBER',
			value: function toBER() {
				var sizeOnly = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

				//region Initial variables
				var retBuf = void 0;
				var retView = void 0;
				//endregion

				if (this.length > 127) this.longFormUsed = true;

				if (this.isIndefiniteForm) {
					retBuf = new ArrayBuffer(1);

					if (sizeOnly === false) {
						retView = new Uint8Array(retBuf);
						retView[0] = 0x80;
					}

					return retBuf;
				}

				if (this.longFormUsed === true) {
					var encodedBuf = utilToBase(this.length, 8);

					if (encodedBuf.byteLength > 127) {
						this.error = "Too big length";
						return new ArrayBuffer(0);
					}

					retBuf = new ArrayBuffer(encodedBuf.byteLength + 1);

					if (sizeOnly === true) return retBuf;

					var encodedView = new Uint8Array(encodedBuf);
					retView = new Uint8Array(retBuf);

					retView[0] = encodedBuf.byteLength | 0x80;

					for (var i = 0; i < encodedBuf.byteLength; i++) {
						retView[i + 1] = encodedView[i];
					}return retBuf;
				}

				retBuf = new ArrayBuffer(1);

				if (sizeOnly === false) {
					retView = new Uint8Array(retBuf);

					retView[0] = this.length;
				}

				return retBuf;
			}
			//**********************************************************************************
			/**
    * Convertion for the block to JSON object
    * @returns {{blockName, blockLength, error, warnings, valueBeforeDecode}|{blockName: string, blockLength: number, error: string, warnings: Array.<string>, valueBeforeDecode: string}}
    */

		}, {
			key: 'toJSON',
			value: function toJSON() {
				var object = {};

				//region Seems at the moment (Sep 2016) there is no way how to check method is supported in "super" object
				try {
					object = _get(LocalLengthBlock.prototype.__proto__ || Object.getPrototypeOf(LocalLengthBlock.prototype), 'toJSON', this).call(this);
				} catch (ex) {}
				//endregion

				object.blockName = this.constructor.blockName();
				object.isIndefiniteForm = this.isIndefiniteForm;
				object.longFormUsed = this.longFormUsed;
				object.length = this.length;

				return object;
			}
			//**********************************************************************************

		}], [{
			key: 'blockName',
			value: function blockName() {
				return "lengthBlock";
			}
		}]);

		return LocalLengthBlock;
	}(LocalBaseBlock);
	//**************************************************************************************
	//endregion
	//**************************************************************************************
	//region Declaration of value block class
	//**************************************************************************************


	var LocalValueBlock = function (_LocalBaseBlock2) {
		_inherits(LocalValueBlock, _LocalBaseBlock2);

		//**********************************************************************************
		/**
   * Constructor for "LocalValueBlock" class
   * @param {Object} [parameters={}]
   */
		function LocalValueBlock() {
			var parameters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

			_classCallCheck(this, LocalValueBlock);

			//region Do not let a user to create abstract class
			// if (new.target === LocalValueBlock) throw TypeError("new of abstract class \"LocalValueBlock\"");
			//endregion

			return _possibleConstructorReturn(this, (LocalValueBlock.__proto__ || Object.getPrototypeOf(LocalValueBlock)).call(this, parameters));
		}
		//**********************************************************************************
		/**
   * Aux function, need to get a block name. Need to have it here for inhiritence
   * @returns {string}
   */


		_createClass(LocalValueBlock, [{
			key: 'fromBER',

			//**********************************************************************************
			//noinspection JSUnusedLocalSymbols,JSUnusedLocalSymbols,JSUnusedLocalSymbols
			/**
    * Base function for converting block from BER encoded array of bytes
    * @param {!ArrayBuffer} inputBuffer ASN.1 BER encoded array
    * @param {!number} inputOffset Offset in ASN.1 BER encoded array where decoding should be started
    * @param {!number} inputLength Maximum length of array of bytes which can be using in this function
    * @returns {number}
    */
			value: function fromBER(inputBuffer, inputOffset, inputLength) {
				//region Throw an exception for a function which needs to be specified in extended classes
				throw TypeError("User need to make a specific function in a class which extends \"LocalValueBlock\"");
				//endregion
			}
			//**********************************************************************************
			//noinspection JSUnusedLocalSymbols
			/**
    * Encoding of current ASN.1 block into ASN.1 encoded array (BER rules)
    * @param {boolean} [sizeOnly=false] Flag that we need only a size of encoding, not a real array of bytes
    * @returns {ArrayBuffer}
    */

		}, {
			key: 'toBER',
			value: function toBER() {
				var sizeOnly = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

				//region Throw an exception for a function which needs to be specified in extended classes
				throw TypeError("User need to make a specific function in a class which extends \"LocalValueBlock\"");
				//endregion
			}
			//**********************************************************************************

		}], [{
			key: 'blockName',
			value: function blockName() {
				return "valueBlock";
			}
		}]);

		return LocalValueBlock;
	}(LocalBaseBlock);
	//**************************************************************************************
	//endregion
	//**************************************************************************************
	//region Declaration of basic ASN.1 block class
	//**************************************************************************************


	var BaseBlock = function (_LocalBaseBlock3) {
		_inherits(BaseBlock, _LocalBaseBlock3);

		//**********************************************************************************
		/**
   * Constructor for "BaseBlock" class
   * @param {Object} [parameters={}]
   * @property {Object} [primitiveSchema]
   * @property {string} [name]
   * @property {boolean} [optional]
   * @param valueBlockType Type of value block
   */
		function BaseBlock() {
			var parameters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
			var valueBlockType = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : LocalValueBlock;

			_classCallCheck(this, BaseBlock);

			var _this8 = _possibleConstructorReturn(this, (BaseBlock.__proto__ || Object.getPrototypeOf(BaseBlock)).call(this, parameters));

			if ("name" in parameters) _this8.name = parameters.name;
			if ("optional" in parameters) _this8.optional = parameters.optional;
			if ("primitiveSchema" in parameters) _this8.primitiveSchema = parameters.primitiveSchema;

			_this8.idBlock = new LocalIdentificationBlock(parameters);
			_this8.lenBlock = new LocalLengthBlock(parameters);
			_this8.valueBlock = new valueBlockType(parameters);
			return _this8;
		}
		//**********************************************************************************
		/**
   * Aux function, need to get a block name. Need to have it here for inhiritence
   * @returns {string}
   */


		_createClass(BaseBlock, [{
			key: 'fromBER',

			//**********************************************************************************
			/**
    * Base function for converting block from BER encoded array of bytes
    * @param {!ArrayBuffer} inputBuffer ASN.1 BER encoded array
    * @param {!number} inputOffset Offset in ASN.1 BER encoded array where decoding should be started
    * @param {!number} inputLength Maximum length of array of bytes which can be using in this function
    * @returns {number}
    */
			value: function fromBER(inputBuffer, inputOffset, inputLength) {
				var resultOffset = this.valueBlock.fromBER(inputBuffer, inputOffset, this.lenBlock.isIndefiniteForm === true ? inputLength : this.lenBlock.length);
				if (resultOffset === -1) {
					this.error = this.valueBlock.error;
					return resultOffset;
				}

				if (this.idBlock.error.length === 0) this.blockLength += this.idBlock.blockLength;

				if (this.lenBlock.error.length === 0) this.blockLength += this.lenBlock.blockLength;

				if (this.valueBlock.error.length === 0) this.blockLength += this.valueBlock.blockLength;

				return resultOffset;
			}
			//**********************************************************************************
			/**
    * Encoding of current ASN.1 block into ASN.1 encoded array (BER rules)
    * @param {boolean} [sizeOnly=false] Flag that we need only a size of encoding, not a real array of bytes
    * @returns {ArrayBuffer}
    */

		}, {
			key: 'toBER',
			value: function toBER() {
				var sizeOnly = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

				var retBuf = void 0;

				var idBlockBuf = this.idBlock.toBER(sizeOnly);
				var valueBlockSizeBuf = this.valueBlock.toBER(true);

				this.lenBlock.length = valueBlockSizeBuf.byteLength;
				var lenBlockBuf = this.lenBlock.toBER(sizeOnly);

				retBuf = utilConcatBuf(idBlockBuf, lenBlockBuf);

				var valueBlockBuf = void 0;

				if (sizeOnly === false) valueBlockBuf = this.valueBlock.toBER(sizeOnly);else valueBlockBuf = new ArrayBuffer(this.lenBlock.length);

				retBuf = utilConcatBuf(retBuf, valueBlockBuf);

				if (this.lenBlock.isIndefiniteForm === true) {
					var indefBuf = new ArrayBuffer(2);

					if (sizeOnly === false) {
						var indefView = new Uint8Array(indefBuf);

						indefView[0] = 0x00;
						indefView[1] = 0x00;
					}

					retBuf = utilConcatBuf(retBuf, indefBuf);
				}

				return retBuf;
			}
			//**********************************************************************************
			/**
    * Convertion for the block to JSON object
    * @returns {{blockName, blockLength, error, warnings, valueBeforeDecode}|{blockName: string, blockLength: number, error: string, warnings: Array.<string>, valueBeforeDecode: string}}
    */

		}, {
			key: 'toJSON',
			value: function toJSON() {
				var object = {};

				//region Seems at the moment (Sep 2016) there is no way how to check method is supported in "super" object
				try {
					object = _get(BaseBlock.prototype.__proto__ || Object.getPrototypeOf(BaseBlock.prototype), 'toJSON', this).call(this);
				} catch (ex) {}
				//endregion

				object.idBlock = this.idBlock.toJSON();
				object.lenBlock = this.lenBlock.toJSON();
				object.valueBlock = this.valueBlock.toJSON();

				if ("name" in this) object.name = this.name;
				if ("optional" in this) object.optional = this.optional;
				if ("primitiveSchema" in this) object.primitiveSchema = this.primitiveSchema.toJSON();

				return object;
			}
			//**********************************************************************************

		}], [{
			key: 'blockName',
			value: function blockName() {
				return "BaseBlock";
			}
		}]);

		return BaseBlock;
	}(LocalBaseBlock);
	//**************************************************************************************
	//endregion
	//**************************************************************************************
	//region Declaration of basic block for all PRIMITIVE types
	//**************************************************************************************


	var LocalPrimitiveValueBlock = function (_LocalValueBlock) {
		_inherits(LocalPrimitiveValueBlock, _LocalValueBlock);

		//**********************************************************************************
		/**
   * Constructor for "LocalPrimitiveValueBlock" class
   * @param {Object} [parameters={}]
   * @property {ArrayBuffer} [valueBeforeDecode]
   */
		function LocalPrimitiveValueBlock() {
			var parameters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

			_classCallCheck(this, LocalPrimitiveValueBlock);

			//region Variables from "hexBlock" class
			var _this9 = _possibleConstructorReturn(this, (LocalPrimitiveValueBlock.__proto__ || Object.getPrototypeOf(LocalPrimitiveValueBlock)).call(this, parameters));

			if ("valueHex" in parameters) _this9.valueHex = parameters.valueHex.slice(0);else _this9.valueHex = new ArrayBuffer(0);

			_this9.isHexOnly = getParametersValue(parameters, "isHexOnly", true);
			//endregion
			return _this9;
		}
		//**********************************************************************************
		/**
   * Base function for converting block from BER encoded array of bytes
   * @param {!ArrayBuffer} inputBuffer ASN.1 BER encoded array
   * @param {!number} inputOffset Offset in ASN.1 BER encoded array where decoding should be started
   * @param {!number} inputLength Maximum length of array of bytes which can be using in this function
   * @returns {number}
   */


		_createClass(LocalPrimitiveValueBlock, [{
			key: 'fromBER',
			value: function fromBER(inputBuffer, inputOffset, inputLength) {
				//region Basic check for parameters
				//noinspection JSCheckFunctionSignatures
				if (checkBufferParams(this, inputBuffer, inputOffset, inputLength) === false) return -1;
				//endregion

				//region Getting Uint8Array from ArrayBuffer
				var intBuffer = new Uint8Array(inputBuffer, inputOffset, inputLength);
				//endregion

				//region Initial checks
				if (intBuffer.length === 0) {
					this.warnings.push("Zero buffer length");
					return inputOffset;
				}
				//endregion

				//region Copy input buffer into internal buffer
				this.valueHex = new ArrayBuffer(intBuffer.length);
				var valueHexView = new Uint8Array(this.valueHex);

				for (var i = 0; i < intBuffer.length; i++) {
					valueHexView[i] = intBuffer[i];
				} //endregion

				this.blockLength = inputLength;

				return inputOffset + inputLength;
			}
			//**********************************************************************************
			//noinspection JSUnusedLocalSymbols
			/**
    * Encoding of current ASN.1 block into ASN.1 encoded array (BER rules)
    * @param {boolean} [sizeOnly=false] Flag that we need only a size of encoding, not a real array of bytes
    * @returns {ArrayBuffer}
    */

		}, {
			key: 'toBER',
			value: function toBER() {
				var sizeOnly = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

				return this.valueHex.slice(0);
			}
			//**********************************************************************************
			/**
    * Aux function, need to get a block name. Need to have it here for inhiritence
    * @returns {string}
    */

		}, {
			key: 'toJSON',

			//**********************************************************************************
			/**
    * Convertion for the block to JSON object
    * @returns {{blockName, blockLength, error, warnings, valueBeforeDecode}|{blockName: string, blockLength: number, error: string, warnings: Array.<string>, valueBeforeDecode: string}}
    */
			value: function toJSON() {
				var object = {};

				//region Seems at the moment (Sep 2016) there is no way how to check method is supported in "super" object
				try {
					object = _get(LocalPrimitiveValueBlock.prototype.__proto__ || Object.getPrototypeOf(LocalPrimitiveValueBlock.prototype), 'toJSON', this).call(this);
				} catch (ex) {}
				//endregion

				object.valueHex = bufferToHexCodes(this.valueHex, 0, this.valueHex.byteLength);
				object.isHexOnly = this.isHexOnly;

				return object;
			}
			//**********************************************************************************

		}], [{
			key: 'blockName',
			value: function blockName() {
				return "PrimitiveValueBlock";
			}
		}]);

		return LocalPrimitiveValueBlock;
	}(LocalValueBlock);
	//**************************************************************************************


	var Primitive = function (_BaseBlock) {
		_inherits(Primitive, _BaseBlock);

		//**********************************************************************************
		/**
   * Constructor for "Primitive" class
   * @param {Object} [parameters={}]
   * @property {ArrayBuffer} [valueHex]
   */
		function Primitive() {
			var parameters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

			_classCallCheck(this, Primitive);

			var _this10 = _possibleConstructorReturn(this, (Primitive.__proto__ || Object.getPrototypeOf(Primitive)).call(this, parameters, LocalPrimitiveValueBlock));

			_this10.idBlock.isConstructed = false;
			return _this10;
		}
		//**********************************************************************************
		/**
   * Aux function, need to get a block name. Need to have it here for inhiritence
   * @returns {string}
   */


		_createClass(Primitive, null, [{
			key: 'blockName',
			value: function blockName() {
				return "PRIMITIVE";
			}
			//**********************************************************************************

		}]);

		return Primitive;
	}(BaseBlock);
	//**************************************************************************************
	//endregion
	//**************************************************************************************
	//region Declaration of basic block for all CONSTRUCTED types
	//**************************************************************************************


	var LocalConstructedValueBlock = function (_LocalValueBlock2) {
		_inherits(LocalConstructedValueBlock, _LocalValueBlock2);

		//**********************************************************************************
		/**
   * Constructor for "LocalConstructedValueBlock" class
   * @param {Object} [parameters={}]
   */
		function LocalConstructedValueBlock() {
			var parameters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

			_classCallCheck(this, LocalConstructedValueBlock);

			var _this11 = _possibleConstructorReturn(this, (LocalConstructedValueBlock.__proto__ || Object.getPrototypeOf(LocalConstructedValueBlock)).call(this, parameters));

			_this11.value = getParametersValue(parameters, "value", []);
			_this11.isIndefiniteForm = getParametersValue(parameters, "isIndefiniteForm", false);
			return _this11;
		}
		//**********************************************************************************
		/**
   * Base function for converting block from BER encoded array of bytes
   * @param {!ArrayBuffer} inputBuffer ASN.1 BER encoded array
   * @param {!number} inputOffset Offset in ASN.1 BER encoded array where decoding should be started
   * @param {!number} inputLength Maximum length of array of bytes which can be using in this function
   * @returns {number}
   */


		_createClass(LocalConstructedValueBlock, [{
			key: 'fromBER',
			value: function fromBER(inputBuffer, inputOffset, inputLength) {
				//region Store initial offset and length
				var initialOffset = inputOffset;
				var initialLength = inputLength;
				//endregion

				//region Basic check for parameters
				//noinspection JSCheckFunctionSignatures
				if (checkBufferParams(this, inputBuffer, inputOffset, inputLength) === false) return -1;
				//endregion

				//region Getting Uint8Array from ArrayBuffer
				var intBuffer = new Uint8Array(inputBuffer, inputOffset, inputLength);
				//endregion

				//region Initial checks
				if (intBuffer.length === 0) {
					this.warnings.push("Zero buffer length");
					return inputOffset;
				}
				//endregion

				//region Aux function
				function checkLen(indefiniteLength, length) {
					if (indefiniteLength === true) return 1;

					return length;
				}
				//endregion

				var currentOffset = inputOffset;

				while (checkLen(this.isIndefiniteForm, inputLength) > 0) {
					var returnObject = LocalFromBER(inputBuffer, currentOffset, inputLength);
					if (returnObject.offset === -1) {
						this.error = returnObject.result.error;
						this.warnings.concat(returnObject.result.warnings);
						return -1;
					}

					currentOffset = returnObject.offset;

					this.blockLength += returnObject.result.blockLength;
					inputLength -= returnObject.result.blockLength;

					this.value.push(returnObject.result);

					if (this.isIndefiniteForm === true && returnObject.result.constructor.blockName() === EndOfContent.blockName()) break;
				}

				if (this.isIndefiniteForm === true) {
					if (this.value[this.value.length - 1].constructor.blockName() === EndOfContent.blockName()) this.value.pop();else this.warnings.push("No EndOfContent block encoded");
				}

				//region Copy "inputBuffer" to "valueBeforeDecode"
				this.valueBeforeDecode = inputBuffer.slice(initialOffset, initialOffset + initialLength);
				//endregion

				return currentOffset;
			}
			//**********************************************************************************
			/**
    * Encoding of current ASN.1 block into ASN.1 encoded array (BER rules)
    * @param {boolean} [sizeOnly=false] Flag that we need only a size of encoding, not a real array of bytes
    * @returns {ArrayBuffer}
    */

		}, {
			key: 'toBER',
			value: function toBER() {
				var sizeOnly = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

				var retBuf = new ArrayBuffer(0);

				for (var i = 0; i < this.value.length; i++) {
					var valueBuf = this.value[i].toBER(sizeOnly);
					retBuf = utilConcatBuf(retBuf, valueBuf);
				}

				return retBuf;
			}
			//**********************************************************************************
			/**
    * Aux function, need to get a block name. Need to have it here for inhiritence
    * @returns {string}
    */

		}, {
			key: 'toJSON',

			//**********************************************************************************
			/**
    * Convertion for the block to JSON object
    * @returns {{blockName, blockLength, error, warnings, valueBeforeDecode}|{blockName: string, blockLength: number, error: string, warnings: Array.<string>, valueBeforeDecode: string}}
    */
			value: function toJSON() {
				var object = {};

				//region Seems at the moment (Sep 2016) there is no way how to check method is supported in "super" object
				try {
					object = _get(LocalConstructedValueBlock.prototype.__proto__ || Object.getPrototypeOf(LocalConstructedValueBlock.prototype), 'toJSON', this).call(this);
				} catch (ex) {}
				//endregion

				object.isIndefiniteForm = this.isIndefiniteForm;
				object.value = [];
				for (var i = 0; i < this.value.length; i++) {
					object.value.push(this.value[i].toJSON());
				}return object;
			}
			//**********************************************************************************

		}], [{
			key: 'blockName',
			value: function blockName() {
				return "ConstructedValueBlock";
			}
		}]);

		return LocalConstructedValueBlock;
	}(LocalValueBlock);
	//**************************************************************************************


	var Constructed = function (_BaseBlock2) {
		_inherits(Constructed, _BaseBlock2);

		//**********************************************************************************
		/**
   * Constructor for "Constructed" class
   * @param {Object} [parameters={}]
   */
		function Constructed() {
			var parameters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

			_classCallCheck(this, Constructed);

			var _this12 = _possibleConstructorReturn(this, (Constructed.__proto__ || Object.getPrototypeOf(Constructed)).call(this, parameters, LocalConstructedValueBlock));

			_this12.idBlock.isConstructed = true;
			return _this12;
		}
		//**********************************************************************************
		/**
   * Aux function, need to get a block name. Need to have it here for inhiritence
   * @returns {string}
   */


		_createClass(Constructed, [{
			key: 'fromBER',

			//**********************************************************************************
			/**
    * Base function for converting block from BER encoded array of bytes
    * @param {!ArrayBuffer} inputBuffer ASN.1 BER encoded array
    * @param {!number} inputOffset Offset in ASN.1 BER encoded array where decoding should be started
    * @param {!number} inputLength Maximum length of array of bytes which can be using in this function
    * @returns {number}
    */
			value: function fromBER(inputBuffer, inputOffset, inputLength) {
				this.valueBlock.isIndefiniteForm = this.lenBlock.isIndefiniteForm;

				var resultOffset = this.valueBlock.fromBER(inputBuffer, inputOffset, this.lenBlock.isIndefiniteForm === true ? inputLength : this.lenBlock.length);
				if (resultOffset === -1) {
					this.error = this.valueBlock.error;
					return resultOffset;
				}

				if (this.idBlock.error.length === 0) this.blockLength += this.idBlock.blockLength;

				if (this.lenBlock.error.length === 0) this.blockLength += this.lenBlock.blockLength;

				if (this.valueBlock.error.length === 0) this.blockLength += this.valueBlock.blockLength;

				return resultOffset;
			}
			//**********************************************************************************

		}], [{
			key: 'blockName',
			value: function blockName() {
				return "CONSTRUCTED";
			}
		}]);

		return Constructed;
	}(BaseBlock);
	//**************************************************************************************
	//endregion
	//**************************************************************************************
	//region Declaration of ASN.1 EndOfContent type class
	//**************************************************************************************


	var LocalEndOfContentValueBlock = function (_LocalValueBlock3) {
		_inherits(LocalEndOfContentValueBlock, _LocalValueBlock3);

		//**********************************************************************************
		/**
   * Constructor for "LocalEndOfContentValueBlock" class
   * @param {Object} [parameters={}]
   */
		function LocalEndOfContentValueBlock() {
			var parameters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

			_classCallCheck(this, LocalEndOfContentValueBlock);

			return _possibleConstructorReturn(this, (LocalEndOfContentValueBlock.__proto__ || Object.getPrototypeOf(LocalEndOfContentValueBlock)).call(this, parameters));
		}
		//**********************************************************************************
		//noinspection JSUnusedLocalSymbols,JSUnusedLocalSymbols
		/**
   * Base function for converting block from BER encoded array of bytes
   * @param {!ArrayBuffer} inputBuffer ASN.1 BER encoded array
   * @param {!number} inputOffset Offset in ASN.1 BER encoded array where decoding should be started
   * @param {!number} inputLength Maximum length of array of bytes which can be using in this function
   * @returns {number}
   */


		_createClass(LocalEndOfContentValueBlock, [{
			key: 'fromBER',
			value: function fromBER(inputBuffer, inputOffset, inputLength) {
				//region There is no "value block" for EndOfContent type and we need to return the same offset
				return inputOffset;
				//endregion
			}
			//**********************************************************************************
			//noinspection JSUnusedLocalSymbols
			/**
    * Encoding of current ASN.1 block into ASN.1 encoded array (BER rules)
    * @param {boolean} [sizeOnly=false] Flag that we need only a size of encoding, not a real array of bytes
    * @returns {ArrayBuffer}
    */

		}, {
			key: 'toBER',
			value: function toBER() {
				var sizeOnly = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

				return new ArrayBuffer(0);
			}
			//**********************************************************************************
			/**
    * Aux function, need to get a block name. Need to have it here for inhiritence
    * @returns {string}
    */

		}], [{
			key: 'blockName',
			value: function blockName() {
				return "EndOfContentValueBlock";
			}
			//**********************************************************************************

		}]);

		return LocalEndOfContentValueBlock;
	}(LocalValueBlock);
	//**************************************************************************************


	var EndOfContent = function (_BaseBlock3) {
		_inherits(EndOfContent, _BaseBlock3);

		//**********************************************************************************
		function EndOfContent() {
			var paramaters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

			_classCallCheck(this, EndOfContent);

			var _this14 = _possibleConstructorReturn(this, (EndOfContent.__proto__ || Object.getPrototypeOf(EndOfContent)).call(this, paramaters, LocalEndOfContentValueBlock));

			_this14.idBlock.tagClass = 1; // UNIVERSAL
			_this14.idBlock.tagNumber = 0; // EndOfContent
			return _this14;
		}
		//**********************************************************************************
		/**
   * Aux function, need to get a block name. Need to have it here for inhiritence
   * @returns {string}
   */


		_createClass(EndOfContent, null, [{
			key: 'blockName',
			value: function blockName() {
				return "EndOfContent";
			}
			//**********************************************************************************

		}]);

		return EndOfContent;
	}(BaseBlock);
	//**************************************************************************************
	//endregion
	//**************************************************************************************
	//region Declaration of ASN.1 Boolean type class
	//**************************************************************************************


	var LocalBooleanValueBlock = function (_LocalValueBlock4) {
		_inherits(LocalBooleanValueBlock, _LocalValueBlock4);

		//**********************************************************************************
		/**
   * Constructor for "LocalBooleanValueBlock" class
   * @param {Object} [parameters={}]
   */
		function LocalBooleanValueBlock() {
			var parameters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

			_classCallCheck(this, LocalBooleanValueBlock);

			var _this15 = _possibleConstructorReturn(this, (LocalBooleanValueBlock.__proto__ || Object.getPrototypeOf(LocalBooleanValueBlock)).call(this, parameters));

			_this15.value = getParametersValue(parameters, "value", false);
			_this15.isHexOnly = getParametersValue(parameters, "isHexOnly", false);

			if ("valueHex" in parameters) _this15.valueHex = parameters.valueHex.slice(0);else {
				_this15.valueHex = new ArrayBuffer(1);
				if (_this15.value === true) {
					var view = new Uint8Array(_this15.valueHex);
					view[0] = 0xFF;
				}
			}
			return _this15;
		}
		//**********************************************************************************
		/**
   * Base function for converting block from BER encoded array of bytes
   * @param {!ArrayBuffer} inputBuffer ASN.1 BER encoded array
   * @param {!number} inputOffset Offset in ASN.1 BER encoded array where decoding should be started
   * @param {!number} inputLength Maximum length of array of bytes which can be using in this function
   * @returns {number} Offset after least decoded byte
   */


		_createClass(LocalBooleanValueBlock, [{
			key: 'fromBER',
			value: function fromBER(inputBuffer, inputOffset, inputLength) {
				//region Basic check for parameters
				//noinspection JSCheckFunctionSignatures
				if (checkBufferParams(this, inputBuffer, inputOffset, inputLength) === false) return -1;
				//endregion

				//region Getting Uint8Array from ArrayBuffer
				var intBuffer = new Uint8Array(inputBuffer, inputOffset, inputLength);
				//endregion

				if (inputLength > 1) this.warnings.push("Boolean value encoded in more then 1 octet");

				this.value = intBuffer[0] !== 0x00;

				this.isHexOnly = true;

				//region Copy input buffer to internal array
				this.valueHex = new ArrayBuffer(intBuffer.length);
				var view = new Uint8Array(this.valueHex);

				for (var i = 0; i < intBuffer.length; i++) {
					view[i] = intBuffer[i];
				} //endregion

				this.blockLength = inputLength;

				return inputOffset + inputLength;
			}
			//**********************************************************************************
			//noinspection JSUnusedLocalSymbols
			/**
    * Encoding of current ASN.1 block into ASN.1 encoded array (BER rules)
    * @param {boolean} [sizeOnly=false] Flag that we need only a size of encoding, not a real array of bytes
    * @returns {ArrayBuffer}
    */

		}, {
			key: 'toBER',
			value: function toBER() {
				var sizeOnly = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

				return this.valueHex;
			}
			//**********************************************************************************
			/**
    * Aux function, need to get a block name. Need to have it here for inhiritence
    * @returns {string}
    */

		}, {
			key: 'toJSON',

			//**********************************************************************************
			/**
    * Convertion for the block to JSON object
    * @returns {{blockName, blockLength, error, warnings, valueBeforeDecode}|{blockName: string, blockLength: number, error: string, warnings: Array.<string>, valueBeforeDecode: string}}
    */
			value: function toJSON() {
				var object = {};

				//region Seems at the moment (Sep 2016) there is no way how to check method is supported in "super" object
				try {
					object = _get(LocalBooleanValueBlock.prototype.__proto__ || Object.getPrototypeOf(LocalBooleanValueBlock.prototype), 'toJSON', this).call(this);
				} catch (ex) {}
				//endregion

				object.value = this.value;
				object.isHexOnly = this.isHexOnly;
				object.valueHex = bufferToHexCodes(this.valueHex, 0, this.valueHex.byteLength);

				return object;
			}
			//**********************************************************************************

		}], [{
			key: 'blockName',
			value: function blockName() {
				return "BooleanValueBlock";
			}
		}]);

		return LocalBooleanValueBlock;
	}(LocalValueBlock);
	//**************************************************************************************


	var Boolean = function (_BaseBlock4) {
		_inherits(Boolean, _BaseBlock4);

		//**********************************************************************************
		/**
   * Constructor for "Boolean" class
   * @param {Object} [parameters={}]
   */
		function Boolean() {
			var parameters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

			_classCallCheck(this, Boolean);

			var _this16 = _possibleConstructorReturn(this, (Boolean.__proto__ || Object.getPrototypeOf(Boolean)).call(this, parameters, LocalBooleanValueBlock));

			_this16.idBlock.tagClass = 1; // UNIVERSAL
			_this16.idBlock.tagNumber = 1; // Boolean
			return _this16;
		}
		//**********************************************************************************
		/**
   * Aux function, need to get a block name. Need to have it here for inhiritence
   * @returns {string}
   */


		_createClass(Boolean, null, [{
			key: 'blockName',
			value: function blockName() {
				return "Boolean";
			}
			//**********************************************************************************

		}]);

		return Boolean;
	}(BaseBlock);
	//**************************************************************************************
	//endregion
	//**************************************************************************************
	//region Declaration of ASN.1 Sequence and Set type classes
	//**************************************************************************************


	var Sequence = function (_Constructed) {
		_inherits(Sequence, _Constructed);

		//**********************************************************************************
		/**
   * Constructor for "Sequence" class
   * @param {Object} [parameters={}]
   */
		function Sequence() {
			var parameters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

			_classCallCheck(this, Sequence);

			var _this17 = _possibleConstructorReturn(this, (Sequence.__proto__ || Object.getPrototypeOf(Sequence)).call(this, parameters));

			_this17.idBlock.tagClass = 1; // UNIVERSAL
			_this17.idBlock.tagNumber = 16; // Sequence
			return _this17;
		}
		//**********************************************************************************
		/**
   * Aux function, need to get a block name. Need to have it here for inhiritence
   * @returns {string}
   */


		_createClass(Sequence, null, [{
			key: 'blockName',
			value: function blockName() {
				return "Sequence";
			}
			//**********************************************************************************

		}]);

		return Sequence;
	}(Constructed);
	//**************************************************************************************


	var Set = function (_Constructed2) {
		_inherits(Set, _Constructed2);

		//**********************************************************************************
		/**
   * Constructor for "Set" class
   * @param {Object} [parameters={}]
   */
		function Set() {
			var parameters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

			_classCallCheck(this, Set);

			var _this18 = _possibleConstructorReturn(this, (Set.__proto__ || Object.getPrototypeOf(Set)).call(this, parameters));

			_this18.idBlock.tagClass = 1; // UNIVERSAL
			_this18.idBlock.tagNumber = 17; // Set
			return _this18;
		}
		//**********************************************************************************
		/**
   * Aux function, need to get a block name. Need to have it here for inhiritence
   * @returns {string}
   */


		_createClass(Set, null, [{
			key: 'blockName',
			value: function blockName() {
				return "Set";
			}
			//**********************************************************************************

		}]);

		return Set;
	}(Constructed);
	//**************************************************************************************
	//endregion
	//**************************************************************************************
	//region Declaration of ASN.1 Null type class
	//**************************************************************************************


	var Null = function (_BaseBlock5) {
		_inherits(Null, _BaseBlock5);

		//**********************************************************************************
		/**
   * Constructor for "Null" class
   * @param {Object} [parameters={}]
   */
		function Null() {
			var parameters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

			_classCallCheck(this, Null);

			// We will not have a call to "Null value block" because of specified "fromBER" and "toBER" functions

			var _this19 = _possibleConstructorReturn(this, (Null.__proto__ || Object.getPrototypeOf(Null)).call(this, parameters, LocalBaseBlock));

			_this19.idBlock.tagClass = 1; // UNIVERSAL
			_this19.idBlock.tagNumber = 5; // Null
			return _this19;
		}
		//**********************************************************************************
		/**
   * Aux function, need to get a block name. Need to have it here for inhiritence
   * @returns {string}
   */


		_createClass(Null, [{
			key: 'fromBER',

			//**********************************************************************************
			//noinspection JSUnusedLocalSymbols
			/**
    * Base function for converting block from BER encoded array of bytes
    * @param {!ArrayBuffer} inputBuffer ASN.1 BER encoded array
    * @param {!number} inputOffset Offset in ASN.1 BER encoded array where decoding should be started
    * @param {!number} inputLength Maximum length of array of bytes which can be using in this function
    * @returns {number} Offset after least decoded byte
    */
			value: function fromBER(inputBuffer, inputOffset, inputLength) {
				if (this.lenBlock.length > 0) this.warnings.push("Non-zero length of value block for Null type");

				if (this.idBlock.error.length === 0) this.blockLength += this.idBlock.blockLength;

				if (this.lenBlock.error.length === 0) this.blockLength += this.lenBlock.blockLength;

				this.blockLength += inputLength;

				return inputOffset + inputLength;
			}
			//**********************************************************************************
			/**
    * Encoding of current ASN.1 block into ASN.1 encoded array (BER rules)
    * @param {boolean} [sizeOnly=false] Flag that we need only a size of encoding, not a real array of bytes
    * @returns {ArrayBuffer}
    */

		}, {
			key: 'toBER',
			value: function toBER() {
				var sizeOnly = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

				var retBuf = new ArrayBuffer(2);

				if (sizeOnly === true) return retBuf;

				var retView = new Uint8Array(retBuf);
				retView[0] = 0x05;
				retView[1] = 0x00;

				return retBuf;
			}
			//**********************************************************************************

		}], [{
			key: 'blockName',
			value: function blockName() {
				return "Null";
			}
		}]);

		return Null;
	}(BaseBlock);
	//**************************************************************************************
	//endregion
	//**************************************************************************************
	//region Declaration of ASN.1 OctetString type class
	//**************************************************************************************


	var LocalOctetStringValueBlock = function (_LocalHexBlock2) {
		_inherits(LocalOctetStringValueBlock, _LocalHexBlock2);

		//**********************************************************************************
		/**
   * Constructor for "LocalOctetStringValueBlock" class
   * @param {Object} [parameters={}]
   * @property {ArrayBuffer} [valueHex]
   */
		function LocalOctetStringValueBlock() {
			var parameters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

			_classCallCheck(this, LocalOctetStringValueBlock);

			var _this20 = _possibleConstructorReturn(this, (LocalOctetStringValueBlock.__proto__ || Object.getPrototypeOf(LocalOctetStringValueBlock)).call(this, parameters));

			_this20.isConstructed = getParametersValue(parameters, "isConstructed", false);
			return _this20;
		}
		//**********************************************************************************
		/**
   * Base function for converting block from BER encoded array of bytes
   * @param {!ArrayBuffer} inputBuffer ASN.1 BER encoded array
   * @param {!number} inputOffset Offset in ASN.1 BER encoded array where decoding should be started
   * @param {!number} inputLength Maximum length of array of bytes which can be using in this function
   * @returns {number} Offset after least decoded byte
   */


		_createClass(LocalOctetStringValueBlock, [{
			key: 'fromBER',
			value: function fromBER(inputBuffer, inputOffset, inputLength) {
				var resultOffset = 0;

				if (this.isConstructed === true) {
					this.isHexOnly = false;

					resultOffset = LocalConstructedValueBlock.prototype.fromBER.call(this, inputBuffer, inputOffset, inputLength);
					if (resultOffset === -1) return resultOffset;

					for (var i = 0; i < this.value.length; i++) {
						var currentBlockName = this.value[i].constructor.blockName();

						if (currentBlockName === EndOfContent.blockName()) {
							if (this.isIndefiniteForm === true) break;else {
								this.error = "EndOfContent is unexpected, OCTET STRING may consists of OCTET STRINGs only";
								return -1;
							}
						}

						if (currentBlockName !== OctetString.blockName()) {
							this.error = "OCTET STRING may consists of OCTET STRINGs only";
							return -1;
						}
					}
				} else {
					this.isHexOnly = true;

					resultOffset = _get(LocalOctetStringValueBlock.prototype.__proto__ || Object.getPrototypeOf(LocalOctetStringValueBlock.prototype), 'fromBER', this).call(this, inputBuffer, inputOffset, inputLength);
					this.blockLength = inputLength;
				}

				return resultOffset;
			}
			//**********************************************************************************
			/**
    * Encoding of current ASN.1 block into ASN.1 encoded array (BER rules)
    * @param {boolean} [sizeOnly=false] Flag that we need only a size of encoding, not a real array of bytes
    * @returns {ArrayBuffer}
    */

		}, {
			key: 'toBER',
			value: function toBER() {
				var sizeOnly = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

				if (this.isConstructed === true) return LocalConstructedValueBlock.prototype.toBER.call(this, sizeOnly);

				var retBuf = new ArrayBuffer(this.valueHex.byteLength);

				if (sizeOnly === true) return retBuf;

				if (this.valueHex.byteLength === 0) return retBuf;

				retBuf = this.valueHex.slice(0);

				return retBuf;
			}
			//**********************************************************************************
			/**
    * Aux function, need to get a block name. Need to have it here for inhiritence
    * @returns {string}
    */

		}, {
			key: 'toJSON',

			//**********************************************************************************
			value: function toJSON() {
				var object = {};

				//region Seems at the moment (Sep 2016) there is no way how to check method is supported in "super" object
				try {
					object = _get(LocalOctetStringValueBlock.prototype.__proto__ || Object.getPrototypeOf(LocalOctetStringValueBlock.prototype), 'toJSON', this).call(this);
				} catch (ex) {}
				//endregion

				object.isConstructed = this.isConstructed;
				object.isHexOnly = this.isHexOnly;
				object.valueHex = bufferToHexCodes(this.valueHex, 0, this.valueHex.byteLength);

				return object;
			}
			//**********************************************************************************

		}], [{
			key: 'blockName',
			value: function blockName() {
				return "OctetStringValueBlock";
			}
		}]);

		return LocalOctetStringValueBlock;
	}(LocalHexBlock(LocalConstructedValueBlock));
	//**************************************************************************************


	var OctetString = function (_BaseBlock6) {
		_inherits(OctetString, _BaseBlock6);

		//**********************************************************************************
		/**
   * Constructor for "OctetString" class
   * @param {Object} [parameters={}]
   */
		function OctetString() {
			var parameters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

			_classCallCheck(this, OctetString);

			var _this21 = _possibleConstructorReturn(this, (OctetString.__proto__ || Object.getPrototypeOf(OctetString)).call(this, parameters, LocalOctetStringValueBlock));

			_this21.idBlock.tagClass = 1; // UNIVERSAL
			_this21.idBlock.tagNumber = 4; // OctetString
			return _this21;
		}
		//**********************************************************************************
		/**
   * Base function for converting block from BER encoded array of bytes
   * @param {!ArrayBuffer} inputBuffer ASN.1 BER encoded array
   * @param {!number} inputOffset Offset in ASN.1 BER encoded array where decoding should be started
   * @param {!number} inputLength Maximum length of array of bytes which can be using in this function
   * @returns {number} Offset after least decoded byte
   */


		_createClass(OctetString, [{
			key: 'fromBER',
			value: function fromBER(inputBuffer, inputOffset, inputLength) {
				this.valueBlock.isConstructed = this.idBlock.isConstructed;
				this.valueBlock.isIndefiniteForm = this.lenBlock.isIndefiniteForm;

				//region Ability to encode empty OCTET STRING
				if (inputLength === 0) {
					if (this.idBlock.error.length === 0) this.blockLength += this.idBlock.blockLength;

					if (this.lenBlock.error.length === 0) this.blockLength += this.lenBlock.blockLength;

					return inputOffset;
				}
				//endregion

				return _get(OctetString.prototype.__proto__ || Object.getPrototypeOf(OctetString.prototype), 'fromBER', this).call(this, inputBuffer, inputOffset, inputLength);
			}
			//**********************************************************************************
			/**
    * Aux function, need to get a block name. Need to have it here for inhiritence
    * @returns {string}
    */

		}, {
			key: 'isEqual',

			//**********************************************************************************
			//noinspection JSUnusedGlobalSymbols
			/**
    * Checking that two OCTETSTRINGs are equal
    * @param {OctetString} octetString
    */
			value: function isEqual(octetString) {
				//region Check input type
				if (octetString instanceof OctetString === false) return false;
				//endregion

				//region Compare two JSON strings
				if (JSON.stringify(this) !== JSON.stringify(octetString)) return false;
				//endregion

				return true;
			}
			//**********************************************************************************

		}], [{
			key: 'blockName',
			value: function blockName() {
				return "OctetString";
			}
		}]);

		return OctetString;
	}(BaseBlock);
	//**************************************************************************************
	//endregion
	//**************************************************************************************
	//region Declaration of ASN.1 BitString type class
	//**************************************************************************************


	var LocalBitStringValueBlock = function (_LocalHexBlock3) {
		_inherits(LocalBitStringValueBlock, _LocalHexBlock3);

		//**********************************************************************************
		/**
   * Constructor for "LocalBitStringValueBlock" class
   * @param {Object} [parameters={}]
   * @property {ArrayBuffer} [valueHex]
   */
		function LocalBitStringValueBlock() {
			var parameters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

			_classCallCheck(this, LocalBitStringValueBlock);

			var _this22 = _possibleConstructorReturn(this, (LocalBitStringValueBlock.__proto__ || Object.getPrototypeOf(LocalBitStringValueBlock)).call(this, parameters));

			_this22.unusedBits = getParametersValue(parameters, "unusedBits", 0);
			_this22.isConstructed = getParametersValue(parameters, "isConstructed", false);
			_this22.blockLength = _this22.valueHex.byteLength + 1; // "+1" for "unusedBits"
			return _this22;
		}
		//**********************************************************************************
		/**
   * Base function for converting block from BER encoded array of bytes
   * @param {!ArrayBuffer} inputBuffer ASN.1 BER encoded array
   * @param {!number} inputOffset Offset in ASN.1 BER encoded array where decoding should be started
   * @param {!number} inputLength Maximum length of array of bytes which can be using in this function
   * @returns {number} Offset after least decoded byte
   */


		_createClass(LocalBitStringValueBlock, [{
			key: 'fromBER',
			value: function fromBER(inputBuffer, inputOffset, inputLength) {
				//region Ability to decode zero-length BitString value
				if (inputLength === 0) return inputOffset;
				//endregion

				var resultOffset = -1;

				//region If the BISTRING supposed to be a constructed value
				if (this.isConstructed === true) {
					resultOffset = LocalConstructedValueBlock.prototype.fromBER.call(this, inputBuffer, inputOffset, inputLength);
					if (resultOffset === -1) return resultOffset;

					for (var i = 0; i < this.value.length; i++) {
						var currentBlockName = this.value[i].constructor.blockName();

						if (currentBlockName === EndOfContent.blockName()) {
							if (this.isIndefiniteForm === true) break;else {
								this.error = "EndOfContent is unexpected, BIT STRING may consists of BIT STRINGs only";
								return -1;
							}
						}

						if (currentBlockName !== BitString.blockName()) {
							this.error = "BIT STRING may consists of BIT STRINGs only";
							return -1;
						}

						if (this.unusedBits > 0 && this.value[i].unusedBits > 0) {
							this.error = "Usign of \"unused bits\" inside constructive BIT STRING allowed for least one only";
							return -1;
						}

						this.unusedBits = this.value[i].unusedBits;
						if (this.unusedBits > 7) {
							this.error = "Unused bits for BitString must be in range 0-7";
							return -1;
						}
					}

					return resultOffset;
				}
				//endregion
				//region If the BitString supposed to be a primitive value
				//region Basic check for parameters
				//noinspection JSCheckFunctionSignatures
				if (checkBufferParams(this, inputBuffer, inputOffset, inputLength) === false) return -1;
				//endregion

				var intBuffer = new Uint8Array(inputBuffer, inputOffset, inputLength);

				this.unusedBits = intBuffer[0];
				if (this.unusedBits > 7) {
					this.error = "Unused bits for BitString must be in range 0-7";
					return -1;
				}

				//region Copy input buffer to internal buffer
				this.valueHex = new ArrayBuffer(intBuffer.length - 1);
				var view = new Uint8Array(this.valueHex);
				for (var _i5 = 0; _i5 < inputLength - 1; _i5++) {
					view[_i5] = intBuffer[_i5 + 1];
				} //endregion

				this.blockLength = intBuffer.length;

				return inputOffset + inputLength;
				//endregion
			}
			//**********************************************************************************
			/**
    * Encoding of current ASN.1 block into ASN.1 encoded array (BER rules)
    * @param {boolean} [sizeOnly=false] Flag that we need only a size of encoding, not a real array of bytes
    * @returns {ArrayBuffer}
    */

		}, {
			key: 'toBER',
			value: function toBER() {
				var sizeOnly = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

				if (this.isConstructed === true) return LocalConstructedValueBlock.prototype.toBER.call(this, sizeOnly);

				if (sizeOnly === true) return new ArrayBuffer(this.valueHex.byteLength + 1);

				if (this.valueHex.byteLength === 0) return new ArrayBuffer(0);

				var curView = new Uint8Array(this.valueHex);

				var retBuf = new ArrayBuffer(this.valueHex.byteLength + 1);
				var retView = new Uint8Array(retBuf);

				retView[0] = this.unusedBits;

				for (var i = 0; i < this.valueHex.byteLength; i++) {
					retView[i + 1] = curView[i];
				}return retBuf;
			}
			//**********************************************************************************
			/**
    * Aux function, need to get a block name. Need to have it here for inhiritence
    * @returns {string}
    */

		}, {
			key: 'toJSON',

			//**********************************************************************************
			/**
    * Convertion for the block to JSON object
    * @returns {{blockName, blockLength, error, warnings, valueBeforeDecode}|{blockName: string, blockLength: number, error: string, warnings: Array.<string>, valueBeforeDecode: string}}
    */
			value: function toJSON() {
				var object = {};

				//region Seems at the moment (Sep 2016) there is no way how to check method is supported in "super" object
				try {
					object = _get(LocalBitStringValueBlock.prototype.__proto__ || Object.getPrototypeOf(LocalBitStringValueBlock.prototype), 'toJSON', this).call(this);
				} catch (ex) {}
				//endregion

				object.unusedBits = this.unusedBits;
				object.isConstructed = this.isConstructed;
				object.isHexOnly = this.isHexOnly;
				object.valueHex = bufferToHexCodes(this.valueHex, 0, this.valueHex.byteLength);

				return object;
			}
			//**********************************************************************************

		}], [{
			key: 'blockName',
			value: function blockName() {
				return "BitStringValueBlock";
			}
		}]);

		return LocalBitStringValueBlock;
	}(LocalHexBlock(LocalConstructedValueBlock));
	//**************************************************************************************


	var BitString = function (_BaseBlock7) {
		_inherits(BitString, _BaseBlock7);

		//**********************************************************************************
		/**
   * Constructor for "BitString" class
   * @param {Object} [parameters={}]
   */
		function BitString() {
			var parameters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

			_classCallCheck(this, BitString);

			var _this23 = _possibleConstructorReturn(this, (BitString.__proto__ || Object.getPrototypeOf(BitString)).call(this, parameters, LocalBitStringValueBlock));

			_this23.idBlock.tagClass = 1; // UNIVERSAL
			_this23.idBlock.tagNumber = 3; // BitString
			return _this23;
		}
		//**********************************************************************************
		/**
   * Aux function, need to get a block name. Need to have it here for inhiritence
   * @returns {string}
   */


		_createClass(BitString, [{
			key: 'fromBER',

			//**********************************************************************************
			/**
    * Base function for converting block from BER encoded array of bytes
    * @param {!ArrayBuffer} inputBuffer ASN.1 BER encoded array
    * @param {!number} inputOffset Offset in ASN.1 BER encoded array where decoding should be started
    * @param {!number} inputLength Maximum length of array of bytes which can be using in this function
    * @returns {number} Offset after least decoded byte
    */
			value: function fromBER(inputBuffer, inputOffset, inputLength) {
				//region Ability to encode empty BitString
				if (inputLength === 0) return inputOffset;
				//endregion

				this.valueBlock.isConstructed = this.idBlock.isConstructed;
				this.valueBlock.isIndefiniteForm = this.lenBlock.isIndefiniteForm;

				return _get(BitString.prototype.__proto__ || Object.getPrototypeOf(BitString.prototype), 'fromBER', this).call(this, inputBuffer, inputOffset, inputLength);
			}
			//**********************************************************************************
			/**
    * Checking that two BITSTRINGs are equal
    * @param {BitString} bitString
    */

		}, {
			key: 'isEqual',
			value: function isEqual(bitString) {
				//region Check input type
				if (bitString instanceof BitString === false) return false;
				//endregion

				//region Compare two JSON strings
				if (JSON.stringify(this) !== JSON.stringify(bitString)) return false;
				//endregion

				return true;
			}
			//**********************************************************************************

		}], [{
			key: 'blockName',
			value: function blockName() {
				return "BitString";
			}
		}]);

		return BitString;
	}(BaseBlock);
	//**************************************************************************************
	//endregion
	//**************************************************************************************
	//region Declaration of ASN.1 Integer type class
	//**************************************************************************************
	/**
  * @extends LocalValueBlock
  */


	var LocalIntegerValueBlock = function (_LocalHexBlock4) {
		_inherits(LocalIntegerValueBlock, _LocalHexBlock4);

		//**********************************************************************************
		/**
   * Constructor for "LocalIntegerValueBlock" class
   * @param {Object} [parameters={}]
   * @property {ArrayBuffer} [valueHex]
   */
		function LocalIntegerValueBlock() {
			var parameters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

			_classCallCheck(this, LocalIntegerValueBlock);

			var _this24 = _possibleConstructorReturn(this, (LocalIntegerValueBlock.__proto__ || Object.getPrototypeOf(LocalIntegerValueBlock)).call(this, parameters));

			if ("value" in parameters) _this24.valueDec = parameters.value;
			return _this24;
		}
		//**********************************************************************************
		/**
   * Setter for "valueHex"
   * @param {ArrayBuffer} _value
   */


		_createClass(LocalIntegerValueBlock, [{
			key: 'fromDER',

			//**********************************************************************************
			/**
    * Base function for converting block from DER encoded array of bytes
    * @param {!ArrayBuffer} inputBuffer ASN.1 DER encoded array
    * @param {!number} inputOffset Offset in ASN.1 DER encoded array where decoding should be started
    * @param {!number} inputLength Maximum length of array of bytes which can be using in this function
    * @param {number} [expectedLength=0] Expected length of converted "valueHex" buffer
    * @returns {number} Offset after least decoded byte
    */
			value: function fromDER(inputBuffer, inputOffset, inputLength) {
				var expectedLength = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;

				var offset = this.fromBER(inputBuffer, inputOffset, inputLength);
				if (offset === -1) return offset;

				var view = new Uint8Array(this._valueHex);

				if (view[0] === 0x00 && (view[1] & 0x80) !== 0) {
					var updatedValueHex = new ArrayBuffer(this._valueHex.byteLength - 1);
					var updatedView = new Uint8Array(updatedValueHex);

					updatedView.set(new Uint8Array(this._valueHex, 1, this._valueHex.byteLength - 1));

					this._valueHex = updatedValueHex.slice(0);
				} else {
					if (expectedLength !== 0) {
						if (this._valueHex.byteLength < expectedLength) {
							if (expectedLength - this._valueHex.byteLength > 1) expectedLength = this._valueHex.byteLength + 1;

							var _updatedValueHex = new ArrayBuffer(expectedLength);
							var _updatedView = new Uint8Array(_updatedValueHex);

							_updatedView.set(view, expectedLength - this._valueHex.byteLength);

							this._valueHex = _updatedValueHex.slice(0);
						}
					}
				}

				return offset;
			}
			//**********************************************************************************
			/**
    * Encoding of current ASN.1 block into ASN.1 encoded array (DER rules)
    * @param {boolean} [sizeOnly=false] Flag that we need only a size of encoding, not a real array of bytes
    * @returns {ArrayBuffer}
    */

		}, {
			key: 'toDER',
			value: function toDER() {
				var sizeOnly = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

				var view = new Uint8Array(this._valueHex);

				switch (true) {
					case (view[0] & 0x80) !== 0:
						{
							var updatedValueHex = new ArrayBuffer(this._valueHex.byteLength + 1);
							var updatedView = new Uint8Array(updatedValueHex);

							updatedView[0] = 0x00;
							updatedView.set(view, 1);

							this._valueHex = updatedValueHex.slice(0);
						}
						break;
					case view[0] === 0x00 && (view[1] & 0x80) === 0:
						{
							var _updatedValueHex2 = new ArrayBuffer(this._valueHex.byteLength - 1);
							var _updatedView2 = new Uint8Array(_updatedValueHex2);

							_updatedView2.set(new Uint8Array(this._valueHex, 1, this._valueHex.byteLength - 1));

							this._valueHex = _updatedValueHex2.slice(0);
						}
						break;
					default:
				}

				return this.toBER(sizeOnly);
			}
			//**********************************************************************************
			/**
    * Base function for converting block from BER encoded array of bytes
    * @param {!ArrayBuffer} inputBuffer ASN.1 BER encoded array
    * @param {!number} inputOffset Offset in ASN.1 BER encoded array where decoding should be started
    * @param {!number} inputLength Maximum length of array of bytes which can be using in this function
    * @returns {number} Offset after least decoded byte
    */

		}, {
			key: 'fromBER',
			value: function fromBER(inputBuffer, inputOffset, inputLength) {
				var resultOffset = _get(LocalIntegerValueBlock.prototype.__proto__ || Object.getPrototypeOf(LocalIntegerValueBlock.prototype), 'fromBER', this).call(this, inputBuffer, inputOffset, inputLength);
				if (resultOffset === -1) return resultOffset;

				this.blockLength = inputLength;

				return inputOffset + inputLength;
			}
			//**********************************************************************************
			/**
    * Encoding of current ASN.1 block into ASN.1 encoded array (BER rules)
    * @param {boolean} [sizeOnly=false] Flag that we need only a size of encoding, not a real array of bytes
    * @returns {ArrayBuffer}
    */

		}, {
			key: 'toBER',
			value: function toBER() {
				var sizeOnly = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

				//noinspection JSCheckFunctionSignatures
				return this.valueHex.slice(0);
			}
			//**********************************************************************************
			/**
    * Aux function, need to get a block name. Need to have it here for inhiritence
    * @returns {string}
    */

		}, {
			key: 'toJSON',

			//**********************************************************************************
			//noinspection JSUnusedGlobalSymbols
			/**
    * Convertion for the block to JSON object
    * @returns {Object}
    */
			value: function toJSON() {
				var object = {};

				//region Seems at the moment (Sep 2016) there is no way how to check method is supported in "super" object
				try {
					object = _get(LocalIntegerValueBlock.prototype.__proto__ || Object.getPrototypeOf(LocalIntegerValueBlock.prototype), 'toJSON', this).call(this);
				} catch (ex) {}
				//endregion

				object.valueDec = this.valueDec;

				return object;
			}
			//**********************************************************************************

		}, {
			key: 'valueHex',
			set: function set(_value) {
				this._valueHex = _value.slice(0);

				if (_value.byteLength >= 4) {
					this.warnings.push("Too big Integer for decoding, hex only");
					this.isHexOnly = true;
					this._valueDec = 0;
				} else {
					this.isHexOnly = false;

					if (_value.byteLength > 0) this._valueDec = utilDecodeTC.call(this);
				}
			}
			//**********************************************************************************
			/**
    * Getter for "valueHex"
    * @returns {ArrayBuffer}
    */
			,
			get: function get() {
				return this._valueHex;
			}
			//**********************************************************************************
			/**
    * Getter for "valueDec"
    * @param {number} _value
    */

		}, {
			key: 'valueDec',
			set: function set(_value) {
				this._valueDec = _value;

				this.isHexOnly = false;
				this._valueHex = utilEncodeTC(_value);
			}
			//**********************************************************************************
			/**
    * Getter for "valueDec"
    * @returns {number}
    */
			,
			get: function get() {
				return this._valueDec;
			}
		}], [{
			key: 'blockName',
			value: function blockName() {
				return "IntegerValueBlock";
			}
		}]);

		return LocalIntegerValueBlock;
	}(LocalHexBlock(LocalValueBlock));
	//**************************************************************************************


	var Integer = function (_BaseBlock8) {
		_inherits(Integer, _BaseBlock8);

		//**********************************************************************************
		/**
   * Constructor for "Integer" class
   * @param {Object} [parameters={}]
   */
		function Integer() {
			var parameters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

			_classCallCheck(this, Integer);

			var _this25 = _possibleConstructorReturn(this, (Integer.__proto__ || Object.getPrototypeOf(Integer)).call(this, parameters, LocalIntegerValueBlock));

			_this25.idBlock.tagClass = 1; // UNIVERSAL
			_this25.idBlock.tagNumber = 2; // Integer
			return _this25;
		}
		//**********************************************************************************
		/**
   * Aux function, need to get a block name. Need to have it here for inhiritence
   * @returns {string}
   */


		_createClass(Integer, [{
			key: 'isEqual',

			//**********************************************************************************
			//noinspection JSUnusedGlobalSymbols
			/**
    * Compare two Integer object, or Integer and ArrayBuffer objects
    * @param {!Integer|ArrayBuffer} otherValue
    * @returns {boolean}
    */
			value: function isEqual(otherValue) {
				if (otherValue instanceof Integer) {
					if (this.valueBlock.isHexOnly && otherValue.valueBlock.isHexOnly) // Compare two ArrayBuffers
						return isEqualBuffer(this.valueBlock.valueHex, otherValue.valueBlock.valueHex);

					if (this.valueBlock.isHexOnly === otherValue.valueBlock.isHexOnly) return this.valueBlock.valueDec === otherValue.valueBlock.valueDec;

					return false;
				}

				if (otherValue instanceof ArrayBuffer) return isEqualBuffer(this.valueBlock.valueHex, otherValue);

				return false;
			}
			//**********************************************************************************
			/**
    * Convert current Integer value from BER into DER format
    * @returns {Integer}
    */

		}, {
			key: 'convertToDER',
			value: function convertToDER() {
				var integer = new Integer({ valueHex: this.valueBlock.valueHex });
				integer.valueBlock.toDER();

				return integer;
			}
			//**********************************************************************************
			/**
    * Convert current Integer value from DER to BER format
    * @returns {Integer}
    */

		}, {
			key: 'convertFromDER',
			value: function convertFromDER() {
				var expectedLength = Math.pow(2, nearestPowerOf2(this.valueBlock.valueHex.byteLength));
				var integer = new Integer({ valueHex: this.valueBlock.valueHex });
				integer.valueBlock.fromDER(integer.valueBlock.valueHex, 0, integer.valueBlock.valueHex.byteLength, expectedLength);

				return integer;
			}
			//**********************************************************************************

		}], [{
			key: 'blockName',
			value: function blockName() {
				return "Integer";
			}
		}]);

		return Integer;
	}(BaseBlock);
	//**************************************************************************************
	//endregion
	//**************************************************************************************
	//region Declaration of ASN.1 Enumerated type class
	//**************************************************************************************


	var Enumerated = function (_Integer) {
		_inherits(Enumerated, _Integer);

		//**********************************************************************************
		/**
   * Constructor for "Enumerated" class
   * @param {Object} [parameters={}]
   */
		function Enumerated() {
			var parameters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

			_classCallCheck(this, Enumerated);

			var _this26 = _possibleConstructorReturn(this, (Enumerated.__proto__ || Object.getPrototypeOf(Enumerated)).call(this, parameters));

			_this26.idBlock.tagClass = 1; // UNIVERSAL
			_this26.idBlock.tagNumber = 10; // Enumerated
			return _this26;
		}
		//**********************************************************************************
		/**
   * Aux function, need to get a block name. Need to have it here for inhiritence
   * @returns {string}
   */


		_createClass(Enumerated, null, [{
			key: 'blockName',
			value: function blockName() {
				return "Enumerated";
			}
			//**********************************************************************************

		}]);

		return Enumerated;
	}(Integer);
	//**************************************************************************************
	//endregion
	//**************************************************************************************
	//region Declaration of ASN.1 ObjectIdentifier type class
	//**************************************************************************************


	var LocalSidValueBlock = function (_LocalHexBlock5) {
		_inherits(LocalSidValueBlock, _LocalHexBlock5);

		//**********************************************************************************
		/**
   * Constructor for "LocalSidValueBlock" class
   * @param {Object} [parameters={}]
   * @property {number} [valueDec]
   * @property {boolean} [isFirstSid]
   */
		function LocalSidValueBlock() {
			var parameters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

			_classCallCheck(this, LocalSidValueBlock);

			var _this27 = _possibleConstructorReturn(this, (LocalSidValueBlock.__proto__ || Object.getPrototypeOf(LocalSidValueBlock)).call(this, parameters));

			_this27.valueDec = getParametersValue(parameters, "valueDec", -1);
			_this27.isFirstSid = getParametersValue(parameters, "isFirstSid", false);
			return _this27;
		}
		//**********************************************************************************
		/**
   * Aux function, need to get a block name. Need to have it here for inhiritence
   * @returns {string}
   */


		_createClass(LocalSidValueBlock, [{
			key: 'fromBER',

			//**********************************************************************************
			/**
    * Base function for converting block from BER encoded array of bytes
    * @param {!ArrayBuffer} inputBuffer ASN.1 BER encoded array
    * @param {!number} inputOffset Offset in ASN.1 BER encoded array where decoding should be started
    * @param {!number} inputLength Maximum length of array of bytes which can be using in this function
    * @returns {number} Offset after least decoded byte
    */
			value: function fromBER(inputBuffer, inputOffset, inputLength) {
				if (inputLength === 0) return inputOffset;

				//region Basic check for parameters
				//noinspection JSCheckFunctionSignatures
				if (checkBufferParams(this, inputBuffer, inputOffset, inputLength) === false) return -1;
				//endregion

				var intBuffer = new Uint8Array(inputBuffer, inputOffset, inputLength);

				this.valueHex = new ArrayBuffer(inputLength);
				var view = new Uint8Array(this.valueHex);

				for (var i = 0; i < inputLength; i++) {
					view[i] = intBuffer[i] & 0x7F;

					this.blockLength++;

					if ((intBuffer[i] & 0x80) === 0x00) break;
				}

				//region Ajust size of valueHex buffer
				var tempValueHex = new ArrayBuffer(this.blockLength);
				var tempView = new Uint8Array(tempValueHex);

				for (var _i6 = 0; _i6 < this.blockLength; _i6++) {
					tempView[_i6] = view[_i6];
				} //noinspection JSCheckFunctionSignatures
				this.valueHex = tempValueHex.slice(0);
				view = new Uint8Array(this.valueHex);
				//endregion

				if ((intBuffer[this.blockLength - 1] & 0x80) !== 0x00) {
					this.error = "End of input reached before message was fully decoded";
					return -1;
				}

				if (view[0] === 0x00) this.warnings.push("Needlessly long format of SID encoding");

				if (this.blockLength <= 8) this.valueDec = utilFromBase(view, 7);else {
					this.isHexOnly = true;
					this.warnings.push("Too big SID for decoding, hex only");
				}

				return inputOffset + this.blockLength;
			}
			//**********************************************************************************
			/**
    * Encoding of current ASN.1 block into ASN.1 encoded array (BER rules)
    * @param {boolean} [sizeOnly=false] Flag that we need only a size of encoding, not a real array of bytes
    * @returns {ArrayBuffer}
    */

		}, {
			key: 'toBER',
			value: function toBER() {
				var sizeOnly = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

				//region Initial variables
				var retBuf = void 0;
				var retView = void 0;
				//endregion

				if (this.isHexOnly) {
					if (sizeOnly === true) return new ArrayBuffer(this.valueHex.byteLength);

					var curView = new Uint8Array(this.valueHex);

					retBuf = new ArrayBuffer(this.blockLength);
					retView = new Uint8Array(retBuf);

					for (var i = 0; i < this.blockLength - 1; i++) {
						retView[i] = curView[i] | 0x80;
					}retView[this.blockLength - 1] = curView[this.blockLength - 1];

					return retBuf;
				}

				var encodedBuf = utilToBase(this.valueDec, 7);
				if (encodedBuf.byteLength === 0) {
					this.error = "Error during encoding SID value";
					return new ArrayBuffer(0);
				}

				retBuf = new ArrayBuffer(encodedBuf.byteLength);

				if (sizeOnly === false) {
					var encodedView = new Uint8Array(encodedBuf);
					retView = new Uint8Array(retBuf);

					for (var _i7 = 0; _i7 < encodedBuf.byteLength - 1; _i7++) {
						retView[_i7] = encodedView[_i7] | 0x80;
					}retView[encodedBuf.byteLength - 1] = encodedView[encodedBuf.byteLength - 1];
				}

				return retBuf;
			}
			//**********************************************************************************
			/**
    * Create string representation of current SID block
    * @returns {string}
    */

		}, {
			key: 'toString',
			value: function toString() {
				var result = "";

				if (this.isHexOnly === true) result = bufferToHexCodes(this.valueHex, 0, this.valueHex.byteLength);else {
					if (this.isFirstSid) {
						var sidValue = this.valueDec;

						if (this.valueDec <= 39) result = "0.";else {
							if (this.valueDec <= 79) {
								result = "1.";
								sidValue -= 40;
							} else {
								result = "2.";
								sidValue -= 80;
							}
						}

						result = result + sidValue.toString();
					} else result = this.valueDec.toString();
				}

				return result;
			}
			//**********************************************************************************
			//noinspection JSUnusedGlobalSymbols
			/**
    * Convertion for the block to JSON object
    * @returns {Object}
    */

		}, {
			key: 'toJSON',
			value: function toJSON() {
				var object = {};

				//region Seems at the moment (Sep 2016) there is no way how to check method is supported in "super" object
				try {
					object = _get(LocalSidValueBlock.prototype.__proto__ || Object.getPrototypeOf(LocalSidValueBlock.prototype), 'toJSON', this).call(this);
				} catch (ex) {}
				//endregion

				object.valueDec = this.valueDec;
				object.isFirstSid = this.isFirstSid;

				return object;
			}
			//**********************************************************************************

		}], [{
			key: 'blockName',
			value: function blockName() {
				return "sidBlock";
			}
		}]);

		return LocalSidValueBlock;
	}(LocalHexBlock(LocalBaseBlock));
	//**************************************************************************************


	var LocalObjectIdentifierValueBlock = function (_LocalValueBlock5) {
		_inherits(LocalObjectIdentifierValueBlock, _LocalValueBlock5);

		//**********************************************************************************
		/**
   * Constructor for "LocalObjectIdentifierValueBlock" class
   * @param {Object} [parameters={}]
   * @property {ArrayBuffer} [valueHex]
   */
		function LocalObjectIdentifierValueBlock() {
			var parameters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

			_classCallCheck(this, LocalObjectIdentifierValueBlock);

			var _this28 = _possibleConstructorReturn(this, (LocalObjectIdentifierValueBlock.__proto__ || Object.getPrototypeOf(LocalObjectIdentifierValueBlock)).call(this, parameters));

			_this28.fromString(getParametersValue(parameters, "value", ""));
			return _this28;
		}
		//**********************************************************************************
		/**
   * Base function for converting block from BER encoded array of bytes
   * @param {!ArrayBuffer} inputBuffer ASN.1 BER encoded array
   * @param {!number} inputOffset Offset in ASN.1 BER encoded array where decoding should be started
   * @param {!number} inputLength Maximum length of array of bytes which can be using in this function
   * @returns {number} Offset after least decoded byte
   */


		_createClass(LocalObjectIdentifierValueBlock, [{
			key: 'fromBER',
			value: function fromBER(inputBuffer, inputOffset, inputLength) {
				var resultOffset = inputOffset;

				while (inputLength > 0) {
					var sidBlock = new LocalSidValueBlock();
					resultOffset = sidBlock.fromBER(inputBuffer, resultOffset, inputLength);
					if (resultOffset === -1) {
						this.blockLength = 0;
						this.error = sidBlock.error;
						return resultOffset;
					}

					if (this.value.length === 0) sidBlock.isFirstSid = true;

					this.blockLength += sidBlock.blockLength;
					inputLength -= sidBlock.blockLength;

					this.value.push(sidBlock);
				}

				return resultOffset;
			}
			//**********************************************************************************
			/**
    * Encoding of current ASN.1 block into ASN.1 encoded array (BER rules)
    * @param {boolean} [sizeOnly=false] Flag that we need only a size of encoding, not a real array of bytes
    * @returns {ArrayBuffer}
    */

		}, {
			key: 'toBER',
			value: function toBER() {
				var sizeOnly = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

				var retBuf = new ArrayBuffer(0);

				for (var i = 0; i < this.value.length; i++) {
					var valueBuf = this.value[i].toBER(sizeOnly);
					if (valueBuf.byteLength === 0) {
						this.error = this.value[i].error;
						return new ArrayBuffer(0);
					}

					retBuf = utilConcatBuf(retBuf, valueBuf);
				}

				return retBuf;
			}
			//**********************************************************************************
			/**
    * Create "LocalObjectIdentifierValueBlock" class from string
    * @param {string} string Input string to convert from
    * @returns {boolean}
    */

		}, {
			key: 'fromString',
			value: function fromString(string) {
				this.value = []; // Clear existing SID values

				var pos1 = 0;
				var pos2 = 0;

				var sid = "";

				var flag = false;

				do {
					pos2 = string.indexOf(".", pos1);
					if (pos2 === -1) sid = string.substr(pos1);else sid = string.substr(pos1, pos2 - pos1);

					pos1 = pos2 + 1;

					if (flag) {
						var sidBlock = this.value[0];

						var plus = 0;

						switch (sidBlock.valueDec) {
							case 0:
								break;
							case 1:
								plus = 40;
								break;
							case 2:
								plus = 80;
								break;
							default:
								this.value = []; // clear SID array
								return false; // ???
						}

						var parsedSID = parseInt(sid, 10);
						if (isNaN(parsedSID)) return true;

						sidBlock.valueDec = parsedSID + plus;

						flag = false;
					} else {
						var _sidBlock = new LocalSidValueBlock();
						_sidBlock.valueDec = parseInt(sid, 10);
						if (isNaN(_sidBlock.valueDec)) return true;

						if (this.value.length === 0) {
							_sidBlock.isFirstSid = true;
							flag = true;
						}

						this.value.push(_sidBlock);
					}
				} while (pos2 !== -1);

				return true;
			}
			//**********************************************************************************
			/**
    * Converts "LocalObjectIdentifierValueBlock" class to string
    * @returns {string}
    */

		}, {
			key: 'toString',
			value: function toString() {
				var result = "";
				var isHexOnly = false;

				for (var i = 0; i < this.value.length; i++) {
					isHexOnly = this.value[i].isHexOnly;

					var sidStr = this.value[i].toString();

					if (i !== 0) result = result + '.';

					if (isHexOnly) {
						sidStr = '{' + sidStr + '}';

						if (this.value[i].isFirstSid) result = '2.{' + sidStr + ' - 80}';else result = result + sidStr;
					} else result = result + sidStr;
				}

				return result;
			}
			//**********************************************************************************
			/**
    * Aux function, need to get a block name. Need to have it here for inhiritence
    * @returns {string}
    */

		}, {
			key: 'toJSON',

			//**********************************************************************************
			/**
    * Convertion for the block to JSON object
    * @returns {Object}
    */
			value: function toJSON() {
				var object = {};

				//region Seems at the moment (Sep 2016) there is no way how to check method is supported in "super" object
				try {
					object = _get(LocalObjectIdentifierValueBlock.prototype.__proto__ || Object.getPrototypeOf(LocalObjectIdentifierValueBlock.prototype), 'toJSON', this).call(this);
				} catch (ex) {}
				//endregion

				object.value = this.toString();
				object.sidArray = [];
				for (var i = 0; i < this.value.length; i++) {
					object.sidArray.push(this.value[i].toJSON());
				}return object;
			}
			//**********************************************************************************

		}], [{
			key: 'blockName',
			value: function blockName() {
				return "ObjectIdentifierValueBlock";
			}
		}]);

		return LocalObjectIdentifierValueBlock;
	}(LocalValueBlock);
	//**************************************************************************************
	/**
  * @extends BaseBlock
  */


	var ObjectIdentifier$1 = function (_BaseBlock9) {
		_inherits(ObjectIdentifier$1, _BaseBlock9);

		//**********************************************************************************
		/**
   * Constructor for "ObjectIdentifier" class
   * @param {Object} [parameters={}]
   * @property {ArrayBuffer} [valueHex]
   */
		function ObjectIdentifier$1() {
			var parameters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

			_classCallCheck(this, ObjectIdentifier$1);

			var _this29 = _possibleConstructorReturn(this, (ObjectIdentifier$1.__proto__ || Object.getPrototypeOf(ObjectIdentifier$1)).call(this, parameters, LocalObjectIdentifierValueBlock));

			_this29.idBlock.tagClass = 1; // UNIVERSAL
			_this29.idBlock.tagNumber = 6; // OBJECT IDENTIFIER
			return _this29;
		}
		//**********************************************************************************
		/**
   * Aux function, need to get a block name. Need to have it here for inhiritence
   * @returns {string}
   */


		_createClass(ObjectIdentifier$1, null, [{
			key: 'blockName',
			value: function blockName() {
				return "ObjectIdentifier";
			}
			//**********************************************************************************

		}]);

		return ObjectIdentifier$1;
	}(BaseBlock);
	//**************************************************************************************
	//endregion
	//**************************************************************************************
	//region Declaration of all string's classes
	//**************************************************************************************


	var LocalUtf8StringValueBlock = function (_LocalHexBlock6) {
		_inherits(LocalUtf8StringValueBlock, _LocalHexBlock6);

		//**********************************************************************************
		//noinspection JSUnusedGlobalSymbols
		/**
   * Constructor for "LocalUtf8StringValueBlock" class
   * @param {Object} [parameters={}]
   */
		function LocalUtf8StringValueBlock() {
			var parameters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

			_classCallCheck(this, LocalUtf8StringValueBlock);

			var _this30 = _possibleConstructorReturn(this, (LocalUtf8StringValueBlock.__proto__ || Object.getPrototypeOf(LocalUtf8StringValueBlock)).call(this, parameters));

			_this30.isHexOnly = true;
			_this30.value = ""; // String representation of decoded ArrayBuffer
			return _this30;
		}
		//**********************************************************************************
		/**
   * Aux function, need to get a block name. Need to have it here for inhiritence
   * @returns {string}
   */


		_createClass(LocalUtf8StringValueBlock, [{
			key: 'toJSON',

			//**********************************************************************************
			//noinspection JSUnusedGlobalSymbols
			/**
    * Convertion for the block to JSON object
    * @returns {Object}
    */
			value: function toJSON() {
				var object = {};

				//region Seems at the moment (Sep 2016) there is no way how to check method is supported in "super" object
				try {
					object = _get(LocalUtf8StringValueBlock.prototype.__proto__ || Object.getPrototypeOf(LocalUtf8StringValueBlock.prototype), 'toJSON', this).call(this);
				} catch (ex) {}
				//endregion

				object.value = this.value;

				return object;
			}
			//**********************************************************************************

		}], [{
			key: 'blockName',
			value: function blockName() {
				return "Utf8StringValueBlock";
			}
		}]);

		return LocalUtf8StringValueBlock;
	}(LocalHexBlock(LocalBaseBlock));
	//**************************************************************************************
	/**
  * @extends BaseBlock
  */


	var Utf8String = function (_BaseBlock10) {
		_inherits(Utf8String, _BaseBlock10);

		//**********************************************************************************
		/**
   * Constructor for "Utf8String" class
   * @param {Object} [parameters={}]
   * @property {ArrayBuffer} [valueHex]
   */
		function Utf8String() {
			var parameters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

			_classCallCheck(this, Utf8String);

			var _this31 = _possibleConstructorReturn(this, (Utf8String.__proto__ || Object.getPrototypeOf(Utf8String)).call(this, parameters, LocalUtf8StringValueBlock));

			if ("value" in parameters) _this31.fromString(parameters.value);

			_this31.idBlock.tagClass = 1; // UNIVERSAL
			_this31.idBlock.tagNumber = 12; // Utf8String
			return _this31;
		}
		//**********************************************************************************
		/**
   * Aux function, need to get a block name. Need to have it here for inhiritence
   * @returns {string}
   */


		_createClass(Utf8String, [{
			key: 'fromBER',

			//**********************************************************************************
			/**
    * Base function for converting block from BER encoded array of bytes
    * @param {!ArrayBuffer} inputBuffer ASN.1 BER encoded array
    * @param {!number} inputOffset Offset in ASN.1 BER encoded array where decoding should be started
    * @param {!number} inputLength Maximum length of array of bytes which can be using in this function
    * @returns {number} Offset after least decoded byte
    */
			value: function fromBER(inputBuffer, inputOffset, inputLength) {
				var resultOffset = this.valueBlock.fromBER(inputBuffer, inputOffset, this.lenBlock.isIndefiniteForm === true ? inputLength : this.lenBlock.length);
				if (resultOffset === -1) {
					this.error = this.valueBlock.error;
					return resultOffset;
				}

				this.fromBuffer(this.valueBlock.valueHex);

				if (this.idBlock.error.length === 0) this.blockLength += this.idBlock.blockLength;

				if (this.lenBlock.error.length === 0) this.blockLength += this.lenBlock.blockLength;

				if (this.valueBlock.error.length === 0) this.blockLength += this.valueBlock.blockLength;

				return resultOffset;
			}
			//**********************************************************************************
			/**
    * Function converting ArrayBuffer into ASN.1 internal string
    * @param {!ArrayBuffer} inputBuffer ASN.1 BER encoded array
    */

		}, {
			key: 'fromBuffer',
			value: function fromBuffer(inputBuffer) {
				this.valueBlock.value = String.fromCharCode.apply(null, new Uint8Array(inputBuffer));

				try {
					//noinspection JSDeprecatedSymbols
					this.valueBlock.value = decodeURIComponent(escape(this.valueBlock.value));
				} catch (ex) {
					this.warnings.push('Error during "decodeURIComponent": ' + ex + ', using raw string');
				}
			}
			//**********************************************************************************
			/**
    * Function converting JavaScript string into ASN.1 internal class
    * @param {!string} inputString ASN.1 BER encoded array
    */

		}, {
			key: 'fromString',
			value: function fromString(inputString) {
				//noinspection JSDeprecatedSymbols
				var str = unescape(encodeURIComponent(inputString));
				var strLen = str.length;

				this.valueBlock.valueHex = new ArrayBuffer(strLen);
				var view = new Uint8Array(this.valueBlock.valueHex);

				for (var i = 0; i < strLen; i++) {
					view[i] = str.charCodeAt(i);
				}this.valueBlock.value = inputString;
			}
			//**********************************************************************************

		}], [{
			key: 'blockName',
			value: function blockName() {
				return "Utf8String";
			}
		}]);

		return Utf8String;
	}(BaseBlock);
	//**************************************************************************************
	/**
  * @extends LocalBaseBlock
  * @extends LocalHexBlock
  */


	var LocalBmpStringValueBlock = function (_LocalHexBlock7) {
		_inherits(LocalBmpStringValueBlock, _LocalHexBlock7);

		//**********************************************************************************
		/**
   * Constructor for "LocalBmpStringValueBlock" class
   * @param {Object} [parameters={}]
   */
		function LocalBmpStringValueBlock() {
			var parameters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

			_classCallCheck(this, LocalBmpStringValueBlock);

			var _this32 = _possibleConstructorReturn(this, (LocalBmpStringValueBlock.__proto__ || Object.getPrototypeOf(LocalBmpStringValueBlock)).call(this, parameters));

			_this32.isHexOnly = true;
			_this32.value = "";
			return _this32;
		}
		//**********************************************************************************
		/**
   * Aux function, need to get a block name. Need to have it here for inhiritence
   * @returns {string}
   */


		_createClass(LocalBmpStringValueBlock, [{
			key: 'toJSON',

			//**********************************************************************************
			//noinspection JSUnusedGlobalSymbols
			/**
    * Convertion for the block to JSON object
    * @returns {Object}
    */
			value: function toJSON() {
				var object = {};

				//region Seems at the moment (Sep 2016) there is no way how to check method is supported in "super" object
				try {
					object = _get(LocalBmpStringValueBlock.prototype.__proto__ || Object.getPrototypeOf(LocalBmpStringValueBlock.prototype), 'toJSON', this).call(this);
				} catch (ex) {}
				//endregion

				object.value = this.value;

				return object;
			}
			//**********************************************************************************

		}], [{
			key: 'blockName',
			value: function blockName() {
				return "BmpStringValueBlock";
			}
		}]);

		return LocalBmpStringValueBlock;
	}(LocalHexBlock(LocalBaseBlock));
	//**************************************************************************************
	/**
  * @extends BaseBlock
  */


	var BmpString = function (_BaseBlock11) {
		_inherits(BmpString, _BaseBlock11);

		//**********************************************************************************
		/**
   * Constructor for "BmpString" class
   * @param {Object} [parameters={}]
   */
		function BmpString() {
			var parameters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

			_classCallCheck(this, BmpString);

			var _this33 = _possibleConstructorReturn(this, (BmpString.__proto__ || Object.getPrototypeOf(BmpString)).call(this, parameters, LocalBmpStringValueBlock));

			if ("value" in parameters) _this33.fromString(parameters.value);

			_this33.idBlock.tagClass = 1; // UNIVERSAL
			_this33.idBlock.tagNumber = 30; // BmpString
			return _this33;
		}
		//**********************************************************************************
		/**
   * Aux function, need to get a block name. Need to have it here for inhiritence
   * @returns {string}
   */


		_createClass(BmpString, [{
			key: 'fromBER',

			//**********************************************************************************
			/**
    * Base function for converting block from BER encoded array of bytes
    * @param {!ArrayBuffer} inputBuffer ASN.1 BER encoded array
    * @param {!number} inputOffset Offset in ASN.1 BER encoded array where decoding should be started
    * @param {!number} inputLength Maximum length of array of bytes which can be using in this function
    * @returns {number} Offset after least decoded byte
    */
			value: function fromBER(inputBuffer, inputOffset, inputLength) {
				var resultOffset = this.valueBlock.fromBER(inputBuffer, inputOffset, this.lenBlock.isIndefiniteForm === true ? inputLength : this.lenBlock.length);
				if (resultOffset === -1) {
					this.error = this.valueBlock.error;
					return resultOffset;
				}

				this.fromBuffer(this.valueBlock.valueHex);

				if (this.idBlock.error.length === 0) this.blockLength += this.idBlock.blockLength;

				if (this.lenBlock.error.length === 0) this.blockLength += this.lenBlock.blockLength;

				if (this.valueBlock.error.length === 0) this.blockLength += this.valueBlock.blockLength;

				return resultOffset;
			}
			//**********************************************************************************
			/**
    * Function converting ArrayBuffer into ASN.1 internal string
    * @param {!ArrayBuffer} inputBuffer ASN.1 BER encoded array
    */

		}, {
			key: 'fromBuffer',
			value: function fromBuffer(inputBuffer) {
				//noinspection JSCheckFunctionSignatures
				var copyBuffer = inputBuffer.slice(0);
				var valueView = new Uint8Array(copyBuffer);

				for (var i = 0; i < valueView.length; i = i + 2) {
					var temp = valueView[i];

					valueView[i] = valueView[i + 1];
					valueView[i + 1] = temp;
				}

				this.valueBlock.value = String.fromCharCode.apply(null, new Uint16Array(copyBuffer));
			}
			//**********************************************************************************
			/**
    * Function converting JavaScript string into ASN.1 internal class
    * @param {!string} inputString ASN.1 BER encoded array
    */

		}, {
			key: 'fromString',
			value: function fromString(inputString) {
				var strLength = inputString.length;

				this.valueBlock.valueHex = new ArrayBuffer(strLength * 2);
				var valueHexView = new Uint8Array(this.valueBlock.valueHex);

				for (var i = 0; i < strLength; i++) {
					var codeBuf = utilToBase(inputString.charCodeAt(i), 8);
					var codeView = new Uint8Array(codeBuf);
					if (codeView.length > 2) continue;

					var dif = 2 - codeView.length;

					for (var j = codeView.length - 1; j >= 0; j--) {
						valueHexView[i * 2 + j + dif] = codeView[j];
					}
				}

				this.valueBlock.value = inputString;
			}
			//**********************************************************************************

		}], [{
			key: 'blockName',
			value: function blockName() {
				return "BmpString";
			}
		}]);

		return BmpString;
	}(BaseBlock);
	//**************************************************************************************


	var LocalUniversalStringValueBlock = function (_LocalHexBlock8) {
		_inherits(LocalUniversalStringValueBlock, _LocalHexBlock8);

		//**********************************************************************************
		/**
   * Constructor for "LocalUniversalStringValueBlock" class
   * @param {Object} [parameters={}]
   */
		function LocalUniversalStringValueBlock() {
			var parameters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

			_classCallCheck(this, LocalUniversalStringValueBlock);

			var _this34 = _possibleConstructorReturn(this, (LocalUniversalStringValueBlock.__proto__ || Object.getPrototypeOf(LocalUniversalStringValueBlock)).call(this, parameters));

			_this34.isHexOnly = true;
			_this34.value = "";
			return _this34;
		}
		//**********************************************************************************
		/**
   * Aux function, need to get a block name. Need to have it here for inhiritence
   * @returns {string}
   */


		_createClass(LocalUniversalStringValueBlock, [{
			key: 'toJSON',

			//**********************************************************************************
			//noinspection JSUnusedGlobalSymbols
			/**
    * Convertion for the block to JSON object
    * @returns {Object}
    */
			value: function toJSON() {
				var object = {};

				//region Seems at the moment (Sep 2016) there is no way how to check method is supported in "super" object
				try {
					object = _get(LocalUniversalStringValueBlock.prototype.__proto__ || Object.getPrototypeOf(LocalUniversalStringValueBlock.prototype), 'toJSON', this).call(this);
				} catch (ex) {}
				//endregion

				object.value = this.value;

				return object;
			}
			//**********************************************************************************

		}], [{
			key: 'blockName',
			value: function blockName() {
				return "UniversalStringValueBlock";
			}
		}]);

		return LocalUniversalStringValueBlock;
	}(LocalHexBlock(LocalBaseBlock));
	//**************************************************************************************
	/**
  * @extends BaseBlock
  */


	var UniversalString = function (_BaseBlock12) {
		_inherits(UniversalString, _BaseBlock12);

		//**********************************************************************************
		/**
   * Constructor for "UniversalString" class
   * @param {Object} [parameters={}]
   */
		function UniversalString() {
			var parameters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

			_classCallCheck(this, UniversalString);

			var _this35 = _possibleConstructorReturn(this, (UniversalString.__proto__ || Object.getPrototypeOf(UniversalString)).call(this, parameters, LocalUniversalStringValueBlock));

			if ("value" in parameters) _this35.fromString(parameters.value);

			_this35.idBlock.tagClass = 1; // UNIVERSAL
			_this35.idBlock.tagNumber = 28; // UniversalString
			return _this35;
		}
		//**********************************************************************************
		/**
   * Aux function, need to get a block name. Need to have it here for inhiritence
   * @returns {string}
   */


		_createClass(UniversalString, [{
			key: 'fromBER',

			//**********************************************************************************
			/**
    * Base function for converting block from BER encoded array of bytes
    * @param {!ArrayBuffer} inputBuffer ASN.1 BER encoded array
    * @param {!number} inputOffset Offset in ASN.1 BER encoded array where decoding should be started
    * @param {!number} inputLength Maximum length of array of bytes which can be using in this function
    * @returns {number} Offset after least decoded byte
    */
			value: function fromBER(inputBuffer, inputOffset, inputLength) {
				var resultOffset = this.valueBlock.fromBER(inputBuffer, inputOffset, this.lenBlock.isIndefiniteForm === true ? inputLength : this.lenBlock.length);
				if (resultOffset === -1) {
					this.error = this.valueBlock.error;
					return resultOffset;
				}

				this.fromBuffer(this.valueBlock.valueHex);

				if (this.idBlock.error.length === 0) this.blockLength += this.idBlock.blockLength;

				if (this.lenBlock.error.length === 0) this.blockLength += this.lenBlock.blockLength;

				if (this.valueBlock.error.length === 0) this.blockLength += this.valueBlock.blockLength;

				return resultOffset;
			}
			//**********************************************************************************
			/**
    * Function converting ArrayBuffer into ASN.1 internal string
    * @param {!ArrayBuffer} inputBuffer ASN.1 BER encoded array
    */

		}, {
			key: 'fromBuffer',
			value: function fromBuffer(inputBuffer) {
				//noinspection JSCheckFunctionSignatures
				var copyBuffer = inputBuffer.slice(0);
				var valueView = new Uint8Array(copyBuffer);

				for (var i = 0; i < valueView.length; i = i + 4) {
					valueView[i] = valueView[i + 3];
					valueView[i + 1] = valueView[i + 2];
					valueView[i + 2] = 0x00;
					valueView[i + 3] = 0x00;
				}

				this.valueBlock.value = String.fromCharCode.apply(null, new Uint32Array(copyBuffer));
			}
			//**********************************************************************************
			/**
    * Function converting JavaScript string into ASN.1 internal class
    * @param {!string} inputString ASN.1 BER encoded array
    */

		}, {
			key: 'fromString',
			value: function fromString(inputString) {
				var strLength = inputString.length;

				this.valueBlock.valueHex = new ArrayBuffer(strLength * 4);
				var valueHexView = new Uint8Array(this.valueBlock.valueHex);

				for (var i = 0; i < strLength; i++) {
					var codeBuf = utilToBase(inputString.charCodeAt(i), 8);
					var codeView = new Uint8Array(codeBuf);
					if (codeView.length > 4) continue;

					var dif = 4 - codeView.length;

					for (var j = codeView.length - 1; j >= 0; j--) {
						valueHexView[i * 4 + j + dif] = codeView[j];
					}
				}

				this.valueBlock.value = inputString;
			}
			//**********************************************************************************

		}], [{
			key: 'blockName',
			value: function blockName() {
				return "UniversalString";
			}
		}]);

		return UniversalString;
	}(BaseBlock);
	//**************************************************************************************


	var LocalSimpleStringValueBlock = function (_LocalHexBlock9) {
		_inherits(LocalSimpleStringValueBlock, _LocalHexBlock9);

		//**********************************************************************************
		/**
   * Constructor for "LocalSimpleStringValueBlock" class
   * @param {Object} [parameters={}]
   */
		function LocalSimpleStringValueBlock() {
			var parameters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

			_classCallCheck(this, LocalSimpleStringValueBlock);

			var _this36 = _possibleConstructorReturn(this, (LocalSimpleStringValueBlock.__proto__ || Object.getPrototypeOf(LocalSimpleStringValueBlock)).call(this, parameters));

			_this36.value = "";
			_this36.isHexOnly = true;
			return _this36;
		}
		//**********************************************************************************
		/**
   * Aux function, need to get a block name. Need to have it here for inhiritence
   * @returns {string}
   */


		_createClass(LocalSimpleStringValueBlock, [{
			key: 'toJSON',

			//**********************************************************************************
			//noinspection JSUnusedGlobalSymbols
			/**
    * Convertion for the block to JSON object
    * @returns {Object}
    */
			value: function toJSON() {
				var object = {};

				//region Seems at the moment (Sep 2016) there is no way how to check method is supported in "super" object
				try {
					object = _get(LocalSimpleStringValueBlock.prototype.__proto__ || Object.getPrototypeOf(LocalSimpleStringValueBlock.prototype), 'toJSON', this).call(this);
				} catch (ex) {}
				//endregion

				object.value = this.value;

				return object;
			}
			//**********************************************************************************

		}], [{
			key: 'blockName',
			value: function blockName() {
				return "SimpleStringValueBlock";
			}
		}]);

		return LocalSimpleStringValueBlock;
	}(LocalHexBlock(LocalBaseBlock));
	//**************************************************************************************
	/**
  * @extends BaseBlock
  */


	var LocalSimpleStringBlock = function (_BaseBlock13) {
		_inherits(LocalSimpleStringBlock, _BaseBlock13);

		//**********************************************************************************
		/**
   * Constructor for "LocalSimpleStringBlock" class
   * @param {Object} [parameters={}]
   */
		function LocalSimpleStringBlock() {
			var parameters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

			_classCallCheck(this, LocalSimpleStringBlock);

			var _this37 = _possibleConstructorReturn(this, (LocalSimpleStringBlock.__proto__ || Object.getPrototypeOf(LocalSimpleStringBlock)).call(this, parameters, LocalSimpleStringValueBlock));

			if ("value" in parameters) _this37.fromString(parameters.value);
			return _this37;
		}
		//**********************************************************************************
		/**
   * Aux function, need to get a block name. Need to have it here for inhiritence
   * @returns {string}
   */


		_createClass(LocalSimpleStringBlock, [{
			key: 'fromBER',

			//**********************************************************************************
			/**
    * Base function for converting block from BER encoded array of bytes
    * @param {!ArrayBuffer} inputBuffer ASN.1 BER encoded array
    * @param {!number} inputOffset Offset in ASN.1 BER encoded array where decoding should be started
    * @param {!number} inputLength Maximum length of array of bytes which can be using in this function
    * @returns {number} Offset after least decoded byte
    */
			value: function fromBER(inputBuffer, inputOffset, inputLength) {
				var resultOffset = this.valueBlock.fromBER(inputBuffer, inputOffset, this.lenBlock.isIndefiniteForm === true ? inputLength : this.lenBlock.length);
				if (resultOffset === -1) {
					this.error = this.valueBlock.error;
					return resultOffset;
				}

				this.fromBuffer(this.valueBlock.valueHex);

				if (this.idBlock.error.length === 0) this.blockLength += this.idBlock.blockLength;

				if (this.lenBlock.error.length === 0) this.blockLength += this.lenBlock.blockLength;

				if (this.valueBlock.error.length === 0) this.blockLength += this.valueBlock.blockLength;

				return resultOffset;
			}
			//**********************************************************************************
			/**
    * Function converting ArrayBuffer into ASN.1 internal string
    * @param {!ArrayBuffer} inputBuffer ASN.1 BER encoded array
    */

		}, {
			key: 'fromBuffer',
			value: function fromBuffer(inputBuffer) {
				this.valueBlock.value = String.fromCharCode.apply(null, new Uint8Array(inputBuffer));
			}
			//**********************************************************************************
			/**
    * Function converting JavaScript string into ASN.1 internal class
    * @param {!string} inputString ASN.1 BER encoded array
    */

		}, {
			key: 'fromString',
			value: function fromString(inputString) {
				var strLen = inputString.length;

				this.valueBlock.valueHex = new ArrayBuffer(strLen);
				var view = new Uint8Array(this.valueBlock.valueHex);

				for (var i = 0; i < strLen; i++) {
					view[i] = inputString.charCodeAt(i);
				}this.valueBlock.value = inputString;
			}
			//**********************************************************************************

		}], [{
			key: 'blockName',
			value: function blockName() {
				return "SIMPLESTRING";
			}
		}]);

		return LocalSimpleStringBlock;
	}(BaseBlock);
	//**************************************************************************************
	/**
  * @extends LocalSimpleStringBlock
  */


	var NumericString = function (_LocalSimpleStringBlo) {
		_inherits(NumericString, _LocalSimpleStringBlo);

		//**********************************************************************************
		/**
   * Constructor for "NumericString" class
   * @param {Object} [parameters={}]
   */
		function NumericString() {
			var parameters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

			_classCallCheck(this, NumericString);

			var _this38 = _possibleConstructorReturn(this, (NumericString.__proto__ || Object.getPrototypeOf(NumericString)).call(this, parameters));

			_this38.idBlock.tagClass = 1; // UNIVERSAL
			_this38.idBlock.tagNumber = 18; // NumericString
			return _this38;
		}
		//**********************************************************************************
		/**
   * Aux function, need to get a block name. Need to have it here for inhiritence
   * @returns {string}
   */


		_createClass(NumericString, null, [{
			key: 'blockName',
			value: function blockName() {
				return "NumericString";
			}
			//**********************************************************************************

		}]);

		return NumericString;
	}(LocalSimpleStringBlock);
	//**************************************************************************************
	/**
  * @extends LocalSimpleStringBlock
  */


	var PrintableString = function (_LocalSimpleStringBlo2) {
		_inherits(PrintableString, _LocalSimpleStringBlo2);

		//**********************************************************************************
		/**
   * Constructor for "PrintableString" class
   * @param {Object} [parameters={}]
   */
		function PrintableString() {
			var parameters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

			_classCallCheck(this, PrintableString);

			var _this39 = _possibleConstructorReturn(this, (PrintableString.__proto__ || Object.getPrototypeOf(PrintableString)).call(this, parameters));

			_this39.idBlock.tagClass = 1; // UNIVERSAL
			_this39.idBlock.tagNumber = 19; // PrintableString
			return _this39;
		}
		//**********************************************************************************
		/**
   * Aux function, need to get a block name. Need to have it here for inhiritence
   * @returns {string}
   */


		_createClass(PrintableString, null, [{
			key: 'blockName',
			value: function blockName() {
				return "PrintableString";
			}
			//**********************************************************************************

		}]);

		return PrintableString;
	}(LocalSimpleStringBlock);
	//**************************************************************************************
	/**
  * @extends LocalSimpleStringBlock
  */


	var TeletexString = function (_LocalSimpleStringBlo3) {
		_inherits(TeletexString, _LocalSimpleStringBlo3);

		//**********************************************************************************
		/**
   * Constructor for "TeletexString" class
   * @param {Object} [parameters={}]
   */
		function TeletexString() {
			var parameters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

			_classCallCheck(this, TeletexString);

			var _this40 = _possibleConstructorReturn(this, (TeletexString.__proto__ || Object.getPrototypeOf(TeletexString)).call(this, parameters));

			_this40.idBlock.tagClass = 1; // UNIVERSAL
			_this40.idBlock.tagNumber = 20; // TeletexString
			return _this40;
		}
		//**********************************************************************************
		/**
   * Aux function, need to get a block name. Need to have it here for inhiritence
   * @returns {string}
   */


		_createClass(TeletexString, null, [{
			key: 'blockName',
			value: function blockName() {
				return "TeletexString";
			}
			//**********************************************************************************

		}]);

		return TeletexString;
	}(LocalSimpleStringBlock);
	//**************************************************************************************
	/**
  * @extends LocalSimpleStringBlock
  */


	var VideotexString = function (_LocalSimpleStringBlo4) {
		_inherits(VideotexString, _LocalSimpleStringBlo4);

		//**********************************************************************************
		/**
   * Constructor for "VideotexString" class
   * @param {Object} [parameters={}]
   */
		function VideotexString() {
			var parameters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

			_classCallCheck(this, VideotexString);

			var _this41 = _possibleConstructorReturn(this, (VideotexString.__proto__ || Object.getPrototypeOf(VideotexString)).call(this, parameters));

			_this41.idBlock.tagClass = 1; // UNIVERSAL
			_this41.idBlock.tagNumber = 21; // VideotexString
			return _this41;
		}
		//**********************************************************************************
		/**
   * Aux function, need to get a block name. Need to have it here for inhiritence
   * @returns {string}
   */


		_createClass(VideotexString, null, [{
			key: 'blockName',
			value: function blockName() {
				return "VideotexString";
			}
			//**********************************************************************************

		}]);

		return VideotexString;
	}(LocalSimpleStringBlock);
	//**************************************************************************************
	/**
  * @extends LocalSimpleStringBlock
  */


	var IA5String = function (_LocalSimpleStringBlo5) {
		_inherits(IA5String, _LocalSimpleStringBlo5);

		//**********************************************************************************
		/**
   * Constructor for "IA5String" class
   * @param {Object} [parameters={}]
   */
		function IA5String() {
			var parameters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

			_classCallCheck(this, IA5String);

			var _this42 = _possibleConstructorReturn(this, (IA5String.__proto__ || Object.getPrototypeOf(IA5String)).call(this, parameters));

			_this42.idBlock.tagClass = 1; // UNIVERSAL
			_this42.idBlock.tagNumber = 22; // IA5String
			return _this42;
		}
		//**********************************************************************************
		/**
   * Aux function, need to get a block name. Need to have it here for inhiritence
   * @returns {string}
   */


		_createClass(IA5String, null, [{
			key: 'blockName',
			value: function blockName() {
				return "IA5String";
			}
			//**********************************************************************************

		}]);

		return IA5String;
	}(LocalSimpleStringBlock);
	//**************************************************************************************
	/**
  * @extends LocalSimpleStringBlock
  */


	var GraphicString = function (_LocalSimpleStringBlo6) {
		_inherits(GraphicString, _LocalSimpleStringBlo6);

		//**********************************************************************************
		/**
   * Constructor for "GraphicString" class
   * @param {Object} [parameters={}]
   */
		function GraphicString() {
			var parameters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

			_classCallCheck(this, GraphicString);

			var _this43 = _possibleConstructorReturn(this, (GraphicString.__proto__ || Object.getPrototypeOf(GraphicString)).call(this, parameters));

			_this43.idBlock.tagClass = 1; // UNIVERSAL
			_this43.idBlock.tagNumber = 25; // GraphicString
			return _this43;
		}
		//**********************************************************************************
		/**
   * Aux function, need to get a block name. Need to have it here for inhiritence
   * @returns {string}
   */


		_createClass(GraphicString, null, [{
			key: 'blockName',
			value: function blockName() {
				return "GraphicString";
			}
			//**********************************************************************************

		}]);

		return GraphicString;
	}(LocalSimpleStringBlock);
	//**************************************************************************************
	/**
  * @extends LocalSimpleStringBlock
  */


	var VisibleString = function (_LocalSimpleStringBlo7) {
		_inherits(VisibleString, _LocalSimpleStringBlo7);

		//**********************************************************************************
		/**
   * Constructor for "VisibleString" class
   * @param {Object} [parameters={}]
   */
		function VisibleString() {
			var parameters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

			_classCallCheck(this, VisibleString);

			var _this44 = _possibleConstructorReturn(this, (VisibleString.__proto__ || Object.getPrototypeOf(VisibleString)).call(this, parameters));

			_this44.idBlock.tagClass = 1; // UNIVERSAL
			_this44.idBlock.tagNumber = 26; // VisibleString
			return _this44;
		}
		//**********************************************************************************
		/**
   * Aux function, need to get a block name. Need to have it here for inhiritence
   * @returns {string}
   */


		_createClass(VisibleString, null, [{
			key: 'blockName',
			value: function blockName() {
				return "VisibleString";
			}
			//**********************************************************************************

		}]);

		return VisibleString;
	}(LocalSimpleStringBlock);
	//**************************************************************************************
	/**
  * @extends LocalSimpleStringBlock
  */


	var GeneralString = function (_LocalSimpleStringBlo8) {
		_inherits(GeneralString, _LocalSimpleStringBlo8);

		//**********************************************************************************
		/**
   * Constructor for "GeneralString" class
   * @param {Object} [parameters={}]
   */
		function GeneralString() {
			var parameters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

			_classCallCheck(this, GeneralString);

			var _this45 = _possibleConstructorReturn(this, (GeneralString.__proto__ || Object.getPrototypeOf(GeneralString)).call(this, parameters));

			_this45.idBlock.tagClass = 1; // UNIVERSAL
			_this45.idBlock.tagNumber = 27; // GeneralString
			return _this45;
		}
		//**********************************************************************************
		/**
   * Aux function, need to get a block name. Need to have it here for inhiritence
   * @returns {string}
   */


		_createClass(GeneralString, null, [{
			key: 'blockName',
			value: function blockName() {
				return "GeneralString";
			}
			//**********************************************************************************

		}]);

		return GeneralString;
	}(LocalSimpleStringBlock);
	//**************************************************************************************
	/**
  * @extends LocalSimpleStringBlock
  */


	var CharacterString = function (_LocalSimpleStringBlo9) {
		_inherits(CharacterString, _LocalSimpleStringBlo9);

		//**********************************************************************************
		/**
   * Constructor for "CharacterString" class
   * @param {Object} [parameters={}]
   */
		function CharacterString() {
			var parameters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

			_classCallCheck(this, CharacterString);

			var _this46 = _possibleConstructorReturn(this, (CharacterString.__proto__ || Object.getPrototypeOf(CharacterString)).call(this, parameters));

			_this46.idBlock.tagClass = 1; // UNIVERSAL
			_this46.idBlock.tagNumber = 29; // CharacterString
			return _this46;
		}
		//**********************************************************************************
		/**
   * Aux function, need to get a block name. Need to have it here for inhiritence
   * @returns {string}
   */


		_createClass(CharacterString, null, [{
			key: 'blockName',
			value: function blockName() {
				return "CharacterString";
			}
			//**********************************************************************************

		}]);

		return CharacterString;
	}(LocalSimpleStringBlock);
	//**************************************************************************************
	//endregion
	//**************************************************************************************
	//region Declaration of all date and time classes
	//**************************************************************************************
	/**
  * @extends VisibleString
  */


	var UTCTime = function (_VisibleString) {
		_inherits(UTCTime, _VisibleString);

		//**********************************************************************************
		/**
   * Constructor for "UTCTime" class
   * @param {Object} [parameters={}]
   * @property {string} [value] String representatio of the date
   * @property {Date} [valueDate] JavaScript "Date" object
   */
		function UTCTime() {
			var parameters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

			_classCallCheck(this, UTCTime);

			var _this47 = _possibleConstructorReturn(this, (UTCTime.__proto__ || Object.getPrototypeOf(UTCTime)).call(this, parameters));

			_this47.year = 0;
			_this47.month = 0;
			_this47.day = 0;
			_this47.hour = 0;
			_this47.minute = 0;
			_this47.second = 0;

			//region Create UTCTime from ASN.1 UTC string value
			if ("value" in parameters) {
				_this47.fromString(parameters.value);

				_this47.valueBlock.valueHex = new ArrayBuffer(parameters.value.length);
				var view = new Uint8Array(_this47.valueBlock.valueHex);

				for (var i = 0; i < parameters.value.length; i++) {
					view[i] = parameters.value.charCodeAt(i);
				}
			}
			//endregion
			//region Create GeneralizedTime from JavaScript Date type
			if ("valueDate" in parameters) {
				_this47.fromDate(parameters.valueDate);
				_this47.valueBlock.valueHex = _this47.toBuffer();
			}
			//endregion

			_this47.idBlock.tagClass = 1; // UNIVERSAL
			_this47.idBlock.tagNumber = 23; // UTCTime
			return _this47;
		}
		//**********************************************************************************
		/**
   * Base function for converting block from BER encoded array of bytes
   * @param {!ArrayBuffer} inputBuffer ASN.1 BER encoded array
   * @param {!number} inputOffset Offset in ASN.1 BER encoded array where decoding should be started
   * @param {!number} inputLength Maximum length of array of bytes which can be using in this function
   * @returns {number} Offset after least decoded byte
   */


		_createClass(UTCTime, [{
			key: 'fromBER',
			value: function fromBER(inputBuffer, inputOffset, inputLength) {
				var resultOffset = this.valueBlock.fromBER(inputBuffer, inputOffset, this.lenBlock.isIndefiniteForm === true ? inputLength : this.lenBlock.length);
				if (resultOffset === -1) {
					this.error = this.valueBlock.error;
					return resultOffset;
				}

				this.fromBuffer(this.valueBlock.valueHex);

				if (this.idBlock.error.length === 0) this.blockLength += this.idBlock.blockLength;

				if (this.lenBlock.error.length === 0) this.blockLength += this.lenBlock.blockLength;

				if (this.valueBlock.error.length === 0) this.blockLength += this.valueBlock.blockLength;

				return resultOffset;
			}
			//**********************************************************************************
			/**
    * Function converting ArrayBuffer into ASN.1 internal string
    * @param {!ArrayBuffer} inputBuffer ASN.1 BER encoded array
    */

		}, {
			key: 'fromBuffer',
			value: function fromBuffer(inputBuffer) {
				this.fromString(String.fromCharCode.apply(null, new Uint8Array(inputBuffer)));
			}
			//**********************************************************************************
			/**
    * Function converting ASN.1 internal string into ArrayBuffer
    * @returns {ArrayBuffer}
    */

		}, {
			key: 'toBuffer',
			value: function toBuffer() {
				var str = this.toString();

				var buffer = new ArrayBuffer(str.length);
				var view = new Uint8Array(buffer);

				for (var i = 0; i < str.length; i++) {
					view[i] = str.charCodeAt(i);
				}return buffer;
			}
			//**********************************************************************************
			/**
    * Function converting "Date" object into ASN.1 internal string
    * @param {!Date} inputDate JavaScript "Date" object
    */

		}, {
			key: 'fromDate',
			value: function fromDate(inputDate) {
				this.year = inputDate.getUTCFullYear();
				this.month = inputDate.getUTCMonth() + 1;
				this.day = inputDate.getUTCDate();
				this.hour = inputDate.getUTCHours();
				this.minute = inputDate.getUTCMinutes();
				this.second = inputDate.getUTCSeconds();
			}
			//**********************************************************************************
			//noinspection JSUnusedGlobalSymbols
			/**
    * Function converting ASN.1 internal string into "Date" object
    * @returns {Date}
    */

		}, {
			key: 'toDate',
			value: function toDate() {
				return new Date(Date.UTC(this.year, this.month - 1, this.day, this.hour, this.minute, this.second));
			}
			//**********************************************************************************
			/**
    * Function converting JavaScript string into ASN.1 internal class
    * @param {!string} inputString ASN.1 BER encoded array
    */

		}, {
			key: 'fromString',
			value: function fromString(inputString) {
				//region Parse input string
				var parser = /(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})Z/ig;
				var parserArray = parser.exec(inputString);
				if (parserArray === null) {
					this.error = "Wrong input string for convertion";
					return;
				}
				//endregion

				//region Store parsed values
				var year = parseInt(parserArray[1], 10);
				if (year >= 50) this.year = 1900 + year;else this.year = 2000 + year;

				this.month = parseInt(parserArray[2], 10);
				this.day = parseInt(parserArray[3], 10);
				this.hour = parseInt(parserArray[4], 10);
				this.minute = parseInt(parserArray[5], 10);
				this.second = parseInt(parserArray[6], 10);
				//endregion
			}
			//**********************************************************************************
			/**
    * Function converting ASN.1 internal class into JavaScript string
    * @returns {string}
    */

		}, {
			key: 'toString',
			value: function toString() {
				var outputArray = new Array(7);

				outputArray[0] = padNumber(this.year < 2000 ? this.year - 1900 : this.year - 2000, 2);
				outputArray[1] = padNumber(this.month, 2);
				outputArray[2] = padNumber(this.day, 2);
				outputArray[3] = padNumber(this.hour, 2);
				outputArray[4] = padNumber(this.minute, 2);
				outputArray[5] = padNumber(this.second, 2);
				outputArray[6] = "Z";

				return outputArray.join("");
			}
			//**********************************************************************************
			/**
    * Aux function, need to get a block name. Need to have it here for inhiritence
    * @returns {string}
    */

		}, {
			key: 'toJSON',

			//**********************************************************************************
			/**
    * Convertion for the block to JSON object
    * @returns {Object}
    */
			value: function toJSON() {
				var object = {};

				//region Seems at the moment (Sep 2016) there is no way how to check method is supported in "super" object
				try {
					object = _get(UTCTime.prototype.__proto__ || Object.getPrototypeOf(UTCTime.prototype), 'toJSON', this).call(this);
				} catch (ex) {}
				//endregion

				object.year = this.year;
				object.month = this.month;
				object.day = this.day;
				object.hour = this.hour;
				object.minute = this.minute;
				object.second = this.second;

				return object;
			}
			//**********************************************************************************

		}], [{
			key: 'blockName',
			value: function blockName() {
				return "UTCTime";
			}
		}]);

		return UTCTime;
	}(VisibleString);
	//**************************************************************************************
	/**
  * @extends VisibleString
  */


	var GeneralizedTime = function (_VisibleString2) {
		_inherits(GeneralizedTime, _VisibleString2);

		//**********************************************************************************
		/**
   * Constructor for "GeneralizedTime" class
   * @param {Object} [parameters={}]
   * @property {string} [value] String representatio of the date
   * @property {Date} [valueDate] JavaScript "Date" object
   */
		function GeneralizedTime() {
			var parameters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

			_classCallCheck(this, GeneralizedTime);

			var _this48 = _possibleConstructorReturn(this, (GeneralizedTime.__proto__ || Object.getPrototypeOf(GeneralizedTime)).call(this, parameters));

			_this48.year = 0;
			_this48.month = 0;
			_this48.day = 0;
			_this48.hour = 0;
			_this48.minute = 0;
			_this48.second = 0;
			_this48.millisecond = 0;

			//region Create UTCTime from ASN.1 UTC string value
			if ("value" in parameters) {
				_this48.fromString(parameters.value);

				_this48.valueBlock.valueHex = new ArrayBuffer(parameters.value.length);
				var view = new Uint8Array(_this48.valueBlock.valueHex);

				for (var i = 0; i < parameters.value.length; i++) {
					view[i] = parameters.value.charCodeAt(i);
				}
			}
			//endregion
			//region Create GeneralizedTime from JavaScript Date type
			if ("valueDate" in parameters) {
				_this48.fromDate(parameters.valueDate);
				_this48.valueBlock.valueHex = _this48.toBuffer();
			}
			//endregion

			_this48.idBlock.tagClass = 1; // UNIVERSAL
			_this48.idBlock.tagNumber = 24; // GeneralizedTime
			return _this48;
		}
		//**********************************************************************************
		/**
   * Base function for converting block from BER encoded array of bytes
   * @param {!ArrayBuffer} inputBuffer ASN.1 BER encoded array
   * @param {!number} inputOffset Offset in ASN.1 BER encoded array where decoding should be started
   * @param {!number} inputLength Maximum length of array of bytes which can be using in this function
   * @returns {number} Offset after least decoded byte
   */


		_createClass(GeneralizedTime, [{
			key: 'fromBER',
			value: function fromBER(inputBuffer, inputOffset, inputLength) {
				var resultOffset = this.valueBlock.fromBER(inputBuffer, inputOffset, this.lenBlock.isIndefiniteForm === true ? inputLength : this.lenBlock.length);
				if (resultOffset === -1) {
					this.error = this.valueBlock.error;
					return resultOffset;
				}

				this.fromBuffer(this.valueBlock.valueHex);

				if (this.idBlock.error.length === 0) this.blockLength += this.idBlock.blockLength;

				if (this.lenBlock.error.length === 0) this.blockLength += this.lenBlock.blockLength;

				if (this.valueBlock.error.length === 0) this.blockLength += this.valueBlock.blockLength;

				return resultOffset;
			}
			//**********************************************************************************
			/**
    * Function converting ArrayBuffer into ASN.1 internal string
    * @param {!ArrayBuffer} inputBuffer ASN.1 BER encoded array
    */

		}, {
			key: 'fromBuffer',
			value: function fromBuffer(inputBuffer) {
				this.fromString(String.fromCharCode.apply(null, new Uint8Array(inputBuffer)));
			}
			//**********************************************************************************
			/**
    * Function converting ASN.1 internal string into ArrayBuffer
    * @returns {ArrayBuffer}
    */

		}, {
			key: 'toBuffer',
			value: function toBuffer() {
				var str = this.toString();

				var buffer = new ArrayBuffer(str.length);
				var view = new Uint8Array(buffer);

				for (var i = 0; i < str.length; i++) {
					view[i] = str.charCodeAt(i);
				}return buffer;
			}
			//**********************************************************************************
			/**
    * Function converting "Date" object into ASN.1 internal string
    * @param {!Date} inputDate JavaScript "Date" object
    */

		}, {
			key: 'fromDate',
			value: function fromDate(inputDate) {
				this.year = inputDate.getUTCFullYear();
				this.month = inputDate.getUTCMonth() + 1;
				this.day = inputDate.getUTCDate();
				this.hour = inputDate.getUTCHours();
				this.minute = inputDate.getUTCMinutes();
				this.second = inputDate.getUTCSeconds();
				this.millisecond = inputDate.getUTCMilliseconds();
			}
			//**********************************************************************************
			//noinspection JSUnusedGlobalSymbols
			/**
    * Function converting ASN.1 internal string into "Date" object
    * @returns {Date}
    */

		}, {
			key: 'toDate',
			value: function toDate() {
				return new Date(Date.UTC(this.year, this.month - 1, this.day, this.hour, this.minute, this.second, this.millisecond));
			}
			//**********************************************************************************
			/**
    * Function converting JavaScript string into ASN.1 internal class
    * @param {!string} inputString ASN.1 BER encoded array
    */

		}, {
			key: 'fromString',
			value: function fromString(inputString) {
				//region Initial variables
				var isUTC = false;

				var timeString = "";
				var dateTimeString = "";
				var fractionPart = 0;

				var parser = void 0;

				var hourDifference = 0;
				var minuteDifference = 0;
				//endregion

				//region Convert as UTC time
				if (inputString[inputString.length - 1] === "Z") {
					timeString = inputString.substr(0, inputString.length - 1);

					isUTC = true;
				}
				//endregion
				//region Convert as local time
				else {
						//noinspection JSPrimitiveTypeWrapperUsage
						var number = new Number(inputString[inputString.length - 1]);

						if (isNaN(number.valueOf())) throw new Error("Wrong input string for convertion");

						timeString = inputString;
					}
				//endregion

				//region Check that we do not have a "+" and "-" symbols inside UTC time
				if (isUTC) {
					if (timeString.indexOf("+") !== -1) throw new Error("Wrong input string for convertion");

					if (timeString.indexOf("-") !== -1) throw new Error("Wrong input string for convertion");
				}
				//endregion
				//region Get "UTC time difference" in case of local time
				else {
						var multiplier = 1;
						var differencePosition = timeString.indexOf("+");
						var differenceString = "";

						if (differencePosition === -1) {
							differencePosition = timeString.indexOf("-");
							multiplier = -1;
						}

						if (differencePosition !== -1) {
							differenceString = timeString.substr(differencePosition + 1);
							timeString = timeString.substr(0, differencePosition);

							if (differenceString.length !== 2 && differenceString.length !== 4) throw new Error("Wrong input string for convertion");

							//noinspection JSPrimitiveTypeWrapperUsage
							var _number = new Number(differenceString.substr(0, 2));

							if (isNaN(_number.valueOf())) throw new Error("Wrong input string for convertion");

							hourDifference = multiplier * _number;

							if (differenceString.length === 4) {
								//noinspection JSPrimitiveTypeWrapperUsage
								_number = new Number(differenceString.substr(2, 2));

								if (isNaN(_number.valueOf())) throw new Error("Wrong input string for convertion");

								minuteDifference = multiplier * _number;
							}
						}
					}
				//endregion

				//region Get position of fraction point
				var fractionPointPosition = timeString.indexOf("."); // Check for "full stop" symbol
				if (fractionPointPosition === -1) fractionPointPosition = timeString.indexOf(","); // Check for "comma" symbol
				//endregion

				//region Get fraction part
				if (fractionPointPosition !== -1) {
					//noinspection JSPrimitiveTypeWrapperUsage
					var fractionPartCheck = new Number('0' + timeString.substr(fractionPointPosition));

					if (isNaN(fractionPartCheck.valueOf())) throw new Error("Wrong input string for convertion");

					fractionPart = fractionPartCheck.valueOf();

					dateTimeString = timeString.substr(0, fractionPointPosition);
				} else dateTimeString = timeString;
				//endregion

				//region Parse internal date
				switch (true) {
					case dateTimeString.length === 8:
						// "YYYYMMDD"
						parser = /(\d{4})(\d{2})(\d{2})/ig;
						if (fractionPointPosition !== -1) throw new Error("Wrong input string for convertion"); // Here we should not have a "fraction point"
						break;
					case dateTimeString.length === 10:
						// "YYYYMMDDHH"
						parser = /(\d{4})(\d{2})(\d{2})(\d{2})/ig;

						if (fractionPointPosition !== -1) {
							var fractionResult = 60 * fractionPart;
							this.minute = Math.floor(fractionResult);

							fractionResult = 60 * (fractionResult - this.minute);
							this.second = Math.floor(fractionResult);

							fractionResult = 1000 * (fractionResult - this.second);
							this.millisecond = Math.floor(fractionResult);
						}
						break;
					case dateTimeString.length === 12:
						// "YYYYMMDDHHMM"
						parser = /(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})/ig;

						if (fractionPointPosition !== -1) {
							var _fractionResult = 60 * fractionPart;
							this.second = Math.floor(_fractionResult);

							_fractionResult = 1000 * (_fractionResult - this.second);
							this.millisecond = Math.floor(_fractionResult);
						}
						break;
					case dateTimeString.length === 14:
						// "YYYYMMDDHHMMSS"
						parser = /(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/ig;

						if (fractionPointPosition !== -1) {
							var _fractionResult2 = 1000 * fractionPart;
							this.millisecond = Math.floor(_fractionResult2);
						}
						break;
					default:
						throw new Error("Wrong input string for convertion");
				}
				//endregion

				//region Put parsed values at right places
				var parserArray = parser.exec(dateTimeString);
				if (parserArray === null) throw new Error("Wrong input string for convertion");

				for (var j = 1; j < parserArray.length; j++) {
					switch (j) {
						case 1:
							this.year = parseInt(parserArray[j], 10);
							break;
						case 2:
							this.month = parseInt(parserArray[j], 10);
							break;
						case 3:
							this.day = parseInt(parserArray[j], 10);
							break;
						case 4:
							this.hour = parseInt(parserArray[j], 10) + hourDifference;
							break;
						case 5:
							this.minute = parseInt(parserArray[j], 10) + minuteDifference;
							break;
						case 6:
							this.second = parseInt(parserArray[j], 10);
							break;
						default:
							throw new Error("Wrong input string for convertion");
					}
				}
				//endregion

				//region Get final date
				if (isUTC === false) {
					var tempDate = new Date(this.year, this.month, this.day, this.hour, this.minute, this.second, this.millisecond);

					this.year = tempDate.getUTCFullYear();
					this.month = tempDate.getUTCMonth();
					this.day = tempDate.getUTCDay();
					this.hour = tempDate.getUTCHours();
					this.minute = tempDate.getUTCMinutes();
					this.second = tempDate.getUTCSeconds();
					this.millisecond = tempDate.getUTCMilliseconds();
				}
				//endregion
			}
			//**********************************************************************************
			/**
    * Function converting ASN.1 internal class into JavaScript string
    * @returns {string}
    */

		}, {
			key: 'toString',
			value: function toString() {
				var outputArray = [];

				outputArray.push(padNumber(this.year, 4));
				outputArray.push(padNumber(this.month, 2));
				outputArray.push(padNumber(this.day, 2));
				outputArray.push(padNumber(this.hour, 2));
				outputArray.push(padNumber(this.minute, 2));
				outputArray.push(padNumber(this.second, 2));
				if (this.millisecond !== 0) {
					outputArray.push(".");
					outputArray.push(padNumber(this.millisecond, 3));
				}
				outputArray.push("Z");

				return outputArray.join("");
			}
			//**********************************************************************************
			/**
    * Aux function, need to get a block name. Need to have it here for inhiritence
    * @returns {string}
    */

		}, {
			key: 'toJSON',

			//**********************************************************************************
			/**
    * Convertion for the block to JSON object
    * @returns {Object}
    */
			value: function toJSON() {
				var object = {};

				//region Seems at the moment (Sep 2016) there is no way how to check method is supported in "super" object
				try {
					object = _get(GeneralizedTime.prototype.__proto__ || Object.getPrototypeOf(GeneralizedTime.prototype), 'toJSON', this).call(this);
				} catch (ex) {}
				//endregion

				object.year = this.year;
				object.month = this.month;
				object.day = this.day;
				object.hour = this.hour;
				object.minute = this.minute;
				object.second = this.second;
				object.millisecond = this.millisecond;

				return object;
			}
			//**********************************************************************************

		}], [{
			key: 'blockName',
			value: function blockName() {
				return "GeneralizedTime";
			}
		}]);

		return GeneralizedTime;
	}(VisibleString);
	//**************************************************************************************
	/**
  * @extends Utf8String
  */


	var DATE = function (_Utf8String) {
		_inherits(DATE, _Utf8String);

		//**********************************************************************************
		/**
   * Constructor for "DATE" class
   * @param {Object} [parameters={}]
   */
		function DATE() {
			var parameters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

			_classCallCheck(this, DATE);

			var _this49 = _possibleConstructorReturn(this, (DATE.__proto__ || Object.getPrototypeOf(DATE)).call(this, parameters));

			_this49.idBlock.tagClass = 1; // UNIVERSAL
			_this49.idBlock.tagNumber = 31; // DATE
			return _this49;
		}
		//**********************************************************************************
		/**
   * Aux function, need to get a block name. Need to have it here for inhiritence
   * @returns {string}
   */


		_createClass(DATE, null, [{
			key: 'blockName',
			value: function blockName() {
				return "DATE";
			}
			//**********************************************************************************

		}]);

		return DATE;
	}(Utf8String);
	//**************************************************************************************
	/**
  * @extends Utf8String
  */


	var TimeOfDay = function (_Utf8String2) {
		_inherits(TimeOfDay, _Utf8String2);

		//**********************************************************************************
		/**
   * Constructor for "TimeOfDay" class
   * @param {Object} [parameters={}]
   */
		function TimeOfDay() {
			var parameters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

			_classCallCheck(this, TimeOfDay);

			var _this50 = _possibleConstructorReturn(this, (TimeOfDay.__proto__ || Object.getPrototypeOf(TimeOfDay)).call(this, parameters));

			_this50.idBlock.tagClass = 1; // UNIVERSAL
			_this50.idBlock.tagNumber = 32; // TimeOfDay
			return _this50;
		}
		//**********************************************************************************
		/**
   * Aux function, need to get a block name. Need to have it here for inhiritence
   * @returns {string}
   */


		_createClass(TimeOfDay, null, [{
			key: 'blockName',
			value: function blockName() {
				return "TimeOfDay";
			}
			//**********************************************************************************

		}]);

		return TimeOfDay;
	}(Utf8String);
	//**************************************************************************************
	/**
  * @extends Utf8String
  */


	var DateTime = function (_Utf8String3) {
		_inherits(DateTime, _Utf8String3);

		//**********************************************************************************
		/**
   * Constructor for "DateTime" class
   * @param {Object} [parameters={}]
   */
		function DateTime() {
			var parameters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

			_classCallCheck(this, DateTime);

			var _this51 = _possibleConstructorReturn(this, (DateTime.__proto__ || Object.getPrototypeOf(DateTime)).call(this, parameters));

			_this51.idBlock.tagClass = 1; // UNIVERSAL
			_this51.idBlock.tagNumber = 33; // DateTime
			return _this51;
		}
		//**********************************************************************************
		/**
   * Aux function, need to get a block name. Need to have it here for inhiritence
   * @returns {string}
   */


		_createClass(DateTime, null, [{
			key: 'blockName',
			value: function blockName() {
				return "DateTime";
			}
			//**********************************************************************************

		}]);

		return DateTime;
	}(Utf8String);
	//**************************************************************************************
	/**
  * @extends Utf8String
  */


	var Duration = function (_Utf8String4) {
		_inherits(Duration, _Utf8String4);

		//**********************************************************************************
		/**
   * Constructor for "Duration" class
   * @param {Object} [parameters={}]
   */
		function Duration() {
			var parameters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

			_classCallCheck(this, Duration);

			var _this52 = _possibleConstructorReturn(this, (Duration.__proto__ || Object.getPrototypeOf(Duration)).call(this, parameters));

			_this52.idBlock.tagClass = 1; // UNIVERSAL
			_this52.idBlock.tagNumber = 34; // Duration
			return _this52;
		}
		//**********************************************************************************
		/**
   * Aux function, need to get a block name. Need to have it here for inhiritence
   * @returns {string}
   */


		_createClass(Duration, null, [{
			key: 'blockName',
			value: function blockName() {
				return "Duration";
			}
			//**********************************************************************************

		}]);

		return Duration;
	}(Utf8String);
	//**************************************************************************************
	/**
  * @extends Utf8String
  */


	var TIME = function (_Utf8String5) {
		_inherits(TIME, _Utf8String5);

		//**********************************************************************************
		/**
   * Constructor for "Time" class
   * @param {Object} [parameters={}]
   */
		function TIME() {
			var parameters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

			_classCallCheck(this, TIME);

			var _this53 = _possibleConstructorReturn(this, (TIME.__proto__ || Object.getPrototypeOf(TIME)).call(this, parameters));

			_this53.idBlock.tagClass = 1; // UNIVERSAL
			_this53.idBlock.tagNumber = 14; // Time
			return _this53;
		}
		//**********************************************************************************
		/**
   * Aux function, need to get a block name. Need to have it here for inhiritence
   * @returns {string}
   */


		_createClass(TIME, null, [{
			key: 'blockName',
			value: function blockName() {
				return "TIME";
			}
			//**********************************************************************************

		}]);

		return TIME;
	}(Utf8String);
	//**************************************************************************************
	//endregion
	//**************************************************************************************
	//region Declaration of special ASN.1 schema type Choice
	//**************************************************************************************


	var Choice =
	//**********************************************************************************
	/**
  * Constructor for "Choice" class
  * @param {Object} [parameters={}]
  * @property {Array} [value] Array of ASN.1 types for make a choice from
  * @property {boolean} [optional]
  */
	function Choice() {
		var parameters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

		_classCallCheck(this, Choice);

		this.value = getParametersValue(parameters, "value", []);
		this.optional = getParametersValue(parameters, "optional", false);
	}
	//**********************************************************************************
	;
	//**************************************************************************************
	//endregion
	//**************************************************************************************
	//region Declaration of special ASN.1 schema type Any
	//**************************************************************************************


	var Any$1 =
	//**********************************************************************************
	/**
  * Constructor for "Any" class
  * @param {Object} [parameters={}]
  * @property {string} [name]
  * @property {boolean} [optional]
  */
	function Any$1() {
		var parameters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

		_classCallCheck(this, Any$1);

		this.name = getParametersValue(parameters, "name", "");
		this.optional = getParametersValue(parameters, "optional", false);
	}
	//**********************************************************************************
	;
	//**************************************************************************************
	//endregion
	//**************************************************************************************
	//region Declaration of special ASN.1 schema type Repeated
	//**************************************************************************************


	var Repeated =
	//**********************************************************************************
	/**
  * Constructor for "Repeated" class
  * @param {Object} [parameters={}]
  * @property {string} [name]
  * @property {boolean} [optional]
  */
	function Repeated() {
		var parameters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

		_classCallCheck(this, Repeated);

		this.name = getParametersValue(parameters, "name", "");
		this.optional = getParametersValue(parameters, "optional", false);
		this.value = getParametersValue(parameters, "value", new Any$1());
		this.local = getParametersValue(parameters, "local", false); // Could local or global array to store elements
	}
	//**********************************************************************************
	;
	//**************************************************************************************
	//endregion
	//**************************************************************************************
	//region Declaration of special ASN.1 schema type RawData
	//**************************************************************************************
	/**
  * @description Special class providing ability to have "toBER/fromBER" for raw ArrayBuffer
  */


	var RawData = function () {
		//**********************************************************************************
		/**
   * Constructor for "Repeated" class
   * @param {Object} [parameters={}]
   * @property {string} [name]
   * @property {boolean} [optional]
   */
		function RawData() {
			var parameters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

			_classCallCheck(this, RawData);

			this.data = getParametersValue(parameters, "data", new ArrayBuffer(0));
		}
		//**********************************************************************************
		/**
   * Base function for converting block from BER encoded array of bytes
   * @param {!ArrayBuffer} inputBuffer ASN.1 BER encoded array
   * @param {!number} inputOffset Offset in ASN.1 BER encoded array where decoding should be started
   * @param {!number} inputLength Maximum length of array of bytes which can be using in this function
   * @returns {number} Offset after least decoded byte
   */


		_createClass(RawData, [{
			key: 'fromBER',
			value: function fromBER(inputBuffer, inputOffset, inputLength) {
				this.data = inputBuffer.slice(inputOffset, inputLength);
			}
			//**********************************************************************************
			/**
    * Encoding of current ASN.1 block into ASN.1 encoded array (BER rules)
    * @param {boolean} [sizeOnly=false] Flag that we need only a size of encoding, not a real array of bytes
    * @returns {ArrayBuffer}
    */

		}, {
			key: 'toBER',
			value: function toBER() {
				var sizeOnly = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

				return this.data;
			}
			//**********************************************************************************

		}]);

		return RawData;
	}();
	//**************************************************************************************
	//endregion
	//**************************************************************************************
	//region Major ASN.1 BER decoding function
	//**************************************************************************************
	/**
  * Internal library function for decoding ASN.1 BER
  * @param {!ArrayBuffer} inputBuffer ASN.1 BER encoded array
  * @param {!number} inputOffset Offset in ASN.1 BER encoded array where decoding should be started
  * @param {!number} inputLength Maximum length of array of bytes which can be using in this function
  * @returns {{offset: number, result: Object}}
  */


	function LocalFromBER(inputBuffer, inputOffset, inputLength) {
		var incomingOffset = inputOffset; // Need to store initial offset since "inputOffset" is changing in the function

		//region Local function changing a type for ASN.1 classes
		function localChangeType(inputObject, newType) {
			if (inputObject instanceof newType) return inputObject;

			var newObject = new newType();
			newObject.idBlock = inputObject.idBlock;
			newObject.lenBlock = inputObject.lenBlock;
			newObject.warnings = inputObject.warnings;
			//noinspection JSCheckFunctionSignatures
			newObject.valueBeforeDecode = inputObject.valueBeforeDecode.slice(0);

			return newObject;
		}
		//endregion

		//region Create a basic ASN.1 type since we need to return errors and warnings from the function
		var returnObject = new BaseBlock({}, Object);
		//endregion

		//region Basic check for parameters
		if (checkBufferParams(new LocalBaseBlock(), inputBuffer, inputOffset, inputLength) === false) {
			returnObject.error = "Wrong input parameters";
			return {
				offset: -1,
				result: returnObject
			};
		}
		//endregion

		//region Getting Uint8Array from ArrayBuffer
		var intBuffer = new Uint8Array(inputBuffer, inputOffset, inputLength);
		//endregion

		//region Initial checks
		if (intBuffer.length === 0) {
			this.error = "Zero buffer length";
			return {
				offset: -1,
				result: returnObject
			};
		}
		//endregion

		//region Decode indentifcation block of ASN.1 BER structure
		var resultOffset = returnObject.idBlock.fromBER(inputBuffer, inputOffset, inputLength);
		returnObject.warnings.concat(returnObject.idBlock.warnings);
		if (resultOffset === -1) {
			returnObject.error = returnObject.idBlock.error;
			return {
				offset: -1,
				result: returnObject
			};
		}

		inputOffset = resultOffset;
		inputLength -= returnObject.idBlock.blockLength;
		//endregion

		//region Decode length block of ASN.1 BER structure
		resultOffset = returnObject.lenBlock.fromBER(inputBuffer, inputOffset, inputLength);
		returnObject.warnings.concat(returnObject.lenBlock.warnings);
		if (resultOffset === -1) {
			returnObject.error = returnObject.lenBlock.error;
			return {
				offset: -1,
				result: returnObject
			};
		}

		inputOffset = resultOffset;
		inputLength -= returnObject.lenBlock.blockLength;
		//endregion

		//region Check for usign indefinite length form in encoding for primitive types
		if (returnObject.idBlock.isConstructed === false && returnObject.lenBlock.isIndefiniteForm === true) {
			returnObject.error = "Indefinite length form used for primitive encoding form";
			return {
				offset: -1,
				result: returnObject
			};
		}
		//endregion

		//region Switch ASN.1 block type
		var newASN1Type = BaseBlock;

		switch (returnObject.idBlock.tagClass) {
			//region UNIVERSAL
			case 1:
				//region Check for reserved tag numbers
				if (returnObject.idBlock.tagNumber >= 37 && returnObject.idBlock.isHexOnly === false) {
					returnObject.error = "UNIVERSAL 37 and upper tags are reserved by ASN.1 standard";
					return {
						offset: -1,
						result: returnObject
					};
				}
				//endregion

				switch (returnObject.idBlock.tagNumber) {
					//region EndOfContent type
					case 0:
						//region Check for EndOfContent type
						if (returnObject.idBlock.isConstructed === true && returnObject.lenBlock.length > 0) {
							returnObject.error = "Type [UNIVERSAL 0] is reserved";
							return {
								offset: -1,
								result: returnObject
							};
						}
						//endregion

						newASN1Type = EndOfContent;

						break;
					//endregion
					//region Boolean type
					case 1:
						newASN1Type = Boolean;
						break;
					//endregion
					//region Integer type
					case 2:
						newASN1Type = Integer;
						break;
					//endregion
					//region BitString type
					case 3:
						newASN1Type = BitString;
						break;
					//endregion
					//region OctetString type
					case 4:
						newASN1Type = OctetString;
						break;
					//endregion
					//region Null type
					case 5:
						newASN1Type = Null;
						break;
					//endregion
					//region OBJECT IDENTIFIER type
					case 6:
						newASN1Type = ObjectIdentifier$1;
						break;
					//endregion
					//region Enumerated type
					case 10:
						newASN1Type = Enumerated;
						break;
					//endregion
					//region Utf8String type
					case 12:
						newASN1Type = Utf8String;
						break;
					//endregion
					//region Time type
					case 14:
						newASN1Type = TIME;
						break;
					//endregion
					//region ASN.1 reserved type
					case 15:
						returnObject.error = "[UNIVERSAL 15] is reserved by ASN.1 standard";
						return {
							offset: -1,
							result: returnObject
						};
					//endregion
					//region Sequence type
					case 16:
						newASN1Type = Sequence;
						break;
					//endregion
					//region Set type
					case 17:
						newASN1Type = Set;
						break;
					//endregion
					//region NumericString type
					case 18:
						newASN1Type = NumericString;
						break;
					//endregion
					//region PrintableString type
					case 19:
						newASN1Type = PrintableString;
						break;
					//endregion
					//region TeletexString type
					case 20:
						newASN1Type = TeletexString;
						break;
					//endregion
					//region VideotexString type
					case 21:
						newASN1Type = VideotexString;
						break;
					//endregion
					//region IA5String type
					case 22:
						newASN1Type = IA5String;
						break;
					//endregion
					//region UTCTime type
					case 23:
						newASN1Type = UTCTime;
						break;
					//endregion
					//region GeneralizedTime type
					case 24:
						newASN1Type = GeneralizedTime;
						break;
					//endregion
					//region GraphicString type
					case 25:
						newASN1Type = GraphicString;
						break;
					//endregion
					//region VisibleString type
					case 26:
						newASN1Type = VisibleString;
						break;
					//endregion
					//region GeneralString type
					case 27:
						newASN1Type = GeneralString;
						break;
					//endregion
					//region UniversalString type
					case 28:
						newASN1Type = UniversalString;
						break;
					//endregion
					//region CharacterString type
					case 29:
						newASN1Type = CharacterString;
						break;
					//endregion
					//region BmpString type
					case 30:
						newASN1Type = BmpString;
						break;
					//endregion
					//region DATE type
					case 31:
						newASN1Type = DATE;
						break;
					//endregion
					//region TimeOfDay type
					case 32:
						newASN1Type = TimeOfDay;
						break;
					//endregion
					//region Date-Time type
					case 33:
						newASN1Type = DateTime;
						break;
					//endregion
					//region Duration type
					case 34:
						newASN1Type = Duration;
						break;
					//endregion
					//region default
					default:
						{
							var newObject = void 0;

							if (returnObject.idBlock.isConstructed === true) newObject = new Constructed();else newObject = new Primitive();

							newObject.idBlock = returnObject.idBlock;
							newObject.lenBlock = returnObject.lenBlock;
							newObject.warnings = returnObject.warnings;

							returnObject = newObject;

							resultOffset = returnObject.fromBER(inputBuffer, inputOffset, inputLength);
						}
					//endregion
				}
				break;
			//endregion
			//region All other tag classes
			case 2: // APPLICATION
			case 3: // CONTEXT-SPECIFIC
			case 4: // PRIVATE
			default:
				{
					if (returnObject.idBlock.isConstructed === true) newASN1Type = Constructed;else newASN1Type = Primitive;
				}
			//endregion
		}
		//endregion

		//region Change type and perform BER decoding
		returnObject = localChangeType(returnObject, newASN1Type);
		resultOffset = returnObject.fromBER(inputBuffer, inputOffset, returnObject.lenBlock.isIndefiniteForm === true ? inputLength : returnObject.lenBlock.length);
		//endregion

		//region Coping incoming buffer for entire ASN.1 block
		returnObject.valueBeforeDecode = inputBuffer.slice(incomingOffset, incomingOffset + returnObject.blockLength);
		//endregion

		return {
			offset: resultOffset,
			result: returnObject
		};
	}
	//**************************************************************************************
	/**
  * Major function for decoding ASN.1 BER array into internal library structuries
  * @param {!ArrayBuffer} inputBuffer ASN.1 BER encoded array of bytes
  */
	function fromBER(inputBuffer) {
		if (inputBuffer.byteLength === 0) {
			var result = new BaseBlock({}, Object);
			result.error = "Input buffer has zero length";

			return {
				offset: -1,
				result: result
			};
		}

		return LocalFromBER(inputBuffer, 0, inputBuffer.byteLength);
	}
	//**************************************************************************************
	//endregion
	//**************************************************************************************
	//region Major scheme verification function
	//**************************************************************************************
	/**
  * Compare of two ASN.1 object trees
  * @param {!Object} root Root of input ASN.1 object tree
  * @param {!Object} inputData Input ASN.1 object tree
  * @param {!Object} inputSchema Input ASN.1 schema to compare with
  * @return {{verified: boolean}|{verified:boolean, result: Object}}
  */
	function compareSchema(root, inputData, inputSchema) {
		//region Special case for Choice schema element type
		if (inputSchema instanceof Choice) {
			var choiceResult = false;

			for (var j = 0; j < inputSchema.value.length; j++) {
				var result = compareSchema(root, inputData, inputSchema.value[j]);
				if (result.verified === true) {
					return {
						verified: true,
						result: root
					};
				}
			}

			if (choiceResult === false) {
				var _result = {
					verified: false,
					result: {
						error: "Wrong values for Choice type"
					}
				};

				if (inputSchema.hasOwnProperty("name")) _result.name = inputSchema.name;

				return _result;
			}
		}
		//endregion

		//region Special case for Any schema element type
		if (inputSchema instanceof Any$1) {
			//region Add named component of ASN.1 schema
			if (inputSchema.hasOwnProperty("name")) root[inputSchema.name] = inputData;
			//endregion

			return {
				verified: true,
				result: root
			};
		}
		//endregion

		//region Initial check
		if (root instanceof Object === false) {
			return {
				verified: false,
				result: { error: "Wrong root object" }
			};
		}

		if (inputData instanceof Object === false) {
			return {
				verified: false,
				result: { error: "Wrong ASN.1 data" }
			};
		}

		if (inputSchema instanceof Object === false) {
			return {
				verified: false,
				result: { error: "Wrong ASN.1 schema" }
			};
		}

		if ("idBlock" in inputSchema === false) {
			return {
				verified: false,
				result: { error: "Wrong ASN.1 schema" }
			};
		}
		//endregion

		//region Comparing idBlock properties in ASN.1 data and ASN.1 schema
		//region Encode and decode ASN.1 schema idBlock
		/// <remarks>This encoding/decoding is neccessary because could be an errors in schema definition</remarks>
		if ("fromBER" in inputSchema.idBlock === false) {
			return {
				verified: false,
				result: { error: "Wrong ASN.1 schema" }
			};
		}

		if ("toBER" in inputSchema.idBlock === false) {
			return {
				verified: false,
				result: { error: "Wrong ASN.1 schema" }
			};
		}

		var encodedId = inputSchema.idBlock.toBER(false);
		if (encodedId.byteLength === 0) {
			return {
				verified: false,
				result: { error: "Error encoding idBlock for ASN.1 schema" }
			};
		}

		var decodedOffset = inputSchema.idBlock.fromBER(encodedId, 0, encodedId.byteLength);
		if (decodedOffset === -1) {
			return {
				verified: false,
				result: { error: "Error decoding idBlock for ASN.1 schema" }
			};
		}
		//endregion

		//region tagClass
		if (inputSchema.idBlock.hasOwnProperty("tagClass") === false) {
			return {
				verified: false,
				result: { error: "Wrong ASN.1 schema" }
			};
		}

		if (inputSchema.idBlock.tagClass !== inputData.idBlock.tagClass) {
			return {
				verified: false,
				result: root
			};
		}
		//endregion
		//region tagNumber
		if (inputSchema.idBlock.hasOwnProperty("tagNumber") === false) {
			return {
				verified: false,
				result: { error: "Wrong ASN.1 schema" }
			};
		}

		if (inputSchema.idBlock.tagNumber !== inputData.idBlock.tagNumber) {
			return {
				verified: false,
				result: root
			};
		}
		//endregion
		//region isConstructed
		if (inputSchema.idBlock.hasOwnProperty("isConstructed") === false) {
			return {
				verified: false,
				result: { error: "Wrong ASN.1 schema" }
			};
		}

		if (inputSchema.idBlock.isConstructed !== inputData.idBlock.isConstructed) {
			return {
				verified: false,
				result: root
			};
		}
		//endregion
		//region isHexOnly
		if ("isHexOnly" in inputSchema.idBlock === false) // Since 'isHexOnly' is an inhirited property
			{
				return {
					verified: false,
					result: { error: "Wrong ASN.1 schema" }
				};
			}

		if (inputSchema.idBlock.isHexOnly !== inputData.idBlock.isHexOnly) {
			return {
				verified: false,
				result: root
			};
		}
		//endregion
		//region valueHex
		if (inputSchema.idBlock.isHexOnly === true) {
			if ("valueHex" in inputSchema.idBlock === false) // Since 'valueHex' is an inhirited property
				{
					return {
						verified: false,
						result: { error: "Wrong ASN.1 schema" }
					};
				}

			var schemaView = new Uint8Array(inputSchema.idBlock.valueHex);
			var asn1View = new Uint8Array(inputData.idBlock.valueHex);

			if (schemaView.length !== asn1View.length) {
				return {
					verified: false,
					result: root
				};
			}

			for (var i = 0; i < schemaView.length; i++) {
				if (schemaView[i] !== asn1View[1]) {
					return {
						verified: false,
						result: root
					};
				}
			}
		}
		//endregion
		//endregion

		//region Add named component of ASN.1 schema
		if (inputSchema.hasOwnProperty("name")) {
			inputSchema.name = inputSchema.name.replace(/^\s+|\s+$/g, "");
			if (inputSchema.name !== "") root[inputSchema.name] = inputData;
		}
		//endregion

		//region Getting next ASN.1 block for comparition
		if (inputSchema.idBlock.isConstructed === true) {
			var admission = 0;
			var _result2 = { verified: false };

			var maxLength = inputSchema.valueBlock.value.length;

			if (maxLength > 0) {
				if (inputSchema.valueBlock.value[0] instanceof Repeated) maxLength = inputData.valueBlock.value.length;
			}

			//region Special case when constructive value has no elements
			if (maxLength === 0) {
				return {
					verified: true,
					result: root
				};
			}
			//endregion

			//region Special case when "inputData" has no values and "inputSchema" has all optional values
			if (inputData.valueBlock.value.length === 0 && inputSchema.valueBlock.value.length !== 0) {
				var _optional = true;

				for (var _i8 = 0; _i8 < inputSchema.valueBlock.value.length; _i8++) {
					_optional = _optional && (inputSchema.valueBlock.value[_i8].optional || false);
				}if (_optional === true) {
					return {
						verified: true,
						result: root
					};
				}

				//region Delete early added name of block
				if (inputSchema.hasOwnProperty("name")) {
					inputSchema.name = inputSchema.name.replace(/^\s+|\s+$/g, "");
					if (inputSchema.name !== "") delete root[inputSchema.name];
				}
				//endregion

				root.error = "Inconsistent object length";

				return {
					verified: false,
					result: root
				};
			}
			//endregion

			for (var _i9 = 0; _i9 < maxLength; _i9++) {
				//region Special case when there is an "optional" element of ASN.1 schema at the end
				if (_i9 - admission >= inputData.valueBlock.value.length) {
					if (inputSchema.valueBlock.value[_i9].optional === false) {
						var _result3 = {
							verified: false,
							result: root
						};

						root.error = "Inconsistent length between ASN.1 data and schema";

						//region Delete early added name of block
						if (inputSchema.hasOwnProperty("name")) {
							inputSchema.name = inputSchema.name.replace(/^\s+|\s+$/g, "");
							if (inputSchema.name !== "") {
								delete root[inputSchema.name];
								_result3.name = inputSchema.name;
							}
						}
						//endregion

						return _result3;
					}
				}
				//endregion
				else {
						//region Special case for Repeated type of ASN.1 schema element
						if (inputSchema.valueBlock.value[0] instanceof Repeated) {
							_result2 = compareSchema(root, inputData.valueBlock.value[_i9], inputSchema.valueBlock.value[0].value);
							if (_result2.verified === false) {
								if (inputSchema.valueBlock.value[0].optional === true) admission++;else {
									//region Delete early added name of block
									if (inputSchema.hasOwnProperty("name")) {
										inputSchema.name = inputSchema.name.replace(/^\s+|\s+$/g, "");
										if (inputSchema.name !== "") delete root[inputSchema.name];
									}
									//endregion

									return _result2;
								}
							}

							if ("name" in inputSchema.valueBlock.value[0] && inputSchema.valueBlock.value[0].name.length > 0) {
								var arrayRoot = {};

								if ("local" in inputSchema.valueBlock.value[0] && inputSchema.valueBlock.value[0].local === true) arrayRoot = inputData;else arrayRoot = root;

								if (typeof arrayRoot[inputSchema.valueBlock.value[0].name] === "undefined") arrayRoot[inputSchema.valueBlock.value[0].name] = [];

								arrayRoot[inputSchema.valueBlock.value[0].name].push(inputData.valueBlock.value[_i9]);
							}
						}
						//endregion
						else {
								_result2 = compareSchema(root, inputData.valueBlock.value[_i9 - admission], inputSchema.valueBlock.value[_i9]);
								if (_result2.verified === false) {
									if (inputSchema.valueBlock.value[_i9].optional === true) admission++;else {
										//region Delete early added name of block
										if (inputSchema.hasOwnProperty("name")) {
											inputSchema.name = inputSchema.name.replace(/^\s+|\s+$/g, "");
											if (inputSchema.name !== "") delete root[inputSchema.name];
										}
										//endregion

										return _result2;
									}
								}
							}
					}
			}

			if (_result2.verified === false) // The situation may take place if last element is "optional" and verification failed
				{
					var _result4 = {
						verified: false,
						result: root
					};

					//region Delete early added name of block
					if (inputSchema.hasOwnProperty("name")) {
						inputSchema.name = inputSchema.name.replace(/^\s+|\s+$/g, "");
						if (inputSchema.name !== "") {
							delete root[inputSchema.name];
							_result4.name = inputSchema.name;
						}
					}
					//endregion

					return _result4;
				}

			return {
				verified: true,
				result: root
			};
		}
		//endregion
		//region Ability to parse internal value for primitive-encoded value (value of OctetString, for example)
		if ("primitiveSchema" in inputSchema && "valueHex" in inputData.valueBlock) {
			//region Decoding of raw ASN.1 data
			var asn1 = fromBER(inputData.valueBlock.valueHex);
			if (asn1.offset === -1) {
				var _result5 = {
					verified: false,
					result: asn1.result
				};

				//region Delete early added name of block
				if (inputSchema.hasOwnProperty("name")) {
					inputSchema.name = inputSchema.name.replace(/^\s+|\s+$/g, "");
					if (inputSchema.name !== "") {
						delete root[inputSchema.name];
						_result5.name = inputSchema.name;
					}
				}
				//endregion

				return _result5;
			}
			//endregion

			return compareSchema(root, asn1.result, inputSchema.primitiveSchema);
		}

		return {
			verified: true,
			result: root
		};
		//endregion
	}
	//**************************************************************************************
	//noinspection JSUnusedGlobalSymbols
	/**
  * ASN.1 schema verification for ArrayBuffer data
  * @param {!ArrayBuffer} inputBuffer Input BER-encoded ASN.1 data
  * @param {!Object} inputSchema Input ASN.1 schema to verify against to
  * @return {{verified: boolean}|{verified:boolean, result: Object}}
  */

	//**************************************************************************************
	//endregion
	//**************************************************************************************
	//region Major function converting JSON to ASN.1 objects
	//**************************************************************************************
	//noinspection JSUnusedGlobalSymbols
	/**
  * Converting from JSON to ASN.1 objects
  * @param {string|Object} json JSON string or object to convert to ASN.1 objects
  */

	//**************************************************************************************
	//endregion
	//**************************************************************************************

	//**************************************************************************************
	/**
  * Class from RFC5280
  */

	var AlgorithmIdentifier = function () {
		//**********************************************************************************
		/**
   * Constructor for AlgorithmIdentifier class
   * @param {Object} [parameters={}]
   * @property {Object} [schema] asn1js parsed value
   * @property {string} [algorithmId] ObjectIdentifier for algorithm (string representation)
   */
		function AlgorithmIdentifier() {
			var parameters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

			_classCallCheck(this, AlgorithmIdentifier);

			//region Internal properties of the object
			/**
    * @type {string}
    * @description ObjectIdentifier for algorithm (string representation)
    */
			this.algorithmId = getParametersValue(parameters, "algorithmId", AlgorithmIdentifier.defaultValues("algorithmId"));

			if ("algorithmParams" in parameters)
				/**
     * @type {Object}
     * @description Any algorithm parameters
     */
				this.algorithmParams = getParametersValue(parameters, "algorithmParams", AlgorithmIdentifier.defaultValues("algorithmParams"));
			//endregion

			//region If input argument array contains "schema" for this object
			if ("schema" in parameters) this.fromSchema(parameters.schema);
			//endregion
		}
		//**********************************************************************************
		/**
   * Return default values for all class members
   * @param {string} memberName String name for a class member
   */


		_createClass(AlgorithmIdentifier, [{
			key: 'fromSchema',

			//**********************************************************************************
			/**
    * Convert parsed asn1js object into current class
    * @param {!Object} schema
    */
			value: function fromSchema(schema) {
				//region Check the schema is valid
				/**
     * @type {{verified: boolean}|{verified: boolean, result: {algorithm: Object, params: Object}}}
     */
				var asn1 = compareSchema(schema, schema, AlgorithmIdentifier.schema({
					names: {
						algorithmIdentifier: "algorithm",
						algorithmParams: "params"
					}
				}));

				if (asn1.verified === false) throw new Error("Object's schema was not verified against input data for AlgorithmIdentifier");
				//endregion

				//region Get internal properties from parsed schema
				this.algorithmId = asn1.result.algorithm.valueBlock.toString();
				if ("params" in asn1.result) this.algorithmParams = asn1.result.params;
				//endregion
			}
			//**********************************************************************************
			/**
    * Convert current object to asn1js object and set correct values
    * @returns {Object} asn1js object
    */

		}, {
			key: 'toSchema',
			value: function toSchema() {
				//region Create array for output sequence
				var outputArray = [];

				outputArray.push(new ObjectIdentifier$1({ value: this.algorithmId }));
				if ("algorithmParams" in this && this.algorithmParams instanceof Any$1 === false) outputArray.push(this.algorithmParams);
				//endregion

				//region Construct and return new ASN.1 schema for this object
				return new Sequence({
					value: outputArray
				});
				//endregion
			}
			//**********************************************************************************
			/**
    * Convertion for the class to JSON object
    * @returns {Object}
    */

		}, {
			key: 'toJSON',
			value: function toJSON() {
				var object = {
					algorithmId: this.algorithmId
				};

				if ("algorithmParams" in this && this.algorithmParams instanceof Any$1 === false) object.algorithmParams = this.algorithmParams.toJSON();

				return object;
			}
			//**********************************************************************************
			/**
    * Check that two "AlgorithmIdentifiers" are equal
    * @param {AlgorithmIdentifier} algorithmIdentifier
    * @returns {boolean}
    */

		}, {
			key: 'isEqual',
			value: function isEqual(algorithmIdentifier) {
				//region Check input type
				if (algorithmIdentifier instanceof AlgorithmIdentifier === false) return false;
				//endregion

				//region Check "algorithm_id"
				if (this.algorithmId !== algorithmIdentifier.algorithmId) return false;
				//endregion

				//region Check "algorithm_params"
				if ("algorithmParams" in this) {
					if ("algorithmParams" in algorithmIdentifier) return JSON.stringify(this.algorithmParams) === JSON.stringify(algorithmIdentifier.algorithmParams);

					return false;
				}

				if ("algorithmParams" in algorithmIdentifier) return false;
				//endregion

				return true;
			}
			//**********************************************************************************

		}], [{
			key: 'defaultValues',
			value: function defaultValues(memberName) {
				switch (memberName) {
					case "algorithmId":
						return "";
					case "algorithmParams":
						return new Any$1();
					default:
						throw new Error('Invalid member name for AlgorithmIdentifier class: ' + memberName);
				}
			}
			//**********************************************************************************
			/**
    * Compare values with default values for all class members
    * @param {string} memberName String name for a class member
    * @param {*} memberValue Value to compare with default value
    */

		}, {
			key: 'compareWithDefault',
			value: function compareWithDefault(memberName, memberValue) {
				switch (memberName) {
					case "algorithmId":
						return memberValue === "";
					case "algorithmParams":
						return memberValue instanceof Any$1;
					default:
						throw new Error('Invalid member name for AlgorithmIdentifier class: ' + memberName);
				}
			}
			//**********************************************************************************
			/**
    * Return value of asn1js schema for current class
    * @param {Object} parameters Input parameters for the schema
    * @returns {Object} asn1js schema object
    */

		}, {
			key: 'schema',
			value: function schema() {
				var parameters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

				//AlgorithmIdentifier  ::=  Sequence  {
				//    algorithm               OBJECT IDENTIFIER,
				//    parameters              ANY DEFINED BY algorithm OPTIONAL  }

				/**
     * @type {Object}
     * @property {string} algorithmIdentifier ObjectIdentifier for the algorithm
     * @property {string} algorithmParams Any algorithm parameters
     */
				var names = getParametersValue(parameters, "names", {});

				return new Sequence({
					name: names.blockName || "",
					optional: names.optional || false,
					value: [new ObjectIdentifier$1({ name: names.algorithmIdentifier || "" }), new Any$1({ name: names.algorithmParams || "", optional: true })]
				});
			}
		}]);

		return AlgorithmIdentifier;
	}();
	//**************************************************************************************

	//**************************************************************************************


	var RSASSAPSSParams = function () {
		//**********************************************************************************
		/**
   * Constructor for RSASSAPSSParams class
   * @param {Object} [parameters={}]
   * @property {Object} [schema] asn1js parsed value
   */
		function RSASSAPSSParams() {
			var parameters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

			_classCallCheck(this, RSASSAPSSParams);

			//region Internal properties of the object
			/**
    * @type {AlgorithmIdentifier}
    * @description Algorithms of hashing (DEFAULT sha1)
    */
			this.hashAlgorithm = getParametersValue(parameters, "hashAlgorithm", RSASSAPSSParams.defaultValues("hashAlgorithm"));
			/**
    * @type {AlgorithmIdentifier}
    * @description Algorithm of "mask generaion function (MGF)" (DEFAULT mgf1SHA1)
    */
			this.maskGenAlgorithm = getParametersValue(parameters, "maskGenAlgorithm", RSASSAPSSParams.defaultValues("maskGenAlgorithm"));
			/**
    * @type {number}
    * @description Salt length (DEFAULT 20)
    */
			this.saltLength = getParametersValue(parameters, "saltLength", RSASSAPSSParams.defaultValues("saltLength"));
			/**
    * @type {number}
    * @description (DEFAULT 1)
    */
			this.trailerField = getParametersValue(parameters, "trailerField", RSASSAPSSParams.defaultValues("trailerField"));
			//endregion

			//region If input argument array contains "schema" for this object
			if ("schema" in parameters) this.fromSchema(parameters.schema);
			//endregion
		}
		//**********************************************************************************
		/**
   * Return default values for all class members
   * @param {string} memberName String name for a class member
   */


		_createClass(RSASSAPSSParams, [{
			key: 'fromSchema',

			//**********************************************************************************
			/**
    * Convert parsed asn1js object into current class
    * @param {!Object} schema
    */
			value: function fromSchema(schema) {
				//region Check the schema is valid
				var asn1 = compareSchema(schema, schema, RSASSAPSSParams.schema({
					names: {
						hashAlgorithm: {
							names: {
								blockName: "hashAlgorithm"
							}
						},
						maskGenAlgorithm: {
							names: {
								blockName: "maskGenAlgorithm"
							}
						},
						saltLength: "saltLength",
						trailerField: "trailerField"
					}
				}));

				if (asn1.verified === false) throw new Error("Object's schema was not verified against input data for RSASSA_PSS_params");
				//endregion

				//region Get internal properties from parsed schema
				if ("hashAlgorithm" in asn1.result) this.hashAlgorithm = new AlgorithmIdentifier({ schema: asn1.result.hashAlgorithm });

				if ("maskGenAlgorithm" in asn1.result) this.maskGenAlgorithm = new AlgorithmIdentifier({ schema: asn1.result.maskGenAlgorithm });

				if ("saltLength" in asn1.result) this.saltLength = asn1.result.saltLength.valueBlock.valueDec;

				if ("trailerField" in asn1.result) this.trailerField = asn1.result.trailerField.valueBlock.valueDec;
				//endregion
			}
			//**********************************************************************************
			/**
    * Convert current object to asn1js object and set correct values
    * @returns {Object} asn1js object
    */

		}, {
			key: 'toSchema',
			value: function toSchema() {
				//region Create array for output sequence
				var outputArray = [];

				if (!this.hashAlgorithm.isEqual(RSASSAPSSParams.defaultValues("hashAlgorithm"))) {
					outputArray.push(new Constructed({
						idBlock: {
							tagClass: 3, // CONTEXT-SPECIFIC
							tagNumber: 0 // [0]
						},
						value: [this.hashAlgorithm.toSchema()]
					}));
				}

				if (!this.maskGenAlgorithm.isEqual(RSASSAPSSParams.defaultValues("maskGenAlgorithm"))) {
					outputArray.push(new Constructed({
						idBlock: {
							tagClass: 3, // CONTEXT-SPECIFIC
							tagNumber: 1 // [1]
						},
						value: [this.maskGenAlgorithm.toSchema()]
					}));
				}

				if (this.saltLength !== RSASSAPSSParams.defaultValues("saltLength")) {
					outputArray.push(new Constructed({
						idBlock: {
							tagClass: 3, // CONTEXT-SPECIFIC
							tagNumber: 2 // [2]
						},
						value: [new Integer({ value: this.saltLength })]
					}));
				}

				if (this.trailerField !== RSASSAPSSParams.defaultValues("trailerField")) {
					outputArray.push(new Constructed({
						idBlock: {
							tagClass: 3, // CONTEXT-SPECIFIC
							tagNumber: 3 // [3]
						},
						value: [new Integer({ value: this.trailerField })]
					}));
				}
				//endregion

				//region Construct and return new ASN.1 schema for this object
				return new Sequence({
					value: outputArray
				});
				//endregion
			}
			//**********************************************************************************
			/**
    * Convertion for the class to JSON object
    * @returns {Object}
    */

		}, {
			key: 'toJSON',
			value: function toJSON() {
				var object = {};

				if (!this.hashAlgorithm.isEqual(RSASSAPSSParams.defaultValues("hashAlgorithm"))) object.hashAlgorithm = this.hashAlgorithm.toJSON();

				if (!this.maskGenAlgorithm.isEqual(RSASSAPSSParams.defaultValues("maskGenAlgorithm"))) object.maskGenAlgorithm = this.maskGenAlgorithm.toJSON();

				if (this.saltLength !== RSASSAPSSParams.defaultValues("saltLength")) object.saltLength = this.saltLength;

				if (this.trailerField !== RSASSAPSSParams.defaultValues("trailerField")) object.trailerField = this.trailerField;

				return object;
			}
			//**********************************************************************************

		}], [{
			key: 'defaultValues',
			value: function defaultValues(memberName) {
				switch (memberName) {
					case "hashAlgorithm":
						return new AlgorithmIdentifier({
							algorithmId: "1.3.14.3.2.26", // SHA-1
							algorithmParams: new Null()
						});
					case "maskGenAlgorithm":
						return new AlgorithmIdentifier({
							algorithmId: "1.2.840.113549.1.1.8", // MGF1
							algorithmParams: new AlgorithmIdentifier({
								algorithmId: "1.3.14.3.2.26", // SHA-1
								algorithmParams: new Null()
							}).toSchema()
						});
					case "saltLength":
						return 20;
					case "trailerField":
						return 1;
					default:
						throw new Error('Invalid member name for RSASSAPSSParams class: ' + memberName);
				}
			}
			//**********************************************************************************
			/**
    * Return value of asn1js schema for current class
    * @param {Object} parameters Input parameters for the schema
    * @returns {Object} asn1js schema object
    */

		}, {
			key: 'schema',
			value: function schema() {
				var parameters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

				//RSASSA-PSS-params  ::=  Sequence  {
				//    hashAlgorithm      [0] HashAlgorithm DEFAULT sha1Identifier,
				//    maskGenAlgorithm   [1] MaskGenAlgorithm DEFAULT mgf1SHA1Identifier,
				//    saltLength         [2] Integer DEFAULT 20,
				//    trailerField       [3] Integer DEFAULT 1  }

				/**
     * @type {Object}
     * @property {string} [blockName]
     * @property {string} [hashAlgorithm]
     * @property {string} [maskGenAlgorithm]
     * @property {string} [saltLength]
     * @property {string} [trailerField]
     */
				var names = getParametersValue(parameters, "names", {});

				return new Sequence({
					name: names.blockName || "",
					value: [new Constructed({
						idBlock: {
							tagClass: 3, // CONTEXT-SPECIFIC
							tagNumber: 0 // [0]
						},
						optional: true,
						value: [AlgorithmIdentifier.schema(names.hashAlgorithm || {})]
					}), new Constructed({
						idBlock: {
							tagClass: 3, // CONTEXT-SPECIFIC
							tagNumber: 1 // [1]
						},
						optional: true,
						value: [AlgorithmIdentifier.schema(names.maskGenAlgorithm || {})]
					}), new Constructed({
						idBlock: {
							tagClass: 3, // CONTEXT-SPECIFIC
							tagNumber: 2 // [2]
						},
						optional: true,
						value: [new Integer({ name: names.saltLength || "" })]
					}), new Constructed({
						idBlock: {
							tagClass: 3, // CONTEXT-SPECIFIC
							tagNumber: 3 // [3]
						},
						optional: true,
						value: [new Integer({ name: names.trailerField || "" })]
					})]
				});
			}
		}]);

		return RSASSAPSSParams;
	}();
	//**************************************************************************************

	//**************************************************************************************


	var ECPublicKey = function () {
		//**********************************************************************************
		/**
   * Constructor for ECCPublicKey class
   * @param {Object} [parameters={}]
   * @property {Object} [schema] asn1js parsed value
   */
		function ECPublicKey() {
			var parameters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

			_classCallCheck(this, ECPublicKey);

			//region Internal properties of the object
			/**
    * @type {ArrayBuffer}
    * @description type
    */
			this.x = getParametersValue(parameters, "x", ECPublicKey.defaultValues("x"));
			/**
    * @type {ArrayBuffer}
    * @description values
    */
			this.y = getParametersValue(parameters, "y", ECPublicKey.defaultValues("y"));
			/**
    * @type {string}
    * @description namedCurve
    */
			this.namedCurve = getParametersValue(parameters, "namedCurve", ECPublicKey.defaultValues("namedCurve"));
			//endregion

			//region If input argument array contains "schema" for this object
			if ("schema" in parameters) this.fromSchema(parameters.schema);
			//endregion
			//region If input argument array contains "json" for this object
			if ("json" in parameters) this.fromJSON(parameters.json);
			//endregion
		}
		//**********************************************************************************
		/**
   * Return default values for all class members
   * @param {string} memberName String name for a class member
   */


		_createClass(ECPublicKey, [{
			key: 'fromSchema',

			//**********************************************************************************
			/**
    * Convert ArrayBuffer into current class
    * @param {!ArrayBuffer} schema Special case: schema is an ArrayBuffer
    */
			value: function fromSchema(schema) {
				//region Check the schema is valid
				if (schema instanceof ArrayBuffer === false) throw new Error("Object's schema was not verified against input data for ECPublicKey");

				var view = new Uint8Array(schema);
				if (view[0] !== 0x04) throw new Error("Object's schema was not verified against input data for ECPublicKey");
				//endregion

				//region Get internal properties from parsed schema
				var coordinateLength = void 0;

				switch (this.namedCurve) {
					case "1.2.840.10045.3.1.7":
						// P-256
						coordinateLength = 32;
						break;
					case "1.3.132.0.34":
						// P-384
						coordinateLength = 48;
						break;
					case "1.3.132.0.35":
						// P-521
						coordinateLength = 66;
						break;
					default:
						throw new Error('Incorrect curve OID: ' + this.namedCurve);
				}

				if (schema.byteLength !== coordinateLength * 2 + 1) throw new Error("Object's schema was not verified against input data for ECPublicKey");

				this.x = schema.slice(1, coordinateLength + 1);
				this.y = schema.slice(1 + coordinateLength, coordinateLength * 2 + 1);
				//endregion
			}
			//**********************************************************************************
			/**
    * Convert current object to asn1js object and set correct values
    * @returns {Object} asn1js object
    */

		}, {
			key: 'toSchema',
			value: function toSchema() {
				return new RawData({ data: utilConcatBuf(new Uint8Array([0x04]).buffer, this.x, this.y)
				});
			}
			//**********************************************************************************
			/**
    * Convertion for the class to JSON object
    * @returns {Object}
    */

		}, {
			key: 'toJSON',
			value: function toJSON() {
				var crvName = "";

				switch (this.namedCurve) {
					case "1.2.840.10045.3.1.7":
						// P-256
						crvName = "P-256";
						break;
					case "1.3.132.0.34":
						// P-384
						crvName = "P-384";
						break;
					case "1.3.132.0.35":
						// P-521
						crvName = "P-521";
						break;
					default:
				}

				return {
					crv: crvName,
					x: toBase64(arrayBufferToString(this.x), true, true),
					y: toBase64(arrayBufferToString(this.y), true, true)
				};
			}
			//**********************************************************************************
			/**
    * Convert JSON value into current object
    * @param {Object} json
    */

		}, {
			key: 'fromJSON',
			value: function fromJSON(json) {
				var coodinateLength = 0;

				if ("crv" in json) {
					switch (json.crv.toUpperCase()) {
						case "P-256":
							this.namedCurve = "1.2.840.10045.3.1.7";
							coodinateLength = 32;
							break;
						case "P-384":
							this.namedCurve = "1.3.132.0.34";
							coodinateLength = 48;
							break;
						case "P-521":
							this.namedCurve = "1.3.132.0.35";
							coodinateLength = 66;
							break;
						default:
					}
				} else throw new Error("Absent mandatory parameter \"crv\"");

				if ("x" in json) this.x = stringToArrayBuffer(fromBase64(json.x, true)).slice(0, coodinateLength);else throw new Error("Absent mandatory parameter \"x\"");

				if ("y" in json) this.y = stringToArrayBuffer(fromBase64(json.y, true)).slice(0, coodinateLength);else throw new Error("Absent mandatory parameter \"y\"");
			}
			//**********************************************************************************

		}], [{
			key: 'defaultValues',
			value: function defaultValues(memberName) {
				switch (memberName) {
					case "x":
					case "y":
						return new ArrayBuffer(0);
					case "namedCurve":
						return "";
					default:
						throw new Error('Invalid member name for ECCPublicKey class: ' + memberName);
				}
			}
			//**********************************************************************************
			/**
    * Compare values with default values for all class members
    * @param {string} memberName String name for a class member
    * @param {*} memberValue Value to compare with default value
    */

		}, {
			key: 'compareWithDefault',
			value: function compareWithDefault(memberName, memberValue) {
				switch (memberName) {
					case "x":
					case "y":
						return isEqualBuffer(memberValue, ECPublicKey.defaultValues(memberName));
					case "namedCurve":
						return memberValue === "";
					default:
						throw new Error('Invalid member name for ECCPublicKey class: ' + memberName);
				}
			}
			//**********************************************************************************
			/**
    * Return value of asn1js schema for current class
    * @param {Object} parameters Input parameters for the schema
    * @returns {Object} asn1js schema object
    */

		}, {
			key: 'schema',
			value: function schema() {
				var parameters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

				return new RawData();
			}
		}]);

		return ECPublicKey;
	}();
	//**************************************************************************************

	//**************************************************************************************


	var RSAPublicKey = function () {
		//**********************************************************************************
		/**
   * Constructor for RSAPublicKey class
   * @param {Object} [parameters={}]
   * @property {Object} [schema] asn1js parsed value
   * @property {Integer} [modulus]
   * @property {Integer} [publicExponent]
   */
		function RSAPublicKey() {
			var parameters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

			_classCallCheck(this, RSAPublicKey);

			//region Internal properties of the object
			/**
    * @type {Integer}
    * @description Modulus part of RSA public key
    */
			this.modulus = getParametersValue(parameters, "modulus", RSAPublicKey.defaultValues("modulus"));
			/**
    * @type {Integer}
    * @description Public exponent of RSA public key
    */
			this.publicExponent = getParametersValue(parameters, "publicExponent", RSAPublicKey.defaultValues("publicExponent"));
			//endregion

			//region If input argument array contains "schema" for this object
			if ("schema" in parameters) this.fromSchema(parameters.schema);
			//endregion
			//region If input argument array contains "json" for this object
			if ("json" in parameters) this.fromJSON(parameters.json);
			//endregion
		}
		//**********************************************************************************
		/**
   * Return default values for all class members
   * @param {string} memberName String name for a class member
   */


		_createClass(RSAPublicKey, [{
			key: 'fromSchema',

			//**********************************************************************************
			/**
    * Convert parsed asn1js object into current class
    * @param {!Object} schema
    */
			value: function fromSchema(schema) {
				//region Check the schema is valid
				var asn1 = compareSchema(schema, schema, RSAPublicKey.schema({
					names: {
						modulus: "modulus",
						publicExponent: "publicExponent"
					}
				}));

				if (asn1.verified === false) throw new Error("Object's schema was not verified against input data for RSAPublicKey");
				//endregion

				//region Get internal properties from parsed schema
				this.modulus = asn1.result.modulus.convertFromDER(256);
				this.publicExponent = asn1.result.publicExponent;
				//endregion
			}
			//**********************************************************************************
			/**
    * Convert current object to asn1js object and set correct values
    * @returns {Object} asn1js object
    */

		}, {
			key: 'toSchema',
			value: function toSchema() {
				//region Construct and return new ASN.1 schema for this object
				return new Sequence({
					value: [this.modulus.convertToDER(), this.publicExponent]
				});
				//endregion
			}
			//**********************************************************************************
			/**
    * Convertion for the class to JSON object
    * @returns {Object}
    */

		}, {
			key: 'toJSON',
			value: function toJSON() {
				return {
					n: toBase64(arrayBufferToString(this.modulus.valueBlock.valueHex), true, true),
					e: toBase64(arrayBufferToString(this.publicExponent.valueBlock.valueHex), true, true)
				};
			}
			//**********************************************************************************
			/**
    * Convert JSON value into current object
    * @param {Object} json
    */

		}, {
			key: 'fromJSON',
			value: function fromJSON(json) {
				if ("n" in json) this.modulus = new Integer({ valueHex: stringToArrayBuffer(fromBase64(json.n, true)).slice(0, 256) });else throw new Error("Absent mandatory parameter \"n\"");

				if ("e" in json) this.publicExponent = new Integer({ valueHex: stringToArrayBuffer(fromBase64(json.e, true)).slice(0, 3) });else throw new Error("Absent mandatory parameter \"e\"");
			}
			//**********************************************************************************

		}], [{
			key: 'defaultValues',
			value: function defaultValues(memberName) {
				switch (memberName) {
					case "modulus":
						return new Integer();
					case "publicExponent":
						return new Integer();
					default:
						throw new Error('Invalid member name for RSAPublicKey class: ' + memberName);
				}
			}
			//**********************************************************************************
			/**
    * Return value of asn1js schema for current class
    * @param {Object} parameters Input parameters for the schema
    * @returns {Object} asn1js schema object
    */

		}, {
			key: 'schema',
			value: function schema() {
				var parameters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

				//RSAPublicKey ::= Sequence {
				//    modulus           Integer,  -- n
				//    publicExponent    Integer   -- e
				//}

				/**
     * @type {Object}
     * @property {string} utcTimeName Name for "utcTimeName" choice
     * @property {string} generalTimeName Name for "generalTimeName" choice
     */
				var names = getParametersValue(parameters, "names", {});

				return new Sequence({
					name: names.blockName || "",
					value: [new Integer({ name: names.modulus || "" }), new Integer({ name: names.publicExponent || "" })]
				});
			}
		}]);

		return RSAPublicKey;
	}();
	//**************************************************************************************

	//**************************************************************************************


	var PublicKeyInfo = function () {
		//**********************************************************************************
		/**
   * Constructor for PublicKeyInfo class
   * @param {Object} [parameters={}]
   * @property {Object} [schema] asn1js parsed value
   */
		function PublicKeyInfo() {
			var parameters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

			_classCallCheck(this, PublicKeyInfo);

			//region Internal properties of the object
			/**
    * @type {AlgorithmIdentifier}
    * @description Algorithm identifier
    */
			this.algorithm = getParametersValue(parameters, "algorithm", PublicKeyInfo.defaultValues("algorithm"));
			/**
    * @type {BitString}
    * @description Subject public key value
    */
			this.subjectPublicKey = getParametersValue(parameters, "subjectPublicKey", PublicKeyInfo.defaultValues("subjectPublicKey"));

			if ("parsedKey" in parameters)
				/**
     * @type {ECPublicKey|RSAPublicKey}
     * @description Parsed public key value
     */
				this.parsedKey = getParametersValue(parameters, "parsedKey", PublicKeyInfo.defaultValues("parsedKey"));
			//endregion

			//region If input argument array contains "schema" for this object
			if ("schema" in parameters) this.fromSchema(parameters.schema);
			//endregion
			//region If input argument array contains "json" for this object
			if ("json" in parameters) this.fromJSON(parameters.json);
			//endregion
		}
		//**********************************************************************************
		/**
   * Return default values for all class members
   * @param {string} memberName String name for a class member
   */


		_createClass(PublicKeyInfo, [{
			key: 'fromSchema',

			//**********************************************************************************
			/**
    * Convert parsed asn1js object into current class
    * @param {!Object} schema
    */
			value: function fromSchema(schema) {
				//region Check the schema is valid
				var asn1 = compareSchema(schema, schema, PublicKeyInfo.schema({
					names: {
						algorithm: {
							names: {
								blockName: "algorithm"
							}
						},
						subjectPublicKey: "subjectPublicKey"
					}
				}));

				if (asn1.verified === false) throw new Error("Object's schema was not verified against input data for PUBLIC_KEY_INFO");
				//endregion

				//region Get internal properties from parsed schema
				this.algorithm = new AlgorithmIdentifier({ schema: asn1.result.algorithm });
				this.subjectPublicKey = asn1.result.subjectPublicKey;

				switch (this.algorithm.algorithmId) {
					case "1.2.840.10045.2.1":
						// ECDSA
						if ("algorithmParams" in this.algorithm) {
							if (this.algorithm.algorithmParams instanceof ObjectIdentifier$1) {
								this.parsedKey = new ECPublicKey({
									namedCurve: this.algorithm.algorithmParams.valueBlock.toString(),
									schema: this.subjectPublicKey.valueBlock.valueHex
								});
							}
						}
						break;
					case "1.2.840.113549.1.1.1":
						// RSA
						{
							var publicKeyASN1 = fromBER(this.subjectPublicKey.valueBlock.valueHex);
							if (publicKeyASN1.offset !== -1) this.parsedKey = new RSAPublicKey({ schema: publicKeyASN1.result });
						}
						break;
					default:
				}
				//endregion
			}
			//**********************************************************************************
			/**
    * Convert current object to asn1js object and set correct values
    * @returns {Object} asn1js object
    */

		}, {
			key: 'toSchema',
			value: function toSchema() {
				//region Construct and return new ASN.1 schema for this object
				return new Sequence({
					value: [this.algorithm.toSchema(), this.subjectPublicKey]
				});
				//endregion
			}
			//**********************************************************************************
			/**
    * Convertion for the class to JSON object
    * @returns {Object}
    */

		}, {
			key: 'toJSON',
			value: function toJSON() {
				//region Return common value in case we do not have enough info fo making JWK
				if ("parsedKey" in this === false) {
					return {
						algorithm: this.algorithm.toJSON(),
						subjectPublicKey: this.subjectPublicKey.toJSON()
					};
				}
				//endregion

				//region Making JWK
				var jwk = {};

				switch (this.algorithm.algorithmId) {
					case "1.2.840.10045.2.1":
						// ECDSA
						jwk.kty = "EC";
						break;
					case "1.2.840.113549.1.1.1":
						// RSA
						jwk.kty = "RSA";
						break;
					default:
				}

				var publicKeyJWK = this.parsedKey.toJSON();

				var _iteratorNormalCompletion6 = true;
				var _didIteratorError6 = false;
				var _iteratorError6 = undefined;

				try {
					for (var _iterator6 = Object.keys(publicKeyJWK)[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
						var key = _step6.value;

						jwk[key] = publicKeyJWK[key];
					}
				} catch (err) {
					_didIteratorError6 = true;
					_iteratorError6 = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion6 && _iterator6.return) {
							_iterator6.return();
						}
					} finally {
						if (_didIteratorError6) {
							throw _iteratorError6;
						}
					}
				}

				return jwk;
				//endregion
			}
			//**********************************************************************************
			/**
    * Convert JSON value into current object
    * @param {Object} json
    */

		}, {
			key: 'fromJSON',
			value: function fromJSON(json) {
				if ("kty" in json) {
					switch (json.kty.toUpperCase()) {
						case "EC":
							this.parsedKey = new ECPublicKey({ json: json });

							this.algorithm = new AlgorithmIdentifier({
								algorithmId: "1.2.840.10045.2.1",
								algorithmParams: new ObjectIdentifier$1({ value: this.parsedKey.namedCurve })
							});
							break;
						case "RSA":
							this.parsedKey = new RSAPublicKey({ json: json });

							this.algorithm = new AlgorithmIdentifier({
								algorithmId: "1.2.840.113549.1.1.1",
								algorithmParams: new Null()
							});
							break;
						default:
							throw new Error('Invalid value for "kty" parameter: ' + json.kty);
					}

					this.subjectPublicKey = new BitString({ valueHex: this.parsedKey.toSchema().toBER(false) });
				}
			}
			//**********************************************************************************

		}, {
			key: 'importKey',
			value: function importKey(publicKey) {
				//region Initial variables
				var sequence = Promise.resolve();
				var _this = this;
				//endregion

				//region Initial check
				if (typeof publicKey === "undefined") return Promise.reject("Need to provide publicKey input parameter");
				//endregion

				//region Get a "crypto" extension
				var crypto = getCrypto();
				if (typeof crypto === "undefined") return Promise.reject("Unable to create WebCrypto object");
				//endregion

				//region Export public key
				sequence = sequence.then(function () {
					return crypto.exportKey("spki", publicKey);
				});
				//endregion

				//region Initialize internal variables by parsing exported value
				sequence = sequence.then(function (exportedKey) {
					var asn1 = fromBER(exportedKey);
					try {
						_this.fromSchema(asn1.result);
					} catch (exception) {
						return Promise.reject("Error during initializing object from schema");
					}

					return undefined;
				}, function (error) {
					return Promise.reject('Error during exporting public key: ' + error);
				});
				//endregion

				return sequence;
			}
			//**********************************************************************************

		}], [{
			key: 'defaultValues',
			value: function defaultValues(memberName) {
				switch (memberName) {
					case "algorithm":
						return new AlgorithmIdentifier();
					case "subjectPublicKey":
						return new BitString();
					default:
						throw new Error('Invalid member name for PublicKeyInfo class: ' + memberName);
				}
			}
			//**********************************************************************************
			/**
    * Return value of asn1js schema for current class
    * @param {Object} parameters Input parameters for the schema
    * @returns {Object} asn1js schema object
    */

		}, {
			key: 'schema',
			value: function schema() {
				var parameters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

				//SubjectPublicKeyInfo  ::=  Sequence  {
				//    algorithm            AlgorithmIdentifier,
				//    subjectPublicKey     BIT STRING  }

				/**
     * @type {Object}
     * @property {string} [blockName]
     * @property {string} [algorithm]
     * @property {string} [subjectPublicKey]
     */
				var names = getParametersValue(parameters, "names", {});

				return new Sequence({
					name: names.blockName || "",
					value: [AlgorithmIdentifier.schema(names.algorithm || {}), new BitString({ name: names.subjectPublicKey || "" })]
				});
			}
		}]);

		return PublicKeyInfo;
	}();
	//**************************************************************************************

	//**************************************************************************************


	var Attribute = function () {
		//**********************************************************************************
		/**
   * Constructor for Attribute class
   * @param {Object} [parameters={}]
   * @property {Object} [schema] asn1js parsed value
   */
		function Attribute() {
			var parameters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

			_classCallCheck(this, Attribute);

			//region Internal properties of the object
			/**
    * @type {string}
    * @description type
    */
			this.type = getParametersValue(parameters, "type", Attribute.defaultValues("type"));
			/**
    * @type {Array}
    * @description values
    */
			this.values = getParametersValue(parameters, "values", Attribute.defaultValues("values"));
			//endregion

			//region If input argument array contains "schema" for this object
			if ("schema" in parameters) this.fromSchema(parameters.schema);
			//endregion
		}
		//**********************************************************************************
		/**
   * Return default values for all class members
   * @param {string} memberName String name for a class member
   */


		_createClass(Attribute, [{
			key: 'fromSchema',

			//**********************************************************************************
			/**
    * Convert parsed asn1js object into current class
    * @param {!Object} schema
    */
			value: function fromSchema(schema) {
				//region Check the schema is valid
				var asn1 = compareSchema(schema, schema, Attribute.schema({
					names: {
						type: "type",
						values: "values"
					}
				}));

				if (asn1.verified === false) throw new Error("Object's schema was not verified against input data for ATTRIBUTE");
				//endregion

				//region Get internal properties from parsed schema
				this.type = asn1.result.type.valueBlock.toString();
				this.values = asn1.result.values;
				//endregion
			}
			//**********************************************************************************
			/**
    * Convert current object to asn1js object and set correct values
    * @returns {Object} asn1js object
    */

		}, {
			key: 'toSchema',
			value: function toSchema() {
				//region Construct and return new ASN.1 schema for this object
				return new Sequence({
					value: [new ObjectIdentifier$1({ value: this.type }), new Set({
						value: this.values
					})]
				});
				//endregion
			}
			//**********************************************************************************
			/**
    * Convertion for the class to JSON object
    * @returns {Object}
    */

		}, {
			key: 'toJSON',
			value: function toJSON() {
				return {
					type: this.type,
					values: Array.from(this.values, function (element) {
						return element.toJSON();
					})
				};
			}
			//**********************************************************************************

		}], [{
			key: 'defaultValues',
			value: function defaultValues(memberName) {
				switch (memberName) {
					case "type":
						return "";
					case "values":
						return [];
					default:
						throw new Error('Invalid member name for Attribute class: ' + memberName);
				}
			}
			//**********************************************************************************
			/**
    * Compare values with default values for all class members
    * @param {string} memberName String name for a class member
    * @param {*} memberValue Value to compare with default value
    */

		}, {
			key: 'compareWithDefault',
			value: function compareWithDefault(memberName, memberValue) {
				switch (memberName) {
					case "type":
						return memberValue === "";
					case "values":
						return memberValue.length === 0;
					default:
						throw new Error('Invalid member name for Attribute class: ' + memberName);
				}
			}
			//**********************************************************************************
			/**
    * Return value of asn1js schema for current class
    * @param {Object} parameters Input parameters for the schema
    * @returns {Object} asn1js schema object
    */

		}, {
			key: 'schema',
			value: function schema() {
				var parameters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

				// Attribute { ATTRIBUTE:IOSet } ::= SEQUENCE {
				//    type   ATTRIBUTE.&id({IOSet}),
				//    values SET SIZE(1..MAX) OF ATTRIBUTE.&Type({IOSet}{@type})
				//}

				/**
     * @type {Object}
     * @property {string} [blockName]
     * @property {string} [type]
     * @property {string} [setName]
     * @property {string} [values]
     */
				var names = getParametersValue(parameters, "names", {});

				return new Sequence({
					name: names.blockName || "",
					value: [new ObjectIdentifier$1({ name: names.type || "" }), new Set({
						name: names.setName || "",
						value: [new Repeated({
							name: names.values || "",
							value: new Any$1()
						})]
					})]
				});
			}
		}]);

		return Attribute;
	}();
	//**************************************************************************************

	//**************************************************************************************


	var ECPrivateKey = function () {
		//**********************************************************************************
		/**
   * Constructor for ECCPrivateKey class
   * @param {Object} [parameters={}]
   * @property {Object} [schema] asn1js parsed value
   */
		function ECPrivateKey() {
			var parameters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

			_classCallCheck(this, ECPrivateKey);

			//region Internal properties of the object
			/**
    * @type {number}
    * @description version
    */
			this.version = getParametersValue(parameters, "version", ECPrivateKey.defaultValues("version"));
			/**
    * @type {OctetString}
    * @description privateKey
    */
			this.privateKey = getParametersValue(parameters, "privateKey", ECPrivateKey.defaultValues("privateKey"));

			if ("namedCurve" in parameters)
				/**
     * @type {string}
     * @description namedCurve
     */
				this.namedCurve = getParametersValue(parameters, "namedCurve", ECPrivateKey.defaultValues("namedCurve"));

			if ("publicKey" in parameters)
				/**
     * @type {ECPublicKey}
     * @description publicKey
     */
				this.publicKey = getParametersValue(parameters, "publicKey", ECPrivateKey.defaultValues("publicKey"));
			//endregion

			//region If input argument array contains "schema" for this object
			if ("schema" in parameters) this.fromSchema(parameters.schema);
			//endregion
			//region If input argument array contains "json" for this object
			if ("json" in parameters) this.fromJSON(parameters.json);
			//endregion
		}
		//**********************************************************************************
		/**
   * Return default values for all class members
   * @param {string} memberName String name for a class member
   */


		_createClass(ECPrivateKey, [{
			key: 'fromSchema',

			//**********************************************************************************
			/**
    * Convert parsed asn1js object into current class
    * @param {!Object} schema
    */
			value: function fromSchema(schema) {
				//region Check the schema is valid
				var asn1 = compareSchema(schema, schema, ECPrivateKey.schema({
					names: {
						version: "version",
						privateKey: "privateKey",
						namedCurve: "namedCurve",
						publicKey: "publicKey"
					}
				}));

				if (asn1.verified === false) throw new Error("Object's schema was not verified against input data for ECPrivateKey");
				//endregion

				//region Get internal properties from parsed schema
				this.version = asn1.result.version.valueBlock.valueDec;
				this.privateKey = asn1.result.privateKey;

				if ("namedCurve" in asn1.result) this.namedCurve = asn1.result.namedCurve.valueBlock.toString();

				if ("publicKey" in asn1.result) {
					var publicKeyData = { schema: asn1.result.publicKey.valueBlock.valueHex };
					if ("namedCurve" in this) publicKeyData.namedCurve = this.namedCurve;

					this.publicKey = new ECPublicKey(publicKeyData);
				}
				//endregion
			}
			//**********************************************************************************
			/**
    * Convert current object to asn1js object and set correct values
    * @returns {Object} asn1js object
    */

		}, {
			key: 'toSchema',
			value: function toSchema() {
				var outputArray = [new Integer({ value: this.version }), this.privateKey];

				if ("namedCurve" in this) {
					outputArray.push(new Constructed({
						idBlock: {
							tagClass: 3, // CONTEXT-SPECIFIC
							tagNumber: 0 // [0]
						},
						value: [new ObjectIdentifier$1({ value: this.namedCurve })]
					}));
				}

				if ("publicKey" in this) {
					outputArray.push(new Constructed({
						idBlock: {
							tagClass: 3, // CONTEXT-SPECIFIC
							tagNumber: 1 // [1]
						},
						value: [new BitString({ valueHex: this.publicKey.toSchema().toBER(false) })]
					}));
				}

				return new Sequence({
					value: outputArray
				});
			}
			//**********************************************************************************
			/**
    * Convertion for the class to JSON object
    * @returns {Object}
    */

		}, {
			key: 'toJSON',
			value: function toJSON() {
				if ("namedCurve" in this === false || ECPrivateKey.compareWithDefault("namedCurve", this.namedCurve)) throw new Error("Not enough information for making JSON: absent \"namedCurve\" value");

				var crvName = "";

				switch (this.namedCurve) {
					case "1.2.840.10045.3.1.7":
						// P-256
						crvName = "P-256";
						break;
					case "1.3.132.0.34":
						// P-384
						crvName = "P-384";
						break;
					case "1.3.132.0.35":
						// P-521
						crvName = "P-521";
						break;
					default:
				}

				var privateKeyJSON = {
					crv: crvName,
					d: toBase64(arrayBufferToString(this.privateKey.valueBlock.valueHex), true, true)
				};

				if ("publicKey" in this) {
					var publicKeyJSON = this.publicKey.toJSON();

					privateKeyJSON.x = publicKeyJSON.x;
					privateKeyJSON.y = publicKeyJSON.y;
				}

				return privateKeyJSON;
			}
			//**********************************************************************************
			/**
    * Convert JSON value into current object
    * @param {Object} json
    */

		}, {
			key: 'fromJSON',
			value: function fromJSON(json) {
				var coodinateLength = 0;

				if ("crv" in json) {
					switch (json.crv.toUpperCase()) {
						case "P-256":
							this.namedCurve = "1.2.840.10045.3.1.7";
							coodinateLength = 32;
							break;
						case "P-384":
							this.namedCurve = "1.3.132.0.34";
							coodinateLength = 48;
							break;
						case "P-521":
							this.namedCurve = "1.3.132.0.35";
							coodinateLength = 66;
							break;
						default:
					}
				} else throw new Error("Absent mandatory parameter \"crv\"");

				if ("d" in json) this.privateKey = new OctetString({ valueHex: stringToArrayBuffer(fromBase64(json.d, true)).slice(0, coodinateLength) });else throw new Error("Absent mandatory parameter \"d\"");

				if ("x" in json && "y" in json) this.publicKey = new ECPublicKey({ json: json });
			}
			//**********************************************************************************

		}], [{
			key: 'defaultValues',
			value: function defaultValues(memberName) {
				switch (memberName) {
					case "version":
						return 1;
					case "privateKey":
						return new OctetString();
					case "namedCurve":
						return "";
					case "publicKey":
						return new ECPublicKey();
					default:
						throw new Error('Invalid member name for ECCPrivateKey class: ' + memberName);
				}
			}
			//**********************************************************************************
			/**
    * Compare values with default values for all class members
    * @param {string} memberName String name for a class member
    * @param {*} memberValue Value to compare with default value
    */

		}, {
			key: 'compareWithDefault',
			value: function compareWithDefault(memberName, memberValue) {
				switch (memberName) {
					case "version":
						return memberValue === ECPrivateKey.defaultValues(memberName);
					case "privateKey":
						return memberValue.isEqual(ECPrivateKey.defaultValues(memberName));
					case "namedCurve":
						return memberValue === "";
					case "publicKey":
						return ECPublicKey.compareWithDefault("namedCurve", memberValue.namedCurve) && ECPublicKey.compareWithDefault("x", memberValue.x) && ECPublicKey.compareWithDefault("y", memberValue.y);
					default:
						throw new Error('Invalid member name for ECCPrivateKey class: ' + memberName);
				}
			}
			//**********************************************************************************
			/**
    * Return value of asn1js schema for current class
    * @param {Object} parameters Input parameters for the schema
    * @returns {Object} asn1js schema object
    */

		}, {
			key: 'schema',
			value: function schema() {
				var parameters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

				// ECPrivateKey ::= SEQUENCE {
				// version        INTEGER { ecPrivkeyVer1(1) } (ecPrivkeyVer1),
				// privateKey     OCTET STRING,
				// parameters [0] ECParameters {{ NamedCurve }} OPTIONAL,
				// publicKey  [1] BIT STRING OPTIONAL
				// }

				/**
     * @type {Object}
     * @property {string} [blockName]
     * @property {string} [version]
     * @property {string} [privateKey]
     * @property {string} [namedCurve]
     * @property {string} [publicKey]
     */
				var names = getParametersValue(parameters, "names", {});

				return new Sequence({
					name: names.blockName || "",
					value: [new Integer({ name: names.version || "" }), new OctetString({ name: names.privateKey || "" }), new Constructed({
						optional: true,
						idBlock: {
							tagClass: 3, // CONTEXT-SPECIFIC
							tagNumber: 0 // [0]
						},
						value: [new ObjectIdentifier$1({ name: names.namedCurve || "" })]
					}), new Constructed({
						optional: true,
						idBlock: {
							tagClass: 3, // CONTEXT-SPECIFIC
							tagNumber: 1 // [1]
						},
						value: [new BitString({ name: names.publicKey || "" })]
					})]
				});
			}
		}]);

		return ECPrivateKey;
	}();
	//**************************************************************************************

	//**************************************************************************************


	var OtherPrimeInfo = function () {
		//**********************************************************************************
		/**
   * Constructor for OtherPrimeInfo class
   * @param {Object} [parameters={}]
   * @property {Object} [schema] asn1js parsed value
   */
		function OtherPrimeInfo() {
			var parameters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

			_classCallCheck(this, OtherPrimeInfo);

			//region Internal properties of the object
			/**
    * @type {Integer}
    * @description prime
    */
			this.prime = getParametersValue(parameters, "prime", OtherPrimeInfo.defaultValues("prime"));
			/**
    * @type {Integer}
    * @description exponent
    */
			this.exponent = getParametersValue(parameters, "exponent", OtherPrimeInfo.defaultValues("exponent"));
			/**
    * @type {Integer}
    * @description coefficient
    */
			this.coefficient = getParametersValue(parameters, "coefficient", OtherPrimeInfo.defaultValues("coefficient"));
			//endregion

			//region If input argument array contains "schema" for this object
			if ("schema" in parameters) this.fromSchema(parameters.schema);
			//endregion
			//region If input argument array contains "json" for this object
			if ("json" in parameters) this.fromJSON(parameters.json);
			//endregion
		}
		//**********************************************************************************
		/**
   * Return default values for all class members
   * @param {string} memberName String name for a class member
   */


		_createClass(OtherPrimeInfo, [{
			key: 'fromSchema',

			//**********************************************************************************
			/**
    * Convert parsed asn1js object into current class
    * @param {!Object} schema
    */
			value: function fromSchema(schema) {
				//region Check the schema is valid
				var asn1 = compareSchema(schema, schema, OtherPrimeInfo.schema({
					names: {
						prime: "prime",
						exponent: "exponent",
						coefficient: "coefficient"
					}
				}));

				if (asn1.verified === false) throw new Error("Object's schema was not verified against input data for OtherPrimeInfo");
				//endregion

				//region Get internal properties from parsed schema
				this.prime = asn1.result.prime.convertFromDER();
				this.exponent = asn1.result.exponent.convertFromDER();
				this.coefficient = asn1.result.coefficient.convertFromDER();
				//endregion
			}
			//**********************************************************************************
			/**
    * Convert current object to asn1js object and set correct values
    * @returns {Object} asn1js object
    */

		}, {
			key: 'toSchema',
			value: function toSchema() {
				//region Construct and return new ASN.1 schema for this object
				return new Sequence({
					value: [this.prime.convertToDER(), this.exponent.convertToDER(), this.coefficient.convertToDER()]
				});
				//endregion
			}
			//**********************************************************************************
			/**
    * Convertion for the class to JSON object
    * @returns {Object}
    */

		}, {
			key: 'toJSON',
			value: function toJSON() {
				return {
					r: toBase64(arrayBufferToString(this.prime.valueBlock.valueHex), true, true),
					d: toBase64(arrayBufferToString(this.exponent.valueBlock.valueHex), true, true),
					t: toBase64(arrayBufferToString(this.coefficient.valueBlock.valueHex), true, true)
				};
			}
			//**********************************************************************************
			/**
    * Convert JSON value into current object
    * @param {Object} json
    */

		}, {
			key: 'fromJSON',
			value: function fromJSON(json) {
				if ("r" in json) this.prime = new Integer({ valueHex: stringToArrayBuffer(fromBase64(json.r, true)) });else throw new Error("Absent mandatory parameter \"r\"");

				if ("d" in json) this.exponent = new Integer({ valueHex: stringToArrayBuffer(fromBase64(json.d, true)) });else throw new Error("Absent mandatory parameter \"d\"");

				if ("t" in json) this.coefficient = new Integer({ valueHex: stringToArrayBuffer(fromBase64(json.t, true)) });else throw new Error("Absent mandatory parameter \"t\"");
			}
			//**********************************************************************************

		}], [{
			key: 'defaultValues',
			value: function defaultValues(memberName) {
				switch (memberName) {
					case "prime":
						return new Integer();
					case "exponent":
						return new Integer();
					case "coefficient":
						return new Integer();
					default:
						throw new Error('Invalid member name for OtherPrimeInfo class: ' + memberName);
				}
			}
			//**********************************************************************************
			/**
    * Return value of asn1js schema for current class
    * @param {Object} parameters Input parameters for the schema
    * @returns {Object} asn1js schema object
    */

		}, {
			key: 'schema',
			value: function schema() {
				var parameters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

				//OtherPrimeInfo ::= Sequence {
				//    prime             Integer,  -- ri
				//    exponent          Integer,  -- di
				//    coefficient       Integer   -- ti
				//}

				/**
     * @type {Object}
     * @property {string} prime
     * @property {string} exponent
     * @property {string} coefficient
     */
				var names = getParametersValue(parameters, "names", {});

				return new Sequence({
					name: names.blockName || "",
					value: [new Integer({ name: names.prime || "" }), new Integer({ name: names.exponent || "" }), new Integer({ name: names.coefficient || "" })]
				});
			}
		}]);

		return OtherPrimeInfo;
	}();
	//**************************************************************************************

	//**************************************************************************************


	var RSAPrivateKey = function () {
		//**********************************************************************************
		/**
   * Constructor for RSAPrivateKey class
   * @param {Object} [parameters={}]
   * @property {Object} [schema] asn1js parsed value
   */
		function RSAPrivateKey() {
			var parameters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

			_classCallCheck(this, RSAPrivateKey);

			//region Internal properties of the object
			/**
    * @type {number}
    * @description version
    */
			this.version = getParametersValue(parameters, "version", RSAPrivateKey.defaultValues("version"));
			/**
    * @type {Integer}
    * @description modulus
    */
			this.modulus = getParametersValue(parameters, "modulus", RSAPrivateKey.defaultValues("modulus"));
			/**
    * @type {Integer}
    * @description publicExponent
    */
			this.publicExponent = getParametersValue(parameters, "publicExponent", RSAPrivateKey.defaultValues("publicExponent"));
			/**
    * @type {Integer}
    * @description privateExponent
    */
			this.privateExponent = getParametersValue(parameters, "privateExponent", RSAPrivateKey.defaultValues("privateExponent"));
			/**
    * @type {Integer}
    * @description prime1
    */
			this.prime1 = getParametersValue(parameters, "prime1", RSAPrivateKey.defaultValues("prime1"));
			/**
    * @type {Integer}
    * @description prime2
    */
			this.prime2 = getParametersValue(parameters, "prime2", RSAPrivateKey.defaultValues("prime2"));
			/**
    * @type {Integer}
    * @description exponent1
    */
			this.exponent1 = getParametersValue(parameters, "exponent1", RSAPrivateKey.defaultValues("exponent1"));
			/**
    * @type {Integer}
    * @description exponent2
    */
			this.exponent2 = getParametersValue(parameters, "exponent2", RSAPrivateKey.defaultValues("exponent2"));
			/**
    * @type {Integer}
    * @description coefficient
    */
			this.coefficient = getParametersValue(parameters, "coefficient", RSAPrivateKey.defaultValues("coefficient"));

			if ("otherPrimeInfos" in parameters)
				/**
     * @type {Array.<OtherPrimeInfo>}
     * @description otherPrimeInfos
     */
				this.otherPrimeInfos = getParametersValue(parameters, "otherPrimeInfos", RSAPrivateKey.defaultValues("otherPrimeInfos"));
			//endregion

			//region If input argument array contains "schema" for this object
			if ("schema" in parameters) this.fromSchema(parameters.schema);
			//endregion
			//region If input argument array contains "json" for this object
			if ("json" in parameters) this.fromJSON(parameters.json);
			//endregion
		}
		//**********************************************************************************
		/**
   * Return default values for all class members
   * @param {string} memberName String name for a class member
   */


		_createClass(RSAPrivateKey, [{
			key: 'fromSchema',

			//**********************************************************************************
			/**
    * Convert parsed asn1js object into current class
    * @param {!Object} schema
    */
			value: function fromSchema(schema) {
				//region Check the schema is valid
				var asn1 = compareSchema(schema, schema, RSAPrivateKey.schema({
					names: {
						version: "version",
						modulus: "modulus",
						publicExponent: "publicExponent",
						privateExponent: "privateExponent",
						prime1: "prime1",
						prime2: "prime2",
						exponent1: "exponent1",
						exponent2: "exponent2",
						coefficient: "coefficient",
						otherPrimeInfo: {
							names: {
								blockName: "otherPrimeInfos"
							}
						}
					}
				}));

				if (asn1.verified === false) throw new Error("Object's schema was not verified against input data for RSAPrivateKey");
				//endregion

				//region Get internal properties from parsed schema
				this.version = asn1.result.version.valueBlock.valueDec;
				this.modulus = asn1.result.modulus.convertFromDER(256);
				this.publicExponent = asn1.result.publicExponent;
				this.privateExponent = asn1.result.privateExponent.convertFromDER(256);
				this.prime1 = asn1.result.prime1.convertFromDER(128);
				this.prime2 = asn1.result.prime2.convertFromDER(128);
				this.exponent1 = asn1.result.exponent1.convertFromDER(128);
				this.exponent2 = asn1.result.exponent2.convertFromDER(128);
				this.coefficient = asn1.result.coefficient.convertFromDER(128);

				if ("otherPrimeInfos" in asn1.result) this.otherPrimeInfos = Array.from(asn1.result.otherPrimeInfos, function (element) {
					return new OtherPrimeInfo({ schema: element });
				});
				//endregion
			}
			//**********************************************************************************
			/**
    * Convert current object to asn1js object and set correct values
    * @returns {Object} asn1js object
    */

		}, {
			key: 'toSchema',
			value: function toSchema() {
				//region Create array for output sequence
				var outputArray = [];

				outputArray.push(new Integer({ value: this.version }));
				outputArray.push(this.modulus.convertToDER());
				outputArray.push(this.publicExponent);
				outputArray.push(this.privateExponent.convertToDER());
				outputArray.push(this.prime1.convertToDER());
				outputArray.push(this.prime2.convertToDER());
				outputArray.push(this.exponent1.convertToDER());
				outputArray.push(this.exponent2.convertToDER());
				outputArray.push(this.coefficient.convertToDER());

				if ("otherPrimeInfos" in this) {
					outputArray.push(new Sequence({
						value: Array.from(this.otherPrimeInfos, function (element) {
							return element.toSchema();
						})
					}));
				}
				//endregion

				//region Construct and return new ASN.1 schema for this object
				return new Sequence({
					value: outputArray
				});
				//endregion
			}
			//**********************************************************************************
			/**
    * Convertion for the class to JSON object
    * @returns {Object}
    */

		}, {
			key: 'toJSON',
			value: function toJSON() {
				var jwk = {
					n: toBase64(arrayBufferToString(this.modulus.valueBlock.valueHex), true, true),
					e: toBase64(arrayBufferToString(this.publicExponent.valueBlock.valueHex), true, true),
					d: toBase64(arrayBufferToString(this.privateExponent.valueBlock.valueHex), true, true),
					p: toBase64(arrayBufferToString(this.prime1.valueBlock.valueHex), true, true),
					q: toBase64(arrayBufferToString(this.prime2.valueBlock.valueHex), true, true),
					dp: toBase64(arrayBufferToString(this.exponent1.valueBlock.valueHex), true, true),
					dq: toBase64(arrayBufferToString(this.exponent2.valueBlock.valueHex), true, true),
					qi: toBase64(arrayBufferToString(this.coefficient.valueBlock.valueHex), true, true)
				};

				if ("otherPrimeInfos" in this) jwk.oth = Array.from(this.otherPrimeInfos, function (element) {
					return element.toJSON();
				});

				return jwk;
			}
			//**********************************************************************************
			/**
    * Convert JSON value into current object
    * @param {Object} json
    */

		}, {
			key: 'fromJSON',
			value: function fromJSON(json) {
				if ("n" in json) this.modulus = new Integer({ valueHex: stringToArrayBuffer(fromBase64(json.n, true, true)) });else throw new Error("Absent mandatory parameter \"n\"");

				if ("e" in json) this.publicExponent = new Integer({ valueHex: stringToArrayBuffer(fromBase64(json.e, true, true)) });else throw new Error("Absent mandatory parameter \"e\"");

				if ("d" in json) this.privateExponent = new Integer({ valueHex: stringToArrayBuffer(fromBase64(json.d, true, true)) });else throw new Error("Absent mandatory parameter \"d\"");

				if ("p" in json) this.prime1 = new Integer({ valueHex: stringToArrayBuffer(fromBase64(json.p, true, true)) });else throw new Error("Absent mandatory parameter \"p\"");

				if ("q" in json) this.prime2 = new Integer({ valueHex: stringToArrayBuffer(fromBase64(json.q, true, true)) });else throw new Error("Absent mandatory parameter \"q\"");

				if ("dp" in json) this.exponent1 = new Integer({ valueHex: stringToArrayBuffer(fromBase64(json.dp, true, true)) });else throw new Error("Absent mandatory parameter \"dp\"");

				if ("dq" in json) this.exponent2 = new Integer({ valueHex: stringToArrayBuffer(fromBase64(json.dq, true, true)) });else throw new Error("Absent mandatory parameter \"dq\"");

				if ("qi" in json) this.coefficient = new Integer({ valueHex: stringToArrayBuffer(fromBase64(json.qi, true, true)) });else throw new Error("Absent mandatory parameter \"qi\"");

				if ("oth" in json) this.otherPrimeInfos = Array.from(json.oth, function (element) {
					return new OtherPrimeInfo({ json: element });
				});
			}
			//**********************************************************************************

		}], [{
			key: 'defaultValues',
			value: function defaultValues(memberName) {
				switch (memberName) {
					case "version":
						return 0;
					case "modulus":
						return new Integer();
					case "publicExponent":
						return new Integer();
					case "privateExponent":
						return new Integer();
					case "prime1":
						return new Integer();
					case "prime2":
						return new Integer();
					case "exponent1":
						return new Integer();
					case "exponent2":
						return new Integer();
					case "coefficient":
						return new Integer();
					case "otherPrimeInfos":
						return [];
					default:
						throw new Error('Invalid member name for RSAPrivateKey class: ' + memberName);
				}
			}
			//**********************************************************************************
			/**
    * Return value of asn1js schema for current class
    * @param {Object} parameters Input parameters for the schema
    * @returns {Object} asn1js schema object
    */

		}, {
			key: 'schema',
			value: function schema() {
				var parameters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

				//RSAPrivateKey ::= Sequence {
				//    version           Version,
				//    modulus           Integer,  -- n
				//    publicExponent    Integer,  -- e
				//    privateExponent   Integer,  -- d
				//    prime1            Integer,  -- p
				//    prime2            Integer,  -- q
				//    exponent1         Integer,  -- d mod (p-1)
				//    exponent2         Integer,  -- d mod (q-1)
				//    coefficient       Integer,  -- (inverse of q) mod p
				//    otherPrimeInfos   OtherPrimeInfos OPTIONAL
				//}
				//
				//OtherPrimeInfos ::= Sequence SIZE(1..MAX) OF OtherPrimeInfo

				/**
     * @type {Object}
     * @property {string} [blockName]
     * @property {string} [version]
     * @property {string} [modulus]
     * @property {string} [publicExponent]
     * @property {string} [privateExponent]
     * @property {string} [prime1]
     * @property {string} [prime2]
     * @property {string} [exponent1]
     * @property {string} [exponent2]
     * @property {string} [coefficient]
     * @property {string} [otherPrimeInfosName]
     * @property {Object} [otherPrimeInfo]
     */
				var names = getParametersValue(parameters, "names", {});

				return new Sequence({
					name: names.blockName || "",
					value: [new Integer({ name: names.version || "" }), new Integer({ name: names.modulus || "" }), new Integer({ name: names.publicExponent || "" }), new Integer({ name: names.privateExponent || "" }), new Integer({ name: names.prime1 || "" }), new Integer({ name: names.prime2 || "" }), new Integer({ name: names.exponent1 || "" }), new Integer({ name: names.exponent2 || "" }), new Integer({ name: names.coefficient || "" }), new Sequence({
						optional: true,
						value: [new Repeated({
							name: names.otherPrimeInfosName || "",
							value: OtherPrimeInfo.schema(names.otherPrimeInfo || {})
						})]
					})]
				});
			}
		}]);

		return RSAPrivateKey;
	}();
	//**************************************************************************************

	//**************************************************************************************


	var PrivateKeyInfo = function () {
		//**********************************************************************************
		/**
   * Constructor for PrivateKeyInfo class
   * @param {Object} [parameters={}]
   * @property {Object} [schema] asn1js parsed value
   */
		function PrivateKeyInfo() {
			var parameters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

			_classCallCheck(this, PrivateKeyInfo);

			//region Internal properties of the object
			/**
    * @type {number}
    * @description version
    */
			this.version = getParametersValue(parameters, "version", PrivateKeyInfo.defaultValues("version"));
			/**
    * @type {AlgorithmIdentifier}
    * @description privateKeyAlgorithm
    */
			this.privateKeyAlgorithm = getParametersValue(parameters, "privateKeyAlgorithm", PrivateKeyInfo.defaultValues("privateKeyAlgorithm"));
			/**
    * @type {OctetString}
    * @description privateKey
    */
			this.privateKey = getParametersValue(parameters, "privateKey", PrivateKeyInfo.defaultValues("privateKey"));

			if ("attributes" in parameters)
				/**
     * @type {Array.<Attribute>}
     * @description attributes
     */
				this.attributes = getParametersValue(parameters, "attributes", PrivateKeyInfo.defaultValues("attributes"));

			if ("parsedKey" in parameters)
				/**
     * @type {ECPrivateKey|RSAPrivateKey}
     * @description Parsed public key value
     */
				this.parsedKey = getParametersValue(parameters, "parsedKey", PrivateKeyInfo.defaultValues("parsedKey"));
			//endregion

			//region If input argument array contains "schema" for this object
			if ("schema" in parameters) this.fromSchema(parameters.schema);
			//endregion
			//region If input argument array contains "json" for this object
			if ("json" in parameters) this.fromJSON(parameters.json);
			//endregion
		}
		//**********************************************************************************
		/**
   * Return default values for all class members
   * @param {string} memberName String name for a class member
   */


		_createClass(PrivateKeyInfo, [{
			key: 'fromSchema',

			//**********************************************************************************
			/**
    * Convert parsed asn1js object into current class
    * @param {!Object} schema
    */
			value: function fromSchema(schema) {
				//region Check the schema is valid
				var asn1 = compareSchema(schema, schema, PrivateKeyInfo.schema({
					names: {
						version: "version",
						privateKeyAlgorithm: {
							names: {
								blockName: "privateKeyAlgorithm"
							}
						},
						privateKey: "privateKey",
						attributes: "attributes"
					}
				}));

				if (asn1.verified === false) throw new Error("Object's schema was not verified against input data for PKCS8");
				//endregion

				//region Get internal properties from parsed schema
				this.version = asn1.result.version.valueBlock.valueDec;
				this.privateKeyAlgorithm = new AlgorithmIdentifier({ schema: asn1.result.privateKeyAlgorithm });
				this.privateKey = asn1.result.privateKey;

				if ("attributes" in asn1.result) this.attributes = Array.from(asn1.result.attributes, function (element) {
					return new Attribute({ schema: element });
				});

				switch (this.privateKeyAlgorithm.algorithmId) {
					case "1.2.840.113549.1.1.1":
						// RSA
						{
							var privateKeyASN1 = fromBER(this.privateKey.valueBlock.valueHex);
							if (privateKeyASN1.offset !== -1) this.parsedKey = new RSAPrivateKey({ schema: privateKeyASN1.result });
						}
						break;
					case "1.2.840.10045.2.1":
						// ECDSA
						if ("algorithmParams" in this.privateKeyAlgorithm) {
							if (this.privateKeyAlgorithm.algorithmParams instanceof ObjectIdentifier$1) {
								var _privateKeyASN = fromBER(this.privateKey.valueBlock.valueHex);
								if (_privateKeyASN.offset !== -1) {
									this.parsedKey = new ECPrivateKey({
										namedCurve: this.privateKeyAlgorithm.algorithmParams.valueBlock.toString(),
										schema: _privateKeyASN.result
									});
								}
							}
						}
						break;
					default:
				}
				//endregion
			}
			//**********************************************************************************
			/**
    * Convert current object to asn1js object and set correct values
    * @returns {Object} asn1js object
    */

		}, {
			key: 'toSchema',
			value: function toSchema() {
				//region Create array for output sequence
				var outputArray = [new Integer({ value: this.version }), this.privateKeyAlgorithm.toSchema(), this.privateKey];

				if ("attributes" in this) {
					outputArray.push(new Constructed({
						optional: true,
						idBlock: {
							tagClass: 3, // CONTEXT-SPECIFIC
							tagNumber: 0 // [0]
						},
						value: Array.from(this.attributes, function (element) {
							return element.toSchema();
						})
					}));
				}
				//endregion

				//region Construct and return new ASN.1 schema for this object
				return new Sequence({
					value: outputArray
				});
				//endregion
			}
			//**********************************************************************************
			/**
    * Convertion for the class to JSON object
    * @returns {Object}
    */

		}, {
			key: 'toJSON',
			value: function toJSON() {
				//region Return common value in case we do not have enough info fo making JWK
				if ("parsedKey" in this === false) {
					var object = {
						version: this.version,
						privateKeyAlgorithm: this.privateKeyAlgorithm.toJSON(),
						privateKey: this.privateKey.toJSON()
					};

					if ("attributes" in this) object.attributes = Array.from(this.attributes, function (element) {
						return element.toJSON();
					});

					return object;
				}
				//endregion

				//region Making JWK
				var jwk = {};

				switch (this.privateKeyAlgorithm.algorithmId) {
					case "1.2.840.10045.2.1":
						// ECDSA
						jwk.kty = "EC";
						break;
					case "1.2.840.113549.1.1.1":
						// RSA
						jwk.kty = "RSA";
						break;
					default:
				}

				var publicKeyJWK = this.parsedKey.toJSON();

				var _iteratorNormalCompletion7 = true;
				var _didIteratorError7 = false;
				var _iteratorError7 = undefined;

				try {
					for (var _iterator7 = Object.keys(publicKeyJWK)[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
						var key = _step7.value;

						jwk[key] = publicKeyJWK[key];
					}
				} catch (err) {
					_didIteratorError7 = true;
					_iteratorError7 = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion7 && _iterator7.return) {
							_iterator7.return();
						}
					} finally {
						if (_didIteratorError7) {
							throw _iteratorError7;
						}
					}
				}

				return jwk;
				//endregion
			}
			//**********************************************************************************
			/**
    * Convert JSON value into current object
    * @param {Object} json
    */

		}, {
			key: 'fromJSON',
			value: function fromJSON(json) {
				if ("kty" in json) {
					switch (json.kty.toUpperCase()) {
						case "EC":
							this.parsedKey = new ECPrivateKey({ json: json });

							this.privateKeyAlgorithm = new AlgorithmIdentifier({
								algorithmId: "1.2.840.10045.2.1",
								algorithmParams: new ObjectIdentifier$1({ value: this.parsedKey.namedCurve })
							});
							break;
						case "RSA":
							this.parsedKey = new RSAPrivateKey({ json: json });

							this.privateKeyAlgorithm = new AlgorithmIdentifier({
								algorithmId: "1.2.840.113549.1.1.1",
								algorithmParams: new Null()
							});
							break;
						default:
							throw new Error('Invalid value for "kty" parameter: ' + json.kty);
					}

					this.privateKey = new OctetString({ valueHex: this.parsedKey.toSchema().toBER(false) });
				}
			}
			//**********************************************************************************

		}], [{
			key: 'defaultValues',
			value: function defaultValues(memberName) {
				switch (memberName) {
					case "version":
						return 0;
					case "privateKeyAlgorithm":
						return new AlgorithmIdentifier();
					case "privateKey":
						return new OctetString();
					case "attributes":
						return [];
					default:
						throw new Error('Invalid member name for PrivateKeyInfo class: ' + memberName);
				}
			}
			//**********************************************************************************
			/**
    * Return value of asn1js schema for current class
    * @param {Object} parameters Input parameters for the schema
    * @returns {Object} asn1js schema object
    */

		}, {
			key: 'schema',
			value: function schema() {
				var parameters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

				//PrivateKeyInfo ::= SEQUENCE {
				//    version Version,
				//    privateKeyAlgorithm AlgorithmIdentifier {{PrivateKeyAlgorithms}},
				//    privateKey PrivateKey,
				//    attributes [0] Attributes OPTIONAL }
				//
				//Version ::= INTEGER {v1(0)} (v1,...)
				//
				//PrivateKey ::= OCTET STRING
				//
				//Attributes ::= SET OF Attribute

				/**
     * @type {Object}
     * @property {string} [blockName]
     * @property {string} [version]
     * @property {string} [privateKeyAlgorithm]
     * @property {string} [privateKey]
     * @property {string} [attributes]
     */
				var names = getParametersValue(parameters, "names", {});

				return new Sequence({
					name: names.blockName || "",
					value: [new Integer({ name: names.version || "" }), AlgorithmIdentifier.schema(names.privateKeyAlgorithm || {}), new OctetString({ name: names.privateKey || "" }), new Constructed({
						optional: true,
						idBlock: {
							tagClass: 3, // CONTEXT-SPECIFIC
							tagNumber: 0 // [0]
						},
						value: [new Repeated({
							name: names.attributes || "",
							value: Attribute.schema()
						})]
					})]
				});
			}
		}]);

		return PrivateKeyInfo;
	}();
	//**************************************************************************************

	//**************************************************************************************


	var CryptoEngine = function () {
		//**********************************************************************************
		/**
   * Constructor for CryptoEngine class
   * @param {Object} [parameters={}]
   * @property {Object} [schema] asn1js parsed value
   */
		function CryptoEngine() {
			var parameters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

			_classCallCheck(this, CryptoEngine);

			//region Internal properties of the object
			/**
    * @type {string}
    * @description Usually here we are expecting "window.crypto.subtle" or an equivalent from custom "crypto engine"
    */
			this.crypto = getParametersValue(parameters, "crypto", {});

			/**
    * @type {string}
    * @description Name of the "crypto engine"
    */
			this.name = getParametersValue(parameters, "name", "");
			//endregion
		}
		//**********************************************************************************
		/**
   * Import WebCrypto keys from different formats
   * @param {string} format
   * @param {ArrayBuffer|Object} keyData
   * @param {Object} algorithm
   * @param {boolean} extractable
   * @param {Array} keyUsages
   * @returns {Promise}
   */


		_createClass(CryptoEngine, [{
			key: 'importKey',
			value: function importKey(format, keyData, algorithm, extractable, keyUsages) {
				//region Initial variables
				var jwk = {};
				//endregion

				//region Change "keyData" type if needed
				if (keyData instanceof Uint8Array) keyData = keyData.buffer;
				//endregion

				switch (format.toLowerCase()) {
					case "raw":
						return this.crypto.importKey("raw", keyData, algorithm, extractable, keyUsages);
					case "spki":
						{
							var asn1 = fromBER(keyData);
							if (asn1.offset === -1) return Promise.reject("Incorrect keyData");

							var publicKeyInfo = new PublicKeyInfo();
							try {
								publicKeyInfo.fromSchema(asn1.result);
							} catch (ex) {
								return Promise.reject("Incorrect keyData");
							}

							switch (algorithm.name.toUpperCase()) {
								case "RSA-PSS":
									{
										//region Get information about used hash function
										switch (algorithm.hash.name.toUpperCase()) {
											case "SHA-1":
												jwk.alg = "PS1";
												break;
											case "SHA-256":
												jwk.alg = "PS256";
												break;
											case "SHA-384":
												jwk.alg = "PS384";
												break;
											case "SHA-512":
												jwk.alg = "PS512";
												break;
											default:
												return Promise.reject('Incorrect hash algorithm: ' + algorithm.hash.name.toUpperCase());
										}
										//endregion
									}
								case "RSASSA-PKCS1-V1_5":
									{
										keyUsages = ["verify"]; // Override existing keyUsages value since the key is a public key

										jwk.kty = "RSA";
										jwk.ext = extractable;
										jwk.key_ops = keyUsages;

										if (publicKeyInfo.algorithm.algorithmId !== "1.2.840.113549.1.1.1") return Promise.reject('Incorrect public key algorithm: ' + publicKeyInfo.algorithm.algorithmId);

										//region Get information about used hash function
										if ("alg" in jwk === false) {
											switch (algorithm.hash.name.toUpperCase()) {
												case "SHA-1":
													jwk.alg = "RS1";
													break;
												case "SHA-256":
													jwk.alg = "RS256";
													break;
												case "SHA-384":
													jwk.alg = "RS384";
													break;
												case "SHA-512":
													jwk.alg = "RS512";
													break;
												default:
													return Promise.reject('Incorrect public key algorithm: ' + publicKeyInfo.algorithm.algorithmId);
											}
										}
										//endregion

										//region Create RSA Public Key elements
										var publicKeyJSON = publicKeyInfo.toJSON();

										var _iteratorNormalCompletion8 = true;
										var _didIteratorError8 = false;
										var _iteratorError8 = undefined;

										try {
											for (var _iterator8 = Object.keys(publicKeyJSON)[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
												var key = _step8.value;

												jwk[key] = publicKeyJSON[key];
											} //endregion
										} catch (err) {
											_didIteratorError8 = true;
											_iteratorError8 = err;
										} finally {
											try {
												if (!_iteratorNormalCompletion8 && _iterator8.return) {
													_iterator8.return();
												}
											} finally {
												if (_didIteratorError8) {
													throw _iteratorError8;
												}
											}
										}
									}
									break;
								case "ECDSA":
									keyUsages = ["verify"]; // Override existing keyUsages value since the key is a public key
								case "ECDH":
									{
										//region Initial variables
										jwk = {
											kty: "EC",
											ext: extractable,
											key_ops: keyUsages
										};
										//endregion

										//region Get information about algorithm
										if (publicKeyInfo.algorithm.algorithmId !== "1.2.840.10045.2.1") return Promise.reject('Incorrect public key algorithm: ' + publicKeyInfo.algorithm.algorithmId);
										//endregion

										//region Create ECDSA Public Key elements
										var _publicKeyJSON = publicKeyInfo.toJSON();

										var _iteratorNormalCompletion9 = true;
										var _didIteratorError9 = false;
										var _iteratorError9 = undefined;

										try {
											for (var _iterator9 = Object.keys(_publicKeyJSON)[Symbol.iterator](), _step9; !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done); _iteratorNormalCompletion9 = true) {
												var _key7 = _step9.value;

												jwk[_key7] = _publicKeyJSON[_key7];
											} //endregion
										} catch (err) {
											_didIteratorError9 = true;
											_iteratorError9 = err;
										} finally {
											try {
												if (!_iteratorNormalCompletion9 && _iterator9.return) {
													_iterator9.return();
												}
											} finally {
												if (_didIteratorError9) {
													throw _iteratorError9;
												}
											}
										}
									}
									break;
								case "RSA-OAEP":
									{
										jwk.kty = "RSA";
										jwk.ext = extractable;
										jwk.key_ops = keyUsages;

										if (this.name.toLowerCase() === "safari") jwk.alg = "RSA-OAEP";else {
											switch (algorithm.hash.name.toUpperCase()) {
												case "SHA-1":
													jwk.alg = "RSA-OAEP-1";
													break;
												case "SHA-256":
													jwk.alg = "RSA-OAEP-256";
													break;
												case "SHA-384":
													jwk.alg = "RSA-OAEP-384";
													break;
												case "SHA-512":
													jwk.alg = "RSA-OAEP-512";
													break;
												default:
													return Promise.reject('Incorrect public key algorithm: ' + publicKeyInfo.algorithm.algorithmId);
											}
										}

										//region Create ECDSA Public Key elements
										var _publicKeyJSON2 = publicKeyInfo.toJSON();

										var _iteratorNormalCompletion10 = true;
										var _didIteratorError10 = false;
										var _iteratorError10 = undefined;

										try {
											for (var _iterator10 = Object.keys(_publicKeyJSON2)[Symbol.iterator](), _step10; !(_iteratorNormalCompletion10 = (_step10 = _iterator10.next()).done); _iteratorNormalCompletion10 = true) {
												var _key8 = _step10.value;

												jwk[_key8] = _publicKeyJSON2[_key8];
											} //endregion
										} catch (err) {
											_didIteratorError10 = true;
											_iteratorError10 = err;
										} finally {
											try {
												if (!_iteratorNormalCompletion10 && _iterator10.return) {
													_iterator10.return();
												}
											} finally {
												if (_didIteratorError10) {
													throw _iteratorError10;
												}
											}
										}
									}
									break;
								default:
									return Promise.reject('Incorrect algorithm name: ' + algorithm.name.toUpperCase());
							}
						}
						break;
					case "pkcs8":
						{
							var privateKeyInfo = new PrivateKeyInfo();

							//region Parse "PrivateKeyInfo" object
							var _asn = fromBER(keyData);
							if (_asn.offset === -1) return Promise.reject("Incorrect keyData");

							try {
								privateKeyInfo.fromSchema(_asn.result);
							} catch (ex) {
								return Promise.reject("Incorrect keyData");
							}
							//endregion

							switch (algorithm.name.toUpperCase()) {
								case "RSA-PSS":
									{
										//region Get information about used hash function
										switch (algorithm.hash.name.toUpperCase()) {
											case "SHA-1":
												jwk.alg = "PS1";
												break;
											case "SHA-256":
												jwk.alg = "PS256";
												break;
											case "SHA-384":
												jwk.alg = "PS384";
												break;
											case "SHA-512":
												jwk.alg = "PS512";
												break;
											default:
												return Promise.reject('Incorrect hash algorithm: ' + algorithm.hash.name.toUpperCase());
										}
										//endregion
									}
								case "RSASSA-PKCS1-V1_5":
									{
										keyUsages = ["sign"]; // Override existing keyUsages value since the key is a private key

										jwk.kty = "RSA";
										jwk.ext = extractable;
										jwk.key_ops = keyUsages;

										//region Get information about used hash function
										if (privateKeyInfo.privateKeyAlgorithm.algorithmId !== "1.2.840.113549.1.1.1") return Promise.reject('Incorrect private key algorithm: ' + privateKeyInfo.privateKeyAlgorithm.algorithmId);
										//endregion

										//region Get information about used hash function
										if ("alg" in jwk === false) {
											switch (algorithm.hash.name.toUpperCase()) {
												case "SHA-1":
													jwk.alg = "RS1";
													break;
												case "SHA-256":
													jwk.alg = "RS256";
													break;
												case "SHA-384":
													jwk.alg = "RS384";
													break;
												case "SHA-512":
													jwk.alg = "RS512";
													break;
												default:
													return Promise.reject('Incorrect hash algorithm: ' + algorithm.hash.name.toUpperCase());
											}
										}
										//endregion

										//region Create RSA Private Key elements
										var privateKeyJSON = privateKeyInfo.toJSON();

										var _iteratorNormalCompletion11 = true;
										var _didIteratorError11 = false;
										var _iteratorError11 = undefined;

										try {
											for (var _iterator11 = Object.keys(privateKeyJSON)[Symbol.iterator](), _step11; !(_iteratorNormalCompletion11 = (_step11 = _iterator11.next()).done); _iteratorNormalCompletion11 = true) {
												var _key9 = _step11.value;

												jwk[_key9] = privateKeyJSON[_key9];
											} //endregion
										} catch (err) {
											_didIteratorError11 = true;
											_iteratorError11 = err;
										} finally {
											try {
												if (!_iteratorNormalCompletion11 && _iterator11.return) {
													_iterator11.return();
												}
											} finally {
												if (_didIteratorError11) {
													throw _iteratorError11;
												}
											}
										}
									}
									break;
								case "ECDSA":
									keyUsages = ["sign"]; // Override existing keyUsages value since the key is a private key
								case "ECDH":
									{
										//region Initial variables
										jwk = {
											kty: "EC",
											ext: extractable,
											key_ops: keyUsages
										};
										//endregion

										//region Get information about used hash function
										if (privateKeyInfo.privateKeyAlgorithm.algorithmId !== "1.2.840.10045.2.1") return Promise.reject('Incorrect algorithm: ' + privateKeyInfo.privateKeyAlgorithm.algorithmId);
										//endregion

										//region Create ECDSA Private Key elements
										var _privateKeyJSON = privateKeyInfo.toJSON();

										var _iteratorNormalCompletion12 = true;
										var _didIteratorError12 = false;
										var _iteratorError12 = undefined;

										try {
											for (var _iterator12 = Object.keys(_privateKeyJSON)[Symbol.iterator](), _step12; !(_iteratorNormalCompletion12 = (_step12 = _iterator12.next()).done); _iteratorNormalCompletion12 = true) {
												var _key10 = _step12.value;

												jwk[_key10] = _privateKeyJSON[_key10];
											} //endregion
										} catch (err) {
											_didIteratorError12 = true;
											_iteratorError12 = err;
										} finally {
											try {
												if (!_iteratorNormalCompletion12 && _iterator12.return) {
													_iterator12.return();
												}
											} finally {
												if (_didIteratorError12) {
													throw _iteratorError12;
												}
											}
										}
									}
									break;
								case "RSA-OAEP":
									{
										jwk.kty = "RSA";
										jwk.ext = extractable;
										jwk.key_ops = keyUsages;

										//region Get information about used hash function
										if (this.name.toLowerCase() === "safari") jwk.alg = "RSA-OAEP";else {
											switch (algorithm.hash.name.toUpperCase()) {
												case "SHA-1":
													jwk.alg = "RSA-OAEP-1";
													break;
												case "SHA-256":
													jwk.alg = "RSA-OAEP-256";
													break;
												case "SHA-384":
													jwk.alg = "RSA-OAEP-384";
													break;
												case "SHA-512":
													jwk.alg = "RSA-OAEP-512";
													break;
												default:
													return Promise.reject('Incorrect hash algorithm: ' + algorithm.hash.name.toUpperCase());
											}
										}
										//endregion

										//region Create RSA Private Key elements
										var _privateKeyJSON2 = privateKeyInfo.toJSON();

										var _iteratorNormalCompletion13 = true;
										var _didIteratorError13 = false;
										var _iteratorError13 = undefined;

										try {
											for (var _iterator13 = Object.keys(_privateKeyJSON2)[Symbol.iterator](), _step13; !(_iteratorNormalCompletion13 = (_step13 = _iterator13.next()).done); _iteratorNormalCompletion13 = true) {
												var _key11 = _step13.value;

												jwk[_key11] = _privateKeyJSON2[_key11];
											} //endregion
										} catch (err) {
											_didIteratorError13 = true;
											_iteratorError13 = err;
										} finally {
											try {
												if (!_iteratorNormalCompletion13 && _iterator13.return) {
													_iterator13.return();
												}
											} finally {
												if (_didIteratorError13) {
													throw _iteratorError13;
												}
											}
										}
									}
									break;
								default:
									return Promise.reject('Incorrect algorithm name: ' + algorithm.name.toUpperCase());
							}
						}
						break;
					case "jwk":
						jwk = keyData;
						break;
					default:
						return Promise.reject('Incorrect format: ' + format);
				}

				//region Special case for Safari browser (since its acting not as WebCrypto standard describes)
				if (this.name.toLowerCase() === "safari") {
					if (jwk instanceof ArrayBuffer === false) jwk = stringToArrayBuffer(JSON.stringify(jwk));
				}
				//endregion

				return this.crypto.importKey("jwk", jwk, algorithm, extractable, keyUsages);
			}
			//**********************************************************************************
			/**
    * Export WebCrypto keys to different formats
    * @param {string} format
    * @param {Object} key
    * @returns {Promise}
    */

		}, {
			key: 'exportKey',
			value: function exportKey(format, key) {
				var sequence = this.crypto.exportKey("jwk", key);

				//region Currently Safari returns ArrayBuffer as JWK thus we need an additional transformation
				if (this.name.toLowerCase() === "safari") sequence = sequence.then(function (result) {
					return JSON.parse(arrayBufferToString(result));
				});
				//endregion

				switch (format.toLowerCase()) {
					case "raw":
						return this.crypto.exportKey("raw", key);
					case "spki":
						sequence = sequence.then(function (result) {
							var publicKeyInfo = new PublicKeyInfo();

							try {
								publicKeyInfo.fromJSON(result);
							} catch (ex) {
								return Promise.reject("Incorrect key data");
							}

							return publicKeyInfo.toSchema().toBER(false);
						});
						break;
					case "pkcs8":
						sequence = sequence.then(function (result) {
							var privateKeyInfo = new PrivateKeyInfo();

							try {
								privateKeyInfo.fromJSON(result);
							} catch (ex) {
								return Promise.reject("Incorrect key data");
							}

							return privateKeyInfo.toSchema().toBER(false);
						});
						break;
					case "jwk":
						break;
					default:
						return Promise.reject('Incorrect format: ' + format);
				}

				return sequence;
			}
			//**********************************************************************************
			/**
    * Convert WebCrypto keys between different export formats
    * @param {string} inputFormat
    * @param {string} outputFormat
    * @param {ArrayBuffer|Object} keyData
    * @param {Object} algorithm
    * @param {boolean} extractable
    * @param {Array} keyUsages
    * @returns {Promise}
    */

		}, {
			key: 'convert',
			value: function convert(inputFormat, outputFormat, keyData, algorithm, extractable, keyUsages) {
				var _this54 = this;

				switch (inputFormat.toLowerCase()) {
					case "raw":
						switch (outputFormat.toLowerCase()) {
							case "raw":
								return Promise.resolve(keyData);
							case "spki":
								return Promise.resolve().then(function () {
									return _this54.importKey("raw", keyData, algorithm, extractable, keyUsages);
								}).then(function (result) {
									return _this54.exportKey("spki", result);
								});
							case "pkcs8":
								return Promise.resolve().then(function () {
									return _this54.importKey("raw", keyData, algorithm, extractable, keyUsages);
								}).then(function (result) {
									return _this54.exportKey("pkcs8", result);
								});
							case "jwk":
								return Promise.resolve().then(function () {
									return _this54.importKey("raw", keyData, algorithm, extractable, keyUsages);
								}).then(function (result) {
									return _this54.exportKey("jwk", result);
								});
							default:
								return Promise.reject('Incorrect outputFormat: ' + outputFormat);
						}
					case "spki":
						switch (outputFormat.toLowerCase()) {
							case "raw":
								return Promise.resolve().then(function () {
									return _this54.importKey("spki", keyData, algorithm, extractable, keyUsages);
								}).then(function (result) {
									return _this54.exportKey("raw", result);
								});
							case "spki":
								return Promise.resolve(keyData);
							case "pkcs8":
								return Promise.reject("Impossible to convert between SPKI/PKCS8");
							case "jwk":
								return Promise.resolve().then(function () {
									return _this54.importKey("spki", keyData, algorithm, extractable, keyUsages);
								}).then(function (result) {
									return _this54.exportKey("jwk", result);
								});
							default:
								return Promise.reject('Incorrect outputFormat: ' + outputFormat);
						}
					case "pkcs8":
						switch (outputFormat.toLowerCase()) {
							case "raw":
								return Promise.resolve().then(function () {
									return _this54.importKey("pkcs8", keyData, algorithm, extractable, keyUsages);
								}).then(function (result) {
									return _this54.exportKey("raw", result);
								});
							case "spki":
								return Promise.reject("Impossible to convert between SPKI/PKCS8");
							case "pkcs8":
								return Promise.resolve(keyData);
							case "jwk":
								return Promise.resolve().then(function () {
									return _this54.importKey("pkcs8", keyData, algorithm, extractable, keyUsages);
								}).then(function (result) {
									return _this54.exportKey("jwk", result);
								});
							default:
								return Promise.reject('Incorrect outputFormat: ' + outputFormat);
						}
					case "jwk":
						switch (outputFormat.toLowerCase()) {
							case "raw":
								return Promise.resolve().then(function () {
									return _this54.importKey("jwk", keyData, algorithm, extractable, keyUsages);
								}).then(function (result) {
									return _this54.exportKey("raw", result);
								});
							case "spki":
								return Promise.resolve().then(function () {
									return _this54.importKey("jwk", keyData, algorithm, extractable, keyUsages);
								}).then(function (result) {
									return _this54.exportKey("spki", result);
								});
							case "pkcs8":
								return Promise.resolve().then(function () {
									return _this54.importKey("jwk", keyData, algorithm, extractable, keyUsages);
								}).then(function (result) {
									return _this54.exportKey("pkcs8", result);
								});
							case "jwk":
								return Promise.resolve(keyData);
							default:
								return Promise.reject('Incorrect outputFormat: ' + outputFormat);
						}
					default:
						return Promise.reject('Incorrect inputFormat: ' + inputFormat);
				}
			}
			//**********************************************************************************
			/**
    * Wrapper for standard function "encrypt"
    * @param args
    * @returns {Promise}
    */

		}, {
			key: 'encrypt',
			value: function encrypt() {
				var _crypto2;

				return (_crypto2 = this.crypto).encrypt.apply(_crypto2, arguments);
			}
			//**********************************************************************************
			/**
    * Wrapper for standard function "decrypt"
    * @param args
    * @returns {Promise}
    */

		}, {
			key: 'decrypt',
			value: function decrypt() {
				var _crypto3;

				return (_crypto3 = this.crypto).decrypt.apply(_crypto3, arguments);
			}
			//**********************************************************************************
			/**
    * Wrapper for standard function "sign"
    * @param args
    * @returns {Promise}
    */

		}, {
			key: 'sign',
			value: function sign() {
				var _crypto4;

				return (_crypto4 = this.crypto).sign.apply(_crypto4, arguments);
			}
			//**********************************************************************************
			/**
    * Wrapper for standard function "verify"
    * @param args
    * @returns {Promise}
    */

		}, {
			key: 'verify',
			value: function verify() {
				var _crypto5;

				return (_crypto5 = this.crypto).verify.apply(_crypto5, arguments);
			}
			//**********************************************************************************
			/**
    * Wrapper for standard function "digest"
    * @param args
    * @returns {Promise}
    */

		}, {
			key: 'digest',
			value: function digest() {
				var _crypto6;

				return (_crypto6 = this.crypto).digest.apply(_crypto6, arguments);
			}
			//**********************************************************************************
			/**
    * Wrapper for standard function "generateKey"
    * @param args
    * @returns {Promise}
    */

		}, {
			key: 'generateKey',
			value: function generateKey() {
				var _crypto7;

				return (_crypto7 = this.crypto).generateKey.apply(_crypto7, arguments);
			}
			//**********************************************************************************
			/**
    * Wrapper for standard function "deriveKey"
    * @param args
    * @returns {Promise}
    */

		}, {
			key: 'deriveKey',
			value: function deriveKey() {
				var _crypto8;

				return (_crypto8 = this.crypto).deriveKey.apply(_crypto8, arguments);
			}
			//**********************************************************************************
			/**
    * Wrapper for standard function "deriveBits"
    * @param args
    * @returns {Promise}
    */

		}, {
			key: 'deriveBits',
			value: function deriveBits() {
				var _crypto9;

				return (_crypto9 = this.crypto).deriveBits.apply(_crypto9, arguments);
			}
			//**********************************************************************************
			/**
    * Wrapper for standard function "wrapKey"
    * @param args
    * @returns {Promise}
    */

		}, {
			key: 'wrapKey',
			value: function wrapKey() {
				var _crypto10;

				return (_crypto10 = this.crypto).wrapKey.apply(_crypto10, arguments);
			}
			//**********************************************************************************
			/**
    * Wrapper for standard function "unwrapKey"
    * @param args
    * @returns {Promise}
    */

		}, {
			key: 'unwrapKey',
			value: function unwrapKey() {
				var _crypto11;

				return (_crypto11 = this.crypto).unwrapKey.apply(_crypto11, arguments);
			}
			//**********************************************************************************

		}]);

		return CryptoEngine;
	}();
	//**************************************************************************************

	//**************************************************************************************
	//region Crypto engine related function
	//**************************************************************************************


	var engine = {
		name: "none",
		crypto: null,
		subtle: null
	};
	//**************************************************************************************
	function setEngine(name, crypto, subtle) {
		engine = {
			name: name,
			crypto: crypto,
			subtle: subtle
		};
	}
	//**************************************************************************************

	//**************************************************************************************
	(function initCryptoEngine() {
		if (typeof self !== "undefined") {
			if ("crypto" in self) {
				var engineName = "webcrypto";

				/**
     * Standard crypto object
     * @type {Object}
     * @property {Object} [webkitSubtle] Subtle object from Apple
     */
				var cryptoObject = self.crypto;
				var subtleObject = null;

				// Apple Safari support
				if ("webkitSubtle" in self.crypto) {
					subtleObject = self.crypto.webkitSubtle;
					engineName = "safari";
				}

				if ("subtle" in self.crypto) subtleObject = self.crypto.subtle;

				engine = {
					name: engineName,
					crypto: cryptoObject,
					subtle: new CryptoEngine({ name: engineName, crypto: subtleObject })
				};
			}
		}
	})();
	//**************************************************************************************
	//endregion
	//**************************************************************************************
	//region Declaration of common functions
	//**************************************************************************************
	/**
  * Get crypto subtle from current "crypto engine" or "undefined"
  * @returns {({decrypt, deriveKey, digest, encrypt, exportKey, generateKey, importKey, sign, unwrapKey, verify, wrapKey}|null)}
  */
	function getCrypto() {
		if (engine.subtle !== null) return engine.subtle;

		return undefined;
	}
	//**************************************************************************************
	/**
  * Initialize input Uint8Array by random values (with help from current "crypto engine")
  * @param {!Uint8Array} view
  * @returns {*}
  */
	function getRandomValues(view) {
		if (engine.crypto !== null) return engine.crypto.getRandomValues(view);

		throw new Error("No support for Web Cryptography API");
	}
	//**************************************************************************************
	/**
  * Get OID for each specific WebCrypto algorithm
  * @param {Object} algorithm WebCrypto algorithm
  * @returns {string}
  */
	function getOIDByAlgorithm(algorithm) {
		var result = "";

		switch (algorithm.name.toUpperCase()) {
			case "RSASSA-PKCS1-V1_5":
				switch (algorithm.hash.name.toUpperCase()) {
					case "SHA-1":
						result = "1.2.840.113549.1.1.5";
						break;
					case "SHA-256":
						result = "1.2.840.113549.1.1.11";
						break;
					case "SHA-384":
						result = "1.2.840.113549.1.1.12";
						break;
					case "SHA-512":
						result = "1.2.840.113549.1.1.13";
						break;
					default:
				}
				break;
			case "RSA-PSS":
				result = "1.2.840.113549.1.1.10";
				break;
			case "RSA-OAEP":
				result = "1.2.840.113549.1.1.7";
				break;
			case "ECDSA":
				switch (algorithm.hash.name.toUpperCase()) {
					case "SHA-1":
						result = "1.2.840.10045.4.1";
						break;
					case "SHA-256":
						result = "1.2.840.10045.4.3.2";
						break;
					case "SHA-384":
						result = "1.2.840.10045.4.3.3";
						break;
					case "SHA-512":
						result = "1.2.840.10045.4.3.4";
						break;
					default:
				}
				break;
			case "ECDH":
				switch (algorithm.kdf.toUpperCase()) {// Non-standard addition - hash algorithm of KDF function
					case "SHA-1":
						result = "1.3.133.16.840.63.0.2"; // dhSinglePass-stdDH-sha1kdf-scheme
						break;
					case "SHA-256":
						result = "1.3.132.1.11.1"; // dhSinglePass-stdDH-sha256kdf-scheme
						break;
					case "SHA-384":
						result = "1.3.132.1.11.2"; // dhSinglePass-stdDH-sha384kdf-scheme
						break;
					case "SHA-512":
						result = "1.3.132.1.11.3"; // dhSinglePass-stdDH-sha512kdf-scheme
						break;
					default:
				}
				break;
			case "AES-CTR":
				break;
			case "AES-CBC":
				switch (algorithm.length) {
					case 128:
						result = "2.16.840.1.101.3.4.1.2";
						break;
					case 192:
						result = "2.16.840.1.101.3.4.1.22";
						break;
					case 256:
						result = "2.16.840.1.101.3.4.1.42";
						break;
					default:
				}
				break;
			case "AES-CMAC":
				break;
			case "AES-GCM":
				switch (algorithm.length) {
					case 128:
						result = "2.16.840.1.101.3.4.1.6";
						break;
					case 192:
						result = "2.16.840.1.101.3.4.1.26";
						break;
					case 256:
						result = "2.16.840.1.101.3.4.1.46";
						break;
					default:
				}
				break;
			case "AES-CFB":
				switch (algorithm.length) {
					case 128:
						result = "2.16.840.1.101.3.4.1.4";
						break;
					case 192:
						result = "2.16.840.1.101.3.4.1.24";
						break;
					case 256:
						result = "2.16.840.1.101.3.4.1.44";
						break;
					default:
				}
				break;
			case "AES-KW":
				switch (algorithm.length) {
					case 128:
						result = "2.16.840.1.101.3.4.1.5";
						break;
					case 192:
						result = "2.16.840.1.101.3.4.1.25";
						break;
					case 256:
						result = "2.16.840.1.101.3.4.1.45";
						break;
					default:
				}
				break;
			case "HMAC":
				switch (algorithm.hash.name.toUpperCase()) {
					case "SHA-1":
						result = "1.2.840.113549.2.7";
						break;
					case "SHA-256":
						result = "1.2.840.113549.2.9";
						break;
					case "SHA-384":
						result = "1.2.840.113549.2.10";
						break;
					case "SHA-512":
						result = "1.2.840.113549.2.11";
						break;
					default:
				}
				break;
			case "DH":
				result = "1.2.840.113549.1.9.16.3.5";
				break;
			case "SHA-1":
				result = "1.3.14.3.2.26";
				break;
			case "SHA-256":
				result = "2.16.840.1.101.3.4.2.1";
				break;
			case "SHA-384":
				result = "2.16.840.1.101.3.4.2.2";
				break;
			case "SHA-512":
				result = "2.16.840.1.101.3.4.2.3";
				break;
			case "CONCAT":
				break;
			case "HKDF":
				break;
			case "PBKDF2":
				result = "1.2.840.113549.1.5.12";
				break;
			//region Special case - OIDs for ECC curves
			case "P-256":
				result = "1.2.840.10045.3.1.7";
				break;
			case "P-384":
				result = "1.3.132.0.34";
				break;
			case "P-521":
				result = "1.3.132.0.35";
				break;
			//endregion
			default:
		}

		return result;
	}
	//**************************************************************************************
	/**
  * Get default algorithm parameters for each kind of operation
  * @param {string} algorithmName Algorithm name to get common parameters for
  * @param {string} operation Kind of operation: "sign", "encrypt", "generatekey", "importkey", "exportkey", "verify"
  * @returns {*}
  */
	function getAlgorithmParameters(algorithmName, operation) {
		var result = {
			algorithm: {},
			usages: []
		};

		switch (algorithmName.toUpperCase()) {
			case "RSASSA-PKCS1-V1_5":
				switch (operation.toLowerCase()) {
					case "generatekey":
						result = {
							algorithm: {
								name: "RSASSA-PKCS1-v1_5",
								modulusLength: 2048,
								publicExponent: new Uint8Array([0x01, 0x00, 0x01]),
								hash: {
									name: "SHA-256"
								}
							},
							usages: ["sign", "verify"]
						};
						break;
					case "verify":
					case "sign":
					case "importkey":
						result = {
							algorithm: {
								name: "RSASSA-PKCS1-v1_5",
								hash: {
									name: "SHA-256"
								}
							},
							usages: ["verify"] // For importKey("pkcs8") usage must be "sign" only
						};
						break;
					case "exportkey":
					default:
						return {
							algorithm: {
								name: "RSASSA-PKCS1-v1_5"
							},
							usages: []
						};
				}
				break;
			case "RSA-PSS":
				switch (operation.toLowerCase()) {
					case "sign":
					case "verify":
						result = {
							algorithm: {
								name: "RSA-PSS",
								hash: {
									name: "SHA-1"
								},
								saltLength: 20
							},
							usages: ["sign", "verify"]
						};
						break;
					case "generatekey":
						result = {
							algorithm: {
								name: "RSA-PSS",
								modulusLength: 2048,
								publicExponent: new Uint8Array([0x01, 0x00, 0x01]),
								hash: {
									name: "SHA-1"
								}
							},
							usages: ["sign", "verify"]
						};
						break;
					case "importkey":
						result = {
							algorithm: {
								name: "RSA-PSS",
								hash: {
									name: "SHA-1"
								}
							},
							usages: ["verify"] // For importKey("pkcs8") usage must be "sign" only
						};
						break;
					case "exportkey":
					default:
						return {
							algorithm: {
								name: "RSA-PSS"
							},
							usages: []
						};
				}
				break;
			case "RSA-OAEP":
				switch (operation.toLowerCase()) {
					case "encrypt":
					case "decrypt":
						result = {
							algorithm: {
								name: "RSA-OAEP"
							},
							usages: ["encrypt", "decrypt"]
						};
						break;
					case "generatekey":
						result = {
							algorithm: {
								name: "RSA-OAEP",
								modulusLength: 2048,
								publicExponent: new Uint8Array([0x01, 0x00, 0x01]),
								hash: {
									name: "SHA-256"
								}
							},
							usages: ["encrypt", "decrypt", "wrapKey", "unwrapKey"]
						};
						break;
					case "importkey":
						result = {
							algorithm: {
								name: "RSA-OAEP",
								hash: {
									name: "SHA-256"
								}
							},
							usages: ["encrypt"] // encrypt for "spki" and decrypt for "pkcs8"
						};
						break;
					case "exportkey":
					default:
						return {
							algorithm: {
								name: "RSA-OAEP"
							},
							usages: []
						};
				}
				break;
			case "ECDSA":
				switch (operation.toLowerCase()) {
					case "generatekey":
						result = {
							algorithm: {
								name: "ECDSA",
								namedCurve: "P-256"
							},
							usages: ["sign", "verify"]
						};
						break;
					case "importkey":
						result = {
							algorithm: {
								name: "ECDSA",
								namedCurve: "P-256"
							},
							usages: ["verify"] // "sign" for "pkcs8"
						};
						break;
					case "verify":
					case "sign":
						result = {
							algorithm: {
								name: "ECDSA",
								hash: {
									name: "SHA-256"
								}
							},
							usages: ["sign"]
						};
						break;
					default:
						return {
							algorithm: {
								name: "ECDSA"
							},
							usages: []
						};
				}
				break;
			case "ECDH":
				switch (operation.toLowerCase()) {
					case "exportkey":
					case "importkey":
					case "generatekey":
						result = {
							algorithm: {
								name: "ECDH",
								namedCurve: "P-256"
							},
							usages: ["deriveKey", "deriveBits"]
						};
						break;
					case "derivekey":
					case "derivebits":
						result = {
							algorithm: {
								name: "ECDH",
								namedCurve: "P-256",
								public: [] // Must be a "publicKey"
							},
							usages: ["encrypt", "decrypt"]
						};
						break;
					default:
						return {
							algorithm: {
								name: "ECDH"
							},
							usages: []
						};
				}
				break;
			case "AES-CTR":
				switch (operation.toLowerCase()) {
					case "importkey":
					case "exportkey":
					case "generatekey":
						result = {
							algorithm: {
								name: "AES-CTR",
								length: 256
							},
							usages: ["encrypt", "decrypt", "wrapKey", "unwrapKey"]
						};
						break;
					case "decrypt":
					case "encrypt":
						result = {
							algorithm: {
								name: "AES-CTR",
								counter: new Uint8Array(16),
								length: 10
							},
							usages: ["encrypt", "decrypt", "wrapKey", "unwrapKey"]
						};
						break;
					default:
						return {
							algorithm: {
								name: "AES-CTR"
							},
							usages: []
						};
				}
				break;
			case "AES-CBC":
				switch (operation.toLowerCase()) {
					case "importkey":
					case "exportkey":
					case "generatekey":
						result = {
							algorithm: {
								name: "AES-CBC",
								length: 256
							},
							usages: ["encrypt", "decrypt", "wrapKey", "unwrapKey"]
						};
						break;
					case "decrypt":
					case "encrypt":
						result = {
							algorithm: {
								name: "AES-CBC",
								iv: getRandomValues(new Uint8Array(16)) // For "decrypt" the value should be replaced with value got on "encrypt" step
							},
							usages: ["encrypt", "decrypt", "wrapKey", "unwrapKey"]
						};
						break;
					default:
						return {
							algorithm: {
								name: "AES-CBC"
							},
							usages: []
						};
				}
				break;
			case "AES-GCM":
				switch (operation.toLowerCase()) {
					case "importkey":
					case "exportkey":
					case "generatekey":
						result = {
							algorithm: {
								name: "AES-GCM",
								length: 256
							},
							usages: ["encrypt", "decrypt", "wrapKey", "unwrapKey"]
						};
						break;
					case "decrypt":
					case "encrypt":
						result = {
							algorithm: {
								name: "AES-GCM",
								iv: getRandomValues(new Uint8Array(16)) // For "decrypt" the value should be replaced with value got on "encrypt" step
							},
							usages: ["encrypt", "decrypt", "wrapKey", "unwrapKey"]
						};
						break;
					default:
						return {
							algorithm: {
								name: "AES-GCM"
							},
							usages: []
						};
				}
				break;
			case "AES-KW":
				switch (operation.toLowerCase()) {
					case "importkey":
					case "exportkey":
					case "generatekey":
					case "wrapkey":
					case "unwrapkey":
						result = {
							algorithm: {
								name: "AES-KW",
								length: 256
							},
							usages: ["wrapKey", "unwrapKey"]
						};
						break;
					default:
						return {
							algorithm: {
								name: "AES-KW"
							},
							usages: []
						};
				}
				break;
			case "HMAC":
				switch (operation.toLowerCase()) {
					case "sign":
					case "verify":
						result = {
							algorithm: {
								name: "HMAC"
							},
							usages: ["sign", "verify"]
						};
						break;
					case "importkey":
					case "exportkey":
					case "generatekey":
						result = {
							algorithm: {
								name: "HMAC",
								length: 32,
								hash: {
									name: "SHA-256"
								}
							},
							usages: ["sign", "verify"]
						};
						break;
					default:
						return {
							algorithm: {
								name: "HMAC"
							},
							usages: []
						};
				}
				break;
			case "HKDF":
				switch (operation.toLowerCase()) {
					case "derivekey":
						result = {
							algorithm: {
								name: "HKDF",
								hash: "SHA-256",
								salt: new Uint8Array([]),
								info: new Uint8Array([])
							},
							usages: ["encrypt", "decrypt"]
						};
						break;
					default:
						return {
							algorithm: {
								name: "HKDF"
							},
							usages: []
						};
				}
				break;
			case "PBKDF2":
				switch (operation.toLowerCase()) {
					case "derivekey":
						result = {
							algorithm: {
								name: "PBKDF2",
								hash: { name: "SHA-256" },
								salt: new Uint8Array([]),
								iterations: 1000
							},
							usages: ["encrypt", "decrypt"]
						};
						break;
					default:
						return {
							algorithm: {
								name: "PBKDF2"
							},
							usages: []
						};
				}
				break;
			default:
		}

		return result;
	}
	//**************************************************************************************
	/**
  * Create CMS ECDSA signature from WebCrypto ECDSA signature
  * @param {ArrayBuffer} signatureBuffer WebCrypto result of "sign" function
  * @returns {ArrayBuffer}
  */
	function createCMSECDSASignature(signatureBuffer) {
		// #region Initial check for correct length 
		if (signatureBuffer.byteLength % 2 !== 0) return new ArrayBuffer(0);
		// #endregion 

		// #region Initial variables 
		var length = signatureBuffer.byteLength / 2; // There are two equal parts inside incoming ArrayBuffer

		var rBuffer = new ArrayBuffer(length);
		var rView = new Uint8Array(rBuffer);
		rView.set(new Uint8Array(signatureBuffer, 0, length));
		var rCorrectedBuffer = void 0;
		var rCorrectedView = void 0;

		var sBuffer = new ArrayBuffer(length);
		var sView = new Uint8Array(sBuffer);
		sView.set(new Uint8Array(signatureBuffer, length, length));
		var sCorrectedBuffer = void 0;
		var sCorrectedView = void 0;
		// #endregion   

		// #region Get "r" part of ECDSA signature 
		switch (true) {
			case (rView[0] & 0x80) !== 0:
				rCorrectedBuffer = new ArrayBuffer(length + 1);
				rCorrectedView = new Uint8Array(rCorrectedBuffer);

				rCorrectedView[0] = 0x00;

				rCorrectedView.set(rView, 1);
				break;
			case rView[0] === 0x00 && (rView[1] & 0x80) === 0:
				rCorrectedBuffer = new ArrayBuffer(length - 1);
				rCorrectedView = new Uint8Array(rCorrectedBuffer);

				rCorrectedView.set(new Uint8Array(signatureBuffer, 1, length - 1));
				break;
			default:
				rCorrectedBuffer = rBuffer;
				rCorrectedView = rView;
		}
		// #endregion   

		// #region Get "s" part of ECDSA signature 
		switch (true) {
			case (sView[0] & 0x80) !== 0:
				sCorrectedBuffer = new ArrayBuffer(length + 1);
				sCorrectedView = new Uint8Array(sCorrectedBuffer);

				sCorrectedView[0] = 0x00;

				sCorrectedView.set(sView, 1);
				break;
			case sView[0] === 0x00 && (sView[1] & 0x80) === 0:
				sCorrectedBuffer = new ArrayBuffer(length - 1);
				sCorrectedView = new Uint8Array(sCorrectedBuffer);

				sCorrectedView.set(new Uint8Array(signatureBuffer, 1, length - 1));
				break;
			default:
				sCorrectedBuffer = sBuffer;
				sCorrectedView = sView;
		}
		// #endregion   

		// #region Create ASN.1 structure of CMS ECDSA signature 
		var rInteger = new Integer();
		rInteger.valueBlock.isHexOnly = true;
		rInteger.valueBlock.valueHex = rCorrectedBuffer.slice();

		var sInteger = new Integer();
		sInteger.valueBlock.isHexOnly = true;
		sInteger.valueBlock.valueHex = sCorrectedBuffer.slice();
		// #endregion

		return new Sequence({
			value: [rInteger, sInteger]
		}).toBER(false);
	}
	//**************************************************************************************
	/**
  * String preparation function. In a future here will be realization of algorithm from RFC4518
  * @param {string} inputString JavaScript string. As soon as for each ASN.1 string type we have a specific transformation function here we will work with pure JavaScript string
  * @returns {string} Formated string
  */
	function stringPrep(inputString) {
		var result = inputString.replace(/^\s+|\s+$/g, ""); // Trim input string
		result = result.replace(/\s+/g, " "); // Change all sequence of SPACE down to SPACE char
		result = result.toLowerCase();

		return result;
	}
	//**************************************************************************************
	/**
  * Create a single ArrayBuffer from CMS ECDSA signature
  * @param {Sequence} cmsSignature ASN.1 SEQUENCE contains CMS ECDSA signature
  * @returns {ArrayBuffer}
  */
	function createECDSASignatureFromCMS(cmsSignature) {
		// #region Check input variables
		if (cmsSignature instanceof Sequence === false) return new ArrayBuffer(0);

		if (cmsSignature.valueBlock.value.length !== 2) return new ArrayBuffer(0);

		if (cmsSignature.valueBlock.value[0] instanceof Integer === false) return new ArrayBuffer(0);

		if (cmsSignature.valueBlock.value[1] instanceof Integer === false) return new ArrayBuffer(0);
		// #endregion 

		// #region Aux functions 
		function transformInteger(integer) {
			var view = new Uint8Array(integer.valueBlock.valueHex);

			switch (integer.valueBlock.valueHex.byteLength) {
				case 32:
				case 48:
				case 66:
					return integer.valueBlock.valueHex;
				case 33:
				case 49:
				case 67:
					return view.slice(1).buffer;
				case 31:
				case 47:
				case 65:
					{
						var updatedBuffer = new ArrayBuffer(integer.valueBlock.valueHex.byteLength + 1);
						var updatedView = new Uint8Array(updatedBuffer);

						updatedView.set(view, 1);

						return updatedBuffer;
					}
				default:
					return new ArrayBuffer(0);
			}
		}
		// #endregion 

		var rBuffer = transformInteger(cmsSignature.valueBlock.value[0]);
		var sBuffer = transformInteger(cmsSignature.valueBlock.value[1]);

		return utilConcatBuf(rBuffer, sBuffer);
	}
	//**************************************************************************************
	/**
  * Get WebCrypto algorithm by wel-known OID
  * @param {string} oid Wel-known OID to search for
  * @returns {Object}
  */
	function getAlgorithmByOID(oid) {
		switch (oid) {
			case "1.2.840.113549.1.1.1":
			case "1.2.840.113549.1.1.5":
				return {
					name: "RSASSA-PKCS1-v1_5",
					hash: {
						name: "SHA-1"
					}
				};
			case "1.2.840.113549.1.1.11":
				return {
					name: "RSASSA-PKCS1-v1_5",
					hash: {
						name: "SHA-256"
					}
				};
			case "1.2.840.113549.1.1.12":
				return {
					name: "RSASSA-PKCS1-v1_5",
					hash: {
						name: "SHA-384"
					}
				};
			case "1.2.840.113549.1.1.13":
				return {
					name: "RSASSA-PKCS1-v1_5",
					hash: {
						name: "SHA-512"
					}
				};
			case "1.2.840.113549.1.1.10":
				return {
					name: "RSA-PSS"
				};
			case "1.2.840.113549.1.1.7":
				return {
					name: "RSA-OAEP"
				};
			case "1.2.840.10045.2.1":
			case "1.2.840.10045.4.1":
				return {
					name: "ECDSA",
					hash: {
						name: "SHA-1"
					}
				};
			case "1.2.840.10045.4.3.2":
				return {
					name: "ECDSA",
					hash: {
						name: "SHA-256"
					}
				};
			case "1.2.840.10045.4.3.3":
				return {
					name: "ECDSA",
					hash: {
						name: "SHA-384"
					}
				};
			case "1.2.840.10045.4.3.4":
				return {
					name: "ECDSA",
					hash: {
						name: "SHA-512"
					}
				};
			case "1.3.133.16.840.63.0.2":
				return {
					name: "ECDH",
					kdf: "SHA-1"
				};
			case "1.3.132.1.11.1":
				return {
					name: "ECDH",
					kdf: "SHA-256"
				};
			case "1.3.132.1.11.2":
				return {
					name: "ECDH",
					kdf: "SHA-384"
				};
			case "1.3.132.1.11.3":
				return {
					name: "ECDH",
					kdf: "SHA-512"
				};
			case "2.16.840.1.101.3.4.1.2":
				return {
					name: "AES-CBC",
					length: 128
				};
			case "2.16.840.1.101.3.4.1.22":
				return {
					name: "AES-CBC",
					length: 192
				};
			case "2.16.840.1.101.3.4.1.42":
				return {
					name: "AES-CBC",
					length: 256
				};
			case "2.16.840.1.101.3.4.1.6":
				return {
					name: "AES-GCM",
					length: 128
				};
			case "2.16.840.1.101.3.4.1.26":
				return {
					name: "AES-GCM",
					length: 192
				};
			case "2.16.840.1.101.3.4.1.46":
				return {
					name: "AES-GCM",
					length: 256
				};
			case "2.16.840.1.101.3.4.1.4":
				return {
					name: "AES-CFB",
					length: 128
				};
			case "2.16.840.1.101.3.4.1.24":
				return {
					name: "AES-CFB",
					length: 192
				};
			case "2.16.840.1.101.3.4.1.44":
				return {
					name: "AES-CFB",
					length: 256
				};
			case "2.16.840.1.101.3.4.1.5":
				return {
					name: "AES-KW",
					length: 128
				};
			case "2.16.840.1.101.3.4.1.25":
				return {
					name: "AES-KW",
					length: 192
				};
			case "2.16.840.1.101.3.4.1.45":
				return {
					name: "AES-KW",
					length: 256
				};
			case "1.2.840.113549.2.7":
				return {
					name: "HMAC",
					hash: {
						name: "SHA-1"
					}
				};
			case "1.2.840.113549.2.9":
				return {
					name: "HMAC",
					hash: {
						name: "SHA-256"
					}
				};
			case "1.2.840.113549.2.10":
				return {
					name: "HMAC",
					hash: {
						name: "SHA-384"
					}
				};
			case "1.2.840.113549.2.11":
				return {
					name: "HMAC",
					hash: {
						name: "SHA-512"
					}
				};
			case "1.2.840.113549.1.9.16.3.5":
				return {
					name: "DH"
				};
			case "1.3.14.3.2.26":
				return {
					name: "SHA-1"
				};
			case "2.16.840.1.101.3.4.2.1":
				return {
					name: "SHA-256"
				};
			case "2.16.840.1.101.3.4.2.2":
				return {
					name: "SHA-384"
				};
			case "2.16.840.1.101.3.4.2.3":
				return {
					name: "SHA-512"
				};
			case "1.2.840.113549.1.5.12":
				return {
					name: "PBKDF2"
				};
			//region Special case - OIDs for ECC curves
			case "1.2.840.10045.3.1.7":
				return {
					name: "P-256"
				};
			case "1.3.132.0.34":
				return {
					name: "P-384"
				};
			case "1.3.132.0.35":
				return {
					name: "P-521"
				};
			//endregion
			default:
		}

		return {};
	}
	//**************************************************************************************
	/**
  * Getting hash algorithm by signature algorithm
  * @param {AlgorithmIdentifier} signatureAlgorithm Signature algorithm
  * @returns {string}
  */
	function getHashAlgorithm(signatureAlgorithm) {
		var result = "";

		switch (signatureAlgorithm.algorithmId) {
			case "1.2.840.10045.4.1": // ecdsa-with-SHA1
			case "1.2.840.113549.1.1.5":
				result = "SHA-1";
				break;
			case "1.2.840.10045.4.3.2": // ecdsa-with-SHA256
			case "1.2.840.113549.1.1.11":
				result = "SHA-256";
				break;
			case "1.2.840.10045.4.3.3": // ecdsa-with-SHA384
			case "1.2.840.113549.1.1.12":
				result = "SHA-384";
				break;
			case "1.2.840.10045.4.3.4": // ecdsa-with-SHA512
			case "1.2.840.113549.1.1.13":
				result = "SHA-512";
				break;
			case "1.2.840.113549.1.1.10":
				// RSA-PSS
				{
					try {
						var params = new RSASSAPSSParams({ schema: signatureAlgorithm.algorithmParams });
						if ("hashAlgorithm" in params) {
							var algorithm = getAlgorithmByOID(params.hashAlgorithm.algorithmId);
							if ("name" in algorithm === false) return "";

							result = algorithm.name;
						} else result = "SHA-1";
					} catch (ex) {}
				}
				break;
			default:
		}

		return result;
	}
	//**************************************************************************************
	/**
  * ANS X9.63 Key Derivation Function having a "Counter" as a parameter
  * @param {string} hashFunction Used hash function
  * @param {ArrayBuffer} Zbuffer ArrayBuffer containing ECDH shared secret to derive from
  * @param {number} Counter
  * @param {ArrayBuffer} SharedInfo Usually DER encoded "ECC_CMS_SharedInfo" structure
  */
	function kdfWithCounter(hashFunction, Zbuffer, Counter, SharedInfo) {
		//region Check of input parameters
		switch (hashFunction.toUpperCase()) {
			case "SHA-1":
			case "SHA-256":
			case "SHA-384":
			case "SHA-512":
				break;
			default:
				return Promise.reject('Unknown hash function: ' + hashFunction);
		}

		if (Zbuffer instanceof ArrayBuffer === false) return Promise.reject("Please set \"Zbuffer\" as \"ArrayBuffer\"");

		if (Zbuffer.byteLength === 0) return Promise.reject("\"Zbuffer\" has zero length, error");

		if (SharedInfo instanceof ArrayBuffer === false) return Promise.reject("Please set \"SharedInfo\" as \"ArrayBuffer\"");

		if (Counter > 255) return Promise.reject("Please set \"Counter\" variable to value less or equal to 255");
		//endregion

		//region Initial variables
		var counterBuffer = new ArrayBuffer(4);
		var counterView = new Uint8Array(counterBuffer);
		counterView[0] = 0x00;
		counterView[1] = 0x00;
		counterView[2] = 0x00;
		counterView[3] = Counter;

		var combinedBuffer = new ArrayBuffer(0);
		//endregion

		//region Get a "crypto" extension
		var crypto = getCrypto();
		if (typeof crypto === "undefined") return Promise.reject("Unable to create WebCrypto object");
		//endregion

		//region Create a combined ArrayBuffer for digesting
		combinedBuffer = utilConcatBuf(combinedBuffer, Zbuffer);
		combinedBuffer = utilConcatBuf(combinedBuffer, counterBuffer);
		combinedBuffer = utilConcatBuf(combinedBuffer, SharedInfo);
		//endregion

		//region Return digest of combined ArrayBuffer and information about current counter
		return crypto.digest({
			name: hashFunction
		}, combinedBuffer).then(function (result) {
			return {
				counter: Counter,
				result: result
			};
		});
		//endregion
	}
	//**************************************************************************************
	/**
  * ANS X9.63 Key Derivation Function
  * @param {string} hashFunction Used hash function
  * @param {ArrayBuffer} Zbuffer ArrayBuffer containing ECDH shared secret to derive from
  * @param {number} keydatalen Length (!!! in BITS !!!) of used kew derivation function
  * @param {ArrayBuffer} SharedInfo Usually DER encoded "ECC_CMS_SharedInfo" structure
  */

	//**************************************************************************************
	//endregion
	//**************************************************************************************

	//**************************************************************************************

	var AttributeTypeAndValue = function () {
		//**********************************************************************************
		/**
   * Constructor for AttributeTypeAndValue class
   * @param {Object} [parameters={}]
   * @property {Object} [schema] asn1js parsed value
   */
		function AttributeTypeAndValue() {
			var parameters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

			_classCallCheck(this, AttributeTypeAndValue);

			//region Internal properties of the object
			/**
    * @type {string}
    * @description type
    */
			this.type = getParametersValue(parameters, "type", AttributeTypeAndValue.defaultValues("type"));
			/**
    * @type {Object}
    * @description Value of the AttributeTypeAndValue class
    */
			this.value = getParametersValue(parameters, "value", AttributeTypeAndValue.defaultValues("value"));
			//endregion

			//region If input argument array contains "schema" for this object
			if ("schema" in parameters) this.fromSchema(parameters.schema);
			//endregion
		}
		//**********************************************************************************
		/**
   * Return default values for all class members
   * @param {string} memberName String name for a class member
   */


		_createClass(AttributeTypeAndValue, [{
			key: 'fromSchema',

			//**********************************************************************************
			/**
    * Convert parsed asn1js object into current class
    * @param {!Object} schema
    */
			value: function fromSchema(schema) {
				//region Check the schema is valid
				/**
     * @type {{verified: boolean}|{verified: boolean, result: {type: Object, typeValue: Object}}}
     */
				var asn1 = compareSchema(schema, schema, AttributeTypeAndValue.schema({
					names: {
						type: "type",
						value: "typeValue"
					}
				}));

				if (asn1.verified === false) throw new Error("Object's schema was not verified against input data for ATTR_TYPE_AND_VALUE");
				//endregion

				//region Get internal properties from parsed schema
				this.type = asn1.result.type.valueBlock.toString();
				this.value = asn1.result.typeValue;
				//endregion
			}
			//**********************************************************************************
			/**
    * Convert current object to asn1js object and set correct values
    * @returns {Object} asn1js object
    */

		}, {
			key: 'toSchema',
			value: function toSchema() {
				//region Construct and return new ASN.1 schema for this object
				return new Sequence({
					value: [new ObjectIdentifier$1({ value: this.type }), this.value]
				});
				//endregion
			}
			//**********************************************************************************
			/**
    * Convertion for the class to JSON object
    * @returns {Object}
    */

		}, {
			key: 'toJSON',
			value: function toJSON() {
				var _object = {
					type: this.type
				};

				if (Object.keys(this.value).length !== 0) _object.value = this.value.toJSON();else _object.value = this.value;

				return _object;
			}
			//**********************************************************************************
			/**
    * Compare two AttributeTypeAndValue values, or AttributeTypeAndValue with ArrayBuffer value
    * @param {(AttributeTypeAndValue|ArrayBuffer)} compareTo The value compare to current
    * @returns {boolean}
    */

		}, {
			key: 'isEqual',
			value: function isEqual(compareTo) {
				if (compareTo instanceof AttributeTypeAndValue) {
					if (this.type !== compareTo.type) return false;

					if (this.value instanceof Utf8String && compareTo.value instanceof Utf8String || this.value instanceof BmpString && compareTo.value instanceof BmpString || this.value instanceof UniversalString && compareTo.value instanceof UniversalString || this.value instanceof NumericString && compareTo.value instanceof NumericString || this.value instanceof PrintableString && compareTo.value instanceof PrintableString || this.value instanceof TeletexString && compareTo.value instanceof TeletexString || this.value instanceof VideotexString && compareTo.value instanceof VideotexString || this.value instanceof IA5String && compareTo.value instanceof IA5String || this.value instanceof GraphicString && compareTo.value instanceof GraphicString || this.value instanceof VisibleString && compareTo.value instanceof VisibleString || this.value instanceof GeneralString && compareTo.value instanceof GeneralString || this.value instanceof CharacterString && compareTo.value instanceof CharacterString) {
						var value1 = stringPrep(this.value.valueBlock.value);
						var value2 = stringPrep(compareTo.value.valueBlock.value);

						if (value1.localeCompare(value2) !== 0) return false;
					} else // Comparing as two ArrayBuffers
						{
							if (isEqualBuffer(this.value.valueBeforeDecode, compareTo.value.valueBeforeDecode) === false) return false;
						}

					return true;
				}

				if (compareTo instanceof ArrayBuffer) return isEqualBuffer(this.value.valueBeforeDecode, compareTo);

				return false;
			}
			//**********************************************************************************

		}], [{
			key: 'defaultValues',
			value: function defaultValues(memberName) {
				switch (memberName) {
					case "type":
						return "";
					case "value":
						return {};
					default:
						throw new Error('Invalid member name for AttributeTypeAndValue class: ' + memberName);
				}
			}
			//**********************************************************************************
			/**
    * Return value of asn1js schema for current class
    * @param {Object} parameters Input parameters for the schema
    * @returns {Object} asn1js schema object
    */

		}, {
			key: 'schema',
			value: function schema() {
				var parameters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

				//AttributeTypeAndValue ::= Sequence {
				//    type     AttributeType,
				//    value    AttributeValue }
				//
				//AttributeType ::= OBJECT IDENTIFIER
				//
				//AttributeValue ::= ANY -- DEFINED BY AttributeType

				/**
     * @type {Object}
     * @property {string} [blockName] Name for entire block
     * @property {string} [type] Name for "type" element
     * @property {string} [value] Name for "value" element
     */
				var names = getParametersValue(parameters, "names", {});

				return new Sequence({
					name: names.blockName || "",
					value: [new ObjectIdentifier$1({ name: names.type || "" }), new Any$1({ name: names.value || "" })]
				});
			}
		}]);

		return AttributeTypeAndValue;
	}();
	//**************************************************************************************

	//**************************************************************************************


	var RelativeDistinguishedNames = function () {
		//**********************************************************************************
		/**
   * Constructor for RelativeDistinguishedNames class
   * @param {Object} [parameters={}]
   * @property {Object} [schema] asn1js parsed value
   * @property {Array.<AttributeTypeAndValue>} [typesAndValues] Array of "type and value" objects
   * @property {ArrayBuffer} [valueBeforeDecode] Value of the RDN before decoding from schema
   */
		function RelativeDistinguishedNames() {
			var parameters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

			_classCallCheck(this, RelativeDistinguishedNames);

			//region Internal properties of the object
			/**
    * @type {Array.<AttributeTypeAndValue>}
    * @description Array of "type and value" objects
    */
			this.typesAndValues = getParametersValue(parameters, "typesAndValues", RelativeDistinguishedNames.defaultValues("typesAndValues"));
			/**
    * @type {ArrayBuffer}
    * @description Value of the RDN before decoding from schema
    */
			this.valueBeforeDecode = getParametersValue(parameters, "valueBeforeDecode", RelativeDistinguishedNames.defaultValues("valueBeforeDecode"));
			//endregion

			//region If input argument array contains "schema" for this object
			if ("schema" in parameters) this.fromSchema(parameters.schema);
			//endregion
		}
		//**********************************************************************************
		/**
   * Return default values for all class members
   * @param {string} memberName String name for a class member
   */


		_createClass(RelativeDistinguishedNames, [{
			key: 'fromSchema',

			//**********************************************************************************
			/**
    * Convert parsed asn1js object into current class
    * @param {!Object} schema
    */
			value: function fromSchema(schema) {
				//region Check the schema is valid
				/**
     * @type {{verified: boolean}|{verified: boolean, result: {RDN: Object, typesAndValues: Array.<Object>}}}
     */
				var asn1 = compareSchema(schema, schema, RelativeDistinguishedNames.schema({
					names: {
						blockName: "RDN",
						repeatedSet: "typesAndValues"
					}
				}));

				if (asn1.verified === false) throw new Error("Object's schema was not verified against input data for RDN");
				//endregion

				//region Get internal properties from parsed schema
				if ("typesAndValues" in asn1.result) // Could be a case when there is no "types and values"
					this.typesAndValues = Array.from(asn1.result.typesAndValues, function (element) {
						return new AttributeTypeAndValue({ schema: element });
					});

				this.valueBeforeDecode = asn1.result.RDN.valueBeforeDecode;
				//endregion
			}
			//**********************************************************************************
			/**
    * Convert current object to asn1js object and set correct values
    * @returns {Object} asn1js object
    */

		}, {
			key: 'toSchema',
			value: function toSchema() {
				//region Decode stored TBS value
				if (this.valueBeforeDecode.byteLength === 0) // No stored encoded array, create "from scratch"
					{
						return new Sequence({
							value: [new Set({
								value: Array.from(this.typesAndValues, function (element) {
									return element.toSchema();
								})
							})]
						});
					}

				var asn1 = fromBER(this.valueBeforeDecode);
				//endregion

				//region Construct and return new ASN.1 schema for this object
				return asn1.result;
				//endregion
			}
			//**********************************************************************************
			/**
    * Convertion for the class to JSON object
    * @returns {Object}
    */

		}, {
			key: 'toJSON',
			value: function toJSON() {
				return {
					typesAndValues: Array.from(this.typesAndValues, function (element) {
						return element.toJSON();
					})
				};
			}
			//**********************************************************************************
			/**
    * Compare two RDN values, or RDN with ArrayBuffer value
    * @param {(RelativeDistinguishedNames|ArrayBuffer)} compareTo The value compare to current
    * @returns {boolean}
    */

		}, {
			key: 'isEqual',
			value: function isEqual(compareTo) {
				if (compareTo instanceof RelativeDistinguishedNames) {
					if (this.typesAndValues.length !== compareTo.typesAndValues.length) return false;

					var _iteratorNormalCompletion14 = true;
					var _didIteratorError14 = false;
					var _iteratorError14 = undefined;

					try {
						for (var _iterator14 = this.typesAndValues.entries()[Symbol.iterator](), _step14; !(_iteratorNormalCompletion14 = (_step14 = _iterator14.next()).done); _iteratorNormalCompletion14 = true) {
							var _step14$value = _slicedToArray(_step14.value, 2),
							    index = _step14$value[0],
							    typeAndValue = _step14$value[1];

							if (typeAndValue.isEqual(compareTo.typesAndValues[index]) === false) return false;
						}
					} catch (err) {
						_didIteratorError14 = true;
						_iteratorError14 = err;
					} finally {
						try {
							if (!_iteratorNormalCompletion14 && _iterator14.return) {
								_iterator14.return();
							}
						} finally {
							if (_didIteratorError14) {
								throw _iteratorError14;
							}
						}
					}

					return true;
				}

				if (compareTo instanceof ArrayBuffer) return isEqualBuffer(this.valueBeforeDecode, compareTo);

				return false;
			}
			//**********************************************************************************

		}], [{
			key: 'defaultValues',
			value: function defaultValues(memberName) {
				switch (memberName) {
					case "typesAndValues":
						return [];
					case "valueBeforeDecode":
						return new ArrayBuffer(0);
					default:
						throw new Error('Invalid member name for RelativeDistinguishedNames class: ' + memberName);
				}
			}
			//**********************************************************************************
			/**
    * Compare values with default values for all class members
    * @param {string} memberName String name for a class member
    * @param {*} memberValue Value to compare with default value
    */

		}, {
			key: 'compareWithDefault',
			value: function compareWithDefault(memberName, memberValue) {
				switch (memberName) {
					case "typesAndValues":
						return memberValue.length === 0;
					case "valueBeforeDecode":
						return memberValue.byteLength === 0;
					default:
						throw new Error('Invalid member name for RelativeDistinguishedNames class: ' + memberName);
				}
			}
			//**********************************************************************************
			/**
    * Return value of asn1js schema for current class
    * @param {Object} parameters Input parameters for the schema
    * @returns {Object} asn1js schema object
    */

		}, {
			key: 'schema',
			value: function schema() {
				var parameters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

				//RDNSequence ::= Sequence OF RelativeDistinguishedName
				//
				//RelativeDistinguishedName ::=
				//SET SIZE (1..MAX) OF AttributeTypeAndValue

				/**
     * @type {Object}
     * @property {string} [blockName] Name for entire block
     * @property {string} [repeatedSequence] Name for "repeatedSequence" block
     * @property {string} [repeatedSet] Name for "repeatedSet" block
     * @property {string} [typeAndValue] Name for "typeAndValue" block
     */
				var names = getParametersValue(parameters, "names", {});

				return new Sequence({
					name: names.blockName || "",
					value: [new Repeated({
						name: names.repeatedSequence || "",
						value: new Set({
							value: [new Repeated({
								name: names.repeatedSet || "",
								value: AttributeTypeAndValue.schema(names.typeAndValue || {})
							})]
						})
					})]
				});
			}
		}]);

		return RelativeDistinguishedNames;
	}();
	//**************************************************************************************

	//**************************************************************************************
	//region Additional asn1js schema elements existing inside GENERAL_NAME schema
	//**************************************************************************************
	/**
  * Schema for "builtInStandardAttributes" of "ORAddress"
  * @param {Object} parameters
  * @property {Object} [names]
  * @param {boolean} optional
  * @returns {Sequence}
  */


	function builtInStandardAttributes() {
		var parameters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
		var optional = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

		//builtInStandardAttributes ::= Sequence {
		//    country-name                  CountryName OPTIONAL,
		//    administration-domain-name    AdministrationDomainName OPTIONAL,
		//    network-address           [0] IMPLICIT NetworkAddress OPTIONAL,
		//    terminal-identifier       [1] IMPLICIT TerminalIdentifier OPTIONAL,
		//    private-domain-name       [2] PrivateDomainName OPTIONAL,
		//    organization-name         [3] IMPLICIT OrganizationName OPTIONAL,
		//    numeric-user-identifier   [4] IMPLICIT NumericUserIdentifier OPTIONAL,
		//    personal-name             [5] IMPLICIT PersonalName OPTIONAL,
		//    organizational-unit-names [6] IMPLICIT OrganizationalUnitNames OPTIONAL }

		/**
   * @type {Object}
   * @property {string} [country_name]
   * @property {string} [administration_domain_name]
   * @property {string} [network_address]
   * @property {string} [terminal_identifier]
   * @property {string} [private_domain_name]
   * @property {string} [organization_name]
   * @property {string} [numeric_user_identifier]
   * @property {string} [personal_name]
   * @property {string} [organizational_unit_names]
   */
		var names = getParametersValue(parameters, "names", {});

		return new Sequence({
			optional: optional,
			value: [new Constructed({
				optional: true,
				idBlock: {
					tagClass: 2, // APPLICATION-SPECIFIC
					tagNumber: 1 // [1]
				},
				name: names.country_name || "",
				value: [new Choice({
					value: [new NumericString(), new PrintableString()]
				})]
			}), new Constructed({
				optional: true,
				idBlock: {
					tagClass: 2, // APPLICATION-SPECIFIC
					tagNumber: 2 // [2]
				},
				name: names.administration_domain_name || "",
				value: [new Choice({
					value: [new NumericString(), new PrintableString()]
				})]
			}), new Primitive({
				optional: true,
				idBlock: {
					tagClass: 3, // CONTEXT-SPECIFIC
					tagNumber: 0 // [0]
				},
				name: names.network_address || "",
				isHexOnly: true
			}), new Primitive({
				optional: true,
				idBlock: {
					tagClass: 3, // CONTEXT-SPECIFIC
					tagNumber: 1 // [1]
				},
				name: names.terminal_identifier || "",
				isHexOnly: true
			}), new Constructed({
				optional: true,
				idBlock: {
					tagClass: 3, // CONTEXT-SPECIFIC
					tagNumber: 2 // [2]
				},
				name: names.private_domain_name || "",
				value: [new Choice({
					value: [new NumericString(), new PrintableString()]
				})]
			}), new Primitive({
				optional: true,
				idBlock: {
					tagClass: 3, // CONTEXT-SPECIFIC
					tagNumber: 3 // [3]
				},
				name: names.organization_name || "",
				isHexOnly: true
			}), new Primitive({
				optional: true,
				name: names.numeric_user_identifier || "",
				idBlock: {
					tagClass: 3, // CONTEXT-SPECIFIC
					tagNumber: 4 // [4]
				},
				isHexOnly: true
			}), new Constructed({
				optional: true,
				name: names.personal_name || "",
				idBlock: {
					tagClass: 3, // CONTEXT-SPECIFIC
					tagNumber: 5 // [5]
				},
				value: [new Primitive({
					idBlock: {
						tagClass: 3, // CONTEXT-SPECIFIC
						tagNumber: 0 // [0]
					},
					isHexOnly: true
				}), new Primitive({
					optional: true,
					idBlock: {
						tagClass: 3, // CONTEXT-SPECIFIC
						tagNumber: 1 // [1]
					},
					isHexOnly: true
				}), new Primitive({
					optional: true,
					idBlock: {
						tagClass: 3, // CONTEXT-SPECIFIC
						tagNumber: 2 // [2]
					},
					isHexOnly: true
				}), new Primitive({
					optional: true,
					idBlock: {
						tagClass: 3, // CONTEXT-SPECIFIC
						tagNumber: 3 // [3]
					},
					isHexOnly: true
				})]
			}), new Constructed({
				optional: true,
				name: names.organizational_unit_names || "",
				idBlock: {
					tagClass: 3, // CONTEXT-SPECIFIC
					tagNumber: 6 // [6]
				},
				value: [new Repeated({
					value: new PrintableString()
				})]
			})]
		});
	}
	//**************************************************************************************
	/**
  * Schema for "builtInDomainDefinedAttributes" of "ORAddress"
  * @param {boolean} optional
  * @returns {Sequence}
  */
	function builtInDomainDefinedAttributes() {
		var optional = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

		return new Sequence({
			optional: optional,
			value: [new PrintableString(), new PrintableString()]
		});
	}
	//**************************************************************************************
	/**
  * Schema for "builtInDomainDefinedAttributes" of "ORAddress"
  * @param {boolean} optional
  * @returns {Set}
  */
	function extensionAttributes() {
		var optional = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

		return new Set({
			optional: optional,
			value: [new Primitive({
				optional: true,
				idBlock: {
					tagClass: 3, // CONTEXT-SPECIFIC
					tagNumber: 0 // [0]
				},
				isHexOnly: true
			}), new Constructed({
				optional: true,
				idBlock: {
					tagClass: 3, // CONTEXT-SPECIFIC
					tagNumber: 1 // [1]
				},
				value: [new Any$1()]
			})]
		});
	}
	//**************************************************************************************
	//endregion
	//**************************************************************************************
	/**
  * @class
  * @description GeneralName
  */

	var GeneralName = function () {
		//**********************************************************************************
		/**
   * Constructor for GeneralName class
   * @param {Object} [parameters={}]
   * @property {Object} [schema] asn1js parsed value
   * @property {number} [type] value type - from a tagged value (0 for "otherName", 1 for "rfc822Name" etc.)
   * @property {Object} [value] asn1js object having GENERAL_NAME value (type depends on "type" value)
   */
		function GeneralName() {
			var parameters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

			_classCallCheck(this, GeneralName);

			//region Internal properties of the object
			/**
    * @type {number}
    * @description value type - from a tagged value (0 for "otherName", 1 for "rfc822Name" etc.)
    */
			this.type = getParametersValue(parameters, "type", GeneralName.defaultValues("type"));
			/**
    * @type {Object}
    * @description asn1js object having GENERAL_NAME value (type depends on "type" value)
    */
			this.value = getParametersValue(parameters, "value", GeneralName.defaultValues("value"));
			//endregion

			//region If input argument array contains "schema" for this object
			if ("schema" in parameters) this.fromSchema(parameters.schema);
			//endregion
		}
		//**********************************************************************************
		/**
   * Return default values for all class members
   * @param {string} memberName String name for a class member
   */


		_createClass(GeneralName, [{
			key: 'fromSchema',

			//**********************************************************************************
			/**
    * Convert parsed asn1js object into current class
    * @param {!Object} schema
    */
			value: function fromSchema(schema) {
				//region Check the schema is valid
				var asn1 = compareSchema(schema, schema, GeneralName.schema({
					names: {
						blockName: "blockName",
						otherName: "otherName",
						rfc822Name: "rfc822Name",
						dNSName: "dNSName",
						x400Address: "x400Address",
						directoryName: {
							names: {
								blockName: "directoryName"
							}
						},
						ediPartyName: "ediPartyName",
						uniformResourceIdentifier: "uniformResourceIdentifier",
						iPAddress: "iPAddress",
						registeredID: "registeredID"
					}
				}));

				if (asn1.verified === false) throw new Error("Object's schema was not verified against input data for GENERAL_NAME");
				//endregion

				//region Get internal properties from parsed schema
				this.type = asn1.result.blockName.idBlock.tagNumber;

				switch (this.type) {
					case 0:
						// otherName
						this.value = asn1.result.blockName;
						break;
					case 1: // rfc822Name + dNSName + uniformResourceIdentifier
					case 2:
					case 6:
						{
							var value = asn1.result.blockName;

							value.idBlock.tagClass = 1; // UNIVERSAL
							value.idBlock.tagNumber = 22; // IA5STRING

							var valueBER = value.toBER(false);

							this.value = fromBER(valueBER).result.valueBlock.value;
						}
						break;
					case 3:
						// x400Address
						this.value = asn1.result.blockName;
						break;
					case 4:
						// directoryName
						this.value = new RelativeDistinguishedNames({ schema: asn1.result.directoryName });
						break;
					case 5:
						// ediPartyName
						this.value = asn1.result.ediPartyName;
						break;
					case 7:
						// iPAddress
						this.value = new OctetString({ valueHex: asn1.result.blockName.valueBlock.valueHex });
						break;
					case 8:
						// registeredID
						{
							var _value7 = asn1.result.blockName;

							_value7.idBlock.tagClass = 1; // UNIVERSAL
							_value7.idBlock.tagNumber = 6; // ObjectIdentifier

							var _valueBER = _value7.toBER(false);

							this.value = fromBER(_valueBER).result.valueBlock.toString(); // Getting a string representation of the ObjectIdentifier
						}
						break;
					default:
				}
				//endregion
			}
			//**********************************************************************************
			/**
    * Convert current object to asn1js object and set correct values
    * @returns {Object} asn1js object
    */

		}, {
			key: 'toSchema',
			value: function toSchema() {
				//region Construct and return new ASN.1 schema for this object
				switch (this.type) {
					case 0:
					case 3:
					case 5:
						return new Constructed({
							idBlock: {
								tagClass: 3, // CONTEXT-SPECIFIC
								tagNumber: this.type
							},
							value: [this.value]
						});
					case 1:
					case 2:
					case 6:
						{
							var value = new IA5String({ value: this.value });

							value.idBlock.tagClass = 3;
							value.idBlock.tagNumber = this.type;

							return value;
						}
					case 4:
						return new Constructed({
							idBlock: {
								tagClass: 3, // CONTEXT-SPECIFIC
								tagNumber: 4
							},
							value: [this.value.toSchema()]
						});
					case 7:
						{
							var _value8 = this.value;

							_value8.idBlock.tagClass = 3;
							_value8.idBlock.tagNumber = this.type;

							return _value8;
						}
					case 8:
						{
							var _value9 = new ObjectIdentifier$1({ value: this.value });

							_value9.idBlock.tagClass = 3;
							_value9.idBlock.tagNumber = this.type;

							return _value9;
						}
					default:
						return GeneralName.schema();
				}
				//endregion
			}
			//**********************************************************************************
			/**
    * Convertion for the class to JSON object
    * @returns {Object}
    */

		}, {
			key: 'toJSON',
			value: function toJSON() {
				var _object = {
					type: this.type
				};

				if (typeof this.value === "string") _object.value = this.value;else _object.value = this.value.toJSON();

				return _object;
			}
			//**********************************************************************************

		}], [{
			key: 'defaultValues',
			value: function defaultValues(memberName) {
				switch (memberName) {
					case "type":
						return 9;
					case "value":
						return {};
					default:
						throw new Error('Invalid member name for GeneralName class: ' + memberName);
				}
			}
			//**********************************************************************************
			/**
    * Compare values with default values for all class members
    * @param {string} memberName String name for a class member
    * @param {*} memberValue Value to compare with default value
    */

		}, {
			key: 'compareWithDefault',
			value: function compareWithDefault(memberName, memberValue) {
				switch (memberName) {
					case "type":
						return memberValue === GeneralName.defaultValues(memberName);
					case "value":
						return Object.keys(memberValue).length === 0;
					default:
						throw new Error('Invalid member name for GeneralName class: ' + memberName);
				}
			}
			//**********************************************************************************
			/**
    * Return value of asn1js schema for current class
    * @param {Object} parameters Input parameters for the schema
    * @returns {Object} asn1js schema object
    */

		}, {
			key: 'schema',
			value: function schema() {
				var parameters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

				//GeneralName ::= Choice {
				//    otherName                       [0]     OtherName,
				//    rfc822Name                      [1]     IA5String,
				//    dNSName                         [2]     IA5String,
				//    x400Address                     [3]     ORAddress,
				//    directoryName                   [4]     value,
				//    ediPartyName                    [5]     EDIPartyName,
				//    uniformResourceIdentifier       [6]     IA5String,
				//    iPAddress                       [7]     OCTET STRING,
				//    registeredID                    [8]     OBJECT IDENTIFIER }

				/**
     * @type {Object}
     * @property {string} [blockName]
     * @property {Object} [directoryName]
     * @property {Object} [builtInStandardAttributes]
     */
				var names = getParametersValue(parameters, "names", {});

				return new Choice({
					value: [new Constructed({
						idBlock: {
							tagClass: 3, // CONTEXT-SPECIFIC
							tagNumber: 0 // [0]
						},
						name: names.blockName || "",
						value: [new ObjectIdentifier$1(), new Constructed({
							idBlock: {
								tagClass: 3, // CONTEXT-SPECIFIC
								tagNumber: 0 // [0]
							},
							value: [new Any$1()]
						})]
					}), new Primitive({
						name: names.blockName || "",
						idBlock: {
							tagClass: 3, // CONTEXT-SPECIFIC
							tagNumber: 1 // [1]
						}
					}), new Primitive({
						name: names.blockName || "",
						idBlock: {
							tagClass: 3, // CONTEXT-SPECIFIC
							tagNumber: 2 // [2]
						}
					}), new Constructed({
						idBlock: {
							tagClass: 3, // CONTEXT-SPECIFIC
							tagNumber: 3 // [3]
						},
						name: names.blockName || "",
						value: [builtInStandardAttributes(names.builtInStandardAttributes || {}, false), builtInDomainDefinedAttributes(true), extensionAttributes(true)]
					}), new Constructed({
						idBlock: {
							tagClass: 3, // CONTEXT-SPECIFIC
							tagNumber: 4 // [4]
						},
						name: names.blockName || "",
						value: [RelativeDistinguishedNames.schema(names.directoryName || {})]
					}), new Constructed({
						idBlock: {
							tagClass: 3, // CONTEXT-SPECIFIC
							tagNumber: 5 // [5]
						},
						name: names.blockName || "",
						value: [new Constructed({
							optional: true,
							idBlock: {
								tagClass: 3, // CONTEXT-SPECIFIC
								tagNumber: 0 // [0]
							},
							value: [new Choice({
								value: [new TeletexString(), new PrintableString(), new UniversalString(), new Utf8String(), new BmpString()]
							})]
						}), new Constructed({
							idBlock: {
								tagClass: 3, // CONTEXT-SPECIFIC
								tagNumber: 1 // [1]
							},
							value: [new Choice({
								value: [new TeletexString(), new PrintableString(), new UniversalString(), new Utf8String(), new BmpString()]
							})]
						})]
					}), new Primitive({
						name: names.blockName || "",
						idBlock: {
							tagClass: 3, // CONTEXT-SPECIFIC
							tagNumber: 6 // [6]
						}
					}), new Primitive({
						name: names.blockName || "",
						idBlock: {
							tagClass: 3, // CONTEXT-SPECIFIC
							tagNumber: 7 // [7]
						}
					}), new Primitive({
						name: names.blockName || "",
						idBlock: {
							tagClass: 3, // CONTEXT-SPECIFIC
							tagNumber: 8 // [8]
						}
					})]
				});
			}
		}]);

		return GeneralName;
	}();
	//**************************************************************************************

	//**************************************************************************************
	/**
  * Class from RFC5280
  */


	var AccessDescription = function () {
		//**********************************************************************************
		/**
   * Constructor for AccessDescription class
   * @param {Object} [parameters={}]
   * @property {Object} [schema] asn1js parsed value
   */
		function AccessDescription() {
			var parameters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

			_classCallCheck(this, AccessDescription);

			//region Internal properties of the object
			/**
    * @type {string}
    * @description accessMethod
    */
			this.accessMethod = getParametersValue(parameters, "accessMethod", AccessDescription.defaultValues("accessMethod"));
			/**
    * @type {GeneralName}
    * @description accessLocation
    */
			this.accessLocation = getParametersValue(parameters, "accessLocation", AccessDescription.defaultValues("accessLocation"));
			//endregion

			//region If input argument array contains "schema" for this object
			if ("schema" in parameters) this.fromSchema(parameters.schema);
			//endregion
		}
		//**********************************************************************************
		/**
   * Return default values for all class members
   * @param {string} memberName String name for a class member
   */


		_createClass(AccessDescription, [{
			key: 'fromSchema',

			//**********************************************************************************
			/**
    * Convert parsed asn1js object into current class
    * @param {!Object} schema
    */
			value: function fromSchema(schema) {
				//region Check the schema is valid
				var asn1 = compareSchema(schema, schema, AccessDescription.schema({
					names: {
						accessMethod: "accessMethod",
						accessLocation: {
							names: {
								blockName: "accessLocation"
							}
						}
					}
				}));

				if (asn1.verified === false) throw new Error("Object's schema was not verified against input data for AccessDescription");
				//endregion

				//region Get internal properties from parsed schema
				this.accessMethod = asn1.result.accessMethod.valueBlock.toString();
				this.accessLocation = new GeneralName({ schema: asn1.result.accessLocation });
				//endregion
			}
			//**********************************************************************************
			/**
    * Convert current object to asn1js object and set correct values
    * @returns {Object} asn1js object
    */

		}, {
			key: 'toSchema',
			value: function toSchema() {
				//region Construct and return new ASN.1 schema for this object
				return new Sequence({
					value: [new ObjectIdentifier$1({ value: this.accessMethod }), this.accessLocation.toSchema()]
				});
				//endregion
			}
			//**********************************************************************************
			/**
    * Convertion for the class to JSON object
    * @returns {Object}
    */

		}, {
			key: 'toJSON',
			value: function toJSON() {
				return {
					accessMethod: this.accessMethod,
					accessLocation: this.accessLocation.toJSON()
				};
			}
			//**********************************************************************************

		}], [{
			key: 'defaultValues',
			value: function defaultValues(memberName) {
				switch (memberName) {
					case "accessMethod":
						return "";
					case "accessLocation":
						return new GeneralName();
					default:
						throw new Error('Invalid member name for AccessDescription class: ' + memberName);
				}
			}
			//**********************************************************************************
			/**
    * Return value of asn1js schema for current class
    * @param {Object} parameters Input parameters for the schema
    * @returns {Object} asn1js schema object
    */

		}, {
			key: 'schema',
			value: function schema() {
				var parameters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

				//AccessDescription  ::=  SEQUENCE {
				//    accessMethod          OBJECT IDENTIFIER,
				//    accessLocation        GeneralName  }

				/**
     * @type {Object}
     * @property {string} [blockName]
     * @property {string} [accessMethod]
     * @property {string} [accessLocation]
     */
				var names = getParametersValue(parameters, "names", {});

				return new Sequence({
					name: names.blockName || "",
					value: [new ObjectIdentifier$1({ name: names.accessMethod || "" }), GeneralName.schema(names.accessLocation || {})]
				});
			}
		}]);

		return AccessDescription;
	}();
	//**************************************************************************************

	//**************************************************************************************

	//**************************************************************************************
	/**
  * Class from RFC5280
  */


	var AltName = function () {
		//**********************************************************************************
		/**
   * Constructor for AltName class
   * @param {Object} [parameters={}]
   * @property {Object} [schema] asn1js parsed value
   */
		function AltName() {
			var parameters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

			_classCallCheck(this, AltName);

			//region Internal properties of the object
			/**
    * @type {Array.<GeneralName>}
    * @description type
    */
			this.altNames = getParametersValue(parameters, "altNames", AltName.defaultValues("altNames"));
			//endregion

			//region If input argument array contains "schema" for this object
			if ("schema" in parameters) this.fromSchema(parameters.schema);
			//endregion
		}
		//**********************************************************************************
		/**
   * Return default values for all class members
   * @param {string} memberName String name for a class member
   */


		_createClass(AltName, [{
			key: 'fromSchema',

			//**********************************************************************************
			/**
    * Convert parsed asn1js object into current class
    * @param {!Object} schema
    */
			value: function fromSchema(schema) {
				//region Check the schema is valid
				var asn1 = compareSchema(schema, schema, AltName.schema({
					names: {
						altNames: "altNames"
					}
				}));

				if (asn1.verified === false) throw new Error("Object's schema was not verified against input data for AltName");
				//endregion

				//region Get internal properties from parsed schema
				if ("altNames" in asn1.result) this.altNames = Array.from(asn1.result.altNames, function (element) {
					return new GeneralName({ schema: element });
				});
				//endregion
			}
			//**********************************************************************************
			/**
    * Convert current object to asn1js object and set correct values
    * @returns {Object} asn1js object
    */

		}, {
			key: 'toSchema',
			value: function toSchema() {
				//region Construct and return new ASN.1 schema for this object
				return new Sequence({
					value: Array.from(this.altNames, function (element) {
						return element.toSchema();
					})
				});
				//endregion
			}
			//**********************************************************************************
			/**
    * Convertion for the class to JSON object
    * @returns {Object}
    */

		}, {
			key: 'toJSON',
			value: function toJSON() {
				return {
					altNames: Array.from(this.altNames, function (element) {
						return element.toJSON();
					})
				};
			}
			//**********************************************************************************

		}], [{
			key: 'defaultValues',
			value: function defaultValues(memberName) {
				switch (memberName) {
					case "altNames":
						return [];
					default:
						throw new Error('Invalid member name for AltName class: ' + memberName);
				}
			}
			//**********************************************************************************
			/**
    * Return value of asn1js schema for current class
    * @param {Object} parameters Input parameters for the schema
    * @returns {Object} asn1js schema object
    */

		}, {
			key: 'schema',
			value: function schema() {
				var parameters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

				// SubjectAltName OID ::= 2.5.29.17
				// IssuerAltName OID ::= 2.5.29.18
				//
				// AltName ::= GeneralNames

				/**
     * @type {Object}
     * @property {string} [blockName]
     * @property {string} [altNames]
     */
				var names = getParametersValue(parameters, "names", {});

				return new Sequence({
					name: names.blockName || "",
					value: [new Repeated({
						name: names.altNames || "",
						value: GeneralName.schema()
					})]
				});
			}
		}]);

		return AltName;
	}();
	//**************************************************************************************

	//**************************************************************************************

	//**************************************************************************************

	//**************************************************************************************

	//**************************************************************************************

	//**************************************************************************************

	//**************************************************************************************

	//**************************************************************************************


	var Time = function () {
		//**********************************************************************************
		/**
   * Constructor for Time class
   * @param {Object} [parameters={}]
   * @property {Object} [schema] asn1js parsed value
   * @property {number} [type] 0 - UTCTime; 1 - GeneralizedTime; 2 - empty value
   * @property {Date} [value] Value of the TIME class
   */
		function Time() {
			var parameters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

			_classCallCheck(this, Time);

			//region Internal properties of the object
			/**
    * @type {number}
    * @description 0 - UTCTime; 1 - GeneralizedTime; 2 - empty value
    */
			this.type = getParametersValue(parameters, "type", Time.defaultValues("type"));
			/**
    * @type {Date}
    * @description Value of the TIME class
    */
			this.value = getParametersValue(parameters, "value", Time.defaultValues("value"));
			//endregion

			//region If input argument array contains "schema" for this object
			if ("schema" in parameters) this.fromSchema(parameters.schema);
			//endregion
		}
		//**********************************************************************************
		/**
   * Return default values for all class members
   * @param {string} memberName String name for a class member
   */


		_createClass(Time, [{
			key: 'fromSchema',

			//**********************************************************************************
			/**
    * Convert parsed asn1js object into current class
    * @param {!Object} schema
    */
			value: function fromSchema(schema) {
				//region Check the schema is valid
				var asn1 = compareSchema(schema, schema, Time.schema({
					names: {
						utcTimeName: "utcTimeName",
						generalTimeName: "generalTimeName"
					}
				}));

				if (asn1.verified === false) throw new Error("Object's schema was not verified against input data for TIME");
				//endregion

				//region Get internal properties from parsed schema
				if ("utcTimeName" in asn1.result) {
					this.type = 0;
					this.value = asn1.result.utcTimeName.toDate();
				}
				if ("generalTimeName" in asn1.result) {
					this.type = 1;
					this.value = asn1.result.generalTimeName.toDate();
				}
				//endregion
			}
			//**********************************************************************************
			/**
    * Convert current object to asn1js object and set correct values
    * @returns {Object} asn1js object
    */

		}, {
			key: 'toSchema',
			value: function toSchema() {
				//region Construct and return new ASN.1 schema for this object
				var result = {};

				if (this.type === 0) result = new UTCTime({ valueDate: this.value });
				if (this.type === 1) result = new GeneralizedTime({ valueDate: this.value });

				return result;
				//endregion
			}
			//**********************************************************************************
			/**
    * Convertion for the class to JSON object
    * @returns {Object}
    */

		}, {
			key: 'toJSON',
			value: function toJSON() {
				return {
					type: this.type,
					value: this.value
				};
			}
			//**********************************************************************************

		}], [{
			key: 'defaultValues',
			value: function defaultValues(memberName) {
				switch (memberName) {
					case "type":
						return 0;
					case "value":
						return new Date(0, 0, 0);
					default:
						throw new Error('Invalid member name for Time class: ' + memberName);
				}
			}
			//**********************************************************************************
			/**
    * Return value of asn1js schema for current class
    * @param {Object} parameters Input parameters for the schema
    * @param {boolean} optional Flag that current schema should be optional
    * @returns {Object} asn1js schema object
    */

		}, {
			key: 'schema',
			value: function schema() {
				var parameters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
				var optional = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

				/**
     * @type {Object}
     * @property {string} [blockName]
     * @property {string} [utcTimeName] Name for "utcTimeName" choice
     * @property {string} [generalTimeName] Name for "generalTimeName" choice
     */
				var names = getParametersValue(parameters, "names", {});

				return new Choice({
					optional: optional,
					value: [new UTCTime({ name: names.utcTimeName || "" }), new GeneralizedTime({ name: names.generalTimeName || "" })]
				});
			}
		}]);

		return Time;
	}();
	//**************************************************************************************

	//**************************************************************************************


	var SubjectDirectoryAttributes = function () {
		//**********************************************************************************
		/**
   * Constructor for SubjectDirectoryAttributes class
   * @param {Object} [parameters={}]
   * @property {Object} [schema] asn1js parsed value
   */
		function SubjectDirectoryAttributes() {
			var parameters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

			_classCallCheck(this, SubjectDirectoryAttributes);

			//region Internal properties of the object
			/**
    * @type {Array.<Attribute>}
    * @description attributes
    */
			this.attributes = getParametersValue(parameters, "attributes", SubjectDirectoryAttributes.defaultValues("attributes"));
			//endregion

			//region If input argument array contains "schema" for this object
			if ("schema" in parameters) this.fromSchema(parameters.schema);
			//endregion
		}
		//**********************************************************************************
		/**
   * Return default values for all class members
   * @param {string} memberName String name for a class member
   */


		_createClass(SubjectDirectoryAttributes, [{
			key: 'fromSchema',

			//**********************************************************************************
			/**
    * Convert parsed asn1js object into current class
    * @param {!Object} schema
    */
			value: function fromSchema(schema) {
				//region Check the schema is valid
				var asn1 = compareSchema(schema, schema, SubjectDirectoryAttributes.schema({
					names: {
						attributes: "attributes"
					}
				}));

				if (asn1.verified === false) throw new Error("Object's schema was not verified against input data for SubjectDirectoryAttributes");
				//endregion

				//region Get internal properties from parsed schema
				this.attributes = Array.from(asn1.result.attributes, function (element) {
					return new Attribute({ schema: element });
				});
				//endregion
			}
			//**********************************************************************************
			/**
    * Convert current object to asn1js object and set correct values
    * @returns {Object} asn1js object
    */

		}, {
			key: 'toSchema',
			value: function toSchema() {
				//region Construct and return new ASN.1 schema for this object
				return new Sequence({
					value: Array.from(this.attributes, function (element) {
						return element.toSchema();
					})
				});
				//endregion
			}
			//**********************************************************************************
			/**
    * Convertion for the class to JSON object
    * @returns {Object}
    */

		}, {
			key: 'toJSON',
			value: function toJSON() {
				return {
					attributes: Array.from(this.attributes, function (element) {
						return element.toJSON();
					})
				};
			}
			//**********************************************************************************

		}], [{
			key: 'defaultValues',
			value: function defaultValues(memberName) {
				switch (memberName) {
					case "attributes":
						return [];
					default:
						throw new Error('Invalid member name for SubjectDirectoryAttributes class: ' + memberName);
				}
			}
			//**********************************************************************************
			/**
    * Return value of asn1js schema for current class
    * @param {Object} parameters Input parameters for the schema
    * @returns {Object} asn1js schema object
    */

		}, {
			key: 'schema',
			value: function schema() {
				var parameters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

				// SubjectDirectoryAttributes OID ::= 2.5.29.9
				//
				//SubjectDirectoryAttributes ::= SEQUENCE SIZE (1..MAX) OF Attribute

				/**
     * @type {Object}
     * @property {string} [blockName]
     * @property {string} [utcTimeName] Name for "utcTimeName" choice
     * @property {string} [generalTimeName] Name for "generalTimeName" choice
     */
				var names = getParametersValue(parameters, "names", {});

				return new Sequence({
					name: names.blockName || "",
					value: [new Repeated({
						name: names.attributes || "",
						value: Attribute.schema()
					})]
				});
			}
		}]);

		return SubjectDirectoryAttributes;
	}();
	//**************************************************************************************

	//**************************************************************************************


	var PrivateKeyUsagePeriod = function () {
		//**********************************************************************************
		/**
   * Constructor for PrivateKeyUsagePeriod class
   * @param {Object} [parameters={}]
   * @property {Object} [schema] asn1js parsed value
   */
		function PrivateKeyUsagePeriod() {
			var parameters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

			_classCallCheck(this, PrivateKeyUsagePeriod);

			//region Internal properties of the object
			if ("notBefore" in parameters)
				/**
     * @type {Date}
     * @description notBefore
     */
				this.notBefore = getParametersValue(parameters, "notBefore", PrivateKeyUsagePeriod.defaultValues("notBefore"));

			if ("notAfter" in parameters)
				/**
     * @type {Date}
     * @description notAfter
     */
				this.notAfter = getParametersValue(parameters, "notAfter", PrivateKeyUsagePeriod.defaultValues("notAfter"));
			//endregion

			//region If input argument array contains "schema" for this object
			if ("schema" in parameters) this.fromSchema(parameters.schema);
			//endregion
		}
		//**********************************************************************************
		/**
   * Return default values for all class members
   * @param {string} memberName String name for a class member
   */


		_createClass(PrivateKeyUsagePeriod, [{
			key: 'fromSchema',

			//**********************************************************************************
			/**
    * Convert parsed asn1js object into current class
    * @param {!Object} schema
    */
			value: function fromSchema(schema) {
				//region Check the schema is valid
				var asn1 = compareSchema(schema, schema, PrivateKeyUsagePeriod.schema({
					names: {
						notBefore: "notBefore",
						notAfter: "notAfter"
					}
				}));

				if (asn1.verified === false) throw new Error("Object's schema was not verified against input data for PrivateKeyUsagePeriod");
				//endregion

				//region Get internal properties from parsed schema
				if ("notBefore" in asn1.result) {
					var localNotBefore = new GeneralizedTime();
					localNotBefore.fromBuffer(asn1.result.notBefore.valueBlock.valueHex);
					this.notBefore = localNotBefore.toDate();
				}

				if ("notAfter" in asn1.result) {
					var localNotAfter = new GeneralizedTime({ valueHex: asn1.result.notAfter.valueBlock.valueHex });
					localNotAfter.fromBuffer(asn1.result.notAfter.valueBlock.valueHex);
					this.notAfter = localNotAfter.toDate();
				}
				//endregion
			}
			//**********************************************************************************
			/**
    * Convert current object to asn1js object and set correct values
    * @returns {Object} asn1js object
    */

		}, {
			key: 'toSchema',
			value: function toSchema() {
				//region Create array for output sequence
				var outputArray = [];

				if ("notBefore" in this) {
					outputArray.push(new Primitive({
						idBlock: {
							tagClass: 3, // CONTEXT-SPECIFIC
							tagNumber: 0 // [0]
						},
						valueHex: new GeneralizedTime({ valueDate: this.notBefore }).valueBlock.valueHex
					}));
				}

				if ("notAfter" in this) {
					outputArray.push(new Primitive({
						idBlock: {
							tagClass: 3, // CONTEXT-SPECIFIC
							tagNumber: 1 // [1]
						},
						valueHex: new GeneralizedTime({ valueDate: this.notAfter }).valueBlock.valueHex
					}));
				}
				//endregion

				//region Construct and return new ASN.1 schema for this object
				return new Sequence({
					value: outputArray
				});
				//endregion
			}
			//**********************************************************************************
			/**
    * Convertion for the class to JSON object
    * @returns {Object}
    */

		}, {
			key: 'toJSON',
			value: function toJSON() {
				var object = {};

				if ("notBefore" in this) object.notBefore = this.notBefore;

				if ("notAfter" in this) object.notAfter = this.notAfter;

				return object;
			}
			//**********************************************************************************

		}], [{
			key: 'defaultValues',
			value: function defaultValues(memberName) {
				switch (memberName) {
					case "notBefore":
						return new Date();
					case "notAfter":
						return new Date();
					default:
						throw new Error('Invalid member name for PrivateKeyUsagePeriod class: ' + memberName);
				}
			}
			//**********************************************************************************
			/**
    * Return value of asn1js schema for current class
    * @param {Object} parameters Input parameters for the schema
    * @returns {Object} asn1js schema object
    */

		}, {
			key: 'schema',
			value: function schema() {
				var parameters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

				// PrivateKeyUsagePeriod OID ::= 2.5.29.16
				//
				//PrivateKeyUsagePeriod ::= SEQUENCE {
				//    notBefore       [0]     GeneralizedTime OPTIONAL,
				//    notAfter        [1]     GeneralizedTime OPTIONAL }
				//-- either notBefore or notAfter MUST be present

				/**
     * @type {Object}
     * @property {string} [blockName]
     * @property {string} [notBefore]
     * @property {string} [notAfter]
     */
				var names = getParametersValue(parameters, "names", {});

				return new Sequence({
					name: names.blockName || "",
					value: [new Primitive({
						name: names.notBefore || "",
						optional: true,
						idBlock: {
							tagClass: 3, // CONTEXT-SPECIFIC
							tagNumber: 0 // [0]
						}
					}), new Primitive({
						name: names.notAfter || "",
						optional: true,
						idBlock: {
							tagClass: 3, // CONTEXT-SPECIFIC
							tagNumber: 1 // [1]
						}
					})]
				});
			}
		}]);

		return PrivateKeyUsagePeriod;
	}();
	//**************************************************************************************

	//**************************************************************************************


	var BasicConstraints = function () {
		//**********************************************************************************
		/**
   * Constructor for TIME class
   * @param {Object} [parameters={}]
   * @property {Object} [schema] asn1js parsed value
   * @property {Object} [cA]
   * @property {Object} [pathLenConstraint]
   */
		function BasicConstraints() {
			var parameters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

			_classCallCheck(this, BasicConstraints);

			//region Internal properties of the object
			/**
    * @type {boolean}
    * @description cA
    */
			this.cA = getParametersValue(parameters, "cA", false);

			if ("pathLenConstraint" in parameters)
				/**
     * @type {number|Integer}
     * @description pathLenConstraint
     */
				this.pathLenConstraint = getParametersValue(parameters, "pathLenConstraint", 0);
			//endregion

			//region If input argument array contains "schema" for this object
			if ("schema" in parameters) this.fromSchema(parameters.schema);
			//endregion
		}
		//**********************************************************************************
		/**
   * Return default values for all class members
   * @param {string} memberName String name for a class member
   */


		_createClass(BasicConstraints, [{
			key: 'fromSchema',

			//**********************************************************************************
			/**
    * Convert parsed asn1js object into current class
    * @param {!Object} schema
    */
			value: function fromSchema(schema) {
				//region Check the schema is valid
				var asn1 = compareSchema(schema, schema, BasicConstraints.schema({
					names: {
						cA: "cA",
						pathLenConstraint: "pathLenConstraint"
					}
				}));

				if (asn1.verified === false) throw new Error("Object's schema was not verified against input data for BasicConstraints");
				//endregion

				//region Get internal properties from parsed schema
				if ("cA" in asn1.result) this.cA = asn1.result.cA.valueBlock.value;

				if ("pathLenConstraint" in asn1.result) {
					if (asn1.result.pathLenConstraint.valueBlock.isHexOnly) this.pathLenConstraint = asn1.result.pathLenConstraint;else this.pathLenConstraint = asn1.result.pathLenConstraint.valueBlock.valueDec;
				}
				//endregion
			}
			//**********************************************************************************
			/**
    * Convert current object to asn1js object and set correct values
    * @returns {Object} asn1js object
    */

		}, {
			key: 'toSchema',
			value: function toSchema() {
				//region Create array for output sequence
				var outputArray = [];

				if (this.cA !== BasicConstraints.defaultValues("cA")) outputArray.push(new Boolean({ value: this.cA }));

				if ("pathLenConstraint" in this) {
					if (this.pathLenConstraint instanceof Integer) outputArray.push(this.pathLenConstraint);else outputArray.push(new Integer({ value: this.pathLenConstraint }));
				}
				//endregion

				//region Construct and return new ASN.1 schema for this object
				return new Sequence({
					value: outputArray
				});
				//endregion
			}
			//**********************************************************************************
			/**
    * Convertion for the class to JSON object
    * @returns {Object}
    */

		}, {
			key: 'toJSON',
			value: function toJSON() {
				var object = {};

				if (this.cA !== BasicConstraints.defaultValues("cA")) object.cA = this.cA;

				if ("pathLenConstraint" in this) {
					if (this.pathLenConstraint instanceof Integer) object.pathLenConstraint = this.pathLenConstraint.toJSON();else object.pathLenConstraint = this.pathLenConstraint;
				}

				return object;
			}
			//**********************************************************************************

		}], [{
			key: 'defaultValues',
			value: function defaultValues(memberName) {
				switch (memberName) {
					case "cA":
						return false;
					default:
						throw new Error('Invalid member name for BasicConstraints class: ' + memberName);
				}
			}
			//**********************************************************************************
			/**
    * Return value of asn1js schema for current class
    * @param {Object} parameters Input parameters for the schema
    * @returns {Object} asn1js schema object
    */

		}, {
			key: 'schema',
			value: function schema() {
				var parameters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

				// BasicConstraints OID ::= 2.5.29.19
				//
				//BasicConstraints ::= SEQUENCE {
				//    cA                      BOOLEAN DEFAULT FALSE,
				//    pathLenConstraint       INTEGER (0..MAX) OPTIONAL }

				/**
     * @type {Object}
     * @property {string} [blockName]
     * @property {string} [cA]
     * @property {string} [pathLenConstraint]
     */
				var names = getParametersValue(parameters, "names", {});

				return new Sequence({
					name: names.blockName || "",
					value: [new Boolean({
						optional: true,
						name: names.cA || ""
					}), new Integer({
						optional: true,
						name: names.pathLenConstraint || ""
					})]
				});
			}
		}]);

		return BasicConstraints;
	}();
	//**************************************************************************************

	//**************************************************************************************


	var IssuingDistributionPoint = function () {
		//**********************************************************************************
		/**
   * Constructor for IssuingDistributionPoint class
   * @param {Object} [parameters={}]
   * @property {Object} [schema] asn1js parsed value
   */
		function IssuingDistributionPoint() {
			var parameters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

			_classCallCheck(this, IssuingDistributionPoint);

			//region Internal properties of the object
			if ("distributionPoint" in parameters)
				/**
     * @type {Array.<GeneralName>|RelativeDistinguishedNames}
     * @description distributionPoint
     */
				this.distributionPoint = getParametersValue(parameters, "distributionPoint", IssuingDistributionPoint.defaultValues("distributionPoint"));

			/**
    * @type {boolean}
    * @description onlyContainsUserCerts
    */
			this.onlyContainsUserCerts = getParametersValue(parameters, "onlyContainsUserCerts", IssuingDistributionPoint.defaultValues("onlyContainsUserCerts"));

			/**
    * @type {boolean}
    * @description onlyContainsCACerts
    */
			this.onlyContainsCACerts = getParametersValue(parameters, "onlyContainsCACerts", IssuingDistributionPoint.defaultValues("onlyContainsCACerts"));

			if ("onlySomeReasons" in parameters)
				/**
     * @type {number}
     * @description onlySomeReasons
     */
				this.onlySomeReasons = getParametersValue(parameters, "onlySomeReasons", IssuingDistributionPoint.defaultValues("onlySomeReasons"));

			/**
    * @type {boolean}
    * @description indirectCRL
    */
			this.indirectCRL = getParametersValue(parameters, "indirectCRL", IssuingDistributionPoint.defaultValues("indirectCRL"));

			/**
    * @type {boolean}
    * @description onlyContainsAttributeCerts
    */
			this.onlyContainsAttributeCerts = getParametersValue(parameters, "onlyContainsAttributeCerts", IssuingDistributionPoint.defaultValues("onlyContainsAttributeCerts"));
			//endregion

			//region If input argument array contains "schema" for this object
			if ("schema" in parameters) this.fromSchema(parameters.schema);
			//endregion
		}
		//**********************************************************************************
		/**
   * Return default values for all class members
   * @param {string} memberName String name for a class member
   */


		_createClass(IssuingDistributionPoint, [{
			key: 'fromSchema',

			//**********************************************************************************
			/**
    * Convert parsed asn1js object into current class
    * @param {!Object} schema
    */
			value: function fromSchema(schema) {
				//region Check the schema is valid
				var asn1 = compareSchema(schema, schema, IssuingDistributionPoint.schema({
					names: {
						distributionPoint: "distributionPoint",
						distributionPointNames: "distributionPointNames",
						onlyContainsUserCerts: "onlyContainsUserCerts",
						onlyContainsCACerts: "onlyContainsCACerts",
						onlySomeReasons: "onlySomeReasons",
						indirectCRL: "indirectCRL",
						onlyContainsAttributeCerts: "onlyContainsAttributeCerts"
					}
				}));

				if (asn1.verified === false) throw new Error("Object's schema was not verified against input data for IssuingDistributionPoint");
				//endregion

				//region Get internal properties from parsed schema
				if ("distributionPoint" in asn1.result) {
					switch (true) {
						case asn1.result.distributionPoint.idBlock.tagNumber === 0:
							// GENERAL_NAMES variant
							this.distributionPoint = Array.from(asn1.result.distributionPointNames, function (element) {
								return new GeneralName({ schema: element });
							});
							break;
						case asn1.result.distributionPoint.idBlock.tagNumber === 1:
							// RDN variant
							{
								asn1.result.distributionPoint.idBlock.tagClass = 1; // UNIVERSAL
								asn1.result.distributionPoint.idBlock.tagNumber = 16; // SEQUENCE

								this.distributionPoint = new RelativeDistinguishedNames({ schema: asn1.result.distributionPoint });
							}
							break;
						default:
							throw new Error("Unknown tagNumber for distributionPoint: {$asn1.result.distributionPoint.idBlock.tagNumber}");
					}
				}

				if ("onlyContainsUserCerts" in asn1.result) {
					var view = new Uint8Array(asn1.result.onlyContainsUserCerts.valueBlock.valueHex);
					this.onlyContainsUserCerts = view[0] !== 0x00;
				}

				if ("onlyContainsCACerts" in asn1.result) {
					var _view = new Uint8Array(asn1.result.onlyContainsCACerts.valueBlock.valueHex);
					this.onlyContainsCACerts = _view[0] !== 0x00;
				}

				if ("onlySomeReasons" in asn1.result) {
					var _view2 = new Uint8Array(asn1.result.onlySomeReasons.valueBlock.valueHex);
					this.onlySomeReasons = _view2[0];
				}

				if ("indirectCRL" in asn1.result) {
					var _view3 = new Uint8Array(asn1.result.indirectCRL.valueBlock.valueHex);
					this.indirectCRL = _view3[0] !== 0x00;
				}

				if ("onlyContainsAttributeCerts" in asn1.result) {
					var _view4 = new Uint8Array(asn1.result.onlyContainsAttributeCerts.valueBlock.valueHex);
					this.onlyContainsAttributeCerts = _view4[0] !== 0x00;
				}
				//endregion
			}
			//**********************************************************************************
			/**
    * Convert current object to asn1js object and set correct values
    * @returns {Object} asn1js object
    */

		}, {
			key: 'toSchema',
			value: function toSchema() {
				//region Create array for output sequence
				var outputArray = [];

				if ("distributionPoint" in this) {
					var value = void 0;

					if (this.distributionPoint instanceof Array) {
						value = new Constructed({
							idBlock: {
								tagClass: 3, // CONTEXT-SPECIFIC
								tagNumber: 0 // [0]
							},
							value: Array.from(this.distributionPoint, function (element) {
								return element.toSchema();
							})
						});
					} else {
						value = this.distributionPoint.toSchema();

						value.idBlock.tagClass = 3; // CONTEXT - SPECIFIC
						value.idBlock.tagNumber = 1; // [1]
					}

					outputArray.push(value);
				}

				if (this.onlyContainsUserCerts !== IssuingDistributionPoint.defaultValues("onlyContainsUserCerts")) {
					outputArray.push(new Primitive({
						idBlock: {
							tagClass: 3, // CONTEXT-SPECIFIC
							tagNumber: 1 // [1]
						},
						valueHex: new Uint8Array([0xFF]).buffer
					}));
				}

				if (this.onlyContainsCACerts !== IssuingDistributionPoint.defaultValues("onlyContainsCACerts")) {
					outputArray.push(new Primitive({
						idBlock: {
							tagClass: 3, // CONTEXT-SPECIFIC
							tagNumber: 2 // [2]
						},
						valueHex: new Uint8Array([0xFF]).buffer
					}));
				}

				if ("onlySomeReasons" in this) {
					var buffer = new ArrayBuffer(1);
					var view = new Uint8Array(buffer);

					view[0] = this.onlySomeReasons;

					outputArray.push(new Primitive({
						idBlock: {
							tagClass: 3, // CONTEXT-SPECIFIC
							tagNumber: 3 // [3]
						},
						valueHex: buffer
					}));
				}

				if (this.indirectCRL !== IssuingDistributionPoint.defaultValues("indirectCRL")) {
					outputArray.push(new Primitive({
						idBlock: {
							tagClass: 3, // CONTEXT-SPECIFIC
							tagNumber: 4 // [4]
						},
						valueHex: new Uint8Array([0xFF]).buffer
					}));
				}

				if (this.onlyContainsAttributeCerts !== IssuingDistributionPoint.defaultValues("onlyContainsAttributeCerts")) {
					outputArray.push(new Primitive({
						idBlock: {
							tagClass: 3, // CONTEXT-SPECIFIC
							tagNumber: 5 // [5]
						},
						valueHex: new Uint8Array([0xFF]).buffer
					}));
				}
				//endregion

				//region Construct and return new ASN.1 schema for this object
				return new Sequence({
					value: outputArray
				});
				//endregion
			}
			//**********************************************************************************
			/**
    * Convertion for the class to JSON object
    * @returns {Object}
    */

		}, {
			key: 'toJSON',
			value: function toJSON() {
				var object = {};

				if ("distributionPoint" in this) {
					if (this.distributionPoint instanceof Array) object.distributionPoint = Array.from(this.distributionPoint, function (element) {
						return element.toJSON();
					});else object.distributionPoint = this.distributionPoint.toJSON();
				}

				if (this.onlyContainsUserCerts !== IssuingDistributionPoint.defaultValues("onlyContainsUserCerts")) object.onlyContainsUserCerts = this.onlyContainsUserCerts;

				if (this.onlyContainsCACerts !== IssuingDistributionPoint.defaultValues("onlyContainsCACerts")) object.onlyContainsCACerts = this.onlyContainsCACerts;

				if ("onlySomeReasons" in this) object.onlySomeReasons = this.onlySomeReasons;

				if (this.indirectCRL !== IssuingDistributionPoint.defaultValues("indirectCRL")) object.indirectCRL = this.indirectCRL;

				if (this.onlyContainsAttributeCerts !== IssuingDistributionPoint.defaultValues("onlyContainsAttributeCerts")) object.onlyContainsAttributeCerts = this.onlyContainsAttributeCerts;

				return object;
			}
			//**********************************************************************************

		}], [{
			key: 'defaultValues',
			value: function defaultValues(memberName) {
				switch (memberName) {
					case "distributionPoint":
						return [];
					case "onlyContainsUserCerts":
						return false;
					case "onlyContainsCACerts":
						return false;
					case "onlySomeReasons":
						return 0;
					case "indirectCRL":
						return false;
					case "onlyContainsAttributeCerts":
						return false;
					default:
						throw new Error('Invalid member name for IssuingDistributionPoint class: ' + memberName);
				}
			}
			//**********************************************************************************
			/**
    * Return value of asn1js schema for current class
    * @param {Object} parameters Input parameters for the schema
    * @returns {Object} asn1js schema object
    */

		}, {
			key: 'schema',
			value: function schema() {
				var parameters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

				// IssuingDistributionPoint OID ::= 2.5.29.28
				//
				//IssuingDistributionPoint ::= SEQUENCE {
				//    distributionPoint          [0] DistributionPointName OPTIONAL,
				//    onlyContainsUserCerts      [1] BOOLEAN DEFAULT FALSE,
				//    onlyContainsCACerts        [2] BOOLEAN DEFAULT FALSE,
				//    onlySomeReasons            [3] ReasonFlags OPTIONAL,
				//    indirectCRL                [4] BOOLEAN DEFAULT FALSE,
				//    onlyContainsAttributeCerts [5] BOOLEAN DEFAULT FALSE }
				//
				//ReasonFlags ::= BIT STRING {
				//    unused                  (0),
				//    keyCompromise           (1),
				//    cACompromise            (2),
				//    affiliationChanged      (3),
				//    superseded              (4),
				//    cessationOfOperation    (5),
				//    certificateHold         (6),
				//    privilegeWithdrawn      (7),
				//    aACompromise            (8) }

				/**
     * @type {Object}
     * @property {string} [blockName]
     * @property {string} [distributionPoint]
     * @property {string} [distributionPointNames]
     * @property {string} [onlyContainsUserCerts]
     * @property {string} [onlyContainsCACerts]
     * @property {string} [onlySomeReasons]
     * @property {string} [indirectCRL]
     * @property {string} [onlyContainsAttributeCerts]
     */
				var names = getParametersValue(parameters, "names", {});

				return new Sequence({
					name: names.blockName || "",
					value: [new Constructed({
						optional: true,
						idBlock: {
							tagClass: 3, // CONTEXT-SPECIFIC
							tagNumber: 0 // [0]
						},
						value: [new Choice({
							value: [new Constructed({
								name: names.distributionPoint || "",
								idBlock: {
									tagClass: 3, // CONTEXT-SPECIFIC
									tagNumber: 0 // [0]
								},
								value: [new Repeated({
									name: names.distributionPointNames || "",
									value: GeneralName.schema()
								})]
							}), new Constructed({
								name: names.distributionPoint || "",
								idBlock: {
									tagClass: 3, // CONTEXT-SPECIFIC
									tagNumber: 1 // [1]
								},
								value: RelativeDistinguishedNames.schema().valueBlock.value
							})]
						})]
					}), new Primitive({
						name: names.onlyContainsUserCerts || "",
						optional: true,
						idBlock: {
							tagClass: 3, // CONTEXT-SPECIFIC
							tagNumber: 1 // [1]
						}
					}), // IMPLICIT boolean value
					new Primitive({
						name: names.onlyContainsCACerts || "",
						optional: true,
						idBlock: {
							tagClass: 3, // CONTEXT-SPECIFIC
							tagNumber: 2 // [2]
						}
					}), // IMPLICIT boolean value
					new Primitive({
						name: names.onlySomeReasons || "",
						optional: true,
						idBlock: {
							tagClass: 3, // CONTEXT-SPECIFIC
							tagNumber: 3 // [3]
						}
					}), // IMPLICIT bitstring value
					new Primitive({
						name: names.indirectCRL || "",
						optional: true,
						idBlock: {
							tagClass: 3, // CONTEXT-SPECIFIC
							tagNumber: 4 // [4]
						}
					}), // IMPLICIT boolean value
					new Primitive({
						name: names.onlyContainsAttributeCerts || "",
						optional: true,
						idBlock: {
							tagClass: 3, // CONTEXT-SPECIFIC
							tagNumber: 5 // [5]
						}
					}) // IMPLICIT boolean value
					]
				});
			}
		}]);

		return IssuingDistributionPoint;
	}();
	//**************************************************************************************

	//**************************************************************************************


	var GeneralNames = function () {
		//**********************************************************************************
		/**
   * Constructor for GeneralNames class
   * @param {Object} [parameters={}]
   * @property {Object} [schema] asn1js parsed value
   */
		function GeneralNames() {
			var parameters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

			_classCallCheck(this, GeneralNames);

			//region Internal properties of the object
			/**
    * @type {Array.<GeneralName>}
    * @description Array of "general names"
    */
			this.names = getParametersValue(parameters, "names", GeneralNames.defaultValues("names"));
			//endregion

			//region If input argument array contains "schema" for this object
			if ("schema" in parameters) this.fromSchema(parameters.schema);
			//endregion
		}
		//**********************************************************************************
		/**
   * Return default values for all class members
   * @param {string} memberName String name for a class member
   */


		_createClass(GeneralNames, [{
			key: 'fromSchema',

			//**********************************************************************************
			/**
    * Convert parsed asn1js object into current class
    * @param {!Object} schema
    */
			value: function fromSchema(schema) {
				//region Check the schema is valid
				var asn1 = compareSchema(schema, schema, GeneralNames.schema());

				if (asn1.verified === false) throw new Error("Object's schema was not verified against input data for GeneralNames");
				//endregion

				//region Get internal properties from parsed schema
				this.names = Array.from(asn1.result.names, function (element) {
					return new GeneralName({ schema: element });
				});
				//endregion
			}
			//**********************************************************************************
			/**
    * Convert current object to asn1js object and set correct values
    * @returns {Object} asn1js object
    */

		}, {
			key: 'toSchema',
			value: function toSchema() {
				//region Construct and return new ASN.1 schema for this object
				return new Sequence({
					value: Array.from(this.names, function (element) {
						return element.toSchema();
					})
				});
				//endregion
			}
			//**********************************************************************************
			/**
    * Convertion for the class to JSON object
    * @returns {Object}
    */

		}, {
			key: 'toJSON',
			value: function toJSON() {
				return {
					names: Array.from(this.names, function (element) {
						return element.toJSON();
					})
				};
			}
			//**********************************************************************************

		}], [{
			key: 'defaultValues',
			value: function defaultValues(memberName) {
				switch (memberName) {
					case "names":
						return [];
					default:
						throw new Error('Invalid member name for GeneralNames class: ' + memberName);
				}
			}
			//**********************************************************************************
			/**
    * Return value of asn1js schema for current class
    * @param {Object} parameters Input parameters for the schema
    * @returns {Object} asn1js schema object
    */

		}, {
			key: 'schema',
			value: function schema() {
				var parameters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

				/**
     * @type {Object}
     * @property {string} utcTimeName Name for "utcTimeName" choice
     * @property {string} generalTimeName Name for "generalTimeName" choice
     */
				var names = getParametersValue(parameters, "names", {});

				return new Sequence({
					value: [new Repeated({
						name: names.blockName || "names",
						value: GeneralName.schema()
					})]
				});
			}
		}]);

		return GeneralNames;
	}();
	//**************************************************************************************

	//**************************************************************************************


	var GeneralSubtree = function () {
		//**********************************************************************************
		/**
   * Constructor for GeneralSubtree class
   * @param {Object} [parameters={}]
   * @property {Object} [schema] asn1js parsed value
   */
		function GeneralSubtree() {
			var parameters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

			_classCallCheck(this, GeneralSubtree);

			//region Internal properties of the object
			/**
    * @type {GeneralName}
    * @description base
    */
			this.base = getParametersValue(parameters, "base", GeneralSubtree.defaultValues("base"));

			/**
    * @type {number|Integer}
    * @description base
    */
			this.minimum = getParametersValue(parameters, "minimum", GeneralSubtree.defaultValues("minimum"));

			if ("maximum" in parameters)
				/**
     * @type {number|Integer}
     * @description minimum
     */
				this.maximum = getParametersValue(parameters, "maximum", GeneralSubtree.defaultValues("maximum"));
			//endregion

			//region If input argument array contains "schema" for this object
			if ("schema" in parameters) this.fromSchema(parameters.schema);
			//endregion
		}
		//**********************************************************************************
		/**
   * Return default values for all class members
   * @param {string} memberName String name for a class member
   */


		_createClass(GeneralSubtree, [{
			key: 'fromSchema',

			//**********************************************************************************
			/**
    * Convert parsed asn1js object into current class
    * @param {!Object} schema
    */
			value: function fromSchema(schema) {
				//region Check the schema is valid
				var asn1 = compareSchema(schema, schema, GeneralSubtree.schema({
					names: {
						base: {
							names: {
								blockName: "base"
							}
						},
						minimum: "minimum",
						maximum: "maximum"
					}
				}));

				if (asn1.verified === false) throw new Error("Object's schema was not verified against input data for ");
				//endregion

				//region Get internal properties from parsed schema
				this.base = new GeneralName({ schema: asn1.result.base });

				if ("minimum" in asn1.result) {
					if (asn1.result.minimum.valueBlock.isHexOnly) this.minimum = asn1.result.minimum;else this.minimum = asn1.result.minimum.valueBlock.valueDec;
				}

				if ("maximum" in asn1.result) {
					if (asn1.result.maximum.valueBlock.isHexOnly) this.maximum = asn1.result.maximum;else this.maximum = asn1.result.maximum.valueBlock.valueDec;
				}
				//endregion
			}
			//**********************************************************************************
			/**
    * Convert current object to asn1js object and set correct values
    * @returns {Object} asn1js object
    */

		}, {
			key: 'toSchema',
			value: function toSchema() {
				//region Create array for output sequence
				var outputArray = [];

				outputArray.push(this.base.toSchema());

				if (this.minimum !== 0) {
					var valueMinimum = 0;

					if (this.minimum instanceof Integer) valueMinimum = this.minimum;else valueMinimum = new Integer({ value: this.minimum });

					outputArray.push(new Constructed({
						optional: true,
						idBlock: {
							tagClass: 3, // CONTEXT-SPECIFIC
							tagNumber: 0 // [0]
						},
						value: [valueMinimum]
					}));
				}

				if ("maximum" in this) {
					var valueMaximum = 0;

					if (this.maximum instanceof Integer) valueMaximum = this.maximum;else valueMaximum = new Integer({ value: this.maximum });

					outputArray.push(new Constructed({
						optional: true,
						idBlock: {
							tagClass: 3, // CONTEXT-SPECIFIC
							tagNumber: 1 // [1]
						},
						value: [valueMaximum]
					}));
				}
				//endregion

				//region Construct and return new ASN.1 schema for this object
				return new Sequence({
					value: outputArray
				});
				//endregion
			}
			//**********************************************************************************
			/**
    * Convertion for the class to JSON object
    * @returns {Object}
    */

		}, {
			key: 'toJSON',
			value: function toJSON() {
				var object = {
					base: this.base.toJSON()
				};

				if (this.minimum !== 0) {
					if (typeof this.minimum === "number") object.minimum = this.minimum;else object.minimum = this.minimum.toJSON();
				}

				if ("maximum" in this) {
					if (typeof this.maximum === "number") object.maximum = this.maximum;else object.maximum = this.maximum.toJSON();
				}

				return object;
			}
			//**********************************************************************************

		}], [{
			key: 'defaultValues',
			value: function defaultValues(memberName) {
				switch (memberName) {
					case "base":
						return new GeneralName();
					case "minimum":
						return 0;
					case "maximum":
						return 0;
					default:
						throw new Error('Invalid member name for GeneralSubtree class: ' + memberName);
				}
			}
			//**********************************************************************************
			/**
    * Return value of asn1js schema for current class
    * @param {Object} parameters Input parameters for the schema
    * @returns {Object} asn1js schema object
    */

		}, {
			key: 'schema',
			value: function schema() {
				var parameters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

				//GeneralSubtree ::= SEQUENCE {
				//    base                    GeneralName,
				//    minimum         [0]     BaseDistance DEFAULT 0,
				//    maximum         [1]     BaseDistance OPTIONAL }
				//
				//BaseDistance ::= INTEGER (0..MAX)

				/**
     * @type {Object}
     * @property {string} [blockName]
     * @property {string} [base]
     * @property {string} [minimum]
     * @property {string} [maximum]
     */
				var names = getParametersValue(parameters, "names", {});

				return new Sequence({
					name: names.blockName || "",
					value: [GeneralName.schema(names.base || {}), new Constructed({
						optional: true,
						idBlock: {
							tagClass: 3, // CONTEXT-SPECIFIC
							tagNumber: 0 // [0]
						},
						value: [new Integer({ name: names.minimum || "" })]
					}), new Constructed({
						optional: true,
						idBlock: {
							tagClass: 3, // CONTEXT-SPECIFIC
							tagNumber: 1 // [1]
						},
						value: [new Integer({ name: names.maximum || "" })]
					})]
				});
			}
		}]);

		return GeneralSubtree;
	}();
	//**************************************************************************************

	//**************************************************************************************


	var NameConstraints = function () {
		//**********************************************************************************
		/**
   * Constructor for NameConstraints class
   * @param {Object} [parameters={}]
   * @property {Object} [schema] asn1js parsed value
   */
		function NameConstraints() {
			var parameters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

			_classCallCheck(this, NameConstraints);

			//region Internal properties of the object
			if ("permittedSubtrees" in parameters)
				/**
     * @type {Array.<GeneralSubtree>}
     * @description permittedSubtrees
     */
				this.permittedSubtrees = getParametersValue(parameters, "permittedSubtrees", NameConstraints.defaultValues("permittedSubtrees"));

			if ("excludedSubtrees" in parameters)
				/**
     * @type {Array.<GeneralSubtree>}
     * @description excludedSubtrees
     */
				this.excludedSubtrees = getParametersValue(parameters, "excludedSubtrees", NameConstraints.defaultValues("excludedSubtrees"));
			//endregion

			//region If input argument array contains "schema" for this object
			if ("schema" in parameters) this.fromSchema(parameters.schema);
			//endregion
		}
		//**********************************************************************************
		/**
   * Return default values for all class members
   * @param {string} memberName String name for a class member
   */


		_createClass(NameConstraints, [{
			key: 'fromSchema',

			//**********************************************************************************
			/**
    * Convert parsed asn1js object into current class
    * @param {!Object} schema
    */
			value: function fromSchema(schema) {
				//region Check the schema is valid
				var asn1 = compareSchema(schema, schema, NameConstraints.schema({
					names: {
						permittedSubtrees: "permittedSubtrees",
						excludedSubtrees: "excludedSubtrees"
					}
				}));

				if (asn1.verified === false) throw new Error("Object's schema was not verified against input data for NameConstraints");
				//endregion

				//region Get internal properties from parsed schema
				if ("permittedSubtrees" in asn1.result) this.permittedSubtrees = Array.from(asn1.result.permittedSubtrees, function (element) {
					return new GeneralSubtree({ schema: element });
				});

				if ("excludedSubtrees" in asn1.result) this.excludedSubtrees = Array.from(asn1.result.excludedSubtrees, function (element) {
					return new GeneralSubtree({ schema: element });
				});
				//endregion
			}
			//**********************************************************************************
			/**
    * Convert current object to asn1js object and set correct values
    * @returns {Object} asn1js object
    */

		}, {
			key: 'toSchema',
			value: function toSchema() {
				//region Create array for output sequence
				var outputArray = [];

				if ("permittedSubtrees" in this) {
					outputArray.push(new Constructed({
						optional: true,
						idBlock: {
							tagClass: 3, // CONTEXT-SPECIFIC
							tagNumber: 0 // [0]
						},
						value: [new Sequence({
							value: Array.from(this.permittedSubtrees, function (element) {
								return element.toSchema();
							})
						})]
					}));
				}

				if ("excludedSubtrees" in this) {
					outputArray.push(new Constructed({
						optional: true,
						idBlock: {
							tagClass: 3, // CONTEXT-SPECIFIC
							tagNumber: 1 // [1]
						},
						value: [new Sequence({
							value: Array.from(this.excludedSubtrees, function (element) {
								return element.toSchema();
							})
						})]
					}));
				}
				//endregion

				//region Construct and return new ASN.1 schema for this object
				return new Sequence({
					value: outputArray
				});
				//endregion
			}
			//**********************************************************************************
			/**
    * Convertion for the class to JSON object
    * @returns {Object}
    */

		}, {
			key: 'toJSON',
			value: function toJSON() {
				var object = {};

				if ("permittedSubtrees" in this) object.permittedSubtrees = Array.from(this.permittedSubtrees, function (element) {
					return element.toJSON();
				});

				if ("excludedSubtrees" in this) object.excludedSubtrees = Array.from(this.excludedSubtrees, function (element) {
					return element.toJSON();
				});

				return object;
			}
			//**********************************************************************************

		}], [{
			key: 'defaultValues',
			value: function defaultValues(memberName) {
				switch (memberName) {
					case "permittedSubtrees":
						return [];
					case "excludedSubtrees":
						return [];
					default:
						throw new Error('Invalid member name for NameConstraints class: ' + memberName);
				}
			}
			//**********************************************************************************
			/**
    * Return value of asn1js schema for current class
    * @param {Object} parameters Input parameters for the schema
    * @returns {Object} asn1js schema object
    */

		}, {
			key: 'schema',
			value: function schema() {
				var parameters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

				// NameConstraints OID ::= 2.5.29.30
				//
				//NameConstraints ::= SEQUENCE {
				//    permittedSubtrees       [0]     GeneralSubtrees OPTIONAL,
				//    excludedSubtrees        [1]     GeneralSubtrees OPTIONAL }

				/**
     * @type {Object}
     * @property {string} [blockName]
     * @property {string} [permittedSubtrees]
     * @property {string} [excludedSubtrees]
     */
				var names = getParametersValue(parameters, "names", {});

				return new Sequence({
					name: names.blockName || "",
					value: [new Constructed({
						optional: true,
						idBlock: {
							tagClass: 3, // CONTEXT-SPECIFIC
							tagNumber: 0 // [0]
						},
						value: [new Repeated({
							name: names.permittedSubtrees || "",
							value: GeneralSubtree.schema()
						})]
					}), new Constructed({
						optional: true,
						idBlock: {
							tagClass: 3, // CONTEXT-SPECIFIC
							tagNumber: 1 // [1]
						},
						value: [new Repeated({
							name: names.excludedSubtrees || "",
							value: GeneralSubtree.schema()
						})]
					})]
				});
			}
		}]);

		return NameConstraints;
	}();
	//**************************************************************************************

	//**************************************************************************************


	var DistributionPoint = function () {
		//**********************************************************************************
		/**
   * Constructor for DistributionPoint class
   * @param {Object} [parameters={}]
   * @property {Object} [schema] asn1js parsed value
   * @property {Object} [distributionPoint]
   * @property {Object} [reasons]
   * @property {Object} [cRLIssuer]
   */
		function DistributionPoint() {
			var parameters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

			_classCallCheck(this, DistributionPoint);

			//region Internal properties of the object
			if ("distributionPoint" in parameters)
				/**
     * @type {Array.<GeneralName>}
     * @description distributionPoint
     */
				this.distributionPoint = getParametersValue(parameters, "distributionPoint", DistributionPoint.defaultValues("distributionPoint"));

			if ("reasons" in parameters)
				/**
     * @type {BitString}
     * @description values
     */
				this.reasons = getParametersValue(parameters, "reasons", DistributionPoint.defaultValues("reasons"));

			if ("cRLIssuer" in parameters)
				/**
     * @type {Array.<GeneralName>}
     * @description cRLIssuer
     */
				this.cRLIssuer = getParametersValue(parameters, "cRLIssuer", DistributionPoint.defaultValues("cRLIssuer"));
			//endregion

			//region If input argument array contains "schema" for this object
			if ("schema" in parameters) this.fromSchema(parameters.schema);
			//endregion
		}
		//**********************************************************************************
		/**
   * Return default values for all class members
   * @param {string} memberName String name for a class member
   */


		_createClass(DistributionPoint, [{
			key: 'fromSchema',

			//**********************************************************************************
			/**
    * Convert parsed asn1js object into current class
    * @param {!Object} schema
    */
			value: function fromSchema(schema) {
				//region Check the schema is valid
				var asn1 = compareSchema(schema, schema, DistributionPoint.schema({
					names: {
						distributionPoint: "distributionPoint",
						distributionPointNames: "distributionPointNames",
						reasons: "reasons",
						cRLIssuer: "cRLIssuer",
						cRLIssuerNames: "cRLIssuerNames"
					}
				}));

				if (asn1.verified === false) throw new Error("Object's schema was not verified against input data for DistributionPoint");
				//endregion

				//region Get internal properties from parsed schema
				if ("distributionPoint" in asn1.result) {
					if (asn1.result.distributionPoint.idBlock.tagNumber === 0) // GENERAL_NAMES variant
						this.distributionPoint = Array.from(asn1.result.distributionPointNames, function (element) {
							return new GeneralName({ schema: element });
						});

					if (asn1.result.distributionPoint.idBlock.tagNumber === 1) // RDN variant
						{
							asn1.result.distributionPoint.idBlock.tagClass = 1; // UNIVERSAL
							asn1.result.distributionPoint.idBlock.tagNumber = 16; // SEQUENCE

							this.distributionPoint = new RelativeDistinguishedNames({ schema: asn1.result.distributionPoint });
						}
				}

				if ("reasons" in asn1.result) this.reasons = new BitString({ valueHex: asn1.result.reasons.valueBlock.valueHex });

				if ("cRLIssuer" in asn1.result) this.cRLIssuer = Array.from(asn1.result.cRLIssuerNames, function (element) {
					return new GeneralName({ schema: element });
				});
				//endregion
			}
			//**********************************************************************************
			/**
    * Convert current object to asn1js object and set correct values
    * @returns {Object} asn1js object
    */

		}, {
			key: 'toSchema',
			value: function toSchema() {
				//region Create array for output sequence
				var outputArray = [];

				if ("distributionPoint" in this) {
					var internalValue = void 0;

					if (this.distributionPoint instanceof Array) {
						internalValue = new Constructed({
							idBlock: {
								tagClass: 3, // CONTEXT-SPECIFIC
								tagNumber: 0 // [0]
							},
							value: Array.from(this.distributionPoint, function (element) {
								return element.toSchema();
							})
						});
					} else {
						internalValue = new Constructed({
							idBlock: {
								tagClass: 3, // CONTEXT-SPECIFIC
								tagNumber: 1 // [1]
							},
							value: [this.distributionPoint.toSchema()]
						});
					}

					outputArray.push(new Constructed({
						idBlock: {
							tagClass: 3, // CONTEXT-SPECIFIC
							tagNumber: 0 // [0]
						},
						value: [internalValue]
					}));
				}

				if ("reasons" in this) {
					outputArray.push(new Primitive({
						idBlock: {
							tagClass: 3, // CONTEXT-SPECIFIC
							tagNumber: 1 // [1]
						},
						valueHex: this.reasons.valueBlock.valueHex
					}));
				}

				if ("cRLIssuer" in this) {
					outputArray.push(new Constructed({
						idBlock: {
							tagClass: 3, // CONTEXT-SPECIFIC
							tagNumber: 2 // [2]
						},
						value: Array.from(this.cRLIssuer, function (element) {
							return element.toSchema();
						})
					}));
				}
				//endregion

				//region Construct and return new ASN.1 schema for this object
				return new Sequence({
					value: outputArray
				});
				//endregion
			}
			//**********************************************************************************
			/**
    * Convertion for the class to JSON object
    * @returns {Object}
    */

		}, {
			key: 'toJSON',
			value: function toJSON() {
				var object = {};

				if ("distributionPoint" in this) {
					if (this.distributionPoint instanceof Array) object.distributionPoint = Array.from(this.distributionPoint, function (element) {
						return element.toJSON();
					});else object.distributionPoint = this.distributionPoint.toJSON();
				}

				if ("reasons" in this) object.reasons = this.reasons.toJSON();

				if ("cRLIssuer" in this) object.cRLIssuer = Array.from(this.cRLIssuer, function (element) {
					return element.toJSON();
				});

				return object;
			}
			//**********************************************************************************

		}], [{
			key: 'defaultValues',
			value: function defaultValues(memberName) {
				switch (memberName) {
					case "distributionPoint":
						return [];
					case "reasons":
						return new BitString();
					case "cRLIssuer":
						return [];
					default:
						throw new Error('Invalid member name for DistributionPoint class: ' + memberName);
				}
			}
			//**********************************************************************************
			/**
    * Return value of asn1js schema for current class
    * @param {Object} parameters Input parameters for the schema
    * @returns {Object} asn1js schema object
    */

		}, {
			key: 'schema',
			value: function schema() {
				var parameters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

				//DistributionPoint ::= SEQUENCE {
				//    distributionPoint       [0]     DistributionPointName OPTIONAL,
				//    reasons                 [1]     ReasonFlags OPTIONAL,
				//    cRLIssuer               [2]     GeneralNames OPTIONAL }
				//
				//DistributionPointName ::= CHOICE {
				//    fullName                [0]     GeneralNames,
				//    nameRelativeToCRLIssuer [1]     RelativeDistinguishedName }
				//
				//ReasonFlags ::= BIT STRING {
				//    unused                  (0),
				//    keyCompromise           (1),
				//    cACompromise            (2),
				//    affiliationChanged      (3),
				//    superseded              (4),
				//    cessationOfOperation    (5),
				//    certificateHold         (6),
				//    privilegeWithdrawn      (7),
				//    aACompromise            (8) }

				/**
     * @type {Object}
     * @property {string} [blockName]
     * @property {string} [distributionPoint]
     * @property {string} [distributionPointNames]
     * @property {string} [reasons]
     * @property {string} [cRLIssuer]
     * @property {string} [cRLIssuerNames]
     */
				var names = getParametersValue(parameters, "names", {});

				return new Sequence({
					name: names.blockName || "",
					value: [new Constructed({
						optional: true,
						idBlock: {
							tagClass: 3, // CONTEXT-SPECIFIC
							tagNumber: 0 // [0]
						},
						value: [new Choice({
							value: [new Constructed({
								name: names.distributionPoint || "",
								optional: true,
								idBlock: {
									tagClass: 3, // CONTEXT-SPECIFIC
									tagNumber: 0 // [0]
								},
								value: [new Repeated({
									name: names.distributionPointNames || "",
									value: GeneralName.schema()
								})]
							}), new Constructed({
								name: names.distributionPoint || "",
								optional: true,
								idBlock: {
									tagClass: 3, // CONTEXT-SPECIFIC
									tagNumber: 1 // [1]
								},
								value: RelativeDistinguishedNames.schema().valueBlock.value
							})]
						})]
					}), new Primitive({
						name: names.reasons || "",
						optional: true,
						idBlock: {
							tagClass: 3, // CONTEXT-SPECIFIC
							tagNumber: 1 // [1]
						}
					}), // IMPLICIT bitstring value
					new Constructed({
						name: names.cRLIssuer || "",
						optional: true,
						idBlock: {
							tagClass: 3, // CONTEXT-SPECIFIC
							tagNumber: 2 // [2]
						},
						value: [new Repeated({
							name: names.cRLIssuerNames || "",
							value: GeneralName.schema()
						})]
					}) // IMPLICIT bitstring value
					]
				});
			}
		}]);

		return DistributionPoint;
	}();
	//**************************************************************************************

	//**************************************************************************************


	var CRLDistributionPoints = function () {
		//**********************************************************************************
		/**
   * Constructor for CRLDistributionPoints class
   * @param {Object} [parameters={}]
   * @property {Object} [schema] asn1js parsed value
   */
		function CRLDistributionPoints() {
			var parameters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

			_classCallCheck(this, CRLDistributionPoints);

			//region Internal properties of the object
			/**
    * @type {Array.<DistributionPoint>}
    * @description distributionPoints
    */
			this.distributionPoints = getParametersValue(parameters, "distributionPoints", CRLDistributionPoints.defaultValues("distributionPoints"));
			//endregion

			//region If input argument array contains "schema" for this object
			if ("schema" in parameters) this.fromSchema(parameters.schema);
			//endregion
		}
		//**********************************************************************************
		/**
   * Return default values for all class members
   * @param {string} memberName String name for a class member
   */


		_createClass(CRLDistributionPoints, [{
			key: 'fromSchema',

			//**********************************************************************************
			/**
    * Convert parsed asn1js object into current class
    * @param {!Object} schema
    */
			value: function fromSchema(schema) {
				//region Check the schema is valid
				var asn1 = compareSchema(schema, schema, CRLDistributionPoints.schema({
					names: {
						distributionPoints: "distributionPoints"
					}
				}));

				if (asn1.verified === false) throw new Error("Object's schema was not verified against input data for CRLDistributionPoints");
				//endregion

				//region Get internal properties from parsed schema
				this.distributionPoints = Array.from(asn1.result.distributionPoints, function (element) {
					return new DistributionPoint({ schema: element });
				});
				//endregion
			}
			//**********************************************************************************
			/**
    * Convert current object to asn1js object and set correct values
    * @returns {Object} asn1js object
    */

		}, {
			key: 'toSchema',
			value: function toSchema() {
				//region Construct and return new ASN.1 schema for this object
				return new Sequence({
					value: Array.from(this.distributionPoints, function (element) {
						return element.toSchema();
					})
				});
				//endregion
			}
			//**********************************************************************************
			/**
    * Convertion for the class to JSON object
    * @returns {Object}
    */

		}, {
			key: 'toJSON',
			value: function toJSON() {
				return {
					distributionPoints: Array.from(this.distributionPoints, function (element) {
						return element.toJSON();
					})
				};
			}
			//**********************************************************************************

		}], [{
			key: 'defaultValues',
			value: function defaultValues(memberName) {
				switch (memberName) {
					case "distributionPoints":
						return [];
					default:
						throw new Error('Invalid member name for CRLDistributionPoints class: ' + memberName);
				}
			}
			//**********************************************************************************
			/**
    * Return value of asn1js schema for current class
    * @param {Object} parameters Input parameters for the schema
    * @returns {Object} asn1js schema object
    */

		}, {
			key: 'schema',
			value: function schema() {
				var parameters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

				// CRLDistributionPoints OID ::= 2.5.29.31
				//
				//CRLDistributionPoints ::= SEQUENCE SIZE (1..MAX) OF DistributionPoint

				/**
     * @type {Object}
     * @property {string} [blockName]
     * @property {string} [distributionPoints]
     */
				var names = getParametersValue(parameters, "names", {});

				return new Sequence({
					name: names.blockName || "",
					value: [new Repeated({
						name: names.distributionPoints || "",
						value: DistributionPoint.schema()
					})]
				});
			}
		}]);

		return CRLDistributionPoints;
	}();
	//**************************************************************************************

	//**************************************************************************************


	var PolicyQualifierInfo = function () {
		//**********************************************************************************
		/**
   * Constructor for PolicyQualifierInfo class
   * @param {Object} [parameters={}]
   * @property {Object} [schema] asn1js parsed value
   */
		function PolicyQualifierInfo() {
			var parameters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

			_classCallCheck(this, PolicyQualifierInfo);

			//region Internal properties of the object
			/**
    * @type {string}
    * @description policyQualifierId
    */
			this.policyQualifierId = getParametersValue(parameters, "policyQualifierId", PolicyQualifierInfo.defaultValues("policyQualifierId"));
			/**
    * @type {Object}
    * @description qualifier
    */
			this.qualifier = getParametersValue(parameters, "qualifier", PolicyQualifierInfo.defaultValues("qualifier"));
			//endregion

			//region If input argument array contains "schema" for this object
			if ("schema" in parameters) this.fromSchema(parameters.schema);
			//endregion
		}
		//**********************************************************************************
		/**
   * Return default values for all class members
   * @param {string} memberName String name for a class member
   */


		_createClass(PolicyQualifierInfo, [{
			key: 'fromSchema',

			//**********************************************************************************
			/**
    * Convert parsed asn1js object into current class
    * @param {!Object} schema
    */
			value: function fromSchema(schema) {
				//region Check the schema is valid
				var asn1 = compareSchema(schema, schema, PolicyQualifierInfo.schema({
					names: {
						policyQualifierId: "policyQualifierId",
						qualifier: "qualifier"
					}
				}));

				if (asn1.verified === false) throw new Error("Object's schema was not verified against input data for PolicyQualifierInfo");
				//endregion

				//region Get internal properties from parsed schema
				this.policyQualifierId = asn1.result.policyQualifierId.valueBlock.toString();
				this.qualifier = asn1.result.qualifier;
				//endregion
			}
			//**********************************************************************************
			/**
    * Convert current object to asn1js object and set correct values
    * @returns {Object} asn1js object
    */

		}, {
			key: 'toSchema',
			value: function toSchema() {
				//region Construct and return new ASN.1 schema for this object
				return new Sequence({
					value: [new ObjectIdentifier$1({ value: this.policyQualifierId }), this.qualifier]
				});
				//endregion
			}
			//**********************************************************************************
			/**
    * Convertion for the class to JSON object
    * @returns {Object}
    */

		}, {
			key: 'toJSON',
			value: function toJSON() {
				return {
					policyQualifierId: this.policyQualifierId,
					qualifier: this.qualifier.toJSON()
				};
			}
			//**********************************************************************************

		}], [{
			key: 'defaultValues',
			value: function defaultValues(memberName) {
				switch (memberName) {
					case "policyQualifierId":
						return "";
					case "qualifier":
						return new Any$1();
					default:
						throw new Error('Invalid member name for PolicyQualifierInfo class: ' + memberName);
				}
			}
			//**********************************************************************************
			/**
    * Return value of asn1js schema for current class
    * @param {Object} parameters Input parameters for the schema
    * @returns {Object} asn1js schema object
    */

		}, {
			key: 'schema',
			value: function schema() {
				var parameters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

				//PolicyQualifierInfo ::= SEQUENCE {
				//    policyQualifierId  PolicyQualifierId,
				//    qualifier          ANY DEFINED BY policyQualifierId }
				//
				//id-qt          OBJECT IDENTIFIER ::=  { id-pkix 2 }
				//id-qt-cps      OBJECT IDENTIFIER ::=  { id-qt 1 }
				//id-qt-unotice  OBJECT IDENTIFIER ::=  { id-qt 2 }
				//
				//PolicyQualifierId ::= OBJECT IDENTIFIER ( id-qt-cps | id-qt-unotice )

				/**
     * @type {Object}
     * @property {string} [blockName]
     * @property {string} [policyQualifierId]
     * @property {string} [qualifier]
     */
				var names = getParametersValue(parameters, "names", {});

				return new Sequence({
					name: names.blockName || "",
					value: [new ObjectIdentifier$1({ name: names.policyQualifierId || "" }), new Any$1({ name: names.qualifier || "" })]
				});
			}
		}]);

		return PolicyQualifierInfo;
	}();
	//**************************************************************************************

	//**************************************************************************************


	var PolicyInformation = function () {
		//**********************************************************************************
		/**
   * Constructor for PolicyInformation class
   * @param {Object} [parameters={}]
   * @property {Object} [schema] asn1js parsed value
   */
		function PolicyInformation() {
			var parameters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

			_classCallCheck(this, PolicyInformation);

			//region Internal properties of the object
			/**
    * @type {string}
    * @description policyIdentifier
    */
			this.policyIdentifier = getParametersValue(parameters, "policyIdentifier", PolicyInformation.defaultValues("policyIdentifier"));

			if ("policyQualifiers" in parameters)
				/**
     * @type {Array.<PolicyQualifierInfo>}
     * @description Value of the TIME class
     */
				this.policyQualifiers = getParametersValue(parameters, "policyQualifiers", PolicyInformation.defaultValues("policyQualifiers"));
			//endregion

			//region If input argument array contains "schema" for this object
			if ("schema" in parameters) this.fromSchema(parameters.schema);
			//endregion
		}
		//**********************************************************************************
		/**
   * Return default values for all class members
   * @param {string} memberName String name for a class member
   */


		_createClass(PolicyInformation, [{
			key: 'fromSchema',

			//**********************************************************************************
			/**
    * Convert parsed asn1js object into current class
    * @param {!Object} schema
    */
			value: function fromSchema(schema) {
				//region Check the schema is valid
				var asn1 = compareSchema(schema, schema, PolicyInformation.schema({
					names: {
						policyIdentifier: "policyIdentifier",
						policyQualifiers: "policyQualifiers"
					}
				}));

				if (asn1.verified === false) throw new Error("Object's schema was not verified against input data for PolicyInformation");
				//endregion

				//region Get internal properties from parsed schema
				this.policyIdentifier = asn1.result.policyIdentifier.valueBlock.toString();

				if ("policyQualifiers" in asn1.result) this.policyQualifiers = Array.from(asn1.result.policyQualifiers, function (element) {
					return new PolicyQualifierInfo({ schema: element });
				});
				//endregion
			}
			//**********************************************************************************
			/**
    * Convert current object to asn1js object and set correct values
    * @returns {Object} asn1js object
    */

		}, {
			key: 'toSchema',
			value: function toSchema() {
				//region Create array for output sequence
				var outputArray = [];

				outputArray.push(new ObjectIdentifier$1({ value: this.policyIdentifier }));

				if ("policyQualifiers" in this) {
					outputArray.push(new Sequence({
						value: Array.from(this.policyQualifiers, function (element) {
							return element.toSchema();
						})
					}));
				}
				//endregion

				//region Construct and return new ASN.1 schema for this object
				return new Sequence({
					value: outputArray
				});
				//endregion
			}
			//**********************************************************************************
			/**
    * Convertion for the class to JSON object
    * @returns {Object}
    */

		}, {
			key: 'toJSON',
			value: function toJSON() {
				var object = {
					policyIdentifier: this.policyIdentifier
				};

				if ("policyQualifiers" in this) object.policyQualifiers = Array.from(this.policyQualifiers, function (element) {
					return element.toJSON();
				});

				return object;
			}
			//**********************************************************************************

		}], [{
			key: 'defaultValues',
			value: function defaultValues(memberName) {
				switch (memberName) {
					case "policyIdentifier":
						return "";
					case "policyQualifiers":
						return [];
					default:
						throw new Error('Invalid member name for PolicyInformation class: ' + memberName);
				}
			}
			//**********************************************************************************
			/**
    * Return value of asn1js schema for current class
    * @param {Object} parameters Input parameters for the schema
    * @returns {Object} asn1js schema object
    */

		}, {
			key: 'schema',
			value: function schema() {
				var parameters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

				//PolicyInformation ::= SEQUENCE {
				//    policyIdentifier   CertPolicyId,
				//    policyQualifiers   SEQUENCE SIZE (1..MAX) OF
				//    PolicyQualifierInfo OPTIONAL }
				//
				//CertPolicyId ::= OBJECT IDENTIFIER

				/**
     * @type {Object}
     * @property {string} [blockName]
     * @property {string} [policyIdentifier]
     * @property {string} [policyQualifiers]
     */
				var names = getParametersValue(parameters, "names", {});

				return new Sequence({
					name: names.blockName || "",
					value: [new ObjectIdentifier$1({ name: names.policyIdentifier || "" }), new Sequence({
						optional: true,
						value: [new Repeated({
							name: names.policyQualifiers || "",
							value: PolicyQualifierInfo.schema()
						})]
					})]
				});
			}
		}]);

		return PolicyInformation;
	}();
	//**************************************************************************************

	//**************************************************************************************


	var CertificatePolicies = function () {
		//**********************************************************************************
		/**
   * Constructor for CertificatePolicies class
   * @param {Object} [parameters={}]
   * @property {Object} [schema] asn1js parsed value
   */
		function CertificatePolicies() {
			var parameters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

			_classCallCheck(this, CertificatePolicies);

			//region Internal properties of the object
			/**
    * @type {Array.<PolicyInformation>}
    * @description certificatePolicies
    */
			this.certificatePolicies = getParametersValue(parameters, "certificatePolicies", CertificatePolicies.defaultValues("certificatePolicies"));
			//endregion

			//region If input argument array contains "schema" for this object
			if ("schema" in parameters) this.fromSchema(parameters.schema);
			//endregion
		}
		//**********************************************************************************
		/**
   * Return default values for all class members
   * @param {string} memberName String name for a class member
   */


		_createClass(CertificatePolicies, [{
			key: 'fromSchema',

			//**********************************************************************************
			/**
    * Convert parsed asn1js object into current class
    * @param {!Object} schema
    */
			value: function fromSchema(schema) {
				//region Check the schema is valid
				var asn1 = compareSchema(schema, schema, CertificatePolicies.schema({
					names: {
						certificatePolicies: "certificatePolicies"
					}
				}));

				if (asn1.verified === false) throw new Error("Object's schema was not verified against input data for CertificatePolicies");
				//endregion

				//region Get internal properties from parsed schema
				this.certificatePolicies = Array.from(asn1.result.certificatePolicies, function (element) {
					return new PolicyInformation({ schema: element });
				});
				//endregion
			}
			//**********************************************************************************
			/**
    * Convert current object to asn1js object and set correct values
    * @returns {Object} asn1js object
    */

		}, {
			key: 'toSchema',
			value: function toSchema() {
				//region Construct and return new ASN.1 schema for this object
				return new Sequence({
					value: Array.from(this.certificatePolicies, function (element) {
						return element.toSchema();
					})
				});
				//endregion
			}
			//**********************************************************************************
			/**
    * Convertion for the class to JSON object
    * @returns {Object}
    */

		}, {
			key: 'toJSON',
			value: function toJSON() {
				return {
					certificatePolicies: Array.from(this.certificatePolicies, function (element) {
						return element.toJSON();
					})
				};
			}
			//**********************************************************************************

		}], [{
			key: 'defaultValues',
			value: function defaultValues(memberName) {
				switch (memberName) {
					case "certificatePolicies":
						return [];
					default:
						throw new Error('Invalid member name for CertificatePolicies class: ' + memberName);
				}
			}
			//**********************************************************************************
			/**
    * Return value of asn1js schema for current class
    * @param {Object} parameters Input parameters for the schema
    * @returns {Object} asn1js schema object
    */

		}, {
			key: 'schema',
			value: function schema() {
				var parameters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

				// CertificatePolicies OID ::= 2.5.29.32
				//
				//certificatePolicies ::= SEQUENCE SIZE (1..MAX) OF PolicyInformation

				/**
     * @type {Object}
     * @property {string} [blockName]
     * @property {string} [certificatePolicies]
     */
				var names = getParametersValue(parameters, "names", {});

				return new Sequence({
					name: names.blockName || "",
					value: [new Repeated({
						name: names.certificatePolicies || "",
						value: PolicyInformation.schema()
					})]
				});
			}
		}]);

		return CertificatePolicies;
	}();
	//**************************************************************************************

	//**************************************************************************************


	var PolicyMapping = function () {
		//**********************************************************************************
		/**
   * Constructor for PolicyMapping class
   * @param {Object} [parameters={}]
   * @property {Object} [schema] asn1js parsed value
   */
		function PolicyMapping() {
			var parameters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

			_classCallCheck(this, PolicyMapping);

			//region Internal properties of the object
			/**
    * @type {string}
    * @description issuerDomainPolicy
    */
			this.issuerDomainPolicy = getParametersValue(parameters, "issuerDomainPolicy", PolicyMapping.defaultValues("issuerDomainPolicy"));
			/**
    * @type {string}
    * @description subjectDomainPolicy
    */
			this.subjectDomainPolicy = getParametersValue(parameters, "subjectDomainPolicy", PolicyMapping.defaultValues("subjectDomainPolicy"));
			//endregion

			//region If input argument array contains "schema" for this object
			if ("schema" in parameters) this.fromSchema(parameters.schema);
			//endregion
		}
		//**********************************************************************************
		/**
   * Return default values for all class members
   * @param {string} memberName String name for a class member
   */


		_createClass(PolicyMapping, [{
			key: 'fromSchema',

			//**********************************************************************************
			/**
    * Convert parsed asn1js object into current class
    * @param {!Object} schema
    */
			value: function fromSchema(schema) {
				//region Check the schema is valid
				var asn1 = compareSchema(schema, schema, PolicyMapping.schema({
					names: {
						issuerDomainPolicy: "issuerDomainPolicy",
						subjectDomainPolicy: "subjectDomainPolicy"
					}
				}));

				if (asn1.verified === false) throw new Error("Object's schema was not verified against input data for PolicyMapping");
				//endregion

				//region Get internal properties from parsed schema
				this.issuerDomainPolicy = asn1.result.issuerDomainPolicy.valueBlock.toString();
				this.subjectDomainPolicy = asn1.result.subjectDomainPolicy.valueBlock.toString();
				//endregion
			}
			//**********************************************************************************
			/**
    * Convert current object to asn1js object and set correct values
    * @returns {Object} asn1js object
    */

		}, {
			key: 'toSchema',
			value: function toSchema() {
				//region Construct and return new ASN.1 schema for this object
				return new Sequence({
					value: [new ObjectIdentifier$1({ value: this.issuerDomainPolicy }), new ObjectIdentifier$1({ value: this.subjectDomainPolicy })]
				});
				//endregion
			}
			//**********************************************************************************
			/**
    * Convertion for the class to JSON object
    * @returns {Object}
    */

		}, {
			key: 'toJSON',
			value: function toJSON() {
				return {
					issuerDomainPolicy: this.issuerDomainPolicy,
					subjectDomainPolicy: this.subjectDomainPolicy
				};
			}
			//**********************************************************************************

		}], [{
			key: 'defaultValues',
			value: function defaultValues(memberName) {
				switch (memberName) {
					case "issuerDomainPolicy":
						return "";
					case "subjectDomainPolicy":
						return "";
					default:
						throw new Error('Invalid member name for PolicyMapping class: ' + memberName);
				}
			}
			//**********************************************************************************
			/**
    * Return value of asn1js schema for current class
    * @param {Object} parameters Input parameters for the schema
    * @returns {Object} asn1js schema object
    */

		}, {
			key: 'schema',
			value: function schema() {
				var parameters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

				//PolicyMapping ::= SEQUENCE {
				//    issuerDomainPolicy      CertPolicyId,
				//    subjectDomainPolicy     CertPolicyId }

				/**
     * @type {Object}
     * @property {string} [blockName]
     * @property {string} [issuerDomainPolicy]
     * @property {string} [subjectDomainPolicy]
     */
				var names = getParametersValue(parameters, "names", {});

				return new Sequence({
					name: names.blockName || "",
					value: [new ObjectIdentifier$1({ name: names.issuerDomainPolicy || "" }), new ObjectIdentifier$1({ name: names.subjectDomainPolicy || "" })]
				});
			}
		}]);

		return PolicyMapping;
	}();
	//**************************************************************************************

	//**************************************************************************************


	var PolicyMappings = function () {
		//**********************************************************************************
		/**
   * Constructor for PolicyMappings class
   * @param {Object} [parameters={}]
   * @property {Object} [schema] asn1js parsed value
   */
		function PolicyMappings() {
			var parameters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

			_classCallCheck(this, PolicyMappings);

			//region Internal properties of the object
			/**
    * @type {Array.<PolicyMapping>}
    * @description mappings
    */
			this.mappings = getParametersValue(parameters, "mappings", PolicyMappings.defaultValues("mappings"));
			//endregion

			//region If input argument array contains "schema" for this object
			if ("schema" in parameters) this.fromSchema(parameters.schema);
			//endregion
		}
		//**********************************************************************************
		/**
   * Return default values for all class members
   * @param {string} memberName String name for a class member
   */


		_createClass(PolicyMappings, [{
			key: 'fromSchema',

			//**********************************************************************************
			/**
    * Convert parsed asn1js object into current class
    * @param {!Object} schema
    */
			value: function fromSchema(schema) {
				//region Check the schema is valid
				var asn1 = compareSchema(schema, schema, PolicyMappings.schema({
					names: {
						mappings: "mappings"
					}
				}));

				if (asn1.verified === false) throw new Error("Object's schema was not verified against input data for PolicyMappings");
				//endregion

				//region Get internal properties from parsed schema
				this.mappings = Array.from(asn1.result.mappings, function (element) {
					return new PolicyMapping({ schema: element });
				});
				//endregion
			}
			//**********************************************************************************
			/**
    * Convert current object to asn1js object and set correct values
    * @returns {Object} asn1js object
    */

		}, {
			key: 'toSchema',
			value: function toSchema() {
				//region Construct and return new ASN.1 schema for this object
				return new Sequence({
					value: Array.from(this.mappings, function (element) {
						return element.toSchema();
					})
				});
				//endregion
			}
			//**********************************************************************************
			/**
    * Convertion for the class to JSON object
    * @returns {Object}
    */

		}, {
			key: 'toJSON',
			value: function toJSON() {
				return {
					mappings: Array.from(this.mappings, function (element) {
						return element.toJSON();
					})
				};
			}
			//**********************************************************************************

		}], [{
			key: 'defaultValues',
			value: function defaultValues(memberName) {
				switch (memberName) {
					case "mappings":
						return [];
					default:
						throw new Error('Invalid member name for PolicyMappings class: ' + memberName);
				}
			}
			//**********************************************************************************
			/**
    * Return value of asn1js schema for current class
    * @param {Object} parameters Input parameters for the schema
    * @returns {Object} asn1js schema object
    */

		}, {
			key: 'schema',
			value: function schema() {
				var parameters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

				// PolicyMappings OID ::= 2.5.29.33
				//
				//PolicyMappings ::= SEQUENCE SIZE (1..MAX) OF PolicyMapping

				/**
     * @type {Object}
     * @property {string} [blockName]
     * @property {string} [utcTimeName] Name for "utcTimeName" choice
     * @property {string} [generalTimeName] Name for "generalTimeName" choice
     */
				var names = getParametersValue(parameters, "names", {});

				return new Sequence({
					name: names.blockName || "",
					value: [new Repeated({
						name: names.mappings || "",
						value: PolicyMapping.schema()
					})]
				});
			}
		}]);

		return PolicyMappings;
	}();
	//**************************************************************************************

	//**************************************************************************************


	var AuthorityKeyIdentifier = function () {
		//**********************************************************************************
		/**
   * Constructor for AuthorityKeyIdentifier class
   * @param {Object} [parameters={}]
   * @property {Object} [schema] asn1js parsed value
   */
		function AuthorityKeyIdentifier() {
			var parameters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

			_classCallCheck(this, AuthorityKeyIdentifier);

			//region Internal properties of the object
			if ("keyIdentifier" in parameters)
				/**
     * @type {OctetString}
     * @description keyIdentifier
     */
				this.keyIdentifier = getParametersValue(parameters, "keyIdentifier", AuthorityKeyIdentifier.defaultValues("keyIdentifier"));

			if ("authorityCertIssuer" in parameters)
				/**
     * @type {Array.<GeneralName>}
     * @description authorityCertIssuer
     */
				this.authorityCertIssuer = getParametersValue(parameters, "authorityCertIssuer", AuthorityKeyIdentifier.defaultValues("authorityCertIssuer"));

			if ("authorityCertSerialNumber" in parameters)
				/**
     * @type {Integer}
     * @description authorityCertIssuer
     */
				this.authorityCertSerialNumber = getParametersValue(parameters, "authorityCertSerialNumber", AuthorityKeyIdentifier.defaultValues("authorityCertSerialNumber"));
			//endregion

			//region If input argument array contains "schema" for this object
			if ("schema" in parameters) this.fromSchema(parameters.schema);
			//endregion
		}
		//**********************************************************************************
		/**
   * Return default values for all class members
   * @param {string} memberName String name for a class member
   */


		_createClass(AuthorityKeyIdentifier, [{
			key: 'fromSchema',

			//**********************************************************************************
			/**
    * Convert parsed asn1js object into current class
    * @param {!Object} schema
    */
			value: function fromSchema(schema) {
				//region Check the schema is valid
				var asn1 = compareSchema(schema, schema, AuthorityKeyIdentifier.schema({
					names: {
						keyIdentifier: "keyIdentifier",
						authorityCertIssuer: "authorityCertIssuer",
						authorityCertSerialNumber: "authorityCertSerialNumber"
					}
				}));

				if (asn1.verified === false) throw new Error("Object's schema was not verified against input data for AuthorityKeyIdentifier");
				//endregion

				//region Get internal properties from parsed schema
				if ("keyIdentifier" in asn1.result) {
					asn1.result.keyIdentifier.idBlock.tagClass = 1; // UNIVERSAL
					asn1.result.keyIdentifier.idBlock.tagNumber = 4; // OCTETSTRING

					this.keyIdentifier = asn1.result.keyIdentifier;
				}

				if ("authorityCertIssuer" in asn1.result) this.authorityCertIssuer = Array.from(asn1.result.authorityCertIssuer, function (element) {
					return new GeneralName({ schema: element });
				});

				if ("authorityCertSerialNumber" in asn1.result) {
					asn1.result.authorityCertSerialNumber.idBlock.tagClass = 1; // UNIVERSAL
					asn1.result.authorityCertSerialNumber.idBlock.tagNumber = 2; // INTEGER

					this.authorityCertSerialNumber = asn1.result.authorityCertSerialNumber;
				}
				//endregion
			}
			//**********************************************************************************
			/**
    * Convert current object to asn1js object and set correct values
    * @returns {Object} asn1js object
    */

		}, {
			key: 'toSchema',
			value: function toSchema() {
				//region Create array for output sequence
				var outputArray = [];

				if ("keyIdentifier" in this) {
					var value = this.keyIdentifier;

					value.idBlock.tagClass = 3; // CONTEXT-SPECIFIC
					value.idBlock.tagNumber = 0; // [0]

					outputArray.push(value);
				}

				if ("authorityCertIssuer" in this) {
					outputArray.push(new Constructed({
						optional: true,
						idBlock: {
							tagClass: 3, // CONTEXT-SPECIFIC
							tagNumber: 1 // [1]
						},
						value: [new Sequence({
							value: Array.from(this.authorityCertIssuer, function (element) {
								return element.toSchema();
							})
						})]
					}));
				}

				if ("authorityCertSerialNumber" in this) {
					var _value10 = this.authorityCertSerialNumber;

					_value10.idBlock.tagClass = 3; // CONTEXT-SPECIFIC
					_value10.idBlock.tagNumber = 2; // [2]

					outputArray.push(_value10);
				}
				//endregion

				//region Construct and return new ASN.1 schema for this object
				return new Sequence({
					value: outputArray
				});
				//endregion
			}
			//**********************************************************************************
			/**
    * Convertion for the class to JSON object
    * @returns {Object}
    */

		}, {
			key: 'toJSON',
			value: function toJSON() {
				var object = {};

				if ("keyIdentifier" in this) object.keyIdentifier = this.keyIdentifier.toJSON();

				if ("authorityCertIssuer" in this) object.authorityCertIssuer = Array.from(this.authorityCertIssuer, function (element) {
					return element.toJSON();
				});

				if ("authorityCertSerialNumber" in this) object.authorityCertSerialNumber = this.authorityCertSerialNumber.toJSON();

				return object;
			}
			//**********************************************************************************

		}], [{
			key: 'defaultValues',
			value: function defaultValues(memberName) {
				switch (memberName) {
					case "keyIdentifier":
						return new OctetString();
					case "authorityCertIssuer":
						return [];
					case "authorityCertSerialNumber":
						return new Integer();
					default:
						throw new Error('Invalid member name for AuthorityKeyIdentifier class: ' + memberName);
				}
			}
			//**********************************************************************************
			/**
    * Return value of asn1js schema for current class
    * @param {Object} parameters Input parameters for the schema
    * @returns {Object} asn1js schema object
    */

		}, {
			key: 'schema',
			value: function schema() {
				var parameters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

				// AuthorityKeyIdentifier OID ::= 2.5.29.35
				//
				//AuthorityKeyIdentifier ::= SEQUENCE {
				//    keyIdentifier             [0] KeyIdentifier           OPTIONAL,
				//    authorityCertIssuer       [1] GeneralNames            OPTIONAL,
				//    authorityCertSerialNumber [2] CertificateSerialNumber OPTIONAL  }
				//
				//KeyIdentifier ::= OCTET STRING

				/**
     * @type {Object}
     * @property {string} [blockName]
     * @property {string} [keyIdentifier]
     * @property {string} [authorityCertIssuer]
     * @property {string} [authorityCertSerialNumber]
     */
				var names = getParametersValue(parameters, "names", {});

				return new Sequence({
					name: names.blockName || "",
					value: [new Primitive({
						name: names.keyIdentifier || "",
						optional: true,
						idBlock: {
							tagClass: 3, // CONTEXT-SPECIFIC
							tagNumber: 0 // [0]
						}
					}), new Constructed({
						optional: true,
						idBlock: {
							tagClass: 3, // CONTEXT-SPECIFIC
							tagNumber: 1 // [1]
						},
						value: [new Repeated({
							name: names.authorityCertIssuer || "",
							value: GeneralName.schema()
						})]
					}), new Primitive({
						name: names.authorityCertSerialNumber || "",
						optional: true,
						idBlock: {
							tagClass: 3, // CONTEXT-SPECIFIC
							tagNumber: 2 // [2]
						}
					})]
				});
			}
		}]);

		return AuthorityKeyIdentifier;
	}();
	//**************************************************************************************

	//**************************************************************************************


	var PolicyConstraints = function () {
		//**********************************************************************************
		/**
   * Constructor for PolicyConstraints class
   * @param {Object} [parameters={}]
   * @property {Object} [schema] asn1js parsed value
   */
		function PolicyConstraints() {
			var parameters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

			_classCallCheck(this, PolicyConstraints);

			//region Internal properties of the object
			if ("requireExplicitPolicy" in parameters)
				/**
     * @type {number}
     * @description requireExplicitPolicy
     */
				this.requireExplicitPolicy = getParametersValue(parameters, "requireExplicitPolicy", PolicyConstraints.defaultValues("requireExplicitPolicy"));

			if ("inhibitPolicyMapping" in parameters)
				/**
     * @type {number}
     * @description Value of the TIME class
     */
				this.inhibitPolicyMapping = getParametersValue(parameters, "inhibitPolicyMapping", PolicyConstraints.defaultValues("inhibitPolicyMapping"));
			//endregion

			//region If input argument array contains "schema" for this object
			if ("schema" in parameters) this.fromSchema(parameters.schema);
			//endregion
		}
		//**********************************************************************************
		/**
   * Return default values for all class members
   * @param {string} memberName String name for a class member
   */


		_createClass(PolicyConstraints, [{
			key: 'fromSchema',

			//**********************************************************************************
			/**
    * Convert parsed asn1js object into current class
    * @param {!Object} schema
    */
			value: function fromSchema(schema) {
				//region Check the schema is valid
				var asn1 = compareSchema(schema, schema, PolicyConstraints.schema({
					names: {
						requireExplicitPolicy: "requireExplicitPolicy",
						inhibitPolicyMapping: "inhibitPolicyMapping"
					}
				}));

				if (asn1.verified === false) throw new Error("Object's schema was not verified against input data for PolicyConstraints");
				//endregion

				//region Get internal properties from parsed schema
				if ("requireExplicitPolicy" in asn1.result) {
					var field1 = asn1.result.requireExplicitPolicy;

					field1.idBlock.tagClass = 1; // UNIVERSAL
					field1.idBlock.tagNumber = 2; // INTEGER

					var ber1 = field1.toBER(false);
					var int1 = fromBER(ber1);

					this.requireExplicitPolicy = int1.result.valueBlock.valueDec;
				}

				if ("inhibitPolicyMapping" in asn1.result) {
					var field2 = asn1.result.inhibitPolicyMapping;

					field2.idBlock.tagClass = 1; // UNIVERSAL
					field2.idBlock.tagNumber = 2; // INTEGER

					var ber2 = field2.toBER(false);
					var int2 = fromBER(ber2);

					this.inhibitPolicyMapping = int2.result.valueBlock.valueDec;
				}
				//endregion
			}
			//**********************************************************************************
			/**
    * Convert current object to asn1js object and set correct values
    * @returns {Object} asn1js object
    */

		}, {
			key: 'toSchema',
			value: function toSchema() {
				//region Create correct values for output sequence
				var outputArray = [];

				if ("requireExplicitPolicy" in this) {
					var int1 = new Integer({ value: this.requireExplicitPolicy });

					int1.idBlock.tagClass = 3; // CONTEXT-SPECIFIC
					int1.idBlock.tagNumber = 0; // [0]

					outputArray.push(int1);
				}

				if ("inhibitPolicyMapping" in this) {
					var int2 = new Integer({ value: this.inhibitPolicyMapping });

					int2.idBlock.tagClass = 3; // CONTEXT-SPECIFIC
					int2.idBlock.tagNumber = 1; // [1]

					outputArray.push(int2);
				}
				//endregion

				//region Construct and return new ASN.1 schema for this object
				return new Sequence({
					value: outputArray
				});
				//endregion
			}
			//**********************************************************************************
			/**
    * Convertion for the class to JSON object
    * @returns {Object}
    */

		}, {
			key: 'toJSON',
			value: function toJSON() {
				var object = {};

				if ("requireExplicitPolicy" in this) object.requireExplicitPolicy = this.requireExplicitPolicy;

				if ("inhibitPolicyMapping" in this) object.inhibitPolicyMapping = this.inhibitPolicyMapping;

				return object;
			}
			//**********************************************************************************

		}], [{
			key: 'defaultValues',
			value: function defaultValues(memberName) {
				switch (memberName) {
					case "requireExplicitPolicy":
						return 0;
					case "inhibitPolicyMapping":
						return 0;
					default:
						throw new Error('Invalid member name for PolicyConstraints class: ' + memberName);
				}
			}
			//**********************************************************************************
			/**
    * Return value of asn1js schema for current class
    * @param {Object} parameters Input parameters for the schema
    * @returns {Object} asn1js schema object
    */

		}, {
			key: 'schema',
			value: function schema() {
				var parameters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

				// PolicyMappings OID ::= 2.5.29.36
				//
				//PolicyConstraints ::= SEQUENCE {
				//    requireExplicitPolicy           [0] SkipCerts OPTIONAL,
				//    inhibitPolicyMapping            [1] SkipCerts OPTIONAL }
				//
				//SkipCerts ::= INTEGER (0..MAX)

				/**
     * @type {Object}
     * @property {string} [blockName]
     * @property {string} [requireExplicitPolicy]
     * @property {string} [inhibitPolicyMapping]
     */
				var names = getParametersValue(parameters, "names", {});

				return new Sequence({
					name: names.blockName || "",
					value: [new Primitive({
						name: names.requireExplicitPolicy || "",
						optional: true,
						idBlock: {
							tagClass: 3, // CONTEXT-SPECIFIC
							tagNumber: 0 // [0]
						}
					}), // IMPLICIT integer value
					new Primitive({
						name: names.inhibitPolicyMapping || "",
						optional: true,
						idBlock: {
							tagClass: 3, // CONTEXT-SPECIFIC
							tagNumber: 1 // [1]
						}
					}) // IMPLICIT integer value
					]
				});
			}
		}]);

		return PolicyConstraints;
	}();
	//**************************************************************************************

	//**************************************************************************************


	var ExtKeyUsage = function () {
		//**********************************************************************************
		/**
   * Constructor for ExtKeyUsage class
   * @param {Object} [parameters={}]
   * @property {Object} [schema] asn1js parsed value
   */
		function ExtKeyUsage() {
			var parameters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

			_classCallCheck(this, ExtKeyUsage);

			//region Internal properties of the object
			/**
    * @type {Array.<string>}
    * @description keyPurposes
    */
			this.keyPurposes = getParametersValue(parameters, "keyPurposes", ExtKeyUsage.defaultValues("keyPurposes"));
			//endregion

			//region If input argument array contains "schema" for this object
			if ("schema" in parameters) this.fromSchema(parameters.schema);
			//endregion
		}
		//**********************************************************************************
		/**
   * Return default values for all class members
   * @param {string} memberName String name for a class member
   */


		_createClass(ExtKeyUsage, [{
			key: 'fromSchema',

			//**********************************************************************************
			/**
    * Convert parsed asn1js object into current class
    * @param {!Object} schema
    */
			value: function fromSchema(schema) {
				//region Check the schema is valid
				var asn1 = compareSchema(schema, schema, ExtKeyUsage.schema({
					names: {
						keyPurposes: "keyPurposes"
					}
				}));

				if (asn1.verified === false) throw new Error("Object's schema was not verified against input data for ExtKeyUsage");
				//endregion

				//region Get internal properties from parsed schema
				this.keyPurposes = Array.from(asn1.result.keyPurposes, function (element) {
					return element.valueBlock.toString();
				});
				//endregion
			}
			//**********************************************************************************
			/**
    * Convert current object to asn1js object and set correct values
    * @returns {Object} asn1js object
    */

		}, {
			key: 'toSchema',
			value: function toSchema() {
				//region Construct and return new ASN.1 schema for this object
				return new Sequence({
					value: Array.from(this.keyPurposes, function (element) {
						return new ObjectIdentifier$1({ value: element });
					})
				});
				//endregion
			}
			//**********************************************************************************
			/**
    * Convertion for the class to JSON object
    * @returns {Object}
    */

		}, {
			key: 'toJSON',
			value: function toJSON() {
				return {
					keyPurposes: Array.from(this.keyPurposes)
				};
			}
			//**********************************************************************************

		}], [{
			key: 'defaultValues',
			value: function defaultValues(memberName) {
				switch (memberName) {
					case "keyPurposes":
						return [];
					default:
						throw new Error('Invalid member name for ExtKeyUsage class: ' + memberName);
				}
			}
			//**********************************************************************************
			/**
    * Return value of asn1js schema for current class
    * @param {Object} parameters Input parameters for the schema
    * @returns {Object} asn1js schema object
    */

		}, {
			key: 'schema',
			value: function schema() {
				var parameters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

				// ExtKeyUsage OID ::= 2.5.29.37
				//
				// ExtKeyUsage ::= SEQUENCE SIZE (1..MAX) OF KeyPurposeId

				// KeyPurposeId ::= OBJECT IDENTIFIER

				/**
     * @type {Object}
     * @property {string} [blockName]
     * @property {string} [keyPurposes]
     */
				var names = getParametersValue(parameters, "names", {});

				return new Sequence({
					name: names.blockName || "",
					value: [new Repeated({
						name: names.keyPurposes || "",
						value: new ObjectIdentifier$1()
					})]
				});
			}
		}]);

		return ExtKeyUsage;
	}();
	//**************************************************************************************

	//**************************************************************************************


	var InfoAccess = function () {
		//**********************************************************************************
		/**
   * Constructor for InfoAccess class
   * @param {Object} [parameters={}]
   * @property {Object} [schema] asn1js parsed value
   */
		function InfoAccess() {
			var parameters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

			_classCallCheck(this, InfoAccess);

			//region Internal properties of the object
			/**
    * @type {Array.<AccessDescription>}
    * @description accessDescriptions
    */
			this.accessDescriptions = getParametersValue(parameters, "accessDescriptions", InfoAccess.defaultValues("accessDescriptions"));
			//endregion

			//region If input argument array contains "schema" for this object
			if ("schema" in parameters) this.fromSchema(parameters.schema);
			//endregion
		}
		//**********************************************************************************
		/**
   * Return default values for all class members
   * @param {string} memberName String name for a class member
   */


		_createClass(InfoAccess, [{
			key: 'fromSchema',

			//**********************************************************************************
			/**
    * Convert parsed asn1js object into current class
    * @param {!Object} schema
    */
			value: function fromSchema(schema) {
				//region Check the schema is valid
				var asn1 = compareSchema(schema, schema, InfoAccess.schema({
					names: {
						accessDescriptions: "accessDescriptions"
					}
				}));

				if (asn1.verified === false) throw new Error("Object's schema was not verified against input data for InfoAccess");
				//endregion

				//region Get internal properties from parsed schema
				this.accessDescriptions = Array.from(asn1.result.accessDescriptions, function (element) {
					return new AccessDescription({ schema: element });
				});
				//endregion
			}
			//**********************************************************************************
			/**
    * Convert current object to asn1js object and set correct values
    * @returns {Object} asn1js object
    */

		}, {
			key: 'toSchema',
			value: function toSchema() {
				//region Construct and return new ASN.1 schema for this object
				return new Sequence({
					value: Array.from(this.accessDescriptions, function (element) {
						return element.toSchema();
					})
				});
				//endregion
			}
			//**********************************************************************************
			/**
    * Convertion for the class to JSON object
    * @returns {Object}
    */

		}, {
			key: 'toJSON',
			value: function toJSON() {
				return {
					accessDescriptions: Array.from(this.accessDescriptions, function (element) {
						return element.toJSON();
					})
				};
			}
			//**********************************************************************************

		}], [{
			key: 'defaultValues',
			value: function defaultValues(memberName) {
				switch (memberName) {
					case "accessDescriptions":
						return [];
					default:
						throw new Error('Invalid member name for InfoAccess class: ' + memberName);
				}
			}
			//**********************************************************************************
			/**
    * Return value of asn1js schema for current class
    * @param {Object} parameters Input parameters for the schema
    * @returns {Object} asn1js schema object
    */

		}, {
			key: 'schema',
			value: function schema() {
				var parameters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

				// AuthorityInfoAccess OID ::= 1.3.6.1.5.5.7.1.1
				// SubjectInfoAccess OID ::= 1.3.6.1.5.5.7.1.11
				//
				//AuthorityInfoAccessSyntax  ::=
				//SEQUENCE SIZE (1..MAX) OF AccessDescription

				/**
     * @type {Object}
     * @property {string} [blockName]
     * @property {string} [accessDescriptions]
     */
				var names = getParametersValue(parameters, "names", {});

				return new Sequence({
					name: names.blockName || "",
					value: [new Repeated({
						name: names.accessDescriptions || "",
						value: AccessDescription.schema()
					})]
				});
			}
		}]);

		return InfoAccess;
	}();
	//**************************************************************************************

	//**************************************************************************************


	var Extension = function () {
		//**********************************************************************************
		/**
   * Constructor for Extension class
   * @param {Object} [parameters={}]
   * @property {Object} [schema] asn1js parsed value
   */
		function Extension() {
			var parameters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

			_classCallCheck(this, Extension);

			//region Internal properties of the object
			/**
    * @type {string}
    * @description extnID
    */
			this.extnID = getParametersValue(parameters, "extnID", Extension.defaultValues("extnID"));
			/**
    * @type {boolean}
    * @description critical
    */
			this.critical = getParametersValue(parameters, "critical", Extension.defaultValues("critical"));
			/**
    * @type {OctetString}
    * @description extnValue
    */
			if ("extnValue" in parameters) this.extnValue = new OctetString({ valueHex: parameters.extnValue });else this.extnValue = Extension.defaultValues("extnValue");

			if ("parsedValue" in parameters)
				/**
     * @type {Object}
     * @description parsedValue
     */
				this.parsedValue = getParametersValue(parameters, "parsedValue", Extension.defaultValues("parsedValue"));
			//endregion

			//region If input argument array contains "schema" for this object
			if ("schema" in parameters) this.fromSchema(parameters.schema);
			//endregion
		}
		//**********************************************************************************
		/**
   * Return default values for all class members
   * @param {string} memberName String name for a class member
   */


		_createClass(Extension, [{
			key: 'fromSchema',

			//**********************************************************************************
			/**
    * Convert parsed asn1js object into current class
    * @param {!Object} schema
    */
			value: function fromSchema(schema) {
				//region Check the schema is valid
				var asn1 = compareSchema(schema, schema, Extension.schema({
					names: {
						extnID: "extnID",
						critical: "critical",
						extnValue: "extnValue"
					}
				}));

				if (asn1.verified === false) throw new Error("Object's schema was not verified against input data for EXTENSION");
				//endregion

				//region Get internal properties from parsed schema
				this.extnID = asn1.result.extnID.valueBlock.toString();
				if ("critical" in asn1.result) this.critical = asn1.result.critical.valueBlock.value;
				this.extnValue = asn1.result.extnValue;

				//region Get "parsedValue" for well-known extensions
				asn1 = fromBER(this.extnValue.valueBlock.valueHex);
				if (asn1.offset === -1) return;

				switch (this.extnID) {
					case "2.5.29.9":
						// SubjectDirectoryAttributes
						this.parsedValue = new SubjectDirectoryAttributes({ schema: asn1.result });
						break;
					case "2.5.29.14":
						// SubjectKeyIdentifier
						this.parsedValue = asn1.result; // Should be just a simple OCTETSTRING
						break;
					case "2.5.29.15":
						// KeyUsage
						this.parsedValue = asn1.result; // Should be just a simple BITSTRING
						break;
					case "2.5.29.16":
						// PrivateKeyUsagePeriod
						this.parsedValue = new PrivateKeyUsagePeriod({ schema: asn1.result });
						break;
					case "2.5.29.17": // SubjectAltName
					case "2.5.29.18":
						// IssuerAltName
						this.parsedValue = new AltName({ schema: asn1.result });
						break;
					case "2.5.29.19":
						// BasicConstraints
						this.parsedValue = new BasicConstraints({ schema: asn1.result });
						break;
					case "2.5.29.20": // CRLNumber
					case "2.5.29.27":
						// BaseCRLNumber (delta CRL indicator)
						this.parsedValue = asn1.result; // Should be just a simple INTEGER
						break;
					case "2.5.29.21":
						// CRLReason
						this.parsedValue = asn1.result; // Should be just a simple ENUMERATED
						break;
					case "2.5.29.24":
						// InvalidityDate
						this.parsedValue = asn1.result; // Should be just a simple GeneralizedTime
						break;
					case "2.5.29.28":
						// IssuingDistributionPoint
						this.parsedValue = new IssuingDistributionPoint({ schema: asn1.result });
						break;
					case "2.5.29.29":
						// CertificateIssuer
						this.parsedValue = new GeneralNames({ schema: asn1.result }); // Should be just a simple
						break;
					case "2.5.29.30":
						// NameConstraints
						this.parsedValue = new NameConstraints({ schema: asn1.result });
						break;
					case "2.5.29.31": // CRLDistributionPoints
					case "2.5.29.46":
						// FreshestCRL
						this.parsedValue = new CRLDistributionPoints({ schema: asn1.result });
						break;
					case "2.5.29.32":
						// CertificatePolicies
						this.parsedValue = new CertificatePolicies({ schema: asn1.result });
						break;
					case "2.5.29.33":
						// PolicyMappings
						this.parsedValue = new PolicyMappings({ schema: asn1.result });
						break;
					case "2.5.29.35":
						// AuthorityKeyIdentifier
						this.parsedValue = new AuthorityKeyIdentifier({ schema: asn1.result });
						break;
					case "2.5.29.36":
						// PolicyConstraints
						this.parsedValue = new PolicyConstraints({ schema: asn1.result });
						break;
					case "2.5.29.37":
						// ExtKeyUsage
						this.parsedValue = new ExtKeyUsage({ schema: asn1.result });
						break;
					case "2.5.29.54":
						// InhibitAnyPolicy
						this.parsedValue = asn1.result; // Should be just a simple INTEGER
						break;
					case "1.3.6.1.5.5.7.1.1": // AuthorityInfoAccess
					case "1.3.6.1.5.5.7.1.11":
						// SubjectInfoAccess
						this.parsedValue = new InfoAccess({ schema: asn1.result });
						break;
					default:
				}
				//endregion
				//endregion
			}
			//**********************************************************************************
			/**
    * Convert current object to asn1js object and set correct values
    * @returns {Object} asn1js object
    */

		}, {
			key: 'toSchema',
			value: function toSchema() {
				//region Create array for output sequence
				var outputArray = [];

				outputArray.push(new ObjectIdentifier$1({ value: this.extnID }));

				if (this.critical !== Extension.defaultValues("critical")) outputArray.push(new Boolean({ value: this.critical }));

				outputArray.push(this.extnValue);
				//endregion

				//region Construct and return new ASN.1 schema for this object
				return new Sequence({
					value: outputArray
				});
				//endregion
			}
			//**********************************************************************************
			/**
    * Convertion for the class to JSON object
    * @returns {Object}
    */

		}, {
			key: 'toJSON',
			value: function toJSON() {
				var object = {
					extnID: this.extnID,
					extnValue: this.extnValue.toJSON()
				};

				if (this.critical !== Extension.defaultValues("critical")) object.critical = this.critical;

				if ("parsedValue" in this) object.parsedValue = this.parsedValue.toJSON();

				return object;
			}
			//**********************************************************************************

		}], [{
			key: 'defaultValues',
			value: function defaultValues(memberName) {
				switch (memberName) {
					case "extnID":
						return "";
					case "critical":
						return false;
					case "extnValue":
						return new OctetString();
					case "parsedValue":
						return {};
					default:
						throw new Error('Invalid member name for Extension class: ' + memberName);
				}
			}
			//**********************************************************************************
			/**
    * Return value of asn1js schema for current class
    * @param {Object} parameters Input parameters for the schema
    * @returns {Object} asn1js schema object
    */

		}, {
			key: 'schema',
			value: function schema() {
				var parameters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

				//Extension  ::=  SEQUENCE  {
				//    extnID      OBJECT IDENTIFIER,
				//    critical    BOOLEAN DEFAULT FALSE,
				//    extnValue   OCTET STRING
				//}

				/**
     * @type {Object}
     * @property {string} [blockName]
     * @property {string} [extnID]
     * @property {string} [critical]
     * @property {string} [extnValue]
     */
				var names = getParametersValue(parameters, "names", {});

				return new Sequence({
					name: names.blockName || "",
					value: [new ObjectIdentifier$1({ name: names.extnID || "" }), new Boolean({
						name: names.critical || "",
						optional: true
					}), new OctetString({ name: names.extnValue || "" })]
				});
			}
		}]);

		return Extension;
	}();
	//**************************************************************************************

	//**************************************************************************************


	var Extensions = function () {
		//**********************************************************************************
		/**
   * Constructor for Extensions class
   * @param {Object} [parameters={}]
   * @property {Object} [schema] asn1js parsed value
   */
		function Extensions() {
			var parameters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

			_classCallCheck(this, Extensions);

			//region Internal properties of the object
			/**
    * @type {Array.<Extension>}
    * @description type
    */
			this.extensions = getParametersValue(parameters, "extensions", Extensions.defaultValues("extensions"));
			//endregion

			//region If input argument array contains "schema" for this object
			if ("schema" in parameters) this.fromSchema(parameters.schema);
			//endregion
		}
		//**********************************************************************************
		/**
   * Return default values for all class members
   * @param {string} memberName String name for a class member
   */


		_createClass(Extensions, [{
			key: 'fromSchema',

			//**********************************************************************************
			/**
    * Convert parsed asn1js object into current class
    * @param {!Object} schema
    */
			value: function fromSchema(schema) {
				//region Check the schema is valid
				var asn1 = compareSchema(schema, schema, Extensions.schema({
					names: {
						extensions: "extensions"
					}
				}));

				if (asn1.verified === false) throw new Error("Object's schema was not verified against input data for EXTENSIONS");
				//endregion

				//region Get internal properties from parsed schema
				this.extensions = Array.from(asn1.result.extensions, function (element) {
					return new Extension({ schema: element });
				});
				//endregion
			}
			//**********************************************************************************
			/**
    * Convert current object to asn1js object and set correct values
    * @returns {Object} asn1js object
    */

		}, {
			key: 'toSchema',
			value: function toSchema() {
				//region Construct and return new ASN.1 schema for this object
				return new Sequence({
					value: Array.from(this.extensions, function (element) {
						return element.toSchema();
					})
				});
				//endregion
			}
			//**********************************************************************************
			/**
    * Convertion for the class to JSON object
    * @returns {Object}
    */

		}, {
			key: 'toJSON',
			value: function toJSON() {
				return {
					extensions: Array.from(this.extensions, function (element) {
						return element.toJSON();
					})
				};
			}
			//**********************************************************************************

		}], [{
			key: 'defaultValues',
			value: function defaultValues(memberName) {
				switch (memberName) {
					case "extensions":
						return [];
					default:
						throw new Error('Invalid member name for Extensions class: ' + memberName);
				}
			}
			//**********************************************************************************
			/**
    * Return value of asn1js schema for current class
    * @param {Object} parameters Input parameters for the schema
    * @param {boolean} optional Flag that current schema should be optional
    * @returns {Object} asn1js schema object
    */

		}, {
			key: 'schema',
			value: function schema() {
				var parameters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
				var optional = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

				//Extensions  ::=  SEQUENCE SIZE (1..MAX) OF Extension

				/**
     * @type {Object}
     * @property {string} [blockName]
     * @property {string} [extensions]
     * @property {string} [extension]
     */
				var names = getParametersValue(parameters, "names", {});

				return new Sequence({
					optional: optional,
					name: names.blockName || "",
					value: [new Repeated({
						name: names.extensions || "",
						value: Extension.schema(names.extension || {})
					})]
				});
			}
		}]);

		return Extensions;
	}();
	//**************************************************************************************

	//**************************************************************************************


	function tbsCertificate() {
		var parameters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

		//TBSCertificate  ::=  SEQUENCE  {
		//    version         [0]  EXPLICIT Version DEFAULT v1,
		//    serialNumber         CertificateSerialNumber,
		//    signature            AlgorithmIdentifier,
		//    issuer               Name,
		//    validity             Validity,
		//    subject              Name,
		//    subjectPublicKeyInfo SubjectPublicKeyInfo,
		//    issuerUniqueID  [1]  IMPLICIT UniqueIdentifier OPTIONAL,
		//                         -- If present, version MUST be v2 or v3
		//    subjectUniqueID [2]  IMPLICIT UniqueIdentifier OPTIONAL,
		//                         -- If present, version MUST be v2 or v3
		//    extensions      [3]  EXPLICIT Extensions OPTIONAL
		//    -- If present, version MUST be v3
		//}

		/**
   * @type {Object}
   * @property {string} [blockName]
   * @property {string} [tbsCertificateVersion]
   * @property {string} [tbsCertificateSerialNumber]
   * @property {string} [signature]
   * @property {string} [issuer]
   * @property {string} [tbsCertificateValidity]
   * @property {string} [notBefore]
   * @property {string} [notAfter]
   * @property {string} [subject]
   * @property {string} [subjectPublicKeyInfo]
   * @property {string} [tbsCertificateIssuerUniqueID]
   * @property {string} [tbsCertificateSubjectUniqueID]
   * @property {string} [extensions]
   */
		var names = getParametersValue(parameters, "names", {});

		return new Sequence({
			name: names.blockName || "tbsCertificate",
			value: [new Constructed({
				optional: true,
				idBlock: {
					tagClass: 3, // CONTEXT-SPECIFIC
					tagNumber: 0 // [0]
				},
				value: [new Integer({ name: names.tbsCertificateVersion || "tbsCertificate.version" }) // EXPLICIT integer value
				]
			}), new Integer({ name: names.tbsCertificateSerialNumber || "tbsCertificate.serialNumber" }), AlgorithmIdentifier.schema(names.signature || {
				names: {
					blockName: "tbsCertificate.signature"
				}
			}), RelativeDistinguishedNames.schema(names.issuer || {
				names: {
					blockName: "tbsCertificate.issuer"
				}
			}), new Sequence({
				name: names.tbsCertificateValidity || "tbsCertificate.validity",
				value: [Time.schema(names.notBefore || {
					names: {
						utcTimeName: "tbsCertificate.notBefore",
						generalTimeName: "tbsCertificate.notBefore"
					}
				}), Time.schema(names.notAfter || {
					names: {
						utcTimeName: "tbsCertificate.notAfter",
						generalTimeName: "tbsCertificate.notAfter"
					}
				})]
			}), RelativeDistinguishedNames.schema(names.subject || {
				names: {
					blockName: "tbsCertificate.subject"
				}
			}), PublicKeyInfo.schema(names.subjectPublicKeyInfo || {
				names: {
					blockName: "tbsCertificate.subjectPublicKeyInfo"
				}
			}), new Primitive({
				name: names.tbsCertificateIssuerUniqueID || "tbsCertificate.issuerUniqueID",
				optional: true,
				idBlock: {
					tagClass: 3, // CONTEXT-SPECIFIC
					tagNumber: 1 // [1]
				}
			}), // IMPLICIT bistring value
			new Primitive({
				name: names.tbsCertificateSubjectUniqueID || "tbsCertificate.subjectUniqueID",
				optional: true,
				idBlock: {
					tagClass: 3, // CONTEXT-SPECIFIC
					tagNumber: 2 // [2]
				}
			}), // IMPLICIT bistring value
			new Constructed({
				optional: true,
				idBlock: {
					tagClass: 3, // CONTEXT-SPECIFIC
					tagNumber: 3 // [3]
				},
				value: [Extensions.schema(names.extensions || {
					names: {
						blockName: "tbsCertificate.extensions"
					}
				})]
			}) // EXPLICIT SEQUENCE value
			]
		});
	}
	//**************************************************************************************

	var Certificate = function () {
		//**********************************************************************************
		/**
   * Constructor for Certificate class
   * @param {Object} [parameters={}]
   * @property {Object} [schema] asn1js parsed value
   */
		function Certificate() {
			var parameters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

			_classCallCheck(this, Certificate);

			//region Internal properties of the object
			/**
    * @type {ArrayBuffer}
    * @description tbs
    */
			this.tbs = getParametersValue(parameters, "tbs", Certificate.defaultValues("tbs"));
			/**
    * @type {number}
    * @description version
    */
			this.version = getParametersValue(parameters, "version", Certificate.defaultValues("version"));
			/**
    * @type {Integer}
    * @description serialNumber
    */
			this.serialNumber = getParametersValue(parameters, "serialNumber", Certificate.defaultValues("serialNumber"));
			/**
    * @type {AlgorithmIdentifier}
    * @description signature
    */
			this.signature = getParametersValue(parameters, "signature", Certificate.defaultValues("signature"));
			/**
    * @type {RelativeDistinguishedNames}
    * @description issuer
    */
			this.issuer = getParametersValue(parameters, "issuer", Certificate.defaultValues("issuer"));
			/**
    * @type {Time}
    * @description notBefore
    */
			this.notBefore = getParametersValue(parameters, "notBefore", Certificate.defaultValues("notBefore"));
			/**
    * @type {Time}
    * @description notAfter
    */
			this.notAfter = getParametersValue(parameters, "notAfter", Certificate.defaultValues("notAfter"));
			/**
    * @type {RelativeDistinguishedNames}
    * @description subject
    */
			this.subject = getParametersValue(parameters, "subject", Certificate.defaultValues("subject"));
			/**
    * @type {PublicKeyInfo}
    * @description subjectPublicKeyInfo
    */
			this.subjectPublicKeyInfo = getParametersValue(parameters, "subjectPublicKeyInfo", Certificate.defaultValues("subjectPublicKeyInfo"));

			if ("issuerUniqueID" in parameters)
				/**
     * @type {ArrayBuffer}
     * @description issuerUniqueID
     */
				this.issuerUniqueID = getParametersValue(parameters, "issuerUniqueID", Certificate.defaultValues("issuerUniqueID"));

			if ("subjectUniqueID" in parameters)
				/**
     * @type {ArrayBuffer}
     * @description subjectUniqueID
     */
				this.subjectUniqueID = getParametersValue(parameters, "subjectUniqueID", Certificate.defaultValues("subjectUniqueID"));

			if ("extensions" in parameters)
				/**
     * @type {Array}
     * @description extensions
     */
				this.extensions = getParametersValue(parameters, "extensions", Certificate.defaultValues("extensions"));

			/**
    * @type {AlgorithmIdentifier}
    * @description signatureAlgorithm
    */
			this.signatureAlgorithm = getParametersValue(parameters, "signatureAlgorithm", Certificate.defaultValues("signatureAlgorithm"));
			/**
    * @type {BitString}
    * @description signatureValue
    */
			this.signatureValue = getParametersValue(parameters, "signatureValue", Certificate.defaultValues("signatureValue"));
			//endregion

			//region If input argument array contains "schema" for this object
			if ("schema" in parameters) this.fromSchema(parameters.schema);
			//endregion
		}
		//**********************************************************************************
		/**
   * Return default values for all class members
   * @param {string} memberName String name for a class member
   */


		_createClass(Certificate, [{
			key: 'fromSchema',

			//**********************************************************************************
			/**
    * Convert parsed asn1js object into current class
    * @param {!Object} schema
    */
			value: function fromSchema(schema) {
				//region Check the schema is valid
				var asn1 = compareSchema(schema, schema, Certificate.schema({
					names: {
						tbsCertificate: {
							names: {
								extensions: {
									names: {
										extensions: "tbsCertificate.extensions"
									}
								}
							}
						}
					}
				}));

				if (asn1.verified === false) throw new Error("Object's schema was not verified against input data for CERT");
				//endregion

				//region Get internal properties from parsed schema
				this.tbs = asn1.result.tbsCertificate.valueBeforeDecode;

				if ("tbsCertificate.version" in asn1.result) this.version = asn1.result["tbsCertificate.version"].valueBlock.valueDec;
				this.serialNumber = asn1.result["tbsCertificate.serialNumber"];
				this.signature = new AlgorithmIdentifier({ schema: asn1.result["tbsCertificate.signature"] });
				this.issuer = new RelativeDistinguishedNames({ schema: asn1.result["tbsCertificate.issuer"] });
				this.notBefore = new Time({ schema: asn1.result["tbsCertificate.notBefore"] });
				this.notAfter = new Time({ schema: asn1.result["tbsCertificate.notAfter"] });
				this.subject = new RelativeDistinguishedNames({ schema: asn1.result["tbsCertificate.subject"] });
				this.subjectPublicKeyInfo = new PublicKeyInfo({ schema: asn1.result["tbsCertificate.subjectPublicKeyInfo"] });
				if ("tbsCertificate.issuerUniqueID" in asn1.result) this.issuerUniqueID = asn1.result["tbsCertificate.issuerUniqueID"].valueBlock.valueHex;
				if ("tbsCertificate.subjectUniqueID" in asn1.result) this.issuerUniqueID = asn1.result["tbsCertificate.subjectUniqueID"].valueBlock.valueHex;
				if ("tbsCertificate.extensions" in asn1.result) this.extensions = Array.from(asn1.result["tbsCertificate.extensions"], function (element) {
					return new Extension({ schema: element });
				});

				this.signatureAlgorithm = new AlgorithmIdentifier({ schema: asn1.result.signatureAlgorithm });
				this.signatureValue = asn1.result.signatureValue;
				//endregion
			}
			//**********************************************************************************
			/**
    * Create ASN.1 schema for existing values of TBS part for the certificate
    */

		}, {
			key: 'encodeTBS',
			value: function encodeTBS() {
				//region Create array for output sequence
				var outputArray = [];

				if ("version" in this && this.version !== Certificate.defaultValues("version")) {
					outputArray.push(new Constructed({
						optional: true,
						idBlock: {
							tagClass: 3, // CONTEXT-SPECIFIC
							tagNumber: 0 // [0]
						},
						value: [new Integer({ value: this.version }) // EXPLICIT integer value
						]
					}));
				}

				outputArray.push(this.serialNumber);
				outputArray.push(this.signature.toSchema());
				outputArray.push(this.issuer.toSchema());

				outputArray.push(new Sequence({
					value: [this.notBefore.toSchema(), this.notAfter.toSchema()]
				}));

				outputArray.push(this.subject.toSchema());
				outputArray.push(this.subjectPublicKeyInfo.toSchema());

				if ("issuerUniqueID" in this) {
					outputArray.push(new Primitive({
						optional: true,
						idBlock: {
							tagClass: 3, // CONTEXT-SPECIFIC
							tagNumber: 1 // [1]
						},
						valueHex: this.issuerUniqueID
					}));
				}
				if ("subjectUniqueID" in this) {
					outputArray.push(new Primitive({
						optional: true,
						idBlock: {
							tagClass: 3, // CONTEXT-SPECIFIC
							tagNumber: 2 // [2]
						},
						valueHex: this.subjectUniqueID
					}));
				}

				if ("subjectUniqueID" in this) {
					outputArray.push(new Primitive({
						optional: true,
						idBlock: {
							tagClass: 3, // CONTEXT-SPECIFIC
							tagNumber: 3 // [3]
						},
						value: [this.extensions.toSchema()]
					}));
				}

				if ("extensions" in this) {
					outputArray.push(new Constructed({
						optional: true,
						idBlock: {
							tagClass: 3, // CONTEXT-SPECIFIC
							tagNumber: 3 // [3]
						},
						value: [new Sequence({
							value: Array.from(this.extensions, function (element) {
								return element.toSchema();
							})
						})]
					}));
				}
				//endregion

				//region Create and return output sequence
				return new Sequence({
					value: outputArray
				});
				//endregion
			}
			//**********************************************************************************
			/**
    * Convert current object to asn1js object and set correct values
    * @returns {Object} asn1js object
    */

		}, {
			key: 'toSchema',
			value: function toSchema() {
				var encodeFlag = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

				var tbsSchema = {};

				//region Decode stored TBS value
				if (encodeFlag === false) {
					if (this.tbs.length === 0) // No stored certificate TBS part
						return Certificate.schema().value[0];

					tbsSchema = fromBER(this.tbs).result;
				}
				//endregion
				//region Create TBS schema via assembling from TBS parts
				else tbsSchema = this.encodeTBS();
				//endregion

				//region Construct and return new ASN.1 schema for this object
				return new Sequence({
					value: [tbsSchema, this.signatureAlgorithm.toSchema(), this.signatureValue]
				});
				//endregion
			}
			//**********************************************************************************
			/**
    * Convertion for the class to JSON object
    * @returns {Object}
    */

		}, {
			key: 'toJSON',
			value: function toJSON() {
				var object = {
					tbs: bufferToHexCodes(this.tbs, 0, this.tbs.byteLength),
					serialNumber: this.serialNumber.toJSON(),
					signature: this.signature.toJSON(),
					issuer: this.issuer.toJSON(),
					notBefore: this.notBefore.toJSON(),
					notAfter: this.notAfter.toJSON(),
					subject: this.subject.toJSON(),
					subjectPublicKeyInfo: this.subjectPublicKeyInfo.toJSON(),
					signatureAlgorithm: this.signatureAlgorithm.toJSON(),
					signatureValue: this.signatureValue.toJSON()
				};

				if ("version" in this && this.version !== Certificate.defaultValues("version")) object.version = this.version;

				if ("issuerUniqueID" in this) object.issuerUniqueID = bufferToHexCodes(this.issuerUniqueID, 0, this.issuerUniqueID.byteLength);

				if ("subjectUniqueID" in this) object.subjectUniqueID = bufferToHexCodes(this.subjectUniqueID, 0, this.subjectUniqueID.byteLength);

				if ("extensions" in this) object.extensions = Array.from(this.extensions, function (element) {
					return element.toJSON();
				});

				return object;
			}
			//**********************************************************************************
			/**
    * Importing public key for current certificate
    */

		}, {
			key: 'getPublicKey',
			value: function getPublicKey() {
				var parameters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

				//region Get a "crypto" extension
				var crypto = getCrypto();
				if (typeof crypto === "undefined") return Promise.reject("Unable to create WebCrypto object");
				//endregion

				//region Find correct algorithm for imported public key
				if (parameters === null) {
					//region Initial variables
					parameters = {};
					//endregion

					//region Find signer's hashing algorithm
					var shaAlgorithm = getHashAlgorithm(this.signatureAlgorithm);
					if (shaAlgorithm === "") return Promise.reject('Unsupported signature algorithm: ' + this.signatureAlgorithm.algorithmId);
					//endregion

					//region Get information about public key algorithm and default parameters for import
					var algorithmObject = getAlgorithmByOID(this.subjectPublicKeyInfo.algorithm.algorithmId);
					if ("name" in algorithmObject === false) return Promise.reject('Unsupported public key algorithm: ' + this.subjectPublicKeyInfo.algorithm.algorithmId);

					parameters.algorithm = getAlgorithmParameters(algorithmObject.name, "importkey");
					if ("hash" in parameters.algorithm.algorithm) parameters.algorithm.algorithm.hash.name = shaAlgorithm;
					//endregion
				}
				//endregion

				//region Get neccessary values from internal fields for current certificate
				var publicKeyInfoSchema = this.subjectPublicKeyInfo.toSchema();
				var publicKeyInfoBuffer = publicKeyInfoSchema.toBER(false);
				var publicKeyInfoView = new Uint8Array(publicKeyInfoBuffer);
				//endregion

				return crypto.importKey("spki", publicKeyInfoView, parameters.algorithm.algorithm, true, parameters.algorithm.usages);
			}
			//**********************************************************************************
			/**
    * Get SHA-1 hash value for subject public key
    */

		}, {
			key: 'getKeyHash',
			value: function getKeyHash() {
				//region Get a "crypto" extension
				var crypto = getCrypto();
				if (typeof crypto === "undefined") return Promise.reject("Unable to create WebCrypto object");
				//endregion

				return crypto.digest({ name: "sha-1" }, new Uint8Array(this.subjectPublicKeyInfo.subjectPublicKey.valueBlock.valueHex));
			}
			//**********************************************************************************
			/**
    * Make a signature for current value from TBS section
    * @param {Object} privateKey Private key for "subjectPublicKeyInfo" structure
    * @param {string} [hashAlgorithm="SHA-1"] Hashing algorithm
    */

		}, {
			key: 'sign',
			value: function sign(privateKey) {
				var _this55 = this;

				var hashAlgorithm = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "SHA-1";

				//region Get hashing algorithm
				var oid = getOIDByAlgorithm({ name: hashAlgorithm });
				if (oid === "") return Promise.reject('Unsupported hash algorithm: ' + hashAlgorithm);
				//endregion

				//region Get a "default parameters" for current algorithm
				var defParams = getAlgorithmParameters(privateKey.algorithm.name, "sign");
				defParams.algorithm.hash.name = hashAlgorithm;
				//endregion

				//region Fill internal structures base on "privateKey" and "hashAlgorithm"
				switch (privateKey.algorithm.name.toUpperCase()) {
					case "RSASSA-PKCS1-V1_5":
					case "ECDSA":
						this.signature.algorithmId = getOIDByAlgorithm(defParams.algorithm);
						this.signatureAlgorithm.algorithmId = this.signature.algorithmId;
						break;
					case "RSA-PSS":
						{
							//region Set "saltLength" as a length (in octets) of hash function result
							switch (hashAlgorithm.toUpperCase()) {
								case "SHA-256":
									defParams.algorithm.saltLength = 32;
									break;
								case "SHA-384":
									defParams.algorithm.saltLength = 48;
									break;
								case "SHA-512":
									defParams.algorithm.saltLength = 64;
									break;
								default:
							}
							//endregion

							//region Fill "RSASSA_PSS_params" object
							var paramsObject = {};

							if (hashAlgorithm.toUpperCase() !== "SHA-1") {
								var hashAlgorithmOID = getOIDByAlgorithm({ name: hashAlgorithm });
								if (hashAlgorithmOID === "") return Promise.reject('Unsupported hash algorithm: ' + hashAlgorithm);

								paramsObject.hashAlgorithm = new AlgorithmIdentifier({
									algorithmId: hashAlgorithmOID,
									algorithmParams: new Null()
								});

								paramsObject.maskGenAlgorithm = new AlgorithmIdentifier({
									algorithmId: "1.2.840.113549.1.1.8", // MGF1
									algorithmParams: paramsObject.hashAlgorithm.toSchema()
								});
							}

							if (defParams.algorithm.saltLength !== 20) paramsObject.saltLength = defParams.algorithm.saltLength;

							var pssParameters = new RSASSAPSSParams(paramsObject);
							//endregion

							//region Automatically set signature algorithm
							this.signature = new AlgorithmIdentifier({
								algorithmId: "1.2.840.113549.1.1.10",
								algorithmParams: pssParameters.toSchema()
							});
							this.signatureAlgorithm = this.signature; // Must be the same
							//endregion
						}
						break;
					default:
						return Promise.reject('Unsupported signature algorithm: ' + privateKey.algorithm.name);
				}
				//endregion

				//region Create TBS data for signing
				this.tbs = this.encodeTBS().toBER(false);
				//endregion

				//region Get a "crypto" extension
				var crypto = getCrypto();
				if (typeof crypto === "undefined") return Promise.reject("Unable to create WebCrypto object");
				//endregion

				//region Signing TBS data on provided private key
				return crypto.sign(defParams.algorithm, privateKey, new Uint8Array(this.tbs)).then(function (result) {
					//region Special case for ECDSA algorithm
					if (defParams.algorithm.name === "ECDSA") result = createCMSECDSASignature(result);
					//endregion

					_this55.signatureValue = new BitString({ valueHex: result });
				}, function (error) {
					return Promise.reject('Signing error: ' + error);
				});
				//endregion
			}
			//**********************************************************************************

		}, {
			key: 'verify',
			value: function verify() {
				var _this56 = this;

				var issuerCertificate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

				//region Global variables
				var sequence = Promise.resolve();

				var subjectPublicKeyInfo = {};

				var signature = this.signatureValue;
				var tbs = this.tbs;
				//endregion

				//region Set correct "subjectPublicKeyInfo" value
				if (issuerCertificate !== null) subjectPublicKeyInfo = issuerCertificate.subjectPublicKeyInfo;else {
					if (this.issuer.isEqual(this.subject)) // Self-signed certificate
						subjectPublicKeyInfo = this.subjectPublicKeyInfo;
				}

				if (subjectPublicKeyInfo instanceof PublicKeyInfo === false) return Promise.reject("Please provide issuer certificate as a parameter");
				//endregion

				//region Get a "crypto" extension
				var crypto = getCrypto();
				if (typeof crypto === "undefined") return Promise.reject("Unable to create WebCrypto object");
				//endregion

				//region Find signer's hashing algorithm
				var shaAlgorithm = getHashAlgorithm(this.signatureAlgorithm);
				if (shaAlgorithm === "") return Promise.reject('Unsupported signature algorithm: ' + this.signatureAlgorithm.algorithmId);
				//endregion

				//region Importing public key
				sequence = sequence.then(function () {
					//region Get information about public key algorithm and default parameters for import
					var algorithmId = void 0;
					if (_this56.signatureAlgorithm.algorithmId === "1.2.840.113549.1.1.10") algorithmId = _this56.signatureAlgorithm.algorithmId;else algorithmId = subjectPublicKeyInfo.algorithm.algorithmId;

					var algorithmObject = getAlgorithmByOID(algorithmId);
					if ("name" in algorithmObject === false) return Promise.reject('Unsupported public key algorithm: ' + algorithmId);

					var algorithm = getAlgorithmParameters(algorithmObject.name, "importkey");
					if ("hash" in algorithm.algorithm) algorithm.algorithm.hash.name = shaAlgorithm;
					//endregion

					var publicKeyInfoSchema = subjectPublicKeyInfo.toSchema();
					var publicKeyInfoBuffer = publicKeyInfoSchema.toBER(false);
					var publicKeyInfoView = new Uint8Array(publicKeyInfoBuffer);

					return crypto.importKey("spki", publicKeyInfoView, algorithm.algorithm, true, algorithm.usages);
				});
				//endregion

				//region Verify signature for the certificate
				sequence = sequence.then(function (publicKey) {
					//region Get default algorithm parameters for verification
					var algorithm = getAlgorithmParameters(publicKey.algorithm.name, "verify");
					if ("hash" in algorithm.algorithm) algorithm.algorithm.hash.name = shaAlgorithm;
					//endregion

					//region Special case for ECDSA signatures
					var signatureValue = signature.valueBlock.valueHex;

					if (publicKey.algorithm.name === "ECDSA") {
						var asn1 = fromBER(signatureValue);
						signatureValue = createECDSASignatureFromCMS(asn1.result);
					}
					//endregion

					//region Special case for RSA-PSS
					if (publicKey.algorithm.name === "RSA-PSS") {
						var pssParameters = void 0;

						try {
							pssParameters = new RSASSAPSSParams({ schema: _this56.signatureAlgorithm.algorithmParams });
						} catch (ex) {
							return Promise.reject(ex);
						}

						if ("saltLength" in pssParameters) algorithm.algorithm.saltLength = pssParameters.saltLength;else algorithm.algorithm.saltLength = 20;

						var hashAlgo = "SHA-1";

						if ("hashAlgorithm" in pssParameters) {
							var hashAlgorithm = getAlgorithmByOID(pssParameters.hashAlgorithm.algorithmId);
							if ("name" in hashAlgorithm === false) return Promise.reject('Unrecognized hash algorithm: ' + pssParameters.hashAlgorithm.algorithmId);

							hashAlgo = hashAlgorithm.name;
						}

						algorithm.algorithm.hash.name = hashAlgo;
					}
					//endregion

					return crypto.verify(algorithm.algorithm, publicKey, new Uint8Array(signatureValue), new Uint8Array(tbs));
				});
				//endregion

				return sequence;
			}
			//**********************************************************************************

		}], [{
			key: 'defaultValues',
			value: function defaultValues(memberName) {
				switch (memberName) {
					case "tbs":
						return new ArrayBuffer(0);
					case "version":
						return 0;
					case "serialNumber":
						return new Integer();
					case "signature":
						return new AlgorithmIdentifier();
					case "issuer":
						return new RelativeDistinguishedNames();
					case "notBefore":
						return new Time();
					case "notAfter":
						return new Time();
					case "subject":
						return new RelativeDistinguishedNames();
					case "subjectPublicKeyInfo":
						return new PublicKeyInfo();
					case "issuerUniqueID":
						return new ArrayBuffer(0);
					case "subjectUniqueID":
						return new ArrayBuffer(0);
					case "extensions":
						return [];
					case "signatureAlgorithm":
						return new AlgorithmIdentifier();
					case "signatureValue":
						return new BitString();
					default:
						throw new Error('Invalid member name for Certificate class: ' + memberName);
				}
			}
			//**********************************************************************************
			/**
    * Return value of asn1js schema for current class
    * @param {Object} parameters Input parameters for the schema
    * @returns {Object} asn1js schema object
    */

		}, {
			key: 'schema',
			value: function schema() {
				var parameters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

				//Certificate  ::=  SEQUENCE  {
				//    tbsCertificate       TBSCertificate,
				//    signatureAlgorithm   AlgorithmIdentifier,
				//    signatureValue       BIT STRING  }

				/**
     * @type {Object}
     * @property {string} [blockName]
     * @property {string} [tbsCertificate]
     * @property {string} [signatureAlgorithm]
     * @property {string} [signatureValue]
     */
				var names = getParametersValue(parameters, "names", {});

				return new Sequence({
					name: names.blockName || "",
					value: [tbsCertificate(names.tbsCertificate), AlgorithmIdentifier.schema(names.signatureAlgorithm || {
						names: {
							blockName: "signatureAlgorithm"
						}
					}), new BitString({ name: names.signatureValue || "signatureValue" })]
				});
			}
		}]);

		return Certificate;
	}();
	//**************************************************************************************

	//**************************************************************************************

	//**************************************************************************************

	//**************************************************************************************

	//**************************************************************************************

	//**************************************************************************************

	//**************************************************************************************

	//**************************************************************************************

	//**************************************************************************************

	//**************************************************************************************

	//**************************************************************************************

	//**************************************************************************************

	//**************************************************************************************

	//**************************************************************************************

	//**************************************************************************************

	//**************************************************************************************

	//**************************************************************************************

	//**************************************************************************************

	//**************************************************************************************

	//**************************************************************************************

	//**************************************************************************************

	//**************************************************************************************

	//**************************************************************************************

	//**************************************************************************************

	//**************************************************************************************

	//**************************************************************************************

	//**************************************************************************************

	//**************************************************************************************

	//**************************************************************************************

	//**************************************************************************************

	//**************************************************************************************

	//**************************************************************************************

	//**************************************************************************************

	//**************************************************************************************

	//**************************************************************************************

	//**************************************************************************************
	//region Aux functions
	//**************************************************************************************

	//**************************************************************************************

	//**************************************************************************************

	//**************************************************************************************

	//**************************************************************************************

	//**************************************************************************************

	//**************************************************************************************

	//**************************************************************************************

	//**************************************************************************************

	//**************************************************************************************

	//**************************************************************************************

	//**************************************************************************************

	//**************************************************************************************

	//**************************************************************************************

	//**************************************************************************************

	//**************************************************************************************

	//**************************************************************************************

	//**************************************************************************************

	//**************************************************************************************

	//**************************************************************************************

	//**************************************************************************************

	//**************************************************************************************

	//**************************************************************************************

	//**************************************************************************************

	//**************************************************************************************

	var _crypto = null;

	var Application = function () {
		function Application() {
			_classCallCheck(this, Application);
		}

		_createClass(Application, null, [{
			key: 'setEngine',

			/**
    * Sets crypto engine for the current Application
    * @param  {string} name
    * @param  {Crypto} crypto
    * @returns void
    */
			value: function setEngine(name, crypto) {
				_crypto = crypto;
				_crypto.name = name;
			}
			/**
    * Gets the crypto module from the Application
    */

		}, {
			key: 'isNodePlugin',
			value: function isNodePlugin() {
				return typeof self === "undefined" && typeof window === "undefined";
			}
		}, {
			key: 'crypto',
			get: function get() {
				if (!_crypto) throw new XmlError(XE.CRYPTOGRAPHIC_NO_MODULE);
				return _crypto;
			}
		}]);

		return Application;
	}();
	// set default w3 WebCrypto


	+function init() {
		if (!Application.isNodePlugin()) {
			Application.setEngine("W3 WebCrypto module", self.crypto);
		}
	}();

	var XmlCanonicalizerState;
	(function (XmlCanonicalizerState) {
		XmlCanonicalizerState[XmlCanonicalizerState["BeforeDocElement"] = 0] = "BeforeDocElement";
		XmlCanonicalizerState[XmlCanonicalizerState["InsideDocElement"] = 1] = "InsideDocElement";
		XmlCanonicalizerState[XmlCanonicalizerState["AfterDocElement"] = 2] = "AfterDocElement";
	})(XmlCanonicalizerState || (XmlCanonicalizerState = {}));

	var XmlCanonicalizer = function () {
		function XmlCanonicalizer(withComments, excC14N) {
			var propagatedNamespaces = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : new NamespaceManager();

			_classCallCheck(this, XmlCanonicalizer);

			this.propagatedNamespaces = new NamespaceManager();
			this.result = [];
			this.visibleNamespaces = new NamespaceManager();
			this.inclusiveNamespacesPrefixList = [];
			this.state = XmlCanonicalizerState.BeforeDocElement;
			this.withComments = withComments;
			this.exclusive = excC14N;
			this.propagatedNamespaces = propagatedNamespaces;
		}
		// See xml-enc-c14n specification


		_createClass(XmlCanonicalizer, [{
			key: 'Canonicalize',
			value: function Canonicalize(node) {
				if (!node) throw new XmlError(XE.CRYPTOGRAPHIC, "Parameter 1 is not Node");
				var _node = void 0;
				if (node.nodeType === XmlNodeType.Document) {
					this.document = node;
					_node = this.document.documentElement;
				} else {
					this.document = node.ownerDocument;
					_node = node;
				}
				// get nss from document
				// this.nsManager = new XmlNamespaceManager(this.document);
				this.WriteNode(_node);
				var res = this.result.join("");
				return res;
			}
		}, {
			key: 'WriteNode',
			value: function WriteNode(node) {
				switch (node.nodeType) {
					case XmlNodeType.Document:
					case XmlNodeType.DocumentFragment:
						this.WriteDocumentNode(node);
						break;
					case XmlNodeType.Element:
						this.WriteElementNode(node);
						break;
					case XmlNodeType.CDATA:
					case XmlNodeType.SignificantWhitespace:
					case XmlNodeType.Text:
						// CDATA sections are processed as text nodes
						this.WriteTextNode(node);
						break;
					case XmlNodeType.Whitespace:
						if (this.state === XmlCanonicalizerState.InsideDocElement) this.WriteTextNode(node);
						break;
					case XmlNodeType.Comment:
						this.WriteCommentNode(node);
						break;
					case XmlNodeType.ProcessingInstruction:
						this.WriteProcessingInstructionNode(node);
						break;
					case XmlNodeType.EntityReference:
						for (var i = 0; i < node.childNodes.length; i++) {
							this.WriteNode(node.childNodes[i]);
						}break;
					case XmlNodeType.Attribute:
						throw new XmlError(XE.CRYPTOGRAPHIC, "Attribute node is impossible here");
					case XmlNodeType.EndElement:
						throw new XmlError(XE.CRYPTOGRAPHIC, "Attribute node is impossible here");
					case XmlNodeType.EndEntity:
						throw new XmlError(XE.CRYPTOGRAPHIC, "Attribute node is impossible here");
					case XmlNodeType.DocumentType:
					case XmlNodeType.Entity:
					case XmlNodeType.Notation:
					case XmlNodeType.XmlDeclaration:
						// just do nothing
						break;
				}
			}
		}, {
			key: 'WriteDocumentNode',
			value: function WriteDocumentNode(node) {
				this.state = XmlCanonicalizerState.BeforeDocElement;
				for (var child = node.firstChild; child != null; child = child.nextSibling) {
					this.WriteNode(child);
				}
			}
			// Text Nodes
			// the string value, except all ampersands are replaced 
			// by &amp;, all open angle brackets (<) are replaced by &lt;, all closing 
			// angle brackets (>) are replaced by &gt;, and all #xD characters are 
			// replaced by &#xD;.

		}, {
			key: 'WriteTextNode',
			value: function WriteTextNode(node) {
				// console.log(`WriteTextNode: ${node.nodeName}`);
				this.result.push(this.NormalizeString(node.nodeValue, node.nodeType));
			}
		}, {
			key: 'WriteCommentNode',
			value: function WriteCommentNode(node) {
				// console.log(`WriteCommentNode: ${node.nodeName}`);
				// Console.WriteLine ("Debug: comment node");
				if (this.withComments) {
					if (this.state === XmlCanonicalizerState.AfterDocElement) this.result.push(String.fromCharCode(10) + "<!--");else this.result.push("<!--");
					this.result.push(this.NormalizeString(node.nodeValue, XmlNodeType.Comment));
					if (this.state === XmlCanonicalizerState.BeforeDocElement) this.result.push("-->" + String.fromCharCode(10));else this.result.push("-->");
				}
			}
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

		}, {
			key: 'WriteProcessingInstructionNode',
			value: function WriteProcessingInstructionNode(node) {
				// console.log(`WriteProcessingInstructionNode: ${node.nodeName}`);
				if (this.state === XmlCanonicalizerState.AfterDocElement) this.result.push('\n<?');else this.result.push("<?");
				this.result.push(node.nodeName);
				if (node.nodeValue) {
					this.result.push(" ");
					this.result.push(this.NormalizeString(node.nodeValue, XmlNodeType.ProcessingInstruction));
				}
				if (this.state === XmlCanonicalizerState.BeforeDocElement) this.result.push('?>\n');else this.result.push("?>");
			}
		}, {
			key: 'WriteElementNode',
			value: function WriteElementNode(node) {
				// console.log(`WriteElementNode: ${node.nodeName}`);
				if (this.state === XmlCanonicalizerState.BeforeDocElement) this.state = XmlCanonicalizerState.InsideDocElement;
				// open tag
				this.result.push("<");
				this.result.push(node.nodeName);
				// namespaces
				var visibleNamespacesCount = this.WriteNamespacesAxis(node);
				// attributes
				this.WriteAttributesAxis(node);
				this.result.push(">");
				for (var n = node.firstChild; n != null; n = n.nextSibling) {
					// if (!(n.nodeType === XmlCore.XmlNodeType.Text && node.childNodes.length > 1))
					this.WriteNode(n);
				}
				// close tag
				this.result.push("</");
				this.result.push(node.nodeName);
				this.result.push(">");
				if (this.state === XmlCanonicalizerState.BeforeDocElement) this.state = XmlCanonicalizerState.AfterDocElement;
				// remove added namespaces
				while (visibleNamespacesCount--) {
					this.visibleNamespaces.Pop();
				}
			}
		}, {
			key: 'WriteNamespacesAxis',
			value: function WriteNamespacesAxis(node) {
				var _this57 = this;

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
						var _ns = { prefix: attribute.prefix, namespace: attribute.nodeValue };
						list.push(_ns);
						this.visibleNamespaces.Add(_ns);
						visibleNamespacesCount++;
					}
					// if (attribute.localName === "xmlns")
					//     continue;
					// get namespace prefix
					var prefix = null;
					var matches = void 0;
					if (matches = /xmlns:(\w+)/.exec(attribute.nodeName)) prefix = matches[1];
					var printable = true;
					if (this.exclusive && !this.IsNamespaceInclusive(node, prefix)) {
						var used = IsNamespaceUsed(node, prefix);
						if (used > 1) printable = false;else if (used === 0) continue;
					}
					if (this.IsNamespaceRendered(prefix, attribute.nodeValue)) continue;
					if (printable) {
						var _ns2 = { prefix: prefix, namespace: attribute.nodeValue };
						list.push(_ns2);
						this.visibleNamespaces.Add(_ns2);
						visibleNamespacesCount++;
					}
				}
				if (!this.IsNamespaceRendered(node.prefix, node.namespaceURI) && node.namespaceURI !== "http://www.w3.org/2000/xmlns/") {
					var _ns3 = { prefix: node.prefix, namespace: node.namespaceURI };
					list.push(_ns3);
					this.visibleNamespaces.Add(_ns3);
					visibleNamespacesCount++;
				}
				// sort nss
				list.sort(XmlDsigC14NTransformNamespacesComparer);
				var prevPrefix = null;
				list.forEach(function (n) {
					if (n.prefix === prevPrefix) {
						return;
					}
					prevPrefix = n.prefix;
					_this57.result.push(" xmlns");
					if (n.prefix) _this57.result.push(":" + n.prefix);
					_this57.result.push("=\"");
					_this57.result.push(n.namespace); // TODO namespace can be null
					_this57.result.push("\"");
				});
				return visibleNamespacesCount;
			}
		}, {
			key: 'WriteAttributesAxis',
			value: function WriteAttributesAxis(node) {
				var _this58 = this;

				// Console.WriteLine ("Debug: attributes");
				var list = [];
				for (var i = 0; i < node.attributes.length; i++) {
					var attribute = node.attributes[i];
					if (!IsNamespaceNode(attribute)) list.push(attribute);
				}
				// sort namespaces and write results	    
				list.sort(XmlDsigC14NTransformAttributesComparer);
				list.forEach(function (attribute) {
					if (attribute != null) {
						_this58.result.push(" ");
						_this58.result.push(attribute.nodeName);
						_this58.result.push("=\"");
						_this58.result.push(_this58.NormalizeString(attribute.nodeValue, XmlNodeType.Attribute));
						_this58.result.push("\"");
					}
				});
			}
		}, {
			key: 'NormalizeString',
			value: function NormalizeString(input, type) {
				var sb = [];
				if (input) for (var i = 0; i < input.length; i++) {
					var ch = input[i];
					if (ch === "<" && (type === XmlNodeType.Attribute || this.IsTextNode(type))) sb.push("&lt;");else if (ch === ">" && this.IsTextNode(type)) sb.push("&gt;");else if (ch === "&" && (type === XmlNodeType.Attribute || this.IsTextNode(type))) sb.push("&amp;");else if (ch === "\"" && type === XmlNodeType.Attribute) sb.push("&quot;");else if (ch === '\t' && type === XmlNodeType.Attribute) sb.push("&#x9;");else if (ch === '\n' && type === XmlNodeType.Attribute) sb.push("&#xA;");else if (ch === '\r') sb.push("&#xD;");else sb.push(ch);
				}
				return sb.join("");
			}
		}, {
			key: 'IsTextNode',
			value: function IsTextNode(type) {
				switch (type) {
					case XmlNodeType.Text:
					case XmlNodeType.CDATA:
					case XmlNodeType.SignificantWhitespace:
					case XmlNodeType.Whitespace:
						return true;
				}
				return false;
			}
		}, {
			key: 'IsNamespaceInclusive',
			value: function IsNamespaceInclusive(node, prefix) {
				var _prefix = prefix || null;
				if (node.prefix === _prefix) return false;
				return this.inclusiveNamespacesPrefixList.indexOf(_prefix || "") !== -1; // && node.prefix === prefix;
			}
		}, {
			key: 'IsNamespaceRendered',
			value: function IsNamespaceRendered(prefix, uri) {
				prefix = prefix || "";
				uri = uri || "";
				if (!prefix && !uri) return true;
				if (prefix === "xml" && uri === "http://www.w3.org/XML/1998/namespace") return true;
				var ns = this.visibleNamespaces.GetPrefix(prefix);
				if (ns) return ns.namespace === uri;
				return false;
			}
		}, {
			key: 'InclusiveNamespacesPrefixList',
			get: function get() {
				return this.inclusiveNamespacesPrefixList.join(" ");
			},
			set: function set(value) {
				this.inclusiveNamespacesPrefixList = value.split(" ");
			}
		}]);

		return XmlCanonicalizer;
	}();

	function XmlDsigC14NTransformNamespacesComparer(x, y) {
		// simple cases
		// tslint:disable-next-line:triple-equals
		if (x == y) return 0;else if (!x) return -1;else if (!y) return 1;else if (!x.prefix) return -1;else if (!y.prefix) return 1;
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
		if (left === right) return 0;else if (left < right) return -1;else return 1;
	}
	function IsNamespaceUsed(node, prefix) {
		var result = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

		var _prefix = prefix || null;
		if (node.prefix === _prefix) return ++result;
		// prefix of attributes
		if (node.attributes) for (var i = 0; i < node.attributes.length; i++) {
			var attr = node.attributes[i];
			if (!IsNamespaceNode(attr) && prefix && node.attributes[i].prefix === prefix) return ++result;
		}
		// check prefix of Element
		for (var n = node.firstChild; !!n; n = n.nextSibling) {
			if (n.nodeType === XmlNodeType.Element) {
				var el = n;
				var res = IsNamespaceUsed(el, prefix, result);
				if (n.nodeType === XmlNodeType.Element && res) return ++result + res;
			}
		}
		return result;
	}
	function IsNamespaceNode(node) {
		var reg = /xmlns:/;
		if (node !== null && node.nodeType === XmlNodeType.Attribute && (node.nodeName === "xmlns" || reg.test(node.nodeName))) return true;
		return false;
	}

	var XmlSignature = {
		DefaultCanonMethod: "http://www.w3.org/TR/2001/REC-xml-c14n-20010315",
		DefaultDigestMethod: "http://www.w3.org/2001/04/xmlenc#sha256",
		DefaultPrefix: "ds",
		ElementNames: {
			CanonicalizationMethod: "CanonicalizationMethod",
			DigestMethod: "DigestMethod",
			DigestValue: "DigestValue",
			DSAKeyValue: "DSAKeyValue",
			DomainParameters: "DomainParameters",
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
			ECDSAKeyValue: "ECDSAKeyValue",
			NamedCurve: "NamedCurve",
			PublicKey: "PublicKey",
			Signature: "Signature",
			SignatureMethod: "SignatureMethod",
			SignatureValue: "SignatureValue",
			SignedInfo: "SignedInfo",
			Transform: "Transform",
			Transforms: "Transforms",
			X509Data: "X509Data",
			PGPData: "PGPData",
			SPKIData: "SPKIData",
			SPKIexp: "SPKIexp",
			MgmtData: "MgmtData",
			X509IssuerSerial: "X509IssuerSerial",
			X509IssuerName: "X509IssuerName",
			X509SerialNumber: "X509SerialNumber",
			X509SKI: "X509SKI",
			X509SubjectName: "X509SubjectName",
			X509Certificate: "X509Certificate",
			X509CRL: "X509CRL",
			XPath: "XPath",
			X: "X",
			Y: "Y"
		},
		AttributeNames: {
			Algorithm: "Algorithm",
			Encoding: "Encoding",
			Id: "Id",
			MimeType: "MimeType",
			Type: "Type",
			URI: "URI"
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
		NamespaceURIPss: "http://www.example.org/xmldsig-pss/#"
	};

	var XmlSignatureObject = function (_XmlObject2) {
		_inherits(XmlSignatureObject, _XmlObject2);

		function XmlSignatureObject() {
			_classCallCheck(this, XmlSignatureObject);

			return _possibleConstructorReturn(this, (XmlSignatureObject.__proto__ || Object.getPrototypeOf(XmlSignatureObject)).apply(this, arguments));
		}

		return XmlSignatureObject;
	}(XmlObject);
	XmlSignatureObject = __decorate([XmlElement({
		localName: "xmldsig",
		namespaceURI: XmlSignature.NamespaceURI,
		prefix: XmlSignature.DefaultPrefix
	})], XmlSignatureObject);
	var XmlSignatureCollection = function (_XmlCollection) {
		_inherits(XmlSignatureCollection, _XmlCollection);

		function XmlSignatureCollection() {
			_classCallCheck(this, XmlSignatureCollection);

			return _possibleConstructorReturn(this, (XmlSignatureCollection.__proto__ || Object.getPrototypeOf(XmlSignatureCollection)).apply(this, arguments));
		}

		return XmlSignatureCollection;
	}(XmlCollection);
	XmlSignatureCollection = __decorate([XmlElement({
		localName: "xmldsig_collection",
		namespaceURI: XmlSignature.NamespaceURI,
		prefix: XmlSignature.DefaultPrefix
	})], XmlSignatureCollection);

	var KeyInfoClause = function (_XmlSignatureObject) {
		_inherits(KeyInfoClause, _XmlSignatureObject);

		function KeyInfoClause() {
			_classCallCheck(this, KeyInfoClause);

			return _possibleConstructorReturn(this, (KeyInfoClause.__proto__ || Object.getPrototypeOf(KeyInfoClause)).apply(this, arguments));
		}

		return KeyInfoClause;
	}(XmlSignatureObject);

	/**
  *
  * <element name="DigestMethod" type="ds:DigestMethodType"/>
  * <complexType name="DigestMethodType" mixed="true">
  *   <sequence>
  *     <any namespace="##other" processContents="lax" minOccurs="0" maxOccurs="unbounded"/>
  *   </sequence>
  *   <attribute name="Algorithm" type="anyURI" use="required"/>
  * </complexType>
  *
  */


	var DigestMethod = function (_XmlSignatureObject2) {
		_inherits(DigestMethod, _XmlSignatureObject2);

		function DigestMethod() {
			_classCallCheck(this, DigestMethod);

			return _possibleConstructorReturn(this, (DigestMethod.__proto__ || Object.getPrototypeOf(DigestMethod)).apply(this, arguments));
		}

		return DigestMethod;
	}(XmlSignatureObject);
	__decorate([XmlAttribute({
		localName: XmlSignature.AttributeNames.Algorithm,
		required: true,
		defaultValue: XmlSignature.DefaultDigestMethod
	})], DigestMethod.prototype, "Algorithm", void 0);
	DigestMethod = __decorate([XmlElement({
		localName: XmlSignature.ElementNames.DigestMethod
	})], DigestMethod);

	var XmlAlgorithm = function () {
		function XmlAlgorithm() {
			_classCallCheck(this, XmlAlgorithm);
		}

		_createClass(XmlAlgorithm, [{
			key: 'getAlgorithmName',
			value: function getAlgorithmName() {
				return this.namespaceURI;
			}
		}]);

		return XmlAlgorithm;
	}();

	var HashAlgorithm = function (_XmlAlgorithm) {
		_inherits(HashAlgorithm, _XmlAlgorithm);

		function HashAlgorithm() {
			_classCallCheck(this, HashAlgorithm);

			return _possibleConstructorReturn(this, (HashAlgorithm.__proto__ || Object.getPrototypeOf(HashAlgorithm)).apply(this, arguments));
		}

		_createClass(HashAlgorithm, [{
			key: 'Digest',
			value: function Digest(xml) {
				var _this64 = this;

				return Promise.resolve().then(function () {
					// console.log("HashedInfo:", xml);
					var buf = void 0;
					if (typeof xml === "string") {
						// C14N transforms
						buf = Convert.FromString(xml, "utf8");
					} else if (xml instanceof Uint8Array) {
						// base64 transform
						buf = xml;
					} else {
						// enveloped signature transform
						var txt = new XMLSerializer().serializeToString(xml);
						buf = Convert.FromString(txt, "utf8");
					}
					return Application.crypto.subtle.digest(_this64.algorithm, buf);
				}).then(function (hash) {
					return new Uint8Array(hash);
				});
			}
		}]);

		return HashAlgorithm;
	}(XmlAlgorithm);

	var SignatureAlgorithm = function (_XmlAlgorithm2) {
		_inherits(SignatureAlgorithm, _XmlAlgorithm2);

		function SignatureAlgorithm() {
			_classCallCheck(this, SignatureAlgorithm);

			return _possibleConstructorReturn(this, (SignatureAlgorithm.__proto__ || Object.getPrototypeOf(SignatureAlgorithm)).apply(this, arguments));
		}

		_createClass(SignatureAlgorithm, [{
			key: 'Sign',

			/**
    * Sign the given string using the given key
    */
			value: function Sign(signedInfo, signingKey, algorithm) {
				var _signedInfo = Convert.FromString(signedInfo, "utf8");
				return Application.crypto.subtle.sign(algorithm, signingKey, _signedInfo);
			}
			/**
   * Verify the given signature of the given string using key
   */

		}, {
			key: 'Verify',
			value: function Verify(signedInfo, key, signatureValue, algorithm) {
				var _signedInfo = Convert.FromString(signedInfo, "utf8");
				return Application.crypto.subtle.verify(algorithm || this.algorithm, key, signatureValue, _signedInfo);
			}
		}]);

		return SignatureAlgorithm;
	}(XmlAlgorithm);

	var SHA1 = "SHA-1";
	var SHA256 = "SHA-256";
	var SHA384 = "SHA-384";
	var SHA512 = "SHA-512";
	var SHA1_NAMESPACE = "http://www.w3.org/2000/09/xmldsig#sha1";
	var SHA256_NAMESPACE = "http://www.w3.org/2001/04/xmlenc#sha256";
	var SHA384_NAMESPACE = "http://www.w3.org/2001/04/xmldsig-more#sha384";
	var SHA512_NAMESPACE = "http://www.w3.org/2001/04/xmlenc#sha512";

	var Sha1 = function (_HashAlgorithm) {
		_inherits(Sha1, _HashAlgorithm);

		function Sha1() {
			_classCallCheck(this, Sha1);

			var _this66 = _possibleConstructorReturn(this, (Sha1.__proto__ || Object.getPrototypeOf(Sha1)).apply(this, arguments));

			_this66.algorithm = { name: SHA1 };
			_this66.namespaceURI = SHA1_NAMESPACE;
			return _this66;
		}

		return Sha1;
	}(HashAlgorithm);

	var Sha256 = function (_HashAlgorithm2) {
		_inherits(Sha256, _HashAlgorithm2);

		function Sha256() {
			_classCallCheck(this, Sha256);

			var _this67 = _possibleConstructorReturn(this, (Sha256.__proto__ || Object.getPrototypeOf(Sha256)).apply(this, arguments));

			_this67.algorithm = { name: SHA256 };
			_this67.namespaceURI = SHA256_NAMESPACE;
			return _this67;
		}

		return Sha256;
	}(HashAlgorithm);

	var Sha384 = function (_HashAlgorithm3) {
		_inherits(Sha384, _HashAlgorithm3);

		function Sha384() {
			_classCallCheck(this, Sha384);

			var _this68 = _possibleConstructorReturn(this, (Sha384.__proto__ || Object.getPrototypeOf(Sha384)).apply(this, arguments));

			_this68.algorithm = { name: SHA384 };
			_this68.namespaceURI = SHA384_NAMESPACE;
			return _this68;
		}

		return Sha384;
	}(HashAlgorithm);

	var Sha512 = function (_HashAlgorithm4) {
		_inherits(Sha512, _HashAlgorithm4);

		function Sha512() {
			_classCallCheck(this, Sha512);

			var _this69 = _possibleConstructorReturn(this, (Sha512.__proto__ || Object.getPrototypeOf(Sha512)).apply(this, arguments));

			_this69.algorithm = { name: SHA512 };
			_this69.namespaceURI = SHA512_NAMESPACE;
			return _this69;
		}

		return Sha512;
	}(HashAlgorithm);

	var ECDSA = "ECDSA";
	var ECDSA_SHA1_NAMESPACE = "http://www.w3.org/2001/04/xmldsig-more#ecdsa-sha1";
	var ECDSA_SHA256_NAMESPACE = "http://www.w3.org/2001/04/xmldsig-more#ecdsa-sha256";
	var ECDSA_SHA384_NAMESPACE = "http://www.w3.org/2001/04/xmldsig-more#ecdsa-sha384";
	var ECDSA_SHA512_NAMESPACE = "http://www.w3.org/2001/04/xmldsig-more#ecdsa-sha512";

	var EcdsaSha1 = function (_SignatureAlgorithm) {
		_inherits(EcdsaSha1, _SignatureAlgorithm);

		function EcdsaSha1() {
			_classCallCheck(this, EcdsaSha1);

			var _this70 = _possibleConstructorReturn(this, (EcdsaSha1.__proto__ || Object.getPrototypeOf(EcdsaSha1)).apply(this, arguments));

			_this70.algorithm = {
				name: ECDSA,
				hash: {
					name: SHA1
				}
			};
			_this70.namespaceURI = ECDSA_SHA1_NAMESPACE;
			return _this70;
		}

		return EcdsaSha1;
	}(SignatureAlgorithm);

	var EcdsaSha256 = function (_SignatureAlgorithm2) {
		_inherits(EcdsaSha256, _SignatureAlgorithm2);

		function EcdsaSha256() {
			_classCallCheck(this, EcdsaSha256);

			var _this71 = _possibleConstructorReturn(this, (EcdsaSha256.__proto__ || Object.getPrototypeOf(EcdsaSha256)).apply(this, arguments));

			_this71.algorithm = {
				name: ECDSA,
				hash: {
					name: SHA256
				}
			};
			_this71.namespaceURI = ECDSA_SHA256_NAMESPACE;
			return _this71;
		}

		return EcdsaSha256;
	}(SignatureAlgorithm);

	var EcdsaSha384 = function (_SignatureAlgorithm3) {
		_inherits(EcdsaSha384, _SignatureAlgorithm3);

		function EcdsaSha384() {
			_classCallCheck(this, EcdsaSha384);

			var _this72 = _possibleConstructorReturn(this, (EcdsaSha384.__proto__ || Object.getPrototypeOf(EcdsaSha384)).apply(this, arguments));

			_this72.algorithm = {
				name: ECDSA,
				hash: {
					name: SHA384
				}
			};
			_this72.namespaceURI = ECDSA_SHA384_NAMESPACE;
			return _this72;
		}

		return EcdsaSha384;
	}(SignatureAlgorithm);

	var EcdsaSha512 = function (_SignatureAlgorithm4) {
		_inherits(EcdsaSha512, _SignatureAlgorithm4);

		function EcdsaSha512() {
			_classCallCheck(this, EcdsaSha512);

			var _this73 = _possibleConstructorReturn(this, (EcdsaSha512.__proto__ || Object.getPrototypeOf(EcdsaSha512)).apply(this, arguments));

			_this73.algorithm = {
				name: ECDSA,
				hash: {
					name: SHA512
				}
			};
			_this73.namespaceURI = ECDSA_SHA512_NAMESPACE;
			return _this73;
		}

		return EcdsaSha512;
	}(SignatureAlgorithm);

	var HMAC = "HMAC";
	var HMAC_SHA1_NAMESPACE = "http://www.w3.org/2000/09/xmldsig#hmac-sha1";
	var HMAC_SHA256_NAMESPACE = "http://www.w3.org/2001/04/xmldsig-more#hmac-sha256";
	var HMAC_SHA384_NAMESPACE = "http://www.w3.org/2001/04/xmldsig-more#hmac-sha384";
	var HMAC_SHA512_NAMESPACE = "http://www.w3.org/2001/04/xmldsig-more#hmac-sha512";

	var HmacSha1 = function (_SignatureAlgorithm5) {
		_inherits(HmacSha1, _SignatureAlgorithm5);

		function HmacSha1() {
			_classCallCheck(this, HmacSha1);

			var _this74 = _possibleConstructorReturn(this, (HmacSha1.__proto__ || Object.getPrototypeOf(HmacSha1)).apply(this, arguments));

			_this74.algorithm = {
				name: HMAC,
				hash: {
					name: SHA1
				}
			};
			_this74.namespaceURI = HMAC_SHA1_NAMESPACE;
			return _this74;
		}

		return HmacSha1;
	}(SignatureAlgorithm);

	var HmacSha256 = function (_SignatureAlgorithm6) {
		_inherits(HmacSha256, _SignatureAlgorithm6);

		function HmacSha256() {
			_classCallCheck(this, HmacSha256);

			var _this75 = _possibleConstructorReturn(this, (HmacSha256.__proto__ || Object.getPrototypeOf(HmacSha256)).apply(this, arguments));

			_this75.algorithm = {
				name: HMAC,
				hash: {
					name: SHA256
				}
			};
			_this75.namespaceURI = HMAC_SHA256_NAMESPACE;
			return _this75;
		}

		return HmacSha256;
	}(SignatureAlgorithm);

	var HmacSha384 = function (_SignatureAlgorithm7) {
		_inherits(HmacSha384, _SignatureAlgorithm7);

		function HmacSha384() {
			_classCallCheck(this, HmacSha384);

			var _this76 = _possibleConstructorReturn(this, (HmacSha384.__proto__ || Object.getPrototypeOf(HmacSha384)).apply(this, arguments));

			_this76.algorithm = {
				name: HMAC,
				hash: {
					name: SHA384
				}
			};
			_this76.namespaceURI = HMAC_SHA384_NAMESPACE;
			return _this76;
		}

		return HmacSha384;
	}(SignatureAlgorithm);

	var HmacSha512 = function (_SignatureAlgorithm8) {
		_inherits(HmacSha512, _SignatureAlgorithm8);

		function HmacSha512() {
			_classCallCheck(this, HmacSha512);

			var _this77 = _possibleConstructorReturn(this, (HmacSha512.__proto__ || Object.getPrototypeOf(HmacSha512)).apply(this, arguments));

			_this77.algorithm = {
				name: HMAC,
				hash: {
					name: SHA512
				}
			};
			_this77.namespaceURI = HMAC_SHA512_NAMESPACE;
			return _this77;
		}

		return HmacSha512;
	}(SignatureAlgorithm);

	var RSA_PKCS1 = "RSASSA-PKCS1-v1_5";
	var RSA_PKCS1_SHA1_NAMESPACE = "http://www.w3.org/2000/09/xmldsig#rsa-sha1";
	var RSA_PKCS1_SHA256_NAMESPACE = "http://www.w3.org/2001/04/xmldsig-more#rsa-sha256";
	var RSA_PKCS1_SHA384_NAMESPACE = "http://www.w3.org/2001/04/xmldsig-more#rsa-sha384";
	var RSA_PKCS1_SHA512_NAMESPACE = "http://www.w3.org/2001/04/xmldsig-more#rsa-sha512";

	var RsaPkcs1Sha1 = function (_SignatureAlgorithm9) {
		_inherits(RsaPkcs1Sha1, _SignatureAlgorithm9);

		function RsaPkcs1Sha1() {
			_classCallCheck(this, RsaPkcs1Sha1);

			var _this78 = _possibleConstructorReturn(this, (RsaPkcs1Sha1.__proto__ || Object.getPrototypeOf(RsaPkcs1Sha1)).apply(this, arguments));

			_this78.algorithm = {
				name: RSA_PKCS1,
				hash: {
					name: SHA1
				}
			};
			_this78.namespaceURI = RSA_PKCS1_SHA1_NAMESPACE;
			return _this78;
		}

		return RsaPkcs1Sha1;
	}(SignatureAlgorithm);

	var RsaPkcs1Sha256 = function (_SignatureAlgorithm10) {
		_inherits(RsaPkcs1Sha256, _SignatureAlgorithm10);

		function RsaPkcs1Sha256() {
			_classCallCheck(this, RsaPkcs1Sha256);

			var _this79 = _possibleConstructorReturn(this, (RsaPkcs1Sha256.__proto__ || Object.getPrototypeOf(RsaPkcs1Sha256)).apply(this, arguments));

			_this79.algorithm = {
				name: RSA_PKCS1,
				hash: {
					name: SHA256
				}
			};
			_this79.namespaceURI = RSA_PKCS1_SHA256_NAMESPACE;
			return _this79;
		}

		return RsaPkcs1Sha256;
	}(SignatureAlgorithm);

	var RsaPkcs1Sha384 = function (_SignatureAlgorithm11) {
		_inherits(RsaPkcs1Sha384, _SignatureAlgorithm11);

		function RsaPkcs1Sha384() {
			_classCallCheck(this, RsaPkcs1Sha384);

			var _this80 = _possibleConstructorReturn(this, (RsaPkcs1Sha384.__proto__ || Object.getPrototypeOf(RsaPkcs1Sha384)).apply(this, arguments));

			_this80.algorithm = {
				name: RSA_PKCS1,
				hash: {
					name: SHA384
				}
			};
			_this80.namespaceURI = RSA_PKCS1_SHA384_NAMESPACE;
			return _this80;
		}

		return RsaPkcs1Sha384;
	}(SignatureAlgorithm);

	var RsaPkcs1Sha512 = function (_SignatureAlgorithm12) {
		_inherits(RsaPkcs1Sha512, _SignatureAlgorithm12);

		function RsaPkcs1Sha512() {
			_classCallCheck(this, RsaPkcs1Sha512);

			var _this81 = _possibleConstructorReturn(this, (RsaPkcs1Sha512.__proto__ || Object.getPrototypeOf(RsaPkcs1Sha512)).apply(this, arguments));

			_this81.algorithm = {
				name: RSA_PKCS1,
				hash: {
					name: SHA512
				}
			};
			_this81.namespaceURI = RSA_PKCS1_SHA512_NAMESPACE;
			return _this81;
		}

		return RsaPkcs1Sha512;
	}(SignatureAlgorithm);

	var RSA_PSS = "RSA-PSS";
	var RSA_PSS_WITH_PARAMS_NAMESPACE = "http://www.w3.org/2007/05/xmldsig-more#rsa-pss";

	var RsaPssBase = function (_SignatureAlgorithm13) {
		_inherits(RsaPssBase, _SignatureAlgorithm13);

		function RsaPssBase(saltLength) {
			_classCallCheck(this, RsaPssBase);

			var _this82 = _possibleConstructorReturn(this, (RsaPssBase.__proto__ || Object.getPrototypeOf(RsaPssBase)).call(this));

			_this82.algorithm = {
				name: RSA_PSS,
				hash: {
					name: SHA1
				}
			};
			_this82.namespaceURI = RSA_PSS_WITH_PARAMS_NAMESPACE;
			if (saltLength) _this82.algorithm.saltLength = saltLength;
			return _this82;
		}

		return RsaPssBase;
	}(SignatureAlgorithm);

	var RsaPssSha1 = function (_RsaPssBase) {
		_inherits(RsaPssSha1, _RsaPssBase);

		function RsaPssSha1(saltLength) {
			_classCallCheck(this, RsaPssSha1);

			var _this83 = _possibleConstructorReturn(this, (RsaPssSha1.__proto__ || Object.getPrototypeOf(RsaPssSha1)).call(this, saltLength));

			_this83.algorithm.hash.name = SHA1;
			return _this83;
		}

		return RsaPssSha1;
	}(RsaPssBase);

	var RsaPssSha256 = function (_RsaPssBase2) {
		_inherits(RsaPssSha256, _RsaPssBase2);

		function RsaPssSha256(saltLength) {
			_classCallCheck(this, RsaPssSha256);

			var _this84 = _possibleConstructorReturn(this, (RsaPssSha256.__proto__ || Object.getPrototypeOf(RsaPssSha256)).call(this, saltLength));

			_this84.algorithm.hash.name = SHA256;
			return _this84;
		}

		return RsaPssSha256;
	}(RsaPssBase);

	var RsaPssSha384 = function (_RsaPssBase3) {
		_inherits(RsaPssSha384, _RsaPssBase3);

		function RsaPssSha384(saltLength) {
			_classCallCheck(this, RsaPssSha384);

			var _this85 = _possibleConstructorReturn(this, (RsaPssSha384.__proto__ || Object.getPrototypeOf(RsaPssSha384)).call(this, saltLength));

			_this85.algorithm.hash.name = SHA384;
			return _this85;
		}

		return RsaPssSha384;
	}(RsaPssBase);

	var RsaPssSha512 = function (_RsaPssBase4) {
		_inherits(RsaPssSha512, _RsaPssBase4);

		function RsaPssSha512(saltLength) {
			_classCallCheck(this, RsaPssSha512);

			var _this86 = _possibleConstructorReturn(this, (RsaPssSha512.__proto__ || Object.getPrototypeOf(RsaPssSha512)).call(this, saltLength));

			_this86.algorithm.hash.name = SHA512;
			return _this86;
		}

		return RsaPssSha512;
	}(RsaPssBase);

	/**
  * Represents the <RSAKeyValue> element of an XML signature.
  */


	var RsaKeyValue = function (_KeyInfoClause) {
		_inherits(RsaKeyValue, _KeyInfoClause);

		/**
   * Represents the <RSAKeyValue> element of an XML signature.
   */
		function RsaKeyValue() {
			_classCallCheck(this, RsaKeyValue);

			var _this87 = _possibleConstructorReturn(this, (RsaKeyValue.__proto__ || Object.getPrototypeOf(RsaKeyValue)).apply(this, arguments));

			_this87.m_key = null;
			_this87.m_jwk = null;
			_this87.m_keyusage = [];
			return _this87;
		}
		/**
   * Imports key to the RSAKeyValue object
   * @param  {CryptoKey} key
   * @returns Promise
   */


		_createClass(RsaKeyValue, [{
			key: 'importKey',
			value: function importKey(key) {
				var _this88 = this;

				return new Promise(function (resolve, reject) {
					var algName = key.algorithm.name.toUpperCase();
					if (algName !== RSA_PKCS1.toUpperCase() && algName !== RSA_PSS.toUpperCase()) throw new XmlError(XE.ALGORITHM_WRONG_NAME, key.algorithm.name);
					_this88.m_key = key;
					Application.crypto.subtle.exportKey("jwk", key).then(function (jwk) {
						_this88.m_jwk = jwk;
						_this88.Modulus = Convert.FromBase64Url(jwk.n);
						_this88.Exponent = Convert.FromBase64Url(jwk.e);
						_this88.m_keyusage = key.usages;
						return Promise.resolve(_this88);
					}).then(resolve, reject);
				});
			}
			/**
    * Exports key from the RSAKeyValue object
    * @param  {Algorithm} alg
    * @returns Promise
    */

		}, {
			key: 'exportKey',
			value: function exportKey(alg) {
				var _this89 = this;

				return new Promise(function (resolve, reject) {
					if (_this89.m_key) return resolve(_this89.m_key);
					// fill jwk
					if (!_this89.Modulus) throw new XmlError(XE.CRYPTOGRAPHIC, "RsaKeyValue has no Modulus");
					var modulus = Convert.ToBase64Url(_this89.Modulus);
					if (!_this89.Exponent) throw new XmlError(XE.CRYPTOGRAPHIC, "RsaKeyValue has no Exponent");
					var exponent = Convert.ToBase64Url(_this89.Exponent);
					var algJwk = void 0;
					switch (alg.name.toUpperCase()) {
						case RSA_PKCS1.toUpperCase():
							algJwk = "R";
							break;
						case RSA_PSS.toUpperCase():
							algJwk = "P";
							break;
						default:
							throw new XmlError(XE.ALGORITHM_NOT_SUPPORTED, alg.name);
					}
					// Convert hash to JWK name
					switch (alg.hash.name.toUpperCase()) {
						case SHA1:
							algJwk += "S1";
							break;
						case SHA256:
							algJwk += "S256";
							break;
						case SHA384:
							algJwk += "S384";
							break;
						case SHA512:
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
					Application.crypto.subtle.importKey("jwk", jwk, alg, true, _this89.m_keyusage).then(resolve, reject);
				});
			}
			/**
    * Loads an RSA key clause from an XML element.
    * @param  {Element | string} element
    * @returns void
    */

		}, {
			key: 'LoadXml',
			value: function LoadXml(node) {
				_get(RsaKeyValue.prototype.__proto__ || Object.getPrototypeOf(RsaKeyValue.prototype), 'LoadXml', this).call(this, node);
				this.m_keyusage = ["verify"];
			}
		}]);

		return RsaKeyValue;
	}(KeyInfoClause);
	__decorate([XmlChildElement({
		localName: XmlSignature.ElementNames.Modulus,
		prefix: XmlSignature.DefaultPrefix,
		namespaceURI: XmlSignature.NamespaceURI,
		required: true,
		converter: XmlBase64Converter
	})], RsaKeyValue.prototype, "Modulus", void 0);
	__decorate([XmlChildElement({
		localName: XmlSignature.ElementNames.Exponent,
		prefix: XmlSignature.DefaultPrefix,
		namespaceURI: XmlSignature.NamespaceURI,
		required: true,
		converter: XmlBase64Converter
	})], RsaKeyValue.prototype, "Exponent", void 0);
	RsaKeyValue = __decorate([XmlElement({
		localName: XmlSignature.ElementNames.RSAKeyValue
	})], RsaKeyValue);
	/**
  *
  *  Schema Definition (target namespace
  *  http://www.w3.org/2007/05/xmldsig-more#):
  *
  *  <xs:element name="RSAPSSParams" type="pss:RSAPSSParamsType">
  *      <xs:annotation>
  *          <xs:documentation>
  *  Top level element that can be used in xs:any namespace="#other"
  *  wildcard of ds:SignatureMethod content.
  *          </xs:documentation>
  *      </xs:annotation>
  *  </xs:element>
  *  <xs:complexType name="RSAPSSParamsType">
  *      <xs:sequence>
  *          <xs:element ref="ds:DigestMethod" minOccurs="0"/>
  *          <xs:element name="MaskGenerationFunction"
  *             type="pss:MaskGenerationFunctionType" minOccurs="0"/>
  *          <xs:element name="SaltLength" type="xs:int"
  *             minOccurs="0"/>
  *          <xs:element name="TrailerField" type="xs:int"
  *             minOccurs="0"/>
  *      </xs:sequence>
  *  </xs:complexType>
  *  <xs:complexType name="MaskGenerationFunctionType">
  *      <xs:sequence>
  *          <xs:element ref="ds:DigestMethod" minOccurs="0"/>
  *      </xs:sequence>
  *      <xs:attribute name="Algorithm" type="xs:anyURI"
  *         default="http://www.w3.org/2007/05/xmldsig-more#MGF1"/>
  *  </xs:complexType>
  *
  */
	var NAMESPACE_URI = "http://www.w3.org/2007/05/xmldsig-more#";
	var PREFIX = "pss";
	var MaskGenerationFunction = function (_XmlObject3) {
		_inherits(MaskGenerationFunction, _XmlObject3);

		function MaskGenerationFunction() {
			_classCallCheck(this, MaskGenerationFunction);

			return _possibleConstructorReturn(this, (MaskGenerationFunction.__proto__ || Object.getPrototypeOf(MaskGenerationFunction)).apply(this, arguments));
		}

		return MaskGenerationFunction;
	}(XmlObject);
	__decorate([XmlChildElement({
		parser: DigestMethod
	})], MaskGenerationFunction.prototype, "DigestMethod", void 0);
	__decorate([XmlAttribute({
		localName: XmlSignature.AttributeNames.Algorithm,
		defaultValue: "http://www.w3.org/2007/05/xmldsig-more#MGF1"
	})], MaskGenerationFunction.prototype, "Algorithm", void 0);
	MaskGenerationFunction = __decorate([XmlElement({
		localName: XmlSignature.ElementNames.MaskGenerationFunction,
		prefix: PREFIX,
		namespaceURI: NAMESPACE_URI
	})], MaskGenerationFunction);
	var PssAlgorithmParams = PssAlgorithmParams_1 = function (_XmlObject4) {
		_inherits(PssAlgorithmParams, _XmlObject4);

		function PssAlgorithmParams(algorithm) {
			_classCallCheck(this, PssAlgorithmParams);

			var _this91 = _possibleConstructorReturn(this, (PssAlgorithmParams.__proto__ || Object.getPrototypeOf(PssAlgorithmParams)).call(this));

			if (algorithm) {
				_this91.FromAlgorithm(algorithm);
			}
			return _this91;
		}

		_createClass(PssAlgorithmParams, [{
			key: 'FromAlgorithm',
			value: function FromAlgorithm(algorithm) {
				this.DigestMethod = new DigestMethod();
				var digest = CryptoConfig.GetHashAlgorithm(algorithm.hash);
				this.DigestMethod.Algorithm = digest.namespaceURI;
				if (algorithm.saltLength) this.SaltLength = algorithm.saltLength;
			}
		}], [{
			key: 'FromAlgorithm',
			value: function FromAlgorithm(algorithm) {
				return new PssAlgorithmParams_1(algorithm);
			}
		}]);

		return PssAlgorithmParams;
	}(XmlObject);
	__decorate([XmlChildElement({
		parser: DigestMethod
	})], PssAlgorithmParams.prototype, "DigestMethod", void 0);
	__decorate([XmlChildElement({
		parser: MaskGenerationFunction
	})], PssAlgorithmParams.prototype, "MGF", void 0);
	__decorate([XmlChildElement({
		converter: XmlNumberConverter,
		prefix: PREFIX,
		namespaceURI: NAMESPACE_URI
	})], PssAlgorithmParams.prototype, "SaltLength", void 0);
	__decorate([XmlChildElement({
		converter: XmlNumberConverter
	})], PssAlgorithmParams.prototype, "TrailerField", void 0);
	PssAlgorithmParams = PssAlgorithmParams_1 = __decorate([XmlElement({
		localName: XmlSignature.ElementNames.RSAPSSParams,
		prefix: PREFIX,
		namespaceURI: NAMESPACE_URI
	})], PssAlgorithmParams);
	var PssAlgorithmParams_1;

	/**
  *
  * <element name="CanonicalizationMethod" type="ds:CanonicalizationMethodType"/>
  * <complexType name="CanonicalizationMethodType" mixed="true">
  *   <sequence>
  *     <any namespace="##any" minOccurs="0" maxOccurs="unbounded"/>
  *     <!--  (0,unbounded) elements from (1,1) namespace  -->
  *   </sequence>
  *   <attribute name="Algorithm" type="anyURI" use="required"/>
  * </complexType>
  *
  */
	/**
  *
  *
  * @export
  * @class CanonicalizationMethod
  * @extends {XmlSignatureObject}
  */
	var CanonicalizationMethod = function (_XmlSignatureObject3) {
		_inherits(CanonicalizationMethod, _XmlSignatureObject3);

		function CanonicalizationMethod() {
			_classCallCheck(this, CanonicalizationMethod);

			return _possibleConstructorReturn(this, (CanonicalizationMethod.__proto__ || Object.getPrototypeOf(CanonicalizationMethod)).apply(this, arguments));
		}

		return CanonicalizationMethod;
	}(XmlSignatureObject);
	__decorate([XmlAttribute({
		localName: XmlSignature.AttributeNames.Algorithm,
		required: true,
		defaultValue: XmlSignature.DefaultCanonMethod
	})], CanonicalizationMethod.prototype, "Algorithm", void 0);
	CanonicalizationMethod = __decorate([XmlElement({
		localName: XmlSignature.ElementNames.CanonicalizationMethod
	})], CanonicalizationMethod);

	// XmlElement part of the signature
	// Note: Looks like KeyInfoNode (but the later is XmlElement inside KeyInfo)
	// required for "enveloping signatures"
	/**
  *
  * <element name='Object' >
  *   <complexType content='mixed'>
  *     <element ref='ds:Manifest' minOccurs='1' maxOccurs='unbounded'/>
  *     <any namespace='##any' minOccurs='1' maxOccurs='unbounded'/>
  *     <attribute name='Id' type='ID' use='optional'/>
  *     <attribute name='MimeType' type='string' use='optional'/> <!-- add a grep facet -->
  *     <attribute name='Encoding' type='uriReference' use='optional'/>
  *   </complexType>
  * </element>
  *
  */
	/**
  * Represents the object element of an XML signature that holds data to be signed.
  */
	var DataObject = function (_XmlSignatureObject4) {
		_inherits(DataObject, _XmlSignatureObject4);

		function DataObject() {
			_classCallCheck(this, DataObject);

			return _possibleConstructorReturn(this, (DataObject.__proto__ || Object.getPrototypeOf(DataObject)).apply(this, arguments));
		}

		return DataObject;
	}(XmlSignatureObject);
	__decorate([XmlAttribute({
		localName: XmlSignature.AttributeNames.Id,
		defaultValue: ""
	})], DataObject.prototype, "Id", void 0);
	__decorate([XmlAttribute({
		localName: XmlSignature.AttributeNames.MimeType,
		defaultValue: ""
	})], DataObject.prototype, "MimeType", void 0);
	__decorate([XmlAttribute({
		localName: XmlSignature.AttributeNames.Encoding,
		defaultValue: ""
	})], DataObject.prototype, "Encoding", void 0);
	DataObject = __decorate([XmlElement({
		localName: XmlSignature.ElementNames.Object
	})], DataObject);
	var DataObjects = function (_XmlSignatureCollecti) {
		_inherits(DataObjects, _XmlSignatureCollecti);

		function DataObjects() {
			_classCallCheck(this, DataObjects);

			return _possibleConstructorReturn(this, (DataObjects.__proto__ || Object.getPrototypeOf(DataObjects)).apply(this, arguments));
		}

		return DataObjects;
	}(XmlSignatureCollection);
	DataObjects = __decorate([XmlElement({
		localName: "xmldsig_objects",
		parser: DataObject
	})], DataObjects);

	/**
  *
  * <element name="KeyInfo" type="ds:KeyInfoType"/>
  * <complexType name="KeyInfoType" mixed="true">
  *   <choice maxOccurs="unbounded">
  *     <element ref="ds:KeyName"/>
  *     <element ref="ds:KeyValue"/>
  *     <element ref="ds:RetrievalMethod"/>
  *     <element ref="ds:X509Data"/>
  *     <element ref="ds:PGPData"/>
  *     <element ref="ds:SPKIData"/>
  *     <element ref="ds:MgmtData"/>
  *     <any processContents="lax" namespace="##other"/>
  *     <!--  (1,1) elements from (0,unbounded) namespaces  -->
  *   </choice>
  *   <attribute name="Id" type="ID" use="optional"/>
  * </complexType>
  *
  */
	/**
  * Represents an XML digital signature or XML encryption <KeyInfo> element.
  */
	var KeyInfo = function (_XmlSignatureCollecti2) {
		_inherits(KeyInfo, _XmlSignatureCollecti2);

		function KeyInfo() {
			_classCallCheck(this, KeyInfo);

			return _possibleConstructorReturn(this, (KeyInfo.__proto__ || Object.getPrototypeOf(KeyInfo)).apply(this, arguments));
		}

		_createClass(KeyInfo, [{
			key: 'OnLoadXml',
			value: function OnLoadXml(element) {
				var _this96 = this;

				var _loop = function _loop(i) {
					var node = element.childNodes.item(i);
					if (node.nodeType !== XmlNodeType.Element) return 'continue';
					var KeyInfoClass = null;
					switch (node.localName) {
						case XmlSignature.ElementNames.KeyValue:
							KeyInfoClass = KeyValue;
							break;
						case XmlSignature.ElementNames.X509Data:
							KeyInfoClass = KeyInfoX509Data;
							break;
						case XmlSignature.ElementNames.SPKIData:
							KeyInfoClass = SPKIData;
							break;
						case XmlSignature.ElementNames.KeyName:
						case XmlSignature.ElementNames.RetrievalMethod:
						case XmlSignature.ElementNames.PGPData:
						case XmlSignature.ElementNames.MgmtData:
					}
					if (KeyInfoClass) {
						var item = new KeyInfoClass();
						item.LoadXml(node);
						if (item instanceof KeyValue) {
							// Read KeyValue
							var keyValue = null;
							[RsaKeyValue, EcdsaKeyValue].some(function (KeyClass) {
								try {
									var k = new KeyClass();
									for (var _i10 = 0; _i10 < node.childNodes.length; _i10++) {
										var nodeKey = node.childNodes.item(_i10);
										if (nodeKey.nodeType !== XmlNodeType.Element) continue;
										k.LoadXml(nodeKey);
										keyValue = k;
										return true;
									}
								} catch (e) {}
								return false;
							});
							if (keyValue) {
								item.Value = keyValue;
							} else {
								throw new XmlError(XE.CRYPTOGRAPHIC, "Unsupported KeyValue in use");
							}
						}
						_this96.Add(item);
					}
				};

				for (var i = 0; i < element.childNodes.length; i++) {
					var _ret = _loop(i);

					if (_ret === 'continue') continue;
				}
			}
		}]);

		return KeyInfo;
	}(XmlSignatureCollection);
	__decorate([XmlAttribute({
		localName: XmlSignature.AttributeNames.Id,
		defaultValue: ""
	})], KeyInfo.prototype, "Id", void 0);
	KeyInfo = __decorate([XmlElement({
		localName: XmlSignature.ElementNames.KeyInfo
	})], KeyInfo);

	/**
  * The Transform element contains a single transformation
  */
	var Transform = function (_XmlSignatureObject5) {
		_inherits(Transform, _XmlSignatureObject5);

		/**
   * The Transform element contains a single transformation
   */
		function Transform() {
			_classCallCheck(this, Transform);

			var _this97 = _possibleConstructorReturn(this, (Transform.__proto__ || Object.getPrototypeOf(Transform)).apply(this, arguments));

			_this97.innerXml = null;
			return _this97;
		}
		// Public methods
		/**
   * When overridden in a derived class, returns the output of the current Transform object.
   */


		_createClass(Transform, [{
			key: 'GetOutput',
			value: function GetOutput() {
				throw new XmlError(XE.METHOD_NOT_IMPLEMENTED);
			}
		}, {
			key: 'LoadInnerXml',
			value: function LoadInnerXml(node) {
				if (!node) throw new XmlError(XE.PARAM_REQUIRED, "node");
				this.innerXml = node;
			}
		}, {
			key: 'GetInnerXml',
			value: function GetInnerXml() {
				return this.innerXml;
			}
		}]);

		return Transform;
	}(XmlSignatureObject);
	__decorate([XmlAttribute({
		localName: XmlSignature.AttributeNames.Algorithm,
		defaultValue: ""
	})], Transform.prototype, "Algorithm", void 0);
	__decorate([XmlChildElement({
		localName: XmlSignature.ElementNames.XPath,
		defaultValue: ""
	})], Transform.prototype, "XPath", void 0);
	Transform = __decorate([XmlElement({
		localName: XmlSignature.ElementNames.Transform
	})], Transform);

	var XmlDsigBase64Transform = function (_Transform) {
		_inherits(XmlDsigBase64Transform, _Transform);

		function XmlDsigBase64Transform() {
			_classCallCheck(this, XmlDsigBase64Transform);

			var _this98 = _possibleConstructorReturn(this, (XmlDsigBase64Transform.__proto__ || Object.getPrototypeOf(XmlDsigBase64Transform)).apply(this, arguments));

			_this98.Algorithm = XmlSignature.AlgorithmNamespaces.XmlDsigBase64Transform;
			return _this98;
		}
		/**
   * Returns the output of the current XmlDsigBase64Transform object
   */


		_createClass(XmlDsigBase64Transform, [{
			key: 'GetOutput',
			value: function GetOutput() {
				if (!this.innerXml) throw new XmlError(XE.PARAM_REQUIRED, "innerXml");
				return Convert.FromString(this.innerXml.textContent || "", "base64");
			}
		}]);

		return XmlDsigBase64Transform;
	}(Transform);

	/**
  * Represents the C14N XML canonicalization transform for a digital signature
  * as defined by the World Wide Web Consortium (W3C), without comments.
  */


	var XmlDsigC14NTransform = function (_Transform2) {
		_inherits(XmlDsigC14NTransform, _Transform2);

		function XmlDsigC14NTransform() {
			_classCallCheck(this, XmlDsigC14NTransform);

			var _this99 = _possibleConstructorReturn(this, (XmlDsigC14NTransform.__proto__ || Object.getPrototypeOf(XmlDsigC14NTransform)).apply(this, arguments));

			_this99.xmlCanonicalizer = new XmlCanonicalizer(false, false);
			_this99.Algorithm = "http://www.w3.org/TR/2001/REC-xml-c14n-20010315";
			return _this99;
		}
		/**
   * Returns the output of the current XmlDsigC14NTransform object.
   * @returns string
   */


		_createClass(XmlDsigC14NTransform, [{
			key: 'GetOutput',
			value: function GetOutput() {
				if (!this.innerXml) throw new XmlError(XE.PARAM_REQUIRED, "innerXml");
				return this.xmlCanonicalizer.Canonicalize(this.innerXml);
			}
		}]);

		return XmlDsigC14NTransform;
	}(Transform);

	/**
  * Represents the C14N XML canonicalization transform for a digital signature
  * as defined by the World Wide Web Consortium (W3C), with comments.
  */


	var XmlDsigC14NWithCommentsTransform = function (_XmlDsigC14NTransform) {
		_inherits(XmlDsigC14NWithCommentsTransform, _XmlDsigC14NTransform);

		function XmlDsigC14NWithCommentsTransform() {
			_classCallCheck(this, XmlDsigC14NWithCommentsTransform);

			var _this100 = _possibleConstructorReturn(this, (XmlDsigC14NWithCommentsTransform.__proto__ || Object.getPrototypeOf(XmlDsigC14NWithCommentsTransform)).apply(this, arguments));

			_this100.Algorithm = "http://www.w3.org/TR/2001/REC-xml-c14n-20010315#WithComments";
			_this100.xmlCanonicalizer = new XmlCanonicalizer(true, false);
			return _this100;
		}

		return XmlDsigC14NWithCommentsTransform;
	}(XmlDsigC14NTransform);

	/**
  * Represents the enveloped signature transform for an XML digital signature as defined by the W3C.
  */


	var XmlDsigEnvelopedSignatureTransform = function (_Transform3) {
		_inherits(XmlDsigEnvelopedSignatureTransform, _Transform3);

		function XmlDsigEnvelopedSignatureTransform() {
			_classCallCheck(this, XmlDsigEnvelopedSignatureTransform);

			var _this101 = _possibleConstructorReturn(this, (XmlDsigEnvelopedSignatureTransform.__proto__ || Object.getPrototypeOf(XmlDsigEnvelopedSignatureTransform)).apply(this, arguments));

			_this101.Algorithm = "http://www.w3.org/2000/09/xmldsig#enveloped-signature";
			return _this101;
		}
		/**
   * Returns the output of the current XmlDsigEnvelopedSignatureTransform object.
   * @returns string
   */


		_createClass(XmlDsigEnvelopedSignatureTransform, [{
			key: 'GetOutput',
			value: function GetOutput() {
				if (!this.innerXml) throw new XmlError(XE.PARAM_REQUIRED, "innerXml");
				var signature = Select(this.innerXml, ".//*[local-name(.)='Signature' and namespace-uri(.)='http://www.w3.org/2000/09/xmldsig#']")[0];
				if (signature) signature.parentNode.removeChild(signature);
				return this.innerXml;
			}
		}]);

		return XmlDsigEnvelopedSignatureTransform;
	}(Transform);

	/**
  * Represents the exclusive C14N XML canonicalization transform for a digital signature
  * as defined by the World Wide Web Consortium (W3C), without comments.
  */


	var XmlDsigExcC14NTransform = function (_Transform4) {
		_inherits(XmlDsigExcC14NTransform, _Transform4);

		function XmlDsigExcC14NTransform() {
			_classCallCheck(this, XmlDsigExcC14NTransform);

			var _this102 = _possibleConstructorReturn(this, (XmlDsigExcC14NTransform.__proto__ || Object.getPrototypeOf(XmlDsigExcC14NTransform)).apply(this, arguments));

			_this102.xmlCanonicalizer = new XmlCanonicalizer(false, true);
			_this102.Algorithm = "http://www.w3.org/2001/10/xml-exc-c14n#";
			return _this102;
		}
		/**
   * Gets or sets a string that contains namespace prefixes to canonicalize
   * using the standard canonicalization algorithm.
   */


		_createClass(XmlDsigExcC14NTransform, [{
			key: 'GetOutput',

			/**
    * Returns the output of the current XmlDsigExcC14NTransform object
    */
			value: function GetOutput() {
				if (!this.innerXml) throw new XmlError(XE.PARAM_REQUIRED, "innerXml");
				return this.xmlCanonicalizer.Canonicalize(this.innerXml);
			}
		}, {
			key: 'InclusiveNamespacesPrefixList',
			get: function get() {
				return this.xmlCanonicalizer.InclusiveNamespacesPrefixList;
			},
			set: function set(value) {
				this.xmlCanonicalizer.InclusiveNamespacesPrefixList = value;
			}
		}]);

		return XmlDsigExcC14NTransform;
	}(Transform);

	/**
  * Represents the exclusive C14N XML canonicalization transform for a digital signature
  * as defined by the World Wide Web Consortium (W3C), with comments.
  */


	var XmlDsigExcC14NWithCommentsTransform = function (_XmlDsigExcC14NTransf) {
		_inherits(XmlDsigExcC14NWithCommentsTransform, _XmlDsigExcC14NTransf);

		function XmlDsigExcC14NWithCommentsTransform() {
			_classCallCheck(this, XmlDsigExcC14NWithCommentsTransform);

			var _this103 = _possibleConstructorReturn(this, (XmlDsigExcC14NWithCommentsTransform.__proto__ || Object.getPrototypeOf(XmlDsigExcC14NWithCommentsTransform)).apply(this, arguments));

			_this103.Algorithm = "http://www.w3.org/2001/10/xml-exc-c14n#WithComments";
			_this103.xmlCanonicalizer = new XmlCanonicalizer(true, true);
			return _this103;
		}

		return XmlDsigExcC14NWithCommentsTransform;
	}(XmlDsigExcC14NTransform);

	/**
  * The Transforms element contains a collection of transformations
  */


	var Transforms = function (_XmlSignatureCollecti3) {
		_inherits(Transforms, _XmlSignatureCollecti3);

		function Transforms() {
			_classCallCheck(this, Transforms);

			return _possibleConstructorReturn(this, (Transforms.__proto__ || Object.getPrototypeOf(Transforms)).apply(this, arguments));
		}

		_createClass(Transforms, [{
			key: 'OnLoadXml',
			value: function OnLoadXml(element) {
				_get(Transforms.prototype.__proto__ || Object.getPrototypeOf(Transforms.prototype), 'OnLoadXml', this).call(this, element);
				// Update parsed objects
				this.items = this.GetIterator().map(function (item) {
					switch (item.Algorithm) {
						case XmlSignature.AlgorithmNamespaces.XmlDsigEnvelopedSignatureTransform:
							return ChangeTransform(item, XmlDsigEnvelopedSignatureTransform);
						case XmlSignature.AlgorithmNamespaces.XmlDsigC14NTransform:
							return ChangeTransform(item, XmlDsigC14NTransform);
						case XmlSignature.AlgorithmNamespaces.XmlDsigC14NWithCommentsTransform:
							return ChangeTransform(item, XmlDsigC14NWithCommentsTransform);
						case XmlSignature.AlgorithmNamespaces.XmlDsigExcC14NTransform:
							return ChangeTransform(item, XmlDsigExcC14NTransform);
						case XmlSignature.AlgorithmNamespaces.XmlDsigExcC14NWithCommentsTransform:
							return ChangeTransform(item, XmlDsigExcC14NWithCommentsTransform);
						case XmlSignature.AlgorithmNamespaces.XmlDsigBase64Transform:
							return ChangeTransform(item, XmlDsigBase64Transform);
						default:
							throw new XmlError(XE.CRYPTOGRAPHIC_UNKNOWN_TRANSFORM, item.Algorithm);
					}
				});
			}
		}]);

		return Transforms;
	}(XmlSignatureCollection);
	Transforms = __decorate([XmlElement({
		localName: XmlSignature.ElementNames.Transforms,
		parser: Transform
	})], Transforms);
	function ChangeTransform(t1, t2) {
		var t = new t2();
		t.element = t1.Element;
		return t;
	}

	/**
  *
  * <element name="Reference" type="ds:ReferenceType"/>
  * <complexType name="ReferenceType">
  *   <sequence>
  *     <element ref="ds:Transforms" minOccurs="0"/>
  *     <element ref="ds:DigestMethod"/>
  *     <element ref="ds:DigestValue"/>
  *   </sequence>
  *   <attribute name="Id" type="ID" use="optional"/>
  *   <attribute name="URI" type="anyURI" use="optional"/>
  *   <attribute name="Type" type="anyURI" use="optional"/>
  * </complexType>
  *
  */
	/**
  * Represents the <reference> element of an XML signature.
  */
	var Reference = function (_XmlSignatureObject6) {
		_inherits(Reference, _XmlSignatureObject6);

		function Reference(uri) {
			_classCallCheck(this, Reference);

			var _this105 = _possibleConstructorReturn(this, (Reference.__proto__ || Object.getPrototypeOf(Reference)).call(this));

			if (uri) _this105.Uri = uri;
			return _this105;
		}

		return Reference;
	}(XmlSignatureObject);
	__decorate([XmlAttribute({
		defaultValue: ""
	})], Reference.prototype, "Id", void 0);
	__decorate([XmlAttribute({
		localName: XmlSignature.AttributeNames.URI,
		defaultValue: ""
	})], Reference.prototype, "Uri", void 0);
	__decorate([XmlAttribute({
		localName: XmlSignature.AttributeNames.Type,
		defaultValue: ""
	})], Reference.prototype, "Type", void 0);
	__decorate([XmlChildElement({
		parser: Transforms
	})], Reference.prototype, "Transforms", void 0);
	__decorate([XmlChildElement({
		required: true,
		parser: DigestMethod
	})], Reference.prototype, "DigestMethod", void 0);
	__decorate([XmlChildElement({
		required: true,
		localName: XmlSignature.ElementNames.DigestValue,
		namespaceURI: XmlSignature.NamespaceURI,
		prefix: XmlSignature.DefaultPrefix,
		converter: XmlBase64Converter
	})], Reference.prototype, "DigestValue", void 0);
	Reference = __decorate([XmlElement({
		localName: XmlSignature.ElementNames.Reference
	})], Reference);
	var References = function (_XmlSignatureCollecti4) {
		_inherits(References, _XmlSignatureCollecti4);

		function References() {
			_classCallCheck(this, References);

			return _possibleConstructorReturn(this, (References.__proto__ || Object.getPrototypeOf(References)).apply(this, arguments));
		}

		return References;
	}(XmlSignatureCollection);
	References = __decorate([XmlElement({
		localName: "References",
		parser: Reference
	})], References);

	/**
  *
  * <element name="SignatureMethod" type="ds:SignatureMethodType"/>
  * <complexType name="SignatureMethodType" mixed="true">
  *   <sequence>
  *     <element name="HMACOutputLength" minOccurs="0" type="ds:HMACOutputLengthType"/>
  *     <any namespace="##other" minOccurs="0" maxOccurs="unbounded"/>
  *     <!--
  *     (0,unbounded) elements from (1,1) external namespace
  *     -->
  *   </sequence>
  *   <attribute name="Algorithm" type="anyURI" use="required"/>
  * </complexType>
  *
  */
	var SignatureMethodOther = function (_XmlSignatureCollecti5) {
		_inherits(SignatureMethodOther, _XmlSignatureCollecti5);

		function SignatureMethodOther() {
			_classCallCheck(this, SignatureMethodOther);

			return _possibleConstructorReturn(this, (SignatureMethodOther.__proto__ || Object.getPrototypeOf(SignatureMethodOther)).apply(this, arguments));
		}

		_createClass(SignatureMethodOther, [{
			key: 'OnLoadXml',
			value: function OnLoadXml(element) {
				for (var i = 0; i < element.childNodes.length; i++) {
					var _node2 = element.childNodes.item(i);
					if (_node2.nodeType !== XmlNodeType.Element || _node2.nodeName === XmlSignature.ElementNames.HMACOutputLength) continue;
					var ParserClass = void 0;
					switch (_node2.localName) {
						case XmlSignature.ElementNames.RSAPSSParams:
							ParserClass = PssAlgorithmParams;
							break;
						default:
							break;
					}
					if (ParserClass) {
						var _xml = new ParserClass();
						_xml.LoadXml(_node2);
						this.Add(_xml);
					}
				}
			}
		}]);

		return SignatureMethodOther;
	}(XmlSignatureCollection);
	SignatureMethodOther = __decorate([XmlElement({
		localName: "Other"
	})], SignatureMethodOther);
	var SignatureMethod = function (_XmlSignatureObject7) {
		_inherits(SignatureMethod, _XmlSignatureObject7);

		function SignatureMethod() {
			_classCallCheck(this, SignatureMethod);

			return _possibleConstructorReturn(this, (SignatureMethod.__proto__ || Object.getPrototypeOf(SignatureMethod)).apply(this, arguments));
		}

		return SignatureMethod;
	}(XmlSignatureObject);
	__decorate([XmlAttribute({
		localName: XmlSignature.AttributeNames.Algorithm,
		required: true,
		defaultValue: ""
	})], SignatureMethod.prototype, "Algorithm", void 0);
	__decorate([XmlChildElement({
		localName: XmlSignature.ElementNames.HMACOutputLength,
		namespaceURI: XmlSignature.NamespaceURI,
		prefix: XmlSignature.DefaultPrefix,
		converter: XmlNumberConverter
	})], SignatureMethod.prototype, "HMACOutputLength", void 0);
	__decorate([XmlChildElement({
		parser: SignatureMethodOther,
		noRoot: true,
		minOccurs: 0
	})], SignatureMethod.prototype, "Any", void 0);
	SignatureMethod = __decorate([XmlElement({
		localName: XmlSignature.ElementNames.SignatureMethod
	})], SignatureMethod);

	/**
  *
  * <complexType name="SignedInfoType">
  *   <sequence>
  *     <element ref="ds:CanonicalizationMethod"/>
  *     <element ref="ds:SignatureMethod"/>
  *     <element ref="ds:Reference" maxOccurs="unbounded"/>
  *   </sequence>
  *   <attribute name="Id" type="ID" use="optional"/>
  * </complexType>
  *
  */
	/**
  * The SignedInfo class represents the <SignedInfo> element
  * of an XML signature defined by the XML digital signature specification
  *
  * @export
  * @class SignedInfo
  * @extends {XmlSignatureObject}
  */
	var SignedInfo = function (_XmlSignatureObject8) {
		_inherits(SignedInfo, _XmlSignatureObject8);

		function SignedInfo() {
			_classCallCheck(this, SignedInfo);

			return _possibleConstructorReturn(this, (SignedInfo.__proto__ || Object.getPrototypeOf(SignedInfo)).apply(this, arguments));
		}

		return SignedInfo;
	}(XmlSignatureObject);
	__decorate([XmlAttribute({
		localName: XmlSignature.AttributeNames.Id,
		defaultValue: ""
	})], SignedInfo.prototype, "Id", void 0);
	__decorate([XmlChildElement({
		parser: CanonicalizationMethod,
		required: true
	})], SignedInfo.prototype, "CanonicalizationMethod", void 0);
	__decorate([XmlChildElement({
		parser: SignatureMethod,
		required: true
	})], SignedInfo.prototype, "SignatureMethod", void 0);
	__decorate([XmlChildElement({
		parser: References,
		minOccurs: 1,
		noRoot: true
	})], SignedInfo.prototype, "References", void 0);
	SignedInfo = __decorate([XmlElement({
		localName: XmlSignature.ElementNames.SignedInfo
	})], SignedInfo);

	// import { DataObject } from "./data_object";
	/**
  *
  * <element name="Signature" type="ds:SignatureType"/>
  * <complexType name="SignatureType">
  *   <sequence>
  *     <element ref="ds:SignedInfo"/>
  *     <element ref="ds:SignatureValue"/>
  *     <element ref="ds:KeyInfo" minOccurs="0"/>
  *     <element ref="ds:Object" minOccurs="0" maxOccurs="unbounded"/>
  *   </sequence>
  *   <attribute name="Id" type="ID" use="optional"/>
  * </complexType>
  *
  */
	/**
  * Represents the <Signature> element of an XML signature.
  */
	var Signature$$1 = function (_XmlSignatureObject9) {
		_inherits(Signature$$1, _XmlSignatureObject9);

		function Signature$$1() {
			_classCallCheck(this, Signature$$1);

			return _possibleConstructorReturn(this, (Signature$$1.__proto__ || Object.getPrototypeOf(Signature$$1)).apply(this, arguments));
		}

		return Signature$$1;
	}(XmlSignatureObject);
	__decorate([XmlAttribute({
		localName: XmlSignature.AttributeNames.Id,
		defaultValue: ""
	})], Signature$$1.prototype, "Id", void 0);
	__decorate([XmlChildElement({
		parser: SignedInfo,
		required: true
	})], Signature$$1.prototype, "SignedInfo", void 0);
	__decorate([XmlChildElement({
		localName: XmlSignature.ElementNames.SignatureValue,
		namespaceURI: XmlSignature.NamespaceURI,
		prefix: XmlSignature.DefaultPrefix,
		required: true,
		converter: XmlBase64Converter,
		defaultValue: null
	})], Signature$$1.prototype, "SignatureValue", void 0);
	__decorate([XmlChildElement({
		parser: KeyInfo
	})], Signature$$1.prototype, "KeyInfo", void 0);
	__decorate([XmlChildElement({
		parser: DataObjects,
		noRoot: true
	})], Signature$$1.prototype, "ObjectList", void 0);
	Signature$$1 = __decorate([XmlElement({
		localName: XmlSignature.ElementNames.Signature
	})], Signature$$1);

	/**
  *
  * <xs:element name="ECDSAKeyValue" type="ecdsa:ECDSAKeyValueType"/>
  * <xs:complexType name="ECDSAKeyValueType">
  *   <xs:sequence>
  *     <xs:element name="DomainParameters" type="ecdsa:DomainParamsType"
  *                 minOccurs="0"/>
  *     <xs:element name="PublicKey" type="ecdsa:ECPointType"/>
  *   </xs:sequence>
  * </xs:complexType>
  *
  * <xs:complexType name="DomainParamsType">
  *   <xs:choice>
  *     <xs:element name="ExplicitParams"
  *                 type="ecdsa:ExplicitParamsType"/>
  *     <xs:element name="NamedCurve">
  *       <xs:complexType>
  *         <xs:attribute name="URN" type="xs:anyURI" use="required"/>
  *       </xs:complexType>
  *     </xs:element>
  *   </xs:choice>
  * </xs:complexType>
  *
  * <xs:complexType name="ECPointType">
  *   <xs:sequence minOccurs="0">
  *     <xs:element name="X" type="ecdsa:FieldElemType"/>
  *     <xs:element name="Y" type="ecdsa:FieldElemType"/>
  *   </xs:sequence>
  * </xs:complexType>
  *
  */
	var NAMESPACE_URI$1 = "http://www.w3.org/2001/04/xmldsig-more#";
	var PREFIX$1 = "ecdsa";
	var EcdsaPublicKey = function (_XmlObject5) {
		_inherits(EcdsaPublicKey, _XmlObject5);

		function EcdsaPublicKey() {
			_classCallCheck(this, EcdsaPublicKey);

			return _possibleConstructorReturn(this, (EcdsaPublicKey.__proto__ || Object.getPrototypeOf(EcdsaPublicKey)).apply(this, arguments));
		}

		return EcdsaPublicKey;
	}(XmlObject);
	__decorate([XmlChildElement({
		localName: XmlSignature.ElementNames.X,
		namespaceURI: NAMESPACE_URI$1,
		prefix: PREFIX$1,
		required: true,
		converter: XmlBase64Converter
	})], EcdsaPublicKey.prototype, "X", void 0);
	__decorate([XmlChildElement({
		localName: XmlSignature.ElementNames.Y,
		namespaceURI: NAMESPACE_URI$1,
		prefix: PREFIX$1,
		required: true,
		converter: XmlBase64Converter
	})], EcdsaPublicKey.prototype, "Y", void 0);
	EcdsaPublicKey = __decorate([XmlElement({
		localName: XmlSignature.ElementNames.PublicKey,
		namespaceURI: NAMESPACE_URI$1,
		prefix: PREFIX$1
	})], EcdsaPublicKey);
	var NamedCurve = function (_XmlObject6) {
		_inherits(NamedCurve, _XmlObject6);

		function NamedCurve() {
			_classCallCheck(this, NamedCurve);

			return _possibleConstructorReturn(this, (NamedCurve.__proto__ || Object.getPrototypeOf(NamedCurve)).apply(this, arguments));
		}

		return NamedCurve;
	}(XmlObject);
	__decorate([XmlAttribute({
		localName: XmlSignature.AttributeNames.URI,
		required: true
	})], NamedCurve.prototype, "Uri", void 0);
	NamedCurve = __decorate([XmlElement({
		localName: XmlSignature.ElementNames.NamedCurve,
		namespaceURI: NAMESPACE_URI$1,
		prefix: PREFIX$1
	})], NamedCurve);
	var DomainParameters = function (_XmlObject7) {
		_inherits(DomainParameters, _XmlObject7);

		function DomainParameters() {
			_classCallCheck(this, DomainParameters);

			return _possibleConstructorReturn(this, (DomainParameters.__proto__ || Object.getPrototypeOf(DomainParameters)).apply(this, arguments));
		}

		return DomainParameters;
	}(XmlObject);
	__decorate([XmlChildElement({
		parser: NamedCurve
	})], DomainParameters.prototype, "NamedCurve", void 0);
	DomainParameters = __decorate([XmlElement({
		localName: XmlSignature.ElementNames.DomainParameters,
		namespaceURI: NAMESPACE_URI$1,
		prefix: PREFIX$1
	})], DomainParameters);
	/**
  * Represents the <ECKeyValue> element of an XML signature.
  */
	var EcdsaKeyValue = function (_KeyInfoClause2) {
		_inherits(EcdsaKeyValue, _KeyInfoClause2);

		/**
   * Represents the <ECKeyValue> element of an XML signature.
   */
		function EcdsaKeyValue() {
			_classCallCheck(this, EcdsaKeyValue);

			var _this114 = _possibleConstructorReturn(this, (EcdsaKeyValue.__proto__ || Object.getPrototypeOf(EcdsaKeyValue)).apply(this, arguments));

			_this114.name = XmlSignature.ElementNames.ECDSAKeyValue;
			_this114.m_key = null;
			_this114.m_jwk = null;
			_this114.m_keyusage = null;
			return _this114;
		}
		/**
   * Gets the NamedCurve value of then public key
   */


		_createClass(EcdsaKeyValue, [{
			key: 'importKey',

			/**
    * Imports key to the ECKeyValue object
    * @param  {CryptoKey} key
    * @returns Promise
    */
			value: function importKey(key) {
				var _this115 = this;

				return new Promise(function (resolve, reject) {
					if (key.algorithm.name.toUpperCase() !== "ECDSA") throw new XmlError(XE.ALGORITHM_WRONG_NAME, key.algorithm.name);
					_this115.m_key = key;
					Application.crypto.subtle.exportKey("jwk", key).then(function (jwk) {
						_this115.m_jwk = jwk;
						_this115.PublicKey = new EcdsaPublicKey();
						_this115.PublicKey.X = Convert.FromString(jwk.x, "base64url");
						_this115.PublicKey.Y = Convert.FromString(jwk.y, "base64url");
						if (!_this115.DomainParameters) _this115.DomainParameters = new DomainParameters();
						if (!_this115.DomainParameters.NamedCurve) _this115.DomainParameters.NamedCurve = new NamedCurve();
						_this115.DomainParameters.NamedCurve.Uri = GetNamedCurveOid(jwk.crv);
						_this115.m_keyusage = key.usages;
						return Promise.resolve(_this115);
					}).then(resolve, reject);
				});
			}
			/**
    * Exports key from the ECKeyValue object
    * @param  {Algorithm} alg
    * @returns Promise
    */

		}, {
			key: 'exportKey',
			value: function exportKey(alg) {
				var _this116 = this;

				return Promise.resolve().then(function () {
					if (_this116.m_key) return _this116.m_key;
					// fill jwk
					var x = Convert.ToBase64Url(_this116.PublicKey.X);
					var y = Convert.ToBase64Url(_this116.PublicKey.Y);
					var crv = GetNamedCurveFromOid(_this116.DomainParameters.NamedCurve.Uri);
					var jwk = {
						kty: "EC",
						crv: crv,
						x: x,
						y: y,
						ext: true
					};
					_this116.m_keyusage = ["verify"];
					return Application.crypto.subtle.importKey("jwk", jwk, { name: "ECDSA", namedCurve: crv }, true, _this116.m_keyusage);
				}).then(function (key) {
					_this116.m_key = key;
					return _this116.m_key;
				});
			}
		}, {
			key: 'NamedCurve',
			get: function get() {
				return GetNamedCurveOid(this.DomainParameters.NamedCurve.Uri);
			}
		}]);

		return EcdsaKeyValue;
	}(KeyInfoClause);
	__decorate([XmlChildElement({
		parser: DomainParameters
	})], EcdsaKeyValue.prototype, "DomainParameters", void 0);
	__decorate([XmlChildElement({
		parser: EcdsaPublicKey,
		required: true
	})], EcdsaKeyValue.prototype, "PublicKey", void 0);
	EcdsaKeyValue = __decorate([XmlElement({
		localName: XmlSignature.ElementNames.ECDSAKeyValue,
		namespaceURI: NAMESPACE_URI$1,
		prefix: PREFIX$1
	})], EcdsaKeyValue);
	function GetNamedCurveOid(namedCurve) {
		switch (namedCurve) {
			case "P-256":
				return "urn:oid:1.2.840.10045.3.1.7";
			case "P-384":
				return "urn:oid:1.3.132.0.34";
			case "P-521":
				return "urn:oid:1.3.132.0.35";
		}
		throw new XmlError(XE.CRYPTOGRAPHIC, "Unknown NamedCurve");
	}
	function GetNamedCurveFromOid(oid) {
		switch (oid) {
			case "urn:oid:1.2.840.10045.3.1.7":
				return "P-256";
			case "urn:oid:1.3.132.0.34":
				return "P-384";
			case "urn:oid:1.3.132.0.35":
				return "P-521";
		}
		throw new XmlError(XE.CRYPTOGRAPHIC, "Unknown NamedCurve OID");
	}

	/**
  * Represents the <KeyValue> element of an XML signature.
  */
	var KeyValue = function (_KeyInfoClause3) {
		_inherits(KeyValue, _KeyInfoClause3);

		function KeyValue(value) {
			_classCallCheck(this, KeyValue);

			var _this117 = _possibleConstructorReturn(this, (KeyValue.__proto__ || Object.getPrototypeOf(KeyValue)).call(this));

			if (value) _this117.Value = value;
			return _this117;
		}

		_createClass(KeyValue, [{
			key: 'importKey',
			value: function importKey(key) {
				var _this118 = this;

				return Promise.resolve().then(function () {
					switch (key.algorithm.name.toUpperCase()) {
						case RSA_PSS.toUpperCase():
						case RSA_PKCS1.toUpperCase():
							_this118.Value = new RsaKeyValue();
							return _this118.Value.importKey(key);
						case ECDSA.toUpperCase():
							_this118.Value = new EcdsaKeyValue();
							return _this118.Value.importKey(key);
						default:
							throw new XmlError(XE.ALGORITHM_NOT_SUPPORTED, key.algorithm.name);
					}
				}).then(function () {
					return _this118;
				});
			}
		}, {
			key: 'exportKey',
			value: function exportKey(alg) {
				var _this119 = this;

				return Promise.resolve().then(function () {
					if (!_this119.Value) throw new XmlError(XE.NULL_REFERENCE);
					return _this119.Value.exportKey(alg);
				});
			}
		}, {
			key: 'OnGetXml',
			value: function OnGetXml(element) {
				if (!this.Value) throw new XmlError(XE.CRYPTOGRAPHIC, "KeyValue has empty value");
				var node = this.Value.GetXml();
				if (node) element.appendChild(node);
			}
		}, {
			key: 'Value',
			set: function set(v) {
				this.element = null;
				this.value = v;
			},
			get: function get() {
				return this.value;
			}
		}]);

		return KeyValue;
	}(KeyInfoClause);
	KeyValue = __decorate([XmlElement({
		localName: XmlSignature.ElementNames.KeyValue
	})], KeyValue);

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
			long: "UnstructuredAddress"
		},
		"1.2.840.113549.1.9.2": {
			long: "UnstructuredName"
		}
	};
	/**
  * Represents an <X509Certificate> element.
  */

	var X509Certificate = function () {
		function X509Certificate(rawData) {
			_classCallCheck(this, X509Certificate);

			this.publicKey = null;
			if (rawData) {
				var buf = new Uint8Array(rawData);
				this.LoadRaw(buf);
				this.raw = buf;
			}
		}
		/**
   * Gets a serial number of the certificate in HEX format
   */


		_createClass(X509Certificate, [{
			key: 'NameToString',

			/**
    * Converts X500Name to string
    * @param  {RDN} name X500Name
    * @param  {string} spliter Splitter char. Default ','
    * @returns string Formated string
    * Example:
    * > C=Some name, O=Some organization name, C=RU
    */
			value: function NameToString(name) {
				var spliter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ",";

				var res = [];
				name.typesAndValues.forEach(function (type_and_value) {
					var type = type_and_value.type;
					var name = OID[type.toString()].short;
					res.push((name ? name : type) + '=' + type_and_value.value.valueBlock.value);
				});
				return res.join(spliter + " ");
			}
			/**
    * Gets a issuer name of the certificate
    */

		}, {
			key: 'Thumbprint',

			/**
    * Returns a thumbrint of the certififcate
    * @param  {DigestAlgorithm="SHA-1"} algName Digest algorithm name
    * @returns PromiseLike
    */
			value: function Thumbprint() {
				var algName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "SHA-1";

				return Application.crypto.subtle.digest(algName, this.raw);
			}
			/**
    * Loads X509Certificate from DER data
    * @param  {Uint8Array} rawData
    */

		}, {
			key: 'LoadRaw',
			value: function LoadRaw(rawData) {
				this.raw = new Uint8Array(rawData);
				var asn1 = fromBER(this.raw.buffer);
				this.simpl = new Certificate({ schema: asn1.result });
			}
			/**
    * Gets the public key from the X509Certificate
    */

		}, {
			key: 'GetRaw',

			/**
    * Returns DER raw of X509Certificate
    */
			value: function GetRaw() {
				return this.raw;
			}
			/**
    * Returns public key from X509Certificate
    * @param  {Algorithm} algorithm
    * @returns Promise
    */

		}, {
			key: 'exportKey',
			value: function exportKey(algorithm) {
				var _this120 = this;

				return Promise.resolve().then(function () {
					if (!getCrypto()) setEngine(Application.crypto.name, Application.crypto, Application.crypto.subtle);
					var alg = {
						algorithm: algorithm,
						usages: ["verify"]
					};
					if (alg.algorithm.name.toUpperCase() === ECDSA) {
						// Set named curve
						alg.algorithm.namedCurve = _this120.simpl.subjectPublicKeyInfo.toJSON().crv;
					}
					return _this120.simpl.getPublicKey({ algorithm: alg }).then(function (key) {
						_this120.publicKey = key;
						return key;
					});
				});
			}
		}, {
			key: 'SerialNumber',
			get: function get() {
				return Convert.ToHex(new Uint8Array(this.simpl.serialNumber.valueBlock.valueHex));
			}
		}, {
			key: 'Issuer',
			get: function get() {
				return this.NameToString(this.simpl.issuer);
			}
			/**
    * Gets a subject name of the certificate
    */

		}, {
			key: 'Subject',
			get: function get() {
				return this.NameToString(this.simpl.subject);
			}
		}, {
			key: 'PublicKey',
			get: function get() {
				return this.publicKey;
			}
		}]);

		return X509Certificate;
	}();

	/**
  *
  * <element name="X509Data" type="ds:X509DataType"/>
  * <complexType name="X509DataType">
  *   <sequence maxOccurs="unbounded">
  *     <choice>
  *       <element name="X509IssuerSerial" type="ds:X509IssuerSerialType"/>
  *       <element name="X509SKI" type="base64Binary"/>
  *       <element name="X509SubjectName" type="string"/>
  *       <element name="X509Certificate" type="base64Binary"/>
  *       <element name="X509CRL" type="base64Binary"/>
  *       <any namespace="##other" processContents="lax"/>
  *     </choice>
  *   </sequence>
  * </complexType>
  *
  *  <complexType name="X509IssuerSerialType">
  *    <sequence>
  *      <element name="X509IssuerName" type="string"/>
  *      <element name="X509SerialNumber" type="integer"/>
  *    </sequence>
  *  </complexType>
  *
  */


	var X509IssuerSerial = function (_XmlSignatureObject10) {
		_inherits(X509IssuerSerial, _XmlSignatureObject10);

		function X509IssuerSerial() {
			_classCallCheck(this, X509IssuerSerial);

			return _possibleConstructorReturn(this, (X509IssuerSerial.__proto__ || Object.getPrototypeOf(X509IssuerSerial)).apply(this, arguments));
		}

		return X509IssuerSerial;
	}(XmlSignatureObject);
	__decorate([XmlChildElement({ localName: XmlSignature.ElementNames.X509IssuerName, namespaceURI: XmlSignature.NamespaceURI, prefix: XmlSignature.DefaultPrefix, required: true })], X509IssuerSerial.prototype, "X509IssuerName", void 0);
	__decorate([XmlChildElement({ localName: XmlSignature.ElementNames.X509SerialNumber, namespaceURI: XmlSignature.NamespaceURI, prefix: XmlSignature.DefaultPrefix, required: true })], X509IssuerSerial.prototype, "X509SerialNumber", void 0);
	X509IssuerSerial = __decorate([XmlElement({ localName: XmlSignature.ElementNames.X509IssuerSerial })], X509IssuerSerial);
	var X509IncludeOption;
	(function (X509IncludeOption) {
		X509IncludeOption[X509IncludeOption["None"] = 0] = "None";
		X509IncludeOption[X509IncludeOption["EndCertOnly"] = 1] = "EndCertOnly";
		X509IncludeOption[X509IncludeOption["ExcludeRoot"] = 2] = "ExcludeRoot";
		X509IncludeOption[X509IncludeOption["WholeChain"] = 3] = "WholeChain";
	})(X509IncludeOption || (X509IncludeOption = {}));
	/**
  * Represents an <X509Data> subelement of an XMLDSIG or XML Encryption <KeyInfo> element.
  */
	var KeyInfoX509Data = function (_KeyInfoClause4) {
		_inherits(KeyInfoX509Data, _KeyInfoClause4);

		function KeyInfoX509Data(cert) {
			var includeOptions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : X509IncludeOption.None;

			_classCallCheck(this, KeyInfoX509Data);

			var _this122 = _possibleConstructorReturn(this, (KeyInfoX509Data.__proto__ || Object.getPrototypeOf(KeyInfoX509Data)).call(this));

			_this122.x509crl = null;
			_this122.SubjectKeyIdList = [];
			_this122.key = null;
			if (cert) {
				if (cert instanceof Uint8Array) _this122.AddCertificate(new X509Certificate(cert));else if (cert instanceof X509Certificate) {
					switch (includeOptions) {
						case X509IncludeOption.None:
						case X509IncludeOption.EndCertOnly:
							_this122.AddCertificate(cert);
							break;
						case X509IncludeOption.ExcludeRoot:
							_this122.AddCertificatesChainFrom(cert, false);
							break;
						case X509IncludeOption.WholeChain:
							_this122.AddCertificatesChainFrom(cert, true);
							break;
					}
				}
			}
			return _this122;
		}
		/**
   * Gets public key of the X509Data
   */


		_createClass(KeyInfoX509Data, [{
			key: 'importKey',
			value: function importKey(key) {
				return Promise.reject(new XmlError(XE.METHOD_NOT_SUPPORTED));
			}
			/**
    * Exports key from X509Data object
    * @param  {Algorithm} alg
    * @returns Promise
    */

		}, {
			key: 'exportKey',
			value: function exportKey(alg) {
				var _this123 = this;

				return Promise.resolve().then(function () {
					if (_this123.Certificates.length) return _this123.Certificates[0].exportKey(alg);
					return Promise.resolve(null);
				}).then(function (key) {
					_this123.key = key;
					return key;
				});
			}
			// this gets complicated because we must:
			// 1. build the chain using a X509Certificate2 class;
			// 2. test for root using the Mono.Security.X509.X509Certificate class;
			// 3. add the certificates as X509Certificate instances;

		}, {
			key: 'AddCertificatesChainFrom',
			value: function AddCertificatesChainFrom(cert, root) {
				throw new XmlError(XE.METHOD_NOT_IMPLEMENTED);
			}
			/**
    * Gets a list of the X.509v3 certificates contained in the KeyInfoX509Data object.
    */

		}, {
			key: 'AddCertificate',

			/**
    * Adds the specified X.509v3 certificate to the KeyInfoX509Data.
    * @param  {X509Certificate} certificate
    * @returns void
    */
			value: function AddCertificate(certificate) {
				if (!certificate) throw new XmlError(XE.PARAM_REQUIRED, "certificate");
				if (!this.X509CertificateList) this.X509CertificateList = [];
				this.X509CertificateList.push(certificate);
			}
			/**
    * Adds the specified issuer name and serial number pair to the KeyInfoX509Data object.
    * @param  {string} issuerName
    * @param  {string} serialNumber
    * @returns void
    */

		}, {
			key: 'AddIssuerSerial',
			value: function AddIssuerSerial(issuerName, serialNumber) {
				if (issuerName == null) throw new XmlError(XE.PARAM_REQUIRED, "issuerName");
				if (this.IssuerSerialList == null) this.IssuerSerialList = [];
				var xis = { issuerName: issuerName, serialNumber: serialNumber };
				this.IssuerSerialList.push(xis);
			}
		}, {
			key: 'AddSubjectKeyId',
			value: function AddSubjectKeyId(subjectKeyId) {
				if (this.SubjectKeyIdList) this.SubjectKeyIdList = [];
				if (typeof subjectKeyId === "string") {
					if (subjectKeyId != null) {
						var id = void 0;
						id = Convert.FromBase64(subjectKeyId);
						this.SubjectKeyIdList.push(id);
					}
				} else {
					this.SubjectKeyIdList.push(subjectKeyId);
				}
			}
			/**
    * Adds the subject name of the entity that was issued an X.509v3 certificate to the KeyInfoX509Data object.
    * @param  {string} subjectName
    * @returns void
    */

		}, {
			key: 'AddSubjectName',
			value: function AddSubjectName(subjectName) {
				if (this.SubjectNameList == null) this.SubjectNameList = [];
				this.SubjectNameList.push(subjectName);
			}
			/**
    * Returns an XML representation of the KeyInfoX509Data object.
    * @returns Element
    */

		}, {
			key: 'GetXml',
			value: function GetXml() {
				var doc = this.CreateDocument();
				var xel = this.CreateElement(doc);
				var prefix = this.GetPrefix();
				// <X509IssuerSerial>
				if (this.IssuerSerialList != null && this.IssuerSerialList.length > 0) {
					this.IssuerSerialList.forEach(function (iser) {
						var isl = doc.createElementNS(XmlSignature.NamespaceURI, prefix + XmlSignature.ElementNames.X509IssuerSerial);
						var xin = doc.createElementNS(XmlSignature.NamespaceURI, prefix + XmlSignature.ElementNames.X509IssuerName);
						xin.textContent = iser.issuerName;
						isl.appendChild(xin);
						var xsn = doc.createElementNS(XmlSignature.NamespaceURI, prefix + XmlSignature.ElementNames.X509SerialNumber);
						xsn.textContent = iser.serialNumber;
						isl.appendChild(xsn);
						xel.appendChild(isl);
					});
				}
				// <X509SKI>
				if (this.SubjectKeyIdList != null && this.SubjectKeyIdList.length > 0) {
					this.SubjectKeyIdList.forEach(function (skid) {
						var ski = doc.createElementNS(XmlSignature.NamespaceURI, prefix + XmlSignature.ElementNames.X509SKI);
						ski.textContent = Convert.ToBase64(skid);
						xel.appendChild(ski);
					});
				}
				// <X509SubjectName>
				if (this.SubjectNameList != null && this.SubjectNameList.length > 0) {
					this.SubjectNameList.forEach(function (subject) {
						var sn = doc.createElementNS(XmlSignature.NamespaceURI, prefix + XmlSignature.ElementNames.X509SubjectName);
						sn.textContent = subject;
						xel.appendChild(sn);
					});
				}
				// <X509Certificate>
				if (this.X509CertificateList != null && this.X509CertificateList.length > 0) {
					this.X509CertificateList.forEach(function (x509) {
						var cert = doc.createElementNS(XmlSignature.NamespaceURI, prefix + XmlSignature.ElementNames.X509Certificate);
						cert.textContent = Convert.ToBase64(x509.GetRaw());
						xel.appendChild(cert);
					});
				}
				// only one <X509CRL> 
				if (this.x509crl != null) {
					var crl = doc.createElementNS(XmlSignature.NamespaceURI, prefix + XmlSignature.ElementNames.X509CRL);
					crl.textContent = Convert.ToBase64(this.x509crl);
					xel.appendChild(crl);
				}
				return xel;
			}
			/**
    * Parses the input XmlElement object and configures the internal state of the KeyInfoX509Data object to match.
    * @param  {Element} element
    * @returns void
    */

		}, {
			key: 'LoadXml',
			value: function LoadXml(element) {
				var _this124 = this;

				_get(KeyInfoX509Data.prototype.__proto__ || Object.getPrototypeOf(KeyInfoX509Data.prototype), 'LoadXml', this).call(this, element);
				if (this.IssuerSerialList) this.IssuerSerialList = [];
				if (this.SubjectKeyIdList) this.SubjectKeyIdList = [];
				if (this.SubjectNameList) this.SubjectNameList = [];
				if (this.X509CertificateList) this.X509CertificateList = [];
				this.x509crl = null;
				// <X509IssuerSerial>
				var xnl = this.GetChildren(XmlSignature.ElementNames.X509IssuerSerial);
				if (xnl) {
					xnl.forEach(function (xel) {
						var issuer = XmlSignatureObject.GetChild(xel, XmlSignature.ElementNames.X509IssuerName, XmlSignature.NamespaceURI, true);
						var serial = XmlSignatureObject.GetChild(xel, XmlSignature.ElementNames.X509SerialNumber, XmlSignature.NamespaceURI, true);
						if (issuer && issuer.textContent && serial && serial.textContent) _this124.AddIssuerSerial(issuer.textContent, serial.textContent);
					});
				}
				// <X509SKI>
				xnl = this.GetChildren(XmlSignature.ElementNames.X509SKI);
				if (xnl) {
					xnl.forEach(function (xel) {
						if (xel.textContent) {
							var skid = Convert.FromBase64(xel.textContent);
							_this124.AddSubjectKeyId(skid);
						}
					});
				}
				// <X509SubjectName>
				xnl = this.GetChildren(XmlSignature.ElementNames.X509SubjectName);
				if (xnl != null) {
					xnl.forEach(function (xel) {
						if (xel.textContent) _this124.AddSubjectName(xel.textContent);
					});
				}
				// <X509Certificate>
				xnl = this.GetChildren(XmlSignature.ElementNames.X509Certificate);
				if (xnl) {
					xnl.forEach(function (xel) {
						if (xel.textContent) {
							var cert = Convert.FromBase64(xel.textContent);
							_this124.AddCertificate(new X509Certificate(cert));
						}
					});
				}
				// only one <X509CRL> 
				var x509el = this.GetChild(XmlSignature.ElementNames.X509CRL, false);
				if (x509el && x509el.textContent) {
					this.x509crl = Convert.FromBase64(x509el.textContent);
				}
			}
		}, {
			key: 'Key',
			get: function get() {
				return this.key;
			}
		}, {
			key: 'Certificates',
			get: function get() {
				return this.X509CertificateList;
			}
			/**
    * Gets or sets the Certificate Revocation List (CRL) contained within the KeyInfoX509Data object.
    */

		}, {
			key: 'CRL',
			get: function get() {
				return this.x509crl;
			},
			set: function set(value) {
				this.x509crl = value;
			}
			/**
    * Gets a list of X509IssuerSerial structures that represent an issuer name and serial number pair.
    */

		}, {
			key: 'IssuerSerials',
			get: function get() {
				return this.IssuerSerialList;
			}
			/**
    * Gets a list of the subject key identifiers (SKIs) contained in the KeyInfoX509Data object.
    */

		}, {
			key: 'SubjectKeyIds',
			get: function get() {
				return this.SubjectKeyIdList;
			}
			/**
    * Gets a list of the subject names of the entities contained in the KeyInfoX509Data object.
    */

		}, {
			key: 'SubjectNames',
			get: function get() {
				return this.SubjectNameList;
			}
		}]);

		return KeyInfoX509Data;
	}(KeyInfoClause);
	KeyInfoX509Data = __decorate([XmlElement({
		localName: XmlSignature.ElementNames.X509Data
	})], KeyInfoX509Data);

	/**
  *
  * <element name="SPKIData" type="ds:SPKIDataType"/>
  * <complexType name="SPKIDataType">
  *   <sequence maxOccurs="unbounded">
  *     <element name="SPKISexp" type="base64Binary"/>
  *     <any namespace="##other" processContents="lax" minOccurs="0"/>
  *   </sequence>
  * </complexType>
  *
  */
	var SPKIData = function (_KeyInfoClause5) {
		_inherits(SPKIData, _KeyInfoClause5);

		function SPKIData() {
			_classCallCheck(this, SPKIData);

			return _possibleConstructorReturn(this, (SPKIData.__proto__ || Object.getPrototypeOf(SPKIData)).apply(this, arguments));
		}

		_createClass(SPKIData, [{
			key: 'importKey',
			value: function importKey(key) {
				var _this126 = this;

				return Promise.resolve().then(function () {
					return Application.crypto.subtle.exportKey("spki", key);
				}).then(function (spki) {
					_this126.SPKIexp = new Uint8Array(spki);
					_this126.Key = key;
					return _this126;
				});
			}
		}, {
			key: 'exportKey',
			value: function exportKey(alg) {
				var _this127 = this;

				return Promise.resolve().then(function () {
					return Application.crypto.subtle.importKey("spki", _this127.SPKIexp, alg, true, ["verify"]);
				}).then(function (key) {
					_this127.Key = key;
					return key;
				});
			}
		}]);

		return SPKIData;
	}(KeyInfoClause);
	__decorate([XmlChildElement({
		localName: XmlSignature.ElementNames.SPKIexp,
		namespaceURI: XmlSignature.NamespaceURI,
		prefix: XmlSignature.DefaultPrefix,
		required: true,
		converter: XmlBase64Converter
	})], SPKIData.prototype, "SPKIexp", void 0);
	SPKIData = __decorate([XmlElement({
		localName: XmlSignature.ElementNames.SPKIData
	})], SPKIData);

	var SignatureAlgorithms = {};
	SignatureAlgorithms[RSA_PKCS1_SHA1_NAMESPACE] = RsaPkcs1Sha1;
	SignatureAlgorithms[RSA_PKCS1_SHA256_NAMESPACE] = RsaPkcs1Sha256;
	SignatureAlgorithms[RSA_PKCS1_SHA384_NAMESPACE] = RsaPkcs1Sha384;
	SignatureAlgorithms[RSA_PKCS1_SHA512_NAMESPACE] = RsaPkcs1Sha512;
	SignatureAlgorithms[ECDSA_SHA1_NAMESPACE] = EcdsaSha1;
	SignatureAlgorithms[ECDSA_SHA256_NAMESPACE] = EcdsaSha256;
	SignatureAlgorithms[ECDSA_SHA384_NAMESPACE] = EcdsaSha384;
	SignatureAlgorithms[ECDSA_SHA512_NAMESPACE] = EcdsaSha512;
	SignatureAlgorithms[HMAC_SHA1_NAMESPACE] = HmacSha1;
	SignatureAlgorithms[HMAC_SHA256_NAMESPACE] = HmacSha256;
	SignatureAlgorithms[HMAC_SHA384_NAMESPACE] = HmacSha384;
	SignatureAlgorithms[HMAC_SHA512_NAMESPACE] = HmacSha512;
	var HashAlgorithms = {};
	HashAlgorithms[SHA1_NAMESPACE] = Sha1;
	HashAlgorithms[SHA256_NAMESPACE] = Sha256;
	HashAlgorithms[SHA384_NAMESPACE] = Sha384;
	HashAlgorithms[SHA512_NAMESPACE] = Sha512;

	var CryptoConfig = function () {
		function CryptoConfig() {
			_classCallCheck(this, CryptoConfig);
		}

		_createClass(CryptoConfig, null, [{
			key: 'CreateFromName',

			/**
    * Creates Transform from given name
    * if name is not exist then throws error
    *
    * @static
    * @param {(string |)} [name=null]
    * @returns
    *
    * @memberOf CryptoConfig
    */
			value: function CreateFromName(name) {
				var transform = void 0;
				switch (name) {
					case XmlSignature.AlgorithmNamespaces.XmlDsigBase64Transform:
						transform = new XmlDsigBase64Transform();
						break;
					case XmlSignature.AlgorithmNamespaces.XmlDsigC14NTransform:
						transform = new XmlDsigC14NTransform();
						break;
					case XmlSignature.AlgorithmNamespaces.XmlDsigC14NWithCommentsTransform:
						transform = new XmlDsigC14NWithCommentsTransform();
						break;
					case XmlSignature.AlgorithmNamespaces.XmlDsigEnvelopedSignatureTransform:
						transform = new XmlDsigEnvelopedSignatureTransform();
						break;
					case XmlSignature.AlgorithmNamespaces.XmlDsigXPathTransform:
						throw new XmlError(XE.ALGORITHM_NOT_SUPPORTED, name);
					// t = new XmlDsigXPathTransform();
					// break;
					case XmlSignature.AlgorithmNamespaces.XmlDsigXsltTransform:
						throw new XmlError(XE.ALGORITHM_NOT_SUPPORTED, name);
					// t = new XmlDsigXsltTransform();
					// break;
					case XmlSignature.AlgorithmNamespaces.XmlDsigExcC14NTransform:
						transform = new XmlDsigExcC14NTransform();
						break;
					case XmlSignature.AlgorithmNamespaces.XmlDsigExcC14NWithCommentsTransform:
						transform = new XmlDsigExcC14NWithCommentsTransform();
						break;
					case XmlSignature.AlgorithmNamespaces.XmlDecryptionTransform:
						throw new XmlError(XE.ALGORITHM_NOT_SUPPORTED, name);
					// t = new XmlDecryptionTransform();
					// break;
					default:
						throw new XmlError(XE.ALGORITHM_NOT_SUPPORTED, name);
				}
				return transform;
			}
		}, {
			key: 'CreateSignatureAlgorithm',
			value: function CreateSignatureAlgorithm(method) {
				var alg = SignatureAlgorithms[method.Algorithm] || null;
				if (alg) return new alg();else if (method.Algorithm === RSA_PSS_WITH_PARAMS_NAMESPACE) {
					var _ret2 = function () {
						var pssParams = void 0;
						method.Any.Some(function (item) {
							if (item instanceof PssAlgorithmParams) pssParams = item;
							return !!pssParams;
						});
						if (pssParams) switch (pssParams.DigestMethod.Algorithm) {
							case SHA1_NAMESPACE:
								return {
									v: new RsaPssSha1(pssParams.SaltLength)
								};
							case SHA256_NAMESPACE:
								return {
									v: new RsaPssSha256(pssParams.SaltLength)
								};
							case SHA384_NAMESPACE:
								return {
									v: new RsaPssSha384(pssParams.SaltLength)
								};
							case SHA512_NAMESPACE:
								return {
									v: new RsaPssSha512(pssParams.SaltLength)
								};
						}
						throw new XmlError(XE.CRYPTOGRAPHIC, 'Cannot get params for RSA-PSS algoriithm');
					}();

					if ((typeof _ret2 === 'undefined' ? 'undefined' : _typeof(_ret2)) === "object") return _ret2.v;
				}
				throw new Error('signature algorithm \'' + method.Algorithm + '\' is not supported');
			}
		}, {
			key: 'CreateHashAlgorithm',
			value: function CreateHashAlgorithm(namespace) {
				var alg = HashAlgorithms[namespace];
				if (alg) return new alg();else throw new Error("hash algorithm '" + namespace + "' is not supported");
			}
		}, {
			key: 'GetHashAlgorithm',
			value: function GetHashAlgorithm(algorithm) {
				var alg = typeof algorithm === "string" ? { name: algorithm } : algorithm;
				switch (alg.name.toUpperCase()) {
					case SHA1:
						return new Sha1();
					case SHA256:
						return new Sha256();
					case SHA384:
						return new Sha384();
					case SHA512:
						return new Sha512();
					default:
						throw new XmlError(XE.ALGORITHM_NOT_SUPPORTED, alg.name);
				}
			}
		}, {
			key: 'GetSignatureAlgorithm',
			value: function GetSignatureAlgorithm(algorithm) {
				if (typeof algorithm.hash === "string") algorithm.hash = {
					name: algorithm.hash
				};
				var hashName = algorithm.hash.name;
				if (!hashName) throw new Error("Signing algorithm doesn't have name for hash");
				var alg = void 0;
				switch (algorithm.name.toUpperCase()) {
					case RSA_PKCS1.toUpperCase():
						switch (hashName.toUpperCase()) {
							case SHA1:
								alg = new RsaPkcs1Sha1();
								break;
							case SHA256:
								alg = new RsaPkcs1Sha256();
								break;
							case SHA384:
								alg = new RsaPkcs1Sha384();
								break;
							case SHA512:
								alg = new RsaPkcs1Sha512();
								break;
							default:
								throw new XmlError(XE.ALGORITHM_NOT_SUPPORTED, algorithm.name + ':' + hashName);
						}
						break;
					case RSA_PSS.toUpperCase():
						var saltLength = algorithm.saltLength;
						switch (hashName.toUpperCase()) {
							case SHA1:
								alg = new RsaPssSha1(saltLength);
								break;
							case SHA256:
								alg = new RsaPssSha256(saltLength);
								break;
							case SHA384:
								alg = new RsaPssSha384(saltLength);
								break;
							case SHA512:
								alg = new RsaPssSha512(saltLength);
								break;
							default:
								throw new XmlError(XE.ALGORITHM_NOT_SUPPORTED, algorithm.name + ':' + hashName);
						}
						break;
					case ECDSA:
						switch (hashName.toUpperCase()) {
							case SHA1:
								alg = new EcdsaSha1();
								break;
							case SHA256:
								alg = new EcdsaSha256();
								break;
							case SHA384:
								alg = new EcdsaSha384();
								break;
							case SHA512:
								alg = new EcdsaSha512();
								break;
							default:
								throw new XmlError(XE.ALGORITHM_NOT_SUPPORTED, algorithm.name + ':' + hashName);
						}
						break;
					case HMAC:
						switch (hashName.toUpperCase()) {
							case SHA1:
								alg = new HmacSha1();
								break;
							case SHA256:
								alg = new HmacSha256();
								break;
							case SHA384:
								alg = new HmacSha384();
								break;
							case SHA512:
								alg = new HmacSha512();
								break;
							default:
								throw new XmlError(XE.ALGORITHM_NOT_SUPPORTED, algorithm.name + ':' + hashName);
						}
						break;
					default:
						throw new XmlError(XE.ALGORITHM_NOT_SUPPORTED, algorithm.name);
				}
				return alg;
			}
		}]);

		return CryptoConfig;
	}();

	/**
 * Provides a wrapper on a core XML signature object to facilitate creating XML signatures.
 */


	var SignedXml = function () {
		/**
   * Creates an instance of SignedXml.
   *
   * @param {(Document | Element)} [node]
   *
   * @memberOf SignedXml
   */
		function SignedXml(node) {
			_classCallCheck(this, SignedXml);

			this.signature = new Signature$$1();
			// constructor();
			if (node && node.nodeType === XmlNodeType.Document) {
				// constructor(node: Document);
				this.document = node;
			} else if (node && node.nodeType === XmlNodeType.Element) {
				// constructor(node: Element);
				var xmlText = new XMLSerializer().serializeToString(node);
				this.document = new DOMParser().parseFromString(xmlText, APPLICATION_XML);
			}
		}

		_createClass(SignedXml, [{
			key: 'GetPublicKeys',

			// Protected methods
			/**
   * Returns the public key of a signature.
   */
			value: function GetPublicKeys() {
				var _this128 = this;

				var keys = [];
				return Promise.resolve().then(function () {
					var pkEnumerator = _this128.XmlSignature.KeyInfo.GetIterator();
					var promises = [];
					pkEnumerator.forEach(function (kic) {
						var alg = CryptoConfig.CreateSignatureAlgorithm(_this128.XmlSignature.SignedInfo.SignatureMethod);
						if (kic instanceof KeyInfoX509Data) {
							kic.Certificates.forEach(function (cert) {
								promises.push(cert.exportKey(alg.algorithm).then(function (key) {
									keys.push(key);
								}));
							});
						} else {
							promises.push(kic.exportKey(alg.algorithm).then(function (key) {
								keys.push(key);
							}));
						}
					});
					return Promise.all(promises);
				}).then(function () {
					return keys;
				});
			}
		}, {
			key: 'FixupNamespaceNodes',
			value: function FixupNamespaceNodes(src, dst, ignoreDefault) {
				// add namespace nodes
				var namespaces = SelectNamespaces(src);
				for (var i in namespaces) {
					var uri = namespaces[i];
					if (ignoreDefault && i === "") continue;
					dst.setAttribute("xmlns" + (i ? ":" + i : ""), uri);
				}
			}
		}, {
			key: 'DigestReference',
			value: function DigestReference(doc, reference, check_hmac) {
				var _this129 = this;

				return Promise.resolve().then(function () {
					var canonOutput = null;
					if (reference.Uri) {
						(function () {
							var objectName = void 0;
							if (!reference.Uri.indexOf("#xpointer")) {
								var uri = reference.Uri;
								uri = uri.substring(9).replace(/[\r\n\t\s]/g, "");
								if (uri.length < 2 || uri[0] !== '(' || uri[uri.length - 1] !== ')')
									// FIXME: how to handle invalid xpointer?
									uri = ""; // String.Empty
								else uri = uri.substring(1, uri.length - 1);
								if (uri.length > 6 && uri.indexOf('id(') === 0 && uri[uri.length - 1] === ')')
									// id('foo'), id("foo")
									objectName = uri.substring(4, uri.length - 2);
							} else if (reference.Uri[0] === '#') {
								objectName = reference.Uri.substring(1);
							}
							if (objectName) {
								(function () {
									var found = null;
									_this129.XmlSignature.ObjectList && _this129.XmlSignature.ObjectList.Some(function (obj) {
										found = findById(obj.GetXml(), objectName);
										if (found) {
											var el = found.cloneNode(true);
											_this129.FixupNamespaceNodes(doc, el, true);
											doc = el;
											return true;
										}
										return false;
									});
									if (!found && doc) {
										found = XmlObject.GetElementById(doc, objectName);
										if (found) {
											var el = found.cloneNode(true);
											_this129.FixupNamespaceNodes(doc, el, false);
											doc = el;
										}
									}
									if (found == null) throw new XmlError(XE.CRYPTOGRAPHIC, 'Cannot get object by reference: ' + objectName);
								})();
							}
						})();
					}
					if (reference.Transforms && reference.Transforms.Count) {
						// Sort transforms. Enveloped should be first transform
						reference.Transforms.Sort(function (a, b) {
							if (b instanceof XmlDsigEnvelopedSignatureTransform) return 1;
							return 0;
						}).ForEach(function (transform) {
							// Apply transforms
							if (transform instanceof XmlDsigC14NWithCommentsTransform) transform = new XmlDsigC14NTransform(); // TODO: Check RFC for it
							if (transform instanceof XmlDsigExcC14NWithCommentsTransform) transform = new XmlDsigExcC14NTransform(); // TODO: Check RFC for it
							transform.LoadInnerXml(doc);
							canonOutput = transform.GetOutput();
						});
						// Apply C14N transform if Reference has only one transform EnvelopdeSignature
						if (reference.Transforms.Count === 1 && reference.Transforms.Item(0) instanceof XmlDsigEnvelopedSignatureTransform) {
							var c14n = new XmlDsigC14NTransform();
							c14n.LoadInnerXml(doc);
							canonOutput = c14n.GetOutput();
						}
					} else {
						// we must not C14N references from outside the document
						// e.g. non-xml documents
						if (reference.Uri && reference.Uri[0] !== '#') {
							canonOutput = new XMLSerializer().serializeToString(doc);
						} else {
							// apply default C14N transformation
							var excC14N = new XmlDsigC14NTransform();
							excC14N.LoadInnerXml(doc);
							canonOutput = excC14N.GetOutput();
						}
					}
					if (!reference.DigestMethod.Algorithm) {
						throw new XmlError(XE.NULL_PARAM, "Reference", "DigestMethod");
					}
					var digest = CryptoConfig.CreateHashAlgorithm(reference.DigestMethod.Algorithm);
					return digest.Digest(canonOutput);
				});
			}
		}, {
			key: 'DigestReferences',
			value: function DigestReferences(data) {
				var _this130 = this;

				return Promise.resolve().then(function () {
					// we must tell each reference which hash algorithm to use 
					// before asking for the SignedInfo XML !
					var promises = _this130.XmlSignature.SignedInfo.References.Map(function (ref) {
						// assume SHA-256 if nothing is specified
						if (!ref.DigestMethod.Algorithm) ref.DigestMethod.Algorithm = new Sha256().namespaceURI;
						return _this130.DigestReference(data, ref, false).then(function (hashValue) {
							ref.DigestValue = hashValue;
						});
					}).GetIterator();
					return Promise.all(promises);
				});
			}
		}, {
			key: 'TransformSignedInfo',
			value: function TransformSignedInfo() {
				var t = CryptoConfig.CreateFromName(this.XmlSignature.SignedInfo.CanonicalizationMethod.Algorithm);
				var xml = this.XmlSignature.SignedInfo.GetXml();
				if (!xml) throw new XmlError(XE.XML_EXCEPTION, "Cannot get Xml element from SignedInfo");
				var node = xml.cloneNode(true);
				var namespaces = SelectNamespaces(xml);
				for (var i in namespaces) {
					var uri = namespaces[i];
					if (i === node.prefix) continue;
					node.setAttribute("xmlns" + (i ? ":" + i : ""), uri);
				}
				t.LoadInnerXml(node);
				var res = t.GetOutput();
				return res;
			}
		}, {
			key: 'ApplySignOptions',
			value: function ApplySignOptions(signature, algorithm, key) {
				var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

				return Promise.resolve().then(function () {
					// keyValue
					if (options.keyValue && key.algorithm.name.toUpperCase() !== HMAC) {
						if (!signature.KeyInfo) signature.KeyInfo = new KeyInfo();
						var keyInfo = signature.KeyInfo;
						var keyValue = new KeyValue();
						keyInfo.Add(keyValue);
						return keyValue.importKey(options.keyValue);
					} else return Promise.resolve();
				}).then(function () {
					// x509
					if (options.x509) {
						(function () {
							if (!signature.KeyInfo) signature.KeyInfo = new KeyInfo();
							var keyInfo = signature.KeyInfo;
							options.x509.forEach(function (x509) {
								var raw = Convert.FromBase64(x509);
								var x509Data = new KeyInfoX509Data(raw);
								keyInfo.Add(x509Data);
							});
						})();
					}
					return Promise.resolve();
				}).then(function () {
					// references
					if (options.references) {
						options.references.forEach(function (item) {
							var reference = new Reference();
							// Id
							if (item.id) reference.Id = item.id;
							// Uri
							if (item.uri) reference.Uri = item.uri;
							// Type
							if (item.type) reference.Type = item.type;
							// DigestMethod
							var _alg = typeof item.hash === "string" ? { name: item.hash } : item.hash;
							var digestAlgorithm = CryptoConfig.GetHashAlgorithm(_alg);
							reference.DigestMethod.Algorithm = digestAlgorithm.namespaceURI;
							// transforms
							if (item.transforms && item.transforms.length) {
								(function () {
									var transforms = new Transforms();
									item.transforms.forEach(function (transform) {
										switch (transform) {
											case "enveloped":
												transforms.Add(new XmlDsigEnvelopedSignatureTransform());
												break;
											case "c14n":
												transforms.Add(new XmlDsigC14NTransform());
												break;
											case "c14n-com":
												transforms.Add(new XmlDsigC14NWithCommentsTransform());
												break;
											case "exc-c14n":
												transforms.Add(new XmlDsigExcC14NTransform());
												break;
											case "exc-c14n-com":
												transforms.Add(new XmlDsigExcC14NWithCommentsTransform());
												break;
											case "base64":
												transforms.Add(new XmlDsigBase64Transform());
												break;
											default:
												throw new XmlError(XE.CRYPTOGRAPHIC_UNKNOWN_TRANSFORM, transform);
										}
									});
									reference.Transforms = transforms;
								})();
							}
							if (!signature.SignedInfo.References) signature.SignedInfo.References = new References();
							signature.SignedInfo.References.Add(reference);
						});
					}
					// Set default values
					if (!signature.SignedInfo.References.Count) {
						// Add default Reference
						var reference = new Reference();
						signature.SignedInfo.References.Add(reference);
					}
					return Promise.resolve();
				});
			}
		}, {
			key: 'Sign',
			value: function Sign(algorithm, key, data, options) {
				var _this131 = this;

				var alg = void 0;
				var signedInfo = void 0;
				return Promise.resolve().then(function () {
					var signingAlg = assign$1({}, key.algorithm, algorithm);
					alg = CryptoConfig.GetSignatureAlgorithm(signingAlg);
					return _this131.ApplySignOptions(_this131.XmlSignature, algorithm, key, options);
				}).then(function () {
					signedInfo = _this131.XmlSignature.SignedInfo;
					return _this131.DigestReferences(data.documentElement);
				}).then(function () {
					// Add signature method
					signedInfo.SignatureMethod.Algorithm = alg.namespaceURI;
					if (RSA_PSS.toUpperCase() === algorithm.name.toUpperCase()) {
						// Add RSA-PSS params
						var _alg = assign$1({}, key.algorithm, algorithm);
						if (typeof _alg.hash === "string") _alg.hash = { name: _alg.hash };
						var params = new PssAlgorithmParams(_alg);
						_this131.XmlSignature.SignedInfo.SignatureMethod.Any.Add(params);
					} else if (HMAC.toUpperCase() === algorithm.name.toUpperCase()) {
						// Add HMAC params
						var outputLength = 0;
						var hmacAlg = key.algorithm;
						switch (hmacAlg.hash.name.toUpperCase()) {
							case SHA1:
								outputLength = hmacAlg.length || 160;
								break;
							case SHA256:
								outputLength = hmacAlg.length || 256;
								break;
							case SHA384:
								outputLength = hmacAlg.length || 384;
								break;
							case SHA512:
								outputLength = hmacAlg.length || 512;
								break;
						}
						_this131.XmlSignature.SignedInfo.SignatureMethod.HMACOutputLength = outputLength;
					}
					var si = _this131.TransformSignedInfo();
					return alg.Sign(si, key, algorithm);
				}).then(function (signature) {
					_this131.Key = key;
					_this131.XmlSignature.SignatureValue = signature;
					_this131.document = data;
					return _this131.XmlSignature;
				});
			}
		}, {
			key: 'ValidateReferences',
			value: function ValidateReferences(doc) {
				var _this132 = this;

				return Promise.resolve().then(function () {
					return Promise.all(_this132.XmlSignature.SignedInfo.References.Map(function (ref) {
						return _this132.DigestReference(doc, ref, false).then(function (digest) {
							var b64Digest = Convert.ToBase64(digest);
							var b64DigestValue = Convert.ToString(ref.DigestValue, "base64");
							if (b64Digest !== b64DigestValue) {
								var err_text = 'Invalid digest for uri \'' + ref.Uri + '\'. Calculated digest is ' + b64Digest + ' but the xml to validate supplies digest ' + b64DigestValue;
								throw new XmlError(XE.CRYPTOGRAPHIC, err_text);
							}
							return Promise.resolve(true);
						});
					}).GetIterator());
				}).then(function () {
					return true;
				});
			}
		}, {
			key: 'ValidateSignatureValue',
			value: function ValidateSignatureValue(keys) {
				var _this133 = this;

				var signer = void 0;
				var signedInfoCanon = void 0;
				return Promise.resolve().then(function () {
					signedInfoCanon = _this133.TransformSignedInfo();
					signer = CryptoConfig.CreateSignatureAlgorithm(_this133.XmlSignature.SignedInfo.SignatureMethod);
					// Verify signature for all exported keys
					var chain = Promise.resolve(false);
					keys.forEach(function (key) {
						chain = chain.then(function (v) {
							if (!v) {
								return signer.Verify(signedInfoCanon, key, _this133.Signature);
							}
							return Promise.resolve(v);
						});
					});
					return chain;
				});
			}
		}, {
			key: 'Verify',
			value: function Verify(key) {
				var _this134 = this;

				return Promise.resolve().then(function () {
					var xml = _this134.document;
					if (!(xml && xml.documentElement)) throw new XmlError(XE.NULL_PARAM, "SignedXml", "document");
					return _this134.ValidateReferences(xml.documentElement);
				}).then(function (res) {
					if (res) {
						var promise = Promise.resolve([]);
						if (key) {
							promise = promise.then(function () {
								return [key];
							});
						} else {
							promise = promise.then(function () {
								return _this134.GetPublicKeys();
							});
						}
						return promise.then(function (keys) {
							return _this134.ValidateSignatureValue(keys);
						});
					} else return false;
				});
			}
		}, {
			key: 'GetXml',
			value: function GetXml() {
				return this.signature.GetXml();
			}
			/**
    * Loads a SignedXml state from an XML element.
    * @param  {Element | string} value The XML to load the SignedXml state from.
    * @returns void
    */

		}, {
			key: 'LoadXml',
			value: function LoadXml(value) {
				this.signature = Signature$$1.LoadXml(value);
			}
		}, {
			key: 'toString',
			value: function toString() {
				// Check for EnvelopedTransform
				var signature = this.XmlSignature;
				var enveloped = false;
				if (signature.SignedInfo.References) signature.SignedInfo.References.Some(function (ref) {
					if (ref.Transforms) ref.Transforms.Some(function (transform) {
						if (transform instanceof XmlDsigEnvelopedSignatureTransform) enveloped = true;
						return enveloped;
					});
					return enveloped;
				});
				if (enveloped) {
					var doc = this.document.documentElement.cloneNode(true);
					var _node3 = this.XmlSignature.GetXml();
					if (!_node3) throw new XmlError(XE.XML_EXCEPTION, "Cannot get Xml element from Signature");
					var sig = _node3.cloneNode(true);
					doc.appendChild(sig);
					return new XMLSerializer().serializeToString(doc);
				}
				return this.XmlSignature.toString();
			}
		}, {
			key: 'XmlSignature',
			get: function get() {
				return this.signature;
			}
		}, {
			key: 'Signature',
			get: function get() {
				return this.XmlSignature.SignatureValue;
			}
		}]);

		return SignedXml;
	}();

	function findById(element, id) {
		if (element.nodeType !== XmlNodeType.Element) return null;
		if (element.hasAttribute("Id") && element.getAttribute("Id") === id) return element;
		if (element.childNodes && element.childNodes.length) for (var i = 0; i < element.childNodes.length; i++) {
			var el = findById(element.childNodes[i], id);
			if (el) return el;
		}
		return null;
	}

	/**
  *
  * <xsd:element name="SigningCertificate" type="CertIDListType"/>
  * <xsd:complexType name="CertIDListType">
  *     <xsd:sequence>
  *         <xsd:element name="Cert" type="CertIDType" maxOccurs="unbounded"/>
  *     </xsd:sequence>
  * </xsd:complexType>
  * <xsd:complexType name="CertIDType">
  *     <xsd:sequence>
  *         <xsd:element name="CertDigest" type="DigestAlgAndValueType"/>
  *         <xsd:element name="IssuerSerial" type="ds:X509IssuerSerialType"/>
  *     </xsd:sequence>
  *     <xsd:attribute name="URI" type="xsd:anyURI" use="optional"/>
  * </xsd:complexType>
  * <xsd:complexType name="DigestAlgAndValueType">
  *     <xsd:sequence>
  *         <xsd:element ref="ds:DigestMethod"/>
  *         <xsd:element ref="ds:DigestValue"/>
  *     </xsd:sequence>
  * </xsd:complexType>
  *
  */
	var DigestAlgAndValueType = function (_super) {
		__extends(DigestAlgAndValueType, _super);
		function DigestAlgAndValueType() {
			return _super !== null && _super.apply(this, arguments) || this;
		}
		return DigestAlgAndValueType;
	}(XadesObject);
	__decorate([XmlChildElement({
		parser: DigestMethod,
		required: true
	})], DigestAlgAndValueType.prototype, "DigestMethod", void 0);
	__decorate([XmlChildElement({
		localName: XmlSignature.ElementNames.DigestValue,
		namespaceURI: XmlSignature.NamespaceURI,
		prefix: XmlSignature.DefaultPrefix,
		converter: XmlBase64Converter,
		required: true
	})], DigestAlgAndValueType.prototype, "DigestValue", void 0);
	DigestAlgAndValueType = __decorate([XmlElement({ localName: XmlXades.ElementNames.DigestAlgAndValue })], DigestAlgAndValueType);
	var IssuerSerial = function (_super) {
		__extends(IssuerSerial, _super);
		function IssuerSerial() {
			return _super !== null && _super.apply(this, arguments) || this;
		}
		return IssuerSerial;
	}(X509IssuerSerial);
	IssuerSerial = __decorate([XmlElement({ localName: XmlXades.ElementNames.IssuerSerial, namespaceURI: XmlXades.NamespaceURI, prefix: XmlXades.DefaultPrefix })], IssuerSerial);
	var Cert = function (_super) {
		__extends(Cert, _super);
		function Cert() {
			return _super !== null && _super.apply(this, arguments) || this;
		}
		return Cert;
	}(XadesObject);
	__decorate([XmlChildElement({ localName: XmlXades.ElementNames.CertDigest, parser: DigestAlgAndValueType, required: true })], Cert.prototype, "CertDigest", void 0);
	__decorate([XmlChildElement({ parser: IssuerSerial, required: true })], Cert.prototype, "IssuerSerial", void 0);
	__decorate([XmlAttribute({ localName: XmlXades.AttributeNames.URI })], Cert.prototype, "Uri", void 0);
	Cert = __decorate([XmlElement({ localName: XmlXades.ElementNames.Cert })], Cert);
	var CertIDList = function (_super) {
		__extends(CertIDList, _super);
		function CertIDList() {
			return _super !== null && _super.apply(this, arguments) || this;
		}
		return CertIDList;
	}(XadesCollection);
	CertIDList = __decorate([XmlElement({ localName: "CertIDList", parser: Cert })], CertIDList);
	var SigningCertificate = function (_super) {
		__extends(SigningCertificate, _super);
		function SigningCertificate() {
			return _super !== null && _super.apply(this, arguments) || this;
		}
		return SigningCertificate;
	}(CertIDList);
	SigningCertificate = __decorate([XmlElement({ localName: XmlXades.ElementNames.SigningCertificate })], SigningCertificate);

	/**
  *
  * <xsd:element name="CompleteCertificateRefs" type="CompleteCertificateRefsType"/>
  * <xsd:complexType name="CompleteCertificateRefsType">
  *     <xsd:sequence>
  *         <xsd:element name="CertRefs" type="CertIDListType"/>
  *     </xsd:sequence>
  *     <xsd:attribute name="Id" type="xsd:ID" use="optional"/>
  * </xsd:complexType>
  *
  */
	var CompleteCertificateRefs = function (_super) {
		__extends(CompleteCertificateRefs, _super);
		function CompleteCertificateRefs() {
			return _super !== null && _super.apply(this, arguments) || this;
		}
		return CompleteCertificateRefs;
	}(XadesObject);
	__decorate([XmlAttribute({ localName: XmlXades.AttributeNames.Id, defaultValue: "" })], CompleteCertificateRefs.prototype, "Id", void 0);
	__decorate([XmlChildElement({ localName: XmlXades.ElementNames.CertRefs, parser: CertIDList, required: true })], CompleteCertificateRefs.prototype, "CertRefs", void 0);
	CompleteCertificateRefs = __decorate([XmlElement({ localName: XmlXades.ElementNames.CompleteCertificateRefs })], CompleteCertificateRefs);

	var XmlDateTimeConverter = {
		/**
   * Converts value from Xml element to Date
   *
   * @memberOf XmlDateTimeConverter
   */
		set: function set(value) {
			return new Date(value);
		},
		/**
   * Converts value from Date to Xml element
   *
   * @memberOf XmlDateTimeConverter
   */
		get: function get(value) {
			if (value) {
				return value.toISOString();
			}
			return undefined;
		}
	};

	/**
  *
  * <xsd:element name="CompleteRevocationRefs" type="CompleteRevocationRefsType"/>
  * <xsd:complexType name="CompleteRevocationRefsType">
  *     <xsd:sequence>
  *         <xsd:element name="CRLRefs" type="CRLRefsType" minOccurs="0"/>
  *         <xsd:element name="OCSPRefs" type="OCSPRefsType" minOccurs="0"/>
  *         <xsd:element name="OtherRefs" type="OtherCertStatusRefsType" minOccurs="0"/>
  *     </xsd:sequence>
  *     <xsd:attribute name="Id" type="xsd:ID" use="optional"/>
  * </xsd:complexType>
  * <xsd:complexType name="CRLRefsType">
  *     <xsd:sequence>
  *         <xsd:element name="CRLRef" type="CRLRefType" maxOccurs="unbounded"/>
  *     </xsd:sequence>
  * </xsd:complexType>
  * <xsd:complexType name="CRLRefType">
  *     <xsd:sequence>
  *         <xsd:element name="DigestAlgAndValue" type="DigestAlgAndValueType"/>
  *         <xsd:element name="CRLIdentifier" type="CRLIdentifierType" minOccurs="0"/>
  *     </xsd:sequence>
  * </xsd:complexType>
  * <xsd:complexType name="CRLIdentifierType">
  *     <xsd:sequence>
  *         <xsd:element name="Issuer" type="xsd:string"/>
  *         <xsd:element name="IssueTime" type="xsd:dateTime"/>
  *         <xsd:element name="Number" type="xsd:integer" minOccurs="0"/>
  *     </xsd:sequence>
  *     <xsd:attribute name="URI" type="xsd:anyURI" use="optional"/>
  * </xsd:complexType>
  * <xsd:complexType name="OCSPRefsType">
  *     <xsd:sequence>
  *         <xsd:element name="OCSPRef" type="OCSPRefType" maxOccurs="unbounded"/>
  *     </xsd:sequence>
  * </xsd:complexType>
  * <xsd:complexType name="OCSPRefType">
  *     <xsd:sequence>
  *         <xsd:element name="OCSPIdentifier" type="OCSPIdentifierType"/>
  *         <xsd:element name="DigestAlgAndValue" type="DigestAlgAndValueType" minOccurs="0"/>
  *     </xsd:sequence>
  * </xsd:complexType>
  * <xsd:complexType name="ResponderIDType">
  *     <xsd:choice>
  *         <xsd:element name="ByName" type="xsd:string"/>
  *         <xsd:element name="ByKey" type="xsd:base64Binary"/>
  *     </xsd:choice>
  * </xsd:complexType>
  * <xsd:complexType name="OCSPIdentifierType">
  *     <xsd:sequence>
  *         <xsd:element name="ResponderID" type="ResponderIDType"/>
  *         <xsd:element name="ProducedAt" type="xsd:dateTime"/>
  *     </xsd:sequence>
  *     <xsd:attribute name="URI" type="xsd:anyURI" use="optional"/>
  * </xsd:complexType>
  * <xsd:complexType name="OtherCertStatusRefsType">
  *     <xsd:sequence>
  *         <xsd:element name="OtherRef" type="AnyType" maxOccurs="unbounded"/>
  *     </xsd:sequence>
  * </xsd:complexType>
  *
  */
	var OtherRef = function (_super) {
		__extends(OtherRef, _super);
		function OtherRef() {
			return _super !== null && _super.apply(this, arguments) || this;
		}
		return OtherRef;
	}(Any);
	OtherRef = __decorate([XmlElement({ localName: XmlXades.ElementNames.OtherRef })], OtherRef);
	var OtherRefs = function (_super) {
		__extends(OtherRefs, _super);
		function OtherRefs() {
			return _super !== null && _super.apply(this, arguments) || this;
		}
		return OtherRefs;
	}(XadesCollection);
	OtherRefs = __decorate([XmlElement({ localName: XmlXades.ElementNames.OtherRefs })], OtherRefs);
	var ResponderID = function (_super) {
		__extends(ResponderID, _super);
		function ResponderID() {
			return _super !== null && _super.apply(this, arguments) || this;
		}
		return ResponderID;
	}(XadesObject);
	__decorate([XmlChildElement({
		localName: XmlXades.ElementNames.ByName,
		namespaceURI: XmlXades.NamespaceURI,
		prefix: XmlXades.DefaultPrefix,
		required: true
	})], ResponderID.prototype, "ByName", void 0);
	__decorate([XmlChildElement({
		localName: XmlXades.ElementNames.ByKey,
		namespaceURI: XmlXades.NamespaceURI,
		prefix: XmlXades.DefaultPrefix,
		converter: XmlBase64Converter,
		required: true
	})], ResponderID.prototype, "ByKey", void 0);
	ResponderID = __decorate([XmlElement({ localName: XmlXades.ElementNames.OCSPIdentifier })], ResponderID);
	var OCSPIdentifier = function (_super) {
		__extends(OCSPIdentifier, _super);
		function OCSPIdentifier() {
			return _super !== null && _super.apply(this, arguments) || this;
		}
		return OCSPIdentifier;
	}(XadesObject);
	__decorate([XmlAttribute({ localName: XmlXades.AttributeNames.URI, defaultValue: "" })], OCSPIdentifier.prototype, "URI", void 0);
	__decorate([XmlChildElement({ parser: ResponderID, required: true })], OCSPIdentifier.prototype, "ResponderID", void 0);
	__decorate([XmlChildElement({
		localName: XmlXades.ElementNames.IssueTime,
		namespaceURI: XmlXades.NamespaceURI,
		prefix: XmlXades.DefaultPrefix,
		converter: XmlDateTimeConverter,
		required: true
	})], OCSPIdentifier.prototype, "ProducedAt", void 0);
	OCSPIdentifier = __decorate([XmlElement({ localName: XmlXades.ElementNames.OCSPIdentifier })], OCSPIdentifier);
	var OCSPRef = function (_super) {
		__extends(OCSPRef, _super);
		function OCSPRef() {
			return _super !== null && _super.apply(this, arguments) || this;
		}
		return OCSPRef;
	}(XadesObject);
	__decorate([XmlChildElement({ parser: OCSPIdentifier })], OCSPRef.prototype, "OCSPIdentifier", void 0);
	__decorate([XmlChildElement({ parser: DigestAlgAndValueType, required: true })], OCSPRef.prototype, "DigestAlgAndValue", void 0);
	OCSPRef = __decorate([XmlElement({ localName: XmlXades.ElementNames.OCSPRef })], OCSPRef);
	var OCSPRefs = function (_super) {
		__extends(OCSPRefs, _super);
		function OCSPRefs() {
			return _super !== null && _super.apply(this, arguments) || this;
		}
		return OCSPRefs;
	}(XadesCollection);
	OCSPRefs = __decorate([XmlElement({ localName: XmlXades.ElementNames.OCSPRefs })], OCSPRefs);
	var CRLIdentifier = function (_super) {
		__extends(CRLIdentifier, _super);
		function CRLIdentifier() {
			return _super !== null && _super.apply(this, arguments) || this;
		}
		return CRLIdentifier;
	}(XadesObject);
	__decorate([XmlAttribute({ localName: XmlXades.AttributeNames.URI, defaultValue: "" })], CRLIdentifier.prototype, "URI", void 0);
	__decorate([XmlChildElement({
		localName: XmlXades.ElementNames.Issuer,
		namespaceURI: XmlXades.NamespaceURI,
		prefix: XmlXades.DefaultPrefix,
		required: true
	})], CRLIdentifier.prototype, "Issuer", void 0);
	__decorate([XmlChildElement({
		localName: XmlXades.ElementNames.IssueTime,
		namespaceURI: XmlXades.NamespaceURI,
		prefix: XmlXades.DefaultPrefix,
		converter: XmlDateTimeConverter,
		required: true
	})], CRLIdentifier.prototype, "IssueTime", void 0);
	__decorate([XmlChildElement({
		localName: XmlXades.ElementNames.Number,
		namespaceURI: XmlXades.NamespaceURI,
		prefix: XmlXades.DefaultPrefix,
		converter: XmlNumberConverter
	})], CRLIdentifier.prototype, "Number", void 0);
	CRLIdentifier = __decorate([XmlElement({ localName: XmlXades.ElementNames.CRLIdentifier })], CRLIdentifier);
	var CRLRef = function (_super) {
		__extends(CRLRef, _super);
		function CRLRef() {
			return _super !== null && _super.apply(this, arguments) || this;
		}
		return CRLRef;
	}(XadesObject);
	__decorate([XmlChildElement({ parser: DigestAlgAndValueType, required: true })], CRLRef.prototype, "DigestAlgAndValue", void 0);
	__decorate([XmlChildElement({ parser: CRLIdentifier })], CRLRef.prototype, "CRLIdentifier", void 0);
	CRLRef = __decorate([XmlElement({ localName: XmlXades.ElementNames.CRLRef })], CRLRef);
	var CRLRefs = function (_super) {
		__extends(CRLRefs, _super);
		function CRLRefs() {
			return _super !== null && _super.apply(this, arguments) || this;
		}
		return CRLRefs;
	}(XadesCollection);
	CRLRefs = __decorate([XmlElement({ localName: XmlXades.ElementNames.CRLRefs })], CRLRefs);
	var CompleteRevocationRefs = function (_super) {
		__extends(CompleteRevocationRefs, _super);
		function CompleteRevocationRefs() {
			return _super !== null && _super.apply(this, arguments) || this;
		}
		return CompleteRevocationRefs;
	}(XadesObject);
	__decorate([XmlAttribute({ localName: XmlXades.AttributeNames.Id, defaultValue: "" })], CompleteRevocationRefs.prototype, "Id", void 0);
	__decorate([XmlChildElement({ parser: CRLRefs })], CompleteRevocationRefs.prototype, "CRLRefs", void 0);
	__decorate([XmlChildElement({ parser: OCSPRefs })], CompleteRevocationRefs.prototype, "OCSPRefs", void 0);
	__decorate([XmlChildElement({ parser: OtherRefs })], CompleteRevocationRefs.prototype, "OtherRefs", void 0);
	CompleteRevocationRefs = __decorate([XmlElement({ localName: XmlXades.ElementNames.CompleteRevocationRefs })], CompleteRevocationRefs);

	/**
  *
  * <xsd:element name="CounterSignature" type="CounterSignatureType"/>
  * <xsd:complexType name="CounterSignatureType">
  *     <xsd:sequence>
  *         <xsd:element ref="ds:Signature"/>
  *     </xsd:sequence>
  * </xsd:complexType>
  *
  */
	var CounterSignature = function (_super) {
		__extends(CounterSignature, _super);
		function CounterSignature() {
			return _super !== null && _super.apply(this, arguments) || this;
		}
		return CounterSignature;
	}(XadesObject);
	__decorate([XmlChildElement({ parser: Signature$$1, required: true })], CounterSignature.prototype, "Signature", void 0);
	CounterSignature = __decorate([XmlElement({ localName: XmlXades.ElementNames.CounterSignature })], CounterSignature);

	/**
  *
  * <xsd:element name="DataObjectFormat" type="DataObjectFormatType"/>
  * <xsd:complexType name="DataObjectFormatType">
  *     <xsd:sequence>
  *         <xsd:element name="Description" type="xsd:string" minOccurs="0"/>
  *         <xsd:element name="ObjectIdentifier" type="ObjectIdentifierType" minOccurs="0"/>
  *         <xsd:element name="MimeType" type="xsd:string" minOccurs="0"/>
  *         <xsd:element name="Encoding" type="xsd:anyURI" minOccurs="0"/>
  *     </xsd:sequence>
  *     <xsd:attribute name="ObjectReference" type="xsd:anyURI" use="required"/>
  * </xsd:complexType>
  *
  */
	var DataObjectFormat = function (_super) {
		__extends(DataObjectFormat, _super);
		function DataObjectFormat() {
			return _super !== null && _super.apply(this, arguments) || this;
		}
		return DataObjectFormat;
	}(XadesObject);
	__decorate([XmlAttribute({ localName: XmlXades.AttributeNames.ObjectReference, required: true })], DataObjectFormat.prototype, "ObjectReference", void 0);
	__decorate([XmlChildElement({ localName: XmlXades.ElementNames.Description, namespaceURI: XmlXades.NamespaceURI, prefix: XmlXades.DefaultPrefix })], DataObjectFormat.prototype, "Description", void 0);
	__decorate([XmlChildElement({ parser: ObjectIdentifier })], DataObjectFormat.prototype, "ObjectIdentifier", void 0);
	__decorate([XmlChildElement({ localName: XmlXades.ElementNames.MimeType, namespaceURI: XmlXades.NamespaceURI, prefix: XmlXades.DefaultPrefix })], DataObjectFormat.prototype, "MimeType", void 0);
	__decorate([XmlChildElement({ localName: XmlXades.ElementNames.Encoding, namespaceURI: XmlXades.NamespaceURI, prefix: XmlXades.DefaultPrefix })], DataObjectFormat.prototype, "Encoding", void 0);
	DataObjectFormat = __decorate([XmlElement({ localName: XmlXades.ElementNames.DataObjectFormat })], DataObjectFormat);

	/**
  *
  * <xsd:element name="Include" type="IncludeType"/>
  * <xsd:complexType name="IncludeType">
  *   <xsd:attribute name="URI" type="xsd:anyURI" use="required"/>
  *   <xsd:attribute name="referencedData" type="xsd:boolean" use="optional"/>
  * </xsd:complexType>
  * <xsd:element name="ReferenceInfo" type="ReferenceInfoType"/>
  * <xsd:complexType name="ReferenceInfoType">
  *   <xsd:sequence>
  *     <xsd:element ref="ds:DigestMethod"/>
  *     <xsd:element ref="ds:DigestValue"/>
  *   </xsd:sequence>
  *   <xsd:attribute name="Id" type="xsd:ID" use="optional"/>
  *   <xsd:attribute name="URI" type="xsd:anyURI" use="optional"/>
  * </xsd:complexType>
  * <xsd:complexType name="GenericTimeStampType" abstract="true">
  *   <xsd:sequence>
  *     <xsd:choice minOccurs="0">
  *       <xsd:element ref="Include" minOccurs="0" maxOccurs="unbounded"/>
  *       <xsd:element ref="ReferenceInfo" maxOccurs="unbounded"/>
  *     </xsd:choice>
  *     <xsd:element ref="ds:CanonicalizationMethod" minOccurs="0"/>
  *     <xsd:choice maxOccurs="unbounded">
  *       <xsd:element name="EncapsulatedTimeStamp" type="EncapsulatedPKIDataType"/>
  *       <xsd:element name="XMLTimeStamp" type="AnyType"/>
  *     </xsd:choice>
  *   </xsd:sequence>
  *   <xsd:attribute name="Id" type="xsd:ID" use="optional"/>
  * </xsd:complexType>
  *
  */
	var Include = function (_super) {
		__extends(Include, _super);
		function Include() {
			return _super !== null && _super.apply(this, arguments) || this;
		}
		return Include;
	}(XadesObject);
	__decorate([XmlAttribute({
		localName: XmlXades.AttributeNames.URI,
		defaultValue: "",
		required: true
	})], Include.prototype, "Uri", void 0);
	__decorate([XmlAttribute({
		localName: XmlXades.AttributeNames.ReferencedData,
		defaultValue: false
	})], Include.prototype, "ReferencedData", void 0);
	Include = __decorate([XmlElement({
		localName: XmlXades.ElementNames.Include
	})], Include);
	var ReferenceInfo = function (_super) {
		__extends(ReferenceInfo, _super);
		function ReferenceInfo() {
			return _super !== null && _super.apply(this, arguments) || this;
		}
		return ReferenceInfo;
	}(XadesObject);
	__decorate([XmlAttribute({ localName: XmlXades.AttributeNames.URI, defaultValue: "" })], ReferenceInfo.prototype, "Uri", void 0);
	__decorate([XmlAttribute({ localName: XmlXades.AttributeNames.Id, defaultValue: "" })], ReferenceInfo.prototype, "Id", void 0);
	__decorate([XmlChildElement({
		localName: XmlSignature.ElementNames.DigestMethod,
		namespaceURI: XmlSignature.NamespaceURI,
		prefix: XmlSignature.DefaultPrefix,
		required: true
	})], ReferenceInfo.prototype, "DigestMethod", void 0);
	__decorate([XmlChildElement({
		localName: XmlSignature.ElementNames.DigestMethod,
		namespaceURI: XmlSignature.NamespaceURI,
		prefix: XmlSignature.DefaultPrefix,
		converter: XmlBase64Converter,
		required: true
	})], ReferenceInfo.prototype, "DigestValue", void 0);
	ReferenceInfo = __decorate([XmlElement({
		localName: XmlXades.ElementNames.ReferenceInfo
	})], ReferenceInfo);
	var ReferenceInfos = function (_super) {
		__extends(ReferenceInfos, _super);
		function ReferenceInfos() {
			return _super !== null && _super.apply(this, arguments) || this;
		}
		return ReferenceInfos;
	}(XadesCollection);
	ReferenceInfos = __decorate([XmlElement({ localName: "ReferenceInfos", parser: ReferenceInfo })], ReferenceInfos);
	var EncapsulatedTimeStamp = function (_super) {
		__extends(EncapsulatedTimeStamp, _super);
		function EncapsulatedTimeStamp() {
			return _super !== null && _super.apply(this, arguments) || this;
		}
		return EncapsulatedTimeStamp;
	}(EncapsulatedPKIData);
	EncapsulatedTimeStamp = __decorate([XmlElement({ localName: XmlXades.ElementNames.EncapsulatedTimeStamp })], EncapsulatedTimeStamp);
	var EncapsulatedTimeStampCollection = function (_super) {
		__extends(EncapsulatedTimeStampCollection, _super);
		function EncapsulatedTimeStampCollection() {
			return _super !== null && _super.apply(this, arguments) || this;
		}
		return EncapsulatedTimeStampCollection;
	}(XadesCollection);
	EncapsulatedTimeStampCollection = __decorate([XmlElement({ localName: "EncapsulatedPKIDatas", parser: EncapsulatedTimeStamp })], EncapsulatedTimeStampCollection);
	var XMLTimeStamp = function (_super) {
		__extends(XMLTimeStamp, _super);
		function XMLTimeStamp() {
			return _super !== null && _super.apply(this, arguments) || this;
		}
		return XMLTimeStamp;
	}(Any);
	XMLTimeStamp = __decorate([XmlElement({ localName: XmlXades.ElementNames.XMLTimeStamp })], XMLTimeStamp);
	var XMLTimeStampCollection = function (_super) {
		__extends(XMLTimeStampCollection, _super);
		function XMLTimeStampCollection() {
			return _super !== null && _super.apply(this, arguments) || this;
		}
		return XMLTimeStampCollection;
	}(XadesCollection);
	XMLTimeStampCollection = __decorate([XmlElement({ localName: "XMLTimeStampCollection", parser: XMLTimeStamp })], XMLTimeStampCollection);
	var GenericTimeStamp = function (_super) {
		__extends(GenericTimeStamp, _super);
		function GenericTimeStamp() {
			return _super !== null && _super.apply(this, arguments) || this;
		}
		return GenericTimeStamp;
	}(XadesObject);
	__decorate([XmlAttribute({ localName: XmlXades.AttributeNames.Id, defaultValue: "" })], GenericTimeStamp.prototype, "Id", void 0);
	__decorate([XmlChildElement({ parser: Include })], GenericTimeStamp.prototype, "Include", void 0);
	__decorate([XmlChildElement({ parser: ReferenceInfos, noRoot: true })], GenericTimeStamp.prototype, "ReferenceInfo", void 0);
	__decorate([XmlChildElement({ parser: CanonicalizationMethod })], GenericTimeStamp.prototype, "CanonicalizationMethod", void 0);
	__decorate([XmlChildElement({ parser: EncapsulatedTimeStampCollection, noRoot: true })], GenericTimeStamp.prototype, "EncapsulatedTimeStamp", void 0);
	__decorate([XmlChildElement({ parser: XMLTimeStampCollection, noRoot: true })], GenericTimeStamp.prototype, "XMLTimeStamp", void 0);
	GenericTimeStamp = __decorate([XmlElement({
		localName: "GenericTimeStamp"
	})], GenericTimeStamp);

	/**
  *
  * <xsd:element name="OtherTimeStamp" type="OtherTimeStampType"/>
  * <xsd:complexType name="OtherTimeStampType">
  *     <xsd:complexContent>
  *         <xsd:restriction base="GenericTimeStampType">
  *             <xsd:sequence>
  *                 <xsd:element ref="ReferenceInfo" maxOccurs="unbounded"/>
  *                 <xsd:element ref="ds:CanonicalizationMethod" minOccurs="0"/>
  *                 <xsd:choice>
  *                     <xsd:element name="EncapsulatedTimeStamp" type="EncapsulatedPKIDataType"/>
  *                     <xsd:element name="XMLTimeStamp" type="AnyType"/>
  *                 </xsd:choice>
  *             </xsd:sequence>
  *             <xsd:attribute name="Id" type="xsd:ID" use="optional"/>
  *         </xsd:restriction>
  *     </xsd:complexContent>
  * </xsd:complexType>
  *
  */
	var OtherTimeStamp = function (_super) {
		__extends(OtherTimeStamp, _super);
		function OtherTimeStamp() {
			return _super !== null && _super.apply(this, arguments) || this;
		}
		return OtherTimeStamp;
	}(XadesObject);
	__decorate([XmlAttribute({ localName: XmlXades.AttributeNames.Id, defaultValue: "" })], OtherTimeStamp.prototype, "Id", void 0);
	__decorate([XmlChildElement({ parser: ReferenceInfos, noRoot: true })], OtherTimeStamp.prototype, "ReferenceInfo", void 0);
	__decorate([XmlChildElement({ parser: CanonicalizationMethod })], OtherTimeStamp.prototype, "CanonicalizationMethod", void 0);
	__decorate([XmlChildElement({ parser: EncapsulatedTimeStampCollection, noRoot: true })], OtherTimeStamp.prototype, "EncapsulatedTimeStamp", void 0);
	__decorate([XmlChildElement({ parser: XMLTimeStampCollection, noRoot: true })], OtherTimeStamp.prototype, "XMLTimeStamp", void 0);
	OtherTimeStamp = __decorate([XmlElement({
		localName: XmlXades.ElementNames.OtherTimeStamp
	})], OtherTimeStamp);

	/**
  *
  * <xsd:element name="SignaturePolicyIdentifier" type="SignaturePolicyIdentifierType"/>
  * <xsd:complexType name="SignaturePolicyIdentifierType">
  *     <xsd:choice>
  *         <xsd:element name="SignaturePolicyId" type="SignaturePolicyIdType"/>
  *         <xsd:element name="SignaturePolicyImplied"/>
  *     </xsd:choice>
  * </xsd:complexType>
  * <xsd:complexType name="SignaturePolicyIdType">
  *     <xsd:sequence>
  *         <xsd:element name="SigPolicyId" type="ObjectIdentifierType"/>
  *         <xsd:element ref="ds:Transforms" minOccurs="0"/>
  *         <xsd:element name="SigPolicyHash" type="DigestAlgAndValueType"/>
  *         <xsd:element name="SigPolicyQualifiers" type="SigPolicyQualifiersListType" minOccurs="0"/>
  *     </xsd:sequence>
  * </xsd:complexType>
  * <xsd:complexType name="SigPolicyQualifiersListType">
  *     <xsd:sequence>
  *         <xsd:element name="SigPolicyQualifier" type="AnyType" maxOccurs="unbounded"/>
  *     </xsd:sequence>
  * </xsd:complexType>
  * <xsd:element name="SPURI" type="xsd:anyURI"/>
  * <xsd:element name="SPUserNotice" type="SPUserNoticeType"/>
  * <xsd:complexType name="SPUserNoticeType">
  *     <xsd:sequence>
  *         <xsd:element name="NoticeRef" type="NoticeReferenceType" minOccurs="0"/>
  *         <xsd:element name="ExplicitText" type="xsd:string" minOccurs="0"/>
  *     </xsd:sequence>
  * </xsd:complexType>
  * <xsd:complexType name="NoticeReferenceType">
  *     <xsd:sequence>
  *         <xsd:element name="Organization" type="xsd:string"/>
  *         <xsd:element name="NoticeNumbers" type="IntegerListType"/>
  *     </xsd:sequence>
  * </xsd:complexType>
  * <xsd:complexType name="IntegerListType">
  *     <xsd:sequence>
  *         <xsd:element name="int" type="xsd:integer" minOccurs="0" maxOccurs="unbounded"/>
  *     </xsd:sequence>
  * </xsd:complexType>
  *
  */
	var Integer$1 = function (_super) {
		__extends(Integer, _super);
		function Integer() {
			return _super !== null && _super.apply(this, arguments) || this;
		}
		return Integer;
	}(XadesObject);
	__decorate([XmlContent({ converter: XmlNumberConverter, required: true })], Integer$1.prototype, "Value", void 0);
	Integer$1 = __decorate([XmlElement({ localName: "int" })], Integer$1);
	var IntegerList = function (_super) {
		__extends(IntegerList, _super);
		function IntegerList() {
			return _super !== null && _super.apply(this, arguments) || this;
		}
		return IntegerList;
	}(XadesCollection);
	IntegerList = __decorate([XmlElement({ localName: "IntegerList", parser: Integer$1 })], IntegerList);
	var NoticeReference = function (_super) {
		__extends(NoticeReference, _super);
		function NoticeReference() {
			return _super !== null && _super.apply(this, arguments) || this;
		}
		return NoticeReference;
	}(XadesObject);
	__decorate([XmlChildElement({
		localName: XmlXades.ElementNames.Organization,
		namespaceURI: XmlXades.NamespaceURI,
		prefix: XmlXades.DefaultPrefix,
		required: true
	})], NoticeReference.prototype, "Organization", void 0);
	__decorate([XmlChildElement({ localName: XmlXades.ElementNames.NoticeNumbers, parser: IntegerList, required: true })], NoticeReference.prototype, "NoticeNumbers", void 0);
	NoticeReference = __decorate([XmlElement({ localName: XmlXades.ElementNames.NoticeRef })], NoticeReference);
	var SPUserNotice = function (_super) {
		__extends(SPUserNotice, _super);
		function SPUserNotice() {
			return _super !== null && _super.apply(this, arguments) || this;
		}
		return SPUserNotice;
	}(XadesObject);
	__decorate([XmlChildElement({ localName: XmlXades.ElementNames.NoticeRef, parser: NoticeReference })], SPUserNotice.prototype, "NoticeRef", void 0);
	__decorate([XmlChildElement({
		localName: XmlXades.ElementNames.ExplicitText,
		namespaceURI: XmlXades.NamespaceURI,
		prefix: XmlXades.DefaultPrefix
	})], SPUserNotice.prototype, "ExplicitText", void 0);
	SPUserNotice = __decorate([XmlElement({ localName: XmlXades.ElementNames.SPUserNotice })], SPUserNotice);
	var SigPolicyQualifier = function (_super) {
		__extends(SigPolicyQualifier, _super);
		function SigPolicyQualifier() {
			return _super !== null && _super.apply(this, arguments) || this;
		}
		return SigPolicyQualifier;
	}(Any);
	SigPolicyQualifier = __decorate([XmlElement({ localName: XmlXades.ElementNames.SigPolicyQualifier })], SigPolicyQualifier);
	var SigPolicyQualifiers = function (_super) {
		__extends(SigPolicyQualifiers, _super);
		function SigPolicyQualifiers() {
			return _super !== null && _super.apply(this, arguments) || this;
		}
		return SigPolicyQualifiers;
	}(XadesCollection);
	SigPolicyQualifiers = __decorate([XmlElement({ localName: XmlXades.ElementNames.SigPolicyQualifiers, parser: SigPolicyQualifier })], SigPolicyQualifiers);
	var SignaturePolicyId = function (_super) {
		__extends(SignaturePolicyId, _super);
		function SignaturePolicyId() {
			return _super !== null && _super.apply(this, arguments) || this;
		}
		return SignaturePolicyId;
	}(XadesObject);
	__decorate([XmlChildElement({ localName: XmlXades.ElementNames.SigPolicyId, parser: ObjectIdentifier, required: true })], SignaturePolicyId.prototype, "SigPolicyId", void 0);
	__decorate([XmlChildElement({ parser: Transforms })], SignaturePolicyId.prototype, "Transforms", void 0);
	__decorate([XmlChildElement({ localName: XmlXades.ElementNames.SigPolicyHash, parser: DigestAlgAndValueType, required: true })], SignaturePolicyId.prototype, "SigPolicyHash", void 0);
	__decorate([XmlChildElement({ localName: XmlXades.ElementNames.SigPolicyQualifiers, parser: SigPolicyQualifiers })], SignaturePolicyId.prototype, "SigPolicyQualifiers", void 0);
	SignaturePolicyId = __decorate([XmlElement({ localName: XmlXades.ElementNames.SignaturePolicyId })], SignaturePolicyId);
	var XmlSignaturePolicyImpliedConverter = {
		set: function set(value) {
			// if SignaturePolicyImplied exists then return true
			return true;
		},
		get: function get(value) {
			return "";
		}
	};
	var SignaturePolicyIdentifier = function (_super) {
		__extends(SignaturePolicyIdentifier, _super);
		function SignaturePolicyIdentifier() {
			return _super !== null && _super.apply(this, arguments) || this;
		}
		return SignaturePolicyIdentifier;
	}(XadesObject);
	__decorate([XmlChildElement({
		localName: XmlXades.ElementNames.SignaturePolicyId,
		namespaceURI: XmlXades.NamespaceURI,
		prefix: XmlXades.DefaultPrefix,
		parser: SignaturePolicyId
	})], SignaturePolicyIdentifier.prototype, "SignaturePolicyId", void 0);
	__decorate([XmlChildElement({
		localName: XmlXades.ElementNames.SignaturePolicyImplied,
		namespaceURI: XmlXades.NamespaceURI,
		prefix: XmlXades.DefaultPrefix,
		converter: XmlSignaturePolicyImpliedConverter,
		defaultValue: false
	})], SignaturePolicyIdentifier.prototype, "SignaturePolicyImplied", void 0);
	SignaturePolicyIdentifier = __decorate([XmlElement({ localName: XmlXades.ElementNames.SignaturePolicyIdentifier })], SignaturePolicyIdentifier);

	/**
  *
  * <xsd:element name="SignatureProductionPlace" type="SignatureProductionPlaceType"/>
  * <xsd:complexType name="SignatureProductionPlaceType">
  *     <xsd:sequence>
  *         <xsd:element name="City" type="xsd:string" minOccurs="0"/>
  *         <xsd:element name="StateOrProvince" type="xsd:string" minOccurs="0"/>
  *         <xsd:element name="PostalCode" type="xsd:string" minOccurs="0"/>
  *         <xsd:element name="CountryName" type="xsd:string" minOccurs="0"/>
  *     </xsd:sequence>
  * </xsd:complexType>
  *
  */
	var SignatureProductionPlace = function (_super) {
		__extends(SignatureProductionPlace, _super);
		function SignatureProductionPlace() {
			return _super !== null && _super.apply(this, arguments) || this;
		}
		return SignatureProductionPlace;
	}(XadesObject);
	__decorate([XmlChildElement({
		localName: XmlXades.ElementNames.City,
		defaultValue: "",
		namespaceURI: XmlXades.NamespaceURI,
		prefix: XmlXades.DefaultPrefix
	})], SignatureProductionPlace.prototype, "City", void 0);
	__decorate([XmlChildElement({
		localName: XmlXades.ElementNames.StateOrProvince,
		defaultValue: "",
		namespaceURI: XmlXades.NamespaceURI,
		prefix: XmlXades.DefaultPrefix
	})], SignatureProductionPlace.prototype, "StateOrProvince", void 0);
	__decorate([XmlChildElement({
		localName: XmlXades.ElementNames.PostalCode,
		defaultValue: "",
		namespaceURI: XmlXades.NamespaceURI,
		prefix: XmlXades.DefaultPrefix
	})], SignatureProductionPlace.prototype, "PostalCode", void 0);
	__decorate([XmlChildElement({
		localName: XmlXades.ElementNames.CountryName,
		defaultValue: "",
		namespaceURI: XmlXades.NamespaceURI,
		prefix: XmlXades.DefaultPrefix
	})], SignatureProductionPlace.prototype, "CountryName", void 0);
	SignatureProductionPlace = __decorate([XmlElement({ localName: XmlXades.ElementNames.SignatureProductionPlace })], SignatureProductionPlace);

	/**
  *
  * <xsd:element name="SignerRole" type="SignerRoleType"/>
  * <xsd:complexType name="SignerRoleType">
  *     <xsd:sequence>
  *         <xsd:element name="ClaimedRoles" type="ClaimedRolesListType" minOccurs="0"/>
  *         <xsd:element name="CertifiedRoles" type="CertifiedRolesListType" minOccurs="0"/>
  *     </xsd:sequence>
  * </xsd:complexType>
  * <xsd:complexType name="ClaimedRolesListType">
  *     <xsd:sequence>
  *         <xsd:element name="ClaimedRole" type="AnyType" maxOccurs="unbounded"/>
  *     </xsd:sequence>
  * </xsd:complexType>
  * <xsd:complexType name="CertifiedRolesListType">
  *     <xsd:sequence>
  *         <xsd:element name="CertifiedRole" type="EncapsulatedPKIDataType" maxOccurs="unbounded"/>
  *     </xsd:sequence>
  * </xsd:complexType>
  *
  */
	var ClaimedRole = function (_super) {
		__extends(ClaimedRole, _super);
		function ClaimedRole() {
			return _super !== null && _super.apply(this, arguments) || this;
		}
		return ClaimedRole;
	}(Any);
	ClaimedRole = __decorate([XmlElement({ localName: XmlXades.ElementNames.ClaimedRole })], ClaimedRole);
	var ClaimedRoles = function (_super) {
		__extends(ClaimedRoles, _super);
		function ClaimedRoles() {
			return _super !== null && _super.apply(this, arguments) || this;
		}
		return ClaimedRoles;
	}(XadesCollection);
	ClaimedRoles = __decorate([XmlElement({ localName: XmlXades.ElementNames.ClaimedRoles, parser: ClaimedRole })], ClaimedRoles);
	var CertifiedRole = function (_super) {
		__extends(CertifiedRole, _super);
		function CertifiedRole() {
			return _super !== null && _super.apply(this, arguments) || this;
		}
		return CertifiedRole;
	}(EncapsulatedPKIData);
	CertifiedRole = __decorate([XmlElement({ localName: XmlXades.ElementNames.CertifiedRole })], CertifiedRole);
	var CertifiedRoles = function (_super) {
		__extends(CertifiedRoles, _super);
		function CertifiedRoles() {
			return _super !== null && _super.apply(this, arguments) || this;
		}
		return CertifiedRoles;
	}(XadesCollection);
	CertifiedRoles = __decorate([XmlElement({ localName: XmlXades.ElementNames.CertifiedRoles, parser: CertifiedRole })], CertifiedRoles);
	var SignerRole = function (_super) {
		__extends(SignerRole, _super);
		function SignerRole() {
			return _super !== null && _super.apply(this, arguments) || this;
		}
		return SignerRole;
	}(XadesObject);
	__decorate([XmlChildElement({ parser: ClaimedRoles })], SignerRole.prototype, "ClaimedRoles", void 0);
	__decorate([XmlChildElement({ parser: CertifiedRoles })], SignerRole.prototype, "CertifiedRoles", void 0);
	SignerRole = __decorate([XmlElement({ localName: XmlXades.ElementNames.SignerRole })], SignerRole);

	/**
  *
  * <xsd:element name="SignedSignatureProperties" type="SignedSignaturePropertiesType"/>
  * <xsd:complexType name="SignedSignaturePropertiesType">
  *     <xsd:sequence>
  *         <xsd:element name="SigningTime" type="xsd:dateTime" minOccurs="0"/>
  *         <xsd:element name="SigningCertificate" type="CertIDListType" minOccurs="0"/>
  *         <xsd:element name="SignaturePolicyIdentifier" type="SignaturePolicyIdentifierType" minOccurs="0"/>
  *         <xsd:element name="SignatureProductionPlace" type="SignatureProductionPlaceType" minOccurs="0"/>
  *         <xsd:element name="SignerRole" type="SignerRoleType" minOccurs="0"/>
  *     </xsd:sequence>
  *     <xsd:attribute name="Id" type="xsd:ID" use="optional"/>
  * </xsd:complexType>
  *
  */
	var SignedSignatureProperties = function (_super) {
		__extends(SignedSignatureProperties, _super);
		function SignedSignatureProperties() {
			return _super !== null && _super.apply(this, arguments) || this;
		}
		return SignedSignatureProperties;
	}(XadesObject);
	__decorate([XmlAttribute({ localName: XmlXades.AttributeNames.Id, defaultValue: "" })], SignedSignatureProperties.prototype, "Id", void 0);
	__decorate([XmlChildElement({
		localName: XmlXades.ElementNames.SigningTime,
		namespaceURI: XmlXades.NamespaceURI,
		prefix: XmlXades.DefaultPrefix,
		converter: XmlDateTimeConverter
	})], SignedSignatureProperties.prototype, "SigningTime", void 0);
	__decorate([XmlChildElement({ parser: SigningCertificate })], SignedSignatureProperties.prototype, "SigningCertificate", void 0);
	__decorate([XmlChildElement({ parser: SignaturePolicyIdentifier })], SignedSignatureProperties.prototype, "SignaturePolicyIdentifier", void 0);
	__decorate([XmlChildElement({ parser: SignatureProductionPlace })], SignedSignatureProperties.prototype, "SignatureProductionPlace", void 0);
	__decorate([XmlChildElement({ parser: SignerRole })], SignedSignatureProperties.prototype, "SignerRole", void 0);
	SignedSignatureProperties = __decorate([XmlElement({
		localName: XmlXades.ElementNames.SignedSignatureProperties
	})], SignedSignatureProperties);

	/**
  *
  * <xsd:element name="XAdESTimeStamp" type="XAdESTimeStampType"/>
  * <xsd:complexType name="XAdESTimeStampType">
  *     <xsd:complexContent>
  *         <xsd:restriction base="GenericTimeStampType">
  *             <xsd:sequence>
  *                 <xsd:element ref="Include" minOccurs="0" maxOccurs="unbounded"/>
  *                 <xsd:element ref="ds:CanonicalizationMethod" minOccurs="0"/>
  *                 <xsd:choice maxOccurs="unbounded">
  *                     <xsd:element name="EncapsulatedTimeStamp" type="EncapsulatedPKIDataType"/>
  *                     <xsd:element name="XMLTimeStamp" type="AnyType"/>
  *                 </xsd:choice>
  *             </xsd:sequence>
  *             <xsd:attribute name="Id" type="xsd:ID" use="optional"/>
  *         </xsd:restriction>
  *     </xsd:complexContent>
  * </xsd:complexType>
  *
  */
	var XAdESTimeStamp = function (_super) {
		__extends(XAdESTimeStamp, _super);
		function XAdESTimeStamp() {
			return _super !== null && _super.apply(this, arguments) || this;
		}
		return XAdESTimeStamp;
	}(XadesObject);
	__decorate([XmlAttribute({ localName: XmlXades.AttributeNames.Id, defaultValue: "" })], XAdESTimeStamp.prototype, "Id", void 0);
	__decorate([XmlChildElement({ parser: Include })], XAdESTimeStamp.prototype, "Include", void 0);
	__decorate([XmlChildElement({ parser: CanonicalizationMethod })], XAdESTimeStamp.prototype, "CanonicalizationMethod", void 0);
	__decorate([XmlChildElement({ parser: EncapsulatedTimeStampCollection, noRoot: true })], XAdESTimeStamp.prototype, "EncapsulatedTimeStamp", void 0);
	__decorate([XmlChildElement({ parser: XMLTimeStampCollection, noRoot: true })], XAdESTimeStamp.prototype, "XMLTimeStamp", void 0);
	XAdESTimeStamp = __decorate([XmlElement({
		localName: XmlXades.ElementNames.XAdESTimeStamp
	})], XAdESTimeStamp);

	/**
  *
  * <xsd:element name="SignedDataObjectProperties" type="SignedDataObjectPropertiesType"/>
  * <xsd:complexType name="SignedDataObjectPropertiesType">
  *     <xsd:sequence>
  *         <xsd:element name="DataObjectFormat" type="DataObjectFormatType" minOccurs="0" maxOccurs="unbounded"/>
  *         <xsd:element name="CommitmentTypeIndication" type="CommitmentTypeIndicationType" minOccurs="0" maxOccurs="unbounded"/>
  *         <xsd:element name="AllDataObjectsTimeStamp" type="XAdESTimeStampType" minOccurs="0" maxOccurs="unbounded"/>
  *         <xsd:element name="IndividualDataObjectsTimeStamp" type="XAdESTimeStampType" minOccurs="0" maxOccurs="unbounded"/>
  *     </xsd:sequence>
  *     <xsd:attribute name="Id" type="xsd:ID" use="optional"/>
  * </xsd:complexType>
  *
  */
	var IndividualDataObjectsTimeStamp = function (_super) {
		__extends(IndividualDataObjectsTimeStamp, _super);
		function IndividualDataObjectsTimeStamp() {
			return _super !== null && _super.apply(this, arguments) || this;
		}
		return IndividualDataObjectsTimeStamp;
	}(XAdESTimeStamp);
	IndividualDataObjectsTimeStamp = __decorate([XmlElement({ localName: XmlXades.ElementNames.IndividualDataObjectsTimeStamp })], IndividualDataObjectsTimeStamp);
	var IndividualDataObjectsTimeStampCollection = function (_super) {
		__extends(IndividualDataObjectsTimeStampCollection, _super);
		function IndividualDataObjectsTimeStampCollection() {
			return _super !== null && _super.apply(this, arguments) || this;
		}
		return IndividualDataObjectsTimeStampCollection;
	}(XadesCollection);
	IndividualDataObjectsTimeStampCollection = __decorate([XmlElement({ localName: "IndividualDataObjectsTimeStampCollection", parser: IndividualDataObjectsTimeStamp })], IndividualDataObjectsTimeStampCollection);
	var AllDataObjectsTimeStamp = function (_super) {
		__extends(AllDataObjectsTimeStamp, _super);
		function AllDataObjectsTimeStamp() {
			return _super !== null && _super.apply(this, arguments) || this;
		}
		return AllDataObjectsTimeStamp;
	}(XAdESTimeStamp);
	AllDataObjectsTimeStamp = __decorate([XmlElement({ localName: XmlXades.ElementNames.AllDataObjectsTimeStamp })], AllDataObjectsTimeStamp);
	var DataObjectFormatCollection = function (_super) {
		__extends(DataObjectFormatCollection, _super);
		function DataObjectFormatCollection() {
			return _super !== null && _super.apply(this, arguments) || this;
		}
		return DataObjectFormatCollection;
	}(XadesCollection);
	DataObjectFormatCollection = __decorate([XmlElement({ localName: "DataObjectFormatCollection", parser: DataObjectFormat })], DataObjectFormatCollection);
	var CommitmentTypeIndicationCollection = function (_super) {
		__extends(CommitmentTypeIndicationCollection, _super);
		function CommitmentTypeIndicationCollection() {
			return _super !== null && _super.apply(this, arguments) || this;
		}
		return CommitmentTypeIndicationCollection;
	}(XadesCollection);
	CommitmentTypeIndicationCollection = __decorate([XmlElement({ localName: "CommitmentTypeIndicationCollection", parser: CommitmentTypeIndication })], CommitmentTypeIndicationCollection);
	var AllDataObjectsTimeStampCollection = function (_super) {
		__extends(AllDataObjectsTimeStampCollection, _super);
		function AllDataObjectsTimeStampCollection() {
			return _super !== null && _super.apply(this, arguments) || this;
		}
		return AllDataObjectsTimeStampCollection;
	}(XadesCollection);
	AllDataObjectsTimeStampCollection = __decorate([XmlElement({ localName: "AllDataObjectsTimeStampCollection", parser: AllDataObjectsTimeStamp })], AllDataObjectsTimeStampCollection);
	var SignedDataObjectProperties = function (_super) {
		__extends(SignedDataObjectProperties, _super);
		function SignedDataObjectProperties() {
			return _super !== null && _super.apply(this, arguments) || this;
		}
		return SignedDataObjectProperties;
	}(XadesObject);
	__decorate([XmlAttribute({ localName: XmlXades.AttributeNames.Id, defaultValue: "" })], SignedDataObjectProperties.prototype, "Id", void 0);
	__decorate([XmlChildElement({ parser: DataObjectFormatCollection, noRoot: true })], SignedDataObjectProperties.prototype, "DataObjectFormats", void 0);
	__decorate([XmlChildElement({ parser: CommitmentTypeIndicationCollection, noRoot: true })], SignedDataObjectProperties.prototype, "CommitmentTypeIndications", void 0);
	__decorate([XmlChildElement({ parser: AllDataObjectsTimeStampCollection, noRoot: true })], SignedDataObjectProperties.prototype, "AllDataObjectsTimeStamps", void 0);
	__decorate([XmlChildElement({ parser: IndividualDataObjectsTimeStampCollection, noRoot: true })], SignedDataObjectProperties.prototype, "IndividualDataObjectsTimeStamps", void 0);
	SignedDataObjectProperties = __decorate([XmlElement({
		localName: XmlXades.ElementNames.SignedDataObjectProperties
	})], SignedDataObjectProperties);

	/**
  *
  * <xsd:element name="SignedProperties" type="SignedPropertiesType"/>
  * <xsd:complexType name="SignedPropertiesType">
  *     <xsd:sequence>
  *         <xsd:element name="SignedSignatureProperties" type="SignedSignaturePropertiesType" minOccurs="0"/>
  *         <xsd:element name="SignedDataObjectProperties" type="SignedDataObjectPropertiesType" minOccurs="0"/>
  *     </xsd:sequence>
  *     <xsd:attribute name="Id" type="xsd:ID" use="optional"/>
  * </xsd:complexType>
  *
  */
	var SignedProperties = function (_super) {
		__extends(SignedProperties, _super);
		function SignedProperties() {
			return _super !== null && _super.apply(this, arguments) || this;
		}
		return SignedProperties;
	}(XadesObject);
	__decorate([XmlAttribute({ localName: XmlXades.AttributeNames.Id, defaultValue: "" })], SignedProperties.prototype, "Id", void 0);
	__decorate([XmlChildElement({ parser: SignedSignatureProperties })], SignedProperties.prototype, "SignedSignatureProperties", void 0);
	__decorate([XmlChildElement({ parser: SignedDataObjectProperties })], SignedProperties.prototype, "SignedDataObjectProperties", void 0);
	SignedProperties = __decorate([XmlElement({
		localName: XmlXades.ElementNames.SignedProperties
	})], SignedProperties);

	/**
  *
  * <xsd:element name="RevocationValues" type="RevocationValuesType"/>
  * <xsd:complexType name="RevocationValuesType">
  *     <xsd:sequence>
  *         <xsd:element name="CRLValues" type="CRLValuesType" minOccurs="0"/>
  *         <xsd:element name="OCSPValues" type="OCSPValuesType" minOccurs="0"/>
  *         <xsd:element name="OtherValues" type="OtherCertStatusValuesType" minOccurs="0"/>
  *     </xsd:sequence>
  *     <xsd:attribute name="Id" type="xsd:ID" use="optional"/>
  * </xsd:complexType>
  * <xsd:complexType name="CRLValuesType">
  *     <xsd:sequence>
  *         <xsd:element name="EncapsulatedCRLValue" type="EncapsulatedPKIDataType" maxOccurs="unbounded"/>
  *     </xsd:sequence>
  * </xsd:complexType>
  * <xsd:complexType name="OCSPValuesType">
  *     <xsd:sequence>
  *         <xsd:element name="EncapsulatedOCSPValue" type="EncapsulatedPKIDataType" maxOccurs="unbounded"/>
  *     </xsd:sequence>
  * </xsd:complexType>
  * <xsd:complexType name="OtherCertStatusValuesType">
  *     <xsd:sequence>
  *         <xsd:element name="OtherValue" type="AnyType" maxOccurs="unbounded"/>
  *     </xsd:sequence>
  * </xsd:complexType>
  *
  */
	var OtherValue = function (_super) {
		__extends(OtherValue, _super);
		function OtherValue() {
			return _super !== null && _super.apply(this, arguments) || this;
		}
		return OtherValue;
	}(EncapsulatedPKIData);
	OtherValue = __decorate([XmlElement({ localName: XmlXades.ElementNames.OtherValue })], OtherValue);
	var OtherValues = function (_super) {
		__extends(OtherValues, _super);
		function OtherValues() {
			return _super !== null && _super.apply(this, arguments) || this;
		}
		return OtherValues;
	}(XadesCollection);
	OtherValues = __decorate([XmlElement({ localName: XmlXades.ElementNames.OCSPValues, parser: OtherValue })], OtherValues);
	var EncapsulatedOCSPValue = function (_super) {
		__extends(EncapsulatedOCSPValue, _super);
		function EncapsulatedOCSPValue() {
			return _super !== null && _super.apply(this, arguments) || this;
		}
		return EncapsulatedOCSPValue;
	}(EncapsulatedPKIData);
	EncapsulatedOCSPValue = __decorate([XmlElement({ localName: XmlXades.ElementNames.EncapsulatedOCSPValue })], EncapsulatedOCSPValue);
	var OCSPValues = function (_super) {
		__extends(OCSPValues, _super);
		function OCSPValues() {
			return _super !== null && _super.apply(this, arguments) || this;
		}
		return OCSPValues;
	}(XadesCollection);
	OCSPValues = __decorate([XmlElement({ localName: XmlXades.ElementNames.OCSPValues })], OCSPValues);
	var EncapsulatedCRLValue = function (_super) {
		__extends(EncapsulatedCRLValue, _super);
		function EncapsulatedCRLValue() {
			return _super !== null && _super.apply(this, arguments) || this;
		}
		return EncapsulatedCRLValue;
	}(EncapsulatedPKIData);
	EncapsulatedCRLValue = __decorate([XmlElement({ localName: XmlXades.ElementNames.EncapsulatedCRLValue })], EncapsulatedCRLValue);
	var CRLValues = function (_super) {
		__extends(CRLValues, _super);
		function CRLValues() {
			return _super !== null && _super.apply(this, arguments) || this;
		}
		return CRLValues;
	}(XadesCollection);
	CRLValues = __decorate([XmlElement({ localName: XmlXades.ElementNames.CRLValues, parser: EncapsulatedCRLValue })], CRLValues);
	var RevocationValues = function (_super) {
		__extends(RevocationValues, _super);
		function RevocationValues() {
			return _super !== null && _super.apply(this, arguments) || this;
		}
		return RevocationValues;
	}(XadesObject);
	__decorate([XmlAttribute({ localName: XmlXades.AttributeNames.Id, defaultValue: "" })], RevocationValues.prototype, "Id", void 0);
	__decorate([XmlChildElement({ parser: CRLValues })], RevocationValues.prototype, "CRLValues", void 0);
	__decorate([XmlChildElement({ parser: OCSPValues })], RevocationValues.prototype, "OCSPValues", void 0);
	__decorate([XmlChildElement({ parser: OtherValues })], RevocationValues.prototype, "OtherValues", void 0);
	RevocationValues = __decorate([XmlElement({ localName: XmlXades.ElementNames.RevocationValues })], RevocationValues);

	/**
  *
  * <xsd:element name="UnsignedSignatureProperties" type="UnsignedSignaturePropertiesType"/>
  * <xsd:complexType name="UnsignedSignaturePropertiesType">
  *     <xsd:choice maxOccurs="unbounded">
  *         <xsd:element name="CounterSignature" type="CounterSignatureType"/>
  *         <xsd:element name="SignatureTimeStamp" type="XAdESTimeStampType"/>
  *         <xsd:element name="CompleteCertificateRefs" type="CompleteCertificateRefsType"/>
  *         <xsd:element name="CompleteRevocationRefs" type="CompleteRevocationRefsType"/>
  *         <xsd:element name="AttributeCertificateRefs" type="CompleteCertificateRefsType"/>
  *         <xsd:element name="AttributeRevocationRefs" type="CompleteRevocationRefsType"/>
  *         <xsd:element name="SigAndRefsTimeStamp" type="XAdESTimeStampType"/>
  *         <xsd:element name="RefsOnlyTimeStamp" type="XAdESTimeStampType"/>
  *         <xsd:element name="CertificateValues" type="CertificateValuesType"/>
  *         <xsd:element name="RevocationValues" type="RevocationValuesType"/>
  *         <xsd:element name="AttrAuthoritiesCertValues" type="CertificateValuesType"/>
  *         <xsd:element name="AttributeRevocationValues" type="RevocationValuesType"/>
  *         <xsd:element name="ArchiveTimeStamp" type="XAdESTimeStampType"/>
  *         <xsd:any namespace="##other"/>
  *     </xsd:choice>
  *     <xsd:attribute name="Id" type="xsd:ID" use="optional"/>
  * </xsd:complexType>
  *
  */
	var SignatureTimeStamp = function (_super) {
		__extends(SignatureTimeStamp, _super);
		function SignatureTimeStamp() {
			return _super !== null && _super.apply(this, arguments) || this;
		}
		return SignatureTimeStamp;
	}(XAdESTimeStamp);
	SignatureTimeStamp = __decorate([XmlElement({ localName: XmlXades.ElementNames.SignatureTimeStamp })], SignatureTimeStamp);
	var SigAndRefsTimeStamp = function (_super) {
		__extends(SigAndRefsTimeStamp, _super);
		function SigAndRefsTimeStamp() {
			return _super !== null && _super.apply(this, arguments) || this;
		}
		return SigAndRefsTimeStamp;
	}(XAdESTimeStamp);
	SigAndRefsTimeStamp = __decorate([XmlElement({ localName: XmlXades.ElementNames.SigAndRefsTimeStamp })], SigAndRefsTimeStamp);
	var RefsOnlyTimeStamp = function (_super) {
		__extends(RefsOnlyTimeStamp, _super);
		function RefsOnlyTimeStamp() {
			return _super !== null && _super.apply(this, arguments) || this;
		}
		return RefsOnlyTimeStamp;
	}(XAdESTimeStamp);
	RefsOnlyTimeStamp = __decorate([XmlElement({ localName: XmlXades.ElementNames.RefsOnlyTimeStamp })], RefsOnlyTimeStamp);
	var ArchiveTimeStamp = function (_super) {
		__extends(ArchiveTimeStamp, _super);
		function ArchiveTimeStamp() {
			return _super !== null && _super.apply(this, arguments) || this;
		}
		return ArchiveTimeStamp;
	}(XAdESTimeStamp);
	ArchiveTimeStamp = __decorate([XmlElement({ localName: XmlXades.ElementNames.ArchiveTimeStamp })], ArchiveTimeStamp);
	var AttributeCertificateRefs = function (_super) {
		__extends(AttributeCertificateRefs, _super);
		function AttributeCertificateRefs() {
			return _super !== null && _super.apply(this, arguments) || this;
		}
		return AttributeCertificateRefs;
	}(CompleteCertificateRefs);
	AttributeCertificateRefs = __decorate([XmlElement({ localName: XmlXades.ElementNames.AttributeCertificateRefs })], AttributeCertificateRefs);
	var AttributeRevocationRefs = function (_super) {
		__extends(AttributeRevocationRefs, _super);
		function AttributeRevocationRefs() {
			return _super !== null && _super.apply(this, arguments) || this;
		}
		return AttributeRevocationRefs;
	}(CompleteRevocationRefs);
	AttributeRevocationRefs = __decorate([XmlElement({ localName: XmlXades.ElementNames.AttributeRevocationRefs })], AttributeRevocationRefs);
	var AttrAuthoritiesCertValues = function (_super) {
		__extends(AttrAuthoritiesCertValues, _super);
		function AttrAuthoritiesCertValues() {
			return _super !== null && _super.apply(this, arguments) || this;
		}
		return AttrAuthoritiesCertValues;
	}(CertificateValues);
	AttrAuthoritiesCertValues = __decorate([XmlElement({ localName: XmlXades.ElementNames.AttrAuthoritiesCertValues })], AttrAuthoritiesCertValues);
	var AttributeRevocationValues = function (_super) {
		__extends(AttributeRevocationValues, _super);
		function AttributeRevocationValues() {
			return _super !== null && _super.apply(this, arguments) || this;
		}
		return AttributeRevocationValues;
	}(RevocationValues);
	AttributeRevocationValues = __decorate([XmlElement({ localName: XmlXades.ElementNames.AttributeRevocationValues })], AttributeRevocationValues);
	/**
  * Abstract class for UnsignedSignatureProperties
  *
  * @export
  * @class UnsignedSignatureProperty
  * @extends {XadesObject}
  */
	var UnsignedSignatureProperty = function (_super) {
		__extends(UnsignedSignatureProperty, _super);
		function UnsignedSignatureProperty() {
			return _super !== null && _super.apply(this, arguments) || this;
		}
		return UnsignedSignatureProperty;
	}(XadesObject);
	UnsignedSignatureProperty = __decorate([XmlElement({ localName: "UnsignedSignatureProperty" })], UnsignedSignatureProperty);
	var UnsignedSignatureProperties = function (_super) {
		__extends(UnsignedSignatureProperties, _super);
		function UnsignedSignatureProperties() {
			return _super !== null && _super.apply(this, arguments) || this;
		}
		UnsignedSignatureProperties.prototype.OnLoadXml = function (element) {
			debugger;
			for (var i = 0; i < element.childNodes.length; i++) {
				var node = element.childNodes.item(i);
				if (node.nodeType !== XmlNodeType.Element) continue;
				var XmlClass = void 0;
				switch (node.localName) {
					case XmlXades.ElementNames.CounterSignature:
						XmlClass = CounterSignature;
						break;
					case XmlXades.ElementNames.SignatureTimeStamp:
						XmlClass = SignatureTimeStamp;
						break;
					case XmlXades.ElementNames.CompleteCertificateRefs:
						XmlClass = CompleteCertificateRefs;
						break;
					case XmlXades.ElementNames.CompleteRevocationRefs:
						XmlClass = CompleteRevocationRefs;
						break;
					case XmlXades.ElementNames.AttributeCertificateRefs:
						XmlClass = AttributeCertificateRefs;
						break;
					case XmlXades.ElementNames.AttributeRevocationRefs:
						XmlClass = AttributeRevocationRefs;
						break;
					case XmlXades.ElementNames.SigAndRefsTimeStamp:
						XmlClass = SigAndRefsTimeStamp;
						break;
					case XmlXades.ElementNames.RefsOnlyTimeStamp:
						XmlClass = RefsOnlyTimeStamp;
						break;
					case XmlXades.ElementNames.CertificateValues:
						XmlClass = CertificateValues;
						break;
					case XmlXades.ElementNames.RevocationValues:
						XmlClass = RevocationValues;
						break;
					case XmlXades.ElementNames.AttrAuthoritiesCertValues:
						XmlClass = AttrAuthoritiesCertValues;
						break;
					case XmlXades.ElementNames.AttributeRevocationValues:
						XmlClass = AttributeRevocationValues;
						break;
					case XmlXades.ElementNames.ArchiveTimeStamp:
						XmlClass = ArchiveTimeStamp;
						break;
				}
				if (XmlClass) {
					var item = XmlClass.LoadXml(node);
					this.Add(item);
				}
			}
		};
		return UnsignedSignatureProperties;
	}(XadesCollection);
	__decorate([XmlAttribute({ localName: XmlXades.AttributeNames.Id, defaultValue: "" })], UnsignedSignatureProperties.prototype, "Id", void 0);
	UnsignedSignatureProperties = __decorate([XmlElement({ localName: XmlXades.ElementNames.UnsignedSignatureProperties, parser: UnsignedSignatureProperty })], UnsignedSignatureProperties);

	/**
  *
  * <xsd:element name="UnsignedDataObjectProperties" type="UnsignedDataObjectPropertiesType"/>
  * <xsd:complexType name="UnsignedDataObjectPropertiesType">
  *     <xsd:sequence>
  *         <xsd:element name="UnsignedDataObjectProperty" type="AnyType" maxOccurs="unbounded"/>
  *     </xsd:sequence>
  *     <xsd:attribute name="Id" type="xsd:ID" use="optional"/>
  * </xsd:complexType>
  *
  */
	var UnsignedDataObjectProperty = function (_super) {
		__extends(UnsignedDataObjectProperty, _super);
		function UnsignedDataObjectProperty() {
			return _super !== null && _super.apply(this, arguments) || this;
		}
		return UnsignedDataObjectProperty;
	}(Any);
	UnsignedDataObjectProperty = __decorate([XmlElement({ localName: XmlXades.ElementNames.UnsignedDataObjectProperty })], UnsignedDataObjectProperty);
	var UnsignedDataObjectProperties = function (_super) {
		__extends(UnsignedDataObjectProperties, _super);
		function UnsignedDataObjectProperties() {
			return _super !== null && _super.apply(this, arguments) || this;
		}
		return UnsignedDataObjectProperties;
	}(XadesCollection);
	__decorate([XmlAttribute({ localName: XmlXades.AttributeNames.Id, defaultValue: "" })], UnsignedDataObjectProperties.prototype, "Id", void 0);
	UnsignedDataObjectProperties = __decorate([XmlElement({ localName: XmlXades.ElementNames.UnsignedSignatureProperties, parser: UnsignedDataObjectProperty })], UnsignedDataObjectProperties);

	/**
  *
  * <xsd:element name="UnsignedProperties" type="UnsignedPropertiesType"/>
  * <xsd:complexType name="UnsignedPropertiesType">
  *     <xsd:sequence>
  *         <xsd:element name="UnsignedSignatureProperties" type="UnsignedSignaturePropertiesType" minOccurs="0"/>
  *         <xsd:element name="UnsignedDataObjectProperties" type="UnsignedDataObjectPropertiesType" minOccurs="0"/>
  *     </xsd:sequence>
  *     <xsd:attribute name="Id" type="xsd:ID" use="optional"/>
  * </xsd:complexType>
  *
  */
	var UnsignedProperties = function (_super) {
		__extends(UnsignedProperties, _super);
		function UnsignedProperties() {
			return _super !== null && _super.apply(this, arguments) || this;
		}
		return UnsignedProperties;
	}(XadesObject);
	__decorate([XmlAttribute({ localName: XmlXades.AttributeNames.Id, defaultValue: "" })], UnsignedProperties.prototype, "Id", void 0);
	__decorate([XmlChildElement({ parser: UnsignedSignatureProperties })], UnsignedProperties.prototype, "UnsignedSignatureProperties", void 0);
	__decorate([XmlChildElement({ parser: UnsignedDataObjectProperties })], UnsignedProperties.prototype, "UnsignedDataObjectProperties", void 0);
	UnsignedProperties = __decorate([XmlElement({
		localName: XmlXades.ElementNames.UnsignedProperties
	})], UnsignedProperties);

	/**
  *
  * <xsd:element name="QualifyingProperties" type="QualifyingPropertiesType"/>
  * <xsd:complexType name="QualifyingPropertiesType">
  *     <xsd:sequence>
  *         <xsd:element name="SignedProperties" type="SignedPropertiesType" minOccurs="0"/>
  *         <xsd:element name="UnsignedProperties" type="UnsignedPropertiesType" minOccurs="0"/>
  *     </xsd:sequence>
  *     <xsd:attribute name="Target" type="xsd:anyURI" use="required"/>
  *     <xsd:attribute name="Id" type="xsd:ID" use="optional"/>
  * </xsd:complexType>
  *
  */
	var QualifyingProperties = function (_super) {
		__extends(QualifyingProperties, _super);
		function QualifyingProperties() {
			return _super !== null && _super.apply(this, arguments) || this;
		}
		return QualifyingProperties;
	}(XadesObject);
	__decorate([XmlAttribute({ localName: XmlXades.AttributeNames.Target, required: true })], QualifyingProperties.prototype, "Target", void 0);
	__decorate([XmlAttribute({ localName: XmlXades.AttributeNames.Id, defaultValue: "" })], QualifyingProperties.prototype, "Id", void 0);
	__decorate([XmlChildElement({ parser: SignedProperties })], QualifyingProperties.prototype, "SignedProperties", void 0);
	__decorate([XmlChildElement({ parser: UnsignedProperties })], QualifyingProperties.prototype, "UnsignedProperties", void 0);
	QualifyingProperties = __decorate([XmlElement({
		localName: XmlXades.ElementNames.QualifyingProperties
	})], QualifyingProperties);

	/**
  *
  * <xsd:element name="QualifyingPropertiesReference" type="QualifyingPropertiesReferenceType"/>
  * <xsd:complexType name="QualifyingPropertiesReferenceType">
  *     <xsd:attribute name="URI" type="xsd:anyURI" use="required"/>
  *     <xsd:attribute name="Id" type="xsd:ID" use="optional"/>
  * </xsd:complexType>
  *
  */
	var QualifyingPropertiesReference = function (_super) {
		__extends(QualifyingPropertiesReference, _super);
		function QualifyingPropertiesReference() {
			return _super !== null && _super.apply(this, arguments) || this;
		}
		return QualifyingPropertiesReference;
	}(XadesObject);
	__decorate([XmlAttribute({ localName: XmlXades.AttributeNames.URI, required: true })], QualifyingPropertiesReference.prototype, "Uri", void 0);
	__decorate([XmlAttribute({ localName: XmlXades.AttributeNames.Id, defaultValue: "" })], QualifyingPropertiesReference.prototype, "Id", void 0);
	QualifyingPropertiesReference = __decorate([XmlElement({ localName: XmlXades.ElementNames.QualifyingPropertiesReference })], QualifyingPropertiesReference);

	var DataObject$1 = function (_super) {
		__extends(DataObject$$1, _super);
		function DataObject$$1() {
			return _super !== null && _super.apply(this, arguments) || this;
		}
		return DataObject$$1;
	}(DataObject);
	__decorate([XmlChildElement({ parser: QualifyingProperties })], DataObject$1.prototype, "QualifyingProperties", void 0);
	DataObject$1 = __decorate([XmlElement({ localName: XmlSignature.ElementNames.Object })], DataObject$1);

	var xadesXml = Object.freeze({
		get Any() {
			return Any;
		},
		get OtherCertificate() {
			return OtherCertificate;
		},
		get OtherCertificateCollection() {
			return OtherCertificateCollection;
		},
		get EncapsulatedX509Certificate() {
			return EncapsulatedX509Certificate;
		},
		get EncapsulatedX509CertificateCollection() {
			return EncapsulatedX509CertificateCollection;
		},
		get CertificateValues() {
			return CertificateValues;
		},
		get CommitmentTypeQualifier() {
			return CommitmentTypeQualifier;
		},
		get CommitmentTypeQualifiers() {
			return CommitmentTypeQualifiers;
		},
		get ObjectReference() {
			return ObjectReference;
		},
		get ObjectReferenceCollection() {
			return ObjectReferenceCollection;
		},
		get CommitmentTypeIndication() {
			return CommitmentTypeIndication;
		},
		get CompleteCertificateRefs() {
			return CompleteCertificateRefs;
		},
		get OtherRef() {
			return OtherRef;
		},
		get OtherRefs() {
			return OtherRefs;
		},
		get ResponderID() {
			return ResponderID;
		},
		get OCSPIdentifier() {
			return OCSPIdentifier;
		},
		get OCSPRef() {
			return OCSPRef;
		},
		get OCSPRefs() {
			return OCSPRefs;
		},
		get CRLIdentifier() {
			return CRLIdentifier;
		},
		get CRLRef() {
			return CRLRef;
		},
		get CRLRefs() {
			return CRLRefs;
		},
		get CompleteRevocationRefs() {
			return CompleteRevocationRefs;
		},
		get CounterSignature() {
			return CounterSignature;
		},
		get DataObjectFormat() {
			return DataObjectFormat;
		},
		get EncapsulatedPKIData() {
			return EncapsulatedPKIData;
		},
		get Include() {
			return Include;
		},
		get ReferenceInfo() {
			return ReferenceInfo;
		},
		get ReferenceInfos() {
			return ReferenceInfos;
		},
		get EncapsulatedTimeStamp() {
			return EncapsulatedTimeStamp;
		},
		get EncapsulatedTimeStampCollection() {
			return EncapsulatedTimeStampCollection;
		},
		get XMLTimeStamp() {
			return XMLTimeStamp;
		},
		get XMLTimeStampCollection() {
			return XMLTimeStampCollection;
		},
		get GenericTimeStamp() {
			return GenericTimeStamp;
		},
		get Identifier() {
			return Identifier;
		},
		get DocumentationReference() {
			return DocumentationReference;
		},
		get DocumentationReferences() {
			return DocumentationReferences;
		},
		get ObjectIdentifier() {
			return ObjectIdentifier;
		},
		get OtherTimeStamp() {
			return OtherTimeStamp;
		},
		get QualifyingProperties() {
			return QualifyingProperties;
		},
		get QualifyingPropertiesReference() {
			return QualifyingPropertiesReference;
		},
		get OtherValue() {
			return OtherValue;
		},
		get OtherValues() {
			return OtherValues;
		},
		get EncapsulatedOCSPValue() {
			return EncapsulatedOCSPValue;
		},
		get OCSPValues() {
			return OCSPValues;
		},
		get EncapsulatedCRLValue() {
			return EncapsulatedCRLValue;
		},
		get CRLValues() {
			return CRLValues;
		},
		get RevocationValues() {
			return RevocationValues;
		},
		get Integer() {
			return Integer$1;
		},
		get IntegerList() {
			return IntegerList;
		},
		get NoticeReference() {
			return NoticeReference;
		},
		get SPUserNotice() {
			return SPUserNotice;
		},
		get SigPolicyQualifier() {
			return SigPolicyQualifier;
		},
		get SigPolicyQualifiers() {
			return SigPolicyQualifiers;
		},
		get SignaturePolicyId() {
			return SignaturePolicyId;
		},
		get SignaturePolicyIdentifier() {
			return SignaturePolicyIdentifier;
		},
		get SignatureProductionPlace() {
			return SignatureProductionPlace;
		},
		get IndividualDataObjectsTimeStamp() {
			return IndividualDataObjectsTimeStamp;
		},
		get IndividualDataObjectsTimeStampCollection() {
			return IndividualDataObjectsTimeStampCollection;
		},
		get AllDataObjectsTimeStamp() {
			return AllDataObjectsTimeStamp;
		},
		get DataObjectFormatCollection() {
			return DataObjectFormatCollection;
		},
		get CommitmentTypeIndicationCollection() {
			return CommitmentTypeIndicationCollection;
		},
		get AllDataObjectsTimeStampCollection() {
			return AllDataObjectsTimeStampCollection;
		},
		get SignedDataObjectProperties() {
			return SignedDataObjectProperties;
		},
		get SignedProperties() {
			return SignedProperties;
		},
		get SignedSignatureProperties() {
			return SignedSignatureProperties;
		},
		get ClaimedRole() {
			return ClaimedRole;
		},
		get ClaimedRoles() {
			return ClaimedRoles;
		},
		get CertifiedRole() {
			return CertifiedRole;
		},
		get CertifiedRoles() {
			return CertifiedRoles;
		},
		get SignerRole() {
			return SignerRole;
		},
		get DigestAlgAndValueType() {
			return DigestAlgAndValueType;
		},
		get IssuerSerial() {
			return IssuerSerial;
		},
		get Cert() {
			return Cert;
		},
		get CertIDList() {
			return CertIDList;
		},
		get SigningCertificate() {
			return SigningCertificate;
		},
		get UnsignedDataObjectProperty() {
			return UnsignedDataObjectProperty;
		},
		get UnsignedDataObjectProperties() {
			return UnsignedDataObjectProperties;
		},
		get UnsignedProperties() {
			return UnsignedProperties;
		},
		get SignatureTimeStamp() {
			return SignatureTimeStamp;
		},
		get SigAndRefsTimeStamp() {
			return SigAndRefsTimeStamp;
		},
		get RefsOnlyTimeStamp() {
			return RefsOnlyTimeStamp;
		},
		get ArchiveTimeStamp() {
			return ArchiveTimeStamp;
		},
		get AttributeCertificateRefs() {
			return AttributeCertificateRefs;
		},
		get AttributeRevocationRefs() {
			return AttributeRevocationRefs;
		},
		get AttrAuthoritiesCertValues() {
			return AttrAuthoritiesCertValues;
		},
		get AttributeRevocationValues() {
			return AttributeRevocationValues;
		},
		get UnsignedSignatureProperty() {
			return UnsignedSignatureProperty;
		},
		get UnsignedSignatureProperties() {
			return UnsignedSignatureProperties;
		},
		get XAdESTimeStamp() {
			return XAdESTimeStamp;
		},
		get DataObject() {
			return DataObject$1;
		},
		XmlXades: XmlXades
	});

	var XADES_REFERENCE_TYPE = "http://uri.etsi.org/01903#SignedProperties";
	var SignedXml$1 = function (_super) {
		__extends(SignedXml$$1, _super);
		function SignedXml$$1(node) {
			var _this = _super.call(this, node) || this;
			_this.properties = null;
			_this.CreateQualyingProperties();
			return _this;
		}
		Object.defineProperty(SignedXml$$1.prototype, "Properties", {
			get: function get() {
				return this.properties;
			},
			enumerable: true,
			configurable: true
		});
		Object.defineProperty(SignedXml$$1.prototype, "SignedProperties", {
			get: function get() {
				if (!this.Properties) throw new XmlError(XE.XML_EXCEPTION, "Properties is empty");
				return this.Properties.SignedProperties;
			},
			enumerable: true,
			configurable: true
		});
		Object.defineProperty(SignedXml$$1.prototype, "UnsignedProperties", {
			get: function get() {
				if (!this.Properties) throw new XmlError(XE.XML_EXCEPTION, "Properties is empty");
				return this.Properties.UnsignedProperties;
			},
			enumerable: true,
			configurable: true
		});
		SignedXml$$1.prototype.LoadXml = function (value) {
			_super.prototype.LoadXml.call(this, value);
			var properties = null;
			this.XmlSignature.ObjectList.Some(function (item) {
				if (item.Element) {
					// Looking for <QualifyingProperties>
					for (var i = 0; i < item.Element.childNodes.length; i++) {
						var node = item.Element.childNodes.item(i);
						if (node.nodeType === XmlNodeType.Element && node.localName === XmlXades.ElementNames.QualifyingProperties) {
							properties = QualifyingProperties.LoadXml(node);
							return true;
						}
					}
				}
				return false;
			});
			this.properties = properties;
		};
		SignedXml$$1.prototype.CreateQualyingProperties = function () {
			if (this.Properties) throw new XmlError(XE.XML_EXCEPTION, "Cannot create QualifyingProperties cause currensignature has got one. You must create CounterSignature");
			var rnd = Application.crypto.getRandomValues(new Uint8Array(6));
			var id = Convert.ToHex(rnd);
			this.XmlSignature.Id = "id-" + id;
			var dataObject = new DataObject$1();
			dataObject.QualifyingProperties.Target = "#" + this.XmlSignature.Id;
			dataObject.QualifyingProperties.SignedProperties.Id = "xades-" + this.XmlSignature.Id;
			this.properties = dataObject.QualifyingProperties;
			this.XmlSignature.ObjectList.Add(dataObject);
		};
		SignedXml$$1.prototype.ApplySignOptions = function (signature, algorithm, key, options) {
			return __awaiter(this, void 0, void 0, function () {
				var sigProps, signingAlg, xadesRefHash, xadesRef;
				return __generator(this, function (_a) {
					switch (_a.label) {
						case 0:
							return [4 /*yield*/, _super.prototype.ApplySignOptions.call(this, signature, algorithm, key, options)];
						case 1:
							_a.sent();
							if (!this.Properties) return [3 /*break*/, 3];
							sigProps = this.Properties.SignedProperties.SignedSignatureProperties;
							sigProps.SigningTime = new Date();
							signingAlg = assign$1({}, algorithm, key.algorithm);
							xadesRefHash = signingAlg.hash;
							xadesRef = new Reference();
							xadesRef.Type = XADES_REFERENCE_TYPE;
							xadesRef.Uri = "#" + this.Properties.SignedProperties.Id;
							xadesRef.DigestMethod.Algorithm = CryptoConfig.GetHashAlgorithm(xadesRefHash).namespaceURI;
							signature.SignedInfo.References.Add(xadesRef);
							return [4 /*yield*/, this.ApplySigningCertificate(options.signingCertificate)];
						case 2:
							_a.sent();
							this.ApplySignaturePolicyIdentifier(options.policy);
							this.ApplySignatureProductionPlace(options.productionPlace);
							this.ApplySignerRoles(options.signerRole);
							_a.label = 3;
						case 3:
							return [2 /*return*/];
					}
				});
			});
		};
		SignedXml$$1.prototype.Sign = function (algorithm, key, data, options) {
			return _super.prototype.Sign.apply(this, arguments);
		};
		SignedXml$$1.prototype.ApplySigningCertificate = function (base64string) {
			return __awaiter(this, void 0, void 0, function () {
				var raw, cert, ssp, signingCertificate, alg, _a, _b, _c;
				return __generator(this, function (_d) {
					switch (_d.label) {
						case 0:
							if (!(this.Properties && base64string)) return [3 /*break*/, 2];
							raw = Convert.FromBase64(base64string);
							cert = new X509Certificate(raw);
							ssp = this.Properties.SignedProperties.SignedSignatureProperties;
							if (ssp.SigningCertificate.Count) {
								throw new XmlError(XE.XML_EXCEPTION, "Signature can contain only one SigningCertificate");
							}
							signingCertificate = new Cert();
							signingCertificate.IssuerSerial.X509IssuerName = cert.Issuer;
							signingCertificate.IssuerSerial.X509SerialNumber = cert.SerialNumber; // TODO: Must be Big number here
							alg = CryptoConfig.GetHashAlgorithm("SHA-256");
							signingCertificate.CertDigest.DigestMethod.Algorithm = alg.namespaceURI;
							_a = signingCertificate.CertDigest;
							_b = Uint8Array.bind;
							return [4 /*yield*/, cert.Thumbprint(alg.algorithm.name)];
						case 1:
							_a.DigestValue = new (_b.apply(Uint8Array, [void 0, _d.sent()]))();
							this.Properties.SignedProperties.SignedSignatureProperties.SigningCertificate.Add(signingCertificate);
							_d.label = 2;
						case 2:
							return [2 /*return*/];
					}
				});
			});
		};
		SignedXml$$1.prototype.ApplySignaturePolicyIdentifier = function (options) {
			if (this.Properties) {
				var ssp = this.Properties.SignedProperties.SignedSignatureProperties;
				if (options) {} else {
					ssp.SignaturePolicyIdentifier.SignaturePolicyImplied = true;
				}
			}
		};
		SignedXml$$1.prototype.ApplySignatureProductionPlace = function (options) {
			if (this.Properties && options) {
				var ssp = this.Properties.SignedProperties.SignedSignatureProperties;
				if (options.city) ssp.SignatureProductionPlace.City = options.city;
				if (options.code) ssp.SignatureProductionPlace.PostalCode = options.code;
				if (options.country) ssp.SignatureProductionPlace.CountryName = options.country;
				if (options.state) ssp.SignatureProductionPlace.StateOrProvince = options.state;
			}
		};
		SignedXml$$1.prototype.ApplySignerRoles = function (options) {
			if (this.Properties && options) {
				var ssp_1 = this.Properties.SignedProperties.SignedSignatureProperties;
				if (options.claimed) options.claimed.forEach(function (role) {
					var claimedRole = new ClaimedRole();
					claimedRole.Value = role;
					ssp_1.SignerRole.ClaimedRoles.Add(claimedRole);
				});
				if (options.certified) options.certified.forEach(function (role) {
					var certifiedRole = new CertifiedRole();
					certifiedRole.Encoding = "der";
					certifiedRole.Value = Convert.FromBase64(role);
					ssp_1.SignerRole.CertifiedRoles.Add(certifiedRole);
				});
			}
		};
		SignedXml$$1.prototype.VerifySigningCertificate = function () {
			return __awaiter(this, void 0, void 0, function () {
				var x509, ssp, alg, signingCertificate, b64CertDigest, keyInfos, i, item, certs, j, cert, hash, _a, _b, b64Hash;
				return __generator(this, function (_c) {
					switch (_c.label) {
						case 0:
							x509 = null;
							if (!(this.XmlSignature && this.Properties)) return [3 /*break*/, 7];
							ssp = this.Properties.SignedProperties.SignedSignatureProperties;
							if (ssp.SigningCertificate.Count !== 1) {
								throw new XmlError(XE.XML_EXCEPTION, "Signature has got wrong amount of SigningCertificate, MUST be one");
							}
							alg = CryptoConfig.GetHashAlgorithm("SHA-256");
							signingCertificate = ssp.SigningCertificate.Item(0);
							b64CertDigest = Convert.ToBase64(signingCertificate.CertDigest.DigestValue);
							keyInfos = this.XmlSignature.KeyInfo;
							i = 0;
							_c.label = 1;
						case 1:
							if (!(i < keyInfos.Count, !x509)) return [3 /*break*/, 6];
							item = keyInfos.Item(i);
							if (!(item instanceof KeyInfoX509Data)) return [3 /*break*/, 5];
							certs = item.Certificates;
							j = 0;
							_c.label = 2;
						case 2:
							if (!(j < certs.length, !x509)) return [3 /*break*/, 5];
							cert = certs[j];
							if (!cert) return [3 /*break*/, 4];
							_a = Uint8Array.bind;
							return [4 /*yield*/, cert.Thumbprint(alg.algorithm)];
						case 3:
							hash = new (_a.apply(Uint8Array, [void 0, _c.sent()]))();
							b64Hash = Convert.ToBase64(hash);
							if (b64Hash === b64CertDigest) x509 = cert;
							_c.label = 4;
						case 4:
							j++;
							return [3 /*break*/, 2];
						case 5:
							i++;
							return [3 /*break*/, 1];
						case 6:
							if (!(x509 && x509.Issuer === signingCertificate.IssuerSerial.X509IssuerName && x509.SerialNumber === signingCertificate.IssuerSerial.X509SerialNumber)) throw new XmlError(XE.XML_EXCEPTION, "SigningCertificate not found");
							_c.label = 7;
						case 7:
							return [2 /*return*/, x509];
					}
				});
			});
		};
		return SignedXml$$1;
	}(SignedXml);

	var xml = xadesXml;

	exports.xml = xml;
	exports.Select = Select;
	exports.Parse = Parse;
	exports.Convert = Convert;
	exports.SignedXml = SignedXml$1;

	Object.defineProperty(exports, '__esModule', { value: true });
});
