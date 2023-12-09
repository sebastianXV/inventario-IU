const Marca = require('../models/marca');
const { request, response } = require('express');

const createMarca = async (req = request, res = response) => {
    try {
        const { nombre } = req.body;
        const marca = new Marca({ nombre });
        await marca.save();
        return res.status(201).json(marca).end(); 
    } catch (error) {
        console.error('Error al crear la marca:', error);
        return res.status(500).json({ msj: 'Error interno del servidor' }).end(); // Añade .end() aquí
    }
};


const getAllMarca = async (req = request, res = response) => {
    try {
        const marca = await Marca.find();
        return res.json(marca);
    } catch (error) {
        console.error('Error al obtener las marcas:', error);
        return res.status(500).json({ msj: 'Error interno del servidor' });
    }
};

const getMarcaById = async (req = request, res = response) => {
    const { id } = req.params;
    try {
        const marca = await Marca.findById(id);
        if (!marca) {
            return res.status(404).json({ msj: 'marca no encontrada' });
        }
        return res.json(marca);
    } catch (error) {
        console.error('Error al obtener la marca por ID:', error);
        return res.status(500).json({ msj: 'Error interno del servidor' });
    }
};

const updateMarca = async (req = request, res = response) => {
    const { id } = req.params;
    const { nombre} = req.body;
    try {
        const marca = await Marca.findByIdAndUpdate(id, { nombre, estado, slogan, descripcion }, { new: true });
        if (!marca) {
            return res.status(404).json({ msj: 'marca no encontrada' });
        }
        return res.json(marca);
    } catch (error) {
        console.error('Error al actualizar la marca:', error);
        return res.status(500).json({ msj: 'Error interno del servidor' });
    }
};

const deleteMarca = async (req = request, res = response) => {
    const { id } = req.params;
    try {
        const marca = await Marca.findByIdAndDelete(id);
        if (!marca) {
            return res.status(404).json({ msj: 'marca no encontrada' });
        }
        return res.json({ msj: 'marca eliminada correctamente' });
    } catch (error) {
        console.error('Error al eliminar la marca:', error);
        return res.status(500).json({ msj: 'Error interno del servidor' });
    }
};

module.exports = {
    createMarca,
    getAllMarca,
    getMarcaById,
    updateMarca,
    deleteMarca
};
