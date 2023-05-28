from flask import Flask, request, render_template, redirect, session
from flask_debugtoolbar import DebugToolbarExtension
from models import db, connect_db, Pet
from sqlalchemy import text
from forms import AddPetForm, UpdatePetForm

app = Flask(__name__)
app.app_context().push()
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///pet_shop_db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True
app.config['SECRET_KEY'] = 'supersecret'
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False
debug = DebugToolbarExtension(app)

connect_db(app)

@app.route('/')
def root_route():
    """
    Root route of the application.

    Returns:
        str: Rendered template for the home page, displaying all pets.
    """
    pets = Pet.query.all()

    return render_template('home.html', pets=pets)

@app.route('/add', methods=["GET", "POST"])
def add_pet():
    """
    Route for adding a new pet.

    Returns:
        - If the request method is GET:
            str: Rendered template for the add pet form.
        - If the request method is POST and the form is valid:
            redirect: Redirects to the root route after adding the new pet.
        - If the request method is POST and the form is invalid:
            str: Rendered template for the add pet form with form validation errors.
    """
    form = AddPetForm()

    if form.validate_on_submit():
        name = form.name.data
        species = form.species.data
        photo_url = form.photo_url.data
        age = form.age.data
        notes = form.notes.data

        new_pet = Pet(name=name, species=species, photo_url=photo_url, age=age, notes=notes)

        db.session.add(new_pet)
        db.session.commit()

        return redirect('/')

    else:
        return render_template('add_pet.html', form=form)
    
@app.route('/<int:pet_id>', methods=["GET", "POST"])
def view_pet(pet_id):
    """
    Route for viewing and updating a pet.

    Args:
        pet_id (int): The ID of the pet to view.

    Returns:
        - If the request method is GET:
            str: Rendered template for viewing the pet details and update form.
        - If the request method is POST and the form is valid:
            redirect: Redirects to the root route after updating the pet details.
        - If the request method is POST and the form is invalid:
            str: Rendered template for viewing the pet details and update form with form validation errors.
    """
    pet = Pet.query.get_or_404(pet_id)
    form = UpdatePetForm()

    if request.method == 'GET':
        form.notes.data = pet.notes
        form.photo_url.data = pet.photo_url

    if request.method == 'POST' and form.validate_on_submit():
        pet.photo_url = form.photo_url.data
        pet.notes = form.notes.data

        db.session.commit()

        return redirect('/')    

    else:
        return render_template('view_pet.html', pet=pet, form=form)
    
@app.route('/<int:pet_id>/adopt', methods=['GET', 'POST'])
def adopt_pet(pet_id):
    """
    Route for adopting a pet.

    Args:
        pet_id (int): The ID of the pet to adopt.

    Returns:
        - If the request method is GET:
            str: Rendered template for viewing the pet details and adoption form.
        - If the request method is POST and the form is valid:
            redirect: Redirects to the root route after marking the pet as adopted.
        - If the request method is POST and the form is invalid:
            str: Rendered template for viewing the pet details and adoption form with form validation errors.
    """
    pet = Pet.query.get_or_404(pet_id)
    form = UpdatePetForm()

    if form.validate_on_submit():
        pet.available = False

        db.session.commit()

        return redirect('/')
    
    else:
        return render_template('view_pet.html', pet=pet, form=form)

@app.route('/<int:pet_id>/unadopt', methods=['GET', 'POST'])
def unadopt_pet(pet_id):
    """
    Route for unadopting a pet.

    Args:
        pet_id (int): The ID of the pet to unadopt.

    Returns:
        - If the request method is GET:
            str: Rendered template for viewing the pet details and unadoption form.
        - If the request method is POST and the form is valid:
            redirect: Redirects to the root route after marking the pet as available for adoption.
        - If the request method is POST and the form is invalid:
            str: Rendered template for viewing the pet details and unadoption form with form validation errors.
    """
    pet = Pet.query.get_or_404(pet_id)
    form = UpdatePetForm()

    if form.validate_on_submit():
        pet.available = True

        db.session.commit()

        return redirect('/')
    
    else:
        return render_template('view_pet.html', pet=pet, form=form)