
const express = require('express')
const app = new express()
const mongoose = require('mongoose');
const bodyParser = require('body-parser')


const rateLimit = require('express-rate-limit')
const helmet = require('helmet')
const mongoSanitize = require('express-mongo-sanitize')
const xss = require('xss-clean')
const hpp = require('hpp')
const cors = require('cors');
const router = require('./src/routes/api');


app.use(cors());
app.use(mongoSanitize())
app.use(helmet())
app.use(xss())
app.use(hpp())
app.use(express.json());

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
})
app.use(limiter);

app.use(bodyParser.json())
// let URI = "mongodb://127.0.0.1:27017/task-manager";
// let OPTION = { user: '', pass: '', autoIndex: true };
// mongoose.connect(URI, OPTION)
//     .then(() => {
//         console.log("Connection Success");
//     })
//     .catch((error) => {
//         console.error("Connection Error:", error);
//     });
const URI = "mongodb+srv://delowar:delowar1239@cluster0.c6tjknn.mongodb.net/task-manager";


mongoose.connect(URI, {
    autoIndex: true
})
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });

app.use("/api/v1", router)

//undefind route
app.use("*", (req, res) => {
    res.status(404).json({ status: "Failed", data: "Route Not Found" })
})


module.exports = app