namespace xadesjs {
    export class XmlDsigExcC14NTransform extends Transform {
        private input: Type[];
        private output: Type[];
        private canonicalizer: XmlCanonicalizer;
        private s: string;
        private inclusiveNamespacesPrefixList: string;

        public constructor();
        public constructor(includeComments: boolean);
        public constructor(inclusiveNamespacesPrefixList: string);
        public constructor(includeComments: boolean, inclusiveNamespacesPrefixList: string);
        public constructor(param1?: any, param2?: any) {
            // super(false, null)
            super();
            // public constructor();
            let includeComments = false;
            let inclusiveNamespacesPrefixList: string = null;
            if (typeof param1 === "boolean") {
                // public constructor(includeComments: boolean);
                includeComments = param1;
            }
            else if (typeof param1 === "string") {
                // public constructor(inclusiveNamespacesPrefixList: string);
                includeComments = false;
                inclusiveNamespacesPrefixList = param1;
            }
            else if (param2) {
                // public constructor(includeComments: boolean, inclusiveNamespacesPrefixList: string);
                includeComments = param1;
                inclusiveNamespacesPrefixList = param2;
            }
            if (includeComments)
                this.Algorithm = XmlSignature.AlgorithmNamespaces.XmlDsigExcC14NWithCommentsTransform;
            else
                this.Algorithm = XmlSignature.AlgorithmNamespaces.XmlDsigExcC14NTransform;
            this.inclusiveNamespacesPrefixList = inclusiveNamespacesPrefixList;
            this.canonicalizer = new XmlCanonicalizer(includeComments, true, this.PropagatedNamespaces);
        }

        get InclusiveNamespacesPrefixList(): string {
            return this.inclusiveNamespacesPrefixList;
        }
        set InclusiveNamespacesPrefixList(value: string) {
            this.inclusiveNamespacesPrefixList = value;
        }

        get InputTypes(): Type[] {
            if (this.input == null) {
                this.input = [];
                this.input.push(typeof System.IO.Stream);
                this.input.push(typeof System.Xml.XmlDocument);
                this.input.push(typeof System.Xml.XmlNodeList);
            }
            return this.input;
        }

        get OutputTypes(): Type[] {
            if (this.output == null) {
                this.output = [
                    typeof (System.IO.Stream)
                ];
            }
            return this.output;
        }

        protected GetInnerXml(): NodeList {
            return null; // THIS IS DOCUMENTED AS SUCH
        }

        public GetDigestedOutput(hash: Algorithm): Promise {
            // no null check, MS throws a NullReferenceException here
            return hash.ComputeHash((Stream) GetOutput ());
        }

        public GetOutput(): string {
            return this.s;
        }

        public LoadInnerXml(nodeList: NodeList) {
            // documented as not changing the state of the transform
        }

        public LoadInput(obj: string): void;
        public LoadInput(obj: Document): void;
        public LoadInput(obj: NodeList): void;
        public LoadInput(obj: any): void {
            this.canonicalizer.InclusiveNamespacesPrefixList = this.InclusiveNamespacesPrefixList;
            // possible input: Stream, XmlDocument, and XmlNodeList
            if (typeof obj === "string") {
                let stream: string = obj;
                let doc = document.implementation.createDocument("", "", null);
                doc.PreserveWhitespace = true;	// REALLY IMPORTANT
                doc.XmlResolver = this.GetResolver();
                doc.load(new XmlSignatureStreamReader(stream));
                //				doc.Load ((Stream) obj);
                this.s = this.canonicalizer.Canonicalize(doc);
                return;
            }
            else if (obj.constructor.name === "Document" || obj instanceof Document ||
                obj.constructor.name === "Node" || obj instanceof Node) {
                this.s = new XMLSerializer().serializeToString(obj);//this.canonicalizer.Canonicalize(obj);
                return;
            }
            else
                throw new XmlError(XE.PARAM_REQUIRED, "obj");
        }
    }
}