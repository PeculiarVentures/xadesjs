namespace xadesjs {
    export class XmlDsigExcC14NTransform implements Transform {
        protected includeComments = false;

        attrCompare(a: Node, b: Node): number {
            if (!a.namespaceURI && b.namespaceURI) { return -1; }
            if (!b.namespaceURI && a.namespaceURI) { return 1; }

            let left = a.namespaceURI + a.localName;
            let right = b.namespaceURI + b.localName;

            if (left === right) return 0;
            else if (left < right) return -1;
            else return 1;
        };

        nsCompare(a: Node, b: Node): number {
            let attr1 = a.prefix;
            let attr2 = b.prefix;
            if (attr1 === attr2) { return 0; }
            return attr1.localeCompare(attr2);
        };

        renderAttrs(node: Node, defaultNS: string) {
            let res: string[] = [],
                attrListToRender: Attr[] = [];

            if (node.nodeType === 8) { return this.renderComment(node); }

            if (node.attributes) {
                for (let i = 0; i < node.attributes.length; ++i) {
                    let attr = node.attributes[i];
                    // ignore namespace definition attributes
                    if (attr.name.indexOf("xmlns") === 0) { continue; }
                    attrListToRender.push(attr);
                }
            }

            attrListToRender.sort(this.attrCompare);

            for (let a in attrListToRender) {
                if (!attrListToRender.hasOwnProperty(a)) { continue; }

                let attr = attrListToRender[a];
                res.push(` ${attr.name}="${encodeSpecialCharactersInAttribute(attr.value)}"`);
            }

            return res.join("");
        };

        /**
         * Create the string of all namespace declarations that should appear on this element
         *
         * @param {Node} node. The node we now render
         * @param {Array} prefixesInScope. The prefixes defined on this node
         *                parents which are a part of the output set
         * @param {String} defaultNs. The current default namespace
         * @return {String}
         * @api private
         */
        renderNs(node: Node, prefixesInScope: string[], defaultNs: string, defaultNsForPrefix: IAssocArray, inclusiveNamespacesPrefixList: string[]): IRenderedNamespace {
            let res: string[] = [],
                newDefaultNs = defaultNs,
                nsListToRender: Node[] = [],
                currNs = node.namespaceURI || "";

            // handle the namespaceof the node itself
            if (node.prefix) {
                if (prefixesInScope.indexOf(node.prefix) === -1) {
                    nsListToRender.push(<any>{ "prefix": node.prefix, "namespaceURI": node.namespaceURI || defaultNsForPrefix[node.prefix] });
                    prefixesInScope.push(node.prefix);
                }
            }
            else if (defaultNs !== currNs) {
                // new default ns
                newDefaultNs = node.namespaceURI;
                res.push(` xmlns="${newDefaultNs}"`);
            }

            // handle the attributes namespace
            if (node.attributes) {
                for (let i = 0; i < node.attributes.length; ++i) {
                    let attr = node.attributes[i];

                    // handle all prefixed attributes that are included in the prefix list and where
                    // the prefix is not defined already
                    if (attr.prefix && prefixesInScope.indexOf(attr.localName) === -1 && inclusiveNamespacesPrefixList.indexOf(attr.localName) >= 0) {
                        nsListToRender.push(<any>{
                            "prefix": attr.localName,
                            "namespaceURI": attr.value
                        });
                        prefixesInScope.push(attr.localName);
                    }

                    // handle all prefixed attributes that are not xmlns definitions and where
                    // the prefix is not defined already
                    if (attr.prefix && prefixesInScope.indexOf(attr.prefix) === -1 && attr.prefix !== "xmlns" && attr.prefix !== "xml") {
                        nsListToRender.push(<any>{
                            "prefix": attr.prefix,
                            "namespaceURI": attr.namespaceURI
                        });
                        prefixesInScope.push(attr.prefix);
                    }
                }
            }

            nsListToRender.sort(this.nsCompare);

            // render namespaces
            for (let a in nsListToRender) {
                if (!nsListToRender.hasOwnProperty(a)) { continue; }

                let p = nsListToRender[a];
                res.push(" xmlns:", p.prefix, "=\"", p.namespaceURI, "\"");
            }

            return { "rendered": res.join(""), "newDefaultNs": newDefaultNs };
        };

        processInner(node: Node, prefixesInScope: string[], defaultNs: string, defaultNsForPrefix: IAssocArray, inclusiveNamespacesPrefixList: string[]) {

            if (node.nodeType === 8)
                return this.renderComment(node);
            if ("data" in node) // Text
                return encodeSpecialCharactersInText((<Text>node).data);

            let _node = <Element>node;

            let ns = this.renderNs(node, prefixesInScope, defaultNs, defaultNsForPrefix, inclusiveNamespacesPrefixList),
                res = ["<", _node.tagName, ns.rendered, this.renderAttrs(node, ns.newDefaultNs), ">"];

            for (let i = 0; i < node.childNodes.length; ++i) {
                let pfxCopy = prefixesInScope.slice(0);
                res.push(this.processInner(node.childNodes[i], pfxCopy, ns.newDefaultNs, defaultNsForPrefix, inclusiveNamespacesPrefixList));
            }

            res.push("</", _node.tagName, ">");
            return res.join("");
        };

        // Thanks to deoxxa/xml-c14n for comment renderer
        renderComment(node: Node) {
            if (!this.includeComments) { return ""; }

            let isOutsideDocument = (node.ownerDocument === node.parentNode),
                isBeforeDocument = false,
                isAfterDocument = false;

            if (isOutsideDocument) {
                let nextNode = node,
                    previousNode = node;

                while (nextNode !== null) {
                    if (nextNode === node.ownerDocument.documentElement) {
                        isBeforeDocument = true;
                        break;
                    }

                    nextNode = nextNode.nextSibling;
                }

                while (previousNode !== null) {
                    if (previousNode === node.ownerDocument.documentElement) {
                        isAfterDocument = true;
                        break;
                    }

                    previousNode = previousNode.previousSibling;
                }
            }

            return (isAfterDocument ? "\n" : "") + "<!--" + encodeSpecialCharactersInText((<Text>node).data) + "-->" + (isBeforeDocument ? "\n" : "");
        };

        /**
         * Perform canonicalization of the given node
         *
         * @param {Node} node
         * @return {String}
         * @api public
         */
        process(node: Node, options: IProcessOptions = {}): string {
            if (this.includeComments)
                console.log("XADESJS:XmlDsigExcC14NWithCommentsTransform: Process", node.nodeName);
            else
                console.log("XADESJS:XmlDsigExcC14NTransform: Process", node.nodeName);
            let inclusiveNamespacesPrefixList = options.inclusiveNamespacesPrefixList || [];
            let defaultNs = options.defaultNs || "";
            let defaultNsForPrefix = options.defaultNsForPrefix || {};
            if (!(inclusiveNamespacesPrefixList instanceof Array)) {
                inclusiveNamespacesPrefixList = (<string>inclusiveNamespacesPrefixList).split(" ");
            }

            let res = this.processInner(node, [], defaultNs, defaultNsForPrefix, <string[]>inclusiveNamespacesPrefixList);
            return res;
        };

        getAlgorithmName(): string {
            return "http://www.w3.org/2001/10/xml-exc-c14n#";
        };

        public LoadInnerXml(nodeList: NodeList) {
            // documented as not changing the state of the transform
        }

    };

    export interface INsPrefix {
        [index: string]: string;
    };

    export interface IProcessOptions {
        inclusiveNamespacesPrefixList?: string[] | string;
        defaultNs?: string;
        defaultNsForPrefix?: INsPrefix;
    }

    // Add c14n#WithComments here (very simple subclass
    export class XmlDsigExcC14NWithCommentsTransform extends XmlDsigExcC14NTransform {
        protected includeComments = true;

        getAlgorithmName(): string {
            return "http://www.w3.org/2001/10/xml-exc-c14n#WithComments";
        };
    }
}