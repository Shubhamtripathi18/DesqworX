const directoryModel = require('../../model/directoryModel');

const isValid = function (value) {
    if (typeof value === "undefined" || value == null) return false;
    if (typeof value === "string" && value.trim().length === 0) return false;
    return true;
};


const directory = async function (req, res) {
    try {
        let directory = req.body

        if (Object.keys(directory) == 0) {
            return res.status(400).send({ status: false, msg: "directoryDetails must be provided" });
        }

        let { name, email, phone, gender, since } = directory


        if (!isValid(name)) {
            res.status(400).send({ status: false, message: 'name is required' })
            return
        }

        if (!isValid(email)) {
            res.status(400).send({ status: false, message: 'email is required' })
            return
        }


        if (!isValid(phone)) {
            res.status(400).send({ status: false, message: 'phone is required' })
            return
        }


        if (!isValid(gender)) {
            res.status(400).send({ status: false, message: 'gender  is required' })
            return
        }


        if (!isValid(since)) {
            res.status(400).send({ status: false, message: 'since is required' })
            return
        }


        const newDirectory = await directoryModel.create(directory)
        res.status(201).send({ status: true, msg: "directory completed successfully", data: newDirectory })

    } catch (err) {
        res.status(500).send({ status: false, msg: err.message })
    }
}


module.exports = {directory}