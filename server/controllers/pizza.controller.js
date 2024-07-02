const Pizza = require('../models/pizza.model');

module.exports = {
getAllPizzas: (req, res) => {
    Pizza.find()
    .then(pizzas => res.json(pizzas))
    .catch(err => res.status(400).json(err));
},

getPizza: (req, res) => {
    Pizza.findById(req.params.id)
    .then(pizza => res.json(pizza))
    .catch(err => res.status(400).json(err));
},

createPizza: (req, res) => {
    const pizza = new Pizza(req.body);
    pizza.save()
    .then(() => res.json({ msg: "Pizza created successfully", pizza: pizza }))
    .catch(err => res.status(400).json(err));
},

updatePizza: (req, res) => {
    Pizza.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    .then(pizza => res.json(pizza))
    .catch(err => res.status(400).json(err));
},

deletePizza: (req, res) => {
    Pizza.findByIdAndDelete(req.params.id)
    .then(() => res.json({ msg: "Pizza deleted successfully" }))
    .catch(err => res.status(400).json(err));
},
getClientOrders: async (req, res) => {
    try {
      const clientId = req.params.clientId;
      const client = await Client.findById(clientId).populate('pizza personalizedPizza');

      if (!client) {
        return res.status(404).json({ message: "Client not found" });
      }

      res.json({ pizzas: client.pizza, personalizedPizzas: client.personalizedPizza });
    } catch (err) {
      res.status(400).json(err);
    }
  }
};
