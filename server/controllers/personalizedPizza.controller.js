const PersonalizedPizza = require('../models/personalizedPizza.model');


module.exports = {
    getAllPersonalizedPizzas: (req, res) => {
        PersonalizedPizza.find()
            .then(pizzas => res.json(pizzas))
            .catch(err => res.status(400).json(err));
    },

    getPersonalizedPizza: (req, res) => {
        PersonalizedPizza.findById(req.params.id)
            .then(pizza => res.json(pizza))
            .catch(err => res.status(400).json(err));
    },
   
        createPersonalizedPizza: (req, res) => {
            const pizza = new PersonalizedPizza(req.body);
            pizza.save()
                .then(() => res.json({ msg: "Personalized pizza created successfully", pizza: pizza }))
                .catch(err => res.status(400).json(err));
        },
    

    updatePersonalizedPizza: (req, res) => {
        PersonalizedPizza.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
            .then(pizza => res.json(pizza))
            .catch(err => res.status(400).json(err));
    },

    deletePersonalizedPizza: (req, res) => {
        PersonalizedPizza.findByIdAndDelete(req.params.id)
            .then(() => res.json({ msg: "Personalized pizza deleted successfully" }))
            .catch(err => res.status(400).json(err));
    }
};
