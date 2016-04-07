/// <reference path="./common.ts" />
/// <reference path="./algorithm.ts" />

namespace xadesjs {

    const APPLICATION_XML = "application/xml";

    interface IKeyInfoProvider {
        getKeyInfo(key: string, prefix?: string): string;
        getKey(keyInfo: any): Buffer;
    }

    /**
     * A key info provider implementation
     *
     */
    export class FileKeyInfo implements IKeyInfoProvider {
        file: string;

        constructor(file: string) {
            this.file = file;
        }

        getKeyInfo(key: any, prefix: string = ""): string {
            prefix = prefix ? prefix + ":" : prefix;
            return "<" + prefix + "X509Data></" + prefix + "X509Data>";
        }

        getKey(keyInfo: any): Buffer {
            return fs.readFileSync(this.file);
        }

    }

    interface ISignedXmlOptions {
        signatureAlgorithm?: string;
        idAttribute?: string;
    }

    interface IComputeSignatureOptions {
        prefix?: string;
        attrs?: IAssocArray;
        location?: ILocation;
    }

    interface ILocation {
        reference?: string;
        action: "append" | "prepend" | "before" | "after";
    }

    interface IReference {
        xpath: string;
        transforms: string[];
        digestAlgorithm: string;
        uri: string;
        digestValue: string;
        inclusiveNamespacesPrefixList: string;
        isEmptyUri: boolean;
    }

    /**
    * Xml signature implementation
    */
    export class SignedXml {
        options: ISignedXmlOptions = {};
        idMode: string;
        references: IReference[] = [];
        id = 0;
        signingKey: string = null;
        // signatureAlgorithm = this.options.signatureAlgorithm || "http://www.w3.org/2000/09/xmldsig#rsa-sha1";
        keyInfoProvider: IKeyInfoProvider = null;
        // canonicalizationAlgorithm = "http://www.w3.org/2001/10/xml-exc-c14n#";
        signedXml = "";
        signatureXml = "";
        signatureElement: Node = null;
        m_signature: Signature = null;
        // SignatureValue = "";
        originalXmlWithIds = "";
        validationErrors: string[] = [];
        keyInfo: Element = null;
        key: CryptoKey = null;
        idAttributes = ["Id", "ID"];

        get KeyInfo(): KeyInfo {
            if (this.m_signature.KeyInfo == null)
                this.m_signature.KeyInfo = new KeyInfo();
            return this.m_signature.KeyInfo;
        }
        set KeyInfo(value: KeyInfo) {
            this.m_signature.KeyInfo = value;
        }

        get Signature(): Signature {
            return this.m_signature;
        }

        get SignatureLength(): number {
            return this.m_signature.SignatureValue.length;
        }

        get SignatureMethod(): string {
            return this.m_signature.SignedInfo.SignatureMethod;
        }

        get SignatureValue(): ArrayBuffer {
            return this.m_signature.SignatureValue;
        }

        get CanonicalizationMethod(): string {
            return this.m_signature.SignedInfo.CanonicalizationMethod;
        }

        get SignedInfo(): SignedInfo {
            return this.m_signature.SignedInfo;
        }

        get SigningKey(): CryptoKey {
            return this.key;
        }
        set SigningKey(value: CryptoKey) {
            this.key = value;
        }


        /**
         * @param {string} idMode. Value of "wssecurity" will create/validate id's with the ws-security namespace
         */
        constructor(idMode: string, options: ISignedXmlOptions = {}) {
            this.m_signature = new Signature();
            this.m_signature.SignedInfo = new SignedInfo();
            this.options = options;
            this.idMode = idMode;
            if (this.options.idAttribute) this.idAttributes.splice(0, 0, this.options.idAttribute);
        }

        static CanonicalizationAlgorithms: { [index: string]: ICanonicalizationAlgorithmConstructable } = {
            "http://www.w3.org/2001/10/xml-exc-c14n#": XmlDsigExcC14NTransform,
            "http://www.w3.org/2001/10/xml-exc-c14n#WithComments": XmlDsigExcC14NWithCommentsTransform,
            "http://www.w3.org/2000/09/xmldsig#enveloped-signature": XmlDsigEnvelopedSignatureTransform
        };

