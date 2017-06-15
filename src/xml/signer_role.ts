import { XmlElement, XmlChildElement } from "xml-core";

import { XmlXades } from "./xml";
import { XadesObject, XadesCollection } from "./xml_base";
import { EncapsulatedPKIData } from "./encapsulated_pki_data";
import { Any } from "./any";
/**
 *
 * <xsd:element name="SignerRole" type="SignerRoleType"/>
 * <xsd:complexType name="SignerRoleType">
 *     <xsd:sequence>
 *         <xsd:element name="ClaimedRoles" type="ClaimedRolesListType" minOccurs="0"/>
 *         <xsd:element name="CertifiedRoles" type="CertifiedRolesListType" minOccurs="0"/>
 *     </xsd:sequence>
 * </xsd:complexType>
 * <xsd:complexType name="ClaimedRolesListType">
 *     <xsd:sequence>
 *         <xsd:element name="ClaimedRole" type="AnyType" maxOccurs="unbounded"/>
 *     </xsd:sequence>
 * </xsd:complexType>
 * <xsd:complexType name="CertifiedRolesListType">
 *     <xsd:sequence>
 *         <xsd:element name="CertifiedRole" type="EncapsulatedPKIDataType" maxOccurs="unbounded"/>
 *     </xsd:sequence>
 * </xsd:complexType>
 *
 */

@XmlElement({ localName: XmlXades.ElementNames.ClaimedRole })
export class ClaimedRole extends Any { }

@XmlElement({ localName: XmlXades.ElementNames.ClaimedRoles, parser: ClaimedRole })
export class ClaimedRoles extends XadesCollection<ClaimedRole> { }

@XmlElement({ localName: XmlXades.ElementNames.CertifiedRole })
export class CertifiedRole extends EncapsulatedPKIData { }

@XmlElement({ localName: XmlXades.ElementNames.CertifiedRoles, parser: CertifiedRole })
export class CertifiedRoles extends XadesCollection<CertifiedRole> { }

@XmlElement({ localName: XmlXades.ElementNames.SignerRole })
export class SignerRole extends XadesObject {

    @XmlChildElement({ parser: ClaimedRoles })
    ClaimedRoles: ClaimedRoles;

    @XmlChildElement({ parser: CertifiedRoles })
    CertifiedRoles: CertifiedRoles;
}