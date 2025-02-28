// Get reference to the display and buttons
const screen = document.getElementById("screen");
const buttons = document.querySelectorAll(".btn");

// Variable to hold the current input and result
let currentInput = "";
let operator = "";
let firstValue = null;

// Event listener for each button
buttons.forEach(button => {
    button.addEventListener("click", function() {
        const value = button.getAttribute("data-value");

        if (value === "C") {
            // Clear the screen
            currentInput = "";
            firstValue = null;
            operator = "";
            screen.value = "";
        } else if (value === "=") {
            // Calculate the result when "=" is clicked
            if (firstValue !== null && operator) {
                const secondValue = parseFloat(currentInput);
                switch (operator) {
                    case "+":
                        currentInput = (firstValue + secondValue).toString();
                        break;
                    case "-":
                        currentInput = (firstValue - secondValue).toString();
                        break;
                    case "*":
                        currentInput = (firstValue * secondValue).toString();
                        break;
                    case "/":
                        if (secondValue === 0) {
                            currentInput = "Error";
                        } else {
                            currentInput = (firstValue / secondValue).toString();
                        }
                        break;
                    default:
                        break;
                }
                operator = "";
                firstValue = null;
            }
            screen.value = currentInput;
        } else if (["+", "-", "*", "/"].includes(value)) {
            // Handle operator
            if (firstValue === null) {
                firstValue = parseFloat(currentInput);
            } else if (operator) {
                // If an operator was already selected, calculate before setting a new one
                const secondValue = parseFloat(currentInput);
                switch (operator) {
                    case "+":
                        firstValue += secondValue;
                        break;
                    case "-":
                        firstValue -= secondValue;
                        break;
                    case "*":
                        firstValue *= secondValue;
                        break;
                    case "/":
                        if (secondValue !== 0) {
                            firstValue /= secondValue;
                        } else {
                            currentInput = "Error";
                            firstValue = null;
                        }
                        break;
                }
            }
            operator = value;
            currentInput = "";
            screen.value = firstValue;
        } else {
            // Append the clicked value to current input
            currentInput += value;
            screen.value = currentInput;
        }
    });
});
