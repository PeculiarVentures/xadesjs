
/**
 * Types of signature standards that can be contained in XadesSignedXml class instance
 */
export enum KnownSignatureStandard {
    /**
     * XML Digital Signature (XMLDSIG)
     */
    XmlDsig,
    /**
     * XML Advanced Electronic Signature (XAdES) 
     */
    Xades
}

/**
 * Bitmasks to indicate which checks need to be executed on the XAdES signature
 */
export enum XadesCheckSignatureMasks {
    /**
     * Check the signature of the underlying XMLDSIG signature
     */
    CheckXmldsigSignature = 0x01,
    /**
     * Validate the XML representation of the signature against the XAdES and XMLDSIG schemas
     */
    ValidateAgainstSchema = 0x02,
    /**
     * Check to see if first XMLDSIG certificate has same hashvalue as first XAdES SignatureCertificate
     */
    CheckSameCertificate = 0x04,
    /**
     * Check if there is a HashDataInfo for each reference if there is a AllDataObjectsTimeStamp
     */
    CheckAllReferencesExistInAllDataObjectsTimeStamp = 0x08,
    /**
     * Check if the HashDataInfo of each IndividualDataObjectsTimeStamp points to existing Reference
     */
    CheckAllHashDataInfosInIndividualDataObjectsTimeStamp = 0x10,
    /**
     * Perform XAdES checks on contained counter signatures 
     */
    CheckCounterSignatures = 0x20,
    /**
     * Counter signatures should all contain a reference to the parent signature SignatureValue element
     */
    CheckCounterSignaturesReference = 0x40,
    /**
     * Check if each ObjectReference in CommitmentTypeIndication points to Reference element
     */
    CheckObjectReferencesInCommitmentTypeIndication = 0x80,
    /**
     * Check if at least ClaimedRoles or CertifiedRoles present in SignerRole
     */
    CheckIfClaimedRolesOrCertifiedRolesPresentInSignerRole = 0x0100,
    /**
     * Check if HashDataInfo of SignatureTimeStamp points to SignatureValue
     */
    CheckHashDataInfoOfSignatureTimeStampPointsToSignatureValue = 0x0200,
    /**
     * Check if the QualifyingProperties Target attribute points to the signature element
     */
    CheckQualifyingPropertiesTarget = 0x0400,
    /**
     * Check that QualifyingProperties occur in one Object, check that there is only one QualifyingProperties and that signed properties occur in one QualifyingProperties element
     */
    CheckQualifyingProperties = 0x0800,
    /**
     * Check if all required HashDataInfos are present on SigAndRefsTimeStamp
     */
    CheckSigAndRefsTimeStampHashDataInfos = 0x1000,
    /**
     * Check if all required HashDataInfos are present on RefsOnlyTimeStamp
     */
    CheckRefsOnlyTimeStampHashDataInfos = 0x2000,
    /**
     * Check if all required HashDataInfos are present on ArchiveTimeStamp
     */
    CheckArchiveTimeStampHashDataInfos = 0x4000,
    /**
     * Check if a XAdES-C signature is also a XAdES-T signature
     */
    CheckXadesCIsXadesT = 0x8000,
    /**
     * Check if a XAdES-XL signature is also a XAdES-X signature
     */
    CheckXadesXLIsXadesX = 0x010000,
    /**
     * Check if CertificateValues match CertificateRefs
     */
    CheckCertificateValuesMatchCertificateRefs = 0x020000,
    /**
     * Check if RevocationValues match RevocationRefs
     */
    CheckRevocationValuesMatchRevocationRefs = 0x040000,
    /**
     * Check TSP
     */
    CheckSignatureTimeStamp = 0x080000,
    /**
     * Do all known tests on XAdES signature
     */
    AllChecks = 0xFFFFFF
}

/**
 * Facade class for the XAdES signature library.  The class inherits from
 * the System.Security.Cryptography.Xml.SignedXml class and is backwards
 * compatible with it, so this class can host xmldsig signatures and XAdES
 * signatures.  The property SignatureStandard will indicate the type of the
 * signature: XMLDSIG or XAdES.
 */
export class XadesSignedXml extends SignedXml {
    // Constants
    /**
     * The XAdES XML namespace URI
     */
    public XadesNamespaceUri = "http://uri.etsi.org/01903/v1.3.2#";

    /**
     * Mandated type name for the Uri reference to the SignedProperties element
     */
    public SignedPropertiesType = "http://uri.etsi.org/01903/v1.3.2#SignedProperties";


    // Private variables
    private static idAttrs = [
        "_id",
        "_Id",
        "_ID"
    ];

    private signatureStandard: KnownSignatureStandard;
    private cachedXadesObjectDocument: Document;
    private signedPropertiesIdBuffer: string;
    private signatureValueId: string;
    private validationErrorOccurred: boolean;
    private validationErrorDescription: string;
    private signedInfoIdBuffer: string;


    // Public properties
    /**
     * Property indicating the type of signature (XmlDsig or XAdES)
     */
    public get SignatureStandard(): KnownSignatureStandard {
        return this.signatureStandard;
    }


    /**
     * Read-only property containing XAdES information
     */
    public get XadesObject(): XadesObject {
        let retVal = new XadesObject();

        let xml = this.GetXml();

        retVal.LoadXml(this.GetXadesObjectElement(xml), xml);

        return retVal;
    }


    /**
     * Setting this property will add an ID attribute to the SignatureValue element.
     * This is required when constructing a XAdES-T signature.
     */
    public get SignatureValueId(): string {
        return this.signatureValueId;
    }
    public set SignatureValueId(value: string) {
        this.signatureValueId = value;
    }


    /**
     * This property allows to access and modify the unsigned properties
     * after the XAdES object has been added to the signature.
     * Because the unsigned properties are part of a location in the
     * signature that is not used when computing the signature, it is save
     * to modify them even after the XMLDSIG signature has been computed.
     * This is needed when XAdES objects that depend on the XMLDSIG
     * signature value need to be added to the signature. The
     * SignatureTimeStamp element is such a property, it can only be
     * created when the XMLDSIG signature has been computed.
     */
    public get UnsignedProperties(): UnsignedProperties {
        let dataObjectXmlElement: Element;
        let xadesDataObject: DataObject;
        let retVal = new UnsignedProperties();
        xadesDataObject = this.GetXadesDataObject();
        if (xadesDataObject) {
            dataObjectXmlElement = xadesDataObject.GetXml();

            let xmlNodeList = dataObjectXmlElement.getElementsByTagNameNS(XmlXades.NamespaceURI, XmlXades.ElementNames.UnsignedProperties);
            if (xmlNodeList.length) {
                retVal = new UnsignedProperties();
                retVal.LoadXml(xmlNodeList[0] as Element, xmlNodeList[0] as Element);
            }
        }
        else {
            throw new XmlError(XE.CRYPTOGRAPHIC, "XAdES object not found. Use AddXadesObject() before accessing UnsignedProperties.");
        }

        return retVal;
    }

    public set UnsignedProperties(value: UnsignedProperties) {
        let xadesDataObject = this.GetXadesDataObject();
        if (xadesDataObject) {
            let dataObjectXmlElement = xadesDataObject.GetXml();
            let qualifyingPropertiesXmlNodeList = findChilds(dataObjectXmlElement, XmlXades.ElementNames.QualifyingProperties, XmlXades.NamespaceURI);
            let unsignedPropertiesXmlNodeList = findChilds(dataObjectXmlElement, XmlXades.ElementNames.UnsignedProperties, XmlXades.NamespaceURI);
            if (unsignedPropertiesXmlNodeList.length) {
                qualifyingPropertiesXmlNodeList[0].removeChild(unsignedPropertiesXmlNodeList[0]);
            }
            qualifyingPropertiesXmlNodeList[0].appendChild(dataObjectXmlElement.ownerDocument.importNode(value.GetXml(), true));

            let newXadesDataObject = new DataObject();
            newXadesDataObject.LoadXml(dataObjectXmlElement);
            xadesDataObject.Data = newXadesDataObject.Data;
        }
        else {
            throw new XmlError(XE.CRYPTOGRAPHIC, "XAdES object not found. Use AddXadesObject() before accessing UnsignedProperties.");
        }
    }

