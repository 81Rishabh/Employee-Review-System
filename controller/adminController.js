const Employee = require("../models/employee");
const Reviews = require("../models/feed");

//  controller for dashboard
module.exports.dashboard = async function (req, res) {
  const ID = req.params.id;
  const {isEditable} = req.query;

  if (!req.isAuthenticated()) {
    return res.redirect("/employee/signIn");
  } else {
    try {
      let employee = await Employee.find({});
      let employeeDetails = await Employee.findOne({_id : ID});
  
      res.render("admin-dashboard", {
        title: "Admin|dashboard",
        employee,
        employeeDetails,
        isEditable
      });
    } catch (err) {
      return res.status(500).json({ message: "Internal server error" });
    }
  }
};

// controller for creating employee
module.exports.createEmployee = async function (req, res) {
  try {
    let emp = await Employee.create({...req.body , role : 'employee'});
    req.flash('success' , 'created successfully');
    return res.redirect("back");
  } catch (error) {
    return res.redirect("back");
  }
};

// controller for edit employe
module.exports.editEmployee = async function(req, res) {
  const {name , email , role} = req.body;
    try {
       await Employee.findByIdAndUpdate(req.params.id , {
         name,
         email,
         role,
       });
       req.flash('success' , 'Updated successfully');
       return res.redirect('/admin/dashboard');
    } catch (error) {
      console.log("Error n updating the employee.." , error);
      return res.redirect('back');
    }
}

// controller for Delete employee
module.exports.deleteEmployee = async function (req, res) {
  const ID = req.params.id;

  try {
    let employee = await Employee.findById(ID);
    
    if (!employee) {
      console.log("error in deleting employee", error);
      return res.redirect("back");
    }
    
    req.flash('success' , 'Deleted successfully');
    // delete reviews that associated with employee
     await Reviews.deleteMany({emp_id : ID});
  
    // remove Employee
    employee.remove();

    return res.redirect("back");
  } catch (error) {
    console.log("error in deleting", error);
    return res.redirect("back");
  }
};

