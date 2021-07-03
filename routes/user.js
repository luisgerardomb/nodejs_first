// path = host + /api/user

const { check } = require("express-validator");
const { Router } = require("express"); // es igual a const express = require('express');
const router = Router(); // const router = express.Router;
const { getUser, createUser, searchUsers, destroyUser, filterUsers, } = require("../controllers/userController");
const { validateFields } = require("../middlewares/fieldValidator");
const { validateJWT } = require("../middlewares/jwtValidator");

// Rutas
router.post(
    "/create",
    [
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').not().isEmpty(),
        check('email', 'El email debe ser de un formato valido').isEmail(),
        check('phone', 'El télefono es obligatorio').not().isEmpty(),
        check('phone', 'El télefono debe constar de 10 caracteres').isLength({min: 10}),
        check('password', 'La contraseña es obligatoria').not().isEmpty(),
        check('password', 'La contraseña debe tener más de 6 caracteres').isLength({min: 6}),
        check('age', 'La edad es obligatoria').not().isEmpty(),
        check('gender', 'El género es obligatorio').not().isEmpty(),
        check('hobbie', 'El pasatiempo es obligatorio').not().isEmpty(),
        validateFields
    ],
    createUser);

// Rutas que necesitan de un JWT
router.get("/get", validateJWT, getUser); // Obtener todos los usuarios
router.get("/search", validateJWT, searchUsers); // Obtener usuarios por nombre y/o hobbie
router.delete("/destroy", validateJWT, destroyUser); // Eliminar usuario de la base por id
router.get("/filterByAgeAndGender", validateJWT, filterUsers);

module.exports = router;
