import { XmlElement, XmlAttribute } from "xml-core";

import { XmlXades } from "./xml";
import { XadesCollection } from "./xml_base";
import { Any } from "./any";

/**
 * 
 * <xsd:element name="UnsignedDataObjectProperties" type="UnsignedDataObjectPropertiesType"/>
 * <xsd:complexType name="UnsignedDataObjectPropertiesType">
 *     <xsd:sequence>
 *         <xsd:element name="UnsignedDataObjectProperty" type="AnyType" maxOccurs="unbounded"/>
 *     </xsd:sequence>
 *     <xsd:attribute name="Id" type="xsd:ID" use="optional"/>
 * </xsd:complexType>
 * 
 */

@XmlElement({ localName: XmlXades.ElementNames.UnsignedDataObjectProperty })
export class UnsignedDataObjectProperty extends Any { }

@XmlElement({ localName: XmlXades.ElementNames.UnsignedSignatureProperties, parser: UnsignedDataObjectProperty })
export class UnsignedDataObjectProperties extends XadesCollection<UnsignedDataObjectProperty> {

    @XmlAttribute({ localName: XmlXades.AttributeNames.Id, defaultValue: "" })
    Id: string;

}