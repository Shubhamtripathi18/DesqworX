
const bookingModel = require('../../model/bookingModel');

const isValid = function (value) {
    if (typeof value === "undefined" || value == null) return false;
    if (typeof value === "string" && value.trim().length === 0) return false;
    return true;
};

const booking = async function (req, res) {
    try {
        let booking = req.body

        if (Object.keys(booking) == 0) {
            return res.status(400).send({ status: false, msg: "bookingDetails must be provided" });
        }

        let {  name, companyName, contactNumber, bookingStart, bookingEnd, bookingDuration } = booking



        if (!isValid(name)) {
            res.status(400).send({ status: false, message: 'name is required' })
            return
        }

        if (!isValid(companyName)) {
            res.status(400).send({ status: false, message: 'companyName is required' })
            return
        }


        if (!isValid(contactNumber)) {
            res.status(400).send({ status: false, message: 'contactNumber is required' })
            return
        }

        if (!(/^[6-9]\d{9}$/.test(contactNumber))) {
            return res.status(400).send({ status: false, msg: "please provide a valid contactNumber" })
        }

        let duplicate = await bookingModel.findOne({ contactNumber: contactNumber });
        if (duplicate) {
            return res.status(400).send({ status: false, msg: 'contactNumber already exists' })
        }

        if (!isValid(bookingStart)) {
            res.status(400).send({ status: false, message: 'bookingStart is required' })
            return
        }

        if (!isValid(bookingEnd)) {
            res.status(400).send({ status: false, message: 'bookingEnd is required' })
            return
        }

        if (!isValid(bookingDuration)) {
            res.status(400).send({ status: false, message: 'bookingDuration is required' })
            return
        }

        const newBooking = await bookingModel.create(booking)
        res.status(201).send({ status: true, msg: "booked successfully", data: newBooking })


    } catch (err) {
        res.status(500).send({ status: false, msg: err.message })
    }
}

module.exports = {booking}