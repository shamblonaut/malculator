const display = document.querySelector('.display');
let displayValue = '';

let alphaOperand = 0;
let betaOperand = 0;
let operator = '';

let operated = false;

const digits = document.querySelectorAll('.digit');
const operators = document.querySelectorAll('.operator');
const equals = document.querySelector('.equals');
const clear = document.querySelector('.clear');
const backspace = document.querySelector('.backspace');
const point = document.querySelector('.point');

decimalPlaces = 10;


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
    if(b === 0) {
        console.error('Error: Division by zero!\n\nDo you really want to destroy the world?');
        return 0;
    }
    return a / b;
}

function operate(a, b, operator) {
    let result;
    switch(operator) {
        case '+':
            result = add(a, b);
            break;
        case '-':
            result = subtract(a, b);
            break;
        case '*':
            result = multiply(a, b);
            break;
        case '/':
            result = divide(a, b);
            break;
        default:
            console.error('No such operator: ' + operator);
    }

    result = Math.round(result * Math.pow(10, decimalPlaces)) / Math.pow(10, decimalPlaces);
    return result;
}



function updateDisplay(text) {
    displayValue += text;
    display.textContent += text;
}

function calculate() {
    betaOperand = Number(displayValue);
    display.textContent = operate(alphaOperand, betaOperand, operator);
    displayValue = display.textContent;
    alphaOperand = Number(displayValue);
}

digits.forEach(button => {
    button.addEventListener('click', () => updateDisplay(button.textContent));
});

point.addEventListener('click', () => {
    point.disabled = true;
});

operators.forEach(button => {
    button.addEventListener('click', () => {
        if(operated) {
            calculate();
        } else {
            operated = true;
        }

        point.disabled = false;

        if(display.textContent) {
            alphaOperand = Number(displayValue);
            operator = button.textContent;
            updateDisplay(button.textContent);
            displayValue = '';
        }
    });
})

equals.addEventListener('click', () => {
    if(operated) {
        calculate();
    }
    operated = false;
    point.disabled = false;
});

clear.addEventListener('click', () => {
    displayValue = '';
    display.textContent = '';
    operated = false;
    point.disabled = false;
});

backspace.addEventListener('click', () => {
    display.textContent = display.textContent.slice(0, -1);
    displayValue = displayValue.slice(0, -1);
})

window.addEventListener('keydown', event => {
    if(event.key.match(/[0-9.]/)) {
        if(Number(event.key) > 0 && Number(event.key) <= 9) {
            digits[Number(event.key) - 1].dispatchEvent(new Event('click'));
        } else if(Number(event.key) === 0) {
            digits[9].dispatchEvent(new Event('click'));
        } else if(event.key === '.') {
            digits[10].dispatchEvent(new Event('click'));
        }
    } else if(event.key.match(/[+-/\*]/)) {
        switch(event.key) {
            case '+':
                operators[0].dispatchEvent(new Event('click'));
                break;
            case '-':
                operators[1].dispatchEvent(new Event('click'));
                break;
            case '*':
                operators[2].dispatchEvent(new Event('click'));
                break;
            case '/':
                operators[3].dispatchEvent(new Event('click'));
                break;
        }
    } else if(event.key === 'Enter') {
        equals.dispatchEvent(new Event('click'));
    } else if(event.key === 'c') {
        clear.dispatchEvent(new Event('click'));
    } else if(event.key === 'Backspace') {
        backspace.dispatchEvent(new Event('click'));
    }
});