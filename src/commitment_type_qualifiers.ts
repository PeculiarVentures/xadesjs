namespace xadesjs.pro {

    /**
     * <xsd:complexType name="CommitmentTypeQualifiersListType">
     *   <xsd:sequence>
     *     <xsd:element name="CommitmentTypeQualifier" type="AnyType" minOccurs="0" maxOccurs="unbounded"/>
     *   </xsd:sequence>
     * </xsd:complexType>
     */

    /**
     * The CommitmentTypeQualifier element provides means to include
     * additional qualifying information on the commitment made by the signer
     */
    export class CommitmentTypeQualifiers extends XmlXadesCollection<CommitmentTypeQualifier> {

        // Protetced methods
        protected GetXmlObjectName() {
            return XmlXades.ElementNames.CommitmentTypeQualifiers;
        }

        protected OnLoadChildElement(element: Element): any {
            if (element.namespaceURI === XmlXades.NamespaceURI && element.localName === XmlXades.ElementNames.CommitmentTypeQualifier) {
                let item = new CommitmentTypeQualifier();
                item.LoadXml(element);
                return item;
            }
        }

    }
}
