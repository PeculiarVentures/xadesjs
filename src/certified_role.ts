namespace xadesjs.pro {

    /**
     * The CertifiedRoles element contains one or more wrapped attribute 
     * certificates for the signer
     */
    export class CertifiedRoles extends XmlXadesCollection<CertifiedRole> {

        // Protetced methods
        protected GetXmlObjectName() {
            return XmlXades.ElementNames.CertifiedRoles;
        }

        protected OnLoadChildElement(element: Element): any {
            if (element.namespaceURI === XmlXades.NamespaceURI && element.localName === XmlXades.ElementNames.CertifiedRoles) {
                let certifiedRoles = new CertifiedRoles();
                certifiedRoles.LoadXml(element);
                return certifiedRoles;
            }
        }

    }

    /**
    * The CertifiedRoles element contains one or more wrapped attribute
    * certificates for the signer
    */
    export class CertifiedRole extends EncapsulatedPKIData {

        public constructor() {
            super(XmlXades.ElementNames.CertifiedRole);
        }
    }

}