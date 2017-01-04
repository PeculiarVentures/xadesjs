import { XmlElement, XmlChildElement, XmlAttribute } from "xml-core";
import { XmlNumberConverter, XmlBase64Converter } from "xml-core";

import { XmlXades } from "./xml";
import { XadesObject, XadesCollection } from "./xml_base";
import { DigestAlgAndValueType } from "./signing_certificate";
import { XmlDateTimeConverter } from "./converter";
import { Any } from "./any";
import { UnsignedSignatureProperty } from "./unsigned_signature_properties";

/**
 * 
 * <xsd:element name="CompleteRevocationRefs" type="CompleteRevocationRefsType"/>
 * <xsd:complexType name="CompleteRevocationRefsType">
 *     <xsd:sequence>
 *         <xsd:element name="CRLRefs" type="CRLRefsType" minOccurs="0"/>
 *         <xsd:element name="OCSPRefs" type="OCSPRefsType" minOccurs="0"/>
 *         <xsd:element name="OtherRefs" type="OtherCertStatusRefsType" minOccurs="0"/>
 *     </xsd:sequence>
 *     <xsd:attribute name="Id" type="xsd:ID" use="optional"/>
 * </xsd:complexType>
 * <xsd:complexType name="CRLRefsType">
 *     <xsd:sequence>
 *         <xsd:element name="CRLRef" type="CRLRefType" maxOccurs="unbounded"/>
 *     </xsd:sequence>
 * </xsd:complexType>
 * <xsd:complexType name="CRLRefType">
 *     <xsd:sequence>
 *         <xsd:element name="DigestAlgAndValue" type="DigestAlgAndValueType"/>
 *         <xsd:element name="CRLIdentifier" type="CRLIdentifierType" minOccurs="0"/>
 *     </xsd:sequence>
 * </xsd:complexType>
 * <xsd:complexType name="CRLIdentifierType">
 *     <xsd:sequence>
 *         <xsd:element name="Issuer" type="xsd:string"/>
 *         <xsd:element name="IssueTime" type="xsd:dateTime"/>
 *         <xsd:element name="Number" type="xsd:integer" minOccurs="0"/>
 *     </xsd:sequence>
 *     <xsd:attribute name="URI" type="xsd:anyURI" use="optional"/>
 * </xsd:complexType>
 * <xsd:complexType name="OCSPRefsType">
 *     <xsd:sequence>
 *         <xsd:element name="OCSPRef" type="OCSPRefType" maxOccurs="unbounded"/>
 *     </xsd:sequence>
 * </xsd:complexType>
 * <xsd:complexType name="OCSPRefType">
 *     <xsd:sequence>
 *         <xsd:element name="OCSPIdentifier" type="OCSPIdentifierType"/>
 *         <xsd:element name="DigestAlgAndValue" type="DigestAlgAndValueType" minOccurs="0"/>
 *     </xsd:sequence>
 * </xsd:complexType>
 * <xsd:complexType name="ResponderIDType">
 *     <xsd:choice>
 *         <xsd:element name="ByName" type="xsd:string"/>
 *         <xsd:element name="ByKey" type="xsd:base64Binary"/>
 *     </xsd:choice>
 * </xsd:complexType>
 * <xsd:complexType name="OCSPIdentifierType">
 *     <xsd:sequence>
 *         <xsd:element name="ResponderID" type="ResponderIDType"/>
 *         <xsd:element name="ProducedAt" type="xsd:dateTime"/>
 *     </xsd:sequence>
 *     <xsd:attribute name="URI" type="xsd:anyURI" use="optional"/>
 * </xsd:complexType>
 * <xsd:complexType name="OtherCertStatusRefsType">
 *     <xsd:sequence>
 *         <xsd:element name="OtherRef" type="AnyType" maxOccurs="unbounded"/>
 *     </xsd:sequence>
 * </xsd:complexType>
 * 
 */

@XmlElement({ localName: XmlXades.ElementNames.OtherRef })
export class OtherRef extends Any { }

