namespace xadesjs {

    /**
     * Represents an XML digital signature or XML encryption <KeyInfo> element.
     */
    export class KeyInfo extends XmlObject {

        private Info: Array<KeyInfoClause>;
        private id: string | null;

        constructor() {
            super();
            this.Info = [];
        }

        /**
         * Gets the number of KeyInfoClause objects contained in the KeyInfo object.
         */
        get length(): number {
            return this.Info.length;
        }

        /**
         * Gets or sets the key information identity.
         */
        get Id(): string | null {
            return this.id;
        }
        set Id(value: string | null) {
            this.id = value;
        }

        /**
         * Returns an enumerator of the KeyInfoClause objects in the KeyInfo object.
         * @param  {any} requestedObjectType?
         */
        GetEnumerator(): Array<KeyInfoClause>;
        GetEnumerator(requestedObjectType: any): Array<KeyInfoClause>;
        GetEnumerator(requestedObjectType?: any) {
            if (!requestedObjectType)
                return this.Info;

            let TypeList: Array<KeyInfoClause> = [];
            for (let el of this.Info)
                // ...with all object of specified type...
                if (el instanceof requestedObjectType)
                    TypeList.push(el);
            // ...and return its enumerator
            return TypeList;
        }

        /**
         * Returns an enumerator of the KeyInfoClause objects in the KeyInfo object.
         * @param  {KeyInfoClause} clause The KeyInfoClause to add to the KeyInfo object.
         * @returns void
         */
        AddClause(clause: KeyInfoClause): void {
            this.Info.push(clause);
        }

        /**
         * Returns the XML representation of the KeyInfo object.
         * @returns Node
         */
        GetXml(): Node {
            let doc = CreateDocument();
            let prefix = this.GetPrefix();
            let xel = doc.createElementNS(XmlSignature.NamespaceURI, prefix + XmlSignature.ElementNames.KeyInfo);
            // we add References afterward so we don't end up with extraneous
            // xmlns="..." in each reference elements.
            for (let i in this.Info) {
                let kic = this.Info[i];
                kic.Prefix = this.Prefix;
                let xn = kic.GetXml();
                let newNode = doc.importNode(xn, true);
                xel.appendChild(newNode);
            }
            return xel;
        }

        /**
         * Loads a KeyInfo state from an XML element.
         * @param  {Element} value
         * @returns void
         */
        LoadXml(value: Element): void {
            if (value == null)
                throw new XmlError(XE.PARAM_REQUIRED, "value");

            this.Id = value.hasAttribute("Id") ? value.getAttribute("Id") : null;

            if ((value.localName === XmlSignature.ElementNames.KeyInfo) && (value.namespaceURI === XmlSignature.NamespaceURI)) {
                for (let i = 0; i < value.childNodes.length; i++) {
                    let n = value.childNodes[i];
                    if (n.nodeType !== XmlNodeType.Element)
                        continue;

                    let kic: KeyInfoClause | null = null;

                    switch (n.localName) {
                        case XmlSignature.ElementNames.KeyValue:
                            let xnl = n.childNodes;
                            if (xnl.length > 0) {
                                // we must now treat the whitespace !
                                for (let j = 0; j < xnl.length; j++) {
                                    let m = xnl[j];
                                    switch (m.localName) {
                                        case XmlSignature.ElementNames.ECKeyValue:
                                            kic = new EcdsaKeyValue();
                                            n = m;
                                            break;
                                        case XmlSignature.ElementNames.RSAKeyValue:
                                            kic = new RsaKeyValue();
                                            n = m;
                                            break;
                                    }
                                }
                            }
                            break;
                        case XmlSignature.ElementNames.KeyName:
                            throw new XmlError(XE.METHOD_NOT_IMPLEMENTED);
                        // kic = <KeyInfoClause>new KeyInfoName();
                        // break;
                        case XmlSignature.ElementNames.RetrievalMethod:
                            throw new XmlError(XE.METHOD_NOT_IMPLEMENTED);
                        // kic = <KeyInfoClause>new KeyInfoRetrievalMethod();
                        // break;
                        case XmlSignature.ElementNames.X509Data:
                            kic = new KeyInfoX509Data();
                            break;
                        case XmlSignature.ElementNames.RSAKeyValue:
                            kic = new RsaKeyValue();
                            break;
                        case XmlSignature.ElementNames.EncryptedKey:
                            throw new XmlError(XE.METHOD_NOT_IMPLEMENTED);
                        // kic = <KeyInfoClause>new KeyInfoEncryptedKey();
                        // break;
                        default:
                            throw new XmlError(XE.METHOD_NOT_IMPLEMENTED);
                        // kic = <KeyInfoClause>new KeyInfoNode();
                        // break;
                    }

                    if (kic != null) {
                        kic.LoadXml(n);
                        this.AddClause(kic);
                    }
                }
            }
            // No check is performed on MS.NET...
        }
    }

    export interface KeyInfoClause extends IXmlSerializable {
        Key: CryptoKey | null;
        importKey(key: CryptoKey): PromiseLike<this>;
        exportKey(alg: Algorithm): PromiseLike<CryptoKey>;
    }

}