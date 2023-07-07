"""User View tests."""

# run these tests like:
#
#    FLASK_ENV=production python -m unittest test_user_views.py


import os
from unittest import TestCase

from models import db, connect_db, Message, User

# BEFORE we import our app, let's set an environmental variable
# to use a different database for tests (we need to do this
# before we import our app, since that will have already
# connected to the database

os.environ['DATABASE_URL'] = "postgresql:///warbler-test"


# Now we can import app

from app import app, CURR_USER_KEY

# Create our tables (we do this here, so we only create the tables
# once for all tests --- in each test, we'll delete the data
# and create fresh new clean test data

db.drop_all()
db.create_all()

# Don't have WTForms use CSRF at all, since it's a pain to test

app.config['WTF_CSRF_ENABLED'] = False

class UserViewTestCase(TestCase):
    """Test views for users."""

    def setUp(self):
        """Create test client, add sample data."""

        db.session.rollback()
        User.query.delete()
        Message.query.delete()

        self.client = app.test_client()

        self.testuser = User.signup(username="testuser",
                                    email="test@test.com",
                                    password="testuser",
                                    image_url=None)
        self.testuser2 = User.signup(username="testuser2",
                                    email="test2@test.com",
                                    password="testuser2",
                                    image_url=None)

        db.session.add(self.testuser)
        db.session.add(self.testuser2)
        db.session.commit()

    def test_see_follower_following_logged_in(self):
        """Can a logged in user see the follower / following pages for any user?"""

        with self.client as c:
            with c.session_transaction() as sess:
                sess[CURR_USER_KEY] = self.testuser.id

                resp = c.get(f"/users/{self.testuser2.id}/followers")
                self.assertEqual(resp.status_code, 200)

                resp = c.get(f"/users/{self.testuser2.id}/following")
                self.assertEqual(resp.status_code, 200)

    
    def test_see_follower_following_logged_out(self):
        """Does a logged out user get disallowed from visiting a user’s follower / following pages?"""

        with self.client as c:
            resp = c.get(f"/users/{self.testuser.id}/followers")
            self.assertEqual(resp.status_code, 302)

            resp = c.get(f"/users/{self.testuser.id}/following")
            self.assertEqual(resp.status_code, 302)