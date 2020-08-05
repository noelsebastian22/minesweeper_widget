import styles from "./styles/main.scss";
import { iframeStyles } from "./styles/iframe_styles";
import { gridTemplate } from "./lib/grid-template";

document.addEventListener("DOMContentLoaded", () => {
  // the mine sweeper button
  createSweeperbutton();

  // create the basic grid layout
  createGrid();

  //Create the Game
  createGame();
});

function createSweeperbutton() {
  const gridElement = document.createElement("div");
  gridElement.classList.add("mine-sweeper-main-grid");
  document.body.appendChild(gridElement);

  // Iframe
  const widgetButton = document.createElement("iframe");
  widgetButton.frameBorder = 0;
  widgetButton.classList.add("sq-widget-button");
  widgetButton.setAttribute("id", "mine-widget-btn");

  gridElement.appendChild(widgetButton);
  widgetButton.contentDocument.body.style.margin = "0";

  // Button
  const buttonContent = document.createElement("button");
  buttonContent.className = "sq-appointment-button";
  buttonContent.textContent = "Minesweeper";
  buttonContent.style.backgroundColor = "rgb(255, 224, 114)";
  buttonContent.style.color = "rgb(46, 46, 46)";
  buttonContent.style.height = "60px";
  buttonContent.style.width = "250px";
  buttonContent.style.fontSize = "20px";

  // Add click event to button
  buttonContent.addEventListener("click", () => {
    toggleMineGridVisibility();
  });

  // Style element
  const iframeStyleElement = document.createElement("style");
  iframeStyleElement.innerHTML = iframeStyles();

  widgetButton.contentDocument.body.appendChild(iframeStyleElement);
  widgetButton.contentDocument.body.appendChild(buttonContent);
}

function createGrid() {
  // Create the grid container
  const widgetContainer = document.createElement("div");
  widgetContainer.id = "mine-widget-form";
  widgetContainer.className = "mine-form-container";
  document.body.appendChild(widgetContainer);

  //Create the Iframe container
  const widget = document.createElement("iframe");
  widget.frameBorder = 0;
  widget.style.height = "100%";
  widget.style.width = "100%";
  widget.setAttribute("id", "mine-sweeper-content");
  widgetContainer.appendChild(widget);

  // Add charset
  const charsetMeta = widget.contentDocument.createElement("meta");
  charsetMeta.setAttribute("charset", "UTF-8");

  // Add font
  const iframeFontElement = document.createElement("link");
  iframeFontElement.setAttribute(
    "href",
    "https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap"
  );
  iframeFontElement.setAttribute("rel", "stylesheet");

  // Style element
  const iframeStyleElement = document.createElement("style");
  iframeStyleElement.innerHTML = iframeStyles();
  widget.contentDocument.head.appendChild(iframeStyleElement);

  // Add the custome HTML template for the grid
  widget.contentDocument.body.innerHTML = gridTemplate();

  // Add close widget functionality
  const closeBtn = widget.contentDocument.querySelector(".close-icon");
  closeBtn.addEventListener("click", toggleMineGridVisibility);

  // Add reset function
  widget.contentDocument
    .querySelector(".refresh-mine-grid")
    .addEventListener("click", () => {
      resetGame();
    });
}

