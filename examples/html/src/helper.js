var Browser = {
    IE: "Internet Explorer",
    Safari: "Safari",
    Edge: "Edge",
    Chrome: "Chrome",
    Firefox: "Firefox Mozilla",
};
/**
 * Returns info about browser
 */
function BrowserInfo() {
    var res = {
        name: "",
        version: ""
    };
    var userAgent = self.navigator.userAgent;
    var reg;
    if (reg = /edge\/([\d\.]+)/i.exec(userAgent)) {
        res.name = Browser.Edge;
        res.version = reg[1];
    }
    else if (/msie/i.test(userAgent)) {
        res.name = Browser.IE;
        res.version = /msie ([\d\.]+)/i.exec(userAgent)[1];
    }
    else if (/Trident/i.test(userAgent)) {
        res.name = Browser.IE;
        res.version = /rv:([\d\.]+)/i.exec(userAgent)[1];
    }
    else if (/chrome/i.test(userAgent)) {
        res.name = Browser.Chrome;
        res.version = /chrome\/([\d\.]+)/i.exec(userAgent)[1];
    }
    else if (/safari/i.test(userAgent)) {
        res.name = Browser.Safari;
        res.version = /([\d\.]+) safari/i.exec(userAgent)[1];
    }
    else if (/firefox/i.test(userAgent)) {
        res.name = Browser.Firefox;
        res.version = /firefox\/([\d\.]+)/i.exec(userAgent)[1];
    }
    return res;
}

stringToBuffer = function (text) {
    var res = new Uint8Array(text.length);
    for (var i = 0; i < text.length; i++)
        res[i] = text.charCodeAt(i);
    return res;
};
buffer2string = function (buffer) {
    var res = "";
    for (var i = 0; i < buffer.length; i++)
        res += String.fromCharCode(buffer[i]);
    return res;
};