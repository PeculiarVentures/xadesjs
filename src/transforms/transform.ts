/// <reference path="../common.ts" />

namespace xadesjs {
    export interface IRenderedNamespace {
        rendered: string;
        newDefaultNs: string;
    }

    export interface Transform {
        process(node: Node, options?: IProcessOptions): string;
        getAlgorithmName(): string;
        LoadInnerXml(nodeList: NodeList): void;
    }

    export interface ICanonicalizationAlgorithmConstructable {
        new (): Transform;
    }

}