import {
  XmlAttribute, XmlElement, XmlNodeType,
} from 'xml-core';
import { CertificateValues } from './certificate_values';
import { CompleteCertificateRefs } from './complete_certificate_refs';
import { CompleteRevocationRefs } from './complete_revocation_refs';
import { CounterSignature } from './counter_signature';
import { RevocationValues } from './revocation_values';
import { XAdESTimeStamp } from './xades_time_stamp';
import { XmlXades } from './xml';
import { XadesCollection, XadesObject } from './xml_base';

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
export class AttributeCertificateRefs
  extends CompleteCertificateRefs implements UnsignedSignatureProperty { }

@XmlElement({ localName: XmlXades.ElementNames.AttributeRevocationRefs })
export class AttributeRevocationRefs
  extends CompleteRevocationRefs implements UnsignedSignatureProperty { }

@XmlElement({ localName: XmlXades.ElementNames.AttrAuthoritiesCertValues })
export class AttrAuthoritiesCertValues
  extends CertificateValues implements UnsignedSignatureProperty { }

@XmlElement({ localName: XmlXades.ElementNames.AttributeRevocationValues })
export class AttributeRevocationValues
  extends RevocationValues implements UnsignedSignatureProperty { }

/**
 * Abstract class for UnsignedSignatureProperties
 *
 * @export
 * @class UnsignedSignatureProperty
 * @extends {XadesObject}
 */
@XmlElement({ localName: 'UnsignedSignatureProperty' })
export class UnsignedSignatureProperty extends XadesObject {
}

@XmlElement({
  localName: XmlXades.ElementNames.UnsignedSignatureProperties, parser: UnsignedSignatureProperty,
})
export class UnsignedSignatureProperties extends XadesCollection<UnsignedSignatureProperty> {
  @XmlAttribute({
    localName: XmlXades.AttributeNames.Id, defaultValue: '',
  })
  public Id: string;

  public OnLoadXml(element: Element) {
    for (let i = 0; i < element.childNodes.length; i++) {
      const node = element.childNodes.item(i);

      if (node.nodeType !== XmlNodeType.Element) {
        continue;
      }

      let XmlClass: typeof UnsignedSignatureProperty | undefined;

      switch ((node as Element).localName) {
        case XmlXades.ElementNames.CounterSignature:
          XmlClass = CounterSignature;

          break;
        case XmlXades.ElementNames.SignatureTimeStamp:
          XmlClass = SignatureTimeStamp;

          break;
        case XmlXades.ElementNames.CompleteCertificateRefs:
          XmlClass = CompleteCertificateRefs;

          break;
        case XmlXades.ElementNames.CompleteRevocationRefs:
          XmlClass = CompleteRevocationRefs;

          break;
        case XmlXades.ElementNames.AttributeCertificateRefs:
          XmlClass = AttributeCertificateRefs;

          break;
        case XmlXades.ElementNames.AttributeRevocationRefs:
          XmlClass = AttributeRevocationRefs;

          break;
        case XmlXades.ElementNames.SigAndRefsTimeStamp:
          XmlClass = SigAndRefsTimeStamp;

          break;
        case XmlXades.ElementNames.RefsOnlyTimeStamp:
          XmlClass = RefsOnlyTimeStamp;

          break;
        case XmlXades.ElementNames.CertificateValues:
          XmlClass = CertificateValues;

          break;
        case XmlXades.ElementNames.RevocationValues:
          XmlClass = RevocationValues;

          break;
        case XmlXades.ElementNames.AttrAuthoritiesCertValues:
          XmlClass = AttrAuthoritiesCertValues;

          break;
        case XmlXades.ElementNames.AttributeRevocationValues:
          XmlClass = AttributeRevocationValues;

          break;
        case XmlXades.ElementNames.ArchiveTimeStamp:
          XmlClass = ArchiveTimeStamp;

          break;
      }

      if (XmlClass) {
        const item = XmlClass.LoadXml(node as Element);

        this.Add(item);
      }
    }
  }
}