    // Constructors
    /**
     * Default constructor for the XadesSignedXml class
     */
    public constructor();
    /**
     * Constructor for the XadesSignedXml class
     * @param {Element} signatureElement XmlElement used to create the instance
     */
    public constructor(signatureElement: Element);
    /**
     * Constructor for the XadesSignedXml class
     * @param {Document} signatureDocument XmlDocument used to create the instance
     */
    public constructor(signatureElement: Document);
    public constructor(signatureElement?: Node) {
        super(signatureElement as Element);
        this.cachedXadesObjectDocument = null;
        this.signatureStandard = KnownSignatureStandard.XmlDsig;
    }

    // Public methods

    /**
     * Load state from an XML element
     * @param {Element} element The XML element from which to load the XadesSignedXml state
     */
    public LoadXml(element: Element) {
        this.cachedXadesObjectDocument = null;
        this.signatureValueId = null;
        super.LoadXml(element);

        let idAttribute = element.getAttribute(XmlXades.AttributeNames.Id);
        if (idAttribute) {
            this.Signature.Id = idAttribute;
        }
        this.SetSignatureStandard(element);

        let xmlNodeList = findChilds(element, XmlSignature.ElementNames.SignatureValue, XmlSignature.NamespaceURI);
        if (xmlNodeList.length) {
            if ((xmlNodeList[0] as Element).hasAttribute(XmlSignature.AttributeNames.Id)) {
                this.signatureValueId = (xmlNodeList[0] as Element).getAttribute(XmlSignature.AttributeNames.Id);
            }
        }
    }

    /**
     * Returns the XML representation of the this object
     * @returns XML element containing the state of this object
     */
    public GetXml(): Element {
        // Add "ds" namespace prefix to all XmlDsig nodes in the signature
        // super.Prefix = "ds";

        let retVal = super.GetXml();

        if (this.signatureValueId) { // Id on Signature value is needed for XAdES-T. We inject it here.
            let xmlNodeList = findChilds(retVal, XmlSignature.ElementNames.SignatureValue, XmlSignature.NamespaceURI);
            if (xmlNodeList.length) {
                (xmlNodeList[0] as Element).setAttribute(XmlSignature.AttributeNames.Id, this.signatureValueId);
            }
        }


        return retVal;
    }

    /**
     * Overridden virtual method to be able to find the nested SignedProperties
     * element inside of the XAdES object
     * @param {Document} document Document in which to find the Id
     * @param {string} idValue Value of the Id to look for
     * @returns XmlElement with requested Id
     */
    public GetElementById(document: Document, idValue: string): Element {
        // check to see if it's a standard ID reference
        let retVal: Element = null;

        if (this.Signature && this.Signature.SignedInfo && this.Signature.SignatureValue) {
            // Clone signature element
            let signature = new DOMParser().parseFromString(new XMLSerializer().serializeToString(this.Signature.GetXml()), APPLICATION_XML);
            retVal = super.GetElementById(signature as any, idValue);
            if (retVal) {
                return retVal;
            }

            // if not, search for custom ids
            for (let idAttr of XadesSignedXml.idAttrs) {
                retVal = SelectSingleNode(signature, "//*[@" + idAttr + "=\"" + idValue + "\"]") as Element;
                if (retVal) {
                    return retVal;
                }
            }
        }

        if (idValue === this.signedPropertiesIdBuffer) {
            // clone document
            let xmlDocumentCloned = new DOMParser().parseFromString(new XMLSerializer().serializeToString(document), APPLICATION_XML);

            retVal = super.GetElementById(xmlDocumentCloned, idValue);
            if (retVal) {
                return retVal;
            }

            // if not, search for custom ids
            for (let idAttr of XadesSignedXml.idAttrs) {
                retVal = SelectSingleNode(this.cachedXadesObjectDocument, "//*[@" + idAttr + "=\"" + idValue + "\"]") as Element;
                if (retVal) {
                    break;
                }
            }
        }
        else {
            if (document) {
                retVal = super.GetElementById(document, idValue);
                if (retVal) {
                    return retVal;
                }

                // if not, search for custom ids
                for (let idAttr of XadesSignedXml.idAttrs) {
                    retVal = SelectSingleNode(document, "//*[@" + idAttr + "=\"" + idValue + "\"]") as Element;
                    if (retVal) {
                        break;
                    }
                }
            }
        }

        return retVal;
    }

    /**
     * Add a XAdES object to the signature
     * @param {XadesObject} xadesObject XAdES object to add to signature
     */
    public AddXadesObject(xadesObject: XadesObject): void {

        if (this.SignatureStandard !== KnownSignatureStandard.Xades) {
            let dataObject = new DataObject();
            dataObject.Id = xadesObject.Id;
            dataObject.Data = xadesObject.GetXml().childNodes;
            this.Signature.AddObject(dataObject); // Add the XAdES object

            let reference = new Reference();
            this.signedPropertiesIdBuffer = xadesObject.QualifyingProperties.SignedProperties.Id;
            reference.Uri = "#" + this.signedPropertiesIdBuffer;
            reference.Type = this.SignedPropertiesType;
            this.AddReference(reference); // Add the XAdES object reference

            this.cachedXadesObjectDocument = null;
            let bufferXmlElement = xadesObject.GetXml();

            // Add "ds" namespace prefix to all XmlDsig nodes in the XAdES object
            // SetPrefix("ds", bufferXmlElement);
            let doc = new DOMParser().parseFromString(new XMLSerializer().serializeToString(bufferXmlElement), APPLICATION_XML);
            this.cachedXadesObjectDocument = doc; // Cache to XAdES object for later use

            this.signatureStandard = KnownSignatureStandard.Xades;
        }
        else {
            throw new XmlError(XE.CRYPTOGRAPHIC, "Can't add XAdES object, the signature already contains a XAdES object");
        }
    }

