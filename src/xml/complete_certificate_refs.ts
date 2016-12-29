import { XmlElement, XmlChildElement, XmlAttribute } from "xml-core";

import { XmlXades } from "./xml";
import { XadesObject, XadesCollection } from "./xml_base";
import { EncapsulatedPKIData } from "./encapsulated_pki_data";
import { CertIDList } from "./unsigned_data_object_property";

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
export class CompleteCertificateRefs extends XadesObject {

    @XmlAttribute({ localName: XmlXades.AttributeNames.Id, defaultValue: "" })
    Id: string;

    @XmlChildElement({ localName: XmlXades.ElementNames.CertRefs, parser: CertIDList, required: true })
    CertRefs: CertIDList;

}