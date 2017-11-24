import * as XmlCore from "xml-core";
import * as XmlDSigJs from "xmldsigjs";

import * as XAdES from "./xml";

const XADES_REFERENCE_TYPE = "http://uri.etsi.org/01903#SignedProperties";

export interface OptionsSignerRole {
    claimed?: string[];
    certified?: string[];
}

export interface OptionsProductionPlace {
    city?: string;
    state?: string;
    code?: string;
    country?: string;
}

export interface OptionsNoticeReference {
    organization: string;
    noticeNumbers: number[];
}

export interface OptionsPolicyUserNotice {
    noticeRef?: OptionsNoticeReference;
    explicitText?: string;
}

export interface OptionsPolicyIdentifier {
    qualifier: XAdES.IdentifierQualifier;
    value: string;
    description?: string;
    references?: string[];
}

export interface OptionsPolicyId {
    identifier: OptionsPolicyIdentifier;
    transforms?: XmlDSigJs.OptionsSignTransform[];
    hash: AlgorithmIdentifier;
    qualifiers?: Array<OptionsPolicyUserNotice | string>;
}

export interface OptionsXAdES extends XmlDSigJs.OptionsSign {

    /**
     * Sets a certificate of signer for signature. Optional
     *
     * @type {string} base64 string of X509 certificate
     * @memberOf OptionsXAdES
     */
    signingCertificate?: string;

    policy?: OptionsPolicyId | boolean;
    productionPlace?: OptionsProductionPlace;
    signerRole?: OptionsSignerRole;
}

export class SignedXml extends XmlDSigJs.SignedXml {

    protected properties: XAdES.QualifyingProperties | null = null;

    get Properties(): XAdES.QualifyingProperties | null {
        return this.properties;
    }

    get SignedProperties(): XAdES.SignedProperties {
        if (!this.Properties) {
            throw new XmlCore.XmlError(XmlCore.XE.XML_EXCEPTION, "Properties is empty");
        }
        return this.Properties.SignedProperties;
    }
    get UnsignedProperties(): XAdES.UnsignedProperties {
        if (!this.Properties) {
            throw new XmlCore.XmlError(XmlCore.XE.XML_EXCEPTION, "Properties is empty");
        }
        return this.Properties.UnsignedProperties;
    }

    constructor(node?: Document | Element) {
        super(node);

        this.CreateQualifyingProperties();
    }

    //#region Public methods

    public LoadXml(value: Element | string, useContainer?: boolean) {
        super.LoadXml(value as string);

        let properties: XAdES.QualifyingProperties | null = null;
        this.XmlSignature.ObjectList.Some((item) => {
            if (item.Element) {
                // Looking for <QualifyingProperties>
                for (let i = 0; i < item.Element.childNodes.length; i++) {
                    const node = item.Element.childNodes.item(i);
                    if (node.nodeType === XmlCore.XmlNodeType.Element && node.localName === XAdES.XmlXades.ElementNames.QualifyingProperties) {
                        properties = XAdES.QualifyingProperties.LoadXml(node as Element);
                        return true;
                    }
                }
            }
            return false;
        });

        this.properties = properties;
    }

    public Sign(algorithm: Algorithm, key: CryptoKey, data: Document, options?: OptionsXAdES): PromiseLike<XmlDSigJs.Signature> {
        return super.Sign.apply(this, arguments);
    }

    //#endregion

    //#region Protected methods

    protected CreateQualifyingProperties() {
        if (this.Properties) {
            throw new XmlCore.XmlError(XmlCore.XE.XML_EXCEPTION, "Cannot create QualifyingProperties cause current signature has got one. You must create CounterSignature");
        }

        const rnd = XmlDSigJs.Application.crypto.getRandomValues(new Uint8Array(6)) as Uint8Array;
        const id = XmlCore.Convert.ToHex(rnd);

        this.XmlSignature.Id = `id-${id}`;
        const dataObject = new XAdES.DataObject();
        dataObject.QualifyingProperties.Target = `#${this.XmlSignature.Id}`;
        dataObject.QualifyingProperties.SignedProperties.Id = `xades-${this.XmlSignature.Id}`;

        this.properties = dataObject.QualifyingProperties;
        this.XmlSignature.ObjectList.Add(dataObject);
    }