        static HashAlgorithms: { [index: string]: IHashAlgorithmConstructable } = {
            "http://www.w3.org/2000/09/xmldsig#sha1": SHA1,
            "http://www.w3.org/2001/04/xmlenc#sha224": SHA224,
            "http://www.w3.org/2001/04/xmlenc#sha256": SHA256,
            "http://www.w3.org/2001/04/xmlenc#sha384": SHA384,
            "http://www.w3.org/2001/04/xmlenc#sha512": SHA512
        };

        static SignatureAlgorithms: { [index: string]: ISignatureAlgorithmConstructable } = {
            "http://www.w3.org/2000/09/xmldsig#rsa-sha1": RSASHA1,
            "http://www.w3.org/2001/04/xmldsig-more#rsa-sha224": RSASHA224,
            "http://www.w3.org/2001/04/xmldsig-more#rsa-sha256": RSASHA256,
            "http://www.w3.org/2001/04/xmldsig-more#rsa-sha384": RSASHA384,
            "http://www.w3.org/2001/04/xmldsig-more#rsa-sha512": RSASHA512,
            "http://www.w3.org/2000/09/xmldsig#hmac-sha1": HMACSHA1
        };

        static defaultNsForPrefix: INsPrefix = {
            ds: "http://www.w3.org/2000/09/xmldsig#"
        };

        protected GetPublicKey(): Promise {
            return new Promise((resolve, reject) => {
                if (this.key !== null)
                    return resolve(this.key);

                // if (this.pkEnumerator == null) {
                //     this.pkEnumerator = this.m_signature.KeyInfo.GetEnumerator();
                // }
                let pkEnumerator = this.KeyInfo.GetEnumerator();

                for (let kic of pkEnumerator) {
                    let key: CryptoKey = null;

                    // if (kic instanceof DSAKeyValue)
                    //     key = DSA.Create();
                    // else if (kic instanceof RSAKeyValue)
                    //     key = RSA.Create();

                    // if (this.key != null) {
                    //     this.key.FromXmlString(kic.GetXml().InnerXml);
                    //     return resolve(this.key);
                    // }

                    if (kic instanceof KeyInfoX509Data) {
                        let _x509Enumerator = (<KeyInfoX509Data>kic).Certificates;
                        for (let cert of _x509Enumerator) {
                            let sig_alg = this.Signature.SignedInfo.SignatureMethod;
                            let alg: any = null;
                            switch (sig_alg) {
                                case "http://www.w3.org/2000/09/xmldsig#rsa-sha1":
                                    alg = { name: "RSASSA-PKCS1-v1_5", hash: { name: "SHA-1" } };
                                    break;
                                case "http://www.w3.org/2001/04/xmldsig-more#rsa-sha256":
                                    alg = { name: "RSASSA-PKCS1-v1_5", hash: { name: "SHA-256" } };
                                    break;
                                default:
                                    throw new XmlError(XE.ALGORITHM_NOT_SUPPORTED, sig_alg);
                            }
                            return cert.exportKey(alg)
                                .then((key: CryptoKey) => {
                                    this.key = key;
                                    resolve(key);
                                })
                                .then(resolve, reject);
                        }
                    }
                }
            });
        }

        checkSignature(xml: Node): Promise {
            return new Promise((resolve, reject) => {
                this.validationErrors = [];
                // this.signedXml = xml;

                // if (!this.keyInfoProvider) {
                //     throw new Error("cannot validate signature since no key info resolver was provided");
                // }
                // this.signingKey = this.keyInfoProvider.getKey(this.keyInfo);
                // if (!this.signingKey) throw new Error(`key info provider could not resolve key info ${this.keyInfo}`);

                // let doc = new DOMParser().parseFromString(xml, APPLICATION_XML);

                this.validateReferences(xml)
                    .then(() => {
                        console.log("XADESJS: References checked");
                        return this.validateSignatureValue();
                    })
                    .then(resolve, reject);
            });
        }

