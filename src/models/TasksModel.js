const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: { type: String },
    description: { type: String },
    status: { type: String },
    email: { type: String },
    createdDate: { type: Date, default: Date.now },
}, { versionKey: false });

const TasksModel = mongoose.model('tasks', taskSchema);

module.exports = TasksModel