    protected async ApplySignOptions(signature: XmlDSigJs.Signature, algorithm: Algorithm, key: CryptoKey, options: OptionsXAdES) {
        await super.ApplySignOptions(signature, algorithm, key, options);
        if (this.Properties) {
            // Add SigningTime
            const sigProps = this.Properties.SignedProperties.SignedSignatureProperties;
            sigProps.SigningTime = new Date();

            // Add reference for SignedProperties
            const signingAlg = XmlCore.assign({}, algorithm, key.algorithm);
            const xadesRefHash = signingAlg.hash;
            const xadesRef = new XmlDSigJs.Reference();
            xadesRef.Type = XADES_REFERENCE_TYPE;
            xadesRef.Uri = `#${this.Properties.SignedProperties.Id}`;
            xadesRef.DigestMethod.Algorithm = XmlDSigJs.CryptoConfig.GetHashAlgorithm(xadesRefHash).namespaceURI;

            signature.SignedInfo.References.Add(xadesRef);

            await this.ApplySigningCertificate(options.signingCertificate);
            await this.ApplySignaturePolicyIdentifier(options.policy);
            this.ApplySignatureProductionPlace(options.productionPlace);
            this.ApplySignerRoles(options.signerRole);
        }
    }

    protected async ApplySigningCertificate(base64string?: string) {
        if (this.Properties && base64string) {
            const raw = XmlCore.Convert.FromBase64(base64string);
            const cert = new XmlDSigJs.X509Certificate(raw);

            const ssp = this.Properties.SignedProperties.SignedSignatureProperties;
            if (ssp.SigningCertificate.Count) {
                throw new XmlCore.XmlError(XmlCore.XE.XML_EXCEPTION, "Signature can contain only one SigningCertificate");
            }
            const signingCertificate = new XAdES.Cert();
            signingCertificate.IssuerSerial.X509IssuerName = cert.Issuer;
            signingCertificate.IssuerSerial.X509SerialNumber = cert.SerialNumber; // TODO: Must be Big number here

            const alg = XmlDSigJs.CryptoConfig.GetHashAlgorithm("SHA-256");
            signingCertificate.CertDigest.DigestMethod.Algorithm = alg.namespaceURI;
            signingCertificate.CertDigest.DigestValue = new Uint8Array(await cert.Thumbprint(alg.algorithm.name as any));

            this.Properties.SignedProperties.SignedSignatureProperties.SigningCertificate.Add(signingCertificate);
        }
    }

    protected async ApplySignaturePolicyIdentifier(options?: OptionsPolicyId | boolean) {
        if (this.Properties) {
            const ssp = this.Properties.SignedProperties.SignedSignatureProperties;
            if (options && typeof options === "object") {
                const policyId = new XAdES.SignaturePolicyId();

                policyId.SigPolicyId = new XAdES.SigPolicyId();
                policyId.SigPolicyId.Identifier = new XAdES.Identifier();
                policyId.SigPolicyId.Identifier.Qualifier = options.identifier.qualifier;
                policyId.SigPolicyId.Identifier.Value = options.identifier.value;
                if (options.identifier.description) {
                    policyId.SigPolicyId.Description = options.identifier.description;
                }
                if (options.identifier.references) {
                    policyId.SigPolicyId.DocumentationReferences = new XAdES.DocumentationReferences();
                    options.identifier.references.forEach((referenceValue) => {
                        const reference = new XAdES.DocumentationReference();
                        reference.Uri = referenceValue;
                        policyId.SigPolicyId.DocumentationReferences.Add(reference);
                    });
                }

                if (options.transforms && options.transforms.length) {
                    policyId.Transforms = new XmlDSigJs.Transforms();
                    options.transforms.forEach((transform) => {
                        policyId.Transforms.Add(this.ResolveTransform(transform));
                    });
                }

                policyId.SigPolicyHash = new XAdES.SigPolicyHash();
                policyId.SigPolicyHash.DigestMethod = new XmlDSigJs.DigestMethod();
                const digestAlgorithm = XmlDSigJs.CryptoConfig.GetHashAlgorithm(options.hash);
                policyId.SigPolicyHash.DigestMethod.Algorithm = digestAlgorithm.namespaceURI;
                const identifierDoc = policyId.SigPolicyId.Identifier.GetXml()!.cloneNode(true) as Element;
                this.CopyNamespaces(identifierDoc, identifierDoc, true);
                this.InjectNamespaces(this.GetSignatureNamespaces(), identifierDoc, true);
                let identifierContent: any = null;
                if (policyId.Transforms && policyId.Transforms.Count) {
                    identifierContent = this.ApplyTransforms(policyId.Transforms, identifierDoc);
                } else {
                    const c14n = new XmlDSigJs.XmlDsigC14NTransform();
                    c14n.LoadInnerXml(identifierDoc);
                    identifierContent = c14n.GetOutput();
                }
                policyId.SigPolicyHash.DigestValue = await digestAlgorithm.Digest(identifierContent);

                if (options.qualifiers) {
                    policyId.SigPolicyQualifiers = new XAdES.SigPolicyQualifiers();
                    options.qualifiers.forEach((qualifierValue) => {
                        const container = new XAdES.SigPolicyQualifier();
                        if (typeof qualifierValue === "string") {
                            const qualifier = new XAdES.SPURI();
                            qualifier.Value = qualifierValue;
                            container.Add(qualifier);
                        } else {
                            const qualifier = new XAdES.SPUserNotice();
                            if (qualifierValue.explicitText) {
                                qualifier.ExplicitText = qualifierValue.explicitText;
                            }
                            if (qualifierValue.noticeRef) {
                                qualifier.NoticeRef = new XAdES.NoticeReference();
                                qualifier.NoticeRef.Organization = qualifierValue.noticeRef.organization;
                                qualifier.NoticeRef.NoticeNumbers = new XAdES.IntegerList();
                                if (qualifierValue.noticeRef.noticeNumbers) {
                                    qualifierValue.noticeRef.noticeNumbers.forEach((numberValue) => {
                                        const noticeNumber = new XAdES.Integer();
                                        noticeNumber.Value = numberValue;
                                        qualifier.NoticeRef.NoticeNumbers.Add(noticeNumber);
                                    });
                                }
                            }
                            container.Add(qualifier);
                        }
                        policyId.SigPolicyQualifiers.Add(container);
                    });
                }

                ssp.SignaturePolicyIdentifier.SignaturePolicyId = policyId;
                ssp.SignaturePolicyIdentifier.SignaturePolicyImplied = false;
            } else {
                ssp.SignaturePolicyIdentifier.SignaturePolicyImplied = true;
            }
        }
    }

