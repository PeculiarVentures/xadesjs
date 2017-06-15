import { XmlElement, XmlChildElement, XmlAttribute } from "xml-core";

import { XmlXades } from "./xml";
import { XadesObject, XadesCollection } from "./xml_base";
import { EncapsulatedPKIData } from "./encapsulated_pki_data";

/**
 *
 * <xsd:element name="RevocationValues" type="RevocationValuesType"/>
 * <xsd:complexType name="RevocationValuesType">
 *     <xsd:sequence>
 *         <xsd:element name="CRLValues" type="CRLValuesType" minOccurs="0"/>
 *         <xsd:element name="OCSPValues" type="OCSPValuesType" minOccurs="0"/>
 *         <xsd:element name="OtherValues" type="OtherCertStatusValuesType" minOccurs="0"/>
 *     </xsd:sequence>
 *     <xsd:attribute name="Id" type="xsd:ID" use="optional"/>
 * </xsd:complexType>
 * <xsd:complexType name="CRLValuesType">
 *     <xsd:sequence>
 *         <xsd:element name="EncapsulatedCRLValue" type="EncapsulatedPKIDataType" maxOccurs="unbounded"/>
 *     </xsd:sequence>
 * </xsd:complexType>
 * <xsd:complexType name="OCSPValuesType">
 *     <xsd:sequence>
 *         <xsd:element name="EncapsulatedOCSPValue" type="EncapsulatedPKIDataType" maxOccurs="unbounded"/>
 *     </xsd:sequence>
 * </xsd:complexType>
 * <xsd:complexType name="OtherCertStatusValuesType">
 *     <xsd:sequence>
 *         <xsd:element name="OtherValue" type="AnyType" maxOccurs="unbounded"/>
 *     </xsd:sequence>
 * </xsd:complexType>
 *
 */

@XmlElement({ localName: XmlXades.ElementNames.OtherValue })
export class OtherValue extends EncapsulatedPKIData { }

@XmlElement({ localName: XmlXades.ElementNames.OCSPValues, parser: OtherValue })
export class OtherValues extends XadesCollection<OtherValue> { }

@XmlElement({ localName: XmlXades.ElementNames.EncapsulatedOCSPValue })
export class EncapsulatedOCSPValue extends EncapsulatedPKIData { }

@XmlElement({ localName: XmlXades.ElementNames.OCSPValues })
export class OCSPValues extends XadesCollection<EncapsulatedOCSPValue> { }

@XmlElement({ localName: XmlXades.ElementNames.EncapsulatedCRLValue })
export class EncapsulatedCRLValue extends EncapsulatedPKIData { }

@XmlElement({ localName: XmlXades.ElementNames.CRLValues, parser: EncapsulatedCRLValue })
export class CRLValues extends XadesCollection<EncapsulatedCRLValue> { }

@XmlElement({ localName: XmlXades.ElementNames.RevocationValues })
export class RevocationValues extends XadesObject {

    @XmlAttribute({ localName: XmlXades.AttributeNames.Id, defaultValue: "" })
    Id: string;

    @XmlChildElement({ parser: CRLValues })
    CRLValues: CRLValues;

    @XmlChildElement({ parser: OCSPValues })
    OCSPValues: OCSPValues;

    @XmlChildElement({ parser: OtherValues })
    OtherValues: OtherValues;

}