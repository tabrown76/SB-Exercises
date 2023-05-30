"""Flask app for Cupcakes"""
from flask import Flask, render_template, jsonify, request,redirect
from models import db, connect_db, Cupcake
from forms import AddCupcakeForm

app = Flask(__name__)
app.app_context().push()
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///cupcake_db'
app.config['SECRET_KEY'] = 'supersecret'

connect_db(app)

@app.route('/api/cupcakes', methods=['GET', 'POST'])
def get_cupcakes():
    cupcakes = [cupcake.serialize() for cupcake in Cupcake.query.all()]

    if request.method == 'POST':
        new_cupcake = Cupcake(flavor=request.json['flavor'],
                              size=request.json['size'],
                              rating=request.json['rating'],
                              image=request.json['image'])
        
        db.session.add(new_cupcake)
        db.session.commit()

        return (jsonify(cupcake=new_cupcake.serialize()), 201)
    
    else:
        return jsonify(cupcakes=cupcakes)

@app.route('/api/cupcakes/<int:id>', methods=['GET', 'PATCH', 'DELETE'])
def get_cupcake(id):
    cupcake = Cupcake.query.get_or_404(id)

    if request.method == 'PATCH':
        cupcake.flavor = request.json.get('flavor', cupcake.flavor)
        cupcake.size = request.json.get('size', cupcake.size)
        cupcake.rating = request.json.get('rating', cupcake.rating)
        cupcake.image = request.json.get('image', cupcake.image)

        db.session.commit()

        return jsonify(cupcake=cupcake.serialize())
    
    elif request.method == 'DELETE':
        cupcake_flavor = cupcake.flavor
        db.session.delete(cupcake)
        db.session.commit()

        return jsonify(message=f'Removed the {cupcake_flavor} cupcake.')
    
    else:
        return jsonify(cupcake=cupcake.serialize())

@app.route('/', methods=["GET", "POST"])
def root_route():
    form = AddCupcakeForm()

    if form.validate_on_submit():
        flavor = form.flavor.data
        size = form.size.data
        rating = form.rating.data
        image = form.image.data

        new_cupcake = Cupcake(flavor=flavor, size=size, rating=rating, image=image)

        db.session.add(new_cupcake)
        db.session.commit()

        return redirect('/')

    else:
        return render_template('home.html', form=form)
