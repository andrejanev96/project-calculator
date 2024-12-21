function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b === 0) {
    return "Error: Can't divide by 0";
  }
  return a / b;
}

function operate(operator, num1, num2) {
  switch (operator) {
    case "+":
      return add(num1, num2);
    case "-":
      return subtract(num1, num2);
    case "*":
      return multiply(num1, num2);
    case "/":
      return divide(num1, num2);
    default:
      return null;
  }
}

let firstNumber = "";
let secondNumber = "";
let operator = "";
let displayValue = "0";
let shouldResetDisplay = false;

const display = document.getElementById("display");

// Update display
function updateDisplay(value) {
  display.textContent = value;
}

// Handle digit button clicks
function handleDigit(digit) {
  if (shouldResetDisplay) {
    displayValue = digit;
    shouldResetDisplay = false;
  } else {
    displayValue = displayValue === "0" ? digit : displayValue + digit;
  }
  updateDisplay(displayValue);
}

// Handle operator button clicks
function handleOperator(op) {
  if (operator && !shouldResetDisplay) {
    secondNumber = displayValue;
    displayValue = operate(operator, +firstNumber, +secondNumber);
    updateDisplay(displayValue);
  }
  operator = op;
  firstNumber = displayValue;
  shouldResetDisplay = true;
}

// Handle equals button
function handleEquals() {
  if (!operator || shouldResetDisplay) return;
  secondNumber = displayValue;
  displayValue = operate(operator, +firstNumber, +secondNumber);
  updateDisplay(displayValue);
  firstNumber = displayValue;
  operator = "";
  shouldResetDisplay = true;
}

// Handle clear button
function clearCalculator() {
  firstNumber = "";
  secondNumber = "";
  operator = "";
  displayValue = "0";
  updateDisplay(displayValue);
}

// Event listeners
document.querySelectorAll(".digit").forEach((button) => {
  button.addEventListener("click", () => handleDigit(button.textContent));
});

document.querySelectorAll(".operator").forEach((button) => {
  button.addEventListener("click", () => {
    // Call the operator handler
    handleOperator(button.textContent);

    // Add the 'pressed' class
    button.classList.add("pressed");

    // Remove the 'pressed' class after 150ms
    setTimeout(() => {
      button.classList.remove("pressed");
    }, 150);
  });
});

document.getElementById("equals").addEventListener("click", handleEquals);
document.getElementById("clear").addEventListener("click", clearCalculator);
