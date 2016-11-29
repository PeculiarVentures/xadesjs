import * as XmlJs from "xmljs";

import { XmlXades } from "./xml";
import { XmlXadesObject } from "./xml_xades";
import { SignedProperties } from "./signed_properties";
import { UnsignedProperties } from "./unsigned_properties";

/**
 * <xsd:element name="QualifyingProperties" type="QualifyingPropertiesType"/>
 * <xsd:complexType name="QualifyingPropertiesType">
 *     <xsd:sequence>
 *         <xsd:element ref="SignedProperties" minOccurs="0"/>
 *         <xsd:element ref="UnsignedProperties" minOccurs="0"/>
 *     </xsd:sequence>
 *     <xsd:attribute name="Target" type="xsd:anyURI" use="required"/>
 *     <xsd:attribute name="Id" type="xsd:ID" use="optional"/>
 * </xsd:complexType>
 */

/**
* The QualifyingProperties element acts as a container element for
* all the qualifying information that should be added to an XML
* signature
*/
export class QualifyingProperties extends XmlXadesObject {

    protected name = XmlXades.ElementNames.QualifyingProperties;

    // Private variables
    private id: string;
    private target: string;
    private signedProperties: SignedProperties;
    private unsignedProperties: UnsignedProperties;

    // Public properties

    /**
     * The optional Id attribute can be used to make a reference to the
     * QualifyingProperties container
     * @returns string
     */
    public get Id(): string {
        return this.id;
    }
    public set Id(value: string) {
        this.id = value;
    }

    /**
     * The mandatory Target attribute refers to the XML signature with which the
     * qualifying properties are associated.
     * @returns string
     */
    public get Target(): string {
        return this.target;
    }
    public set Target(value: string) {
        this.target = value;
    }

    /**
     * The SignedProperties element contains a number of properties that are
     * collectively signed by the XMLDSIG signature
     * @returns SignedProperties
     */
    public get SignedProperties(): SignedProperties {
        return this.signedProperties;
    }
    public set SignedProperties(value: SignedProperties) {
        this.signedProperties = value;
    }


    /**
     * The UnsignedProperties element contains a number of properties that are
     * not signed by the XMLDSIG signature
     * @returns UnsignedProperties
     */
    public get UnsignedProperties(): UnsignedProperties {
        return this.unsignedProperties;
    }
    public set UnsignedProperties(value: UnsignedProperties) {
        this.unsignedProperties = value;
    }

    /**
     * Default constructor
     */
    public constructor() {
        super();
        this.signedProperties = new SignedProperties();
        this.unsignedProperties = new UnsignedProperties();
    }

    // Public methods

    /**
     * Check to see if something has changed in this instance and needs to be serialized
     * @returns boolean Flag indicating if a member needs serialization
     */
    public HasChanged(): boolean {
        let retVal = false;

        if (!this.id) {
            retVal = true;
        }

        if (!this.target) {
            retVal = true;
        }

        if (this.signedProperties && this.signedProperties.HasChanged()) {
            retVal = true;
        }

        if (this.unsignedProperties && this.unsignedProperties.HasChanged()) {
            retVal = true;
        }

        return retVal;
    }

    /**
     * Load state from an XML element
     * @param {Element} element XML element containing new state
     * @param {Element} counterSignedXmlElement Element containing parent signature (needed if there are counter signatures)
     */
    public LoadXml(element: Element, counterSignedXmlElement?: Element) {
        super.LoadXml(element);

        this.id = this.GetAttribute(XmlXades.AttributeNames.Id, "", false)!;
        this.target = this.GetAttribute(XmlXades.AttributeNames.Target, "", true)!;

        // TODO: Code does not match the schema
        this.signedProperties = new SignedProperties();
        this.signedProperties.LoadXml(this.GetElement(XmlXades.ElementNames.SignedProperties, true)!);

        let xmlUnsignedProperties = this.GetElement(XmlXades.ElementNames.UnsignedProperties, false);
        if (xmlUnsignedProperties) {
            this.unsignedProperties = new UnsignedProperties();
            this.unsignedProperties.LoadXml(xmlUnsignedProperties, counterSignedXmlElement);
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

        if (this.target) {
            element.setAttribute(XmlXades.AttributeNames.Target, this.target);
        }
        else {
            throw new XmlJs.XmlError(XmlJs.XE.CRYPTOGRAPHIC, "QualifyingProperties Target attribute has no value");
        }

        if (this.signedProperties && this.signedProperties.HasChanged()) {
            element.appendChild(document.importNode(this.signedProperties.GetXml(), true));
        }
        if (this.unsignedProperties && this.unsignedProperties.HasChanged()) {
            element.appendChild(document.importNode(this.unsignedProperties.GetXml(), true));
        }

        return element;
    }

}
