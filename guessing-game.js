function guessingGame() {
    let target = Math.floor(Math.random() * 100);
    let count = 0;
    let won = false;

    function game(guess){
        guess = Number(guess);
        count++;
        
        if(!won && guess === target){
            won = true;
            return `You win! You found ${target} in ${count === 1 ? '1 guess' : `${count} guesses`}.`
        }
        else if(won){
            return `The game is over, you already won!`
        }

        if(guess < target){
            return `${guess} is too low!`
        } else{
            return `${guess} is too high!`
        }
    }
    return game;
}

module.exports = { guessingGame };
