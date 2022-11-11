const EmailVerification = require("../Models/EmailVerification");

const createNewEmailVerification = async (emailVerification) => {
    try {
        return await EmailVerification.create(emailVerification);
    } catch (error) {
        console.error(error);
    }
};

module.exports = {
    createNewEmailVerification
}