    /**
     * Additional tests for XAdES signatures.  These tests focus on
     * XMLDSIG verification and correct form of the XAdES XML structure
     * (schema validation and completeness as defined by the XAdES standard).
     * ### remarks
     * Because of the fact that the XAdES library is intentionally
     * independent of standards like TSP (RFC3161) or OCSP (RFC2560),
     * these tests do NOT include any verification of timestamps nor OCSP
     * responses.
     * These checks are important and have to be done in the application
     * built on top of the XAdES library.
     * ### Exception System.Exception
     * Thrown when the signature is not
     * a XAdES signature.SignatureStandard should be equal to
     * KnownSignatureStandard.Xades.
     * Use the CheckSignature method for non- XAdES signatures.
     * @param {XadesCheckSignatureMasks} xadesCheckSignatureMasks Bitmask to indicate which
     * tests need to be done.This function will call a public virtual
     * methods for each bit that has been set in this mask.
     * See the XadesCheckSignatureMasks
     * enum for the bitmask definitions.The virtual test method associated
     * with a bit in the mask has the same name as enum value name.
     * @returns If the function returns true the check was OK.If the
     * check fails an exception with a explanatory message is thrown.
     */
    public XadesCheckSignature(xadesCheckSignatureMasks: XadesCheckSignatureMasks = XadesCheckSignatureMasks.CheckXmldsigSignature): PromiseLike<boolean> {
        let promise = Promise.resolve(true);
        if (this.SignatureStandard !== KnownSignatureStandard.Xades) {
            promise = promise.then((v: boolean) => {
                return v ? this.CheckSignature() : Promise.resolve(v);
            });
        }
        else {
            if ((xadesCheckSignatureMasks & XadesCheckSignatureMasks.CheckXmldsigSignature) !== 0) {
                promise = promise.then((v: boolean) => {
                    console.log("XadesCheckSignatureMasks.CheckXmldsigSignature");
                    return v ? this.CheckXmldsigSignature() : Promise.resolve(v);
                });
            }
            if ((xadesCheckSignatureMasks & XadesCheckSignatureMasks.ValidateAgainstSchema) !== 0) {
                promise = promise.then((v: boolean) => {
                    console.log("Check result:", v);
                    console.log("XadesCheckSignatureMasks.ValidateAgainstSchema");
                    return v ? this.ValidateAgainstSchema() : Promise.resolve(v);
                });
            }
            if ((xadesCheckSignatureMasks & XadesCheckSignatureMasks.CheckSameCertificate) !== 0) {
                promise = promise.then((v: boolean) => {
                    console.log("Check result:", v);
                    console.log("XadesCheckSignatureMasks.CheckSameCertificate");
                    return v ? this.CheckSameCertificate() : Promise.resolve(v);
                });
            }
            if ((xadesCheckSignatureMasks & XadesCheckSignatureMasks.CheckAllReferencesExistInAllDataObjectsTimeStamp) !== 0) {
                promise = promise.then((v: boolean) => {
                    console.log("Check result:", v);
                    console.log("XadesCheckSignatureMasks.CheckAllReferencesExistInAllDataObjectsTimeStamp");
                    return v ? this.CheckAllReferencesExistInAllDataObjectsTimeStamp() : Promise.resolve(v);
                });
            }
            if ((xadesCheckSignatureMasks & XadesCheckSignatureMasks.CheckAllHashDataInfosInIndividualDataObjectsTimeStamp) !== 0) {
                promise = promise.then((v: boolean) => {
                    console.log("Check result:", v);
                    console.log("XadesCheckSignatureMasks.CheckAllHashDataInfosInIndividualDataObjectsTimeStamp");
                    return v ? this.CheckAllHashDataInfosInIndividualDataObjectsTimeStamp() : Promise.resolve(v);
                });
            }
            if ((xadesCheckSignatureMasks & XadesCheckSignatureMasks.CheckCounterSignatures) !== 0) {
                promise = promise.then((v: boolean) => {
                    console.log("Check result:", v);
                    console.log("XadesCheckSignatureMasks.CheckCounterSignatures");
                    return v ? this.CheckCounterSignatures(xadesCheckSignatureMasks) : Promise.resolve(v);
                });
            }
            if ((xadesCheckSignatureMasks & XadesCheckSignatureMasks.CheckCounterSignaturesReference) !== 0) {
                promise = promise.then((v: boolean) => {
                    console.log("Check result:", v);
                    console.log("XadesCheckSignatureMasks.CheckCounterSignaturesReference");
                    return v ? this.CheckCounterSignaturesReference() : Promise.resolve(v);
                });
            }
            if ((xadesCheckSignatureMasks & XadesCheckSignatureMasks.CheckObjectReferencesInCommitmentTypeIndication) !== 0) {
                promise = promise.then((v: boolean) => {
                    console.log("XadesCheckSignatureMasks.CheckObjectReferencesInCommitmentTypeIndication");
                    return v ? this.CheckObjectReferencesInCommitmentTypeIndication() : Promise.resolve(v);
                });
            }
            if ((xadesCheckSignatureMasks & XadesCheckSignatureMasks.CheckIfClaimedRolesOrCertifiedRolesPresentInSignerRole) !== 0) {
                promise = promise.then((v: boolean) => {
                    console.log("Check result:", v);
                    console.log("XadesCheckSignatureMasks.CheckIfClaimedRolesOrCertifiedRolesPresentInSignerRole");
                    return v ? this.CheckIfClaimedRolesOrCertifiedRolesPresentInSignerRole() : Promise.resolve(v);
                });
            }
            if ((xadesCheckSignatureMasks & XadesCheckSignatureMasks.CheckHashDataInfoOfSignatureTimeStampPointsToSignatureValue) !== 0) {
                promise = promise.then((v: boolean) => {
                    console.log("Check result:", v);
                    console.log("XadesCheckSignatureMasks.CheckHashDataInfoOfSignatureTimeStampPointsToSignatureValue");
                    return v ? this.CheckHashDataInfoOfSignatureTimeStampPointsToSignatureValue() : Promise.resolve(v);
                });
            }
            if ((xadesCheckSignatureMasks & XadesCheckSignatureMasks.CheckQualifyingPropertiesTarget) !== 0) {
                promise = promise.then((v: boolean) => {
                    console.log("Check result:", v);
                    console.log("XadesCheckSignatureMasks.CheckQualifyingPropertiesTarget");
                    return v ? this.CheckQualifyingPropertiesTarget() : Promise.resolve(v);
                });
            }
            if ((xadesCheckSignatureMasks & XadesCheckSignatureMasks.CheckQualifyingProperties) !== 0) {
                promise = promise.then((v: boolean) => {
                    return v ? this.CheckQualifyingProperties() : Promise.resolve(v);
                });
            }
            if ((xadesCheckSignatureMasks & XadesCheckSignatureMasks.CheckSigAndRefsTimeStampHashDataInfos) !== 0) {
                promise = promise.then((v: boolean) => {
                    return v ? this.CheckSigAndRefsTimeStampHashDataInfos() : Promise.resolve(v);
                });
            }
            if ((xadesCheckSignatureMasks & XadesCheckSignatureMasks.CheckRefsOnlyTimeStampHashDataInfos) !== 0) {
                promise = promise.then((v: boolean) => {
                    return v ? this.CheckRefsOnlyTimeStampHashDataInfos() : Promise.resolve(v);
                });
            }
            if ((xadesCheckSignatureMasks & XadesCheckSignatureMasks.CheckArchiveTimeStampHashDataInfos) !== 0) {
                promise = promise.then((v: boolean) => {
                    return v ? this.CheckArchiveTimeStampHashDataInfos() : Promise.resolve(v);
                });
            }
            if ((xadesCheckSignatureMasks & XadesCheckSignatureMasks.CheckXadesCIsXadesT) !== 0) {
                promise = promise.then((v: boolean) => {
                    return v ? this.CheckXadesCIsXadesT() : Promise.resolve(v);
                });
            }
            if ((xadesCheckSignatureMasks & XadesCheckSignatureMasks.CheckXadesXLIsXadesX) !== 0) {
                promise = promise.then((v: boolean) => {
                    return v ? this.CheckXadesXLIsXadesX() : Promise.resolve(v);
                });
            }
            if ((xadesCheckSignatureMasks & XadesCheckSignatureMasks.CheckCertificateValuesMatchCertificateRefs) !== 0) {
                promise = promise.then((v: boolean) => {
                    return v ? this.CheckCertificateValuesMatchCertificateRefs() : Promise.resolve(v);
                });
            }
            if ((xadesCheckSignatureMasks & XadesCheckSignatureMasks.CheckRevocationValuesMatchRevocationRefs) !== 0) {
                promise = promise.then((v: boolean) => {
                    return v ? this.CheckRevocationValuesMatchRevocationRefs() : Promise.resolve(v);
                });
            }
            if ((xadesCheckSignatureMasks & XadesCheckSignatureMasks.CheckSignatureTimeStamp) !== 0) {
                promise = promise.then((v: boolean) => {
                    console.log("Check result:", v);
                    console.log("XadesCheckSignatureMasks.CheckSignatureTimeStamp");
                    return v ? this.CheckSignatureTimeStamp() : Promise.resolve(v);
                });
            }
        }

        return promise.then((v: boolean) => {
            console.log("Check result:", v);
            return Promise.resolve(v);
        });
    }

    // XadesCheckSignature routines
    /**
     * Check the signature of the underlying XMLDSIG signature
    * @returns If the function returns true the check was OK
     */
    public CheckXmldsigSignature(): PromiseLike<boolean> {
        return this.CheckSignature();
    }

    /**
     * Validate the XML representation of the signature against the XAdES and XMLDSIG schemas
     * @returns If the function returns true the check was OK
     */
    public ValidateAgainstSchema(): PromiseLike<boolean> {
        return Promise.resolve(true);
    }

    /**
     * Check to see if first XMLDSIG certificate has same hashvalue as first XAdES SignatureCertificate
     * @returns If the function returns true the check was OK
     */
    public CheckSameCertificate(): PromiseLike<boolean> {
        return new Promise((resolve, reject) => {

            let pkEnumerator = this.KeyInfo.GetEnumerator();

            // get X509 Certificate from Signature
            let sigCert: X509Certificate = null;
            for (let kic of pkEnumerator) {
                if (kic instanceof KeyInfoX509Data) {
                    sigCert = (kic as KeyInfoX509Data).Certificates[0];
                    break;
                }
            }

            if (!sigCert)
                throw new XmlError(XE.CRYPTOGRAPHIC, "XmlDSig Certificate is not found");

            // Get X509 Certificate from signed attributes 
            let xadesSigningCertificateCollection = this.XadesObject.QualifyingProperties.SignedProperties.SignedSignatureProperties.SigningCertificate;
            if (xadesSigningCertificateCollection.Count <= 0) {
                throw new XmlError(XE.CRYPTOGRAPHIC, "Certificate not found in SigningCertificate element while doing CheckSameCertificate()");
            }
            let attrCert = xadesSigningCertificateCollection.Item(0);
            let hashAlg = CryptoConfig.CreateHashAlgorithm(attrCert.CertDigest.DigestMethod);

            // Get hash of sigCert
            Application.crypto.subtle.digest(hashAlg.algorithm, sigCert.GetRawCertData())
                .then((hash: ArrayBuffer) => {
                    // compare cert hashes
                    // convert digest to Base64
                    let b64SigCert = Convert.ToBase64String(Convert.FromBufferString(hash));
                    let b64AttrCert = Convert.ToBase64String(Convert.FromBufferString(attrCert.CertDigest.DigestValue));
                    resolve(b64SigCert === b64AttrCert);
                }, reject);
        });
    }

