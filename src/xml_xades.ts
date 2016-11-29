import { XmlObject, XmlCollection } from "xmljs";
import { XmlXades } from "./xml";

export abstract class XmlXadesObject extends XmlObject {

    protected prefix = XmlXades.DefaultPrefix;
    protected namespaceUri = XmlXades.NamespaceURI;

}

export abstract class XmlXadesCollection<I extends XmlXadesObject> extends XmlCollection<I> {

    protected prefix = XmlXades.DefaultPrefix;
    protected namespaceUri = XmlXades.NamespaceURI;

}