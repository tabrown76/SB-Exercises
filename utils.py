from functools import wraps
from flask import redirect, flash, url_for, g

def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if not g.user:
            flash("Access unauthorized.", "danger")
            return redirect(url_for('homepage')) 
        return f(*args, **kwargs)
    return decorated_function


def populate_form(form, user):
    """Helper function to populate the form fields."""
    for field in form:
        if hasattr(user, field.name):
            field.data = getattr(user, field.name) or ''