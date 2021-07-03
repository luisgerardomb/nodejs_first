const mongoose = require('mongoose');

const dbConnection = async() => {
    try {
        await mongoose.connect( process.env.DB_CNN, {
            useNewUrlParser: true, 
            useUnifiedTopology: true,
            useCreateIndex: true,
        });
        
        console.log('DB online');
    } catch (error) {
        throw new Error(error);
    }
}

module.exports = {
    dbConnection,
}