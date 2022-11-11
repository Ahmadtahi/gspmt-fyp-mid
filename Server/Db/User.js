const mongoose= require('mongoose')

const userSchema = mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    password : { 
        type: String,
        private: false
    }
});

userSchema.methods.isPasswordMatch = async function (password) {
    const user = this;
    console.log(this);
    return password == user.password;
};

module.exports = mongoose.model("User", userSchema)