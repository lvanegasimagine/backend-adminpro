const { Schema, model } = require('mongoose');

const HospitalSchema = Schema({
    nombre: {
        type: String,
        required: true
    },
    img: {
        type: String
    },
    usuario: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    }
}, { collection: 'hospitales' });


// Esta funcion es para cambiar el _id que trae por defecto mongo por el uid es algo propio
HospitalSchema.method('toJSON', function() {

    const { __v, ...object } = this.toObject();
    return object;
});

module.exports = model('Hospital', HospitalSchema);