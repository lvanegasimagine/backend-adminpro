const { Schema, model } = require('mongoose');

const MedicoSchema = Schema({
    nombre: {
        type: String,
        required: true
    },
    img: {
        type: String
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    hospital: {
        type: Schema.Types.ObjectId,
        ref: 'Hospital',
        required: true
    }
});


// Esta funcion es para cambiar el _id que trae por defecto mongo por el uid es algo propio
MedicoSchema.method('toJSON', function() {

    const { __v, ...object } = this.toObject();
    return object;
});

module.exports = model('Medico', MedicoSchema);