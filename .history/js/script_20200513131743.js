let div = document.getElementById("inputDiv");
let startGameBtn = document.getElementById("startGameBtn");

let historyBox = [];
let bestScores = [];
let guess = 5;
let second = 30;
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
        secondRemaining.textContent = secondRemaining;
        div.style.display = "block";
        startGameBtn.style.display = "none";
    }
}




function get() {

}

function reset() {

}