var fortunes = [
    "True wisdom comes not from knowledge, but from understanding.",
    "A fresh idea will become useful when you act on it.",
    "Small consistent steps will create a big result.",
    "Your patience today will make tomorrow easier.",
    "A curious mind will always find another door.",
    "Good work begins when you give your full attention.",
    "The best time to learn something new is now.",
    "Clear thinking turns difficult tasks into simple steps.",
    "Kindness and discipline are both signs of strength.",
    "A confident beginning is already half of progress."
];

var fortuneThemes = {
    blue: {
        color: "#ffffff",
        backgroundColor: "#184e77",
        borderColor: "#ffd166",
        fontSize: "22px",
        fontFamily: "Arial, Helvetica, sans-serif"
    },
    green: {
        color: "#111827",
        backgroundColor: "#b7f7c1",
        borderColor: "#0f766e",
        fontSize: "23px",
        fontFamily: "Georgia, 'Times New Roman', serif"
    },
    red: {
        color: "#ffffff",
        backgroundColor: "#9d0208",
        borderColor: "#ffba08",
        fontSize: "21px",
        fontFamily: "Verdana, Geneva, sans-serif"
    },
    purple: {
        color: "#fff7ad",
        backgroundColor: "#3c096c",
        borderColor: "#9ef01a",
        fontSize: "24px",
        fontFamily: "'Trebuchet MS', Arial, sans-serif"
    }
};

document.addEventListener("DOMContentLoaded", function () {
    showRandomFortune();
    setupFortuneButtons();
});

function showRandomFortune() {
    var randomIndex = Math.floor(Math.random() * fortunes.length);
    document.getElementById("fortune-text").textContent = fortunes[randomIndex];
}

function setupFortuneButtons() {
    var buttons = document.querySelectorAll(".style-button");

    buttons.forEach(function (button) {
        button.addEventListener("click", function () {
            var themeName = button.getAttribute("data-theme");
            applyFortuneTheme(themeName);
        });
    });
}

function applyFortuneTheme(themeName) {
    var theme = fortuneThemes[themeName];
    var fortuneBox = document.getElementById("fortune-box");
    var fortuneText = document.getElementById("fortune-text");

    fortuneBox.style.backgroundColor = theme.backgroundColor;
    fortuneBox.style.borderColor = theme.borderColor;
    fortuneText.style.color = theme.color;
    fortuneText.style.fontSize = theme.fontSize;
    fortuneText.style.fontFamily = theme.fontFamily;
}
