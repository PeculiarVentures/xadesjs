import * as XmlJs from "xmljs";
import * as XmlDSigJs from "xmldsigjs";

import { XmlXades } from "./xml";
import { XmlXadesObject } from "./xml_xades";

/**
 * This class indicates the algortithm used to calculate the digest and
 * the digest value itself
 */
export class DigestAlgAndValueType extends XmlXadesObject {

    protected name = XmlXades.ElementNames.DigestAlgAndValue;

    // Private variables
    private tagName: string;
    private digestMethod: string;
    private digestValue: Uint8Array | null;


    // Public properties

    /**
     * The name of the element when serializing
     */
    public get TagName(): string {
        return this.tagName;
    }
    public set TagName(value: string) {
        this.tagName = value;
    }

    /**
     * Indicates the digest algorithm
     */
    public get DigestMethod(): string {
        return this.digestMethod;
    }
    public set DigestMethod(value: string) {
        this.digestMethod = value;
    }

    /**
     * Contains the value of the digest
     */
    public get DigestValue(): Uint8Array | null {
        return this.digestValue;
    }
    public set DigestValue(value: Uint8Array | null) {
        this.digestValue = value;
    }

    public constructor(tagName?: string) {
        super();
        this.digestMethod = XmlDSigJs.SHA1_NAMESPACE;
        this.digestValue = null;
        if (tagName !== void 0)
            this.tagName = tagName;
    }

    // Protected methods

    protected GetXmlObjectName() {
        return this.tagName;
    }

    // Public methods

    /**
     * Check to see if something has changed in this instance and needs to be serialized
     * @returns Flag indicating if a member needs serialization
     */
    public HasChanged(): boolean {
        let retVal = false;

        if (this.digestValue && this.digestValue.length > 0) {
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

        let xmlNodeList = element.getElementsByTagNameNS(XmlDSigJs.XmlSignature.NamespaceURI, XmlDSigJs.XmlSignature.ElementNames.DigestMethod);
        if (xmlNodeList.length === 0) {
            throw new XmlJs.XmlError(XmlJs.XE.CRYPTOGRAPHIC, "DigestMethod missing in " + this.tagName);
        }
        let xmlDigestMethod = xmlNodeList.item(0) as Element;
        if (xmlDigestMethod.hasAttribute(XmlDSigJs.XmlSignature.AttributeNames.Algorithm))
            this.digestMethod = xmlDigestMethod.getAttribute(XmlDSigJs.XmlSignature.AttributeNames.Algorithm) !;
        else
            throw new XmlJs.XmlError(XmlJs.XE.CRYPTOGRAPHIC, "Algorithm missing in DigestMethod");

        xmlNodeList = element.getElementsByTagNameNS(XmlDSigJs.XmlSignature.NamespaceURI, XmlDSigJs.XmlSignature.ElementNames.DigestValue);
        if (xmlNodeList.length === 0) {
            throw new XmlJs.XmlError(XmlJs.XE.CRYPTOGRAPHIC, "DigestValue missing in " + this.tagName);
        }
        this.digestValue = XmlJs.Convert.FromBase64(xmlNodeList.item(0).textContent!);
    }

    /**
     * Returns the XML representation of the this object
     * @returns XML element containing the state of this object
     */
    public GetXml(): Element {
        let document = this.CreateDocument();
        let element = this.CreateElement(document);

        let sigPrefix = "ds:";

        if (this.digestMethod) {
            let xmlDigestMethod = document.createElementNS(XmlDSigJs.XmlSignature.NamespaceURI, sigPrefix + XmlDSigJs.XmlSignature.ElementNames.DigestMethod);
            xmlDigestMethod.setAttribute(XmlDSigJs.XmlSignature.AttributeNames.Algorithm, this.DigestMethod);
            element.appendChild(xmlDigestMethod);
        }
        else {
            throw new XmlJs.XmlError(XmlJs.XE.CRYPTOGRAPHIC, "DigestMethod element missing in " + this.tagName);
        }

        if (this.digestValue && this.digestValue.length > 0) {
            let xmlDigestValue = document.createElementNS(XmlDSigJs.XmlSignature.NamespaceURI, sigPrefix + XmlDSigJs.XmlSignature.ElementNames.DigestValue);
            xmlDigestValue.textContent = XmlJs.Convert.ToBase64(this.digestValue);
            element.appendChild(xmlDigestValue);
        }
        else {
            throw new XmlJs.XmlError(XmlJs.XE.CRYPTOGRAPHIC, "DigestValue element missing in " + this.tagName);
        }

        return element;
    }

}
