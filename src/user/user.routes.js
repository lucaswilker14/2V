var express = require('express');
var router = express.Router();
const userController = require('./user.controller');
const auth = require('./../util/auth-service');

//rotas de usuarios
router.post('/', userController.post);
 
router.get('/:id', userController.getById); 

router.get('/:id', auth.authorize, userController.getById);

router.get('/:userId/items', auth.authorize, userController.getItems);

router.post('/:id', auth.authorize, userController.addItem);

router.put('/:userId/item/:itemId', auth.authorize, userController.returnedItem);

router.delete('/:userId/item/:itemId', auth.authorize, userController.removeItem);

router.get('/:userId/item/:itemId', auth.authorize, userController.solicitedItem); //quando clicar no botão C -FRONT

router.delete('/:userId', auth.authorize, userController.removeUser);

module.exports = router;