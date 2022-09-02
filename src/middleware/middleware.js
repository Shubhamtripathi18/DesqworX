const jwt = require("jsonwebtoken");

const authentication = async function (req, res, next) {
    try {
        let token = req.headers["x-api-key"];
        if (!token) return res.status(400).send({ status: false, msg: "you need to login the admin and set the token" });
        let decodedtoken = jwt.verify(token, "viper");
        if (!decodedtoken) return res.status(401).send({ status: false, msg: "token is invalid" });
        req.validate = decodedtoken.id;
        // console.log(req)
        next();

    }
    catch (error) {
        console.log(error)
        return res.status(500).send({ msg: error.message })
    }
}




module.exports.authentication = authentication