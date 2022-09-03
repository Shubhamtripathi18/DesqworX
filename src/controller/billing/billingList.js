const billingModel = require('../../model/billingModel')


const getBillingList = async function (req, res) {
    try {

        const findBillingDetails = await spaceTypeModel.find(req.query).select({ _id: 1, user: 1, location: 1, price: 1, availability: 1, facilities: 1})

        if (findBillingDetails.length === 0) {
            return res.status(404).send({ status: false, msg: "no spacedesk found" })
        }
        return res.status(200).send({ status: true, data: findBillingDetails })

    } catch (error) {
        res.status(500).send({ status: true, message: error.message })
    }
}