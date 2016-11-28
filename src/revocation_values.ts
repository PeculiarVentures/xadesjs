namespace xadesjs.pro {
	/**
	 * The RevocationValues element is used to hold the values of the
	 * revocation information which are to be shipped with the XML signature
	 * in case of an XML Advanced Electronic Signature with Extended
	 * Validation Data (XAdES-X-Long). This is a unsigned property that
	 * qualifies the signature. An XML electronic signature aligned with the
	 * present document MAY contain at most one RevocationValues element.
	 */
    export class RevocationValues extends XmlXadesObject {

        // Public properties
		/**
		 * Optional Id for the XML element
		 */
        public Id: string;

		/**
		 * Certificate Revocation Lists
		 */
        public CRLValues: CRLValues;

		/**
		 * Responses from an online certificate status server
		 */
        public OCSPValues: OCSPValues;

		/**
		 * Placeholder for other revocation information is provided for future
		 * use
		 */
        public OtherValues: OtherValues;

        // Constructors
		/**
		 * Default constructor
		 */
        public constructor() {
            super();
            this.CRLValues = new CRLValues();
            this.OCSPValues = new OCSPValues();
            this.OtherValues = new OtherValues();
        }

        // Protected methods

        protected GetXmlObjectName() {
            return XmlXades.ElementNames.RevocationValues;
        }


        // Public methods
		/**
		 * Check to see if something has changed in this instance and needs to be serialized
         * @returns Flag indicating if a member needs serialization
		 */
        public HasChanged(): boolean {
            let retVal = false;

            if (this.Id) {
                retVal = true;
            }
            if (this.CRLValues && this.CRLValues.HasChanged()) {
                retVal = true;
            }
            if (this.OCSPValues && this.OCSPValues.HasChanged()) {
                retVal = true;
            }
            if (this.OtherValues && this.OtherValues.HasChanged()) {
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

            this.Id = this.getAttribute(element, XmlXades.AttributeNames.Id, "", false);

            let xml = this.GetElement(element, XmlXades.ElementNames.CRLValues, false);
            if (xml) {
                this.CRLValues = new CRLValues();
                this.CRLValues.LoadXml(xml);
            }
            xml = this.GetElement(element, XmlXades.ElementNames.OCSPValues, false);
            if (xml) {
                this.OCSPValues = new OCSPValues();
                this.OCSPValues.LoadXml(xml);
            }
            xml = this.GetElement(element, XmlXades.ElementNames.OtherValues, false);
            if (xml) {
                this.OtherValues = new OtherValues();
                this.OtherValues.LoadXml(xml);
            }
        }

		/**
		 * Returns the XML representation of the this object
         * @returns XML element containing the state of this object
		 */
        public GetXml(): Element {
            let document = this.CreateDocument();
            let element = this.CreateElement(document);

            if (this.Id) {
                element.setAttribute(XmlXades.AttributeNames.Id, this.Id);
            }
            if (this.CRLValues && this.CRLValues.HasChanged()) {
                element.appendChild(document.importNode(this.CRLValues.GetXml(), true));
            }
            if (this.OCSPValues && this.OCSPValues.HasChanged()) {
                element.appendChild(document.importNode(this.OCSPValues.GetXml(), true));
            }
            if (this.OtherValues && this.OtherValues.HasChanged()) {
                element.appendChild(document.importNode(this.OtherValues.GetXml(), true));
            }

            return element;
        }

    }
}
