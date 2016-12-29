import { XmlElement, XmlChildElement, XmlContent } from "xml-core";
import { XmlNumberConverter } from "xml-core";
import { Transforms } from "xmldsigjs";

import { XmlXades } from "./xml";
import { XadesObject, XadesCollection } from "./xml_base";
import { Any } from "./any";
import { ObjectIdentifier } from "./object_identifier";
import { DigestAlgAndValueType } from "./signing_certificate";

/**
 * 
 * <xsd:element name="SignaturePolicyIdentifier" type="SignaturePolicyIdentifierType"/>
 * <xsd:complexType name="SignaturePolicyIdentifierType">
 *     <xsd:choice>
 *         <xsd:element name="SignaturePolicyId" type="SignaturePolicyIdType"/>
 *         <xsd:element name="SignaturePolicyImplied"/>
 *     </xsd:choice>
 * </xsd:complexType>
 * <xsd:complexType name="SignaturePolicyIdType">
 *     <xsd:sequence>
 *         <xsd:element name="SigPolicyId" type="ObjectIdentifierType"/>
 *         <xsd:element ref="ds:Transforms" minOccurs="0"/>
 *         <xsd:element name="SigPolicyHash" type="DigestAlgAndValueType"/>
 *         <xsd:element name="SigPolicyQualifiers" type="SigPolicyQualifiersListType" minOccurs="0"/>
 *     </xsd:sequence>
 * </xsd:complexType>
 * <xsd:complexType name="SigPolicyQualifiersListType">
 *     <xsd:sequence>
 *         <xsd:element name="SigPolicyQualifier" type="AnyType" maxOccurs="unbounded"/>
 *     </xsd:sequence>
 * </xsd:complexType>
 * <xsd:element name="SPURI" type="xsd:anyURI"/>
 * <xsd:element name="SPUserNotice" type="SPUserNoticeType"/>
 * <xsd:complexType name="SPUserNoticeType">
 *     <xsd:sequence>
 *         <xsd:element name="NoticeRef" type="NoticeReferenceType" minOccurs="0"/>
 *         <xsd:element name="ExplicitText" type="xsd:string" minOccurs="0"/>
 *     </xsd:sequence>
 * </xsd:complexType>
 * <xsd:complexType name="NoticeReferenceType">
 *     <xsd:sequence>
 *         <xsd:element name="Organization" type="xsd:string"/>
 *         <xsd:element name="NoticeNumbers" type="IntegerListType"/>
 *     </xsd:sequence>
 * </xsd:complexType>
 * <xsd:complexType name="IntegerListType">
 *     <xsd:sequence>
 *         <xsd:element name="int" type="xsd:integer" minOccurs="0" maxOccurs="unbounded"/>
 *     </xsd:sequence>
 * </xsd:complexType>
 *  
 */

@XmlElement({ localName: "int" })
export class Integer extends XadesObject {

    @XmlContent({ converter: XmlNumberConverter, required: true })
    Value: number;
}

@XmlElement({ localName: "IntegerList", parser: Integer })
export class IntegerList extends XadesCollection<Integer> { }

@XmlElement({ localName: XmlXades.ElementNames.NoticeRef })
export class NoticeReference extends XadesObject {

    @XmlChildElement({ localName: XmlXades.ElementNames.Organization, required: true })
    Organization: string;

    @XmlChildElement({ localName: XmlXades.ElementNames.NoticeNumbers, parser: IntegerList, required: true })
    NoticeNumbers: IntegerList;

}

export class SPUserNotice extends XadesObject {

    @XmlChildElement({ localName: XmlXades.ElementNames.NoticeRef, parser: NoticeReference })
    NoticeRef: NoticeReference;

    @XmlChildElement({ localName: XmlXades.ElementNames.ExplicitText })
    ExplicitText: string;

}

@XmlElement({ localName: XmlXades.ElementNames.SigPolicyQualifier })
export class SigPolicyQualifier extends Any { }

@XmlElement({ localName: XmlXades.ElementNames.SigPolicyQualifiers, parser: SigPolicyQualifier })
export class SigPolicyQualifiers extends XadesCollection<SigPolicyQualifier> { }

export class SignaturePolicyId extends XadesObject {

    @XmlChildElement({ localName: XmlXades.ElementNames.SigPolicyId, required: true })
    SigPolicyId: ObjectIdentifier;

    @XmlChildElement({ parser: Transforms })
    Transforms: Transforms;

    @XmlChildElement({ localName: XmlXades.ElementNames.SigPolicyHash, parser: DigestAlgAndValueType, required: true })
    SigPolicyHash: DigestAlgAndValueType;


    @XmlChildElement({ localName: XmlXades.ElementNames.SigPolicyQualifiers, parser: SigPolicyQualifiers })
    SigPolicyQualifiers: SigPolicyQualifiers;
}

export class SignaturePolicyIdentifier extends XadesObject {

    @XmlChildElement({ localName: XmlXades.ElementNames.SignaturePolicyId, required: true })
    SignaturePolicyId: SignaturePolicyId;

    @XmlChildElement({ localName: XmlXades.ElementNames.SignaturePolicyImplied, required: true })
    SignaturePolicyImplied: string;
}