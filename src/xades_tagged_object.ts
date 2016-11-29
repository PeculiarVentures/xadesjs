import { XmlXadesObject } from "./xml_xades";

export abstract class XmlXadesTaggedObject extends XmlXadesObject {

    protected name = "TaggedObject";

    constructor(tagName: string) {
        super();
        this.name = tagName;
    }

}