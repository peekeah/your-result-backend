const subjects = require("../schemas/subjectsSchema");

exports.addSubject = async(req, res) => {
    try {
        const response = await new subjects(req.body).save();
        res.send(response);
    } catch (err) {
        console.log(err)
        res.status(403).send(err);
    }
}

exports.getSubjects = async(req, res) => {
    try {
        const response = await subjects.find();
        const data = response.map(s => s.subject_name)
        res.send(data);
    } catch (err) {
        console.log(err)
        res.status(403).send(err);
    }
}