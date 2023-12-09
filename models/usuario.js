const { Schema, model } = require('mongoose')

const UsuarioSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'Nombre genero requerido'],
        minlength: 1
    },
    email: {
        type: String,
        required: [true, 'Email requerido'],
        minlength: 1
    },
    contraseña: {
        type: String,
        required: [true, 'Contraseña requerida'],
    },
    rol: {
        type: String,
        enum: ['administrador', 'docente'],
        default: 'docente',
        required: true,
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
})

module.exports = model('Usuario', UsuarioSchema)