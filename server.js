// init project
var express = require('express');
var moment = require('moment');
var app = express();

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.get('/:timestamp', function (req, res) {
  var timestamp = req.params.timestamp;
  
  // check if timestamp is natural time
  if (moment(timestamp).isValid() && isNaN(timestamp)) {
    var time = {
      unix: moment(timestamp).unix(),
      natural: moment(timestamp).format('MMMM DD, YYYY')
    }
    res.send(time);
  }
  // check if timestamp is in unixtime format
  else if (moment(timestamp, 'x', true).isValid()) {

    var time = {
      unix: timestamp,
      natural: moment.unix(timestamp).format('MMMM DD, YYYY')
    }
    res.send(time);
  }
  else {
    var time = {
      unix: null,
      natural: null
    }
    res.send(time);
  }
})

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
