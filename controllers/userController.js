const { response } = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const { generateJWT } = require("../helpers/jwt");

const getUser = async (req, res = response) => {
  try {
    let users = await User.find();

    if (users) {
      return res.status(200).json({
        status: true,
        resp: users,
      });
    }
  } catch (error) {
    // Errores
    console.log(error);
    res.status(500).json({
      status: false,
      resp: "Error de servidor",
    });
  }
};

const createUser = async (req, res = response) => {
  const {
    body: { email, password },
  } = req;

  try {
    // Verificar si existe ya ese email
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({
        status: false,
        resp: "Este email ya se ha dado de alta",
      });
    }

    user = new User(req.body);

    // Encriptar contraseña
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);

    // Guardar en base de datos
    await user.save();

    // Generar JWT
    const token = await generateJWT(user.id, user.name, user.email);

    return res.status(201).json({
      status: true,
      resp: "Creado",
      uid: user.id,
      name: user.name,
      token: token,
    });
  } catch (error) {
    // Errores
    console.log(error);
    res.status(500).json({
      status: false,
      resp: "Error de servidor",
    });
  }
};

const searchUsers = async (req, res = response) => {
  const {
    query: { name, hobbie },
  } = req;

  try {
    let user;

    if (name && !hobbie) {
      user = await User.find({ name });
    } else if (hobbie && !name) {
      user = await User.find({ hobbie });
    } else if (name && hobbie) {
      user = await User.find({ name, hobbie });
    }

    if (user) {
      return res.status(200).json({
        status: true,
        resp: user,
      });
    }
  } catch (error) {
    // Errores
    console.log(error);
    res.status(500).json({
      status: false,
      resp: "Error de servidor",
    });
  }
};

const destroyUser = async (req, res = response) => {
  const {
    query: { uid },
  } = req;

  console.log(uid);

  try {
    const user = await User.findByIdAndDelete(uid);

    if (user) {
      return res.status(200).json({
        status: true,
        resp: "Usuario eliminado",
      });
    }
  } catch (error) {
    // Errores
    console.log(error);
    res.status(500).json({
      status: false,
      resp: "Error de servidor",
    });
  }
};

const filterUsers = async (req, res = response) => {
  let now = new Date();
  let min = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000);

  console.log(now, min);
  try {
    const users = await User.find({ age: { $gt: 18 },  gender: "Femenino", createdAt: {$gt: min, $lt: now}}, {name:1, phone:1, hobbie:1});

    if (users) {
      return res.status(200).json({
        status: true,
        resp: users,
      });
    }
  } catch (error) {
    // Errores
    console.log(error);
    res.status(500).json({
      status: false,
      resp: "Error de servidor",
    });
  }
};

module.exports = {
  getUser,
  createUser,
  searchUsers,
  destroyUser,
  filterUsers,
};
