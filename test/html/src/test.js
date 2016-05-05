var assert = {
    equal: function(exp, v, message) {
        if (exp !== v)
            throw new Error(message ? message : "" + exp + " is not " + v);
    }
}

/**
 * @returns XMLHttpRequest
 */
function getXmlHttp() {
    var xmlhttp;
    try {
        xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
    } catch (e) {
        try {
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        } catch (E) {
            xmlhttp = false;
        }
    }
    if (!xmlhttp && typeof XMLHttpRequest != 'undefined') {
        xmlhttp = new XMLHttpRequest();
    }
    return xmlhttp;
}

function readFile(path, cb) {
    var xmlhttp = getXmlHttp()
    xmlhttp.open('GET', path, true);
    // xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded; charset=ISO-8859-1');
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4) {
            if (xmlhttp.status == 200) {
                cb(xmlhttp.responseText);
            }
            else {
                assert.equal(false, true, "Error on reading " + path);
            }
        }
    };
    xmlhttp.send(null);
}

function readXml(path, cb) {
    var xmlhttp = getXmlHttp()
    xmlhttp.open('GET', path, true);
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4) {
            if (xmlhttp.status == 200) {
                assert.equal(!!xmlhttp.responseXML, true, `Can not get XML from ${path}`);
                    cb(xmlhttp.responseXML);
            }
            else {
                assert.equal(false, true, "Error on XML reading " + path);
            }
        }
    };
    xmlhttp.send(null);
}

console.log("Runing: Browser");
console.log("WebCrypto: W3");