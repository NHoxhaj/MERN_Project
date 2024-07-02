const express = require('express');
const router = express.Router();
const AdminController = require('../controllers/admin.controller');

router.post('/register', AdminController.register);
router.post('/login', AdminController.login);
router.get('/logout', AdminController.logout);
router.get('/orders', AdminController.getAllClientsOrders);
router.put('/orders/:id', AdminController.updateStatus);
router.delete('/orders/:id', AdminController.deleteClient);

module.exports = router;