    /**
     * Check if there is a HashDataInfo for each reference if there is a AllDataObjectsTimeStamp
     * @returns If the function returns true the check was OK
     */
    public CheckAllReferencesExistInAllDataObjectsTimeStamp(): PromiseLike<boolean> {
        return new Promise((resolve, reject) => {
            let allHashDataInfosExist = true;
            let allDataObjectsTimeStampCollection = this.XadesObject.QualifyingProperties.SignedProperties.SignedDataObjectProperties.AllDataObjectsTimeStampCollection;
            if (allDataObjectsTimeStampCollection.Count > 0) {
                for (let timeStampCounter = 0; allHashDataInfosExist && (timeStampCounter < allDataObjectsTimeStampCollection.Count); timeStampCounter++) {
                    let timeStamp = allDataObjectsTimeStampCollection.Item(timeStampCounter);
                    allHashDataInfosExist = this.CheckHashDataInfosForTimeStamp(timeStamp);
                }
                if (!allHashDataInfosExist) {
                    throw new XmlError(XE.CRYPTOGRAPHIC, "At least one HashDataInfo is missing in AllDataObjectsTimeStamp element");
                }
            }
            resolve(true);
        });
    }

    /**
     * Check if the HashDataInfo of each IndividualDataObjectsTimeStamp points to existing Reference
     * @returns If the function returns true the check was OK
     */
    public CheckAllHashDataInfosInIndividualDataObjectsTimeStamp(): PromiseLike<boolean> {
        return new Promise((resolve, reject) => {
            let hashDataInfoExists = true;

            let retVal = false;
            let individualDataObjectsTimeStampCollection = this.XadesObject.QualifyingProperties.SignedProperties.SignedDataObjectProperties.IndividualDataObjectsTimeStampCollection;
            if (individualDataObjectsTimeStampCollection.Count > 0) {
                for (let i = 0; hashDataInfoExists && (i < individualDataObjectsTimeStampCollection.Count); i++) {
                    let timeStamp = individualDataObjectsTimeStampCollection.Item(i);
                    hashDataInfoExists = this.CheckHashDataInfosExist(timeStamp);
                }
                if (hashDataInfoExists === false) {
                    throw new XmlError(XE.CRYPTOGRAPHIC, "At least one HashDataInfo is pointing to non-existing reference in IndividualDataObjectsTimeStamp element");
                }
            }
            resolve(retVal);
        });
    }

    /**
     * Perform XAdES checks on contained counter signatures.  If couter signature is XMLDSIG, only XMLDSIG check (CheckSignature()) is done.
     * @param {XadesCheckSignatureMasks} counterSignatureMask Check mask applied to counter signatures
     * @returns If the function returns true the check was OK
     */
    public CheckCounterSignatures(counterSignatureMask: XadesCheckSignatureMasks): PromiseLike<boolean> {
        return new Promise((resolve, reject) => {
            let retVal = true;
            let counterSignatureCollection = this.XadesObject.QualifyingProperties.UnsignedProperties.UnsignedSignatureProperties.CounterSignatureCollection;
            let promise = Promise.resolve(true);
            for (let i = 0; i < counterSignatureCollection.Count; i++) {
                let counterSignature = counterSignatureCollection.Item(i);
                // TODO: check if parent signature document is present in counterSignature (maybe a deep copy is required)
                if (counterSignature.signatureStandard === KnownSignatureStandard.Xades) {
                    promise = promise.then((v: boolean) => {
                        return !v ? Promise.resolve(v) : counterSignature.XadesCheckSignature(counterSignatureMask);
                    });
                }
                else {
                    promise = promise.then((v: boolean) => {
                        return !v ? Promise.resolve(v) : counterSignature.CheckSignature();
                    });
                }
            }

            promise.then((v: boolean) => {
                if (!v) {
                    throw new XmlError(XE.CRYPTOGRAPHIC, "XadesCheckSignature() failed on at least one counter signature");
                }
                return Promise.resolve(v);
            })
                .then(resolve, reject);
        });
    }

    /**
     * Counter signatures should all contain a reference to the parent signature SignatureValue element
     * @returns If the function returns true the check was OK
     */
    public CheckCounterSignaturesReference(): PromiseLike<boolean> {
        return new Promise((resolve, reject) => {
            let retVal = true;
            let parentSignatureValueChain: string[] = [];
            parentSignatureValueChain.push("#" + this.signatureValueId);
            let counterSignatureCollection = this.XadesObject.QualifyingProperties.UnsignedProperties.UnsignedSignatureProperties.CounterSignatureCollection;
            for (let i = 0; retVal && (i < counterSignatureCollection.Count); i++) {
                let counterSignature = counterSignatureCollection.Item(i);
                let referenceToParentSignatureFound = false;
                for (let j = 0; !referenceToParentSignatureFound && (j < counterSignature.SignedInfo.References.length); j++) {
                    let referenceUri = (counterSignature.SignedInfo.References[j]).Uri;
                    if (parentSignatureValueChain.indexOf(referenceUri) > -1) {
                        referenceToParentSignatureFound = true;
                    }
                    parentSignatureValueChain.push("#" + counterSignature.SignatureValueId);
                }
                retVal = referenceToParentSignatureFound;
                if (!retVal) {
                    throw new XmlError(XE.CRYPTOGRAPHIC, "CheckCounterSignaturesReference() failed on at least one counter signature");
                }
            }
            resolve(true);
        });
    }

    /**
     * Check if each ObjectReference in CommitmentTypeIndication points to Reference element
     * @returns If the function returns true the check was OK
     */
    public CheckObjectReferencesInCommitmentTypeIndication(): PromiseLike<boolean> {
        return new Promise((resolve, reject) => {
            let retVal = true;
            let commitmentTypeIndicationCollection = this.XadesObject.QualifyingProperties.SignedProperties.SignedDataObjectProperties.CommitmentTypeIndicationCollection;
            if (commitmentTypeIndicationCollection.Count > 0) {
                for (let i = 0; retVal && (i < commitmentTypeIndicationCollection.Count); i++) {
                    let commitmentTypeIndication = commitmentTypeIndicationCollection.Item(i);
                    let objectReferenceOK = true;
                    for (let objectReference of commitmentTypeIndication.ObjectReferenceCollection.GetIterator()) {
                        objectReferenceOK = this.CheckObjectReference(objectReference);
                        if (!objectReferenceOK)
                            break;
                    }
                    retVal = objectReferenceOK;
                    if (!retVal) {
                        throw new XmlError(XE.CRYPTOGRAPHIC, "At least one ObjectReference in CommitmentTypeIndication did not point to a Reference");
                    }
                }
            }
            resolve(retVal);
        });
    }

    /**
     * Check if at least ClaimedRoles or CertifiedRoles present in SignerRole
     * @returns If the function returns true the check was OK
     */
    public CheckIfClaimedRolesOrCertifiedRolesPresentInSignerRole(): PromiseLike<boolean> {
        return new Promise((resolve, reject) => {
            let retVal = false;
            let signerRole = this.XadesObject.QualifyingProperties.SignedProperties.SignedSignatureProperties.SignerRole;
            if (signerRole) {
                if (signerRole.CertifiedRoles) {
                    retVal = (signerRole.CertifiedRoles.Count > 0);
                }
                if (retVal === false) {
                    if (signerRole.ClaimedRoles) {
                        retVal = (signerRole.ClaimedRoles.Count > 0);
                    }
                }
                if (retVal === false) {
                    throw new XmlError(XE.CRYPTOGRAPHIC, "SignerRole element must contain at least one CertifiedRole or ClaimedRole element");
                }
            }
            else {
                retVal = true;
            }
            resolve(retVal);
        });
    }

