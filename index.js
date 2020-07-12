let runningTotal = 0;
let buffer = "0"; //waiting for user input
let previousOperator; //keep track of what was previously pressed
const screen = document.querySelector(".screen");

document
    .querySelector(".calc-buttons")
    .addEventListener("click", function(event) {
    buttonClick(event.target.innerText);
});

//if NaN, will parse symbol into a math value, handling equation, otherwise will handle number value
function buttonClick(value) {
    if (isNaN(parseInt(value))) {
        handleSymbol(value);
    } else {
        handleNumber(value);
    }
    rerender();
};

function handleNumber(value) {
    if (buffer === "0") {
        buffer = value;
    } else {
        buffer += value;
    }
};

//null is the absence of anything, nothing has been previously assigned, a black hole//
function handleSymbol(value) {
    switch(value) {
        case 'C':
            buffer = "0";
            runningTotal = 0;
            previousOperator = null;
            break;
        case "=":
            if(previousOperator === null) {
             return;
            }
            flushOperation(parseInt(buffer));
            previousOperator = null;
            buffer = "" + runningTotal;
            runningTotal = 0;
            break; 
        case "←":
            if (buffer.length === 1) {
                buffer = "0";
            } else {
                buffer = buffer.substring(0, buffer.length - 1)
            }
            break;
        default:
            handleMath(value);
            break;
    }
}

function handleMath(value) {
    //representation of what's on screen//
    const intBuffer = parseInt(buffer);
    //holds onto number that was pressed before operator, keeps track of value as runningTotal//
    if(runningTotal === 0) {
        runningTotal = intBuffer;
    } else {
        //if no need to hold onto previous numbers, flushes the operation to start fresh//
        flushOperation(intBuffer);
    }
    previousOperator = value;
    buffer = "0";
};

function flushOperation (intBuffer) {
    if (previousOperator === "+") {
        runningTotal += intBuffer;
    } else if (previousOperator === "-") {
        runningTotal -= intBuffer;
    } else if (previousOperator === "×") {
        runningTotal *= intBuffer;
    } else {
        runningTotal /= intBuffer;
    }
};

function rerender() {
    screen.innerText = buffer;
}