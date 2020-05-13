let div = document.getElementById("inputDiv");
let startGameBtn = document.getElementById("startGameBtn");

let historyBox = [];
let bestScores = [];
let guess = 9;
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

let toaster = document.getElementById("toast-container");

// ENTER PRESSED
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
    window.scroll(0, 0);
    toaster.innerHTML = ""
    secondRemaining.innerHTML = second;
    timecounting();
    guessRemaining.textContent = guess;
    displayDiv();
    enableOrDisableBtn();
    autoFocus();
    alert("Random number revealed(for testing): " + randomNumber);
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
    guess = 9;
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
            reset();
            return;
        }
        second -= 1;
        secondRemaining.innerHTML = second + "s";
    }, 1000)

}


let prompts = { 1: "Too Low!", 2: "Too High!", 3: "You already input that number!", 4: "Better luck next time!", 5: "Great Job!", 6: "Please input your number!" }


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
    if (guessBtn.disabled) return;
    else if (input.value == '' && !guessBtn.disabled) {
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
        var img = document.createElement("img")
        img.src = "img/dice.png";
        img.width = 60;
        img.height = 60;
        // p.innerHTML = element;
        var textnode = document.createTextNode(element); // Create a text node
        p.appendChild(img);
        p.appendChild(textnode);
        guessHistory.append(p);
    });

    if (result == 5) {
        ranking.innerHTML = "";
        bestScores.forEach((element, i) => {
            var p = document.createElement("div");
            p.className = "mt-3 mx-4";
            var img = document.createElement("img")
            img.src = "img/" + ++i + ".png";
            img.width = 64;
            img.height = 64;
            var textnode = document.createTextNode("Sean made " + (guess - element.guessRemain + 1) + " guesses in " + (second - element.timeRemain) + "s!");
            p.appendChild(img);
            p.appendChild(textnode);
            var hr = document.createElement("hr");
            ranking.append(p);
            ranking.append(hr);
        });
    }

    // clear after insert
    input.value = "";
    autoFocus();

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

    let alertColor = [1, 2, 3, 4, 6].includes(alertType) ? "btn-danger" : "btn-info";
    let text = prompts[alertType];

    text += [4, 5].includes(alertType) ? "! Try another round to rank up!" : "";

    if (toaster.childElementCount > 1 || [4, 5].includes(alertType)) {
        toaster.innerHTML = "";
    }

    toaster.innerHTML += `<div class="toast" id="toast" role="alert" aria-live="assertive" aria-atomic="true" data-delay="5000">
    <div class="toast-body ${alertColor}" style="letter-spacing: 1px;">
        ${text}
    </div>
    </div>`;
    $('.toast').toast('show');
}

function reset() {
    resetToDefault();
    enableOrDisableBtn();
    displayDiv();
}

function autoFocus() {
    input.focus();
}