import {
  XmlAttribute, XmlChildElement, XmlElement,
} from 'xml-core';
import { CommitmentTypeIndication } from './commitment_type_indication';
import { DataObjectFormat } from './data_object_format';
import { XAdESTimeStamp } from './xades_time_stamp';
import { XmlXades } from './xml';
import { XadesCollection, XadesObject } from './xml_base';

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

@XmlElement({
  localName: 'IndividualDataObjectsTimeStampCollection', parser: IndividualDataObjectsTimeStamp,
})
export class IndividualDataObjectsTimeStampCollection extends XadesCollection<IndividualDataObjectsTimeStamp> {
}

@XmlElement({ localName: XmlXades.ElementNames.AllDataObjectsTimeStamp })
export class AllDataObjectsTimeStamp extends XAdESTimeStamp { }

@XmlElement({
  localName: 'DataObjectFormatCollection', parser: DataObjectFormat,
})
export class DataObjectFormatCollection extends XadesCollection<DataObjectFormat> {
}

@XmlElement({
  localName: 'CommitmentTypeIndicationCollection', parser: CommitmentTypeIndication,
})
export class CommitmentTypeIndicationCollection extends XadesCollection<CommitmentTypeIndication> {
}

@XmlElement({
  localName: 'AllDataObjectsTimeStampCollection', parser: AllDataObjectsTimeStamp,
})
export class AllDataObjectsTimeStampCollection extends XadesCollection<AllDataObjectsTimeStamp> {
}

@XmlElement({ localName: XmlXades.ElementNames.SignedDataObjectProperties })
export class SignedDataObjectProperties extends XadesObject {
  @XmlAttribute({
    localName: XmlXades.AttributeNames.Id, defaultValue: '',
  })
  public Id: string;

  @XmlChildElement({
    parser: DataObjectFormatCollection, noRoot: true,
  })
  public DataObjectFormats: DataObjectFormatCollection;

  @XmlChildElement({
    parser: CommitmentTypeIndicationCollection, noRoot: true,
  })
  public CommitmentTypeIndications: CommitmentTypeIndicationCollection;

  @XmlChildElement({
    parser: AllDataObjectsTimeStampCollection, noRoot: true,
  })
  public AllDataObjectsTimeStamps: AllDataObjectsTimeStampCollection;

  @XmlChildElement({
    parser: IndividualDataObjectsTimeStampCollection, noRoot: true,
  })
  public IndividualDataObjectsTimeStamps: IndividualDataObjectsTimeStampCollection;
}
