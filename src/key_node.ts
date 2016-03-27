namespace xadesjs {

    export class KeyInfoNode extends XmlObject implements KeyInfoClause {

        private Node: Element;

        constructor(node?: Element) {
            super();
            if (node)
                this.loadXml(node);
        }

        get Value(): Element {
            return this.Node;
        }
        set Value(value: Element) {
            this.Node = value;
        }

        getXml(): Node {
            return this.Node;
        }

        // LAMESPEC: No ArgumentNullException is thrown if value == null
        loadXml(value: Node): void {
            this.Node = <any>value;
        }
    }

}