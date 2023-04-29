# Put your app in here.
from flask import Flask, request
import operations as op

app = Flask(__name__)

@app.route('/add')
def add():
    a = int(request.args.get('a'))
    b = int(request.args.get('b'))
    result = op.add(a, b)
    return str(result)

@app.route('/sub')
def sub():
    a = int(request.args.get('a'))
    b = int(request.args.get('b'))
    result = op.sub(a, b)
    return str(result)

@app.route('/mult')
def mult():
    a = int(request.args.get('a'))
    b = int(request.args.get('b'))
    result = op.mult(a, b)
    return str(result)

@app.route('/div')
def div():
    a = int(request.args.get('a'))
    b = int(request.args.get('b'))
    result = op.div(a, b)
    return str(result)