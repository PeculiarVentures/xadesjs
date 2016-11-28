namespace xadesjs.pro {

    /**
	 * The OCSPValues element contains a collection of Cert elements
	 */
    export class OCSPValues extends XmlXadesCollection<OCSPValue> {
        // Protetced methods
        protected GetXmlObjectName() {
            return XmlXades.ElementNames.OCSPValues;
        }

        protected OnLoadChildElement(element: Element): any {
            if (element.namespaceURI === XmlXades.NamespaceURI && element.localName === XmlXades.ElementNames.EncapsulatedOCSPValue) {
                let obj = new OCSPValue();
                obj.LoadXml(element);
                return obj;
            }
        }
    }

	/**
	 * This class consist of a sequence of at least one OCSP Response. The
	 * EncapsulatedOCSPValue element contains the base64 encoding of a
	 * DER-encoded OCSP Response
	 */
    export class OCSPValue extends EncapsulatedPKIData {
        // Constructors
        public constructor();
        public constructor(raw: Uint8Array);
        public constructor(pki: pki.ocsp.OCSPResponse);
        public constructor(param1?: Uint8Array | pki.ocsp.OCSPResponse) {
            super(XmlXades.ElementNames.EncapsulatedOCSPValue);
            if (param1) {
                let ocsp: pki.ocsp.OCSPResponse;
                if (param1 instanceof Uint8Array)
                    ocsp = new pki.ocsp.OCSPResponse(param1);
                else
                    ocsp = param1;
                this.LoadPki(ocsp);
            }
        }

        /**
		 * Returns the PKI representation of the encapsulated PKI data object
         * @returns PKI object
		 */
        public GetPki(): pki.ocsp.OCSPResponse {
            return new pki.ocsp.OCSPResponse(this.PkiData);
        }

        /**
		 * Load PkiData from an PKI object
         * @param {CRL} pki PKI object
		 */
        public LoadPki(pki: pki.ocsp.OCSPResponse): void {
            super.LoadPki(pki);
        }
    }
}
