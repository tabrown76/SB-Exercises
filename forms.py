from flask_wtf import FlaskForm
from wtforms import StringField, FloatField, URLField
from wtforms.validators import InputRequired, Optional

class AddCupcakeForm(FlaskForm):
    """Form for adding a cupcake."""

    flavor = StringField("Flavor",
                       validators=[InputRequired()])
    
    size = StringField("Size", 
                       validators=[InputRequired()])
    
    rating = FloatField("Rating",
                       validators=[Optional()])

    image = URLField("Image",
                            validators=[InputRequired()],
                            default="https://tinyurl.com/demo-cupcake")