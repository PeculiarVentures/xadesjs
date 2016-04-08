namespace xadesjs {

    declare let unescape: any;
    declare let escape: any;
    declare let Buffer: any;

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
                return new Buffer(text, "binary").toString("base64");
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

        static ToBufferUtf8String(text: string): Uint8Array {
            let s = unescape(encodeURIComponent(text)),
                uintArray = new Uint8Array(s.length);
            for (let i = 0; i < s.length; i++) {
                uintArray[i] = s.charCodeAt(i);
            }
            return uintArray;
        }
        static FromBufferUtf8String(buffer: Uint8Array): string {
            let encodedString = String.fromCharCode.apply(null, buffer),
                decodedString = decodeURIComponent(escape(atob(encodedString)));
            return decodedString;
        }
        static ToBufferString(text: string): Uint8Array {
            let stringLength = text.length;
            let resultView = new Uint8Array(stringLength);
            for (let i = 0; i < stringLength; i++)
                resultView[i] = text.charCodeAt(i);
            return resultView;
        }
        static FromBufferString(buffer: ArrayBuffer): string;
        static FromBufferString(buffer: Uint8Array): string;
        static FromBufferString(buffer: any): string {
            let result_string = "";
            if (buffer instanceof ArrayBuffer)
                buffer = new Uint8Array(buffer);
            for (let i = 0; i < buffer.length; i++)
                result_string = result_string + String.fromCharCode(buffer[i]);
            return result_string;
        }
    }
}