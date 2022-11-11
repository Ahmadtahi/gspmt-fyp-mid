const mongoose = require('mongoose')
require("dotenv").config();

mongoose.connect('mongodb+srv://Ahmadtahir:autogenerate@cluster0.u4lqjls.mongodb.net/?retryWrites=true&w=majority')
    .then(
        (connection) => { console.log(" database is connected: ", !!connection) },
        err => { console.log("debug err : ", !!err) }
    );