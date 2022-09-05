const staffModel = require('../../model/staffModel');
const jwt = require('jsonwebtoken');
const { isValid, isValidRequestBody } = require('../../validator/validator');
const bcrypt = require('bcrypt')




const createStaff = async (req, res) => {
    try {
        const requestBody = req.body;

        if (!isValidRequestBody(requestBody)) {
            return res.status(400).send({ status: false, message: "Invalid request parameters. Please provide Admin details" })
        }
        const { title, staffName, role, phone, email, password } = req.body

        if (!isValid(title)) {
            return res.status(400).send({ status: false, message: 'title is required' })
        }

        if (["Mr", "Mrs", "Miss"].indexOf(title) === -1) {
            return res.status(400).send({ status: false, msg: "Plz enter vaild Title" })
        }

        if (!isValid(staffName)) {
            return res.status(400).send({ status: false, message: 'staffName is required' })
        }

        if (!isValid(role)) {
            return res.status(400).send({ status: false, message: 'role is required' })
        }


        if (!isValid(phone)) {
            return res.status(400).send({ status: false, message: 'phone is required' })
        }

        if (!(/^(\+\d{1,3}[- ]?)?\d{10}$/.test(phone))) {
            return res.status(400).send({ status: false, message: 'phone number should be valid mobile number' })
        }

        const phoneAlreadyUsed = await staffModel.findOne({ phone })
        if (phoneAlreadyUsed) {
            return res.status(400).send({ status: false, message: `${phone} number already registered` })
        }

        if (!isValid(email)) {
            return res.status(400).send({ status: false, message: 'email is required' })
        }
        if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))) {
            return res.status(400).send({ status: false, message: 'Email should be valid email' })
        }

        const emailAlreadyUsed = await staffModel.findOne({ email })
        if (emailAlreadyUsed) {
            return res.status(400).send({ status: false, message: `${email} is already registered` })
        }


        if (!isValid(password)) {
            return res.status(400).send({ status: false, message: 'password is required' })
        }

        if (!(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/.test(password))) {
            return res.status(400).send({ status: false, message: 'password should be valid password' })
        }


        const staffCreated = await staffModel.create(requestBody)
        res.status(201).send({ status: true, message: "Success", data: staffCreated })
    }
    catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
}




const staffLogin = async (req, res) => {
    try {
        const loginDetails = req.body;

        if (!isValidRequestBody(loginDetails)) {
            return res.status(400).send({ status: false, message: "Invalid request parameters. Please provide staff's details" })
        }


        const { email, password } = req.body;
        if (!isValid(email)) {
            return res.status(400).send({ status: false, message: 'email is required' })
        }
        if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))) {
            return res.status(400).send({ status: false, message: 'invalid email' })

        }


        if (!isValid(password)) {
            return res.status(400).send({ status: false, message: 'password is required' })
        }


        const staff = await staffModel.findOne({ email });
        if (!staff) {
            return res.status(404).send({
                'status': false,
                message: 'Email and Password not found ' // wrong email id
            });
        }
        const token = jwt.sign({ id: staff._id }, 'viper');
        res.setHeader("x-api-key", token);
        return res.status(200).send({ 'status': true, message: "Success" });

    } catch (error) {
        return res.status(500).send({
            status: false,
            message: error.message
        });
    }
}





module.exports = { createStaff, staffLogin }