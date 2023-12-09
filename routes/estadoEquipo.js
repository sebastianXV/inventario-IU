const express = require('express');
const router = express.Router();
const {
    createEstadoEquipo,
    getAllEstadoEquipo,
    getEstadoEquipoById,
    updateEstadoEquipo,
    deleteEstadoEquipo

} = require('../controllers/estadoEquipo');
const { verificarToken } = require('../middlewares/autenticacion');
const { verificarPermisoAdministrador } = require('../middlewares/administrador');



// Crear un nuevo estado equipo
router.post('/',verificarToken, verificarPermisoAdministrador,verificarToken, verificarPermisoAdministrador, createEstadoEquipo);

// Obtener todos los estado equipos
router.get('/',verificarToken, verificarPermisoAdministrador, getAllEstadoEquipo);

// Obtener un estado equipo por su ID
router.get('/:id',verificarToken, verificarPermisoAdministrador, getEstadoEquipoById);

// Actualizar un estado equipo por su ID
router.put('/:id',verificarToken, verificarPermisoAdministrador, updateEstadoEquipo);

// Eliminar un estado equipo por su ID
router.delete('/:id',verificarToken, verificarPermisoAdministrador, deleteEstadoEquipo);

module.exports = router;
