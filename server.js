const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const dotenv = require('dotenv').config();
const sassMiddleware = require('node-sass-middleware');
const db = require('./config/db');
const MongoStore = require('connect-mongo');
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local');
const expressLayouts = require('express-ejs-layouts');
var flash = require('connect-flash');
var flashMiddleware = require('./config/flash-midileware');


// config env file 

// setup scss
// scss midileware
app.use(sassMiddleware({
    /* Options */
    src: './assets/scss'
  , dest: './assets/css'
  , debug : true
  , outputStyle: 'extended'
  , prefix:  '/css'  // Where prefix is at <link rel="stylesheets" href="prefix/style.css"/>
}));

// static files
app.use(express.static('./assets'));

app.use(expressLayouts);

//  setup our ejs templete
app.set('layout' ,'./Layouts/_layout');
app.set('view engine' , 'ejs');
app.set('views' , path.join(__dirname, 'views'));


// setup bodyParser middleware 
app.use(express.urlencoded({extended : false}));


// Establising session
app.use(session({
    name : 'EReview',
    secret : 'hbahsir',
    saveUninitialized : false,
    resave : false,
    cookie : {
        maxAge : (1000 * 60 * 100)
    },
    store :  MongoStore.create({
        mongoUrl : 'mongodb://localhost:27017/users-session', 
        autoRemove : 'disabled'
    })
}));

// configuring passportjs
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

// falsh midileware
app.use(flash());
app.use(flashMiddleware.setFalsh);

// setup our routes
app.use('/' , require('./routes/index'));

app.listen(process.env.port || 3000 , function(err){
    if(err) {
        console.log(`Error is : ${err}`);
        return;
    }
    console.log("Server is running on the port " + this.address().port, app.settings.env);
});
