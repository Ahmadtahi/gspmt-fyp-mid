const multer = require("multer");
const storage = multer.memoryStorage();

const uploadFile = multer({
    // fileFilter: simageFilter,
    limits: {
        fileSize: 31457280, //30MB
    },
    storage: storage,
});

module.exports = {
    uploadFile,
};