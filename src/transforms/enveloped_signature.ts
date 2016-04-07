namespace xadesjs {
    export class XmlDsigEnvelopedSignatureTransform implements Transform {

        process(node: Node): string {
            console.log("XADESJS:XmlDsigEnvelopedSignatureTransform: Process", node.nodeName);
            let signature = select(node, ".//*[local-name(.)='Signature' and namespace-uri(.)='http://www.w3.org/2000/09/xmldsig#']")[0];
            if (signature) signature.parentNode.removeChild(signature);
            return new XMLSerializer().serializeToString(node);
        };

        getAlgorithmName(): string {
            return "http://www.w3.org/2000/09/xmldsig#enveloped-signature";
        }

        public LoadInnerXml(nodeList: NodeList) {
            // documented as not changing the state of the transform
        }

    }
}