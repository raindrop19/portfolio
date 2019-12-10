//jshint esversion: 6
//DEPLOYED ON: https://rocky-harbor-36473.herokuapp.com

const request = require("request");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();

//Usage of "package.json":
//https://devcenter.heroku.com/articles/getting-started-with-nodejs#declare-app-dependencies

app.use(express.static("public"));
app.use(bodyParser.urlencoded({
  extended: true
}));

app.listen(process.env.PORT || 3000, function() {     //listen to both heroku selected port and local port for testing
//https://devcenter.heroku.com/articles/preparing-a-codebase-for-heroku-deployment#4-listen-on-the-correct-port
  console.log("this server is running on port 3000");
});

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html");
});
//res.sendFile is the response of the Server to send the file to the Browser.

app.post("/", function(req, res) {

    var firstName = req.body.fName;
    var lastName = req.body.lName;
    var email = req.body.email;

    var data = {
      members: [{
        email_address: email,
        status: "subscribed",
        merge_fields: { //merge_ not merge- !
          FNAME: firstName,
          LNAME: lastName
        }
      }]
    };

    var jsonData = JSON.stringify(data);

    var options = {
      url: "https://us5.api.mailchimp.com/3.0/lists/c63d9f66f6",
      method: "POST",
      headers: { //headers is an object to pass on
        Authorization: "max9watt 7b01295d29b12aa9927f51f7ccc8b0a7-us5", //COMMENT THIS LINE OUT when testing error page
      },
      body: jsonData
    };

    console.log(firstName, lastName, email);

    request(options, function(error, response, body) {
        if (error) {
          res.sendFile(__dirname + "/failure.html");
        } else {
            if (response.statusCode === 200){           //fuck, miss 1 ")" following 200, 20min debug....
              console.log(response.statusCode);
              res.sendFile(__dirname + "/success.html");
            } else {
              res.sendFile(__dirname + "/failure.html");
            }
          }
      });
  });

  app.post("/failure", function(req, res){
    res.redirect("/");  //redirect to homeroute, which then triggers a GET to load signup.html
    // res.redirect(__dirname + "/signup.html");    //don't know why this line returns "cannot GET"
  });

// 7b01295d29b12aa9927f51f7ccc8b0a7-us5 mailchimp api key
// c63d9f66f6 audience ID instead of list ID
