namespace xadesjs.pro {

    /**
     * <xsd:complexType name="IdentifierType">
     *   <xsd:complexContent>
     *     <xsd:extension base="xsd:anyURI">
     *       <xsd:attribute name="Qualifier" type="QualifierType" use="optional"/>
     *     </xsd:extension>
     *   </xsd:complexContent>
     * </xsd:complexType>
     */

    /**
     * Possible values for Qualifier
     */
    export enum KnownQualifier {
        /**
         * Value has not been set
         */
        Uninitalized,
        /**
         * OID encoded as Uniform Resource Identifier (URI).
         */
        OIDAsURI,
        /**
         * OID encoded as Uniform Resource Name (URN)
         */
        OIDAsURN
    }

    /**
     * The Identifier element contains a permanent identifier. Once assigned the
     * identifier can never be re-assigned	again. It supports both the mechanism
     * that is used to identify objects in ASN.1 and the mechanism that is
     * usually used to identify objects in an XML environment.
     */
    export class Identifier extends XmlXadesObject {

        // Public properties

        /**
         * The optional Qualifier attribute can be used to provide a hint about the
         * applied encoding (values OIDAsURN or OIDAsURI)
         */
        public Qualifier: KnownQualifier;


		/**
		 * Identification of the XML environment object
		 */
        public Uri: string;

        public constructor() {
            super();
            this.Qualifier = KnownQualifier.Uninitalized;
        }

        // Protecetd methods

        protected GetXmlObjectName() {
            return XmlXades.ElementNames.Identifier;
        }

        // Public methods

		/**
		 * Check to see if something has changed in this instance and needs to be serialized
         * @returns Flag indicating if a member needs serialization
		 */
        public HasChanged(): boolean {
            let retVal = false;

            if (this.Qualifier !== KnownQualifier.Uninitalized) {
                retVal = true;
            }

            if (this.Uri) {
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

            if (element.hasAttribute(XmlXades.AttributeNames.Qualifier)) {
                this.Qualifier = (KnownQualifier as any)[element.getAttribute(XmlXades.AttributeNames.Qualifier)];
            }
            else {
                this.Qualifier = KnownQualifier.Uninitalized;
            }

            this.Uri = element.textContent;
        }

		/**
		 * Returns the XML representation of the this object
         * @returns XML element containing the state of this object
		 */
        public GetXml(): Element {
            let document = this.CreateDocument();
            let element = this.CreateElement(document);

            if (this.Qualifier !== KnownQualifier.Uninitalized) {
                element.setAttribute(XmlXades.AttributeNames.Qualifier, KnownQualifier[this.Qualifier]);
            }

            element.textContent = this.Uri;

            return element;
        }

    }
}
