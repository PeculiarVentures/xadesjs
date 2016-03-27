namespace xadesjs {
    export class SignedInfo extends XmlObject {

        private references: Reference[];
        private c14nMethod: string;
        private id: string;
        private signatureMethod: string;
        private signatureLength: string;
        private element: Element;

        public constructor() {
            super();
            this.references = new Array();
            this.c14nMethod = "http://www.w3.org/TR/2001/REC-xml-c14n-20010315";
        }

        get CanonicalizationMethod(): string {
            return this.c14nMethod;
        }
        set CanonicalizationMethod(value: string) {
            this.c14nMethod = value;
            this.element = null;
        }

        get CanonicalizationMethodObject(): Transform {
            throw new XmlError(XE.METHOD_NOT_IMPLEMENTED);
        }

        // documented as not supported (and throwing exception)
        public length(): number {
            throw new XmlError(XE.METHOD_NOT_SUPPORTED);
        }

        get Id(): string {
            return this.id;
        }
        set Id(value: string) {
            this.element = null;
            this.id = value;
        }

        // documented as not supported (and throwing exception)
        get IsReadOnly(): boolean {
            throw new XmlError(XE.METHOD_NOT_SUPPORTED);
        }

        // documented as not supported (and throwing exception)
        get IsSynchronized(): boolean {
            throw new XmlError(XE.METHOD_NOT_SUPPORTED);
        }

        // Manipulating this array never affects GetXml() when 
        // LoadXml() was used. 
        // (Actually, there is no way to detect modification.)
        get References(): Reference[] {
            return this.references;
        }

        get SignatureLength(): string {
            return this.signatureLength;
        }
        set SignatureLength(value: string) {
            this.element = null;
            this.signatureLength = value;

        }

        get SignatureMethod(): string {
            return this.signatureMethod;
        }
        set SignatureMethod(value: string) {
            this.element = null;
            this.signatureMethod = value;
        }

        // documented as not supported (and throwing exception)
        get SyncRoot(): any {
            throw new XmlError(XE.METHOD_NOT_SUPPORTED);
        }

        AddReference(reference: Reference): void {
            this.references.push(reference);
        }

        // documented as not supported (and throwing exception)
        public CopyTo(array: any[], index: number): void {
            throw new XmlError(XE.METHOD_NOT_SUPPORTED);
        }

        getXml(): Node {
            if (this.element != null)
                return this.element;

            if (this.signatureMethod == null)
                throw new XmlError(XE.CRYPTOGRAPHIC, "SignatureMethod");
            if (this.references.length === 0)
                throw new XmlError(XE.CRYPTOGRAPHIC, "References empty");

            let doc = document.implementation.createDocument("", "", null);
            let xel = doc.createElementNS(XmlSignature.NamespaceURI, XmlSignature.ElementNames.SignedInfo);
            if (this.id != null)
                xel.setAttribute(XmlSignature.AttributeNames.Id, this.id);

            if (this.c14nMethod != null) {
                let c14n = doc.createElementNS(XmlSignature.NamespaceURI, XmlSignature.ElementNames.CanonicalizationMethod);
                c14n.setAttribute(XmlSignature.AttributeNames.Algorithm, this.c14nMethod);
                xel.appendChild(c14n);
            }
            if (this.signatureMethod != null) {
                let sm = doc.createElementNS(XmlSignature.NamespaceURI, XmlSignature.ElementNames.SignatureMethod);
                sm.setAttribute(XmlSignature.AttributeNames.Algorithm, this.signatureMethod);
                if (this.signatureLength != null) {
                    let hmac = doc.createElementNS(XmlSignature.NamespaceURI, XmlSignature.ElementNames.HMACOutputLength);
                    hmac.textContent = this.signatureLength;
                    sm.appendChild(hmac);
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
                let xn = r.getXml();
                let newNode = doc.importNode(xn, true);
                xel.appendChild(newNode);
            }

            return xel;
        }

        GetAttribute(xel: Element, attribute: string): string {
            if (!xel.hasAttribute(attribute))
                return null;
            return xel.getAttribute(attribute);
        }

        loadXml(value: Element): void {
            if (value == null)
                throw new XmlError(XE.PARAM_REQUIRED, "value");

            if ((value.localName !== XmlSignature.ElementNames.SignedInfo) || (value.namespaceURI !== XmlSignature.NamespaceURI))
                throw new XmlError(XE.CRYPTOGRAPHIC, "value");

            this.id = this.GetAttribute(value, XmlSignature.AttributeNames.Id);
            this.c14nMethod = XmlSignature.GetAttributeFromElement(value, XmlSignature.AttributeNames.Algorithm, XmlSignature.ElementNames.CanonicalizationMethod);

            let sm = XmlSignature.GetChildElement(value, XmlSignature.ElementNames.SignatureMethod, XmlSignature.NamespaceURI);
            if (sm !== null) {
                this.signatureMethod = sm.getAttribute(XmlSignature.AttributeNames.Algorithm);
                let length = XmlSignature.GetChildElement(sm, XmlSignature.ElementNames.HMACOutputLength, XmlSignature.NamespaceURI);
                if (length != null) {
                    this.signatureLength = length.textContent;
                }
            }

            for (let i = 0; i < value.childNodes.length; i++) {
                let n = value.childNodes[i];
                if (n.nodeType === XmlNodeType.Element &&
                    n.localName === XmlSignature.ElementNames.Reference &&
                    n.namespaceURI === XmlSignature.NamespaceURI) {
                    let r = new Reference();
                    r.loadXml(<Element>n);
                    this.AddReference(r);
                }
            }
            this.element = value;
        }
    }
}