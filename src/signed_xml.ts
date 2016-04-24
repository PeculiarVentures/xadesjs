namespace xadesjs {

    export const APPLICATION_XML = "application/xml";

    /**
    * Xml signature implementation
    */
    export class SignedXml extends XmlObject {

        protected static XmlDsigCanonicalizationUrl = "http://www.w3.org/TR/2001/REC-xml-c14n-20010315";
        protected static XmlDsigCanonicalizationWithCommentsUrl = SignedXml.XmlDsigCanonicalizationUrl + "#WithComments";
        protected static XmlDsigNamespaceUrl = "http://www.w3.org/2000/09/xmldsig#";
        protected static XmlDsigDSAUrl = SignedXml.XmlDsigNamespaceUrl + "dsa-sha1";
        protected static XmlDsigHMACSHA1Url = SignedXml.XmlDsigNamespaceUrl + "hmac-sha1";
        protected static XmlDsigMinimalCanonicalizationUrl = SignedXml.XmlDsigNamespaceUrl + "minimal";
        protected static XmlDsigRSASHA1Url = SignedXml.XmlDsigNamespaceUrl + "rsa-sha1";
        protected static XmlDsigSHA1Url = SignedXml.XmlDsigNamespaceUrl + "sha1";

        protected static XmlDecryptionTransformUrl = "http://www.w3.org/2002/07/decrypt#XML";
        protected static XmlDsigBase64TransformUrl = SignedXml.XmlDsigNamespaceUrl + "base64";
        protected static XmlDsigC14NTransformUrl = SignedXml.XmlDsigCanonicalizationUrl;
        protected static XmlDsigC14NWithCommentsTransformUrl = SignedXml.XmlDsigCanonicalizationWithCommentsUrl;
        protected static XmlDsigEnvelopedSignatureTransformUrl = SignedXml.XmlDsigNamespaceUrl + "enveloped-signature";
        protected static XmlDsigExcC14NTransformUrl = "http://www.w3.org/2001/10/xml-exc-c14n#";
        protected static XmlDsigExcC14NWithCommentsTransformUrl = SignedXml.XmlDsigExcC14NTransformUrl + "WithComments";
        protected static XmlDsigXPathTransformUrl = "http://www.w3.org/TR/1999/REC-xpath-19991116";
        protected static XmlDsigXsltTransformUrl = "http://www.w3.org/TR/1999/REC-xslt-19991116";
        protected static XmlLicenseTransformUrl = "urn:mpeg:mpeg21:2003:01-REL-R-NS:licenseTransform";


        protected m_element: Node = null;
        protected m_signature: Signature = null;
        protected m_signature_algorithm: ISignatureAlgorithm = null;
        protected envdoc: Document = null;

        protected validationErrors: string[] = [];
        protected key: CryptoKey = null;
        protected idAttributes = ["Id", "ID"];

        private static whitespaceChars = [` `, `\r`, `\n`, `\t`];

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

        set Prefix(value: string) {
            console.log("Change prefix");
            this.m_prefix = value;
            this.SignedInfo.Prefix = this.m_prefix;
        }
        get Prefix(): string {
            return this.m_prefix;
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
            this.m_signature_algorithm = null;
            return this.key;
        }
        set SigningKey(value: CryptoKey) {
            this.key = value;
        }

        /**
         * @param {string} idMode. Value of "wssecurity" will create/validate id's with the ws-security namespace
         */
        constructor();
        constructor(node: Document);
        constructor(node: Element);
        constructor(node?: any) {
            super();
            // constructor();
            this.m_signature = new Signature();
            this.m_signature.SignedInfo = new SignedInfo();
            // this.hashes = new Hashtable(2); // 98% SHA1 for now
            if (node && (node as Node).nodeType === XmlNodeType.Document) {
                // constructor(node: Document);
                this.envdoc = node;
            }
            else if (node && (node as Node).nodeType === XmlNodeType.Element) {
                // constructor(node: Element);
                this.envdoc = new DOMParser().parseFromString(node.outerHTML, APPLICATION_XML);
            }
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
            "http://www.w3.org/2000/09/xmldsig#rsa-sha1": RsaSha1,
            "http://www.w3.org/2001/04/xmldsig-more#rsa-sha224": RsaSha224,
            "http://www.w3.org/2001/04/xmldsig-more#rsa-sha256": RsaSha256,
            "http://www.w3.org/2001/04/xmldsig-more#rsa-sha384": RsaSha384,
            "http://www.w3.org/2001/04/xmldsig-more#rsa-sha512": RsaSha512,
            "http://www.w3.org/2001/04/xmldsig-more#ecdsa-sha1": EcdsaSha1,
            "http://www.w3.org/2001/04/xmldsig-more#ecdsa-sha224": EcdsaSha224,
            "http://www.w3.org/2001/04/xmldsig-more#ecdsa-sha256": EcdsaSha256,
            "http://www.w3.org/2001/04/xmldsig-more#ecdsa-sha384": EcdsaSha384,
            "http://www.w3.org/2001/04/xmldsig-more#ecdsa-sha512": EcdsaSha512,
            "http://www.w3.org/2000/09/xmldsig#hmac-sha1": HMACSHA1
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
                    let alg = this.findSignatureAlgorithm(this.SignatureMethod);
                    kic.exportKey(alg.algorithm)
                        .then((key: CryptoKey) => {
                            this.key = key;
                            return Promise.resolve(key);
                        })
                        .then(resolve, reject);
                }
            });
        }

        AddReference(reference: Reference): void {
            if (reference == null)
                throw new XmlError(XE.PARAM_REQUIRED, "reference");
            this.m_signature.SignedInfo.AddReference(reference);
        }

        private DigestReferences(): Promise {
            return new Promise((resolve, reject) => {
                let promise = Promise.resolve();
                // we must tell each reference which hash algorithm to use 
                // before asking for the SignedInfo XML !
                for (let r of this.m_signature.SignedInfo.References) {
                    // assume SHA-1 if nothing is specified
                    if (r.DigestMethod == null)
                        r.DigestMethod = new SHA1().xmlNamespace;
                    promise = promise.then(() => {
                        return this.GetReferenceHash(r, false);
                    })
                        .then((hashValue: ArrayBuffer) => {
                            r.DigestValue = hashValue;
                            return Promise.resolve();
                        });
                }
                promise.then(resolve, reject);
            });
        }

        private FixupNamespaceNodes(src: Element, dst: Element, ignoreDefault: boolean): void {
            // add namespace nodes
            // let nodes = select(src, "namespace::*");
            // for (let i = 0; i < nodes.length; i++) {
            //     let attr = nodes[i];
            //     if (attr.localName === "xml")
            //         continue;
            //     if (ignoreDefault && attr.localName === "xmlns")
            //         continue;
            //     dst.setAttributeNode(dst.ownerDocument.importNode(attr, true) as Attr);
            // }
        }

        private GetReferenceHash(r: Reference, check_hmac: boolean): Promise {
            return new Promise((resolve, reject) => {
                let doc: Node = null;
                let s: string = null;
                if (!r.Uri) { // Empty
                    doc = this.envdoc;
                }
                else {
                    doc = CreateDocument();
                    let objectName: string = null;

                    if (r.Uri.indexOf("#xpointer") === 0) {
                        let uri: string = r.Uri;
                        SignedXml.whitespaceChars.forEach((c) => {
                            uri = uri.substring(9).split(c).join("");
                        });
                        if (uri.length < 2 || uri[0] !== `(` || uri[uri.length - 1] !== `)`)
                            // FIXME: how to handle invalid xpointer?
                            uri = ""; // String.Empty
                        else
                            uri = uri.substring(1, uri.length - 2);
                        if (uri === "/")
                            doc = this.envdoc;
                        else if (uri.length > 6 && uri.indexOf(`id(`) === 0 && uri[uri.length - 1] === `)`)
                            // id('foo'), id("foo")
                            objectName = uri.substring(4, uri.length - 6);
                    }
                    else if (r.Uri[0] === `#`) {
                        objectName = r.Uri.substring(1);
                    }
                    if (objectName != null) {
                        let found: Element = null;
                        for (let i in this.m_signature.ObjectList) {
                            let obj = this.m_signature.ObjectList[i];
                            if (obj.Id === objectName) {
                                found = obj.getXml();
                                found.setAttribute("xmlns", SignedXml.XmlDsigNamespaceUrl);
                                doc.appendChild((doc as Document).importNode(found, true));
                                // FIXME: there should be theoretical justification of copying namespace declaration nodes this way.
                                for (let j = 0; j < found.childNodes.length; j++) {
                                    let n = found.childNodes[j];
                                    // Do not copy default namespace as it must be xmldsig namespace for "Object" element.
                                    if (n.nodeType === XmlNodeType.Element)
                                        this.FixupNamespaceNodes(n as Element, (doc as Document).documentElement, true);
                                }
                                break;

                            }
                        }
                        if (found == null && this.envdoc != null) {
                            found = this.GetIdElement(this.envdoc, objectName);
                            if (found != null) {
                                doc = (doc as Document).importNode(found, true);
                                this.FixupNamespaceNodes(found, doc as Element, false);
                            }
                        }
                        if (found == null)
                            throw new XmlError(XE.CRYPTOGRAPHIC, `Malformed reference object: ${objectName}`);
                    }
                }

                if (r.TransformChain.length > 0) {
                    for (let i in r.TransformChain) {
                        let t = r.TransformChain[i];
                        if (t instanceof XmlDsigC14NWithCommentsTransform)
                            t = new XmlDsigC14NTransform(); // TODO: Check RFC for it
                        if (t instanceof XmlDsigExcC14NWithCommentsTransform)
                            t = new XmlDsigExcC14NTransform(); // TODO: Check RFC for it
                        t.LoadInnerXml(doc);
                        s = t.GetOutput();
                    }
                    // Apply C14N transform if Reference has only one transform EnvelopdeSignature
                    if (r.TransformChain.length === 1 && r.TransformChain[0] instanceof XmlDsigEnvelopedSignatureTransform) {
                        let c14n = new XmlDsigC14NTransform();
                        c14n.LoadInnerXml(doc);
                        s = c14n.GetOutput();
                    }
                }
                else if (s == null) {
                    // we must not C14N references from outside the document
                    // e.g. non-xml documents
                    if (r.Uri && r.Uri[0] !== `#`) {
                        s = new XMLSerializer().serializeToString(doc);
                    }
                    else {
                        // apply default C14N transformation
                        let excC14N = new XmlDsigC14NTransform();
                        excC14N.LoadInnerXml(doc);
                        s = excC14N.GetOutput();
                    }
                }
                let digest = this.findHashAlgorithm(r.DigestMethod);
                if (digest == null)
                    resolve(null);
                else {
                    if (typeof s === "object")
                        s = new XMLSerializer().serializeToString(s as any);
                    digest.getHash(s)
                        .then(resolve, reject);
                }
            });
        }

        private GetC14NMethod(): Transform {
            let t = <Transform>CryptoConfig.CreateFromName(this.m_signature.SignedInfo.CanonicalizationMethod);
            if (t == null)
                throw new XmlError(XE.CRYPTOGRAPHIC, `Unknown Canonicalization Method ${this.m_signature.SignedInfo.CanonicalizationMethod}`);
            return t;
        }

        private SignedInfoTransformed(): string {
            let t = this.GetC14NMethod();

            let doc = this.SignedInfo.getXml();
            // TODO: xpath has error on "namespace::*", uncomment after fix it
            if (this.envdoc != null)
                // for (let attr: Attr of select(this.envdoc.documentElement, "namespace::*")) {
                //     if (attr.localName === "xml")
                //         continue;
                //     if (attr.prefix === doc.documentElement.prefix)
                //         continue;
                //     doc.documentElement.setAttributeNode(doc.importNode(attr, true) as Attr);
                // }
                t.LoadInnerXml(doc);
            return t.GetOutput();
        }

        public ComputeSignature(algorithm: Algorithm): Promise {
            return new Promise((resolve, reject) => {
                if (this.key != null) {
                    let alg = GetSignatureAlgorithm(algorithm);
                    if (this.m_signature.SignedInfo.SignatureMethod == null)
                        // required before hashing
                        this.m_signature.SignedInfo.SignatureMethod = alg.xmlNamespace;
                    else if (this.m_signature.SignedInfo.SignatureMethod !== alg.xmlNamespace)
                        throw new XmlError(XE.CRYPTOGRAPHIC, "Specified SignatureAlgorithm is not supported by the signing key.");
                    this.DigestReferences()
                        .then(() => {
                            // let si = this.getCanonXml([this.SignedInfo.CanonicalizationMethodObject], this.SignedInfo.getXml());
                            let si = this.SignedInfoTransformed();
                            alg.getSignature(si, this.key)
                                .then((signature: Uint8Array) => {
                                    this.m_signature.SignatureValue = signature;
                                    resolve(signature);
                                })
                                .catch(reject);
                        })
                        .catch(reject);
                }
                else
                    throw new XmlError(XE.CRYPTOGRAPHIC, "signing key is not specified");
            });
        }

        CheckSignature(xml: Node): Promise {
            return new Promise((resolve, reject) => {
                this.validationErrors = [];
                this.envdoc = xml as Document;
                // this.signedXml = xml;

                // if (!this.keyInfoProvider) {
                //     throw new Error("cannot validate signature since no key info resolver was provided");
                // }
                // this.signingKey = this.keyInfoProvider.getKey(this.keyInfo);
                // if (!this.signingKey) throw new Error(`key info provider could not resolve key info ${this.keyInfo}`);

                // let doc = new DOMParser().parseFromString(xml, APPLICATION_XML);

                this.ValidateReferences(xml)
                    .then(() => {
                        // console.log("XADESJS: References checked");
                        return this.validateSignatureValue();
                    })
                    .then(resolve, reject);
            });
        }

        protected validateSignatureValue(): Promise {
            let signer: ISignatureAlgorithm;
            let signedInfoCanon: string;
            return new Promise((resolve, reject) => {
                // signedInfoCanon = this.getCanonXml([this.SignedInfo.CanonicalizationMethodObject], this.SignedInfo.getXml());
                signedInfoCanon = this.SignedInfoTransformed();
                signer = this.findSignatureAlgorithm(this.SignatureMethod);
                this.GetPublicKey()
                    .then((key: CryptoKey) => {
                        // console.log("XADESJS: Get public key for verification");
                        return signer.verifySignature(signedInfoCanon, key, Convert.FromBufferString(this.SignatureValue));
                    })
                    .then(resolve, reject);
            });
        }

        protected findSignatureAlgorithm(name: string): ISignatureAlgorithm {
            let algo = SignedXml.SignatureAlgorithms[name];
            if (algo)
                return new algo();
            else throw new Error(`signature algorithm '${name}' is not supported`);
        }

        protected findCanonicalizationAlgorithm(name: string): Transform {
            let algo = (<any>SignedXml).CanonicalizationAlgorithms[name];
            if (algo)
                return new algo();
            else throw new Error(`canonicalization algorithm '${name}' is not supported`);
        }

        protected findHashAlgorithm(name: string): IHashAlgorithm {
            let algo = SignedXml.HashAlgorithms[name];
            if (algo)
                return new algo();
            else throw new Error("hash algorithm '" + name + "' is not supported");
        }

        protected ValidateReferences(doc: Node): Promise {
            let that = this;
            return new Promise((resolve, reject) => {
                let refs = that.SignedInfo.References;
                let promise = Promise.resolve();
                for (let ref of refs) {

                    promise = promise.then(() => {
                        return this.GetReferenceHash(ref, false);
                    })
                        .then((digest: Uint8Array) => {
                            if (Convert.FromBufferString(digest) !== Convert.FromBufferString(ref.DigestValue)) {
                                let err_text = `invalid signature: for uri ${ref.Uri} calculated digest is ${digest} but the xml to validate supplies digest ${ref.DigestValue}`;
                                this.validationErrors.push(err_text);
                                throw new XmlError(XE.CRYPTOGRAPHIC, err_text);
                            }
                            return Promise.resolve();
                        });

                }
                promise.then(resolve, reject);
            });
        }

        getCanonXml(transforms: Transform[], node: Node): string {
            let res = "";
            let canonXml = node;

            for (let transform of transforms) {
                if (res)
                    canonXml = new DOMParser().parseFromString(res, APPLICATION_XML);

                transform.LoadInnerXml(canonXml);
                res = transform.GetOutput();
            }
            if (!res)
                res = new XMLSerializer().serializeToString(canonXml);
            return res;
        }

        /**
         * loadSignature
         */
        public loadXml(value: Element): void {
            if (value == null)
                throw new XmlError(XE.PARAM_REQUIRED, "value");

            this.m_element = value;
            this.m_signature.loadXml(value);
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

        protected GetIdElement(document: Document, idValue: string): Element {
            if ((document == null) || (idValue == null))
                return null;

            // this works only if there's a DTD or XSD available to define the ID
            let xel: Node = document.getElementById(idValue);
            if (xel == null) {
                // search an "undefined" ID
                xel = SelectSingleNode(document, `//*[@Id='${idValue}']`);
                if (xel == null) {
                    xel = SelectSingleNode(document, `//*[@ID='${idValue}']`);
                    if (xel == null) {
                        xel = SelectSingleNode(document, `//*[@id='${idValue}']`);
                    }
                }
            }
            return xel as Element;
        }

        public getXml(): Element {
            this.m_signature.Prefix = this.Prefix;
            return this.m_signature.getXml(this.envdoc);
        }

    }

    function GetSignatureAlgorithm(algorithm: Algorithm): ISignatureAlgorithm {
        if (algorithm.name.toUpperCase() === "RSASSA-PKCS1-V1_5") {
            let hashName: string = (algorithm as any).hash.name;
            let alg: ISignatureAlgorithm;
            switch (hashName.toUpperCase()) {
                case "SHA-1":
                    alg = new RsaSha1();
                    break;
                case "SHA-224":
                    alg = new RsaSha224();
                    break;
                case "SHA-256":
                    alg = new RsaSha256();
                    break;
                case "SHA-384":
                    alg = new RsaSha384();
                    break;
                case "SHA-512":
                    alg = new RsaSha512();
                    break;
                default:
                    throw new XmlError(XE.ALGORITHM_NOT_SUPPORTED, `${algorithm.name}:${hashName}`);
            }
            return alg;
        }
        else if (algorithm.name.toUpperCase() === "ECDSA") {
            let hashName: string = (algorithm as any).hash.name;
            let alg: ISignatureAlgorithm;
            switch (hashName.toUpperCase()) {
                case "SHA-1":
                    alg = new EcdsaSha1();
                    break;
                case "SHA-224":
                    alg = new EcdsaSha224();
                    break;
                case "SHA-256":
                    alg = new EcdsaSha256();
                    break;
                case "SHA-384":
                    alg = new EcdsaSha384();
                    break;
                case "SHA-512":
                    alg = new EcdsaSha512();
                    break;
                default:
                    throw new XmlError(XE.ALGORITHM_NOT_SUPPORTED, `${algorithm.name}:${hashName}`);
            }
            return alg;
        }
        else {
            throw new XmlError(XE.ALGORITHM_NOT_SUPPORTED, algorithm.name);
        }
    }
}