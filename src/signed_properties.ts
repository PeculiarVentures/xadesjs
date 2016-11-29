import * as XmlJs from "xmljs";

import { XmlXades } from "./xml";
import { XmlXadesObject } from "./xml_xades";
import { SignedSignatureProperties } from "./signed_signature_properties";
import { SignedDataObjectProperties } from "./signed_data_object_properties";

/**
 * <xsd:element name="SignedProperties" type="SignedPropertiesType"/>
 * <xsd:complexType name="SignedPropertiesType">
 *     <xsd:sequence>
 *         <xsd:element ref="SignedSignatureProperties" minOccurs="0"/>
 *         <xsd:element ref="SignedDataObjectProperties" minOccurs="0"/>
 *     </xsd:sequence>
 *     <xsd:attribute name="Id" type="xsd:ID" use="optional"/>
 * </xsd:complexType>
 */

// Default value for the SignedProperties Id attribute
const DefaultSignedPropertiesId = "SignedPropertiesId";

/**
 * The SignedProperties element contains a number of properties that are
 * collectively signed by the XMLDSIG signature
 */
export class SignedProperties extends XmlXadesObject {

    protected name = XmlXades.ElementNames.SignedProperties;

    // Private variables
    private id: string;
    private signedSignatureProperties: SignedSignatureProperties;
    private signedDataObjectProperties: SignedDataObjectProperties;

    // Public properties

    /**
     * This Id is used to be able to point the signature reference to this
     * element.  It is initialized by default.
     * @returns string
     */
    public get Id(): string {
        return this.id;
    }
    public set Id(value: string) {
        this.id = value;
    }

    /**
     * The properties that qualify the signature itself or the signer are
     * included as content of the SignedSignatureProperties element
     * @returns SignedSignatureProperties
     */
    public get SignedSignatureProperties(): SignedSignatureProperties {
        return this.signedSignatureProperties;
    }
    public set SignedSignatureProperties(value: SignedSignatureProperties) {
        this.signedSignatureProperties = value;
    }

    /**
     * The SignedDataObjectProperties element contains properties that qualify
     * some of the signed data objects
     * @returns SignedDataObjectProperties
     */
    public get SignedDataObjectProperties(): SignedDataObjectProperties {
        return this.signedDataObjectProperties;
    }
    public set SignedDataObjectProperties(value: SignedDataObjectProperties) {
        this.signedDataObjectProperties = value;
    }

    /**
     * Default constructor
     */
    public constructor() {
        super();
        this.id = DefaultSignedPropertiesId; // This is where signature reference points to
        this.signedSignatureProperties = new SignedSignatureProperties();
        this.signedDataObjectProperties = new SignedDataObjectProperties();
    }

    // Public methods

    /**
     * Check to see if something has changed in this instance and needs to be serialized
     * @returns boolean Flag indicating if a member needs serialization< /returns>
     */
    public HasChanged(): boolean {
        let retVal = false;

        if (!this.id) {
            retVal = true;
        }

        if (this.signedSignatureProperties && this.signedSignatureProperties.HasChanged()) {
            retVal = true;
        }

        if (this.signedDataObjectProperties && this.signedDataObjectProperties.HasChanged()) {
            retVal = true;
        }

        return retVal;
    }

    /**
     * Load state from an XML element
     * @param element XML element containing new state
     */
    public LoadXml(element: Element): void {
        super.LoadXml(element);

        this.id = this.GetAttribute(XmlXades.AttributeNames.Id, "", false)!;

        let xml = this.GetElement(XmlXades.ElementNames.SignedSignatureProperties, true)!;
        this.signedSignatureProperties = new SignedSignatureProperties();
        this.signedSignatureProperties.LoadXml(xml);

        xml = this.GetElement(XmlXades.ElementNames.SignedDataObjectProperties, false);
        if (xml) {
            this.signedDataObjectProperties = new SignedDataObjectProperties();
            this.signedDataObjectProperties.LoadXml(xml);
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

        if (this.signedSignatureProperties) {
            element.appendChild(document.importNode(this.signedSignatureProperties.GetXml(), true));
        }
        else {
            // TODO: scheme does not match
            throw new XmlJs.XmlError(XmlJs.XE.CRYPTOGRAPHIC, "SignedSignatureProperties should not be null");
        }

        if (this.signedDataObjectProperties && this.signedDataObjectProperties.HasChanged()) {
            element.appendChild(document.importNode(this.signedDataObjectProperties.GetXml(), true));
        }

        return element;
    }
}
