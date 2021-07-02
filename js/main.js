let lastClickedItem;
const maxResultFieldLength = 9;

document.querySelector('.calculator').addEventListener("click", event => {
	showChanges( event.target );
	lastClickedItem = event.target;
});

function calc ( operator, firstOperand, secondOperand ) {
	const _firstOperand = parseFloat(firstOperand);
	const _secondOperand = parseFloat(secondOperand);
	let result = 0;
	switch(operator){
		case "+":{
			result = _firstOperand + _secondOperand ;
			break;
		} 
		case "-": {
			result = _firstOperand - _secondOperand;
			break;
		}
		case "/": {
			result = _firstOperand / _secondOperand;
			break;
		}
		case "*": {
			result = _firstOperand * _secondOperand;
			break;
		}
	}
	if(result <= Math.pow(10, (-maxResultFieldLength)) && result > 0){
		return result.toExponential(4);
	} else if (result >= Math.pow(10, maxResultFieldLength) || result <= -Math.pow(10, maxResultFieldLength - 1)) {
		return result.toExponential(4);
	} else if (result.toString().length > maxResultFieldLength){
		return result.toFixed(maxResultFieldLength);
	} else {
		return result;
	}
}


function showChanges( target ){
	const $resultField = document.querySelector('.result');
	const result = $resultField.innerText;
	const $expressionField = document.querySelector('.expression');
	const expression = $expressionField.innerText;
	const firstOperand = expression.split(" ")[0];
	const operator = expression.split(" ")[1];
	const mathOperator = getMathOperator(operator);


	if (target.classList.contains('numeral')){
		if (target.innerText === "." && result.indexOf(".") !== -1){ 
			return;
		}
		if (lastClickedItem && lastClickedItem.classList.contains('operator')){
			$resultField.innerText = target.innerText;
		}
		if ($resultField.innerText.length <= maxResultFieldLength){
			if ($resultField.innerText === "0" && target.innerText !== "."){
				$resultField.innerText = target.innerText;
			} else {
				$resultField.innerText += target.innerText;
			}
		}
		if (operator && result === firstOperand && lastClickedItem.classList.contains('operator')){
			$resultField.innerText = target.innerText;
		}
		if (expression.indexOf("=") !== -1){
			$expressionField.innerText = "";
			$resultField.innerText = target.innerText;
		}
	}


	if (target.classList.contains("operator")){
		if ( !operator || operator !== target.innerText){
			$expressionField.innerText = `${result} ${target.innerText} `;
		}
		if (expression.indexOf("=") !== -1 ) {
			$expressionField.innerText = `${result} ${target.innerText}`;
		} else if ( operator && lastClickedItem.classList.contains('numeral') ){
			$resultField.innerText = calc( mathOperator, firstOperand, result );
			$expressionField.innerText = `${calc( mathOperator, firstOperand, result )} ${target.innerText} `;
		}
	}


	if (target.classList.contains("calculator__clear")){
		$expressionField.innerText = "";
		$resultField.innerText = "0";
	}


	if (target.classList.contains("equals")){
		if (!expression || operator === "="){
			$expressionField.innerText = `${result} = `;
		} else {
			$resultField.innerText = calc( mathOperator, firstOperand, result);
			$expressionField.innerText = `${firstOperand} ${operator} ${result} = `;
		}
	}
}

function getMathOperator ( operator ) {
	if(operator === document.querySelector('.plus').innerText){
		return "+";
	} else if(operator === document.querySelector('.minus').innerText){
		return "-";
	} else if(operator === document.querySelector('.multiply').innerText){
		return "*";
	} else if(operator === document.querySelector('.division').innerText){
		return "/";
	}
}