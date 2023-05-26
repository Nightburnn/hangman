// Get HTML IDs (initialize references)
const letterContainer = document.getElementById("letter-container");
const optionsContainer = document.getElementById("options-container");
const userInputSection = document.getElementById("user-input-section");
const newGameContainer = document.getElementById("new-game-container");
const newGameButton = document.getElementById("new-game-button");
const canvas = document.getElementById("canvas");
const resultText = document.getElementById("result-text");

// Options values for buttons
let options = {
  fruits: [
    "Apple", "Avocado",
    "Banana", "Blueberries",
    "Cherries", "Cucumbers",
    "Dates",
    "Eggplant",
    "Figs",
    "Grapes", "Guava",
    "Kiwis",
    "Lemon", "Lime",
    "Mangoes",
    "Nectarines",
    "Olives", "Oranges",
    "Pears", "Peppers", "Pineapples", "Pumpkins",
    "Quince",
    "Raisins",
    "Satsumas", "Strawberries",
    "Tomatoes",
    "Ugli",
    "Victoria plums",
    "Watermelons",
    "Zucchini"
  ],
  animals: [
    "Ant",
    "Bear",
    "Carp", "Cat",
    "Deer", "Eagle", "Fish", "Goldfish", "Hamster", "Jaguar", "Ladybug", "Moth",
    "Hedgehog", "Rhinoceros", "Panther"
  ],
  countries: [
    "Oman", "Nigeria", "Norway", "Pakistan", "Poland", "Peru", "America",
    "Zimbabwe", "Dominica", "Switzerland"
  ]
};

// Count
let winCount = 0;
let count = 0;
let chosenWord = "";
let optionValue = "";

// Function to display options as buttons
const displayOptions = () => {
  optionsContainer.innerHTML = '<h3>Please Select an Option</h3>';
  let buttonCon = document.createElement("div");

  for (let value in options) {
    buttonCon.innerHTML += `<button class="options" onclick="generateWord('${value}')">${value}</button>`;
  }

  optionsContainer.appendChild(buttonCon);
};

// Function to block all the buttons
const blocker = () => {
  let optionsButtons = document.querySelectorAll(".options");
  let letterButtons = document.querySelectorAll(".letters");

  // Disable all options
  optionsButtons.forEach((button) => {
    button.disabled = true;
  });

  // Disable all letter buttons
  letterButtons.forEach((button) => {
    button.disabled = true;
  });

  // Show new game button
  newGameContainer.classList.remove("hide");
};

// Function to generate a new word
const generateWord = (option) => {
  optionValue = option;

  // Disable all options
  let optionsButtons = document.querySelectorAll(".options");
  optionsButtons.forEach((button) => {
    button.disabled = true;
  });

  // Initially hide letters and clear previous words
  letterContainer.classList.remove("hide");
  userInputSection.innerText = "";

  let optionArray = options[optionValue];
  // Choose random word
  chosenWord = optionArray[Math.floor(Math.random() * optionArray.length)];
  chosenWord = chosenWord.toUpperCase();

  // Replace every letter with the containing blank
  let displayItem = chosenWord.replace(/./g, '<span class="dashes">_</span>');

  // Display each element as a span
  userInputSection.innerHTML = displayItem;

  // Enable letter buttons
  let letterButtons = document.querySelectorAll(".letters");
  letterButtons.forEach((button) => {
    button.disabled = false;
  });
};

// Initial function called when the page loads
const initializer = () => {
  winCount = 0;
  count = 0;

  // Initially erase all content and hide letters and new game button
  userInputSection.innerHTML = "";
  optionsContainer.innerHTML = "";
  letterContainer.classList.add("hide");
  newGameContainer.classList.add("hide");
  letterContainer.innerHTML = "";

  // For inserting letter buttons
  for (let i = 65; i < 91; i++) {
    let button = document.createElement("button");
    button.classList.add("letters");
    // Converting numbers to letters using ASCII table (A-Z)
    button.innerText = String.fromCharCode(i);

    // Character button click event
    button.addEventListener("click", () => {
      let charArray = chosenWord.split("");
      let dashes = document.getElementsByClassName("dashes");

      // If array contains clicked word, replace the match with the letter
      if (charArray.includes(button.innerText)) {
        charArray.forEach((char, index) => {
          if (char === button.innerText) {
            // Replace the matched letter in the display
            dashes[index].innerText = char;

            // Increment counter
            winCount += 1;

            // Check if winCount equals word length
            if (winCount === charArray.length) {
              resultText.innerHTML = `<h2 class="win-msg">You Win!!</h2><p>The word was <span>${chosenWord}</span></p>`;

              // Block all buttons
              blocker();
            }
          }
        });
      } else {
        // Increment count for failed attempts
        count += 1;

        // Draw the man
        drawMan(count);

        // Check if count reaches the maximum failed attempts
        if (count === 6) {
          resultText.innerHTML = `<h2 class="lose-msg">You Lose!!</h2><p>The word was <span>${chosenWord}</span></p>`;

          // Block all buttons
          blocker();
        }
      }

      // Disable clicked button
      button.disabled = true;
    });

    letterContainer.append(button);
  }

  // Display options
  displayOptions();

  // Call canvasCreator function to clear previous canvas and create initial canvas
  let { initialDrawing } = canvasCreator();

  // Draw the frame
  initialDrawing();
};

const canvasCreator = () => {
    let context = canvas.getContext("2d");
    context.beginPath();
    context.strokeStyle = "#000";
    context.lineWidth = 2;
  
    // For drawing lines
    const drawLine = (fromX, fromY, toX, toY) => {
      context.moveTo(fromX, fromY);
      context.lineTo(toX, toY);
      context.stroke();
    };
  
    const head = () => {
      context.beginPath();
      context.arc(70, 40, 10, 0, Math.PI * 2, true);
      context.stroke();
    };
  
    const body = () => {
      drawLine(70, 50, 70, 90);
    };
  
    const leftArm = () => {
      drawLine(70, 60, 50, 80);
    };
  
    const rightArm = () => {
      drawLine(70, 60, 90, 80);
    };
  
    const leftLeg = () => {
      drawLine(70, 90, 50, 120);
    };
  
    const rightLeg = () => {
      drawLine(70, 90, 90, 120);
    };
  
    // Initial frame
    const initialDrawing = () => {
      // Clear canvas
      context.clearRect(0, 0, context.canvas.width, context.canvas.height);
  
      // Bottom line
      drawLine(10, 130, 130, 130);
  
      // Left line
      drawLine(10, 10, 10, 131);
  
      // Top line
      drawLine(10, 10, 70, 10);
  
      // Small top line
      drawLine(70, 10, 70, 20);
    };
  
    return {
      initialDrawing,
      head,
      body,
      leftArm,
      rightArm,
      leftLeg,
      rightLeg
    };
  };
  
// Draw the man
const drawMan = (count) => {
  let {
    head,
    body,
    leftArm,
    rightArm,
    leftLeg,
    rightLeg
  } = canvasCreator();

  switch (count) {
    case 1:
      head();
      break;
    case 2:
      body();
      break;
    case 3:
      leftArm();
      break;
    case 4:
      rightArm();
      break;
    case 5:
      leftLeg();
      break;
    case 6:
      rightLeg();
      break;
    default:
      break;
  }
};

newGameButton.addEventListener("click", initializer);
window.onload = initializer;
