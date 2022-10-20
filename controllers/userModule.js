const users = require("../schemas/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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
exports.signup = async (req, res) => {
    try {
        // checking for existing user
        const existUser = await users.findOne({email: req.body.email});
        if(existUser) return res.status(401).send({msg: 'User already exists'});

        // Hashing password
        const salt = await bcrypt.genSalt(7);
        req.body.password = await bcrypt.hash(req.body.password, salt);

        // Storing data in Database
        const response = await new users(req.body).save();

        //Generating Token
        const token = jwt.sign({ ...response}, process.env.JWT_SECRET, {expiresIn: '1hr'});
        res.send(token);

    } catch (err) {
        console.log(err);
        res.status(403).send(err);
    }
};

// Update user by id
exports.updateUser = async (req, res) => {
    try {

        // Hashing password
        const salt = await bcrypt.genSalt(7);
        req.body.password = await bcrypt.hash(req.body.password, salt);

        // Updating password
        const response = await users.findOneAndUpdate({_id: req.params.id}, {...req.body}, {new: true});
        res.send(response);
    } catch (err) {
        console.error(err);
        res.status(403).send(err);
    }
};


// User login
exports.login = async (req, res) => {
    try {
        // Checking if user is present
        const existUser = await users.findOne({email: req.body.email});
        if(!existUser) return res.status(401).send({msg: 'User does not exist'});
        
        // validating password
        const isValid = await bcrypt.compare(req.body.password, existUser.password);
        if(!isValid) return res.status(403).send({msg: 'Wrong password'});


        //Generating Token
        const token = jwt.sign({ ...existUser}, process.env.JWT_SECRET, {expiresIn: '1hr'});
        res.send(token);

    } catch (err) {
        console.log(err);
        res.status(403).send(err);
    }
}


// get all users list
exports.getAllUsers = async(req, res) => {
    try {
        const response = await users.find({role: {$ne: 'admin'}});
        const data = response.map(s => s.name);
        res.send(data);
    } catch (err) {
        console.log(err);
        res.status(403).send(err);
    }
}

// is user admin
exports.isAdmin = async(req, res) => {
    try {
        if (req.body.tokenData._doc.role === "admin") {
            res.send(true);
        } else {
            res.send(false);
        }
    } catch (err) {
        console.log(err);
        res.status(403).send(err);
    }
}