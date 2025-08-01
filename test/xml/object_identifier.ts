import * as assert from 'assert';
import * as XAdES from '../../src';

context('xml', () => {
  context('ObjectIdentifier', () => {
    it('Parse', () => {
      const xmlObject = new XAdES.xml.ObjectIdentifier();

      xmlObject.Description = 'Description';
      xmlObject.Identifier.Value = 'uri:oid';
      xmlObject.Identifier.Qualifier = 'OIDAsURI';

      const ref = new XAdES.xml.DocumentationReference();

      ref.Uri = 'http://some1.com';
      xmlObject.DocumentationReferences.Add(ref);
      assert.equal(xmlObject.DocumentationReferences.Count, 1);

      const xml = xmlObject.toString();

      assert.equal(xml, `<xades:ObjectIdentifier xmlns:xades="http://uri.etsi.org/01903/v1.3.2#"><xades:Identifier Qualifier="OIDAsURI">uri:oid</xades:Identifier><xades:Description>Description</xades:Description><xades:DocumentationReferences><xades:DocumentationReference>http://some1.com</xades:DocumentationReference></xades:DocumentationReferences></xades:ObjectIdentifier>`);

      const xmlObject2 = XAdES.xml.ObjectIdentifier.LoadXml(xml);

      assert.equal(xmlObject2.Description, xmlObject.Description);
      assert.equal(xmlObject2.Identifier.Value, xmlObject.Identifier.Value);
      assert.equal(xmlObject2.Identifier.Qualifier, xmlObject.Identifier.Qualifier);
      assert.equal(xmlObject2.DocumentationReferences.Count, 1);
      assert.equal(xmlObject2.DocumentationReferences.Item(0) !.Uri, ref.Uri);
    });
  });
});
