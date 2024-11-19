const TasksModel = require("../models/TasksModel");

exports.createTask = (req, res) => {
    let reqBody = req.body;
    reqBody.email = req.headers['email'];

    TasksModel.create(reqBody)
        .then(data => {
            res.status(200).json({ status: "success", data: data });
        })
        .catch(err => {
            res.status(400).json({ status: "fail", data: err });
        });
};
exports.deleteTask = (req, res) => {
    let id = req.params.id;
    let query = { _id: id };

    TasksModel.remove(query)
        .then(data => {
            res.status(200).json({ status: "success", data: data });
        })
        .catch(err => {
            res.status(400).json({ status: "fail", data: err });
        });
};
exports.updateTaskStatus = (req, res) => {
    let id = req.params.id;
    let status = req.params.status;
    let query = { _id: id };
    let reqBody = { status: status };

    TasksModel.updateOne(query, reqBody)
        .then(data => {
            res.status(200).json({ status: "success", data: data });
        })
        .catch(err => {
            res.status(400).json({ status: "fail", data: err });
        });
};


exports.listTaskByStatus = (req, res) => {
    let status = req.params.status;
    let email = req.headers['email'];

    TasksModel.aggregate([
        { $match: { status: status, email: email } },
        {
            $project: {
                _id: 1,
                title: 1,
                description: 1,
                status: 1,
                createdDate: {
                    $dateToString: {
                        date: "$createdDate",
                        format: "%d-%m-%Y"
                    }
                }
            }
        }
    ])
        .then(data => {
            res.status(200).json({ status: "success", data: data });
        })
        .catch(err => {
            res.status(400).json({ status: "fail", data: err });
        });
};


exports.taskStatusCount = (req, res) => {
    let email = req.headers['email'];

    TasksModel.aggregate([
        { $match: { email: email } },
        { $group: { _id: "$status", sum: { $count: {} } } }
    ])
        .then(data => {
            res.status(200).json({ status: "success", data: data });
        })
        .catch(err => {
            res.status(400).json({ status: "fail", data: err });
        });
};
