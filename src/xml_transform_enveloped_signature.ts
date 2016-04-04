/// <reference path="./transform.ts" />

namespace xadesjs {

    export class XmlDsigEnvelopedSignatureTransform extends Transform {
        private input: Type[];
        private output: Type[];
        private comments: boolean;
        private inputObj: any;

        public constructor(includeComments: boolean = false) {
            super();
            this.Algorithm = XmlSignature.AlgorithmNamespaces.XmlDsigEnvelopedSignatureTransform;
            this.comments = includeComments;
        }

        get InputTypes(): Type[] {
            if (this.input == null) {
                this.input = [
                    typeof (System.IO.Stream),
                    typeof (System.Xml.XmlDocument),
                    typeof (System.Xml.XmlNodeList)
                ];
            }
            return this.input;
        }


        get OutputTypes(): Type[] {
            if (this.output == null) {
                this.output = [
                    typeof (System.Xml.XmlDocument),
                    typeof (System.Xml.XmlNodeList)
                ];
            }
            return this.output;
        }

        protectedGetInnerXml(): NodeList {
            return null; // THIS IS DOCUMENTED AS SUCH
        }

        // NOTE: This method never supports the requirements written
        // in xmldsig spec that says its input is canonicalized before
        // transforming. This method just removes Signature element.
        // Canonicalization is done in SignedXml.
        public GetOutput(type?: Type): any {
            if (type) {
                if (type instanceof Stream)
                    return this.GetOutput();
                throw new XmlError(XE.PARAM_REQUIRED, "type");
            }
            else {
                let doc: Document = null;

                // possible input: Stream, XmlDocument, and XmlNodeList
                if (this.inputObj instanceof Stream) {
                    throw new XmlError(XE.METHOD_NOT_IMPLEMENTED);
                    // doc = document.implementation.createDocument("", "", null);
                    // doc.PreserveWhitespace = true;
                    // doc.XmlResolver = GetResolver();
                    // doc.load(new XmlSignatureStreamReader(
                    //     new StreamReader(inputObj as Stream)));
                    // return GetOutputFromNode(doc, GetNamespaceManager(doc), true);
                }
                else if (this.inputObj instanceof Document) {
                    doc = this.inputObj as Document;
                    return this.GetOutputFromNode(doc, this.GetNamespaceManager(doc), true);
                }
                else if (this.inputObj instanceof NodeList) {
                    let al = [];
                    let nl = <NodeList>this.inputObj;
                    if (nl.length > 0) {
                        let m = this.GetNamespaceManager(nl.item(0));
                        let tmp: Node[] = [];
                        for (let i = 0; i < nl.length; i++) {
                            let n = nl.item(i);
                            tmp.push(n);
                        }
                        for (let n of tmp)
                            if (n.selectNodes("ancestor-or-self::dsig:Signature", m).length == 0)
                                al.push(this.GetOutputFromNode(n, m, false));
                    }
                    return new XmlDsigNodeList(al);
                }
                // Note that it is unexpected behavior with related to InputTypes (MS.NET accepts XmlElement)
                else if (this.inputObj instanceof Element) {
                    let el = this.inputObj as Element;
                    let m = this.GetNamespaceManager(el);
                    if (el.selectNodes("ancestor-or-self::dsig:Signature", m).length == 0)
                        return this.GetOutputFromNode(el, m, true);
                }

                throw new XmlError(XE.NULL_REFERENCE);
            }
        }

        private GetNamespaceManager(n: Node): XmlNamespaceManager {
            let doc = ((n instanceof Document) ? (n as Document) : n.ownerDocument);
            let nsmgr = new XmlNamespaceManager(doc.NameTable);
            nsmgr.AddNamespace("dsig", XmlSignature.NamespaceURI);
            return nsmgr;
        }

        private GetOutputFromNode(input: Node, nsmgr: XmlNamespaceManager, remove: boolean): Node {
            if (remove) {
                let nl: NodeList = input.selectNodes("descendant-or-self::dsig:Signature", nsmgr);
                let al: Node[] = [];
                for (let i = 0; i < nl.length; i++) {
                    let n = nl.item(i);
                    al.push(n);
                }
                for (let n of al)
                    n.parentNode.removeChild(n);
            }
            return input;
        }



        public LoadInnerXml(nodeList: NodeList): void {
            // NO CHANGE
        }

        public LoadInput(obj: any): void {
            this.inputObj = obj;
        }
    }
}