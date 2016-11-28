namespace xadesjs.pro {

    /**
     * <xsd:element name="XAdESTimeStamp" type="XAdESTimeStampType"/>
     * <xsd:complexType name="XAdESTimeStampType">
     *   <xsd:complexContent>
     *     <xsd:restriction base="GenericTimeStampType">
     *       <xsd:sequence>
     *         <xsd:element ref="Include" minOccurs="0" maxOccurs="unbounded"/>
     *         <xsd:element ref="ds:CanonicalizationMethod" minOccurs="0"/>
     *         <xsd:choice maxOccurs="unbounded">
     *           <xsd:element name="EncapsulatedTimeStamp" type="EncapsulatedPKIDataType"/>
     *           <xsd:element name="XMLTimeStamp" type="AnyType"/>
     *         </xsd:choice>
     *       </xsd:sequence>
     *       <xsd:attribute name="Id" type="xsd:ID" use="optional"/>
     *     </xsd:restriction>
     *   </xsd:complexContent>
     * </xsd:complexType> 
     */

    export class XadesTimeStamp extends TimeStampGeneric {

        // Public properties
        /**
         * Identifies data objects that are time-stamped
         */
        public Includes: Collection<Include>;

        // Constructor
        constructor(tagName: string) {
            super(tagName);

            // Default props
            this.Includes = new Collection<Include>();
        }

        // Protected methods

        protected GetHash(element: Element, alg: string): PromiseLike<Uint8Array> {
            return new Promise((resolve, reject) => {
                let tsp = this.EncapsulatedTimeStamp.GetPki();
                let transform = CryptoConfig.CreateFromName(this.CanonicalizationMethod);
                transform.LoadInnerXml(element);
                let transformedString = transform.GetOutput();
                let buf = Convert.ToBufferUtf8String(transformedString);
                Application.crypto.subtle.digest(alg, buf)
                    .then((hash: ArrayBuffer) => {
                        return Promise.resolve(new Uint8Array(hash));
                    })
                    .then(resolve, reject);
            });
        }

        // Public methods

        /**
		 * Check to see if something has changed in this instance and needs to be serialized
         * @returns Flag indicating if a member needs serialization
		 */
        public HasChanged(): boolean {
            let retVal = super.HasChanged();

            if (retVal || this.Id || this.Includes.Count > 0)
                return true;

            return retVal;
        }

        /**
		 * Load state from an XML element
         * @param {Element} element XML element containing new state
		 */
        public LoadXml(element: Element): void {
            super.LoadXml(element);

            this.Includes.Clear();
            let xmlNodeList = element.childNodes;
            for (let i = 0; i < xmlNodeList.length; i++) {
                let node = xmlNodeList.item(i) as Element;
                if (node.nodeType !== XmlNodeType.Element)
                    continue;
                if (node.nodeName === XmlXades.ElementNames.Include) {
                    let include = new Include();
                    include.LoadXml(node);
                    this.Includes.Add(include);
                }
            }

        }

		/**
		 * Returns the XML representation of the this object
         * @returns XML element containing the state of this object
		 */
        public GetXml(): Element {
            let element = super.GetXml();

            let firstElement = element.childNodes.item(0);
            for (let include of this.Includes.GetIterator()) {
                element.insertBefore(include.GetXml(), firstElement);
            }

            return element;
        }

        Verify(element?: Element): PromiseLike<boolean>;
        Verify(document?: Document): PromiseLike<boolean>;
        Verify(node: Document | Element = null): PromiseLike<boolean> {
            return new Promise((resolve, reject) => {
                let el: Element;
                if (node && node.nodeType === XmlNodeType.Element)
                    el = node as Element;
                else
                    el = node.ownerDocument.documentElement;

                if (!node && this.element)
                    el = this.element.ownerDocument.documentElement;
                if (!el)
                    throw new XmlError(XE.CRYPTOGRAPHIC, "Element is needed for verifying");

                if (this.Includes.Count) {
                    // find element by URI
                    let id = this.Includes.Item(0).Uri.replace(/^\#/, "");
                    el = this.GetElementById(node as Element, id);
                    if (!el)
                        throw new XmlError(XE.CRYPTOGRAPHIC, `Element by id '${id}' is not found`);
                }

                let tsp = this.EncapsulatedTimeStamp.GetPki();
                let transform = CryptoConfig.CreateFromName(this.CanonicalizationMethod);

                // Prepare element for canonicalization
                let importedElement = el.ownerDocument.importNode(el, true) as Element;
                let namespaces = SelectNamespaces(el);
                for (let i in namespaces) {
                    let uri = namespaces[i];
                    // add namespaces to imported element
                    importedElement.setAttribute("xmlns" + (i ? ":" + i : ""), uri);
                }

                transform.LoadInnerXml(importedElement);
                let transformedString = transform.GetOutput();
                tsp.Verify({ data: Convert.ToBufferUtf8String(transformedString).buffer }).then(resolve, reject);
            });
        }

        /**
         * Creates EncapsulatedTimeStamp object for TimeStamp object using TSP service
         * @param  {Element} element 
         * @param  {string} tspUri URI of the TSP service
         * @param  {string} uri URI of the Element
         * @param  {string=SHA256} algorithm Hash algorithm. Default SHA-256
         * @returns PromiseLike
         */
        Create(element: Element, tspUri: string, uri: string = "", algorithm: string = SHA256): PromiseLike<XadesTimeStamp> {
            return new Promise((resolve, reject) => {
                let el = element;

                // Remove # from the begin of Id
                if (uri) {
                    uri = uri.replace(/^#/, "");

                    // Get element by URI
                    el = this.GetElementById(element, uri);
                    if (!el)
                        throw new XmlError(XE.CRYPTOGRAPHIC, `Element with ID '${uri}' is not found`);
                }


                // Create TSP request
                let tspRequest = new pki.tsp.TSPRequest();
                tspRequest.DigestAlgorithm = algorithm as any;
                this.GetHash(el, algorithm)
                    .then((digestValue) => {
                        if (uri) {
                            let include = new Include();
                            include.Uri = "#" + uri;
                            this.Includes.Add(include);
                        }
                        tspRequest.DigestValue = digestValue;

                        return fetch(tspUri, {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/timestamp-query",
                            },
                            mode: "cors",
                            body: tspRequest.Encode()
                        });
                    })
                    .then((response) => {
                        return response.arrayBuffer();
                    })
                    .then((buffer) => {
                        let uint8Buf = new Uint8Array(buffer);
                        // check TSP response
                        let tspResponse = new pki.tsp.TSPResponse(uint8Buf);
                        if (!tspResponse.TimeStampToken)
                            return reject(new XmlError(XE.CRYPTOGRAPHIC, "Can not get TSP response"));
                        // Set EncapsulatedPKIData
                        this.EncapsulatedTimeStamp.PkiData = tspResponse.TimeStampToken.Encode();
                        resolve(this);
                    })
                    .catch(reject);
            });
        }

    }

    export class AllDataObjectsTimeStamp extends XadesTimeStamp {
        constructor() {
            super(XmlXades.ElementNames.AllDataObjectsTimeStamp);
        }
    }

    export class IndividualDataObjectsTimeStamp extends XadesTimeStamp {
        constructor() {
            super(XmlXades.ElementNames.IndividualDataObjectsTimeStamp);
        }
    }

    export class SignatureTimeStamp extends XadesTimeStamp {
        constructor() {
            super(XmlXades.ElementNames.SignatureTimeStamp);
        }

        /**
         * Creates EncapsulatedTimeStamp object for TimeStamp object using TSP service
         * @param  {Element} element 
         * @param  {string} tspUri URI of the TSP service
         * @param  {string} uri URI of the Element
         * @param  {string=SHA256} algorithm Hash algorithm. Default SHA-256
         * @returns PromiseLike
         */
        Create(element: Element, tspUri: string, uri: string = "", algorithm: string = SHA256): PromiseLike<XadesTimeStamp> {
            if (!uri) {
                element = this.GetSignatureValue(element)
                if (!element)
                    return Promise.reject(new XmlError(XE.CRYPTOGRAPHIC, "SignatureValue element is missing"));
            }
            return super.Create(element, tspUri, uri, algorithm);
        }

        Verify(element?: Element): PromiseLike<boolean>;
        Verify(document?: Document): PromiseLike<boolean>;
        Verify(node: Document | Element = null): PromiseLike<boolean> {
            if (!node) {
                // get SignatureValue element
                let signature = this.element.parentElement.parentElement.parentElement.parentElement.parentElement;
                node = this.GetSignatureValue(signature);
            }
            else if (!this.Includes.Count) {
                node = this.GetSignatureValue(node);
            }
            if (!node)
                return Promise.reject(new XmlError(XE.CRYPTOGRAPHIC, "SignatureValue element is missing"));
            return super.Verify(node as Element);
        }

        protected GetSignatureValue(node: Document | Element) {
            let res: Element = null;
            let nodeList = node.getElementsByTagNameNS(XmlSignature.NamespaceURI, XmlSignature.ElementNames.SignatureValue);
            if (nodeList.length)
                res = nodeList.item(0);
            return res;
        }
    }

    export class AllDataObjectsTimeStampCollection extends Collection<AllDataObjectsTimeStamp> { }

    export class IndividualDataObjectsTimeStampCollection extends Collection<IndividualDataObjectsTimeStamp> { }

    export class SignatureTimeStampCollection extends Collection<SignatureTimeStamp> { }

}