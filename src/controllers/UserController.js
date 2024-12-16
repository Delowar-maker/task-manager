const express = require("express");
const jwt = require('jsonwebtoken');
const UserModel = require("../models/UsersModel");

exports.registration = (req, res) => {
    let reqBody = req.body;
    UserModel.create(reqBody)
        .then(data => {
            res.status(200).json({ status: "ok", data: data })
        })
        .catch(err => {
            res.status(200).json({ status: "error", data: err })
        })
}

// Ensure jwt is imported

exports.login = (req, res) => {
    let reqBody = req.body;

    UserModel.aggregate([
        { $match: reqBody },
        { $project: { _id: 0, email: 1, firstName: 1, lastName: 1, mobile: 1, photo: 1 } }
    ])
        .then(data => {
            if (data.length > 0) {
                let payload = { exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60), data: data[0]['email'] };
                let token = jwt.sign(payload, 'SecretKey123456789');
                res.status(200).json({ status: "success", token: token, data: data[0] });
            } else {
                res.status(401).json({ status: "unauthorized" });
            }
        })
        .catch(err => {
            res.status(400).json({ status: "fail", data: err });
        });
};


exports.profileUpdate = (req, res) => {
    let email = req.headers['email'];
    let reqBody = req.body;

    UserModel.updateOne({ email: email }, reqBody)
        .then(data => {
            res.status(200).json({ status: "success", data: data });
        })
        .catch(err => {
            res.status(400).json({ status: "fail", data: err });
        });
};


exports.profileDetails = (req, res) => {
    const email = req.headers['email'];
    
    UsersModel.aggregate([
        { $match: { email: email } },
        { $project: { _id: 1, email: 1, firstName: 1, lastName: 1, mobile: 1, photo: 1, password: 1 } }
    ])
    .then((data) => {
        res.status(200).json({ status: "success", data: data });
    })
    .catch((err) => {
        res.status(400).json({ status: "fail", data: err });
    });
};
