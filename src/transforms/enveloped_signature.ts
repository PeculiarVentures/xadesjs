namespace xadesjs {
    export class XmlDsigEnvelopedSignatureTransform extends Transform {

        Algorithm = "http://www.w3.org/2000/09/xmldsig#enveloped-signature";

        GetOutput(): string {
            let signature = select(this.innerXml, ".//*[local-name(.)='Signature' and namespace-uri(.)='http://www.w3.org/2000/09/xmldsig#']")[0];
            if (signature) signature.parentNode.removeChild(signature);
            let res = new XMLSerializer().serializeToString(this.innerXml); // .replace(/\r/g, "");
            return res;
        }

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