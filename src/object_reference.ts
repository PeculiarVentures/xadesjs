namespace xadesjs.pro {

    export class ObjectReferenceCollection extends Collection<ObjectReference> { }

	/**
	 * This class refers to one ds:Reference element of the ds:SignedInfo
	 * corresponding with one data object qualified by this property.
	 * If some but not all the signed data objects share the same commitment,
	 * one ObjectReference element must appear for each one of them.
	 * However, if all the signed data objects share the same commitment,
	 * the AllSignedDataObjects empty element must be present.
	 */
    export class ObjectReference extends XmlXadesObject {

        // Public properties

        /**
		 * Uri of the object reference
		 */
        public Uri: string;

        // Protected methods

        protected GetXmlObjectName() {
            return XmlXades.ElementNames.ObjectReference;
        }

        // Public methods

        /**
		 * Check to see if something has changed in this instance and needs to be serialized
         * @returns Flag indicating if a member needs serialization
		 */
        public HasChanged(): boolean {
            let retVal = false;

            if (this.Uri) {
                retVal = true;
            }

            return retVal;
        }

		/**
		 * Load state from an XML element
         * @param {Element} element XML element containing new state>
		 */
        public LoadXml(element: Element): void {
            super.LoadXml(element);

            this.Uri = element.textContent;
        }

		/**
		 * Returns the XML representation of the this object
         * @returns XML element containing the state of this object
		 */
        public GetXml(): Element {
            let document = this.CreateDocument();
            let element = this.CreateElement(document);

            element.textContent = this.Uri;

            return element;
        }

    }
}
