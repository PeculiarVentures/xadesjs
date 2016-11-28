namespace xadesjs.pro {

    /**
     * <xsd:element name="SigningCertificate" type="CertIDListType"/>
     * <xsd:complexType name="CertIDListType">
     *     <xsd:sequence>
     *         <xsd:element name="Cert" type="CertIDType" maxOccurs="unbounded"/>
     *     </xsd:sequence>
     * </xsd:complexType>
     */

    /**
     * This class has as purpose to provide the simple substitution of the
     * certificate. It contains references to certificates and digest values
     * computed on them
     */
    export class SigningCertificate extends XmlXadesCollection<Cert> {

        constructor() {
            super(1);
        }

        // Protetced methods
        protected GetXmlObjectName() {
            return XmlXades.ElementNames.SigningCertificate;
        }

        protected OnLoadChildElement(element: Element): any {
            if (element.namespaceURI === XmlXades.NamespaceURI && element.localName === XmlXades.ElementNames.Cert) {
                let item = new Cert();
                item.LoadXml(element);
                return item;
            }
        }

        public Add(cert: Cert): PromiseLike<any>;
        public Add(cert: pki.X509Certificate): PromiseLike<any>;
        public Add(cert: Cert | pki.X509Certificate): PromiseLike<any> {
            return new Promise((resolve, reject) => {
                if (cert instanceof pki.X509Certificate) {
                    // convert X509 to Cert
                    let newCert = new Cert();
                    newCert.IssuerSerial.X509IssuerName = cert.Issuer;
                    newCert.IssuerSerial.X509SerialNumber = cert.SerialNumber;
                    newCert.CertDigest.DigestMethod = SHA1_NAMESPACE;
                    cert.Thumbprint()
                        .then((digest) => {
                            newCert.CertDigest.DigestValue = new Uint8Array(digest);
                            super.Add(newCert);
                            resolve();
                        }, reject);
                }
                else {
                    super.Add(cert);
                    resolve();
                }
            });
        }

    }
}
