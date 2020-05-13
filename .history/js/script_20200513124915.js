function myFunction() {
    var div = document.getElementById("inputDiv");
    var startGameBtn = document.getElementById("startGameBtn");
    if (div.style.display === "none") {
        div.style.display = "block";
        startGameBtn.style.display = "none";
    }
}