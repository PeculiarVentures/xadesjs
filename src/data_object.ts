namespace xadesjs {

    // XmlElement part of the signature
    // Note: Looks like KeyInfoNode (but the later is XmlElement inside KeyInfo)
    // required for "enveloping signatures"

    /**
     * Represents the object element of an XML signature that holds data to be signed.
     */
    export class DataObject extends XmlObject {

        private element: Element;
        private propertyModified: boolean;

        public constructor();
        public constructor(id: string | null, mimeType: string | null, encoding: string | null, data: Element | null);
        public constructor(id?: string | null, mimeType?: string | null, encoding?: string | null, data?: Element | null) {
            super();
            this.Build(id, mimeType, encoding, data);
        }

        // this one accept a null "data" parameter
        private Build(id?: string | null, mimeType?: string | null, encoding?: string | null, data?: Element | null) {
            let document = CreateDocument();

            let prefix = this.GetPrefix();

            let xel = document.createElementNS(XmlSignature.NamespaceURI, prefix + XmlSignature.ElementNames.Object);
            if (id != null) {
                xel.setAttribute(XmlSignature.AttributeNames.Id, id);
            }
            if (mimeType != null) {
                xel.setAttribute(XmlSignature.AttributeNames.MimeType, mimeType);
            }
            if (encoding != null) {
                xel.setAttribute(XmlSignature.AttributeNames.Encoding, encoding);
            }
            if (data != null) {
                let newNode = document.importNode(data, true);
                xel.appendChild(newNode);
            }
            this.element = xel;
        }

        /**
         * Gets or sets the data value of the current DataObject object.
         */
        public get Data(): NodeList {
            return this.element.childNodes;
        }
        public set Data(value: NodeList) {
            if (value == null)
                throw new XmlError(XE.PARAM_REQUIRED, "value");
            let doc = CreateDocument();
            let el = <Element>doc.importNode(this.element, true);
            while (el.lastChild != null)
                el.removeChild(el.lastChild);
            for (let i = 0; i < value.length; i++) {
                let n = value[i];
                el.appendChild(doc.importNode(n, true));
            }
            this.element = el;
            this.propertyModified = true;
        }

        /**
         * Gets or sets the encoding of the current DataObject object.
         */
        public get Encoding(): string | null {
            return this.GetField(XmlSignature.AttributeNames.Encoding);
        }
        public set Encoding(value: string | null) {
            this.SetField(XmlSignature.AttributeNames.Encoding, value);
        }

        /**
         * Gets or sets the identification of the current DataObject object.
         */
        public get Id(): string | null {
            return this.GetField(XmlSignature.AttributeNames.Id);
        }
        public set Id(value: string | null) {
            this.SetField(XmlSignature.AttributeNames.Id, value);
        }


        /**
         * Gets or sets the MIME type of the current DataObject object.
         */
        public get MimeType() {
            return this.GetField(XmlSignature.AttributeNames.MimeType);
        }
        public set MimeType(value: string | null) {
            this.SetField(XmlSignature.AttributeNames.MimeType, value);
        }

        private GetField(attribute: string) {
            return this.element.hasAttribute(attribute) ? this.element.getAttribute(attribute) : null;
        }

        private SetField(attribute: string, value: string | null): void {
            // MS-BUGS: it never cleans attribute value up.
            if (value == null)
                return;

            if (this.propertyModified)
                this.element.setAttribute(attribute, value);
            else {
                let doc = CreateDocument();
                let el = doc.importNode(this.element, true) as Element;
                el.setAttribute(attribute, value);
                this.element = el;
                this.propertyModified = true;
            }
        }

        /**
         * Returns the XML representation of the DataObject object.
         * @returns Element
         */
        public GetXml(): Element {
            if (this.propertyModified) {
                // It looks MS.NET returns element which comes from new XmlDocument every time
                let oldElement = this.element;
                let doc = CreateDocument();
                let prefix = this.GetPrefix();
                this.element = doc.createElementNS(XmlSignature.NamespaceURI, prefix + XmlSignature.ElementNames.Object);
                for (let i = 0; i < oldElement.attributes.length; i++) {
                    let attribute = oldElement.attributes[i];
                    switch (attribute.nodeName) {
                        case XmlSignature.AttributeNames.Id:
                        case XmlSignature.AttributeNames.Encoding:
                        case XmlSignature.AttributeNames.MimeType:
                            this.element.setAttribute(attribute.nodeName, attribute.nodeValue!); // TODO Can be attr value null?
                            break;
                    }
                }
                for (let i = 0; i < oldElement.childNodes.length; i++) {
                    let n = oldElement.childNodes[i];
                    this.element.appendChild(doc.importNode(n, true));
                }
            }
            return this.element;
        }

        /**
         * Loads a DataObject state from an XML element.
         * @param  {Element} value
         * @returns void
         */
        public LoadXml(value: Element): void {
            if (value == null)
                throw new XmlError(XE.PARAM_REQUIRED, "value");
            this.element = value;
            this.propertyModified = false;
        }
    }

}