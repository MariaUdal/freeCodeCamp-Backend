// Request Header Parser Microservice

// init project
var express = require('express');
var app = express();

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  // response.sendFile(__dirname + '/views/index.html');
  var ip = req.headers['x-forwarded-for'].split(',')[0] || req.connection.remoteAddress;
  
  var lang = req.acceptsLanguages()[0];
  
  res.send({
    ipaddress: ip,
    language: lang,
    software: req.headers["user-agent"].split("(")[1].split(")")[0]
  });
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
