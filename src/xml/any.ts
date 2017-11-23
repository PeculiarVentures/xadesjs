import { XmlElement, XmlContent } from "xml-core";

import { XmlXades } from "./xml";
import { XadesObject, XadesCollection } from "./xml_base";

/**
 * <xsd:element name="Any" type="AnyType"/>
 * <xsd:complexType name="AnyType" mixed="true">
 * 	 <xsd:sequence minOccurs="0" maxOccurs="unbounded">
 * 	   <xsd:any namespace="##any" processContents="lax"/>
 * 	 </xsd:sequence>
 * 	 <xsd:anyAttribute namespace="##any"/>
 * </xsd:complexType>
 */

@XmlElement({
    localName: XmlXades.ElementNames.Any
})
export class Any extends XadesObject {

    @XmlContent()
    Value: string;

}

@XmlElement({
    localName: XmlXades.ElementNames.Any
})
export class AnyCollection extends XadesCollection<XadesObject> { }
