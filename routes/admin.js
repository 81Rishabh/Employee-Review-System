const express = require("express");
const router = express.Router();
const adminController = require("../controller/adminController");
const reviewController = require("../controller/reviewsController");


router.get("/dashboard", adminController.dashboard);
router.get("/dashboard/:id", adminController.dashboard);



// route defined for deleting perticular employee
router.get('/deleteEmploye/:id' , adminController.deleteEmployee);

// route defined for fetch  reviews associated with perticular emp_id
router.get('/dashboard/reviews/:id' , reviewController.getEmployeeReviews);

// route defined for deleting perticular review
router.get('/dashboard/reviews/delete/:id' , reviewController.deleteReview);

router.post("/createEmployee", adminController.createEmployee);

// route defined for edit perticular employe
router.post("/editEmployee/:id" , adminController.editEmployee);

// route defined for edit perticular review
router.post('/editReview/:id' , reviewController.editReview);
module.exports = router;