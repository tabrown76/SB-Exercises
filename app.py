from flask import Flask, render_template, redirect, session, flash, url_for, request, abort
from config import auth_key
from models import connect_db, db, User, Feedback
from forms import RegisterForm, AuthenticateForm, FeedbackForm
from sqlalchemy.exc import IntegrityError
from utils import login_required

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "postgresql:///auth_exercise"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["SQLALCHEMY_ECHO"] = True
app.config["SECRET_KEY"] = auth_key

connect_db(app)

@app.route('/')
def root_route():
    return redirect('/register')

@app.route('/register', methods=["GET", "POST"])
def register():
    form = RegisterForm()

    if session.get('user_username'):
        return redirect(url_for('users', username=session.get('user_username')))

    if form.validate_on_submit():
        username = form.username.data
        password = form.password.data
        email = form.email.data
        first = form.first_name.data
        last = form.last_name.data
        new_user = User.register(username, password, email, first, last)

        db.session.add(new_user)
        try:
            db.session.commit()
        except IntegrityError:
            form.username.errors.append('Username taken. Please pick another.')
            return render_template('register.html', form=form)
        
        session['user_username'] = new_user.username
        flash("You made it!", 'success')

        return redirect(url_for('users', username=new_user.username))


    return render_template('register.html', form=form)

@app.route('/users/<string:username>')
@login_required
def users(username):
    user = User.query.filter_by(username=username).first()
    all_feedback = Feedback.query.all()

    return render_template('users.html', user=user, feedback=all_feedback)

@app.route('/login', methods=["GET", "POST"])
def login():
    form = AuthenticateForm()

    if form.validate_on_submit():
        username = form.username.data
        password = form.password. data

        user = User.authenticate(username, password)
        if user:
            session['user_username'] = user.username
            return redirect(url_for('users', username=user.username))
        else:
            form.username.errors = ['Invalid username/password.']

    return render_template('login.html', form=form)

@app.route('/logout')
def logout():
    session.pop('user_username')

    return redirect('/')

@app.route('/users/<string:username>/feedback/add', methods=["GET", "POST"])
@login_required
def add_feedback(username):    
    form = FeedbackForm()

    if form.validate_on_submit():
        title = form.title.data
        content = form.content.data
        new_feedback = Feedback(title=title, content=content, username=session['user_username'])

        db.session.add(new_feedback)
        db.session.commit()
        flash("Submitted Feedback.", "success")
        return redirect(url_for("users", username=session['user_username']))

    return render_template('feedback.html', form=form)

@app.route('/feedback/<int:id>/update', methods=["GET", "POST"])
@login_required
def edit_feedback(id):    
    feedback = Feedback.query.get_or_404(id)

    if feedback.user.username != session['user_username']:
        flash("You do not have permission to do that.", "danger")
        return redirect(url_for("users", username=session['user_username']))
    
    form = FeedbackForm(request.form, obj=feedback)
    
    if request.method == 'POST':
        
        if form.validate_on_submit():
            feedback.title = form.title.data
            feedback.content = form.content.data
            db.session.commit()
            flash("Updated Feedback.", "info")
            return redirect(url_for("users", username=session['user_username']))

    return render_template('edit_feedback.html', form=form)

@app.route('/feedback/<int:id>/delete', methods=["POST"])
@login_required
def delete_feedback(id):
    feedback = Feedback.query.get_or_404(id)

    if feedback.user.username != session['user_username']:
        flash("You do not have permission to do that.", "danger")
        return redirect(url_for("users", username=session['user_username']))
    
    db.session.delete(feedback)
    db.session.commit()
        
    return redirect(url_for("users", username=session['user_username']))

@app.route('/users/<string:username>/delete', methods=["POST"])
@login_required
def delete_user(username):
    user = User.query.filter_by(username=username).first()

    if user is None:
        abort(404, description="User not found")

    if user.username != session['user_username']:
        flash("You do not have permission to do that.", "danger")
        return redirect(url_for("users", username=session['user_username']))
    
    db.session.delete(user)
    db.session.commit()
    session.pop('user_username', None)
    
    flash("Your account and all associated feedback has been successfully deleted.", "info")

    return redirect('/register')