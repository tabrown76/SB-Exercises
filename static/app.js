const clock = $('.clock');
let time = parseInt(clock.text());
let score = parseInt($('#score').text());
let hourglass = $('.hourglass');
let intervalId;
let guessedWords = new Set();
const ul = $('.guessed-words');

/**
 * Executes the provided callback function when the DOM is fully loaded.
 *
 * @param {function} callback - The function to be executed when the DOM is ready.
 * @returns {void}
 */
$(document).ready(function() {    
    resetClock(clock);
    decrementClock();

    $("form").on("submit", function(event) {
        event.preventDefault();
      
        let guess = $("input[name='guess']").val();
        if(guessedWords.has(guess)) {
            console.log("Word already guessed");
            $("input[name='guess']").val("");
            return;
        }
  
        guessedWords.add(guess);
        ul.append($('<li>').text(guess));
  
        $.ajax({
            url: "/check-guess",
            method: "POST",
            data: {
            guess: guess
        },
        success: function(response) {
            // Handle the response from the server
            if (response.result === 'ok') {
                let wordScore = guess.length;
                score += wordScore;
                $('#score').text(score);
            }
            // Clear the input field
            $("input[name='guess']").val("");
        },
        error: function(error) {
          console.log(error);
        }
        });
    });
});

/**
 * Resets the clock to its initial state.
 *
 * @returns {void}
 */
function resetClock(clock){
    clearInterval(intervalId);
    time = 60;
    clock.text(time);
    hourglass.css('color','initial');
    hourglass.removeClass('fa-hourglass-half fa-hourglass-end');
    hourglass.addClass('fa-hourglass-start');
}

/**
 * Decrements the clock by a specified amount.
 *
 * @param {number} amount - The amount by which to decrement the clock.
 * @returns {void}
 */
function decrementClock(){

    intervalId = setInterval(() => {
        time -= 1;
        clock.text(time);

        if(time < 30){
            hourglass.removeClass('fa-hourglass-start');
            hourglass.addClass('fa-hourglass-half');
        }
    
        if(time < 10){
            hourglass.css('color', '#ff0000');
        }
    
        if(time === 0){
            hourglass.toggleClass('fa-hourglass-half fa-hourglass-end');
            clearInterval(intervalId);
            disableForm();
        }
    }, 1000);
}

/**
 * Disables a form by setting its input fields and submit button to a disabled state.
 *
 * @param {HTMLFormElement} form - The form element to be disabled.
 * @returns {void}
 */
function disableForm() {
    $("form").off("submit");
    $("input[name='guess']").prop("disabled", true);
    $("button[type='submit']").prop("disabled", true);

    $.ajax({
        url: "/game-over",
        method: "POST",
        data: {
            score: score
        },
        success: function(response){
            console.log("Games played: ", response.games_played);
            console.log("Highest score: ", response.highest_score);
        },
        error: function(error){
            console.log(error);
        }
    })
}