const mongoose = require('mongoose');

const connectDB = async() => {
    try {
        await mongoose.connect(process.env.DB_CNN, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Conexion Exitosa Mongo Atlas');

    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    connectDB
};