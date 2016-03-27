/// <reference path="./common.ts" />

namespace xadesjs {

    export interface IXmlSerializable {
        /**
         * Writes object to XML node
         * @returns Node
         */
        getXml(): Node;
        /**
         * Reads XML from string
         * @param  {Node} node
         * @returns void
         */
        loadXml(node: Node): void;
        /**
         * Reads XML from Node
         * @param  {Node} node
         * @returns void
         */
        loadXml(node: Node): void;
    }

    export abstract class XmlObject implements IXmlSerializable {
        getXml(): Node;
        getXml(document: Document): Node;
        getXml(document: Document = null): Node {
            throw new XmlError(XE.METHOD_NOT_IMPLEMENTED);
        }

        loadXml(node: Node): void {
            throw new XmlError(XE.METHOD_NOT_IMPLEMENTED);
        }

        toString(): string {
            let xml = this.getXml();
            return new XMLSerializer().serializeToString(xml);
        }

    }

}