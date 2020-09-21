import * as assert from "assert";
import * as XAdES from "../../src";
const { XMLSerializer } = require("xmldom");

context("xml", () => {

    context("DateTime", () => {
        const DATE = new Date();

        context("Get XML", () => {

            it("Default format", () => {
                const dt = new XAdES.xml.XadesDateTime();
                dt.Value = DATE;

                const xml = dt.GetXml();
                const test = new XMLSerializer().serializeToString(xml);
                assert.equal(test, `<xades:XadesDateTime xmlns:xades="http://uri.etsi.org/01903/v1.3.2#">${DATE.toISOString()}</xades:XadesDateTime>`);
            });

            it("Format HH:mm:ss", () => {
                const dt = new XAdES.xml.XadesDateTime();
                dt.Value = DATE;
                dt.Format = "HH:mm:ss";

                const xml = dt.GetXml();
                const test = new XMLSerializer().serializeToString(xml);
                assert.equal(/\<xades\:XadesDateTime xmlns\:xades\=\"http\:\/\/uri\.etsi\.org\/01903\/v1\.3\.2\#"\>\d+\:\d+\:\d+\<\/xades\:XadesDateTime\>/.test(test), true);
            });

            it("Format yyyy-mm-dd'T'HH:MM:sso", () => {
                const dt = new XAdES.xml.XadesDateTime();
                dt.Value = DATE;
                dt.Format = "isoDateTime";

                const xml = dt.GetXml();
                const test = new XMLSerializer().serializeToString(xml);
                assert.equal(/\<xades\:XadesDateTime xmlns\:xades\=\"http\:\/\/uri\.etsi\.org\/01903\/v1\.3\.2\#"\>\d+\-\d+\-\d+T\d{2}\:\d{2}\:\d{2}[\+\-]\d{4}\<\/xades\:XadesDateTime\>/.test(test), true);
            });

        });

    });

});