@XmlElement({ localName: XmlXades.ElementNames.OtherRefs })
export class OtherRefs extends XadesCollection<OtherRef> { }

@XmlElement({ localName: XmlXades.ElementNames.OCSPIdentifier })
export class ResponderID extends XadesObject {

    @XmlChildElement({
        localName: XmlXades.ElementNames.ByName,
        namespaceURI: XmlXades.NamespaceURI,
        prefix: XmlXades.DefaultPrefix,
        required: true,
    })
    ByName: string;

    @XmlChildElement({
        localName: XmlXades.ElementNames.ByKey,
        namespaceURI: XmlXades.NamespaceURI,
        prefix: XmlXades.DefaultPrefix,
        converter: XmlBase64Converter,
        required: true,
    })
    ByKey: Uint8Array;

}

@XmlElement({ localName: XmlXades.ElementNames.OCSPIdentifier })
export class OCSPIdentifier extends XadesObject {

    @XmlAttribute({ localName: XmlXades.AttributeNames.URI, defaultValue: "" })
    URI: string;

    @XmlChildElement({ parser: ResponderID, required: true })
    ResponderID: ResponderID;

    @XmlChildElement({
        localName: XmlXades.ElementNames.IssueTime,
        namespaceURI: XmlXades.NamespaceURI,
        prefix: XmlXades.DefaultPrefix,
        converter: XmlDateTimeConverter,
        required: true
    })
    ProducedAt: Date;

}

@XmlElement({ localName: XmlXades.ElementNames.OCSPRef })
export class OCSPRef extends XadesObject {

    @XmlChildElement({ parser: OCSPIdentifier })
    OCSPIdentifier: OCSPIdentifier;

    @XmlChildElement({ parser: DigestAlgAndValueType, required: true })
    DigestAlgAndValue: DigestAlgAndValueType;
}

@XmlElement({ localName: XmlXades.ElementNames.OCSPRefs })
export class OCSPRefs extends XadesCollection<OCSPRef> { }

@XmlElement({ localName: XmlXades.ElementNames.CRLIdentifier })
export class CRLIdentifier extends XadesObject {

    @XmlAttribute({ localName: XmlXades.AttributeNames.URI, defaultValue: "" })
    URI: string;

    @XmlChildElement({
        localName: XmlXades.ElementNames.Issuer,
        namespaceURI: XmlXades.NamespaceURI,
        prefix: XmlXades.DefaultPrefix,
        required: true
    })
    Issuer: string;

    @XmlChildElement({
        localName: XmlXades.ElementNames.IssueTime,
        namespaceURI: XmlXades.NamespaceURI,
        prefix: XmlXades.DefaultPrefix,
        converter: XmlDateTimeConverter,
        required: true
    })
    IssueTime: Date;

    @XmlChildElement({
        localName: XmlXades.ElementNames.Number,
        namespaceURI: XmlXades.NamespaceURI,
        prefix: XmlXades.DefaultPrefix,
        converter: XmlNumberConverter,
    })
    Number: number;
}

@XmlElement({ localName: XmlXades.ElementNames.CRLRef })
export class CRLRef extends XadesObject {
    @XmlChildElement({ parser: DigestAlgAndValueType, required: true })
    DigestAlgAndValue: DigestAlgAndValueType;

    @XmlChildElement({ parser: CRLIdentifier })
    CRLIdentifier: CRLIdentifier;
}

@XmlElement({ localName: XmlXades.ElementNames.CRLRefs })
export class CRLRefs extends XadesCollection<CRLRef> { }

@XmlElement({ localName: XmlXades.ElementNames.CompleteRevocationRefs })
export class CompleteRevocationRefs extends XadesObject implements UnsignedSignatureProperty {

    @XmlAttribute({ localName: XmlXades.AttributeNames.Id, defaultValue: "" })
    Id: string;

    @XmlChildElement({ parser: CRLRefs })
    CRLRefs: CRLRefs;

    @XmlChildElement({ parser: OCSPRefs })
    OCSPRefs: OCSPRefs;

    @XmlChildElement({ parser: OtherRefs })
    OtherRefs: OtherRefs;

}