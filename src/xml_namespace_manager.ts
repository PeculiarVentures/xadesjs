namespace xadesjs {

    // class NamespaceDeclaration {
    //         prefix: string;
    //         uri: string;
    //         scopeId: number;
    //         previousNsIndex: number;

    //         Set(prefix: string, uri: string, scopeId: number, previousNsIndex: number): void {
    //             this.prefix = prefix;
    //             this.uri = uri;
    //             this.scopeId = scopeId;
    //             this.previousNsIndex = previousNsIndex;
    //         }
    // }

    export class XmlNamespaceManager {

        //         static s_EmptyResolver: IXmlNamespaceResolver;



        //         // array with namespace declarations
        //         nsdecls: NamespaceDeclaration[];

        //         // index of last declaration
        //         lastDecl = 0;

        //         // name table
        //         nameTable: XmlNameTable;

        //         // ID (depth) of the current scope
        //         scopeId: number;

        //         // hash table for faster lookup when there is lots of namespaces
        //         hashTable: Dictionary<string, int>;
        //         useHashtable: boolean;

        //         // atomized prefixes for "xml" and "xmlns"
        //         xml: string;
        //         xmlNs: string;

        //         // Constants
        //         MinDeclsCountForHashtable = 16;


        //         static get EmptyResolver() {
        //             if (this.s_EmptyResolver == null) {
        //                 // no locking; the empty resolver is immutable so it's not a problem that it may get initialized more than once
        //                 this.s_EmptyResolver = new XmlNamespaceManager(new NameTable());
        //             }
        //             return this.s_EmptyResolver;
        //         }

        //         constructor();
        //         constructor(nameTable?: XmlNameTable) {
        //             if (nameTable) {
        //                 this.nameTable = nameTable;
        //                 this.xml = nameTable.Add("xml");
        //                 this.xmlNs = nameTable.Add("xmlns");

        //                 this.nsdecls = [];
        //                 let emptyStr = nameTable.push("");
        //                 this.nsdecls[0].Set(emptyStr, emptyStr, -1, -1);
        //                 this.nsdecls[1].Set(this.xmlNs, nameTable.push(XmlReservedNs.NsXmlNs), -1, -1);
        //                 this.nsdecls[2].Set(this.xml, nameTable.Add(XmlReservedNs.NsXml), 0, -1);
        //                 this.lastDecl = 2;
        //                 this.scopeId = 1;
        //             }
        //         }

        //         public get NameTable(): XmlNameTable {
        //             return this.nameTable;
        //         }

        //         public get DefaultNamespace(): string {
        //             let defaultNs = this.LookupNamespace("");
        //             return (defaultNs == null) ? "" : defaultNs;
        //         }

        //         public PushScope(): void {
        //             this.scopeId++;
        //         }

        //         public PopScope(): boolean {
        //             let decl = this.lastDecl;
        //             if (this.scopeId == 1) {
        //                 return false;
        //             }
        //             while (this.nsdecls[decl].scopeId == this.scopeId) {
        //                 if (this.useHashtable) {
        //                     this.hashTable[this.nsdecls[decl].prefix] = this.nsdecls[decl].previousNsIndex;
        //                 }
        //                 decl--;
        //                 // Debug.Assert(decl >= 2);
        //             }
        //             this.lastDecl = decl;
        //             this.scopeId--;
        //             return true;
        //         }

        //         public AddNamespace(prefix: string, uri: string): void {
        //             if (uri == null)
        //                 throw new XmlError(XE.PARAM_REQUIRED, "uri");

        //             if (prefix == null)
        //                 throw new XmlError(XE.PARAM_REQUIRED, "prefix");

        //             prefix = this.nameTable.Add(prefix);
        //             uri = this.nameTable.Add(uri);

        //             if ((Ref.Equal(this.xml, prefix) && uri != XmlReservedNs.NsXml))) {
        //                 throw new ArgumentException(Res.GetString(Res.Xml_XmlPrefix));
        //             }
        //             if (Ref.Equal(this.xmlNs, prefix)) {
        //                 throw new ArgumentException(Res.GetString(Res.Xml_XmlnsPrefix));
        //             }

        //             let declIndex = this.LookupNamespaceDecl(prefix);
        //             let previousDeclIndex = -1;
        //             if (declIndex != -1) {
        //                 if (this.nsdecls[declIndex].scopeId == this.scopeId) {
        //                     // redefine if in the same scope
        //                     this.nsdecls[declIndex].uri = uri;
        //                     return;
        //                 }
        //                 else {
        //                     // othewise link
        //                     previousDeclIndex = declIndex;
        //                 }
        //             }

        //             // set new namespace declaration
        //             if (this.lastDecl == this.nsdecls.length - 1) {
        //                 let newNsdecls: NamespaceDeclaration[] = [];
        //                 Array.Copy(nsdecls, 0, newNsdecls, 0, nsdecls.Length);
        //                 nsdecls = newNsdecls;
        //             }

        //             nsdecls[++lastDecl].Set(prefix, uri, scopeId, previousDeclIndex);

        //             // add to hashTable
        //             if (useHashtable) {
        //                 hashTable[prefix] = lastDecl;
        //             }
        //             // or create a new hashTable if the threashold has been reached
        //             else if (lastDecl >= MinDeclsCountForHashtable) {
        //                 // add all to hash table
        //                 Debug.Assert(hashTable == null);
        //                 hashTable = new Dictionary<string, int>(lastDecl);
        //                 for (int i = 0; i <= lastDecl; i++ ) {
        //                     hashTable[nsdecls[i].prefix] = i;
        //                 }
        //                 useHashtable = true;
        //             }
        //         }

        //         public RemoveNamespace(prefix: string, uri: string) {
        //             if (uri == null) {
        //                 throw new XmlError(XE.PARAM_REQUIRED, "uri");
        //             }
        //             if (prefix == null) {
        //                 throw new XmlError(XE.PARAM_REQUIRED, "prefix");
        //             }

        //             let declIndex = this.LookupNamespaceDecl(prefix);
        //             while (declIndex != -1) {
        //                 if ((this.nsdecls[declIndex].uri === uri) && this.nsdecls[declIndex].scopeId == this.scopeId) {
        //                     this.nsdecls[declIndex].uri = null;
        //                 }
        //                 declIndex = this.nsdecls[declIndex].previousNsIndex;
        //             }
        //         }

        //         public GetEnumerator() {
        //             Dictionary < string, string > prefixes = new Dictionary<string, string>(lastDecl + 1);
        //             for (int thisDecl = 0; thisDecl <= lastDecl; thisDecl++ ) {
        //                 if (nsdecls[thisDecl].uri != null) {
        //                     prefixes[nsdecls[thisDecl].prefix] = nsdecls[thisDecl].prefix;
        //                 }
        //             }
        //             return prefixes.Keys.GetEnumerator();
        //         }

        //         // This pragma disables a warning that the return type is not CLS-compliant, but generics are part of CLS in Whidbey. 
        //         #pragma warning disable 3002
        //         public virtual IDictionary< string, string > GetNamespacesInScope(XmlNamespaceScope scope ) {
        //         #pragma warning restore 3002
        //         int i = 0;
        //         switch (scope) {
        //             case XmlNamespaceScope.All:
        //                 i = 2;
        //                 break;
        //             case XmlNamespaceScope.ExcludeXml:
        //                 i = 3;
        //                 break;
        //             case XmlNamespaceScope.Local:
        //                 i = lastDecl;
        //                 while (nsdecls[i].scopeId == scopeId) {
        //                     i--;
        //                     Debug.Assert(i >= 2);
        //                 }
        //                 i++;
        //                 break;
        //         }

        //         Dictionary < string, string > dict = new Dictionary<string, string>(lastDecl - i + 1);
        //         for (; i <= lastDecl; i++) {
        //             string prefix = nsdecls[i].prefix;
        //             string uri = nsdecls[i].uri;
        //             Debug.Assert(prefix != null);

        //             if (uri != null) {
        //                 if (uri.Length > 0 || prefix.Length > 0 || scope == XmlNamespaceScope.Local) {
        //                     dict[prefix] = uri;
        //                 }
        //                 else {
        //                     // default namespace redeclared to "" -> remove from list for all scopes other than local
        //                     dict.Remove(prefix);
        //                 }
        //             }
        //         }
        //         return dict;
        //     }

        //         public virtual string LookupNamespace(string prefix ) {
        //         int declIndex = LookupNamespaceDecl(prefix);
        //         return (declIndex == -1) ? null : nsdecls[declIndex].uri;
        //     }

        //         private int LookupNamespaceDecl(string prefix ) {
        //         if (useHashtable) {
        //             int declIndex;
        //             if (hashTable.TryGetValue(prefix, out declIndex )) {
        //                 while (declIndex != -1 && nsdecls[declIndex].uri == null) {
        //                     declIndex = nsdecls[declIndex].previousNsIndex;
        //                 }
        //                 return declIndex;
        //             }
        //             return -1;
        //         }
        //         else {
        //             // First assume that prefix is atomized
        //             for (int thisDecl = lastDecl; thisDecl >= 0; thisDecl-- ) {
        //                 if ((object)nsdecls[thisDecl].prefix == (object)prefix && nsdecls[thisDecl].uri != null ) {
        //                     return thisDecl;
        //                 }
        //             }

        //             // Non-atomized lookup
        //             for (int thisDecl = lastDecl; thisDecl >= 0; thisDecl-- ) {
        //                 if (String.Equals(nsdecls[thisDecl].prefix, prefix) && nsdecls[thisDecl].uri != null) {
        //                     return thisDecl;
        //                 }
        //             }
        //         }
        //         return -1;
        //     }

        //         public virtual string LookupPrefix(string uri ) {
        //         // Don't assume that prefix is atomized
        //         for (int thisDecl = lastDecl; thisDecl >= 0; thisDecl-- ) {
        //             if (String.Equals(nsdecls[thisDecl].uri, uri)) {
        //                 string prefix = nsdecls[thisDecl].prefix;
        //                 if (String.Equals(LookupNamespace(prefix), uri)) {
        //                     return prefix;
        //                 }
        //             }
        //         }
        //         return null;
        //     }

        //         public virtual bool HasNamespace(string prefix ) {
        //         // Don't assume that prefix is atomized
        //         for (int thisDecl = lastDecl; nsdecls[thisDecl].scopeId == scopeId; thisDecl-- ) {
        //             if (String.Equals(nsdecls[thisDecl].prefix, prefix) && nsdecls[thisDecl].uri != null) {
        //                 if (prefix.Length > 0 || nsdecls[thisDecl].uri.Length > 0) {
        //                     return true;
        //                 }
        //                 return false;
        //             }
        //         }
        //         return false;
        //     }

        //     #if !SILVERLIGHT // This method is not used in Silverlight
        //         internal bool GetNamespaceDeclaration(int idx, out string prefix, out string uri ) {
        //         idx = lastDecl - idx;
        //         if (idx < 0) {
        //             prefix = uri = null;
        //             return false;
        //         }

        //         prefix = nsdecls[idx].prefix;
        //         uri = nsdecls[idx].uri;

        //         return true;
        //     }
        //     #endif
    } // XmlNamespaceManager
}