namespace xadesjs {
    export class XmlDsigExcC14NTransform extends Transform {

        protected xmlCanonicalizer = new XmlCanonicalizer(false, true, []);

        Algorithm = "http://www.w3.org/2001/10/xml-exc-c14n#";

        get InclusiveNamespacesPrefixList(): string {
            return this.xmlCanonicalizer.InclusiveNamespacesPrefixList;
        }
        set InclusiveNamespacesPrefixList(value: string) {
            this.xmlCanonicalizer.InclusiveNamespacesPrefixList = value;
        }

        GetOutput(): string {
            return this.xmlCanonicalizer.Canonicalize(this.innerXml)
        }

    };

    export class XmlDsigExcC14NWithCommentsTransform extends XmlDsigExcC14NTransform {
        Algorithm = "http://www.w3.org/2001/10/xml-exc-c14n#WithComments";
        protected xmlCanonicalizer = new XmlCanonicalizer(true, true, []);
    }
}