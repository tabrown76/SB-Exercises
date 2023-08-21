const express = require('express');
const ExpressError = require('./errors');

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use((req, res, next) => {
    console.log('This happens before every request.');
    next();
})

app.get('/', (req, res) => {
    res.send('Homepage...')
})

app.get('/search', (req, res) => {
    const {term, sort} = req.query;
    res.send(`Term: ${term}, Sort: ${sort}`);
})

app.get('/show-me-headers', (req, res) => {
    console.log(req.headers)
    res.send(req.headers)
})

app.get('/show-language', (req, res) => {
    const lang = req.headers['accept-language'];
    res.send(`Language: ${lang}`);
})

app.post('/register', (req, res) => {
    res.send(`Welcom, ${req.body.username}!`);
})

app.get('/chickens', (req, res) => {
    res.send('Bock..')
})

app.post('/chickens', function createChicken(req, res) {
    res.send('Chickens, yay...')
})

app.get('/candies', (req, res) => {
    res.json(CANDIES);
})

app.post('/candies', (req, res) => {
    if (req.body.name.toLowerCase() == 'circus peanuts'){
        res.status(403).json({msg: 'Try again.'});
    }
    CANDIES.pus(req.body);
    res.status(201).json(CANDIES);
})

app.get('/user/:username', (req, res, next) => {
    try {
        const user = Users.find(u => u.username === req.params.username);
        if(!user) throw new ExpressError('invalid username', 404);
        res.send({user});
    } catch(err) {
        next(err);
    }
    
})

app.get('/dogs', (req, res) => {
    console.log('You asked for /dogs.');
    res.send('<h1>Woof...</h1>');
})

app.use((req, res, next) => {
    const e = new ExpressError('Page Not Found', 404)
    next(e);
})

app.use((error, req, res, next) => {
    let status = error.status || 500;
    let message = error.msg;

    return res.status(status).json({
        error: {message, status}
    });
})

app.listen(3000, () => {
    console.log('App on port 3000');
})