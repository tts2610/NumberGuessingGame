let div = document.getElementById("inputDiv");
let startGameBtn = document.getElementById("startGameBtn");

let historyBox = [];
let bestScores = [];
let guess = 5;
let second = 30;
let randomNumber;
let timer;

let input = document.getElementById("guess");

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
            secondRemaining.innerHTML = second
        }, 1000) // every 1 second, it will add 1 into time variable (computer use millisecond so 1000 is 1 second)
}





function guess() {

}

function reset() {

}