const adminModel = require('../../model/adminModel')



const getAdminDetails = async function (req, res) {
    try {
        let _id = req.params
        const findAdminDetails = await adminModel.findById(_id).populate("company")
        // .select({ desks: 1, city: 1, location: 1, price: 1, availability: 1, facilities: 1})

        if (findAdminDetails.length === 0) {
            return res.status(404).send({ status: false, msg: "no details found" })
        }
        return res.status(200).send({ status: true, data: findAdminDetails })

    } catch (error) {
        res.status(500).send({ status: true, message: error.message })
    }
}



module.exports = { getAdminDetails }