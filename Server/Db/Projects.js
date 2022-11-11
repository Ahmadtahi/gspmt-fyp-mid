const mongoose = require('mongoose')

const projectSchema = mongoose.Schema({
    project_id: {
        type: String,
    },
    name: {
        type: String,
        required: true
    },
    completion_date: {
        type: Date
    },
    manager_name: {
        type: String
    },
    functional_requirements: {
        type: String
    },
    scope: {
        type: String
    },
    usecases: {
        type: String
    },
    ssds: {
        type: String
    },
    system_architecture: {
        type: String
    }
}, {
    timestamps: true
});



module.exports = mongoose.model("Projects", projectSchema)