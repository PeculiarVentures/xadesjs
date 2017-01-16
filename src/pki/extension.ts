namespace xadesjs.pki {

    export class Extension extends ASN1Object {

        get Id(): ASN1ObjectIdentifier {
            return this.simpl.extnID;
        }

        get Crytical(): boolean {
            return this.simpl.critical;
        }

        get Value(): Uint8Array {
            return new Uint8Array(this.simpl.extnValue.value_block.value_hex);
        }

        Decode(raw: Uint8Array): void {
            if (raw instanceof Uint8Array) {
                this.raw = raw;
                let asn1 = org.pkijs.fromBER(raw.buffer);
                this.simpl = new org.pkijs.simpl.EXTENSION({ schema: asn1.result });
            }
            else {
                // from simpl
                this.raw = null;
                this.simpl = raw;
            }
        }
    }

}