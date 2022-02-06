let diceRoll,
  playerScore,
  snakes,
  snakesDown,
  snakeBite,
  ladders,
  laddersUp,
  ladderClimb,
  index,
  remainder;

playerScore = 0;
snakes = [13, 22, 34, 41, 48];
// 7, 13, 16, 22, 24, 34, 36, 41, 48
snakesDown = [4, 15, 20, 30, 9];
ladders = [36, 24, 16, 7];
laddersUp = [42, 31, 46, 11];

const rollDice = () => {
  // Rolling the dice
  diceRoll = Math.trunc(Math.random() * 6 + 1);

  // Checking whether it's a new game or not
  if (playerScore === 0) {
    // Checking if we git a six to start the game
    if (diceRoll !== 6) {
      console.log(
        `Oops ${diceRoll} - You need to roll a 6 to start this game!`
      );
    } else {
      // Update player score
      playerScore += diceRoll;
      console.log(playerScore);
    }
  } else if (snakes.includes(playerScore)) {
    // Checking for snake-bites
    snakeBite = true;
    index = snakes.indexOf(playerScore);
    playerScore = snakesDown[index];
    console.log(playerScore);
  } else if (ladders.includes(playerScore)) {
    // Cheking for ladder climbs
    ladderClimb = true;
    index = ladders.indexOf(playerScore);
    playerScore = laddersUp[index];
    console.log(playerScore);
  } else if (playerScore >= 44 && playerScore < 50) {
    // Checking threshold diceRolls at the end to avoid overtaking top-limit
    remainder = 50 - playerScore;
    if (diceRoll > remainder) {
      console.log(
        `${playerScore}: Limit exeeded over 50, try a number lower than ${remainder}`
      );
    } else {
      playerScore += diceRoll;
      if (playerScore === 50) {
        // Display player wins!!
        playerScore = 0;
        console.log(`Congratulations!! You have won <3`);
      } else {
        // Update player score
        console.log(playerScore);
      }
    }
  } else {
    // Update playerscore
    playerScore += diceRoll;
    console.log(playerScore);
  }

  if (snakeBite || ladderClimb) {
    console.log(
      `Your new score is ${playerScore} because of ${
        snakeBite ? "Snake Bite" : "Ladder Climb"
      }`
    );
    snakeBite = false;
    ladderClimb = false;
  } else {
    console.log(`It was a ${diceRoll}`);
  }
};

document.getElementById("btn").addEventListener("click", rollDice);
