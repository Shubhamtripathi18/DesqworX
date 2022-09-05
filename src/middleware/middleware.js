const jwt = require("jsonwebtoken");
 

///didnt require model

const authentication = async function (req, res, next) {
    try {
      let _id = req.params._id;  //getiing registteID
      
      if(!_id){
        return res.send("provide id")
      }
    
  //-------------------------------------------------------------------------------
      let token = req.headers["x-auth-token"];
      if (!token)
        return res.status(401).send({ status: false, msg: "enter the token" });
  
      let decoded = jwt.verify(token, "viper");
      req.decoded = decoded;
      console.log(req.decoded);

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
      if  (req.decoded._id!= req.params._id)

        return res
          .status(403)
          .send({ msg: "Authorization failed u dont have access" });
      next();
    } catch (err) {
      res.status(500).send({ status: false, error: err.message });
    }
  };




module.exports = {authentication,Authorization}