    /**
     * Check if HashDataInfo of SignatureTimeStamp points to SignatureValue
     * @returns If the function returns true the check was OK
     */
    public CheckHashDataInfoOfSignatureTimeStampPointsToSignatureValue(): PromiseLike<boolean> {
        return new Promise((resolve, reject) => {
            let hashDataInfoPointsToSignatureValue = true;
            let retVal = false;
            let signatureTimeStampCollection = this.XadesObject.QualifyingProperties.UnsignedProperties.UnsignedSignatureProperties.SignatureTimeStampCollection;
            if (signatureTimeStampCollection.Count > 0) {
                for (let i = 0; hashDataInfoPointsToSignatureValue && (i < signatureTimeStampCollection.Count); i++) {
                    let timeStamp = signatureTimeStampCollection.Item(i);
                    hashDataInfoPointsToSignatureValue = this.CheckHashDataInfoPointsToSignatureValue(timeStamp);
                }
                if (!hashDataInfoPointsToSignatureValue) {
                    throw new XmlError(XE.CRYPTOGRAPHIC, "HashDataInfo of SignatureTimeStamp doesn't point to signature value element");
                }
            }
            resolve(true);
        });
    }

    /**
     * Check SignatureTimeStamp
     * @returns If the function returns true the check was OK
     */
    public CheckSignatureTimeStamp(): PromiseLike<boolean> {
        return new Promise((resolve, reject) => {
            let retVal = false;
            let signatureTimeStampCollection = this.XadesObject.QualifyingProperties.UnsignedProperties.UnsignedSignatureProperties.SignatureTimeStampCollection;

            let chain = Promise.resolve(true);
            for (let i = 0; i < signatureTimeStampCollection.Count; i++) {
                let timeStamp = signatureTimeStampCollection.Item(i);
                chain = chain.then((v: boolean) => {
                    if (v) {
                        return timeStamp.Verify();
                    }
                    else
                        throw new XmlError(XE.CRYPTOGRAPHIC, "SignatureTimeStamp is not valid");
                });
            }
            chain = chain
                .then((v: boolean) => {
                    console.log("CheckSignatureTimeStamp", v);
                    resolve(v);
                })
                .catch(reject);
        });
    }

    /**
     * Check if the QualifyingProperties Target attribute points to the signature element
     * @returns If the function returns true the check was OK
     */
    public CheckQualifyingPropertiesTarget(): PromiseLike<boolean> {
        return new Promise((resolve, reject) => {
            let retVal = true;
            let qualifyingPropertiesTarget = this.XadesObject.QualifyingProperties.Target;
            if (this.Signature.Id == null) {
                retVal = false;
            }
            else {
                if (qualifyingPropertiesTarget !== ("#" + this.Signature.Id)) {
                    retVal = false;
                }
            }
            if (!retVal) {
                throw new XmlError(XE.CRYPTOGRAPHIC, "Qualifying properties target doesn't point to signature element or signature element doesn't have an Id");
            }
            resolve(retVal);
        });
    }

    /**
     * Check that QualifyingProperties occur in one Object, check that there is only one QualifyingProperties and that signed properties occur in one QualifyingProperties element
     * @returns If the function returns true the check was OK
     */
    public CheckQualifyingProperties(): PromiseLike<boolean> {
        return new Promise((resolve, reject) => {
            let signatureElement = this.GetXml();
            let xmlNodeList = signatureElement.getElementsByTagNameNS(XmlXades.NamespaceURI, XmlXades.ElementNames.QualifyingProperties);
            if (xmlNodeList.length > 1) {
                throw new XmlError(XE.CRYPTOGRAPHIC, "More than one Object contains a QualifyingProperties element");
            }
            resolve(true);
        });
    }

    protected CheckTimeStampHashDataInfos(collection: Collection<TimeStamp>, fn: (ts: TimeStamp) => boolean): PromiseLike<boolean> {
        return new Promise((resolve, reject) => {
            let retVal = true;
            if (collection.Count > 0) {
                let allRequiredhashDataInfosFound = true;
                for (let i = 0; allRequiredhashDataInfosFound && (i < collection.Count); i++) {
                    let timeStamp = collection.Item(i);
                    allRequiredhashDataInfosFound = fn.call(this, timeStamp);
                }
                if (!allRequiredhashDataInfosFound) {
                    throw new XmlError(XE.CRYPTOGRAPHIC, "At least one required HashDataInfo is missing in a " + (collection.constructor as any).name + " element");
                }
            }
            resolve(retVal);
        });
    }

    /**
     * Check if all required HashDataInfos are present on SigAndRefsTimeStamp
     * @returns If the function returns true the check was OK
     */
    public CheckSigAndRefsTimeStampHashDataInfos(): PromiseLike<boolean> {
        return this.CheckTimeStampHashDataInfos(this.XadesObject.QualifyingProperties.UnsignedProperties.UnsignedSignatureProperties.SigAndRefsTimeStampCollection, this.CheckHashDataInfosOfSigAndRefsTimeStamp);
    }

    /**
     * Check if all required HashDataInfos are present on RefsOnlyTimeStamp
     * @returns If the function returns true the check was OK
     */
    public CheckRefsOnlyTimeStampHashDataInfos(): PromiseLike<boolean> {
        return this.CheckTimeStampHashDataInfos(this.XadesObject.QualifyingProperties.UnsignedProperties.UnsignedSignatureProperties.RefsOnlyTimeStampCollection, this.CheckHashDataInfosOfRefsOnlyTimeStamp);
    }

    /**
     * Check if all required HashDataInfos are present on ArchiveTimeStamp
     * @returns If the function returns true the check was OK
     */
    public CheckArchiveTimeStampHashDataInfos(): PromiseLike<boolean> {
        return this.CheckTimeStampHashDataInfos(this.XadesObject.QualifyingProperties.UnsignedProperties.UnsignedSignatureProperties.ArchiveTimeStampCollection, this.CheckHashDataInfosOfArchiveTimeStamp);
    }

    /**
     * Check if a XAdES-C signature is also a XAdES-T signature
     * @returns If the function returns true the check was OK
     */
    public CheckXadesCIsXadesT(): PromiseLike<boolean> {
        return new Promise((promise, resolve) => {
            let retVal = true;
            let unsignedSignatureProperties = this.XadesObject.QualifyingProperties.UnsignedProperties.UnsignedSignatureProperties;
            if (((unsignedSignatureProperties.CompleteCertificateRefs) && (unsignedSignatureProperties.CompleteCertificateRefs.HasChanged()))
                || ((unsignedSignatureProperties.CompleteCertificateRefs) && (unsignedSignatureProperties.CompleteCertificateRefs.HasChanged()))) {
                if (!unsignedSignatureProperties.SignatureTimeStampCollection.Count) {
                    throw new XmlError(XE.CRYPTOGRAPHIC, "XAdES-C signature should also contain a SignatureTimeStamp element");
                }
            }
            resolve(retVal);
        });
    }

    /**
     * Check if a XAdES-XL signature is also a XAdES-X signature
     * @returns If the function returns true the check was OK
     */
    public CheckXadesXLIsXadesX(): PromiseLike<boolean> {
        return new Promise((resolve, reject) => {
            let retVal = true;
            let unsignedSignatureProperties = this.XadesObject.QualifyingProperties.UnsignedProperties.UnsignedSignatureProperties;
            if (((unsignedSignatureProperties.CertificateValues) && (unsignedSignatureProperties.CertificateValues.HasChanged()))
                || ((unsignedSignatureProperties.RevocationValues) && (unsignedSignatureProperties.RevocationValues.HasChanged()))) {
                if ((unsignedSignatureProperties.SigAndRefsTimeStampCollection.Count) && (unsignedSignatureProperties.RefsOnlyTimeStampCollection.Count)) {
                    throw new XmlError(XE.CRYPTOGRAPHIC, "XAdES-XL signature should also contain a XAdES-X element");
                }
            }
            resolve(retVal);
        });
    }

