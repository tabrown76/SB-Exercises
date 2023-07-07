"""User model tests."""

# run these tests like:
#
#    python -m unittest test_user_model.py


import os
from unittest import TestCase
from sqlalchemy import exc
from models import db, User, Message, Follows

# BEFORE we import our app, let's set an environmental variable
# to use a different database for tests (we need to do this
# before we import our app, since that will have already
# connected to the database

os.environ['DATABASE_URL'] = "postgresql:///warbler-test"


# Now we can import app

from app import app

# Create our tables (we do this here, so we only create the tables
# once for all tests --- in each test, we'll delete the data
# and create fresh new clean test data

db.create_all()


class UserModelTestCase(TestCase):
    """Test views for messages."""

    def setUp(self):
        """Create test client, add sample data."""

        db.session.rollback()
        User.query.delete()
        Message.query.delete()
        Follows.query.delete()

        self.u1 = User.signup("testuser", "test@test.com", "password", None)
        self.u2 = User.signup("testuser2", "test2@test.com", "password", None)

        self.assertTrue(self.u1.username)
        self.assertTrue(self.u2.username)
        db.session.commit()

        self.client = app.test_client()


    def test_repr_method(self):
        """Does the repr method work as expected?"""
        u = User.query.get(self.u1.id)
        self.assertEqual(repr(u), f'<User #{self.u1.id}: {self.u1.username}, {self.u1.email}>')

    def test_is_following(self):
        """Does is_following successfully detect when user1 is following user2?"""
        self.u1.following.append(self.u2)
        db.session.commit()

        self.assertTrue(self.u1.is_following(self.u2))
        self.assertFalse(self.u2.is_following(self.u1))

    def test_user_is_not_following(self):
        """Does is_following successfully detect when user1 is not following user2?"""
        self.assertFalse(self.u1.is_following(self.u2))

    def test_is_followed_by(self):
        """Does is_followed_by successfully detect when user1 is followed by user2?"""
        self.u1.following.append(self.u2)
        db.session.commit()

        self.assertTrue(self.u2.is_followed_by(self.u1))
        self.assertFalse(self.u1.is_followed_by(self.u2))

    def test_user_is_not_followed_by(self):
        """Does is_followed_by successfully detect when user1 is not followed by user2?"""
        self.assertFalse(self.u1.is_followed_by(self.u2))

    def test_user_create(self):
        """Does User.create successfully create a new user given valid credentials?"""
        u = User.signup("testuser3", "test3@test.com", "password", None)
        db.session.commit()
        
        u_test = User.query.filter_by(username="testuser3").first()
        self.assertIsNotNone(u_test)

    def test_user_create_fail(self):
        """Does User.create fail to create a new user if any of the validations (e.g. uniqueness, non-nullable fields) fail?"""
        u = User.signup(None, "test4@test.com", "password", None)
        with self.assertRaises(exc.IntegrityError):
            db.session.commit()

    def test_authenticate(self):
        """Does User.authenticate successfully return a user when given a valid username and password?"""
        u = User.authenticate("testuser", "password")
        self.assertIsNotNone(u)
        self.assertEqual(u.id, self.u1.id)

    def test_authenticate_invalid_username(self):
        """Does User.authenticate fail to return a user when the username is invalid?"""
        u = User.authenticate("invalidusername", "password")
        self.assertFalse(u)

    def test_authenticate_invalid_password(self):
        """Does User.authenticate fail to return a user when the password is invalid?"""
        u = User.authenticate("testuser", "invalidpassword")
        self.assertFalse(u)
