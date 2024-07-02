const Admin = require('../models/admin.model');
const Pizza= require('../models/pizza.model');
const PersonalizedPizza=require('../models/personalizedPizza.model');
const Client= require('../models/client.model')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
module.exports = {
    register: async (req, res) => {
      try {
        const existingAdmin = await Admin.findOne();
  
        if (existingAdmin) {
          return res.status(400).json({ message: 'Admin already exists.' });
        }
  
        const { username, email, password, confirmPassword } = req.body;
  
        if (password !== confirmPassword) {
          return res.status(400).json({ message: 'Passwords do not match.' });
        }
  
        const newAdmin = new Admin({
          username,
          email,
          password,
          confirmPassword,
        });
  
        await newAdmin.save();
        res.status(201).json({ message: 'Admin registered successfully.' });
      } catch (error) {
        console.error('Error registering admin:', error);
        res.status(500).json({ message: 'Internal server error.' });
      }
    },
  
  

login: (req, res) => {
    Admin.findOne({ username: req.body.username })
    .then(admin => {
        if (!admin) {
        return res.status(400).json({ msg: "This admin does not exist" });
        }
        bcrypt.compare(req.body.password, admin.password)
        .then(passwordIsValid => {
            if (passwordIsValid) {
            const newJWT = jwt.sign({
                _id: admin._id
            }, process.env.JWT_SECRET);
            res.cookie("admintoken", newJWT, process.env.JWT_SECRET, {
                httpOnly: true
            })
                .json({ msg: "Successfully logged in", adminLogged: admin });
            } else {
            res.status(400).json({ msg: "Can't login" });
            }
        })
        .catch(err => res.status(400).json({ msg: "Can't login", err }));
    })
    .catch(err => res.status(400).json(err));
},

logout: (req, res) => {
    res.clearCookie('admintoken');
    res.sendStatus(200);
},

getAllClientsOrders: (req, res) => {
    Client.find()
      .populate('pizza personalizedPizza')
      .then(clients => res.json(clients))
      .catch(err => res.status(400).json(err));
  },

updateStatus: (req, res) => {
    Pizza.findOneAndUpdate({_id: req.params.id}, req.body, {new:true})
        .then(updatedStatus => res.json(updatedStatus))
        .catch(err => res.json(err))
    PersonalizedPizza.findOneAndUpdate({_id: req.params.id}, req.body, {new:true})
        .then(updatedStatus => res.json(updatedStatus))
        .catch(err => res.json(err))
},
deleteClient :(req, res) => {
    Client.deleteOne({ _id: req.params.id })
        .then(deleteConfirmation => res.json(deleteConfirmation))
        .catch(err => res.json(err))
}
}
