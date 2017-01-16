import * as XmlCore from "xml-core";
import * as XmlDSigJs from "xmldsigjs";

declare namespace XAdES {

    // xml-core helpers
    export const Select: XmlCore.SelectNodes;
    export function Parse(xmlstring: string): Document;

    // signed_xml
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
        protected properties: XAdES.xml.QualifyingProperties | null;
        readonly Properties: XAdES.xml.QualifyingProperties | null;
        readonly SignedProperties: XAdES.xml.SignedProperties;
        readonly UnsignedProperties: XAdES.xml.UnsignedProperties;
        constructor(node?: Document | Element);
        LoadXml(value: Element | string): void;
        protected CreateQualyingProperties(): void;
        protected ApplySignOptions(signature: XmlDSigJs.Signature, algorithm: Algorithm, key: CryptoKey, options: OptionsXAdES): Promise<void>;
        Sign(algorithm: Algorithm, key: CryptoKey, data: Document, options?: OptionsXAdES): PromiseLike<XmlDSigJs.Signature>;
        protected ApplySigningCertificate(base64string?: string): Promise<void>;
        protected ApplySignaturePolicyIdentifier(options?: OptionsPolicyIdentifier): void;
        protected ApplySignatureProductionPlace(options?: OptionsProductionPlace): void;
        protected ApplySignerRoles(options?: OptionsSignerRole): void;
        protected VerifySigningCertificate(): Promise<XmlDSigJs.X509Certificate | null>;
    }

}

declare namespace XAdES.xml {

    // any
    export class Any extends XadesObject {
        Value: string;
    }

    // certificate_values
    export class OtherCertificate extends Any {
    }
    export class OtherCertificateCollection extends XadesCollection<OtherCertificate> {
    }
    export class EncapsulatedX509Certificate extends EncapsulatedPKIData {
    }
    export class EncapsulatedX509CertificateCollection extends XadesCollection<EncapsulatedX509Certificate> {
    }
    export class CertificateValues extends XadesObject {
        Id: string;
        EncapsulatedX509Certificates: EncapsulatedX509CertificateCollection;
        OtherCertificates: OtherCertificateCollection;
    }

    // commitment_type_indication
    export class CommitmentTypeQualifier extends Any {
    }
    export class CommitmentTypeQualifiers extends XadesCollection<CommitmentTypeQualifier> {
    }
    export class ObjectReference extends XadesObject {
        Value: string;
    }
    export class ObjectReferenceCollection extends XadesCollection<ObjectReference> {
    }
    export class CommitmentTypeIndication extends XadesObject {
        CommitmentTypeId: ObjectIdentifier;
        ObjectReference: ObjectReferenceCollection;
        AllSignedDataObjects: boolean;
        CommitmentTypeQualifiers: CommitmentTypeQualifiers;
    }

    // complete_certificate_refs
    export class CompleteCertificateRefs extends XadesObject implements UnsignedSignatureProperty {
        Id: string;
        CertRefs: CertIDList;
    }

    // complete_revocation_refs
    export class OtherRef extends Any {
    }
    export class OtherRefs extends XadesCollection<OtherRef> {
    }
    export class ResponderID extends XadesObject {
        ByName: string;
        ByKey: Uint8Array;
    }
    export class OCSPIdentifier extends XadesObject {
        URI: string;
        ResponderID: ResponderID;
        ProducedAt: Date;
    }
    export class OCSPRef extends XadesObject {
        OCSPIdentifier: OCSPIdentifier;
        DigestAlgAndValue: DigestAlgAndValueType;
    }
    export class OCSPRefs extends XadesCollection<OCSPRef> {
    }
    export class CRLIdentifier extends XadesObject {
        URI: string;
        Issuer: string;
        IssueTime: Date;
        Number: number;
    }
    export class CRLRef extends XadesObject {
        DigestAlgAndValue: DigestAlgAndValueType;
        CRLIdentifier: CRLIdentifier;
    }
    export class CRLRefs extends XadesCollection<CRLRef> {
    }
    export class CompleteRevocationRefs extends XadesObject implements UnsignedSignatureProperty {
        Id: string;
        CRLRefs: CRLRefs;
        OCSPRefs: OCSPRefs;
        OtherRefs: OtherRefs;
    }

    // counter_signature
    export class CounterSignature extends XadesObject implements UnsignedSignatureProperty {
        Signature: XmlDSigJs.Signature;
    }

    // data_object
    export class DataObject extends XmlDSigJs.DataObject {
        QualifyingProperties: QualifyingProperties;
    }

    // data_object_format
    export class DataObjectFormat extends XadesObject {
        ObjectReference: string;
        Description: string;
        ObjectIdentifier: ObjectIdentifier;
        MimeType: string;
        Encoding: string;
    }

    // encapsulated_pki_data
    export type EncodingType = "der" | "ber" | "cer" | "per" | "xer" | null;
    export class EncapsulatedPKIData extends XadesObject {
        Id: string;
        Encoding: EncodingType;
        Value: Uint8Array;
    }

    // generic_time_stamp
    export class Include extends XadesObject {
        Uri: string;
        ReferencedData: boolean;
    }
    export class ReferenceInfo extends XadesObject {
        Uri: string;
        Id: string;
        DigestMethod: string;
        DigestValue: Uint8Array;
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
        Id: string;
        Include: Include;
        ReferenceInfo: ReferenceInfos;
        CanonicalizationMethod: XmlDSigJs.CanonicalizationMethod;
        EncapsulatedTimeStamp: EncapsulatedTimeStampCollection;
        XMLTimeStamp: XMLTimeStampCollection;
    }

