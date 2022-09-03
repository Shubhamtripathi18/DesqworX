const jwt = require("jsonwebtoken");

const authentication = async function (req, res, next) {
    try {
      let userId = req.params.userId;
      if (!userId) return res.send({ msg: "enter the userId" });
  
      let userID = await User.findById(userId);
      if (!userID) return res.send({ msg: "entered id not Found in DB" });
  //--------------------------------
      let token = req.headers["x-auth-token"];
      if (!token)
        return res.status(401).send({ status: false, msg: "enter the token" });
  
      let decoded = jwt.verify(token, "secretKEY");
      req.decoded = decoded;
      if (!decoded) return res.send({ msg: "invalid token" });
  
      next();
    } catch (err) {
      res.status(500).send({ status: false, error: err.message });
    }
  };
//   console.log(req)
  
  //Authorization
  
  const Authorization= async (req, res, next) => {
    try {
      if (eq.decoded.userId != req.params.userId)
     
        return res
          .status(403)
          .send({ msg: "Authorization failed u dont have access" });
      next();
    } catch (err) {
      res.status(500).send({ status: false, error: err.message });
    }
  };




module.exports = {authentication,Authorization}