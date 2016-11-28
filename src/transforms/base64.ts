namespace xadesjs {

    // http://www.w3.org/2000/09/xmldsig#base64
    export class XmlDsigBase64Transform extends Transform {

        Algorithm = XmlSignature.AlgorithmNamespaces.XmlDsigBase64Transform;

        /**
         * Returns the output of the current XmlDsigBase64Transform object
         */
        GetOutput(): any {
            return Convert.ToBufferString(Convert.FromBase64String(this.innerXml.textContent || ""));
        }

    }
}
