namespace xadesjs {

    export interface XmlNamespace {
        prefix: string;
        namespace: string;
    }

    export class NamespaceManager {

        protected items: XmlNamespace[];

        constructor() {
            this.items = [];
        }

        get Count() {
            return this.items.length;
        }

        Item(index: number): XmlNamespace {
            return this.items[index];
        }

        RemoveAt(index: number): void {
            this.items = this.items.filter((item, _index) => {
                return index !== _index;
            });
        }

        IsEmpry(): boolean {
            return this.Count === 0;
        }

        Add(item: XmlNamespace) {
            item.prefix = item.prefix || "";
            item.namespace = item.namespace || "";
            this.items.push(item);
        }

        Pop(): XmlNamespace {
            return this.items.pop();
        }

        GetPrefix(prefix: string, start: number = this.Count - 1) {
            let lim = this.Count - 1;
            prefix = prefix || "";
            if (start > lim)
                start = lim;
            for (let i = start; i >= 0; i--) {
                let item = this.items[i];
                if (item.prefix === prefix)
                    return item;
            }
            return null;
        }

        GetNamespace(namespaceUrl: string, start: number = this.Count - 1) {
            let lim = this.Count - 1;
            namespaceUrl = namespaceUrl || "";
            if (start > lim)
                start = lim;
            for (let i = start; i >= 0; i--) {
                let item = this.items[i];
                if (item.namespace === namespaceUrl)
                    return item;
            }
            return null;
        }

        GetIterator(): XmlNamespace[] {
            return this.items;
        }

    }

}