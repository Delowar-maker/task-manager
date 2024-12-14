const express = require('express');

const router = express.Router();
const UserController = require('../controllers/UserController');
const AuthVerifyMiddleware = require('../middlewars/AuthVerifyMiddleware');
const TaskController = require('../controllers/TaskController');

// user Profile
router.post("/registration", UserController.registration)
router.post("/login", UserController.login)
router.post("/profileUpdate", AuthVerifyMiddleware, UserController.profileUpdate)

// User Tasks
router.post("/createTask", AuthVerifyMiddleware, TaskController.createTask)
router.get("/updateTaskStatus/:id/:status", AuthVerifyMiddleware, TaskController.updateTaskStatus)
router.get("/listTaskByStatus/:status", AuthVerifyMiddleware, TaskController.listTaskByStatus)
router.get("/taskStatusCount", AuthVerifyMiddleware, TaskController.taskStatusCount)
router.get("/deleteTask/:id", AuthVerifyMiddleware, TaskController.deleteTask)



module.exports = router
