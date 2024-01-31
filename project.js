const prompt = require("prompt-sync")();

const ROWS = 3;
const COLS = 3;

const SYMBOLS_COUNT = {
    "A": 2,
    "B": 4,
    "C": 6,
    "D": 8
}

const SYMBOL_VALUES = {
    "A": 5,
    "B": 4,
    "C": 3,
    "D": 2
}


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

const getBet = (balance, lines) => {
    while(true){
        const bet = prompt("Enter the bet amount per line: ");
        const betAmount = parseFloat(bet);

        if(isNaN(betAmount) || betAmount <= 0 || betAmount > balance/lines){
            console.log("Invalid amount to bet, try again.")
        }
        else{
            return betAmount;
        }
    }
} 

const transpose = (reels) => {
    const rows = [];

    for(let i=0; i<ROWS; i++){
        rows.push([]);
        for(let j=0; j<COLS; j++){
            rows[i].push(reels[j][i]);
        }
    }
    return rows;
}

const spin = () => {
    let symbols = [];

    for(const [symbol, count] of Object.entries(SYMBOLS_COUNT)){
        for(let i=0; i<count; i++){
            symbols.push(symbol);
        }
    }

    let reels = [];

    for(let i=0; i<COLS; i++){
        reels.push([]);
        let reelSymbol = [...symbols];
        for(let j=0; j<ROWS; j++){
            const randomIndex = Math.floor(Math.random() * reelSymbol.length);
            const selectedSymbol = reelSymbol[randomIndex];
            reels[i].push(selectedSymbol);
            reelSymbol.splice(randomIndex, 1);
        }
    }

    let transposedReels = transpose(reels);
    return transposedReels;
}

const display = (rows) => {
    for(const row of rows){
        let rowString = "";
        for(const [i, symbol] of row.entries()){
            rowString += symbol;
            if(i != rows.length-1){
                rowString += " | "
            }
        }
    console.log(rowString);
    }
}

let balance = getDeposit();
const numberOfLines = getNumberOfLines();
const bet = getBet(balance, numberOfLines);
const reels = spin();
display(reels);