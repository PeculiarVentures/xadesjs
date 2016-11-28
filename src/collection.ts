namespace xadesjs {

    export class Collection<I> {

        protected items: Array<I> = new Array();

        public get Count(): number {
            return this.items.length;
        }

        public Item(index: number): I {
            return this.items[index];
        }

        public Add(item: I) {
            this.items.push(item);
        }

        public Clear(): void {
            this.items = new Array();
        }

        public GetIterator(): Array<I> {
            return this.items;
        }

    }

}