var express = require('express');
var router = express.Router();
const adminController = require('./admin.controller');
const auth = require('./../util/auth-service');


// //rotas para admin

router.post('/', auth.isAdmin, auth.authorize, adminController.post);
router.post('/unique', adminController.post);
router.put('/systemDate', auth.isAdmin, auth.authorize, adminController.setSystemDate);
router.get('/', auth.isAdmin, auth.authorize, adminController.getAllUser);

module.exports = router;