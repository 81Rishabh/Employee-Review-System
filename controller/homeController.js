const Employee = require('../models/employee');

module.exports.home = async function(req , res) {
    res.redirect('/employee');
}