    /**
     * Check if CertificateValues match CertificateRefs
     * @returns If the function returns true the check was OK
     */
    public CheckCertificateValuesMatchCertificateRefs(): PromiseLike<boolean> {
        return new Promise((resolve, reject) => {
            // TODO: Similar test should be done for XML based (Other) certificates, but as the check needed is not known, there is no implementation
            let retVal = true;
            let unsignedSignatureProperties = this.XadesObject.QualifyingProperties.UnsignedProperties.UnsignedSignatureProperties;
            let promise = Promise.resolve(retVal);
            if (unsignedSignatureProperties.CompleteCertificateRefs && unsignedSignatureProperties.CompleteCertificateRefs.CertRefs &&
                unsignedSignatureProperties.CertificateValues) {
                let certDigests: { items: string[] } = { items: [] };
                for (let cert of unsignedSignatureProperties.CompleteCertificateRefs.CertRefs.GetIterator()) {
                    certDigests.items.push(Convert.ToBase64String(Convert.FromBufferString(cert.CertDigest.DigestValue)));
                }
                certDigests.items.sort();
                for (let encapsulatedX509Certificate of unsignedSignatureProperties.CertificateValues.EncapsulatedX509CertificateCollection.GetIterator()) {
                    promise = promise.then(() => {
                        return Application.crypto.subtle.digest({ name: "SHA-1" }, encapsulatedX509Certificate.PkiData);
                    })
                        .then((digest: ArrayBuffer) => {
                            let certDigest = Convert.ToBase64String(Convert.FromBufferString(new Uint8Array(digest)));
                            // Remove certDigest from CertDigests 
                            certDigests.items = certDigests.items.filter((value) => {
                                if (value !== certDigest)
                                    return true;
                            });
                            return Promise.resolve();
                        });
                }
                promise = promise.then(() => {
                    if (!certDigests.items.length) {
                        throw new XmlError(XE.CRYPTOGRAPHIC, "Not all CertificateRefs correspond to CertificateValues");
                    }
                    return Promise.resolve(true);
                });
            }
            promise.then(resolve, reject);
        });
    }

    /**
     * Check if RevocationValues match RevocationRefs
     * @returns If the function returns true the check was OK
     */
    public CheckRevocationValuesMatchRevocationRefs(): PromiseLike<boolean> {
        return new Promise((resolve, reject) => {
            // TODO: Similar test should be done for XML based (Other) revocation information and OCSP responses, but to keep the library independent of these technologies, this test is left to appliactions using the library
            let retVal = true;
            let unsignedSignatureProperties = this.XadesObject.QualifyingProperties.UnsignedProperties.UnsignedSignatureProperties;
            let promise = Promise.resolve(retVal);
            if (unsignedSignatureProperties.CompleteRevocationRefs && unsignedSignatureProperties.CompleteRevocationRefs.CRLRefs &&
                unsignedSignatureProperties.RevocationValues) {
                let crlDigests: { items: string[] } = { items: [] };
                for (let crlRef of unsignedSignatureProperties.CompleteRevocationRefs.CRLRefs.GetIterator()) {
                    crlDigests.items.push(Convert.ToBase64String(Convert.FromBufferString(crlRef.CertDigest.DigestValue)));
                }
                crlDigests.items.sort();
                for (let crlValue of unsignedSignatureProperties.RevocationValues.CRLValues.GetIterator()) {
                    promise = promise.then(() => {
                        return Application.crypto.subtle.digest({ name: "SHA-1" }, encapsulatedX509Certificate.PkiData);
                    })
                        .then((digest: ArrayBuffer) => {
                            let crlDigest = Convert.ToBase64String(Convert.FromBufferString(new Uint8Array(digest)));
                            // Remove certDigest from CertDigests 
                            crlDigests.items = crlDigests.items.filter((value) => {
                                if (value !== crlDigest)
                                    return true;
                            });
                            return Promise.resolve();
                        });
                }
                promise = promise.then(() => {
                    if (!crlDigests.items.length) {
                        throw new XmlError(XE.CRYPTOGRAPHIC, "Not all RevocationRefs correspond to RevocationValues");
                    }
                    return Promise.resolve(true);
                });
            }
            promise.then(resolve, reject);
        });
    }

    private CheckTimeStamp(): PromiseLike<boolean> {
        return new Promise((resolve, reject) => {

        });
    }

    // Fix to add a namespace prefix for all XmlDsig nodes

    private SetPrefix(prefix: string, node: Node): void {
        console.warn("SetPrefix: Function doesn't work correctly for browser");
        if (node.namespaceURI === XmlSignature.NamespaceURI) {
            node.prefix = prefix;
        }

        for (let i = 0; i < node.childNodes.length; i++) {
            this.SetPrefix(prefix, node.childNodes[i]);
        }

        return;
    }

    /**
     * Copy of System.Security.Cryptography.Xml.SignedXml.ComputeSignature() which will end up calling
     * our own GetC14NDigest with a namespace prefix for all XmlDsig nodes
     */
    public ComputeSignature(algorithm: Algorithm): void {
        return super.ComputeSignature(algorithm);
    }

    /**
     * Copy of System.Security.Cryptography.Xml.SignedXml.BuildDigestedReferences() which will add a "ds" 
     * namespace prefix to all XmlDsig nodes
     */
    private BuildDigestedReferences(): void {
        console.warn("BuildDigestedReferences not implemented");
    }

    /**
     * We won't call System.Security.Cryptography.Xml.SignedXml.GetC14NDigest(), as we want to use our own.
     */
    private GetC14NDigest(hash: HashAlgorithm): Uint8Array;
    /**
     * Copy of System.Security.Cryptography.Xml.SignedXml.GetC14NDigest() which will add a
     * namespace prefix to all XmlDsig nodes
     */
    private GetC14NDigest(hash: HashAlgorithm, prefix?: string): Uint8Array {
        if (!prefix)
            return null;
        // Type SignedXml_Type = typeof (SignedXml);
        // FieldInfo SignedXml_bCacheValid = SignedXml_Type.GetField("bCacheValid", BindingFlags.NonPublic | BindingFlags.Instance);
        // bool bCacheValid = (bool)SignedXml_bCacheValid.GetValue(this);
        // Type SignedInfo_Type = typeof (SignedInfo);
        // PropertyInfo SignedInfo_CacheValid = SignedInfo_Type.GetProperty("CacheValid", BindingFlags.NonPublic | BindingFlags.Instance);
        // bool CacheValid = (bool)SignedInfo_CacheValid.GetValue(this.SignedInfo, null);

        // FieldInfo SignedXml__digestedSignedInfo = SignedXml_Type.GetField("_digestedSignedInfo", BindingFlags.NonPublic | BindingFlags.Instance);

        // if (!bCacheValid || !CacheValid) {
        //     //
        //     //string securityUrl = (this.m_containingDocument == null) ? null : this.m_containingDocument.BaseURI;
        //     FieldInfo SignedXml_m_containingDocument = SignedXml_Type.GetField("m_containingDocument", BindingFlags.NonPublic | BindingFlags.Instance);
        //     XmlDocument m_containingDocument = (XmlDocument)SignedXml_m_containingDocument.GetValue(this);
        //     string securityUrl = (m_containingDocument == null) ? null : m_containingDocument.BaseURI;
        //     //

        //     //XmlResolver xmlResolver = this.m_bResolverSet ? this.m_xmlResolver : new XmlSecureResolver(new XmlUrlResolver(), securityUrl);
        //     FieldInfo SignedXml_m_bResolverSet = SignedXml_Type.GetField("m_bResolverSet", BindingFlags.NonPublic | BindingFlags.Instance);
        //     bool m_bResolverSet = (bool)SignedXml_m_bResolverSet.GetValue(this);
        //     FieldInfo SignedXml_m_xmlResolver = SignedXml_Type.GetField("m_xmlResolver", BindingFlags.NonPublic | BindingFlags.Instance);
        //     XmlResolver m_xmlResolver = (XmlResolver)SignedXml_m_xmlResolver.GetValue(this);
        //     XmlResolver xmlResolver = m_bResolverSet ? m_xmlResolver : new XmlSecureResolver(new XmlUrlResolver(), securityUrl);
        //     //

        //     //XmlDocument document = Utils.PreProcessElementInput(this.SignedInfo.GetXml(), xmlResolver, securityUrl);
        //     Assembly System_Security_Assembly = Assembly.Load("System.Security, Version=2.0.0.0, Culture=neutral, PublicKeyToken=b03f5f7f11d50a3a");
        //     Type Utils_Type = System_Security_Assembly.GetType("System.Security.Cryptography.Xml.Utils");
        //     MethodInfo Utils_PreProcessElementInput = Utils_Type.GetMethod("PreProcessElementInput", BindingFlags.NonPublic | BindingFlags.Static);
        //     XmlElement xml = this.SignedInfo.GetXml();
        //     SetPrefix(prefix, xml); // <---
        //     XmlDocument document = (XmlDocument)Utils_PreProcessElementInput.Invoke(null, new object[] { xml, xmlResolver, securityUrl });
        //     //

        //     //CanonicalXmlNodeList namespaces = (this.m_context == null) ? null : Utils.GetPropagatedAttributes(this.m_context);
        //     FieldInfo SignedXml_m_context = SignedXml_Type.GetField("m_context", BindingFlags.NonPublic | BindingFlags.Instance);
        //     MethodInfo Utils_GetPropagatedAttributes = Utils_Type.GetMethod("GetPropagatedAttributes", BindingFlags.NonPublic | BindingFlags.Static);
        //     object m_context = SignedXml_m_context.GetValue(this);
        //     object namespaces = (m_context == null) ? null : Utils_GetPropagatedAttributes.Invoke(null, new object[] { m_context });
        //     //

        //     // Utils.AddNamespaces(document.DocumentElement, namespaces);
        //     Type CanonicalXmlNodeList_Type = System_Security_Assembly.GetType("System.Security.Cryptography.Xml.CanonicalXmlNodeList");
        //     MethodInfo Utils_AddNamespaces = Utils_Type.GetMethod("AddNamespaces", BindingFlags.NonPublic | BindingFlags.Static, null, new Type[] { typeof(XmlElement), CanonicalXmlNodeList_Type }, null);
        //     Utils_AddNamespaces.Invoke(null, new object[] { document.DocumentElement, namespaces });
        //     //

        //     //Transform canonicalizationMethodObject = this.SignedInfo.CanonicalizationMethodObject;
        //     System.Security.Cryptography.Xml.Transform canonicalizationMethodObject = this.SignedInfo.CanonicalizationMethodObject;
        //     //

        //     canonicalizationMethodObject.Resolver = xmlResolver;

        //     //canonicalizationMethodObject.BaseURI = securityUrl;
        //     Type Transform_Type = typeof (System.Security.Cryptography.Xml.Transform);
        //     PropertyInfo Transform_BaseURI = Transform_Type.GetProperty("BaseURI", BindingFlags.NonPublic | BindingFlags.Instance);
        //     Transform_BaseURI.SetValue(canonicalizationMethodObject, securityUrl, null);
        //     //

        //     canonicalizationMethodObject.LoadInput(document);

        //     //this._digestedSignedInfo = canonicalizationMethodObject.GetDigestedOutput(hash);
        //     SignedXml__digestedSignedInfo.SetValue(this, canonicalizationMethodObject.GetDigestedOutput(hash));
        //     //

        //     //this.bCacheValid = true;
        //     SignedXml_bCacheValid.SetValue(this, true);
        //     //
        // }

        // return this._digestedSignedInfo;
        //  _digestedSignedInfo: Uint8Array = SignedXml__digestedSignedInfo.GetValue(this);
        // return _digestedSignedInfo;
        //

        return null;
    }



