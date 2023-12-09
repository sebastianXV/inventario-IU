const { Router } = require('express');
const {
    createUsuario,
    getAllUsuario,
    getUsuarioByID,
    updateUsuario,
    deleteUsuario,
    getUsuarioByEstado
} = require('../controllers/usuario');
const { verificarToken } = require('../middlewares/autenticacion');
const { verificarPermisoAdministrador } = require('../middlewares/administrador');

const router = Router();

/**
 * Crear un género, no requiere validacion con token
 */
router.post('/', createUsuario);

/**
 * Consultar todos los usuarios
 */
router.get('/', verificarToken, verificarPermisoAdministrador, getAllUsuario);

/**
 * Consultar un usuarios por su Estado
 */
router.get('/:estado', verificarToken, verificarPermisoAdministrador, getUsuarioByEstado);

/**
 * Consultar un usuario por su ID
 */
router.get('/:id', verificarToken, verificarPermisoAdministrador, getUsuarioByID);

/**
 * Actualizar un usuario
 */
router.put('/:id', verificarToken, verificarPermisoAdministrador, updateUsuario);

/**
 * Borrar un usuario por su ID
 */
router.delete('/:id', verificarToken, verificarPermisoAdministrador, deleteUsuario);

module.exports = router;
