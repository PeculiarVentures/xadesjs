import * as XmlJs from "xmljs";

import { XmlXades } from "./xml";
import { XmlXadesObject } from "./xml_xades";
import { ObjectIdentifier } from "./object_identifier";
import { ObjectReferenceCollection, ObjectReference } from "./object_reference";
import { CommitmentTypeQualifiers } from "./commitment_type_qualifier";

export class CommitmentTypeIndicationCollection extends XmlJs.Collection<CommitmentTypeIndication> { }

/**
 * <xsd:element name="CommitmentTypeIndication" type="CommitmentTypeIndicationType"/>
 * <xsd:complexType name="CommitmentTypeIndicationType">
 *   <xsd:sequence>
 *     <xsd:element name="CommitmentTypeId" type="ObjectIdentifierType"/>
 *     <xsd:choice>
 *       <xsd:element name="ObjectReference" type="xsd:anyURI" minOccurs="0" maxOccurs="unbounded"/>
 *       <xsd:element name="AllSignedDataObjects"/>
 *     </xsd:choice>
 *     <xsd:element name="CommitmentTypeQualifiers" type="CommitmentTypeQualifiersListType" minOccurs="0"/>
 *   </xsd:sequence>
 * </xsd:complexType>
 */

/**
 * The commitment type can be indicated in the electronic signature
 * by either explicitly using a commitment type indication in the
 * electronic signature or implicitly or explicitly from the semantics
 * of the signed data object.
 * If the indicated commitment type is explicit by means of a commitment
 * type indication in the electronic signature, acceptance of a verified
 * signature implies acceptance of the semantics of that commitment type.
 * The semantics of explicit commitment types indications shall be
 * specified either as part of the signature policy or may be registered
 * for	generic use across multiple policies.
 */
export class CommitmentTypeIndication extends XmlXadesObject {

    protected name = XmlXades.ElementNames.CommitmentTypeIndication;

    // Private variables
    private objectReferenceCollection: ObjectReferenceCollection;
    private allSignedDataObjects: boolean;


    // Public properties
    /**
     * The CommitmentTypeId element univocally identifies the type of commitment made by the signer.
     * A number of commitments have been already identified and assigned corresponding OIDs.
     */
    public CommitmentTypeId: ObjectIdentifier;

    /**
     * Collection of object references
     */
    public get ObjectReferenceCollection(): ObjectReferenceCollection {
        return this.objectReferenceCollection;
    }
    public set ObjectReferenceCollection(value: ObjectReferenceCollection) {
        this.objectReferenceCollection = value;
        if (this.objectReferenceCollection) {
            if (this.objectReferenceCollection.Count > 0) {
                this.allSignedDataObjects = false;
            }
        }
    }

    /**
     * If all the signed data objects share the same commitment, the
     * AllSignedDataObjects empty element MUST be present.
     */
    public get AllSignedDataObjects(): boolean {
        return this.allSignedDataObjects;
    }
    public set AllSignedDataObjects(value: boolean) {
        this.allSignedDataObjects = value;
        if (this.allSignedDataObjects) {
            this.objectReferenceCollection.Clear();
        }
    }

    /**
     * The CommitmentTypeQualifiers element provides means to include additional
     * qualifying information on the commitment made by the signer.
     */
    public CommitmentTypeQualifiers: CommitmentTypeQualifiers;


    // Constructors
    public constructor() {
        super();
        this.CommitmentTypeId = new ObjectIdentifier(XmlXades.ElementNames.CommitmentTypeId);
        this.objectReferenceCollection = new ObjectReferenceCollection();
        this.allSignedDataObjects = true;
        this.CommitmentTypeQualifiers = new CommitmentTypeQualifiers();
    }

    // Public methods
    /**
     * Check to see if something has changed in this instance and needs to be serialized
     * @returns Flag indicating if a member needs serialization
     */
    public HasChanged(): boolean {
        let retVal = false;

        if (this.CommitmentTypeId && this.CommitmentTypeId.HasChanged()) {
            retVal = true;
        }

        if (this.ObjectReferenceCollection.Count > 0) {
            retVal = true;
        }

        if (this.CommitmentTypeQualifiers && this.CommitmentTypeQualifiers.HasChanged()) {
            retVal = true;
        }

        return retVal;
    }

    /**
     * Load state from an XML element
     * @param {Element} element XML element containing new state
     */
    public LoadXml(element: Element): void {
        super.LoadXml(element);

        let xmlCommitmentTypeId = this.GetElement(XmlXades.ElementNames.CommitmentTypeId, true);
        this.CommitmentTypeId = new ObjectIdentifier(XmlXades.ElementNames.CommitmentTypeId);
        this.CommitmentTypeId.LoadXml(xmlCommitmentTypeId);

        let xmlNodeList = this.GetChildren(XmlXades.ElementNames.ObjectReference);
        if (xmlNodeList.length) {
            this.objectReferenceCollection.Clear();
            this.allSignedDataObjects = false;
            try {
                for (let item of xmlNodeList) {
                    let newObjectReference = new ObjectReference();
                    newObjectReference.LoadXml(item);
                    this.objectReferenceCollection.Add(newObjectReference);
                }
            }
            finally {
            }

        }
        else {
            this.objectReferenceCollection.Clear();
            this.allSignedDataObjects = true;
        }

        let xmlCommitmentTypeQualifiers = this.GetElement(XmlXades.ElementNames.CommitmentTypeQualifiers, false);
        if (xmlCommitmentTypeQualifiers) {
            this.CommitmentTypeQualifiers = new CommitmentTypeQualifiers();
            this.CommitmentTypeQualifiers.LoadXml(xmlCommitmentTypeQualifiers);
        }
    }

    /**
     * Returns the XML representation of the this object
     * @returns XML element containing the state of this object
     */
    public GetXml(): Element {
        let document = this.CreateDocument();
        let element = this.CreateElement(document);

        if (this.CommitmentTypeId && this.CommitmentTypeId.HasChanged()) {
            element.appendChild(document.importNode(this.CommitmentTypeId.GetXml(), true));
        }
        else {
            throw new XmlJs.XmlError(XmlJs.XE.CRYPTOGRAPHIC, "CommitmentTypeId element missing");
        }

        if (this.allSignedDataObjects) { // Add emty element as required
            let xmlAllSignedDataObjects = document.createElementNS(XmlXades.NamespaceURI, this.GetPrefix() + XmlXades.ElementNames.AllSignedDataObjects);
            element.appendChild(xmlAllSignedDataObjects);
        }
        else {
            if (this.objectReferenceCollection.Count > 0) {
                let items = this.objectReferenceCollection.GetIterator();
                for (let objectReference of items) {
                    if (objectReference.HasChanged()) {
                        element.appendChild(document.importNode(objectReference.GetXml(), true));
                    }
                }
            }
        }

        if (this.CommitmentTypeQualifiers && this.CommitmentTypeQualifiers.HasChanged()) {
            element.appendChild(document.importNode(this.CommitmentTypeQualifiers.GetXml(), true));
        }

        return element;
    }

}
