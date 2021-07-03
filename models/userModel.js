const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  name: {
      type: String,
      require: true
  },
  email: {
      type: String,
      require: true,
      unique: true
  },
  phone: {
      type: Number,
      require: true
  },
  password: {
    type: String,
    require: true
  },
  age: {
      type: Number,
      require: true
  },
  gender: {
      type: String,
      require: true
  },
  hobbie: {
      type: String,
      require: true
  }
}, {
    timestamps: true
});

module.exports = model('User', userSchema);
