const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String,
        private: false
    },
    userType: {
        type: String,
        enum: ['project_manager', 'team_member', 'team_lead']
    }
});

userSchema.methods.isPasswordMatch = async function (password) {
    const user = this;
    console.log("debug this :", this);
    return password == user.password;
};

module.exports = mongoose.model("User", userSchema)