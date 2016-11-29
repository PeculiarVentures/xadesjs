import * as XmlJs from "xmljs";

import { XmlXades } from "./xml";
import { XmlXadesObject } from "./xml_xades";
import { UnsignedDataObjectProperties } from "./unsigned_object_data_property";
import { UnsignedSignatureProperties } from "./unsigned_signature_properties";

/**
 * The UnsignedProperties element contains a number of properties that are
 * not signed by the XMLDSIG signature
 */
export class UnsignedProperties extends XmlXadesObject {

    protected name = XmlXades.ElementNames.UnsignedProperties;

    // Private variables
    private id: string;
    private unsignedSignatureProperties: UnsignedSignatureProperties;
    private unsignedDataObjectProperties: UnsignedDataObjectProperties;

    // Public properties

    /**
     * The optional Id attribute can be used to make a reference to the
     * UnsignedProperties element
     * @returns string
     */
    public get Id(): string {
        return this.id;
    }
    public set Id(value: string) {
        this.id = value;
    }

    /**
     * UnsignedSignatureProperties may contain properties that qualify XML
     * signature itself or the signer
     * @returns SignedSignatureProperties
     */
    public get UnsignedSignatureProperties(): UnsignedSignatureProperties {
        return this.unsignedSignatureProperties;
    }
    public set UnsignedSignatureProperties(value: UnsignedSignatureProperties) {
        this.unsignedSignatureProperties = value;
    }

    /**
     * The UnsignedDataObjectProperties element may contain properties that
     * qualify some of the signed data objects
     * @returns SignedDataObjectProperties
     */
    public get UnsignedDataObjectProperties(): UnsignedDataObjectProperties {
        return this.unsignedDataObjectProperties;
    }
    public set UnsignedDataObjectProperties(value: UnsignedDataObjectProperties) {
        this.unsignedDataObjectProperties = value;
    }

    /**
     * Default constructor
     */
    public constructor() {
        super();
        this.id = "";
        this.unsignedSignatureProperties = new UnsignedSignatureProperties();
        this.unsignedDataObjectProperties = new UnsignedDataObjectProperties();
    }

    // Public methods

    /**
     * Check to see if something has changed in this instance and needs to be serialized
     * @returns boolean Flag indicating if a member needs serialization< /returns>
     */
    public HasChanged(): boolean {
        let retVal = false;

        if (this.id) {
            retVal = true;
        }

        if (this.unsignedSignatureProperties && this.unsignedSignatureProperties.HasChanged()) {
            retVal = true;
        }

        if (this.unsignedDataObjectProperties && this.unsignedDataObjectProperties.HasChanged()) {
            retVal = true;
        }

        return retVal;
    }

    /**
     * Load state from an XML element
     * @param  {Element} element XML element containing new state
     * @param  {Element} counterSignedXmlElement? Element containing parent signature (needed if there are counter signatures)
     * @returns void
     */
    public LoadXml(element: Element, counterSignedXmlElement?: Element): void {
        super.LoadXml(element);

        this.id = this.GetAttribute(XmlXades.AttributeNames.Id, "", false)!;

        let xmlNode = this.GetChild(XmlXades.ElementNames.UnsignedSignatureProperties, false);
        if (xmlNode) {
            this.unsignedSignatureProperties = new UnsignedSignatureProperties();
            this.unsignedSignatureProperties.LoadXml(xmlNode, counterSignedXmlElement);
        }
        xmlNode = this.GetChild(XmlXades.ElementNames.UnsignedDataObjectProperties);
        if (xmlNode) {
            this.unsignedDataObjectProperties = new UnsignedDataObjectProperties();
            this.unsignedDataObjectProperties.LoadXml(xmlNode);
        }
    }

    /**
     * Returns the XML representation of the this object
     * @returns XML element containing the state of this object
     */
    public GetXml(): Element {
        let document = this.CreateDocument();
        let element = this.CreateElement(document);

        if (this.id) {
            element.setAttribute(XmlXades.AttributeNames.Id, this.id);
        }

        if (this.unsignedSignatureProperties) {
            element.appendChild(document.importNode(this.unsignedSignatureProperties.GetXml(), true));
        }
        else {
            throw new XmlJs.XmlError(XmlJs.XE.CRYPTOGRAPHIC, "UnsignedSignatureProperties should not be null");
        }

        if (this.unsignedDataObjectProperties && this.unsignedDataObjectProperties.HasChanged()) {
            element.appendChild(document.importNode(this.unsignedDataObjectProperties.GetXml(), true));
        }

        return element;
    }
}
