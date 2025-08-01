import {
  XmlAttribute, XmlChildElement, XmlElement,
  XmlBase64Converter,
} from 'xml-core';
import {
  CanonicalizationMethod, DigestMethod, XmlSignature,
} from 'xmldsigjs';
import { Any } from './any';
import { EncapsulatedPKIData } from './encapsulated_pki_data';
import { XmlXades } from './xml';
import { XadesCollection, XadesObject } from './xml_base';

/**
 *
 * <xsd:element name="Include" type="IncludeType"/>
 * <xsd:complexType name="IncludeType">
 *   <xsd:attribute name="URI" type="xsd:anyURI" use="required"/>
 *   <xsd:attribute name="referencedData" type="xsd:boolean" use="optional"/>
 * </xsd:complexType>
 * <xsd:element name="ReferenceInfo" type="ReferenceInfoType"/>
 * <xsd:complexType name="ReferenceInfoType">
 *   <xsd:sequence>
 *     <xsd:element ref="ds:DigestMethod"/>
 *     <xsd:element ref="ds:DigestValue"/>
 *   </xsd:sequence>
 *   <xsd:attribute name="Id" type="xsd:ID" use="optional"/>
 *   <xsd:attribute name="URI" type="xsd:anyURI" use="optional"/>
 * </xsd:complexType>
 * <xsd:complexType name="GenericTimeStampType" abstract="true">
 *   <xsd:sequence>
 *     <xsd:choice minOccurs="0">
 *       <xsd:element ref="Include" minOccurs="0" maxOccurs="unbounded"/>
 *       <xsd:element ref="ReferenceInfo" maxOccurs="unbounded"/>
 *     </xsd:choice>
 *     <xsd:element ref="ds:CanonicalizationMethod" minOccurs="0"/>
 *     <xsd:choice maxOccurs="unbounded">
 *       <xsd:element name="EncapsulatedTimeStamp" type="EncapsulatedPKIDataType"/>
 *       <xsd:element name="XMLTimeStamp" type="AnyType"/>
 *     </xsd:choice>
 *   </xsd:sequence>
 *   <xsd:attribute name="Id" type="xsd:ID" use="optional"/>
 * </xsd:complexType>
 *
 */

@XmlElement({ localName: XmlXades.ElementNames.Include })
export class Include extends XadesObject {
  @XmlAttribute({
    localName: XmlXades.AttributeNames.URI,
    defaultValue: '',
    required: true,
  })
  public Uri: string;

  @XmlAttribute({
    localName: XmlXades.AttributeNames.ReferencedData,
    defaultValue: false,
  })
  public ReferencedData: boolean;
}

@XmlElement({ localName: XmlXades.ElementNames.ReferenceInfo })
export class ReferenceInfo extends XadesObject {
  @XmlAttribute({
    localName: XmlXades.AttributeNames.URI, defaultValue: '',
  })
  public Uri: string;

  @XmlAttribute({
    localName: XmlXades.AttributeNames.Id, defaultValue: '',
  })
  public Id: string;

  /**
     * Gets or sets the digest method Uniform Resource Identifier (URI) of the current
     */
  @XmlChildElement({
    required: true,
    parser: DigestMethod,
  })
  public DigestMethod = new DigestMethod();

  /**
     * Gets or sets the digest value of the current Reference.
     */
  @XmlChildElement({
    required: true,
    localName: XmlSignature.ElementNames.DigestValue,
    namespaceURI: XmlSignature.NamespaceURI,
    prefix: XmlSignature.DefaultPrefix,
    converter: XmlBase64Converter,
  })
  public DigestValue: Uint8Array;
}

@XmlElement({
  localName: 'ReferenceInfos', parser: ReferenceInfo,
})
export class ReferenceInfos extends XadesCollection<ReferenceInfo> {
}

@XmlElement({ localName: XmlXades.ElementNames.EncapsulatedTimeStamp })
export class EncapsulatedTimeStamp extends EncapsulatedPKIData { }

@XmlElement({
  localName: 'EncapsulatedPKIDatas', parser: EncapsulatedTimeStamp,
})
export class EncapsulatedTimeStampCollection extends XadesCollection<EncapsulatedTimeStamp> {
}

@XmlElement({ localName: XmlXades.ElementNames.XMLTimeStamp })
export class XMLTimeStamp extends Any { }

@XmlElement({
  localName: 'XMLTimeStampCollection', parser: XMLTimeStamp,
})
export class XMLTimeStampCollection extends XadesCollection<XMLTimeStamp> {
}

@XmlElement({ localName: 'GenericTimeStamp' })
export class GenericTimeStamp extends XadesObject {
  @XmlAttribute({
    localName: XmlXades.AttributeNames.Id, defaultValue: '',
  })
  public Id: string;

  @XmlChildElement({ parser: Include })
  public Include: Include;

  @XmlChildElement({
    parser: ReferenceInfos, noRoot: true,
  })
  public ReferenceInfo: ReferenceInfos;

  @XmlChildElement({ parser: CanonicalizationMethod })
  public CanonicalizationMethod: CanonicalizationMethod;

  @XmlChildElement({
    parser: EncapsulatedTimeStampCollection, noRoot: true,
  })
  public EncapsulatedTimeStamp: EncapsulatedTimeStampCollection;

  @XmlChildElement({
    parser: XMLTimeStampCollection, noRoot: true,
  })
  public XMLTimeStamp: XMLTimeStampCollection;
}
