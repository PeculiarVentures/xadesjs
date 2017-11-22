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

export interface OptionsPolicyIdentifier {

}

export interface OptionsXAdES extends XmlDSigJs.OptionsSign {

    /**
     * Sets a certificate of signer for signature. Optional
     *
     * @type {string} base64 string of X509 certificate
     * @memberOf OptionsXAdES
     */
    signingCertificate?: string;

    policy?: OptionsPolicyIdentifier;
    productionPlace?: OptionsProductionPlace;
    signerRole?: OptionsSignerRole;
}

export class SignedXml extends XmlDSigJs.SignedXml {

    protected signatureContainer: XAdES.XadesSignatures | null = null;
    protected properties: XAdES.QualifyingProperties | null = null;

    get XmlSignatureContainer(): XAdES.XadesSignatures | null {
        return this.signatureContainer;
    }

    get Properties(): XAdES.QualifyingProperties | null {
        return this.properties;
    }

    get SignedProperties(): XAdES.SignedProperties {
        if (!this.Properties)
            throw new XmlCore.XmlError(XmlCore.XE.XML_EXCEPTION, "Properties is empty");
        return this.Properties.SignedProperties;
    }
    get UnsignedProperties(): XAdES.UnsignedProperties {
        if (!this.Properties)
            throw new XmlCore.XmlError(XmlCore.XE.XML_EXCEPTION, "Properties is empty");
        return this.Properties.UnsignedProperties;
    }

    constructor(node?: Document | Element, useContainer?: boolean) {
        super(node);

        if (useContainer) {
            this.signatureContainer = new XAdES.XadesSignatures();
            this.signatureContainer.Add(this.XmlSignature)
        }

        this.CreateQualifyingProperties();
    }

    GetXml() {
        return this.XmlSignatureContainer
            ? this.XmlSignatureContainer.GetXml()
            : super.GetXml()
    }

