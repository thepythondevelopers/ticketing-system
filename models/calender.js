const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const {ObjectId} = mongoose.Schema;
const calenderSchema = new Schema({
    startDate:{
        type:Date,
        required : true,
        trim : true
    },
    endDate:{
        type:Date,
        required : true,
        trim : true
    },
    title:{
        type:String,
        required : true,
        trim : true
    },
    notes:{
        type:String,
        required : true,
        trim : true
    },
    user :{
        type : ObjectId,
        ref: "User",
        required : true
    }
},{timestamps: true});

module.exports = mongoose.model("Calender",calenderSchema);
