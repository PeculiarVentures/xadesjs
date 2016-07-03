namespace xadesjs {

    /**
     * Represents the C14N XML canonicalization transform for a digital signature 
     * as defined by the World Wide Web Consortium (W3C), without comments.
     */
    export class XmlDsigC14NTransform extends Transform {

        protected xmlCanonicalizer = new XmlCanonicalizer(false, false);

        Algorithm = "http://www.w3.org/TR/2001/REC-xml-c14n-20010315";

        /**
         * Returns the output of the current XmlDsigC14NTransform object.
         * @returns string
         */
        GetOutput(): string {
            return this.xmlCanonicalizer.Canonicalize(this.innerXml);
        }

    };

    /**
     * Represents the C14N XML canonicalization transform for a digital signature 
     * as defined by the World Wide Web Consortium (W3C), with comments.
     */
    export class XmlDsigC14NWithCommentsTransform extends XmlDsigC14NTransform {
        Algorithm = "http://www.w3.org/TR/2001/REC-xml-c14n-20010315#WithComments";
        protected xmlCanonicalizer = new XmlCanonicalizer(true, true);
    }
}