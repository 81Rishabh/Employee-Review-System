const Employee = require("../models/employee");
const Feed = require("../models/feed");



module.exports.createFeed = async function (req, res) {
  try {
    // awaiting to finding employee  
    let employe = await Employee.findOne({ _id: req.params.employe_id });
  
    // if employe does't not exits
    if (!employe) {
      console.log("Error in finding employee...", err);
      return res.redirect("back");
    }
    
    // creating new feed
    let newFeed = await Feed.create({
      review: req.body.feedback,
      emp_id : req.params.employe_id,
      user: req.user,
    });
    
    // push newFeed to employee reviews
    employe.reviews.push(newFeed);
    employe.save();
    return res.redirect("back");

} catch (error) {
    console.log(error);
    return res.redirect("back");
  }
};
