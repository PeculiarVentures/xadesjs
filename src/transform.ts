namespace xadesjs.pro {
    export class TransformCollection extends Collection<Transform> { }

    /**
     * The Transform element contains a single transformation
     */
    export class Transform extends XmlObject {
        // Private variables

        // Public properties
        /**
         * Algorithm of the transformation
         */
        public Algorithm: string;

		/**
		 * XPath of the transformation
		 */
        public XPath: string;


        // Constructors
		/**
		 * Default constructor
		 */
        public constructor() {
            super();
        }

        // Protected methods
        protected GetXmlObjectName() {
            return XmlSignature.ElementNames.Transform;
        }

        protected GetPrefix() {
            return XmlSignature.DefaultPrefix + ":";
        }

        // Public methods
		/**
		 * Check to see if something has changed in this instance and needs to be serialized
         * @returns Flag indicating if a member needs serialization
		 */
        public HasChanged(): boolean {
            let retVal = false;

            if (this.Algorithm) {
                retVal = true;
            }

            if (this.XPath) {
                retVal = true;
            }

            return retVal;
        }

		/**
		 * Load state from an XML element
         * @param {Element} element XML element containing new state
		 */
        public LoadXml(element: Element): void {
            if (!element) {
                throw new XmlError(XE.PARAM_REQUIRED, "element");
            }

            if ((element.localName === this.GetXmlObjectName()) && (element.namespaceURI === XmlSignature.NamespaceURI)) {
                if (element.hasAttribute(XmlSignature.AttributeNames.Algorithm)) {
                    this.Algorithm = element.getAttribute(XmlSignature.AttributeNames.Algorithm);
                }
                else {
                    this.Algorithm = "";
                }

                let xmlNodeList = element.getElementsByTagNameNS(XmlSignature.NamespaceURI, "XPath");
                if (xmlNodeList.length) {
                    this.XPath = xmlNodeList.item(0).textContent;
                }
                else {
                    this.XPath = "";
                }
            }
            else
                throw new XmlError(XE.ELEMENT_MALFORMED, this.GetXmlObjectName());
        }

		/**
		 * Returns the XML representation of the this object
         * @returns XML element containing the state of this object
		 */
        public GetXml(): Element {
            let document = CreateDocument(
                this.GetXmlObjectName(),
                XmlSignature.NamespaceURI,
                XmlSignature.DefaultPrefix);

            let element = document.createElementNS(XmlSignature.NamespaceURI, this.GetPrefix() + XmlSignature.ElementNames.Transform);

            if (this.Algorithm) {
                element.setAttribute(XmlSignature.AttributeNames.Algorithm, this.Algorithm);
            }
            else {
                element.setAttribute(XmlSignature.AttributeNames.Algorithm, "");
            }

            if (this.XPath) {
                let xmlXPath = document.createElementNS(XmlSignature.NamespaceURI, this.GetPrefix() + "XPath");
                xmlXPath.textContent = this.XPath;
                element.appendChild(xmlXPath);
            }

            return element;
        }

    }
}