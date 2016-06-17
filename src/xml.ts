namespace xadesjs {
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

        GetXml(): Node;
        GetXml(document: Document): Node;
        GetXml(document: Document = null): Node {
            throw new XmlError(XE.METHOD_NOT_IMPLEMENTED);
        }

        LoadXml(node: Node): void {
            throw new XmlError(XE.METHOD_NOT_IMPLEMENTED);
        }

        toString(): string {
            let xml = this.GetXml();
            return new XMLSerializer().serializeToString(xml);
        }

        protected getAttribute(xel: Element, attribute: string): string {
            if (xel.hasAttribute(attribute))
                return xel.getAttribute(attribute);
            return null;
        }

        protected GetElementById(document: Document, idValue: string): Element {
            if ((document == null) || (idValue == null))
                return null;

            // this works only if there's a DTD or XSD available to define the ID
            let xel: Node = document.getElementById(idValue);
            if (xel == null) {
                // search an "undefined" ID
                xel = SelectSingleNode(document, `//*[@Id='${idValue}']`);
                if (xel == null) {
                    xel = SelectSingleNode(document, `//*[@ID='${idValue}']`);
                    if (xel == null) {
                        xel = SelectSingleNode(document, `//*[@id='${idValue}']`);
                    }
                }
            }
            return xel as Element;
        }

    }
}