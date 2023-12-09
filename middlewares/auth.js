const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Usuario = require('../models/usuario');

const autenticarUsuario = async (req, res) => {
  try {
    const { email, contraseña } = req.body;

    console.log('Contraseña ingresada:', contraseña);

    const usuario = await Usuario.findOne({ email });

    if (!usuario) {
      return res.status(401).json({ msg: 'Correo electrónico o contraseña incorrectos' });
    }

    const isPasswordValid = await bcrypt.compare(contraseña, usuario.contraseña);

    if (!isPasswordValid) {
      return res.status(401).json({ msg: 'Correo electrónico o contraseña incorrectos' });
    }

    // Generar un nuevo token
    const token = jwt.sign({ usuarioId: usuario._id }, 'secreto', { expiresIn: '1h' });

    // Almacenar el token en el objeto usuario (esto depende de cómo esté implementado tu modelo)
    usuario.token = token;

    // Guardar el usuario actualizado en la base de datos
    await usuario.save();

    // Devolver el usuario y el nuevo token en caso de autenticación exitosa
    return res.status(200).json({ usuario, token });

  } catch (error) {
    console.error('Error al autenticar usuario:', error);
    return res.status(500).json({ msg: 'Error en el servidor' });
  }
};

module.exports = { autenticarUsuario };
