const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const {ObjectId} = mongoose.Schema;
const sidebarSchema = new Schema({
    title:{
        type:String,
        required : true,
        trim : true
    },
    user :{
        type : ObjectId,
        ref: "User",
        required : true
    }
},{timstamps: true});

module.exports = mongoose.model("Sidebar",sidebarSchema);
