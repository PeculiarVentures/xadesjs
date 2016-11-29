namespace xadesjs.pro {
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
    export class SignerRole extends XmlXadesObject {

        // Public properties
		/**
		 * The ClaimedRoles element contains a sequence of roles claimed by
		 * the signer but not certified. Additional contents types may be
		 * defined on a domain application basis and be part of this element.
		 * The namespaces given to the corresponding XML schemas will allow
		 * their unambiguous identification in the case these roles use XML.
		 */
        public ClaimedRoles: ClaimedRoles;

		/**
		 * The CertifiedRoles element contains one or more wrapped attribute
		 * certificates for the signer
		 */
        public CertifiedRoles: CertifiedRoles;

        // Constructors
		/**
		 * Default constructor
		 */
        public constructor() {
            super();
            this.ClaimedRoles = new ClaimedRoles();
            this.CertifiedRoles = new CertifiedRoles();
        }

        protected GetXmlObjectName() {
            return XmlXades.ElementNames.SignerRole;
        }


        // Public methods
		/**
		 * Check to see if something has changed in this instance and needs to be serialized
         * @returns Flag indicating if a member needs serialization
		 */
        public HasChanged(): boolean {
            let retVal = false;

            if (this.ClaimedRoles && this.ClaimedRoles.HasChanged()) {
                retVal = true;
            }

            if (this.CertifiedRoles && this.CertifiedRoles.HasChanged()) {
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

            let xmlClaimedRoles = this.GetElement(element, XmlXades.ElementNames.ClaimedRoles, false);
            if (xmlClaimedRoles) {
                this.ClaimedRoles = new ClaimedRoles();
                this.ClaimedRoles.LoadXml(xmlClaimedRoles);
            }

            let xmlCertifiedRoles = this.GetElement(element, XmlXades.ElementNames.CertifiedRoles, false);
            if (xmlCertifiedRoles) {
                this.CertifiedRoles = new CertifiedRoles();
                this.CertifiedRoles.LoadXml(xmlCertifiedRoles);
            }
        }

		/**
		 * Returns the XML representation of the this object
         * @returns XML element containing the state of this object
		 */
        public GetXml(): Element {
            let document = this.CreateDocument();
            let element = this.CreateElement(document);

            if (this.ClaimedRoles && this.ClaimedRoles.HasChanged()) {
                element.appendChild(document.importNode(this.ClaimedRoles.GetXml(), true));
            }

            if (this.CertifiedRoles && this.CertifiedRoles.HasChanged()) {
                element.appendChild(document.importNode(this.CertifiedRoles.GetXml(), true));
            }

            return element;
        }

    }
}
