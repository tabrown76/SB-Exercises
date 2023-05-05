from unittest import TestCase
from app import app
from flask import Flask, session
from boggle import Boggle
from flask_debugtoolbar import DebugToolbarExtension

app = Flask(__name__)
app.debug = True
toolbar = DebugToolbarExtension(app)

app.config['TESTING'] = True
app.config['DEBUG_TB_HOSTS'] = ['dont-show-debug-toolbar']

class FlaskTests(TestCase):

    def setUp(self):
        self.app = app.test_client()

    def test_root_route(self):
        with app.test_request_context():
            app.config['TESTING'] = True
            app.secret_key = 'test-secret-key'

            # Make a request to the root route
            response = self.app.get('/')

            # Assertions
            self.assertEqual(response.status_code, 200)
            self.assertIsNotNone(response.data)
            self.assertIn(b'new_game', response.data)

    def test_check_guess(self):
        with app.test_request_context():
            app.config['TESTING'] = True
            app.secret_key = 'test-secret-key'

            with app.test_client() as client:
                with client.session_transaction() as session:
                    session['current_board'] = [['A', 'B', 'C'], ['D', 'E', 'F'], ['G', 'H', 'I']]

                # Make a POST request to the check-guess route
                response = self.app.post('/check-guess', data={'guess': 'AB'})

                # Assertions
                self.assertEqual(response.status_code, 200)
                self.assertIsNotNone(response.json)
                self.assertIn('result', response.json)
                self.assertEqual(response.json['result'], 'ok')

    def test_game_over(self):
        with app.test_request_context():
            app.config['TESTING'] = True
            app.secret_key = 'test-secret-key'

            with app.test_client() as client:
                with client.session_transaction() as session:
                    session['games_played'] = 0
                    session['highest_score'] = 0

                # Make a POST request to the game-over route
                response = self.app.post('/game-over', data={'score': '100'})

                # Assertions
                self.assertEqual(response.status_code, 200)
                self.assertIsNotNone(response.json)
                self.assertIn('games_played', response.json)
                self.assertIn('highest_score', response.json)
                self.assertEqual(response.json['games_played'], 1)
                self.assertEqual(response.json['highest_score'], 100)