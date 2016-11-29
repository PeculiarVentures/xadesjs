import { XmlXades } from "./xml";

import { AnyType } from "./any_type";

/**
 * This class contains a timestamp encoded as XML
 */
export class XMLTimeStamp extends AnyType {
    constructor() {
        super(XmlXades.ElementNames.XMLTimeStamp);
    }
}
