const verificarRolDocente = (req, res, next) => {
    if (req.usuario.rol !== 'docente') {
      return res.status(403).json({ msg: 'Acceso no autorizado.' });
    }
      next();
  };
  
  module.exports = {
    verificarRolDocente
  };