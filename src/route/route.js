const express = require('express')
const router = express.Router()
const { registerUser, updateUserDetails } = require('../controller/userController');
const { getBookingDetails } = require('../controller/booking/getBooking')
const { booking } = require('../controller/booking/createBooking');
const { updateBooking } = require('../controller/booking/updateBooking');
const { directory } = require('../controller/directory/createDirectory')
const { getDirectoryDetails } = require('../controller/directory/getDirectory')
const { spaceType, getSpaceDetails, updateSpaceType } = require('../controller/spaceTypeController')
const { createStaff, staffLogin} = require('../controller/staff/staffController')
const { getStaffDetails } = require('../controller/staff/getStaffController')
const { authentication,Authorization } = require('../middleware/middleware')
const { registerCompany } = require('../controller/company/createCompanyController')
const { billing } = require('../controller/billing/createBilling')
const { getBillingList } = require('../controller/billing/billingList')
const { createRole, getRoleDetails ,updateRoles,login} = require('../controller/role/roleController')


router.post('/register', registerUser);
router.put('/updateUser/:id', updateUserDetails)

router.post('/createRole', createRole)
router.post('/loginRole',login)
router.get('/getRoleDetails', getRoleDetails)
// router.put('/updaterole/:id',authentication,updateRoles)
router.put('/updaterole/:_id',authentication,Authorization,updateRoles)



router.post('/registerCompany', registerCompany)


router.post('/booking', booking);
router.put('/updateBooking', updateBooking)
router.get('/getBookingDetails', getBookingDetails);


router.post('/createBilling', billing)
router.get('/getBilling', getBillingList)


router.post('/directory', directory);
router.get('/getDirectoryDetails', getDirectoryDetails);



router.post('/spaceType', authentication, spaceType);
router.get('/getSpaceDetails', getSpaceDetails);
router.put('/updateSpaceDetails/:spaceType', authentication, updateSpaceType);



router.post('/createStaff', createStaff)
router.post('/staffLogin', staffLogin)
router.get('/staffDetal/:_id', getStaffDetails)


module.exports = router