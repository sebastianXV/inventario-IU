const verificarPermisoAdministrador = (req, res, next) => {
  console.log('Tipo de rol:', typeof req.usuario.rol);
  if (req.usuario.rol === 'administrador') {
    return res.status(403).json({ msg: 'No tienes permisos de administrador' });
  } 
  next();
};

module.exports = {
  verificarPermisoAdministrador
};
