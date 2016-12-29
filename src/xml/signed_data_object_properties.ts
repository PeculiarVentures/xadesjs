import { XmlElement, XmlChildElement, XmlAttribute } from "xml-core";

import { XmlXades } from "./xml";
import { XadesObject, XadesCollection } from "./xml_base";
import { XAdESTimeStamp } from "./xades_time_stamp";

/**
 * 
 * <xsd:element name="SignedDataObjectProperties" type="SignedDataObjectPropertiesType"/>
 * <xsd:complexType name="SignedDataObjectPropertiesType">
 *     <xsd:sequence>
 *         <xsd:element name="DataObjectFormat" type="DataObjectFormatType" minOccurs="0" maxOccurs="unbounded"/>
 *         <xsd:element name="CommitmentTypeIndication" type="CommitmentTypeIndicationType" minOccurs="0" maxOccurs="unbounded"/>
 *         <xsd:element name="AllDataObjectsTimeStamp" type="XAdESTimeStampType" minOccurs="0" maxOccurs="unbounded"/>
 *         <xsd:element name="IndividualDataObjectsTimeStamp" type="XAdESTimeStampType" minOccurs="0" maxOccurs="unbounded"/>
 *     </xsd:sequence>
 *     <xsd:attribute name="Id" type="xsd:ID" use="optional"/>
 * </xsd:complexType>
 * 
 */


@XmlElement({ localName: XmlXades.ElementNames.IndividualDataObjectsTimeStamp })
export class IndividualDataObjectsTimeStamp extends XAdESTimeStamp { }

@XmlElement({ localName: "IndividualDataObjectsTimeStampCollection", parser: IndividualDataObjectsTimeStamp })
export class IndividualDataObjectsTimeStampCollection extends XadesCollection<IndividualDataObjectsTimeStamp> {
}


@XmlElement({ localName: XmlXades.ElementNames.AllDataObjectsTimeStamp })
export class AllDataObjectsTimeStamp extends XAdESTimeStamp { }

@XmlElement({ localName: "AllDataObjectsTimeStampCollection", parser: AllDataObjectsTimeStamp })
export class AllDataObjectsTimeStampCollection extends XadesCollection<AllDataObjectsTimeStamp> {
}

@XmlElement({
    localName: XmlXades.ElementNames.SignedDataObjectProperties
})
export class SignedDataObjectProperties extends XadesObject {

    @XmlAttribute({ localName: XmlXades.AttributeNames.Id, defaultValue: "" })
    Id: string;

    @XmlChildElement({ parser: DataObjectFormat, noRoot: true })
    DataObjectFormat: DataObjectFormat;

    @XmlChildElement({ parser: CommitmentTypeIndication, noRoot: true })
    CommitmentTypeIndication: CommitmentTypeIndication;

    @XmlChildElement({ parser: AllDataObjectsTimeStampCollection, noRoot: true })
    AllDataObjectsTimeStamp: AllDataObjectsTimeStampCollection;

    @XmlChildElement({ parser: IndividualDataObjectsTimeStampCollection, noRoot: true })
    IndividualDataObjectsTimeStamp: IndividualDataObjectsTimeStampCollection;

}