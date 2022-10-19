const jwt = require('jsonwebtoken');

exports.authenticateToken = async(req, res, next) => {
    // token validation in headers
    if(!req.headers['access-token']) return res.status(401).send({msg: 'Access token not found'});


    // token verificaion
    try {
        req.body.tokenData = await jwt.verify(req.headers['access-token'], process.env.JWT_SECRET);
        next();
    } catch (err) {
        console.log(err);
        res.status(401).send({msg: 'Invalid Token'});
    }

}

//User Authorization
exports.authorizeUser = async (req, res, next) => {
    if (req.body.tokenData._doc.role === "admin") {
        next();
    } else {
        return res.status(401).send({ message: "You are not admin" });
    }
};
