// // PKIjs
// let org = org || null;
// if (!org) {
//     let merge = require("node.extend");
//     let co = require("co");

//     let common = require("pkijs/org/pkijs/common");
//     let _asn1js = require("asn1js");
//     let _pkijs = require("pkijs");
//     let _x509_schema = require("pkijs/org/pkijs/x509_schema");
//     let _x509_simpl = require("pkijs/org/pkijs/x509_simpl");
//     let _cms_schema = require("pkijs/org/pkijs/cms_schema");
//     let _cms_simpl = require("pkijs/org/pkijs/cms_simpl");
//     let _ocsp_tsp_schema = require("pkijs/org/pkijs/ocsp_tsp_schema");
//     let _ocsp_tsp_simpl = require("pkijs/org/pkijs/ocsp_tsp_simpl");
//     let asn1js = merge(true, _asn1js, common);
//     let x509_schema = merge(true, _x509_schema, asn1js);
//     let x509_simpl = merge(true, _x509_simpl, x509_schema);
//     let cms_schema = merge(true, _cms_schema, x509_simpl);
//     let cms_simpl = merge(true, _cms_simpl, cms_schema);
//     let ocsp_tsp_schema = merge(true, _ocsp_tsp_schema, cms_simpl);
//     let ocsp_tsp_simpl = merge(true, _ocsp_tsp_simpl, ocsp_tsp_schema);
//     let pkijs_1 = merge(true, _pkijs, asn1js);
//     let pkijs_2 = merge(true, pkijs_1, co);
//     org = merge(true, pkijs_1, ocsp_tsp_simpl).org;
// }
// // xadesjs
// if (typeof module !== "undefined") {
//     var xadesjs = require("xadesjs");
// }
namespace xadesjs.pro {

    export let XmlXades = {

        DefaultPrefix: "xades",

        /**
         * The XAdES XML namespace URI
         */
        NamespaceURI: "http://uri.etsi.org/01903/v1.3.2#",

        /**
         * Mandated type name for the Uri reference to the SignedProperties element
         */
        SignedPropertiesType: "http://uri.etsi.org/01903/v1.3.2#SignedProperties",

        ElementNames: {
            QualifyingProperties: "QualifyingProperties",
            QualifyingPropertiesReference: "QualifyingPropertiesReference",
            SignedProperties: "SignedProperties",
            SignedSignatureProperties: "SignedSignatureProperties",
            SignedDataObjectProperties: "SignedDataObjectProperties",
            UnsignedProperties: "UnsignedProperties",
            UnsignedSignatureProperties: "UnsignedSignatureProperties",
            UnsignedDataObjectProperties: "UnsignedDataObjectProperties",
            UnsignedDataObjectProperty: "UnsignedDataObjectProperty",
            SigningTime: "SigningTime",
            SigningCertificate: "SigningCertificate",
            SignaturePolicyIdentifier: "SignaturePolicyIdentifier",
            SignatureProductionPlace: "SignatureProductionPlace",
            SignerRole: "SignerRole",
            Cert: "Cert",
            CertDigest: "CertDigest",
            IssuerSerial: "IssuerSerial",
            DataObjectFormat: "DataObjectFormat",
            CommitmentTypeIndication: "CommitmentTypeIndication",
            AllDataObjectsTimeStamp: "AllDataObjectsTimeStamp",
            IndividualDataObjectsTimeStamp: "IndividualDataObjectsTimeStamp",
            HashDataInfo: "HashDataInfo",
            EncapsulatedTimeStamp: "EncapsulatedTimeStamp",
            XMLTimeStamp: "XMLTimeStamp",
            Description: "Description",
            ObjectIdentifier: "ObjectIdentifier",
            MimeType: "MimeType",
            Encoding: "Encoding",
            Identifier: "Identifier",
            DocumentationReferences: "DocumentationReferences",
            DocumentationReference: "DocumentationReference",
            CommitmentTypeId: "CommitmentTypeId",
            ObjectReference: "ObjectReference",
            CommitmentTypeQualifiers: "CommitmentTypeQualifiers",
            AllSignedDataObjects: "AllSignedDataObjects",
            CommitmentTypeQualifier: "CommitmentTypeQualifier",
            SignaturePolicyId: "SignaturePolicyId",
            SignaturePolicyImplied: "SignaturePolicyImplied",
            SigPolicyId: "SigPolicyId",
            SigPolicyHash: "SigPolicyHash",
            SigPolicyQualifier: "SigPolicyQualifier",
            SigPolicyQualifiers: "SigPolicyQualifiers",
            SPURI: "SPURI",
            SPUserNotice: "SPUserNotice",
            NoticeRef: "NoticeRef",
            ExplicitText: "ExplicitText",
            ClaimedRoles: "ClaimedRoles",
            ClaimedRole: "ClaimedRole",
            CertifiedRoles: "CertifiedRoles",
            CertifiedRole: "CertifiedRole",
            Organization: "Organization",
            NoticeNumbers: "NoticeNumbers",
            Int: "int",
            City: "City",
            PostalCode: "PostalCode",
            StateOrProvince: "StateOrProvince",
            CountryName: "CountryName",
            CounterSignature: "CounterSignature",
            SignatureTimeStamp: "SignatureTimeStamp",
            CompleteCertificateRefs: "CompleteCertificateRefs",
            CompleteRevocationRefs: "CompleteRevocationRefs",
            SigAndRefsTimeStamp: "SigAndRefsTimeStamp",
            RefsOnlyTimeStamp: "RefsOnlyTimeStamp",
            CertificateValues: "CertificateValues",
            RevocationValues: "RevocationValues",
            ArchiveTimeStamp: "ArchiveTimeStamp",
            CertRefs: "CertRefs",
            CRLRefs: "CRLRefs",
            CRLRef: "CRLRef",
            OCSPRefs: "OCSPRefs",
            OtherRefs: "OtherRefs",
            OtherRef: "OtherRef",
            DigestAlgAndValue: "DigestAlgAndValue",
            CRLIdentifier: "CRLIdentifier",
            Issuer: "Issuer",
            IssueTime: "IssueTime",
            Number: "Number",
            OCSPRef: "OCSPRef",
            OCSPIdentifier: "OCSPIdentifier",
            ResponderID: "ResponderID",
            ProducedAt: "ProducedAt",
            EncapsulatedX509Certificate: "EncapsulatedX509Certificate",
            OtherCertificate: "OtherCertificate",
            CRLValues: "CRLValues",
            OCSPValues: "OCSPValues",
            OtherValues: "OtherValues",
            OtherValue: "OtherValue",
            EncapsulatedCRLValue: "EncapsulatedCRLValue",
            EncapsulatedOCSPValue: "EncapsulatedOCSPValue",
            ReferenceInfo: "ReferenceInfo",
            Include: "Include"
        },

        AttributeNames: {
            Id: "Id",
            Target: "Target",
            ObjectReference: "ObjectReference",
            Qualifier: "Qualifier",
            Uri: "uri",
            URI: "URI",
            ReferencedData: "referencedData"
        },

        DEFAULT_DIGEST_METHOD: SHA256_NAMESPACE
    };

}