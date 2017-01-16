import { XmlElement, XmlAttribute } from "xml-core";

import { XmlXades } from "./xml";
import { XadesObject } from "./xml_base";

/**
 * 
 * <xsd:element name="QualifyingPropertiesReference" type="QualifyingPropertiesReferenceType"/>
 * <xsd:complexType name="QualifyingPropertiesReferenceType">
 *     <xsd:attribute name="URI" type="xsd:anyURI" use="required"/>
 *     <xsd:attribute name="Id" type="xsd:ID" use="optional"/>
 * </xsd:complexType>
 * 
 */

@XmlElement({ localName: XmlXades.ElementNames.QualifyingPropertiesReference })
export class QualifyingPropertiesReference extends XadesObject {

    @XmlAttribute({ localName: XmlXades.AttributeNames.URI, required: true })
    Uri: string;

    @XmlAttribute({ localName: XmlXades.AttributeNames.Id, defaultValue: "" })
    Id: string;

}   