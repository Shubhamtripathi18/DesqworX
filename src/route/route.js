const express = require('express')
const router = express.Router()
const { registerUser, updateUserDetails } = require('../controller/userController');
const { getBookingDetails } = require('../controller/booking/getBooking')
const { booking } = require('../controller/booking/createBooking');
const { updateBooking } = require('../controller/booking/updateBooking');
const { directory } = require('../controller/directory/createDirectory')
const { getDirectoryDetails } = require('../controller/directory/getDirectory')
const { spaceType, getSpaceDetails, updateSpaceType } = require('../controller/spaceTypeController')
const { createAdmin, adminLogin } = require('../controller/admin/adminController')
const { getAdminDetails } = require('../controller/admin/getAdminController')
const { authentication } = require('../middleware/middleware')
const { registerCompany } = require('../controller/company/createCompanyController')
const { billing } = require('../controller/billing/createBilling')
const { getBillingList } = require('../controller/billing/billingList')
const { createRole, getRoleDetails ,updateRoles,login} = require('../controller/roleController')


router.post('/register', registerUser);
router.put('/updateUser/:id', updateUserDetails)


router.post('/createRole', createRole)
router.get('/getRoleDetails', getRoleDetails)
router.put('/updaterole/:id',updateRoles)
router.post('/loginRole',login)

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



router.post('/createAdmin', createAdmin)
router.post('/adminLogin', adminLogin)
router.get('/adminDetails/:_id', getAdminDetails)


module.exports = router