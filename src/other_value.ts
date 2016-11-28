namespace xadesjs.pro {

    /**
	 * The OtherValues element contains a collection of Cert elements
	 */
    export class OtherValues extends XmlXadesCollection<OtherValue> {
        // Protetced methods
        protected GetXmlObjectName() {
            return XmlXades.ElementNames.OtherValues;
        }

        protected OnLoadChildElement(element: Element): any {
            if (element.namespaceURI === XmlXades.NamespaceURI && element.localName === XmlXades.ElementNames.OtherValue) {
                let obj = new OtherValue();
                obj.LoadXml(element);
                return obj;
            }
        }
    }

	/**
	 * This class provides a placeholder for other revocation information
	 */
    export class OtherValue extends XmlXadesObject {

        // Public properties
		/**
		 * The generic XML element that represents any other value
		 */
        public AnyXmlElement: Element;

        // Protected methods

        protected GetXmlObjectName() {
            return XmlXades.ElementNames.OtherValue;
        }

        // Public methods
		/**
		 * Check to see if something has changed in this instance and needs to be serialized
         * @returns Flag indicating if a member needs serialization
		 */
        public HasChanged(): boolean {
            let retVal = false;

            if (this.AnyXmlElement) {
                retVal = true;
            }

            return retVal;
        }

		/**
		 * Load state from an XML element
         * @param {Element} element XML element containing new state
		 */
        public LoadXml(element: Element): void {
            this.AnyXmlElement = element;
        }

		/**
		 * Returns the XML representation of the this object
         * @returns XML element containing the state of this object
		 */
        public GetXml(): Element {
            let document = this.CreateDocument();
            let element = this.CreateElement(document);

            if (this.AnyXmlElement) {
                element.appendChild(document.importNode(this.AnyXmlElement, true));
            }

            return element;
        }

    }
}
