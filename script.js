const calculator ={
    displayValue: "0",
    firstOperand: null,
    waitingForSecondOperand: false,
    operator: null,

};

//calculation 
function operate(action,a,b){
    if(action == "*")
        return a*b;
    else if(action == "/")
        return a/b;
    else if(action == "-")
        return a-b;
    else if(action == "+")
        return parseInt(a)+parseInt(b);
}

//keypad 
window.addEventListener('keydown', function(e){
    const key = document.querySelector(`button[data-key='${e.keyCode}']`);
    if(!key)return;
    key.click();
});

//updateDisplay
function updateDisplay(){
    const display = document.querySelector(".display");
    display.value=calculator.displayValue;    
}

//btn CLEAR
const btnClearAll = document.querySelector(".clearAll");
btnClearAll.addEventListener("click",()=>{
    calculator.displayValue="0";
    calculator.firstOperand= null;
    calculator.waitingForSecondOperand=false;
    calculator.operator= null;
    updateDisplay();
});
//btn C - clear display
const btnClear = document.querySelector(".clear");
btnClear.addEventListener("click",()=> {
    calculator.displayValue="0";
    updateDisplay();
});

//equals

const equals = document.querySelector(".equals");
equals.addEventListener("click",()=>{
    calculator.displayValue=operate(calculator.operator,calculator.firstOperand,calculator.displayValue)
    updateDisplay();
});




//operands
const btnOperands = Array.from(document.querySelectorAll(".operand"));
btnOperands.forEach(button=>button.addEventListener("click",()=>{
    if(calculator.displayValue==0 || calculator.displayValue==calculator.firstOperand)
        calculator.displayValue=button.value;
    else 
        calculator.displayValue+=button.value;
    updateDisplay();
}));

//operators
const btnOperators = Array.from(document.querySelectorAll(".operator"));
btnOperators.forEach(button=>button.addEventListener("click",()=>{
    if(!calculator.waitingForSecondOperand){
       calculator.firstOperand=calculator.displayValue;
       calculator.operator=button.value;
        calculator.displayValue="";
        calculator.waitingForSecondOperand=true;
    }
    else{
        let result = operate(calculator.operator,calculator.firstOperand,calculator.displayValue);
        calculator.firstOperand=result;
        calculator.displayValue=result;
        calculator.operator=button.value;   
            
    }

    updateDisplay();
        

}));

