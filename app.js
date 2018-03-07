const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');
const app = express();

const url = 'https://api.bitfinex.com/v1/pubticker/btcusd';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// Function of getting data
function getData () {
    request.get(url, function(error, response, data) {
        if (error) {
            console.log("error: " + error )
        } else {
            console.log(JSON.parse(data).last_price + " USD");
        }
    });
}

// Let's start get data each 10s
getData ();
setInterval(function(){ getData(); }, 10000);


module.exports = app;
