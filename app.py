"""Blogly application."""

from flask import Flask, request, render_template, redirect, session
from flask_debugtoolbar import DebugToolbarExtension
from models import db, connect_db, User, Post, Tag, PostTag
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
    tags = Tag.query.all()

    return render_template('create-posts.html', user=user, tags=tags)

@app.route('/users/<int:user_id>/posts/new', methods=["POST"])
def add_post(user_id):
    user = User.query.get_or_404(user_id)

    title = request.form['title']
    content = request.form['content']
    tag_ids = request.form.getlist('tags')

    new_post = Post(title=title, content=content, user_id=user.id)

    db.session.add(new_post)
    db.session.commit()

    for tag_id in tag_ids:
        post_tag = PostTag(post_id=new_post.id, tag_id=int(tag_id))

        db.session.add(post_tag)
        
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
    tags = Tag.query.all()

    return render_template('edit-posts.html', post=post, tags=tags)

@app.route('/posts/<int:post_id>/edit', methods=['POST'])
def edit_posts(post_id):
    post = Post.query.get_or_404(post_id)

    post.title = request.form['title']
    post.content = request.form['content']
    new_tag_ids = [int(id) for id in request.form.getlist('tags')]

    PostTag.query.filter_by(post_id=post_id).delete(synchronize_session='fetch')
    
    for tag_id in new_tag_ids:
        db.session.add(PostTag(post_id=post_id, tag_id=tag_id))

    db.session.commit() 

    return redirect(f'/posts/{post.id}')

@app.route('/posts/<int:post_id>/delete', methods=['POST'])
def delete_post(post_id):
    post = Post.query.get_or_404(post_id)

    db.session.delete(post)
    db.session.commit()

    return redirect('/users')

@app.route('/tags')
def show_tags():
    tags = Tag.query.all()

    return render_template('tags.html', tags=tags)

@app.route('/tags/new')
def create_tag_page():
    return render_template('create-tags.html')

@app.route('/tags/new', methods=['POST'])
def create_tag():
    name = request.form['name']

    new_tag = Tag(name=name)

    db.session.add(new_tag)
    db.session.commit()

    return redirect('/tags')

@app.route('/tags/<int:tag_id>/edit')
def edit_tag_page(tag_id):
    tag = Tag.query.get_or_404(tag_id)

    return render_template('edit-tags.html', tag=tag)

@app.route('/tags/<int:tag_id>/edit', methods=['POST'])
def edit_tag(tag_id):
    tag = Tag.query.get_or_404(tag_id)
    
    tag.name = request.form['name']

    db.session.commit()

    return redirect('/tags')

@app.route('/tags/<int:tag_id>')
def posts_with_tag(tag_id):
    tag = Tag.query.get_or_404(tag_id)

    return render_template('tagged-posts.html', tag=tag)

@app.route('/tags/<int:tag_id>/delete', methods=['POST'])
def delete_tag(tag_id):
    tag = Tag.query.get_or_404(tag_id)

    db.session.delete(tag)
    db.session.commit()

    return redirect('/tags')