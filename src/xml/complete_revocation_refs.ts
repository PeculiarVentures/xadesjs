import { XmlAttribute, XmlChildElement, XmlElement } from "xml-core";
import { XmlBase64Converter, XmlNumberConverter } from "xml-core";

import { Any } from "./any";
import { XadesDateTime } from "./date_time";
import { DigestAlgAndValueType } from "./signing_certificate";
import { UnsignedSignatureProperty } from "./unsigned_signature_properties";
import { XmlXades } from "./xml";
import { XadesCollection, XadesObject } from "./xml_base";

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
    public ByName: string;

    @XmlChildElement({
        localName: XmlXades.ElementNames.ByKey,
        namespaceURI: XmlXades.NamespaceURI,
        prefix: XmlXades.DefaultPrefix,
        converter: XmlBase64Converter,
        required: true,
    })
    public ByKey: Uint8Array;

}

@XmlElement({ localName: XmlXades.ElementNames.OCSPIdentifier })
export class OCSPIdentifier extends XadesObject {

    @XmlAttribute({ localName: XmlXades.AttributeNames.URI, defaultValue: "" })
    public URI: string;

    @XmlChildElement({ parser: ResponderID, required: true })
    public ResponderID: ResponderID;

    @XmlChildElement({
        localName: XmlXades.ElementNames.IssueTime,
        parser: XadesDateTime,
        required: true,
    })
    public ProducedAt: XadesDateTime;

}

@XmlElement({ localName: XmlXades.ElementNames.OCSPRef })
export class OCSPRef extends XadesObject {

    @XmlChildElement({ parser: OCSPIdentifier })
    public OCSPIdentifier: OCSPIdentifier;

    @XmlChildElement({ parser: DigestAlgAndValueType, required: true })
    public DigestAlgAndValue: DigestAlgAndValueType;
}

@XmlElement({ localName: XmlXades.ElementNames.OCSPRefs })
export class OCSPRefs extends XadesCollection<OCSPRef> { }

@XmlElement({ localName: XmlXades.ElementNames.CRLIdentifier })
export class CRLIdentifier extends XadesObject {

    @XmlAttribute({ localName: XmlXades.AttributeNames.URI, defaultValue: "" })
    public URI: string;

    @XmlChildElement({
        localName: XmlXades.ElementNames.Issuer,
        namespaceURI: XmlXades.NamespaceURI,
        prefix: XmlXades.DefaultPrefix,
        required: true,
    })
    public Issuer: string;

    @XmlChildElement({
        localName: XmlXades.ElementNames.IssueTime,
        parser: XadesDateTime,
        required: true,
    })
    public IssueTime: XadesDateTime;

    @XmlChildElement({
        localName: XmlXades.ElementNames.Number,
        namespaceURI: XmlXades.NamespaceURI,
        prefix: XmlXades.DefaultPrefix,
        converter: XmlNumberConverter,
    })
    public Number: number;
}

@XmlElement({ localName: XmlXades.ElementNames.CRLRef })
export class CRLRef extends XadesObject {
    @XmlChildElement({ parser: DigestAlgAndValueType, required: true })
    public DigestAlgAndValue: DigestAlgAndValueType;

    @XmlChildElement({ parser: CRLIdentifier })
    public CRLIdentifier: CRLIdentifier;
}

@XmlElement({ localName: XmlXades.ElementNames.CRLRefs })
export class CRLRefs extends XadesCollection<CRLRef> { }

@XmlElement({ localName: XmlXades.ElementNames.CompleteRevocationRefs })
export class CompleteRevocationRefs extends XadesObject implements UnsignedSignatureProperty {

    @XmlAttribute({ localName: XmlXades.AttributeNames.Id, defaultValue: "" })
    public Id: string;

    @XmlChildElement({ parser: CRLRefs })
    public CRLRefs: CRLRefs;

    @XmlChildElement({ parser: OCSPRefs })
    public OCSPRefs: OCSPRefs;

    @XmlChildElement({ parser: OtherRefs })
    public OtherRefs: OtherRefs;

}
