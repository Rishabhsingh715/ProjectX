var express = require('express');
var port = 8000;
const cookieParser = require('cookie-parser');
const app = express();

//layouts
const expressLayouts = require('express-ejs-layouts');
app.use(expressLayouts);

//extract style and scripts from subpages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);



const db = require('./config/mongoose');

//used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const passportJWT = require('./config/passport-jwt-strategy')
const passportGoogle = require('./config/passport-google-oauth2-strategy');


const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const customMware = require('./config/middleware');


//set up the view engine
app.set('view engine', 'ejs');
app.set('views','./views');

//middleware     
app.use(express.urlencoded());
app.use(express.static('./assets'));
//makes the upload path available to the browser.
app.use('/uploads',express.static(__dirname+'/uploads'));

//middleware -> helps in creating the session and encrypts the userid into the cookie.
app.use(session({
    name: 'projectmine',
    secret: 'blah-blah',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store: MongoStore.create({
        mongoUrl:'mongodb://localhost/projectx_db',
        autoRemove: 'disabled'
    },function(err){
        console.log(err || 'connect-mongo setup OK');
    })

}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);
app.use(flash());
app.use(customMware.setFlash);

// This is just an example of another middelware function here to show that if we don't have any route attached
// to the middleware function then it is going to load for every request.
// app.use(function(req,res,next){
//     console.log('i am super cool');
//     next();
// })

app.use('/', require('./routes'));


app.listen(port,function(err){
    if(err){
        console.log('error in running the server on the port:',port);
        }
    console.log(`Server is running on port ${port}`);
});