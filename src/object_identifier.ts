import * as XmlJs from "xmljs";

import { XmlXades } from "./xml";
import { XmlXadesTaggedObject } from "./xades_tagged_object";

/**
 * <xsd:complexType name="ObjectIdentifierType">
 *   <xsd:sequence>
 *     <xsd:element name="Identifier" type="xsd:anyURI"/>
 *     <xsd:element name="Description" type="xsd:string" minOccurs="0"/>
 *     <xsd:element name="DocumentationReferences" type="DocumentationReferencesType" minOccurs="0"/>
 *   </xsd:sequence>
 * </xsd:complexType>
 */

/**
 * ObjectIdentifier allows the specification of an unique and permanent
 * object of an object and some additional information about the nature of
 * the	data object
 */
export class ObjectIdentifier extends XmlXadesTaggedObject {

    // Public properties

    /**
     * Specification of an unique and permanent identifier
     */
    public Identifier: Identifier;

    /**
     * Textual description of the nature of the data object
     */
    public Description: string;

    /**
     * References to documents where additional information about the
     * nature of the data object can be found
     */
    public DocumentationReferences: DocumentationReferences;

    // Constructors
    /**
     * Default constructor
     */
    public constructor(tagName: string) {
        super(tagName);
        this.Identifier = new Identifier();
        this.DocumentationReferences = new DocumentationReferences();
    }

    // Public methods
    /**
     * Check to see if something has changed in this instance and needs to be serialized
     * @returns Flag indicating if a member needs serialization
     */
    public HasChanged(): boolean {
        let retVal = false;

        if (this.Identifier && this.Identifier.HasChanged()) {
            retVal = true;
        }

        if (this.Description) {
            retVal = true;
        }

        if (this.DocumentationReferences && this.DocumentationReferences.HasChanged()) {
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

        let xmlIdentifier = this.GetElement(XmlXades.ElementNames.Identifier);
        this.Identifier = new Identifier();
        this.Identifier.LoadXml(xmlIdentifier);

        let xmlDescription = this.GetElement(XmlXades.ElementNames.Description, false);
        if (xmlDescription) {
            this.Description = xmlDescription.textContent!;
        }

        let xmlDocumentationReferences = this.GetElement(XmlXades.ElementNames.DocumentationReferences, false);
        if (xmlDocumentationReferences) {
            this.DocumentationReferences = new DocumentationReferences();
            this.DocumentationReferences.LoadXml(xmlDocumentationReferences);
        }
    }

    /**
     * Returns the XML representation of the this object
     * @returns XML element containing the state of this object
     */
    public GetXml(): Element {
        let document = this.CreateDocument();
        let element = this.CreateElement(document);


        if (this.Identifier && this.Identifier.HasChanged()) {
            element.appendChild(document.importNode(this.Identifier.GetXml(), true));
        }
        else {
            throw new XmlJs.XmlError(XmlJs.XE.CRYPTOGRAPHIC, "Identifier element missing in OjectIdentifier");
        }

        if (this.Description) {
            let xmlDescription = document.createElementNS(XmlXades.NamespaceURI, this.GetPrefix() + XmlXades.ElementNames.Description);
            xmlDescription.textContent = this.Description;
            element.appendChild(xmlDescription);
        }

        if (this.DocumentationReferences && this.DocumentationReferences.HasChanged()) {
            element.appendChild(document.importNode(this.DocumentationReferences.GetXml(), true));
        }

        return element;
    }

}
