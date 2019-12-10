// alert("working!");

// Random Dice Number Generator 1-6

var randomNumber1 = Math.floor ((Math.random() * 6) + 1);

var randomNumber2 = Math.floor ((Math.random() * 6) + 1);

// console.log(randomNumber1);


// Change Dice Image
var randomDiceImage1 = "images/dice" + randomNumber1 + ".png"; //dice1.png - dice6.png

var randomDiceImage2 = "images/dice" + randomNumber2 + ".png"; //dice1.png - dice6.png


// Change Image Source
document.querySelector(".img1").setAttribute("src", randomDiceImage1);

document.querySelector(".img2").setAttribute("src", randomDiceImage2);

// Change title
if (randomDiceImage1 > randomDiceImage2){
  document.querySelector("h1").innerHTML = "Player 1 Wins!";
}

else if (randomDiceImage1 < randomDiceImage2){
  document.querySelector("h1").innerHTML = "Player 2 Wins!";
}
else{
  document.querySelector("h1").innerHTML = "Draw!";
}
