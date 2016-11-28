namespace xadesjs.pro {

    /**
     * <xsd:complexType name="DocumentationReferencesType">  
     *   <xsd:sequence maxOccurs="unbounded">
     *     <xsd:element name="DocumentationReference" type="xsd:anyURI"/>
     *   </xsd:sequence>
     * </xsd:complexType>
     */

	/**
	 * This class contains a collection of DocumentationReferences
	 */
    export class DocumentationReferences extends XmlXadesCollection<DocumentationReference> {

        // Protetced methods
        protected GetXmlObjectName() {
            return XmlXades.ElementNames.DocumentationReferences;
        }

        protected OnLoadChildElement(element: Element): any {
            if (element.namespaceURI === XmlXades.NamespaceURI && element.localName === XmlXades.ElementNames.DocumentationReference) {
                let item = new DocumentationReference();
                item.LoadXml(element);
                return item;
            }
        }

    }
}
