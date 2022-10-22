const { Schema, model } = require("mongoose");

const schema = new Schema({
    subject_name: { type: "string", required: true },
});

module.exports = model('subjects', schema);
