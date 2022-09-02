
const bookingModel = require('../model/bookingModel/bookingModel');

// const isValid = function (value) {
//     if (typeof value === "undefined" || value == null) return false;
//     if (typeof value === "string" && value.trim().length === 0) return false;
//     return true;
// };





const getBookingDetails = async function (req, res) {

    try {
        const name = req.query.name
        const companyName = req.query.companyName
        const contactNumber = req.query.contactNumber
        const bookingStart = req.query.bookingStart
        const bookingEnd = req.query.bookingEnd
        const bookingDuration = req.query.bookingDuration


        const queryFilter = {};
        if (name) {
            queryFilter.name = { $regex: name, $options: "i" };

            let nameSearch = await bookingModel.find({name:name})

            if (!nameSearch) {
                return res.status(404).send({ status: false, message: "name not found " })
            }
            return res.status(200).send({ status: true, data: nameSearch })
        }

        if (companyName) {
            let companySearch = await bookingModel.find({ companyName: companyName })
            if (!companySearch) {
                return res.status(404).send({ status: false, message: "companyName not found " })
            }
            else {
                return res.status(200).send({ status: true, data: companySearch })
            }
        }


        if (contactNumber) {
            let contactSearch = await bookingModel.find({ contactNumber: contactNumber })
            if (!contactSearch) {
                return res.status(404).send({ status: false, message: "contactNumber not found" })
            }
            else {
                return res.status(200).send({ status: true, data: contactSearch })
            }
        }


        if (bookingStart) {
            let bookingStartSearch = await bookingModel.find({ bookingStart: bookingStart })
            if (!bookingStartSearch) {
                return res.status(404).send({ status: false, message: "bookingStart not found" })
            }
            else {
                return res.status(200).send({ status: true, data: bookingStartSearch })
            }
        }


        if (bookingEnd) {
            let bookingEndSearch = await bookingModel.find({ bookingEnd: bookingEnd })
            if (!bookingEndSearch) {
                return res.status(404).send({ status: false, message: "bookingEnd not found" })
            }
            else {
                return res.status(200).send({ status: true, data: bookingEndSearch })
            }
        }

        if (bookingDuration) {
            let bookingDurationSearch = await bookingModel.find({ bookingDuration: bookingDuration })
            if (!bookingDurationSearch) {
                return res.status(404).send({ status: false, message: "bookingDuration not found" })
            }
            else {
                return res.status(200).send({ status: true, data: bookingDurationSearch })
            }
        }

        let finalData = await bookingModel.find({})
        return res.status(200).send({ status: true, count: finalData.length, data: finalData })

    } catch (error) {
        res.status(500).send({ status: true, message: error.message })
    }
}




module.exports = { booking, getBookingDetails }