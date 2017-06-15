import { XmlElement, XmlChildElement } from "xml-core";
import { Signature } from "xmldsigjs";

import { XmlXades } from "./xml";
import { XadesObject } from "./xml_base";
import { UnsignedSignatureProperty } from "./unsigned_signature_properties";

/**
 *
 * <xsd:element name="CounterSignature" type="CounterSignatureType"/>
 * <xsd:complexType name="CounterSignatureType">
 *     <xsd:sequence>
 *         <xsd:element ref="ds:Signature"/>
 *     </xsd:sequence>
 * </xsd:complexType>
 *
 */

@XmlElement({ localName: XmlXades.ElementNames.CounterSignature })
export class CounterSignature extends XadesObject implements UnsignedSignatureProperty {

    @XmlChildElement({ parser: Signature, required: true })
    Signature: Signature;

}