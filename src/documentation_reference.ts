namespace xadesjs.pro {

    /**
     * <xsd:element name="DocumentationReference" type="xsd:anyURI"/>
     */

    /**
     * DocumentationReference points to further explanatory documentation
     * of the object identifier
     */
    export class DocumentationReference extends XmlXadesObject {

        // Public properties
        /**
         * Pointer to further explanatory documentation of the object identifier
         */
        public DocumentationReferenceUri: string;


        // Constructors
        public constructor() {
            super();
        }

        // Protected methods

        protected GetXmlObjectName() {
            return XmlXades.ElementNames.DocumentationReference;
        }

        // Public methods
		/**
		 * Check to see if something has changed in this instance and needs to be serialized
         * @returns Flag indicating if a member needs serialization
		 */
        public HasChanged(): boolean {
            let retVal = false;

            if (this.DocumentationReferenceUri) {
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

            this.DocumentationReferenceUri = element.textContent;
        }

		/**
		 * Returns the XML representation of the this object
         * @returns XML element containing the state of this object
		 */
        public GetXml(): Element {
            let document = this.CreateDocument();
            let element = this.CreateElement(document);

            element.textContent = this.DocumentationReferenceUri;

            return element;
        }

    }
}
