const express = require('express');
const router = express.Router();
const {
    createInventario,
    getAllInventario,
    getInventarioById,
    updateInventario,
    deleteInventario
} = require('../controllers/inventario');
const { verificarToken } = require('../middlewares/autenticacion');
const { verificarPermisoAdministrador } = require('../middlewares/administrador');
const { verificarRolDocente } = require('../middlewares/docente');


// Crear un inventario
router.post('/',verificarToken, verificarPermisoAdministrador, createInventario);

// Obtener todos los inventarios
router.get('/',verificarToken, verificarPermisoAdministrador, getAllInventario);

// Obtener un inventario por su ID
router.get('/:id',verificarToken, verificarPermisoAdministrador, getInventarioById);

// Actualizar un inventario por su ID
router.put('/:id',verificarToken, verificarPermisoAdministrador, updateInventario);

// Eliminar un inventario por su ID
router.delete('/:id',verificarToken, verificarPermisoAdministrador, deleteInventario);

module.exports = router;
