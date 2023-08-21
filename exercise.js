const express = require('express');
const ExpressError = require('./errors');

const app = express();
app.use(express.json());

app.get('/mean', (req, res, next) => {
    try {
        if (!req.query.nums) throw new ExpressError('nums are required', 400);
        const nums = req.query.nums.split(',').map(Number);

        let total = 0;
        for(let num of nums){
            if(isNaN(num)) throw new ExpressError(`${num} is not a number`, 400);
            total += num;
        }
        return res.json(`Mean for ${nums} is ${total/nums.length}.`);
    } catch(err) {
        next(err);
    }
})

app.get('/median', (req, res, next) => {
    try {
        if (!req.query.nums) throw new ExpressError('nums are required', 400);
        const nums = req.query.nums.split(',').map(Number);

        for(let num of nums){
            if(isNaN(num)) throw new ExpressError(`${num} is not a number`, 400);
        }

        let sortedNums = nums.sort((a, b) => a - b);
        let median; 
        const middleIndex = Math.floor(sortedNums.length/2);

        if(sortedNums.length % 2 === 0){
            median = (sortedNums[middleIndex - 1] + sortedNums[middleIndex]) / 2;
        } else {
            median = sortedNums[middleIndex];
        }

        return res.json(`Median for ${nums} is ${median}.`);
    } catch(err) {
        next(err);
    }
})

app.get('/mode', (req, res, next) => {
    try {
        if (!req.query.nums) throw new ExpressError('nums are required', 400);
        const nums = req.query.nums.split(',').map(Number);
        let modeObj = {};
        let mode = [];

        for(let num of nums){
            if(isNaN(num)) throw new ExpressError(`${num} is not a number`, 400);

            if(modeObj[num]){
                modeObj[num] ++;
            } else {
                modeObj[num] = 1;
            }
        }

        let sortedObj = Object.values(modeObj).sort((a, b) => b - a);
        const highestFrequency = sortedObj[0];

        for(const [num, frequency] of Object.entries(modeObj)){
            if(frequency === highestFrequency){
                mode.push(num);
            }
        }

        const uniqueFrequencies = new Set(Object.values(modeObj));
        if(uniqueFrequencies.size === 1){
            return res.json(`No mode for ${nums}.`);
        }
        
        return res.json(`Mode for ${nums} is ${mode}.`);
    } catch(err) {
        next(err);
    }
})

app.use((req, res, next) => {
    const err = new ExpressError('Page Not Found', 404)
    next(err);
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

module.exports = app;