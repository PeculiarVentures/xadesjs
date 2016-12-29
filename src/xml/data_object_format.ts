import { XmlElement, XmlAttribute, XmlChildElement } from "xml-core";

import { XmlXades } from "./xml";
import { XadesObject } from "./xml_base";
import { ObjectIdentifier } from "./object_identifier";

/**
 * 
 * <xsd:element name="DataObjectFormat" type="DataObjectFormatType"/>
 * <xsd:complexType name="DataObjectFormatType">
 *     <xsd:sequence>
 *         <xsd:element name="Description" type="xsd:string" minOccurs="0"/>
 *         <xsd:element name="ObjectIdentifier" type="ObjectIdentifierType" minOccurs="0"/>
 *         <xsd:element name="MimeType" type="xsd:string" minOccurs="0"/>
 *         <xsd:element name="Encoding" type="xsd:anyURI" minOccurs="0"/>
 *     </xsd:sequence>
 *     <xsd:attribute name="ObjectReference" type="xsd:anyURI" use="required"/>
 * </xsd:complexType>
 * 
 */

@XmlElement({ localName: XmlXades.ElementNames.DataObjectFormat })
export class DataObjectFormat extends XadesObject {

    @XmlAttribute({ localName: XmlXades.AttributeNames.ObjectReference, required: true })
    ObjectReference: string;

    @XmlChildElement({ localName: XmlXades.ElementNames.Description })
    Description: string;

    @XmlChildElement({ parser: ObjectIdentifier })
    ObjectIdentifier: ObjectIdentifier;

    @XmlChildElement({ localName: XmlXades.ElementNames.MimeType })
    MimeType: string;

    @XmlChildElement({ localName: XmlXades.ElementNames.Encoding })
    Encoding: string;
}