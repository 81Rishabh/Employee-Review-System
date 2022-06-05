const mongoose = require("mongoose");

const feedBackSchema = mongoose.Schema({
  review: { type: String },
  emp_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
  },
});

const Feedback = mongoose.model("Feed", feedBackSchema);
module.exports = Feedback;
