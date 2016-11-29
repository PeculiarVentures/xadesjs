import * as XmlJs from "xmljs";

import { XmlXades } from "./xml";
import { XmlXadesObject } from "./xml_xades";
import { ObjectIdentifier } from "./object_identifier";

export class DataObjectFormatCollection extends XmlJs.Collection<DataObjectFormat> { }

/**
 * <xsd:element name="DataObjectFormat" type="DataObjectFormatType"/>
 * <xsd:complexType name="DataObjectFormatType">
 *     <xsd:sequence>
 *         <xsd:element name="Description" type="xsd:string" minOccurs="0"/>
 *         <xsd:element name="ObjectIdentifier" type="ObjectIdentifierType" minOccurs="0"/>
 *         <xsd:element name="MimeType" type="xsd:string" minOccurs="0"/>
 *         <xsd:element name="Encoding" type="xsd:anyURI" minOccurs="0"/>
 *      </xsd:sequence>
 *      <xsd:attribute name="ObjectReference" type="xsd:anyURI" use="required"/>
 * </xsd:complexType>
 */

/**
 * The DataObjectFormat element provides information that describes the
 * format of the signed data object. This element must be present when it
 * is mandatory to present the signed data object to human users on
 * verification.
 * This is a signed property that qualifies one specific signed data
 * object. In consequence, a XAdES signature may contain more than one
 * DataObjectFormat elements, each one qualifying one signed data object.
 */
export class DataObjectFormat extends XmlXadesObject {

    protected name = XmlXades.ElementNames.DataObjectFormat;

    // Public properties
    /**
     * The mandatory ObjectReference attribute refers to the Reference element
     * of the signature corresponding with the data object qualified by this
     * property.
     */
    public ObjectReference: string;

    /**
     * Textual information related to the signed data object
     */
    public Description: string;

    /**
     * An identifier indicating the type of the signed data object
     */
    public ObjectIdentifier: ObjectIdentifier;

    /**
     * An indication of the MIME type of the signed data object
     */
    public MimeType: string;


    /**
     * An indication of the encoding format of the signed data object
     */
    public Encoding: string;


    public constructor() {
        super();

        this.ObjectIdentifier = new ObjectIdentifier(XmlXades.ElementNames.ObjectIdentifier);
    }

    // Public methods

    /**
     * Check to see if something has changed in this instance and needs to be serialized
     * @returns Flag indicating if a member needs serialization
     */
    public HasChanged(): boolean {
        let retVal = false;

        if (this.ObjectReference) {
            retVal = true;
        }

        if (this.Description) {
            retVal = true;
        }

        if (this.ObjectIdentifier && this.ObjectIdentifier.HasChanged()) {
            retVal = true;
        }

        if (this.MimeType) {
            retVal = true;
        }

        if (this.Encoding) {
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

        this.ObjectReference = this.GetAttribute(XmlXades.AttributeNames.ObjectReference, "", true) !;

        let xmlDescription = this.GetElement(XmlXades.ElementNames.Description, false);
        if (xmlDescription) {
            this.Description = xmlDescription.textContent!;
        }

        let xmlObjectIdentifier = this.GetElement(XmlXades.ElementNames.ObjectIdentifier, false);
        if (xmlObjectIdentifier) {
            this.ObjectIdentifier = new ObjectIdentifier(XmlXades.ElementNames.ObjectIdentifier);
            this.ObjectIdentifier.LoadXml(xmlObjectIdentifier);
        }

        let xmlMimeType = this.GetElement(XmlXades.ElementNames.MimeType, false);
        if (xmlMimeType) {
            this.MimeType = xmlMimeType.textContent!;
        }

        let xmlEncoding = this.GetElement(XmlXades.ElementNames.Encoding, false);
        if (xmlEncoding) {
            this.Encoding = xmlEncoding.textContent!;
        }
    }

    /**
     * Returns the XML representation of the this object
     * @returns XML element containing the state of this object
     */
    public GetXml(): Element {
        let document = this.CreateDocument();
        let element = this.CreateElement(document);

        if ((this.ObjectReference) && (this.ObjectReference)) {
            element.setAttribute(XmlXades.AttributeNames.ObjectReference, this.ObjectReference);
        }
        else {
            throw new XmlJs.XmlError(XmlJs.XE.CRYPTOGRAPHIC, "Attribute ObjectReference missing");
        }

        if (this.Description) {
            let xmlDescription = document.createElementNS(XmlXades.NamespaceURI, this.GetPrefix() + XmlXades.ElementNames.Description);
            xmlDescription.textContent = this.Description;
            element.appendChild(xmlDescription);
        }

        if (this.ObjectIdentifier && this.ObjectIdentifier.HasChanged()) {
            element.appendChild(document.importNode(this.ObjectIdentifier.GetXml(), true));
        }

        if (this.MimeType) {
            let xmlMimeType = document.createElementNS(XmlXades.NamespaceURI, this.GetPrefix() + XmlXades.ElementNames.MimeType);
            xmlMimeType.textContent = this.MimeType;
            element.appendChild(xmlMimeType);
        }

        if (this.Encoding) {
            let xmlEncoding = document.createElementNS(XmlXades.NamespaceURI, this.GetPrefix() + XmlXades.ElementNames.Encoding);
            xmlEncoding.textContent = this.Encoding;
            element.appendChild(xmlEncoding);
        }

        return element;
    }

}
