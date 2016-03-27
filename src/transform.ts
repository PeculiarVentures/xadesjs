/// <reference path="./hashtable.ts" />

namespace xadesjs {

    export abstract class Transform {

        private algo: string;
        private xmlResolver: XmlResolver;
        private propagated_namespaces = new Hashtable();

        protected constructor() {
            // if (SecurityManager.SecurityEnabled) {
            //     this.xmlResolver = new XmlSecureResolver(new XmlUrlResolver(), (Evidence) new Evidence());
            // } else {
            //     this.xmlResolver = new XmlUrlResolver();
            // }
            this.xmlResolver = null;
        }

        get Algorithm(): string {
            return this.algo;
        }
        set Algorithm(value: string) {
            this.algo = value;
        }

        get InputTypes(): Type[] {
            throw new XmlError(XE.METHOD_NOT_IMPLEMENTED);
        }

        get OutputTypes(): Type[] {
            throw new XmlError(XE.METHOD_NOT_IMPLEMENTED);
        }

        set Resolver(value: XmlResolver) {
            this.xmlResolver = value;
        }

        get Context(): Element {
            throw new XmlError(XE.METHOD_NOT_IMPLEMENTED);
        }
        set Context(value: Element) {
            throw new XmlError(XE.METHOD_NOT_IMPLEMENTED);
        }

        get PropagatedNamespaces(): Hashtable {
            return this.propagated_namespaces;
        }

        public GetDigestedOutput(hash: HashAlgorithm): ArrayBuffer {
            // no null check, MS throws a NullReferenceException here
            return hash.ComputeHash((Stream) GetOutput (typeof (Stream)));
        }

        protected GetInnerXml(): NodeList {
            throw new XmlError(XE.METHOD_NOT_IMPLEMENTED);
        }

        public GetOutput(type: Type): any {
            throw new XmlError(XE.METHOD_NOT_IMPLEMENTED);
        }

        getXml(): Element {
            let doc = document.implementation.createDocument("", "", null);
            doc.XmlResolver = this.GetResolver();
            let xel = doc.createElementNS(XmlSignature.NamespaceURI, XmlSignature.ElementNames.Transform);
            xel.setAttribute(XmlSignature.AttributeNames.Algorithm, this.algo);
            let xnl = this.GetInnerXml();
            if (xnl != null) {
                for (let i = 0; i < xnl.length; i++) {
                    let xn = xnl[i];
                    let importedNode = doc.importNode(xn, true);
                    xel.appendChild(importedNode);
                }
            }
            return xel;
        }

        LoadInnerXml(nodeList: NodeList): void {
            throw new XmlError(XE.METHOD_NOT_IMPLEMENTED);
        }

        LoadInput(obj: any): void {
            throw new XmlError(XE.METHOD_NOT_IMPLEMENTED);
        }

        GetResolver(): XmlResolver {
            return this.xmlResolver;
        }
    }

}