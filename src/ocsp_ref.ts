namespace xadesjs.pro {

    /**
     * This class contains a collection of OCSPRefs
     */
    export class OCSPRefs extends XmlXadesCollection<OCSPRef> {
        // Protetced methods
        protected GetXmlObjectName() {
            return XmlXades.ElementNames.OCSPRefs;
        }

        protected OnLoadChildElement(element: Element): any {
            if (element.namespaceURI === XmlXades.NamespaceURI && element.localName === XmlXades.ElementNames.OCSPRef) {
                let obj = new OCSPRef();
                obj.LoadXml(element);
                return obj;
            }
        }
    }

	/**
	 * This class identifies one OCSP response
	 */
    export class OCSPRef extends XmlXadesObject {
        //  Public properties
		/**
		 * Identification of one OCSP response
		 */
        public OCSPIdentifier: OCSPIdentifier;

		/**
		 * The digest computed on the DER encoded OCSP response, since it may be
		 * needed to differentiate between two OCSP responses by the same server
		 * with their "ProducedAt" fields within the same second.
		 */
        public CertDigest: DigestAlgAndValueType;

        //  Constructors
		/**
		 * Default constructor
		 */
        public constructor() {
            super();
            this.OCSPIdentifier = new OCSPIdentifier();
            this.CertDigest = new DigestAlgAndValueType(XmlXades.ElementNames.DigestAlgAndValue);
        }

        // Protected methods

        protected GetXmlObjectName() {
            return XmlXades.ElementNames.OCSPRef;
        }


        //  Public methods
		/**
		 * Check to see if something has changed in this instance and needs to be serialized
         * @returns Flag indicating if a member needs serialization
		 */
        public HasChanged(): boolean {
            let retVal = false;

            if (this.OCSPIdentifier && this.OCSPIdentifier.HasChanged()) {
                retVal = true;
            }

            if (this.CertDigest && this.CertDigest.HasChanged()) {
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

            let xmlOCSPIdentifier = this.GetElement(element, XmlXades.ElementNames.OCSPIdentifier, true);
            this.OCSPIdentifier = new OCSPIdentifier();
            this.OCSPIdentifier.LoadXml(xmlOCSPIdentifier);

            let xmlDigestAlgAndValue = this.GetElement(element, XmlXades.ElementNames.DigestAlgAndValue, false);
            if (!xmlDigestAlgAndValue) {
                this.CertDigest = null;
            }
            else {
                this.CertDigest = new DigestAlgAndValueType(XmlXades.ElementNames.DigestAlgAndValue);
                this.CertDigest.LoadXml(xmlDigestAlgAndValue);
            }
        }

		/**
		 * Returns the XML representation of the this object
         * @returns XML element containing the state of this object
		 */
        public GetXml(): Element {
            let document = this.CreateDocument();
            let element = this.CreateElement(document);

            if (this.OCSPIdentifier && this.OCSPIdentifier.HasChanged()) {
                element.appendChild(document.importNode(this.OCSPIdentifier.GetXml(), true));
            }
            else {
                throw new XmlError(XE.CRYPTOGRAPHIC, "OCSPIdentifier element missing in OCSPRef");
            }

            if (this.CertDigest && this.CertDigest.HasChanged()) {
                element.appendChild(document.importNode(this.CertDigest.GetXml(), true));
            }

            return element;
        }

    }
}
