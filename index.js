var express = require('express');
var port = 8000;
const cookieParser = require('cookie-parser');
const app = express();

const db = require('./config/mongoose');

//used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');

//set up the view engine
app.set('view engine', 'ejs');
app.set('views','./views');

//middleware     
app.use(express.urlencoded());
app.use(express.static('assets'));

//middleware -> helps in creating the session and encrypts the userid into the cookie.
app.use(session({
    name: 'projectmine',
    secret: 'blah-blah',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

app.use('/', require('./routes'));


app.listen(port,function(err){
    if(err){
        console.log('error in running the server on the port:',port);
        }
    console.log(`Server is running on port ${port}`);
});