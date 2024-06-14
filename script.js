// VARIABLES
const userInputButtons = document.querySelectorAll(".math-btn")
const clearAllButton = document.querySelector(".clear-display")
const deleteEntryButton = document.querySelector(".delete")
const evaluateButton = document.querySelector(".evaluate")
const display = document.querySelector("#display")
const expressionOutput = document.querySelector(".expression")

// Flag to check if the last operation was a successful evaluation
let isEvaluationSuccessful = false



// FUNCTIONS
// Collect button values and display them
const handleButtonClick = (e) => {
    const input = e.target.dataset.value
    const isNumber = !isNaN(input) || input === ""    

    if (display.value === "Syntax Error") {
        display.value = ""
    }

    if (isEvaluationSuccessful && isNumber) {
        display.value = input
        isEvaluationSuccessful = false
    } else {
        if (display.value === "" && input === ".") {
            display.value = `0${input}`
        } else if(/[\+\-\*\/]$/.test(display.value) && input === ".") {
            display.value += `0${input}`
            isEvaluationSuccessful = false
        } else {
            if (display.value.length <= 16) {
                display.value += input
                isEvaluationSuccessful = false
            } else {
                display.value = ""
                expressionOutput.textContent = "Input is too long"
                isEvaluationSuccessful = false
            }
        }
        isEvaluationSuccessful = false
    }

    updateButtonStates()    
}


// Clear display
const clearDisplay = () => {
    expressionOutput.textContent = ""
    display.value = ""
    isEvaluationSuccessful = false

    updateButtonStates()
}


// Delete inputs
const deleteLastEntry = () => {
    if (display.value !== "Syntax Error" && !isEvaluationSuccessful) {
        display.value = display.value.toString().slice(0, -1)
    }

    updateButtonStates()
}


// Evaluate math expressions and display results
const evaluateExpression = () => {
    expressionOutput.textContent = display.value
    try {
        const sanitizedInput = display.value.replace(/,/g, '')
        const result = eval(sanitizedInput)
        display.value = result.toLocaleString()
        isEvaluationSuccessful = true
    } catch (error) {
        display.value = "Syntax Error"
        isEvaluationSuccessful = false
    }

    checkAndConvertToExponential()
    updateButtonStates()
}


// Update button states based on display content
const updateButtonStates = () => {
    if (display.value === "") {
        deleteEntryButton.disabled = true
        deleteEntryButton.classList.add("disabled")
    } else if (display.value === "Syntax Error" || isEvaluationSuccessful === true) {
        deleteEntryButton.disabled = true
        deleteEntryButton.classList.add("disabled")
    } else {
        deleteEntryButton.disabled = false
        deleteEntryButton.classList.remove("disabled")
    }
}

const checkAndConvertToExponential = () => {
    if (display.value.replace(/,/g, '').length >= 16) {
        display.value = parseFloat(display.value.replace(/,/g, '')).toExponential()
    }
}



// INIT & EVENT LISTENERS
// Init deleteEntry button states on load
updateButtonStates()

// Event listeners
userInputButtons.forEach(button => button.addEventListener("click", handleButtonClick))
clearAllButton.addEventListener("click", clearDisplay)
deleteEntryButton.addEventListener("click", deleteLastEntry)
evaluateButton.addEventListener("click", evaluateExpression)
