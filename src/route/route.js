const express= require('express')
const router = express.Router()
const {registerUser,updateUserDetails} = require('../controller/userController');
const {booking,getBookingDetails} = require('../controller/bookingController');
const {directory,getDirectoryDetails} = require('../controller/directoryController')
const {spaceType,getSpaceDetails,updateSpaceType} = require('../controller/spaceTypeController')
const {createAdmin,adminLogin} = require('../controller/admin/adminController')
const {authentication} = require('../middleware/middleware')



router.post('/register', registerUser);
router.put('/updateUser/:id',updateUserDetails)


router.post('/booking', booking);
router.get('/getBookingDetails',getBookingDetails);


router.post('/directory', directory);
router.get('/getDirectoryDetails', getDirectoryDetails);



router.post('/spaceType', authentication,spaceType);
router.get('/getSpaceDetails', getSpaceDetails);
router.put('/updateSpaceDetails/:spaceType',authentication, updateSpaceType);
  


router.post('/createAdmin',createAdmin)
router.post('/adminLogin',adminLogin)


module.exports = router