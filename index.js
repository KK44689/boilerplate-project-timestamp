// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

function getTimeJSON(dateString) {
  let unixTimestamp = new Date(dateString).getTime();
  let utcTimestamp = new Date(dateString).toUTCString();
  return { unix: unixTimestamp, utc: utcTimestamp };
}

function checkIsDateInvalid(dateString) {
  return new Date(dateString) == "Invalid Date";
}

app.get("/api/:date?", (req, res) => {
  var date = req.params.date;
  var resJson;

  if (checkIsDateInvalid(date)) {
    console.log(`${date} is invalid`);

    try {
      var unixDate = parseInt(date, 10);
      var convertedDate = new Date(unixDate).toISOString();

      console.log(`${convertedDate} converted date is valid`);
      resJson = getTimeJSON(convertedDate);
    } catch (err) {
      console.log(`can't convert date ${date == undefined}`);
      resJson = date == undefined ? getTimeJSON(new Date().toString()) : { error: "Invalid Date" };
    }
  }
  else {
    console.log(`${date} is valid`);
    resJson = getTimeJSON(date);
  }

  res.json(resJson);
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
