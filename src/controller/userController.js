const userModel = require('../model/userModel')

const isValid = function (value) {
    if (typeof value === "undefined" || value == null) return false;
    if (typeof value === "string" && value.trim().length === 0) return false;
    return true;
};

const registerUser = async function (req, res) {
    try {
        let requestBody = req.body

        if (Object.keys(requestBody) == 0) {
            return res.status(400).send({ status: false, msg: "userDetails must be provided" });
        }

        let {personInfo,companyDetail} = requestBody

        if (!isValid(personInfo.firstName)) {
            return  res.status(400).send({ status: false, message: 'firstName is required' })    
        }


        if (!isValid(personInfo.lastName)) {
            return   res.status(400).send({ status: false, message: 'lastName is required' })   
        }

        if (!isValid(personInfo.emailId)) {
            return  res.status(400).send({ status: false, message: 'emailId is required' })   
        }


        if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(personInfo.emailId))) {
            return res.status(400).send({ status: false, message: 'Email should be valid email' })
        }


        if (!isValid(personInfo.phone)) {
            return  res.status(400).send({ status: false, message: 'phone is required' })
            
        }

        if (!(/^[6-9]\d{9}$/.test(personInfo.phone))) {
            return res.status(400).send({ status: false, msg: "please provide a valid phone Number" })
        }

        if (!isValid(personInfo.newPassword)) {
            return res.status(400).send({ status: false, message: 'password is required' })
        }

        if (!isValid(companyDetail.companyName)) {
            return  res.status(400).send({ status: false, message: 'companyName is required' })
        }

        if (!isValid(companyDetail.companyAddress)) {
            return  res.status(400).send({ status: false, message: 'companyAddress is required' })
        }


        if (!isValid(companyDetail.companyGST)) {
            return  res.status(400).send({ status: false, message: 'companyGST is required' })
        }


        if (!isValid(companyDetail.companyPAN)) {
            return   res.status(400).send({ status: false, message: 'companyPAN is required' })
        }
        
        const userBody = await userModel.create(requestBody)
        return   res.status(201).send({ status: true, msg: "user registered successfully", data: userBody })


    } catch (err) {
        return  res.status(500).send({ status: false, msg: err.message })
    }
}





const updateUserDetails = async function (req, res) {
    try {
        const userId = req.params._id

        if (!(userDetails)) {
            return res.status(404).send({ status: false, message: "No data found" })
            
        }

        if (Object.keys(req.body) == 0) {
            return   res.status(400).send({ status: false, message: 'please provide data for updation' })
          
        }

        const updateUserDetails = await userModel.findOneAndUpdate({ _id: userId }, {$set:{userBody}}, { new: true })

        return res.status(200).send({ status: true, message: "User Details updated successfully", data: updateUserDetails })
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ status: false, msg: err.message })
    }
}


module.exports = {registerUser,updateUserDetails}
