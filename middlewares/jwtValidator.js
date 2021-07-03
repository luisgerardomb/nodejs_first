const { response } = require("express");
const jwt = require('jsonwebtoken');
const User = require("../models/userModel");

const validateJWT = async(req, res = response, next) => {
    const { query: { token },} = req;

    if(!token){
        res.status(401).json({
            status: false,
            resp: 'Petición no autentificada',
        })
    }

    try {

        const {uid} = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(uid);

        if(user){
            next();
        }
        
    } catch (error) {
        return res.status(401).json({
            status: false, 
            resp: 'Token inválido',
        })
    }

}

module.exports = {
    validateJWT,
}