    LoadXml(value: Element | string, useContainer?: boolean) {
        super.LoadXml(value as string);

        if (useContainer) {
            this.XmlSignatureContainer = new XAdES.XadesSignatures();
            this.XmlSignatureContainer.Add(this.XmlSignature)
        }

        let properties: XAdES.QualifyingProperties | null = null;
        this.XmlSignature.ObjectList.Some(item => {
            if (item.Element) {
                // Looking for <QualifyingProperties>
                for (let i = 0; i < item.Element.childNodes.length; i++) {
                    let node = item.Element.childNodes.item(i);
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

    toString() {
        return this.XmlSignatureContainer
            ? this.XmlSignatureContainer.toString()
            : super.toString()
    }

    protected CreateQualifyingProperties() {
        if (this.Properties)
            throw new XmlCore.XmlError(XmlCore.XE.XML_EXCEPTION, "Cannot create QualifyingProperties cause current signature has got one. You must create CounterSignature");

        let rnd = XmlDSigJs.Application.crypto.getRandomValues(new Uint8Array(6)) as Uint8Array;
        let id = XmlCore.Convert.ToHex(rnd);

        this.XmlSignature.Id = `id-${id}`;
        let dataObject = new XAdES.DataObject();
        dataObject.QualifyingProperties.Target = `#${this.XmlSignature.Id}`;
        dataObject.QualifyingProperties.SignedProperties.Id = `xades-${this.XmlSignature.Id}`;

        this.properties = dataObject.QualifyingProperties;
        this.XmlSignature.ObjectList.Add(dataObject);
    }

    protected GetSignatureNamespaces(): { [index: string]: string } {
        let namespaces = super.GetSignatureNamespaces()
        if (this.XmlSignatureContainer) {
            namespaces[this.XmlSignatureContainer.prefix] = this.XmlSignatureContainer.namespaceURI
        }
        return namespaces
    }

    protected async ApplySignOptions(signature: XmlDSigJs.Signature, algorithm: Algorithm, key: CryptoKey, options: OptionsXAdES) {
        await super.ApplySignOptions(signature, algorithm, key, options);
        if (this.Properties) {
            // Add SigningTime
            let sigProps = this.Properties.SignedProperties.SignedSignatureProperties;
            sigProps.SigningTime = new Date();

            // Add reference for SignedProperties
            let signingAlg = XmlCore.assign({}, algorithm, key.algorithm);
            let xadesRefHash = signingAlg.hash;
            let xadesRef = new XmlDSigJs.Reference();
            xadesRef.Type = XADES_REFERENCE_TYPE;
            xadesRef.Uri = `#${this.Properties.SignedProperties.Id}`;
            xadesRef.DigestMethod.Algorithm = XmlDSigJs.CryptoConfig.GetHashAlgorithm(xadesRefHash).namespaceURI;

            signature.SignedInfo.References.Add(xadesRef);

            await this.ApplySigningCertificate(options.signingCertificate);
            this.ApplySignaturePolicyIdentifier(options.policy);
            this.ApplySignatureProductionPlace(options.productionPlace);
            this.ApplySignerRoles(options.signerRole);
        }
    }

    Sign(algorithm: Algorithm, key: CryptoKey, data: Document, options?: OptionsXAdES): PromiseLike<XmlDSigJs.Signature> {
        return super.Sign.apply(this, arguments);
    }

    protected async ApplySigningCertificate(base64string?: string) {
        if (this.Properties && base64string) {
            let raw = XmlCore.Convert.FromBase64(base64string);
            let cert = new XmlDSigJs.X509Certificate(raw);

            let ssp = this.Properties.SignedProperties.SignedSignatureProperties;
            if (ssp.SigningCertificate.Count) {
                throw new XmlCore.XmlError(XmlCore.XE.XML_EXCEPTION, "Signature can contain only one SigningCertificate");
            }
            let signingCertificate = new XAdES.Cert();
            signingCertificate.IssuerSerial.X509IssuerName = cert.Issuer;
            signingCertificate.IssuerSerial.X509SerialNumber = cert.SerialNumber; // TODO: Must be Big number here

            let alg = XmlDSigJs.CryptoConfig.GetHashAlgorithm("SHA-256");
            signingCertificate.CertDigest.DigestMethod.Algorithm = alg.namespaceURI;
            signingCertificate.CertDigest.DigestValue = new Uint8Array(await cert.Thumbprint(alg.algorithm.name as any));

            this.Properties.SignedProperties.SignedSignatureProperties.SigningCertificate.Add(signingCertificate);
        }
    }

    protected ApplySignaturePolicyIdentifier(options?: OptionsPolicyIdentifier) {
        if (this.Properties) {
            let ssp = this.Properties.SignedProperties.SignedSignatureProperties;
            if (options) {

            }
            else {
                ssp.SignaturePolicyIdentifier.SignaturePolicyImplied = true;
            }
        }
    }

    protected ApplySignatureProductionPlace(options?: OptionsProductionPlace) {
        if (this.Properties && options) {
            let ssp = this.Properties.SignedProperties.SignedSignatureProperties;

            if (options.city)
                ssp.SignatureProductionPlace.City = options.city;

            if (options.code)
                ssp.SignatureProductionPlace.PostalCode = options.code;

            if (options.country)
                ssp.SignatureProductionPlace.CountryName = options.country;

            if (options.state)
                ssp.SignatureProductionPlace.StateOrProvince = options.state;
        }
    }

    protected ApplySignerRoles(options?: OptionsSignerRole) {
        if (this.Properties && options) {
            let ssp = this.Properties.SignedProperties.SignedSignatureProperties;

            if (options.claimed)
                options.claimed.forEach(role => {
                    let claimedRole = new XAdES.ClaimedRole();
                    claimedRole.Value = role;
                    ssp.SignerRole.ClaimedRoles.Add(claimedRole);
                });

            if (options.certified)
                options.certified.forEach(role => {
                    let certifiedRole = new XAdES.CertifiedRole();
                    certifiedRole.Encoding = "der";
                    certifiedRole.Value = XmlCore.Convert.FromBase64(role);
                    ssp.SignerRole.CertifiedRoles.Add(certifiedRole);
                });

        }
    }

    protected async VerifySigningCertificate() {
        let x509: XmlDSigJs.X509Certificate | null = null;
        if (this.XmlSignature && this.Properties) {

            let ssp = this.Properties.SignedProperties.SignedSignatureProperties;
            if (ssp.SigningCertificate.Count !== 1) {
                throw new XmlCore.XmlError(XmlCore.XE.XML_EXCEPTION, "Signature has got wrong amount of SigningCertificate, MUST be one");
            }

            // find certificate by Thumbprint
            let alg = XmlDSigJs.CryptoConfig.GetHashAlgorithm("SHA-256");
            let signingCertificate = ssp.SigningCertificate.Item(0) !;
            const b64CertDigest = XmlCore.Convert.ToBase64(signingCertificate.CertDigest.DigestValue);
            let keyInfos = this.XmlSignature.KeyInfo;
            for (let i = 0; i < keyInfos.Count, !x509; i++) {
                let item = keyInfos.Item(i);
                if (item instanceof XmlDSigJs.KeyInfoX509Data) {
                    let certs = item.Certificates;
                    for (let j = 0; j < certs.length, !x509; j++) {
                        let cert = certs[j];
                        if (!cert)
                            continue;
                        const hash = new Uint8Array(await cert.Thumbprint(alg.algorithm as any));
                        const b64Hash = XmlCore.Convert.ToBase64(hash);
                        if (b64Hash === b64CertDigest)
                            x509 = cert;
                    }
                }
            }
            if (!(
                x509 &&
                x509.Issuer === signingCertificate.IssuerSerial.X509IssuerName &&
                x509.SerialNumber === signingCertificate.IssuerSerial.X509SerialNumber
            ))
                throw new XmlCore.XmlError(XmlCore.XE.XML_EXCEPTION, "SigningCertificate not found");

        }

        return x509;
    }

}
