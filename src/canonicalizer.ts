namespace xadesjs {

    interface INamespace {
        key: string;
        value: string;
    }

    enum XmlCanonicalizerState {
        BeforeDocElement,
        InsideDocElement,
        AfterDocElement
    }

    declare type XmlNamespace = {
        prefix: string;
        namespace: string;
    }

    export class XmlNamespaceManager {

        protected items: XmlNamespace[] = [];

        GetNamespaces(node: Node, prefixList: XmlNamespace[]): XmlNamespace[] {
            node = node.nodeType === XmlNodeType.Document ? (node as Document).documentElement : node;

            if (node.attributes)
                for (let i = 0; i < node.attributes.length; i++) {
                    let attribute = node.attributes[i];
                    prefixList.push({
                        prefix: attribute.localName,
                        namespace: attribute.nodeValue
                    });
                }
            if (node.childNodes)
                for (let i = 0; i < node.childNodes.length; i++) {
                    let child = node.childNodes[i];
                    this.GetNamespaces(child, prefixList);
                }

            return prefixList;
        }

        AddNamespace(prefix: string, value: string): void {
            this.items.push({ prefix: prefix, namespace: value });
        }

        constructor(doc?: Node) {
            if (doc) {
                this.GetNamespaces(doc, this.items);
            }
        }

        LookupPrefix(ns: string): string {
            for (let i in this.items) {
                let item = this.items[i];
                if (item.namespace === ns)
                    return item.prefix;
            }
            return null;
        }

        LookupNamespace(prefix: string): string {
            for (let i in this.items) {
                let item = this.items[i];
                if (item.prefix === prefix)
                    return item.namespace;
            }
            return null;
        }

    }

    export class XmlCanonicalizer {
        // c14n parameters
        private comments: boolean;
        private exclusive: boolean;
        protected inclusive: string[] = [];
        protected inclusiveNamespacesPrefixList: string;

        // input/output
        private xnl: Node[];
        private res: string[];

        // namespaces rendering stack
        private state: XmlCanonicalizerState;
        private visibleNamespaces: Attr[];
        private prevVisibleNamespacesStart: number;
        private prevVisibleNamespacesEnd: number;
        private propagatedNss: INamespace[];
        private namespaceManager: XmlNamespaceManager;

        public constructor(withComments: boolean, excC14N: boolean, propagatedNamespaces: INamespace[] = []) {
            this.res = [];
            this.comments = withComments;
            this.exclusive = excC14N;
            this.propagatedNss = propagatedNamespaces;
        }

        protected Initialize() {
            this.state = XmlCanonicalizerState.BeforeDocElement;
            this.visibleNamespaces = [];
            this.prevVisibleNamespacesStart = 0;
            this.prevVisibleNamespacesEnd = 0;
        }

        public Canonicalize(node: Node): string {
            let n = node as Node;
            if (node.nodeType !== XmlNodeType.Document) {
                this.xnl = (node as any).length ? node as any : [node];
                n = this.xnl[0];
            }
            n = (n.nodeType === XmlNodeType.Document ? n as Document : n.ownerDocument);
            this.Initialize();

            this.namespaceManager = new XmlNamespaceManager(n)
            this.FillMissingPrefixes(n, this.namespaceManager, []);
            this.WriteDocumentNode(n);

            return this.res.join("");
        }

        // See xml-enc-c14n specification
        get InclusiveNamespacesPrefixList(): string {
            return this.inclusiveNamespacesPrefixList;
        }
        set InclusiveNamespacesPrefixList(value: string) {
            this.inclusiveNamespacesPrefixList = value;
            this.inclusive = value.split(" ");
        }

        CreateXmlns(n: Node): Attr {
            let a = !n.prefix ?
                n.ownerDocument.createAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns") :
                n.ownerDocument.createAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:" + n.prefix);
            // TODO: Is commented code right?
            // a.value = n.namespaceURI;
            a.nodeValue = n.nodeValue;
            return a;
        }

        // Note that this must be done *before* filtering nodes out
        // by context node list.
        private FillMissingPrefixes(n: Node, nsmgr: XmlNamespaceManager, tmpList: Attr[]): void {
            if (!n.prefix && this.propagatedNss != null) {
                for (let de of this.propagatedNss)
                    if (de.value === n.namespaceURI) {
                        n.prefix = de.key;
                        break;
                    }
            }

            if (n.nodeType === XmlNodeType.Element && n.hasAttributes()) {
                for (let i = 0; i < n.attributes.length; i++) {
                    let a = n.attributes[i];
                    if (a.namespaceURI === "http://www.w3.org/2000/xmlns/")
                        nsmgr.AddNamespace(!a.prefix ? "" : a.localName, a.nodeValue);
                }
            }

            if (n.namespaceURI && nsmgr.LookupPrefix(n.namespaceURI) == null)
                tmpList.push(this.CreateXmlns(n));

            if (n.nodeType === XmlNodeType.Element && n.hasAttributes()) {
                for (let i = 0; i < n.attributes.length; i++) {
                    let a = n.attributes[0];
                    if (a.namespaceURI && nsmgr.LookupNamespace(a.localName) == null) // CHANGED: nsmgr.LookupNamespace(a.prefix)
                        tmpList.push(this.CreateXmlns(a));
                }
            }

            for (let a of tmpList)
                (n as Element).setAttributeNode(a);
            tmpList = [];

            if (n.hasChildNodes()) {
                for (let c = n.firstChild; c != null; c = c.nextSibling)
                    if (c.nodeType === XmlNodeType.Element)
                        this.FillMissingPrefixes(c, nsmgr, tmpList);
            }
        }

        private WriteNode(node: Node): void {
            // Console.WriteLine ("C14N Debug: node=" + node.Name);

            let visible = this.IsNodeVisible(node);
            switch (node.nodeType) {
                case XmlNodeType.Document:
                case XmlNodeType.DocumentFragment:
                    this.WriteDocumentNode(node);
                    break;
                case XmlNodeType.Element:
                    this.WriteElementNode(node, visible);
                    break;
                case XmlNodeType.CDATA:
                case XmlNodeType.SignificantWhitespace:
                case XmlNodeType.Text:
                    // CDATA sections are processed as text nodes
                    this.WriteTextNode(node, visible);
                    break;
                case XmlNodeType.Whitespace:
                    if (this.state === XmlCanonicalizerState.InsideDocElement)
                        this.WriteTextNode(node, visible);
                    break;
                case XmlNodeType.Comment:
                    this.WriteCommentNode(node, visible);
                    break;
                case XmlNodeType.ProcessingInstruction:
                    this.WriteProcessingInstructionNode(node, visible);
                    break;
                case XmlNodeType.EntityReference:
                    for (let i = 0; i < node.childNodes.length; i++)
                        this.WriteNode(node.childNodes[i]);
                    break;
                case XmlNodeType.Attribute:
                    throw new XmlError(XE.CRYPTOGRAPHIC, "Attribute node is impossible here");
                case XmlNodeType.EndElement:
                    throw new XmlError(XE.CRYPTOGRAPHIC, "EndElement node is impossible here");
                case XmlNodeType.EndEntity:
                    throw new XmlError(XE.CRYPTOGRAPHIC, "EndEntity node is impossible here");
                case XmlNodeType.DocumentType:
                case XmlNodeType.Entity:
                case XmlNodeType.Notation:
                case XmlNodeType.XmlDeclaration:
                    // just do nothing
                    break;
            }
        }

        private WriteDocumentNode(node: Node): void {
            this.state = XmlCanonicalizerState.BeforeDocElement;
            for (let child = node.firstChild; child != null; child = child.nextSibling)
                this.WriteNode(child);
        }

        // Element Nodes
        // If the element is not in the node-set, then the result is obtained 
        // by processing the namespace axis, then the attribute axis, then 
        // processing the child nodes of the element that are in the node-set 
        // (in document order). If the element is inthe node-set, then the result 
        // is an open angle bracket (<), the element QName, the result of 
        // processing the namespace axis, the result of processing the attribute 
        // axis, a close angle bracket (>), the result of processing the child 
        // nodes of the element that are in the node-set (in document order), an 
        // open angle bracket, a forward slash (/), the element QName, and a close 
        // angle bracket.
        private WriteElementNode(node: Node, visible: boolean): void {
            // Console.WriteLine ("Debug: element node");

            // remember current state 
            let savedPrevVisibleNamespacesStart = this.prevVisibleNamespacesStart;
            let savedPrevVisibleNamespacesEnd = this.prevVisibleNamespacesEnd;
            let savedVisibleNamespacesSize = this.visibleNamespaces.length;
            let s = this.state;
            if (visible && this.state === XmlCanonicalizerState.BeforeDocElement)
                this.state = XmlCanonicalizerState.InsideDocElement;

            // write start tag
            if (visible) {
                this.res.push("<");
                this.res.push(node.nodeName);
            }

            // this is odd but you can select namespaces
            // and attributes even if node itself is not visible
            this.WriteNamespacesAxis(node, visible);
            this.WriteAttributesAxis(node);

            if (visible)
                this.res.push(">");

            // write children
            for (let child = node.firstChild; child != null; child = child.nextSibling)
                this.WriteNode(child);

            // write end tag	    
            if (visible) {
                this.res.push("</");
                this.res.push(node.nodeName);
                this.res.push(">");
            }

            // restore state
            if (visible && s === XmlCanonicalizerState.BeforeDocElement)
                this.state = XmlCanonicalizerState.AfterDocElement;
            this.prevVisibleNamespacesStart = savedPrevVisibleNamespacesStart;
            this.prevVisibleNamespacesEnd = savedPrevVisibleNamespacesEnd;
            if (this.visibleNamespaces.length > savedVisibleNamespacesSize) {
                this.visibleNamespaces = this.visibleNamespaces.map((item, index) => {
                    // Remove range
                    if (!(index >= savedVisibleNamespacesSize && index <= this.visibleNamespaces.length - savedVisibleNamespacesSize))
                        return item;
                });
            }
        }

        // Namespace Axis
        // Consider a list L containing only namespace nodes in the 
        // axis and in the node-set in lexicographic order (ascending). To begin 
        // processing L, if the first node is not the default namespace node (a node 
        // with no namespace URI and no local name), then generate a space followed 
        // by xmlns="" if and only if the following conditions are met:
        //    - the element E that owns the axis is in the node-set
        //    - The nearest ancestor element of E in the node-set has a default 
        //      namespace node in the node-set (default namespace nodes always 
        //      have non-empty values in XPath)
        // The latter condition eliminates unnecessary occurrences of xmlns="" in 
        // the canonical form since an element only receives an xmlns="" if its 
        // default namespace is empty and if it has an immediate parent in the 
        // canonical form that has a non-empty default namespace. To finish 
        // processing  L, simply process every namespace node in L, except omit 
        // namespace node with local name xml, which defines the xml prefix, 
        // if its string value is http://www.w3.org/XML/1998/namespace.
        private WriteNamespacesAxis(node: Node, visible: boolean): void {
            // Console.WriteLine ("Debug: namespaces");
            if (!visible) return;
            let doc = node.ownerDocument;
            let has_empty_namespace = false;
            let list: Attr[] = [];
            for (let cur = node; cur != null && cur !== doc; cur = cur.parentNode) {
                for (let i = 0; i < cur.attributes.length; i++) {
                    let attribute = cur.attributes[i];
                    if (!this.IsNamespaceNode(attribute))
                        continue;

                    // get namespace prefix
                    let prefix = "";
                    if (attribute.prefix === "xmlns")
                        prefix = attribute.localName;

                    // check if it is "xml" namespace			    
                    if (prefix === "xml" && attribute.nodeValue === "http://www.w3.org/XML/1998/namespace")
                        continue;


                    // make sure that this is an active namespace
                    // for our node
                    let ns = GetNamespaceOfPrefix(node, prefix);
                    if (ns !== attribute.nodeValue)
                        continue;

                    // check that it is selected with XPath
                    // if (!this.IsNodeVisible(attribute))
                    //     continue;

                    // check that we have not rendered it yet
                    let rendered = this.IsNamespaceRendered(prefix, attribute.nodeValue);

                    // For exc-c14n, only visibly utilized
                    // namespaces are written.
                    if (this.exclusive && !this.IsVisiblyUtilized(node as Element, attribute) && this.IsInclusive(node, prefix))
                        continue;

                    // add to the visible namespaces stack
                    if (visible)
                        this.visibleNamespaces.push(attribute);

                    if (!rendered)
                        list.push(attribute);

                    if (!prefix)
                        has_empty_namespace = true;
                }
            }

            // add empty namespace if needed
            if (visible && !has_empty_namespace && !this.IsNamespaceRendered("", "") && !node.namespaceURI)
                this.res.push(" xmlns=\"\"");

            list.sort(XmlDsigC14NTransformNamespacesComparer);
            for (let attribute of list) {
                if (attribute != null) {
                    this.res.push(" ");
                    this.res.push(attribute.nodeName);
                    this.res.push("=\"");
                    this.res.push(attribute.nodeValue);
                    this.res.push("\"");
                }
            }

            // move the rendered namespaces stack
            if (visible) {
                this.prevVisibleNamespacesStart = this.prevVisibleNamespacesEnd;
                this.prevVisibleNamespacesEnd = this.visibleNamespaces.length;
            }
        }

        // Attribute Axis 
        // In lexicographic order (ascending), process each node that 
        // is in the element's attribute axis and in the node-set.
        // 
        // The processing of an element node E MUST be modified slightly 
        // when an XPath node-set is given as input and the element's 
        // parent is omitted from the node-set.
        private WriteAttributesAxis(node: Node): void {
            // Console.WriteLine ("Debug: attributes");

            let list: Attr[] = [];
            for (let i = 0; i < node.attributes.length; i++) {
                let attribute = node.attributes[i];
                if (!this.IsNamespaceNode(attribute) && this.IsNodeVisible(attribute))
                    list.push(attribute);
            }

            // Add attributes from "xml" namespace for "inclusive" c14n only:
            //
            // The method for processing the attribute axis of an element E 
            // in the node-set is enhanced. All element nodes along E's 
            // ancestor axis are examined for nearest occurrences of 
            // attributes in the xml namespace, such as xml:lang and 
            // xml:space (whether or not they are in the node-set). 
            // From this list of attributes, remove any that are in E's 
            // attribute axis (whether or not they are in the node-set). 
            // Then, lexicographically merge this attribute list with the 
            // nodes of E's attribute axis that are in the node-set. The 
            // result of visiting the attribute axis is computed by 
            // processing the attribute nodes in this merged attribute list.
            if (!this.exclusive && node.parentNode != null && node.parentNode.parentNode != null && !this.IsNodeVisible(node.parentNode.parentNode)) {
                // if we have whole document then the node.ParentNode.ParentNode
                // is always visible
                for (let cur = node.parentNode; cur != null; cur = cur.parentNode) {
                    if (cur.attributes == null)
                        continue;
                    for (let i = 0; i < cur.attributes.length; i++) {
                        let attribute = cur.attributes[i];
                        // we are looking for "xml:*" attributes
                        if (attribute.prefix !== "xml")
                            continue;

                        // exclude ones that are in the node's attributes axis
                        if (node.attributes.getNamedItemNS(attribute.namespaceURI, attribute.localName) != null)
                            continue;

                        // finally check that we don't have the same attribute in our list
                        let found = false;
                        for (let n of list) {
                            if (n.prefix === "xml" && n.localName === attribute.localName) {
                                found = true;
                                break;
                            }
                        }

                        if (found)
                            continue;

                        // now we can add this attribute to our list
                        list.push(attribute);
                    }
                }
            }

            // sort namespaces and write results	    
            list.sort(XmlDsigC14NTransformAttributesComparer);
            for (let attribute of list) {
                if (attribute != null) {
                    this.res.push(" ");
                    this.res.push(attribute.nodeName);
                    this.res.push("=\"");
                    this.res.push(this.NormalizeString(attribute.nodeValue, XmlNodeType.Attribute));
                    this.res.push("\"");
                }
            }
        }

        // Text Nodes
        // the string value, except all ampersands are replaced 
        // by &amp;, all open angle brackets (<) are replaced by &lt;, all closing 
        // angle brackets (>) are replaced by &gt;, and all #xD characters are 
        // replaced by &#xD;.
        private WriteTextNode(node: Node, visible: boolean): void {
            // Console.WriteLine ("Debug: text node");
            if (visible)
                this.res.push(this.NormalizeString(node.nodeValue, node.nodeType));
        }

        // Comment Nodes
        // Nothing if generating canonical XML without comments. For 
        // canonical XML with comments, generate the opening comment 
        // symbol (<!--), the string value of the node, and the 
        // closing comment symbol (-->). Also, a trailing #xA is rendered 
        // after the closing comment symbol for comment children of the 
        // root node with a lesser document order than the document 
        // element, and a leading #xA is rendered before the opening 
        // comment symbol of comment children of the root node with a 
        // greater document order than the document element. (Comment 
        // children of the root node represent comments outside of the 
        // top-level document element and outside of the document type 
        // declaration).
        private WriteCommentNode(node: Node, visible: boolean): void {
            // Console.WriteLine ("Debug: comment node");
            if (visible && this.comments) {
                if (this.state === XmlCanonicalizerState.AfterDocElement)
                    this.res.push("\x0A<!--");
                else
                    this.res.push("<!--");

                this.res.push(this.NormalizeString(node.nodeValue, XmlNodeType.Comment));

                if (this.state === XmlCanonicalizerState.BeforeDocElement)
                    this.res.push("-->\x0A");
                else
                    this.res.push("-->");
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
        private WriteProcessingInstructionNode(node: Node, visible: boolean): void {
            // Console.WriteLine ("Debug: PI node");

            if (visible) {
                if (this.state === XmlCanonicalizerState.AfterDocElement)
                    this.res.push("\x0A<?");
                else
                    this.res.push("<?");

                this.res.push(node.nodeName);
                if (node.nodeValue) {
                    this.res.push(" ");
                    this.res.push(this.NormalizeString(node.nodeValue, XmlNodeType.ProcessingInstruction));
                }

                if (this.state === XmlCanonicalizerState.BeforeDocElement)
                    this.res.push("?>\x0A");
                else
                    this.res.push("?>");
            }
        }

        private IsInclusive(node: Node, prefix: string): boolean {
            return this.inclusive.indexOf(prefix) === -1; // && node.prefix === prefix;
        }

        // determines whether the node is in the node-set or not.
        private IsNodeVisible(node: Node): boolean {
            // if node list is empty then we process whole document
            if (this.xnl == null)
                return true;

            // walk thru the list
            for (let i = 0; i < this.xnl.length; i++) {
                let xn = this.xnl[i];
                // if (node === xn)
                //     return true;
                if (this.IsNodeInside(node, xn))
                    return true;
            }

            // return true;
            return false;
        }

        private IsNodeInside(node: Node, nodeSource: Node) {
            if (node === nodeSource)
                return true;
            // check for attributes
            if (nodeSource.attributes && nodeSource.attributes.length) {
                let attrs = nodeSource.attributes;
                for (let i = 0; i < attrs.length; i++)
                    if (this.IsNodeInside(node, attrs[i]))
                        return true;
            }
            // check for nodes
            if (nodeSource.childNodes && nodeSource.childNodes.length) {
                let nodes = nodeSource.childNodes;
                for (let i = 0; i < nodes.length; i++)
                    if (this.IsNodeInside(node, nodes[i]))
                        return true;
            }
            return false;
        }

        // This method assumes that the namespace node is *not*
        // rendered yet.
        private IsVisiblyUtilized(owner: Element, ns: Attr): boolean {
            if (owner == null)
                return false;

            let prefix = ns.localName === "xmlns" ? "" : ns.localName;
            if (IsEqualsEmptyStrings(owner.prefix, prefix) && owner.namespaceURI === ns.nodeValue)
                return true;
            if (!owner.hasAttributes())
                return false;
            for (let i = 0; i < owner.attributes.length; i++) {
                let a = owner.attributes[i];
                if (!a.prefix)
                    continue;
                if (!IsEqualsEmptyStrings(a.prefix, prefix) || a.namespaceURI !== ns.nodeValue)
                    continue;
                if (this.IsNodeVisible(a))
                    return true;
            }
            return false;
        }

        private IsNamespaceRendered(prefix: string, uri: string): boolean {
            // if the default namespace xmlns="" is not re-defined yet
            // then we do not want to print it out
            let IsEmptyNs = !prefix && !uri;
            let start = (IsEmptyNs) ? 0 : this.prevVisibleNamespacesStart;
            for (let i = this.visibleNamespaces.length - 1; i >= start; i--) {
                let node = this.visibleNamespaces[i];
                if (node != null) {
                    // get namespace prefix
                    let p = "";
                    if (node.prefix === "xmlns")
                        p = node.localName;
                    if (p === prefix)
                        return node.nodeValue === uri;
                }
            }

            return IsEmptyNs;
        }

        private IsNamespaceNode(node: Node): boolean {
            if (node == null || node.nodeType !== XmlNodeType.Attribute)
                return false;
            return node.namespaceURI === "http://www.w3.org/2000/xmlns/";
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

        private NormalizeString(input: string, type: XmlNodeType): string {
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
                else if (ch === "\x09" && type === XmlNodeType.Attribute)
                    sb.push("&#x9;");
                else if (ch === "\x0A" && type === XmlNodeType.Attribute)
                    sb.push("&#xA;");
                else if (ch === "\x0D")
                    sb.push("&#xD;");
                else
                    sb.push(ch);
            }

            return sb.join("");
        }
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

    function XmlDsigC14NTransformNamespacesComparer(x: Node, y: Node) {
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

        return x.localName.localeCompare(y.localName);
    }

    function GetNamespaceOfPrefix(node: Node, prefix: string): string {
        let _node = node;
        let nodePrefix = _node.prefix || prefix;

        while (_node) {
            if (nodePrefix === void 0) nodePrefix = node.prefix || "";
            if (_node.attributes)
                for (let i = 0; i < _node.attributes.length; i++) {
                    let attribute = _node.attributes[i];
                    let matches = /^(xmlns):?(.*)/.exec(attribute.nodeName);
                    if (matches && matches[1] === "xmlns")
                        if (IsEqualsEmptyStrings(matches[2], prefix) &&
                            (IsEqualsEmptyStrings(matches[2], nodePrefix) || node === _node))
                            return attribute.nodeValue;
                }
            _node = _node.parentNode;
        }
        return null;
    }



}
