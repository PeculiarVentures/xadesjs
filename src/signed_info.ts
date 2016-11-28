namespace xadesjs {

    /**
     * The SignedInfo class represents the <SignedInfo> element 
     * of an XML signature defined by the XML digital signature specification
     */
    export class SignedInfo extends XmlObject {

        private references: Reference[];
        private c14nMethod: string | null;
        private id: string | null;
        private signatureMethod: string | null;
        private signatureParams: XmlObject;
        private signatureLength: string;
        private element: Element | null;
        private signedXml: SignedXml | null = null;

        public constructor(signedXml?: SignedXml) {
            super();
            if (signedXml)
                this.signedXml = signedXml;
            this.references = new Array();
            this.c14nMethod = XmlSignature.AlgorithmNamespaces.XmlDsigC14NTransform;
        }

        /**
         * Gets or sets the canonicalization algorithm that is used before signing 
         * for the current SignedInfo object.
         */
        get CanonicalizationMethod(): string | null {
            return this.c14nMethod;
        }
        set CanonicalizationMethod(value: string | null) {
            this.c14nMethod = value;
            this.element = null;
        }

        /**
         * Gets a Transform object used for canonicalization.
         * @returns Transform
         */
        get CanonicalizationMethodObject(): Transform {
            return CryptoConfig.CreateFromName(this.CanonicalizationMethod);
        }

        /**
         * Gets the number of references in the current SignedInfo object.
         */
        get Count(): number {
            return this.References.length;
        }

        /**
         * Gets or sets the ID of the current SignedInfo object.
         */
        get Id(): string | null {
            return this.id;
        }
        set Id(value: string | null) {
            this.element = null;
            this.id = value;
        }

        /**
         * Gets a value that indicates whether the collection is read-only.
         * @returns boolean
         */
        get IsReadOnly(): boolean {
            throw new XmlError(XE.METHOD_NOT_SUPPORTED);
        }

        /**
         * Gets a value that indicates whether the collection is synchronized.
         * @returns boolean
         */
        get IsSynchronized(): boolean {
            throw new XmlError(XE.METHOD_NOT_SUPPORTED);
        }

        /**
         * Gets a list of the Reference objects of the current SignedInfo object.
         */
        get References(): Reference[] {
            return this.references;
        }

        /**
         * Gets or sets the length of the signature for the current SignedInfo object.
         */
        get SignatureLength(): string {
            return this.signatureLength;
        }
        set SignatureLength(value: string) {
            this.element = null;
            this.signatureLength = value;
        }

        /**
         * Gets or sets the name of the algorithm used for signature generation 
         * and validation for the current SignedInfo object.
         */
        get SignatureMethod() {
            return this.signatureMethod;
        }
        set SignatureMethod(value: string | null) {
            this.element = null;
            this.signatureMethod = value;
        }


        public get SignatureParams(): XmlObject {
            return this.signatureParams;
        }

        public set SignatureParams(v: XmlObject) {
            this.signatureParams = v;
        }

        /**
         * Gets an object to use for synchronization.
         */
        get SyncRoot(): any {
            throw new XmlError(XE.METHOD_NOT_SUPPORTED);
        }

        /**
         * Adds a Reference object to the list of references to digest and sign.
         * @param  {Reference} reference The reference to add to the list of references.
         * @returns void
         */
        public AddReference(reference: Reference): void {
            this.references.push(reference);
        }

        /**
         * Copies the elements of this instance into an Array object, starting at a specified index in the array.
         * @param  {any[]} array
         * @param  {number} index
         * @returns void
         */
        public CopyTo(array: any[], index: number): void {
            throw new XmlError(XE.METHOD_NOT_SUPPORTED);
        }

        /**
         * Returns the XML representation of the SignedInfo object.
         * @returns Node
         */
        GetXml(): Node {
            if (this.element != null)
                return this.element;

            if (this.signatureMethod == null)
                throw new XmlError(XE.CRYPTOGRAPHIC, "SignatureMethod");
            if (this.references.length === 0)
                throw new XmlError(XE.CRYPTOGRAPHIC, "References empty");

            let prefix = this.GetPrefix();

            let doc = CreateDocument();
            let xel = doc.createElementNS(XmlSignature.NamespaceURI, prefix + XmlSignature.ElementNames.SignedInfo);
            if (this.id != null)
                xel.setAttribute(XmlSignature.AttributeNames.Id, this.id);

            if (this.c14nMethod) {
                let c14n = doc.createElementNS(XmlSignature.NamespaceURI, prefix + XmlSignature.ElementNames.CanonicalizationMethod);
                c14n.setAttribute(XmlSignature.AttributeNames.Algorithm, this.c14nMethod);
                xel.appendChild(c14n);
            }
            if (this.signatureMethod) {
                let sm = doc.createElementNS(XmlSignature.NamespaceURI, prefix + XmlSignature.ElementNames.SignatureMethod);
                sm.setAttribute(XmlSignature.AttributeNames.Algorithm, this.signatureMethod);
                if (this.signedXml && this.signedXml.SigningKey) {
                    // HMAC
                    if (this.signedXml.SigningKey.algorithm.name === HMAC_ALGORITHM) {
                        let hmac = doc.createElementNS(XmlSignature.NamespaceURI, prefix + XmlSignature.ElementNames.HMACOutputLength);
                        hmac.textContent = (this.signedXml.SigningKey.algorithm as any).length;
                        sm.appendChild(hmac);
                    }
                    // RSA-PSS 
                    else if (this.signedXml.SigningKey.algorithm.name === RSA_PSS) {
                        this.signatureParams.Prefix = "pss";
                        (this.signatureParams as any).dsPrefix = this.Prefix;
                        let pss = this.signatureParams.GetXml();
                        sm.appendChild(pss);
                    }
                }
                xel.appendChild(sm);
            }

            // This check is only done when element is created here.
            if (this.references.length === 0)
                throw new XmlError(XE.CRYPTOGRAPHIC, "At least one Reference element is required in SignedInfo.");

            // we add References afterward so we don't end up with extraneous
            // xmlns="..." in each reference elements.
            for (let i in this.references) {
                let r = this.references[i];
                r.Prefix = this.Prefix;
                let xn = r.GetXml();
                let newNode = doc.importNode(xn, true);
                xel.appendChild(newNode);
            }

            return xel;
        }

        /**
         * Loads a SignedInfo state from an XML element.
         * @param  {Element} value
         * @returns void
         */
        LoadXml(value: Element): void {
            if (value == null)
                throw new XmlError(XE.PARAM_REQUIRED, "value");

            if ((value.localName !== XmlSignature.ElementNames.SignedInfo) || (value.namespaceURI !== XmlSignature.NamespaceURI))
                throw new XmlError(XE.CRYPTOGRAPHIC, "value");

            this.id = this.getAttribute(value, XmlSignature.AttributeNames.Id);
            this.c14nMethod = XmlSignature.GetAttributeFromElement(value, XmlSignature.AttributeNames.Algorithm, XmlSignature.ElementNames.CanonicalizationMethod);

            let sm = XmlSignature.GetChildElement(value, XmlSignature.ElementNames.SignatureMethod, XmlSignature.NamespaceURI);
            if (sm !== null) {
                this.signatureMethod = sm.getAttribute(XmlSignature.AttributeNames.Algorithm);
                if (sm.hasChildNodes) {
                    let pss = XmlSignature.GetChildElement(sm, XmlSignature.ElementNames.RSAPSSParams, XmlSignature.NamespaceURIPss);
                    if (pss) {
                        this.signatureParams = new PssAlgorithmParams();
                        this.signatureParams.LoadXml(pss);
                    }
                }
                // let length = XmlSignature.GetChildElement(sm, XmlSignature.ElementNames.HMACOutputLength, XmlSignature.NamespaceURI);
                // if (length != null) {
                //     this.signatureLength = length.textContent;
                // }
            }

            for (let i = 0; i < value.childNodes.length; i++) {
                let n = value.childNodes[i];
                if (n.nodeType === XmlNodeType.Element &&
                    n.localName === XmlSignature.ElementNames.Reference &&
                    n.namespaceURI === XmlSignature.NamespaceURI) {
                    let r = new Reference();
                    r.LoadXml(<Element>n);
                    this.AddReference(r);
                }
            }
            this.element = value;
        }
    }
}