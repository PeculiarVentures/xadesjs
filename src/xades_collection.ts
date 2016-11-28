namespace xadesjs.pro {

    export const MAX = Number.MAX_VALUE;
    export const MIN = 0;

    export class XmlXadesCollection<I extends XmlXadesObject> extends Collection<I> implements IXmlSerializable {

        // Public properties

        Prefix: string = XmlXades.DefaultPrefix;

        /**
         * The maximum number of elements
         */
        MaxOccurs: number;

        /**
         * The minimum number of elements
         */
        MinOccurs: number;

        constructor(minOccurs: number = MIN, maxOccurs: number = MAX) {
            super();
            this.MinOccurs = minOccurs;
            this.MaxOccurs = maxOccurs;
        }

        // Protetced methods
        protected GetXmlObjectName(): string {
            throw new XmlError(XE.METHOD_NOT_IMPLEMENTED);
        }

        protected GetPrefix(): string {
            return this.Prefix ? this.Prefix + ":" : "";
        }

        protected OnLoadChildElement(element: Element): any {
            throw new XmlError(XE.METHOD_NOT_IMPLEMENTED);
        }

        // Public methods
		/**
		 * Check to see if something has changed in this instance and needs to be serialized
		 * @returnsFlag indicating if a member needs serialization</returns>
		 */
        public HasChanged(): boolean {
            let retVal = false;

            if (this.Count > 0) {
                retVal = true;
            }

            return retVal;
        }


		/**
		 * Load state from an XML element
         * @param {Element} element XML element containing new state
		 */
        public LoadXml(element: Element): void {
            if (element == null) {
                throw new XmlError(XE.PARAM_REQUIRED, "element");
            }

            if (!((element.localName === this.GetXmlObjectName()) && (element.namespaceURI === XmlXades.NamespaceURI)))
                throw new XmlError(XE.ELEMENT_MALFORMED, this.GetXmlObjectName());

            this.Clear();
            let xmlNodeList = element.childNodes;
            try {
                for (let i = 0; i < xmlNodeList.length; i++) {
                    let node = xmlNodeList.item(i) as Element;
                    if (node.nodeType !== XmlNodeType.Element)
                        continue;
                    let item = this.OnLoadChildElement(node);
                    if (item)
                        this.Add(item);
                }
            }
            catch (e) { console.error(e); }
            if (!(this.MinOccurs <= this.Count && this.Count <= this.MaxOccurs))
                throw new XmlError(XE.CRYPTOGRAPHIC, `${this.GetXmlObjectName()} has wrong items number '${this.Count}', should be [${this.MinOccurs},${this.MaxOccurs === MAX ? "unbounded" : this.MaxOccurs}]`);
        }

		/**
		 * Returns the XML representation of the this object
         * @returns XML element containing the state of this object
		 */
        public GetXml(): Element {
            let document = this.CreateDocument();
            let element = this.CreateElement(document);

            let appendedCount = 0;
            for (let item of this.GetIterator()) {
                if (item.HasChanged()) {
                    element.appendChild(document.importNode(item.GetXml(), true));
                    appendedCount++;
                }
            }
            if (!(this.MinOccurs <= appendedCount && appendedCount <= this.MaxOccurs))
                throw new XmlError(XE.CRYPTOGRAPHIC, `${this.GetXmlObjectName()} has wrong items number '${appendedCount}', should be [${this.MinOccurs},${this.MaxOccurs === MAX ? "unbounded" : this.MaxOccurs}]`);

            return element;
        }

        protected CreateDocument(): Document {
            return CreateDocument(
                this.GetXmlObjectName(),
                XmlXades.NamespaceURI,
                XmlXades.DefaultPrefix);
        }

        protected CreateElement(document: Document) {
            return document.createElementNS(XmlXades.NamespaceURI, this.GetPrefix() + this.GetXmlObjectName());
        }

        /**
         * Returns Element by tag name by XADES namespace uri.
         * If element is required and not founded, throws exception
         * @param  {Element} element
         * @param  {string} name
         * @param  {boolean=true} required
         */
        protected GetElement(element: Element, name: string, required: boolean = true) {
            let xmlNodeList = element.getElementsByTagNameNS(XmlXades.NamespaceURI, name);
            if (required && xmlNodeList.length === 0) {
                throw new XmlError(XE.CRYPTOGRAPHIC, `${name} missing`);
            }
            return xmlNodeList[0] || null;
        }
    }

}