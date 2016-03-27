namespace xadesjs {

    // XmlElement part of the signature
    // Note: Looks like KeyInfoNode (but the later is XmlElement inside KeyInfo)
    // required for "enveloping signatures"
    export class DataObject extends XmlObject {

        private element: Element;
        private propertyModified: boolean;

        constructor();
        constructor(id: string, mimeType: string, encoding: string, data: Element);
        constructor(id?: string, mimeType?: string, encoding?: string, data?: Element) {
            super();

            if (arguments.length === 0) {
                // constructor();
                this.Build(null, null, null, null);
            }
            else {
                if (data == null)
                    throw new XmlError(XE.PARAM_REQUIRED, "data");

                this.Build(id, mimeType, encoding, data);
            }
        }

        // this one accept a null "data" parameter
        private Build(id: string, mimeType: string, encoding: string, data: Element): void {
            let doc = document.implementation.createDocument("", "", null);
            let xel = doc.createElementNS(XmlSignature.NamespaceURI, XmlSignature.ElementNames.Object);
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
                let newNode = doc.importNode(data, true);
                xel.appendChild(newNode);
            }
            this.element = xel;
        }

        // why is data a XmlNodeList instead of a XmlElement ?
        get Data(): NodeList {
            return this.element.childNodes;
        }
        set Data(value: NodeList) {
            if (value == null)
                throw new XmlError(XE.PARAM_REQUIRED, "value");
            let doc = document.implementation.createDocument("", "", null);
            let el = doc.importNode(this.element, true);
            while (el.lastChild != null)
                el.removeChild(el.lastChild);
            for (let i = 0; i < value.length; i++)
                el.appendChild(doc.importNode(value[i], true));
            this.element = <Element>el;
            this.propertyModified = true;
        }


        // default to null - no encoding
        get Encoding(): string {
            return this.GetField(XmlSignature.AttributeNames.Encoding);
        }
        set Encoding(value: string) {
            this.SetField(XmlSignature.AttributeNames.Encoding, value);
        }

        // default to null
        get Id(): string {
            return this.GetField(XmlSignature.AttributeNames.Id);
        }
        set Id(value: string) {
            this.SetField(XmlSignature.AttributeNames.Id, value);
        }

        // default to null
        get MimeType(): string {
            return this.GetField(XmlSignature.AttributeNames.MimeType);
        }
        set MimeType(value: string) {
            this.SetField(XmlSignature.AttributeNames.MimeType, value);
        }

        protected GetField(attribute: string): string {
            return this.element.hasAttribute(attribute) ? this.element.getAttribute(attribute) : null;
        }

        protected SetField(attribute: string, value: string): void {
            // MS-BUGS: it never cleans attribute value up.
            if (value == null)
                return;

            if (this.propertyModified)
                this.element.setAttribute(attribute, value);
            else {
                let doc = document.implementation.createDocument("", "", null);
                let el = doc.importNode(this.element, true) as Element;
                el.setAttribute(attribute, value);
                this.element = el;
                this.propertyModified = true;
            }
        }

        getXml(): Element {
            if (this.propertyModified) {
                // It looks MS.NET returns element which comes from new XmlDocument every time
                let oldElement = this.element;
                let doc = document.implementation.createDocument("", "", null);
                this.element = doc.createElementNS(XmlSignature.NamespaceURI, XmlSignature.ElementNames.Object);
                for (let i = 0; i < oldElement.attributes.length; i++) {
                    let attribute = oldElement.attributes[i];
                    switch (attribute.name) {
                        case XmlSignature.AttributeNames.Id:
                        case XmlSignature.AttributeNames.Encoding:
                        case XmlSignature.AttributeNames.MimeType:
                            this.element.setAttribute(attribute.name, attribute.value);
                            break;
                    }
                }
                for (let i = 0; i < oldElement.childNodes.length; i++)
                    this.element.appendChild(doc.importNode(oldElement.childNodes[i], true));
            }
            return this.element;
        }

        loadXml(value: Element) {
            if (value == null)
                throw new XmlError(XE.PARAM_REQUIRED, "value");
            this.element = value;
            this.propertyModified = false;
        }
    }

}