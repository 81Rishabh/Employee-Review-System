const passport = require('passport');
const LocalStratrgy = require('passport-local').Strategy;
const Employee = require("../models/employee");


passport.use(
    new LocalStratrgy({
        usernameField : 'email',
        passReqToCallback : true
    }, function(req,email , password, done){
        Employee.findOne({email : email} , function(err, user){
            if (err) { 
                return done(err); 
            }

            if (!user || user.password != password) {
                 return done(null, false);
            }
            
            return done(null, user);
          });
    })
)


// serializing tha user to descide which key to kept
passport.serializeUser(function(user , done) {
     done(null , user.id);
});


// deserializing the user from the key in the cookie
passport.deserializeUser(function(id , done){
    Employee.findById(id , function(err, user){
        if(err) {
            console.log('Error in finding user --> passport', err);
            return done(err);
         }
         return done(null , user);
     });
});

// check if user is already authenticated
passport.checkAuthentication = function(req, res,next) {
     // check if user is admin then redirect to admin dashboard
     if(req.isAuthenticated() && req.user.role == 'admin') {
        return res.redirect('/admin/dashboard');
     }
     else if(req.isAuthenticated() && req.user.role == 'employee') {
          //  if user is signed in  , then pass on the request  to the next function(controller's action)
        next();
     }
     else {
        return res.redirect('/employee/signIn');
     }
}


// Check if session is expired
passport.checkSessionExpiration = function(req, res, next) {
     //  if user is signed in  , then pass on the request  to the next function(controller's action)
     if(req.isAuthenticated()) {
        next();
     }
     return res.redirect('/employee/signIn');
}

// set authenticated user 
passport.setAuthenticatedUser = function(req, res, next) {
   if(req.isAuthenticated()) {
        // req.user contains the currently logged in user form the session and sending this to locals form the next view
       res.locals.user = req.user
   }
   next();
}

module.exports = passport;