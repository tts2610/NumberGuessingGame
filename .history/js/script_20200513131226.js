let div = document.getElementById("inputDiv");
let startGameBtn = document.getElementById("startGameBtn");
$(document).ready(function() {
    div.style.display = "none";
});

function startGame() {
    if (div.style.display === "none") {
        div.style.display = "block";
        startGameBtn.style.display = "none";
    }
}


let historyBox = [];
let bestScores = [];
let guessRemaining = 5;
let timeRemaining = 30;

let secondSpan = document.getElementById("second");
let guessSpan = document.getElementById("guess");
let finalResult = document.getElementById("finalResult");