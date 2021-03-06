let div = document.getElementById("inputDiv");
let startGameBtn = document.getElementById("startGameBtn");

let historyBox = [];
let bestScores = [];
let guess = 5;
let second = 30;
let randomNumber;
let timer;

let input = document.getElementById("guessInput");

let secondRemaining = document.getElementById("secondRemaining");
let guessRemaining = document.getElementById("guessRemaining");
let finalResult = document.getElementById("finalResult");


$(document).ready(function() {
    div.style.display = "none";
    randomNumber = Math.floor(Math.random() * 100) + 1;
});

function startGame() {
    if (div.style.display === "none") {
        secondRemaining.innerHTML = second;
        timecounting();

        guessRemaining.textContent = guess;
        div.style.display = "block";
        startGameBtn.style.display = "none";
    }
}

function timecounting() {
    timer = setInterval(() => {
        if (second == 0) {
            clearInterval(timer);
            return;
        }
        second -= 1
        secondRemaining.innerHTML = second;
    }, 1000)

}



function guessSubmit() {
    if (input.value == 10) {
        finalResult.innerHTML = "You are Correct!";
    } else if (input.value < 10) {
        finalResult.innerHTML = "Too Low!";
    } else if (input.value > 10) {
        finalResult.innerHTML = "Too High!";
    }
}

function reset() {

}