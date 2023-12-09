const EstadoEquipo = require('../models/estadoEquipo');
const { request, response } = require('express');

const createEstadoEquipo = async (req = request, res = response) => {
    const { nombre} = req.body;
    try {
        const estadoEquipoBD = await EstadoEquipo.findOne({ nombre });
        if (estadoEquipoBD) {
            return res.status(400).json({ msj: 'Ya existe un estado con ese nombre' });
        }

        const estadoEquipo = new EstadoEquipo({ nombre, descripcion });
        await estadoEquipo.save();

        return res.status(201).json(estadoEquipo);
    } catch (error) {
        console.error('Error al crear el estado de equipo: ', error);
        return res.status(500).json({ msj: 'Error interno del servidor' });
    }
};

const getAllEstadoEquipo = async (req = request, res = response) => {
    try {
        const estadoEquipo= await EstadoEquipo.find();
        return res.json(estadoEquipo);
    } catch (error) {
        console.error('Error al obtener el estado de equipo:', error);
        return res.status(500).json({ msj: 'Error interno del servidor' });
    }
};

const getEstadoEquipoById = async (req = request, res = response) => {
    const { id } = req.params;
    try {
        const estadoEquipo = await EstadoEquipo.findById(id);
        if (!estadoEquipo) {
            return res.status(404).json({ msj: 'Estado equipo no encontrado' });
        }
        return res.json(estadoEquipo);
    } catch (error) {
        console.error('Error al obtener el estado de equipo por ID:', error);
        return res.status(500).json({ msj: 'Error interno del servidor' });
    }
};

const updateEstadoEquipo = async (req = request, res = response) => {
    const { id } = req.params;
    const { nombre, estado } = req.body;
    try {
        const estadoEquipo = await EstadoEquipo.findByIdAndUpdate(id, { nombre, estado }, { new: true });
        if (!estadoEquipo) {
            return res.status(404).json({ msj: 'Estado equipo no encontrado' });
        }
        return res.json(estadoEquipo);
    } catch (error) {
        console.error('Error al actualizar el estado de Equipo', error);
        return res.status(500).json({ msj: 'Error interno del servidor' });
    }
};

const deleteEstadoEquipo = async (req = request, res = response) => {
    const { id } = req.params;
    try {
        const estadoEquipo = await EstadoEquipo.findByIdAndDelete(id);
        if (!estadoEquipo) {
            return res.status(404).json({ msj: 'Estado equipo no encontrado' });
        }
        return res.json({ msj: 'Estado Equipo eliminado correctamente' });
    } catch (error) {
        console.error('Error al eliminar el estado de equipo:', error);
        return res.status(500).json({ msj: 'Error interno del servidor' });
    }
};

module.exports = {
    createEstadoEquipo,
    getAllEstadoEquipo,
    getEstadoEquipoById,
    updateEstadoEquipo,
    deleteEstadoEquipo
};
