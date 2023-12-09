const express = require('express');
const router = express.Router();
const {
    createMarca,
    getAllMarca,
    getMarcaById,
    updateMarca,
    deleteMarca

} = require('../controllers/marca');
const { verificarToken } = require('../middlewares/autenticacion');
const { verificarPermisoAdministrador } = require('../middlewares/administrador');

// Crear una nueva marca
router.post('/',verificarToken, verificarPermisoAdministrador, createMarca);

// Obtener todas las marcas
router.get('/',verificarToken, verificarPermisoAdministrador, getAllMarca);

// Obtener una marca por su ID
router.get('/:id',verificarToken, verificarPermisoAdministrador, getMarcaById);

// Actualizar una marca por su ID
router.put('/:id',verificarToken, verificarPermisoAdministrador, updateMarca);

// Eliminar una marca por su ID
router.delete('/:id',verificarToken, verificarPermisoAdministrador, deleteMarca);

module.exports = router;
