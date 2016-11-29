import * as XmlJs from "xmljs";

import { XmlXades } from "./xml";
import { XmlXadesObject, XmlXadesCollection } from "./xml_xades";
import { SPUserNotice } from "./sp_user_notice";
import { SPUri } from "./sp_uri";

/**
 * <xsd:element name="SigPolicyQualifier" type="AnyType" maxOccurs="unbounded"/>
 */

export interface ISigPolicyQualifier extends XmlXadesObject {
    AnyXmlElement: Element | null;
}

/**
 * This class can contain additional information qualifying the signature
 * policy identifier
 */
export class SigPolicyQualifier extends XmlXadesObject implements ISigPolicyQualifier {

    protected name = XmlXades.ElementNames.SigPolicyQualifier;

    // Public properties

    /**
     * The generic XML element that represents a sig policy qualifier
     */
    AnyXmlElement: Element | null = null;

    // Protected methods

    // Public methods
    /**
     * Check to see if something has changed in this instance and needs to be serialized
     * @returns Flag indicating if a member needs serialization
     */
    public HasChanged(): boolean {
        let retVal = false;

        if (this.AnyXmlElement) {
            retVal = true;
        }

        return retVal;
    }

    /**
     * Load state from an XML element
     * @param {Element} element XML element containing new state < /param>
     */
    public LoadXml(element: Element): void {
        super.LoadXml(element);

        let nodes = element.childNodes;
        // Get first child Element
        for (let i = 0; i < nodes.length; i++) {
            let node = nodes.item(i);
            if (node.nodeType !== XmlJs.XmlNodeType.Element)
                continue;
            this.AnyXmlElement = node as Element;
            break;
        }
    }

    /**
     * Returns the XML representation of the this object
     * @returns XML element containing the state of this object
     */
    public GetXml(): Element {
        let document = this.CreateDocument();
        let element = this.CreateElement(document);

        if (this.AnyXmlElement) {
            element.appendChild(document.importNode(this.AnyXmlElement, true));
        }

        return element;
    }

}

/**
 * <xsd:complexType name="SigPolicyQualifiersListType">
 *   <xsd:sequence>
 *     <xsd:element name="SigPolicyQualifier" type="AnyType" maxOccurs="unbounded"/>
 *   </xsd:sequence>
 * </xsd:complexType>
 */

/**
 * This class contains a collection of SigPolicyQualifiers
 */
export class SigPolicyQualifiers extends XmlXadesCollection<ISigPolicyQualifier> {

    protected name = XmlXades.ElementNames.SigPolicyQualifiers;

    // Protetced methods

    protected OnLoadChildElement(element: Element): any {
        if (element.namespaceURI === XmlXades.NamespaceURI && element.localName === XmlXades.ElementNames.SigPolicyQualifier) {
            let item: ISigPolicyQualifier | null = null;
            let nodes = element.childNodes;

            // Get first child Element
            for (let i = 0; i < nodes.length; i++) {
                let node = nodes.item(i) as Element;
                if (node.nodeType !== XmlJs.XmlNodeType.Element)
                    continue;
                switch (node.localName) {
                    case XmlXades.ElementNames.SPUserNotice:
                        item = new SPUserNotice();
                        break;
                    case XmlXades.ElementNames.SPURI:
                        item = new SPUri();
                        break;
                    default:
                        item = new SigPolicyQualifier();
                }
                item!.LoadXml(element);
                break;
            }
            return item;
        }
    }

}
