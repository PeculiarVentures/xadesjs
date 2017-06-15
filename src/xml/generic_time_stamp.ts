import { XmlElement, XmlChildElement, XmlAttribute } from "xml-core";
import { XmlBase64Converter } from "xml-core";
import { XmlSignature, CanonicalizationMethod } from "xmldsigjs";

import { XmlXades } from "./xml";
import { XadesObject, XadesCollection } from "./xml_base";
import { EncapsulatedPKIData } from "./encapsulated_pki_data";
import { Any } from "./any";

/**
 *
 * <xsd:element name="Include" type="IncludeType"/>
 * <xsd:complexType name="IncludeType">
 *   <xsd:attribute name="URI" type="xsd:anyURI" use="required"/>
 *   <xsd:attribute name="referencedData" type="xsd:boolean" use="optional"/>
 * </xsd:complexType>
 * <xsd:element name="ReferenceInfo" type="ReferenceInfoType"/>
 * <xsd:complexType name="ReferenceInfoType">
 *   <xsd:sequence>
 *     <xsd:element ref="ds:DigestMethod"/>
 *     <xsd:element ref="ds:DigestValue"/>
 *   </xsd:sequence>
 *   <xsd:attribute name="Id" type="xsd:ID" use="optional"/>
 *   <xsd:attribute name="URI" type="xsd:anyURI" use="optional"/>
 * </xsd:complexType>
 * <xsd:complexType name="GenericTimeStampType" abstract="true">
 *   <xsd:sequence>
 *     <xsd:choice minOccurs="0">
 *       <xsd:element ref="Include" minOccurs="0" maxOccurs="unbounded"/>
 *       <xsd:element ref="ReferenceInfo" maxOccurs="unbounded"/>
 *     </xsd:choice>
 *     <xsd:element ref="ds:CanonicalizationMethod" minOccurs="0"/>
 *     <xsd:choice maxOccurs="unbounded">
 *       <xsd:element name="EncapsulatedTimeStamp" type="EncapsulatedPKIDataType"/>
 *       <xsd:element name="XMLTimeStamp" type="AnyType"/>
 *     </xsd:choice>
 *   </xsd:sequence>
 *   <xsd:attribute name="Id" type="xsd:ID" use="optional"/>
 * </xsd:complexType>
 *
 */

@XmlElement({
    localName: XmlXades.ElementNames.Include
})
export class Include extends XadesObject {
    @XmlAttribute({
        localName: XmlXades.AttributeNames.URI,
        defaultValue: "",
        required: true,
    })
    Uri: string;

    @XmlAttribute({
        localName: XmlXades.AttributeNames.ReferencedData,
        defaultValue: false,
    })
    ReferencedData: boolean;
}

@XmlElement({
    localName: XmlXades.ElementNames.ReferenceInfo
})
export class ReferenceInfo extends XadesObject {

    @XmlAttribute({ localName: XmlXades.AttributeNames.URI, defaultValue: "" })
    Uri: string;

    @XmlAttribute({ localName: XmlXades.AttributeNames.Id, defaultValue: "" })
    Id: string;

    @XmlChildElement({
        localName: XmlSignature.ElementNames.DigestMethod,
        namespaceURI: XmlSignature.NamespaceURI,
        prefix: XmlSignature.DefaultPrefix,
        required: true,
    })
    DigestMethod: string;

    @XmlChildElement({
        localName: XmlSignature.ElementNames.DigestMethod,
        namespaceURI: XmlSignature.NamespaceURI,
        prefix: XmlSignature.DefaultPrefix,
        converter: XmlBase64Converter,
        required: true,
    })
    DigestValue: Uint8Array;

}

@XmlElement({ localName: "ReferenceInfos", parser: ReferenceInfo })
export class ReferenceInfos extends XadesCollection<ReferenceInfo> {
}

@XmlElement({ localName: XmlXades.ElementNames.EncapsulatedTimeStamp })
export class EncapsulatedTimeStamp extends EncapsulatedPKIData { }

@XmlElement({ localName: "EncapsulatedPKIDatas", parser: EncapsulatedTimeStamp })
export class EncapsulatedTimeStampCollection extends XadesCollection<EncapsulatedTimeStamp> {
}

@XmlElement({ localName: XmlXades.ElementNames.XMLTimeStamp })
export class XMLTimeStamp extends Any { }

@XmlElement({ localName: "XMLTimeStampCollection", parser: XMLTimeStamp })
export class XMLTimeStampCollection extends XadesCollection<XMLTimeStamp> {
}

@XmlElement({
    localName: "GenericTimeStamp"
})
export class GenericTimeStamp extends XadesObject {

    @XmlAttribute({ localName: XmlXades.AttributeNames.Id, defaultValue: "" })
    Id: string;

    @XmlChildElement({ parser: Include })
    Include: Include;

    @XmlChildElement({ parser: ReferenceInfos, noRoot: true })
    ReferenceInfo: ReferenceInfos;

    @XmlChildElement({ parser: CanonicalizationMethod })
    CanonicalizationMethod: CanonicalizationMethod;

    @XmlChildElement({ parser: EncapsulatedTimeStampCollection, noRoot: true })
    EncapsulatedTimeStamp: EncapsulatedTimeStampCollection;

    @XmlChildElement({ parser: XMLTimeStampCollection, noRoot: true })
    XMLTimeStamp: XMLTimeStampCollection;
}