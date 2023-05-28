"""Demo file showing off a model for SQLAlchemy."""

from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


def connect_db(app):
    """Connect to database."""

    db.app = app
    db.init_app(app)

class Pet(db.Model):
    """
    Model for representing a pet.

    Attributes:
        id (int): The unique identifier of the pet (primary key).
        name (str): The name of the pet.
        species (str): The species of the pet.
        photo_url (str): The URL of the pet's photo.
        age (int): The age of the pet.
        notes (str): Additional notes about the pet.
        available (bool): Indicates if the pet is available for adoption.
    """
    __tablename__ = 'pets'

    id = db.Column(db.Integer,
                   primary_key=True,
                   autoincrement=True)

    name = db.Column(db.Text,
                     nullable=False)
    
    species = db.Column(db.Text,
                        nullable=False)

    photo_url = db.Column(db.Text)

    age = db.Column(db.Integer)

    notes = db.Column(db.Text)
    
    available = db.Column(db.Boolean,
                          default=True)

