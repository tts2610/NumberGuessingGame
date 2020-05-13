let div = document.getElementById("inputDiv");
let startGameBtn = document.getElementById("startGameBtn");
$(document).ready(function() {
    div.style.display = "none";
});

function myFunction() {
    if (div.style.display === "none") {
        alert("aaa")
        div.style.display = "block";
        startGameBtn.style.display = "none";
    }
}