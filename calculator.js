const display=document.querySelector('.display-screen');
const operator=document.querySelectorAll('.right-side');
const number=document.querySelectorAll('.number');
const AC=document.querySelector('#AC');
const DE=document.querySelector('#DE'); 
const equality=document.querySelector('.equality');
const decimal=document.querySelector('#decimal');
const oBracket=document.querySelector('#openning-bracket');
const cBracket=document.querySelector('#closing-bracket');
const percentage=document.querySelector('#percentage');

let array=[];
let bracketBalance = 0;
let i=0;

number.forEach(number => {
    number.addEventListener('click', () => {
        numberDisplay(number.value); // Pass the button's value
    });
});

function numberDisplay(value) {
    array[i]=value;
    i++;
    display.value+=value
    console.log(array)
}
operator.forEach(operator => {
    operator.addEventListener('click', () => {
        operatorDisplay(operator.value); // Pass the button's value
    });
});

function operatorDisplay(value) {
    
    if(array[array.length-1]!=value && !(isNaN(array[array.length-1]))){
    array[i]=value;
    i++;
    display.value+=value;
    }
    console.log(array)
    console.log(display.value)
}
AC.addEventListener('click',function(){
    display.value="";
    array.length=0;
});
DE.addEventListener('click', function() {
  if (array.length === 0) return;
  
  const lastChar = array[array.length - 1];
  
  // Adjust bracket balance when deleting
  if (lastChar === '(') {
      bracketBalance--;
  } else if (lastChar === ')') {
      bracketBalance++;
  }
  
  array.pop();
  i--;
  updateDisplay();
});
function updateDisplay() {
    display.value = array.join("");
  }
  decimal.addEventListener('click', () => decimalAdd(decimal.value));

function decimalAdd(value) {
    const currentValue = display.value;

    // If nothing exists, don't start with a decimal
    if (currentValue === '') return;

    // Get the last segment (number being typed)
    const parts = currentValue.split(/[+\-*/]/); // Adjust if you use × or ÷
    const lastNumber = parts[parts.length - 1];

    // Prevent multiple decimals in one number
    if (lastNumber.includes('.')) return;

    // Prevent decimal after another decimal or operator
    const lastChar = currentValue[currentValue.length - 1];
    if (lastChar === '.' || ['+', '-', '*', '/'].includes(lastChar)) return;

    array[i] = value;
    i++;
    display.value += value;
    
}

  equality.addEventListener('click',calculate);
  
  oBracket.addEventListener('click', () => addBracket('('));
cBracket.addEventListener('click', () => addBracket(')'));

function addBracket(value) {
    // Special handling for closing brackets
    if (value === ')') {
        // Only allow closing bracket if we have open brackets
        if (bracketBalance <= 0) {
            // Option: Show error feedback or simply ignore
            return; // Prevents adding the closing bracket
        }
        bracketBalance--; // Decrease balance for closing bracket
    } else {
        bracketBalance++; // Increase balance for opening bracket
    }
    
    // Add to display and array
    display.value += value;
    array[i] = value;
    i++;
}
function calculate() {
  if (bracketBalance !== 0) {
      display.value = "Unbalanced brackets!";
      return;
  }
  
  const expression = display.value;
  try {
      const result = evaluateMathExpression(expression);
      array = [result.toString()];
      i = 1;
      display.value = result;
  } catch (error) {
      display.value = "Error";
  }
}

  function evaluateMathExpression(expr) {
    // More secure evaluation using Function constructor
    if (!/^[0-9+\-*/.()\s]+$/.test(expr)) {
      throw new Error("Invalid characters");
    }
    return new Function(`return ${expr}`)();
  }