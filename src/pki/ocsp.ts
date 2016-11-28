namespace xadesjs.pki.ocsp {

    export class CertId extends ASN1 {
        Algorithm: string;
        IssuerName: Uint8Array;
        IssuerKey: Uint8Array;
        SerialNumber: string;
    }

    export class Request extends ASN1 {

        protected extensions = new Collection<Extension>();
        protected certId: CertId = null;

        get CertificateId(): CertId {
            return this.certId;
        }

        get Extensions(): Collection<Extension> {
            let extensions = this.simpl.extensions;
            if (extensions.length && !this.extensions.Count)
                for (let i = 0; i < extensions.length; i++) {
                    let extn = new Extension();
                    (extn as any).simpl = extensions[i];
                    this.extensions.Add(extn);
                }
            return this.extensions;
        }

    }

    export class TBSRequest extends ASN1 {

        protected requests = new Collection<Request>();
        protected extensions = new Collection<Extension>();

        get Version(): number {
            return this.simpl.version;
        }

        get Requestor(): string {
            return NameToString(this.simpl.requestorName);
        }

        get Requests(): Collection<Request> {
            let requests = this.simpl.requestList;
            if (requests.length && !this.requests.Count)
                for (let i = 0; i < requests.length; i++) {
                    let req = new Request();
                    (req as any).simpl = requests[i];
                    this.requests.Add(req);
                }
            return this.requests;
        }

        get Extensions(): Collection<Extension> {
            let extensions = this.simpl.extensions;
            if (extensions.length && !this.extensions.Count)
                for (let i = 0; i < extensions.length; i++) {
                    let extn = new Extension();
                    (extn as any).simpl = extensions[i];
                    this.extensions.Add(extn);
                }
            return this.extensions;
        }
    }

    export class Signature extends ASN1 {
        certificates = new Collection<X509Certificate>();

        get ALgorithm(): string {
            return this.simpl.signatureAlgorithm;
        }
        get Value(): Uint8Array {
            return new Uint8Array(this.simpl.signature.value_block.value_hex);
        }

        get Certificates(): Collection<X509Certificate> {
            let certs = this.simpl.certs;
            if (certs.length && !this.certificates.Count)
                for (let i = 0; i < certs.length; i++) {
                    let cert = new X509Certificate();
                    (cert as any).simpl = certs[i];
                    this.certificates.Add(cert);
                }
            return this.certificates;
        }
    }

    export class OCSPRequest extends ASN1Object {
        TBSRequest = new TBSRequest();
        Signature = new Signature();

        Encode(): Uint8Array {
            this.simpl = new org.pkijs.simpl.OCSP_REQUEST();

            // Check data

            // Schema to buffer
            let ocsp_req_schema = this.simpl.toSchema();
            let ocspReqBuffer = ocsp_req_schema.toBER(false);
            return new Uint8Array(ocspReqBuffer);
        }
    }

    export class ResponderId extends ASN1 {
        get Name(): string {
            return NameToString(this.simpl.byName);
        }
        get Key(): Uint8Array {
            return new Uint8Array(this.simpl.byKey.value_block.value_hex);
        }
    }

    export class ResponseBytes extends ASN1 {
        get Type(): ASN1ObjectIdentifier {
            return this.simpl.responseType;
        }
        get Response(): Uint8Array {
            return new Uint8Array(this.simpl.response);
        }
    }

    export enum OCSPResponseStatus {
        Successful = 0,
        MalformedRequest = 1,
        InternalError = 2,
        TryLater = 3,
        SigRequest = 5,
        Unauthorized = 6
    }

    export class OCSPResponse extends ASN1Object {
        get Status(): OCSPResponseStatus {
            return this.simpl.responseStatus;
        }

        get Response(): ResponseBytes {
            let resBytes = new ResponseBytes();
            (resBytes as any).simpl = this.simpl.responseBytes;
            return resBytes;
        }
    }

    export enum CertificateStatus {
        Good = 0,
        Revoked = 1,
        Unkown = 2
    }

    export class SingleResponse extends ASN1 {

        protected extensions = new Collection<Extension>();

        get CertificateId(): CertId {
            return new CertId(this.simpl.certID);
        }

        get CertificateStatus(): CertificateStatus {
            if ("good" in this.simpl.certStatus)
                return CertificateStatus.Good;
            if ("revoked" in this.simpl.certStatus)
                return CertificateStatus.Revoked;
            return CertificateStatus.Unkown;
        }

        get NextUpdate(): Date {
            return this.simpl.nextUpdate.value;
        }

        get ThisUpdate(): Date {
            return this.simpl.thisUpdate.value;
        }

        get Extensions(): Collection<Extension> {
            let extensions = this.simpl.extensions;
            if (extensions.length && !this.extensions.Count)
                for (let i = 0; i < extensions.length; i++) {
                    let extn = new Extension();
                    (extn as any).simpl = extensions[i];
                    this.extensions.Add(extn);
                }
            return this.extensions;
        }
    }

    export class ResponseData extends ASN1 {

        protected responses = new Collection<SingleResponse>();
        protected extensions = new Collection<Extension>();

        get Version(): number {
            return this.simpl.version;
        }

        get ResponderId(): ResponderId {
            return new ResponderId(this.simpl.responderID);
        }

        get ProducedAt(): Date {
            return this.simpl.producedAt.value;
        }

        get Responses() {
            let responses = this.simpl.requestList;
            if (responses.length && !this.responses.Count)
                for (let i = 0; i < responses.length; i++) {
                    let resp = new SingleResponse(responses[i]);
                    this.responses.Add(resp);
                }
            return this.responses;
        }

        get Extensions(): Collection<Extension> {
            let extensions = this.simpl.extensions;
            if (extensions.length && !this.extensions.Count)
                for (let i = 0; i < extensions.length; i++) {
                    let extn = new Extension();
                    (extn as any).simpl = extensions[i];
                    this.extensions.Add(extn);
                }
            return this.extensions;
        }

    }

}