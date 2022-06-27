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
    role:{
        type:String,
        required : true,
        default : 'user'
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
    },
    about:{
        type:String
    },
    status:{
        type:Boolean,
        default:1 //0=>False 1=>True/Active
    },
},{timestamps: true});

module.exports = mongoose.model("User",userSchema);
