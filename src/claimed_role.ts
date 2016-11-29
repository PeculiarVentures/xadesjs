import { XmlXades } from "./xml";
import { XmlXadesObject, XmlXadesCollection } from "./xml_xades";

/**
 * This class contains a roles claimed by the signer but not it is not a
 * certified role
 */
export class ClaimedRole extends XmlXadesObject {

    protected name = XmlXades.ElementNames.ClaimedRole;

    // Public properties
    /**
     * The generic XML element that represents a claimed role
     */
    public AnyXmlElement: Element;

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
     * @param {Element} element XML element containing new state
     */
    public LoadXml(element: Element): void {
        this.AnyXmlElement = element;
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
 * The ClaimedRoles element contains a sequence of roles claimed by
 * the signer but not certified. Additional contents types may be
 * defined on a domain application basis and be part of this element.
 * The namespaces given to the corresponding XML schemas will allow
 * their unambiguous identification in the case these roles use XML.
 */
export class ClaimedRoles extends XmlXadesCollection<ClaimedRole> {

    protected name = XmlXades.ElementNames.ClaimedRoles;

    // Protetced methods

    protected OnLoadChildElement(element: Element): any {
        if (element.namespaceURI === XmlXades.NamespaceURI && element.localName === XmlXades.ElementNames.ClaimedRole) {
            let claimedRole = new ClaimedRole();
            claimedRole.LoadXml(element);
            return claimedRole;
        }
    }

}
