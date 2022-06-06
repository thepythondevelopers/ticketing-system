const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const sidebarSchema = new Schema({
    title:{
        type:String,
        required : true,
        trim : true
    }
},{timstamps: true});

module.exports = mongoose.model("Sidebar",sidebarSchema);
