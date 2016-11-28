namespace xadesjs.pro {

    export abstract class XmlXadesObject extends XmlObject {

        protected element: Element = null;

        protected GetXmlObjectName(): string {
            throw new XmlError(XE.METHOD_NOT_IMPLEMENTED);
        }

        protected GetPrefix(): string {
            return XmlXades.DefaultPrefix + ":";
        }

        /**
         * Returns Element by tag name by XADES namespace uri.
         * If element is required and not founded, throws exception
         * @param  {Element} element
         * @param  {string} name
         * @param  {boolean=true} required
         */
        protected GetElement(element: Element, name: string, required: boolean = true) {
            let xmlNodeList = element.getElementsByTagNameNS(XmlXades.NamespaceURI, name);
            if (required && xmlNodeList.length === 0) {
                throw new XmlError(XE.CRYPTOGRAPHIC, `${name} missing`);
            }
            return xmlNodeList[0] || null;
        }

        protected CreateElement(document: Document) {
            return document.createElementNS(XmlXades.NamespaceURI, this.GetPrefix() + this.GetXmlObjectName());
        }

        protected getAttribute(element: Element, attrName: string, defaultValue: string = null, required: boolean = true) {
            if (element.hasAttribute(attrName)) {
                return element.getAttribute(attrName);
            }
            else {
                if (required)
                    throw new XmlError(XE.CRYPTOGRAPHIC, `${attrName} attribute missing`);
                return defaultValue;
            }
        }

        // Public methods

        /**
         * Check to see if something has changed in this instance and needs to be serialized
         * @returns boolean Flag indicating if a member needs serialization
         */
        public HasChanged(): boolean {
            return false;
        }

        /**
		 * Load state from an XML element
         * @param element XML element containing new state
		 */
        LoadXml(element: Element) {
            if (element == null) {
                throw new XmlError(XE.PARAM_REQUIRED, "element");
            }

            if (!((element.localName === this.GetXmlObjectName()) && (element.namespaceURI === XmlXades.NamespaceURI)))
                throw new XmlError(XE.ELEMENT_MALFORMED, this.GetXmlObjectName());

            this.element = element;
        }

        protected CreateDocument(): Document {
            return CreateDocument(
                this.GetXmlObjectName(),
                XmlXades.NamespaceURI,
                XmlXades.DefaultPrefix);
        }

    }

	/**
	 * This class represents the unique object of a XAdES signature that
	 * contains all XAdES information
	 */
    export class XadesObject extends XmlObject {

        // Public properties
		/**
		 * Id attribute of the XAdES object
		 */
        public Id: string;

		/**
		 * The QualifyingProperties element acts as a container element for
		 * all the qualifying information that should be added to an XML
		 * signature.
		 */
        public QualifyingProperties: QualifyingProperties;

        // Constructors
		/**
		 * Default constructor
		 */
        public constructor() {
            super();
            this.QualifyingProperties = new QualifyingProperties();
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

            if (this.QualifyingProperties && this.QualifyingProperties.HasChanged()) {
                retVal = true;
            }

            return retVal;
        }

		/**
		 * Load state from an XML element
         * @param {Element} element XML element containing new state
         * @param {Element} counterSignedXmlElement Element containing parent signature (needed if there are counter signatures)
		 */
        public LoadXml(element: Element, counterSignedXmlElement?: Element): void {
            if (element == null) {
                throw new XmlError(XE.PARAM_REQUIRED, "element");
            }

            if (!((element.localName === "Object") && (element.namespaceURI === XmlSignature.NamespaceURI)))
                throw new XmlError(XE.ELEMENT_MALFORMED, "Object");

            if (element.hasAttribute(XmlSignature.AttributeNames.Id)) {
                this.Id = element.getAttribute(XmlSignature.AttributeNames.Id);
            }
            else {
                this.Id = "";
            }

            let xmlNodeList = findChilds(element, XmlXades.ElementNames.QualifyingProperties, XmlXades.NamespaceURI);
            if (!xmlNodeList.length) {
                throw new XmlError(XE.CRYPTOGRAPHIC, "QualifyingProperties missing");
            }
            this.QualifyingProperties = new QualifyingProperties();
            this.QualifyingProperties.LoadXml(xmlNodeList[0] as Element, counterSignedXmlElement);
        }

		/**
		 * Returns the XML representation of the this object
         * @returns XML element containing the state of this object
		 */
        public GetXml(): Element {
            let document = CreateDocument(
                "Object",
                XmlSignature.NamespaceURI,
                "ds"
            );
            let element = document.documentElement;

            if (this.Id) {
                element.setAttribute(XmlSignature.AttributeNames.Id, this.Id);
            }

            if (this.QualifyingProperties && this.QualifyingProperties.HasChanged()) {
                element.appendChild(document.importNode(this.QualifyingProperties.GetXml(), true));
            }

            return element;
        }

    }
}