from functools import wraps
from flask import session, redirect, flash, url_for
from forms import FeedbackForm

def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if 'user_username' not in session:
            flash("Please login first!", "danger")
            return redirect('/login')
        return f(*args, **kwargs)
    return decorated_function