    protected ApplySignatureProductionPlace(options?: OptionsProductionPlace) {
        if (this.Properties && options) {
            const ssp = this.Properties.SignedProperties.SignedSignatureProperties;

            if (options.city) {
                ssp.SignatureProductionPlace.City = options.city;
            }

            if (options.code) {
                ssp.SignatureProductionPlace.PostalCode = options.code;
            }

            if (options.country) {
                ssp.SignatureProductionPlace.CountryName = options.country;
            }

            if (options.state) {
                ssp.SignatureProductionPlace.StateOrProvince = options.state;
            }
        }
    }

    protected ApplySignerRoles(options?: OptionsSignerRole) {
        if (this.Properties && options) {
            const ssp = this.Properties.SignedProperties.SignedSignatureProperties;

            if (options.claimed) {
                options.claimed.forEach((role) => {
                    const claimedRole = new XAdES.ClaimedRole();
                    claimedRole.Value = role;
                    ssp.SignerRole.ClaimedRoles.Add(claimedRole);
                });
            }

            if (options.certified) {
                options.certified.forEach((role) => {
                    const certifiedRole = new XAdES.CertifiedRole();
                    certifiedRole.Encoding = "der";
                    certifiedRole.Value = XmlCore.Convert.FromBase64(role);
                    ssp.SignerRole.CertifiedRoles.Add(certifiedRole);
                });
            }

        }
    }

    protected async VerifySigningCertificate() {
        let x509: XmlDSigJs.X509Certificate | null = null;
        if (this.XmlSignature && this.Properties) {

            const ssp = this.Properties.SignedProperties.SignedSignatureProperties;
            if (ssp.SigningCertificate.Count !== 1) {
                throw new XmlCore.XmlError(XmlCore.XE.XML_EXCEPTION, "Signature has got wrong amount of SigningCertificate, MUST be one");
            }

            // find certificate by Thumbprint
            const alg = XmlDSigJs.CryptoConfig.GetHashAlgorithm("SHA-256");
            const signingCertificate = ssp.SigningCertificate.Item(0)!;
            const b64CertDigest = XmlCore.Convert.ToBase64(signingCertificate.CertDigest.DigestValue);
            const keyInfos = this.XmlSignature.KeyInfo;
            // tslint:disable-next-line:no-unused-expression
            for (let i = 0; i < keyInfos.Count, !x509; i++) {
                const item = keyInfos.Item(i);
                if (item instanceof XmlDSigJs.KeyInfoX509Data) {
                    const certs = item.Certificates;
                    // tslint:disable-next-line:no-unused-expression
                    for (let j = 0; j < certs.length, !x509; j++) {
                        const cert = certs[j];
                        if (!cert) {
                            continue;
                        }
                        const hash = new Uint8Array(await cert.Thumbprint(alg.algorithm as any));
                        const b64Hash = XmlCore.Convert.ToBase64(hash);
                        if (b64Hash === b64CertDigest) {
                            x509 = cert;
                        }
                    }
                }
            }
            if (!(
                x509 &&
                x509.Issuer === signingCertificate.IssuerSerial.X509IssuerName &&
                x509.SerialNumber === signingCertificate.IssuerSerial.X509SerialNumber
            )) {
                throw new XmlCore.XmlError(XmlCore.XE.XML_EXCEPTION, "SigningCertificate not found");
            }

        }

        return x509;
    }

    //#endregion

}
