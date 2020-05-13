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
        startGameBtn.style.display = "none";
    }
}