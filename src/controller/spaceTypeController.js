const spaceTypeModel = require('../model/spaceTypeModel');
const jwt = require('jsonwebtoken')
// const moment = require("moment")
// const ObjectId = require('../validator/validator');
const adminModel = require('../model/adminModel');

const isValid = function (value) {
    if (typeof value === "undefined" || value == null) return false;
    if (typeof value === "string" && value.trim().length === 0) return false;
    return true;
};


const spaceType = async function (req, res) {
    try {
        let spaceType = req.body

        // let id = req.params.Id;
        // if (req.validate !== id) {
        //     return res.status(401).send({ status: false, message: "Not Authorized" });
        // }

        if (Object.keys(spaceType) == 0) {
            return res.status(400).send({ status: false, msg: "spaceTypeDetails must be provided" });
        }

        let { desks, city, location, price, availability, facilities,plan,features,membership } = spaceType


        if (!isValid(desks)) {
            res.status(400).send({ status: false, message: 'mention type of desk' })

        }

        if (!isValid(city)) {
            res.status(400).send({ status: false, message: 'city is required' })

        }


        if (!isValid(location)) {
            res.status(400).send({ status: false, message: 'location is required' })

        }


        if (!isValid(price)) {
            res.status(400).send({ status: false, message: 'price  is required' })

        }

        if (!isValid(availability)) {
            res.status(400).send({ status: false, message: 'availability is required' })

        }

        if (!isValid(facilities)) {
            res.status(400).send({ status: false, message: 'provide facilities' })
        }

        if (!isValid(plan)) {
            res.status(400).send({ status: false, message: 'provide plan' })
        }

        if (!isValid(features)) {
            res.status(400).send({ status: false, message: 'provide features' })
        }

        if (!isValid(membership)) {
            res.status(400).send({ status: false, message: 'provide membership details' })
        }
        // const duplicateDetails = await spaceTypeModel.find()
        // if (duplicateDetails) { return res.status(400).send({ status: false, msg: "space type already created with these details" }) }

        spaceType.createdBy = req.validate
        const check = await adminModel.findOne({ $and: [{ _id: req.validate }, { $or: [{ role: "admin" }, { role: "sub admin" }] }] })

        if (check === null) {
            return res.status(400).send({ status: false, message: "only valid admin could create" })
        } else {
            var newspaceType = await spaceTypeModel.create(spaceType)
        }
        res.status(201).send({ status: true, msg: "spaceType created successfully", data: newspaceType })

    } catch (err) {
        res.status(500).send({ status: false, msg: err.message })
    }
}


const getSpaceDetails = async function (req, res) {
    try {

        const findSpaceDesks = await spaceTypeModel.find(req.query).select({ desks: 1, city: 1, location: 1, price: 1, availability: 1, facilities: 1})

        if (findSpaceDesks.length === 0) {
            return res.status(404).send({ status: false, msg: "no spacedesk found" })
        }
        return res.status(200).send({ status: true, data: findSpaceDesks })

    } catch (error) {
        res.status(500).send({ status: true, message: error.message })
    }
}



const updateSpaceType = async function (req, res) {
    try {
        const spaceType = req.params.spaceType

        const spaceAvail = await spaceTypeModel.findById({ _id: spaceType })
        // console.log(spaceAvail)

        if (!(spaceAvail)) {
            res.status(404).send({ status: false, message: "No data found" })
            return
        }

        if (Object.keys(req.body) == 0) {
            res.status(400).send({ status: false, message: 'please provide data for updation' })
            return
        }

        // const { desks, city, location, price, availability, facilities ,plan,features,membership} = spaceType

        
        // const updateData = { desks, city, location, price, availability, facilities,plan,features,membership }

        const updateSpaceType = await spaceTypeModel.findOneAndUpdate({ _id: spaceType }, { ...req.body }, { new: true })

        return res.status(200).send({ status: true, message: "Space Desk updated successfully", data: updateSpaceType })
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ status: false, msg: err.message })
    }
}

module.exports = { spaceType, getSpaceDetails, updateSpaceType }



