namespace xadesjs.pro {

    /**
     * <xsd:complexType name="SignedSignaturePropertiesType">
     *     <xsd:sequence>
     *         <xsd:element name="SigningTime" type="xsd:dateTime" minOccurs="0"/>
     *         <xsd:element name="SigningCertificate" type="CertIDListType" minOccurs="0"/>
     *         <xsd:element name="SignaturePolicyIdentifier" type="SignaturePolicyIdentifierType" minOccurs="0"/>
     *         <xsd:element name="SignatureProductionPlace" type="SignatureProductionPlaceType" minOccurs="0"/>
     *         <xsd:element name="SignerRole" type="SignerRoleType" minOccurs="0"/>
     *     </xsd:sequence>
     *     <xsd:attribute name="Id" type="xsd:ID" use="optional"/>
     * </xsd:complexType>
     */

    /**
     * The properties that qualify the signature itself or the signer are
     * included as content of the SignedSignatureProperties element
     */
    export class SignedSignatureProperties extends XmlXadesObject {
        // Private variables
        private signingTime: Date;
        private signingCertificate: SigningCertificate;
        private signaturePolicyIdentifier: SignaturePolicyIdentifier;
        private signatureProductionPlace: SignatureProductionPlace;
        private signerRole: SignerRole;

        /**
         * Id attribute of the XAdES object
         */
        public Id: string;

        // Public properties
        /**
         * The signing time property specifies the time at which the signer
         * performed the signing process. This is a signed property that
         * qualifies the whole signature. An XML electronic signature aligned
         * with the present document MUST contain exactly one SigningTime element.
         */
        public get SigningTime(): Date {
            return this.signingTime;
        }
        public set SigningTime(value: Date) {
            this.signingTime = value;
        }

		/**
		 * The SigningCertificate property is designed to prevent the simple
		 * substitution of the certificate. This property contains references
		 * to certificates and digest values computed on them. The certificate
		 * used to verify the signature shall be identified in the sequence;
		 * the signature policy may mandate other certificates be present,
		 * that may include all the certificates up to the point of trust.
		 * This is a signed property that qualifies the signature. An XML
		 * electronic signature aligned with the present document MUST contain
		 * exactly one SigningCertificate.
		 */
        public get SigningCertificate(): SigningCertificate {
            return this.signingCertificate;
        }
        public set SigningCertificate(value: SigningCertificate) {
            this.signingCertificate = value;
        }


		/**
		 * The signature policy is a set of rules for the creation and
		 * validation of an electronic signature, under which the signature
		 * can be determined to be valid. A given legal/contractual context
		 * may recognize a particular signature policy as meeting its
		 * requirements.
		 * An XML electronic signature aligned with the present document MUST
		 * contain exactly one SignaturePolicyIdentifier element.
		 */
        public get SignaturePolicyIdentifier(): SignaturePolicyIdentifier {
            return this.signaturePolicyIdentifier;
        }
        public set SignaturePolicyIdentifier(value: SignaturePolicyIdentifier) {
            this.signaturePolicyIdentifier = value;
        }

		/**
		 * In some transactions the purported place where the signer was at the time
		 * of signature creation may need to be indicated. In order to provide this
		 * information a new property may be included in the signature.
		 * This property specifies an address associated with the signer at a
		 * particular geographical (e.g. city) location.
		 * This is a signed property that qualifies the signer.
		 * An XML electronic signature aligned with the present document MAY contain
		 * at most one SignatureProductionPlace element.
		 */
        public get SignatureProductionPlace(): SignatureProductionPlace {
            return this.signatureProductionPlace;
        }
        public set SignatureProductionPlace(value: SignatureProductionPlace) {
            this.signatureProductionPlace = value;
        }

		/**
		 * According to what has been stated in the Introduction clause, an
		 * electronic signature produced in accordance with the present document
		 * incorporates: "a commitment that has been explicitly endorsed under a
		 * signature policy, at a given time, by a signer under an identifier,
		 * e.g. a name or a pseudonym, and optionally a role".
		 * While the name of the signer is important, the position of the signer
		 * within a company or an organization can be even more important. Some
		 * contracts may only be valid if signed by a user in a particular role,
		 * e.g. a Sales Director. In many cases who the sales Director really is,
		 * is not that important but being sure that the signer is empowered by his
		 * company to be the Sales Director is fundamental.
		 */
        public get SignerRole(): SignerRole {
            return this.signerRole;
        }
        public set SignerRole(value: SignerRole) {
            this.signerRole = value;
        }

