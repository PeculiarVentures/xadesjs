namespace xadesjs.pro {

    /**
     * <xsd:element name="SignaturePolicyIdentifier" type="SignaturePolicyIdentifierType"/>
     * <xsd:complexType name="SignaturePolicyIdentifierType">
     *   <xsd:choice>
     *     <xsd:element name="SignaturePolicyId" type="SignaturePolicyIdType"/>
     *     <xsd:element name="SignaturePolicyImplied"/>
     *   </xsd:choice>
     * </xsd:complexType>
     */

    /**
     * This class contains an identifier of a signature policy
     */
    export class SignaturePolicyIdentifier extends XmlXadesObject {
        // Private variables
        private signaturePolicyId: SignaturePolicyId;
        private signaturePolicyImplied: boolean;


        // Public properties

        /**
         * The SignaturePolicyId element is an explicit and unambiguous identifier
         * of a Signature Policy together with a hash value of the signature
         * policy, so it can be verified that the policy selected by the signer is
         * the one being used by the verifier. An explicit signature policy has a
         * globally unique reference, which, in this way, is bound to an
         * electronic signature by the signer as part of the signature
         * calculation.
         */
        public get SignaturePolicyId(): SignaturePolicyId {
            return this.signaturePolicyId;
        }
        public set SignaturePolicyId(value: SignaturePolicyId) {
            this.signaturePolicyId = value;
            this.signaturePolicyImplied = false;
        }

		/**
		 * The empty SignaturePolicyImplied element will appear when the
		 * data object(s) being signed and other external data imply the
		 * signature policy
		 */
        public get SignaturePolicyImplied(): boolean {
            return this.signaturePolicyImplied;
        }
        public set SignaturePolicyImplied(value: boolean) {
            this.signaturePolicyImplied = value;
            if (this.signaturePolicyImplied === true) {
                this.signaturePolicyId = null;
            }
        }

        // Constructors
		/**
		 * Default constructor
		 */
        public constructor() {
            super();
            this.signaturePolicyId = new SignaturePolicyId();
            this.signaturePolicyImplied = false;
        }

        // Protected methods
        protected GetXmlObjectName() {
            return XmlXades.ElementNames.SignaturePolicyIdentifier;
        }


        // Public methods
		/**
		 * Check to see if something has changed in this instance and needs to be serialized
         * @returns Flag indicating if a member needs serialization
		 */
        public HasChanged(): boolean {
            let retVal = false;

            if (this.signaturePolicyId != null && this.signaturePolicyId.HasChanged()) {
                retVal = true;
            }

            if (this.signaturePolicyImplied) {
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

            let xml = this.GetElement(element, XmlXades.ElementNames.SignaturePolicyId, false);
            if (xml) {
                this.signaturePolicyId = new SignaturePolicyId();
                this.signaturePolicyId.LoadXml(xml);
                this.signaturePolicyImplied = false;
            }
            else {
                xml = this.GetElement(element, XmlXades.ElementNames.SignaturePolicyImplied, false);
                if (xml) {
                    this.signaturePolicyImplied = true;
                    this.signaturePolicyId = null;
                }
                else {
                    throw new XmlError(XE.CRYPTOGRAPHIC, "SignaturePolicyId or SignaturePolicyImplied missing");
                }
            }
        }

		/**
		 * Returns the XML representation of the this object
         * @returns XML element containing the state of this object
		 */
        public GetXml(): Element {
            let document = this.CreateDocument();
            let element = this.CreateElement(document);

            if (this.signaturePolicyImplied) { // Append empty element as required
                let xmlSignaturePolicyImplied = document.createElementNS(XmlXades.NamespaceURI, this.GetPrefix() + XmlXades.ElementNames.SignaturePolicyImplied);
                element.appendChild(xmlSignaturePolicyImplied);
            }
            else {
                if (this.signaturePolicyId != null && this.signaturePolicyId.HasChanged()) {
                    element.appendChild(document.importNode(this.signaturePolicyId.GetXml(), true));
                }
                else {
                    throw new XmlError(XE.CRYPTOGRAPHIC, "SignaturePolicyId or SignaturePolicyImplied missing in SignaturePolicyIdentifier");
                }
            }

            return element;
        }

    }
}
