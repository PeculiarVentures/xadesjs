import { XmlChildElement, XmlElement } from 'xml-core';
import { DataObject as XmlDSigDataObject, XmlSignature } from 'xmldsigjs';
import { QualifyingProperties } from './qualifying_properties';

@XmlElement({ localName: XmlSignature.ElementNames.Object })
export class DataObject extends XmlDSigDataObject {
  @XmlChildElement({ parser: QualifyingProperties })
  public QualifyingProperties: QualifyingProperties;
}
