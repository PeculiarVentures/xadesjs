import { XmlXades } from "./xml";
import { SigPolicyQualifier } from "./sig_policy_qualifier";

/**
 * SPUri represents the URL where the copy of the Signature Policy may be
 * obtained.  The class derives from SigPolicyQualifier.
 */
export class SPUri extends SigPolicyQualifier {
    // Public properties
    /**
     * Uri for the sig policy qualifier
     */
    public Uri: string;

    // Public methods
    /**
     * Check to see if something has changed in this instance and needs to be serialized
     * @returns Flag indicating if a member needs serialization
     */
    public HasChanged(): boolean {
        let retVal = false;

        if (this.Uri) {
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

        this.Uri = this.GetElement(XmlXades.ElementNames.SPURI, true).textContent!;
    }

    /**
     * Returns the XML representation of the this object
     * @returns XML element containing the state of this object
     */
    public GetXml(): Element {
        let document = this.CreateDocument();
        let element = this.CreateElement(document);

        let bufferXmlElement = document.createElementNS(XmlXades.NamespaceURI, this.GetPrefix() + XmlXades.ElementNames.SPURI);
        bufferXmlElement.textContent = this.Uri;
        element.appendChild(document.importNode(bufferXmlElement, true));

        return element;
    }

}
