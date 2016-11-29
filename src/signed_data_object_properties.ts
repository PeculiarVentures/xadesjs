import * as XmlJs from "xmljs";

import { XmlXades } from "./xml";
import { XmlXadesObject } from "./xml_xades";
import { DataObjectFormatCollection } from "./data_object_format";
import { CommitmentTypeIndicationCollection } from "./commitment_type_indication";

/**
 * <xsd:element name="SignedDataObjectProperties"   type="SignedDataObjectPropertiesType"/>
 * <xsd:complexType name="SignedDataObjectPropertiesType">
 *   <xsd:sequence>
 *     <xsd:element name="DataObjectFormat" type="DataObjectFormatType" minOccurs="0" maxOccurs="unbounded"/>
 *     <xsd:element name="CommitmentTypeIndication" type="CommitmentTypeIndicationType" minOccurs="0" maxOccurs="unbounded"/>
 *     <xsd:element name="AllDataObjectsTimeStamp" type="TimeStampType" minOccurs="0" maxOccurs="unbounded"/>
 *     <xsd:element name="IndividualDataObjectsTimeStamp" type="TimeStampType" minOccurs="0" maxOccurs="unbounded"/>
 *   </xsd:sequence>
 * </xsd:complexType>
 */

/**
 * The SignedDataObjectProperties element contains properties that qualify
 * some of the signed data objects
 */
export class SignedDataObjectProperties extends XmlXadesObject {

    protected name = XmlXades.ElementNames.SignedDataObjectProperties;

    // Public properties

    /**
     * Collection of signed data object formats
     */
    public DataObjectFormatCollection: DataObjectFormatCollection;
    /**
     * Collection of commitment type indications
     */
    public CommitmentTypeIndicationCollection: CommitmentTypeIndicationCollection;
    /**
     * Collection of all data object timestamps
     */
    public AllDataObjectsTimeStampCollection: AllDataObjectsTimeStampCollection;
    /**
     * Collection of individual data object timestamps
     */
    public IndividualDataObjectsTimeStampCollection: IndividualDataObjectsTimeStampCollection;

    /**
     * Default constructor
     */
    public constructor() {
        super();
        this.DataObjectFormatCollection = new DataObjectFormatCollection();
        this.CommitmentTypeIndicationCollection = new CommitmentTypeIndicationCollection();
        this.AllDataObjectsTimeStampCollection = new AllDataObjectsTimeStampCollection();
        this.IndividualDataObjectsTimeStampCollection = new IndividualDataObjectsTimeStampCollection();
    }

    // Protected methods

    protected GetItemsFromElement(element: Element, itemElementName: string, itemCollection: XmlJs.Collection<XmlXadesObject>, ItemClass: any, tagName?: string): void {
        itemCollection.Clear();
        let nodeList = element.getElementsByTagNameNS(XmlXades.NamespaceURI, itemElementName);

        try {
            for (let i = 0; i < nodeList.length; i++) {
                let xmlItem = nodeList.item(i) as Element;
                let newItem = new ItemClass(tagName);
                newItem.LoadXml(xmlItem);
                itemCollection.Add(newItem);
            }
        }
        finally { };
    }

    protected GetXmlFromCollection(element: Element, collection: XmlJs.Collection<XmlXadesObject>) {
        if (collection.Count > 0) {
            let items = collection.GetIterator();
            for (let item of items) {
                if (item.HasChanged()) {
                    element.appendChild(item.GetXml());
                }
            }
        }
    }

    // Public methods

    /**
     * Check to see if something has changed in this instance and needs to be serialized
     * @returns Flag indicating if a member needs serialization
     */
    public HasChanged(): boolean {
        let retVal = false;

        if (this.DataObjectFormatCollection.Count > 0) {
            retVal = true;
        }

        if (this.CommitmentTypeIndicationCollection.Count > 0) {
            retVal = true;
        }

        if (this.AllDataObjectsTimeStampCollection.Count > 0) {
            retVal = true;
        }

        if (this.IndividualDataObjectsTimeStampCollection.Count > 0) {
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

        this.GetItemsFromElement(element, XmlXades.ElementNames.DataObjectFormat, this.DataObjectFormatCollection, DataObjectFormat);
        this.GetItemsFromElement(element, XmlXades.ElementNames.CommitmentTypeIndication, this.CommitmentTypeIndicationCollection, CommitmentTypeIndication);
        this.GetItemsFromElement(element, XmlXades.ElementNames.AllDataObjectsTimeStamp, this.AllDataObjectsTimeStampCollection, XadesTimeStamp, XmlXades.ElementNames.AllDataObjectsTimeStamp);
        this.GetItemsFromElement(element, XmlXades.ElementNames.IndividualDataObjectsTimeStamp, this.IndividualDataObjectsTimeStampCollection, XadesTimeStamp, XmlXades.ElementNames.IndividualDataObjectsTimeStamp);
    }

    /**
     * Returns the XML representation of the this object
     * @returns XML element containing the state of this object
     */
    public GetXml(): Element {
        let document = this.CreateDocument();
        let element = this.CreateElement(document);

        this.GetXmlFromCollection(element, this.DataObjectFormatCollection);
        this.GetXmlFromCollection(element, this.CommitmentTypeIndicationCollection);
        this.GetXmlFromCollection(element, this.AllDataObjectsTimeStampCollection);
        this.GetXmlFromCollection(element, this.IndividualDataObjectsTimeStampCollection);

        return element;
    }

}
