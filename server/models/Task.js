const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },

    description: {
        type: String
    },

    dueDate: {
        type: Date
    },

    priority: {
        type: String,
        default: "Medium"
    },

    status: {
        type: String,
        default: "Pending"
    }
});

module.exports = mongoose.model("Task", taskSchema);