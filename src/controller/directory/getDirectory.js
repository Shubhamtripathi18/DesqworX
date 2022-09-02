const directoryModel = require('../model/directoryModel');

// const isValid = function (value) {
//     if (typeof value === "undefined" || value == null) return false;
//     if (typeof value === "string" && value.trim().length === 0) return false;
//     return true;
// };






const getDirectoryDetails = async function (req, res) {

    try {
        const name = req.query.name
        const email = req.query.email
        const phone = req.query.phone
        const gender = req.query.gender
        const since = req.query.since


        const queryFilter = {};
        if (name) {
            queryFilter.name = { $regex: name, $options: "i" };

            let nameSearch = await directoryModel.find({ name: name })

            if (!nameSearch) {
                return res.status(404).send({ status: false, message: "name not found " })
            }
            return res.status(200).send({ status: true, data: nameSearch })
        }

        if (email) {
            let emailSearch = await directoryModel.find({ email: email })
            if (!emailSearch) {
                return res.status(404).send({ status: false, message: "email not found " })
            }
            else {
                return res.status(200).send({ status: true, data: emailSearch })
            }
        }


        if (phone) {
            let phoneSearch = await directoryModel.find({ phone: phone })
            if (!phoneSearch) {
                return res.status(404).send({ status: false, message: "phone not found" })
            }
            else {
                return res.status(200).send({ status: true, data: phoneSearch })
            }
        }


        if (gender) {
            let genderSearch = await directoryModel.find({ gender: gender })
            if (!genderSearch) {
                return res.status(404).send({ status: false, message: "mention the gender" })
            }
            else {
                return res.status(200).send({ status: true, data: genderSearch })
            }
        }


        if (since) {
            let bookingEndSearch = await directoryModel.find({ since: since })
            if (!bookingEndSearch) {
                return res.status(404).send({ status: false, message: (`no data since ${since} found`) })
            }
            else {
                return res.status(200).send({ status: true, data: bookingEndSearch })
            }
        }
        
        let finalData = await directoryModel.find()
        // let count = 0

         
        // for(let i=0; i<finalData.length; i++) {
        //   return  count = count+finalData.length[i]
        // }
        return res.status(200).send({ status: true,  data: finalData })

    } catch (error) {
        res.status(500).send({ status: true, message: error.message })
    }
}


module.exports = {  getDirectoryDetails }