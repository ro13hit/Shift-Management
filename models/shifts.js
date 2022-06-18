const mongoose = require("mongoose")
const {ObjectId} = mongoose.Schema


var shiftsSchema = new mongoose.Schema({
    empId:{
        type:Number,
        required: true,
        maxlength: 4,
        trim: true
    },
    name: {
        type: String,
        required: true,
        trim: true,
        maxlength: 40
    },
    Manager: {
        type: ObjectId,
        references: "Manager",
        required: true
    },
    Start: {
        type: Date,
        required: true
    },
    End: {
        type: Date,
        required: true
    }
},
    {timestamps: true}
) 


module.exports = mongoose.model("Shifts",shiftsSchema);