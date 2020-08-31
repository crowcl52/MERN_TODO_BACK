const Proyecto = require('../models/Proyecto');
const { validationResult } = require('express-validator');
const { request } = require('express');

exports.crearProyecto = async (req, resp) => {

    // Validar los campos
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return resp.status(400).json({ msg: errors.array() })
    }

    try {
        // Crear nuevo proyecto
        const proyecto = new Proyecto(req.body);
        // Guardar el creador
        proyecto.user = req.usuario.id;
        proyecto.save();
        resp.status(200).json({ proyecto })

    } catch (err) {
        resp.status(500).json({ mesg: 'Ha ocurrido un error' })
    }
}

// obtener los proyectos del usuario
exports.getProyects = async (req, resp) => {

    try {
        const projects = await Proyecto.find({ user: req.usuario.id }).sort({ createAt: -1 })
        console.log(req.usuario)
        resp.status(200).json({ msg: "ok", projects })

    } catch (err) {
        resp.status(500).json({ mesg: 'Hubo un error', err })
    }

}

// Actualiza un proyecto
exports.actualizarProyecto = async (req, resp) => {

    // Validar los campos
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return resp.status(400).json({ msg: errors.array() })
    }

    //  extraer la informacion del proyecto
    const { name } = req.body;
    const nuevoProyecto = {};
    if (name) {
        nuevoProyecto.name = name;
    }

    try {
        // revisar el id
        let proyecto = await Proyecto.findById(req.params.id)

        // el proyecto existe
        if (!proyecto) {
            return resp.status(400).json({ msg: ' Proyecto no encontrado ' })
        }

        // creador del proyecto
        if (proyecto.user.toString() !== req.usuario.id) {
            return resp.status(401).json({ msg: 'Usuario no autorizado para esta accion' })
        }

        // actualizar
        proyecto = await Proyecto.findByIdAndUpdate({ _id: req.params.id }, { $set: nuevoProyecto }, { new: true })
        resp.status(200).json({ msg: "ok", project: proyecto });


    } catch (err) {
        resp.status(500).json({ mesg: 'Hubo un error', err })
    }

}

// elimina un proyecto por id
exports.eliminarProyecto = async (req, resp) => {

    try {
        // revisar el id
        let proyecto = await Proyecto.findById(req.params.id)

        // el proyecto existe
        if (!proyecto) {
            return resp.status(400).json({ msg: ' Proyecto no encontrado ' })
        }

        // creador del proyecto
        if (proyecto.user.toString() !== req.usuario.id) {
            return resp.status(401).json({ msg: 'Usuario no autorizado para esta accion' })
        }

        // eliminar
        await Proyecto.findOneAndRemove({_id:req.params.id})
        resp.status(200).json({ msg: "Proyecto eliminado" });


    } catch (err) {
        resp.status(500).json({ mesg: 'Hubo un error', err })
    }
}