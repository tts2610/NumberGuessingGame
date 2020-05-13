let div = document.getElementById("inputDiv");
let startGameBtn = document.getElementById("startGameBtn");

let historyBox = [];
let bestScores = [];
let guessRemaining = 5;
let timeRemaining = 30;
let randomNumber = Math.floor(Math.random() * 100) + 1;

let input = document.getElementById("guess");

let secondRemaining = document.getElementById("secondRemaining");
let guessRemaining = document.getElementById("guessRemaining");
let finalResult = document.getElementById("finalResult");


$(document).ready(function() {
    div.style.display = "none";
});

function startGame() {
    if (div.style.display === "none") {
        div.style.display = "block";
        startGameBtn.style.display = "none";
    }
}




function get() {

}

function reset() {

}