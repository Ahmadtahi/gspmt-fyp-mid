const mongoose= require('mongoose')

const projectSchema = mongoose.Schema({
    project_id: {
        type: String
    },
    name: {
        type: String
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
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});



module.exports = mongoose.model("Projects", projectSchema)