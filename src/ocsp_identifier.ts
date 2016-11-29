import * as XmlJs from "xmljs";

import { XmlXades } from "./xml";
import { XmlXadesObject } from "./xml_xades";

/**
 * This class includes the name of the server that has produced the
 * referenced response (ResponderID element) and the time indication in
 * the "ProducedAt" field of the referenced response (ProducedAt element).
 * The optional URI attribute could serve to indicate where the OCSP
 * response identified is archived.
 */
export class OCSPIdentifier extends XmlXadesObject {

    protected name = XmlXades.ElementNames.OCSPIdentifier;

    // Public properties
    /**
     * The optional URI attribute could serve to indicate where the OCSP
     * response is archived
     */
    public UriAttribute: string | null;

    /**
     * The ID of the server that has produced the referenced response
     */
    public ResponderID: string | null;

    /**
     * Time indication in the referenced response
     */
    public ProducedAt: Date | null;

    // Constructors
    /**
     * Default constructor
     */
    public constructor() {
        super();
        this.ProducedAt = null;
    }

    // Public methods
    /**
     * Check to see if something has changed in this instance and needs to be serialized
     * @returns Flag indicating if a member needs serialization
     */
    public HasChanged(): boolean {
        let retVal = false;

        if (this.UriAttribute) {
            retVal = true;
        }

        if (this.ResponderID) {
            retVal = true;
        }

        if (this.ProducedAt) {
            retVal = true;
        }

        return retVal;
    }

    /**
     * Load state from an XML element
     * @param {Element} element XML element containing new state
     */
    public LoadXml(element: Element) {
        super.LoadXml(element);

        this.UriAttribute = this.GetAttribute(XmlXades.AttributeNames.URI, null, false);

        let xmlResponderID = this.GetElement(XmlXades.ElementNames.ResponderID, false);
        if (xmlResponderID) {
            this.ResponderID = xmlResponderID.textContent;
        }

        let xmlProducedAt = this.GetElement(XmlXades.ElementNames.ProducedAt, false);
        if (xmlProducedAt && xmlProducedAt.textContent) {
            this.ProducedAt = XmlJs.Convert.ToDateTime(xmlProducedAt.textContent);
        }
    }

    /**
     * Returns the XML representation of the this object
     * @returns XML element containing the state of this object
     */
    public GetXml(): Element {
        let document = this.CreateDocument();
        let element = this.CreateElement(document);

        if (this.UriAttribute)
            element.setAttribute(XmlXades.AttributeNames.URI, this.UriAttribute);

        if (this.ResponderID) {
            let xml = document.createElementNS(XmlXades.NamespaceURI, this.GetPrefix() + XmlXades.ElementNames.ResponderID);
            xml.textContent = this.ResponderID;
            element.appendChild(xml);
        }

        if (this.ProducedAt) {
            let xml = document.createElementNS(XmlXades.NamespaceURI, this.GetPrefix() + XmlXades.ElementNames.ProducedAt);
            xml.textContent = XmlJs.Convert.FromDateTime(this.ProducedAt);
            element.appendChild(xml);
        }

        return element;
    }

}
