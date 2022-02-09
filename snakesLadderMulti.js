let diceRoll,
    playerScore,
    isPlayer1active,
    snakes,
    snakesDown,
    snakeBite,
    ladders,
    laddersUp,
    ladderClimb, // xxxxx
    crucial,
    index,
    remainder;

playerScore = [0, 0];
isPlayer1active = true;
snakes = [13, 22, 34, 41, 48];
snakesDown = [4, 15, 20, 30, 9];
ladders = [36, 24, 16, 7];
laddersUp = [42, 31, 46, 11];
index = 0;

const rollDice = (i) => {
    // Rolling the dice
    diceRoll = Math.trunc(Math.random() * 6 + 1);
    snakeBite = false;
    console.log(`------------------------------`);
    console.log(`Player ${i + 1} is rolling`);
    console.log(`It was a ${diceRoll}`);

    // Checking whether it's a new game or not
    if (playerScore[i] === 0) {
        // Checking if we git a six to start the game
        if (diceRoll !== 6) {
            //checked
            console.log(
                `Oops ${diceRoll} - You need to roll a 6 to start this game!`
            );
            console.log(
                `Player 1 - ${playerScore[0]} | Player 2 - ${playerScore[1]}`
            );
            isPlayer1active = !isPlayer1active;
        } else {
            //checked
            // Update player score
            scoreNormal(i);
            isPlayer1active = isPlayer1active;
        }
    } else {
        //checked
        if (playerScore[i] >= 44 && playerScore[i] < 50) {
            // Checking threshold diceRolls at the end to avoid overtaking top-limit
            remainder = 50 - playerScore[i];
            if (diceRoll > remainder) {
                console.log(
                    `${playerScore}: Limit exeeded over 50, try a number lower than ${
                        remainder + 1
                    }`
                );
                console.log(
                    `Player 1 - ${playerScore[0]} | Player 2 - ${playerScore[1]}`
                );
                isDiceNumberSix(i);
            } else {
                //checked
                scoreNormal(i);
                if (playerScore[i] === 50) {
                    // Display player wins!!
                    playerScore = [0, 0];
                    console.log(`Congratulations!! Player ${i + 1} has won <3`);
                    alert("Start a new game!");
                    isPlayer1active = true;
                } else {
                    if (snakes.includes(playerScore[i])) {
                        // Checking for snake-bites
                        snakeBite = true;
                        isPlayer1active = !isPlayer1active;
                        scoreLevelUpdate(snakes, snakesDown);
                    } else {
                        isPlayer1active = !isPlayer1active;
                    }
                }
            }
        } else {
            //checked
            scoreNormal(i);
            if (snakes.includes(playerScore[i])) {
                // Checking for snake-bites
                snakeBite = true;
                isPlayer1active = !isPlayer1active;
                scoreLevelUpdate(i, snakes, snakesDown);
            } else if (ladders.includes(playerScore[i])) {
                // Cheking for ladder climbs
                isPlayer1active = isPlayer1active;
                scoreLevelUpdate(i, ladders, laddersUp);
            } else {
                isDiceNumberSix(i);
                return;
            }
        }
    }
};

const diceParameter = () => {
    //checked
    isPlayer1active ? rollDice(0) : rollDice(1);
};

document.getElementById("btn").addEventListener("click", diceParameter); //checked

const isDiceNumberSix = (i) => {
    if (diceRoll === 6) {
        isPlayer1active = isPlayer1active;
        console.log(`Play again Player ${i + 1}`);
    } else {
        isPlayer1active = !isPlayer1active;
    }
};

const scoreNormal = (i) => {
    //checked
    playerScore[i] += diceRoll;
    console.log(`Player 1 - ${playerScore[0]} | Player 2 - ${playerScore[1]}`);
};

const scoreLevelUpdate = (i, current, update) => {
    //checked
    index = current.indexOf(playerScore[i]);
    playerScore[i] = update[index];
    console.log(
        `Player ${i + 1}'s new score is ${playerScore[i]} because of ${
            snakeBite ? "Snake Bite" : "Ladder Climb"
        }`
    );
    console.log(`Player 1 - ${playerScore[0]} | Player 2 - ${playerScore[1]}`);
    if (!snakeBite) console.log(`Play again Player ${i + 1}`);
};
