import { XmlElement, XmlChildElement, XmlAttribute } from "xml-core";

import { XmlXades } from "./xml";
import { XadesObject } from "./xml_base";
import { SignedSignatureProperties } from "./signed_signature_properties";
import { SignedDataObjectProperties } from "./signed_data_object_properties";


/**
 *
 * <xsd:element name="SignedProperties" type="SignedPropertiesType"/>
 * <xsd:complexType name="SignedPropertiesType">
 *     <xsd:sequence>
 *         <xsd:element name="SignedSignatureProperties" type="SignedSignaturePropertiesType" minOccurs="0"/>
 *         <xsd:element name="SignedDataObjectProperties" type="SignedDataObjectPropertiesType" minOccurs="0"/>
 *     </xsd:sequence>
 *     <xsd:attribute name="Id" type="xsd:ID" use="optional"/>
 * </xsd:complexType>
 *
 */

@XmlElement({
    localName: XmlXades.ElementNames.SignedProperties
})
export class SignedProperties extends XadesObject {

    @XmlAttribute({ localName: XmlXades.AttributeNames.Id, defaultValue: "" })
    Id: string;

    @XmlChildElement({parser: SignedSignatureProperties})
    SignedSignatureProperties: SignedSignatureProperties;

    @XmlChildElement({parser: SignedDataObjectProperties})
    SignedDataObjectProperties: SignedDataObjectProperties;

}