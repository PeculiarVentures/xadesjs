import { XmlElement, XmlAttribute } from "xml-core";

import { XmlXades } from "./xml";
import { XadesObject, XadesCollection } from "./xml_base";
import { XAdESTimeStamp } from "./xades_time_stamp";
import { CompleteCertificateRefs } from "./complete_certificate_refs";
import { CompleteRevocationRefs } from "./complete_revocation_refs";

/**
 * 
 * <xsd:element name="UnsignedSignatureProperties" type="UnsignedSignaturePropertiesType"/>
 * <xsd:complexType name="UnsignedSignaturePropertiesType">
 *     <xsd:choice maxOccurs="unbounded">
 *         <xsd:element name="CounterSignature" type="CounterSignatureType"/>
 *         <xsd:element name="SignatureTimeStamp" type="XAdESTimeStampType"/>
 *         <xsd:element name="CompleteCertificateRefs" type="CompleteCertificateRefsType"/>
 *         <xsd:element name="CompleteRevocationRefs" type="CompleteRevocationRefsType"/>
 *         <xsd:element name="AttributeCertificateRefs" type="CompleteCertificateRefsType"/>
 *         <xsd:element name="AttributeRevocationRefs" type="CompleteRevocationRefsType"/>
 *         <xsd:element name="SigAndRefsTimeStamp" type="XAdESTimeStampType"/>
 *         <xsd:element name="RefsOnlyTimeStamp" type="XAdESTimeStampType"/>
 *         <xsd:element name="CertificateValues" type="CertificateValuesType"/>
 *         <xsd:element name="RevocationValues" type="RevocationValuesType"/>
 *         <xsd:element name="AttrAuthoritiesCertValues" type="CertificateValuesType"/>
 *         <xsd:element name="AttributeRevocationValues" type="RevocationValuesType"/>
 *         <xsd:element name="ArchiveTimeStamp" type="XAdESTimeStampType"/>
 *         <xsd:any namespace="##other"/>
 *     </xsd:choice>
 *     <xsd:attribute name="Id" type="xsd:ID" use="optional"/>
 * </xsd:complexType>
 * 
 */

@XmlElement({ localName: XmlXades.ElementNames.SignatureTimeStamp })
export class SignatureTimeStamp extends XAdESTimeStamp implements UnsignedSignatureProperty { }

@XmlElement({ localName: XmlXades.ElementNames.SigAndRefsTimeStamp })
export class SigAndRefsTimeStamp extends XAdESTimeStamp implements UnsignedSignatureProperty { }

@XmlElement({ localName: XmlXades.ElementNames.RefsOnlyTimeStamp })
export class RefsOnlyTimeStamp extends XAdESTimeStamp implements UnsignedSignatureProperty { }

@XmlElement({ localName: XmlXades.ElementNames.ArchiveTimeStamp })
export class ArchiveTimeStamp extends XAdESTimeStamp implements UnsignedSignatureProperty { }

@XmlElement({ localName: XmlXades.ElementNames.AttributeCertificateRefs })
export class AttributeCertificateRefs extends CompleteCertificateRefs implements UnsignedSignatureProperty { }

@XmlElement({ localName: XmlXades.ElementNames.AttributeRevocationRefs })
export class AttributeRevocationRefs extends CompleteRevocationRefs implements UnsignedSignatureProperty { }

/**
 * Abstract class for UnsignedSignatureProperties
 * 
 * @export
 * @class UnsignedSignatureProperty
 * @extends {XadesObject}
 */
@XmlElement({ localName: "UnsignedSignatureProperty" })
export class UnsignedSignatureProperty extends XadesObject {
}

@XmlElement({ localName: XmlXades.ElementNames.UnsignedSignatureProperties, parser: UnsignedSignatureProperty })
export class UnsignedSignatureProperties extends XadesCollection<UnsignedSignatureProperty> {

    @XmlAttribute({ localName: XmlXades.AttributeNames.Id, defaultValue: "" })
    Id: string;

}