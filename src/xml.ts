namespace xadesjs {

    export const APPLICATION_XML = "application/xml";

    export enum XmlNodeType {
        None = 0,                   // Read method has not been
        Element = 1,
        Attribute = 2,
        Text = 3,                   // The text content of a node.
        CDATA = 4,                  // For example, <![CDATA[my escaped text]]>
        EntityReference = 5,        // A reference to an entity 
        Entity = 6,                 // For example, <!ENTITY...>
        ProcessingInstruction = 7,   // For example, <?pi test?>
        Comment = 8,
        Document = 9,               // A document object that, as the root of the document tree,
        // provides access to the entire XML document.        
        DocumentType = 10,          // For example, <!DOCTYPE...>
        DocumentFragment = 11,
        Notation = 12,              // A For example, <!NOTATION...>        
        Whitespace = 13,            // White space between markup.        
        SignificantWhitespace = 14, // White space between markup in a mixed content model 
        // or white space within the xml:space="preserve" scope.
        EndElement = 15,            // An end element tag (for example, </item> ).
        EndEntity = 16,             // Returned when XmlReader gets to the end of the entity 
        // replacement as a result of a call to XmlReader.ResolveEntity()
        XmlDeclaration = 17,        // for example, <?xml version='1.0'?>
    }

    export class XmlSignature {

        static DEFAULT_CANON_METHOD = "http://www.w3.org/TR/2001/REC-xml-c14n-20010315";

        static DefaultPrefix = "ds";

        static ElementNames = {
            CanonicalizationMethod: "CanonicalizationMethod",
            DigestMethod: "DigestMethod",
            DigestValue: "DigestValue",
            DSAKeyValue: "DSAKeyValue",
            EncryptedKey: "EncryptedKey",
            HMACOutputLength: "HMACOutputLength",
            RSAPSSParams: "RSAPSSParams",
            MaskGenerationFunction: "MaskGenerationFunction",
            SaltLength: "SaltLength",
            KeyInfo: "KeyInfo",
            KeyName: "KeyName",
            KeyValue: "KeyValue",
            Modulus: "Modulus",
            Exponent: "Exponent",
            Manifest: "Manifest",
            Object: "Object",
            Reference: "Reference",
            RetrievalMethod: "RetrievalMethod",
            RSAKeyValue: "RSAKeyValue",
            ECKeyValue: "ECKeyValue",
            NamedCurve: "NamedCurve",
            PublicKey: "PublicKey",
            Signature: "Signature",
            SignatureMethod: "SignatureMethod",
            SignatureValue: "SignatureValue",
            SignedInfo: "SignedInfo",
            Transform: "Transform",
            Transforms: "Transforms",
            X509Data: "X509Data",
            X509IssuerSerial: "X509IssuerSerial",
            X509IssuerName: "X509IssuerName",
            X509SerialNumber: "X509SerialNumber",
            X509SKI: "X509SKI",
            X509SubjectName: "X509SubjectName",
            X509Certificate: "X509Certificate",
            X509CRL: "X509CRL"
        };

        static AttributeNames = {

            Algorithm: "Algorithm",
            Encoding: "Encoding",
            Id: "Id",
            MimeType: "MimeType",
            Type: "Type",
            URI: "URI",
        };

        static AlgorithmNamespaces = {
            XmlDsigBase64Transform: "http://www.w3.org/2000/09/xmldsig#base64",
            XmlDsigC14NTransform: "http://www.w3.org/TR/2001/REC-xml-c14n-20010315",
            XmlDsigC14NWithCommentsTransform: "http://www.w3.org/TR/2001/REC-xml-c14n-20010315#WithComments",
            XmlDsigEnvelopedSignatureTransform: "http://www.w3.org/2000/09/xmldsig#enveloped-signature",
            XmlDsigXPathTransform: "http://www.w3.org/TR/1999/REC-xpath-19991116",
            XmlDsigXsltTransform: "http://www.w3.org/TR/1999/REC-xslt-19991116",
            XmlDsigExcC14NTransform: "http://www.w3.org/2001/10/xml-exc-c14n#",
            XmlDsigExcC14NWithCommentsTransform: "http://www.w3.org/2001/10/xml-exc-c14n#WithComments",
            XmlDecryptionTransform: "http://www.w3.org/2002/07/decrypt#XML",
            XmlLicenseTransform: "urn:mpeg:mpeg21:2003:01-REL-R-NS:licenseTransform"
        };

        static Uri = {
            Manifest: "http://www.w3.org/2000/09/xmldsig#Manifest"
        };

        static NamespaceURI: "http://www.w3.org/2000/09/xmldsig#";
        static NamespaceURIMore: "http://www.w3.org/2007/05/xmldsig-more#";
        static NamespaceURIPss: "http://www.example.org/xmldsig-pss/#";
        static Prefix: "ds";

        static GetChildElement(xel: Node, element: string, ns: string) {
            for (let i = 0; i < xel.childNodes.length; i++) {
                let n = xel.childNodes[i];
                if (n.nodeType === XmlNodeType.Element && n.localName === element && n.namespaceURI === ns)
                    return n as Element;
            }
            return null;
        }

        static GetAttributeFromElement(xel: Element, attribute: string, element: string) {
            let el = this.GetChildElement(xel, element, this.NamespaceURI);
            return el != null ? el.getAttribute(attribute) : null;
        }

        static GetChildElements(xel: Element, element: string): Element[] {
            let al: Element[] = [];
            for (let i = 0; i < xel.childNodes.length; i++) {
                let n = xel.childNodes[i];
                if (n.nodeType === XmlNodeType.Element && n.localName === element && n.namespaceURI === this.NamespaceURI)
                    al.push(n as Element);
            }
            return al;
        }
    };

    export interface IXmlSerializable {

        Prefix: string;
        /**
         * Writes object to XML node
         * @returns Node
         */
        GetXml(): Node;
        /**
         * Reads XML from string
         * @param  {Node} node
         * @returns void
         */
        LoadXml(node: Node): void;
    }

    export abstract class XmlObject implements IXmlSerializable {

        protected m_prefix = XmlSignature.DefaultPrefix;

        get Prefix(): string {
            return this.m_prefix;
        }
        set Prefix(value: string) {
            this.m_prefix = value;
        }

        protected GetPrefix(): string {
            return (this.Prefix) ? this.m_prefix + ":" : "";
        }

        abstract GetXml(): Node;
        abstract GetXml(document: Document): Node;

        abstract LoadXml(node: Node): void;

        toString(): string {
            let xml = this.GetXml();
            return new XMLSerializer().serializeToString(xml);
        }

        protected getAttribute(xel: Element, attribute: string) {
            if (xel.hasAttribute(attribute))
                return xel.getAttribute(attribute);
            return null;
        }

        protected GetElementById(document: Document, idValue: string): Element | null;
        protected GetElementById(element: Element, idValue: string): Element | null;
        protected GetElementById(node: Node, idValue: string) {
            if ((node == null) || (idValue == null))
                return null;

            // this works only if there's a DTD or XSD available to define the ID
            let xel: Node | null = null;
            if (node.nodeType === XmlNodeType.Document)
                xel = (node as Document).getElementById(idValue);
            if (xel == null) {
                // search an "undefined" ID
                xel = SelectSingleNode(node, `//*[@Id='${idValue}']`);
                if (xel == null) {
                    xel = SelectSingleNode(node, `//*[@ID='${idValue}']`);
                    if (xel == null) {
                        xel = SelectSingleNode(node, `//*[@id='${idValue}']`);
                    }
                }
            }
            return xel as Element;
        }

    }
}