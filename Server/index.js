const express= require('express');
const httpStatus = require('http-status');
require('./Db/config')
const catchAsync = require('./catchAsync');
const cors = require('cors')
const res = require('express/lib/response');
const User = require('./Db/User');
const Projects = require('./Db/Projects');
const ApiError = require('./Utils/ApiError');
const multer  = require('multer');
const fs = require('fs');


const app= express();
app.use(express.json());

// enable cors
app.use(cors());
app.options('*', cors());

const upload = multer({ dest: 'upload/' });

app.post('/register', async (req,resp) => {
    console.log(req.body);
    let newUser = new User(req.body);
    let result = await newUser.save();
    resp.send(result)
});

app.post('/login', catchAsync( async (req,resp) => {

    const {email, password} = req.body;
    let user = await User.findOne({ email });

    //let checkPwd = await findUser.isPasswordMatch(password);

    if (!user || !(await user.isPasswordMatch(password))) {
        resp.send({"code" : 401, "message": "Incorrect email or password"});
    }
    
    console.log(user);
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
        cb(null, file.fieldname + '-' + Date.now() + fileExtension)
    }
});
let uploadStorage = multer({ storage: storage });
let fileName = (fileObj) => {
    return fileObj.originalname.substring(fileObj.originalname.lastIndexOf('.'), fileObj.originalname.length);
}
app.post('/project/create', uploadStorage.any(), async (req,resp) => {

    console.log(req.body);
    console.log(req.files);
    console.log("uc data:" , req.files.filter(s => s.fieldname.includes('usecases'))[0].fieldname)

    let usecasesFile = req.files.filter(s => s.fieldname.includes('usecases'))[0];
    let ssdsFile = req.files.filter(s => s.fieldname.includes('ssds'))[0];
    let systemArchitectureFile = req.files.filter(s => s.fieldname.includes('system_architecture'))[0];

    let projectData = {
        "project_id": req.body.project_id,
        "name" : req.body.name,
        "completion_date": Date.now(),
        "manager_name": req.body.manager_name,
        "functional_requirements": req.body.functional_requirements,
        "scope": req.body.scope,
        "usecases": 'uploads/' + usecasesFile.fieldname + '-' + Date.now() + fileName(usecasesFile),
        "ssds": 'uploads/' + ssdsFile.fieldname + '-' + Date.now() + fileName(ssdsFile),
        "system_architecture": 'uploads/' + systemArchitectureFile.fieldname + '-' + Date.now() + fileName(systemArchitectureFile)
    }
    
    console.log("ProjectData: ", projectData);

    let project = new Projects(projectData);
    let result = await project.save();
    
    resp.send(result);
});

// Project Update
app.put('/project/update/:id', uploadStorage.any(), async (req,resp) => {

    let projectId = req.params.id;

    let usecasesFile = req.files.filter(s => s.fieldname.includes('usecases'))[0];
    let ssdsFile = req.files.filter(s => s.fieldname.includes('ssds'))[0];
    let systemArchitectureFile = req.files.filter(s => s.fieldname.includes('system_architecture'))[0];

    let projectData = {
        "project_id": req.body.project_id,
        "name" : req.body.name,
        "completion_date": Date.now(),
        "manager_name": req.body.manager_name,
        "functional_requirements": req.body.functional_requirements,
        "scope": req.body.scope,
        "usecases": 'uploads/' + usecasesFile.fieldname + '-' + Date.now() + fileName(usecasesFile),
        "ssds": 'uploads/' + ssdsFile.fieldname + '-' + Date.now() + fileName(ssdsFile),
        "system_architecture": 'uploads/' + systemArchitectureFile.fieldname + '-' + Date.now() + fileName(systemArchitectureFile)
    }

    let result = await Projects.findOneAndReplace({projectId}, projectData);
    
    console.log("Update Result: ", result);
    resp.send(result);
});



app.listen(5000)