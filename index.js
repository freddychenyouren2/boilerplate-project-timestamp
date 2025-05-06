// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// require dotenv
require('dotenv').config();

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

// REQUIREMENTS
/**
 * 1. You should provide your own project, not the example URL.
 * 2. A request to /api/:date? with a valid date should return a JSON object with a unix key that is a Unix timestamp of the input date in milliseconds (as type Number)
 * 3. A request to /api/:date? with a valid date should return a JSON object with a utc key that is a string of the input date in the format: Thu, 01 Jan 1970 00:00:00 GMT
 * 4. A request to /api/1451001600000 should return { unix: 1451001600000, utc: "Fri, 25 Dec 2015 00:00:00 GMT" }
 * 5. Your project can handle dates that can be successfully parsed by new Date(date_string)
 * 6. If the input date string is invalid, the API returns an object having the structure { error : "Invalid Date" }
 * 7. An empty date parameter should return the current time in a JSON object with a unix key
 * 8. An empty date parameter should return the current time in a JSON object with a utc key
 */

app.get("/api/:date?", function (req, res) {
  // Get date from erquest parameters, if it exists
  let dateParam = req.params.date;

  if (dateParam === undefined || dateParam === '') {
    date = new Date(); // Current Date
  } else if (!isNaN(dateParam) && !isNaN(parseInt(dateParam))) {
    date = new Date(parseInt(dateParam)); // Parse as integer
  } else {
    date = new Date(dateParam); // Original User Input that is a String
  }

  // If invalid date after parsing with Date.parse(), return error message
  if (date.toString() === 'Invalid Date') {
    return res.json({ error: "Invalid Date" });
  }

  //return JSON object with unix and utc keys
  let unixTimeStamp = date.getTime();
  let utcTimeStamp = date.toUTCString();

  res.json({
    unix: unixTimeStamp,
    utc: utcTimeStamp,
  })

})

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
