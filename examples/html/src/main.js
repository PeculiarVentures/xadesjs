function getAlgorithm() {
    var $key = document.getElementById("key");

    var alg = {};
    switch ($key.value) {
        case "rsassa":
            alg = {
                name: "RSASSA-PKCS1-v1_5",
                hash: "SHA-256",
                modulusLength: 1024,
                publicExponent: new Uint8Array([1, 0, 1]),
            };
            break;
        case "rsapss":
            alg = {
                name: "RSA-PSS",
                hash: "SHA-256",
                modulusLength: 1024,
                publicExponent: new Uint8Array([1, 0, 1]),
                saltLength: 32,
            };
            break;
        case "ecdsa":
            alg = {
                name: "ECDSA",
                hash: "SHA-256",
                namedCurve: "P-256",
            };
            break;
    }
    return alg;
}

function getHashAlgorithm() {
    return document.getElementById("digest").value;
}

function getCanonMethod() {
    return document.getElementById("canon").value;
}

function isEnveloped() {
    return document.getElementById("enveloped").checked;
}

function useKeyValue() {
    return document.getElementById("keyValue").checked;
}

function getXml() {
    return document.getElementById("xml").value;
}

function getProductionPlace() {
    var res = {};
    ["country", "state", "city", "code"].forEach(function (item) {
        var $item = document.getElementById(item);
        if ($item && $item.value)
            res[item] = $item.value;
    });

    return Object.keys(res).length ? res : null;
}

function generateKey(alg) {
    return crypto.subtle.generateKey(alg, false, ["sign", "verify"])
}

function exportKey(key) {
    return crypto.subtle.exportKey("jwk", key)
}

function error(e) {
    alert(e.message);
    console.error(e);
}

function sign() {
    var transforms = [];
    if (isEnveloped())
        transforms.push("enveloped");
    transforms.push(getCanonMethod());
    console.log(transforms);

    var alg = getAlgorithm();
    var keys, signature, res = {};
    Promise.resolve()
        .then(function () {
            return generateKey(alg);
        })
        .then(function (ks) {
            keys = ks;
            return exportKey(ks.publicKey)
        })
        .then(function (jwk) {
            res.jwk = jwk;
        })
        .then(function () {
            signature = new XAdES.SignedXml();

            return signature.Sign(                  // Signing document
                alg,                                    // algorithm 
                keys.privateKey,                        // key 
                XAdES.Parse(getXml()),                  // document
                {                                       // options
                    keyValue: useKeyValue() ? keys.publicKey : void 0,
                    references: [
                        { hash: getHashAlgorithm(), transforms: transforms }
                    ],
                    productionPlace: getProductionPlace(),
                    signerRole: { claimed: ["BOSS"] }
                });
        })
        .then(function () {
            var sig = signature.toString()
            res.signature = sig;

            document.getElementById("jwk").value = JSON.stringify(res.jwk);
            document.getElementById("signature").value = res.signature;
        })
        .catch(function (e) {
            console.error(e);
        });

}

function verify() {
    var $xml = document.getElementById("xml");
    var $info = document.getElementById("signature_info");
    if (!$xml.value)
        return error(new Error("Unable to get XML"));
    var xml = XAdES.Parse($xml.value);
    var signature = new XAdES.SignedXml(xml);
    var xmlSignatures = XAdES.Select(xml, "//*[local-name(.)='Signature' and namespace-uri(.)='http://www.w3.org/2000/09/xmldsig#']");

    if (!(xmlSignatures && xmlSignatures.length))
        return error("Cannot get XML signature from XML document");

    signature.LoadXml(xmlSignatures[0]);

    signature.Verify()
        .then(function (res) {
            var info = [];
            info.push("Signature valid: " + res.toString());
            info.push("=================================");
            var si = signature.XmlSignature.SignedInfo;
            info.push("Signature method: " + si.SignatureMethod.Algorithm);
            info.push("Canonicalization method: " + si.CanonicalizationMethod.Algorithm);
            info.push("References:");
            si.References.ForEach(function (ref, index) {
                info.push("  Reference #" + (index + 1));
                ref.Type && info.push("    Type: " + ref.Type);
                ref.Uri && info.push("    Uri: " + ref.Uri);
                info.push("    Digest method: " + ref.DigestMethod.Algorithm);
                ref.Transforms.ForEach(function (transform) {
                    info.push("    Transform: " + transform.Algorithm);
                });
            });

            var ssp = signature.SignedProperties.SignedSignatureProperties;
            info.push("Signed signature properties:");
            info.push("  Signing time: " + ssp.SigningTime);
            if (ssp.SigningCertificate.Count) {
                info.push("Signing certificate:");
                ssp.SigningCertificate.ForEach(function (cert) {
                    info.push("  Issuer name: " + cert.IssuerSerial.X509IssuerName);
                    info.push("  Serial number: " + cert.IssuerSerial.X509SerialNumber);
                    info.push("  Digest method: " + cert.CertDigest.DigestMethod.Algorithm);
                    info.push("  Digest: " + XAdES.Convert.ToHex(cert.CertDigest.DigestValue));
                });
            }
            if (ssp.SignatureProductionPlace.Element) {
                info.push("  Production place:");
                ssp.SignatureProductionPlace.CountryName && info.push("    Country:" + ssp.SignatureProductionPlace.CountryName);
                ssp.SignatureProductionPlace.StateOrProvince && info.push("    State or province:" + ssp.SignatureProductionPlace.StateOrProvince);
                ssp.SignatureProductionPlace.City && info.push("    City:" + ssp.SignatureProductionPlace.City);
                ssp.SignatureProductionPlace.PostalCode && info.push("    Post code:" + ssp.SignatureProductionPlace.PostalCode);
            }
            if (ssp.SignaturePolicyIdentifier.Element) {
                info.push("  Signature policy identifier:");
                var spi = ssp.SignaturePolicyIdentifier;
                spi.SignaturePolicyImplied && info.push("    Implied: true");
                spi.SignaturePolicyId.Element && info.push("    Id: true");
            }
            if (signature.SignedProperties.SignedDataObjectProperties.Element) {
                info.push("Signed data object properties:");
                var sdop = signature.SignedProperties.SignedDataObjectProperties;
                sdop.DataObjectFormats.Count && info.push("  Data object format count: " + sdop.DataObjectFormats.Count);
                sdop.CommitmentTypeIndications.Count && info.push("  Commitment type indication count: " + sdop.CommitmentTypeIndications.Count);
                sdop.AllDataObjectsTimeStamps.Count && info.push("  All data objects TimeStamp count: " + sdop.AllDataObjectsTimeStamps.Count);
                sdop.IndividualDataObjectsTimeStamps.Count && info.push("  Individual data objects TimeStamp count: " + sdop.IndividualDataObjectsTimeStamps.Count);
            }
            if (signature.UnsignedProperties.Element) {
                info.push("Unsigned properties: true");
            }
            $info.textContent = info.join("\n");
        })
        .catch(function (e) {
            error(e);
        });
}