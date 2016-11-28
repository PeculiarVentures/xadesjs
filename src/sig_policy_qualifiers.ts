namespace xadesjs.pro {

    /**
     * <xsd:complexType name="SigPolicyQualifiersListType">
     *   <xsd:sequence>
     *     <xsd:element name="SigPolicyQualifier" type="AnyType" maxOccurs="unbounded"/>
     *   </xsd:sequence>
     * </xsd:complexType>
     */

    /**
     * This class contains a collection of SigPolicyQualifiers
     */
    export class SigPolicyQualifiers extends XmlXadesCollection<ISigPolicyQualifier> {

        // Protetced methods
        protected GetXmlObjectName() {
            return XmlXades.ElementNames.SigPolicyQualifiers;
        }

        protected OnLoadChildElement(element: Element): any {
            if (element.namespaceURI === XmlXades.NamespaceURI && element.localName === XmlXades.ElementNames.SigPolicyQualifier) {
                let item: ISigPolicyQualifier = null;
                let nodes = element.childNodes;

                // Get first child Element
                for (let i = 0; i < nodes.length; i++) {
                    let node = nodes.item(i) as Element;
                    if (node.nodeType !== XmlNodeType.Element)
                        continue;
                    switch (node.localName) {
                        case XmlXades.ElementNames.SPUserNotice:
                            item = new SPUserNotice();
                            break;
                        case XmlXades.ElementNames.SPURI:
                            item = new SPUri();
                            break;
                        default:
                            item = new SigPolicyQualifier();
                    }
                    item.LoadXml(element);
                    break;
                }
                return item;
            }
        }

    }
}
