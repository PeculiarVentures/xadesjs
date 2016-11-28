namespace xadesjs.pro {
    /**
     * The ClaimedRoles element contains a sequence of roles claimed by
     * the signer but not certified. Additional contents types may be
     * defined on a domain application basis and be part of this element.
     * The namespaces given to the corresponding XML schemas will allow
     * their unambiguous identification in the case these roles use XML.
     */
    export class ClaimedRoles extends XmlXadesCollection<ClaimedRole> {

        // Protetced methods
        protected GetXmlObjectName() {
            return XmlXades.ElementNames.ClaimedRoles;
        }

        protected OnLoadChildElement(element: Element): any {
            if (element.namespaceURI === XmlXades.NamespaceURI && element.localName === XmlXades.ElementNames.ClaimedRole) {
                let claimedRole = new ClaimedRole();
                claimedRole.LoadXml(element);
                return claimedRole;
            }
        }

    }

}