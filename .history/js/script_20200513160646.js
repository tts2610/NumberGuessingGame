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

let alertTag = document.getElementById("customAlert");

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
    historyBox = [];
    guessHistory.innerHTML = "";
    randomNumber = Math.floor(Math.random() * 100) + 1;
}

function timecounting() {
    timer = setInterval(() => {
        if (second == 0) {
            clearInterval(timer);
            createAlert(1);
            resetToDefault();
            enableOrDisableBtn();
            displayDiv();
            return;
        }
        second -= 1
        secondRemaining.innerHTML = second;
    }, 1000)

}


let prompts = { 1: "Too Low!", 2: "Too High!", 3: "You already input that number!", 4: "Sorry, better luck next time!", 5: "Great Job!" }


function getResult() {
    let result = 0;
    if (historyBox.includes(input.value)) {
        result = 3;
    } else {
        historyBox.push(input.value);
        if (input.value == 10) {
            result = 5;
            bestScores.push({ guessRemain: guess, timeRemain: second })
        } else if (input.value < 10) {
            result = 1;
        } else if (input.value > 10) {
            result = 2;
        }
        guessRemaining.textContent = --guess;
        if (guess == 0) {
            result = 4;
        }
    }
    return result;
}

function guessSubmit() {
    let result = getResult();
    finalResult.innerHTML = prompts[result];
    bestScores.sort((a, b) => (a.guessRemain > b.guessRemain) ? -1 : 1);
    guessHistory.innerHTML = "";
    historyBox.forEach(element => {
        var p = document.createElement("p");
        p.innerHTML = element;
        guessHistory.append(p);
    });
    input.value = "";

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

// <div class="alert alert-danger" role="alert">
//   This is a danger alert—check it out!
// {
//     /* <button type="button" class="close" data-dismiss="alert" aria-label="Close">
//         <span aria-hidden="true">&times;</span>
//       </button> */
//       <span aria-hidden="true">&times;</span>
// }
//   </div>



function createAlert(alertType) {

    let text = alertType == 1 ? "" : ;
    let alertColor = alertType == 1 ? "alert-danger" : "alert-success";


    let div = document.createElement("div");
    div.className = "alert " + alertColor + " alert-dismissible fade show";
    var textnode = document.createTextNode(text);
    div.appendChild(textnode);

    let button = document.createElement("button");
    button.type = "button"
    button.className = "close";
    button.setAttribute("data-dismiss", "alert");


    let span = document.createElement("span");
    span.innerHTML = "&times;";
    span.setAttribute("aria-hidden", "true");
    button.appendChild(span);

    div.appendChild(button);
    alertTag.appendChild(div);
}

function reset() {

}