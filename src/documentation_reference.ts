import { XmlXades } from "./xml";
import { XmlXadesObject, XmlXadesCollection } from "./xml_xades";

/**
 * <xsd:element name="DocumentationReference" type="xsd:anyURI"/>
 */

/**
 * DocumentationReference points to further explanatory documentation
 * of the object identifier
 */
export class DocumentationReference extends XmlXadesObject {

    protected name = XmlXades.ElementNames.DocumentationReference;

    // Public properties
    /**
     * Pointer to further explanatory documentation of the object identifier
     */
    public DocumentationReferenceUri: string;


    // Constructors
    public constructor() {
        super();
    }

    // Public methods
    /**
     * Check to see if something has changed in this instance and needs to be serialized
     * @returns Flag indicating if a member needs serialization
     */
    public HasChanged(): boolean {
        let retVal = false;

        if (this.DocumentationReferenceUri) {
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

        this.DocumentationReferenceUri = element.textContent!;
    }

    /**
     * Returns the XML representation of the this object
     * @returns XML element containing the state of this object
     */
    public GetXml(): Element {
        let document = this.CreateDocument();
        let element = this.CreateElement(document);

        element.textContent = this.DocumentationReferenceUri;

        return element;
    }

}

/**
 * <xsd:complexType name="DocumentationReferencesType">  
 *   <xsd:sequence maxOccurs="unbounded">
 *     <xsd:element name="DocumentationReference" type="xsd:anyURI"/>
 *   </xsd:sequence>
 * </xsd:complexType>
 */

/**
 * This class contains a collection of DocumentationReferences
 */
export class DocumentationReferences extends XmlXadesCollection<DocumentationReference> {

    protected name = XmlXades.ElementNames.DocumentationReferences;

    // Protetced methods

    protected OnLoadChildElement(element: Element): any {
        if (element.namespaceURI === XmlXades.NamespaceURI && element.localName === XmlXades.ElementNames.DocumentationReference) {
            let item = new DocumentationReference();
            item.LoadXml(element);
            return item;
        }
    }

}
