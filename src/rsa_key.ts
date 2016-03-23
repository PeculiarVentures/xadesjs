namespace xadesjs {
    export class RSAKeyValue extends XmlObject implements KeyInfoClause {

        key: CryptoKey;

        public constructor(key: CryptoKey = null) {
            super();
            // TODO: check for CryptoKey algorithm
            this.key = key;
        }

        get Key(): CryptoKey {
            return this.key;
        }
        set Key(value: CryptoKey) {
            // TODO: check for CryptoKey algorithm
            this.key = value;
        }

        getXml(): Node {
            let doc = document.implementation.createDocument("", "", null);
            let xel = doc.createElementNS(XmlSignature.NamespaceURI, XmlSignature.ElementNames.KeyValue);
            xel.setAttribute("xmlns", XmlSignature.NamespaceURI);
            xel.textContent = this.key.ToXmlString(false);
            return xel;
        }

        loadXml(value: Node): void {
            if (value == null)
                throw new XmlError(XE.PARAM_REQUIRED, "value");

            if ((value.localName !== XmlSignature.ElementNames.KeyValue) || (value.namespaceURI !== XmlSignature.NamespaceURI))
                throw new XmlError(XE.CRYPTOGRAPHIC, "value");

            this.key.FromXmlString(value.textContent);
        }
    }
}