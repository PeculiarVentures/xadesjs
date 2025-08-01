import { XmlChildElement, XmlElement } from 'xml-core';
import { XmlXades } from './xml';
import { XadesObject } from './xml_base';

/**
 *
 * <xsd:element name="SignatureProductionPlace" type="SignatureProductionPlaceType"/>
 * <xsd:complexType name="SignatureProductionPlaceType">
 *     <xsd:sequence>
 *         <xsd:element name="City" type="xsd:string" minOccurs="0"/>
 *         <xsd:element name="StateOrProvince" type="xsd:string" minOccurs="0"/>
 *         <xsd:element name="PostalCode" type="xsd:string" minOccurs="0"/>
 *         <xsd:element name="CountryName" type="xsd:string" minOccurs="0"/>
 *     </xsd:sequence>
 * </xsd:complexType>
 *
 */

@XmlElement({ localName: XmlXades.ElementNames.SignatureProductionPlace })
export class SignatureProductionPlace extends XadesObject {
  @XmlChildElement({
    localName: XmlXades.ElementNames.City,
    defaultValue: '',
    namespaceURI: XmlXades.NamespaceURI,
    prefix: XmlXades.DefaultPrefix,
  })
  public City: string;

  @XmlChildElement({
    localName: XmlXades.ElementNames.StateOrProvince,
    defaultValue: '',
    namespaceURI: XmlXades.NamespaceURI,
    prefix: XmlXades.DefaultPrefix,
  })
  public StateOrProvince: string;

  @XmlChildElement({
    localName: XmlXades.ElementNames.PostalCode,
    defaultValue: '',
    namespaceURI: XmlXades.NamespaceURI,
    prefix: XmlXades.DefaultPrefix,
  })
  public PostalCode: string;

  @XmlChildElement({
    localName: XmlXades.ElementNames.CountryName,
    defaultValue: '',
    namespaceURI: XmlXades.NamespaceURI,
    prefix: XmlXades.DefaultPrefix,
  })
  public CountryName: string;
}
