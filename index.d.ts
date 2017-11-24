import * as XmlCore from "xml-core";
import * as XmlDSigJs from "xmldsigjs";

declare namespace XAdES {

    //#region xml-core helpers

    export const Select: XmlCore.SelectNodes;
    export const Convert: XmlCore.Convert;
    export function Parse(xmlString: string): Document;

    export class Application extends XmlDSigJs.Application { }

    //#endregion

    //#region signed_xml

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
        qualifier: xml.IdentifierQualifier;
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
        policy?: OptionsPolicyId;
        productionPlace?: OptionsProductionPlace;
        signerRole?: OptionsSignerRole;
    }
    export class SignedXml extends XmlDSigJs.SignedXml {
        public readonly Properties: XAdES.xml.QualifyingProperties | null;
        public readonly SignedProperties: XAdES.xml.SignedProperties;
        public readonly UnsignedProperties: XAdES.xml.UnsignedProperties;
        protected properties: XAdES.xml.QualifyingProperties | null;
        constructor(node?: Document | Element);
        public LoadXml(value: Element | string): void;
        public Sign(algorithm: Algorithm, key: CryptoKey, data: Document, options?: OptionsXAdES): PromiseLike<XmlDSigJs.Signature>;
        protected CreateQualyingProperties(): void;
        protected ApplySignOptions(signature: XmlDSigJs.Signature, algorithm: Algorithm, key: CryptoKey, options: OptionsXAdES): Promise<void>;
        protected ApplySigningCertificate(base64string?: string): Promise<void>;
        protected ApplySignaturePolicyIdentifier(options?: OptionsPolicyId): void;
        protected ApplySignatureProductionPlace(options?: OptionsProductionPlace): void;
        protected ApplySignerRoles(options?: OptionsSignerRole): void;
        protected VerifySigningCertificate(): Promise<XmlDSigJs.X509Certificate | null>;
    }

    //#endregion

}

declare namespace XAdES.xml {

    //#region any

    export class Any extends XadesObject {
        public Value: string;
    }

    export class AnyCollection extends XadesCollection<XadesObject> { }

    //#endregion

    //#region certificate_values

    export class OtherCertificate extends Any {
    }
    export class OtherCertificateCollection extends XadesCollection<OtherCertificate> {
    }
    export class EncapsulatedX509Certificate extends EncapsulatedPKIData {
    }
    export class EncapsulatedX509CertificateCollection extends XadesCollection<EncapsulatedX509Certificate> {
    }
    export class CertificateValues extends XadesObject {
        public Id: string;
        public EncapsulatedX509Certificates: EncapsulatedX509CertificateCollection;
        public OtherCertificates: OtherCertificateCollection;
    }

    //#endregion

    //#region commitment_type_indication

    export class CommitmentTypeQualifier extends Any {
    }
    export class CommitmentTypeQualifiers extends XadesCollection<CommitmentTypeQualifier> {
    }
    export class ObjectReference extends XadesObject {
        public Value: string;
    }
    export class ObjectReferenceCollection extends XadesCollection<ObjectReference> {
    }
    export class CommitmentTypeIndication extends XadesObject {
        public CommitmentTypeId: ObjectIdentifier;
        public ObjectReference: ObjectReferenceCollection;
        public AllSignedDataObjects: boolean;
        public CommitmentTypeQualifiers: CommitmentTypeQualifiers;
    }

    //#endregion

    //#region complete_certificate_refs

    export class CompleteCertificateRefs extends XadesObject implements UnsignedSignatureProperty {
        public Id: string;
        public CertRefs: CertIDList;
    }

    //#endregion

    //#region  complete_revocation_refs

