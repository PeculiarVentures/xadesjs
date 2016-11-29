import * as XmlJs from "xmljs";

import { XmlXades } from "./xml";
import { XmlXadesTaggedObject } from "./xades_tagged_object";

/**
 * <xsd:element name="EncapsulatedPKIData" type="EncapsulatedPKIDataType"/>
 * <xsd:complexType name="EncapsulatedPKIDataType">
 *   <xsd:complexContent>
 *     <xsd:extension base="xsd:base64Binary">
 *       <xsd:attribute name="Id" type="xsd:ID" use="optional"/>
 *     </xsd:extension>
 *   </xsd:complexContent>
 * </xsd:complexType>
 */

/**
 * EncapsulatedPKIData is used to incorporate a piece of PKI data
 * into an XML structure whereas the PKI data is encoded using an ASN.1
 * encoding mechanism. Examples of such PKI data that are widely used at
 * the time include X509 certificates and revocation lists, OCSP responses,
 * attribute certificates and time-stamps.
 */
export abstract class EncapsulatedPKIData extends XmlXadesTaggedObject {

    /**
     * The optional ID attribute can be used to make a reference to an element
     * of this data type.
     */
    public Id: string;

    /**
     * Base64 encoded content of this data type 
     */
    public PkiData: Uint8Array;

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

        if (this.PkiData && this.PkiData.length > 0) {
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

        this.Id = this.GetAttribute(XmlXades.AttributeNames.Id, "", false) !;
        this.PkiData = XmlJs.Convert.FromBase64(element.textContent!);
    }

    /**
     * Returns the XML representation of the this object
     * @returns XML element containing the state of this object
     */
    public GetXml(): Element {
        let document = this.CreateDocument();
        let element = this.CreateElement(document);

        if (this.Id) {
            element.setAttribute(XmlXades.AttributeNames.Id, this.Id);
        }

        if (this.PkiData && this.PkiData.length > 0) {
            element.textContent = XmlJs.Convert.ToBase64(this.PkiData);
        }

        return element;
    }

    /**
     * Returns the PKI representation of the encapsulated PKI data object
     * @returns PKI object
     */
    public abstract GetPki(): any;

    /**
     * Load PkiData from an PKI object
     * @param {ASN1Object} pki PKI object
     */
    public LoadPki(pki: any) {
        this.PkiData = pki.Encode();
    }

}
