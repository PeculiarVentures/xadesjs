/// <reference path="../common.ts" />

namespace xadesjs {
    export interface IRenderedNamespace {
        rendered: string;
        newDefaultNs: string;
    }

    export interface Transform extends IXmlSerializable {
        process(node: Node, options?: IProcessOptions): string;
        getAlgorithmName(): string;
        LoadInnerXml(nodeList: NodeList): void;
        GetInnerXml(): Node[];
    }

    export interface ICanonicalizationAlgorithmConstructable {
        new (): Transform;
    }

    export abstract class AbstractTransform extends XmlObject implements Transform{
        process(node: Node, options?: IProcessOptions): string {
            throw new XmlError(XE.METHOD_NOT_IMPLEMENTED);
        }
        getAlgorithmName(): string {
            throw new XmlError(XE.METHOD_NOT_IMPLEMENTED);
        }
        LoadInnerXml(nodeList: NodeList): void {
            throw new XmlError(XE.METHOD_NOT_IMPLEMENTED);
        }
        GetInnerXml(): Node[] {
            return null;
        }

        getXml(): Element {
            let document = CreateDocument();
            let xel = document.createElementNS(XmlSignature.NamespaceURI, `${this.GetPrefix()}${XmlSignature.ElementNames.Transform}`);
            xel.setAttribute(XmlSignature.AttributeNames.Algorithm, this.getAlgorithmName());
            let xnl = this.GetInnerXml();
            if (xnl != null) {
                for (let xn of xnl) {
                    let importedNode = document.importNode(xn, true);
                    xel.appendChild(importedNode);
                }
            }
            return xel;
        }
    }

}