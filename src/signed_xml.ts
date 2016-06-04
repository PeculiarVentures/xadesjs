namespace xadesjs {

    export const APPLICATION_XML = "application/xml";

    /**
    * Provides a wrapper on a core XML signature object to facilitate creating XML signatures.
    */
    export class SignedXml extends XmlObject {

        /**
         * Represents the Uniform Resource Identifier (URI) for the standard canonicalization 
         * algorithm for XML digital signatures. This field is constant.
         */
        protected static XmlDsigCanonicalizationUrl = "http://www.w3.org/TR/2001/REC-xml-c14n-20010315";

        /**
         * Represents the Uniform Resource Identifier (URI) for the standard canonicalization algorithm 
         * for XML digital signatures and includes comments. This field is constant.
         */
        protected static XmlDsigCanonicalizationWithCommentsUrl = SignedXml.XmlDsigCanonicalizationUrl + "#WithComments";

        /**
         * Represents the Uniform Resource Identifier (URI) for the standard namespace for XML digital signatures. 
         * This field is constant.
         */
        protected static XmlDsigNamespaceUrl = "http://www.w3.org/2000/09/xmldsig#";
        protected static XmlDsigDSAUrl = SignedXml.XmlDsigNamespaceUrl + "dsa-sha1";

        /**
         * Represents the Uniform Resource Identifier (URI) for the standard HMACSHA1 algorithm for XML digital signatures. 
         * This field is constant.
         */
        protected static XmlDsigHMACSHA1Url = SignedXml.XmlDsigNamespaceUrl + "hmac-sha1";

        /**
         * Represents the Uniform Resource Identifier (URI) for the standard minimal canonicalization algorithm 
         * for XML digital signatures. This field is constant.
         */
        protected static XmlDsigMinimalCanonicalizationUrl = SignedXml.XmlDsigNamespaceUrl + "minimal";

        /**
         * Represents the Uniform Resource Identifier (URI) for the standard RSA signature method 
         * for XML digital signatures. This field is constant.
         */
        protected static XmlDsigRSASHA1Url = SignedXml.XmlDsigNamespaceUrl + "rsa-sha1";

        /**
         * Represents the Uniform Resource Identifier (URI) for the standard SHA1 digest method for 
         * XML digital signatures. This field is constant.
         */
        protected static XmlDsigSHA1Url = SignedXml.XmlDsigNamespaceUrl + "sha1";

        /**
         * Represents the Uniform Resource Identifier (URI) for the XML mode 
         * decryption transformation. This field is constant.
         */
        protected static XmlDecryptionTransformUrl = "http://www.w3.org/2002/07/decrypt#XML";

        /**
         * Represents the Uniform Resource Identifier (URI) for the base 64 transformation. This field is constant.
         */
        protected static XmlDsigBase64TransformUrl = SignedXml.XmlDsigNamespaceUrl + "base64";

        /**
         * Represents the Uniform Resource Identifier (URI) 
         * for the Canonical XML transformation. This field is constant.
         */
        protected static XmlDsigC14NTransformUrl = SignedXml.XmlDsigCanonicalizationUrl;

        /**
         * Represents the Uniform Resource Identifier (URI) for the Canonical XML transformation, 
         * with comments. This field is constant.
         */
        protected static XmlDsigC14NWithCommentsTransformUrl = SignedXml.XmlDsigCanonicalizationWithCommentsUrl;

        /**
         * Represents the Uniform Resource Identifier (URI) for enveloped signature transformation. 
         * This field is constant.
         */
        protected static XmlDsigEnvelopedSignatureTransformUrl = SignedXml.XmlDsigNamespaceUrl + "enveloped-signature";

        /**
         * Represents the Uniform Resource Identifier (URI) for exclusive XML canonicalization. 
         * This field is constant.
         */
        protected static XmlDsigExcC14NTransformUrl = "http://www.w3.org/2001/10/xml-exc-c14n#";

        /**
         * Represents the Uniform Resource Identifier (URI) for exclusive XML canonicalization, with comments. 
         * This field is constant.
         */
        protected static XmlDsigExcC14NWithCommentsTransformUrl = SignedXml.XmlDsigExcC14NTransformUrl + "WithComments";

        /**
         * Represents the Uniform Resource Identifier (URI) for the XML Path Language (XPath). 
         * This field is constant.
         */
        protected static XmlDsigXPathTransformUrl = "http://www.w3.org/TR/1999/REC-xpath-19991116";

        /**
         * Represents the Uniform Resource Identifier (URI) for XSLT transformations. 
         * This field is constant.
         */
        protected static XmlDsigXsltTransformUrl = "http://www.w3.org/TR/1999/REC-xslt-19991116";

        /**
         * Represents the Uniform Resource Identifier (URI) for the license transform algorithm 
         * used to normalize XrML licenses for signatures.
         */
        protected static XmlLicenseTransformUrl = "urn:mpeg:mpeg21:2003:01-REL-R-NS:licenseTransform";

        // Internal properties

        protected m_element: Node = null;

        /**
         * Represents the Signature object of the current SignedXml object
         */
        protected m_signature: Signature = null;
        protected m_signature_algorithm: ISignatureAlgorithm = null;
        protected envdoc: Document = null;

        protected validationErrors: string[] = [];
        protected key: CryptoKey = null;
        protected idAttributes = ["Id", "ID"];

        private static whitespaceChars = [` `, `\r`, `\n`, `\t`];

        /**
         * Gets or sets the KeyInfo object of the current SignedXml object.
         */
        get KeyInfo(): KeyInfo {
            if (this.m_signature.KeyInfo == null)
                this.m_signature.KeyInfo = new KeyInfo();
            return this.m_signature.KeyInfo;
        }
        set KeyInfo(value: KeyInfo) {
            this.m_signature.KeyInfo = value;
        }

        /**
         * Gets the Signature object of the current SignedXml object.
         */
        get Signature(): Signature {
            return this.m_signature;
        }

        /**
         * Gets or sets the prefix for the current SignedXml object.
         */
        set Prefix(value: string) {
            this.m_prefix = value;
            this.SignedInfo.Prefix = this.m_prefix;
        }
        get Prefix(): string {
            return this.m_prefix;
        }

        /**
         * Gets the length of the signature for the current SignedXml object.
         */
        get SignatureLength(): number {
            return this.m_signature.SignatureValue.length;
        }

        get SignatureMethod(): string {
            return this.m_signature.SignedInfo.SignatureMethod;
        }

        /**
         * Gets the signature value of the current SignedXml object.
         */
        get SignatureValue(): ArrayBuffer {
            return this.m_signature.SignatureValue;
        }

        /**
         * Gets the CanonicalizationMethod of the current SignedXml object.
         */
        get CanonicalizationMethod(): string {
            return this.m_signature.SignedInfo.CanonicalizationMethod;
        }

        /**
         * Gets the SignedInfo object of the current SignedXml object.
         */
        get SignedInfo(): SignedInfo {
            return this.m_signature.SignedInfo;
        }

        /**
         * Gets or sets the asymmetric algorithm key used for signing a SignedXml object.
         */
        get SigningKey(): CryptoKey {
            return this.key;
        }
        set SigningKey(value: CryptoKey) {
            this.key = value;
        }

        /**
         * Gets or sets the name of the installed key to be used for signing the SignedXml object.
         */
        get SigningKeyName(): string {
            throw new XmlError(XE.METHOD_NOT_IMPLEMENTED);
        }
        set SigningKeyName(value: string) {
            throw new XmlError(XE.METHOD_NOT_IMPLEMENTED);
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
            this.m_signature.SignedInfo = new SignedInfo(this);
            // this.hashes = new Hashtable(2); // 98% SHA1 for now
            if (node && (node as Node).nodeType === XmlNodeType.Document) {
                // constructor(node: Document);
                this.envdoc = node;
            }
            else if (node && (node as Node).nodeType === XmlNodeType.Element) {
                // constructor(node: Element);
                let xmlText = new XMLSerializer().serializeToString(node);
                this.envdoc = new DOMParser().parseFromString(xmlText, APPLICATION_XML);
            }
        }

        /**
         * Returns the public key of a signature.
         */
        protected GetPublicKey(): Promise {
            return new Promise((resolve, reject) => {
                if (this.key !== null)
                    return resolve(this.key);

                let pkEnumerator = this.KeyInfo.GetEnumerator();

                for (let kic of pkEnumerator) {
                    let alg = CryptoConfig.CreateSignatureAlgorithm(this.SignatureMethod);
                    kic.exportKey(alg.algorithm)
                        .then((key: CryptoKey) => {
                            this.key = key;
                            return Promise.resolve(key);
                        })
                        .then(resolve, reject);
                }
            });
        }


        /**
         * Adds a Reference object to the SignedXml object that describes a digest method, 
         * digest value, and transform to use for creating an XML digital signature.
         * @param  {Reference} reference The Reference object that describes a digest method, digest value, 
         * and transform to use for creating an XML digital signature.
         * @returns void
         */
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
                        r.DigestMethod = new Sha1().xmlNamespace;
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
            let namespaces = SelectNamespaces(src);
            for (let i in namespaces) {
                let uri = namespaces[i];
                dst.setAttribute("xmlns" + (i ? ":" + i : ""), uri);
            }
        }

        protected findById(element: Element, id: string): Element {
            if (element.nodeType !== xadesjs.XmlNodeType.Element)
                return null;
            if (element.hasAttribute("Id") && element.getAttribute("Id") === id)
                return element;
            if (element.childNodes && element.childNodes.length)
                for (let i = 0; i < element.childNodes.length; i++) {
                    let el = this.findById(element.childNodes[i] as Element, id);
                    if (el)
                        return el;
                }
            return null;
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
                            found = this.findById((obj as any).element, objectName);
                            if (found) {
                                found.setAttribute("xmlns", SignedXml.XmlDsigNamespaceUrl);
                                doc = (doc as Document).importNode(found, true);
                                // FIXME: there should be theoretical justification of copying namespace declaration nodes this way.
                                for (let j = 0; j < found.childNodes.length; j++) {
                                    let n = found.childNodes[j];
                                    // Do not copy default namespace as it must be xmldsig namespace for "Object" element.
                                    if (n.nodeType === xadesjs.XmlNodeType.Element)
                                        this.FixupNamespaceNodes(n as Element, doc as Element, true);
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
                    // Sort transforms. Enveloped should be first transform
                    r.TransformChain.sort((a, b) => {
                        if (b instanceof XmlDsigEnvelopedSignatureTransform)
                            return 1;
                        return 0;
                    });
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
                let digest = CryptoConfig.CreateHashAlgorithm(r.DigestMethod);
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

            let xml = new XMLSerializer().serializeToString(this.m_signature.SignedInfo.GetXml());
            let doc = new DOMParser().parseFromString(xml, APPLICATION_XML);
            if (this.envdoc) {
                let namespaces = SelectNamespaces(this.envdoc.documentElement);
                for (let i in namespaces) {
                    let uri = namespaces[i];
                    if (i === doc.documentElement.prefix)
                        continue;
                    doc.documentElement.setAttribute("xmlns" + (i ? ":" + i : ""), uri);
                }
            }
            t.LoadInnerXml(doc);
            return t.GetOutput();
        }

        /**
         * Computes an XML digital signature using the specified algorithm.
         * @param  {Algorithm} algorithm Specified WebCrypto Algoriithm
         * @returns Promise
         */
        public ComputeSignature(algorithm: Algorithm): Promise {
            return new Promise((resolve, reject) => {
                if (this.key != null) {
                    let alg = GetSignatureAlgorithm((this.key.algorithm as any).hash ? this.key.algorithm : algorithm);
                    if (this.m_signature.SignedInfo.SignatureMethod == null)
                        // required before hashing
                        this.m_signature.SignedInfo.SignatureMethod = alg.xmlNamespace;
                    else if (this.m_signature.SignedInfo.SignatureMethod !== alg.xmlNamespace)
                        throw new XmlError(XE.CRYPTOGRAPHIC, "Specified SignatureAlgorithm is not supported by the signing key.");
                    if (this.key.algorithm.name.toUpperCase() === RSA_PSS) {
                        let pss = this.SignedInfo.SignatureParams = new PssAlgorithmParams();
                        pss.SaltLength = (algorithm as any).saltLength;
                        switch ((this.key.algorithm as any).hash.name.toUpperCase()) {
                            case SHA1:
                                pss.DigestMethod = SHA1_NAMESPACE;
                                break;
                            case SHA256:
                                pss.DigestMethod = SHA256_NAMESPACE;
                                break;
                            case SHA384:
                                pss.DigestMethod = SHA384_NAMESPACE;
                                break;
                            case SHA512:
                                pss.DigestMethod = SHA512_NAMESPACE;
                                break;
                        }
                    }
                    this.DigestReferences()
                        .then(() => {
                            // let si = this.getCanonXml([this.SignedInfo.CanonicalizationMethodObject], this.SignedInfo.getXml());
                            let si = this.SignedInfoTransformed();
                            alg.getSignature(si, this.key, algorithm)
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

        /**
         * Determines whether the SignedXml.Signature property verifies using the public key in the signature. 
         * @returns Promise
         */
        CheckSignature(): Promise;
        CheckSignature(key: CryptoKey): Promise;
        CheckSignature(cert: X509Certificate): Promise;
        CheckSignature(param?: any): Promise {
            return new Promise((resolve, reject) => {
                this.validationErrors = [];

                let xml = this.envdoc;

                this.ValidateReferences(xml)
                    .then(() => {
                        if (param) {
                            let signer = CryptoConfig.CreateSignatureAlgorithm(this.SignatureMethod);
                            if (!signer)
                                return reject(new XmlError(XE.ALGORITHM_NOT_SUPPORTED, this.SignedInfo.SignatureMethod));
                            let promise = Promise.resolve();
                            let key: CryptoKey = param;
                            if (param instanceof X509Certificate) {
                                // certificate
                                let cert = param as X509Certificate;
                                promise = promise
                                    .then(() => {
                                        return cert.exportKey(signer.algorithm);
                                    })
                                    .then((ckey: CryptoKey) => {
                                        key = ckey;
                                        return Promise.resolve();
                                    });
                            }
                            let signedInfoCanon: string;
                            return promise.then(() => {
                                signedInfoCanon = this.SignedInfoTransformed();
                                let alg: any = null;
                                if (this.SignedInfo.SignatureParams && this.SignatureMethod === RSA_PSS_WITH_PARAMS_MGF1_NAMESPACE) {
                                    let sp = this.SignedInfo.SignatureParams as PssAlgorithmParams;
                                    alg = { name: RSA_PSS };
                                    if (sp.SaltLength)
                                        alg.saltLength = sp.SaltLength;
                                }
                                return signer.verifySignature(signedInfoCanon, key, Convert.FromBufferString(this.SignatureValue), alg);
                            });
                        }
                        else
                            return this.validateSignatureValue();
                    })
                    .then(resolve, reject);
            });
        }

        protected validateSignatureValue(): Promise {
            let signer: ISignatureAlgorithm;
            let signedInfoCanon: string;
            return new Promise((resolve, reject) => {
                signedInfoCanon = this.SignedInfoTransformed();
                signer = CryptoConfig.CreateSignatureAlgorithm(this.SignatureMethod);
                this.GetPublicKey()
                    .then((key: CryptoKey) => {
                        return signer.verifySignature(signedInfoCanon, key, Convert.FromBufferString(this.SignatureValue));
                    })
                    .then(resolve, reject);
            });
        }

        protected findCanonicalizationAlgorithm(name: string): Transform {
            let algo = (<any>SignedXml).CanonicalizationAlgorithms[name];
            if (algo)
                return new algo();
            else throw new Error(`canonicalization algorithm '${name}' is not supported`);
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
                            let b64Digest = Convert.ToBase64String(Convert.FromBufferString(digest));
                            let b64DigestValue = Convert.ToBase64String(Convert.FromBufferString(ref.DigestValue));
                            if (b64Digest !== b64DigestValue) {
                                let err_text = `invalid signature: for uri '${ref.Uri}'' calculated digest is ${b64Digest} but the xml to validate supplies digest ${b64DigestValue}`;
                                this.validationErrors.push(err_text);
                                throw new XmlError(XE.CRYPTOGRAPHIC, err_text);
                            }
                            return Promise.resolve();
                        });

                }
                promise.then(resolve, reject);
            });
        }

        protected getCanonXml(transforms: Transform[], node: Node): string {
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
         * Loads a SignedXml state from an XML element.
         * @param  {Element} value The XML element to load the SignedXml state from.
         * @returns void
         */
        public LoadXml(value: Element): void {
            if (value == null)
                throw new XmlError(XE.PARAM_REQUIRED, "value");

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
        }

        public GetIdElement(document: Document, idValue: string): Element {
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

        /**
         * Returns the XML representation of a SignedXml object.
         * @returns Element
         */
        public GetXml(): Element {
            this.m_signature.Prefix = this.Prefix;
            return this.m_signature.GetXml();
        }

    }

    function GetSignatureAlgorithm(algorithm: Algorithm): ISignatureAlgorithm {
        if (algorithm.name.toUpperCase() === RSA_PKCS1.toUpperCase()) {
            let hashName: string = (algorithm as any).hash.name;
            let alg: ISignatureAlgorithm;
            switch (hashName.toUpperCase()) {
                case SHA1:
                    alg = new RsaPkcs1Sha1();
                    break;
                case SHA224:
                    alg = new RsaPkcs1Sha224();
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
                    throw new XmlError(XE.ALGORITHM_NOT_SUPPORTED, `${algorithm.name}:${hashName}`);
            }
            return alg;
        }
        else if (algorithm.name.toUpperCase() === RSA_PSS.toUpperCase()) {
            let hashName: string = (algorithm as any).hash.name;
            let alg: ISignatureAlgorithm;
            switch (hashName.toUpperCase()) {
                case SHA1:
                    alg = new RsaPssSha1();
                    break;
                case SHA224:
                    alg = new RsaPssSha224();
                    break;
                case SHA256:
                    alg = new RsaPssSha256();
                    break;
                case SHA384:
                    alg = new RsaPssSha384();
                    break;
                case SHA512:
                    alg = new RsaPssSha512();
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
                case SHA1:
                    alg = new EcdsaSha1();
                    break;
                case SHA224:
                    alg = new EcdsaSha224();
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
                    throw new XmlError(XE.ALGORITHM_NOT_SUPPORTED, `${algorithm.name}:${hashName}`);
            }
            return alg;
        }
        else if (algorithm.name.toUpperCase() === HMAC_ALGORITHM) {
            let hashName: string = (algorithm as any).hash.name;
            let alg: ISignatureAlgorithm;
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
                    throw new XmlError(XE.ALGORITHM_NOT_SUPPORTED, `${algorithm.name}:${hashName}`);
            }
            return alg;
        }
        else {
            throw new XmlError(XE.ALGORITHM_NOT_SUPPORTED, algorithm.name);
        }
    }
}