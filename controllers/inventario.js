const Inventario = require('../models/inventario');
const { request, response } = require('express');

// Crear un inventario
const createInventario = async (req = request, res = response) => {
    const {
        serial,
        modelo,
        descripcion,
        color,
        fechaCompra,
        precio,
        usuarioPrincipal,
        estadoEquipo,
        marca,
        tipoEquipo
    } = req.body;

    try {
        const inventario = new Inventario({
            serial,
            modelo,
            descripcion,
            color,
            fechaCompra,
            precio,
            usuarioPrincipal,
            estadoEquipo,
            marca,
            tipoEquipo
        });

        await inventario.save();

        return res.status(201).json(inventario);
    } catch (error) {
        console.error('Error al crear el inventario:', error);
        return res.status(500).json({ msj: 'Error interno del servidor' });
    }
};

// Obtener todos los inventarios
const getAllInventario = async (req = request, res = response) => {
    try {
        const inventarioList = await Inventario.find();
        return res.status(200).json(inventarioList);
    } catch (error) {
        console.error('Error al obtener los inventarios:', error);
        return res.status(500).json({ msj: 'Error interno del servidor' });
    }
};

// Obtener un inventario por su ID
const getInventarioById = async (req = request, res = response) => {
    const { id } = req.params;

    try {
        const inventario = await Inventario.findById(id);
        if (!inventario) {
            return res.status(404).json({ msj: 'inventario no encontrado' });
        }
        return res.status(200).json(inventario);
    } catch (error) {
        console.error('Error al obtener el inventario:', error);
        return res.status(500).json({ msj: 'Error interno del servidor' });
    }
};

// Actualizar un inventario por su ID
const updateInventario = async (req = request, res = response) => {
    const { id } = req.params;
    const upadateInventario = req.body;

    try {
        const updateInventario = await Inventario.findByIdAndUpdate(id, upadateInventario, { new: true });
        if (!updateInventario) {
            return res.status(404).json({ msj: 'Inventario no encontrado' });
        }
        return res.status(200).json(updateInventario);
    } catch (error) {
        console.error('Error al actualizar el inventario:', error);
        return res.status(500).json({ msj: 'Error interno del servidor' });
    }
};

// Eliminar un inventario por su ID
const deleteInventario = async (req = request, res = response) => {
    const { id } = req.params;

    try {
        const deletedInventario = await Inventario.findByIdAndDelete(id);
        if (!deletedInventario) {
            return res.status(404).json({ msj: 'Inventario no encontrado' });
        }
        return res.status(200).json({ msj: 'Inventario eliminado correctamente' });
    } catch (error) {
        console.error('Error al eliminar el inventario:', error);
        return res.status(500).json({ msj: 'Error interno del servidor' });
    }
};

module.exports = {
    createInventario,
    getAllInventario,
    getInventarioById,
    updateInventario,
    deleteInventario
};
