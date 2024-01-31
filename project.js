const prompt = require("prompt-sync")();

const getDeposit = () => {
    while(true){
        const depositAmount = prompt("Enter your deposit amount: ");
        const integerDepositAmount = parseFloat(depositAmount);

        if(isNaN(integerDepositAmount) || integerDepositAmount <= 0){
            console.log("Invalid deposit, try again.")
        }
        else{
            return integerDepositAmount;
        }
    }
}

const getNumberOfLines = () => {
    while(true){
        const lines = prompt("Enter the number of lines to bet on (1-3): ");
        const numberOfLines = parseFloat(lines);

        if(isNaN(numberOfLines) || numberOfLines <= 0 || numberOfLines > 3){
            console.log("Invalid number of lines, try again.")
        }
        else{
            return numberOfLines;
        }
    }
}

const depositAmount = getDeposit();
const numberOfLines = getNumberOfLines();