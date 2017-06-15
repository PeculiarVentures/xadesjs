import { XmlElement, XmlChildElement, XmlAttribute } from "xml-core";

import { XmlXades } from "./xml";
import { XadesObject } from "./xml_base";
import { SignedProperties } from "./signed_properties";
import { UnsignedProperties } from "./unsigned_properties";

/**
 *
 * <xsd:element name="QualifyingProperties" type="QualifyingPropertiesType"/>
 * <xsd:complexType name="QualifyingPropertiesType">
 *     <xsd:sequence>
 *         <xsd:element name="SignedProperties" type="SignedPropertiesType" minOccurs="0"/>
 *         <xsd:element name="UnsignedProperties" type="UnsignedPropertiesType" minOccurs="0"/>
 *     </xsd:sequence>
 *     <xsd:attribute name="Target" type="xsd:anyURI" use="required"/>
 *     <xsd:attribute name="Id" type="xsd:ID" use="optional"/>
 * </xsd:complexType>
 *
 */

@XmlElement({
    localName: XmlXades.ElementNames.QualifyingProperties
})
export class QualifyingProperties extends XadesObject {

    @XmlAttribute({ localName: XmlXades.AttributeNames.Target, required: true })
    Target: string;

    @XmlAttribute({ localName: XmlXades.AttributeNames.Id, defaultValue: "" })
    Id: string;

    @XmlChildElement({ parser: SignedProperties })
    SignedProperties: SignedProperties;

    @XmlChildElement({ parser: UnsignedProperties })
    UnsignedProperties: UnsignedProperties;
}