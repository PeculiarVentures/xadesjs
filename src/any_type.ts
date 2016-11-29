import * as XmlJs from "xmljs";

import { XmlXadesTaggedObject } from "./xades_tagged_object";

/**
 * Implementation of AsnAny schema type
 */
export class AnyType extends XmlXadesTaggedObject {
    // Public properties
    /**
     * The generic XML element
     */
    public AnyXmlElement: Element | null;

    constructor(tagName: string) {
        super(tagName);
        this.AnyXmlElement = null;
    }

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
     * @param {Element} element XML element containing new state
     */
    public LoadXml(element: Element): void {
        super.LoadXml(element);
        // Get Any element

        for (let i = 0; i < element.childNodes.length; i++) {
            let node = element.childNodes.item(i) as Element;
            if (element.nodeType !== XmlJs.XmlNodeType.Element)
                continue;
            this.AnyXmlElement = node;
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
