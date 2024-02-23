var express = require('express');
var router = express.Router();
const CryptoJS = require("crypto-js");
const connection = require(".././lib/conn");
require('dotenv').config();


// Sign up


router.post("/add", (req, res) => {

    let username = req.body.username;
    let encryptedPassword = CryptoJS.AES.encrypt(req.body.password, process.env.SALT_KEY).toString();

    connection.connect((err) => {
        if (err) console.log("Error: ", err);

        let query = "INSERT into users (username, password) VALUES (?, ?)";
        let values = [username, encryptedPassword];

        connection.query(query, values, (err, data) => {
            if (err) {
                console.log("Error", err);
                return res.status(409).json({message: "Username already exists."});
            }

            console.log("User Saved", data.username);
            res.json({userid:data.insertId});
        })

    })

})


// Sign in

router.post("/signin", (req, res) => {
    connection.connect((err) => {
        if (err) console.log("Error: ", err);

        let query = "SELECT * FROM users WHERE username = ?";
        let values = [req.body.username];

        connection.query(query, values, (err, data) => {
            if (err) console.log("Error: ", err);

            if (data.length > 0) {
                let user = data[0];
                let decryptedPassword = CryptoJS.AES.decrypt(user.password, process.env.SALT_KEY).toString(CryptoJS.enc.Utf8);
                
                if (decryptedPassword === req.body.password) {
                    delete user.password;
                    res.json(user);
                } else {
                    res.status(401).json({message: "Sorry, you can't come in."}); // Wrong password
                }
            } else {
                res.status(401).json({message: "Sorry, you can't come in."}); // Wrong username
            }
        });
    });
});

module.exports = router;
