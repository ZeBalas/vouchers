const express = require('express');
const dotenv = require('dotenv');
const multer = require('multer');
const csv = require('fast-csv');
const fs = require('fs');
const cors = require('cors');

const upload = multer({ dest: 'tmp/csv/' });
const port = 5000
const server = express();
dotenv.config();

server.use(cors());

server.get("/", (req, res) => {
    res.send({
        hello: "world"
    });
});

server.post('/upload-file', upload.single('file'), (req, res) => {
    const fileRows = [];
    try {
        csv.parseFile(req.file.path, {
            headers: ['code'],
            delimiter: ";"
        })
            .on("error", err => {
                res.status(400).send(err);
            })
            .on("data", data => {
                console.log(data.code[0]);
                if(data.code[0] !== "#")
                    fileRows.push(data);
            })
            .on("end", () => {
                fs.unlinkSync(req.file.path);
                res.send(fileRows);
            })
    } catch (err) {
        res.status(400).send(err);
    }
});

server.listen(process.env.PORT || port);