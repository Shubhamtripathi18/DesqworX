const companyModel = require('../../model/companyModel')

const isValid = function (value) {
    if (typeof value === "undefined" || value == null) return false;
    if (typeof value === "string" && value.trim().length === 0) return false;
    return true;
};

const registerCompany = async function (req, res) {
    try {
        let requestBody = req.body

        if (Object.keys(requestBody) == 0) {
            return res.status(400).send({ status: false, msg: "userDetails must be provided" });
        }

        let {companyName,companyAddress,companyGST,companyPAN} = requestBody

        if (!isValid(companyName)) {
            return  res.status(400).send({ status: false, message: 'companyName is required' })    
        }


        if (!isValid(companyAddress)) {
            return   res.status(400).send({ status: false, message: 'companyAddress is required' })   
        }

        if (!isValid(companyGST)) {
            return  res.status(400).send({ status: false, message: 'emailId is required' })   
        }


        if (!isValid(companyPAN)) {
            return  res.status(400).send({ status: false, message: 'phone is required' })
            
        }

        // if (!(/^[6-9]\d{9}$/.test(companyPAN))) {
        //     return res.status(400).send({ status: false, msg: "please provide a valid PAN Number" })
        // }

        
        const company = await companyModel.create(requestBody)
        return   res.status(201).send({ status: true, msg: "user registered successfully", data: company })


    } catch (err) {
        return  res.status(500).send({ status: false, msg: err.message })
    }
}





module.exports = {registerCompany}
