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
	return num1/num2;
}

let num1 = 0;
let num2 = 0;
let op = "";
const PLUS = "+";
const MINUS = "-";
const DIV = "/";
const MUL = "*";

function operate(num1, num2, operator){
	switch (operator) {
		case PLUS:
			return num1+num2;
		case MINUS:
			return num1-num2;
		case DIV:
			return num1/num2;
		case MUL:
			return num1*num2;
		default:
			console.error("Unknown operator: ", operator);

	}
}


