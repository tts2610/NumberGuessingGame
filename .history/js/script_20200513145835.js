let div = document.getElementById("inputDiv");
let startGameBtn = document.getElementById("startGameBtn");

let historyBox = [];
let bestScores = [];
let guess = 5;
let second = 30;
let randomNumber = Math.floor(Math.random() * 100) + 1;
let timer;

let input = document.getElementById("guessInput");

let guessHistory = document.getElementById("guessHistory");
let ranking = document.getElementById("ranking");

let secondRemaining = document.getElementById("secondRemaining");
let guessRemaining = document.getElementById("guessRemaining");
let finalResult = document.getElementById("finalResult");

let guessBtn = document.getElementById("guessBtn");
let resetBtn = document.getElementById("resetBtn");

$(document).keypress(function(e) {
    if (e.which == 13) {
        $("#guessBtn").click();
    }
});

$(document).ready(function() {
    div.style.display = "none";
});

function startGame() {
    if (div.style.display === "none") {
        secondRemaining.innerHTML = second;
        timecounting();
        guessRemaining.textContent = guess;
        displayDiv();
    }
}

function displayDiv() {
    if (div.style.display === "block" && startGameBtn.style.display === "none") {
        div.style.display = "none";
        startGameBtn.style.display = "block";
    } else {
        div.style.display = "block";
        startGameBtn.style.display = "none";
    }

}

function resetToDefault() {
    guess = 5;
    second = 30;
    guessHistory.innerHTML = "";
}

function timecounting() {
    timer = setInterval(() => {
        if (second == 0) {
            clearInterval(timer);
            enableOrDisableBtn();
            displayDiv();
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
            bestScores.push({ guessRemain: guess, timeRemain: second })
        } else if (input.value < 10) {
            result = 2;
        } else if (input.value > 10) {
            result = 3;
        }
        guessRemaining.textContent = --guess;
        if (guess == 0) {
            enableOrDisableBtn()
        }
    }
    return result;
}

function guessSubmit() {
    finalResult.innerHTML = prompts[getResult()]
    bestScores.sort((a, b) => (a.guessRemain > b.guessRemain) ? -1 : 1);
    guessHistory.innerHTML = "";
    historyBox.forEach(element => {
        var p = document.createElement("p");
        p.innerHTML = element;
        guessHistory.append(p);
    });
}

function enableOrDisableBtn() {
    if (!input.disabled && !guessBtn.disabled && !resetBtn.disabled) {
        input.disabled = true;
        guessBtn.disabled = true;
        resetBtn.disabled = true;
    } else {
        input.disabled = false;
        guessBtn.disabled = false;
        resetBtn.disabled = false;
    }

}

function reset() {

}