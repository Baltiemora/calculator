// In the fututre, I need to add an Operator Sign on the left side and change / * operator signs to math style symbols, finally increase calculator suze in general.

let firstN;
let operatorN = '';
let secondN;
let lastResult;

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
    return a / b;
}

function operate(a, b, operator) {
    let result;

    if (operator === '+') {
        result = add(a, b);
    } else if (operator === '-') {
        result = subtract(a, b);
    } else if (operator === '*') {
        result = multiply(a, b);
    } else if (operator === '/') {
        result = divide(a, b);
    }

    lastResult = String(result);
    
    if (String(result).includes('.') && String(result).length > 6) {
        return result.toFixed(4);
    } else {
        return result
    }
    
}

// Number Buttons
let numbers = document.querySelectorAll('.number');
let calcDisplay = document.querySelector('.calcDisplay');

numbers.forEach((number) => number.addEventListener('click', () => {

    if (operatorN != '') {
        if (secondN === undefined) {
            secondN = number.textContent;
        } else {
            secondN += number.textContent;
        }

        calcDisplay.textContent = secondN;
    } else {
        if (firstN === undefined || calcDisplay.textContent === lastResult) {
            firstN = number.textContent;
        } else {
            firstN += number.textContent;
        }

        calcDisplay.textContent = firstN;
    }
}));

// Operator Buttons
let operators = document.querySelectorAll('.operator');
operators.forEach((operator) => operator.addEventListener('click', () => {

    if (firstN === undefined) {
        
    } else {
        if (operatorN === '') {
            operatorN = operator.textContent;
        } else {
            if (operatorN != '' && secondN === undefined) {
                operatorN = operator.textContent;
            } else {
                if (secondN === '0' && operatorN === '/' || secondN === '0.' && operatorN === '/') {
                    firstN = undefined;
                    secondN = undefined;
                    operatorN = '';
                    calcDisplay.textContent = `Can't divide`;
                } else {
                    firstN = Number(firstN);
                    secondN = Number(secondN);
                    firstN = operate(firstN, secondN, operatorN);
                    calcDisplay.textContent = firstN;
                    secondN = undefined;
                    operatorN = operator.textContent;
                }
            }
        }
}
}))


// Equal Button
let equal = document.querySelector('.equal');
equal.addEventListener('click', () => {

    if (firstN === undefined || secondN === undefined) {

    } else {
        if (secondN === '0' && operatorN === '/' || secondN === '0.' && operatorN === '/') {
            firstN = undefined;
            secondN = undefined;
            operatorN = '';
            calcDisplay.textContent = `Can't divide`;
        } else {
            firstN = Number(firstN);
            secondN = Number(secondN);
            firstN = operate(firstN, secondN, operatorN);
            calcDisplay.textContent = firstN;
            secondN = undefined;
            operatorN = '';
        }
    }
})



// Clear-all Button
let clearAll = document.querySelector('.clear-all');
clearAll.addEventListener('click', () => {
    firstN = undefined;
    secondN = undefined;
    operatorN = '';
    calcDisplay.textContent = '0';
})

// Decimal Button
let decimal = document.querySelector('.decimal');
decimal.addEventListener('click', () => {
    if (calcDisplay.textContent.includes('.')) {

    } else {
        if (firstN === undefined) {

        } else if (firstN != undefined && operatorN === '') {
            firstN += decimal.textContent;
            calcDisplay.textContent = firstN;
        } else if (operatorN != '' && secondN === undefined) {

        } else {
            secondN += decimal.textContent;
            calcDisplay.textContent = secondN;
        }
    }
})

// Clear-last Button
let clearLast = document.querySelector('.clear-last');
clearLast.addEventListener('click', () => {
    if (firstN != undefined && operatorN === '') {
        firstN = firstN.slice(0, -1);
        calcDisplay.textContent = firstN;
        if (firstN.length === 0) {
            firstN = undefined;
        }
    } else if (secondN != undefined) {
        secondN = secondN.slice(0, -1);
        calcDisplay.textContent = secondN;
        if (secondN.length === 0) {
            secondN = undefined;
        }
    }
})

// Clear-entry button
let clearEntry = document.querySelector('.clear-entry');
clearEntry.addEventListener('click', () => {
    if (firstN != undefined && operatorN === '') {
        firstN = undefined;
        calcDisplay.textContent = '';
    } else if (operatorN != '' && secondN != undefined) {
        secondN = undefined;
        calcDisplay.textContent = '';
    }
})

//Plus-minus button
let plusMinus = document.querySelector('.plus-minus');
plusMinus.addEventListener('click', () => {
    if (firstN != undefined && operatorN === '') {
        if (calcDisplay.textContent.includes('-') === false) {
            firstN = '-' + firstN;
            calcDisplay.textContent = firstN;
        } else {
            firstN = firstN.slice(1);
            calcDisplay.textContent = firstN;
        }
        
    } else if (operatorN != '' && secondN != undefined) {
        if (calcDisplay.textContent.includes('-') === false) {
            secondN = '-' + secondN;
            calcDisplay.textContent = secondN;
        } else {
            secondN = secondN.slice(1);
            calcDisplay.textContent = secondN;
        }
    }
})
