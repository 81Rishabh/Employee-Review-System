const mongoose = require("mongoose");

const EmployeeSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    conformPassword: {
      type: String,
    },
    role: {
      type: String,
      enum: ["employee", "admin"],
      required: true,
    },
    reviews: [{
      type : mongoose.Schema.Types.ObjectId,
      ref : 'Feed'
    }]
  },
  {
    timestamps: true,
  }
);

const Employee = mongoose.model("Employee", EmployeeSchema);
module.exports = Employee;
