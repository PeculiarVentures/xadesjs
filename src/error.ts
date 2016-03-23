/// <reference path="./error_str.ts" />

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
        constructor(code: XE, ...args: any[]) {
            super();
            arguments[0] = xes[code];
            let message = printf.apply(this, arguments);
            this.message = `XADESJS${padNum(code, 4)}: ${message}`;

            this.stack = (new Error(this.message)).stack;
        }
    }

    export enum XE {
        NONE,
        METHOD_NOT_IMPLEMENTED,
        PARAM_REQUIRED,
        CONVERTER_UNSUPPORTED,
        ELEMENT_MALFORMED,
        CRYPTOGRAPHIC,
    }

    interface IXmlError {
        [index: number]: string;
    }

    const xes: IXmlError = {};
    xes[XE.NONE] = "No decription";
    xes[XE.METHOD_NOT_IMPLEMENTED] = "Method is not implemented";
    xes[XE.PARAM_REQUIRED] = "Required parameter is missing '%1'";
    xes[XE.CONVERTER_UNSUPPORTED] = "Converter is not supported";
    xes[XE.ELEMENT_MALFORMED] = "Malformed element '%1'";
    xes[XE.CRYPTOGRAPHIC] = "Cryptogrphic error with '%1'";
}