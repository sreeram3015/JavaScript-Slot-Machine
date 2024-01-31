const prompt = require("prompt-sync")();

const deposit = () => {
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
