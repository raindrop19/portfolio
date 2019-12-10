//jshint esversion: 6

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));

app.listen(3000, function() {
  console.log("The server is listening to port 3000");
});

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html"); //don't forget to add "/"!!!
});

app.post("/", function(req, res) {

  var crypto = req.body.crypto;
  var fiat = req.body.fiat;
  var amount = req.body.amount;
  var options = {
    url: "https://apiv2.bitcoinaverage.com/convert/global",
    method: "GET",
    qs: {
      from: crypto,
      to: fiat,
      amount: amount
    }
  };

  // console.log(req.body.crypto);
  request("https://apiv2.bitcoinaverage.com/indices/global/ticker/" + crypto + fiat, function(error, response, body) {
    // console.log(response.statusCode); return the http status code 200 means successful
    // console.log(body);
    var data = JSON.parse(body);
    var price = data.last;
    var currentTime = data.display_timestamp;

    console.log(price);

    res.write("<p>The current time is " + currentTime + "</p>"); //tried <h3>, didn't work, has to be <p>
    res.write("<h1>The latest " + crypto + " price is " + price + fiat + "</h1>");

    res.send();
  });

  //Converter:
  // request(options, function() {
  //   var data = JSON.parse(body);
  //   var amount = data.price;
  //
  //   res.write("<h1>" + amount + crypto + " is equal to " + price + fiat + "</h1>");

  //   res.send();
  // });
});
