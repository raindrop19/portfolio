//jshint esversion: 6

module.exports.getDate = getDate; //remember here no () because we are not calling it

function getDate() {

  let today = new Date();

  let options = {
    weekday: "long",
    day: "numeric",
    month: "long"
  };

  return today.toLocaleDateString("en-US", options);
}

module.exports.getDay = getDay;

function getDay() {

  let today = new Date();

  let options = {
    weekday: "long",
  };

  return today.toLocaleDateString("en-US", options);
}

// console.log(module.exports);