        validateSignatureValue(): Promise {
            let signer: ISignatureAlgorithm;
            let signedInfoCanon: string;
            return new Promise((resolve, reject) => {
                signedInfoCanon = this.getCanonXml([this.SignedInfo.CanonicalizationMethodObject], this.SignedInfo.getXml());
                signer = this.findSignatureAlgorithm(this.SignatureMethod);
                this.GetPublicKey()
                    .then((key: CryptoKey) => {
                        console.log("XADESJS: Get public key for verification");
                        return signer.verifySignature(signedInfoCanon, key, Convert.FromBufferString(this.SignatureValue));
                    })
                    .then(resolve, reject);
            });
        }

        findSignatureAlgorithm(name: string): ISignatureAlgorithm {
            let algo = SignedXml.SignatureAlgorithms[name];
            if (algo)
                return new algo();
            else throw new Error(`signature algorithm '${name}' is not supported`);
        }

        findCanonicalizationAlgorithm(name: string): Transform {
            let algo = (<any>SignedXml).CanonicalizationAlgorithms[name];
            if (algo)
                return new algo();
            else throw new Error(`canonicalization algorithm '${name}' is not supported`);
        }

        findHashAlgorithm(name: string): IHashAlgorithm {
            let algo = SignedXml.HashAlgorithms[name];
            if (algo)
                return new algo();
            else throw new Error("hash algorithm '" + name + "' is not supported");
        }

        validateReferences(doc: Node): Promise {
            let that = this;
            return new Promise((resolve, reject) => {
                let refs = that.SignedInfo.References;
                let promise = Promise.resolve();
                for (let ref of refs) {
                    // if (!this.references.hasOwnProperty(r)) continue;
                    // let ref = this.references[r];

                    let uri = ref.Uri[0] === "#" ? ref.Uri.substring(1) : ref.Uri;
                    let elem: Node[] = [];

                    if (uri === "") {
                        elem = <Node[]>select(doc, "//*");
                    }
                    else {
                        for (let index in that.idAttributes) {
                            if (!that.idAttributes.hasOwnProperty(index))
                                continue;

                            elem = <Node[]>select(doc, `//*[@*[local-name(.)='${this.idAttributes[index]}']='${uri}']`);
                            if (elem.length > 0) break;
                        }
                    }

                    if (elem.length === 0) {
                        this.validationErrors.push(`invalid signature: the signature refernces an element with uri ${ref.Uri} but could not find such element in the xml`);
                        return false;
                    }
                    let canonXml = this.getCanonXml(ref.TransformChain, elem[0], { inclusiveNamespacesPrefixList: ref.inclusiveNamespacesPrefixList });

                    let hash = this.findHashAlgorithm(ref.DigestMethod);
                    promise = promise.then(() => {
                        return hash.getHash(canonXml);
                    })
                        .then((digest: Uint8Array) => {
                            if (Convert.FromBufferString(digest) !== Convert.FromBufferString(ref.DigestValue)) {
                                this.validationErrors.push(`invalid signature: for uri ${ref.Uri} calculated digest is ${digest} but the xml to validate supplies digest ${ref.DigestValue}`);
                                throw new XmlError(XE.CRYPTOGRAPHIC, "Wrong hash value");
                            }
                            return Promise.resolve();
                        });

                }
                promise.then(resolve, reject);
            });
        }

