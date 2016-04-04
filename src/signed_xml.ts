// export class SignedXml extends XmlObject {
//     constructor(doc: Document);
//     constructor(node: Node);
//     constructor(node: Node) {
//         super();
//     }

//     protected references: Reference[];
//     addReference(ref: Reference): void {
//         throw new XmlError(XE.METHOD_NOT_IMPLEMENTED);
//     }

//     signingKey: CryptoKey;
//     keyInfo: IKeyInfo;
//     signature: Signature;
//     signatureValue: ArrayBuffer;

//     computeSignature(): Promise {
//         throw new XmlError(XE.METHOD_NOT_IMPLEMENTED);
//     }
//     checkSignature(): Promise {
//         throw new XmlError(XE.METHOD_NOT_IMPLEMENTED);
//     }

// }
namespace xadesjs {
    export class SignedXml {

        static protected XmlDsigCanonicalizationUrl = "http://www.w3.org/TR/2001/REC-xml-c14n-20010315";
        static protected XmlDsigCanonicalizationWithCommentsUrl = SignedXml.XmlDsigCanonicalizationUrl + "#WithComments";
        static protected XmlDsigNamespaceUrl = "http://www.w3.org/2000/09/xmldsig#";
        static protected XmlDsigDSAUrl = SignedXml.XmlDsigNamespaceUrl + "dsa-sha1";
        static protected XmlDsigHMACSHA1Url = SignedXml.XmlDsigNamespaceUrl + "hmac-sha1";
        static protected XmlDsigMinimalCanonicalizationUrl = SignedXml.XmlDsigNamespaceUrl + "minimal";
        static protected XmlDsigRSASHA1Url = SignedXml.XmlDsigNamespaceUrl + "rsa-sha1";
        static protected XmlDsigSHA1Url = SignedXml.XmlDsigNamespaceUrl + "sha1";

        static protected XmlDecryptionTransformUrl = "http://www.w3.org/2002/07/decrypt#XML";
        static protected XmlDsigBase64TransformUrl = SignedXml.XmlDsigNamespaceUrl + "base64";
        static protected XmlDsigC14NTransformUrl = SignedXml.XmlDsigCanonicalizationUrl;
        static protected XmlDsigC14NWithCommentsTransformUrl = SignedXml.XmlDsigCanonicalizationWithCommentsUrl;
        static protected XmlDsigEnvelopedSignatureTransformUrl = SignedXml.XmlDsigNamespaceUrl + "enveloped-signature";
        static protected XmlDsigExcC14NTransformUrl = "http://www.w3.org/2001/10/xml-exc-c14n#";
        static protected XmlDsigExcC14NWithCommentsTransformUrl = SignedXml.XmlDsigExcC14NTransformUrl + "WithComments";
        static protected XmlDsigXPathTransformUrl = "http://www.w3.org/TR/1999/REC-xpath-19991116";
        static protected XmlDsigXsltTransformUrl = "http://www.w3.org/TR/1999/REC-xslt-19991116";
        static protected XmlLicenseTransformUrl = "urn:mpeg:mpeg21:2003:01-REL-R-NS:licenseTransform";

        // private encryptedXml: EncryptedXml;

        protected m_signature: Signature;
        private key: CryptoKey;
        protected m_strSigningKeyName: string;
        private envdoc: Document;
        private pkEnumerator;
        private signatureElement: Element;
        private hashes: Hashtable;
        // FIXME: enable it after CAS implementation
        // private xmlResolver = new XmlUrlResolver();
        private manifests: Document[];
        private _x509Enumerator: X509Certificate[];

        private static whitespaceChars = [` `, `\r`, `\n`, `\t`];

        constructor();
        constructor(node: Document);
        constructor(node: Element);
        constructor(node?: any) {
            // constructor();
            this.m_signature = new Signature();
            this.m_signature.SignedInfo = new SignedInfo();
            // this.hashes = new Hashtable(2); // 98% SHA1 for now
            if (node.constructor.name === "Document" || node instanceof Document) {
                // constructor(node: Document);
                this.envdoc = node;
            }
            else if (node.constructor.name === "Element" || node instanceof Element) {
                // constructor(node: Element);
                this.envdoc = document.implementation.createDocument("", "", null);
                this.envdoc.loadXml(node.OuterXml);
            }
        }

