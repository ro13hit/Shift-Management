const mongoose = require("mongoose")
const {ObjectId} = mongoose.Schema

var employeeSchema = new mongoose.Schema({
    empId:{
        type: Number,
        required: true,
        trim: true,
        maxlength: 4,
        unique: true
    },
    name: {
        type: String,
        required: true,
        trim: true,
        maxlength: 40
    },
    Manager: {
        type: ObjectId,
        ref: "Manager",
        required: true
    },
    Location: {
        type: String,
        required: true,
        trim: true,
        maxlength:30
    },
    Project: {
        type: String,
        required: true,
        trim: true,
    },
    Gender: {
        type: String,
        required: true,
        trim: true
    },
    Start: {
        type:  Date,
        required: true,
    },
    Recurring: {
        type: String,
        required: true,
        trim: true
    },
    End: {
        type: Date,
        required: true
    }

},
    {timestamps: true}
)


module.exports = mongoose.model("Employee", employeeSchema);