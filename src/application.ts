namespace xadesjs {

    export interface CryptoEx extends Crypto {
        name: string;
    }

    let _crypto: CryptoEx | null = null;

    export class Application {

        /**
         * Sets crypto engine for the current Application
         * @param  {string} name
         * @param  {Crypto} crypto
         * @returns void
         */
        static setEngine(name: string, crypto: Crypto): void {
            _crypto = crypto as CryptoEx;
            _crypto.name = name;
        }

        /**
         * Gets the crypto module from the Application
         */
        static get crypto(): CryptoEx {
            if (!_crypto)
                throw new XmlError(XE.CRYPTOGRAPHIC_NO_MODULE);
            return _crypto;
        }

       static isNodePlugin(): boolean {
            return (typeof module !== "undefined");
        }
    }

    // set default w3 WebCrypto
    +function init() {
        if (!Application.isNodePlugin()) {
            Application.setEngine("W3 WebCrypto module", window.crypto);
        }
    } ();

}