    // Private methods

    private GetXadesObjectElement(signatureElement: Element): Element {
        let retVal: Element = null;

        let xmlNodeList = signatureElement.getElementsByTagNameNS(XmlXades.NamespaceURI, XmlXades.ElementNames.QualifyingProperties);
        if (xmlNodeList.length) {
            retVal = xmlNodeList.item(0).parentNode as Element;
        }
        else {
            retVal = null;
        }

        return retVal;
    }

    private SetSignatureStandard(signatureElement: Element): void {
        if (this.GetXadesObjectElement(signatureElement)) {
            this.signatureStandard = KnownSignatureStandard.Xades;
        }
        else {
            this.signatureStandard = KnownSignatureStandard.XmlDsig;
        }
    }

    private GetXadesDataObject(): DataObject {
        let retVal: DataObject = null;

        for (let i = 0; i < (this.Signature.ObjectList.length); i++) {
            let dataObject = this.Signature.ObjectList[i];
            let dataObjectXmlElement = dataObject.GetXml();
            let xmlNodeList = dataObjectXmlElement.getElementsByTagNameNS(XmlXades.NamespaceURI, XmlXades.ElementNames.QualifyingProperties);
            if (xmlNodeList.length) {
                retVal = dataObject;
                break;
            }
        }

        return retVal;
    }

    private CheckHashDataInfosForTimeStamp(timeStamp: TimeStamp): boolean {
        let retVal = true;

        for (let referenceCounter = 0; retVal === true && (referenceCounter < this.SignedInfo.References.length); referenceCounter++) {
            let referenceId = (<Reference>this.SignedInfo.References[referenceCounter]).Id;
            let referenceUri = (<Reference>this.SignedInfo.References[referenceCounter]).Uri;
            if (referenceUri !== ("#" + this.XadesObject.QualifyingProperties.SignedProperties.Id)) {
                let hashDataInfoFound = false;
                for (let hashDataInfoCounter = 0; hashDataInfoFound === false && (hashDataInfoCounter < timeStamp.HashDataInfoCollection.Count); hashDataInfoCounter++) {
                    let hashDataInfo = timeStamp.HashDataInfoCollection.Item(hashDataInfoCounter);
                    hashDataInfoFound = (("#" + referenceId) === hashDataInfo.Uri);
                }
                retVal = hashDataInfoFound;
            }
        }

        return retVal;
    }

    private CheckHashDataInfosExist(timeStamp: TimeStamp): boolean {
        let retVal = true;
        for (let i = 0; retVal === true && (i < timeStamp.HashDataInfoCollection.Count); i++) {
            let hashDataInfo = timeStamp.HashDataInfoCollection.Item(i);
            let referenceFound = false;

            for (let j = 0; referenceFound === false && (j < this.SignedInfo.References.length); j++) {
                let referenceId = (this.SignedInfo.References[j]).Id;
                if (("#" + referenceId) === hashDataInfo.Uri) {
                    referenceFound = true;
                }
            }
            retVal = referenceFound;
        }

        return retVal;
    }


    private CheckObjectReference(objectReference: ObjectReference): boolean {
        let retVal = false;

        for (let i = 0; !retVal && (i < this.SignedInfo.References.length); i++) {
            let referenceId = this.SignedInfo.References[i].Id;
            if ((`#${referenceId}`) === objectReference.Uri) {
                retVal = true;
            }
        }

        return retVal;
    }

    private CheckHashDataInfoPointsToSignatureValue(timeStamp: TimeStamp): boolean {
        let retVal = true;

        for (let hashDataInfo of timeStamp.HashDataInfoCollection.GetIterator()) {
            retVal = (hashDataInfo.Uri === (`#${this.signatureValueId}`));
            if (!retVal)
                return false;
        }

        return retVal;
    }

    private CheckHashDataInfosOfSigAndRefsTimeStamp(timeStamp: TimeStamp): boolean {
        let signatureValueHashDataInfoFound = false;
        let allSignatureTimeStampHashDataInfosFound = false;
        let completeCertificateRefsHashDataInfoFound = false;
        let completeRevocationRefsHashDataInfoFound = false;
        let retVal = true;
        let signatureTimeStampIds: string[] = [];
        let unsignedSignatureProperties = this.XadesObject.QualifyingProperties.UnsignedProperties.UnsignedSignatureProperties;

        for (let signatureTimeStamp of unsignedSignatureProperties.SignatureTimeStampCollection.GetIterator()) {
            signatureTimeStampIds.push(`#${signatureTimeStamp.EncapsulatedTimeStamp.Id}`);
        }
        signatureTimeStampIds.sort();
        for (let hashDataInfo of timeStamp.HashDataInfoCollection.GetIterator()) {
            if (hashDataInfo.Uri === `#${this.signatureValueId}`) {
                signatureValueHashDataInfoFound = true;
            }
            let signatureTimeStampIdIndex = signatureTimeStampIds.indexOf(hashDataInfo.Uri);
            if (signatureTimeStampIdIndex >= 0) {
                // remove item by index
                signatureTimeStampIds = signatureTimeStampIds.filter((item, index) => {
                    return index !== signatureTimeStampIdIndex;
                });
            }
            if (hashDataInfo.Uri === `#${unsignedSignatureProperties.CompleteCertificateRefs.Id}`) {
                completeCertificateRefsHashDataInfoFound = true;
            }
            if (hashDataInfo.Uri === `#${unsignedSignatureProperties.CompleteRevocationRefs.Id}`) {
                completeRevocationRefsHashDataInfoFound = true;
            }
        }
        if (!signatureTimeStampIds.length) {
            allSignatureTimeStampHashDataInfosFound = true;
        }
        retVal = signatureValueHashDataInfoFound && allSignatureTimeStampHashDataInfosFound && completeCertificateRefsHashDataInfoFound && completeRevocationRefsHashDataInfoFound;

        return retVal;
    }

