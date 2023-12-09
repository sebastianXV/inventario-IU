const { Schema, model } = require('mongoose');

const InventarioSchema = Schema({
    serial: {
        type: String,
        unique: true,
        required: [true, 'Serial único de la producción requerido']
    },
    modelo: {
        type: String,
        required: [true, 'Título de la producción requerido'],
        minlength: 1
    },
    descripcion: {
        type: String
    },
    color: {
        type: String,
        unique: true
    },
    fechaCompra: {
        type: Date,
        default: new Date()
    },
    usuarioPrincipal: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    estadoEquipo: {
        type: Schema.Types.ObjectId,
        ref: 'EstadoEquipo',
        required: true
    },
    marca: {
        type: Schema.Types.ObjectId,
        ref: 'Marca',
        required: true
    },
    tipoEquipo: {
        type: Schema.Types.ObjectId,
        ref: 'TipoEquipo',
        required: true
    }
});

module.exports = model('Inventario', InventarioSchema);
