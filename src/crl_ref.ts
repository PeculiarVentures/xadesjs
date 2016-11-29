import * as XmlJs from "xmljs";

import { XmlXades } from "./xml";
import { XmlXadesObject, XmlXadesCollection } from "./xml_xades";
import { DigestAlgAndValueType } from "./digest_alg_and_value_type";
import { CRLIdentifier } from "./crl_identifier";
import { ClaimedRole } from "./claimed_role";

/**
 * The CRLRefs element contains a collection of Cert elements
 */
export class CRLRefs extends XmlXadesCollection<CRLRef> {

    protected name = XmlXades.ElementNames.CRLRefs;

    // Protetced methods
    protected GetXmlObjectName() {
        return XmlXades.ElementNames.CRLRefs;
    }

    protected OnLoadChildElement(element: Element): any {
        if (element.namespaceURI === XmlXades.NamespaceURI && element.localName === XmlXades.ElementNames.CRLRef) {
            let obj = new ClaimedRole();
            obj.LoadXml(element);
            return obj;
        }
    }
}

/**
 * This class contains information about a Certificate Revocation List (CRL)
 */
export class CRLRef extends XmlXadesObject {

    protected name = XmlXades.ElementNames.CRLRef;

    // Private variables
    private digestAlgAndValue: DigestAlgAndValueType;


    // Public properties
    /**
     * The digest of the entire DER encoded
     */
    public get CertDigest(): DigestAlgAndValueType {
        return this.digestAlgAndValue;
    }
    public set CertDigest(value: DigestAlgAndValueType) {
        this.digestAlgAndValue = value;
    }

    /**
     * CRLIdentifier is a set of data including the issuer, the time when
     * the CRL was issued and optionally the number of the CRL.
     * The Identifier element can be dropped if the CRL could be inferred
     * from other information.
     */
    public CRLIdentifier: CRLIdentifier | null;


    // Constructors
    /**
     * Default constructor
     */
    public constructor() {
        super();
        this.digestAlgAndValue = new DigestAlgAndValueType("DigestAlgAndValue");
        this.CRLIdentifier = new CRLIdentifier();
    }

    // Protected methods

    protected GetXmlObjectName() {
        return XmlXades.ElementNames.CRLRef;
    }

    // Public methods
    /**
     * Check to see if something has changed in this instance and needs to be serialized
     * @returns Flag indicating if a member needs serialization
     */
    public HasChanged(): boolean {
        let retVal = false;

        if (this.digestAlgAndValue && this.digestAlgAndValue.HasChanged()) {
            retVal = true;
        }

        if (this.CRLIdentifier && this.CRLIdentifier.HasChanged()) {
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

        let xmlDigestAlgAndValue = this.GetElement(XmlXades.ElementNames.DigestAlgAndValue, true);
        this.digestAlgAndValue = new DigestAlgAndValueType(XmlXades.ElementNames.DigestAlgAndValue);
        this.digestAlgAndValue.LoadXml(xmlDigestAlgAndValue);

        let xmlCRLIdentifier = this.GetElement(XmlXades.ElementNames.CRLIdentifier, false);
        if (!xmlCRLIdentifier) {
            this.CRLIdentifier = null;
        }
        else {
            this.CRLIdentifier = new CRLIdentifier();
            this.CRLIdentifier.LoadXml(xmlCRLIdentifier);
        }
    }

    /**
     * Returns the XML representation of the this object
     * @returns XML element containing the state of this object
     */
    public GetXml(): Element {
        let document = this.CreateDocument();
        let element = this.CreateElement(document);

        if (this.digestAlgAndValue && this.digestAlgAndValue.HasChanged()) {
            element.appendChild(document.importNode(this.digestAlgAndValue.GetXml(), true));
        }
        else {
            throw new XmlJs.XmlError(XmlJs.XE.CRYPTOGRAPHIC, "DigestAlgAndValue element missing in CRLRef");
        }

        if (this.CRLIdentifier && this.CRLIdentifier.HasChanged()) {
            element.appendChild(document.importNode(this.CRLIdentifier.GetXml(), true));
        }

        return element;
    }

}
