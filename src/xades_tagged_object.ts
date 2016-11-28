namespace xadesjs.pro {

    export class XmlXadesTaggedObject extends XmlXadesObject {

        /**
         * The name of the element when serializing
         */
        protected TagName: string = "TaggedObject";

        protected GetXmlObjectName() {
            return this.TagName;
        }

        constructor(tagName: string) {
            super();
            this.TagName = tagName;
        }

    }

}