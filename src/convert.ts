namespace xadesjs {
    export class Convert {
        static ToBase64UrlString(text: string): string {
            return this.ToBase64String(text).replace(/\+/g, "-").replace(/\//g, "_").replace(/\=/g, "");
        }
        static FromBase64UrlString(base64UrlText: string): string {
            throw new XmlError(XE.METHOD_NOT_IMPLEMENTED);
        }
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
            // Prepare string
            base64Text = base64Text.replace(/\n/g, "").replace(/\r/g, "").replace(/\t/g, "").replace(/\s/g, "");
            if (typeof atob !== "undefined") {
                return atob(base64Text);
            }
            else if (typeof Buffer !== "undefined") {
                return new Buffer(base64Text, "base64").toString("binary");
            }
            else {
                throw new XmlError(XE.CONVERTER_UNSUPPORTED);
            }
        }
        static ToBufferString(text: string): Uint8Array {
            let stringLength = text.length;
            let resultView = new Uint8Array(stringLength);
            for (let i = 0; i < stringLength; i++)
                resultView[i] = text.charCodeAt(i);
            return resultView;
        }
        static FromBufferString(buffer: Uint8Array): string {
            let result_string = "";
            for (let i = 0; i < buffer.length; i++)
                result_string = result_string + String.fromCharCode(buffer[i]);
            return result_string;
        }
    }
}