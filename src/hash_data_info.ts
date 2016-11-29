import * as XmlJs from "xmljs";

import { XmlXades } from "./xml";
import { XmlXadesObject } from "./xml_xades";

export class HashDataInfoCollection extends XmlJs.Collection<HashDataInfo> { }

/**
 * <xsd:complexType name="HashDataInfoType">
 *   <xsd:sequence>
 *     <xsd:element name="Transforms" type="ds:TransformsType" minOccurs="0"/>
 *   </xsd:sequence>
 *   <xsd:attribute name="uri" type="xsd:anyURI" use="required"/>
 * </xsd:complexType>
 */

/**
 * The HashDataInfo class contains a uri attribute referencing a data object
 * and a ds:Transforms element indicating the transformations to make to this
 * data object.
 * The sequence of HashDataInfo elements will be used to produce the input of
 * the hash computation process whose result will be included in the
 * timestamp request to be sent to the TSA.
 */
export class HashDataInfo extends XmlXadesObject {

    protected name = XmlXades.ElementNames.HashDataInfo;

    //  Public properties
    /**
     * Uri referencing a data object
     */
    public Uri: string;

    /**
     * Transformations to make to this data object
     */
    public Transforms: XmlDSigJs.Transforms;

    //  Constructors
    /**
     * Default constructor
     */
    public constructor() {
        super();
        this.Transforms = new XmlDSigJs.Transforms();
    }

    //  Public methods
    /**
     * Check to see if something has changed in this instance and needs to be serialized
     * @returns Flag indicating if a member needs serialization
     */
    public HasChanged(): boolean {
        let retVal = false;

        if (this.Uri) {
            retVal = true;
        }

        if (this.Transforms && this.Transforms.HasChanged()) {
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

        this.Uri = this.GetAttribute(XmlXades.AttributeNames.Uri, "", true)!;

        let xmlNodeList = this.GetChildren(XmlDSigJs.XmlSignature.ElementNames.Transforms, XmlDSigJs.XmlSignature.NamespaceURI);
        for (let transform of xmlNodeList) {
            this.Transforms = new XmlDSigJs.Transforms();
            this.Transforms.LoadXml(transform);
        }
    }

    /**
     * Returns the XML representation of the this object
     * @returns XML element containing the state of this object
     */
    public GetXml(): Element {
        let document = this.CreateDocument();
        let element = this.CreateElement(document);

        if (this.Uri)
            element.setAttribute("uri", this.Uri);
        else
            throw new XmlJs.XmlError(XmlJs.XE.CRYPTOGRAPHIC, "Uri is required");

        if (this.Transforms && this.Transforms.HasChanged()) {
            element.appendChild(document.importNode(this.Transforms.GetXml(), true));
        }

        return element;
    }

}
