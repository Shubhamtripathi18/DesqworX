const billingModel = require('../model/billingModel');

const isValid = function (value) {
    if (typeof value === "undefined" || value == null) return false;
    if (typeof value === "string" && value.trim().length === 0) return false;
    return true;
};


const billing = async function (req, res) {
    try {
        let billing = req.body

        if (Object.keys(billing) == 0) {
            return res.status(400).send({ status: false, msg: "billingDetails must be provided" });
        }

        let { user, paymentMethod, paymentReference, shiftTime, sincbookingStartDate,bookingEndDate, bookingDuration,spaceType,plan,features,membership} = billing


        if (!isValid(user)) {
            res.status(400).send({ status: false, message: 'user is required' })
            return
        }

        if (!isValid(paymentMethod)) {
            res.status(400).send({ status: false, message: 'paymentMethod is required' })
            return
        }


        if (!isValid(paymentReference)) {
            res.status(400).send({ status: false, message: 'paymentReference is required' })
            return
        }


        if (!isValid(shiftTime)) {
            res.status(400).send({ status: false, message: 'shiftTime  is required' })
            return
        }


        if (!isValid(sincbookingStartDate)) {
            res.status(400).send({ status: false, message: 'sincbookingStartDate is required' })
            return
        }

        if (!isValid(bookingEndDate)) {
            res.status(400).send({ status: false, message: 'bookingEndDate is required' })
            return
        }

        if (!isValid(bookingDuration)) {
            res.status(400).send({ status: false, message: 'bookingDuration is required' })
            return
        }

        if (!isValid(spaceType)) {
            res.status(400).send({ status: false, message: 'spaceType is required' })
            return
        }


        if (!isValid(plan)) {
            res.status(400).send({ status: false, message: 'plan is required' })
            return
        }


        if (!isValid(features)) {
            res.status(400).send({ status: false, message: 'features is required' })
            return
        }

        if (!isValid(membership)) {
            res.status(400).send({ status: false, message: 'membership is required' })
            return
        }

        const newbilling = await billingModel.create(billing)
        res.status(201).send({ status: true, msg: "billing completed successfully", data: newbilling })

    } catch (err) {
        res.status(500).send({ status: false, msg: err.message })
    }
}

module.exports  = {billing}