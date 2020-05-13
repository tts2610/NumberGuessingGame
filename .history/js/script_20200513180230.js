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
    input.disabled = true;
    guessBtn.disabled = true;
    resetBtn.disabled = true;
});

function startGame() {
    secondRemaining.innerHTML = second;
    timecounting();
    guessRemaining.textContent = guess;
    displayDiv();
    enableOrDisableBtn();
    alert("Random number revealed(for testing lol): " + randomNumber);
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
    clearInterval(timer);
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
            createAlert(4);
            resetToDefault();
            enableOrDisableBtn();
            displayDiv();
            return;
        }
        second -= 1;
        secondRemaining.innerHTML = second;
    }, 1000)

}


let prompts = { 1: "Too Low!", 2: "Too High!", 3: "You already input that number!", 4: "Sorry, better luck next time!", 5: "Great Job!", 6: "Please input your number!" }


function getResult() {
    let result = 0;
    if (historyBox.includes(input.value)) {
        result = 3;
    } else {
        historyBox.push(input.value);
        if (input.value == randomNumber) {
            bestScores.push({ guessRemain: guess, timeRemain: second });
            return 5;
        } else if (input.value < randomNumber) {
            result = 1;
        } else if (input.value > randomNumber) {
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
    if (input.value == '') {
        createAlert(6);
        return;
    }
    let result = getResult();
    createAlert(result);
    if ([4, 5].includes(result)) {
        resetToDefault();
        enableOrDisableBtn();
        displayDiv();
    }


    bestScores.sort((a, b) => (a.guessRemain > b.guessRemain) ? -1 : 1);
    guessHistory.innerHTML = "";
    historyBox.forEach(element => {
        var p = document.createElement("p");
        p.innerHTML = element;
        guessHistory.append(p);
    });

    if (result == 5) {
        ranking.innerHTML = "";
        bestScores.forEach((element, i) => {
            var p = document.createElement("div");
            p.className = "mt-3";
            var img = document.createElement("img")
            img.src = "img/" + ++i + ".png";
            img.width = 64;
            img.height = 64;

            var textnode = document.createTextNode(element.guessRemain + " guesses has been completed in " + element.timeRemain + " s"); // Create a text node



            p.appendChild(img);
            p.appendChild(textnode);
            var hr = document.createElement("hr");
            ranking.append(p);
            ranking.append(hr);
        });
    }

    // clear after insert
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



function createAlert(alertType) {

    let alertColor = [1, 2, 3, 4, 6].includes(alertType) ? "alert-danger" : "alert-success";
    let text = prompts[alertType];

    text += [4, 5].includes(alertType) ? " The random number is: " + randomNumber : "";

    // alert(alertColor);

    let alertDiv = document.createElement("div");
    alertDiv.className = "alert " + alertColor + " alert-dismissible fade show";
    var textnode = document.createTextNode(text);
    alertDiv.appendChild(textnode);

    let button = document.createElement("button");
    button.type = "button"
    button.className = "close";
    button.setAttribute("data-dismiss", "alert");


    let span = document.createElement("span");
    span.innerHTML = "&times;";
    span.setAttribute("aria-hidden", "true");
    button.appendChild(span);

    alertDiv.appendChild(button);

    alertTag.innerHTML = "";
    alertTag.appendChild(alertDiv);
}

function reset() {

}