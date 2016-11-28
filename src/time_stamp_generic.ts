namespace xadesjs.pro {
    /**
     * <xsd:element name="Include" type="IncludeType"/>
     * <xsd:complexType name="IncludeType">
     *   <xsd:attribute name="URI" type="xsd:anyURI" use="required"/>
     *   <xsd:attribute name="referencedData" type="xsd:boolean" use="optional"/>
     * </xsd:complexType>
     */

    /**
     * Include elements explicitly identify data objects that are time-stamped. 
     * Their order of appearance indicates how the data objects contribute 
     * in the generation of the input to the digest computation.
     */
    export class Include extends XmlXadesObject {

        // Public properties
        /**
         * Uri referencing a data object
         */
        Uri: string;

        /**
         * If present with value set to "true", the time-stamp is computed 
         * on the result of processing the corresponding `ds:Reference` element 
         * according to the XMLDSIG processing model. If the attribute is not present 
         * or is present with value "false", the time-stamp is computed 
         * on the `ds:Reference` element itself
         */
        ReferencedData: boolean;

        // Constructors
        constructor() {
            super();

            // Set default values
            this.Uri = "";
            this.ReferencedData = false;
        }

        // Protected methods
        protected GetXmlObjectName(): string {
            return XmlXades.ElementNames.Include;
        }

        // Public methods

        /**
		 * Check to see if something has changed in this instance and needs to be serialized
         * @returns Flag indicating if a member needs serialization
		 */
        public HasChanged(): boolean {
            let retVal = false;

            if (this.Uri || this.ReferencedData) {
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

            this.Uri = this.getAttribute(element, XmlXades.AttributeNames.URI, "", true);

            let refData = this.getAttribute(element, XmlXades.AttributeNames.ReferencedData, null, false) as any;
            if (refData)
                this.ReferencedData = refData === "true" ? true : false;
        }

		/**
		 * Returns the XML representation of the this object
         * @returns XML element containing the state of this object
		 */
        public GetXml(): Element {
            let document = this.CreateDocument();
            let element = this.CreateElement(document);

            if (this.Uri)
                element.setAttribute(XmlXades.AttributeNames.URI, this.Uri);
            else
                throw new XmlError(XE.CRYPTOGRAPHIC, "Uri is required");

            if (this.ReferencedData)
                element.setAttribute(XmlXades.AttributeNames.ReferencedData, this.ReferencedData.toString());

            return element;
        }

    }

    /** 
    * <xsd:element name="ReferenceInfo" type="ReferenceInfoType"/>
    * <xsd:complexType name="ReferenceInfoType">
    *   <xsd:sequence>
    *     <xsd:element ref="ds:DigestMethod"/>
    *     <xsd:element ref="ds:DigestValue"/>
    *   </xsd:sequence>
    *   <xsd:attribute name="Id" type="xsd:ID" use="optional"/>
    *   <xsd:attribute name="URI" type="xsd:anyURI" use="optional"/>
    * </xsd:complexType>
    */
    export class ReferenceInfo extends DigestAlgAndValueType {

        // Public properties

        /**
		 * The optional ID attribute can be used to make a reference to an element
		 * of this data type.
		 */
        public Id: string;

        /**
         * The optional Uri attribute can be used to make a reference to a data object
         */
        public Uri: string;

        // Constructors
        constructor() {
            super(XmlXades.ElementNames.ReferenceInfo);

            // Default properties
            this.Id = "";
            this.Uri = "";
        }

        // Public methods

        /**
		 * Check to see if something has changed in this instance and needs to be serialized
         * @returns Flag indicating if a member needs serialization
		 */
        public HasChanged(): boolean {
            let retVal = super.HasChanged();

            if (retVal || this.Id || this.Uri)
                return true;

            return retVal;
        }

		/**
		 * Load state from an XML element
         * @param {Element} element XML element containing new state
		 */
        public LoadXml(element: Element): void {
            super.LoadXml(element);

            this.Id = this.getAttribute(element, XmlXades.AttributeNames.Id, "", false);

            this.Uri = this.getAttribute(element, XmlXades.AttributeNames.URI, "", false);
        }

		/**
		 * Returns the XML representation of the this object
         * @returns XML element containing the state of this object
		 */
        public GetXml(): Element {
            let element = super.GetXml();

            if (this.Id)
                element.setAttribute(XmlXades.AttributeNames.Id, this.Id);

            if (this.Uri)
                element.setAttribute(XmlXades.AttributeNames.URI, this.Uri);

            return element;
        }

    }

    export class EncapsulatedTimeStamp extends EncapsulatedPKIData {
        // Constructors
        public constructor();
        public constructor(raw: Uint8Array);
        public constructor(pki: pki.tsp.TimeStampToken);
        public constructor(param1?: Uint8Array | pki.tsp.TimeStampToken) {
            super(XmlXades.ElementNames.EncapsulatedTimeStamp);
            if (param1) {
                let tsp: pki.tsp.TimeStampToken;
                if (param1 instanceof Uint8Array)
                    tsp = new pki.tsp.TimeStampToken(param1);
                else
                    tsp = param1;
                this.LoadPki(tsp);
            }
        }

        /**
		 * Returns the PKI representation of the encapsulated PKI data object
         * @returns PKI object
		 */
        public GetPki(): pki.tsp.TimeStampToken {
            return new pki.tsp.TimeStampToken(this.PkiData);
        }

        /**
		 * Load PkiData from an PKI object
         * @param {TimeStampToken} pki PKI object
		 */
        public LoadPki(pki: pki.tsp.TimeStampToken): void {
            super.LoadPki(pki);
        }
    }

    /** 
    * <xsd:complexType name="GenericTimeStampType" abstract="true">
    *   <xsd:sequence>
    *     <xsd:choice minOccurs="0">
    *       <xsd:element ref="Include" maxOccurs="unbounded"/>
    *       <xsd:element ref="ReferenceInfo" maxOccurs="unbounded"/>
    *     </xsd:choice>
    *     <xsd:element ref="ds:CanonicalizationMethod" minOccurs="0"/>
    *     <xsd:choice maxOccurs="unbounded">
    *       <xsd:element name="EncapsulatedTimeStamp" type="EncapsulatedPKIDataType"/>
    *       <xsd:element name="XMLTimeStamp" type="AnyType"/>
    *     </xsd:choice>
    *   </xsd:sequence>
    *   <xsd:attribute name="Id" type="xsd:ID" use="optional"/>
    * </xsd:complexType> 
    */
    export abstract class TimeStampGeneric extends XmlXadesTaggedObject {

        // Private properties
        private encapsulatedTimeStamp: EncapsulatedTimeStamp;
        private xmlTimeStamp: XMLTimeStamp;

        /**
		 * The optional ID attribute can be used to make a reference to an element
		 * of this data type.
		 */
        public Id: string;

        /**
         * Sets/Gets the canonicalization method used for canonicalizing XML node
         */
        public CanonicalizationMethod: string;

        // Public properties
        /**
		 * The time-stamp generated by a TSA encoded as an ASN.1 data
		 * object
		 */
        public get EncapsulatedTimeStamp(): EncapsulatedTimeStamp {
            return this.encapsulatedTimeStamp;
        }
        public set EncapsulatedTimeStamp(value: EncapsulatedTimeStamp) {
            this.encapsulatedTimeStamp = value;
            if (this.encapsulatedTimeStamp != null) {
                this.xmlTimeStamp = null;
            }
        }

		/**
		 * The time-stamp generated by a TSA encoded as a generic XML
		 * timestamp
		 */
        public get XMLTimeStamp(): XMLTimeStamp {
            return this.xmlTimeStamp;
        }
        public set XMLTimeStamp(value: XMLTimeStamp) {
            this.xmlTimeStamp = value;
            if (this.xmlTimeStamp != null) {
                this.encapsulatedTimeStamp = null;
            }
        }


        // Constructors
        constructor(tagName: string) {
            super(tagName);

            // Default params
            this.Id = "";
            this.CanonicalizationMethod = XmlSignature.DEFAULT_CANON_METHOD;
            this.encapsulatedTimeStamp = new EncapsulatedTimeStamp();
            this.xmlTimeStamp = null;
        }

        // Protected methods

        // Public methods
        /**
		 * Check to see if something has changed in this instance and needs to be serialized
         * @returns Flag indicating if a member needs serialization
		 */
        public HasChanged(): boolean {
            let retVal = false;

            if (this.Id || this.encapsulatedTimeStamp || this.encapsulatedTimeStamp.HasChanged()
                || (this.CanonicalizationMethod && this.CanonicalizationMethod !== XmlSignature.DEFAULT_CANON_METHOD)) {
                retVal = true;
            }

            return retVal;
        }

        /**
		 * Load state from an XML element
         * param {Element} element XML element containing new state
		 */
        public LoadXml(element: Element): void {
            super.LoadXml(element);

            this.Id = this.getAttribute(element, XmlXades.AttributeNames.Id, "", false);

            let canonMethod = element.getElementsByTagNameNS(XmlSignature.NamespaceURI, XmlSignature.ElementNames.CanonicalizationMethod);
            if (canonMethod && canonMethod.length) {
                let alg = canonMethod.item(0).getAttribute(XmlSignature.AttributeNames.Algorithm);
                if (!alg)
                    throw new XmlError(XE.CRYPTOGRAPHIC, `${XmlSignature.AttributeNames.Algorithm} attribute missing`);
                this.CanonicalizationMethod = alg;
            }
            else {
                this.CanonicalizationMethod = XmlSignature.DEFAULT_CANON_METHOD;
            }

            let xmlElement = this.GetElement(element, XmlXades.ElementNames.EncapsulatedTimeStamp, false);
            if (xmlElement) {
                this.encapsulatedTimeStamp = new EncapsulatedTimeStamp;
                this.encapsulatedTimeStamp.LoadXml(xmlElement);
                this.xmlTimeStamp = null;
            }
            else {
                xmlElement = this.GetElement(element, XmlXades.ElementNames.XMLTimeStamp, false);
                if (xmlElement) {
                    this.xmlTimeStamp = new XMLTimeStamp();
                    this.xmlTimeStamp.LoadXml(xmlElement);
                    this.encapsulatedTimeStamp = null;
                }
                else {
                    throw new XmlError(XE.CRYPTOGRAPHIC, `EncapsulatedTimeStamp or XMLTimeStamp missing in ${this.TagName} element`);
                }
            }
        }

		/**
		 * Returns the XML representation of the this object
         * @returns XML element containing the state of this object
		 */
        public GetXml(): Element {
            if (this.element)
                return this.element;

            let document = this.CreateDocument();
            let element = this.CreateElement(document);

            // Id attribte
            if (this.Id)
                element.setAttribute(XmlXades.AttributeNames.Id, this.Id);

            // CanonicalizationMethod
            if (this.CanonicalizationMethod)
                if (this.CanonicalizationMethod !== XmlSignature.DEFAULT_CANON_METHOD) {

                    let c14n = document.createElementNS(XmlSignature.NamespaceURI, XmlSignature.DefaultPrefix + ":" + XmlSignature.ElementNames.CanonicalizationMethod);
                    c14n.setAttribute(XmlSignature.AttributeNames.Algorithm, this.CanonicalizationMethod);
                    element.appendChild(c14n);
                }


            if (this.encapsulatedTimeStamp != null && this.encapsulatedTimeStamp.HasChanged()) {
                element.appendChild(document.importNode(this.encapsulatedTimeStamp.GetXml(), true));
            }
            else {
                if (this.xmlTimeStamp != null && this.xmlTimeStamp.HasChanged()) {
                    element.appendChild(document.importNode(this.xmlTimeStamp.GetXml(), true));
                }
                else {
                    throw new XmlError(XE.CRYPTOGRAPHIC, `EncapsulatedTimeStamp or XMLTimeStamp element missing in ${this.TagName} element`);
                }
            }

            return element;
        }

    }

}