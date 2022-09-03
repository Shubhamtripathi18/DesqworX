const bookingModel = require('../../model/bookingModel')

const updateBooking = async function (req, res) {
    try {
        const updateBooking = req.params.updateBooking

        const bookingData = await bookingModel.findById({ _id: updateBooking })
        // console.log(booking)

        if (!(bookingData)) {
            res.status(404).send({ status: false, message: "No data found" })
            return
        }

        if (Object.keys(req.body) == 0) {
            res.status(400).send({ status: false, message: 'please provide data for updation' })
            return
        }

        const { desks, city, location, price, availability, facilities ,plan,features,membership} = req.body

        
        const updateupdateBooking = await updateBookingModel.findOneAndUpdate({ _id: updateBooking }, { ...req.body }, { new: true })

        return res.status(200).send({ status: true, message: "Space Desk updated successfully", data: updateupdateBooking })
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ status: false, msg: err.message })
    }
}

module.exports = {updateBooking}