let div = document.getElementById("inputDiv");
let startGameBtn = document.getElementById("startGameBtn");

let historyBox = [];
let bestScores = [];
let guess = 5;
let second = 30;
let randomNumber;
let timer;

let input = document.getElementById("guessInput");

let guessHistory = document.getElementById("guessHistory");
let ranking = document.getElementById("ranking");

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


let prompts = { 1: "You are Correct!", 2: "Too Low!", 3: "Too High!", 4: "You already input that number!" }


function getResult() {
    let result = 0;
    if (historyBox.includes(input.value)) {
        result = 4;
    } else {
        historyBox.push(input.value);
        if (input.value == 10) {
            result = 1;
            bestScores.push({ guessRemain: guess, timeRemain: time })
        } else if (input.value < 10) {
            result = 2;
        } else if (input.value > 10) {
            result = 3;
        }
        guessRemaining.textContent = --guess;
    }
    return result;
}

function guessSubmit() {
    finalResult.innerHTML = prompts.getResult();
    bestScores.sort((a, b) => (a.guessRemain > b.guessRemain) ? -1 : 1);
    historyBox.forEach(element => {
        var p = document.createElement("p");
        p.innerHTML = element;
        guessHistory.append(p);
    });
}

function reset() {

}