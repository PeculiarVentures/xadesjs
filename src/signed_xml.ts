import * as XmlCore from "xml-core";
import * as XmlDSigJs from "xmldsigjs";
import * as XAdES from "./xml";

const XADES_REFERENCE_TYPE = "http://uri.etsi.org/01903#SignedProperties";

export interface OptionsXAdES extends XmlDSigJs.OptionsSign {

}

export class SignedXml extends XmlDSigJs.SignedXml {

    protected properties: XAdES.QualifyingProperties | null = null;

    get Properties() {
        return this.properties;
    }

    get SignedProperties() {
        if (!this.Properties)
            throw new XmlCore.XmlError(XmlCore.XE.XML_EXCEPTION, "Properties is empty");
        return this.Properties.SignedProperties;
    }
    get UnsignedProperties() {
        if (!this.Properties)
            throw new XmlCore.XmlError(XmlCore.XE.XML_EXCEPTION, "Properties is empty");
        return this.Properties.UnsignedProperties;
    }

    constructor(node?: Document | Element) {
        super(node);

        this.CreateQualyingProperties();
    }

    LoadXml(value: Element | string) {
        super.LoadXml(value as string);

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


    protected CreateQualyingProperties() {
        if (this.Properties)
            throw new XmlCore.XmlError(XmlCore.XE.XML_EXCEPTION, "Cannot create QualifyingProperties cause currensignature has got one. You must create CounterSignature");

        let rnd = XmlDSigJs.Application.crypto.getRandomValues(new Uint8Array(6)) as Uint8Array;
        let id = XmlCore.Convert.ToHex(rnd);

        this.XmlSignature.Id = `id-${id}`;
        let dataObject = new XAdES.DataObject();
        dataObject.QualifyingProperties.Target = `#${this.XmlSignature.Id}`;
        dataObject.QualifyingProperties.SignedProperties.Id = `xades-${this.XmlSignature.Id}`;

        this.properties = dataObject.QualifyingProperties;
        this.XmlSignature.ObjectList.Add(dataObject);
    }

    protected ApplySignOptions(signature: XmlDSigJs.Signature, algorithm: Algorithm, key: CryptoKey, options: OptionsXAdES): PromiseLike<void> {
        return Promise.resolve()
            .then(() => super.ApplySignOptions(signature, algorithm, key, options))
            .then(() => {
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
                }

            });
    }

}