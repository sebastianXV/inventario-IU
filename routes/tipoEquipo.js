const { Router } = require('express');
const {
  createTipoEquipo,
  getAllTipoEquipo,
  getTipoEquipoById,
  updateTipoEquipo,
  deleteTipoEquipo
} = require('../controllers/tipoEquipo');

const { verificarToken } = require('../middlewares/autenticacion');
const { verificarPermisoAdministrador } = require('../middlewares/administrador');


const router = Router();

// Crear un director
router.post('/',verificarToken, verificarPermisoAdministrador, createTipoEquipo);

// Obtener todos los directores
router.get('/',verificarToken, verificarPermisoAdministrador, getAllTipoEquipo);

// Obtener un director por su ID
router.get('/:id',verificarToken, verificarPermisoAdministrador, getTipoEquipoById);

// Actualizar un director
router.put('/:id',verificarToken, verificarPermisoAdministrador, updateTipoEquipo);

// Eliminar un director
router.delete('/:id',verificarToken, verificarPermisoAdministrador, deleteTipoEquipo);

module.exports = router;