        get EncryptedXml(): EncryptedXml {
            return this.encryptedXml;
        }
        set EncryptedXml(value: EncryptedXml) {
            this.encryptedXml = value;
        }

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

        get SignatureLength(): string {
            return this.m_signature.SignedInfo.SignatureLength;
        }

        get SignatureMethod(): string {
            return this.m_signature.SignedInfo.SignatureMethod;
        }

        get SignatureValue(): ArrayBuffer {
            return this.m_signature.SignatureValue;
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

        // NOTE: CryptoAPI related ? documented as fx internal
        get SigningKeyName(): string {
            return this.m_strSigningKeyName;
        }
        set SigningKeyName(value: string) {
            this.m_strSigningKeyName = value;
        }

        AddObject(dataObject: DataObject): void {
            this.m_signature.AddObject(dataObject);
        }

        AddReference(reference: Reference): void {
            if (reference == null)
                throw new XmlError(XE.PARAM_REQUIRED, "reference");
            this.m_signature.SignedInfo.AddReference(reference);
        }

        private ApplyTransform(t: Transform, input: Document): Stream {
            // These transformer modify input document, which should
            // not affect to the input itself.
            if (t instanceof XmlDsigXPathTransform
                || t instanceof XmlDsigEnvelopedSignatureTransform
                || t instanceof XmlDecryptionTransform
            )
                input = input.clone();

            t.LoadInput(input);

            if (t instanceof XmlDsigEnvelopedSignatureTransform)
                // It returns XmlDocument for XmlDocument input.
                return CanonicalizeOutput(t.GetOutput());

            let obj = t.GetOutput();
            if (obj instanceof Stream)
                return obj;
            else if (obj instanceof Document) {
                let ms = new MemoryStream();
                let xtw = new XmlTextWriter(ms, Encoding.UTF8);
                (<Document>obj).writeTo(xtw);

                xtw.Flush();

                // Rewind to the start of the stream
                ms.Position = 0;
                return ms;
            }
            else if (obj == null) {
                throw new XmlError(XE.METHOD_NOT_IMPLEMENTED, "This should not occur. Transform is " + t + ".");
            }
            else {
                // e.g. XmlDsigXPathTransform returns XmlNodeList
                return this.CanonicalizeOutput(obj);
            }
        }

        private CanonicalizeOutput(obj: any): string {
            let c14n = this.GetC14NMethod();
            c14n.LoadInput(obj);
            return c14n.GetOutput();
        }

        private GetManifest(r: Reference): Document {
            let doc = document.implementation.createDocument("", "", null);
            doc.PreserveWhitespace = true;

            if (r.Uri[0] === `#`) {
                // local manifest
                if (this.signatureElement != null) {
                    let xel = this.GetIdElement(this.signatureElement.ownerDocument, r.Uri.substring(1));
                    if (xel == null)
                        throw new XmlError(XE.CRYPTOGRAPHIC, "Manifest targeted by Reference was not found: " + r.Uri.substring(1));
                    doc.appendChild(doc.importNode(xel, true));
                    this.FixupNamespaceNodes(xel, doc.documentElement, false);
                }
            }
            else if (this.xmlResolver != null) {
                // TODO: need testing
                let s = <Stream>this.xmlResolver.GetEntity(new Uri(r.Uri), null, typeof (Stream));
                doc.load(s);
            }

            if (doc.firstChild != null) {
                // keep a copy of the manifests to check their references later
                if (this.manifests == null)
                    this.manifests = [];
                this.manifests.push(doc);

                return doc;
            }
            return null;
        }

        private FixupNamespaceNodes(src: Element, dst: Element, ignoreDefault: boolean): void {
            // add namespace nodes
            let nodes = src.selectNodes("namespace::*");
            for (let i = 0; i < nodes.length; i++) {
                let attr = nodes[i];
                if (attr.LocalName === "xml")
                    continue;
                if (ignoreDefault && attr.LocalName === "xmlns")
                    continue;
                dst.setAttributeNode(dst.ownerDocument.importNode(attr, true) as Attr);
            }
        }

        private GetReferenceHash(r: Reference, check_hmac: boolean): ArrayBuffer {
            let s: Stream = null;
            let doc: Document = null;
            if (!r.Uri) { // Empty
                doc = this.envdoc;
            }
            else if (r.Type === XmlSignature.Uri.Manifest) {
                doc = this.GetManifest(r);
            }
            else {
                doc = document.implementation.createDocument("", "", null);
                doc.preserveWhitespace = true;
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
                else if (this.xmlResolver != null) {
                    // TODO: test but doc says that Resolver = null -> no access
                    try {
                        // no way to know if valid without throwing an exception
                        Uri uri = new Uri(r.Uri);
                        s = <Stream>xmlResolver.GetEntity(uri, null, typeof (Stream));
                    }
                    catch (e) {
                        // may still be a local file (and maybe not xml)
                        s = File.OpenRead(r.Uri);
                    }
                }
                if (objectName != null) {
                    let found: Element = null;
                    for (let i in this.m_signature.ObjectList) {
                        let obj = this.m_signature.ObjectList[i];
                        if (obj.Id === objectName) {
                            found = obj.getXml();
                            found.setAttribute("xmlns", SignedXml.XmlDsigNamespaceUrl);
                            doc.appendChild(doc.importNode(found, true));
                            // FIXME: there should be theoretical justification of copying namespace declaration nodes this way.
                            for (let j = 0; j < found.childNodes.length; j++) {
                                let n = found.childNodes[j];
                                // Do not copy default namespace as it must be xmldsig namespace for "Object" element.
                                if (n.nodeType === XmlNodeType.Element)
                                    this.FixupNamespaceNodes(n as Element, doc.documentElement, true);
                            }
                            break;

                        }
                    }
                    if (found == null && this.envdoc != null) {
                        found = this.GetIdElement(this.envdoc, objectName);
                        if (found != null) {
                            doc.appendChild(doc.importNode(found, true));
                            this.FixupNamespaceNodes(found, doc.documentElement, false);
                        }
                    }
                    if (found == null)
                        throw new XmlError(XE.CRYPTOGRAPHIC, `Malformed reference object: ${objectName}`);
                }
            }

            if (r.TransformChain.length > 0) {
                for (let i in r.TransformChain) {
                    let t = r.TransformChain[i];
                    if (s == null) {
                        s = this.ApplyTransform(t, doc);
                    }
                    else {
                        t.LoadInput(s);
                        let o = t.GetOutput();
                        if (o instanceof Stream)
                            s = <Stream>o;
                        else
                            s = this.CanonicalizeOutput(o);
                    }
                }
            }
            else if (s == null) {
                // we must not C14N references from outside the document
                // e.g. non-xml documents
                if (r.Uri[0] != `#`) {
                    s = new MemoryStream();
                    doc.Save(s);
                }
                else {
                    // apply default C14N transformation
                    s = this.ApplyTransform(new XmlDsigC14NTransform(), doc);
                }
            }
            let digest = this.GetHash(r.DigestMethod, check_hmac);
            return (digest == null) ? null : digest.ComputeHash(s);
        }

        private DigestReferences(): void {
            // we must tell each reference which hash algorithm to use 
            // before asking for the SignedInfo XML !
            for (let r of this.m_signature.SignedInfo.References) {
                // assume SHA-1 if nothing is specified
                if (r.DigestMethod == null)
                    r.DigestMethod = SignedXml.XmlDsigSHA1Url;
                r.DigestValue = this.GetReferenceHash(r, false);
            }
        }

        private GetC14NMethod(): Transform {
            let t = <Transform>CryptoConfig.CreateFromName(this.m_signature.SignedInfo.CanonicalizationMethod);
            if (t == null)
                throw new XmlError(XE.CRYPTOGRAPHIC, `Unknown Canonicalization Method ${this.m_signature.SignedInfo.CanonicalizationMethod}`);
            return t;
        }

        private SignedInfoTransformed(): string {
            let t = this.GetC14NMethod();

            if (this.signatureElement == null) {
                // when creating signatures
                let doc = document.implementation.createDocument("", "", null);
                doc.PreserveWhitespace = true;
                doc.loadXML(this.m_signature.SignedInfo.getXml().outerXml);
                if (this.envdoc != null)
                    for (let attr: Attr of xpath.select("namespace::*", this.envdoc.documentElement)) {
                        if (attr.localName === "xml")
                            continue;
                        if (attr.prefix === doc.documentElement.prefix)
                            continue;
                        doc.documentElement.setAttributeNode(doc.importNode(attr, true) as Attr);
                    }
                t.LoadInput(doc);
            }
            else {
                // when verifying signatures
                // TODO - check m_signature.SignedInfo.Id
                let el: Element = <Element>this.signatureElement.getElementsByTagNameNS(XmlSignature.NamespaceURI, XmlSignature.ElementNames.SignedInfo)[0];
                // let sw = new StringWriter();
                // let xtw = new XmlTextWriter(sw);
                // xtw.WriteStartElement(el.prefix, el.localName, el.namespaceURI);
                let prefix = el.prefix ? `${el.prefix}:` : "";
                let doc = document.implementation.createDocument(el.namespaceURI, `${prefix}root`, null);
                doc.prefix = el.prefix;
                let xtw = doc.createElementNS(el.namespaceURI,  `${prefix}${el.localName}`);

                // context namespace nodes (except for "xmlns:xml")
                // let nl: Attr[] = xpath.select(el, "namespace::*");
                // for (let attr: Attr of nl) {
                //     if (attr.parentNode === el)
                //         continue;
                //     if (attr.localName === "xml")
                //         continue;
                //     if (attr.prefix === el.prefix)
                //         continue;
                //     let a = xtw.createAttribute(attr.localName);
                //     a.value = attr.value;
                //     xtw.attributes.setNamedItem(a);
                // }
                for (let i = 0; i < el.attributes.length; i++) {
                    let attr = el.attributes.item(i);
                    xtw.setAttribute(attr.localName, attr.value);
                }
                for (let i = 0; i < el.childNodes.length; i++) {
                    let n = el.childNodes.item(i);
                    xtw.appendChild(n.cloneNode(true));
                }

                let ms = xtw;
                t.LoadInput(ms);
            }
            // C14N and C14NWithComments always return a Stream in GetOutput
            return t.GetOutput();
        }

        // reuse hash - most document will always use the same hash
        private GetHash(algorithm: string, check_hmac: boolean): HashAlgorithm {
            let hash = <HashAlgorithm>this.hashes[algorithm];
            if (hash == null) {
                hash = HashAlgorithm.Create(algorithm);
                if (hash == null)
                    throw new XmlError(XE.CRYPTOGRAPHIC, `Unknown hash algorithm: ${algorithm}`);
                hashes.Add(algorithm, hash);
                // now ready to be used
            }
            else {
                // important before reusing an hash object
                hash.Initialize();
            }
            // we can sign using any hash algorith, including HMAC, but we can only verify hash (MS compatibility)
            if (check_hmac && (hash instanceof KeyedHashAlgorithm))
                return null;
            return hash;
        }

        CheckSignature(): Promise;
        CheckSignature(key: CryptoKey): Promise;
        CheckSignature(key: CryptoKey = null): Promise {
            console.warn("TODO: HMAC");
            return this.CheckSignatureInternal(key);
        }

        // public CheckSignature(macAlg: KeyedHashAlgorithm): boolean{
        //     if (macAlg == null)
        //         throw new XmlErroe(XE.PARAM_REQUIRED, "macAlg");

        //     this.pkEnumerator = null;

        //     // Is the signature (over SignedInfo) valid ?
        //     let s = SignedInfoTransformed();
        //     if (s == null)
        //         return false;

        //     let actual = macAlg.ComputeHash(s);
        //     // HMAC signature may be partial and specified by <HMACOutputLength>
        //     if (this.m_signature.SignedInfo.SignatureLength != null) {
        //         let length = parseInt(this.m_signature.SignedInfo.SignatureLength);
        //         // we only support signatures with a multiple of 8 bits
        //         // and the value must match the signature length
        //         if ((length & 7) !== 0)
        //             throw new XmlError(XE.CRYPTOGRAPHIC, "Signature length must be a multiple of 8 bits.");

        //         // SignatureLength is in bits (and we works on bytes, only in multiple of 8 bits)
        //         // and both values must match for a signature to be valid
        //         length >>= 3;
        //         if (length !== this.m_signature.SignatureValue.length)
        //             throw new XmlError(XE.CRYPTOGRAPHIC, "Invalid signature length.");

        //         // is the length "big" enough to make the signature meaningful ? 
        //         // we use a minimum of 80 bits (10 bytes) or half the HMAC normal output length
        //         // e.g. HMACMD5 output 128 bits but our minimum is 80 bits (not 64 bits)
        //         let minimum = Math.max(10, actual.Length / 2);
        //         if (length < minimum)
        //             throw new XmlError(XE.CRYPTOGRAPHIC, "HMAC signature is too small");

        //         if (length < actual.length) {
        //             let trunked = new Uint8Array(length);
        //             // Buffer.blockCopy(actual, 0, trunked, 0, length);
        //             actual = trunked;
        //         }
        //     }

        //     if (this.Compare(this.m_signature.SignatureValue, actual)) {
        //         // some parts may need to be downloaded
        //         // so where doing it last
        //         return this.CheckReferenceIntegrity(this.m_signature.SignedInfo.References);
        //     }
        //     return false;
        // }

        private CheckReferenceIntegrity(referenceList: Reference[]): boolean {
            if (referenceList == null)
                return false;

            // check digest (hash) for every reference
            for (let r of referenceList) {
                // stop at first broken reference
                let hash = this.GetReferenceHash(r, true);
                if (!this.Compare(r.DigestValue, hash))
                    return false;
            }
            return true;
        }


        /**
         * Compares two ArrayBuffers. Returns `true` if buffers are equal, else returns `false`
         * @param  {ArrayBuffer} a
         * @param  {ArrayBuffer} b
         * @returns boolean
         */
        private Compare(a: ArrayBuffer, b: ArrayBuffer): boolean {
            if (a.byteLength !== b.byteLength) return false;
            let dv1 = new Uint8Array(a);
            let dv2 = new Uint8Array(b);
            for (let i = 0; i < dv1.length; i++) {
                if (dv1[i] !== dv2[i]) return false;
            }
            return true;
        }


        private CheckSignatureInternal(key: CryptoKey): Promise {
            return new Promise((resolve, reject) => {

                this.pkEnumerator = null;

                if (key != null) {
                    // check with supplied key
                    return this.CheckSignatureWithKey(key)
                        .then(resolve, reject);
                } else {
                    if (this.Signature.KeyInfo == null)
                        return Promise.resolve(null);
                    // no supplied key, iterates all KeyInfo
                    // ----------------------------------------
                    // while ((key = this.GetPublicKey()) != null) {
                    //     if (this.CheckSignatureWithKey(key)) {
                    //         break;
                    //     }
                    // }
                    return this.GetPublicKey()
                        .then((k) => {
                            this.pkEnumerator = null;
                            return this.CheckSignatureWithKey(k);
                        })
                        .then(resolve, reject);
                }

                // some parts may need to be downloaded
                // so where doing it last
                if (!this.CheckReferenceIntegrity(this.m_signature.SignedInfo.References))
                    return Promise.resolve(null);


                if (this.manifests != null) {
                    // do not use foreach as a manifest could contain manifests...
                    for (let i = 0; i < this.manifests.length; i++) {
                        let manifest = new Manifest((this.manifests[i] as Document).documentElement);
                        if (!this.CheckReferenceIntegrity(manifest.References))
                            return Promise.resolve(null);
                    }
                }
            });
        }

        // Is the signature (over SignedInfo) valid ?
        private CheckSignatureWithKey(key: CryptoKey): Promise {
            return new Promise((resolve, reject) => {
                if (key == null)
                    return resolve(false);

                // let sd = <SignatureDescription>CryptoConfig.CreateFromName(this.m_signature.SignedInfo.SignatureMethod);
                let alg: any = {};
                switch (this.m_signature.SignedInfo.SignatureMethod) {
                    case "http://www.w3.org/2001/04/xmldsig-more#rsa-sha256":
                        alg = { name: "RSASSA-PKCS1-v1_5", hash: { name: "SHA-256" } };
                        break;
                    default:
                        throw new XmlError(XE.ALGORITHM_NOT_SUPPORTED, this.m_signature.SignedInfo.SignatureMethod);
                }

                let data = this.SignedInfoTransformed();
                window.key = key;
                return crypto.subtle.verify(alg, key, this.m_signature.SignatureValue, Convert.ToBufferString(data))
                    .then(resolve, reject);

                // try {
                //     verifier.SetKey(key);
                //     verifier.SetHashAlgorithm(sd.DigestAlgorithm);

                //     HashAlgorithm hash = GetHash(sd.DigestAlgorithm, true);
                //     // get the hash of the C14N SignedInfo element
                //     MemoryStream ms = (MemoryStream) SignedInfoTransformed ();

                //     byte[] digest = hash.ComputeHash(ms);
                //     return verifier.VerifySignature(digest, m_signature.SignatureValue);
                // }
                // catch {
                //     // e.g. SignatureMethod != AsymmetricAlgorithm type
                //     return false;
                // }
            });

        }

        public CheckSignatureReturningKey(signingKey: CryptoKey): boolean {
            throw new XmlError(XE.METHOD_NOT_IMPLEMENTED);
            // console.warn("TODO: signingKey must be ref param");
            // signingKey = this.CheckSignatureInternal(null);
            // return (signingKey != null);
        }

        public ComputeSignature(macAlg: KeyedHAshAlgorithm): Promise {
            return new Promise((resolve, reject) => {
                if (!macAlg) {
                    if (this.key != null) {
                        if (this.m_signature.SignedInfo.SignatureMethod == null)
                            // required before hashing
                            this.m_signature.SignedInfo.SignatureMethod = this.key.SignatureAlgorithm;
                        else if (this.m_signature.SignedInfo.SignatureMethod !== this.key.SignatureAlgorithm)
                            throw new XmlError(XE.CRYPTOGRAPHIC, "Specified SignatureAlgorithm is not supported by the signing key.");
                        this.DigestReferences();

                        let signer: ISignatureFormater = null;
                        // in need for a CryptoConfig factory
                        switch (this.key.algorithm.name.toUpperCase()) {
                            case "RSASSA-PKCS1-V1_5":
                                signer = new RSAPKCS1SignatureFormatter();
                                break;
                            case "ECDSA":
                                throw new XmlError(XE.METHOD_NOT_IMPLEMENTED);
                            default:
                                throw new XmlError(XE.ALGORITHM_NOT_SUPPORTED, this.key.algorithm.name);
                        }

                        if (signer != null) {
                            let sd = <SignatureDescription>CryptoConfig.CreateFromName(this.m_signature.SignedInfo.SignatureMethod);

                            let hash = this.GetHash(sd.DigestAlgorithm, false);
                            // get the hash of the C14N SignedInfo element
                            let digest = hash.ComputeHash(this.SignedInfoTransformed());

                            signer.SetHashAlgorithm("SHA1");
                            signer.CreateSignature(digest)
                                .then((signature) => {
                                    this.m_signature.SignatureValue = signature;
                                    resolve(signature);
                                })
                                .catch(reject);
                        }
                    }
                    else
                        throw new XmlError(XE.CRYPTOGRAPHIC, "signing key is not specified");
                }
                else {
                    let method: string = null;

                    if (macAlg instanceof HMACSHA1) {
                        method = XmlDsigHMACSHA1Url;
                    } else if (macAlg instanceof HMACSHA256) {
                        method = "http://www.w3.org/2001/04/xmldsig-more#hmac-sha256";
                    } else if (macAlg instanceof HMACSHA384) {
                        method = "http://www.w3.org/2001/04/xmldsig-more#hmac-sha384";
                    } else if (macAlg instanceof HMACSHA512) {
                        method = "http://www.w3.org/2001/04/xmldsig-more#hmac-sha512";
                    } else if (macAlg instanceof HMACRIPEMD160) {
                        method = "http://www.w3.org/2001/04/xmldsig-more#hmac-ripemd160";
                    }

                    if (method == null)
                        throw new XmlError(XE.CRYPTOGRAPHIC, "unsupported algorithm");

                    this.DigestReferences();
                    this.m_signature.SignedInfo.SignatureMethod = method;
                    this.m_signature.SignatureValue = macAlg.ComputeHash(this.SignedInfoTransformed());
                }
            });
        }

        public GetIdElement(document: Document, idValue: string): Element {
            if ((document == null) || (idValue == null))
                return null;

            // this works only if there's a DTD or XSD available to define the ID
            let xel = <Element>document.getElementById(idValue);
            if (xel == null) {
                // search an "undefined" ID
                xel = <Element>document.selectSingleNode(`//*[@Id='${idValue}']`);
                if (xel == null) {
                    xel = <Element>document.selectSingleNode(`//*[@ID='${idValue}']`);
                    if (xel == null) {
                        xel = <Element>document.selectSingleNode(`//*[@id='${idValue}']`);
                    }
                }
            }
            return xel;
        }

        // According to book ".NET Framework Security" this method
        // iterates all possible keys then return null
        protected GetPublicKey(): Promise {
            return new Promise((resolve, reject) => {
                if (this.m_signature.KeyInfo == null)
                    return resolve(null);

                if (this.pkEnumerator == null) {
                    this.pkEnumerator = this.m_signature.KeyInfo.GetEnumerator();
                }

                for (let kic of this.pkEnumerator) {
                    let key: CryptoKey = null;

                    if (kic instanceof DSAKeyValue)
                        key = DSA.Create();
                    else if (kic instanceof RSAKeyValue)
                        key = RSA.Create();

                    if (this.key != null) {
                        this.key.FromXmlString(kic.GetXml().InnerXml);
                        return resolve(this.key);
                    }

                    if (kic instanceof KeyInfoX509Data) {
                        this._x509Enumerator = (<KeyInfoX509Data>kic).Certificates;
                        for (let cert of this._x509Enumerator) {
                            let sig_alg = this.Signature.SignedInfo.SignatureMethod;
                            let alg: any = null;
                            switch (sig_alg) {
                                case "http://www.w3.org/2001/04/xmldsig-more#rsa-sha256":
                                    alg = { name: "RSASSA-PKCS1-v1_5", hash: { name: "SHA-256" } };
                                    break;
                                default:
                                    throw new XmlError(XE.ALGORITHM_NOT_SUPPORTED, sig_alg);
                            }
                            return cert.exportKey(alg)
                                .then(resolve, reject);
                        }
                    }
                }
                return resolve(null);
            });
        }

        public getXml(): Element {
            return this.m_signature.getXml(this.envdoc);
        }

        public loadXml(value: Element): void {
            if (value == null)
                throw new XmlError(XE.PARAM_REQUIRED, "value");

            this.signatureElement = value;
            this.m_signature.loadXml(value);
            // Need to give the EncryptedXml object to the 
            // XmlDecryptionTransform to give it a fighting 
            // chance at decrypting the document.
            for (let r of this.m_signature.SignedInfo.References) {
                for (let t of r.TransformChain) {
                    if (t instanceof XmlDecryptionTransform)
                        (<XmlDecryptionTransform>t).EncryptedXml = this.EncryptedXml;
                }
            }
        }

        public set Resolver(value: XmlResolver) {
            this.xmlResolver = value;
        }
    }
}