        /**
         * Compute the signature of the given xml (usign the already defined settings)
         *
         * Options:
         *
         * - `prefix` {String} Adds a prefix for the generated signature tags
         * - `attrs` {Object} A hash of attributes and values `attrName: value` to add to the signature root node
         * - `location` {{ reference: String, action: String }}
         *   An object with a `reference` key which should
         *   contain a XPath expression, an `action` key which
         *   should contain one of the following values:
         *   `append`, `prepend`, `before`, `after`
         *
         */
        computeSignature(xml: string, opts: IComputeSignatureOptions = {}) {
            let doc = new DOMParser().parseFromString(xml, APPLICATION_XML),
                xmlNsAttr = "xmlns",
                signatureAttrs: string[] = [],
                location: ILocation,
                prefix: string,
                currentPrefix: string;

            let validActions = ["append", "prepend", "before", "after"];

            opts = opts || {};
            prefix = opts.prefix;
            let attrs: IAssocArray = opts.attrs || {};
            location = <any>opts.location || {};
            // defaults to the root node
            location.reference = location.reference || "/*";
            // defaults to append action
            location.action = location.action || "append";

            if (validActions.indexOf(location.action) === -1) {
                throw new Error(`location.action option has an invalid action: ${location.action}, must be any of the following values: ${validActions.join(", ")}`);
            }

            // automatic insertion of `:`
            if (prefix) {
                xmlNsAttr += ":" + prefix;
                currentPrefix = prefix + ":";
            } else {
                currentPrefix = "";
            }

            Object.keys(attrs).forEach((name) => {
                if (name !== "xmlns" && name !== xmlNsAttr) {
                    signatureAttrs.push(`${name}="${attrs[name]}"`);
                }
            });

            // add the xml namespace attribute
            signatureAttrs.push(`${xmlNsAttr}="http://www.w3.org/2000/09/xmldsig#"`);

            this.signatureXml = `<${currentPrefix}Signature ${signatureAttrs.join(" ")}>`;

            let signedInfo = this.createSignedInfo(doc, prefix);
            this.signatureXml += signedInfo;
            this.signatureXml += this.createSignature(signedInfo, prefix);
            this.signatureXml += this.getKeyInfo(prefix);
            this.signatureXml += `</${currentPrefix}Signature>`;

            this.originalXmlWithIds = doc.toString();

            let signatureDoc = new DOMParser().parseFromString(this.signatureXml, APPLICATION_XML);

            let referenceNode = <Node[]>select(doc, location.reference);

            if (!referenceNode || referenceNode.length === 0) {
                throw new Error(`the following xpath cannot be used because it was not found: ${location.reference}`);
            }

            let node = referenceNode[0];

            switch (location.action) {
                case "append":
                    node.appendChild(signatureDoc.documentElement);
                    break;
                case "prepend":
                    node.insertBefore(signatureDoc.documentElement, node.firstChild);
                    break;
                case "before":
                    node.parentNode.insertBefore(signatureDoc.documentElement, node);
                case "after":
                    node.parentNode.insertBefore(signatureDoc.documentElement, node.nextSibling);
                    break;
                default:
                    throw new TypeError(`Unknnown location action in use '${location.action}'`);
            }

            this.signedXml = doc.toString();
        }

        getKeyInfo(prefix: string): string {
            let res = "";

            let currentPrefix = prefix || "";
            currentPrefix = currentPrefix ? currentPrefix + ":" : currentPrefix;

            if (this.keyInfoProvider) {
                res += `<${currentPrefix}KeyInfo>${this.keyInfoProvider.getKeyInfo(this.signingKey, prefix)}</${currentPrefix}KeyInfo>`;
            }
            return res;
        }

