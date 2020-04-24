  
var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var employeeSchema = new mongoose.Schema({
  firstName: String, 
  lastName: String,
  password: String, 
  employeeType: String,
  employeeId: Number,
  username: String
});

employeeSchema.plugin(passportLocalMongoose)

module.exports = mongoose.model("Employee", employeeSchema);