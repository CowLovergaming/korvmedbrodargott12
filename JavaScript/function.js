//\ _(>_<)_/



//If it is the first time loading the page

window.onload = function () {
    selectDiceForm1.reset();
    if (localStorage.getItem("hasRunCodeBefore") === null) {
        localStorage.setItem("hasRunCodeBefore", true);
    };
    document.getElementById("calculatorTextBar1").value = 0
};

//Clear the first 0 when entering the first number

/*

function clickCalc1() {
    let executed = false;
    let textBar = document.getElementById("calculatorTextBar1");
    return function() {
        if (!executed) {
            executed = true;
            textBar = textBar.substring(1);

        };
    };
};
*/

//The first counter

function plusFunction1() {
    let num1Int = parseInt(document.getElementById("num1").innerHTML);
    num1Int++;
    document.getElementById("num1").innerHTML = num1Int;
};

function minusFunction1() {
    let num1Int = parseInt(document.getElementById("num1").innerHTML);
    num1Int--;
    document.getElementById("num1").innerHTML = num1Int;
};

function saveFunction1() {
    let num1Int = parseInt(document.getElementById("num1").innerHTML);
    localStorage.setItem("storedNum1", num1Int);
    alert("The number has been saved!")
};

function resetFunction1() {
    localStorage.setItem("storedNum1", 0);
    document.getElementById("num1").innerHTML = 0;
    alert("The saved number has beed reset!")
};

//Load number if saved
document.getElementById("num1").innerHTML = localStorage.getItem("storedNum1");

//Dice

//Dice selector
var diceSelectVarD6 = document.getElementById("selectDice1")
var diceSelectVarD4 = document.getElementById("selectDice2")
var diceSelectVarD8 = document.getElementById("selectDice3")
var diceSelectVarD10 = document.getElementById("selectDice4")
var diceSelectVarD12 = document.getElementById("selectDice5")
var diceSelectVarD20 = document.getElementById("selectDice6")
var diceSelectVarD100 = document.getElementById("selectDice7")

var diceSelectNum1 = 0

function chooseDice1() {
    if (diceSelectVarD6.checked) {
        diceSelectNum1 = 6
        document.getElementById("num2").innerHTML = "D6"
    } else if (diceSelectVarD4.checked) {
        diceSelectNum1 = 4
        document.getElementById("num2").innerHTML = "D4"
    } else if (diceSelectVarD8.checked) {
        diceSelectNum1 = 8
        document.getElementById("num2").innerHTML = "D8"
    } else if (diceSelectVarD10.checked) {
        diceSelectNum1 = 10
        document.getElementById("num2").innerHTML = "D10"
    } else if (diceSelectVarD12.checked) {
        diceSelectNum1 = 12
        document.getElementById("num2").innerHTML = "D12"
    } else if (diceSelectVarD20.checked) {
        diceSelectNum1 = 20
        document.getElementById("num2").innerHTML = "D20"
    } else if (diceSelectVarD100.checked) {
        diceSelectNum1 = 100
        document.getElementById("num2").innerHTML = "D100"
    }
};
//The dice
function rollFunction1() {
    let timeout = setTimeout(function timeout() {
    clearInterval(interval)
    }, 777)
    let interval = setInterval(function interval() {
        let num2Int = parseInt(document.getElementById("num2").innerHTML);
        num2Int = Math.ceil(Math.random() * diceSelectNum1);
        document.getElementById("num2").innerHTML = num2Int;
    }, 30);
};

//The calculator

const operatorArray = [
    function(x, y) {return x + y;},
    function(x, y) {return x - y;},
    function(x, y) {return x / y;},
    function(x, y) {return x * y;},
]

const calcObj = {
    firstOperand: null,
    waitingForSecondOperand: false,
    secondOperand: null,
    thirdOperand: null,
    operator: null,
    loop: null,
};

var firstOperand = "";
var secondOperand = "";

const calcOperators = ["+", "-", "/", "*"]

var executed;
function clickCalc1(x) {
    let calcBox = document.getElementById("calculatorTextBar1");
    if (!executed && typeof x == "number") {
        calcBox.value = "";
        executed = true;
    };
    if (typeof x == "number" && !calcObj.waitingForSecondOperand == true && calcObj.loop != true) {
        calcBox.value += x;
        firstOperand += x;
        calcObj.firstOperand = true;
        calcObj.operator = null;
    } else if (calcOperators.includes(x) && calcObj.firstOperand == true) {
        calcBox.value += x;
        calcObj.operator = x;
        calcObj.firstOperand = false;
        calcObj.waitingForSecondOperand = true;
    } else if (typeof x == "number" && !calcObj.firstOperand == true && calcObj.loop != true) {
        calcBox.value += x;
        secondOperand += x;
        calcObj.secondOperand = true;
    } else if (x == "=" && calcObj.secondOperand == true) {
        let calcResult = operatorArray[calcOperators.indexOf(calcObj.operator)](parseFloat(firstOperand), parseFloat(secondOperand));
        firstOperand = calcResult;
        secondOperand = "";
        calcBox.value = calcResult;
        calcObj.waitingForSecondOperand = false;
        calcObj.loop = true;
        calcObj.operator = false;
        calcObj.thirdOperand = false;
    } else if (calcOperators.includes(x) && calcObj.loop == true && calcObj.operator == false) {
        calcBox.value += x;
        calcObj.operator = x;
        calcObj.thirdOperand = true;
    } else if (typeof x == "number" && calcObj.loop == true && calcObj.operator != false && calcObj.thirdOperand == true) {
        calcBox.value += x;
        secondOperand += x;
    }
};