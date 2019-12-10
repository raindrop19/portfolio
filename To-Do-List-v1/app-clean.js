//jshint esversion: 6
//Angela suggested USE let INSTEAD OF let  both in and out functions due to the unpreditable local/global nature of let

const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js"); //Don't forget the / before the file name!

const app = express();

let items = ["Learn Udemy WebDev 2019", "Brunch", "Apply Schools"];
let workItems = [];

app.set("view engine", "ejs"); //must after express() line!

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static("public"));

app.listen(3000, function() {
  console.log("this server runs on port 3000");
});

app.get("/", function(req, res) {

  let day = date.getDate(); //we call the function within date module that bounds to the constance date
  //date.getDay() to get the actual day of the week
  res.render("list", {
    listTitle: day,
    //get the result of day to pass over here
    newListItems: items
  });

});

app.post("/", function(req, res) {
  let item = req.body.newItem; //req is before body!! not the other way round

  if (req.body.list === "Work") {
    workItems.push(item);
    res.redirect("/work");
  } else {
    items.push(item);
    res.redirect("/"); //IMPORTANT: without this line, nothing will be added as new item on the html page
  }
  // console.log(items);
  console.log(req.body);
});

app.get("/work", function(req, res) {
  res.render("list", {
    listTitle: "Work List",
    newListItems: workItems
  });
});

app.get("/about", function(req, res) {
  res.render("about");
});