    export class OtherRef extends Any {
    }
    export class OtherRefs extends XadesCollection<OtherRef> {
    }
    export class ResponderID extends XadesObject {
        public ByName: string;
        public ByKey: Uint8Array;
    }
    export class OCSPIdentifier extends XadesObject {
        public URI: string;
        public ResponderID: ResponderID;
        public ProducedAt: Date;
    }
    export class OCSPRef extends XadesObject {
        public OCSPIdentifier: OCSPIdentifier;
        public DigestAlgAndValue: DigestAlgAndValueType;
    }
    export class OCSPRefs extends XadesCollection<OCSPRef> {
    }
    export class CRLIdentifier extends XadesObject {
        public URI: string;
        public Issuer: string;
        public IssueTime: Date;
        public Number: number;
    }
    export class CRLRef extends XadesObject {
        public DigestAlgAndValue: DigestAlgAndValueType;
        public CRLIdentifier: CRLIdentifier;
    }
    export class CRLRefs extends XadesCollection<CRLRef> {
    }
    export class CompleteRevocationRefs extends XadesObject implements UnsignedSignatureProperty {
        public Id: string;
        public CRLRefs: CRLRefs;
        public OCSPRefs: OCSPRefs;
        public OtherRefs: OtherRefs;
    }

    //#endregion

    //#region counter_signature

    export class CounterSignature extends XadesObject implements UnsignedSignatureProperty {
        public Signature: XmlDSigJs.Signature;
    }

    //#endregion

    //#region data_object

    export class DataObject extends XmlDSigJs.DataObject {
        public QualifyingProperties: QualifyingProperties;
    }

    //#endregion

    //#region data_object_format

    export class DataObjectFormat extends XadesObject {
        public ObjectReference: string;
        public Description: string;
        public ObjectIdentifier: ObjectIdentifier;
        public MimeType: string;
        public Encoding: string;
    }

    //#endregion

    //#region encapsulated_pki_data

    export type EncodingType = "der" | "ber" | "cer" | "per" | "xer" | null;
    export class EncapsulatedPKIData extends XadesObject {
        public Id: string;
        public Encoding: EncodingType;
        public Value: Uint8Array;
    }

    //#endregion

    //#region generic_time_stamp

    export class Include extends XadesObject {
        public Uri: string;
        public ReferencedData: boolean;
    }
    export class ReferenceInfo extends XadesObject {
        public Uri: string;
        public Id: string;
        public DigestMethod: string;
        public DigestValue: Uint8Array;
    }
    export class ReferenceInfos extends XadesCollection<ReferenceInfo> {
    }
    export class EncapsulatedTimeStamp extends EncapsulatedPKIData {
    }
    export class EncapsulatedTimeStampCollection extends XadesCollection<EncapsulatedTimeStamp> {
    }
    export class XMLTimeStamp extends Any {
    }
    export class XMLTimeStampCollection extends XadesCollection<XMLTimeStamp> {
    }
    export class GenericTimeStamp extends XadesObject {
        public Id: string;
        public Include: Include;
        public ReferenceInfo: ReferenceInfos;
        public CanonicalizationMethod: XmlDSigJs.CanonicalizationMethod;
        public EncapsulatedTimeStamp: EncapsulatedTimeStampCollection;
        public XMLTimeStamp: XMLTimeStampCollection;
    }

    //#endregion

    //#region object_identifier

    export type IdentifierQualifier = "OIDAsURI" | "OIDAsURN";

    export class Identifier extends XadesObject {
        public Qualifier: "OIDAsURI" | "OIDAsURN";
        public Value: string;
    }
    export class DocumentationReference extends XadesObject {
        public Uri: string;
        protected OnLoadXml(e: Element): void;
        protected OnGetXml(e: Element): void;
    }
    export class DocumentationReferences extends XadesCollection<DocumentationReference> {
    }
    export class ObjectIdentifier extends XadesObject {
        public Identifier: Identifier;
        public Description: string;
        public DocumentationReferences: DocumentationReferences;
    }

    //#endregion

    //#region other_time_stamp

