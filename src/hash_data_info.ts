namespace xadesjs.pro {

    export class HashDataInfoCollection extends Collection<HashDataInfo> { }

    /**
     * <xsd:complexType name="HashDataInfoType">
     *   <xsd:sequence>
     *     <xsd:element name="Transforms" type="ds:TransformsType" minOccurs="0"/>
     *   </xsd:sequence>
     *   <xsd:attribute name="uri" type="xsd:anyURI" use="required"/>
     * </xsd:complexType>
     */

	/**
	 * The HashDataInfo class contains a uri attribute referencing a data object
	 * and a ds:Transforms element indicating the transformations to make to this
	 * data object.
	 * The sequence of HashDataInfo elements will be used to produce the input of
	 * the hash computation process whose result will be included in the
	 * timestamp request to be sent to the TSA.
	 */
    export class HashDataInfo extends XmlXadesObject {

        //  Public properties
		/**
		 * Uri referencing a data object
		 */
        public Uri: string;

		/**
		 * Transformations to make to this data object
		 */
        public Transforms: Transforms;

        //  Constructors
		/**
		 * Default constructor
		 */
        public constructor() {
            super();
            this.Transforms = new Transforms();
        }

        protected GetXmlObjectName(): string {
            return XmlXades.ElementNames.HashDataInfo;
        }


        //  Public methods
		/**
		 * Check to see if something has changed in this instance and needs to be serialized
         * @returns Flag indicating if a member needs serialization
		 */
        public HasChanged(): boolean {
            let retVal = false;

            if (this.Uri) {
                retVal = true;
            }

            if (this.Transforms != null && this.Transforms.HasChanged()) {
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

            this.Uri = this.getAttribute(element, XmlXades.AttributeNames.Uri, "", true);

            let xmlNodeList = findChilds(element, XmlSignature.ElementNames.Transforms, XmlSignature.NamespaceURI);
            for (let transform of xmlNodeList) {
                this.Transforms = new Transforms();
                this.Transforms.LoadXml(transform as Element);
            }
        }

		/**
		 * Returns the XML representation of the this object
         * @returns XML element containing the state of this object
		 */
        public GetXml(): Element {
            let document = this.CreateDocument();
            let element = this.CreateElement(document);

            if (this.Uri)
                element.setAttribute("uri", this.Uri);
            else
                throw new XmlError(XE.CRYPTOGRAPHIC, "Uri is required");

            if (this.Transforms && this.Transforms.HasChanged()) {
                element.appendChild(document.importNode(this.Transforms.GetXml(), true));
            }

            return element;
        }

    }
}
