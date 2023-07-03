def populate_form(form, user):
    """Helper function to populate the form fields."""
    for field in form:
        if hasattr(user, field.name):
            field.data = getattr(user, field.name) or ''