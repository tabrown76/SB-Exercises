from flask import Flask, render_template, redirect, request, url_for, flash, session
import surveys as s

app = Flask(__name__)
app.secret_key = 'your_unique_secret_key'

responses = []

@app.route('/')
def root_route():
    return render_template('home.html', surveys=s.surveys)

@app.route('/<prefix>/questions/<int:id>', methods=["GET", "POST"])
def question_pages(prefix, id): 
    survey = s.surveys[prefix]

    if id >= len(survey.questions):
        return redirect('/thanks')
    
    if id != len(responses):
        if id < len(responses):
            flash("You've already answered this question.")
        else:
            flash("Invalid question. Redirecting...")
        return redirect(url_for('question_pages', prefix=prefix, id=len(responses)))
    
    question = survey.questions[id]

    if request.method == "POST":
        response = request.form.get("choice")
        responses.append(response)
        
        return redirect(url_for('question_pages', prefix=prefix, id=id + 1))
        
    return render_template('questions.html', prefix=prefix, survey=survey, question=question, id=id)

@app.route('/thanks')
def thanks_page():
    return render_template('thanks.html')

@app.before_request
def clear_responses():
    if request.endpoint == 'root_route':
        responses.clear()
