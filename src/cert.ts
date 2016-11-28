namespace xadesjs.pro {

    /**
     * <xsd:complexType name="CertIDType">
     *     <xsd:sequence>
     *         <xsd:element name="CertDigest" type="DigestAlgAndValueType"/>
     *         <xsd:element name="IssuerSerial" type="ds:X509IssuerSerialType"/>
     *     </xsd:sequence>
     * </xsd:complexType>
     */

    /**
     * This class contains certificate identification information
     */
    export class Cert extends XmlXadesObject {
        // Private variables
        private certDigest: DigestAlgAndValueType;
        private issuerSerial: IssuerSerial;


        // Public properties

        /**
         * The element CertDigest contains the digest of one of the
         * certificates referenced in the sequence
         */
        public get CertDigest(): DigestAlgAndValueType {
            return this.certDigest;
        }
        public set CertDigest(value: DigestAlgAndValueType) {
            this.certDigest = value;
        }


		/**
		 * The element IssuerSerial contains the identifier of one of the
		 * certificates referenced in the sequence. Should the
		 * X509IssuerSerial element appear in the signature to denote the same
		 * certificate, its value MUST be consistent with the corresponding
		 * IssuerSerial element.
		 */
        public get IssuerSerial(): IssuerSerial {
            return this.issuerSerial;
        }
        public set IssuerSerial(value: IssuerSerial) {
            this.issuerSerial = value;
        }

		/**
		 * Default constructor
		 */
        public constructor() {
            super();
            this.certDigest = new DigestAlgAndValueType("CertDigest");
            this.issuerSerial = new IssuerSerial();
        }

        // Protected methods
        protected GetXmlObjectName() {
            return XmlXades.ElementNames.Cert;
        }

        // Public methods

        /**
		 * Check to see if something has changed in this instance and needs to be serialized
         * @returns Flag indicating if a member needs serialization
		 */
        public HasChanged(): boolean {
            let retVal = false;

            if (this.certDigest != null && this.certDigest.HasChanged()) {
                retVal = true;
            }

            if (this.issuerSerial != null && this.issuerSerial.HasChanged()) {
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

            this.certDigest = new DigestAlgAndValueType(XmlXades.ElementNames.CertDigest);
            this.certDigest.LoadXml(this.GetElement(element, XmlXades.ElementNames.CertDigest));

            this.issuerSerial = new IssuerSerial();
            this.issuerSerial.LoadXml(this.GetElement(element, XmlXades.ElementNames.IssuerSerial));
        }

		/**
		 * Returns the XML representation of the this object
        * @returns XML element containing the state of this object
		 */
        public GetXml(): Element {
            let document = this.CreateDocument();
            let element = this.CreateElement(document);

            if (this.certDigest != null && this.certDigest.HasChanged()) {
                element.appendChild(document.importNode(this.certDigest.GetXml(), true));
            }
            else {
                throw new XmlError(XE.CRYPTOGRAPHIC, "CertDigest element missing in Cert");
            }

            if (this.issuerSerial != null && this.issuerSerial.HasChanged()) {
                element.appendChild(document.importNode(this.issuerSerial.GetXml(), true));
            }
            else {
                throw new XmlError(XE.CRYPTOGRAPHIC, "IssuerSerial element missing in Cert");
            }

            return element;
        }

    }
}