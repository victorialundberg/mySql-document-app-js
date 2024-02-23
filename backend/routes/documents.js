var express = require('express');
var router = express.Router();
const connection = require(".././lib/conn");
require('dotenv').config();

// Create document

router.post("/add", (req, res) => {

    let title = req.body.title;
    let userid = req.body.userid;

    connection.connect((err) => {
        if (err) console.log("Error: ", err);

        let query = "INSERT into documents (title, userid) VALUES (?, ?)";
        let values = [title, userid];

        connection.query(query, values, (err, data) => {
            if (err) console.log("Error", err);

            console.log("Document Saved", data);
            res.json(data);
        })

    })

})

// Read one document

router.post("/read", (req, res) => {

    let document = {
        documentid: req.body.documentid
    }

    connection.connect((err) => {
        if (err) console.log("Error: ", err);

        let query = "SELECT * FROM documents WHERE documentid = ?";
        let values = document.documentid;

        connection.query(query, values, (err, data) => {
            if (err) console.log("Error", err);
            res.json(data);
        })

    })
})


// Read all documents

router.post("/read/all", (req, res) => {

    connection.connect((err) => {
        if (err) console.log("Error: ", err);

        let query = "SELECT * FROM documents WHERE userid = ? AND deleted = 0";
        let values = [req.body.userid];

        connection.query(query, values, (err, data) => {
            if (err) console.log("Error", err);
            res.json(data)
        })

    })
})


// Update document

router.patch("/update", (req, res) => {

    let documentid = req.body.documentid;
    let title = req.body.title;
    let content = req.body.content;

    connection.connect((err) => {
        if (err) console.log("Error: ", err);

        let query = "UPDATE documents SET title = ?, content = ? WHERE documentid = ?";
        let values = [title, content, documentid];

        connection.query(query, values, (err, data) => {
            if (err) console.log("Error", err);
            res.json(data)
        })

    })
})



// Delete document - soft delete

router.delete("/delete/soft", (req, res) => {
   
    let documentid = req.body.documentid;

    connection.connect((err) => {
        if (err) console.log("Error: ", err);

        let query = "UPDATE documents SET deleted = 1 WHERE documentid = ?";
        let values = [documentid];

        connection.query(query, values, (err, data) => {
            if (err) console.log("Error", err);
            res.json(data)
        })

    })
})

// Delete document - hard delete

router.delete("/delete/hard", (req, res) => {
   
    let documentid = req.body.documentid;

    connection.connect((err) => {
        if (err) console.log("Error: ", err);

        let query = "DELETE FROM documents WHERE documentid = ?";
        let values = [documentid];

        connection.query(query, values, (err, data) => {
            if (err) console.log("Error", err);
            res.json(data)
        })

    })
})


module.exports = router;