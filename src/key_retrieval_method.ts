namespace xadesjs {
    export class KeyInfoRetrievalMethod extends XmlObject implements KeyInfoClause {

        private URI: string;
        private element: Element;
        private type: string;

        public constructor(strUri?: string, strType?: string) {
            super();
            this.URI = strUri || null;
            this.Type = strType || null;
        }

        get Type(): string {
            return this.type;
        }
        set Type(value: string) {
            this.element = null;
            this.type = value;
        }

        get Uri(): string {
            return this.URI;
        }
        set Uri(value: string) {
            this.element = null;
            this.URI = value;
        }

        getXml(): Node {
            if (this.element != null)
                return this.element;

            let doc = document.implementation.createDocument("", "", null);
            let xel = doc.createElementNS(XmlSignature.NamespaceURI, XmlSignature.ElementNames.RetrievalMethod);
            if ((this.URI != null) && (this.URI.length > 0))
                xel.setAttribute(XmlSignature.AttributeNames.URI, this.URI);
            if (this.Type != null)
                xel.setAttribute(XmlSignature.AttributeNames.Type, this.Type);
            return xel;
        }

        loadXml(value: Element): void {
            if (value == null)
                throw new XmlError(XE.PARAM_REQUIRED, "value");

            if ((value.localName !== XmlSignature.ElementNames.RetrievalMethod) || (value.namespaceURI !== XmlSignature.NamespaceURI)) {
                this.URI = ""; // not null - so we return URI="" as attribute !!!
            } else {
                this.URI = value.getAttribute(XmlSignature.AttributeNames.URI);
                if (value.hasAttribute(XmlSignature.AttributeNames.Type))
                    this.Type = value.getAttribute(XmlSignature.AttributeNames.Type);
                this.element = value;
            }
        }
    }
}