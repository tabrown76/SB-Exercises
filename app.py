from flask import Flask, render_template, session, request, jsonify
from boggle import Boggle

boggle_game = Boggle()
app = Flask(__name__)
app.secret_key = 'your-secret-key'

@app.route('/')
def root_route():
    """
    Renders the root route and initializes a new Boggle game.

    Returns:
        str: The rendered HTML template for the Boggle game.
    """
    new_game = boggle_game.make_board()
    session['current_board'] = new_game

    if 'games_played' not in session:
        session['games_played'] = 0
    if 'highest_score' not in session:
        session['highest_score'] = 0

    return render_template('boggle.html', new_game=new_game)

@app.route('/check-guess', methods=['POST'])
def check_guess():
    """
    Checks the validity of a guess against the current Boggle game.

    Returns:
        dict: A JSON response containing the result of the guess.
            The 'result' key indicates whether the guess is valid or not.
    """
    guess = request.form.get('guess')
    new_game = session['current_board']
    result = boggle_game.check_valid_word(new_game, guess)

    return jsonify({'result': result})

@app.route('/game-over', methods=['POST'])
def game_over():
    """
    Handles the game over event and updates session data.

    Returns:
        dict: A JSON response containing the updated game statistics.
            The 'games_played' key represents the total number of games played.
            The 'highest_score' key represents the highest score achieved so far.
    """
    score = int(request.form.get('score'))
    session['games_played'] += 1

    if score > session['highest_score']:
        session['highest_score'] = score
    
    return jsonify({'games_played': session['games_played'], 'highest_score': session['highest_score']})
