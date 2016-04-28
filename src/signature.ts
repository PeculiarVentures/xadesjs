namespace xadesjs {

    /**
     * Represents the <Signature> element of an XML signature.
     */
    export class Signature extends XmlObject {

        private list: Array<DataObject>;
        private info: SignedInfo;
        private key: KeyInfo;
        private id: string;
        private signature: Uint8Array;
        private element: Element;

        public constructor() {
            super();
            this.list = [];
        }

        /**
         * Gets or sets the ID of the current Signature.
         */
        set Id(value: string) {
            this.element = null;
            this.id = value;
        }
        get Id(): string {
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
                this.signature = Convert.ToBufferString(Convert.FromBase64String(sigValue.textContent));

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

    export const XmlSignature = {

        ElementNames: {

            CanonicalizationMethod: "CanonicalizationMethod",
            DigestMethod: "DigestMethod",
            DigestValue: "DigestValue",
            DSAKeyValue: "DSAKeyValue",
            EncryptedKey: "EncryptedKey",
            HMACOutputLength: "HMACOutputLength",
            RSAPSSParams: "RSAPSSParams",
            MaskGenerationFunction: "MaskGenerationFunction",
            SaltLength: "SaltLength",
            KeyInfo: "KeyInfo",
            KeyName: "KeyName",
            KeyValue: "KeyValue",
            Modulus: "Modulus",
            Exponent: "Exponent",
            Manifest: "Manifest",
            Object: "Object",
            Reference: "Reference",
            RetrievalMethod: "RetrievalMethod",
            RSAKeyValue: "RSAKeyValue",
            ECKeyValue: "ECKeyValue",
            NamedCurve: "NamedCurve",
            PublicKey: "PublicKey",
            Signature: "Signature",
            SignatureMethod: "SignatureMethod",
            SignatureValue: "SignatureValue",
            SignedInfo: "SignedInfo",
            Transform: "Transform",
            Transforms: "Transforms",
            X509Data: "X509Data",
            X509IssuerSerial: "X509IssuerSerial",
            X509IssuerName: "X509IssuerName",
            X509SerialNumber: "X509SerialNumber",
            X509SKI: "X509SKI",
            X509SubjectName: "X509SubjectName",
            X509Certificate: "X509Certificate",
            X509CRL: "X509CRL"
        },


        AttributeNames: {

            Algorithm: "Algorithm",
            Encoding: "Encoding",
            Id: "Id",
            MimeType: "MimeType",
            Type: "Type",
            URI: "URI",
        },

        AlgorithmNamespaces: {
            XmlDsigBase64Transform: "http://www.w3.org/2000/09/xmldsig#base64",
            XmlDsigC14NTransform: "http://www.w3.org/TR/2001/REC-xml-c14n-20010315",
            XmlDsigC14NWithCommentsTransform: "http://www.w3.org/TR/2001/REC-xml-c14n-20010315#WithComments",
            XmlDsigEnvelopedSignatureTransform: "http://www.w3.org/2000/09/xmldsig#enveloped-signature",
            XmlDsigXPathTransform: "http://www.w3.org/TR/1999/REC-xpath-19991116",
            XmlDsigXsltTransform: "http://www.w3.org/TR/1999/REC-xslt-19991116",
            XmlDsigExcC14NTransform: "http://www.w3.org/2001/10/xml-exc-c14n#",
            XmlDsigExcC14NWithCommentsTransform: "http://www.w3.org/2001/10/xml-exc-c14n#WithComments",
            XmlDecryptionTransform: "http://www.w3.org/2002/07/decrypt#XML",
            XmlLicenseTransform: "urn:mpeg:mpeg21:2003:01-REL-R-NS:licenseTransform"
        },

        Uri: {
            Manifest: "http://www.w3.org/2000/09/xmldsig#Manifest"
        },

        NamespaceURI: "http://www.w3.org/2000/09/xmldsig#",
        NamespaceURIMore: "http://www.w3.org/2007/05/xmldsig-more#",
        NamespaceURIPss: "http://www.example.org/xmldsig-pss/#",
        Prefix: "ds",

        GetChildElement: function GetChildElement(xel: Node, element: string, ns: string): Element {
            for (let i = 0; i < xel.childNodes.length; i++) {
                let n = xel.childNodes[i];
                if (n.nodeType === XmlNodeType.Element && n.localName === element && n.namespaceURI === ns)
                    return n as Element;
            }
            return null;
        },

        GetAttributeFromElement: function GetAttributeFromElement(xel: Element, attribute: string, element: string): string {
            let el: Element = this.GetChildElement(xel, element, XmlSignature.NamespaceURI);
            return el != null ? el.getAttribute(attribute) : null;
        },

        GetChildElements: function GetChildElements(xel: Element, element: string): Element[] {
            let al: Element[] = [];
            for (let i = 0; i < xel.childNodes.length; i++) {
                let n = xel.childNodes[i];
                if (n.nodeType === XmlNodeType.Element && n.localName === element && n.namespaceURI === XmlSignature.NamespaceURI)
                    al.push(n as Element);
            }
            return al;
        }
    };

}