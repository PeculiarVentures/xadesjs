/// <reference path="../typings/express/express.d.ts" />
var express = require("express");
var fs = require("fs");

var app = express();

app.use("/xml", express.static("./test/files"));
app.use("/", express.static("./test"));
app.use("/built", express.static("./built"));
app.use("/node_modules", express.static("./node_modules"));

app.listen(3000, function() {
    console.log('Example app listening on port 3000!');
});