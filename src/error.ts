namespace xadesjs {

    function printf(text: string, ...args: any[]) {
        let msg: string = text;
        let regFind = /[^%](%\d+)/g;
        let match: RegExpExecArray = null;
        let matches: { arg: string, index: number }[] = [];
        while (match = regFind.exec(msg)) {
            matches.push({ arg: match[1], index: match.index });
        }

        // replace matches
        for (let i = matches.length - 1; i >= 0; i--) {
            let item = matches[i];
            let arg = item.arg.substring(1);
            let index = item.index + 1;
            msg = msg.substring(0, index) + arguments[+arg] + msg.substring(index + 1 + arg.length);
        }

        // convert %% -> %
        msg = msg.replace("%%", "%");

        return msg;
    }

    function padNum(num: number, size: number): string {
        let s = num + "";
        while (s.length < size) s = "0" + s;
        return s;
    }

    export class XmlError extends Error {
        stack: any;
        constructor(code: XE, ...args: any[]) {
            super();
            let _code = code;
            arguments[0] = xes[_code];
            let message = printf.apply(this, arguments);
            this.message = `XADESJS${padNum(_code, 4)}: ${message}`;
            this.stack = (new Error(this.message) as any).stack;
        }
    }

    export enum XE {
        NONE,
        NULL_REFERENCE,
        METHOD_NOT_IMPLEMENTED,
        METHOD_NOT_SUPPORTED,
        PARAM_REQUIRED,
        CONVERTER_UNSUPPORTED,
        ELEMENT_MALFORMED,
        CRYPTOGRAPHIC,
        CRYPTOGRAPHIC_NO_MODULE,
        CRYPTOGRAPHIC_UNKNOWN_TRANSFORM,
        ALGORITHM_NOT_SUPPORTED,
        ALGORITHM_WRONG_NAME,
        XML_EXCEPTION,
    }

    interface IXmlError {
        [index: number]: string;
    }

    const xes: IXmlError = {};
    xes[XE.NONE] = "No decription";
    xes[XE.NULL_REFERENCE] = "Null reference";
    xes[XE.METHOD_NOT_IMPLEMENTED] = "Method is not implemented";
    xes[XE.METHOD_NOT_SUPPORTED] = "Method is not supported";
    xes[XE.PARAM_REQUIRED] = "Required parameter is missing '%1'";
    xes[XE.CONVERTER_UNSUPPORTED] = "Converter is not supported";
    xes[XE.ELEMENT_MALFORMED] = "Malformed element '%1'";
    xes[XE.CRYPTOGRAPHIC] = "Cryptographic error: %1";
    xes[XE.CRYPTOGRAPHIC_NO_MODULE] = "WebCrypto module is not found";
    xes[XE.CRYPTOGRAPHIC_UNKNOWN_TRANSFORM] = "Unknown transform %1";
    xes[XE.ALGORITHM_NOT_SUPPORTED] = "Algorithm is not supported '%1'";
    xes[XE.ALGORITHM_WRONG_NAME] = "Algorithm wrong name in use '%1'";
    xes[XE.XML_EXCEPTION] = "XML exception: %1";
}
