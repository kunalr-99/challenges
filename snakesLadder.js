let diceRoll,
    playerScore,
    snakes,
    snakesDown,
    snakeBite,
    ladders,
    laddersUp,
    ladderClimb,
    crucial,
    index,
    remainder;

playerScore = 0;
snakes = [13, 22, 34, 41, 48];
snakesDown = [4, 15, 20, 30, 9];
ladders = [36, 24, 16, 7];
laddersUp = [42, 31, 46, 11];
index = 0;

const rollDice = () => {
    // Rolling the dice
    diceRoll = Math.trunc(Math.random() * 6 + 1);
    console.log(`It was a ${diceRoll}`);
    snakeBite = false;
    // ladderClimb = false;

    // Checking whether it's a new game or not
    if (playerScore === 0) {
        // Checking if we git a six to start the game
        if (diceRoll !== 6) {
            console.log(
                `Oops ${diceRoll} - You need to roll a 6 to start this game!`
            );
        } else {
            // Update player score
            scoreNormal();
        }
    } else {
        if (playerScore >= 44 && playerScore < 50) {
            // Checking threshold diceRolls at the end to avoid overtaking top-limit
            remainder = 50 - playerScore;
            if (diceRoll > remainder) {
                console.log(
                    `${playerScore}: Limit exeeded over 50, try a number lower than ${
                        remainder + 1
                    }`
                );
            } else {
                scoreNormal();
                if (playerScore === 50) {
                    // Display player wins!!
                    playerScore = 0;
                    console.log(`Congratulations!! You have won <3`);
                    alert("Start a new game!");
                } else {
                    if (snakes.includes(playerScore)) {
                        // Checking for snake-bites
                        snakeBite = true;
                        scoreLevelUpdate(snakes, snakesDown);
                    }
                }
            }
        } else {
            scoreNormal();
            if (snakes.includes(playerScore)) {
                // Checking for snake-bites
                snakeBite = true;
                scoreLevelUpdate(snakes, snakesDown);
            } else if (ladders.includes(playerScore)) {
                // Cheking for ladder climbs
                scoreLevelUpdate(ladders, laddersUp);
            } else {
                return;
            }
        }
    }
};

document.getElementById("btn").addEventListener("click", rollDice);

const scoreNormal = () => {
    playerScore += diceRoll;
    console.log(playerScore);
};

const scoreLevelUpdate = (current, update) => {
    index = current.indexOf(playerScore);
    playerScore = update[index];
    console.log(
        `Your new score is ${playerScore} because of ${
            snakeBite ? "Snake Bite" : "Ladder Climb"
        }`
    );
};
