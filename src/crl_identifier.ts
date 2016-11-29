import * as XmlJs from "xmljs";

import { XmlXades } from "./xml";
import { XmlXadesObject } from "./xml_xades";

/**
 * This class includes the issuer (Issuer element), the time when the CRL
 * was issued (IssueTime element) and optionally the number of the CRL
 * (Number element).
 * The Identifier element can be dropped if the CRL could be inferred from
 * other information. Its URI attribute could serve to	indicate where the
 * identified CRL is archived.
 */
export class CRLIdentifier extends XmlXadesObject {

    protected name = XmlXades.ElementNames.CRLIdentifier;

    // Public properties
    /**
     * The optional URI attribute could serve to indicate where the OCSP
     * response identified is archived.
     */
    public UriAttribute: string | null;

    /**
     * Issuer of the CRL
     */
    public Issuer: string | null;

    /**
     * Date of issue of the CRL
     */
    public IssueTime: Date | null;

    /**
     * Optional number of the CRL
     */
    public Number: number;


    // Constructors
    /**
     * Default constructor
     */
    public constructor() {
        super();
        this.IssueTime = null;
        this.Number = 0; // Impossible value
    }

    // Protected methods

    protected GetXmlObjectName() {
        return XmlXades.ElementNames.CRLIdentifier;
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

        if (this.Issuer) {
            retVal = true;
        }

        if (this.IssueTime) {
            retVal = true;
        }

        if (this.Number) {
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

        this.UriAttribute = this.GetAttribute(XmlXades.AttributeNames.URI, null, false);

        let xmlIssuer = this.GetElement(XmlXades.ElementNames.Issuer, false);
        if (xmlIssuer) {
            this.Issuer = xmlIssuer.textContent;
        }

        let xmlIssueTime = this.GetElement(XmlXades.ElementNames.IssueTime, false);
        if (xmlIssueTime && xmlIssueTime.textContent) {
            this.IssueTime = XmlJs.Convert.ToDateTime(xmlIssueTime.textContent);
        }

        let xmlNumber = this.GetElement(XmlXades.ElementNames.Number, false);
        if (xmlNumber) {
            this.Number = +(xmlNumber.textContent);
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
            element.setAttribute("URI", this.UriAttribute);

        if (this.Issuer) {
            let xml = document.createElementNS(XmlXades.NamespaceURI, this.GetPrefix() + XmlXades.ElementNames.Issuer);
            xml.textContent = this.Issuer;
            element.appendChild(xml);
        }

        if (this.IssueTime) {
            let xml = document.createElementNS(XmlXades.NamespaceURI, this.GetPrefix() + XmlXades.ElementNames.IssueTime);
            xml.textContent = XmlJs.Convert.FromDateTime(this.IssueTime);
            element.appendChild(xml);
        }

        if (this.Number) {
            let xml = document.createElementNS(XmlXades.NamespaceURI, this.GetPrefix() + XmlXades.ElementNames.Number);
            xml.textContent = this.Number.toString();
            element.appendChild(xml);
        }

        return element;
    }

}
