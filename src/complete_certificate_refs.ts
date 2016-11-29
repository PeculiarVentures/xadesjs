namespace xadesjs.pro {
    /**
     * This clause defines the XML element containing the sequence of
     * references to the full set of CA certificates that have been used
     * to validate the electronic signature up to (but not including) the
     * signer's certificate. This is an unsigned property that qualifies
     * the signature.
     * An XML electronic signature aligned with the XAdES standard may
     * contain at most one CompleteCertificateRefs element.
     */
    export class CompleteCertificateRefs extends XmlXadesObject {

        // Public properties
        /**
         * The optional Id attribute can be used to make a reference to the CompleteCertificateRefs element
         */
        public Id: string;

		/**
		 * The CertRefs element contains a sequence of Cert elements, incorporating the
		 * digest of each certificate and optionally the issuer and serial number identifier.
		 */
        public CertRefs: CertRefs;


        // Constructors
		/**
		 * Default constructor
		 */
        public constructor() {
            super();
            this.CertRefs = new CertRefs();
        }

        // Protected methods

        protected GetXmlObjectName() {
            return XmlXades.ElementNames.CompleteCertificateRefs;
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
            if (this.CertRefs && this.CertRefs.HasChanged()) {
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

            this.getAttribute(element, XmlXades.AttributeNames.Id, "", false);

            let xmlCertRefs = this.GetElement(element, XmlXades.ElementNames.CertRefs, false);
            if (xmlCertRefs) {
                this.CertRefs = new CertRefs();
                this.CertRefs.LoadXml(xmlCertRefs);
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

            if (this.CertRefs && this.CertRefs.HasChanged()) {
                element.appendChild(document.importNode(this.CertRefs.GetXml(), true));
            }

            return element;
        }

    }
}
