const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');
const app = express();
const axios = require('axios');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


// Let's start get data with request

function getData () {
    const url = 'https://api.bitfinex.com/v1/pubticker/btcusd';
    request.get(url, function(error, response, data) {
        if (error) {
            console.log("error: " + error )
        } else {
            console.log(JSON.parse(data).last_price + " USD");
        }
    });
}
//getData();
//setInterval(() => { getData(); }, 10000);


// Let's start get data each with Axios in object, axios automatically parse JSON data

let crypto = {
    lastPrice: 0,
    updateSec: 5000,
    apiUrl: 'https://api.bitfinex.com/v1/pubticker/btc',
    pullData: function (val) {
        axios.get(this.apiUrl + val)
            .then(response => {
                this.lastPrice = response.data.last_price;
                console.log(this.lastPrice);
            })
            .catch(error => {
                console.log("error: " + error);
            });
    },
    start: function (val){
        this.pullData(val);
        setInterval(() => {this.pullData(val);}, this.updateSec);
    }
};
crypto.start("usd");


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  let err = new Error('Not Found');
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


module.exports = app;
