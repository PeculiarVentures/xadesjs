import { XmlAttribute, XmlChildElement, XmlElement } from "xml-core";

import { XadesDateTime } from "./date_time";
import { SignaturePolicyIdentifier } from "./signature_policy_identifier";
import { SignatureProductionPlace } from "./signature_product_place";
import { SignerRole } from "./signer_role";
import { SigningCertificate } from "./signing_certificate";
import { XmlXades } from "./xml";
import { XadesObject } from "./xml_base";

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
    localName: XmlXades.ElementNames.SignedSignatureProperties,
})
export class SignedSignatureProperties extends XadesObject {

    @XmlAttribute({ localName: XmlXades.AttributeNames.Id, defaultValue: "" })
    public Id: string;

    @XmlChildElement({
        localName: XmlXades.ElementNames.SigningTime,
        parser: XadesDateTime,
    })
    public SigningTime: XadesDateTime;

    @XmlChildElement({ parser: SigningCertificate })
    public SigningCertificate: SigningCertificate;

    @XmlChildElement({ parser: SignaturePolicyIdentifier })
    public SignaturePolicyIdentifier: SignaturePolicyIdentifier;

    @XmlChildElement({ parser: SignatureProductionPlace })
    public SignatureProductionPlace: SignatureProductionPlace;

    @XmlChildElement({ parser: SignerRole })
    public SignerRole: SignerRole;

}
