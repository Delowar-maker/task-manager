const UserModel = require("../models/UsersModel");

exports.registration = (req, res) => {
    let reqBody = req.body;
    UserModel.create(reqBody)
        .then(data => {
            res.status(200).json({ status: "ok", data: data })
        })
        .catch(err => {
            res.status(500).json({ status: "error", data: err })
        })
}