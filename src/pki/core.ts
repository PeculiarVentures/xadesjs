namespace xadesjs.pki {
    /**
     * List of OIDs
     * Source: https://msdn.microsoft.com/ru-ru/library/windows/desktop/aa386991(v=vs.85).aspx 
     */
    export const OID: { [key: string]: { short: string, long: string } } = {
        "2.5.4.3": {
            short: "CN",
            long: "CommonName"
        },
        "2.5.4.6": {
            short: "C",
            long: "Country"
        },
        "2.5.4.5": {
            short: null,
            long: "DeviceSerialNumber"
        },
        "0.9.2342.19200300.100.1.25": {
            short: "DC",
            long: "DomainComponent"
        },
        "1.2.840.113549.1.9.1": {
            short: "E",
            long: "EMail"
        },
        "2.5.4.42": {
            short: "G",
            long: "GivenName"
        },
        "2.5.4.43": {
            short: "I",
            long: "Initials"
        },
        "2.5.4.7": {
            short: "L",
            long: "Locality"
        },
        "2.5.4.10": {
            short: "O",
            long: "Organization"
        },
        "2.5.4.11": {
            short: "OU",
            long: "OrganizationUnit"
        },
        "2.5.4.8": {
            short: "ST",
            long: "State"
        },
        "2.5.4.9": {
            short: "Street",
            long: "StreetAddress"
        },
        "2.5.4.4": {
            short: "SN",
            long: "SurName"
        },
        "2.5.4.12": {
            short: "T",
            long: "Title"
        },
        "1.2.840.113549.1.9.8": {
            short: null,
            long: "UnstructuredAddress"
        },
        "1.2.840.113549.1.9.2": {
            short: null,
            long: "UnstructuredName"
        },
        "2.5.29.9": {
            short: null,
            long: "SubjectDirectoryAttributes"
        },
        "2.5.29.14": {
            short: null,
            long: "SubjectKeyIdentifier"
        },
        "2.5.29.15": {
            short: null,
            long: "KeyUsage"
        },
        "2.5.29.16": {
            short: null,
            long: "PrivateKeyUsagePeriod"
        },
        "2.5.29.17": {
            short: null,
            long: "SubjectAltName"
        },
        "2.5.29.18": {
            short: null,
            long: "IssuerAltName"
        },
        "2.5.29.19": {
            short: null,
            long: "BasicConstraints"
        },
        "2.5.29.20": {
            short: null,
            long: "CRLNumber"
        },
        "2.5.29.27": {
            short: null,
            long: "BaseCRLNumber"
        },
        "2.5.29.21": {
            short: null,
            long: "CRLReason"
        },
        "2.5.29.24": {
            short: null,
            long: "InvalidityDate"
        },
        "2.5.29.28": {
            short: null,
            long: "IssuingDistributionPoint"
        },
        "2.5.29.29": {
            short: null,
            long: "CertificateIssuer"
        },
        "2.5.29.30": {
            short: null,
            long: "NameConstraints"
        },
        "2.5.29.31": {
            short: null,
            long: "CRLDistributionPoints"
        },
        "2.5.29.46": {
            short: null,
            long: "FreshestCRL"
        },
        "2.5.29.32": {
            short: null,
            long: "CertificatePolicies"
        },
        "2.5.29.33": {
            short: null,
            long: "PolicyMappings"
        },
        "2.5.29.35": {
            short: null,
            long: "AuthorityKeyIdentifier"
        },
        "2.5.29.36": {
            short: null,
            long: "PolicyConstraints"
        },
        "2.5.29.37": {
            short: null,
            long: "ExtKeyUsage"
        },
        "2.5.29.54": {
            short: null,
            long: "InhibitAnyPolicy"
        },
        "1.3.6.1.5.5.7.1.1": {
            short: null,
            long: "AuthorityInfoAccess"
        },
        "1.3.6.1.5.5.7.1.11": {
            short: null,
            long: "SubjectInfoAccess"
        }
    };

    /**
     * Converts X500Name to string 
     * @param  {RDN} name X500Name
     * @param  {string} spliter Splitter char. Default ','
     * @returns string Formated string
     * Example:
     * > C=Some name, O=Some organization name, C=RU
     */
    export function NameToString(name: RDN, spliter: string = ","): string {
        let res: string[] = [];
        for (let type_and_value of name.types_and_values) {
            let type = type_and_value.type;
            let _name = OID[type].short;
            res.push(`${_name ? _name : type}=${type_and_value.value.value_block.value}`);
        }
        return res.join(spliter + " ");
    }

    export let HashOID: { [key: string]: string } = {};
    HashOID[HashOID[SHA1] = "1.3.14.3.2.26"] = SHA1;
    HashOID[HashOID[SHA256] = "2.16.840.1.101.3.4.2.1"] = SHA256;
    HashOID[HashOID[SHA384] = "2.16.840.1.101.3.4.2.2"] = SHA384;
    HashOID[HashOID[SHA512] = "2.16.840.1.101.3.4.2.3"] = SHA512;

    export class PKIError extends Error {
        stack: any;

        protected padNum(num: number, size: number): string {
            let s = num + "";
            while (s.length < size) s = "0" + s;
            return s;
        }

        constructor(message: string, code = 0) {
            super();
            let _code = code;
            this.message = `PKIJS${this.padNum(_code, 4)}: ${message}`;
            this.stack = (new Error(this.message) as any).stack;
        }
    }

    export interface IASN1Item {

        /**
         * Converts object to ASN1 raw 
         * @returns Uint8Array
         */
        Encode(): Uint8Array;

        /**
         * Decode the encoded ASN1 raw 
         */
        Decode(raw: Uint8Array): void;
    }

    export interface IASN1ItemConstructorable {
        /**
         * Creats object from the encoded ASN1 raw
         */
        new (raw: Uint8Array): IASN1Item;
    }

    export class ASN1 {
        protected simpl: any;
        protected asn1: any;

        constructor();
        constructor(simpl: any, asn1?: any);
        constructor(simpl: any = null, asn1: any = null) {
            this.simpl = simpl;
            this.asn1 = asn1;
        }
    }

    export class ASN1Object extends ASN1 implements IASN1Item {

        protected raw: Uint8Array;

        constructor();
        constructor(raw: Uint8Array);
        constructor(raw?: Uint8Array) {
            super();
            if (raw)
                this.Decode(raw);
        }

        /**
         * Converts object to ASN1 raw 
         * @returns Uint8Array
         */
        Encode(): Uint8Array {
            throw new PKIError("Not implemented");
        }

        /**
         * Decode the encoded ASN1 raw 
         */
        Decode(raw: Uint8Array): void {
            throw new PKIError("Not implemented");
        }
    }

    export declare type ASN1ObjectIdentifier = string;
}