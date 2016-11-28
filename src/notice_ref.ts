namespace xadesjs.pro {

    /**
     * <xsd:complexType name="IntegerListType">
     *   <xsd:sequence>
     *     <xsd:element name="int" type="xsd:integer" minOccurs="0" maxOccurs="unbounded"/>
     *   </xsd:sequence>
     * </xsd:complexType>
     */

    export class NoticeNumbers extends Collection<number> { }

    /**
     * <xsd:complexType name="NoticeReferenceType">
     *   <xsd:sequence>
     *     <xsd:element name="Organization" type="xsd:string"/>
     *     <xsd:element name="NoticeNumbers" type="IntegerListType"/>
     *   </xsd:sequence>
     * </xsd:complexType>
     */

	/**
	 * The NoticeRef element names an organization and identifies by
	 * numbers a group of textual statements prepared by that organization,
	 * so that the application could get the explicit notices from a notices file.
	 */
    export class NoticeRef extends XmlXadesObject {
        // Public properties
		/**
		 * Organization issuing the signature policy
		 */
        public Organization: string;

		/**
		 * Numerical identification of textual statements prepared by the organization,
		 * so that the application can get the explicit notices from a notices file.
		 */
        public NoticeNumbers: NoticeNumbers;

        // Constructors
		/**
		 * Default constructor
		 */
        public constructor() {
            super();
            this.NoticeNumbers = new NoticeNumbers();
        }

        // Protected methods

        protected GetXmlObjectName() {
            return XmlXades.ElementNames.NoticeRef;
        }

        // Public methods
		/**
		 * Check to see if something has changed in this instance and needs to be serialized
         * <returns>Flag indicating if a member needs serialization< /returns>
		 */
        public HasChanged(): boolean {
            let retVal = false;

            if (this.Organization) {
                retVal = true;
            }

            if (this.NoticeNumbers && this.NoticeNumbers.Count) {
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

            this.Organization = this.GetElement(element, XmlXades.ElementNames.Organization, true).textContent;
            let xmlNoticeNumber = this.GetElement(element, XmlXades.ElementNames.NoticeNumbers, true);
            this.NoticeNumbers = new NoticeNumbers();
            let xmlNodeList = findChilds(xmlNoticeNumber, XmlXades.ElementNames.Int, XmlXades.NamespaceURI);
            for (let item of xmlNodeList) {
                this.NoticeNumbers.Add(+item.textContent);
            }
        }

		/**
		 * Returns the XML representation of the this object
         * @returns XML element containing the state of this object
		 */
        public GetXml(): Element {
            let document = this.CreateDocument();
            let element = this.CreateElement(document);

            if (this.Organization == null) {
                throw new XmlError(XE.CRYPTOGRAPHIC, "Organization can't be null");
            }
            let xmlOragnization = document.createElementNS(XmlXades.NamespaceURI, this.GetPrefix() + XmlXades.ElementNames.Organization);
            xmlOragnization.textContent = this.Organization;
            element.appendChild(xmlOragnization);

            if (this.NoticeNumbers == null) {
                throw new XmlError(XE.CRYPTOGRAPHIC, "NoticeNumbers can't be null");
            }
            let xmlNoticeNumbers = document.createElementNS(XmlXades.NamespaceURI, this.GetPrefix() + XmlXades.ElementNames.NoticeNumbers);
            for (let num of this.NoticeNumbers.GetIterator()) {
                let xmlInt = document.createElementNS(XmlXades.NamespaceURI, this.GetPrefix() + XmlXades.ElementNames.Int);
                xmlInt.textContent = num.toString();
                xmlNoticeNumbers.appendChild(xmlInt);
            }
            element.appendChild(xmlNoticeNumbers);

            return element;
        }

    }
}