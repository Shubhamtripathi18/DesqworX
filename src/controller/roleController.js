const roleModel = require('../model/roleModel');
const { isValid, isValidRequestBody } = require('../validator/validator');
// const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


const createRole = async (req, res) => {
    try {
        const requestBody = req.body;

        if (!isValidRequestBody(requestBody)) {
            return res.status(400).send({ status: false, message: "Invalid request parameters. Please provide Admin details" })
        }
        const { role, name, location, descriptions, email, password } = req.body

        // if (!isValid(id)) {
        //     return res.status(400).send({ status: false, message: 'id is required' })
        // }

        if (!isValid(role)) {
            return res.status(400).send({ status: false, message: 'role is required' })
        }
        if (!isValid(name)) {
            return res.status(400).send({ status: false, message: 'name is required' })
        }

        if (!isValid(location)) {
            return res.status(400).send({ status: false, message: 'location is required' })
        }

        if (!isValid(descriptions)) {
            return res.status(400).send({ status: false, message: 'descriptions is required' })
        }

        if (!isValid(email)) {
            return res.status(400).send({ status: false, message: 'email is required' })
        }
        if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))) {
            return res.status(400).send({ status: false, message: 'Email should be valid email' })

        }

        const emailAlreadyUsed = await roleModel.findOne({ email })
        if (emailAlreadyUsed) {
            return res.status(400).send({ status: false, message: `${email} is already registered` })
        }

        if (!isValid(password)) {
            return res.status(400).send({ status: false, message: 'password is required' })
        }


        const roleCreated = await roleModel.create(requestBody)
        res.status(201).send({ status: true, message: "Success", data: roleCreated })
    }
    catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
}


const login = async function (req, res) {
    let data = req.body;
    let email = data.email;
    let password = data.password;
    let userId = req.params
    let result = await roleModel.findOne({ email: email, password: password })
    if (!result) {
        return res.status(404).send({ status: false, msg: "Invalid User Credentials,please Check..!!" })
    }
    // res.send(result)
    let payload = { userId: result._id };
    let token = jwt.sign(payload, "viper");
    res.setHeader("x-auth-token", token);
    res.send({ status: true, msg: "User Successfully LoggedIn", tokenData: token })
}


const getRoleDetails = async function (req, res) {
    try {

        const findRoles = await roleModel.find(req.query).select({ role: 1, name: 1, location: 1, descriptions: 1 })
        if (findRoles.length === 0) {
            return res.status(404).send({ status: false, msg: "no such role found" })
        }
        return res.status(200).send({ status: true, data: findRoles })

    } catch (error) {
        res.status(500).send({ status: true, message: error.message })
    }
}




const updateRoles = async function (req, res) {
    try {
        const requestBody = req.body
        const roleId = req.params.id

        if (Object.keys(req.body) == 0) {
            res.status(400).send({ status: false, message: 'please provide data for updation' })
            return
        }

        const isroleIdPresent = await roleModel.findOne({ _id: roleId });
        if (!isroleIdPresent) {
            return   res.status(404).send({ status: false, message: `no such role  found with this Id ${roleId}` });
            
        }

        if (roleId != isroleIdPresent) {
            return res.status(401).send({ status: false, message: "You are not authorized" })
        }

        if (!isValidRequestBody(requestBody)) {
            res.status(400)
                .send({ status: false, message: "Please provide some data to update this Book" });
            return;
        }

        const updaterole = await roleModel.findOneAndUpdate({ _id: roleId }, { new: true })

        return res.status(200).send({ status: true, message: "Rolls updated successfully", data: updaterole })
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ status: false, msg: err.message })
    }
}







module.exports = { createRole, getRoleDetails, updateRoles, login }
