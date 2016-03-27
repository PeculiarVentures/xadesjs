namespace xadesjs {

    interface IEngine {
        name: string;
        crypto: Crypto;
    }

    let engine: IEngine = null;

    export function setEngine(crypto: Crypto, name: string) {
        engine = {
            name: name,
            crypto: crypto
        };
    }

    export function getEngine(): IEngine {
        return engine;
    }

    export function getCrypto(): Crypto {
        return engine.crypto;
    }

    // Get default WebCrypto
    if (typeof window !== "undefined")
        setEngine(window.crypto, "WebCrypto");

}