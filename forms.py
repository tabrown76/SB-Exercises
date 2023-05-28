from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, ValidationError, TextAreaField, SelectField, URLField
from wtforms.validators import InputRequired, Optional

def integer_check(form, field):
    if field.data < 1 or field.data > 30:
        raise ValidationError('Enter an age between 1 and 30.')

class AddPetForm(FlaskForm):
    """Form for adding a pet."""

    name = StringField("Pet Name",
                       validators=[InputRequired()])
    
    species = SelectField("Species",
                          choices=[('cat', 'cat'), ('dog', 'dog'), ('wolverine', 'wolverine')],
                          validators=[InputRequired()])

    photo_url = URLField("Photo URL",
                            validators=[Optional()])

    age = IntegerField("Age",
                       validators=[Optional(), integer_check])

    notes = TextAreaField("Notes",
                        validators=[Optional()])
    
class UpdatePetForm(FlaskForm):
    """Form for updating an existing pet."""
    
    photo_url = URLField("Photo URL",
                            validators=[Optional()])
    
    notes = TextAreaField("Notes",
                        validators=[Optional()])