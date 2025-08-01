import {
  XmlAttribute, XmlChildElement, XmlElement,
} from 'xml-core';
import { XadesDateTime } from './date_time';
import { SignaturePolicyIdentifier } from './signature_policy_identifier';
import { SignatureProductionPlace } from './signature_product_place';
import { SignerRole } from './signer_role';
import { SigningCertificate } from './signing_certificate';
import { SigningCertificateV2 } from './signing_certificate_v2';
import { XmlXades } from './xml';
import { XadesObject } from './xml_base';

/**
 *
 * <xsd:element name="SignedSignatureProperties" type="SignedSignaturePropertiesType"/>
 * <xsd:complexType name="SignedSignaturePropertiesType">
 *   <xsd:sequence>
 *     <xsd:element ref="SigningTime" minOccurs="0"/>
 *     <xsd:element ref="SigningCertificate" minOccurs="0"/>
 *     <xsd:element ref="SigningCertificateV2" minOccurs="0"/>
 *     <xsd:element ref="SignaturePolicyIdentifier" minOccurs="0"/>
 *     <xsd:element ref="SignatureProductionPlace" minOccurs="0"/>
 *     <xsd:element ref="SignatureProductionPlaceV2" minOccurs="0"/> <!-- :TODO: not supported -->
 *     <xsd:element ref="SignerRole" minOccurs="0"/>
 *     <xsd:element ref="SignerRoleV2" minOccurs="0"/>               <!-- :TODO: not supported -->
 *     <xsd:any namespace="##other" minOccurs="0" maxOccurs="unbounded"/>
 *   </xsd:sequence>
 *   <xsd:attribute name="Id" type="xsd:ID" use="optional"/>
 * </xsd:complexType>
 *
 */

@XmlElement({ localName: XmlXades.ElementNames.SignedSignatureProperties })
export class SignedSignatureProperties extends XadesObject {
  @XmlAttribute({
    localName: XmlXades.AttributeNames.Id, defaultValue: '',
  })
  public Id: string;

  @XmlChildElement({
    localName: XmlXades.ElementNames.SigningTime,
    parser: XadesDateTime,
  })
  public SigningTime: XadesDateTime;

  @XmlChildElement({ parser: SigningCertificate })
  public SigningCertificate: SigningCertificate;

  @XmlChildElement({ parser: SigningCertificateV2 })
  public SigningCertificateV2: SigningCertificateV2;

  @XmlChildElement({ parser: SignaturePolicyIdentifier })
  public SignaturePolicyIdentifier: SignaturePolicyIdentifier;

  @XmlChildElement({ parser: SignatureProductionPlace })
  public SignatureProductionPlace: SignatureProductionPlace;

  @XmlChildElement({ parser: SignerRole })
  public SignerRole: SignerRole;
}
