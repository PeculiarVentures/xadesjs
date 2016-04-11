namespace xadesjs {
    export class XmlDsigEnvelopedSignatureTransform extends AbstractTransform {

        process(node: Node): string {
            if (node.nodeType === XmlNodeType.Document)
                node = (node as Document).documentElement;
            console.log("XADESJS:XmlDsigEnvelopedSignatureTransform: Process", node.nodeName);
            let signature = select(node, ".//*[local-name(.)='Signature' and namespace-uri(.)='http://www.w3.org/2000/09/xmldsig#']")[0];
            if (signature) signature.parentNode.removeChild(signature);
            return node as any;
        };

        getAlgorithmName(): string {
            return "http://www.w3.org/2000/09/xmldsig#enveloped-signature";
        }

    }
}