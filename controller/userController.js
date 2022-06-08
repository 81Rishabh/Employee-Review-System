const Employee = require("../models/employee");


module.exports.signIn = function (req, res) {
  res.render("signIn", { title: "Login" });
};

module.exports.signUp = function (req, res) {
  res.render("signUp", { title: "Register" });
};

// get All employee
module.exports.getEmployee = async function (req, res) {
    try {
      let employees = await Employee
      .find({})
      .populate({  // populate reviews
         path : 'reviews',
         populate : {
           path : 'user'
         }
      });

      res.render('home'  , {title : "Employees" , employees : employees});
  } catch (err) {
      console.log(err);
      return res.status(500).json({message : 'Internal server error'});
  }
}

// creating user
//  if user found redirect them to sign in page
// user not  found create new
module.exports.create = async function (req, res) {
  try {
    const employee = await Employee.findOne({ email: req.body.email });

    // user not found
    // not found create new
    if (!employee) {
      try {
        // creating new user and saving in database
        await Employee.create(req.body);
        req.flash('success' , 'You have successfully registered..');
        return res.redirect("/employee/signIn");
      } catch (err) {
        console.log("error in creating user while signing in....! 👎" , err);
        return res.redirect("back");
      }
    } else {
      // user found
      // Redirect to signin page
      return res.redirect("/employee/signIn");
    }

  } catch (error) {
     return res.redirect("back");
  }
};


// creating session when user gets signing in
module.exports.createSession = function(req,res){
   return res.redirect('/');
}

//  destroy session
module.exports.destroySession = function(req,res , next){
    req.logout(function(err) {
      if (err) { return next(err); }
      res.redirect('/');
    });
}