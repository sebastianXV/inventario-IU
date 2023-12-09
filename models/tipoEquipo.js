const { Schema, model } = require('mongoose');

const TipoEquipoSchema = Schema({
    nombres: {
        type: String,
        required: [true, 'Nombre del equipo'],
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

module.exports = model('TipoEquipo', TipoEquipoSchema);
