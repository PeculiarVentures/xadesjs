namespace xadesjs.pro {
	/**
	 * The CertRefs element contains a collection of Cert elements
	 */
    export class CertRefs extends XmlXadesCollection<Cert> {
        // Protetced methods
        protected GetXmlObjectName() {
            return XmlXades.ElementNames.CertRefs;
        }

        protected OnLoadChildElement(element: Element): any {
            if (element.namespaceURI === XmlXades.NamespaceURI && element.localName === XmlXades.ElementNames.Cert) {
                let obj = new ClaimedRole();
                obj.LoadXml(element);
                return obj;
            }
        }
    }
}
