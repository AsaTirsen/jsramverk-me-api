const express = require("express");
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require("body-parser");
const index = require('./routes/index');
const reports = require('./routes/reports');
const register = require('./routes/register');
const login = require('./routes/login');



const port = 1337;
const app = express();

app.use(cors());
app.use(express.json());

app.use('/', index);
app.use('/reports', reports);
app.use('/register', register);
app.use('/login', login);

app.use((req, res, next) => {
    next();
});



// don't show the log when it is test
if (process.env.NODE_ENV !== 'test') {
    // use morgan to log at command line
    app.use(morgan('combined')); // 'combined' outputs the Apache style LOGs
}

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded




// Start up server
const server = app.listen(port, () => console.log(`Example API listening on port ${port}!`));
// Add routes for 404 and error handling
// Catch 404 and forward to error handler


//Put this last
app.use((req, res, next) => {
    let err = new Error("Not Found");

    err.status = 404;
    next(err);
});
module.exports = server;


