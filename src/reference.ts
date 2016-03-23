namespace xadesjs {
    export class Reference extends XmlObject {

        protected transformAlg: ICanonicalizationAlgorithm;
        
        uri: string;
        type: string;
        digestValue: ArrayBuffer;
        digestMethod: string;

        addTransform(canonAlg: ICanonicalizationAlgorithm): void;
    }
}