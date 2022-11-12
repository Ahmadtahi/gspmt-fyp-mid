var aws = require("aws-sdk");
const { v4: uuidv4 } = require("uuid");
const { promisify } = require("util");

const s3bucket = new aws.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
});

const uploadPicture = promisify(s3bucket.upload).bind(s3bucket);
const removePicture = promisify(s3bucket.deleteObjects).bind(s3bucket);

// This function includes configuration for uploading doc directly to aws bucket usimg access keys
async function uploadToS3(bucketName, file, folderName) {
    let newFileName = file.originalname.split(".");

    // Here we are concatinating file name with universal number using uuid
    newFileName = folderName + uuidv4() + "." + newFileName[newFileName.length - 1];

    const params = {
        Bucket: bucketName,
        Key: newFileName,
        Body: file.buffer,
        ContentType: file.mimetype,
        // ACL: "public-read",
    };

    return await uploadPicture(params);
}

// This function includes configuration for removing doc directly from aws bucket usimg access keys
async function removeFromS3(bucketName, keys) {
    const params = {
        Bucket: bucketName,
        Delete: {
            Objects: keys,
            Quiet: false,
        },
    };
    return await removePicture(params);
}

module.exports = {
    uploadToS3: uploadToS3,
    removeFromS3: removeFromS3,
    s3bucket: s3bucket,
};
