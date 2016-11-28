namespace xadesjs.pki.extension {

    export class CrlDistributionPoints extends ASN1Object {

        Item(index: number): CrlDistributionPoint {
            let item = this.simpl.distributionPoints[index];
            if (item) {
                let point = new CrlDistributionPoint();
                (point as any).simpl = item;
                return point;
            }
            return null;
        }

        get Count(): number {
            return this.simpl.distributionPoints.length;
        }

        Decode(raw: Uint8Array): void {
            this.raw = raw;
            let asn1 = org.pkijs.fromBER(raw.buffer);
            this.simpl = new org.pkijs.simpl.x509.CRLDistributionPoints({ schema: asn1.result });
        }

    }

    export enum CrlReason {
        Unused = 0,
        KeyCompromise = 1,
        CACompromise = 2,
        AffiliationChanged = 3,
        Superseded = 4,
        CessationOfOperation = 5,
        CertificateHold = 6,
        PrivilegeWithdrawn = 7,
        AACompromise = 8
    }

    export class CrlDistributionPoint extends ASN1Object {
        get Location(): string {
            let dp = this.simpl.distributionPoint;
            if (dp)
                return dp[0].Name;
            return null;
        }
        Reasons: CrlReason = CrlReason.Unused;
        Issuer: string = null;
    }

}