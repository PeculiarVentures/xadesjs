namespace xadesjs {

    /**
     * Represents the enveloped signature transform for an XML digital signature as defined by the W3C.
     */
    export class XmlDsigEnvelopedSignatureTransform extends Transform {

        Algorithm = "http://www.w3.org/2000/09/xmldsig#enveloped-signature";

        /**
         * Returns the output of the current XmlDsigEnvelopedSignatureTransform object.
         * @returns string
         */
        GetOutput(): Node {
            let signature = select(this.innerXml, ".//*[local-name(.)='Signature' and namespace-uri(.)='http://www.w3.org/2000/09/xmldsig#']")[0];
            if (signature) signature.parentNode.removeChild(signature);
            return this.innerXml;
        }

    }
}