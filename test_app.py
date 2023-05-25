from unittest import TestCase

from app import app
from models import db, User, Post

# Use test database and don't clutter tests with SQL
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///blogly_test'
app.config['SQLALCHEMY_ECHO'] = False

# Make Flask errors be real errors, rather than HTML pages with error info
app.config['TESTING'] = True

# This is a bit of hack, but don't use Flask DebugToolbar
app.config['DEBUG_TB_HOSTS'] = ['dont-show-debug-toolbar']

db.drop_all()
db.create_all()

class UserViewsTestCase(TestCase):
    """Tests for views for Users."""

    def setUp(self):
        """Add sample user."""

        User.query.delete()

        user = User(first_name='John', last_name='Doe', image_url='https://yt3.ggpht.com/a/AATXAJyxZWOhuIKaFFJ20SPL7Sfa7Oi0hMpUKxlEwg=s900-c-k-c0xffffffff-no-rj-mo')
        db.session.add(user)
        db.session.commit()

        self.user_id = user.id

    def tearDown(self):
        """Clean up any fouled transaction."""

        db.session.rollback()

    def test_root_route(self):
        with app.test_client() as client:
            resp = client.get('/', follow_redirects=True)
            html = resp.get_data(as_text=True)

            self.assertEqual(resp.status_code, 200)
            self.assertIn('Users', html)

    def test_users_list(self):
        with app.test_client() as client:
            resp = client.get('/users')
            html = resp.get_data(as_text=True)

            self.assertEqual(resp.status_code, 200)
            self.assertIn('Users', html)

    def test_add_user_page(self):
        with app.test_client() as client:
            resp = client.get('/users/new')
            html = resp.get_data(as_text=True)

            self.assertEqual(resp.status_code, 200)
            self.assertIn('Create', html)

    def test_add_user(self):
        with app.test_client() as client:
            d = {'first-name': "John", "last-name": "Dos", "img-url": "https://yt3.ggpht.com/a/AATXAJyxZWOhuIKaFFJ20SPL7Sfa7Oi0hMpUKxlEwg=s900-c-k-c0xffffffff-no-rj-mo"}
            resp = client.post('users/new', data=d, follow_redirects=True)
            html = resp.get_data(as_text=True)

            self.assertEqual(resp.status_code, 200)
            self.assertIn('Dos', html)

class PostViewsTestCase(TestCase):
    """Tests for views for Posts."""

    def setUp(self):
        """Add sample post."""

        Post.query.delete()

        post = Post(title='title', content='content', user_id=1)
        db.session.add(post)
        db.session.commit()

        self.post_id = post.id

    def tearDown(self):
        """Clean up any fouled transaction."""

        db.session.rollback()