import { XmlElement, XmlChildElement, XmlAttribute } from "xml-core";

import { XmlXades } from "./xml";
import { XadesObject } from "./xml_base";
import { XmlDateTimeConverter } from "./converter";
import { SigningCertificate } from "./signing_certificate";
import { SignaturePolicyIdentifier } from "./signature_policy_identifier";
import { SignatureProductionPlace } from "./signature_product_place";

/**
 * 
 * <xsd:element name="SignedSignatureProperties" type="SignedSignaturePropertiesType"/>
 * <xsd:complexType name="SignedSignaturePropertiesType">
 *     <xsd:sequence>
 *         <xsd:element name="SigningTime" type="xsd:dateTime" minOccurs="0"/>
 *         <xsd:element name="SigningCertificate" type="CertIDListType" minOccurs="0"/>
 *         <xsd:element name="SignaturePolicyIdentifier" type="SignaturePolicyIdentifierType" minOccurs="0"/>
 *         <xsd:element name="SignatureProductionPlace" type="SignatureProductionPlaceType" minOccurs="0"/>
 *         <xsd:element name="SignerRole" type="SignerRoleType" minOccurs="0"/>
 *     </xsd:sequence>
 *     <xsd:attribute name="Id" type="xsd:ID" use="optional"/>
 * </xsd:complexType>
 * 
 */

@XmlElement({
    localName: XmlXades.ElementNames.SignedSignatureProperties
})
export class SignedSignatureProperties extends XadesObject {

    @XmlAttribute({ localName: XmlXades.AttributeNames.Id, defaultValue: "" })
    Id: string;

    @XmlChildElement({
        localName: XmlXades.ElementNames.SigningTime,
        namespaceURI: XmlXades.NamespaceURI,
        prefix: XmlXades.DefaultPrefix,
        converter: XmlDateTimeConverter,
    })
    SigningTime: Date;

    @XmlChildElement({ parser: SigningCertificate })
    SigningCertificate: SigningCertificate;

    @XmlChildElement({ parser: SignaturePolicyIdentifier })
    SignaturePolicyIdentifier: SignaturePolicyIdentifier;

    @XmlChildElement({ parser: SignatureProductionPlace })
    SignatureProductionPlace: SignatureProductionPlace;

    @XmlChildElement({ parser: SignerRole })
    SignerRole: SignerRole;

}