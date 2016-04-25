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

    /**
     * Represents the abstract base class from which all <Transform> elements 
     * that can be used in an XML digital signature derive.
     */
    export abstract class Transform extends XmlObject implements Transform {
        protected innerXml: Node = null;

        /**
         * When overridden in a derived class, returns the output of the current Transform object.
         */
        GetOutput(): string {
            throw new XmlError(XE.METHOD_NOT_IMPLEMENTED);
        }

        LoadInnerXml(node: Node) {
            if (!node)
                throw new XmlError(XE.PARAM_REQUIRED, "node");
            this.innerXml = node;
        }

        GetInnerXml(): Node {
            return this.innerXml;
        }

        LoadXml(value: Node) {
            if (value == null)
                throw new XmlError(XE.PARAM_REQUIRED, "value");

            if ((value.localName !== XmlSignature.ElementNames.Transform) || (value.namespaceURI !== XmlSignature.NamespaceURI))
                throw new XmlError(XE.CRYPTOGRAPHIC, "value");

            let alg = (value as Element).getAttribute(XmlSignature.AttributeNames.Algorithm);
            if (this.Algorithm !== alg)
                throw new XmlError(XE.ALGORITHM_WRONG_NAME, alg);
        }

        /**
         * Returns the XML representation of the current Transform object.
         * @returns Element
         */
        GetXml(): Element {
            let document = CreateDocument();
            let xel = document.createElementNS(XmlSignature.NamespaceURI, `${this.GetPrefix()}${XmlSignature.ElementNames.Transform}`);
            xel.setAttribute(XmlSignature.AttributeNames.Algorithm, this.Algorithm);
            return xel;
        }
    }

}