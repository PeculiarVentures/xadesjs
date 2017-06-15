import { XmlElement, XmlChildElement, XmlAttribute } from "xml-core";
import { CanonicalizationMethod } from "xmldsigjs";

import { XmlXades } from "./xml";
import { XadesObject } from "./xml_base";
import { ReferenceInfos, EncapsulatedTimeStampCollection, XMLTimeStampCollection } from "./generic_time_stamp";

/**
 *
 * <xsd:element name="OtherTimeStamp" type="OtherTimeStampType"/>
 * <xsd:complexType name="OtherTimeStampType">
 *     <xsd:complexContent>
 *         <xsd:restriction base="GenericTimeStampType">
 *             <xsd:sequence>
 *                 <xsd:element ref="ReferenceInfo" maxOccurs="unbounded"/>
 *                 <xsd:element ref="ds:CanonicalizationMethod" minOccurs="0"/>
 *                 <xsd:choice>
 *                     <xsd:element name="EncapsulatedTimeStamp" type="EncapsulatedPKIDataType"/>
 *                     <xsd:element name="XMLTimeStamp" type="AnyType"/>
 *                 </xsd:choice>
 *             </xsd:sequence>
 *             <xsd:attribute name="Id" type="xsd:ID" use="optional"/>
 *         </xsd:restriction>
 *     </xsd:complexContent>
 * </xsd:complexType>
 *
 */


@XmlElement({
    localName: XmlXades.ElementNames.OtherTimeStamp
})
export class OtherTimeStamp extends XadesObject {

    @XmlAttribute({ localName: XmlXades.AttributeNames.Id, defaultValue: "" })
    Id: string;

    @XmlChildElement({ parser: ReferenceInfos, noRoot: true })
    ReferenceInfo: ReferenceInfos;

    @XmlChildElement({ parser: CanonicalizationMethod })
    CanonicalizationMethod: CanonicalizationMethod;

    @XmlChildElement({ parser: EncapsulatedTimeStampCollection, noRoot: true })
    EncapsulatedTimeStamp: EncapsulatedTimeStampCollection;

    @XmlChildElement({ parser: XMLTimeStampCollection, noRoot: true })
    XMLTimeStamp: XMLTimeStampCollection;

}