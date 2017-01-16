import * as assert from "assert";
import * as XAdES from "../../";

context("xml", () => {

    context("EncapsulatedPKIData", () => {

        it("Parse", () => {
            let xmlObject = new XAdES.xml.EncapsulatedPKIData();

            xmlObject.Id = "123";
            xmlObject.Encoding = "der";
            xmlObject.Value = new Uint8Array([1, 0, 1]);


            let xml = xmlObject.toString();
            assert.equal(xml, `<xades:EncapsulatedPKIData Id="123" Encoding="http://uri.etsi.org/01903/v1.2.2#DER" xmlns:xades="http://uri.etsi.org/01903/v1.3.2#">AQAB</xades:EncapsulatedPKIData>`);

            let xmlObject2 = XAdES.xml.EncapsulatedPKIData.LoadXml(xml);

            assert.equal(xmlObject2.Id, xmlObject.Id);
            assert.equal(xmlObject2.Encoding, xmlObject.Encoding);
            assert.equal(xmlObject2.Value.byteLength, 3);
        });

    });

});