function loadXMLDoc(filename, cb) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            cb(xmlhttp);
        }
    };
    xmlhttp.open("GET", "/xml/" + filename, true);
    xmlhttp.send();
}
function Test1(xml) {
    var xmlDoc = xml.responseXML;
    var xmlSignature = xmlDoc.getElementsByTagNameNS("http://www.w3.org/2000/09/xmldsig#", "Signature");
    console.log(xmlSignature);
    var sxml = new xadesjs.SignedXml(xmlDoc);
    sxml.loadXml(xmlSignature[0]);
    sxml.CheckSignature()
        .then(function(v) {
            console.log("Verify:", v);
        })
        .catch(function(e) {
            console.log(e);
        })
}

loadXMLDoc("document.signed.t.bes.xml", Test1);
