// import * as XmlCore from "xml-core";
import { XmlElement, XmlContent, XmlAttribute, XmlChildElement } from "xml-core";

import { XmlXades } from "./xml";
import { XadesObject, XadesCollection } from "./xml_base";

/**
 * 
 * <!-- Start ObjectIdentifierType-->
 * <xsd:element name="ObjectIdentifier" type="ObjectIdentifierType"/>
 * <xsd:complexType name="ObjectIdentifierType">
 *   <xsd:sequence>
 *     <xsd:element name="Identifier" type="IdentifierType"/>
 *     <xsd:element name="Description" type="xsd:string" minOccurs="0"/>
 *     <xsd:element name="DocumentationReferences" type="DocumentationReferencesType" minOccurs="0"/>
 *   </xsd:sequence>
 * </xsd:complexType>
 * <xsd:complexType name="IdentifierType">
 *   <xsd:simpleContent>
 *     <xsd:extension base="xsd:anyURI">
 *       <xsd:attribute name="Qualifier" type="QualifierType" use="optional"/>
 *     </xsd:extension>
 *   </xsd:simpleContent>
 * </xsd:complexType>
 * <xsd:simpleType name="QualifierType">
 *   <xsd:restriction base="xsd:string">
 *     <xsd:enumeration value="OIDAsURI"/>
 *     <xsd:enumeration value="OIDAsURN"/>
 *   </xsd:restriction>
 * </xsd:simpleType>
 * <xsd:complexType name="DocumentationReferencesType">
 *   <xsd:sequence maxOccurs="unbounded">
 *      <xsd:element name="DocumentationReference" type="xsd:anyURI"/>
 *   </xsd:sequence>
 * </xsd:complexType>
 * <!-- End ObjectIdentifierType-->
 * 
 */

@XmlElement({
    localName: XmlXades.ElementNames.Identifier
})
export class Identifier extends XadesObject {

    @XmlAttribute({
        localName: XmlXades.AttributeNames.Qualifier,
    })
    Qualifier: "OIDAsURI" | "OIDAsURN"; // 

    @XmlContent({
        defaultValue: "",
        required: true
    })
    Uri: string;

    protected OnLoadXml(e: Element) {
        if (e.textContent)
            this.Uri = e.textContent;
    }

    protected OnGetXml(e: Element) {
        if (this.Uri)
            e.textContent = this.Uri;
    }
}

@XmlElement({
    localName: XmlXades.ElementNames.DocumentationReference,
})
export class DocumentationReference extends XadesObject {

    @XmlContent({
        defaultValue: "",
        required: true
    })
    Uri: string;

    protected OnLoadXml(e: Element) {
        if (e.textContent)
            this.Uri = e.textContent;
    }

    protected OnGetXml(e: Element) {
        if (this.Uri)
            e.textContent = this.Uri;
    }

}

@XmlElement({
    localName: XmlXades.ElementNames.DocumentationReferences,
    parser: DocumentationReference,
})
export class DocumentationReferences extends XadesCollection<DocumentationReference> { }

@XmlElement({
    localName: XmlXades.ElementNames.ObjectIdentifier,
})
export class ObjectIdentifier extends XadesObject {

    @XmlChildElement({
        parser: Identifier,
        required: true,
    })
    Identifier: Identifier;

    @XmlChildElement({
        localName: XmlXades.ElementNames.Description,
        namespaceURI: XmlXades.NamespaceURI,
        prefix: XmlXades.DefaultPrefix,
        defaultValue: "",
    })
    Description: string;

    @XmlChildElement({
        parser: DocumentationReferences,
    })
    DocumentationReferences: DocumentationReferences;

}