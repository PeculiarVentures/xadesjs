// export interface IKeyInfo extends IXmlSerializable {
//     key: CryptoKey;
// }

// abstract class KeyValue extends XmlObject implements IXmlSerializable {
//     key: CryptoKey;
// }

// export class RsaKeyValue extends KeyValue { }
// export class EcKeyValue extends KeyValue { }
// export class X509DataValue extends KeyValue { }
namespace xadesjs {
    export class KeyInfo extends XmlObject {

        private Info: Array<KeyInfoClause>;
        private id: string;

        constructor() {
            super();
            this.Info = [];
        }

        get length(): number {
            return this.Info.length;
        }

        get Id(): string {
            return this.id;
        }
        set Id(value: string) {
            this.id = value;
        }

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

        AddClause(clause: KeyInfoClause): void {
            this.Info.push(clause);
        }

        getXml(): Node {
            let doc = document.implementation.createDocument("", "", null);
            let xel = doc.createElementNS(XmlSignature.NamespaceURI, XmlSignature.ElementNames.KeyInfo);
            // we add References afterward so we don't end up with extraneous
            // xmlns="..." in each reference elements.
            for (let i in this.Info) {
                let kic = this.Info[i];
                let xn = kic.getXml();
                let newNode = doc.importNode(xn, true);
                xel.appendChild(newNode);
            }
            return xel;
        }

        loadXml(value: Element): void {
            if (value == null)
                throw new XmlError(XE.PARAM_REQUIRED, "value");

            this.Id = value.hasAttribute("Id") ? value.getAttribute("Id") : null;

            if ((value.localName === XmlSignature.ElementNames.KeyInfo) && (value.namespaceURI === XmlSignature.NamespaceURI)) {
                for (let i = 0; i < value.childNodes.length; i++) {
                    let n = value.childNodes[i];
                    if (n.nodeType !== XmlNodeType.Element)
                        continue;

                    let kic: KeyInfoClause = null;

                    switch (n.localName) {
                        case XmlSignature.ElementNames.KeyValue:
                            let xnl = n.childNodes;
                            if (xnl.length > 0) {
                                // we must now treat the whitespace !
                                for (let j = 1; j < xnl.length; j++) {
                                    let m = xnl[j];
                                    switch (m.localName) {
                                        case XmlSignature.ElementNames.DSAKeyValue:
                                            kic = new DSAKeyValue();
                                            break;
                                        case XmlSignature.ElementNames.RSAKeyValue:
                                            kic = <KeyInfoClause>new RSAKeyValue();
                                            break;
                                    }
                                }
                            }
                            break;
                        case XmlSignature.ElementNames.KeyName:
                            kic = <KeyInfoClause>new KeyInfoName();
                            break;
                        case XmlSignature.ElementNames.RetrievalMethod:
                            kic = <KeyInfoClause>new KeyInfoRetrievalMethod();
                            break;
                        case XmlSignature.ElementNames.X509Data:
                            kic = <KeyInfoClause>new KeyInfoX509Data();
                            break;
                        case XmlSignature.ElementNames.RSAKeyValue:
                            kic = <KeyInfoClause>new RSAKeyValue();
                            break;
                        case XmlSignature.ElementNames.EncryptedKey:
                            throw new XmlError(XE.METHOD_NOT_IMPLEMENTED);
                            // kic = <KeyInfoClause>new KeyInfoEncryptedKey();
                            // break;
                        default:
                            kic = <KeyInfoClause>new KeyInfoNode();
                            break;
                    }

                    if (kic != null) {
                        kic.loadXml(<Element>n);
                        this.AddClause(kic);
                    }
                }
            }
            // No check is performed on MS.NET...
        }
    }

    export interface KeyInfoClause extends IXmlSerializable {
    }

}