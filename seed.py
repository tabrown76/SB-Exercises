from models import User, Post, Tag, PostTag, db
from app import app

db.drop_all()
db.create_all()

User.query.delete()
Post.query.delete()

users = [User(first_name='John', last_name='Doe', image_url='https://yt3.ggpht.com/a/AATXAJyxZWOhuIKaFFJ20SPL7Sfa7Oi0hMpUKxlEwg=s900-c-k-c0xffffffff-no-rj-mo'),
        User(first_name='John', last_name='Dos', image_url='https://yt3.ggpht.com/a/AATXAJyxZWOhuIKaFFJ20SPL7Sfa7Oi0hMpUKxlEwg=s900-c-k-c0xffffffff-no-rj-mo')]

db.session.add_all(users)
db.session.commit()

posts = [Post(title="First Post", content="This is a post.", user_id=1),
         Post(title="Second Post", content="...and again.", user_id=1),
         Post(title="DosUno", content="Posty post post post.", user_id=2),
         Post(title="DosDos", content="...how do you say 'again' in Spanish?", user_id=2)]

db.session.add_all(posts)
db.session.commit()

tags = [Tag(name='funny'),
        Tag(name="NSFW"),
        Tag(name="spoiler"),
        Tag(name="request")]

db.session.add_all(tags)
db.session.commit()

tagged = [PostTag(post_id=1, tag_id=2),
          PostTag(post_id=4, tag_id=4),
          PostTag(post_id=3, tag_id=1)]

db.session.add_all(tagged)
db.session.commit()

