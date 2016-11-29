import { XmlXades } from "./xml";
import { XmlXadesObject } from "./xml_xades";
import { OtherRefs } from "./other_ref";
import { OCSPRefs } from "./ocsp_ref";
import { CRLRefs } from "./crl_ref";
/**
 * This clause defines the XML element containing a full set of
 * references to the revocation data that have been used in the
 * validation of the signer and CA certificates.
 * This is an unsigned property that qualifies the signature.
 * The XML electronic signature aligned with the present document
 * MAY contain at most one CompleteRevocationRefs element.
 */
export class CompleteRevocationRefs extends XmlXadesObject {

    protected name = XmlXades.ElementNames.CompleteRevocationRefs;

    // Public properties
    /**
     * The optional Id attribute can be used to make a reference to the CompleteRevocationRefs element
     */
    public Id: string;

    /**
     * Sequences of references to CRLs
     */
    public CRLRefs: CRLRefs;

    /**
     * Sequences of references to OCSP responses
     */
    public OCSPRefs: OCSPRefs;

    /**
     * Other references to alternative forms of revocation data
     */
    public OtherRefs: OtherRefs;

    // Constructors
    /**
     * Default constructor
     */
    public constructor() {
        super();

        this.CRLRefs = new CRLRefs();
        this.OCSPRefs = new OCSPRefs();
        this.OtherRefs = new OtherRefs();
    }

    // Public methods
    /**
     * Check to see if something has changed in this instance and needs to be serialized
    * <returns>Flag indicating if a member needs serialization< /returns>
     */
    public HasChanged(): boolean {
        let retVal = false;

        if (this.Id) {
            retVal = true;
        }
        if (this.CRLRefs && this.CRLRefs.HasChanged()) {
            retVal = true;
        }
        if (this.OCSPRefs && this.OCSPRefs.HasChanged()) {
            retVal = true;
        }
        if (this.OtherRefs && this.OtherRefs.HasChanged()) {
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

        this.GetAttribute(XmlXades.AttributeNames.Id, "", false);

        let xmlCRLRefs = this.GetElement(XmlXades.ElementNames.CRLRefs, false);
        if (xmlCRLRefs) {
            this.CRLRefs = new CRLRefs();
            this.CRLRefs.LoadXml(xmlCRLRefs);
        }

        let xmlOCSPRefs = this.GetElement(XmlXades.ElementNames.OCSPRefs, false);
        if (xmlOCSPRefs) {
            this.OCSPRefs = new OCSPRefs();
            this.OCSPRefs.LoadXml(xmlOCSPRefs);
        }

        let xmlOtherRefs = this.GetElement(XmlXades.ElementNames.OtherRefs, false);
        if (xmlOtherRefs) {
            this.OtherRefs = new OtherRefs();
            this.OtherRefs.LoadXml(xmlOtherRefs);
        }
    }

    /**
     * Returns the XML representation of the this object
     * @returns XML element containing the state of this object
     */
    public GetXml(): Element {
        let document = this.CreateDocument();
        let element = this.CreateElement(document);

        if (this.Id) {
            element.setAttribute(XmlXades.AttributeNames.Id, this.Id);
        }
        if (this.CRLRefs && this.CRLRefs.HasChanged()) {
            element.appendChild(document.importNode(this.CRLRefs.GetXml(), true));
        }
        if (this.OCSPRefs && this.OCSPRefs.HasChanged()) {
            element.appendChild(document.importNode(this.OCSPRefs.GetXml(), true));
        }
        if (this.OtherRefs && this.OtherRefs.HasChanged()) {
            element.appendChild(document.importNode(this.OtherRefs.GetXml(), true));
        }

        return element;
    }

}
