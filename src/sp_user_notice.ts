namespace xadesjs.pro {

    /**
     * <xsd:complexType name="SPUserNoticeType">
     *   <xsd:sequence>
     *     <xsd:element name="NoticeRef" type="NoticeReferenceType" minOccurs="0"/>
     *     <xsd:element name="ExplicitText" type="xsd:string" minOccurs="0"/>
     *   </xsd:sequence>
     * </xsd:complexType>
     */

    /**
     * SPUserNotice element is intended for being displayed whenever the
     * signature is validated.  The class derives from SigPolicyQualifier.
     */
    export class SPUserNotice extends SigPolicyQualifier {

        // Public properties
		/**
		 * The NoticeRef element names an organization and identifies by
		 * numbers a group of textual statements prepared by that organization,
		 * so that the application could get the explicit notices from a notices file.
		 */
        public NoticeRef: NoticeRef;

		/**
		 * The	ExplicitText element contains the text of the notice to be displayed
		 */
        public ExplicitText: string;

        // Constructors
		/**
		 * Default constructor
		 */
        public constructor() {
            super();

            this.NoticeRef = new NoticeRef();
        }


        // Public methods
		/**
		 * Check to see if something has changed in this instance and needs to be serialized
         * @returns Flag indicating if a member needs serialization< /returns>
		 */
        public HasChanged(): boolean {
            let retVal = false;

            if (this.ExplicitText) {
                retVal = true;
            }

            if (this.NoticeRef && this.NoticeRef.HasChanged()) {
                retVal = true;
            }

            return retVal;
        }

		/**
		 * Load state from an XML element
         * @param {Element} element XML element containing new state < /param>
		 */
        public LoadXml(element: Element): void {
            super.LoadXml(element);

            let xmlSPUserNotice = this.GetElement(element, XmlXades.ElementNames.SPUserNotice, true);

            let xmlNoticeRef = this.GetElement(xmlSPUserNotice, XmlXades.ElementNames.NoticeRef, false);
            if (xmlNoticeRef) {
                this.NoticeRef = new NoticeRef();
                this.NoticeRef.LoadXml(xmlNoticeRef);
            }

            let xmlExplicitText = this.GetElement(xmlSPUserNotice, XmlXades.ElementNames.ExplicitText, false);
            if (xmlExplicitText) {
                this.ExplicitText = xmlExplicitText.textContent;
            }

            if (!(xmlNoticeRef || xmlExplicitText))
                throw new XmlError(XE.CRYPTOGRAPHIC, "Missing NoticeRef or ExplicitText element");
        }

		/**
		 * Returns the XML representation of the this object
         * @returns XML element containing the state of this object
		 */
        public GetXml(): Element {
            let document = this.CreateDocument();
            let element = this.CreateElement(document);


            let bufferXmlElement = document.createElementNS(XmlXades.NamespaceURI, this.GetPrefix() + XmlXades.ElementNames.SPUserNotice);
            if (this.NoticeRef && this.NoticeRef.HasChanged()) {
                bufferXmlElement.appendChild(document.importNode(this.NoticeRef.GetXml(), true));
            }
            if (this.ExplicitText) {
                let bufferXmlElement2 = document.createElementNS(XmlXades.NamespaceURI, this.GetPrefix() + XmlXades.ElementNames.ExplicitText);
                bufferXmlElement2.textContent = this.ExplicitText;
                bufferXmlElement.appendChild(bufferXmlElement2);
            }

            element.appendChild(document.importNode(bufferXmlElement, true));

            return element;
        }

    }
}
