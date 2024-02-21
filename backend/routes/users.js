var express = require('express');
var router = express.Router();
const CryptoJS = require("crypto-js");
const connection = require(".././lib/conn");

// Add user


router.post("/add", (req, res) => {

    let username = req.body.username;
    let encryptedPassword = CryptoJS.AES.encrypt(req.body.password, process.env.SALT_KEY).toString();

    connection.connect((err) => {
        if (err) console.log("Error: ", err);

        let query = "INSERT into users (username, password) VALUES (?, ?)";
        let values = [username, encryptedPassword];

        connection.query(query, values, (err, data) => {
            if (err) console.log("Error", err);

            console.log("User Saved", data.username);
            res.json({message: "User saved"})
        })

    })


})


// Sign in

module.exports = router;
