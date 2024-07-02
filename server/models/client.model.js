const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

const ClientSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "First name is required"]
  },
  lastName: {
    type: String,
    required: [true, "Last name is required"]
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    validate: {
      validator: val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
      message: "Please enter a valid email"
    }
  },
  address: {
    type: String,
    required: [true, "Address is required"]
  },
  city: {
    type: String,
    required: [true, "City is required"]
  },
  state: {
    type: String,
    required: [true, "State is required"],
    enum: ['Shqiperi']
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [3, "Password must be 3 characters or longer"]
  },
  confirmPassword: {
    type: String,
    required: true,
    validate: {
      validator: function(value) {
        return value === this.password;
      },
      message: 'Password must match confirm password',
    },
  },
  pizza: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Pizza' }],
  personalizedPizza: [{ type: mongoose.Schema.Types.ObjectId, ref: 'PersonalizedPizza' }]
}, { timestamps: true });

ClientSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    try {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
    } catch (err) {
      console.error('Error hashing password:', err);
      next(err);
    }
  }
  next();
});

const Client = mongoose.model('Client', ClientSchema);

module.exports = Client;
