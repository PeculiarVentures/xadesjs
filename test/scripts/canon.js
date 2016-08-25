var select, xadesjs, DOMParser, readXml, assert;

if (typeof module !== "undefined") {
    var config = require("./config");
    select = config.select;
    xadesjs = config.xadesjs;
    DOMParser = config.DOMParser;
    assert = config.assert;
    readXml = config.readXml;
}

describe("Canonicalization", function () {

    function isNode() {
        if (typeof window === "undefined") {
            warn("NodeJS");
            return true;
        }
        return false;
    }

    function warn(name) {
        console.warn("    \x1b[33mWARN:\x1b[0m Test is not supported for %s", name);
    }

    function C14N(xml, xpath, result) {
        canon(false, xml, xpath, result, false);
    }

    function C14NComment(xml, xpath, result) {
        canon(false, xml, xpath, result, true);
    }

    function ExcC14N(xml, xpath, result, inclusive) {
        canon(true, xml, xpath, result, false, inclusive);
    }

    function ExcC14NComment(xml, xpath, result, inclusive) {
        canon(true, xml, xpath, result, true, inclusive);
    }

    function canon(exclusive, xml, xpath, result, comment, inclusive) {
        comment = !!comment;
        var doc = new DOMParser().parseFromString(xml, "application/xml")
        var elem = select(doc, xpath)[0]
        var xmlCanonicalizer = new xadesjs.XmlCanonicalizer(!!comment, exclusive);
        if (inclusive)
            xmlCanonicalizer.InclusiveNamespacesPrefixList = inclusive;
        var res = xmlCanonicalizer.Canonicalize(elem);
        var msg = `${exclusive ? "EXC-" : ""}C14N${comment ? "-COMMENT" : ""}${inclusive ? ` with inclusive (${inclusive})` : ""}: ${res} is not ${result}`;
        assert.equal(res, result, msg);
    }



    it("#1 Canonicalization works on xml with no namespaces", function () {
        var xml = '<root><child>123</child></root>';
        var xpath = '//*'
        C14N(xml, xpath, '<root><child>123</child></root>');
        ExcC14N(xml, xpath, '<root><child>123</child></root>');
    });

    it("#2 Canonicalization works on inner xpath", function () {
        var xml = '<root><child>123</child></root>';
        var xpath = '//*[local-name(.)="child"]'
        C14N(xml, xpath, '<child>123</child>');
        ExcC14N(xml, xpath, '<child>123</child>');
    });

    it("#3 Canonicalization works on xml with prefixed namespaces defined in output nodes", function () {
        var xml = '<root><p:child xmlns:p="s"><inner>123</inner></p:child></root>';
        var xpath = '//*[local-name(.)="child"]'
        C14N(xml, xpath, '<p:child xmlns:p="s"><inner>123</inner></p:child>');
        ExcC14N(xml, xpath, '<p:child xmlns:p="s"><inner>123</inner></p:child>');
    });

    it("#4 element used prefixed ns which is also the default", function () {
        var xml = '<root><child xmlns="s"><p:inner xmlns:p="s">123</p:inner></child></root>';
        var xpath = '//*[local-name(.)="child"]'
        C14N(xml, xpath, '<child xmlns="s"><p:inner xmlns:p="s">123</p:inner></child>');
        ExcC14N(xml, xpath, '<child xmlns="s"><p:inner xmlns:p="s">123</p:inner></child>');
    });

    it("#5 Canonicalization works on xml with prefixed namespaces defined in output nodes. ns definition is not duplicated on each usage", function () {
        var xml = '<root><p:child xmlns:p="ns"><p:inner>123</p:inner></p:child></root>';
        var xpath = '//*[local-name(.)="child"]'
        C14N(xml, xpath, '<p:child xmlns:p="ns"><p:inner>123</p:inner></p:child>');
        ExcC14N(xml, xpath, '<p:child xmlns:p="ns"><p:inner>123</p:inner></p:child>');
    })

    it("#6 Canonicalization works on xml with prefixed namespaces defined in output nodes but before used", function () {
        var xml = '<root><child xmlns:p="ns"><p:inner>123</p:inner></child></root>';
        var xpath = '//*[local-name(.)="child"]'
        C14N(xml, xpath, '<child xmlns:p="ns"><p:inner>123</p:inner></child>');
        ExcC14N(xml, xpath, '<child><p:inner xmlns:p="ns">123</p:inner></child>');
    })

    it("#7 Canonicalization works on xml with prefixed namespaces defined outside output nodes", function () {
        var xml = '<root xmlns:p="ns"><p:child>123</p:child></root>';
        var xpath = '//*[local-name(.)="child"]'
        C14N(xml, xpath, '<p:child xmlns:p="ns">123</p:child>');
        ExcC14N(xml, xpath, '<p:child xmlns:p="ns">123</p:child>');
    })

    it("#8 Canonicalization works on xml with prefixed namespace defined in inclusive list", function () {
        var xml = '<root xmlns:p="ns"><p:child xmlns:inclusive="ns2"><inclusive:inner xmlns:inclusive="ns2">123</inclusive:inner></p:child></root>';
        var xpath = '//*[local-name(.)="child"]'
        C14N(xml, xpath, '<p:child xmlns:inclusive="ns2" xmlns:p="ns"><inclusive:inner>123</inclusive:inner></p:child>');
        ExcC14N(xml, xpath, '<p:child xmlns:p="ns"><inclusive:inner xmlns:inclusive="ns2">123</inclusive:inner></p:child>');
        ExcC14N(xml, xpath, '<p:child xmlns:inclusive="ns2" xmlns:p="ns"><inclusive:inner>123</inclusive:inner></p:child>', "inclusive");
    });

    it("#9 Canonicalization works on xml with multiple prefixed namespaces defined in inclusive list", function () {
        var xml = '<root xmlns:p="ns"><p:child xmlns:inclusive="ns2" xmlns:inclusive2="ns3"><inclusive:inner xmlns:inclusive="ns2">123</inclusive:inner><inclusive2:inner xmlns:inclusive2="ns3">456</inclusive2:inner></p:child></root>';
        var xpath = '//*[local-name(.)="child"]'
        C14N(xml, xpath, '<p:child xmlns:inclusive="ns2" xmlns:inclusive2="ns3" xmlns:p="ns"><inclusive:inner>123</inclusive:inner><inclusive2:inner>456</inclusive2:inner></p:child>');
        ExcC14N(xml, xpath, '<p:child xmlns:p="ns"><inclusive:inner xmlns:inclusive="ns2">123</inclusive:inner><inclusive2:inner xmlns:inclusive2="ns3">456</inclusive2:inner></p:child>');
        ExcC14N(xml, xpath, '<p:child xmlns:inclusive="ns2" xmlns:inclusive2="ns3" xmlns:p="ns"><inclusive:inner>123</inclusive:inner><inclusive2:inner>456</inclusive2:inner></p:child>', "inclusive inclusive2");
    });

    it("#10 Canonicalization works on xml with prefixed namespace defined in inclusive list defined outside output nodes", function () {
        var xml = '<root xmlns:p="ns" xmlns:inclusive="ns2"><p:child><inclusive:inner xmlns:inclusive="ns2">123</inclusive:inner></p:child></root>';
        var xpath = '//*[local-name(.)="child"]'
        C14N(xml, xpath, '<p:child xmlns:p="ns"><inclusive:inner xmlns:inclusive="ns2">123</inclusive:inner></p:child>');
        ExcC14N(xml, xpath, '<p:child xmlns:p="ns"><inclusive:inner xmlns:inclusive="ns2">123</inclusive:inner></p:child>');
        ExcC14N(xml, xpath, '<p:child xmlns:p="ns"><inclusive:inner xmlns:inclusive="ns2">123</inclusive:inner></p:child>', "inclusive");
    });

    it("#11 Canonicalization works on xml with prefixed namespace defined in inclusive list used on attribute", function () {
        var xml = '<root xmlns:p="ns"><p:child xmlns:inclusive="ns2"><p:inner foo="inclusive:bar">123</p:inner></p:child></root>';
        var xpath = '//*[local-name(.)="child"]'
        C14N(xml, xpath, '<p:child xmlns:inclusive="ns2" xmlns:p="ns"><p:inner foo="inclusive:bar">123</p:inner></p:child>');
        ExcC14N(xml, xpath, '<p:child xmlns:p="ns"><p:inner foo="inclusive:bar">123</p:inner></p:child>');
        ExcC14N(xml, xpath, '<p:child xmlns:inclusive="ns2" xmlns:p="ns"><p:inner foo="inclusive:bar">123</p:inner></p:child>', "inclusive");
    })

    it("#12 Canonicalization works on xml with default namespace inside output nodes", function () {
        var xml = '<root><child><inner xmlns="ns">123</inner></child></root>';
        var xpath = '//*[local-name(.)="child"]'
        C14N(xml, xpath, '<child><inner xmlns="ns">123</inner></child>');
        ExcC14N(xml, xpath, '<child><inner xmlns="ns">123</inner></child>');
    });

    it("#13 Canonicalization works on xml with multiple different default namespaces", function () {
        var xml = '<root xmlns="ns1"><child xmlns="ns2"><inner xmlns="ns3">123</inner></child></root>';
        var xpath = '//*[local-name(.)="child"]'
        C14N(xml, xpath, '<child xmlns="ns2"><inner xmlns="ns3">123</inner></child>');
        ExcC14N(xml, xpath, '<child xmlns="ns2"><inner xmlns="ns3">123</inner></child>');
    });

    it("#14 Canonicalization works on xml with multiple similar default namespaces", function () {
        var xml = '<root xmlns="ns1"><child xmlns="ns2"><inner xmlns="ns2">123</inner></child></root>';
        var xpath = '//*[local-name(.)="child"]'
        C14N(xml, xpath, '<child xmlns="ns2"><inner>123</inner></child>');
        ExcC14N(xml, xpath, '<child xmlns="ns2"><inner>123</inner></child>');
    });

    it("#15 Canonicalization works on xml with default namespace outside output nodes", function () {
        var xml = '<root xmlns="ns"><child><inner>123</inner></child></root>';
        var xpath = '//*[local-name(.)="child"]'
        C14N(xml, xpath, '<child xmlns="ns"><inner>123</inner></child>');
        ExcC14N(xml, xpath, '<child xmlns="ns"><inner>123</inner></child>');
    });

    it("#16 Canonicalization works when prefixed namespace is defined in output nodes not in the parent chain of who needs it", function () {
        var xml = '<root><child><p:inner1 xmlns:p="foo" /><p:inner2 xmlns:p="foo" /><p:inner3 xmlns:p="foo" /></child></root>';
        var xpath = '//*[local-name(.)="child"]'
        C14N(xml, xpath, '<child><p:inner1 xmlns:p="foo"></p:inner1><p:inner2 xmlns:p="foo"></p:inner2><p:inner3 xmlns:p="foo"></p:inner3></child>');
        ExcC14N(xml, xpath, '<child><p:inner1 xmlns:p="foo"></p:inner1><p:inner2 xmlns:p="foo"></p:inner2><p:inner3 xmlns:p="foo"></p:inner3></child>');
    });

    it("#17 Canonicalization works on xml with unordered attributes", function () {
        var xml = '<root><child xmlns:z="ns2" xmlns:p="ns1" p:name="val1" z:someAttr="zval" Id="value" z:testAttr="ztestAttr" someAttr="someAttrVal" p:address="val2"><inner>123</inner></child></root>';
        var xpath = '//*[local-name(.)="child"]'
        C14N(xml, xpath, '<child xmlns:p="ns1" xmlns:z="ns2" Id="value" someAttr="someAttrVal" p:address="val2" p:name="val1" z:someAttr="zval" z:testAttr="ztestAttr"><inner>123</inner></child>');
        ExcC14N(xml, xpath, '<child xmlns:p="ns1" xmlns:z="ns2" Id="value" someAttr="someAttrVal" p:address="val2" p:name="val1" z:someAttr="zval" z:testAttr="ztestAttr"><inner>123</inner></child>');
    });

    it("#18 Canonicalization sorts upper case attributes before lower case", function () {
        var xml = '<x id="" Id=""></x>';
        var xpath = '//*[local-name(.)="x"]'
        C14N(xml, xpath, '<x Id="" id=""></x>');
        ExcC14N(xml, xpath, '<x Id="" id=""></x>');
    });

    it("#19 Canonicalization with comments retains comments", function () {
        var xml = '<x id="" Id=""><!-- Comment --></x>';
        var xpath = '//*[local-name(.)="x"]'
        C14N(xml, xpath, '<x Id="" id=""></x>');
        C14NComment(xml, xpath, '<x Id="" id=""><!-- Comment --></x>');
        ExcC14N(xml, xpath, '<x Id="" id=""></x>');
        ExcC14NComment(xml, xpath, '<x Id="" id=""><!-- Comment --></x>');
    });

    it("#20 Canonicalization works on xml with attributes with different namespace than element", function () {
        var xml = '<root><child xmlns="bla" xmlns:p="foo" p:attr="val"><inner>123</inner></child></root>';
        var xpath = '//*[local-name(.)="child"]'
        C14N(xml, xpath, '<child xmlns="bla" xmlns:p="foo" p:attr="val"><inner>123</inner></child>');
        ExcC14N(xml, xpath, '<child xmlns="bla" xmlns:p="foo" p:attr="val"><inner>123</inner></child>');
    });

    it("#21 Canonicalization works on xml with attribute and element values with special characters", function () {
        var xml = '<root><child><inner attr="&amp;11">&amp;11</inner></child></root>';
        var xpath = '//*[local-name(.)="child"]'
        C14N(xml, xpath, '<child><inner attr="&amp;11">&amp;11</inner></child>');
        ExcC14N(xml, xpath, '<child><inner attr="&amp;11">&amp;11</inner></child>');
    });

    it("#22 Canonicalization preserves white space in values", function () {
        var xml = '<root><child><inner>12\n3\t</inner></child></root>';
        var xpath = '//*[local-name(.)="child"]'
        C14N(xml, xpath, '<child><inner>12\n3\t</inner></child>');
        ExcC14N(xml, xpath, '<child><inner>12\n3\t</inner></child>');
    });

    it("#23 Canonicalization preserves white space bewteen elements", function () {
        var xml = '<root><child><inner>123</inner>\n</child></root>';
        var xpath = '//*[local-name(.)="child"]'
        C14N(xml, xpath, '<child><inner>123</inner>\n</child>');
        ExcC14N(xml, xpath, '<child><inner>123</inner>\n</child>');
    });

    it("#24 Canonicalization turns empty element to start-end tag pairs", function () {
        var xml = '<root><child><inner /></child></root>';
        var xpath = '//*[local-name(.)="child"]'
        C14N(xml, xpath, '<child><inner></inner></child>');
        ExcC14N(xml, xpath, '<child><inner></inner></child>');
    });

    it("#25 Canonicalization preserves empty start-end tag pairs", function () {
        var xml = '<root><child><inner></inner></child></root>';
        var xpath = '//*[local-name(.)="child"]'
        C14N(xml, xpath, '<child><inner></inner></child>');
        ExcC14N(xml, xpath, '<child><inner></inner></child>');
    });

    it("#26 Canonicalization self-closed tag", function () {
        var xml = '<root><child><inner/></child></root>';
        var xpath = '//*[local-name(.)="child"]'
        C14N(xml, xpath, '<child><inner></inner></child>');
        ExcC14N(xml, xpath, '<child><inner></inner></child>');
    });

    it("#27 Canonicalization with empty default namespace outside output nodes", function () {
        var xml = '<root xmlns=""><child><inner>123</inner></child></root>';
        var xpath = '//*[local-name(.)="child"]'
        C14N(xml, xpath, '<child><inner>123</inner></child>');
        ExcC14N(xml, xpath, '<child><inner>123</inner></child>');
    });

    it("#28 Canonicalization removal of whitespace between PITarget and its data", function () {
        if (isNode()) return;
        var xml = '<root xmlns=""><child><inner>123</inner><?pi-without-data   ?></child></root>';
        var xpath = '//*[local-name(.)="child"]'
        C14N(xml, xpath, '<child><inner>123</inner><?pi-without-data?></child>');
        ExcC14N(xml, xpath, '<child><inner>123</inner><?pi-without-data?></child>');
    });

    it("#29 Canonicalization with empty default namespace inside output nodes", function () {
        if (isNode()) return;
        // throw new Error("Not finished");
        // var xml = '<root xmlns="foo"><child><inner xmlns="">123</inner></child></root>';
        // var xpath = '//*[local-name(.)="child"]'
        // C14N(xml, xpath, '<child xmlns="foo"><inner xmlns="">123</inner></child>');
        // ExcC14N(xml, xpath, '<child xmlns="foo"><inner xmlns="">123</inner></child>');
    });

    it("#30 The XML declaration and document type declaration (DTD) are removed", function () {
        var xml = '<?xml version="1.0" encoding="utf-8"?><root><child><inner>123</inner></child></root>';
        var xpath = '//*[local-name(.)="child"]'
        C14N(xml, xpath, '<child><inner>123</inner></child>');
        ExcC14N(xml, xpath, '<child><inner>123</inner></child>');
    });

    it("#31 Attribute value delimiters are set to quotation marks (double quotes)", function () {
        var xml = '<root><child xmlns="ns"><inner attr="value">123 </inner></child></root>';
        var xpath = '//*[local-name(.)="child"]'
        C14N(xml, xpath, '<child xmlns="ns"><inner attr="value">123 </inner></child>');
        ExcC14N(xml, xpath, '<child xmlns="ns"><inner attr="value">123 </inner></child>');
    });

    it("#32 CDATA sections are replaced with their character content", function () {
        var xml = '<root><child><inner><![CDATA[foo & bar in the <x>123</x>]]></inner></child></root>';
        var xpath = '//*[local-name(.)="child"]'
        C14N(xml, xpath, '<child><inner>foo &amp; bar in the &lt;x&gt;123&lt;/x&gt;</inner></child>');
        ExcC14N(xml, xpath, '<child><inner>foo &amp; bar in the &lt;x&gt;123&lt;/x&gt;</inner></child>');
    });

    it("#33 SignedInfo canonization", function () {
        var xml = "<?xml version=\"1.0\" encoding=\"utf-8\"?><soap:Envelope xmlns:soap=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\" xmlns:wsa=\"http://schemas.xmlsoap.org/ws/2004/03/addressing\" xmlns:wsse=\"http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd\" xmlns:wsu=\"http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd\"><soap:Header><wsa:Action wsu:Id=\"Id-fbcf79b7-9c1b-4e51-b3da-7d6c237be1ec\">http://stockservice.contoso.com/wse/samples/2003/06/StockQuoteRequest</wsa:Action><wsa:MessageID wsu:Id=\"Id-02b76fe1-945c-4e26-a8a5-6650285bbd4c\">uuid:6250c037-bcde-40ab-82b3-3a08efc86cdc</wsa:MessageID><wsa:ReplyTo wsu:Id=\"Id-ccc937f4-8ec8-416a-b97b-0b612a69b040\"><wsa:Address>http://schemas.xmlsoap.org/ws/2004/03/addressing/role/anonymous</wsa:Address></wsa:ReplyTo><wsa:To wsu:Id=\"Id-fa48ae82-88bb-4bf1-9c0d-4eb1de66c4fc\">http://localhost:8889/</wsa:To><wsse:Security soap:mustUnderstand=\"1\"><wsu:Timestamp wsu:Id=\"Timestamp-4d2cce4a-39fb-4d7d-b0d5-17d583255ef5\"><wsu:Created>2008-09-01T17:44:21Z</wsu:Created><wsu:Expires>2008-09-01T17:49:21Z</wsu:Expires></wsu:Timestamp><wsse:BinarySecurityToken ValueType=\"http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-x509-token-profile-1.0#X509v3\" EncodingType=\"http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-soap-message-security-1.0#Base64Binary\" xmlns:wsu=\"http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd\" wsu:Id=\"SecurityToken-d68c34d4-be89-4a29-aecc-971bce003ed3\">MIIBxDCCAW6gAwIBAgIQxUSXFzWJYYtOZnmmuOMKkjANBgkqhkiG9w0BAQQFADAWMRQwEgYDVQQDEwtSb290IEFnZW5jeTAeFw0wMzA3MDgxODQ3NTlaFw0zOTEyMzEyMzU5NTlaMB8xHTAbBgNVBAMTFFdTRTJRdWlja1N0YXJ0Q2xpZW50MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC+L6aB9x928noY4+0QBsXnxkQE4quJl7c3PUPdVu7k9A02hRG481XIfWhrDY5i7OEB7KGW7qFJotLLeMec/UkKUwCgv3VvJrs2nE9xO3SSWIdNzADukYh+Cxt+FUU6tUkDeqg7dqwivOXhuOTRyOI3HqbWTbumaLdc8jufz2LhaQIDAQABo0swSTBHBgNVHQEEQDA+gBAS5AktBh0dTwCNYSHcFmRjoRgwFjEUMBIGA1UEAxMLUm9vdCBBZ2VuY3mCEAY3bACqAGSKEc+41KpcNfQwDQYJKoZIhvcNAQEEBQADQQAfIbnMPVYkNNfX1tG1F+qfLhHwJdfDUZuPyRPucWF5qkh6sSdWVBY5sT/txBnVJGziyO8DPYdu2fPMER8ajJfl</wsse:BinarySecurityToken><Signature xmlns=\"http://www.w3.org/2000/09/xmldsig#\"><SignedInfo><ds:CanonicalizationMethod Algorithm=\"http://www.w3.org/2001/10/xml-exc-c14n#\" xmlns:ds=\"http://www.w3.org/2000/09/xmldsig#\" /><SignatureMethod Algorithm=\"http://www.w3.org/2000/09/xmldsig#rsa-sha1\" /><Reference URI=\"#Id-fbcf79b7-9c1b-4e51-b3da-7d6c237be1ec\"><Transforms><Transform Algorithm=\"http://www.w3.org/2001/10/xml-exc-c14n#\" /></Transforms><DigestMethod Algorithm=\"http://www.w3.org/2000/09/xmldsig#sha1\" /><DigestValue>+465BlJx5xOfHsIFezQt0MS1vZQ=</DigestValue></Reference><Reference URI=\"#Id-02b76fe1-945c-4e26-a8a5-6650285bbd4c\"><Transforms><Transform Algorithm=\"http://www.w3.org/2001/10/xml-exc-c14n#\" /></Transforms><DigestMethod Algorithm=\"http://www.w3.org/2000/09/xmldsig#sha1\" /><DigestValue>jEe8rnaaqBWZQe+xHBQXriVG99o=</DigestValue></Reference><Reference URI=\"#Id-ccc937f4-8ec8-416a-b97b-0b612a69b040\"><Transforms><Transform Algorithm=\"http://www.w3.org/2001/10/xml-exc-c14n#\" /></Transforms><DigestMethod Algorithm=\"http://www.w3.org/2000/09/xmldsig#sha1\" /><DigestValue>W45ginYdBVqOqEaqPI2piZMPReA=</DigestValue></Reference><Reference URI=\"#Id-fa48ae82-88bb-4bf1-9c0d-4eb1de66c4fc\"><Transforms><Transform Algorithm=\"http://www.w3.org/2001/10/xml-exc-c14n#\" /></Transforms><DigestMethod Algorithm=\"http://www.w3.org/2000/09/xmldsig#sha1\" /><DigestValue>m2VlWz/ZDTWL7FREHK+wpKhvjJM=</DigestValue></Reference><Reference URI=\"#Timestamp-4d2cce4a-39fb-4d7d-b0d5-17d583255ef5\"><Transforms><Transform Algorithm=\"http://www.w3.org/2001/10/xml-exc-c14n#\" /></Transforms><DigestMethod Algorithm=\"http://www.w3.org/2000/09/xmldsig#sha1\" /><DigestValue>Qws229qmAzSTZ4OKmAUWgl0PWWo=</DigestValue></Reference><Reference URI=\"#Id-0175a715-4db3-4886-8af1-991b1472e7f4\"><Transforms><Transform Algorithm=\"http://www.w3.org/2001/10/xml-exc-c14n#\" /></Transforms><DigestMethod Algorithm=\"http://www.w3.org/2000/09/xmldsig#sha1\" /><DigestValue>iEazGnkPY5caCWVZOHyR87CZ1h0=</DigestValue></Reference></SignedInfo><SignatureValue>Fkm7AbwiJCiOzY8ldfuA9pTW1G+EtE+UX4Cv7SoMIqeUdfWRDVHZpJAQyf7aoQnlpJNV/3k9L1PT6rJbfV478CkULJENPLm1m0fmDeLzhIHDEANuzp/AirC60tMD5jCARb4B4Nr/6bTmoyDQsTY8VLRiiINng7Mpweg1FZvd8a0=</SignatureValue><KeyInfo><wsse:SecurityTokenReference><wsse:Reference URI=\"#SecurityToken-d68c34d4-be89-4a29-aecc-971bce003ed3\" ValueType=\"http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-x509-token-profile-1.0#X509v3\" /></wsse:SecurityTokenReference></KeyInfo></Signature></wsse:Security></soap:Header><soap:Body wsu:Id=\"Id-0175a715-4db3-4886-8af1-991b1472e7f4\"><StockQuoteRequest xmlns=\"http://stockservice.contoso.com/wse/samples/2003/06\"><symbols><Symbol>FABRIKAM</Symbol></symbols></StockQuoteRequest></soap:Body></soap:Envelope>";
        var xpath = '//*[local-name(.)="SignedInfo"]';
        C14N(xml, xpath, '<SignedInfo xmlns="http://www.w3.org/2000/09/xmldsig#"><ds:CanonicalizationMethod xmlns:ds="http://www.w3.org/2000/09/xmldsig#" Algorithm="http://www.w3.org/2001/10/xml-exc-c14n#"></ds:CanonicalizationMethod><SignatureMethod Algorithm="http://www.w3.org/2000/09/xmldsig#rsa-sha1"></SignatureMethod><Reference URI="#Id-fbcf79b7-9c1b-4e51-b3da-7d6c237be1ec"><Transforms><Transform Algorithm="http://www.w3.org/2001/10/xml-exc-c14n#"></Transform></Transforms><DigestMethod Algorithm="http://www.w3.org/2000/09/xmldsig#sha1"></DigestMethod><DigestValue>+465BlJx5xOfHsIFezQt0MS1vZQ=</DigestValue></Reference><Reference URI="#Id-02b76fe1-945c-4e26-a8a5-6650285bbd4c"><Transforms><Transform Algorithm="http://www.w3.org/2001/10/xml-exc-c14n#"></Transform></Transforms><DigestMethod Algorithm="http://www.w3.org/2000/09/xmldsig#sha1"></DigestMethod><DigestValue>jEe8rnaaqBWZQe+xHBQXriVG99o=</DigestValue></Reference><Reference URI="#Id-ccc937f4-8ec8-416a-b97b-0b612a69b040"><Transforms><Transform Algorithm="http://www.w3.org/2001/10/xml-exc-c14n#"></Transform></Transforms><DigestMethod Algorithm="http://www.w3.org/2000/09/xmldsig#sha1"></DigestMethod><DigestValue>W45ginYdBVqOqEaqPI2piZMPReA=</DigestValue></Reference><Reference URI="#Id-fa48ae82-88bb-4bf1-9c0d-4eb1de66c4fc"><Transforms><Transform Algorithm="http://www.w3.org/2001/10/xml-exc-c14n#"></Transform></Transforms><DigestMethod Algorithm="http://www.w3.org/2000/09/xmldsig#sha1"></DigestMethod><DigestValue>m2VlWz/ZDTWL7FREHK+wpKhvjJM=</DigestValue></Reference><Reference URI="#Timestamp-4d2cce4a-39fb-4d7d-b0d5-17d583255ef5"><Transforms><Transform Algorithm="http://www.w3.org/2001/10/xml-exc-c14n#"></Transform></Transforms><DigestMethod Algorithm="http://www.w3.org/2000/09/xmldsig#sha1"></DigestMethod><DigestValue>Qws229qmAzSTZ4OKmAUWgl0PWWo=</DigestValue></Reference><Reference URI="#Id-0175a715-4db3-4886-8af1-991b1472e7f4"><Transforms><Transform Algorithm="http://www.w3.org/2001/10/xml-exc-c14n#"></Transform></Transforms><DigestMethod Algorithm="http://www.w3.org/2000/09/xmldsig#sha1"></DigestMethod><DigestValue>iEazGnkPY5caCWVZOHyR87CZ1h0=</DigestValue></Reference></SignedInfo>');
        ExcC14N(xml, xpath, '<SignedInfo xmlns="http://www.w3.org/2000/09/xmldsig#"><ds:CanonicalizationMethod xmlns:ds="http://www.w3.org/2000/09/xmldsig#" Algorithm="http://www.w3.org/2001/10/xml-exc-c14n#"></ds:CanonicalizationMethod><SignatureMethod Algorithm="http://www.w3.org/2000/09/xmldsig#rsa-sha1"></SignatureMethod><Reference URI="#Id-fbcf79b7-9c1b-4e51-b3da-7d6c237be1ec"><Transforms><Transform Algorithm="http://www.w3.org/2001/10/xml-exc-c14n#"></Transform></Transforms><DigestMethod Algorithm="http://www.w3.org/2000/09/xmldsig#sha1"></DigestMethod><DigestValue>+465BlJx5xOfHsIFezQt0MS1vZQ=</DigestValue></Reference><Reference URI="#Id-02b76fe1-945c-4e26-a8a5-6650285bbd4c"><Transforms><Transform Algorithm="http://www.w3.org/2001/10/xml-exc-c14n#"></Transform></Transforms><DigestMethod Algorithm="http://www.w3.org/2000/09/xmldsig#sha1"></DigestMethod><DigestValue>jEe8rnaaqBWZQe+xHBQXriVG99o=</DigestValue></Reference><Reference URI="#Id-ccc937f4-8ec8-416a-b97b-0b612a69b040"><Transforms><Transform Algorithm="http://www.w3.org/2001/10/xml-exc-c14n#"></Transform></Transforms><DigestMethod Algorithm="http://www.w3.org/2000/09/xmldsig#sha1"></DigestMethod><DigestValue>W45ginYdBVqOqEaqPI2piZMPReA=</DigestValue></Reference><Reference URI="#Id-fa48ae82-88bb-4bf1-9c0d-4eb1de66c4fc"><Transforms><Transform Algorithm="http://www.w3.org/2001/10/xml-exc-c14n#"></Transform></Transforms><DigestMethod Algorithm="http://www.w3.org/2000/09/xmldsig#sha1"></DigestMethod><DigestValue>m2VlWz/ZDTWL7FREHK+wpKhvjJM=</DigestValue></Reference><Reference URI="#Timestamp-4d2cce4a-39fb-4d7d-b0d5-17d583255ef5"><Transforms><Transform Algorithm="http://www.w3.org/2001/10/xml-exc-c14n#"></Transform></Transforms><DigestMethod Algorithm="http://www.w3.org/2000/09/xmldsig#sha1"></DigestMethod><DigestValue>Qws229qmAzSTZ4OKmAUWgl0PWWo=</DigestValue></Reference><Reference URI="#Id-0175a715-4db3-4886-8af1-991b1472e7f4"><Transforms><Transform Algorithm="http://www.w3.org/2001/10/xml-exc-c14n#"></Transform></Transforms><DigestMethod Algorithm="http://www.w3.org/2000/09/xmldsig#sha1"></DigestMethod><DigestValue>iEazGnkPY5caCWVZOHyR87CZ1h0=</DigestValue></Reference></SignedInfo>');
    });

    it("#34 Exclusive canonicalization works on complex xml", function () {
        var xml = "<?xml version=\"1.0\" encoding=\"utf-8\"?>\r" +
            "<Envelope xmlns=\"http://schemas.xmlsoap.org/soap/envelope/\">\n" +
            "  <Body>\n" +
            "    <ACORD xmlns=\"http://www.ACORD.org/standards/PC_Surety/ACORD1.10.0/xml/\">\n" +
            "      <SignonRq>\n" +
            "        <SessKey />\n" +
            "        <ClientDt />\n" +
            "        <CustLangPref />\n" +
            "        <ClientApp>\n" +
            "          <Org p6:type=\"AssignedIdentifier\" id=\"wewe\" xmlns:p6=\"http://www.w3.org/2001/XMLSchema-instance\" />\n" +
            "          <Name />\n" +
            "          <Version />\n" +
            "        </ClientApp>\n" +
            "        <ProxyClient>\n" +
            "          <Org p6:type=\"AssignedIdentifier\" id=\"erer\" xmlns:p6=\"http://www.w3.org/2001/XMLSchema-instance\" />\n" +
            "          <Name>ererer</Name>\n" +
            "          <Version>dfdf</Version>\n" +
            "        </ProxyClient>\n" +
            "      </SignonRq>\n" +
            "      <InsuranceSvcRq>\n" +
            "        <RqUID />\n" +
            "        <SPName id=\"rter\" />\n" +
            "        <QuickHit xmlns=\"urn:com.thehartford.bi.acord-extensions\">\n" +
            "          <StateProvCd CodeListRef=\"dfdf\" xmlns=\"http://www.ACORD.org/standards/PC_Surety/ACORD1.10.0/xml/\" />\n" +
            "        </QuickHit>\n" +
            "        <WorkCompPolicyQuoteInqRq>\n" +
            "          <RqUID>erer</RqUID>\n" +
            "          <TransactionRequestDt id=\"erer\" />\n" +
            "          <CurCd />\n" +
            "          <BroadLOBCd id=\"erer\" />\n" +
            "          <InsuredOrPrincipal>\n" +
            "            <ItemIdInfo>\n" +
            "              <AgencyId id=\"3434\" />\n" +
            "              <OtherIdentifier>\n" +
            "                <CommercialName id=\"3434\" />\n" +
            "                <ContractTerm>\n" +
            "                  <EffectiveDt id=\"3434\" />\n" +
            "                  <StartTime id=\"3434\" />\n" +
            "                </ContractTerm>\n" +
            "              </OtherIdentifier>\n" +
            "            </ItemIdInfo>\n" +
            "          </InsuredOrPrincipal>\n" +
            "          <InsuredOrPrincipal>\n" +
            "          </InsuredOrPrincipal>\n" +
            "          <CommlPolicy>\n" +
            "            <PolicyNumber id=\"3434\" />\n" +
            "            <LOBCd />\n" +
            "          </CommlPolicy>\n" +
            "          <WorkCompLineBusiness>\n" +
            "            <LOBCd />\n" +
            "            <WorkCompRateState>\n" +
            "              <WorkCompLocInfo>\n" +
            "              </WorkCompLocInfo>\n" +
            "            </WorkCompRateState>\n" +
            "          </WorkCompLineBusiness>\n" +
            "          <RemarkText IdRef=\"\">\n" +
            "          </RemarkText>\n" +
            "          <RemarkText IdRef=\"2323\" id=\"3434\">\n" +
            "          </RemarkText>\n" +
            "        </WorkCompPolicyQuoteInqRq>\n" +
            "      </InsuranceSvcRq>\n" +
            "    </ACORD>\n" +
            "  </Body>\n" +
            "</Envelope>";
        var xpath = '//*[local-name(.)="Body"]'
        C14N(xml, xpath, "<Body xmlns=\"http://schemas.xmlsoap.org/soap/envelope/\">\n    <ACORD xmlns=\"http://www.ACORD.org/standards/PC_Surety/ACORD1.10.0/xml/\">\n      <SignonRq>\n        <SessKey></SessKey>\n        <ClientDt></ClientDt>\n        <CustLangPref></CustLangPref>\n        <ClientApp>\n          <Org xmlns:p6=\"http://www.w3.org/2001/XMLSchema-instance\" id=\"wewe\" p6:type=\"AssignedIdentifier\"></Org>\n          <Name></Name>\n          <Version></Version>\n        </ClientApp>\n        <ProxyClient>\n          <Org xmlns:p6=\"http://www.w3.org/2001/XMLSchema-instance\" id=\"erer\" p6:type=\"AssignedIdentifier\"></Org>\n          <Name>ererer</Name>\n          <Version>dfdf</Version>\n        </ProxyClient>\n      </SignonRq>\n      <InsuranceSvcRq>\n        <RqUID></RqUID>\n        <SPName id=\"rter\"></SPName>\n        <QuickHit xmlns=\"urn:com.thehartford.bi.acord-extensions\">\n          <StateProvCd xmlns=\"http://www.ACORD.org/standards/PC_Surety/ACORD1.10.0/xml/\" CodeListRef=\"dfdf\"></StateProvCd>\n        </QuickHit>\n        <WorkCompPolicyQuoteInqRq>\n          <RqUID>erer</RqUID>\n          <TransactionRequestDt id=\"erer\"></TransactionRequestDt>\n          <CurCd></CurCd>\n          <BroadLOBCd id=\"erer\"></BroadLOBCd>\n          <InsuredOrPrincipal>\n            <ItemIdInfo>\n              <AgencyId id=\"3434\"></AgencyId>\n              <OtherIdentifier>\n                <CommercialName id=\"3434\"></CommercialName>\n                <ContractTerm>\n                  <EffectiveDt id=\"3434\"></EffectiveDt>\n                  <StartTime id=\"3434\"></StartTime>\n                </ContractTerm>\n              </OtherIdentifier>\n            </ItemIdInfo>\n          </InsuredOrPrincipal>\n          <InsuredOrPrincipal>\n          </InsuredOrPrincipal>\n          <CommlPolicy>\n            <PolicyNumber id=\"3434\"></PolicyNumber>\n            <LOBCd></LOBCd>\n          </CommlPolicy>\n          <WorkCompLineBusiness>\n            <LOBCd></LOBCd>\n            <WorkCompRateState>\n              <WorkCompLocInfo>\n              </WorkCompLocInfo>\n            </WorkCompRateState>\n          </WorkCompLineBusiness>\n          <RemarkText IdRef=\"\">\n          </RemarkText>\n          <RemarkText IdRef=\"2323\" id=\"3434\">\n          </RemarkText>\n        </WorkCompPolicyQuoteInqRq>\n      </InsuranceSvcRq>\n    </ACORD>\n  </Body>");
        ExcC14N(xml, xpath, "<Body xmlns=\"http://schemas.xmlsoap.org/soap/envelope/\">\n    <ACORD xmlns=\"http://www.ACORD.org/standards/PC_Surety/ACORD1.10.0/xml/\">\n      <SignonRq>\n        <SessKey></SessKey>\n        <ClientDt></ClientDt>\n        <CustLangPref></CustLangPref>\n        <ClientApp>\n          <Org xmlns:p6=\"http://www.w3.org/2001/XMLSchema-instance\" id=\"wewe\" p6:type=\"AssignedIdentifier\"></Org>\n          <Name></Name>\n          <Version></Version>\n        </ClientApp>\n        <ProxyClient>\n          <Org xmlns:p6=\"http://www.w3.org/2001/XMLSchema-instance\" id=\"erer\" p6:type=\"AssignedIdentifier\"></Org>\n          <Name>ererer</Name>\n          <Version>dfdf</Version>\n        </ProxyClient>\n      </SignonRq>\n      <InsuranceSvcRq>\n        <RqUID></RqUID>\n        <SPName id=\"rter\"></SPName>\n        <QuickHit xmlns=\"urn:com.thehartford.bi.acord-extensions\">\n          <StateProvCd xmlns=\"http://www.ACORD.org/standards/PC_Surety/ACORD1.10.0/xml/\" CodeListRef=\"dfdf\"></StateProvCd>\n        </QuickHit>\n        <WorkCompPolicyQuoteInqRq>\n          <RqUID>erer</RqUID>\n          <TransactionRequestDt id=\"erer\"></TransactionRequestDt>\n          <CurCd></CurCd>\n          <BroadLOBCd id=\"erer\"></BroadLOBCd>\n          <InsuredOrPrincipal>\n            <ItemIdInfo>\n              <AgencyId id=\"3434\"></AgencyId>\n              <OtherIdentifier>\n                <CommercialName id=\"3434\"></CommercialName>\n                <ContractTerm>\n                  <EffectiveDt id=\"3434\"></EffectiveDt>\n                  <StartTime id=\"3434\"></StartTime>\n                </ContractTerm>\n              </OtherIdentifier>\n            </ItemIdInfo>\n          </InsuredOrPrincipal>\n          <InsuredOrPrincipal>\n          </InsuredOrPrincipal>\n          <CommlPolicy>\n            <PolicyNumber id=\"3434\"></PolicyNumber>\n            <LOBCd></LOBCd>\n          </CommlPolicy>\n          <WorkCompLineBusiness>\n            <LOBCd></LOBCd>\n            <WorkCompRateState>\n              <WorkCompLocInfo>\n              </WorkCompLocInfo>\n            </WorkCompRateState>\n          </WorkCompLineBusiness>\n          <RemarkText IdRef=\"\">\n          </RemarkText>\n          <RemarkText IdRef=\"2323\" id=\"3434\">\n          </RemarkText>\n        </WorkCompPolicyQuoteInqRq>\n      </InsuranceSvcRq>\n    </ACORD>\n  </Body>");
    });

    it("#35 Lexicographic comparison, which orders strings from least to greatest alphabetically, is based on the UCS codepoint values, which is equivalent to lexicographic ordering based on UTF- 8.", function () {
        var xml = '<root xmlns:b="moo" b:attr1="a1" a:attr1="a1" b:attr4="b4" xmlns="foo" b:attr3="a3" xmlns:a="zoo"></root>';
        var xpath = '//*[local-name(.)="root"]'
        C14N(xml, xpath, '<root xmlns="foo" xmlns:a="zoo" xmlns:b="moo" b:attr1="a1" b:attr3="a3" b:attr4="b4" a:attr1="a1"></root>');
        ExcC14N(xml, xpath, '<root xmlns="foo" xmlns:a="zoo" xmlns:b="moo" b:attr1="a1" b:attr3="a3" b:attr4="b4" a:attr1="a1"></root>');
    });

    it("#36 saml attributed order", function () {
        var xml = '<root xmlns:samlp="urn:oasis:names:tc:SAML:2.0:protocol" xmlns="urn:oasis:names:tc:SAML:2.0:protocol" xmlns:saml="urn:oasis:names:tc:SAML:2.0:assertion" samlp:a="1" saml:a="1"></root>';
        var xpath = '//*[local-name(.)="root"]'
        C14N(xml, xpath, '<root xmlns="urn:oasis:names:tc:SAML:2.0:protocol" xmlns:saml="urn:oasis:names:tc:SAML:2.0:assertion" xmlns:samlp="urn:oasis:names:tc:SAML:2.0:protocol" saml:a="1" samlp:a="1"></root>');
        ExcC14N(xml, xpath, '<root xmlns="urn:oasis:names:tc:SAML:2.0:protocol" xmlns:saml="urn:oasis:names:tc:SAML:2.0:assertion" xmlns:samlp="urn:oasis:names:tc:SAML:2.0:protocol" saml:a="1" samlp:a="1"></root>');
    });

});