import {
  XmlAttribute, XmlChildElement, XmlElement,
} from 'xml-core';
import { ObjectIdentifier } from './object_identifier';
import { XmlXades } from './xml';
import { XadesObject } from './xml_base';

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
  @XmlAttribute({
    localName: XmlXades.AttributeNames.ObjectReference, required: true,
  })
  public ObjectReference: string;

  @XmlChildElement({
    localName: XmlXades.ElementNames.Description,
    namespaceURI: XmlXades.NamespaceURI,
    prefix: XmlXades.DefaultPrefix,
  })
  public Description: string;

  @XmlChildElement({ parser: ObjectIdentifier })
  public ObjectIdentifier: ObjectIdentifier;

  @XmlChildElement({
    localName: XmlXades.ElementNames.MimeType,
    namespaceURI: XmlXades.NamespaceURI,
    prefix: XmlXades.DefaultPrefix,
  })
  public MimeType: string;

  @XmlChildElement({
    localName: XmlXades.ElementNames.Encoding,
    namespaceURI: XmlXades.NamespaceURI,
    prefix: XmlXades.DefaultPrefix,
  })
  public Encoding: string;
}
