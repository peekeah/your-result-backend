const { Schema, model } = require("mongoose");

const userSchema = Schema({
    name: { type: "string", require: true },
    password: { type: "string", require: true },
    email: { type: "string", require: true },
});

module.exports = model("users", userSchema);
