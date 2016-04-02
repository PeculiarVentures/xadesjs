namespace xadesjs {

    export class XmlDecryptionTransform extends Transform {

        encryptedXml: EncryptedXml;
        inputTypes: Type[];
        outputTypes: Type[];
        inputObj: Object;
        exceptUris: Array<string>;

        const NamespaceUri = "http://www.w3.org/2002/07/decrypt#";


        public constrictor() {
            this.Algorithm = XmlSignature.AlgorithmNamespaces.XmlDecryptionTransform;
            this.encryptedXml = new EncryptedXml();
            this.exceptUris = [];
        }

        get EncryptedXml(): EncryptedXml {
            return this.encryptedXml;
        }
        set EncryptedXml(value: EncryptedXml) {
            this.encryptedXml = value;
        }

        get InputTypes(): Type[] {
            if (this.inputTypes == null)
                this.inputTypes = new Type[2] {typeof (System.IO.Stream), typeof (System.Xml.XmlDocument) };

            return this.inputTypes;
        }

        get OutputTypes(): Type[] {
            if (this.outputTypes == null)
                this.outputTypes = new Type[1] {typeof (System.Xml.XmlDocument) };

            return this.outputTypes;
        }

        public AddExceptUri(uri: string): void {
            this.exceptUris.push(uri);
        }

        private ClearExceptUris(): void {
            this.exceptUris = [];
        }

        protected GetInnerXml(): NodeList {
            let doc = document.implementation.createDocument("", "", null);
            doc.appendChild(doc.createElement("DecryptionTransform"));

            for (let o of this.exceptUris) {
                let element = doc.createElementNS(this.NamespaceUri, "Except");
                element.setAttributeNS(this.NamespaceUri, "URI", o);
            }

            return doc.getElementsByTagNameNS(this.NamespaceUri, "Except");
        }

        public GetOutput(): Document {
            let document: Document;
            if (this.inputObj instanceof Stream) {
                document = document.implementation.createDocument("", "", null);
                document.PreserveWhitespace = true;
                document.XmlResolver = GetResolver();
                document.Load(new XmlSignatureStreamReader(
                    new StreamReader(inputObj as Stream)));
            }
            else if (this.inputObj instanceof Document) {
                document = this.inputObj as Document;
            }
            else
                throw new XmlError(XE.NULL_REFERENCE);

            let nodes = document.getElementsByTagNameNS(this.EncryptedXml.XmlEncNamespaceUrl, "EncryptedData");
            for (let node of <Element[]><any>nodes) {
                if (node === document.documentElement && this.exceptUris.indexOf("#xpointer(/)") !== -1)
                    break;

                // Need to exclude based on ExceptURI.  Only accept #id references.
                for (let uri of this.exceptUris)
                    if (this.IsTargetElement(<Element>node, uri.substring(1)))
                        break;

                let encryptedData = new EncryptedData();
                encryptedData.LoadXml(<Element>node);
                let symAlg: CryptoKey = this.EncryptedXml.GetDecryptionKey(encryptedData, encryptedData.EncryptionMethod.KeyAlgorithm);
                this.EncryptedXml.ReplaceData(<Element>node, this.EncryptedXml.DecryptData(encryptedData, symAlg));
            }

            return document;
        }

        public GetOutput(type: Type) {
            if (type === typeof (Stream))
                return GetOutput();
            throw new XmlError(XE.PARAM_REQUIRED, "type");
        }

        protected IsTargetElement(inputElement: Element, idValue: string): boolean {
            if ((inputElement == null) || (idValue == null))
                return false;
            return (inputElement.getAttribute("id") === idValue);
        }

        public LoadInnerXml(nodeList: NodeList): void {
            if (nodeList == null)
                throw new XmlError(XE.PARAM_REQUIRED, "nodeList");

            this.ClearExceptUris();
            for (let node of <any>nodeList) {
                let element = node as Element;
                if (element.namespaceURI === this.NamespaceUri && element.localName === "Except") {
                    let uri = element.getAttributeNS(this.NamespaceUri, "URI");
                    if (!(uri.indexOf("#") === 0))
                        throw new XmlError(XE.CRYPTOGRAPHIC, "A Uri attribute is required for a CipherReference element.");
                    this.AddExceptUri(uri);
                }
            }
        }

        public LoadInput(obj: Object): void {
            this.inputObj = obj;
        }
    }

}