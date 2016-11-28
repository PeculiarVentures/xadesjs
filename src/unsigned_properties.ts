namespace xadesjs.pro {

    /**
     * The UnsignedProperties element contains a number of properties that are
     * not signed by the XMLDSIG signature
     */
    export class UnsignedProperties extends XmlXadesObject {

        // Private variables
        private id: string;
        private unsignedSignatureProperties: UnsignedSignatureProperties;
        private unsignedDataObjectProperties: UnsignedDataObjectProperties;

        // Public properties

        /**
         * The optional Id attribute can be used to make a reference to the
		 * UnsignedProperties element
         * @returns string
         */
        public get Id(): string {
            return this.id;
        }
        public set Id(value: string) {
            this.id = value;
        }

		/**
		 * UnsignedSignatureProperties may contain properties that qualify XML
		 * signature itself or the signer
         * @returns SignedSignatureProperties
		 */
        public get UnsignedSignatureProperties(): UnsignedSignatureProperties {
            return this.unsignedSignatureProperties;
        }
        public set UnsignedSignatureProperties(value: UnsignedSignatureProperties) {
            this.unsignedSignatureProperties = value;
        }

		/**
		 * The UnsignedDataObjectProperties element may contain properties that
		 * qualify some of the signed data objects
         * @returns SignedDataObjectProperties
		 */
        public get UnsignedDataObjectProperties(): UnsignedDataObjectProperties {
            return this.unsignedDataObjectProperties;
        }
        public set UnsignedDataObjectProperties(value: UnsignedDataObjectProperties) {
            this.unsignedDataObjectProperties = value;
        }

		/**
		 * Default constructor
		 */
        public constructor() {
            super();
            this.id = "";
            this.unsignedSignatureProperties = new UnsignedSignatureProperties();
            this.unsignedDataObjectProperties = new UnsignedDataObjectProperties();
        }

        // Protected methods

        protected GetXmlObjectName() {
            return XmlXades.ElementNames.UnsignedProperties;
        }

        // Public methods

        /**
         * Check to see if something has changed in this instance and needs to be serialized
         * @returns boolean Flag indicating if a member needs serialization< /returns>
         */
        public HasChanged(): boolean {
            let retVal = false;

            if (this.id) {
                retVal = true;
            }

            if (this.unsignedSignatureProperties != null && this.unsignedSignatureProperties.HasChanged()) {
                retVal = true;
            }

            if (this.unsignedDataObjectProperties != null && this.unsignedDataObjectProperties.HasChanged()) {
                retVal = true;
            }

            return retVal;
        }

        /**
         * Load state from an XML element
         * @param  {Element} element XML element containing new state
         * @param  {Element} counterSignedXmlElement? Element containing parent signature (needed if there are counter signatures)
         * @returns void
         */
        public LoadXml(element: Element, counterSignedXmlElement?: Element): void {
            super.LoadXml(element);

            if (element.hasAttribute(XmlXades.AttributeNames.Id)) {
                this.id = element.getAttribute(XmlXades.AttributeNames.Id);
            }
            else {
                this.id = "";
            }

            let xmlNodeList = element.getElementsByTagNameNS(XmlXades.NamespaceURI, XmlXades.ElementNames.UnsignedSignatureProperties);
            if (xmlNodeList.length !== 0) {
                this.unsignedSignatureProperties = new UnsignedSignatureProperties();
                this.unsignedSignatureProperties.LoadXml(xmlNodeList.item(0), counterSignedXmlElement);
            }
            xmlNodeList = element.getElementsByTagNameNS(XmlXades.NamespaceURI, XmlXades.ElementNames.UnsignedDataObjectProperties);
            if (xmlNodeList.length !== 0) {
                this.unsignedDataObjectProperties = new UnsignedDataObjectProperties();
                this.unsignedDataObjectProperties.LoadXml(xmlNodeList.item(0));
            }
        }

		/**
		 * Returns the XML representation of the this object
         * @returns XML element containing the state of this object
		 */
        public GetXml(): Element {
            let document = this.CreateDocument();
            let element = this.CreateElement(document);

            if (this.id) {
                element.setAttribute(XmlXades.AttributeNames.Id, this.id);
            }

            if (this.unsignedSignatureProperties != null) {
                element.appendChild(document.importNode(this.unsignedSignatureProperties.GetXml(), true));
            }
            else {
                throw new XmlError(XE.CRYPTOGRAPHIC, "UnsignedSignatureProperties should not be null");
            }

            if (this.unsignedDataObjectProperties != null && this.unsignedDataObjectProperties.HasChanged()) {
                element.appendChild(document.importNode(this.unsignedDataObjectProperties.GetXml(), true));
            }

            return element;
        }
    }
}