import * as XmlJs from "xmljs";

import { XmlXades } from "./xml";
import { XmlXadesCollection } from "./xml_xades";
import { EncapsulatedPKIData } from "./encapsulated_pki_data";

/**
 * The CRLValues element contains a collection of Cert elements
 */
export class CRLValues extends XmlXadesCollection<CRLValue> {

    protected name = XmlXades.ElementNames.CRLValues;

    // Protetced methods

    protected OnLoadChildElement(element: Element): any {
        if (element.namespaceURI === XmlXades.NamespaceURI && element.localName === XmlXades.ElementNames.EncapsulatedCRLValue) {
            let obj = new CRLValue();
            obj.LoadXml(element);
            return obj;
        }
    }
}

/**
 * This class consist of a sequence of at least one Certificate Revocation
 * List. Each EncapsulatedCRLValue will contain the base64 encoding of a
 * DER-encoded X509 CRL.
 */
export class CRLValue extends EncapsulatedPKIData {
    // Constructors
    public constructor();
    public constructor(raw: Uint8Array);
    public constructor(pki: pki.CRL);
    public constructor(param1?: Uint8Array | pki.CRL) {
        super(XmlXades.ElementNames.EncapsulatedCRLValue);
        if (param1) {
            let crl: pki.CRL;
            if (param1 instanceof Uint8Array)
                crl = new pki.CRL(param1);
            else
                crl = param1;
            this.LoadPki(crl);
        }
    }

    /**
     * Returns the PKI representation of the encapsulated PKI data object
     * @returns PKI object
     */
    public GetPki(): pki.CRL {
        return new pki.CRL(this.PkiData);
    }

    /**
     * Load PkiData from an PKI object
     * @param {CRL} pki PKI object
     */
    public LoadPki(pki: pki.CRL): void {
        super.LoadPki(pki);
    }

}