function createGame() {
  const gridContentDocument = document.querySelector("#mine-sweeper-content")
    .contentDocument;
  const grid = gridContentDocument.querySelector(".mine-grid");
  const width = 10;
  const bombAmount = 20;
  let squares = [];
  let isGameOver = false;
  let flags = 0;
  let mins = 1;
  let timerInterval;

  // Create board
  function createBoard() {
    squares = [];
    updateFlagCount(bombAmount);
    // get shuffled game array with random bombs
    const bombsArray = Array(bombAmount).fill("bomb");
    const emptyArray = Array(width * width - bombAmount).fill("valid");
    const gamesArray = emptyArray.concat(bombsArray);
    const shuffledArray = gamesArray.sort(() => Math.random() - 0.5);

    for (let i = 0; i < width * width; i++) {
      const square = document.createElement("div");
      square.setAttribute("id", i);
      square.classList.add(shuffledArray[i]);
      grid.appendChild(square);
      squares.push(square);

      // Add event listener
      square.addEventListener("click", (e) => {
        click(square);
      });

      // ctrl and left click
      square.oncontextmenu = function (e) {
        e.preventDefault();
        addFlag(square);
      };
    }

    // add numbers
    for (let i = 0; i < squares.length; i++) {
      let total = 0;
      const isLeftEdge = i % width === 0;
      const isRightEdge = i % width === width - 1;

      if (squares[i].classList.contains("valid")) {
        if (i > 0 && !isLeftEdge && squares[i - 1].classList.contains("bomb"))
          total++;
        if (
          i > 9 &&
          !isRightEdge &&
          squares[i + 1 - width].classList.contains("bomb")
        )
          total++;
        if (i > 10 && squares[i - width].classList.contains("bomb")) total++;
        if (
          i > 11 &&
          !isLeftEdge &&
          squares[i - 1 - width].classList.contains("bomb")
        )
          total++;
        if (i < 98 && !isRightEdge && squares[i + 1].classList.contains("bomb"))
          total++;
        if (
          i < 90 &&
          !isLeftEdge &&
          squares[i - 1 + width].classList.contains("bomb")
        )
          total++;
        if (
          i < 88 &&
          !isRightEdge &&
          squares[i + 1 + width].classList.contains("bomb")
        )
          total++;

        if (i < 89 && squares[i + width].classList.contains("bomb")) total++;

        squares[i].setAttribute("data", total);
      }
    }
  }

  createBoard();

  // Add Timer
  addTimer(mins * 60);

  // Add flag with right click
  function addFlag(square) {
    if (isGameOver) return;
    if (!square.classList.contains("checked") && flags < bombAmount) {
      if (!square.classList.contains("flag")) {
        square.classList.add("flag");
        square.innerHTML = "&#9971;";
        flags++;
        checkForWin();
      } else {
        square.classList.remove("flag");
        square.innerHTML = "";
        flags--;
      }
    } else if (square.classList.contains("flag")) {
      square.classList.remove("flag");
      square.innerHTML = "";
      flags--;
    }

    // Add the flag count to DOM
    updateFlagCount(bombAmount - flags);
  }

  // update the flag count
  function updateFlagCount(count) {
    const gridDocument = document.querySelector("#mine-sweeper-content")
      .contentDocument;
    const flagCount = gridDocument.querySelector(".flag-count-display");
    const flagCountText = "Flags remaining: " + count;
    flagCount.innerHTML = flagCountText;
  }

  // click on square actions
  function click(square) {
    let currentId = square.id;
    if (isGameOver) return;
    if (
      square.classList.contains("checked") ||
      square.classList.contains("flag")
    )
      return;
    if (square.classList.contains("bomb")) {
      gameOver(square);
    } else {
      let total = square.getAttribute("data");
      if (total != 0) {
        square.classList.add("checked");
        square.innerHTML = total;
        checkForWin();
        return;
      }
      checkSquare(square, currentId);
      square.classList.add("checked");
      checkForWin();
    }
  }

  // check neighbouring squares once square is clicked
  function checkSquare(square, currentId) {
    const gridDocument = document.querySelector("#mine-sweeper-content")
      .contentDocument;
    const isLeftEdge = currentId % width === 0;
    const isRightEdge = currentId % width === width - 1;
    setTimeout(() => {
      if (currentId > 0 && !isLeftEdge) {
        const newId = squares[parseInt(currentId) - 1].id;
        const newSquare = gridDocument.getElementById(newId);
        click(newSquare);
      }
      if (currentId > 9 && !isRightEdge) {
        const newId = squares[parseInt(currentId) + 1 - width].id;
        const newSquare = gridDocument.getElementById(newId);
        click(newSquare);
      }
      if (currentId > 10) {
        const newId = squares[parseInt(currentId) - width].id;
        const newSquare = gridDocument.getElementById(newId);
        click(newSquare);
      }
      if (currentId > 11 && !isLeftEdge) {
        const newId = squares[parseInt(currentId) - 1 - width].id;
        const newSquare = gridDocument.getElementById(newId);
        click(newSquare);
      }
      if (currentId < 98 && !isRightEdge) {
        const newId = squares[parseInt(currentId) + 1].id;
        const newSquare = gridDocument.getElementById(newId);
        click(newSquare);
      }
      if (currentId < 90 && !isLeftEdge) {
        const newId = squares[parseInt(currentId) - 1 + width].id;
        const newSquare = gridDocument.getElementById(newId);
        click(newSquare);
      }
      if (currentId < 88 && !isRightEdge) {
        const newId = squares[parseInt(currentId) + 1 + width].id;
        const newSquare = gridDocument.getElementById(newId);
        click(newSquare);
      }
      if (currentId < 89) {
        const newId = squares[parseInt(currentId) + width].id;
        const newSquare = gridDocument.getElementById(newId);
        click(newSquare);
      }
    }, 10);
  }

  function addTimer(duration) {
    const gridContentDocument = document.querySelector("#mine-sweeper-content")
      .contentDocument;
    let timer = duration;
    const timerDisplay = gridContentDocument.querySelector(
      ".mine-timer .timer"
    );
    let minutes;
    let seconds;
    if (timerInterval) clearInterval(timerInterval);
    timerInterval = setInterval(() => {
      minutes = parseInt(timer / 60, 10);
      seconds = parseInt(timer % 60, 10);

      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;

      timerDisplay.textContent = minutes + ":" + seconds;
      if (--timer < 0) {
        gameOver();
      }
    }, 1000);
  }

  function gameOver(square) {
    isGameOver = true;
    // resetGame();
    // Show all the bomb location
    squares.forEach((square) => {
      if (square.classList.contains("bomb")) {
        square.innerHTML = "&#128163";
      }
    });
    clearInterval(timerInterval);
  }

  // check for win
  function checkForWin() {
    let matches = 0;
    let checked = 0;
    for (let i = 0; i < squares.length; i++) {
      if (
        squares[i].classList.contains("flag") &&
        squares[i].classList.contains("bomb")
      ) {
        matches++;
      }
      if (squares[i].classList.contains("checked")) {
        checked++;
      }
      if (matches === bombAmount || squares.length - bombAmount === checked) {
        console.log("you won");
        isGameOver = true;
        return;
      }
    }
  }
}

function resetGame() {
  const grid = document
    .querySelector("#mine-sweeper-content")
    .contentDocument.querySelector(".mine-grid");
  grid.innerHTML = "";

  createGame();
}

// Function to toggle the widget visibility
function toggleMineGridVisibility() {
  const formContainer = document.getElementById("mine-widget-form");
  formContainer.classList.toggle("active");
}
