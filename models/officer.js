const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const {ObjectId} = mongoose.Schema;
const officerSchema = new Schema({
    user :{
        type : ObjectId,
        ref: "User",
        required : true
    },
    managing_director : {
        name: {
            type: String,
            required : true
        },
        first_name:{
            type: String,
            required : true
            },
        contact_number:{
            type: Number,
            required : true
        },
        email:{
            type: String,
            required : true
        }
    },
    deputy_managing_director : {
        name: {
            type: String,
            required : true
        },
        first_name:{
            type: String,
            required : true
            },
        contact_number:{
            type: Number,
            required : true
        },
        email:{
            type: String,
            required : true
        }
    },
    object_director : {
        name: {
            type: String,
            required : true
        },
        first_name:{
            type: String,
            required : true
            },
        contact_number:{
            type: Number,
            required : true
        },
        email:{
            type: String,
            required : true
        }
    },
    responsible_fire_protection : {
        name: {
            type: String,
            required : true
        },
        first_name:{
            type: String,
            required : true
            },
        contact_number:{
            type: Number,
            required : true
        },
        email:{
            type: String,
            required : true
        }
    },
    fire_protection_officer : {
        name: {
            type: String,
            required : true
        },
        first_name:{
            type: String,
            required : true
            },
        contact_number:{
            type: Number,
            required : true
        },
        email:{
            type: String,
            required : true
        }
    },
    helpers : {
        number_target:{
            type: Number,
            required : true
        },
        actual_target:{
            type: Number,
            required : true
        },
    },
    
},{timestamps: true});

module.exports = mongoose.model("Officer",officerSchema);
