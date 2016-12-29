import { XmlElement, XmlChildElement, XmlAttribute } from "xml-core";

import { XmlXades } from "./xml";
import { XadesObject } from "./xml_base";
import { UnsignedSignatureProperties } from "./unsigned_signature_properties";
import { UnsignedDataObjectProperties } from "./unsigned_data_object_properties";

/**
 * 
 * <xsd:element name="UnsignedProperties" type="UnsignedPropertiesType"/>
 * <xsd:complexType name="UnsignedPropertiesType">
 *     <xsd:sequence>
 *         <xsd:element name="UnsignedSignatureProperties" type="UnsignedSignaturePropertiesType" minOccurs="0"/>
 *         <xsd:element name="UnsignedDataObjectProperties" type="UnsignedDataObjectPropertiesType" minOccurs="0"/>
 *     </xsd:sequence>
 *     <xsd:attribute name="Id" type="xsd:ID" use="optional"/>
 * </xsd:complexType>
 * 
 */

@XmlElement({
    localName: XmlXades.ElementNames.UnsignedProperties
})
export class UnsignedProperties extends XadesObject {

    @XmlAttribute({ localName: XmlXades.AttributeNames.Id, defaultValue: "" })
    Id: string;

    @XmlChildElement({parser: UnsignedSignatureProperties})
    UnsignedSignatureProperties: UnsignedSignatureProperties;

    @XmlChildElement({parser: UnsignedDataObjectProperties})
    UnsignedDataObjectProperties: UnsignedDataObjectProperties;

}