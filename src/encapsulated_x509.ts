import * as XmlJs from "xmljs";

import { XmlXades } from "./xml";
import { EncapsulatedPKIData } from "./encapsulated_pki_data";

export class EncapsulatedX509CertificateCollection extends XmlJs.Collection<EncapsulatedX509Certificate> { }

/**
 * The EncapsulatedX509Certificate element is able to contain the
 * base64 encoding of a DER-encoded X.509 certificate
 */
export class EncapsulatedX509Certificate extends EncapsulatedPKIData {
    /**
     * Constructors
     */
    public constructor();
    public constructor(raw: Uint8Array);
    public constructor(pki: pki.X509Certificate);
    public constructor(param1?: Uint8Array | pki.X509Certificate) {
        super(XmlXades.ElementNames.EncapsulatedX509Certificate);
        if (param1) {
            let x509: pki.X509Certificate;
            if (param1 instanceof Uint8Array)
                x509 = new pki.X509Certificate(param1);
            else
                x509 = param1;
            this.LoadPki(x509);
        }
    }

    /**
     * Returns the PKI representation of the encapsulated PKI data object
     * @returns PKI object
     */
    public GetPki(): pki.X509Certificate {
        return new pki.X509Certificate(this.PkiData);
    }

    /**
     * Load PkiData from an PKI object
     * @param {X509Certificate} pki PKI object
     */
    public LoadPki(pki: pki.X509Certificate): void {
        super.LoadPki(pki);
    }
}
}
