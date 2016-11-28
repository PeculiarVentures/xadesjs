namespace xadesjs.pki {

    export interface CERT_CHAIN_RESULT {
        result: boolean;
        result_code: number;
        result_message: string;
        auth_constr_policies: ASN1ObjectIdentifier[];
        user_constr_policies: ASN1ObjectIdentifier[];
        explicit_policy_indicator: boolean;
        policy_mappings: any[];
        chain: Collection<ChainBlock>;
    }

    export interface ChainBlock {
        Certificate: X509Certificate;
        Revocation: CRL; // TODO: Add OCSP
    }

    export class ChainBuilder {

        TrustedCertificates = new Collection<X509Certificate>();
        Certificates = new Collection<X509Certificate>();
        CRLs = new Collection<CRL>();

        Build(certificate: X509Certificate): PromiseLike<CERT_CHAIN_RESULT> {
            let that = this;
            return new Promise((resolve, reject) => {
                let chain = new Collection<ChainBlock>();
                /**
                 * Iterations for chain
                 */
                function Iteration(cert: X509Certificate): any {
                    if (cert) {
                        // creates blockchain
                        let blockchain: ChainBlock = {
                            Certificate: cert,
                            Revocation: null
                        };
                        chain.Add(blockchain);

                        if (!cert.IsSelfSigned()) {
                            // Not self-signed certificate
                            let ca: X509Certificate = null;
                            // Get issuer for certificate
                            that.GetIssuer(cert)
                                .then((_ca: X509Certificate) => {
                                    ca = _ca;
                                    // Get Revocation for certificate
                                    return that.GetRevocation(cert);
                                })
                                .then((revoc) => {
                                    // Add Revocation to blockchain
                                    blockchain.Revocation = revoc;
                                    return Promise.resolve(ca);
                                })
                                .then(Iteration);
                        }
                        else {
                            // Self-signed
                            // Prepare arrays for CERT_CHAIN verification
                            let trusted_certs: any[] = that.TrustedCertificates.GetIterator().map((item) => (item as any).simpl);
                            let certs: any[] = [];
                            let crls: any[] = [];
                            for (let item of chain.GetIterator()) {
                                certs.push((item.Certificate as any).simpl);
                                if (item.Revocation)
                                    crls.push((item.Revocation as any).simpl);
                            }
                            let CERT_CHAIN = new org.pkijs.simpl.CERT_CHAIN({
                                trusted_certs: [certs[certs.length - 1]],
                                certs: certs,
                                crls: crls
                            });

                            CERT_CHAIN.verify()
                                .then((res: CERT_CHAIN_RESULT) => {
                                    // Add chain to PKIjs result
                                    res.chain = chain;
                                    return Promise.resolve(res);
                                })
                                .then(resolve, reject);
                        }
                    }
                    else {
                        resolve(chain);
                    }
                }
                Iteration(certificate);
            });
        }

        protected GetIssuer(cert: X509Certificate): PromiseLike<X509Certificate> {
            return new Promise((resolve, reject) => {

                let ext = cert.AuthorityInfoAccess;
                if (ext) {
                    let uri = ext.IssuerCA.Item(0); // TODO: Download while
                    let ca: X509Certificate = null;
                    X509Certificate.Fetch(uri)
                        .then((_ca) => {
                            ca = _ca;
                            return (cert as any).simpl.verify({ issuerCertificate: (ca as any).simpl });
                        })
                        .then((v) => {
                            if (!v)
                                ca = null;
                            return Promise.resolve(ca);
                        })
                        .then(resolve, reject);
                }
                else {
                    resolve(null);
                }
            });
        }

        protected GetRevocation(cert: X509Certificate): PromiseLike<CRL> {
            return new Promise((resolve, reject) => {
                let ext = cert.CrlDistributionPoints;
                if (ext && ext.Count) {
                    let uri = ext.Item(0).Location; // TODO: Must be extended
                    CRL.Fetch(uri)
                        .then(resolve, reject);
                }
                else
                    resolve(null);
            });
        }

    }

}