const express = require('express');
const axios = require('axios');
const ExpressError = require('./errors');

const app = express();

app.use(express.json());

/**
 * GET route to fetch GitHub user data based on query string.
 * 
 * @async
 * @function
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @throws {ExpressError}
 */
app.get('/', async function(req, res, next) {
  try {
    if(!req.query.developers) throw new ExpressError('Username required', 403);
    let developerList = req.query.developers;

    if (!Array.isArray(developerList)) {
      developerList = [developerList];
    }

    let developers = await Promise.all(developerList.map(async (d) => {
      try {
        const response = await axios.get(`https://api.github.com/users/${d}`);
        return {success: true, data: response.data};
      } catch (err) {
        return new ExpressError(`Failed to fetch data for ${d}`, 404);
      }
    }));
    
    let devs = developers.filter(d => d.success).map(d => ({name: d.data.name, bio: d.data.bio}));
    let notDevs = developers.filter(d => !d.success);
    let results = [devs, notDevs];
    
    res.json({developers: results});    
  } catch(err) {
    next(err);
  }
});

app.use((req, res, next) => {
  const e = new ExpressError('Page Not Found', 404);
  next(e);
})

app.use((error, req, res, next) => {
  let status = error.status || 500;
  let message = error.msg;

  return res.status(status).json({
      error: {message, status}
  });
})


module.exports = app;