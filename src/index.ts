import * as xadesXml from "./xml";

export let xml = xadesXml;
export * from "./signed_xml";

import { XmlObject } from "xml-core";
export let Parse = XmlObject.Parse;
export { Select, Convert } from "xml-core";