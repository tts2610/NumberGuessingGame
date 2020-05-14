// FOR NEW GAME EFFECT
let div = document.getElementById("inputDiv");
let startGameBtn = document.getElementById("startGameBtn");

// VARIABLE FOR CALCULATE
let historyBox = [];
let bestScores = [];
let previousRecord = [];
let guess = 9;
let second = 30;
let randomNumber = Math.floor(Math.random() * 100) + 1;
let timer;

// USER INPUT
let input = document.getElementById("guessInput");

// LEFT BOXES
let guessHistory = document.getElementById("guessHistory");
let ranking = document.getElementById("ranking");
let previousRound = document.getElementById("previousRound");

// RIGHT BOXES
let secondRemaining = document.getElementById("secondRemaining");
let guessRemaining = document.getElementById("guessRemaining");
let finalResult = document.getElementById("finalResult");

// BUTTONS
let guessBtn = document.getElementById("guessBtn");
let resetBtn = document.getElementById("resetBtn");


// TOASTER + TOASTER OUTPUT
let toaster = document.getElementById("toast-container");
let prompts = { 1: "Too Low!", 2: "Too High!", 3: "You already input that number!", 4: "Better luck next time!", 5: "Great Job!", 6: "Please input your number!" }


// =========== MAIN ============ 

// ENTER KEY PRESSED
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

// NEW-GAME BUTTON PRESSED
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

// 
//         let previousRecord = document.createElement("ul");
//         previousRecord.forEach(element => {
//             var li = document.createElement("li");
//             // element = ["failed",[guess,second]]
//             var textnode = document.createTextNode(element[0] + " / " + "Finished with " + guess - element[1][0] + 1 + " tries in " + element[1][1] + "s");
//             li.appendChild(textnode);
//             previousRecord.appendChild(li);
//         });
//         previousRound.appendChild(previousRecord);

// GUESS BUTTON PRESSED
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

        insertPreviousRecord();
    }
    bestScores.sort((a, b) => (a.guessRemain > b.guessRemain) ? -1 : 1);
    guessHistory.innerHTML = "";
    historyBox.forEach(element => {
        var p = document.createElement("p");
        var img = document.createElement("img")
        img.src = "img/dice.png";
        img.width = 60;
        img.height = 60;
        var textnode = document.createTextNode(element); // Create a text node
        p.appendChild(img);
        p.appendChild(textnode);
        guessHistory.append(p);
    });

    if (result == 5) {
        ranking.innerHTML = "";
        bestScores.forEach((element, i) => {
            if (i == 3) {
                return;
            }
            var p = document.createElement("div");
            p.className = "mt-3 mx-4";
            var img = document.createElement("img")
            img.src = "img/" + ++i + ".png";
            img.width = 64;
            img.height = 64;
            var textnode = document.createTextNode("Sean finished with " + (guess - element.guessRemain + 1) + " guesses in " + (second - element.timeRemain) + "s!");
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

// RESET BUTTON PRESSED
function reset() {
    resetToDefault();
    enableOrDisableBtn();
    displayDiv();
}

// ============END-MAIN===========

// =========EXTRA-FUNCTIONS=======

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
            previousRecord.push(["failed", [guess, second]]);
            clearInterval(timer);
            createAlert(4);
            reset();
            return;
        }
        second -= 1;
        secondRemaining.innerHTML = second + "s";
    }, 1000)

}

function getResult() {
    let result = 0;
    if (historyBox.includes(input.value)) {
        result = 3;
    } else {
        historyBox.push(input.value);
        if (input.value == randomNumber) {
            bestScores.push({ guessRemain: guess, timeRemain: second });
            previousRecord.push(["succeed", [guess, second]])
            return 5;
        } else if (input.value < randomNumber) {
            result = 1;
        } else if (input.value > randomNumber) {
            result = 2;
        }
        guessRemaining.textContent = --guess;
        if (guess == 0) {
            result = 4;
            previousRecord.push(["failed", [guess, second]])
        }
    }
    return result;
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

function autoFocus() {
    input.focus();
}