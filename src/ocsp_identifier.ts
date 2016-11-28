namespace xadesjs.pro {
	/**
	 * This class includes the name of the server that has produced the
	 * referenced response (ResponderID element) and the time indication in
	 * the "ProducedAt" field of the referenced response (ProducedAt element).
	 * The optional URI attribute could serve to indicate where the OCSP
	 * response identified is archived.
	 */
    export class OCSPIdentifier extends XmlXadesObject {

        // Public properties
		/**
		 * The optional URI attribute could serve to indicate where the OCSP
		 * response is archived
		 */
        public UriAttribute: string;

		/**
		 * The ID of the server that has produced the referenced response
		 */
        public ResponderID: string;

		/**
		 * Time indication in the referenced response
		 */
        public ProducedAt: Date;

        // Constructors
		/**
		 * Default constructor
		 */
        public constructor() {
            super();
            this.ProducedAt = null;
        }

        // Protected methods

        protected GetXmlObjectName() {
            return XmlXades.ElementNames.OCSPIdentifier;
        }

        // Public methods
		/**
		 * Check to see if something has changed in this instance and needs to be serialized
         * @returns Flag indicating if a member needs serialization
		 */
        public HasChanged(): boolean {
            let retVal = false;

            if (this.UriAttribute) {
                retVal = true;
            }

            if (this.ResponderID) {
                retVal = true;
            }

            if (this.ProducedAt) {
                retVal = true;
            }

            return retVal;
        }

		/**
		 * Load state from an XML element
         * @param {Element} element XML element containing new state
		 */
        public LoadXml(element: Element) {
            super.LoadXml(element);

            this.UriAttribute = this.getAttribute(element, XmlXades.AttributeNames.URI, null, false);

            let xmlResponderID = this.GetElement(element, XmlXades.ElementNames.ResponderID, false);
            if (xmlResponderID) {
                this.ResponderID = xmlResponderID.textContent;
            }

            let xmlProducedAt = this.GetElement(element, XmlXades.ElementNames.ProducedAt, false);
            if (xmlProducedAt) {
                this.ProducedAt = Convert.ToDateTime(xmlProducedAt);
            }
        }

		/**
		 * Returns the XML representation of the this object
         * @returns XML element containing the state of this object
		 */
        public GetXml(): Element {
            let document = this.CreateDocument();
            let element = this.CreateElement(document);

            if (this.UriAttribute)
                element.setAttribute(XmlXades.AttributeNames.URI, this.UriAttribute);

            if (this.ResponderID) {
                let xml = document.createElementNS(XmlXades.NamespaceURI, this.GetPrefix() + XmlXades.ElementNames.ResponderID);
                xml.textContent = this.ResponderID;
                element.appendChild(xml);
            }

            if (this.ProducedAt) {
                let xml = document.createElementNS(XmlXades.NamespaceURI, this.GetPrefix() + XmlXades.ElementNames.ProducedAt);
                xml.textContent = Convert.ToString(this.producedAt.ToString("s"));
                element.appendChild(xml);
            }

            return element;
        }

    }
}
