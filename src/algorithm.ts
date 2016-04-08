namespace xadesjs {
    export type BASE64 = string;

    interface IAlgorithm {
        algorithm: Algorithm;
        xmlNamespace: string;
        getAlgorithmName(): string;
    }

    export interface IHashAlgorithm extends IAlgorithm {
        getHash(xml: string): Promise;
    }

    export interface IHashAlgorithmConstructable {
        new (): IHashAlgorithm;
    }

    abstract class XmlAlgorithm implements IAlgorithm {
        algorithm: Algorithm;
        xmlNamespace: string;
        getAlgorithmName(): string {
            return this.xmlNamespace;
        }
    }

    export abstract class HashAlgorithm extends XmlAlgorithm implements IHashAlgorithm {
        getHash(xml: string): Promise {
            return Application.crypto.subtle.digest(this.algorithm, Convert.ToBufferUtf8String(xml));
        }
    }

    export interface ISignatureAlgorithm extends IAlgorithm {
        getSignature(signedInfo: string, signingKey: CryptoKey): Promise;
        verifySignature(signedInfo: string, key: CryptoKey, signatureValue: string): Promise;
    }

    export interface ISignatureAlgorithmConstructable {
        new (): ISignatureAlgorithm;
    }

    export abstract class SignatureAlgorithm extends XmlAlgorithm implements ISignatureAlgorithm {
        /**
         * Sign the given string using the given key
         */
        getSignature(signedInfo: string, signingKey: CryptoKey): Promise {
            return Application.crypto.subtle.sign(this.algorithm, signingKey, Convert.ToBufferString(signedInfo));
        }

        /**
        * Verify the given signature of the given string using key
        */
        verifySignature(signedInfo: string, key: CryptoKey, signatureValue: string): Promise {
            return Application.crypto.subtle.verify(this.algorithm, key, Convert.ToBufferString(signatureValue), Convert.ToBufferUtf8String(signedInfo));
        }
    }

}

/// <reference path="./algorithm/rsa_hash.ts" />
/// <reference path="./algorithm/rsa_sign.ts" />
