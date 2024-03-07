const { default: mongoose } = require("mongoose");

const userSchema = mongoose.Schema({
    firstName:{type:String, require:true},
    lastName:{type:String, require:true},
    email:{type:String, require:true},
    password:{type:String, require:true},
},{timestamps:true});


const userModel1 = new mongoose.model("userModel1",userSchema)

module.exports = {userModel1}