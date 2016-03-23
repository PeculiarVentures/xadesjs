namespace xadesjs {
    export class KeyInfoName extends XmlObject implements KeyInfoClause {

        private name: string;

        public constructor(keyName?: string) {
            super();
            this.name = keyName;
        }

        get Value(): string {
            return name;
        }
        set Value(value: string) {
            this.name = value;
        }

        getXml(): Node {
            let doc = document.implementation.createDocument("", "", null);
            let xel = doc.createElementNS(XmlSignature.NamespaceURI, XmlSignature.ElementNames.KeyName);
            xel.textContent = name;
            return xel;
        }

        loadXml(value: Node): void {
            if (value == null)
                throw new XmlError(XE.PARAM_REQUIRED, "value");
            if ((value.localName !== XmlSignature.ElementNames.KeyName) || (value.namespaceURI !== XmlSignature.NamespaceURI))
                name = "";
            else
                name = value.textContent;
        }
    }
}