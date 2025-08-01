import * as XmlCore from 'xml-core';
import { XmlElement } from 'xml-core';
import { XmlXades } from './xml';

@XmlElement({
  localName: 'xades',
  namespaceURI: XmlXades.NamespaceURI,
  prefix: XmlXades.DefaultPrefix,
})
export abstract class XadesObject extends XmlCore.XmlObject { }

@XmlElement({
  localName: 'xades_collection',
  namespaceURI: XmlXades.NamespaceURI,
  prefix: XmlXades.DefaultPrefix,
})
export abstract class XadesCollection<I extends XadesObject> extends XmlCore.XmlCollection<I> { }
