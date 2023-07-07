import os
from unittest import TestCase
from models import db, User, Message

os.environ['DATABASE_URL'] = "postgresql:///warbler-test"

from app import app

db.create_all()

class MessageModelTestCase(TestCase):
    """Test model for messages."""

    def setUp(self):
        """Create test client, add sample data."""

        db.session.rollback()
        User.query.delete()
        Message.query.delete()

        self.u1 = User.signup("testuser", "test@test.com", "password", None)
        db.session.commit()

        self.m1 = Message(text="test message 1", user_id=self.u1.id)
        db.session.add(self.m1)
        db.session.commit()

        self.client = app.test_client()


    def test_message_model(self):
        """Does the message model work as expected?"""

        m = Message.query.get(self.m1.id)
        
        # Check if the message text is as expected
        self.assertEqual(m.text, "test message 1")
        
        # Check if the user_id is correctly associated
        self.assertEqual(m.user_id, self.u1.id)

    def test_user_messages(self):
        """Does the user model correctly display associated messages?"""
        
        u = User.query.get(self.u1.id)

        # Check if the user has the correct messages
        self.assertEqual(len(u.messages), 1)
        self.assertEqual(u.messages[0].text, "test message 1")

    def test_message_delete(self):
        """Does message delete work?"""

        db.session.delete(self.m1)
        db.session.commit()

        m = Message.query.get(self.m1.id)
        self.assertIsNone(m)

    def test_message_edit(self):
        """Does message edit work?"""

        self.m1.text = "edited message"
        db.session.commit()

        m = Message.query.get(self.m1.id)
        self.assertEqual(m.text, "edited message")