        /**
         * Generate the Reference nodes (as part of the signature process)
         *
         */
        createReferences(doc: Node, prefix: string = ""): string {
            let res = "";

            prefix = prefix ? prefix + ":" : prefix;

            for (let n in this.references) {
                if (!this.references.hasOwnProperty(n))
                    continue;

                let ref = this.references[n],
                    nodes = <Node[]>select(doc, ref.xpath);

                if (nodes.length === 0) {
                    throw new Error(`the following xpath cannot be signed because it was not found: ${ref.xpath}`);
                }

                for (let h in nodes) {
                    if (!nodes.hasOwnProperty(h))
                        continue;

                    let node = nodes[h];
                    if (ref.isEmptyUri) {
                        res += `<${prefix}Reference URI="">`;
                    }
                    else {
                        let id = this.ensureHasId(<Element>node);
                        ref.uri = id;
                        res += `<${prefix}Reference URI="#${id}">`;
                    }
                    res += `<${prefix}Transforms>`;
                    for (let t in ref.transforms) {
                        if (!ref.transforms.hasOwnProperty(t))
                            continue;

                        let trans = ref.transforms[t];
                        let transform = this.findCanonicalizationAlgorithm(trans);
                        res += `<${prefix}Transform Algorithm="${transform.getAlgorithmName()}"/>`;
                    }

                    let canonXml = this.getCanonXml(ref.transforms, node);

                    let digestAlgorithm = this.findHashAlgorithm(ref.digestAlgorithm);
                    res += `</${prefix}Transforms>` +
                        `<${prefix}DigestMethod Algorithm="${digestAlgorithm.getAlgorithmName()}"/>` +
                        `<${prefix}DigestValue>${digestAlgorithm.getHash(canonXml)}</${prefix}DigestValue>` +
                        `</${prefix}Reference>`;
                }
            }

            return res;
        }

        getCanonXml(transforms: Transform[], node: Node, options?: IProcessOptions): string {
            options = options || {};
            options.defaultNsForPrefix = options.defaultNsForPrefix || SignedXml.defaultNsForPrefix;

            let canonXml = node;

            for (let transform of transforms) {
                // if (!transforms.hasOwnProperty(t))
                //     continue;

                // let transform = this.findCanonicalizationAlgorithm(transforms[t]);
                canonXml = transform.process(canonXml, options);
                /**
                 * TODO: currently transform.process may return either Node or String value (enveloped transformation returns Node, exclusive-canonicalization returns String).
                 * This eitehr needs to be more explicit in the API, or all should return the same.
                 * exclusive-canonicalization returns String since it builds the Xml by hand. If it had used xmldom it would inccorectly minimize empty tags
                 * to <x/> instead of <x></x> and also incorrectly handle some delicate line break issues.
                 * enveloped transformation returns Node since if it would return String consider this case:
                 * <x xmlns:p='ns'><p:y/></x>
                 * if only y is the node to sign then a string would be <p:y/> without the definition of the p namespace. probably xmldom toString() should have added it. 
                 */
            }
            return canonXml.toString();
        }

        /**
         * Ensure an element has Id attribute. If not create it with unique value.
         * Work with both normal and wssecurity Id flavour
         */
        ensureHasId(node: Element): string {
            let attr: Attr;

            if (this.idMode === "wssecurity") {
                attr = findAttr(node,
                    "Id",
                    "http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd");
            }
            else {
                for (let index in this.idAttributes) {
                    if (!this.idAttributes.hasOwnProperty(index)) continue;

                    attr = findAttr(node, this.idAttributes[index], null);
                    if (attr) break;
                }
            }

            if (attr) return attr.value;

            // add the attribute
            let id = `_${this.id++}`;

            if (this.idMode === "wssecurity") {
                node.setAttributeNS("http://www.w3.org/2000/xmlns/",
                    "xmlns:wsu",
                    "http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd");
                node.setAttributeNS("http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd",
                    "wsu:Id",
                    id);
            }
            else {
                node.setAttribute("Id", id);
            }

            return id;
        }

        /**
         * Create the SignedInfo element
         */
        createSignedInfo(doc: Node, prefix: string = ""): string {
            let transform = this.findCanonicalizationAlgorithm(this.CanonicalizationMethod);
            let algo = this.findSignatureAlgorithm(this.SignatureMethod);
            let currentPrefix = prefix ? prefix + ":" : prefix;

            let res = `<${currentPrefix}SignedInfo>`;
            res += `<${currentPrefix}CanonicalizationMethod Algorithm="${transform.getAlgorithmName()}"/>` +
                `<${currentPrefix}SignatureMethod Algorithm="${algo.getAlgorithmName()}"/>`;

            res += this.createReferences(doc, prefix);
            res += `</${currentPrefix}SignedInfo>`;
            return res;
        }

