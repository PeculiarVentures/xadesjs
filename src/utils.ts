namespace xadesjs {

    export type ISelectResult = Array<Node> | Node | boolean | number | string;

    export function findAttr(node: Node, localName: string, nameSpace?: string): Attr {
        for (let i = 0; i < node.attributes.length; i++) {
            let attr = node.attributes[i];

            if (attrEqualsExplicitly(attr, localName, nameSpace) || attrEqualsImplicitly(attr, localName, nameSpace, node)) {
                return attr;
            }
        }
        return null;
    }

    export function findFirst(doc: Node, xpath: string): Node {
        let nodes: Node[] = <Node[]>select(doc, xpath);
        if (nodes.length === 0) throw `could not find xpath ${xpath}`;
        return nodes[0];
    }

    export function findChilds(node: Node, localName: string, nameSpace?: string): Node[] {
        node = (<Document>node).documentElement || node;
        let res: Node[] = [];
        for (let i = 0; i < node.childNodes.length; i++) {
            let child = node.childNodes[i];
            if (child.localName === localName && (child.namespaceURI === nameSpace || !nameSpace)) {
                res.push(child);
            }
        }
        return res;
    }

    function attrEqualsExplicitly(attr: Attr, localName: string, nameSpace?: string): boolean {
        return attr.localName === localName && (attr.namespaceURI === nameSpace || !nameSpace);
    }

    function attrEqualsImplicitly(attr: Attr, localName: string, nameSpace: string, node: Node) {
        return attr.localName === localName && ((!attr.namespaceURI && node.namespaceURI === nameSpace) || !nameSpace);
    }

    export interface IAssocArray {
        [index: string]: string;
    }

    const xml_special_to_encoded_attribute: IAssocArray = {
        "&": "&amp;",
        "<": "&lt;",
        "\"": "&quot;",
        "\r": "&#xD;",
        "\n": "&#xA;",
        "\t": "&#x9;"
    };

    const xml_special_to_encoded_text: IAssocArray = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        "\r": "&#xD;"
    };

    export function encodeSpecialCharactersInAttribute(attributeValue: string): string {
        return attributeValue
            .replace(/[\r\n\t ]+/g, " ") // White space normalization (Note: this should normally be done by the xml parser) See: https://www.w3.org/TR/xml/#AVNormalize
            .replace(/([&<"\r\n\t])/g, function(str, item) {
                // Special character normalization. See:
                // - https://www.w3.org/TR/xml-c14n#ProcessingModel (Attribute Nodes)
                // - https://www.w3.org/TR/xml-c14n#Example-Chars
                return xml_special_to_encoded_attribute[item];
            });
    }

    export function encodeSpecialCharactersInText(text: string): string {
        return text
            .replace(/\r\n?/g, "\n")  // Line ending normalization (Note: this should normally be done by the xml parser). See: https://www.w3.org/TR/xml/#sec-line-ends
            .replace(/([&<>\r])/g, function(str, item) {
                // Special character normalization. See:
                // - https://www.w3.org/TR/xml-c14n#ProcessingModel (Text Nodes)
                // - https://www.w3.org/TR/xml-c14n#Example-Chars
                return xml_special_to_encoded_text[item];
            });
    }
}