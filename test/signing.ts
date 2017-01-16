import * as assert from "assert";
import * as XmlCore from "xml-core";
let WebCrypto = require("node-webcrypto-ossl");
import * as XmlDSigJs from "xmldsigjs";
import * as XAdES from "../";

context("XAdES signing", () => {

    let keys: CryptoKeyPair;
    let alg = {
        name: "RSASSA-PKCS1-v1_5",
        hash: "SHA-256",
        publicExponent: new Uint8Array([1, 0, 1]),
        modulusLength: 1024
    };
    let xml = `<root><child>Test</child></root>`;

    before(done => {
        let crypto = new WebCrypto() as Crypto;
        XAdES.Application.setEngine("OpenSSL", crypto);

        Promise.resolve()
            .then(() =>
                crypto.subtle.generateKey(alg, true, ["sign", "verify"])
            )
            .then(k => {
                keys = k as CryptoKeyPair;
            })
            .then(done, done);
    });

    it("Default signing (SigningTime, SignaturePolicyIdentifier)", done => {
        let signature = new XAdES.SignedXml();

        signature.Sign(                        // Signing document
            alg,                                    // algorithm 
            keys.privateKey,                        // key 
            XAdES.Parse(xml),                       // document
            {                                       // options
                keyValue: keys.publicKey,
                references: [
                    { hash: "SHA-256", transforms: ["enveloped"] }
                ]
            })
            .then(() => {
                let sig = signature.toString();

                assert.equal(!!sig, true);

                let xades = new XAdES.SignedXml(XAdES.Parse(sig));
                xades.LoadXml(signature.XmlSignature.GetXml());

                assert.equal(!!xades.SignedProperties, true);
                assert.equal(!!xades.SignedProperties.SignedSignatureProperties.SigningTime, true);
                assert.equal(xades.SignedProperties.SignedSignatureProperties.SignaturePolicyIdentifier.IsEmpty(), false);
                assert.equal(xades.SignedProperties.SignedSignatureProperties.SignerRole.IsEmpty(), true);
                assert.equal(xades.SignedProperties.SignedSignatureProperties.SigningCertificate.IsEmpty(), true);
                assert.equal(xades.SignedProperties.SignedSignatureProperties.SignatureProductionPlace.IsEmpty(), true);

                return xades.Verify();
            })
            .then((res) => {
                assert.equal(res, true, "XAdES signature is not valid");
            })
            .then(done, done);
    });

    it("SigningCertificate, SignatireProductionPlace, SignerRole", done => {
        let signature = new XAdES.SignedXml();

        signature.Sign(                        // Signing document
            alg,                                    // algorithm 
            keys.privateKey,                        // key 
            XAdES.Parse(xml),                       // document
            {                                       // options
                keyValue: keys.publicKey,
                references: [
                    { hash: "SHA-256", transforms: ["enveloped"] }
                ],
                productionPlace: {
                    country: "Country",
                    state: "State",
                    city: "City",
                    code: "Code",
                },
                signerRole: {
                    claimed: ["1", "2", "3"]
                },
                signingCertificate: "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"
            })
            .then(() => {
                let sig = signature.toString();

                assert.equal(!!sig, true);

                let xades = new XAdES.SignedXml(XAdES.Parse(sig));
                xades.LoadXml(signature.XmlSignature.GetXml());

                assert.equal(!!xades.SignedProperties, true);
                assert.equal(!!xades.SignedProperties.SignedSignatureProperties.SigningTime, true);
                assert.equal(xades.SignedProperties.SignedSignatureProperties.SignaturePolicyIdentifier.SignaturePolicyImplied, true);
                assert.equal(xades.SignedProperties.SignedSignatureProperties.SignerRole.ClaimedRoles.Count, 3);
                assert.equal(xades.SignedProperties.SignedSignatureProperties.SigningCertificate.Count, 1);
                assert.equal(xades.SignedProperties.SignedSignatureProperties.SignatureProductionPlace.CountryName, "Country");
                assert.equal(xades.SignedProperties.SignedSignatureProperties.SignatureProductionPlace.City, "City");
                assert.equal(xades.SignedProperties.SignedSignatureProperties.SignatureProductionPlace.StateOrProvince, "State");
                assert.equal(xades.SignedProperties.SignedSignatureProperties.SignatureProductionPlace.PostalCode, "Code");

                return xades.Verify();
            })
            .then((res) => {
                assert.equal(res, true, "XAdES signature is not valid");
            })
            .then(done, done);
    });

});