    export class OtherTimeStamp extends XadesObject {
        public Id: string;
        public ReferenceInfo: ReferenceInfos;
        public CanonicalizationMethod: XmlDSigJs.CanonicalizationMethod;
        public EncapsulatedTimeStamp: EncapsulatedTimeStampCollection;
        public XMLTimeStamp: XMLTimeStampCollection;
    }

    //#endregion

    //#region qualifying_properties

    export class QualifyingProperties extends XadesObject {
        public Target: string;
        public Id: string;
        public SignedProperties: SignedProperties;
        public UnsignedProperties: UnsignedProperties;
    }

    //#endregion

    //#region qualifying_properties_reference

    export class QualifyingPropertiesReference extends XadesObject {
        public Uri: string;
        public Id: string;
    }

    //#endregion

    //#region revocation_values

    export class OtherValue extends EncapsulatedPKIData {
    }
    export class OtherValues extends XadesCollection<OtherValue> {
    }
    export class EncapsulatedOCSPValue extends EncapsulatedPKIData {
    }
    export class OCSPValues extends XadesCollection<EncapsulatedOCSPValue> {
    }
    export class EncapsulatedCRLValue extends EncapsulatedPKIData {
    }
    export class CRLValues extends XadesCollection<EncapsulatedCRLValue> {
    }
    export class RevocationValues extends XadesObject {
        public Id: string;
        public CRLValues: CRLValues;
        public OCSPValues: OCSPValues;
        public OtherValues: OtherValues;
    }

    //#endregion

    //#region signature_policy_identifier
    export class SigPolicyId extends ObjectIdentifier { }
    export class SigPolicyHash extends DigestAlgAndValueType { }
    export class SigPolicyQualifier extends AnyCollection { }
    export class Integer extends XadesObject {
        public Value: number;
    }
    export class IntegerList extends XadesCollection<Integer> {
    }
    export class NoticeReference extends XadesObject {
        public Organization: string;
        public NoticeNumbers: IntegerList;
    }
    export class SPUserNotice extends XadesObject {
        public NoticeRef: NoticeReference;
        public ExplicitText: string;
    }
    export class SPURI extends XadesObject {
        public Value: string;
    }
    export class SigPolicyQualifiers extends XadesCollection<SigPolicyQualifier> { }
    export class SignaturePolicyId extends XadesObject {
        public SigPolicyId: ObjectIdentifier;
        public Transforms: XmlDSigJs.Transforms;
        public SigPolicyHash: DigestAlgAndValueType;
        public SigPolicyQualifiers: SigPolicyQualifiers;
    }
    export class SignaturePolicyIdentifier extends XadesObject {
        public SignaturePolicyId: SignaturePolicyId;
        public SignaturePolicyImplied: boolean;
    }

    //#endregion

    //#region signature_product_place

    export class SignatureProductionPlace extends XadesObject {
        public City: string;
        public StateOrProvince: string;
        public PostalCode: string;
        public CountryName: string;
    }

    // signed_data_object_properties
    export class IndividualDataObjectsTimeStamp extends XAdESTimeStamp {
    }
    export class IndividualDataObjectsTimeStampCollection extends XadesCollection<IndividualDataObjectsTimeStamp> {
    }
    export class AllDataObjectsTimeStamp extends XAdESTimeStamp {
    }
    export class DataObjectFormatCollection extends XadesCollection<DataObjectFormat> {
    }
    export class CommitmentTypeIndicationCollection extends XadesCollection<CommitmentTypeIndication> {
    }
    export class AllDataObjectsTimeStampCollection extends XadesCollection<AllDataObjectsTimeStamp> {
    }
    export class SignedDataObjectProperties extends XadesObject {
        public Id: string;
        public DataObjectFormats: DataObjectFormatCollection;
        public CommitmentTypeIndications: CommitmentTypeIndicationCollection;
        public AllDataObjectsTimeStamps: AllDataObjectsTimeStampCollection;
        public IndividualDataObjectsTimeStamps: IndividualDataObjectsTimeStampCollection;
    }

    //#endregion

    //#region signed_properties

