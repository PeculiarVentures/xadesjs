namespace xadesjs.pki.extension {

    export type AccessLocation = string;

    const INFO_ACCESS_ISSUER_CA = "1.3.6.1.5.5.7.48.2";
    const INFO_ACCESS_OCSP = "1.3.6.1.5.5.7.48.1";

    export class InfoAccess extends ASN1Object {
        OCSP = new Collection<AccessLocation>();
        IssuerCA = new Collection<AccessLocation>();

        constructor(raw?: Uint8Array) {
            super(raw);
        }

        Decode(raw: Uint8Array) {
            if (raw instanceof Uint8Array) {
                this.raw = raw;
                let asn1 = org.pkijs.fromBER(raw.buffer);
                this.simpl = new org.pkijs.simpl.x509.InfoAccess({ schema: asn1.result });
            }
            else {
                // from simpl
                this.raw = null;
                this.simpl = raw;
            }

            for (let item of this.simpl.accessDescriptions) {
                switch (item.accessMethod) {
                    case INFO_ACCESS_OCSP:
                        this.OCSP.Add(item.accessLocation.Name);
                        break;
                    case INFO_ACCESS_ISSUER_CA:
                        this.IssuerCA.Add(item.accessLocation.Name);
                        break;
                    default:
                        throw new PKIError(`Extension:InformationAccess: Uknown AccessMethod in use ${item.accessMethod}`);
                }
            }
        }
    }

}