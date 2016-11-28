namespace xadesjs.pro {

	/**
	 * The Transforms element contains a collection of transformations
	 */
    export class Transforms extends XmlObject {


        // Public properties
		/**
		 * A collection of transforms
		 */
        public TransformCollection: TransformCollection;


        // Constructors
		/**
		 * Default constructor
		 */
        public constructor() {
            super();
            this.TransformCollection = new TransformCollection();
        }

        // Protected methods
        protected GetXmlObjectName() {
            return XmlSignature.ElementNames.Transforms;
        }

        protected GetPrefix() {
            return XmlSignature.DefaultPrefix + ":";
        }

        // Public methods
		/**
		 * Check to see if something has changed in this instance and needs to be serialized
         * @returns Flag indicating if a member needs serialization
		 */
        public HasChanged(): boolean {
            let retVal = false;

            if (this.TransformCollection.Count) {
                retVal = true;
            }

            return retVal;
        }

		/**
		 * Load state from an XML element
         * @param {Element} element XML element containing new state
		 */
        public LoadXml(element: Element): void {
            if (!element) {
                throw new XmlError(XE.PARAM_REQUIRED, "element");
            }

            if ((element.localName === this.GetXmlObjectName()) && (element.namespaceURI === XmlSignature.NamespaceURI)) {
                this.TransformCollection.Clear();
                let xmlNodeList = element.getElementsByTagNameNS(XmlSignature.NamespaceURI, XmlSignature.ElementNames.Transform);
                try {
                    for (let i = 0; i < xmlNodeList.length; i++) {
                        let xmlTranform = xmlNodeList.item(i) as Element;
                        if (xmlTranform) {
                            let newTransform = new Transform();
                            newTransform.LoadXml(xmlTranform);
                            this.TransformCollection.Add(newTransform);
                        }
                    }
                }
                finally { }
            }
            else
                throw new XmlError(XE.ELEMENT_MALFORMED, this.GetXmlObjectName());
        }

		/**
		 * Returns the XML representation of the this object
         * @returns XML element containing the state of this object
		 */
        public GetXml(): Element {
            let document = CreateDocument(
                this.GetXmlObjectName(),
                XmlSignature.NamespaceURI,
                XmlSignature.DefaultPrefix);

            let element = document.createElementNS(XmlSignature.NamespaceURI, this.GetPrefix() + XmlSignature.ElementNames.Transforms);

            if (this.TransformCollection.Count) {
                for (let transform of this.TransformCollection.GetIterator()) {
                    if (transform.HasChanged()) {
                        element.appendChild(document.importNode(transform.GetXml(), true));
                    }
                }
            }

            return element;
        }

    }
}