		/**
		 * Default constructor
		 */
        public constructor() {
            super();
            this.signingTime = null;
            this.signingCertificate = new SigningCertificate();
            this.signaturePolicyIdentifier = new SignaturePolicyIdentifier();
            this.signatureProductionPlace = new SignatureProductionPlace();
            this.signerRole = new SignerRole();
            this.Id = "";

            this.m_prefix = XmlXades.DefaultPrefix;
        }

        // Protected methods

        protected GetXmlObjectName() {
            return XmlXades.ElementNames.SignedSignatureProperties;
        }

        // Public methods
		/**
		 * Check to see if something has changed in this instance and needs to be serialized
         * @returns boolean Flag indicating if a member needs serialization
		 */
        public HasChanged(): boolean {
            // Should always be serialized
            return true;
        }

		/**
		 * Load state from an XML element
         * @param element XML element containing new state 
		 */
        public LoadXml(element: Element): void {
            super.LoadXml(element);

            this.Id = this.getAttribute(element, XmlXades.AttributeNames.Id, "", false);

            let xml = this.GetElement(element, XmlXades.ElementNames.SigningTime, false);
            if (xml) {
                this.signingTime = Convert.ToDateTime(xml.textContent);
            }

            xml = this.GetElement(element, XmlXades.ElementNames.SigningCertificate, false);
            if (xml) {
                this.signingCertificate = new SigningCertificate();
                this.signingCertificate.LoadXml(xml);
            }

            xml = this.GetElement(element, XmlXades.ElementNames.SignaturePolicyIdentifier, false);
            if (xml) {
                this.signaturePolicyIdentifier = new SignaturePolicyIdentifier();
                this.signaturePolicyIdentifier.LoadXml(xml);
            }

            xml = this.GetElement(element, XmlXades.ElementNames.SignatureProductionPlace, false);
            if (xml) {
                this.signatureProductionPlace = new SignatureProductionPlace();
                this.signatureProductionPlace.LoadXml(xml);
            }
            else {
                this.signatureProductionPlace = null;
            }

            xml = this.GetElement(element, XmlXades.ElementNames.SignerRole, false);
            if (xml) {
                this.signerRole = new SignerRole();
                this.signerRole.LoadXml(xml);
            }
            else {
                this.signerRole = null;
            }
        }

		/**
		 * Returns the XML representation of the this object
         * @returns XML element containing the state of this object
		 */
        public GetXml(): Element {
            let document = this.CreateDocument();
            let element = this.CreateElement(document);

            if (this.Id)
                element.setAttribute(XmlXades.AttributeNames.Id, this.Id);

            if (!this.signingTime) {
                // SigningTime should be available
                this.signingTime = new Date();
            }

            let prefix = this.GetPrefix();

            let xmlSigningTime = document.createElementNS(XmlXades.NamespaceURI, prefix + XmlXades.ElementNames.SigningTime);
            xmlSigningTime.textContent = Convert.FromDateTime(this.SigningTime);
            element.appendChild(xmlSigningTime);

            if (this.signingCertificate && this.signingCertificate.HasChanged()) {
                element.appendChild(document.importNode(this.signingCertificate.GetXml(), true));
            }

            if (this.signaturePolicyIdentifier && this.signaturePolicyIdentifier.HasChanged()) {
                element.appendChild(document.importNode(this.signaturePolicyIdentifier.GetXml(), true));
            }

            if (this.signatureProductionPlace != null && this.signatureProductionPlace.HasChanged()) {
                element.appendChild(document.importNode(this.signatureProductionPlace.GetXml(), true));
            }

            if (this.signerRole && this.signerRole.HasChanged()) {
                element.appendChild(document.importNode(this.signerRole.GetXml(), true));
            }

            return element;
        }

    }
}
