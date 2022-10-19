const { Schema, model } = require("mongoose");

const userSchema = new Schema({
    name: { type: "string", require: true },
    password: { type: "string", require: true },
    email: { type: "string", require: true },
    role: { type: "string", default: "student"}
});

module.exports = model("users", userSchema);
