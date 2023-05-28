from models import Pet, db
from app import app

db.drop_all()
db.create_all()

Pet.query.delete()

pets = [Pet(name="Fluffy", species="cat", photo_url="https://i.pinimg.com/originals/1e/53/f4/1e53f4e398a2c278f4f560ff37b3473d.jpg", age="5", notes="this is a note about a cat", available=True),
        Pet(name="Spot", species="dog", photo_url="https://infoaway.com/wp-content/uploads/2020/10/Good-Spotted-dog-names-768x512.jpg", age="7", notes="this is a note about a dog", available=True),
        Pet(name="Bitey", species="wolverine", photo_url="https://www.factinate.com/wp-content/uploads/2017/02/Wolverine-Animal.jpg", age="9", notes="this is a note about a wolverine", available=False),]

db.session.add_all(pets)
db.session.commit()
