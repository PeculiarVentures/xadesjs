namespace xadesjs.pro {

    /**
     * <xsd:element name="SigPolicyQualifier" type="AnyType" maxOccurs="unbounded"/>
     */

    export interface ISigPolicyQualifier extends XmlXadesObject {
        AnyXmlElement: Element;
    }

	/**
	 * This class can contain additional information qualifying the signature
	 * policy identifier
	 */
    export class SigPolicyQualifier extends XmlXadesObject implements ISigPolicyQualifier {

        protected anyXmlElement: Element = null;

        // Public properties
		/**
		 * The generic XML element that represents a sig policy qualifier
		 */
        public get AnyXmlElement(): Element {
            return this.anyXmlElement;
        }
        public set AnyXmlElement(value: Element) {
            this.anyXmlElement = value;
        }

        // Protected methods

        protected GetXmlObjectName() {
            return XmlXades.ElementNames.SigPolicyQualifier;
        }

        // Public methods
		/**
		 * Check to see if something has changed in this instance and needs to be serialized
         * @returns Flag indicating if a member needs serialization
		 */
        public HasChanged(): boolean {
            let retVal = false;

            if (this.anyXmlElement) {
                retVal = true;
            }

            return retVal;
        }

		/**
		 * Load state from an XML element
         * @param {Element} element XML element containing new state < /param>
		 */
        public LoadXml(element: Element): void {
            super.LoadXml(element);

            let nodes = element.childNodes;
            // Get first child Element
            for (let i = 0; i < nodes.length; i++) {
                let node = nodes.item(i);
                if (node.nodeType !== XmlNodeType.Element)
                    continue;
                this.anyXmlElement = node as Element;
                break;
            }
        }

		/**
		 * Returns the XML representation of the this object
         * @returns XML element containing the state of this object
		 */
        public GetXml(): Element {
            let document = this.CreateDocument();
            let element = this.CreateElement(document);

            if (this.anyXmlElement) {
                element.appendChild(document.importNode(this.AnyXmlElement, true));
            }

            return element;
        }

    }
}
