namespace xadesjs {
    export class Convert {
        static ToBase64String(text: string): string {
            if (typeof btoa !== "undefined") {
                return btoa(text);
            }
            else if (typeof Buffer !== "undefined") {
                return new Buffer(text).toString("base64");
            }
            else {
                throw new XmlError(XE.CONVERTER_UNSUPPORTED);
            }
        }
        static FromBase64String(base64Text: string): string {
            if (typeof atob !== "undefined") {
                return atob(base64Text);
            }
            else if (typeof Buffer !== "undefined") {
                return new Buffer(base64Text, "base64").toString();
            }
            else {
                throw new XmlError(XE.CONVERTER_UNSUPPORTED);
            }
        }
        static ToBufferString(text: string): ArrayBuffer {
            throw new XmlError(XE.METHOD_NOT_IMPLEMENTED);
        }
        static FromBufferString(buffer: ArrayBuffer): string {
            throw new XmlError(XE.METHOD_NOT_IMPLEMENTED);
        }
    }
}