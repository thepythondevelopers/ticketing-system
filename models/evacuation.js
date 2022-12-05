const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const {ObjectId} = mongoose.Schema;
const evacuationSchema = new Schema({
    user :{
        type : ObjectId,
        ref: "User",
        required : true
    },
    location:{
        type : ObjectId,
        ref: "Location",
        required : true
    },
    evacuation_nr: {
        type: String
    },
    date: {
        type: Date
    },
    general: {
        location: {
            type: String
        },
        state: {
            type: String
        },
        zip_code: {
            type: String
        },
        base_area: {
            type: String
        },
        employees: {
            type: String
        },
        floors: {
            type: String
        },
        fire_alarm_system: {
            type: String
        },
        evacuation_helper: {
            type: String
        },
        exercise_announced: {
            type: String
        },
        exercise_with_frog:{
            type: String
        }
    },
    procedure: {
        advance_information: {
            type: Array
        },
        assumed_situation: {
            type: Array
        },
        no_of_excercise_observation: {
            type: String
        }
    },
    evacuation_time: {
        fire_origin:{
            target: {
                type: String
            },
            act: {
                type: String
            }
        },
        fire_detection:{
            target: {
                type: String
            },
            act: {
                type: String
            }
        },
        fire_discovery:{
            target: {
                type: String
            },
            act: {
                type: String
            }
        },
        fire:{
            target: {
                type: String
            },
            act: {
                type: String
            }
        },
        alarm:{
            target: {
                type: String
            },
            act: {
                type: String
            }
        },
        evacuated:{
            target: {
                type: String
            },
            act: {
                type: String
            }
        },
    },
    deficiency: [
        {
        title: {
            type: String,
            required : true
        },
        description: {
            type: String,
            required : true
        }
        }
    ]
    
},{timestamps: true});

module.exports = mongoose.model("Evacuation",evacuationSchema);
