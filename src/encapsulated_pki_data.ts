namespace xadesjs.pro {

    /**
     * <xsd:element name="EncapsulatedPKIData" type="EncapsulatedPKIDataType"/>
     * <xsd:complexType name="EncapsulatedPKIDataType">
     *   <xsd:complexContent>
     *     <xsd:extension base="xsd:base64Binary">
     *       <xsd:attribute name="Id" type="xsd:ID" use="optional"/>
     *     </xsd:extension>
     *   </xsd:complexContent>
     * </xsd:complexType>
     */

	/**
	 * EncapsulatedPKIData is used to incorporate a piece of PKI data
	 * into an XML structure whereas the PKI data is encoded using an ASN.1
	 * encoding mechanism. Examples of such PKI data that are widely used at
	 * the time include X509 certificates and revocation lists, OCSP responses,
	 * attribute certificates and time-stamps.
	 */
    export class EncapsulatedPKIData extends XmlXadesTaggedObject {

		/**
		 * The optional ID attribute can be used to make a reference to an element
		 * of this data type.
		 */
        public Id: string;

		/**
		 * Base64 encoded content of this data type 
		 */
        public PkiData: Uint8Array;

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

            if (this.PkiData && this.PkiData.length > 0) {
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
            this.PkiData = Convert.ToBufferString(Convert.FromBase64String(element.textContent));
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

            if (this.PkiData && this.PkiData.length > 0) {
                element.textContent = Convert.ToBase64String(Convert.FromBufferString(this.PkiData));
            }

            return element;
        }

        /**
		 * Returns the PKI representation of the encapsulated PKI data object
         * @returns PKI object
		 */
        public GetPki(): pki.ASN1Object {
            throw new XmlError(XE.METHOD_NOT_IMPLEMENTED);
        }

        /**
		 * Load PkiData from an PKI object
         * @param {ASN1Object} pki PKI object
		 */
        public LoadPki(pki: pki.ASN1Object): void {
            this.PkiData = pki.Encode();
        }

    }
}
