import * as XmlCore from "xml-core";
import * as XmlDSigJs from "xmldsigjs";
import * as XAdES from "./xml";

export class SignedXml extends XmlDSigJs.SignedXml {

    Properties: XAdES.QualifyingProperties;

    LoadXml(value: Element | string) {
        super.LoadXml(value as string);

        this.XmlSignature.ObjectList.Some(item => {
            if (item.Element) {
                // Looking for <QualifyingProperties>
                for (let i = 0; i < item.Element.childNodes.length; i++) {
                    let node = item.Element.childNodes.item(i);
                    if (node.nodeType === XmlCore.XmlNodeType.Element && node.localName === XAdES.XmlXades.ElementNames.QualifyingProperties) {
                        this.Properties = XAdES.QualifyingProperties.LoadXml(node as Element);
                        return true;
                    }
                }
            }
            return false;
        });
    }

}