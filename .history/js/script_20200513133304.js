let div = document.getElementById("inputDiv");
let startGameBtn = document.getElementById("startGameBtn");

let historyBox = [];
let bestScores = [];
let guess = 5;
let second = 30;
let randomNumber = Math.floor(Math.random() * 100) + 1;
let timer;

let input = document.getElementById("guess");

let secondRemaining = document.getElementById("secondRemaining");
let guessRemaining = document.getElementById("guessRemaining");
let finalResult = document.getElementById("finalResult");


$(document).ready(function() {
    div.style.display = "none";
});

function startGame() {
    if (div.style.display === "none") {
        var oneMinute = 90;
        timecounting();

        guessRemaining.textContent = guess;
        div.style.display = "block";
        startGameBtn.style.display = "none";
    }
}

function timecounting() {
    myTime = setInterval(() => {
            time += 1
            document.getElementById('timecount').innerHTML = time
        }, 1000) // every 1 second, it will add 1 into time variable (computer use millisecond so 1000 is 1 second)
}





function get() {

}

function reset() {

}