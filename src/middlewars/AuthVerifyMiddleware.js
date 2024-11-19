

var jwt = require('jsonwebtoken');


module.exports = (req, res, next) => {

    let Token = req.headers['token-key'];

    jwt.verify(Token, "SecretKey123456789", function (err, decoded) {
        if (err) {
            res.status(401).json({ status: "unauthorized" })
        }
        else {
            // Get User Name From Decoded Token & Add With Req Header
            let email = decoded['data'];
            console.log(email)
            req.headers.email = email
            next();
        }
    })


}