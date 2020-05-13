let div = document.getElementById("inputDiv");
$(document).ready(function() {
    div.style.display = "none";
});

function myFunction() {
    var startGameBtn = document.getElementById("startGameBtn");
    if (div.style.display === "none") {
        alert("aaa")
        div.style.display = "block";
        startGameBtn.style.display = "none";
    } else {
        alert("bbbb")
        div.style.display = "none";
        startGameBtn.style.display = "block";
    }
}