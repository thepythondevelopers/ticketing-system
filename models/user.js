const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email:{
        type:String,
        required : true,
        trim : true,
        unique: true
    },
    password:{
        type:String,
        required : true,
        trim : true
    }
},{timstamps: true});

module.exports = mongoose.model("User",userSchema);
