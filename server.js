/// <reference path="./typings/express/express.d.ts" />
var express = require("express");

var app = express();

app.use('/test', express.static('./test'));
app.use('/node_modules', express.static('./node_modules'));
app.use('/built', express.static('./built'));
app.use('/', express.static('./html'));

app.listen("3000", function(){
    console.log("Server start at localhost:3000");
})