    export class SignedProperties extends XadesObject {
        public Id: string;
        public SignedSignatureProperties: SignedSignatureProperties;
        public SignedDataObjectProperties: SignedDataObjectProperties;
    }

    //#endregion

    //#region signed_signature_properties

    export class SignedSignatureProperties extends XadesObject {
        public Id: string;
        public SigningTime: Date;
        public SigningCertificate: SigningCertificate;
        public SignaturePolicyIdentifier: SignaturePolicyIdentifier;
        public SignatureProductionPlace: SignatureProductionPlace;
        public SignerRole: SignerRole;
    }

    //#endregion

    //#region signer_role

    export class ClaimedRole extends Any {
    }
    export class ClaimedRoles extends XadesCollection<ClaimedRole> {
    }
    export class CertifiedRole extends EncapsulatedPKIData {
    }
    export class CertifiedRoles extends XadesCollection<CertifiedRole> {
    }
    export class SignerRole extends XadesObject {
        public ClaimedRoles: ClaimedRoles;
        public CertifiedRoles: CertifiedRoles;
    }

    //#endregion

    //#region signing_certificate

    export class DigestAlgAndValueType extends XadesObject {
        public DigestMethod: XmlDSigJs.DigestMethod;
        public DigestValue: Uint8Array;
    }
    export class IssuerSerial extends XmlDSigJs.X509IssuerSerial {
    }
    export class Cert extends XadesObject {
        public CertDigest: DigestAlgAndValueType;
        public IssuerSerial: XmlDSigJs.X509IssuerSerial;
        public Uri: string;
    }
    export class CertIDList extends XadesCollection<Cert> {
    }
    export class SigningCertificate extends CertIDList {
    }

    //#endregion

    //#region unsigned_data_object_property

    export class UnsignedDataObjectProperty extends Any {
    }
    export class UnsignedDataObjectProperties extends XadesCollection<UnsignedDataObjectProperty> {
        public Id: string;
    }

    //#endregion

    //#region unsigned_properties

    export class UnsignedProperties extends XadesObject {
        public Id: string;
        public UnsignedSignatureProperties: UnsignedSignatureProperties;
        public UnsignedDataObjectProperties: UnsignedDataObjectProperties;
    }

    //#endregion

    //#region unsigned_signature_properties
    export class SignatureTimeStamp extends XAdESTimeStamp implements UnsignedSignatureProperty {
    }
    export class SigAndRefsTimeStamp extends XAdESTimeStamp implements UnsignedSignatureProperty {
    }
    export class RefsOnlyTimeStamp extends XAdESTimeStamp implements UnsignedSignatureProperty {
    }
    export class ArchiveTimeStamp extends XAdESTimeStamp implements UnsignedSignatureProperty {
    }
    export class AttributeCertificateRefs extends CompleteCertificateRefs implements UnsignedSignatureProperty {
    }
    export class AttributeRevocationRefs extends CompleteRevocationRefs implements UnsignedSignatureProperty {
    }
    export class AttrAuthoritiesCertValues extends CertificateValues implements UnsignedSignatureProperty {
    }
    export class AttributeRevocationValues extends RevocationValues implements UnsignedSignatureProperty {
    }
    /**
     * Abstract class for UnsignedSignatureProperties
     *
     * @export
     * @class UnsignedSignatureProperty
     * @extends {XadesObject}
     */
    export class UnsignedSignatureProperty extends XadesObject {
    }
    export class UnsignedSignatureProperties extends XadesCollection<UnsignedSignatureProperty> {
        public Id: string;
        public OnLoadXml(element: Element): void;
    }

    //#endregion

    //#region xades_time_stamp

    export class XAdESTimeStamp extends XadesObject {
        public Id: string;
        public Include: Include;
        public CanonicalizationMethod: XmlDSigJs.CanonicalizationMethod;
        public EncapsulatedTimeStamp: EncapsulatedTimeStampCollection;
        public XMLTimeStamp: XMLTimeStampCollection;
    }

