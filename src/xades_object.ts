import * as XmlJs from "xmljs";
import * as XmlDSigJs from "xmldsigjs";

import { XmlXades } from "./xml";
import { QualifyingProperties } from "./qualifying_properies";

/**
 * This class represents the unique object of a XAdES signature that
 * contains all XAdES information
 */
export class XadesObject extends XmlDSigJs.XmlSignatureObject {

    protected name = XmlDSigJs.XmlSignature.ElementNames.Object;

    // Public properties
    /**
     * Id attribute of the XAdES object
     */
    public Id: string;

    /**
     * The QualifyingProperties element acts as a container element for
     * all the qualifying information that should be added to an XML
     * signature.
     */
    public QualifyingProperties: QualifyingProperties;

    // Constructors
    /**
     * Default constructor
     */
    public constructor() {
        super();
        this.QualifyingProperties = new QualifyingProperties();
    }

    // Public methods
    /**
     * Check to see if something has changed in this instance and needs to be serialized
     * @returns Flag indicating if a member needs serialization
     */
    public HasChanged(): boolean {
        let retVal = false;

        if (this.Id) {
            retVal = true;
        }

        if (this.QualifyingProperties && this.QualifyingProperties.HasChanged()) {
            retVal = true;
        }

        return retVal;
    }

    /**
     * Load state from an XML element
     * @param {Element} element XML element containing new state
     * @param {Element} counterSignedXmlElement Element containing parent signature (needed if there are counter signatures)
     */
    public LoadXml(element: Element, counterSignedXmlElement?: Element): void {
        super.LoadXml(element);

        if (element.hasAttribute(XmlDSigJs.XmlSignature.AttributeNames.Id)) {
            this.Id = element.getAttribute(XmlDSigJs.XmlSignature.AttributeNames.Id) !;
        }
        else {
            this.Id = "";
        }

        let xmlNodeList = this.GetChildren(XmlXades.NamespaceURI);
        if (!xmlNodeList.length) {
            throw new XmlJs.XmlError(XmlJs.XE.CRYPTOGRAPHIC, "QualifyingProperties missing");
        }
        this.QualifyingProperties = new QualifyingProperties();
        this.QualifyingProperties.LoadXml(xmlNodeList[0] as Element, counterSignedXmlElement);
    }

    /**
     * Returns the XML representation of the this object
     * @returns XML element containing the state of this object
     */
    public GetXml(): Element {
        const document = this.CreateDocument();
        const element = this.CreateElement(document);

        if (this.Id) {
            element.setAttribute(XmlDSigJs.XmlSignature.AttributeNames.Id, this.Id);
        }

        if (this.QualifyingProperties && this.QualifyingProperties.HasChanged()) {
            element.appendChild(document.importNode(this.QualifyingProperties.GetXml(), true));
        }

        return element;
    }

}