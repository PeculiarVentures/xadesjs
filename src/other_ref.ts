namespace xadesjs.pro {

    /**
     * This class contains a collection of OtherRefs
     */
    export class OtherRefs extends XmlXadesCollection<OtherRef> {
        // Protetced methods
        protected GetXmlObjectName() {
            return XmlXades.ElementNames.OtherRefs;
        }

        protected OnLoadChildElement(element: Element): any {
            if (element.namespaceURI === XmlXades.NamespaceURI && element.localName === XmlXades.ElementNames.OtherRef) {
                let obj = new OtherRef();
                obj.LoadXml(element);
                return obj;
            }
        }
    }

	/**
	 * Alternative forms of validation data can be included in this class
	 */
    export class OtherRef extends XmlXadesObject {

        // Public properties
		/**
		 * The generic XML element that represents any other type of ref
		 */
        public AnyXmlElement: Element;

        // Protected methods

        protected GetXmlObjectName() {
            return XmlXades.ElementNames.OtherRef;
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
            super.LoadXml(element);
            this.AnyXmlElement = element;
        }

		/**
		 * Returns the XML representation of the this object
         * @returns XML element containing the state of this object
		 */
        public GetXml(): Element {
            let document = this.CreateDocument();
            let element = this.CreateElement(document);

            if (this.AnyXmlElement != null) {
                element.appendChild(document.importNode(this.AnyXmlElement, true));
            }

            return element;
        }

    }
}
