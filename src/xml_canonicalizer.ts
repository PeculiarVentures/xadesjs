namespace xadesjs {

    enum XmlCanonicalizerState {
        BeforeDocElement,
        InsideDocElement,
        AfterDocElement
    }

    export class XmlCanonicalizer {


        // c14n parameters
        private comments: boolean;
        private exclusive: boolean;
        inclusiveNamespacesPrefixList: string;

        // input/output
        private xnl: NodeList;
        private res: string;

        // namespaces rendering stack
        private state: XmlCanonicalizerState;
        private visibleNamespaces: Attr[];
        private prevVisibleNamespacesStart: number;
        private prevVisibleNamespacesEnd: number;
        private propagatedNss: Hashtable;

        public constructor(withComments: boolean, excC14N: boolean, propagatedNamespaces: Hashtable) {
            this.res = "";
            this.comments = withComments;
            this.exclusive = excC14N;
            this.propagatedNss = propagatedNamespaces;
        }

        Initialize() {
            this.state = XmlCanonicalizerState.BeforeDocElement;
            this.visibleNamespaces = [];
            this.prevVisibleNamespacesStart = 0;
            this.prevVisibleNamespacesEnd = 0;
        }

        Canonicalize(doc: Document): string;
        Canonicalize(nodes: NodeList): string;
        Canonicalize(node: NodeList | Document): string {
            if ((<any>node.constructor).name === "Document" || node instanceof Document) {
                this.Initialize();

                this.FillMissingPrefixes(<Document>node, null/*new XmlNamespaceManager(node.nameTable)*/, []);
                this.WriteDocumentNode(<Document>node);

                // UTF8Encoding utf8 = new UTF8Encoding();
                // byte[] data = utf8.GetBytes(res.ToString());
                // return new MemoryStream(data);
                return this.res;
            }
            else if ((<any>node.constructor).name === "NodeList" || node instanceof NodeList) {
                this.xnl = node;
                if (node == null || node.length < 1)
                    return "";
                let n = node[0];
                return this.Canonicalize(n.nodeType === XmlNodeType.Document ? n as Document : n.ownerDocument);
            }
        }

        // See xml-enc-c14n specification
        get InclusiveNamespacesPrefixList(): string {
            return this.inclusiveNamespacesPrefixList;
        }
        set InclusiveNamespacesPrefixList(value: string) {
            this.inclusiveNamespacesPrefixList = value;
        }

        CreateXmlns(n: Node): Attr {
            let a = n.prefix.length === 0 ?
                n.ownerDocument.createAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns") :
                n.ownerDocument.createAttributeNS(n.prefix, "xmlns");
            a.value = n.namespaceURI;
            return a;
        }

        // Note that this must be done *before* filtering nodes out
        // by context node list.
        private FillMissingPrefixes(n: Node, nsmgr: XmlNamespaceManager, tmpList: Attr[]) {
            if (n.prefix.length === 0 && this.propagatedNss != null) {
                for (let de of this.propagatedNss)
                    if (de.Value === n.namespaceURI) {
                        n.prefix = de.Key;
                        break;
                    }
            }

            if (n.nodeType === XmlNodeType.Element && (<Node>n).hasAttributes()) {
                for (let i = 0; i < n.attributes.length; i++) {
                    let a = n.attributes[i];
                    if (a.namespaceURI === "http://www.w3.org/2000/xmlns/")
                        nsmgr.AddNamespace(a.prefix.length === 0 ? null : a.localName, a.value);
                }
                nsmgr.PushScope();
            }

            if (n.namespaceURI.length > 0 && nsmgr.LookupPrefix(n.namespaceURI) == null)
                tmpList.push(this.CreateXmlns(n));

            if (n.nodeType === XmlNodeType.Element && (<Element>n).hasAttributes()) {
                for (let i = 0; i < n.attributes.length; i++) {
                    let a = n.attributes[i];
                    if (a.namespaceURI.length > 0 && nsmgr.LookupNamespace(a.prefix) == null)
                        tmpList.push(this.CreateXmlns(a));
                }
            }

            for (let a of tmpList)
                (<Element>n).setAttributeNode(a);
            tmpList = [];

            if (n.hasChildNodes) {
                for (let c = n.firstChild; c != null; c = c.nextSibling)
                    if (c.nodeType === XmlNodeType.Element)
                        this.FillMissingPrefixes(c, nsmgr, tmpList);
            }
            nsmgr.PopScope();
        }

        private WriteNode(node: Node) {
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
                    throw new XmlError(XE.XML_EXCEPTION, "Attribute node is impossible here");
                case XmlNodeType.EndElement:
                    throw new XmlError(XE.XML_EXCEPTION, "EndElement node is impossible here");
                case XmlNodeType.EndEntity:
                    throw new XmlError(XE.XML_EXCEPTION, "EndEntity node is impossible here");
                case XmlNodeType.DocumentType:
                case XmlNodeType.Entity:
                case XmlNodeType.Notation:
                case XmlNodeType.XmlDeclaration:
                    // just do nothing
                    break;
            }
        }

        private WriteDocumentNode(node: Node) {
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
        private WriteElementNode(node: Node, visible: boolean) {
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
                this.res += `<${node.nodeName}`;
            }

            // this is odd but you can select namespaces
            // and attributes even if node itself is not visible
            this.WriteNamespacesAxis(node, visible);
            this.WriteAttributesAxis(node);

            if (visible)
                this.res += ">";

            // write children
            for (let child = node.firstChild; child != null; child = child.nextSibling)
                this.WriteNode(child);

            // write end tag	    
            if (visible)
                this.res += `</${node.nodeName}>`;

            // restore state
            if (visible && s === XmlCanonicalizerState.BeforeDocElement)
                this.state = XmlCanonicalizerState.AfterDocElement;
            this.prevVisibleNamespacesStart = savedPrevVisibleNamespacesStart;
            this.prevVisibleNamespacesEnd = savedPrevVisibleNamespacesEnd;
            if (this.visibleNamespaces.length > savedVisibleNamespacesSize) {
                this.visibleNamespaces.splice(savedVisibleNamespacesSize,
                    this.visibleNamespaces.length - savedVisibleNamespacesSize);
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
        //	    namespace node in the node-set (default namespace nodes always 
        //      have non-empty values in XPath)
        // The latter condition eliminates unnecessary occurrences of xmlns="" in 
        // the canonical form since an element only receives an xmlns="" if its 
        // default namespace is empty and if it has an immediate parent in the 
        // canonical form that has a non-empty default namespace. To finish 
        // processing  L, simply process every namespace node in L, except omit 
        // namespace node with local name xml, which defines the xml prefix, 
        // if its string value is http://www.w3.org/XML/1998/namespace.
        private WriteNamespacesAxis(node: Node, visible: boolean) {
            // Console.WriteLine ("Debug: namespaces");

            let doc = node.ownerDocument;
            let has_empty_namespace = false;
            let list: Attr[] = [];
            for (let cur = node; cur != null && cur !== doc; cur = cur.parentNode) {
                for (let i = 0; i < cur.attributes.length; i++) {
                    let attribute = cur.attributes[i];
                    if (!this.IsNamespaceNode(attribute))
                        continue;

                    // get namespace prefix
                    let prefix: string = null;
                    if (attribute.prefix === "xmlns")
                        prefix = attribute.localName;

                    // check if it is "xml" namespace			    
                    if (prefix === "xml" && attribute.value === "http://www.w3.org/XML/1998/namespace")
                        continue;

                    // make sure that this is an active namespace
                    // for our node
                    let ns = node.getNamespaceOfPrefix(prefix);
                    if (ns !== attribute.value)
                        continue;

                    // check that it is selected with XPath
                    if (!this.IsNodeVisible(attribute))
                        continue;

                    // check that we have not rendered it yet
                    let rendered = this.IsNamespaceRendered(prefix, attribute.value);

                    // For exc-c14n, only visibly utilized
                    // namespaces are written.
                    if (this.exclusive && !this.IsVisiblyUtilized(node as Element, attribute))
                        continue;

                    // add to the visible namespaces stack
                    if (visible)
                        this.visibleNamespaces.push(attribute);

                    if (!rendered)
                        list.push(attribute);

                    if (prefix == null)
                        has_empty_namespace = true;
                }
            }

            // add empty namespace if needed
            if (visible && !has_empty_namespace && !this.IsNamespaceRendered(null, null) && node.namespaceURI === null)
                this.res += " xmlns=\"\"";

            list.sort(XmlDsigC14NTransformNamespacesComparer.Compare);
            for (let obj of list) {
                let attribute = obj;
                if (attribute != null) {
                    this.res += ` ${attribute.name}="${attribute.value}"`;
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

            let list: Node[] = [];
            for (let i = 0; i < node.attributes.length; i < 0) {
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
                        for (let obj of list) {
                            let n = (obj as Node);
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
            list.sort(XmlDsigC14NTransformAttributesComparer.Compare);
            for (let obj of list) {
                let attribute = (obj as Node);
                if (attribute != null) {
                    this.res += ` ${attribute.nodeName}="${this.NormalizeString(attribute.nodeValue, XmlNodeType.Attribute)}"`;
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
                this.res += this.NormalizeString(node.nodeValue, node.nodeType);
            // res.Append (NormalizeString (node.Value, XmlNodeType.Text));
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
                if (this.state == XmlCanonicalizerState.AfterDocElement)
                    this.res += "\x0A<!--";
                else
                    this.res += "<!--";

                this.res += this.NormalizeString(node.nodeValue, XmlNodeType.Comment);

                if (this.state === XmlCanonicalizerState.BeforeDocElement)
                    this.res += "-->\x0A";
                else
                    this.res += "-->";
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
                    this.res += "\x0A<?";
                else
                    this.res += "<?";

                this.res += node.nodeName;
                if (node.nodeValue.length > 0) {
                    this.res += " ";
                    this.res += this.NormalizeString(node.nodeValue, XmlNodeType.ProcessingInstruction);
                }

                if (this.state === XmlCanonicalizerState.BeforeDocElement)
                    this.res += "?>\x0A";
                else
                    this.res += "?>";
            }
        }

        // determines whether the node is in the node-set or not.
        private IsNodeVisible(node: Node): boolean {
            // if node list is empty then we process whole document
            if (this.xnl == null)
                return true;

            // walk thru the list
            for (let i = 0; i < this.xnl.length; i++) {
                let xn = this.xnl[i];
                if (node.isSameNode(xn))
                    return true;
            }

            return false;
        }

        // This method assumes that the namespace node is *not*
        // rendered yet.
        private IsVisiblyUtilized(owner: Element, ns: Attr): boolean {
            if (owner == null)
                return false;

            let prefix = ns.localName === "xmlns" ? null : ns.localName;
            if (owner.prefix === prefix && owner.namespaceURI === ns.nodeValue)
                return true;
            if (!owner.hasAttributes())
                return false;
            for (let i = 0; i < owner.attributes.length; i++) {
                let a = owner.attributes[i];
                if (a.prefix === null)
                    continue;
                if (a.prefix !== prefix || a.namespaceURI !== ns.nodeValue)
                    continue;
                if (this.IsNodeVisible(a))
                    return true;
            }
            return false;
        }

        private IsNamespaceRendered(prefix: string, uri: string): boolean {
            // if the default namespace xmlns="" is not re-defined yet
            // then we do not want to print it out
            let IsEmptyNs = prefix == null && uri == null;
            let start = (IsEmptyNs) ? 0 : this.prevVisibleNamespacesStart;
            for (let i = this.visibleNamespaces.length - 1; i >= start; i--) {
                let node = (this.visibleNamespaces[i] as Node);
                if (node != null) {
                    // get namespace prefix
                    let p = "";
                    if (node.prefix === "xmlns")
                        p = node.localName;
                    if (p == prefix)
                        return node.nodeValue == uri;
                }
            }

            return IsEmptyNs;
        }

        private IsNamespaceNode(node: Node): boolean {
            if (node == null || node.nodeType != XmlNodeType.Attribute)
                return false;
            return node.namespaceURI == "http://www.w3.org/2000/xmlns/";
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
            let sb = "";
            for (let i = 0; i < input.length; i++) {
                let ch = input[i];
                if (ch == "<" && (type === XmlNodeType.Attribute || this.IsTextNode(type)))
                    sb += "&lt;";
                else if (ch == ">" && this.IsTextNode(type))
                    sb += "&gt;";
                else if (ch == "&" && (type === XmlNodeType.Attribute || this.IsTextNode(type)))
                    sb += "&amp;";
                else if (ch == `\"` && type === XmlNodeType.Attribute)
                    sb += "&quot;";
                else if (ch == `\x09` && type === XmlNodeType.Attribute)
                    sb += "&#x9;";
                else if (ch == `\x0A` && type === XmlNodeType.Attribute)
                    sb += `&#xA`;
                else if (ch == `\x0D`)
                    sb += `&#xD;`;
                else
                    sb += ch;
            }

            return sb;
        }
    }

    class XmlDsigC14NTransformAttributesComparer {
        static Compare(x: Node, y: Node): number {
            let n1 = (x as Node);
            let n2 = (y as Node);

            // simple cases
            if (n1 === n2)
                return 0;
            else if (n1 == null)
                return -1;
            else if (n2 == null)
                return 1;
            else if (n1.prefix === n2.prefix)
                return n1.localName.localeCompare(n2.localName);
            // Attributes in the default namespace are first
            // because the default namespace is not applied to
            // unqualified attributes
            if (n1.prefix === null)
                return -1;
            else if (n2.prefix === null)
                return 1;

            let ret = n1.namespaceURI.localeCompare(n2.namespaceURI);
            if (ret === 0)
                ret = n1.localName.localeCompare(n2.localName);
            return ret;
        }
    }

    class XmlDsigC14NTransformNamespacesComparer {
        static Compare(x: Node, y: Node): number {
            let n1 = (x as Node);
            let n2 = (y as Node);

            // simple cases
            if (n1 === n2)
                return 0;
            else if (n1 == null)
                return -1;
            else if (n2 == null)
                return 1;
            else if (n1.prefix === null)
                return -1;
            else if (n2.prefix === null)
                return 1;

            return n1.localName.localeCompare(n2.localName);
        }
    }

}