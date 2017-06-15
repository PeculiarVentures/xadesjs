import { XmlElement, XmlChildElement, XmlAttribute } from "xml-core";

import { XmlXades } from "./xml";
import { XadesObject } from "./xml_base";
import { CertIDList } from "./signing_certificate";
import { UnsignedSignatureProperty } from "./unsigned_signature_properties";

/**
 *
 * <xsd:element name="CompleteCertificateRefs" type="CompleteCertificateRefsType"/>
 * <xsd:complexType name="CompleteCertificateRefsType">
 *     <xsd:sequence>
 *         <xsd:element name="CertRefs" type="CertIDListType"/>
 *     </xsd:sequence>
 *     <xsd:attribute name="Id" type="xsd:ID" use="optional"/>
 * </xsd:complexType>
 *
 */

@XmlElement({ localName: XmlXades.ElementNames.CompleteCertificateRefs })
export class CompleteCertificateRefs extends XadesObject implements UnsignedSignatureProperty {

    @XmlAttribute({ localName: XmlXades.AttributeNames.Id, defaultValue: "" })
    Id: string;

    @XmlChildElement({ localName: XmlXades.ElementNames.CertRefs, parser: CertIDList, required: true })
    CertRefs: CertIDList;

}