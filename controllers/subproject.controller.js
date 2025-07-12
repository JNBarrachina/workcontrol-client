const SubProject = require("../models/Subproject")

const createSubproject = async(req, res) => {
    const subprojectname = req.body.name;

    const createdSubproject = await SubProject.create({
        name: subprojectname
    });

    res.status(201).send({id: createdSubproject.id})


}

exports.createSubproject = createSubproject