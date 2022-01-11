import * as assert from "assert";
import { XmlDsigC14NTransform } from "xmldsigjs";
import * as XAdES from "../../src";

context("xml", () => {

    context("GenericTimeStamp", () => {

        it("Parse", () => {
            const xmlObject = new XAdES.xml.GenericTimeStamp();

            xmlObject.Id = "123";
            const encTS = new XAdES.xml.EncapsulatedTimeStamp();
            encTS.Value = new Uint8Array([1, 0, 1]);
            xmlObject.EncapsulatedTimeStamp.Add(encTS);
            xmlObject.Include.Uri = "http://some.com";
            xmlObject.Include.ReferencedData = true;
            const rInfo = new XAdES.xml.ReferenceInfo();
            rInfo.DigestMethod.Algorithm = "http://www.w3.org/2001/04/xmlenc#sha256";
            rInfo.DigestValue = new Uint8Array([1, 0, 1]);
            rInfo.Id = "123";
            rInfo.Uri = "http://some.com";
            xmlObject.ReferenceInfo.Add(rInfo);
            const xmlTS = new XAdES.xml.XMLTimeStamp();
            xmlTS.Value = "some";
            xmlObject.XMLTimeStamp.Add(xmlTS);
            xmlObject.CanonicalizationMethod.Algorithm = "http://www.w3.org/TR/2001/REC-xml-c14n-20010315";

            // fix xmldom namespace error
            const c14n = new XmlDsigC14NTransform();
            c14n.LoadInnerXml(xmlObject.GetXml() !);
            const xml = c14n.GetOutput();
            const testXml = `<xades:GenericTimeStamp xmlns:xades="http://uri.etsi.org/01903/v1.3.2#" Id="123"><xades:Include URI="http://some.com" referencedData="true"></xades:Include><xades:ReferenceInfo Id="123" URI="http://some.com"><ds:DigestMethod xmlns:ds="http://www.w3.org/2000/09/xmldsig#" Algorithm="http://www.w3.org/2001/04/xmlenc#sha256"></ds:DigestMethod><ds:DigestValue xmlns:ds="http://www.w3.org/2000/09/xmldsig#">AQAB</ds:DigestValue></xades:ReferenceInfo><ds:CanonicalizationMethod xmlns:ds="http://www.w3.org/2000/09/xmldsig#" Algorithm="http://www.w3.org/TR/2001/REC-xml-c14n-20010315"></ds:CanonicalizationMethod><xades:EncapsulatedTimeStamp>AQAB</xades:EncapsulatedTimeStamp><xades:XMLTimeStamp>some</xades:XMLTimeStamp></xades:GenericTimeStamp>`;
            assert.equal(xml, testXml);

            const xmlObject2 = XAdES.xml.GenericTimeStamp.LoadXml(xml);

            assert.equal(xmlObject2.Id, xmlObject.Id);
        });

    });

});
