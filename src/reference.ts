/// <reference path="./xml.ts" />

namespace xadesjs {

    /**
     * Represents the <reference> element of an XML signature.
     */
    export class Reference extends XmlObject {

        private chain: Transform[];
        private digestMethod: string | null;
        private digestValue: ArrayBuffer;
        private id: string | null;
        private uri: string | null;
        private type: string | null;
        private element: Element | null = null;

        public constructor(p?: string) {
            super();
            // 
            this.chain = [];
            this.digestMethod = "http://www.w3.org/2001/04/xmlenc#sha256";
            if (typeof p === "string") {
                this.uri = p;
            }
        }

        /**
         * Gets or sets the digest method Uniform Resource Identifier (URI) of the current
         */
        get DigestMethod(): string | null {
            return this.digestMethod;
        }
        set DigestMethod(value: string | null) {
            this.element = null;
            this.digestMethod = value;
        }

        /**
         * Gets or sets the digest value of the current Reference.
         */
        get DigestValue(): ArrayBuffer {
            return this.digestValue;
        }
        set DigestValue(value: ArrayBuffer) {
            this.element = null;
            this.digestValue = value;
        }

        /**
         * Gets or sets the ID of the current Reference.
         */
        get Id(): string | null {
            return this.id;
        }
        set Id(value: string | null) {
            this.element = null;
            this.id = value;
        }

        /**
         * Gets the transform chain of the current Reference.
         */
        get TransformChain(): Transform[] {
            return this.chain;
        }
        set TransformChain(value: Transform[]) {
            this.chain = value;
        }

        /**
         * Gets or sets the type of the object being signed.
         */
        get Type(): string | null {
            return this.type;
        }
        set Type(value: string | null) {
            this.element = null;
            this.type = value;
        }

        /**
         * Gets or sets the Uri of the current Reference.
         */
        get Uri(): string | null {
            return this.uri;
        }
        set Uri(value: string | null) {
            this.element = null;
            this.uri = value;
        }

        /**
         * Adds a Transform object to the list of transforms to be performed 
         * on the data before passing it to the digest algorithm.
         * @param  {Transform} transform The transform to be added to the list of transforms.
         * @returns void
         */
        AddTransform(transform: Transform): void {
            this.chain.push(transform);
        }

        /**
         * Returns the XML representation of the Reference.
         * @returns Element
         */
        GetXml(): Element {
            if (this.element != null)
                return this.element;

            if (this.digestMethod == null)
                throw new XmlError(XE.CRYPTOGRAPHIC, "DigestMethod");
            if (this.digestValue == null)
                throw new XmlError(XE.PARAM_REQUIRED, "DigestValue");

            let prefix = this.GetPrefix();

            let doc = CreateDocument();
            let xel = doc.createElementNS(XmlSignature.NamespaceURI, prefix + XmlSignature.ElementNames.Reference);
            if (this.id != null)
                xel.setAttribute(XmlSignature.AttributeNames.Id, this.id);
            if (this.uri != null)
                xel.setAttribute(XmlSignature.AttributeNames.URI, this.uri);
            if (this.type != null)
                xel.setAttribute(XmlSignature.AttributeNames.Type, this.type);

            if (this.chain.length > 0) {
                let ts = doc.createElementNS(XmlSignature.NamespaceURI, prefix + XmlSignature.ElementNames.Transforms);
                for (let i in this.chain) {
                    let t = this.chain[i];
                    t.Prefix = this.Prefix;
                    let xn = t.GetXml();
                    let newNode = doc.importNode(xn, true);
                    ts.appendChild(newNode);
                }
                xel.appendChild(ts);
            }

            let dm = doc.createElementNS(XmlSignature.NamespaceURI, prefix + XmlSignature.ElementNames.DigestMethod);
            dm.setAttribute(XmlSignature.AttributeNames.Algorithm, this.digestMethod);
            xel.appendChild(dm);

            let dv = doc.createElementNS(XmlSignature.NamespaceURI, prefix + XmlSignature.ElementNames.DigestValue);
            dv.textContent = Convert.ToBase64String(Convert.FromBufferString(this.digestValue));
            xel.appendChild(dv);

            return xel;
        }

        private GetAttribute(xel: Element, attribute: string) {
            return xel.hasAttribute(attribute) ? xel.getAttribute(attribute) : null;
        }

        /**
         * Loads a Reference state from an XML element.
         * @param  {Element} value
         */
        LoadXml(value: Element) {
            if (value == null)
                throw new XmlError(XE.PARAM_REQUIRED, "value");

            if ((value.localName !== XmlSignature.ElementNames.Reference) || (value.namespaceURI !== XmlSignature.NamespaceURI))
                throw new XmlError(XE.CRYPTOGRAPHIC, "value");

            this.id = this.GetAttribute(value, XmlSignature.AttributeNames.Id);
            this.uri = this.GetAttribute(value, XmlSignature.AttributeNames.URI);
            this.type = this.GetAttribute(value, XmlSignature.AttributeNames.Type);
            // Note: order is important for validations
            let xnl = value.getElementsByTagNameNS(XmlSignature.NamespaceURI, XmlSignature.ElementNames.Transform);
            if ((xnl != null) && (xnl.length > 0)) {
                let t: Transform | null = null;
                for (let i = 0; i < xnl.length; i++) {
                    let xn = xnl[i];
                    let a = this.GetAttribute(xn, XmlSignature.AttributeNames.Algorithm);
                    t = CryptoConfig.CreateFromName(a) as Transform;
                    if (t == null)
                        throw new XmlError(XE.CRYPTOGRAPHIC_UNKNOWN_TRANSFORM, a);

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
            this.DigestMethod = XmlSignature.GetAttributeFromElement(value, XmlSignature.AttributeNames.Algorithm, XmlSignature.ElementNames.DigestMethod);
            // get DigestValue
            let dig = XmlSignature.GetChildElement(value, XmlSignature.ElementNames.DigestValue, XmlSignature.NamespaceURI);
            if (dig != null)
                this.DigestValue = Convert.ToBufferString(Convert.FromBase64String(dig.textContent || ""));
            this.element = value;
        }
    }

}