namespace xadesjs {

    /**
     * Represents the exclusive C14N XML canonicalization transform for a digital signature 
     * as defined by the World Wide Web Consortium (W3C), without comments.
     */
    export class XmlDsigExcC14NTransform extends Transform {

        protected xmlCanonicalizer = new XmlCanonicalizer(false, true, []);

        Algorithm = "http://www.w3.org/2001/10/xml-exc-c14n#";

        /**
         * Gets or sets a string that contains namespace prefixes to canonicalize 
         * using the standard canonicalization algorithm.
         */
        get InclusiveNamespacesPrefixList(): string {
            return this.xmlCanonicalizer.InclusiveNamespacesPrefixList;
        }
        set InclusiveNamespacesPrefixList(value: string) {
            this.xmlCanonicalizer.InclusiveNamespacesPrefixList = value;
        }

        /**
         * Returns the output of the current XmlDsigExcC14NTransform object
         */
        GetOutput(): string {
            return this.xmlCanonicalizer.Canonicalize(this.innerXml);
        }

    };

    /**
     * Represents the exclusive C14N XML canonicalization transform for a digital signature 
     * as defined by the World Wide Web Consortium (W3C), with comments.
     */
    export class XmlDsigExcC14NWithCommentsTransform extends XmlDsigExcC14NTransform {
        Algorithm = "http://www.w3.org/2001/10/xml-exc-c14n#WithComments";
        protected xmlCanonicalizer = new XmlCanonicalizer(true, true, []);
    }
}