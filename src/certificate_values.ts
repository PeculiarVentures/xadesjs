namespace xadesjs.pro {
	/**
	 * The CertificateValues element contains the full set of certificates
	 * that have been used to validate	the electronic signature, including the
	 * signer's certificate. However, it is not necessary to include one of
	 * those certificates into this property, if the certificate is already
	 * present in the ds:KeyInfo element of the signature.
	 * In fact, both the signer certificate (referenced in the mandatory
	 * SigningCertificate property element) and all certificates referenced in
	 * the CompleteCertificateRefs property element must be present either in
	 * the ds:KeyInfo element of the signature or in the CertificateValues
	 * property element.
	 */
    export class CertificateValues extends XmlXadesObject {

        // Public properties

		/**
		 * Optional Id of the certificate values element
		 */
        public Id: string;

		/**
		 * A collection of encapsulated X509 certificates
		 */
        public EncapsulatedX509CertificateCollection: EncapsulatedX509CertificateCollection;

		/**
		 * Collection of other certificates
		 */
        public OtherCertificateCollection: OtherCertificateCollection;

        // Constructors
		/**
		 * Default constructor
		 */
        public constructor() {
            super();
            this.EncapsulatedX509CertificateCollection = new EncapsulatedX509CertificateCollection();
            this.OtherCertificateCollection = new OtherCertificateCollection();
        }

        // Protected methods

        protected GetXmlObjectName() {
            return XmlXades.ElementNames.CertificateValues;
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
            if (this.EncapsulatedX509CertificateCollection.Count > 0) {
                retVal = true;
            }
            if (this.OtherCertificateCollection.Count > 0) {
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

            this.EncapsulatedX509CertificateCollection.Clear();
            this.OtherCertificateCollection.Clear();

            let xmlNodeList = findChilds(element, XmlXades.ElementNames.EncapsulatedX509Certificate, XmlXades.NamespaceURI);
            for (let xmlNode of xmlNodeList) {
                let obj = new EncapsulatedX509Certificate();
                obj.LoadXml(xmlNode as Element);
                this.EncapsulatedX509CertificateCollection.Add(obj);
            }

            xmlNodeList = findChilds(element, XmlXades.ElementNames.OtherCertificate, XmlXades.NamespaceURI);
            for (let xmlNode of xmlNodeList) {
                let newOtherCertificate = new OtherCertificate();
                newOtherCertificate.LoadXml(xmlNode as Element);
                this.OtherCertificateCollection.Add(newOtherCertificate);
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

            if (this.EncapsulatedX509CertificateCollection.Count > 0) {
                for (let encapsulatedX509Certificate of this.EncapsulatedX509CertificateCollection.GetIterator()) {
                    if (encapsulatedX509Certificate.HasChanged()) {
                        element.appendChild(document.importNode(encapsulatedX509Certificate.GetXml(), true));
                    }
                }
            }
            if (this.OtherCertificateCollection.Count > 0) {
                for (let otherCertificate of this.OtherCertificateCollection.GetIterator()) {
                    if (otherCertificate.HasChanged()) {
                        element.appendChild(document.importNode(otherCertificate.GetXml(), true));
                    }
                }
            }

            return element;
        }

    }
}
