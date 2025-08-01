import {
  XmlAttribute, XmlContent, XmlElement,
  IConverter, XmlBase64Converter,
} from 'xml-core';
import { XmlXades } from './xml';
import { XadesObject } from './xml_base';

/**
 *
 * <xsd:element name="EncapsulatedPKIData" type="EncapsulatedPKIDataType"/>
 * <xsd:complexType name="EncapsulatedPKIDataType">
 *   <xsd:simpleContent>
 *     <xsd:extension base="xsd:base64Binary">
 *       <xsd:attribute name="Id" type="xsd:ID" use="optional"/>
 *       <xsd:attribute name="Encoding" type="xsd:anyURI" use="optional"/>
 *     </xsd:extension>
 *   </xsd:simpleContent>
 * </xsd:complexType>
 *
 */

const XmlEncodingConverter: IConverter<EncodingType> = {
  get: (value: EncodingType) => {
    switch (value) {
      case 'der':
      case 'ber':
      case 'cer':
      case 'per':
      case 'xer':
        return `http://uri.etsi.org/01903/v1.2.2#${value.toUpperCase()}`;
    }

    return void 0;
  },
  set: (value: string) => {
    const regexp = /#(\w+)$/;
    const res = regexp.exec(value);

    if (res) {
      return res[1].toLowerCase() as EncodingType;
    }

    return null;
  },
};

export type EncodingType = 'der' | 'ber' | 'cer' | 'per' | 'xer' | null;

@XmlElement({ localName: 'EncapsulatedPKIData' })
export class EncapsulatedPKIData extends XadesObject {
  @XmlAttribute({
    localName: XmlXades.AttributeNames.Id,
    defaultValue: '',
  })
  public Id: string;

  @XmlAttribute({
    localName: XmlXades.AttributeNames.Encoding,
    defaultValue: null,
    converter: XmlEncodingConverter,
  })
  public Encoding: EncodingType;

  @XmlContent({
    required: true,
    converter: XmlBase64Converter,
  })
  public Value: Uint8Array;
}
