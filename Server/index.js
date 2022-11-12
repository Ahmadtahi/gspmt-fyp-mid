const express = require('express');
const httpStatus = require('http-status');
require('./Db/config')
const catchAsync = require('./catchAsync');
const cors = require('cors')
const res = require('express/lib/response');
const User = require('./Db/User');
const Projects = require('./Db/Projects');
const ApiError = require('./Utils/ApiError');
const multer = require('multer');
const fs = require('fs');
const userEmailService = require("./Services/Email");
const { sendMail } = require('./Utils/email.utils');
const { emailVerificationTemplate } = require('./templates/email/email_verification');


const app = express();
app.use(express.json());

// enable cors
app.use(cors());
app.options('*', cors());

const upload = multer({ dest: 'upload/' });

app.post('/register', async (req, resp) => {
    console.log("register req.body :", req.body);
    let newUser = new User(req.body);
    let result = await newUser.save();

    await userEmailService.createNewEmailVerification({
        userId: newUser._id,
    });
    const url = `${process.env.FRONT_END_URL}/VerifyEmail/${newUser._id}`;

    await sendMail({
        from: process.env.EMAIL_USER,
        to: newUser.email,
        subject: "Please Verify Email",
        html: emailVerificationTemplate(url, "Verify Email"),
    });

    resp.send(result)
});

app.post('/login', catchAsync(async (req, resp) => {

    const { email, password } = req.body;
    let user = await User.findOne({ email });

    //let checkPwd = await findUser.isPasswordMatch(password);
    if (!user || !(await user.isPasswordMatch(password))) {
        resp.send({ "code": 401, "message": "Incorrect email or password" });
    }
    user.password = null
    console.log(user);
    resp.send(user)
}));
// verified user
app.patch('/verify/user/:id', catchAsync(async (req, resp) => {

    const { id } = req.params;
    console.log("🚀 ~ file: index.js ~ line 63 ~ app.patch ~ id", id)
    let user = await User.findOneAndUpdate({ _id: id }, req.body, {
        new: true,
    });
    if (!user) {
        return resp.send({ "code": 401, "message": "User not verified." });
    }
    resp.send(user)
}));


/**
 * Project Create
 */
let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        fs.mkdirSync('uploads', { recursive: true })
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        let fileExtension = file.originalname.substring(file.originalname.lastIndexOf('.'), file.originalname.length);
        const fn = file.fieldname + '-' + Date.now() + fileExtension
        cb(null, fn)
        req.body.fileNames = req.body.fileNames && req.body.fileNames.length ? [...req.body.fileNames, fn] : [fn]
    }
});
let uploadStorage = multer({ storage: storage });
let fileName = (fileObj) => {
    return fileObj.originalname.substring(fileObj.originalname.lastIndexOf('.'), fileObj.originalname.length);
}
app.post('/project/create', uploadStorage.any(), async (req, resp) => {

    // console.log(req.body);
    // console.log(req.files);
    // console.log("uc data:", req.files.filter(s => s.fieldname.includes('usecases'))[0].fieldname)

    // let usecasesFile = req.files.filter(s => s.fieldname.includes('usecases'))[0];
    // let ssdsFile = req.files.filter(s => s.fieldname.includes('ssds'))[0];
    // let systemArchitectureFile = req.files.filter(s => s.fieldname.includes('system_architecture'))[0];

    console.log("ProjectData: ", req.body.fileNames);

    let project = new Projects(req.body);
    let result = await project.save();

    resp.send(result);
});

// app.post('/project/files', uploadFile.single("file"), async (req, resp) => {
//     // Upload to s3 takes in bucket name, image file and bucket folder
//     console.log("debug : ",
//         process.env.AWS_BUCKET_NAME,
//         req.file,
//         process.env.S3_FILES,
//     )
//     // const avatar = await uploadToS3(
//     //     process.env.AWS_BUCKET_NAME,
//     //     req.file,
//     //     process.env.S3_FILES
//     // );

//     // if (!avatar.Location) {
//     //     return resp.send({
//     //         msg: 'File could not be uploaded. Please try again.'
//     //     })
//     // }

//     // const url = avatar.Location;

//     return resp.send("Hello")
// })


// Project Update
app.put('/project/update/:id', uploadStorage.any(), async (req, resp) => {

    let projectId = req.params.id;

    // let usecasesFile = req.files.filter(s => s.fieldname.includes('usecases'))[0];
    // let ssdsFile = req.files.filter(s => s.fieldname.includes('ssds'))[0];
    // let systemArchitectureFile = req.files.filter(s => s.fieldname.includes('system_architecture'))[0];

    // let projectData = {
    //     "project_id": req.body.project_id,
    //     "name": req.body.name,
    //     "completion_date": Date.now(),
    //     "manager_name": req.body.manager_name,
    //     "functional_requirements": req.body.functional_requirements,
    //     "scope": req.body.scope,
    //     "usecases": 'uploads/' + usecasesFile.fieldname + '-' + Date.now() + fileName(usecasesFile),
    //     "ssds": 'uploads/' + ssdsFile.fieldname + '-' + Date.now() + fileName(ssdsFile),
    //     "system_architecture": 'uploads/' + systemArchitectureFile.fieldname + '-' + Date.now() + fileName(systemArchitectureFile)
    // }

    let result = await Projects.findOneAndUpdate({ _id: projectId }, req.body);
    // console.log("Update Result: ", result, req.body);

    resp.send(result);
});

// get projects 

app.get('/projects/all', async (req, resp) => {
    var { page, limit, search } = req.query;
    page = parseInt(page) || 1;
    limit = parseInt(limit) || 10;
    var skip = (page - 1) * limit;
    let where = {}
    if (search) {
        // where['name'] = { $regex: search, $options: "i" }
        // where['project_id'] = { $regex: search, $options: "i" }
        where['$or'] = [
            { name: { $regex: search, $options: "i" } },
            { project_id: { $regex: search, $options: "i" } }
        ]
    }

    let result = await Projects.find(where).skip(skip).limit(limit);
    var totalPages, totalCount;
    if (limit > 0) {
        totalCount = await Projects.countDocuments()
        totalPages = Math.ceil(totalCount / limit);
    }

    resp.send({
        projects: result,
        totalPages,
        totalCount
    });
});

// delete projects 
app.post('/project/delete/:id', async (req, resp) => {
    let projectId = req.params.id;
    let result = await Projects.deleteOne({
        _id: projectId
    });

    resp.send(result);
});
// get project 
app.get('/project/:id', async (req, resp) => {
    let projectId = req.params.id;
    let result = await Projects.findOne({
        _id: projectId
    });

    resp.send(result);
});



app.listen(5000, () => {
    console.log("App is listening at port 5000 ")
})
