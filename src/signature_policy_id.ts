namespace xadesjs.pro {

    /**
     * <xsd:complexType name="SignaturePolicyIdType">
     *   <xsd:sequence>
     *     <xsd:element name="SigPolicyId" type="ObjectIdentifierType"/>
     *     <xsd:element ref="ds:Transforms" minOccurs="0"/>
     *     <xsd:element name="SigPolicyHash" type="DigestAlgAndValueType"/>
     *     <xsd:element name="SigPolicyQualifiers" type="SigPolicyQualifiersListType" minOccurs="0"/>
     *   </xsd:sequence>
     * </xsd:complexType>
     */

	/**
	 * The SignaturePolicyId element is an explicit and unambiguous identifier
	 * of a Signature Policy together with a hash value of the signature
	 * policy, so it can be verified that the policy selected by the signer is
	 * the one being used by the verifier. An explicit signature policy has a
	 * globally unique reference, which, in this way, is bound to an
	 * electronic signature by the signer as part of the signature
	 * calculation.
	 */
    export class SignaturePolicyId extends XmlXadesObject {

        // Public properties
		/**
		 * The SigPolicyId element contains an identifier that uniquely
		 * identifies a specific version of the signature policy
		 */
        public SigPolicyId: ObjectIdentifier;

		/**
		 * The optional Transforms element can contain the transformations
		 * performed on the signature policy document before computing its
		 * hash
		 */
        public Transforms: Transforms;

		/**
		 * The SigPolicyHash element contains the identifier of the hash
		 * algorithm and the hash value of the signature policy
		 */
        public SigPolicyHash: DigestAlgAndValueType;

		/**
		 * The SigPolicyQualifier element can contain additional information
		 * qualifying the signature policy identifier
		 */
        public SigPolicyQualifiers: SigPolicyQualifiers;

        // Constructors
		/**
		 * Default constructor
		 */
        public constructor() {
            super();
            this.SigPolicyId = new ObjectIdentifier(XmlXades.ElementNames.SigPolicyId);
            this.Transforms = new Transforms();
            this.SigPolicyHash = new DigestAlgAndValueType(XmlXades.ElementNames.SigPolicyHash);
            this.SigPolicyQualifiers = new SigPolicyQualifiers();
        }

        protected GetXmlObjectName() {
            return XmlXades.ElementNames.SignaturePolicyId;
        }

        // Public methods
		/**
		 * Check to see if something has changed in this instance and needs to be serialized
         * @returns Flag indicating if a member needs serialization
		 */
        public HasChanged(): boolean {
            let retVal = false;

            if (this.SigPolicyId && this.SigPolicyId.HasChanged()) {
                retVal = true;
            }

            if (this.Transforms && this.Transforms.HasChanged()) {
                retVal = true;
            }

            if (this.SigPolicyHash && this.SigPolicyHash.HasChanged()) {
                retVal = true;
            }

            if (this.SigPolicyQualifiers && this.SigPolicyQualifiers.HasChanged()) {
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

            let xmlSigPolicyId = this.GetElement(element, XmlXades.ElementNames.SigPolicyId, true);
            this.SigPolicyId = new ObjectIdentifier(XmlXades.ElementNames.SigPolicyId);
            this.SigPolicyId.LoadXml(xmlSigPolicyId);

            let xmlTransforms = element.getElementsByTagNameNS(XmlSignature.NamespaceURI, XmlSignature.ElementNames.Transforms);
            if (xmlTransforms.length) {
                this.Transforms = new Transforms();
                this.Transforms.LoadXml(xmlTransforms.item(0));
            }

            let xmlSigPolicyHash = this.GetElement(element, XmlXades.ElementNames.SigPolicyHash, true);
            this.SigPolicyHash = new DigestAlgAndValueType(XmlXades.ElementNames.SigPolicyHash);
            this.SigPolicyHash.LoadXml(xmlSigPolicyHash);

            let xmlSigPolicyQualifiers = this.GetElement(element, XmlXades.ElementNames.SigPolicyQualifiers, false);
            if (xmlSigPolicyQualifiers) {
                this.SigPolicyQualifiers = new SigPolicyQualifiers();
                this.SigPolicyQualifiers.LoadXml(xmlSigPolicyQualifiers);
            }
        }

		/**
		 * Returns the XML representation of the this object
         * @returns XML element containing the state of this object
		 */
        public GetXml(): Element {
            let document = this.CreateDocument();
            let element = this.CreateElement(document);

            if (this.SigPolicyId && this.SigPolicyId.HasChanged()) {
                element.appendChild(document.importNode(this.SigPolicyId.GetXml(), true));
            }
            else {
                throw new XmlError(XE.CRYPTOGRAPHIC, "SigPolicyId element missing in SignaturePolicyId");
            }

            if (this.Transforms && this.Transforms.HasChanged()) {
                element.appendChild(document.importNode(this.Transforms.GetXml(), true));
            }

            if (this.SigPolicyHash && this.SigPolicyHash.HasChanged()) {
                element.appendChild(document.importNode(this.SigPolicyHash.GetXml(), true));
            }
            else {
                throw new XmlError(XE.CRYPTOGRAPHIC, "SigPolicyHash element missing in SignaturePolicyId");
            }

            if (this.SigPolicyQualifiers && this.SigPolicyQualifiers.HasChanged()) {
                element.appendChild(document.importNode(this.SigPolicyQualifiers.GetXml(), true));
            }

            return element;
        }

    }
}
