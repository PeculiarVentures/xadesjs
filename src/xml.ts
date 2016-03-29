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
}