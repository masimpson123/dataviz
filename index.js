var express = require('express');
var app = express();

app.use(express.static("dist/michael-io-app"));

app.get('*', function(req, res) {
   res.sendFile(__dirname + '/dist/michael-io-app/index.html');
});

app.listen(8080);
