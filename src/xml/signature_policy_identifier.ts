import { XmlElement, XmlChildElement, XmlContent } from "xml-core";
import { XmlNumberConverter, IConverter } from "xml-core";
import { Transforms } from "xmldsigjs";

import { XmlXades } from "./xml";
import { XadesObject, XadesCollection } from "./xml_base";
import { AnyCollection } from "./any";
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

@XmlElement({ localName: XmlXades.ElementNames.SigPolicyId })
export class SigPolicyId extends ObjectIdentifier { }

@XmlElement({ localName: XmlXades.ElementNames.SigPolicyHash })
export class SigPolicyHash extends DigestAlgAndValueType { }

@XmlElement({ localName: XmlXades.ElementNames.SigPolicyQualifier })
export class SigPolicyQualifier extends AnyCollection { }

@XmlElement({ localName: "int" })
export class Integer extends XadesObject {

    @XmlContent({ converter: XmlNumberConverter, required: true })
    Value: number;
}

@XmlElement({ localName: "IntegerList", parser: Integer })
export class IntegerList extends XadesCollection<Integer> { }

@XmlElement({ localName: XmlXades.ElementNames.NoticeRef })
export class NoticeReference extends XadesObject {

    @XmlChildElement({
        localName: XmlXades.ElementNames.Organization,
        namespaceURI: XmlXades.NamespaceURI,
        prefix: XmlXades.DefaultPrefix,
        required: true
    })
    Organization: string;

    @XmlChildElement({ localName: XmlXades.ElementNames.NoticeNumbers, parser: IntegerList, required: true })
    NoticeNumbers: IntegerList;

}

@XmlElement({ localName: XmlXades.ElementNames.SPUserNotice })
export class SPUserNotice extends XadesObject {

    @XmlChildElement({ localName: XmlXades.ElementNames.NoticeRef, parser: NoticeReference })
    NoticeRef: NoticeReference;

    @XmlChildElement({
        localName: XmlXades.ElementNames.ExplicitText,
        namespaceURI: XmlXades.NamespaceURI,
        prefix: XmlXades.DefaultPrefix,
    })
    ExplicitText: string;

}

@XmlElement({ localName: XmlXades.ElementNames.SPURI })
export class SPURI extends XadesObject {

    @XmlContent()
    Value: string;

}

@XmlElement({ localName: XmlXades.ElementNames.SigPolicyQualifiers, parser: SigPolicyQualifier })
export class SigPolicyQualifiers extends XadesCollection<SigPolicyQualifier> { }

@XmlElement({ localName: XmlXades.ElementNames.SignaturePolicyId })
export class SignaturePolicyId extends XadesObject {

    @XmlChildElement({ localName: XmlXades.ElementNames.SigPolicyId, parser: SigPolicyId, required: true })
    SigPolicyId: SigPolicyId;

    @XmlChildElement({ parser: Transforms })
    Transforms: Transforms;

    @XmlChildElement({ localName: XmlXades.ElementNames.SigPolicyHash, parser: SigPolicyHash, required: true })
    SigPolicyHash: SigPolicyHash;

    @XmlChildElement({ localName: XmlXades.ElementNames.SigPolicyQualifiers, parser: SigPolicyQualifiers })
    SigPolicyQualifiers: SigPolicyQualifiers;
}

const XmlSignaturePolicyImpliedConverter: IConverter<boolean> = {
    set: (value: string) => {
        // if SignaturePolicyImplied exists then return true
        return true;
    },
    get: (value: boolean) => {
        return "";
    }
};

@XmlElement({ localName: XmlXades.ElementNames.SignaturePolicyIdentifier })
export class SignaturePolicyIdentifier extends XadesObject {

    @XmlChildElement({
        localName: XmlXades.ElementNames.SignaturePolicyId,
        namespaceURI: XmlXades.NamespaceURI,
        prefix: XmlXades.DefaultPrefix,
        parser: SignaturePolicyId,
    })
    SignaturePolicyId: SignaturePolicyId;

    @XmlChildElement({
        localName: XmlXades.ElementNames.SignaturePolicyImplied,
        namespaceURI: XmlXades.NamespaceURI,
        prefix: XmlXades.DefaultPrefix,
        converter: XmlSignaturePolicyImpliedConverter,
        defaultValue: false
    })
    SignaturePolicyImplied: boolean;
}
