const Usuario = require('../models/usuario');
const { request, response } = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


/**
 * Creación de usuario
 */
const createUsuario = async (req = request, res = response) => {
  try {
    const { nombre, email, contraseña, rol } = req.body;
    const usuario = await Usuario.findOne({ email });

    if (usuario) {
      return res.status(400).json({ msg: 'Ya existe el usuario' });
    }
    const salt = await bcrypt.genSalt(10);
    const contraseñaEncriptada = await bcrypt.hash(contraseña, salt);
    const usuarioNuevo = new Usuario({
      nombre, email, contraseña: contraseñaEncriptada, rol,
    });
    // Generar el token de autenticación
    const token = jwt.sign(
      { usuario: usuarioNuevo._id },
      'sebastian',
      { expiresIn: '1h' }
    );
    console.log(token);
    usuarioNuevo.token = token;
    await usuarioNuevo.save();
    return res.status(201).json({ usuario: usuarioNuevo, token });
  } catch (e) {
    return res.status(500).json({ msg: 'Error al crear el usuario' });
  }
};


/**
 * Consultar todos los usuarios
 */
const getAllUsuario = async (req = request, res = response) => {
  try {
    const usuarios = await Usuario.find();
    return res.json(usuarios);
  } catch (error) {
    console.error('Error al obtener los usuarios:', error);
    return res.status(500).json({ msj: 'Error interno del servidor' });
  }
};


/**
 * Consultar un usuario por su ID
 */
const getUsuarioByID = async (req = request, res = response) => {
  const { id } = req.params;
  try {
    const usuario = await Usuario.findById(id);
    if (!usuario) {
      return res.status(404).json({ msj: 'Usuario no encontrado' });
    }
    return res.json(usuario);
  } catch (error) {
    console.error('Error al obtener el usuario:', error);
    return res.status(500).json({ msj: 'Error interno del servidor' });
  }
};


/**
 * Consultar un usuario por su Estado
 */
const getUsuarioByEstado = async (req = request, res = response) => {
  try {
    const { estado } = req.query;
    const usuarios = await Usuario.find({ estado });
    return res.json(usuarios);
  } catch (error) {
    console.error('Error al obtener el usuario:', error);
    return res.status(500).json({ msj: 'Error interno del servidor' });
  }
};


/**
 * Actualizar un usuario
 */
const updateUsuario = async (req = request, res = response) => {
  const { id } = req.params;
  const { nombre, estado } = req.body;
  try {
    const usuarioActualizado = await Usuario.findByIdAndUpdate(id, { nombre, estado }, { new: true });
    if (!usuarioActualizado) {
      return res.status(404).json({ msj: 'Usuario no encontrado' });
    }
    return res.json(usuarioActualizado);
  } catch (error) {
    console.error('Error al actualizar el usuario:', error);
    return res.status(500).json({ msj: 'Error interno del servidor' });
  }
};


/**
 * Borrar un usuario por su ID
 */
const deleteUsuario = async (req = request, res = response) => {
  const { id } = req.params;
  try {
    const usuarioEliminado = await Usuario.findByIdAndDelete(id);
    if (!usuarioEliminado) {
      return res.status(404).json({ msj: 'Usuario no encontrado' });
    }
    return res.json({ msj: 'Usuario eliminado correctamente', usuario: usuarioEliminado });
  } catch (error) {
    console.error('Error al eliminar el Usuario:', error);
    return res.status(500).json({ msj: 'Error interno del servidor' });
  }
};

module.exports = {
  createUsuario,
  getAllUsuario,
  getUsuarioByID,
  getUsuarioByEstado,
  updateUsuario,
  deleteUsuario
};
