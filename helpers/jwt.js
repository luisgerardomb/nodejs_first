const jwt = require('jsonwebtoken');

const generateJWT = (uid, name, email) => {
    return new Promise((resolve, reject) => {
        const payload = {uid, name, email};

        jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '6h'
        }, (err, token) => {
            if(err){
                console.log(err);
                reject('Ha sucedido un error')
            }

            resolve(token)
        });
    });
}

module.exports = {
    generateJWT,
}