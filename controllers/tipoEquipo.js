const TipoEquipo = require('../models/tipoEquipo');
const { request, response } = require('express');


const createTipoEquipo = async (req = request, res = response) => {
    const { nombres } = req.body;

    try {
        const tipoEquipoDB = await TipoEquipo.findOne({ nombres });
        if (tipoEquipoDB) {
            return res.status(400).json({ msj: 'Ya existe un tipo de equipo con esos nombres' });
        }

        const tipoEquipo = new TipoEquipo
        ({
            nombres
        });
        await tipoEquipo.save();

        return res.status(201).json(tipoEquipo);
    } catch (error) {
        console.error('Error al crear el tipo de equipo:', error);
        return res.status(500).json({ msj: 'Error interno del servidor' });
    }
};


const getAllTipoEquipo= async (req = request, res = response) => {
    try {
        const tipoEquipo = await Director.find();
        return res.status(200).json(tipoEquipo);
    } catch (error) {
        console.error('Error al obtener los tipo de equipo:', error);
        return res.status(500).json({ msj: 'Error interno del servidor' });
    }
};


const getTipoEquipoById = async (req = request, res = response) => {
    const { id } = req.params;

    try {
        const tipoEquipo = await TipoEquipo.findById(id);
        if (!tipoEquipo) {
            return res.status(404).json({ msj: 'Tipo equipo no encontrado' });
        }

        return res.status(200).json(tipoEquipo);
    } catch (error) {
        console.error('Error al obtener el tipo de equipo:', error);
        return res.status(500).json({ msj: 'Error interno del servidor' });
    }
};

/**
 * Actualizar director
 */
const updateTipoEquipo = async (req = request, res = response) => {
    const { id } = req.params;
    const { nombres, estado } = req.body;

    try {
        const tipoEquipo = await Director.findByIdAndUpdate(
            id,
            { nombres, estado },
            { new: true }
        );

        if (!director) {
            return res.status(404).json({ msj: 'Tipo equipo no encontrado' });
        }

        return res.status(200).json(tipoEquipo);
    } catch (error) {
        console.error('Error al actualizar el tipo de equipo:', error);
        return res.status(500).json({ msj: 'Error interno del servidor' });
    }
};


const deleteTipoEquipo = async (req = request, res = response) => {
    const { id } = req.params;

    try {
        const tipoEquipo = await TipoEquipo.findByIdAndDelete(id);

        if (!tipoEquipo) {
            return res.status(404).json({ msj: 'tipo de equipo no encontrado' });
        }

        return res.status(204).json();
    } catch (error) {
        console.error('Error al eliminar el tipo de equipo:', error);
        return res.status(500).json({ msj: 'Error interno del servidor' });
    }
};

module.exports = {
    createTipoEquipo,
    getAllTipoEquipo,
    getTipoEquipoById,
    updateTipoEquipo,
    deleteTipoEquipo
};
