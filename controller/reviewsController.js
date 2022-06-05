
const Employee = require("../models/employee");
const Reviews = require("../models/feed");

// controller for Add Review seperatly
module.exports.getEmployeeReviews = async function (req, res) {
  const ID = req.params.id;
  const editable = req.query.isEditable;

  try {
    let employees = await Employee.findById(ID).populate("reviews");

    // fetch reviews where the review_id coming from req.query.review_id
    let feed = await Reviews.findById(req.query.review_id);

    res.render("reviews", {
         title: "home", 
          employees,
          editable,
          feed 
    });
  } catch (err) {
    return res.status(500).json({ message: "Internal server error" });
  }
};


// controller for Edit Reviews
module.exports.editReview = async function(req, res) {
    const {id} = req.params;

    try {
        await Reviews.findByIdAndUpdate(id , {review : req.body.review});
        return res.redirect('back');
    } catch (err) {
        return res.status(500).json({ message: "Internal server error" });
      }
}

// controller for delete reviews
module.exports.deleteReview = async function deleteReview(req, res) {
    const {id} = req.params;
    const {review_id} = req.query;

    try {
        await Reviews.findByIdAndDelete(review_id); 
        return res.redirect('/admin/dashboard/reviews/' + id);
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
}