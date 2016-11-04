var express = require('express');
var app = express();
var morgan = require("morgan");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({"extended": "true"}));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: "application/vnd.api+json"}));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/index');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


