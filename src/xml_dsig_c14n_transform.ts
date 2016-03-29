namespace xadesjs {
    export class XmlDsigC14NTransform extends Transform {
		private  input: Type[];
		private output: Type[];
		private  canonicalizer: XmlCanonicalizer;
		private Stream s;
		
		public XmlDsigC14NTransform() : this(false)
        {
        }

		public XmlDsigC14NTransform(bool includeComments)
        {
            if (includeComments)
                Algorithm = XmlSignature.AlgorithmNamespaces.XmlDsigC14NWithCommentsTransform;
            else
                Algorithm = XmlSignature.AlgorithmNamespaces.XmlDsigC14NTransform;
            canonicalizer = new XmlCanonicalizer(includeComments, false, PropagatedNamespaces);
        }

		public override Type[] InputTypes {
            get {
                if (input == null) {
                    input = new Type[3];
                    input[0] = typeof (System.IO.Stream);
                    input[1] = typeof (System.Xml.XmlDocument);
                    input[2] = typeof (System.Xml.XmlNodeList);
                }
                return input;
            }
        }

		public override Type[] OutputTypes {
            get {
                if (output == null) {
                    output = new Type[1];
                    output[0] = typeof (System.IO.Stream);
                }
                return output;
            }
        }

		protected override XmlNodeList GetInnerXml ()
        {
            return null; // THIS IS DOCUMENTED AS SUCH
        }

        [ComVisible(false)]
		public override byte[] GetDigestedOutput (HashAlgorithm hash)
        {
            // no null check, MS throws a NullReferenceException here
            return hash.ComputeHash((Stream) GetOutput ());
        }

		public override object GetOutput ()
        {
            return (object) s;
        }

		public override object GetOutput (Type type)
        {
            if (type == typeof (Stream))
                return GetOutput();
            throw new ArgumentException("type");
        }

		public override void LoadInnerXml(XmlNodeList nodeList)
        {
            // documented as not changing the state of the transform
        }

		public override void LoadInput(object obj)
        {
            // possible input: Stream, XmlDocument, and XmlNodeList
            Stream stream = (obj as Stream);
            if (stream != null) {
                XmlDocument doc = new XmlDocument();
                doc.PreserveWhitespace = true;	// REALLY IMPORTANT
                doc.XmlResolver = GetResolver();
                doc.Load(new XmlSignatureStreamReader(new StreamReader(stream)));
                //				doc.Load ((Stream) obj);
                s = canonicalizer.Canonicalize(doc);
                return;
            }

            XmlDocument xd = (obj as XmlDocument);
            if (xd != null) {
                s = canonicalizer.Canonicalize(xd);
                return;
            }

            XmlNodeList nl = (obj as XmlNodeList);
            if (nl != null) {
                s = canonicalizer.Canonicalize(nl);
            }
            else
                throw new ArgumentException("obj");
        }
    }
}