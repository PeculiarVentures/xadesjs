namespace xadesjs {
    export class XmlDsigC14NTransform extends Transform {

        protected xmlCanonicalizer = new XmlCanonicalizer(false, false, []);

        Algorithm = "http://www.w3.org/TR/2001/REC-xml-c14n-20010315";

        GetOutput(): string {
            return this.xmlCanonicalizer.Canonicalize(this.innerXml);
        }

    };

    export class XmlDsigC14NWithCommentsTransform extends XmlDsigC14NTransform {
        Algorithm = "http://www.w3.org/TR/2001/REC-xml-c14n-20010315 #WithComments";
        protected xmlCanonicalizer = new XmlCanonicalizer(true, true, []);
    }
}