namespace xadesjs.pro {

    /**
     * <xsd:element name="SignatureProductionPlace" type="SignatureProductionPlaceType"/>
     * <xsd:complexType name="SignatureProductionPlaceType">
     *   <xsd:sequence>
     *     <xsd:element name="City" type="xsd:string" minOccurs="0"/>
     *     <xsd:element name="StateOrProvince" type="xsd:string" minOccurs="0"/>
     *     <xsd:element name="PostalCode" type="xsd:string" minOccurs="0"/>
     *     <xsd:element name="CountryName" type="xsd:string" minOccurs="0"/>
     *   </xsd:sequence>
     * </xsd:complexType>             
     */

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
    export class SignatureProductionPlace extends XmlXadesObject {

        // Public properties
        /**
         * City where signature was produced
         */
        public City: string;

		/**
		 * State or province where signature was produced
		 */
        public StateOrProvince: string;

		/**
		 * Postal code of place where signature was produced
		 */
        public PostalCode: string;

		/**
		 * Country where signature was produced
		 */
        public CountryName: string;

        // Protected methods
        protected GetXmlObjectName() {
            return XmlXades.ElementNames.SignatureProductionPlace;
        }

        // Public methods
		/**
		 * Check to see if something has changed in this instance and needs to be serialized
         * @returns Flag indicating if a member needs serialization
		 */
        public HasChanged(): boolean {
            let retVal = false;

            if (this.City) {
                retVal = true;
            }

            if (this.StateOrProvince) {
                retVal = true;
            }

            if (this.PostalCode) {
                retVal = true;
            }

            if (this.CountryName) {
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

            let xml = this.GetElement(element, XmlXades.ElementNames.City, false);
            if (xml) {
                this.City = xml.textContent;
            }

            xml = this.GetElement(element, XmlXades.ElementNames.PostalCode, false);
            if (xml) {
                this.PostalCode = xml.textContent;
            }

            xml = this.GetElement(element, XmlXades.ElementNames.StateOrProvince, false);
            if (xml) {
                this.StateOrProvince = xml.textContent;
            }

            xml = this.GetElement(element, XmlXades.ElementNames.CountryName, false);
            if (xml) {
                this.CountryName = xml.textContent;
            }

        }

		/**
		 * Returns the XML representation of the this object
         * @returns XML element containing the state of this object
		 */
        public GetXml(): Element {
            let document = this.CreateDocument();
            let element = this.CreateElement(document);

            if (this.City) {
                let xml = document.createElementNS(XmlXades.NamespaceURI, this.GetPrefix() + XmlXades.ElementNames.City);
                xml.textContent = this.City;
                element.appendChild(xml);
            }

            if (this.StateOrProvince) {
                let xml = document.createElementNS(XmlXades.NamespaceURI, this.GetPrefix() + XmlXades.ElementNames.StateOrProvince);
                xml.textContent = this.StateOrProvince;
                element.appendChild(xml);
            }

            if (this.PostalCode) {
                let xml = document.createElementNS(XmlXades.NamespaceURI, this.GetPrefix() + XmlXades.ElementNames.PostalCode);
                xml.textContent = this.PostalCode;
                element.appendChild(xml);
            }

            if (this.CountryName) {
                let xml = document.createElementNS(XmlXades.NamespaceURI, this.GetPrefix() + XmlXades.ElementNames.CountryName);
                xml.textContent = this.CountryName;
                element.appendChild(xml);
            }

            return element;
        }
    }
}
