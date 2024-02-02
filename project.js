// Importing the prompt-sync library for user input
const prompt = require("prompt-sync")();

// Constants defining the dimensions and characteristics of the slot machine
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

// Function to get the initial deposit amount from the user
const getDeposit = () => {
    while (true) {
        // Prompt the user for input
        const depositAmount = prompt("Enter your deposit amount: ");
        const integerDepositAmount = parseFloat(depositAmount);

        // Validate input
        if (isNaN(integerDepositAmount) || integerDepositAmount <= 0) {
            console.log("Invalid deposit, try again.")
        } else {
            // Return the validated deposit amount
            return integerDepositAmount;
        }
    }
}

// Function to get the number of lines the user wants to bet on
const getNumberOfLines = () => {
    while (true) {
        // Prompt the user for input
        const lines = prompt("Enter the number of lines to bet on (1-3): ");
        const numberOfLines = parseFloat(lines);

        // Validate input
        if (isNaN(numberOfLines) || numberOfLines <= 0 || numberOfLines > 3) {
            console.log("Invalid number of lines, try again.")
        } else {
            // Return the validated number of lines
            return numberOfLines;
        }
    }
}

// Function to get the bet amount per line from the user
const getBet = (balance, lines) => {
    while (true) {
        // Prompt the user for input
        const bet = prompt("Enter the bet amount per line: ");
        const betAmount = parseFloat(bet);

        // Validate input
        if (isNaN(betAmount) || betAmount <= 0 || betAmount > balance / lines) {
            console.log("Invalid amount to bet, try again.")
        } else {
            // Return the validated bet amount
            return betAmount;
        }
    }
}

// Function to transpose the symbols in the slot machine reels
const transpose = (reels) => {
    const rows = [];

    for (let i = 0; i < ROWS; i++) {
        rows.push([]);
        for (let j = 0; j < COLS; j++) {
            // Transpose the symbols
            rows[i].push(reels[j][i]);
        }
    }
    // Return the transposed rows
    return rows;
}

// Function to simulate spinning the slot machine reels
const spin = () => {
    let symbols = [];

    // Generate an array of symbols based on SYMBOLS_COUNT
    for (const [symbol, count] of Object.entries(SYMBOLS_COUNT)) {
        for (let i = 0; i < count; i++) {
            symbols.push(symbol);
        }
    }

    let reels = [];

    // Generate random symbols for each reel
    for (let i = 0; i < COLS; i++) {
        reels.push([]);
        let reelSymbol = [...symbols];
        for (let j = 0; j < ROWS; j++) {
            const randomIndex = Math.floor(Math.random() * reelSymbol.length);
            const selectedSymbol = reelSymbol[randomIndex];
            reels[i].push(selectedSymbol);
            reelSymbol.splice(randomIndex, 1);
        }
    }

    // Transpose the reels for better display
    let transposedReels = transpose(reels);
    // Return the transposed reels
    return transposedReels;
}

// Function to display the current arrangement of symbols in the slot machine
const display = (rows) => {
    for (const row of rows) {
        let rowString = "";
        for (const [i, symbol] of row.entries()) {
            // Build the row string with symbols separated by "|"
            rowString += symbol;
            if (i != rows.length - 1) {
                rowString += " | "
            }
        }
        // Display the row
        console.log(rowString);
    }
}

// Function to calculate winnings based on the current arrangement of symbols
const getWinnings = (rows, bet, lines) => {
    let winnings = 0;

    for (let row = 0; row < lines; row++) {
        const symbols = rows[row];
        let allSame = true;

        // Check if all symbols in the row are the same
        for (const symbol of symbols) {
            if (symbol != symbols[0]) {
                allSame = false;
                break;
            }
        }

        // If all symbols are the same, calculate winnings
        if (allSame) {
            winnings += bet * SYMBOL_VALUES[symbols[0]];
        }
    }
    // Return the total winnings
    return winnings;
}

// Main game function
const game = () => {
    // Get initial deposit amount
    let balance = getDeposit();

    while (true) {
        console.log("You have a balance of INR " + balance);
        // Get user input for the number of lines and bet amount
        const numberOfLines = getNumberOfLines();
        const bet = getBet(balance, numberOfLines);
        // Update balance based on the bet
        balance -= bet * numberOfLines;
        // Spin the reels and display the result
        const reels = spin();
        display(reels);
        // Calculate and display winnings
        const winnings = getWinnings(reels, bet, numberOfLines);
        balance += winnings;
        console.log("You won, INR " + winnings.toString());

        // Check if the player has run out of money
        if (balance <= 0) {
            console.log("You ran out of money!");
            break;
        } else {
            // Ask the player if they want to play again
            const playAgain = prompt("Do you want to play again? (y/n): ");

            // If not, exit the game loop
            if (playAgain != "y" || playAgain != "Y") break;
        }
    }
}

// Start the game
game();
