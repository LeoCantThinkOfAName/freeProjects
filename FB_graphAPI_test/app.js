var express = require("express");

var app = express();

app.use(express.static("app"));
app.use(express.static("app/images"));

app.listen(process.env.PORT || 3000);