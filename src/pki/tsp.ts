namespace xadesjs.pki.tsp {

    export class TSPRequest extends ASN1Object {
        DigestAlgorithm: DigestAlgorithm;
        DigestValue: Uint8Array;

        /**
         * Set/get the value of ReqPolicy field of this object. Default value is `true`
         */
        CertReq: boolean;
        /**
         * Set/get the value of ReqPolicy field of this object
         * Indicates the TSA policy under
         * which the TimeStampToken SHOULD be provided
         */
        ReqPolicy: string;

        constructor();
        constructor(raw: Uint8Array);
        constructor(digestAlgorithm: DigestAlgorithm, digestValue: Uint8Array, requestCert?: boolean, requestPolicy?: string);
        constructor(param?: Uint8Array | DigestAlgorithm, digestValue?: Uint8Array, requestCert: boolean = true, requestPolicy: string = null) {
            super();
            if (param instanceof Uint8Array) {
                this.Decode(param);
            }
            else {
                this.DigestAlgorithm = param;
                this.DigestValue = digestValue;
            }
            this.CertReq = requestCert;
            this.ReqPolicy = requestPolicy;
        }

        Encode(): Uint8Array {
            this.simpl = new org.pkijs.simpl.TSP_REQUEST();

            if (!this.DigestAlgorithm)
                throw new PKIError(`DigestAlgorithm is empty. TSPRequest needs DigestAlgorithm value`);
            let digestOid = HashOID[this.DigestAlgorithm];
            if (!digestOid)
                throw new PKIError(`Unknown digest algorithm in use '${this.DigestAlgorithm}''`);

            // MessageImprint
            this.simpl.messageImprint = new org.pkijs.simpl.tsp.MessageImprint({
                hashAlgorithm: new org.pkijs.simpl.ALGORITHM_IDENTIFIER({
                    algorithm_id: digestOid
                }),
                hashedMessage: new org.pkijs.asn1.OCTETSTRING({ value_hex: this.DigestValue.buffer })
            });

            // Policy
            if (this.ReqPolicy)
                this.simpl.reqPolicy = this.ReqPolicy;

            // Cert
            this.simpl.certReq = true;

            // Deprecated
            // this.simpl.nonce = new org.pkijs.asn1.INTEGER({ value_hex: this.DigestValue.buffer });
            // this.simpl.nonce = new org.pkijs.asn1.INTEGER({ value: new Date().getTime() });

            // Extensions
            // Not implemented yet

            let tsp_req_schema = this.simpl.toSchema();
            let tspReqBuffer = tsp_req_schema.toBER(false);
            return new Uint8Array(tspReqBuffer);
        }

        Decode(raw: Uint8Array) {
            // Decode existing TSP request
            let asn1 = org.pkijs.fromBER(raw);
            this.simpl = new org.pkijs.simpl.TSP_REQUEST({ schema: asn1.result });

            // TODO: Check parser result 

            // DigestAlgorithm
            let oid = this.simpl.messageImprint.hashAlgorithm.algorithm_id;
            let hashAlgorithm = HashOID[oid];
            if (!hashAlgorithm)
                throw new XmlError(XE.CRYPTOGRAPHIC, `Can't get DigestAlgorithm from OID ${oid}`);
            this.DigestAlgorithm = hashAlgorithm as any;

            // DigestValue
            this.DigestValue = new Uint8Array(this.simpl.messageImprint.hashedMessage.value_block.value_hex);

            // Policy
            this.ReqPolicy = this.simpl.reqPolicy || null;

            // simpl.nonce.value_block.value_hex 

            // CertReq
            this.CertReq = !!this.simpl.certReq;

            // Extensions
            // Not implemented yet
        }
    }

    export enum TSPStatus {
        /**
         * When the PKIStatus contains the value zero a TimeStampToken, as
         * requested, is present
         */
        Granted,
        /**
         * When the PKIStatus contains the value one a TimeStampToken, 
         * with modifications, is present
         */
        GrantedWithMods,
        Rejection,
        Waiting,
        /**
         * This message contains a warning that a revocation is imminent
         */
        RevocationWarning,
        /**
         * Notification that a revocation has occurred  
         */
        RevocationNotification
    }

    export enum TSPFailureInfo {
        /**
         * Unrecognized or unsupported Algorithm Identifier
         */
        BadAlgorithm = 0,
        /**
         * bouncycastle error
         */
        BadMessageCheck = 1,
        /**
         * bouncycastle error
         */
        BadTime = 3,
        /**
         * bouncycastle error
         */
        BadCertId = 4,
        /**
         * Transaction not permitted or supported
         */
        BadRequest = 2,
        /**
         * The data submitted has the wrong format
         */
        BadDataFormat = 5,
        /**
         * bouncycastle error
         */
        WrongAuthority = 6,
        /**
         * bouncycastle error
         */
        IncorrectData = 7,
        /**
         * bouncycastle error
         */
        MissingTimeStamp = 8,
        /**
         * bouncycastle error
         */
        BadPOP = 9,
        /**
         * bouncycastle error
         */
        TimeNotAvailable = 14,
        /**
         * the TSA's time source is not available
         */
        UnacceptedPolicy = 15,
        /**
         * The requested extension is not supported by the TSA
         */
        UnacceptedExtension = 16,
        /**
         * The additional information requested could not be understood or is not available
         */
        AddInfoNotAvailable = 17,
        /**
         * the additional information requested could not be understood
         * or is not available
         */
        SystemFailure = 25
    }

    export class TSPStatusInfo {
        Status: TSPStatus = TSPStatus.Granted;
        StatusString: string = null;
        FailInfo: TSPFailureInfo;
    }

    export declare type ASN1ObjectIdentifier = string
    export declare type TSAPolicyId = ASN1ObjectIdentifier;

    export class TSTInfo {
        Policy: TSAPolicyId;
        DigestAlgorithm: DigestAlgorithm;
        DigestValue: Uint8Array;
        SerialNumber: Uint8Array;
        GeneratedTime: Date;
        Accuracy: Accuracy;
        Ordering: boolean = false;
        TSA: string;
        Extensions: any = null;
    }

    export class TimeStampToken extends ASN1Object {

        protected signedSimpl: any;

        ContentType: ASN1ObjectIdentifier = "1.2.840.113549.1.7.2";
        Content: any;
        Info: TSTInfo;

        constructor();
        constructor(raw: Uint8Array);
        constructor(simpl: any);
        constructor(param1?: Uint8Array | any) {
            super();
            this.Info = new TSTInfo();
            if (param1)
                if (param1 instanceof Uint8Array) {
                    this.Decode(param1);
                }
                else
                    this.LoadSimpl(param1);
        }

        Encode(): Uint8Array {
            if (this.raw)
                return this.raw;
            else
                return new Uint8Array(this.simpl.value_block.value_hex);
        }

        Decode(raw: Uint8Array): void {
            let asn1 = org.pkijs.fromBER(raw.buffer);
            let simpl = new org.pkijs.simpl.CMS_CONTENT_INFO({ schema: asn1.result });
            this.LoadSimpl(simpl);
            this.raw = raw;
        }

        protected LoadSimpl(simpl: any) {
            this.simpl = simpl;
            if (this.simpl.contentType !== "1.2.840.113549.1.7.2")
                throw new PKIError("Wrong ContentInfo type identificator");
            this.signedSimpl = new org.pkijs.simpl.CMS_SIGNED_DATA({ schema: this.simpl.content });

            let asn1_tst = org.pkijs.fromBER(this.signedSimpl.encapContentInfo.eContent.value_block.value_hex);
            let tst_info_simpl = new org.pkijs.simpl.TST_INFO({ schema: asn1_tst.result });

            // Put information about policy 
            this.Info.Policy = tst_info_simpl.policy;

            // DigestAlgorithm
            let oid = tst_info_simpl.messageImprint.hashAlgorithm.algorithm_id;
            let hashAlgorithm = HashOID[oid];
            if (!hashAlgorithm)
                throw new PKIError(`Can't get DigestAlgorithm from OID ${oid}`);
            this.Info.DigestAlgorithm = hashAlgorithm as any;

            // DigestValue
            this.Info.DigestValue = new Uint8Array(tst_info_simpl.messageImprint.hashedMessage.value_block.value_hex);

            // Serial number 
            this.Info.SerialNumber = new Uint8Array(tst_info_simpl.serialNumber.value_block.value_hex);

            // GeneratedTime 
            this.Info.GeneratedTime = tst_info_simpl.genTime;

            // Accuracy 
            this.Info.Accuracy = null;
            if (tst_info_simpl.accuracy) {
                this.Info.Accuracy = new Accuracy();
                this.Info.Accuracy.Seconds = (tst_info_simpl.accuracy.seconds) ? tst_info_simpl.accuracy.seconds : 0;
                this.Info.Accuracy.Millis = (tst_info_simpl.accuracy.millis) ? tst_info_simpl.accuracy.millis : 0;
                this.Info.Accuracy.Micros = (tst_info_simpl.accuracy.micros) ? tst_info_simpl.accuracy.micros : 0;
            }

            // TST info ordering 
            this.Info.Ordering = !!tst_info_simpl.ordering;

            // Put information about TST info TSA 
            if ("tsa" in tst_info_simpl) {
                switch (tst_info_simpl.tsa.NameType) {
                    case 1: // rfc822Name
                    case 2: // dNSName
                    case 6: // uniformResourceIdentifier
                        this.Info.TSA = tst_info_simpl.tsa.Name.value_block.value;
                        break;
                    case 7: // iPAddress
                        let view = new Uint8Array(tst_info_simpl.tsa.Name.value_block.value_hex);
                        this.Info.TSA = view[0].toString() + "." + view[1].toString() + "." + view[2].toString() + "." + view[3].toString();
                        break;
                    case 3: // x400Address
                    case 5: // ediPartyName
                        this.Info.TSA = (tst_info_simpl.tsa.NameType === 3) ? `<type "x400Address">` : `<type "ediPartyName">`;
                        break;
                    case 4: // directoryName
                        this.Info.TSA = NameToString(tst_info_simpl.tsa.Name);
                        break;
                }
            }
        }

        Verify(params: TSPVerifyParams): PromiseLike<boolean> {
            let that = this;
            if (!this.signedSimpl)
                return new Promise(function (resolve, reject) {
                    throw new PKIError("TimeStampToken is empty. You should use decode first");
                });

            params.signer = 0;

            return this.signedSimpl.verify(params);
        }

    }

    export class Accuracy {
        Seconds: number = 0;
        Millis: number = 0;
        Micros: number = 0;
    }

    declare type PkijsBITSTRING = {
        unused_bits: number;
        value_block: {
            value_hex: ArrayBuffer;
        }
    }

    export declare type TSPVerifyParams = {
        data: ArrayBuffer
    }

    export class TSPResponse extends ASN1Object {

        StatusInfo: TSPStatusInfo;
        TimeStampToken: TimeStampToken = null;

        constructor();
        constructor(raw: Uint8Array);
        constructor(raw?: Uint8Array) {
            super();
            this.StatusInfo = new TSPStatusInfo();
            if (raw)
                this.Decode(raw);
        }

        /**
         * Converts PKIJS BITSTRING object to  TSPFailureInfo enum value
         * @param  {PkijsBITSTRING} pkijsBS PKIJS BITSTRING object
         * @returns TSPFailureInfo
         * - throws PKIError, if all bits from BITSTRING value are "0"
         * - throws PKIError, if BITSTRING value has unknown bit value
         */
        private ConvertBitStringToNumber(pkijsBS: PkijsBITSTRING): TSPFailureInfo {
            let value = new Uint8Array(this.simpl.status.failInfo.value_block.value_hex);
            let unused_bits = this.simpl.status.failInfo.value_block.unused_bits;
            let bitString = "";
            for (let i = 0; i < value.length; i++) {
                bitString += ("00000000" + value[i].toString(2)).substr(-8);
            }
            /**
             * get bit position
             * search for first true bit
             */
            let res: TSPFailureInfo = null;
            for (let i = 0; i < bitString.length; i++) {
                if (bitString.charAt(i) === "1") {
                    res = i;
                    break;
                }
            }
            if (res === null) {
                throw new PKIError("TSP failureInfo has wrong value");
            }
            if (!TSPFailureInfo[res]) {
                throw new PKIError("Unknown TSP failureInfo value");
            }
            return res;
        }

        Decode(raw: Uint8Array): void {
            console.log("Decode TSPResponse");
            // Decode existing TSP response 
            let asn1 = org.pkijs.fromBER(raw.buffer);
            this.simpl = new org.pkijs.simpl.TSP_RESPONSE({ schema: asn1.result });

            // Put information about TSP response status 
            this.StatusInfo.Status = this.simpl.status.status;

            if ("statusStrings" in this.simpl.status && this.simpl.status.statusStrings.length)
                this.StatusInfo.StatusString = this.simpl.status.statusStrings[0].value_block.value;
            if ("failInfo" in this.simpl.status) {
                this.StatusInfo.FailInfo = this.ConvertBitStringToNumber(this.simpl.status.failInfo);
            }

            // Parse internal CMS Signed Data 
            if (this.simpl.timeStampToken) {
                let buf = new Uint8Array(asn1.result.value_block.value[1].value_before_decode);
                this.TimeStampToken = new TimeStampToken(buf);
            }
        }

    }

}