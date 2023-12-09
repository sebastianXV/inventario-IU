const { Schema, model } = require('mongoose');

const MarcaSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'Nombre de la marca requerido'],
        minlength: 1
    },
    estado: {
        type: Boolean,
        default: true,
        required: true
    },
    fechaCreacion: {
        type: Date,
        default: new Date()
    },
    fechaActualizacion: {
        type: Date,
        default: new Date()
    }
});

module.exports = model('Marca', MarcaSchema);
