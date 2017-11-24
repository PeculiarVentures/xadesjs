import * as XmlDSigJs from "xmldsigjs";
import { XmlElement } from "xml-core";
import { XadesCollection } from "./xml_base";
import { XmlAsic } from "./asic";

@XmlElement({
    localName: XmlAsic.ElementNames.XadesSignatures,
    namespaceURI: XmlAsic.NamespaceURI,
    prefix: XmlAsic.DefaultPrefix,
    parser: XmlDSigJs.Signature
})
export class XadesSignatures extends XadesCollection<XmlDSigJs.Signature> { }
