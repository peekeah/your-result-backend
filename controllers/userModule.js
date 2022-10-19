const users = require("../schemas/userSchema");
const bcrypt = require("bcrypt");

// Get all users
exports.getUsers = async (req, res) => {
    try {
        const response = await users.find({});
        res.send(response);
    } catch (err) {
        console.error(err);
        res.status(403).send(err);
    }
};

// Create user
exports.createUser = async (req, res) => {
    try {
        // Hashing password
        const salt = await bcrypt.genSalt(7);
        req.body.password = await bcrypt.hash(req.body.password, salt);

        const response = await new users(req.body).save();
        res.send(response);
    } catch (err) {
        console.log(err);
        res.status(403).send(err);
    }
};

// Update user by id
exports.updateUser = async (req, res) => {
    try {
        const response = await users.findOneAndUpdate({id: req.body.id}, {...req.body});
        res.send(response);
    } catch (err) {
        console.error(err);
        res.status(403).send(err);
    }
};