    private CheckHashDataInfosOfRefsOnlyTimeStamp(timeStamp: TimeStamp): boolean {
        let completeCertificateRefsHashDataInfoFound = false;
        let completeRevocationRefsHashDataInfoFound = false;
        let retVal = true;

        let unsignedSignatureProperties = this.XadesObject.QualifyingProperties.UnsignedProperties.UnsignedSignatureProperties;
        for (let hashDataInfo of timeStamp.HashDataInfoCollection.GetIterator()) {
            if (hashDataInfo.Uri === `#${unsignedSignatureProperties.CompleteCertificateRefs.Id}`) {
                completeCertificateRefsHashDataInfoFound = true;
            }
            if (hashDataInfo.Uri === `#${unsignedSignatureProperties.CompleteRevocationRefs.Id}`) {
                completeRevocationRefsHashDataInfoFound = true;
            }
        }
        retVal = completeCertificateRefsHashDataInfoFound && completeRevocationRefsHashDataInfoFound;

        return retVal;
    }

    private CheckHashDataInfosOfArchiveTimeStamp(timeStamp: TimeStamp): boolean {
        let allReferenceHashDataInfosFound = false;
        let signedInfoHashDataInfoFound = false;
        let signedPropertiesHashDataInfoFound = false;
        let signatureValueHashDataInfoFound = false;
        let allSignatureTimeStampHashDataInfosFound = false;
        let completeCertificateRefsHashDataInfoFound = false;
        let completeRevocationRefsHashDataInfoFound = false;
        let certificatesValuesHashDataInfoFound = false;
        let revocationValuesHashDataInfoFound = false;
        let allSigAndRefsTimeStampHashDataInfosFound = false;
        let allRefsOnlyTimeStampHashDataInfosFound = false;
        let allArchiveTimeStampHashDataInfosFound = false;
        let allOlderArchiveTimeStampsFound = false;

        let retVal = true;

        let referenceIds: string[] = [];
        let signatureTimeStampIds: string[] = [];
        let sigAndRefsTimeStampIds: string[] = [];
        let refsOnlyTimeStampIds: string[] = [];
        let archiveTimeStampIds: string[] = [];


        let unsignedSignatureProperties = this.XadesObject.QualifyingProperties.UnsignedProperties.UnsignedSignatureProperties;
        let signedProperties = this.XadesObject.QualifyingProperties.SignedProperties;

        for (let reference of this.Signature.SignedInfo.References) {
            if (reference.Uri !== `#${signedProperties.Id}`) {
                referenceIds.push(reference.Uri);
            }
        }
        referenceIds.sort();
        for (let signatureTimeStamp of unsignedSignatureProperties.SignatureTimeStampCollection.GetIterator()) {
            signatureTimeStampIds.push(`#${signatureTimeStamp.EncapsulatedTimeStamp.Id}`);
        }
        signatureTimeStampIds.sort();
        for (let sigAndRefsTimeStamp of unsignedSignatureProperties.SigAndRefsTimeStampCollection.GetIterator()) {
            sigAndRefsTimeStampIds.push(`#${sigAndRefsTimeStamp.EncapsulatedTimeStamp.Id}`);
        }
        sigAndRefsTimeStampIds.sort();
        for (let refsOnlyTimeStamp of unsignedSignatureProperties.RefsOnlyTimeStampCollection.GetIterator()) {
            refsOnlyTimeStampIds.push(`#${refsOnlyTimeStamp.EncapsulatedTimeStamp.Id}`);
        }
        refsOnlyTimeStampIds.sort();
        allOlderArchiveTimeStampsFound = false;
        for (let i = 0; !allOlderArchiveTimeStampsFound && (i < unsignedSignatureProperties.ArchiveTimeStampCollection.Count); i++) {
            let archiveTimeStamp = unsignedSignatureProperties.ArchiveTimeStampCollection.Item(i);
            if (archiveTimeStamp.EncapsulatedTimeStamp.Id === timeStamp.EncapsulatedTimeStamp.Id) {
                allOlderArchiveTimeStampsFound = true;
            }
            else {
                archiveTimeStampIds.push(`#${archiveTimeStamp.EncapsulatedTimeStamp.Id}`);
            }
        }

        archiveTimeStampIds.sort();
        for (let hashDataInfo of timeStamp.HashDataInfoCollection.GetIterator()) {
            let index = referenceIds.indexOf(hashDataInfo.Uri);
            if (index >= 0) {
                // remove at index
                referenceIds = referenceIds.filter((item, _index) => {
                    return _index !== index;
                });
            }
            if (hashDataInfo.Uri === `#${this.signedInfoIdBuffer}`) {
                signedInfoHashDataInfoFound = true;
            }
            if (hashDataInfo.Uri === `#${signedProperties.Id}`) {
                signedPropertiesHashDataInfoFound = true;
            }
            if (hashDataInfo.Uri === `#${this.signatureValueId}`) {
                signatureValueHashDataInfoFound = true;
            }
            index = signatureTimeStampIds.indexOf(hashDataInfo.Uri);
            if (index >= 0) {
                // remove at index
                signatureTimeStampIds = signatureTimeStampIds.filter((utem, _index) => {
                    return _index !== index;
                });
            }
            if (hashDataInfo.Uri === `#${unsignedSignatureProperties.CompleteCertificateRefs.Id}`) {
                completeCertificateRefsHashDataInfoFound = true;
            }
            if (hashDataInfo.Uri === `#${unsignedSignatureProperties.CompleteRevocationRefs.Id}`) {
                completeRevocationRefsHashDataInfoFound = true;
            }
            if (hashDataInfo.Uri === `#${unsignedSignatureProperties.CertificateValues.Id}`) {
                certificatesValuesHashDataInfoFound = true;
            }
            if (hashDataInfo.Uri === `#${unsignedSignatureProperties.RevocationValues.Id}`) {
                revocationValuesHashDataInfoFound = true;
            }
            index = sigAndRefsTimeStampIds.indexOf(hashDataInfo.Uri);
            if (index >= 0) {
                sigAndRefsTimeStampIds = sigAndRefsTimeStampIds.filter((item, _index) => {
                    return _index !== index;
                });
            }
            index = refsOnlyTimeStampIds.indexOf(hashDataInfo.Uri);
            if (index >= 0) {
                refsOnlyTimeStampIds = refsOnlyTimeStampIds.filter((item, _index) => {
                    return _index !== index;
                });
            }
            index = archiveTimeStampIds.indexOf(hashDataInfo.Uri);
            if (index >= 0) {
                archiveTimeStampIds = archiveTimeStampIds.filter((item, _index) => {
                    return _index !== index;
                });
            }
        }
        if (!referenceIds.length) {
            allReferenceHashDataInfosFound = true;
        }
        if (!signatureTimeStampIds.length) {
            allSignatureTimeStampHashDataInfosFound = true;
        }
        if (!sigAndRefsTimeStampIds.length) {
            allSigAndRefsTimeStampHashDataInfosFound = true;
        }
        if (!refsOnlyTimeStampIds.length) {
            allRefsOnlyTimeStampHashDataInfosFound = true;
        }
        if (!archiveTimeStampIds.length) {
            allArchiveTimeStampHashDataInfosFound = true;
        }

        retVal = allReferenceHashDataInfosFound && signedInfoHashDataInfoFound && signedPropertiesHashDataInfoFound &&
            signatureValueHashDataInfoFound && allSignatureTimeStampHashDataInfosFound && completeCertificateRefsHashDataInfoFound &&
            completeRevocationRefsHashDataInfoFound && certificatesValuesHashDataInfoFound && revocationValuesHashDataInfoFound &&
            allSigAndRefsTimeStampHashDataInfosFound && allRefsOnlyTimeStampHashDataInfosFound && allArchiveTimeStampHashDataInfosFound;

        return retVal;
    }

}
