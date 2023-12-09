const jwt = require('jsonwebtoken');

const verificarToken = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ msg: 'No se proporcionó el token de acceso' });
  }

  try {
    const decoded = jwt.verify(token, "sebastian");

    // Asegúrate de que el objeto decoded tiene la propiedad "usuario"
    if (!decoded.usuario) {
      return res.status(401).json({ msg: 'Token inválido: no se encontró información de usuario' });
    }

    // Asigna el objeto usuario a req.usuario
    req.usuario = decoded.usuario;

    next();
  } catch (error) {
    return res.status(401).json({ msg: 'Token inválido.' });
  }
};

module.exports = {
  verificarToken
};

