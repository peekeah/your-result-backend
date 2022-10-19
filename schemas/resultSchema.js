const { Schema, model } = require("mongoose");

const resultSchema = Schema({
    name: { type: "string", require: true },
    subject: { type: "string", require: true },
    marks: { type: "number", require: true },
});

module.exports = model("result", resultSchema);
