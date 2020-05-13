let div = document.getElementById("inputDiv");
let startGameBtn = document.getElementById("startGameBtn");
$(document).ready(function() {
    div.style.display = "none";
    div.style.transition = "opacity 5s ease-out";
    div.style.opacity = 0;
});

function startGame() {
    if (div.style.display === "none") {
        div.style.display = "block";
        div.style.opacity = 1;
        div.style.transitionDuration = 5
        startGameBtn.style.display = "none";
    }
}