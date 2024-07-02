const Client = require('../models/client.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const PersonalizedPizza = require('../models/personalizedPizza.model'); 



module.exports = {
    register: async (req, res) => {
      try {
        const { firstName,lastName, email,address,city, state, password, confirmPassword }=req.body;
     
        if (password !== confirmPassword) {
            return res.status(400).json({ message: 'Passwords do not match.' });
          }
    
          const newClient = new Client({
            firstName,lastName, email,address,city, state, password, confirmPassword 
          });
    
          await newClient.save();
          res.status(201).json({ message: 'Client registered successfully.' });
        } catch (error) {
          console.error('Error registering client:', error);
          res.status(500).json({ message: 'Internal server error.' });
        }
      },
       getAllClientOrders : async (req, res) => {
        try {
          const client = await Client.findById(req.params.id).populate('pizza personalizedPizza');
          if (!client) {
            return res.status(404).json({ message: "Client not found" });
          }
          res.json({
            pizzas: client.pizza,
            personalizedPizzas: client.personalizedPizza,
          });
        } catch (err) {
          res.status(400).json(err);
        }
      },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const client = await Client.findOne({ email });
      if (!client) {
        return res.status(400).json({ message: "Invalid login attempt" });
      }

      const passwordIsValid = await bcrypt.compare(password, client.password);
      if (!passwordIsValid) {
        return res.status(400).json({ message: "Invalid login attempt" });
      }

      const token = jwt.sign({ _id: client._id }, process.env.JWT_SECRET, {
        expiresIn: '1h'
      });
      res.cookie("usertoken", token, { httpOnly: true });
      res.json({ message: "Successfully logged in", client });
    } catch (err) {
      res.status(400).json({ message: "Invalid login attempt", error: err });
    }
  },

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
    },



    logout: (req, res) => {
      res.clearCookie('usertoken');
      res.sendStatus(200);
  },

  getAllClients: async (req, res) => {
    try {
      const clients = await Client.find().populate('pizza personalizedPizza');
      res.json(clients);
    } catch (err) {
      res.status(400).json(err);
    }
  },

  getClient: async (req, res) => {
    try {
      const client = await Client.findById(req.params.id).populate('pizza personalizedPizza');
      if (!client) {
        return res.status(404).json({ message: "Client not found" });
      }
      res.json(client);
    } catch (err) {
      res.status(400).json(err);
    }
  },
  createPersonalizedPizza: (req, res) => {
    const pizza = new PersonalizedPizza(req.body);
    pizza.save()
        .then(() => res.json({ msg: "Personalized pizza created successfully", pizza: pizza }))
        .catch(err => res.status(400).json(err));
},

getClientInfo: async (req, res) => {
  try {
    const client = await Client.findById(req.params.id).populate('pizza personalizedPizza');
    if (!client) {
      return res.status(404).json({ message: "Client not found" });
    }
    res.json(client);
  } catch (err) {
    res.status(400).json(err);
  }
},
  updateClient: async (req, res) => {
    try {
      const { id } = req.params;
      const updateData = req.body;

      if (updateData.password) {
        if (updateData.password !== updateData.confirmPassword) {
          return res.status(400).json({ message: "Passwords do not match" });
        }
        const salt = await bcrypt.genSalt(10);
        updateData.password = await bcrypt.hash(updateData.password, salt);
      }

      const updatedClient = await Client.findByIdAndUpdate(id, updateData, { new: true });
      if (!updatedClient) {
        return res.status(404).json({ message: "Client not found" });
      }
      res.json(updatedClient);
    } catch (err) {
      res.status(400).json(err);
    }
  }
  
};