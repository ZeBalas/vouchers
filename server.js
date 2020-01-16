const express = require('express');
const dotenv = require('dotenv');
const multer = require('multer');
const csv = require('fast-csv');
const fs = require('fs');
const cors = require('cors');
const mongoose = require('mongoose');

const upload = multer({ dest: 'tmp/csv/' });
const port = 5000
const server = express();
dotenv.config();

const Voucher = require('./models/Voucher');

mongoose.connect(`${process.env.DATABASE_URL}`, {
    useUnifiedTopology: true,
    useNewUrlParser: true
}, err => {
    if(!err) console.log("connected to database");
});

server.use(cors());

server.get("/", (req, res) => {
    res.send({
        hello: "world"
    });
});

server.get("/vouchers", async (req, res) => {
    try {
        const vouchers = await Voucher.find();
        res.send(vouchers);
    } catch (err) {
        res.send(err);
    }
    // fs.readFile("tmp/codes.txt", 'utf8', (err, data) => {
    //     let codes = data.split(";");
    //     codes = codes.filter(code => code !== "");
    //     codes = codes.map(code => ({ code }));
    //     res.send(codes);
    // })
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
                if(data.code[0] !== "#") {
                    fileRows.push(data);
                    const voucher = new Voucher(data);
                    voucher.save();
                }
            })
            .on("end", () => {
                console.log("Codes saved: ", fileRows);
                fs.unlinkSync(req.file.path);
                res.send(fileRows);
            })
    } catch (err) {
        res.status(400).send(err);
    }
});

server.delete('/give-voucher/:code', async (req, res) => {
    const { code } = req.params;
    await Voucher.deleteOne({ code });
    const vouchers = await Voucher.find();
    res.send({ 
        code, 
        vouchers
    });

    // fs.readFile("tmp/codes.txt", 'utf8', (err, data) => {
    //     fileContent = data.split(";");
    //     fileContent = fileContent
    //         .filter(content => content !== "")
    //     fileContent = fileContent    
    //         .filter(content => content !== code)

    //     fileContent = fileContent.join(";");
    //     fs.writeFile("tmp/codes.txt", fileContent, err => console.log(err));
    //     res.send({ code, fileContent });
    // });
});

server.delete("/vouchers", async (req, res) => {
    await Voucher.deleteMany({}, () => {
        res.send("all vouchers are deleted");
    })
    // fs.writeFile("tmp/codes.txt", "", err => {
    //     console.log(err);
    // });
})

server.listen(process.env.PORT || port);