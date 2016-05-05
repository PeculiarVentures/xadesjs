namespace xadesjs {

    export declare type XmlNamespace = {
        prefix: string;
        namespace: string;
    }

    export enum XmlCanonicalizerState {
        BeforeDocElement,
        InsideDocElement,
        AfterDocElement
    }

    export class XmlCanonicalizer {

        protected withComments: boolean;
        protected exclusive: boolean;
        protected propagatedNamespaces: XmlNamespace[];
        protected document: Document;
        protected result: string[];
        protected visibleNamespaces: XmlNamespace[] = [];
        protected inclusiveNamespacesPrefixList: string[] = [];
        protected state: XmlCanonicalizerState = XmlCanonicalizerState.BeforeDocElement;

        constructor(withComments: boolean, excC14N: boolean, propagatedNamespaces: XmlNamespace[] = []) {
            this.withComments = withComments;
            this.exclusive = excC14N;
            this.propagatedNamespaces = propagatedNamespaces;
            this.result = [];
            this.state = XmlCanonicalizerState.BeforeDocElement;
        }

        // See xml-enc-c14n specification
        get InclusiveNamespacesPrefixList(): string {
            return this.inclusiveNamespacesPrefixList.join(" ");
        }
        set InclusiveNamespacesPrefixList(value: string) {
            this.inclusiveNamespacesPrefixList = value.split(" ");
        }

        public Canonicalize(node: Node): string {
            if (!node)
                throw new XmlError(XE.CRYPTOGRAPHIC, "Parameter 1 is not Node");
            let _node: Node;
            if (node.nodeType === XmlNodeType.Document) {
                this.document = node as Document;
                _node = this.document.documentElement;
            }
            else {
                this.document = node.ownerDocument;
                _node = node;
            }
            // get nss from document
            // this.nsManager = new XmlNamespaceManager(this.document);

            this.WriteNode(_node);

            let res = this.result.join("");
            return res;
        }

        protected WriteNode(node: Node) {
            switch (node.nodeType) {
                case XmlNodeType.Document:
                case XmlNodeType.DocumentFragment:
                    this.WriteDocumentNode(node);
                    break;
                case XmlNodeType.Element:
                    this.WriteElementNode(node);
                    break;
                case XmlNodeType.CDATA:
                case XmlNodeType.SignificantWhitespace:
                case XmlNodeType.Text:
                    // CDATA sections are processed as text nodes
                    this.WriteTextNode(node);
                    break;
                case XmlNodeType.Whitespace:
                    if (this.state === XmlCanonicalizerState.InsideDocElement)
                        this.WriteTextNode(node);
                    break;
                case XmlNodeType.Comment:
                    this.WriteCommentNode(node);
                    break;
                case XmlNodeType.ProcessingInstruction:
                    this.WriteProcessingInstructionNode(node);
                    break;
                case XmlNodeType.EntityReference:
                    for (let i = 0; i < node.childNodes.length; i++)
                        this.WriteNode(node.childNodes[i]);
                    break;
                case XmlNodeType.Attribute:
                    throw new XmlError(XE.CRYPTOGRAPHIC, "Attribute node is impossible here");
                case XmlNodeType.EndElement:
                    throw new XmlError(XE.CRYPTOGRAPHIC, "Attribute node is impossible here");
                case XmlNodeType.EndEntity:
                    throw new XmlError(XE.CRYPTOGRAPHIC, "Attribute node is impossible here");
                case XmlNodeType.DocumentType:
                case XmlNodeType.Entity:
                case XmlNodeType.Notation:
                case XmlNodeType.XmlDeclaration:
                    // just do nothing
                    break;
            }
        }

        protected WriteDocumentNode(node: Node) {
            this.state = XmlCanonicalizerState.BeforeDocElement;
            for (let child = node.firstChild; child != null; child = child.nextSibling)
                this.WriteNode(child);
        }

        // Text Nodes
        // the string value, except all ampersands are replaced 
        // by &amp;, all open angle brackets (<) are replaced by &lt;, all closing 
        // angle brackets (>) are replaced by &gt;, and all #xD characters are 
        // replaced by &#xD;.
        private WriteTextNode(node: Node): void {
            // console.log(`WriteTextNode: ${node.nodeName}`);
            this.result.push(this.NormalizeString(node.nodeValue, node.nodeType));
        }

        protected WriteCommentNode(node: Node) {
            // console.log(`WriteCommentNode: ${node.nodeName}`);
            // Console.WriteLine ("Debug: comment node");
            if (this.withComments) {
                if (this.state === XmlCanonicalizerState.AfterDocElement)
                    this.result.push(String.fromCharCode(10) + "<!--");
                else
                    this.result.push("<!--");

                this.result.push(this.NormalizeString(node.nodeValue, XmlNodeType.Comment));

                if (this.state === XmlCanonicalizerState.BeforeDocElement)
                    this.result.push("-->" + String.fromCharCode(10));
                else
                    this.result.push("-->");
            }
        }

        // Processing Instruction (PI) Nodes- 
        // The opening PI symbol (<?), the PI target name of the node, 
        // a leading space and the string value if it is not empty, and 
        // the closing PI symbol (?>). If the string value is empty, 
        // then the leading space is not added. Also, a trailing #xA is 
        // rendered after the closing PI symbol for PI children of the 
        // root node with a lesser document order than the document 
        // element, and a leading #xA is rendered before the opening PI 
        // symbol of PI children of the root node with a greater document 
        // order than the document element.
        private WriteProcessingInstructionNode(node: Node): void {
            // console.log(`WriteProcessingInstructionNode: ${node.nodeName}`);

            if (this.state === XmlCanonicalizerState.AfterDocElement)
                this.result.push("\u000A<?");
            else
                this.result.push("<?");

            this.result.push(node.nodeName);
            if (node.nodeValue) {
                this.result.push(" ");
                this.result.push(this.NormalizeString(node.nodeValue, XmlNodeType.ProcessingInstruction));
            }

            if (this.state === XmlCanonicalizerState.BeforeDocElement)
                this.result.push("?>\u000A");
            else
                this.result.push("?>");
        }

        protected WriteElementNode(node: Node) {
            // console.log(`WriteElementNode: ${node.nodeName}`);

            if (this.state === XmlCanonicalizerState.BeforeDocElement)
                this.state = XmlCanonicalizerState.InsideDocElement;

            // open tag
            this.result.push("<");
            this.result.push(node.nodeName);
            // namespaces
            let visibleNamespacesCount = this.WriteNamespacesAxis(node);
            // attributes
            this.WriteAttributesAxis(node);
            this.result.push(">");

            for (let n = node.firstChild; n != null; n = n.nextSibling) {
                // if (!(n.nodeType === XmlNodeType.Text && node.childNodes.length > 1))
                this.WriteNode(n);
            }

            // close tag
            this.result.push("</");
            this.result.push(node.nodeName);
            this.result.push(">");

            if (this.state === XmlCanonicalizerState.BeforeDocElement)
                this.state = XmlCanonicalizerState.AfterDocElement;

            // remove added namespaces
            this.visibleNamespaces = this.visibleNamespaces.filter((item, index) =>
                index < this.visibleNamespaces.length - visibleNamespacesCount
            );
        }

        protected WriteNamespacesAxis(node: Node): number {
            let list: XmlNamespace[] = [];
            let visibleNamespacesCount = 0;
            for (let i = 0; i < node.attributes.length; i++) {
                let attribute = node.attributes[i];

                if (!IsNamespaceNode(attribute)) {
                    // render namespace for attribute, if needed
                    if (attribute.prefix && !this.IsNamespaceRendered(attribute.prefix, attribute.namespaceURI)) {
                        let ns = { prefix: attribute.prefix, namespace: attribute.namespaceURI };
                        list.push(ns);
                        this.visibleNamespaces.push(ns);
                        visibleNamespacesCount++;
                    }
                    continue;
                }

                // get namespace prefix
                let prefix: string;
                let matches: string[] = null;
                if (matches = /xmlns:(\w+)/.exec(attribute.nodeName))
                    prefix = matches[1];

                let printable = true;
                if (this.exclusive && !this.IsNamespaceInclusive(node, prefix)) {
                    let used = IsNamespaceUsed(node, prefix);
                    if (used > 1)
                        printable = false;
                    else if (used === 0)
                        continue;
                }

                if (this.IsNamespaceRendered(prefix, attribute.nodeValue))
                    continue;

                if (printable) {
                    let ns = { prefix: prefix, namespace: attribute.nodeValue };
                    list.push(ns);
                    this.visibleNamespaces.push(ns);
                    visibleNamespacesCount++;
                }
            }

            if (!this.IsNamespaceRendered(node.prefix, node.namespaceURI) && node.namespaceURI !== "http://www.w3.org/2000/xmlns/") {
                let ns = { prefix: node.prefix, namespace: node.namespaceURI };
                list.push(ns);
                this.visibleNamespaces.push(ns);
                visibleNamespacesCount++;
            }


            // sort nss
            list.sort(XmlDsigC14NTransformNamespacesComparer);

            let prevPrefix: string = "";
            for (let n of list) {
                if (n.prefix === prevPrefix) {
                    continue;
                }
                prevPrefix = n.prefix;
                this.result.push(" xmlns");
                if (n.prefix)
                    this.result.push(":" + n.prefix);
                this.result.push("=\"");
                this.result.push(n.namespace);
                this.result.push("\"");
            }

            return visibleNamespacesCount;
        }

        private WriteAttributesAxis(node: Node): void {
            // Console.WriteLine ("Debug: attributes");

            let list: Attr[] = [];
            for (let i = 0; i < node.attributes.length; i++) {
                let attribute = node.attributes[i];
                if (!IsNamespaceNode(attribute))
                    list.push(attribute);
            }

            // sort namespaces and write results	    
            list.sort(XmlDsigC14NTransformAttributesComparer);
            for (let attribute of list) {
                if (attribute != null) {
                    this.result.push(" ");
                    this.result.push(attribute.nodeName);
                    this.result.push("=\"");
                    this.result.push(this.NormalizeString(attribute.nodeValue, XmlNodeType.Attribute));
                    this.result.push("\"");
                }
            }

        }

        protected NormalizeString(input: string, type: XmlNodeType): string {
            let sb: string[] = [];
            for (let i = 0; i < input.length; i++) {
                let ch = input[i];
                if (ch === "<" && (type === XmlNodeType.Attribute || this.IsTextNode(type)))
                    sb.push("&lt;");
                else if (ch === ">" && this.IsTextNode(type))
                    sb.push("&gt;");
                else if (ch === "&" && (type === XmlNodeType.Attribute || this.IsTextNode(type)))
                    sb.push("&amp;");
                else if (ch === "\"" && type === XmlNodeType.Attribute)
                    sb.push("&quot;");
                else if (ch === "\u0009" && type === XmlNodeType.Attribute)
                    sb.push("&#x9;");
                else if (ch === "\u000A" && type === XmlNodeType.Attribute)
                    sb.push("&#xA;");
                else if (ch === "\u000D")
                    sb.push("&#xD;");
                else
                    sb.push(ch);
            }

            return sb.join("");
        }

        private IsTextNode(type: XmlNodeType): boolean {
            switch (type) {
                case XmlNodeType.Text:
                case XmlNodeType.CDATA:
                case XmlNodeType.SignificantWhitespace:
                case XmlNodeType.Whitespace:
                    return true;
            }
            return false;
        }

        private IsNamespaceInclusive(node: Node, prefix: string): boolean {
            prefix = prefix || null;
            if (node.prefix === prefix)
                return false;
            return this.inclusiveNamespacesPrefixList.indexOf(prefix) !== -1; // && node.prefix === prefix;
        }

        private IsNamespaceRendered(prefix: string, uri: string): boolean {
            // // if the default namespace xmlns="" is not re-defined yet
            // // then we do not want to print it out
            if (!prefix && !uri)
                return true;
            uri = uri || "";
            if (prefix === "xml" && uri === "http://www.w3.org/XML/1998/namespace")
                return true;
            for (let i = this.visibleNamespaces.length - 1; i >= 0; i--) {
                let node = this.visibleNamespaces[i];
                // get namespace prefix
                if (node.prefix == prefix)
                    return node.namespace == uri;
            }

            return false;
        }

    }

    function XmlDsigC14NTransformNamespacesComparer(x: XmlNamespace, y: XmlNamespace) {
        // simple cases
        if (x == y)
            return 0;
        else if (!x)
            return -1;
        else if (!y)
            return 1;
        else if (!x.prefix)
            return -1;
        else if (!y.prefix)
            return 1;

        return x.prefix.localeCompare(y.prefix);
    }

    function XmlDsigC14NTransformAttributesComparer(x: Node, y: Node): number {
        if (!x.namespaceURI && y.namespaceURI) { return -1; }
        if (!y.namespaceURI && x.namespaceURI) { return 1; }

        let left = x.namespaceURI + x.localName;
        let right = y.namespaceURI + y.localName;

        if (left === right) return 0;
        else if (left < right) return -1;
        else return 1;
    }

    function IsNamespaceUsed(node: Node, prefix: string, result: number = 0): number {
        prefix = prefix || null;
        if (node.prefix === prefix)
            return ++result;
        // prefix of attributes
        if (node.attributes)
            for (let i = 0; i < node.attributes.length; i++) {
                let attr = node.attributes[i];
                if (!IsNamespaceNode(attr) && prefix && node.attributes[i].prefix === prefix)
                    return ++result;
            }
        // check prefix of Element
        for (let n = node.firstChild; !!n; n = n.nextSibling) {
            let res = IsNamespaceUsed(n, prefix, result);
            if (n.nodeType === XmlNodeType.Element && res)
                return ++result + res;
        }
        return result;
    }

    function IsNamespaceNode(node: Node): boolean {
        let reg = /xmlns:/;
        if (node !== null && node.nodeType === xadesjs.XmlNodeType.Attribute && (node.nodeName === "xmlns" || reg.test(node.nodeName)))
            return true;
        return false;
    }

}