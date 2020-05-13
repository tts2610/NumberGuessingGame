function myFunction() {
    var div = document.getElementById("inputDiv");
    var starGameBtn = document.getElementById("starGameBtn");
    if (div.style.display === "none") {
        div.style.display = "block";
        starGameBtn.style.display = "none";
    } else {
        div.style.display = "none";
    }
}