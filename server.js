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

server.get("/vouchers", (req, res) => {
    fs.readFile("tmp/codes.txt", 'utf8', (err, data) => {
        let codes = data.split(";");
        codes = codes.filter(code => code !== "");
        codes = codes.map(code => ({ code }));
        res.send(codes);
    })
});

server.post('/upload-file', upload.single('file'), (req, res) => {
    const fileRows = [];
    let fileString = "";
    try {
        csv.parseFile(req.file.path, {
            headers: ['code'],
            delimiter: ";"
        })
            .on("error", err => {
                res.status(400).send(err);
            })
            .on("data", data => {
                if(data.code[0] !== "#") {
                    fileRows.push(data);
                    fileString += `${data.code};`;
                }
            })
            .on("end", () => {
                fs.writeFile("tmp/codes.txt", fileString, err => {
                    console.log(err);
                });
                fs.unlinkSync(req.file.path);
                res.send(fileRows);
            })
    } catch (err) {
        res.status(400).send(err);
    }
});

server.delete('/give-voucher/:code', (req, res) => {
    const { code } = req.params;
    let fileContent;
    fs.readFile("tmp/codes.txt", 'utf8', (err, data) => {
        fileContent = data.split(";");
        fileContent = fileContent
            .filter(content => content !== "")
        fileContent = fileContent    
            .filter(content => content !== code)

        fileContent = fileContent.join(";");
        fs.writeFile("tmp/codes.txt", fileContent, err => console.log(err));
        res.send({ code, fileContent });
    });
})

server.listen(process.env.PORT || port);