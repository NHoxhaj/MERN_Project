const express = require('express');
const router = express.Router();
const ClientController = require('../controllers/client.controller');
const PersonalizedPizzaController = require('../controllers/personalizedPizza.controller');
const PizzaController = require('../controllers/pizza.controller');
const { getAllClientOrders } = require('../controllers/client.controller');
router.get('/:id/orders', getAllClientOrders);

router.post('/register', ClientController.register);
router.post('/login', ClientController.login);
router.get('/logout', ClientController.logout);
router.get('/accountInfo/:id', ClientController.getClientInfo);
router.put('/accountInfo/:id', ClientController.updateClient);
router.get('/accountInfo', ClientController.getAllClients);

router.post('/personalized-pizza', PersonalizedPizzaController.createPersonalizedPizza);
router.get('/personalized-pizzas', PersonalizedPizzaController.getAllPersonalizedPizzas);
router.put('/personalized-pizzas/:id', PersonalizedPizzaController.updatePersonalizedPizza);
router.delete('/personalized-pizzas/:id', PersonalizedPizzaController.deletePersonalizedPizza);
router.get('/pizzas/order/:clientId', PizzaController.getClientOrders);


router.post('/pizzas', PizzaController.createPizza);
router.get('/pizzas', PizzaController.getAllPizzas);
router.put('/pizzas/:id', PizzaController.updatePizza);
router.delete('/pizzas/:id', PizzaController.deletePizza);
router.get('/pizzas/order/:clientId', PizzaController.getClientOrders);

module.exports = router;
