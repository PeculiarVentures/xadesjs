import { XmlElement, XmlChildElement, XmlContent } from "xml-core";
import { IConverter } from "xml-core";

import { XmlXades } from "./xml";
import { XadesObject, XadesCollection } from "./xml_base";
import { ObjectIdentifier } from "./object_identifier";
import { Any } from "./any";

/**
 *
 * <xsd:element name="CommitmentTypeIndication" type="CommitmentTypeIndicationType"/>
 * <xsd:complexType name="CommitmentTypeIndicationType">
 *     <xsd:sequence>
 *         <xsd:element name="CommitmentTypeId" type="ObjectIdentifierType"/>
 *         <xsd:choice>
 *             <xsd:element name="ObjectReference" type="xsd:anyURI" maxOccurs="unbounded"/>
 *             <xsd:element name="AllSignedDataObjects"/>
 *         </xsd:choice>
 *         <xsd:element name="CommitmentTypeQualifiers" type="CommitmentTypeQualifiersListType" minOccurs="0"/>
 *     </xsd:sequence>
 * </xsd:complexType>
 * <xsd:complexType name="CommitmentTypeQualifiersListType">
 *     <xsd:sequence>
 *         <xsd:element name="CommitmentTypeQualifier" type="AnyType" minOccurs="0" maxOccurs="unbounded"/>
 *     </xsd:sequence>
 * </xsd:complexType>
 *
 */

@XmlElement({ localName: XmlXades.ElementNames.CommitmentTypeQualifier })
export class CommitmentTypeQualifier extends Any { }

@XmlElement({ localName: XmlXades.ElementNames.CommitmentTypeQualifiers, parser: CommitmentTypeQualifier })
export class CommitmentTypeQualifiers extends XadesCollection<CommitmentTypeQualifier> { }

@XmlElement({ localName: XmlXades.ElementNames.ObjectReference })
export class ObjectReference extends XadesObject {

    @XmlContent({ required: true })
    Value: string;
}

@XmlElement({ localName: "ObjectReferences", parser: ObjectReference })
export class ObjectReferenceCollection extends XadesCollection<ObjectReference> { }

const XmlAllSignedDataObjectsConverter: IConverter<boolean> = {
    set: (value: string) => {
        // if SignaturePolicyImplied exists then return true
        return true;
    },
    get: (value: boolean) => {
        return void 0;
    }
};

@XmlElement({ localName: XmlXades.ElementNames.CommitmentTypeIndication })
export class CommitmentTypeIndication extends XadesObject {

    @XmlChildElement({
        localName: XmlXades.ElementNames.CommitmentTypeId,
        required: true,
        namespaceURI: XmlXades.NamespaceURI,
        prefix: XmlXades.DefaultPrefix,
        parser: ObjectIdentifier,
    })
    CommitmentTypeId: ObjectIdentifier;

    @XmlChildElement({ parser: ObjectReferenceCollection, noRoot: true })
    ObjectReference: ObjectReferenceCollection;

    @XmlChildElement({
        localName: XmlXades.ElementNames.AllSignedDataObjects,
        namespaceURI: XmlXades.NamespaceURI,
        prefix: XmlXades.DefaultPrefix,
        converter: XmlAllSignedDataObjectsConverter,
        defaultValue: false,
    })
    AllSignedDataObjects: boolean;

    @XmlChildElement({ localName: XmlXades.ElementNames.CommitmentTypeQualifiers, parser: CommitmentTypeQualifier })
    CommitmentTypeQualifiers: CommitmentTypeQualifiers;

}