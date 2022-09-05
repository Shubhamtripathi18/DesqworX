const staffModel = require('../../model/staffModel')



const getStaffDetails = async function (req, res) {
    try {
        let _id = req.params
        const findStaffDetails = await staffModel.findById(_id).populate("role")

        if (findStaffDetails.length === 0) {
            return res.status(404).send({ status: false, msg: "no details found" })
        }
        return res.status(200).send({ status: true, data: findStaffDetails })

    } catch (error) {
        res.status(500).send({ status: true, message: error.message })
    }
}



module.exports = { getStaffDetails }