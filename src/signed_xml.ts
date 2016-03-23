namespace xadesjs {
    export class SignedXml extends XmlObject {
        constructor(doc: Document);
        constructor(node: Node);
        constructor(node: Node) {
            super();
        }

        protected references: Reference[];
        addReference(ref: Reference): void {
            throw new XmlError(XE.METHOD_NOT_IMPLEMENTED);
        }

        signingKey: CryptoKey;
        keyInfo: IKeyInfo;
        signature: Signature;
        signatureValue: ArrayBuffer;

        computeSignature(): Promise {
            throw new XmlError(XE.METHOD_NOT_IMPLEMENTED);
        }
        checkSignature(): Promise {
            throw new XmlError(XE.METHOD_NOT_IMPLEMENTED);
        }

    }
}