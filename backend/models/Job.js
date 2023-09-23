const mongoose = require("mongoose");
const JobSchema = mongoose.Schema({
    language: {
        type: String,
        required: true,
        enum: ["cpp", "py"]
    },
    filepath: {
        type: String,
        required: true
    },
    submittedAt: {
        type: Date,
        default: Date.now
    },
    completedAt: {
        type: Date,
    },
    status: {
        type: String,
        default: "pending",
        enum: ["pending", "success"]
    }
})

const Job = new mongoose.model("job", JobSchema)
module.exports = Job;