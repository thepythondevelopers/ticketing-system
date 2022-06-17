const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    first_name:{
        type:String,
        required : true,
        trim : true,
    },
    last_name:{
        type:String,
        required : true,
        trim : true,
    },
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
    },
    company_name:{
        type:String,
        required : true,
        trim : true
    },
    phone_number:{
        type:Number,
        required : true,
        trim : true
    },
    street:{
        type:String,
        required : true,
        trim : true
    },
    house_number:{
        type:String,
        required : true,
        trim : true
    },
    password_reset_token:{
        type:String,
        trim : true
    }
},{timstamps: true});

module.exports = mongoose.model("User",userSchema);
