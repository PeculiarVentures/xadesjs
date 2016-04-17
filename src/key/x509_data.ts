namespace xadesjs {

    export enum X509IncludeOption {
        None,
        EndCertOnly,
        ExcludeRoot,
        WholeChain
    }

    export interface X509IssuerSerial {
        issuerName: string;
        serialNumber: string;
    }

    export class KeyInfoX509Data extends XmlObject implements KeyInfoClause {

        private x509crl: Uint8Array;
        private IssuerSerialList: X509IssuerSerial[];
        private SubjectKeyIdList: Uint8Array[];
        private SubjectNameList: string[];
        private X509CertificateList: X509Certificate[];
        private key: CryptoKey = null;

        public constructor();
        public constructor(rgbCert: Uint8Array);
        public constructor(cert: X509Certificate);
        public constructor(cert?: any, includeOptions?: X509IncludeOption) {
            super();
            if (cert) {
                if (cert instanceof Uint8Array)
                    this.AddCertificate(new X509Certificate(cert));
                else if (cert instanceof X509Certificate) {
                    if (!includeOptions)
                        this.AddCertificate(cert);
                    else {
                        switch (includeOptions) {
                            case X509IncludeOption.None:
                            case X509IncludeOption.EndCertOnly:
                                this.AddCertificate(cert);
                                break;
                            case X509IncludeOption.ExcludeRoot:
                                this.AddCertificatesChainFrom(cert, false);
                                break;
                            case X509IncludeOption.WholeChain:
                                this.AddCertificatesChainFrom(cert, true);
                                break;
                        }
                    }
                }
            }
        }

        get Key(): CryptoKey {
            return this.key;
        }

        importKey(key: CryptoKey): Promise {
            return Promise.reject(new XmlError(XE.METHOD_NOT_SUPPORTED));
        }

        exportKey(alg: Algorithm): Promise {
            return new Promise((resolve, reject) => {
                if (this.Certificates.length)
                    this.Certificates[0].exportKey(alg)
                        .then(resolve, reject)
            })
        }

        // this gets complicated because we must:
        // 1. build the chain using a X509Certificate2 class;
        // 2. test for root using the Mono.Security.X509.X509Certificate class;
        // 3. add the certificates as X509Certificate instances;
        private AddCertificatesChainFrom(cert: X509Certificate, root: boolean): void {
            throw new XmlError(XE.METHOD_NOT_IMPLEMENTED);
        }

        public get Certificates(): X509Certificate[] {
            return this.X509CertificateList;
        }

        public get CRL(): Uint8Array {
            return this.x509crl;
        }
        public set CRL(value: Uint8Array) {
            this.x509crl = value;
        }

        public get IssuerSerials(): X509IssuerSerial[] {
            return this.IssuerSerialList;
        }

        public get SubjectKeyIds(): Uint8Array[] {
            return this.SubjectKeyIdList;
        }

        public get SubjectNames(): string[] {
            return this.SubjectNameList;
        }

        public AddCertificate(certificate: X509Certificate): void {
            if (certificate == null)
                throw new XmlError(XE.PARAM_REQUIRED, "certificate");
            if (this.X509CertificateList == null)
                this.X509CertificateList = [];
            this.X509CertificateList.push(certificate);
        }

        public AddIssuerSerial(issuerName: string, serialNumber: string): void {
            if (issuerName == null)
                throw new XmlError(XE.PARAM_REQUIRED, "issuerName");
            if (this.IssuerSerialList == null)
                this.IssuerSerialList = [];

            let xis = { issuerName: issuerName, serialNumber: serialNumber };
            this.IssuerSerialList.push(xis);
        }

        public AddSubjectKeyId(subjectKeyId: string): void;
        public AddSubjectKeyId(subjectKeyId: Uint8Array): void;
        public AddSubjectKeyId(subjectKeyId: any): void {
            if (this.SubjectKeyIdList == null)
                this.SubjectKeyIdList = [];

            if (typeof subjectKeyId === "string") {
                let id: Uint8Array = null;
                if (subjectKeyId != null)
                    id = Convert.ToBufferString(Convert.FromBase64String(subjectKeyId));
                this.SubjectKeyIdList.push(id);
            }
            else {
                this.SubjectKeyIdList.push(subjectKeyId);
            }

        }

        public AddSubjectName(subjectName: string): void {
            if (this.SubjectNameList == null)
                this.SubjectNameList = [];

            this.SubjectNameList.push(subjectName);
        }

        public getXml(): Element {
            let doc = CreateDocument();
            let xel = doc.createElementNS(XmlSignature.NamespaceURI, XmlSignature.ElementNames.X509Data);
            // FIXME: hack to match MS implementation
            xel.setAttribute("xmlns", XmlSignature.NamespaceURI);

            let prefix = this.GetPrefix();

            // <X509IssuerSerial>
            if ((this.IssuerSerialList != null) && (this.IssuerSerialList.length > 0)) {
                for (let iser of this.IssuerSerialList) {
                    let isl = doc.createElementNS(XmlSignature.NamespaceURI, prefix + XmlSignature.ElementNames.X509IssuerSerial);
                    let xin = doc.createElementNS(XmlSignature.NamespaceURI, prefix + XmlSignature.ElementNames.X509IssuerName);
                    xin.textContent = iser.issuerName;
                    isl.appendChild(xin);
                    let xsn = doc.createElementNS(XmlSignature.NamespaceURI, prefix + XmlSignature.ElementNames.X509SerialNumber);
                    xsn.textContent = iser.serialNumber;
                    isl.appendChild(xsn);
                    xel.appendChild(isl);
                }
            }
            // <X509SKI>
            if ((this.SubjectKeyIdList != null) && (this.SubjectKeyIdList.length > 0)) {
                for (let skid of this.SubjectKeyIdList) {
                    let ski = doc.createElementNS(XmlSignature.NamespaceURI, prefix + XmlSignature.ElementNames.X509SKI);
                    ski.textContent = Convert.ToBase64String(Convert.FromBufferString(skid));
                    xel.appendChild(ski);
                }
            }
            // <X509SubjectName>
            if ((this.SubjectNameList != null) && (this.SubjectNameList.length > 0)) {
                for (let subject of this.SubjectNameList) {
                    let sn = doc.createElementNS(XmlSignature.NamespaceURI, prefix + XmlSignature.ElementNames.X509SubjectName);
                    sn.textContent = subject;
                    xel.appendChild(sn);
                }
            }
            // <X509Certificate>
            if ((this.X509CertificateList != null) && (this.X509CertificateList.length > 0)) {
                for (let x509 of this.X509CertificateList) {
                    let cert = doc.createElementNS(XmlSignature.NamespaceURI, prefix + XmlSignature.ElementNames.X509Certificate);
                    cert.textContent = Convert.ToBase64String(Convert.FromBufferString(<Uint8Array>x509.GetRawCertData()));
                    xel.appendChild(cert);
                }
            }
            // only one <X509CRL> 
            if (this.x509crl != null) {
                let crl = doc.createElementNS(XmlSignature.NamespaceURI, prefix + XmlSignature.ElementNames.X509CRL);
                crl.textContent = Convert.ToBase64String(Convert.FromBufferString(this.x509crl));
                xel.appendChild(crl);
            }
            return xel;
        }

        public loadXml(element: Element): void {
            if (element == null)
                throw new XmlError(XE.PARAM_REQUIRED, "element");

            if (this.IssuerSerialList != null)
                this.IssuerSerialList = [];
            if (this.SubjectKeyIdList != null)
                this.SubjectKeyIdList = [];
            if (this.SubjectNameList != null)
                this.SubjectNameList = [];
            if (this.X509CertificateList != null)
                this.X509CertificateList = [];
            this.x509crl = null;

            if ((element.localName !== XmlSignature.ElementNames.X509Data) || (element.namespaceURI !== XmlSignature.NamespaceURI))
                throw new XmlError(XE.CRYPTOGRAPHIC, "element");

            // <X509IssuerSerial>
            let xnl = XmlSignature.GetChildElements(element, XmlSignature.ElementNames.X509IssuerSerial);
            if (xnl != null) {
                for (let xel of xnl) {
                    let issuer = XmlSignature.GetChildElement(xel, XmlSignature.ElementNames.X509IssuerName, XmlSignature.NamespaceURI);
                    let serial = XmlSignature.GetChildElement(xel, XmlSignature.ElementNames.X509SerialNumber, XmlSignature.NamespaceURI);
                    this.AddIssuerSerial(issuer.textContent, serial.textContent);
                }
            }
            // <X509SKI>
            xnl = XmlSignature.GetChildElements(element, XmlSignature.ElementNames.X509SKI);
            if (xnl != null) {
                for (let xel of xnl) {
                    let skid = Convert.ToBufferString(Convert.FromBase64String(xel.textContent));
                    this.AddSubjectKeyId(skid);
                }
            }
            // <X509SubjectName>
            xnl = XmlSignature.GetChildElements(element, XmlSignature.ElementNames.X509SubjectName);
            if (xnl != null) {
                for (let xel of xnl) {
                    this.AddSubjectName(xel.textContent);
                }
            }
            // <X509Certificate>
            xnl = XmlSignature.GetChildElements(element, XmlSignature.ElementNames.X509Certificate);
            if (xnl != null) {
                for (let xel of xnl) {
                    let cert = Convert.ToBufferString(Convert.FromBase64String(xel.textContent));
                    this.AddCertificate(new X509Certificate(cert));
                }
            }
            // only one <X509CRL> 
            let x509el = XmlSignature.GetChildElement(element, XmlSignature.ElementNames.X509CRL, XmlSignature.NamespaceURI);
            if (x509el != null) {
                this.x509crl = Convert.ToBufferString(Convert.FromBase64String(x509el.textContent));
            }
        }
    }
}