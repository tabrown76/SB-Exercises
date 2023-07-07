"""Message View tests."""

# run these tests like:
#
#    FLASK_ENV=production python -m unittest test_message_views.py


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


class MessageViewTestCase(TestCase):
    """Test views for messages."""

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

    def test_add_message(self):
        """Can use add a message?"""

        # Since we need to change the session to mimic logging in,
        # we need to use the changing-session trick:

        with self.client as c:
            with c.session_transaction() as sess:
                sess[CURR_USER_KEY] = self.testuser.id

            # Now, that session setting is saved, so we can have
            # the rest of ours test

            resp = c.post("/messages/new", data={"text": "Hello"})

            # Make sure it redirects
            self.assertEqual(resp.status_code, 302)

            msg = Message.query.one()
            self.assertEqual(msg.text, "Hello")

    def test_add_message_logged_in(self):
        """Can a logged in user add a message as themselves?"""

        with self.client as c:
            with c.session_transaction() as sess:
                sess[CURR_USER_KEY] = self.testuser.id

            resp = c.post("/messages/new", data={"text": "Hello"})
            self.assertEqual(resp.status_code, 302)

            msg = Message.query.one()
            self.assertEqual(msg.text, "Hello")

    def test_delete_message_logged_in(self):
        """Can a logged in user delete a message as themselves?"""

        with self.client as c:
            with c.session_transaction() as sess:
                sess[CURR_USER_KEY] = self.testuser.id

            msg = Message(text="Hello", user_id=self.testuser.id)
            db.session.add(msg)
            db.session.commit()

            resp = c.post(f"/messages/{msg.id}/delete")
            self.assertEqual(resp.status_code, 302)

            msg = Message.query.get(msg.id)
            self.assertIsNone(msg)

    def test_add_message_logged_out(self):
        """Is a logged out user prohibited from adding messages?"""

        with self.client as c:
            resp = c.post("/messages/new", data={"text": "Hello"})
            self.assertEqual(resp.status_code, 302)

    def test_delete_message_logged_out(self):
        """Is a logged out user prohibited from deleting messages?"""

        msg = Message(text="Hello", user_id=self.testuser.id)
        db.session.add(msg)
        db.session.commit()

        with self.client as c:
            resp = c.post(f"/messages/{msg.id}/delete")
            self.assertEqual(resp.status_code, 302)

    def test_add_message_as_other_user(self):
        """Is a logged in user prohibited from adding a message as another user?"""

        with self.client as c:
            with c.session_transaction() as sess:
                sess[CURR_USER_KEY] = self.testuser.id

                resp = c.post("/messages/new", data={"text": "Hello", "user_id": self.testuser2.id})
                self.assertEqual(resp.status_code, 403)

    def test_delete_message_as_other_user(self):
        """Is a logged in user prohibited from deleting a message as another user?"""

        with self.client as c:
            with c.session_transaction() as sess:
                sess[CURR_USER_KEY] = self.testuser.id

                msg = Message(text="Hello", user_id=self.testuser2.id)
                db.session.add(msg)
                db.session.commit()
    
                resp = c.post(f"/messages/{msg.id}/delete")
                self.assertEqual(resp.status_code, 403)
