const Employee = require('../models/employee');

module.exports.home = async function(req , res) {
   return res.redirect('/employee');
}