var x500_attr_oid = {
    common: "2.5.4.3",
    country: "2.5.4.6",
    state: "2.5.4.8",
    locality: "2.5.4.7",
    organization: "2.5.4.10",
}

/**
 * Format string in order to have each line with length equal to 63
 * @param pem_string String to format
 */
function formatPEMString(pem_string) {

    var string_length = pem_string.length;
    var result_string = "";

    for (var i = 0, count = 0; i < string_length; i++ , count++) {
        if (count > 63) {
            result_string = result_string + "\r\n";
            count = 0;
        }

        result_string = result_string + pem_string[i];
    }

    return result_string;
}

function bufferToHEX(buffer) {
    var res = [];
    buffer = new Uint8Array(buffer);
    for (var i = 0; i < buffer.length; i++) {
        var h = buffer[i].toString(16);
        res.push(h.length === 1 ? "0" + h : h);
    }
    return res.join("");
}

function formatPEM(buffer, pemName) {
    var text = String.fromCharCode.apply(null, new Uint8Array(buffer));
    var res = [];

    res.push("-----BEGIN " + pemName + "-----");
    res.push(formatPEMString(window.btoa(text)));
    res.push("-----END " + pemName + "-----");

    return res.join("\r\n");
}

function addX500NameValue(x500Name, oid, value) {
    x500Name.types_and_values.push(new org.pkijs.simpl.ATTR_TYPE_AND_VALUE({
        type: oid, // Country name
        value: new org.pkijs.asn1.PRINTABLESTRING({ value: value })
    }));
}

function addX509NameValue(cert, x500Name) {
    for (var i in x500_attr_oid) {
        if (i in x500Name && x500Name[i]) {
            addX500NameValue(cert.issuer, x500_attr_oid[i], x500Name[i]);
            addX500NameValue(cert.subject, x500_attr_oid[i], x500Name[i]);
        }
    }
}

function generateX509(x500name, keyPair, digestAlg) {
    return new Promise(function (resolve, reject) {

        // Initial variables 
        var promise = Promise.resolve();

        var cert = new org.pkijs.simpl.CERT();

        var publicKey = keyPair.publicKey;
        var privateKey = keyPair.privateKey;

        // Get a "crypto" extension 
        var crypto = org.pkijs.getCrypto();
        if (crypto === void 0) {
            alert("No WebCrypto extension found");
            return;
        }

        // Put a static values 
        cert.serialNumber = new org.pkijs.asn1.INTEGER({ value: 1 });

        addX509NameValue(cert, x500name);

        cert.notBefore.value = new Date();
        cert.notAfter.value = new Date();
        cert.notAfter.value.setFullYear(cert.notAfter.value.getFullYear() + 1);

        cert.extensions = new Array(); // Extensions are not a part of certificate by default, it's an optional array

        // "BasicConstraints" extension
        var basic_constr = new org.pkijs.simpl.x509.BasicConstraints({
            cA: true,
            pathLenConstraint: 3
        });

        cert.extensions.push(new org.pkijs.simpl.EXTENSION({
            extnID: "2.5.29.19",
            critical: false,
            extnValue: basic_constr.toSchema().toBER(false),
            parsedValue: basic_constr // Parsed value for well-known extensions
        }));

        // "KeyUsage" extension 
        var bit_array = new ArrayBuffer(1);
        var bit_view = new Uint8Array(bit_array);

        bit_view[0] = bit_view[0] | 0x02; // Key usage "cRLSign" flag
        bit_view[0] = bit_view[0] | 0x04; // Key usage "keyCertSign" flag

        var key_usage = new org.pkijs.asn1.BITSTRING({ value_hex: bit_array });

        cert.extensions.push(new org.pkijs.simpl.EXTENSION({
            extnID: "2.5.29.15",
            critical: false,
            extnValue: key_usage.toBER(false),
            parsedValue: key_usage // Parsed value for well-known extensions
        }));

        // Exporting public key into "subjectPublicKeyInfo" value of certificate 
        promise = promise.then(
            function () {
                return cert.subjectPublicKeyInfo.importKey(publicKey);
            }
        );

        // Signing final certificate 
        promise = promise.then(function () {
            return cert.sign(privateKey, digestAlg);
        })
            .then(function () {
                return cert;
            })
            .then(resolve, reject);

    });
}

function SignXml(xmlString, keyPair, algorithm, certRaw) {
    return new Promise(function (resolve, reject) {
        var xmlDoc = new DOMParser().parseFromString(xmlString, "application/xml");
        var signedXml = new xadesjs.SignedXml(xmlDoc);

        // Add the key to the SignedXml document.
        signedXml.SigningKey = keyPair.privateKey;

        // Create a reference to be signed.
        var reference = new xadesjs.Reference();
        reference.Uri = "";

        // Add an enveloped transformation to the reference.
        reference.AddTransform(new xadesjs.XmlDsigEnvelopedSignatureTransform());

        // Add the reference to the SignedXml object.
        signedXml.AddReference(reference);

        // Add KeyInfo
        signedXml.KeyInfo = new xadesjs.KeyInfo();
        var keyInfoClause = null
        if (keyPair.privateKey.algorithm.name === "RSASSA-PKCS1-v1_5") {
            keyInfoClause = new xadesjs.RsaKeyValue();
        } else if (keyPair.privateKey.algorithm.name === "ECDSA") {
            keyInfoClause = new xadesjs.EcdsaKeyValue();
        } else {
            throw new Error("Unknow algorithm in use");
        }
        signedXml.KeyInfo.AddClause(keyInfoClause);

        if (certRaw && keyPair.privateKey.algorithm.name !== "ECDSA") {
            /**
             * TODO
             * keyPair.privateKey.algorithm.name !== "ECDSA"
             * https://github.com/PeculiarVentures/xadesjs/issues/28
             * It should be removed after error fixing 
             */
            var x509 = new xadesjs.X509Certificate(new Uint8Array(certRaw));
            var certInfo = new xadesjs.KeyInfoX509Data();
            certInfo.AddCertificate(x509);
            signedXml.KeyInfo.AddClause(certInfo)
        }

        // Compute the signature.
        signedXml.ComputeSignature(algorithm)
            .then(function () {
                return keyInfoClause.importKey(keyPair.publicKey);
            })
            .then(function () {
                // Append signature
                var xmlDigitalSignature = signedXml.GetXml();
                xmlDoc.documentElement.appendChild(xmlDigitalSignature);

                // Serialize XML document
                var signedDocument = new XMLSerializer().serializeToString(xmlDoc);

                return Promise.resolve(signedDocument);
            })
            .then(resolve, reject);
    })
}

function VerifyXml(signedXml) {
    return new Promise(function (resolve, reject) {
        if (!signedXml)
            throw new Error("Signed document is not found");

        var xml;
        try {
            xml = new DOMParser().parseFromString(signedXml, "application/xml");
        }
        catch (e) {
            throw new Error("Wrong XML document.");
        }

        var signature = select(xml, "//*[local-name(.)='Signature' and namespace-uri(.)='http://www.w3.org/2000/09/xmldsig#']")[0];
        var sig = new xadesjs.SignedXml(xml);
        sig.LoadXml(signature);
        sig.CheckSignature()
            .then(resolve, reject);
    });
}