        /**
         * Create the Signature element
         */
        createSignature(signedInfo: string, prefix: string): string {
            let xmlNsAttr = "xmlns";

            if (prefix) {
                xmlNsAttr += `:${prefix}`;
                prefix += ":";
            } else {
                prefix = "";
            }

            // the canonicalization requires to get a valid xml node.
            // we need to wrap the info in a dummy signature since it contains the default namespace.
            let dummySignatureWrapper = `<${prefix}Signature ${xmlNsAttr}="http://www.w3.org/2000/09/xmldsig#">${signedInfo}</${prefix}Signature>`;

            let xml = new DOMParser().parseFromString(dummySignatureWrapper, APPLICATION_XML);
            // get the signedInfo
            let node = xml.documentElement.firstChild;
            let canAlgorithm = this.findCanonicalizationAlgorithm(this.CanonicalizationMethod);
            let canonizedSignedInfo = canAlgorithm.process(node);
            let signatureAlgorithm = this.findSignatureAlgorithm(this.SignatureMethod);
            this.SignatureValue = signatureAlgorithm.getSignature(canonizedSignedInfo, this.key);
            return `<${prefix}SignatureValue>${this.SignatureValue}</${prefix}SignatureValue>`;
        }

        // loadSignature(signature: Node): void;
        // loadSignature(signature: string): void;
        // loadSignature(signature: Node | string): void {
        //     let _signature: Node;
        //     if (typeof signature === "string") {
        //         this.signatureElement = _signature = new DOMParser().parseFromString(<string>signature, APPLICATION_XML);
        //     } else {
        //         this.signatureElement = _signature = <Node>signature;
        //     }

        //     this.signatureXml = signature.toString();

        //     let nodes: Node[] = <Node[]>select(_signature, ".//*[local-name(.)='CanonicalizationMethod']/@Algorithm");
        //     if (nodes.length === 0) throw new Error("could not find CanonicalizationMethod/@Algorithm element");
        //     this.CanonicalizationMethod = nodes[0].nodeValue;

        //     this.SignatureMethod =
        //         findFirst(_signature, ".//*[local-name(.)='SignatureMethod']/@Algorithm").nodeValue;

        //     this.references = [];
        //     let references: Node[] = <Node[]>select(_signature, ".//*[local-name(.)='SignedInfo']/*[local-name(.)='Reference']");
        //     if (references.length === 0)
        //         throw new Error("could not find any Reference elements");

        //     for (let i in references) {
        //         if (!references.hasOwnProperty(i))
        //             continue;

        //         this.loadReference(references[i]);
        //     }

        //     let signValue = <Text>findFirst(_signature, ".//*[local-name(.)='SignatureValue']/text()");
        //     this.SignatureValue = signValue.data.replace(/\n/g, "");

        //     this.keyInfo = select(_signature, ".//*[local-name(.)='KeyInfo']")[0] as Element;
        //     this.key = new KeyInfo();
        //     this.key.loadXml(this.keyInfo);
        // }

        /**
         * loadSignature
         */
        public loadXml(value: Element): void {
            if (value == null)
                throw new XmlError(XE.PARAM_REQUIRED, "value");

            this.signatureElement = value;
            this.m_signature.loadXml(value);
            this.signatureXml = value.toString();
            // Need to give the EncryptedXml object to the 
            // XmlDecryptionTransform to give it a fighting 
            // chance at decrypting the document.
            // for (let r of this.m_signature.SignedInfo.References) {
            //     for (let t of r.TransformChain) {
            //         if (t instanceof XmlDecryptionTransform)
            //             (<XmlDecryptionTransform>t).EncryptedXml = this.EncryptedXml;
            //     }
            // }
        }


        getSignatureXml(): string {
            return this.signatureXml;
        }

        getOriginalXmlWithIds(): string {
            return this.originalXmlWithIds;
        }

        getSignedXml(): string {
            return this.signedXml;
        }

    }
}