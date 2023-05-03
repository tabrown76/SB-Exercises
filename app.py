from flask import Flask, render_template, redirect, request, url_for, flash, session
import surveys as s

app = Flask(__name__)
app.secret_key = 'your_unique_secret_key'

@app.route('/')
def root_route():
    """
    Renders the home page template with a list of surveys.

    Returns:
        A rendered template of the home page with surveys.
    """
    return render_template('home.html', surveys=s.surveys)

@app.route('/initialize_responses', methods=["POST"])
def initialize_responses():
    """
    Initializes the responses list in the session and redirects to the first question page.

    Returns:
        A redirect to the first question page.
    """
    prefix = request.form['prefix']
    session['responses'] = []
    return redirect(url_for('question_pages', prefix=prefix, id=0))

@app.route('/<prefix>/questions/<int:id>', methods=["GET", "POST"])
def question_pages(prefix, id):
    """
    Renders the question pages for the specified prefix and question ID.

    Args:
        prefix (str): The prefix indicating the survey type.
        id (int): The ID of the current question.

    Returns:
        - If the current question ID is greater than or equal to the number of questions in the survey,
          redirects the user to the thanks page.
        - If the current question ID does not match the length of the user's responses:
            - If the ID is smaller than the length of the responses, flashes a message indicating that the
              question has already been answered.
            - If the ID is larger than the length of the responses, flashes a message indicating an invalid
              question and redirects the user to the appropriate question page.
        - If the request method is POST, adds the user's response to the session's responses list and
          redirects the user to the next question page.
        - If the request method is GET, renders the questions.html template with the appropriate survey,
          question, and ID.
    """ 
    survey = s.surveys[prefix]

    if id >= len(survey.questions):
        return redirect('/thanks')
    
    if id != len(session['responses']):
        if id < len(session['responses']):
            flash("You've already answered this question.")
        else:
            flash("Invalid question. Redirecting...")

        return redirect(url_for('question_pages', prefix=prefix, id=len(session['responses'])))
    
    question = survey.questions[id]

    if request.method == "POST":
        response = request.form.get("choice")
        responses_copy = session['responses']
        responses_copy.append(response)
        session['responses'] = responses_copy
        print(responses_copy)
        return redirect(url_for('question_pages', prefix=prefix, id=id + 1))
        
    return render_template('questions.html', prefix=prefix, survey=survey, question=question, id=id)

@app.route('/thanks')
def thanks_page():
    """
    Renders the thanks page template.

    Returns:
        A rendered template of the thanks page.
    """
    return render_template('thanks.html')

# @app.before_request
# def clear_responses():
#     if request.endpoint == 'root_route':
#         responses.clear()