    //#endregion

    // xml
    export let XmlXades: {
        DefaultPrefix: string;
        NamespaceURI: string;
        SignedPropertiesType: string;
        ElementNames: {
            Any: string;
            ByName: string;
            ByKey: string;
            AttrAuthoritiesCertValues: string;
            AttributeRevocationValues: string;
            AttributeCertificateRefs: string;
            AttributeRevocationRefs: string;
            QualifyingProperties: string;
            QualifyingPropertiesReference: string;
            SignedProperties: string;
            SignedSignatureProperties: string;
            SignedDataObjectProperties: string;
            UnsignedProperties: string;
            UnsignedSignatureProperties: string;
            UnsignedDataObjectProperties: string;
            UnsignedDataObjectProperty: string;
            SigningTime: string;
            SigningCertificate: string;
            SignaturePolicyIdentifier: string;
            SignatureProductionPlace: string;
            SignerRole: string;
            Cert: string;
            CertDigest: string;
            IssuerSerial: string;
            DataObjectFormat: string;
            CommitmentTypeIndication: string;
            AllDataObjectsTimeStamp: string;
            IndividualDataObjectsTimeStamp: string;
            HashDataInfo: string;
            EncapsulatedTimeStamp: string;
            XMLTimeStamp: string;
            XAdESTimeStamp: string;
            OtherTimeStamp: string;
            Description: string;
            ObjectIdentifier: string;
            MimeType: string;
            Encoding: string;
            Identifier: string;
            DocumentationReferences: string;
            DocumentationReference: string;
            CommitmentTypeId: string;
            ObjectReference: string;
            CommitmentTypeQualifiers: string;
            AllSignedDataObjects: string;
            CommitmentTypeQualifier: string;
            SignaturePolicyId: string;
            SignaturePolicyImplied: string;
            SigPolicyId: string;
            SigPolicyHash: string;
            SigPolicyQualifier: string;
            SigPolicyQualifiers: string;
            SPURI: string;
            SPUserNotice: string;
            NoticeRef: string;
            ExplicitText: string;
            ClaimedRoles: string;
            ClaimedRole: string;
            CertifiedRoles: string;
            CertifiedRole: string;
            Organization: string;
            NoticeNumbers: string;
            Int: string;
            City: string;
            PostalCode: string;
            StateOrProvince: string;
            CountryName: string;
            CounterSignature: string;
            SignatureTimeStamp: string;
            CompleteCertificateRefs: string;
            CompleteRevocationRefs: string;
            SigAndRefsTimeStamp: string;
            RefsOnlyTimeStamp: string;
            CertificateValues: string;
            RevocationValues: string;
            ArchiveTimeStamp: string;
            CertRefs: string;
            CRLRefs: string;
            CRLRef: string;
            OCSPRefs: string;
            OtherRefs: string;
            OtherRef: string;
            DigestAlgAndValue: string;
            CRLIdentifier: string;
            Issuer: string;
            IssueTime: string;
            Number: string;
            OCSPRef: string;
            OCSPIdentifier: string;
            ResponderID: string;
            ProducedAt: string;
            EncapsulatedX509Certificate: string;
            OtherCertificate: string;
            CRLValues: string;
            OCSPValues: string;
            OtherValues: string;
            OtherValue: string;
            EncapsulatedCRLValue: string;
            EncapsulatedOCSPValue: string;
            ReferenceInfo: string;
            Include: string;
        };
        AttributeNames: {
            Id: string;
            Encoding: string;
            Target: string;
            ObjectReference: string;
            Qualifier: string;
            Uri: string;
            URI: string;
            ReferencedData: string;
        };
    };

    // xml_base
    export abstract class XadesObject extends XmlCore.XmlObject {
    }
    export abstract class XadesCollection<I extends XadesObject> extends XmlCore.XmlCollection<I> {
    }

}

export = XAdES;
export as namespace XAdES;
