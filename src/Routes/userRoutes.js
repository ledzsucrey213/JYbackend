const express = require('express');
const router = express.Router();
const userController = require('../Controllers/userController');

router.get('/', userController.getUsers);
router.post('/', userController.createUser);
router.get('/:id', userController.getUserById);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);
router.get('/role/:role', userController.getUsersByRole);

module.exports = router;
