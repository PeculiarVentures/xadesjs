/// <reference path="../common.ts" />

namespace xadesjs {

    export interface Transform extends IXmlSerializable {
        Algorithm: string;
        LoadInnerXml(node: Node): void;
        GetInnerXml(): Node;
        GetOutput(): string;
    }

    export interface ICanonicalizationAlgorithmConstructable {
        new (): Transform;
    }

    export abstract class Transform extends XmlObject implements Transform {
        protected innerXml: Node = null;
        
        GetOutput(): string{
            throw new XmlError(XE.METHOD_NOT_IMPLEMENTED);
        }

        LoadInnerXml(node: Node) {
            if (!node)
                throw new XmlError(XE.PARAM_REQUIRED, "node");
            this.innerXml = node;
        }
        
        GetInnerXml(): Node{
            return this.innerXml;
        }
        
        loadXml(value: Node) {
            if (value == null)
                throw new XmlError(XE.PARAM_REQUIRED, "value");

            if ((value.localName !== XmlSignature.ElementNames.Transform) || (value.namespaceURI !== XmlSignature.NamespaceURI))
                throw new XmlError(XE.CRYPTOGRAPHIC, "value");
                
            let alg = (value as Element).getAttribute(XmlSignature.AttributeNames.Algorithm)
            if (this.Algorithm !== alg)
                throw new XmlError(XE.ALGORITHM_WRONG_NAME, alg);
        } 

        getXml(): Element {
            let document = CreateDocument();
            let xel = document.createElementNS(XmlSignature.NamespaceURI, `${this.GetPrefix()}${XmlSignature.ElementNames.Transform}`);
            xel.setAttribute(XmlSignature.AttributeNames.Algorithm, this.Algorithm);
            return xel;
        }
    }

}