    // object_identifier
    export class Identifier extends XadesObject {
        Qualifier: "OIDAsURI" | "OIDAsURN";
        Value: string;
    }
    export class DocumentationReference extends XadesObject {
        Uri: string;
        protected OnLoadXml(e: Element): void;
        protected OnGetXml(e: Element): void;
    }
    export class DocumentationReferences extends XadesCollection<DocumentationReference> {
    }
    export class ObjectIdentifier extends XadesObject {
        Identifier: Identifier;
        Description: string;
        DocumentationReferences: DocumentationReferences;
    }

    // other_time_stamp
    export class OtherTimeStamp extends XadesObject {
        Id: string;
        ReferenceInfo: ReferenceInfos;
        CanonicalizationMethod: XmlDSigJs.CanonicalizationMethod;
        EncapsulatedTimeStamp: EncapsulatedTimeStampCollection;
        XMLTimeStamp: XMLTimeStampCollection;
    }

    // qualifying_properties
    export class QualifyingProperties extends XadesObject {
        Target: string;
        Id: string;
        SignedProperties: SignedProperties;
        UnsignedProperties: UnsignedProperties;
    }

    // qualifying_properties_reference
    export class QualifyingPropertiesReference extends XadesObject {
        Uri: string;
        Id: string;
    }

    // revocation_values
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
        Id: string;
        CRLValues: CRLValues;
        OCSPValues: OCSPValues;
        OtherValues: OtherValues;
    }

    // signature_policy_identifier
    export class Integer extends XadesObject {
        Value: number;
    }
    export class IntegerList extends XadesCollection<Integer> {
    }
    export class NoticeReference extends XadesObject {
        Organization: string;
        NoticeNumbers: IntegerList;
    }
    export class SPUserNotice extends XadesObject {
        NoticeRef: NoticeReference;
        ExplicitText: string;
    }
    export class SigPolicyQualifier extends Any {
    }
    export class SigPolicyQualifiers extends XadesCollection<SigPolicyQualifier> {
    }
    export class SignaturePolicyId extends XadesObject {
        SigPolicyId: ObjectIdentifier;
        Transforms: XmlDSigJs.Transforms;
        SigPolicyHash: DigestAlgAndValueType;
        SigPolicyQualifiers: SigPolicyQualifiers;
    }
    export class SignaturePolicyIdentifier extends XadesObject {
        SignaturePolicyId: SignaturePolicyId;
        SignaturePolicyImplied: boolean;
    }

    // signature_product_place
    export class SignatureProductionPlace extends XadesObject {
        City: string;
        StateOrProvince: string;
        PostalCode: string;
        CountryName: string;
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
        Id: string;
        DataObjectFormats: DataObjectFormatCollection;
        CommitmentTypeIndications: CommitmentTypeIndicationCollection;
        AllDataObjectsTimeStamps: AllDataObjectsTimeStampCollection;
        IndividualDataObjectsTimeStamps: IndividualDataObjectsTimeStampCollection;
    }

    // signed_properties
    export class SignedProperties extends XadesObject {
        Id: string;
        SignedSignatureProperties: SignedSignatureProperties;
        SignedDataObjectProperties: SignedDataObjectProperties;
    }

    // signed_signature_properties
    export class SignedSignatureProperties extends XadesObject {
        Id: string;
        SigningTime: Date;
        SigningCertificate: SigningCertificate;
        SignaturePolicyIdentifier: SignaturePolicyIdentifier;
        SignatureProductionPlace: SignatureProductionPlace;
        SignerRole: SignerRole;
    }

    // signer_role
    export class ClaimedRole extends Any {
    }
    export class ClaimedRoles extends XadesCollection<ClaimedRole> {
    }
    export class CertifiedRole extends EncapsulatedPKIData {
    }
    export class CertifiedRoles extends XadesCollection<CertifiedRole> {
    }
    export class SignerRole extends XadesObject {
        ClaimedRoles: ClaimedRoles;
        CertifiedRoles: CertifiedRoles;
    }

    // signing_certificate
    export class DigestAlgAndValueType extends XadesObject {
        DigestMethod: XmlDSigJs.DigestMethod;
        DigestValue: Uint8Array;
    }
    export class IssuerSerial extends XmlDSigJs.X509IssuerSerial {
    }
    export class Cert extends XadesObject {
        CertDigest: DigestAlgAndValueType;
        IssuerSerial: XmlDSigJs.X509IssuerSerial;
        Uri: string;
    }
    export class CertIDList extends XadesCollection<Cert> {
    }
    export class SigningCertificate extends CertIDList {
    }

    // unsigned_data_object_property
    export class UnsignedDataObjectProperty extends Any {
    }
    export class UnsignedDataObjectProperties extends XadesCollection<UnsignedDataObjectProperty> {
        Id: string;
    }

    // unsigned_properties
    export class UnsignedProperties extends XadesObject {
        Id: string;
        UnsignedSignatureProperties: UnsignedSignatureProperties;
        UnsignedDataObjectProperties: UnsignedDataObjectProperties;
    }

    // unsigned_signature_properties
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
        Id: string;
        OnLoadXml(element: Element): void;
    }

    // xades_time_stamp
    export class XAdESTimeStamp extends XadesObject {
        Id: string;
        Include: Include;
        CanonicalizationMethod: XmlDSigJs.CanonicalizationMethod;
        EncapsulatedTimeStamp: EncapsulatedTimeStampCollection;
        XMLTimeStamp: XMLTimeStampCollection;
    }

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