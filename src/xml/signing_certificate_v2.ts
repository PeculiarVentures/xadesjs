import { XmlAttribute, XmlChildElement, XmlElement } from "xml-core";
import { XmlBase64Converter } from "xml-core";

import { XmlXades } from "./xml";
import { XadesCollection, XadesObject } from "./xml_base";

import { DigestAlgAndValueType } from "./signing_certificate";

/**
 *
 * <xsd:element name="SigningCertificateV2" type="CertIDListV2Type"/>
 * <xsd:complexType name="CertIDListV2Type">
 *     <xsd:sequence>
 *         <xsd:element name="Cert" type="CertIDTypeV2" maxOccurs="unbounded"/>
 *     </xsd:sequence>
 * </xsd:complexType>
 * <xsd:complexType name="CertIDTypeV2">
 *     <xsd:sequence>
 *         <xsd:element name="CertDigest" type="DigestAlgAndValueType"/>
 *         <xsd:element name="IssuerSerialV2" type="xsd:base64Binary" minOccurs="0"/>
 *     </xsd:sequence>
 *     <xsd:attribute name="URI" type="xsd:anyURI" use="optional"/>
 * </xsd:complexType>
 *
 */
@XmlElement({
    localName: XmlXades.ElementNames.Cert,
    parser: CertV2
})
export class CertV2 extends XadesObject {

    @XmlChildElement({ localName: XmlXades.ElementNames.CertDigest, parser: DigestAlgAndValueType, required: true })
    public CertDigest: DigestAlgAndValueType;

    @XmlChildElement({
        localName: XmlXades.ElementNames.IssuerSerialV2,
        namespaceURI: XmlXades.NamespaceURI,
        prefix: XmlXades.DefaultPrefix,
        converter: XmlBase64Converter,
        required: false
    })
    public IssuerSerial: Uint8Array;

    @XmlAttribute({ localName: XmlXades.AttributeNames.URI })
    public Uri: string;

}

@XmlElement({ localName: "CertIDListV2", parser: CertV2 })
export class CertIDListV2 extends XadesCollection<CertV2> { }

@XmlElement({ localName: XmlXades.ElementNames.SigningCertificateV2 })
export class SigningCertificateV2 extends CertIDListV2 { }
