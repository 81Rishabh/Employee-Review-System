const express = require('express');
const router = express.Router();
const homeController = require('../controller/homeController');
const passport = require('passport');

router.get('/', passport.checkAuthentication , homeController.home);
router.use('/employee',  require('../routes/users'));
router.use('/admin',  require('../routes/admin'));

module.exports = router;