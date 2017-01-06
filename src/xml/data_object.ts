import { XmlElement, XmlChildElement } from "xml-core";
import { DataObject as XmlDSigDataObject, XmlSignature } from "xmldsigjs";

import { QualifyingProperties } from "./qualifying_properties";

@XmlElement({ localName: XmlSignature.ElementNames.Object })
export class DataObject extends XmlDSigDataObject {

    @XmlChildElement({parser: QualifyingProperties})
    QualifyingProperties: QualifyingProperties;

}