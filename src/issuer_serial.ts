import * as XmlJs from "xmljs";

import { XmlXades } from "./xml";
import { XmlXadesObject } from "./xml_xades";

/**
 * The element IssuerSerial contains the identifier of one of the
 * certificates referenced in the sequence
 */
export class IssuerSerial extends XmlXadesObject {

    protected name = XmlXades.ElementNames.IssuerSerial;

    // Public properties

    /**
     * Name of the X509 certificate issuer
     */
    public X509IssuerName: string;

    /**
     * Serial number of the X509 certificate
     */
    public X509SerialNumber: string;

    /**
     * Default constructor
     */
    public constructor() {
        super();
    }

    // Protected methods
    protected GetXmlObjectName() {
        return XmlXades.ElementNames.IssuerSerial;
    }

    // Public methods

    /**
     * Check to see if something has changed in this instance and needs to be serialized
     * @returns Flag indicating if a member needs serialization
     */
    public HasChanged(): boolean {
        let retVal = false;

        if (this.X509IssuerName) {
            retVal = true;
        }

        if (this.X509SerialNumber) {
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

        let xmlNode = this.GetElement(XmlDSigJs.XmlSignature.ElementNames.X509IssuerName, true);
        this.X509IssuerName = xmlNode.textContent!;

        xmlNode = this.GetElement(XmlDSigJs.XmlSignature.ElementNames.X509SerialNumber);
        this.X509SerialNumber = xmlNode.textContent!;
    }

    /**
     * Returns the XML representation of the this object
     * @returns XML element containing the state of this object
     */
    public GetXml(): Element {
        let document = this.CreateDocument();
        let element = this.CreateElement(document);

        if (!this.X509IssuerName)
            throw new XmlJs.XmlError(XmlJs.XE.CRYPTOGRAPHIC, "X509IssuerName is required");

        let xmlX509IssuerName = document.createElementNS(XmlDSigJs.XmlSignature.NamespaceURI, this.GetPrefix() + XmlDSigJs.XmlSignature.ElementNames.X509IssuerName);
        xmlX509IssuerName.textContent = this.X509IssuerName;
        element.appendChild(xmlX509IssuerName);

        let xmlX509SerialNumber = document.createElementNS(XmlDSigJs.XmlSignature.NamespaceURI, this.GetPrefix() + XmlDSigJs.XmlSignature.ElementNames.X509SerialNumber);
        xmlX509SerialNumber.textContent = this.X509SerialNumber;
        element.appendChild(xmlX509SerialNumber);

        return element;
    }

}
