const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const voucherSchema = new Schema({
    code: String
}, { timestamps: true });

module.exports = mongoose.model("voucher", voucherSchema);