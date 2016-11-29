import * as XmlJs from "xmljs";

import { XmlXades } from "./xml";
import { XmlXadesCollection } from "./xml_xades";
import { EncapsulatedPKIData } from "./encapsulated_pki_data";


/**
 * The CertifiedRoles element contains one or more wrapped attribute 
 * certificates for the signer
 */
export class CertifiedRoles extends XmlXadesCollection<CertifiedRole> {

    protected name = XmlXades.ElementNames.CertifiedRoles;

    // Protetced methods

    protected OnLoadChildElement(element: Element): any {
        if (element.namespaceURI === XmlXades.NamespaceURI && element.localName === XmlXades.ElementNames.CertifiedRoles) {
            let certifiedRoles = new CertifiedRoles();
            certifiedRoles.LoadXml(element);
            return certifiedRoles;
        }
    }

}

/**
* The CertifiedRoles element contains one or more wrapped attribute
* certificates for the signer
*/
export class CertifiedRole extends EncapsulatedPKIData {

    public constructor() {
        super(XmlXades.ElementNames.CertifiedRole);
    }

    public GetPki(): any {
        throw new XmlJs.XmlError(XmlJs.XE.METHOD_NOT_SUPPORTED);
    }
}
