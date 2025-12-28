function add(num1, num2) {
	return num1+num2;
}

function subtract(num1, num2) {
	return num1-num2;
}

function multiply(num1, num2) {
	return num1*num2;
}

function divide(num1, num2) {
	return Math.round(num1/num2);
}

let num1;
let num2 = "";
let op = "";
const PLUS = "+";
const MINUS = "-";
const DIV = "/";
const MUL = "*";

function operate(num1, num2, operator){
	switch (operator) {
		case PLUS:
			return add(num1, num2);
		case MINUS:
			return subtract(num1, num2);
		case DIV:
			return divide(num1, num2);
		case MUL:
			return multiply(num1, num2);
		default:
			console.error("Unknown operator: ", operator);

	}
}


// Execute operation when two operands and one operator
// end of the second operator, when after comes = or +,-,*,/
// only able to press = after two operands and one operator
// pressing clear or pressing digit after pressing equal wipes out state
// state = operand, operator, numStr
// when pressing digits add to numStr

// Use Cases
// 1. Starting State: operand = undefined, operator = "", numStr = ""
// 	- press digit, add to numStr
// 	- press operator, equal, clear does nothing
// 2. State: operand = undefined, operator = "", numStr = "1232..."
// 	- press digit, add to numStr
// 	- press operator, convert numStr to Int, assign to operand, clears numStr, assign operator
// 	- press equal, does nothing
// 	- press clear, clears numStr
// 3. State: operand = 11123..., operator = "+", numStr = ""
// 	- press digit, add to numStr
// 	- press operator, equal, does nothing
// 	- press clear, clears operand, operator, numStr
// 4. State: operand = 111..., operator = "+", numStr = "1231..."
// 	- press digit, add to numStr
// 	- press operator, equal, execute operation by converting numStr to int and pass both operands and the operator to the operate function, assign result to operand, for operator assign to operator, for equal clear operator
//
// How to display the calculation?
// operand + operator + numStr = res
let res = "";
let error = "";
const CLEAR = "clear";
const EQUAL = "=";
const buttons = document.querySelector(".buttons");
buttons.addEventListener("click", (event) => {
	console.log(event.target.textContent);
	const clickedButton = event.target.textContent.trim();
	if (isDigit(clickedButton)) {
		if (res || error) {
			clearDisplay();
		}
		num2 += clickedButton;	
	}
	else if (clickedButton === CLEAR) {
		clearDisplay();
	}
	else if (clickedButton === EQUAL && num1 !== undefined && op && num2) {
		checkError();
		if (!error)
			res = "=" + operate(num1, +num2, op);
	}
	else if (isOp(clickedButton) && num2 && !res) {
		if (num1) {
			checkError();
			if (!error)
				num1 = operate(num1, +num2, op);
		}
		else {
			num1 = +num2;
		}
		num2 = "";
		op = clickedButton;
	}
	const num1Str = num1 !== undefined ? num1 : "";
	refreshDisplay(error ? error : num1Str+op+num2+res);
});

function isDigit(str) {
	return !isNaN(str);
}

function isOp(str) {
	return str === PLUS || str === MINUS || str === MUL || str === DIV;
}

const display = document.querySelector(".display");

function refreshDisplay(content) {
	display.textContent = content;
}

function clearDisplay() {
	num1 = undefined;
	op = "";
	num2 = "";
	res = "";
	error = "";
}

function checkError() {
	if (op === DIV && num2 === "0") {
		clearDisplay();
		error = "Err: Div by 0";
	}
}
