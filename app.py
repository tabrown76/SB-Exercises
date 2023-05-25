"""Blogly application."""

from flask import Flask, request, render_template, redirect, session
from flask_debugtoolbar import DebugToolbarExtension
from models import db, connect_db, User, Post
from sqlalchemy import text

app = Flask(__name__)
app.app_context().push()
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///blogly'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True
app.config['SECRET_KEY'] = 'supersecret'
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False
debug = DebugToolbarExtension(app)

connect_db(app)
db.create_all()

@app.route('/')
def root_route():
    return redirect('/users')

@app.route('/users')
def users_list():
    users = User.query.all()
    return render_template('home.html', users=users)

@app.route('/users/new')
def add_user_page():
    return render_template('add-user.html')

@app.route('/users/new', methods=["POST"])
def add_user():
    first = request.form['first-name']
    last = request.form['last-name']
    img = request.form['img-url']

    new_user = User(first_name=first, last_name=last, image_url=img)
    db.session.add(new_user)
    db.session.commit()

    return redirect('/users')

@app.route('/users/<int:user_id>', methods=['GET', 'POST'])
def user_page(user_id):
    user = User.query.get_or_404(user_id)
    posts = Post.query.all()

    return render_template('user-details.html', user=user, posts=posts)

@app.route('/users/<int:user_id>/edit')
def edit_user_page(user_id):
    user = User.query.get_or_404(user_id)

    return render_template('edit-user.html', user=user)

@app.route('/users/<int:user_id>/edit', methods=['POST'])
def edit_user(user_id):
    user = User.query.get_or_404(user_id)

    user.first_name = request.form['first-name']
    user.last_name = request.form['last-name']
    user.image_url = request.form['img-url']

    db.session.commit()

    return redirect('/users')

@app.route('/users/<int:user_id>/delete', methods=['POST'])
def delete_user(user_id):
    user = User.query.get_or_404(user_id)

    db.session.delete(user)
    db.session.commit()

    return redirect('/users')

@app.route('/users/<int:user_id>/posts/new')
def add_post_page(user_id):
    user = User.query.get_or_404(user_id)

    return render_template('create-posts.html', user=user)

@app.route('/users/<int:user_id>/posts/new', methods=["POST"])
def add_post(user_id):
    user = User.query.get_or_404(user_id)

    title = request.form['title']
    content = request.form['content']

    new_post = Post(title=title, content=content, user_id=user.id)

    db.session.add(new_post)
    db.session.commit()

    return redirect(f'/users/{user.id}')

@app.route('/posts/<int:post_id>')
def posts_page(post_id):
    post = Post.query.get_or_404(post_id)
    user = User.query.get_or_404(post.user_id)

    return render_template('users-posts.html', user=user, post=post)

@app.route('/posts/<int:post_id>/edit')
def edit_posts_page(post_id):
    post = Post.query.get_or_404(post_id)

    return render_template('edit-posts.html', post=post)

@app.route('/posts/<int:post_id>/edit', methods=['POST'])
def edit_posts(post_id):
    post = Post.query.get_or_404(post_id)

    post.title = request.form['title']
    post.content = request.form['content']

    db.session.commit()

    return redirect(f'/posts/{post.id}')

@app.route('/posts/<int:post_id>/delete', methods=['POST'])
def delete_post(post_id):
    post = Post.query.get_or_404(post_id)

    db.session.delete(post)
    db.session.commit()

    return redirect('/users')
