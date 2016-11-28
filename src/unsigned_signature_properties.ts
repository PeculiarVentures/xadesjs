namespace xadesjs.pro {
	/**
	 * UnsignedSignatureProperties may contain properties that qualify XML
	 * signature itself or the signer
	 */
    export class UnsignedSignatureProperties extends XmlXadesObject {

        // Public properties
		/**
		 * A collection of counter signatures
		 */
        public CounterSignatureCollection: CounterSignatureCollection;

		/**
		 * A collection of signature timestamps
		 */
        public SignatureTimeStampCollection: SignatureTimeStampCollection;

		/**
		 * This clause defines the XML element containing the sequence of
		 * references to the full set of CA certificates that have been used
		 * to validate the electronic signature up to (but not including) the
		 * signer's certificate. This is an unsigned property that qualifies
		 * the signature.
		 * An XML electronic signature aligned with the present document MAY
		 * contain at most one CompleteCertificateRefs element.
		 */
        public CompleteCertificateRefs: CompleteCertificateRefs;

		/**
		 * This clause defines the XML element containing a full set of
		 * references to the revocation data that have been used in the
		 * validation of the signer and CA certificates.
		 * This is an unsigned property that qualifies the signature.
		 * The XML electronic signature aligned with the present document
		 * MAY contain at most one CompleteRevocationRefs element.
		 */
        public CompleteRevocationRefs: CompleteRevocationRefs;

		/**
		 * Flag indicating if the RefsOnlyTimeStamp element (or several) is
		 * present (RefsOnlyTimeStampFlag = true).  If one or more
		 * sigAndRefsTimeStamps are present, RefsOnlyTimeStampFlag will be false.
		 */
        public RefsOnlyTimeStampFlag: boolean;

		/**
		 * A collection of sig and refs timestamps
		 */
        public SigAndRefsTimeStampCollection: SignatureTimeStampCollection;

		/**
		 * A collection of refs only timestamps
		 */
        public RefsOnlyTimeStampCollection: SignatureTimeStampCollection;

		/**
		 * Certificate values
		 */
        public CertificateValues: CertificateValues;

		/**
		 * Revocation values
		 */
        public RevocationValues: RevocationValues;

		/**
		 * A collection of signature timestamp
		 */
        public ArchiveTimeStampCollection: SignatureTimeStampCollection;


        // Constructors
		/**
		 * Default constructor
		 */
        public constructor() {
            super();
            this.CounterSignatureCollection = new CounterSignatureCollection();
            this.SignatureTimeStampCollection = new SignatureTimeStampCollection();
            this.CompleteCertificateRefs = new CompleteCertificateRefs();
            this.CompleteRevocationRefs = new CompleteRevocationRefs();
            this.RefsOnlyTimeStampFlag = false;
            this.SigAndRefsTimeStampCollection = new SignatureTimeStampCollection();
            this.RefsOnlyTimeStampCollection = new SignatureTimeStampCollection();
            this.CertificateValues = new CertificateValues();
            this.RevocationValues = new RevocationValues();
            this.ArchiveTimeStampCollection = new SignatureTimeStampCollection();
        }

        // Protected properties

        protected GetXmlObjectName() {
            return XmlXades.ElementNames.UnsignedSignatureProperties;
        }


        // Public methods
		/**
		 * Check to see if something has changed in this instance and needs to be serialized
         * @returns Flag indicating if a member needs serialization
		 */
        public HasChanged(): boolean {
            let retVal = false;

            if (this.CounterSignatureCollection.Count > 0) {
                retVal = true;
            }

            if (this.SignatureTimeStampCollection.Count > 0) {
                retVal = true;
            }

            if (this.CompleteCertificateRefs && this.CompleteCertificateRefs.HasChanged()) {
                retVal = true;
            }

            if (this.CompleteRevocationRefs && this.CompleteRevocationRefs.HasChanged()) {
                retVal = true;
            }

            if (this.SigAndRefsTimeStampCollection.Count > 0) {
                retVal = true;
            }

            if (this.RefsOnlyTimeStampCollection.Count > 0) {
                retVal = true;
            }

            if (this.CertificateValues && this.CertificateValues.HasChanged()) {
                retVal = true;
            }

            if (this.RevocationValues && this.RevocationValues.HasChanged()) {
                retVal = true;
            }

            if (this.ArchiveTimeStampCollection.Count > 0) {
                retVal = true;
            }

            return retVal;
        }

		/**
		 * Load state from an XML element
         * @param {Element} element XML element containing new state < /param>
         * @param {Element} counterSignedXmlElement Element containing parent signature (needed if there are counter signatures)
		 */
        public LoadXml(element: Element, counterSignedXmlElement?: Element): void {
            super.LoadXml(element);

            this.CounterSignatureCollection.Clear();
            let xmlNodeList = findChilds(element, XmlXades.ElementNames.CounterSignature, XmlXades.NamespaceURI);
            for (let xmlNode of xmlNodeList) {
                if (xmlNode != null) {
                    let newXadesSignedXml = new XadesSignedXml();
                    if (counterSignedXmlElement) {
                        newXadesSignedXml = new XadesSignedXml(counterSignedXmlElement);
                    }
                    else {
                        newXadesSignedXml = new XadesSignedXml();
                    }
                    // Skip any whitespace at start
                    let counterSignatureElement: Element = null;
                    for (let i = 0; i < xmlNode.childNodes.length && !counterSignatureElement; i++) {
                        if (xmlNode.childNodes[i].nodeType === XmlNodeType.Element) {
                            counterSignatureElement = xmlNode.childNodes[i] as Element;
                        }
                    }
                    if (counterSignatureElement != null) {
                        newXadesSignedXml.LoadXml(counterSignatureElement);
                        this.CounterSignatureCollection.Add(newXadesSignedXml);
                    }
                    else {
                        throw new XmlError(XE.CRYPTOGRAPHIC, "CounterSignature element does not contain signature");
                    }
                }
            }

            this.SignatureTimeStampCollection.Clear();
            xmlNodeList = findChilds(element, XmlXades.ElementNames.SignatureTimeStamp, XmlXades.NamespaceURI);
            for (let xmlNode of xmlNodeList) {
                let xmlSignatureTimeStamp = xmlNode as Element;
                let newTimeStamp = new SignatureTimeStamp();
                newTimeStamp.LoadXml(xmlSignatureTimeStamp);
                this.SignatureTimeStampCollection.Add(newTimeStamp);
            }


            let xmlCompleteCertificateRefs = this.GetElement(element, XmlXades.ElementNames.CompleteCertificateRefs, false);
            if (xmlCompleteCertificateRefs) {
                this.CompleteCertificateRefs = new CompleteCertificateRefs();
                this.CompleteCertificateRefs.LoadXml(xmlCompleteCertificateRefs);
            }
            else {
                this.CompleteCertificateRefs = null;
            }

            let xmlCompleteRevocationRefs = this.GetElement(element, XmlXades.ElementNames.CompleteRevocationRefs, false);
            if (xmlCompleteRevocationRefs) {
                this.CompleteRevocationRefs = new CompleteRevocationRefs();
                this.CompleteRevocationRefs.LoadXml(xmlCompleteRevocationRefs);
            }
            else {
                this.CompleteRevocationRefs = null;
            }

            this.SigAndRefsTimeStampCollection.Clear();
            this.RefsOnlyTimeStampCollection.Clear();

            xmlNodeList = findChilds(element, XmlXades.ElementNames.SigAndRefsTimeStamp, XmlXades.NamespaceURI);
            if (xmlNodeList.length) {
                this.RefsOnlyTimeStampFlag = false;
                for (let xmlNode of xmlNodeList) {
                    let newTimeStamp = new XadesTimeStamp(XmlXades.ElementNames.SigAndRefsTimeStamp);
                    newTimeStamp.LoadXml(xmlNode as Element);
                    this.SigAndRefsTimeStampCollection.Add(newTimeStamp);
                }
            }
            else {
                xmlNodeList = findChilds(element, XmlXades.ElementNames.RefsOnlyTimeStamp, XmlXades.NamespaceURI);
                if (xmlNodeList.length) {
                    this.RefsOnlyTimeStampFlag = true;
                    for (let xmlNode of xmlNodeList) {
                        let newTimeStamp = new XadesTimeStamp(XmlXades.ElementNames.RefsOnlyTimeStamp);
                        newTimeStamp.LoadXml(xmlNode as Element);
                        this.RefsOnlyTimeStampCollection.Add(newTimeStamp);
                    }
                }
                else {
                    this.RefsOnlyTimeStampFlag = false;
                }
            }

            let xmlCertificateValues = this.GetElement(element, XmlXades.ElementNames.CertificateValues, false);
            if (xmlCertificateValues) {
                this.CertificateValues = new CertificateValues();
                this.CertificateValues.LoadXml(xmlCertificateValues);
            }
            else {
                this.CertificateValues = null;
            }

            let xmlRevocationValues = this.GetElement(element, XmlXades.ElementNames.RevocationValues, false);
            if (xmlRevocationValues) {
                this.RevocationValues = new RevocationValues();
                this.RevocationValues.LoadXml(xmlRevocationValues);
            }
            else {
                this.RevocationValues = null;
            }

            this.ArchiveTimeStampCollection.Clear();
            xmlNodeList = findChilds(element, XmlXades.ElementNames.ArchiveTimeStamp, XmlXades.NamespaceURI);
            for (let xmlNode of xmlNodeList) {
                let newTimeStamp = new XadesTimeStamp(XmlXades.ElementNames.ArchiveTimeStamp);
                newTimeStamp.LoadXml(xmlNode as Element);
                this.ArchiveTimeStampCollection.Add(newTimeStamp);
            }
        }

		/**
		 * Returns the XML representation of the this object
         * @returns XML element containing the state of this object
		 */
        public GetXml(): Element {
            let document = this.CreateDocument();
            let element = this.CreateElement(document);

            if (this.CounterSignatureCollection.Count) {
                for (let xadesSignedXml of this.CounterSignatureCollection.GetIterator()) {
                    let xml = document.createElementNS(XmlXades.NamespaceURI, this.GetPrefix() + XmlXades.ElementNames.CounterSignature);
                    xml.appendChild(document.importNode(xadesSignedXml.GetXml(), true));
                    element.appendChild(document.importNode(xml, true));
                }
            }

            if (this.SignatureTimeStampCollection.Count) {
                for (let timeStamp of this.SignatureTimeStampCollection.GetIterator()) {
                    if (timeStamp.HasChanged()) {
                        element.appendChild(document.importNode(timeStamp.GetXml(), true));
                    }
                }
            }

            if (this.CompleteCertificateRefs && this.CompleteCertificateRefs.HasChanged()) {
                element.appendChild(document.importNode(this.CompleteCertificateRefs.GetXml(), true));
            }

            if (this.CompleteRevocationRefs && this.CompleteRevocationRefs.HasChanged()) {
                element.appendChild(document.importNode(this.CompleteRevocationRefs.GetXml(), true));
            }

            if (!this.RefsOnlyTimeStampFlag) {
                for (let timeStamp of this.SigAndRefsTimeStampCollection.GetIterator()) {
                    if (timeStamp.HasChanged()) {
                        element.appendChild(document.importNode(timeStamp.GetXml(), true));
                    }
                }
            }
            else {
                for (let timeStamp of this.RefsOnlyTimeStampCollection.GetIterator()) {
                    if (timeStamp.HasChanged()) {
                        element.appendChild(document.importNode(timeStamp.GetXml(), true));
                    }
                }
            }

            if (this.CertificateValues && this.CertificateValues.HasChanged()) {
                element.appendChild(document.importNode(this.CertificateValues.GetXml(), true));
            }

            if (this.RevocationValues && this.RevocationValues.HasChanged()) {
                element.appendChild(document.importNode(this.RevocationValues.GetXml(), true));
            }

            if (this.ArchiveTimeStampCollection.Count > 0) {
                for (let timeStamp of this.ArchiveTimeStampCollection.GetIterator()) {
                    if (timeStamp.HasChanged()) {
                        element.appendChild(document.importNode(timeStamp.GetXml(), true));
                    }
                }
            }

            return element;
        }

    }
}
