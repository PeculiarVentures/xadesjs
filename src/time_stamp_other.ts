namespace xadesjs.pro {
    /**
    * <xsd:element name="OtherTimeStamp" type="OtherTimeStampType"/>
    * <xsd:complexType name="OtherTimeStampType">
    *   <xsd:complexContent>
    *     <xsd:restriction base="GenericTimeStampType">
    *       <xsd:sequence>
    *         <xsd:element ref="ReferenceInfo" maxOccurs="unbounded"/>
    *         <xsd:element ref="ds:CanonicalizationMethod" minOccurs="0"/>
    *         <xsd:choice>
    *           <xsd:element name="EncapsulatedTimeStamp" type="EncapsulatedPKIDataType"/>
    *           <xsd:element name="XMLTimeStamp" type="AnyType"/>
    *         </xsd:choice>
    *       </xsd:sequence>
    *       <xsd:attribute name="Id" type="xsd:ID" use="optional"/>
    *     </xsd:restriction>
    *   </xsd:complexContent>
    * </xsd:complexType>
    */
    export class OtherTimeStamp extends TimeStampGeneric {

        // Public properties
        /**
         * Contains the digest of one external data object
         */
        public ReferenceInfos: Collection<ReferenceInfo>;

        // Constructor
        constructor(tagName: string) {
            super(tagName);

            // Default props
            this.ReferenceInfos = new Collection<ReferenceInfo>();
        }

        // Public methods

        /**
		 * Check to see if something has changed in this instance and needs to be serialized
         * @returns Flag indicating if a member needs serialization
		 */
        public HasChanged(): boolean {
            let retVal = super.HasChanged();

            if (retVal || this.Id || this.ReferenceInfos.Count > 0)
                return true;

            return retVal;
        }

        /**
		 * Load state from an XML element
         * @param {Element} element XML element containing new state
		 */
        public LoadXml(element: Element): void {
            super.LoadXml(element);

            this.ReferenceInfos.Clear();
            let xmlNodeList = element.childNodes;
            for (let i = 0; i < xmlNodeList.length; i++) {
                let node = xmlNodeList.item(i) as Element;
                if (node.nodeType !== XmlNodeType.Element)
                    continue;
                if (node.nodeName === XmlXades.ElementNames.ReferenceInfo) {
                    let ref = new ReferenceInfo();
                    ref.LoadXml(node);
                    this.ReferenceInfos.Add(ref);
                }
            }
            if (!this.ReferenceInfos.Count)
                throw new XmlError(XE.CRYPTOGRAPHIC, `${this.TagName} needs at least one ReferenceInfo element`);

        }

		/**
		 * Returns the XML representation of the this object
         * @returns XML element containing the state of this object
		 */
        public GetXml(): Element {
            let element = super.GetXml();

            if (!this.ReferenceInfos.Count) {
                throw new XmlError(XE.CRYPTOGRAPHIC, `Collection of ReferenceInfo is empty. ${this.TagName} needs at least one ReferenceInfo element`);
            }
            let firstElement = element.childNodes.item(0);
            for (let include of this.ReferenceInfos.GetIterator()) {
                element.insertBefore(include.GetXml(), firstElement);
            }

            return element;
        }

    }

}