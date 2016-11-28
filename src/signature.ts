namespace xadesjs {

    /**
     * Represents the <Signature> element of an XML signature.
     */
    export class Signature extends XmlObject {

        private list: Array<DataObject>;
        private info = new SignedInfo();
        private key = new KeyInfo();
        private id: string | null;
        private signature: Uint8Array;
        private signature_id: string | null;
        private element: Element | null;

        public constructor() {
            super();
            this.list = [];
        }

        /**
         * Gets or sets the ID of the current Signature.
         */
        set Id(value: string| null) {
            this.element = null;
            this.id = value;
        }
        get Id(): string | null {
            return this.id;
        }

        /**
         * Gets or sets the KeyInfo of the current Signature.
         */
        get KeyInfo(): KeyInfo {
            return this.key;
        }
        set KeyInfo(value: KeyInfo) {
            this.element = null;
            this.key = value;
        }

        /**
         * Gets or sets a list of objects to be signed.
         */
        get ObjectList(): Array<DataObject> {
            return this.list;
        }
        set ObjectList(value: Array<DataObject>) {
            this.list = value;
        }

        /**
         * Gets or sets the value of the digital signature.
         */
        get SignatureValue(): Uint8Array {
            return this.signature;
        }
        set SignatureValue(value: Uint8Array) {
            this.element = null;
            this.signature = value;
        }

        /**
         * Gets or sets the Id of the SignatureValue.
         */
        get SignatureValueId(): string | null{
            return this.signature_id;
        }
        set SignatureValueId(value: string | null) {
            this.element = null;
            this.signature_id = value;
        }

        /**
         * Gets or sets the SignedInfo of the current Signature.
         */
        get SignedInfo(): SignedInfo {
            return this.info;
        }
        set SignedInfo(value: SignedInfo) {
            this.element = null;
            this.info = value;
        }

        /**
         * Adds a DataObject to the list of objects to be signed.
         * @param  {DataObject} dataObject The DataObject to be added to the list of objects to be signed.
         * @returns void
         */
        public AddObject(dataObject: DataObject): void {
            this.list.push(dataObject);
        }

        /**
         * Returns the XML representation of the Signature.
         * @returns Element
         */
        GetXml(): Element {
            if (this.element != null)
                return this.element;

            if (this.info == null)
                throw new XmlError(XE.PARAM_REQUIRED, "SignedInfo");
            if (this.signature == null)
                throw new XmlError(XE.PARAM_REQUIRED, "SignatureValue");
            let document = CreateDocument();

            let prefix = this.GetPrefix();

            let xel = document.createElementNS(XmlSignature.NamespaceURI, prefix + XmlSignature.ElementNames.Signature);
            // add xmlns for xmldom
            if (Application.isNodePlugin()) {
                xel.setAttribute(`xmlns:${this.Prefix}`, XmlSignature.NamespaceURI);
            }

            if (this.id != null)
                xel.setAttribute(XmlSignature.AttributeNames.Id, this.id);

            this.info.Prefix = this.Prefix;
            let xn = this.info.GetXml();
            let newNode = document.importNode(xn, true);
            xel.appendChild(newNode);

            if (this.signature != null) {
                let sv = document.createElementNS(XmlSignature.NamespaceURI, prefix + XmlSignature.ElementNames.SignatureValue);
                sv.textContent = Convert.ToBase64String(Convert.FromBufferString(this.signature));
                if (this.signature_id)
                    sv.setAttribute(XmlSignature.AttributeNames.Id, this.signature_id);
                xel.appendChild(sv);
            }

            if (this.key != null) {
                this.key.Prefix = this.Prefix;
                xn = this.key.GetXml();
                newNode = document.importNode(xn, true);
                xel.appendChild(newNode);
            }

            if (this.list.length > 0) {
                for (let i in this.list) {
                    let obj = this.list[i];
                    obj.Prefix = this.Prefix;
                    xn = obj.GetXml();
                    newNode = document.importNode(xn, true);
                    xel.appendChild(newNode);
                }
            }

            return xel;
        }

        /**
         * Loads a Signature state from an XML element.
         * @param  {Element} value
         * @returns void
         */
        LoadXml(value: Element): void {
            if (value == null)
                throw new XmlError(XE.PARAM_REQUIRED, "value");

            if ((value.localName === XmlSignature.ElementNames.Signature) && (value.namespaceURI === XmlSignature.NamespaceURI)) {
                this.id = this.getAttribute(value, XmlSignature.AttributeNames.Id);

                // LAMESPEC: This library is totally useless against eXtensibly Marked-up document.
                let i = this.NextElementPos(value.childNodes, 0, XmlSignature.ElementNames.SignedInfo, XmlSignature.NamespaceURI, true);
                let sinfo = <Element>value.childNodes[i];
                this.info = new SignedInfo();
                this.info.LoadXml(sinfo);

                i = this.NextElementPos(value.childNodes, ++i, XmlSignature.ElementNames.SignatureValue, XmlSignature.NamespaceURI, true);
                let sigValue = <Element>value.childNodes[i];
                this.signature = Convert.ToBufferString(Convert.FromBase64String(sigValue.textContent || ""));
                this.signature_id = this.getAttribute(sigValue, XmlSignature.AttributeNames.Id);

                // signature isn't required: <element ref="ds:KeyInfo" minOccurs="0"/> 
                i = this.NextElementPos(value.childNodes, ++i, XmlSignature.ElementNames.KeyInfo, XmlSignature.NamespaceURI, false);
                if (i > 0) {
                    let kinfo = <Element>value.childNodes[i];
                    this.key = new KeyInfo();
                    this.key.LoadXml(kinfo);
                }

                let xnl = value.getElementsByTagNameNS(XmlSignature.NamespaceURI, "Object");
                for (let i = 0; i < xnl.length; i++) {
                    let xn = xnl[i];
                    let obj = new DataObject();
                    obj.LoadXml(xn);
                    this.AddObject(obj);
                }
            }
            else
                throw new XmlError(XE.ELEMENT_MALFORMED, "Signature");

            // if invalid
            if (this.info == null)
                throw new XmlError(XE.PARAM_REQUIRED, "SignedInfo");
            if (this.signature == null)
                throw new XmlError(XE.PARAM_REQUIRED, "SignatureValue");
        }

        private NextElementPos(nl: NodeList, pos: number, name: string, ns: string, required: boolean): number {
            while (pos < nl.length) {
                if (nl[pos].nodeType === XmlNodeType.Element) {
                    if (nl[pos].localName !== name || nl[pos].namespaceURI !== ns) {
                        if (required)
                            throw new XmlError(XE.ELEMENT_MALFORMED, name);
                        else
                            return -2;
                    }
                    else
                        return pos;
                }
                else
                    pos++;
            }
            if (required)
                throw new XmlError(XE.ELEMENT_MALFORMED, name);
            return -1;
        }
    }

}