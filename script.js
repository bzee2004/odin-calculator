
let displayResult = 0, result = 0;
let first = '', operatorSelected = '', last = '';
const resultElem = document.createElement('p');
resultElem.style = 
`
font-size: 30px;
margin-right: 30px;
margin-bottom: 15px;
`
resultElem.textContent = displayResult;

const display = document.querySelector('.display');
display.appendChild(resultElem);

const buttons = document.querySelector('.buttons');
buttons.addEventListener('click', (e) => {

    resultElem.textContent == '0' ? resultElem.innerHTML = '' : null;
    
    const className = e.target.classList[0];

    if (className == 'number' || className == 'decimal' && !resultElem.textContent.includes('.')) {
        if (operatorSelected == '') {
            first += e.target.textContent;
            resultElem.textContent = first;
        }
        else {
            last += e.target.textContent;
            resultElem.textContent = last;
        }
    }
    else if (className == 'operation') {

        const operation = (e.target.getAttribute('id')).split(' ')[1];
        let mathOperator;
        operatorSelected != '' ? mathOperator = operatorSelected.getAttribute('id').split(' ')[1] : null;

        if (operation == 'clear') { 
            resultElem.textContent = 0;
            operatorSelected != '' ? operatorSelected.style = 'background: white' : null;
            first = '', operatorSelected = '', last = '';
            result = 0;
        }
        else if (operation == 'backspace') {
            if (first != '' && last == '') {
                first = Number(first.toString().slice(0, -1));
                resultElem.textContent = first;
            }
            else {
                last = Number(last.toString().slice(0, -1));
                resultElem.textContent = last;
            }
        }
        else if (operation == 'change-signs') {
            result = (-Number(result)).toString();
            resultElem.textContent = result;
        }
        else if (operation == '=') {
            result > 0 ? result = operate(Number(result), Number(last), mathOperator) : result += operate(Number(first), Number(last), mathOperator)
            first = '', operatorSeslected = '', last = '';
            operatorSelected != '' ? operatorSelected.style = 'background: white' : null;
            operatorSelected = '';

            if (isNaN(result)) {
                resultElem.textContent = 'ERR';
                result = 0;
            }
            else { resultElem.textContent = result }
        }
        else {
            if (operatorSelected != '') {
                operatorSelected.style = 'background: white';
                result > 0 ? result = operate(Number(result), Number(last), mathOperator) : result += operate(Number(first), Number(last), mathOperator);
                first = '', operatorSeslected = '', last = '';
                
                resultElem.textContent = result;
            }
            operatorSelected = e.target;
            operatorSelected.style = 'background: gray';
        }
    }
})


const keyPressed = document.querySelector('body');
keyPressed.addEventListener('keydown', ({key}) => {
    if (key >= 0 && key < 10 && key != ' ') {

    }
})



function operate(num1, num2, op) {
    console.table([num1, num2, op]);

    if (op == '+') {
        return num1 + num2;
    }
    else if (op == '-') {
        return num1 - num2;
    }
    else if (op == '*') {
        return num1 * num2;
    }
    else if (op == '/' && num2 > 0) {
        return num1/num2;
    }
    else if (op == '%' && num2 > 0) {
        return num1 % num2;
    }
    else {
        return undefined;
    }
}