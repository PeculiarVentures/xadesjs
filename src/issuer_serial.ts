namespace xadesjs.pro {
	/**
	 * The element IssuerSerial contains the identifier of one of the
	 * certificates referenced in the sequence
	 */
    export class IssuerSerial extends XmlXadesObject {
        // Public properties

        /**
		 * Name of the X509 certificate issuer
		 */
        public X509IssuerName: string;

		/**
		 * Serial number of the X509 certificate
		 */
        public X509SerialNumber: string;

		/**
		 * Default constructor
		 */
        public constructor() {
            super();
        }

        // Protected methods
        protected GetXmlObjectName() {
            return XmlXades.ElementNames.IssuerSerial;
        }

        // Public methods

        /**
		 * Check to see if something has changed in this instance and needs to be serialized
         * @returns Flag indicating if a member needs serialization
		 */
        public HasChanged(): boolean {
            let retVal = false;

            if (this.X509IssuerName) {
                retVal = true;
            }

            if (this.X509SerialNumber) {
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

            let xmlNodeList = element.getElementsByTagNameNS(XmlSignature.NamespaceURI, XmlSignature.ElementNames.X509IssuerName);
            if (xmlNodeList.length === 0) {
                throw new XmlError(XE.CRYPTOGRAPHIC, "X509IssuerName missing");
            }
            this.X509IssuerName = xmlNodeList.item(0).textContent;

            xmlNodeList = element.getElementsByTagNameNS(XmlSignature.NamespaceURI, XmlSignature.ElementNames.X509SerialNumber);
            if (xmlNodeList.length === 0) {
                throw new XmlError(XE.CRYPTOGRAPHIC, "X509SerialNumber missing");
            }
            this.X509SerialNumber = xmlNodeList.item(0).textContent;
        }

		/**
		 * Returns the XML representation of the this object
         * @returns XML element containing the state of this object
		 */
        public GetXml(): Element {
            let document = this.CreateDocument();
            let element = this.CreateElement(document);

            const sigPrefix = "ds:";

            let xmlX509IssuerName = document.createElementNS(XmlSignature.NamespaceURI, sigPrefix + XmlSignature.ElementNames.X509IssuerName);
            xmlX509IssuerName.textContent = this.X509IssuerName;
            element.appendChild(xmlX509IssuerName);

            let xmlX509SerialNumber = document.createElementNS(XmlSignature.NamespaceURI, sigPrefix + XmlSignature.ElementNames.X509SerialNumber);
            xmlX509SerialNumber.textContent = this.X509SerialNumber;
            element.appendChild(xmlX509SerialNumber);

            return element;
        }

    }
}