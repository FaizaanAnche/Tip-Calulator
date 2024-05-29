const billAmount = document.getElementById("bill");
const tipPercentages = document.querySelectorAll(".percentage");
const selectedTip = document.getElementsByClassName("active");
const customTip = document.getElementById("custom");
const numberOfPeople = document.getElementById("people");
const tipAmount = document.getElementById("tip");
const totalAmount = document.getElementById("total");
const errorMessage = document.getElementById("error-message");
const resetButton = document.getElementById("reset");
const inputs = document.querySelectorAll('input');

/*------------event listeners--------------*/

tipPercentages.forEach((percentage) => {
    percentage.addEventListener('click' ,caluclateTip);
})

customTip.addEventListener('click',calculateCustomTip);

resetButton.addEventListener('click',ressetAll);

/*------------functions--------------*/

function calculate(){
    let tipPerPerson;
    let totalPerPerson;
    let tipPercent;

    if(customTip.value !== ""){
        tipPercent = customTip.value;
    }
    else{
        if(selectedTip.length == 0){
            tipPercent = 0;
        }
        else{
            tipPercent = selectedTip[0].value;
        }
    }

    tipPerPerson = (billAmount.value * tipPercent * 0.01)/numberOfPeople.value;
    totalPerPerson = (billAmount.value/numberOfPeople.value) + tipPerPerson;
    tipPerPerson = tipPerPerson.toFixed(2);   
    totalPerPerson = totalPerPerson.toFixed(2);

    tipAmount.innerText = tipPerPerson;
    totalAmount.innerText = totalPerPerson;
}

function caluclateTip(){
    
    tipPercentages.forEach((percentage) => {
        percentage.classList.remove("active")
    })
    this.classList.add("active");
    customTip.value="";
    if(billAmount.value !== "" && (numberOfPeople.value !== "" || numberOfPeople.value >0)){
        calculate();
    } 
}

function calculateCustomTip(){
    tipPercentages.forEach((percentage) => {
        percentage.classList.remove("active");
    });

    if(billAmount.value !== "" && (numberOfPeople.value !== "" || numberOfPeople.value >0)){
        calculate();
    } 
}

function activateResetButton(){
    if(numberOfPeople.value !== "" || customTip.value !== "" || billAmount.value !== ""){
        resetButton.disabled = false;
    }
    else{
        resetButton.disabled = true;
    }
}

function ressetAll(){
    tipPercentages.forEach((button) => {
        button.classList.remove('active');
    });

    inputs.forEach((input) => {
        input.value = '';
    });

    tipAmount.innerText = '0.00';
    totalAmount.innerText = '0.00';

    reset.disabled = true;
    errorMessage.innerText = '';
    numberOfPeople.style.borderColor = '';
}

/*------------inputs-------------*/

customTip.oninput = () => {
    activateResetButton();
    if(bill.value !== '' && (numberOfPeople.value !== '' || numberOfPeople.value > 0) ){
        calculate();
    }
}


billAmount.oninput = () => {
    activateResetButton();
    if(customTip.value !== '' && (numberOfPeople.value !== '' || numberOfPeople.value > 0) ){
        calculate();
    }
}
numberOfPeople.oninput = () => {
    
    activateResetButton()
    if(numberOfPeople.value <= 0 || numberOfPeople.value === ''){
        errorMessage.innerText = "Can't be zero";
        numberOfPeople.style.borderColor = 'red';
    }else{
        errorMessage.innerText = "";
        numberOfPeople.style.borderColor = '';
        calculate();
    }   
}



