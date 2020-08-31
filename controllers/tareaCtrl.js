const Proyecto = require('../models/Proyecto');
const Task = require('../models/Tarea');
const { validationResult } = require('express-validator');
const router = require('../routes/proyectos');
const Tarea = require('../models/Tarea');

// Crear una tarea
exports.crearTarea = async (req, resp) => {

    // Validar los campos
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return resp.status(400).json({ msg: errors.array() })
    }

    // extraer proyecto
    const { project } = req.body;

    try {
        // Validar proyecto
        const isProyecto = await Proyecto.findById(project);
        if (!isProyecto) { return resp.status(404).json({ msg: "proyecto no encontrado" }) }

        // Revisar si la persona tiene el proyecto
        if (isProyecto.user.toString() !== req.usuario.id) {
            return resp.status(401).json({ msg: 'Usuario no autorizado para esta accion' })
        }

        const task = new Task(req.body);
        await task.save()

        resp.status(200).json({ msg: "ok", task })

    } catch (err) {
        resp.status(500).json({ mesg: 'Ha ocurrido un error' })
    }
}

// Obtener tareas por proyecto

exports.getTareas = async (req, resp) => {

    // extraer proyecto
    const { id } = req.params;
    const project = id;
    console.log(req.params)
    try {
        // Validar proyecto
        const isProyecto = await Proyecto.findById(project);
        if (!isProyecto) { return resp.status(404).json({ msg: "proyecto no encontrado" }) }

        // Revisar si la persona tiene el proyecto
        if (isProyecto.user.toString() !== req.usuario.id) {
            return resp.status(401).json({ msg: 'Usuario no autorizado para esta accion' })
        }

        const task = await Tarea.find({ project }).sort({index: 1})

        resp.status(200).json({ msg: "ok", task })

    } catch (err) {
        resp.status(500).json({ mesg: 'Ha ocurrido un error' })
    }
}

// actualizar tareas
exports.updateTarea = async (req, resp) => {

    // Validar los campos
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return resp.status(400).json({ msg: errors.array() })
    }

    // extraer proyecto
    const { name, description, duration, remain, inprogress,index,status, project } = req.body;

    try {

        // Validar tarea
        const isTarea = await Task.findById(req.params.id);
        if (!isTarea) { return resp.status(404).json({ msg: "tarea no encontrado" }) }

        // Validar proyecto
        const isProyecto = await Proyecto.findById(project);
        if (!isProyecto) { return resp.status(404).json({ msg: "proyecto no encontrado" }) }

        // Revisar si la persona tiene el proyecto
        if (isProyecto.user.toString() !== req.usuario.id) {
            return resp.status(401).json({ msg: 'Usuario no autorizado para esta accion' })
        }
    
        // Crear un nuevo objeto
        const newTask = {};
        if (name){ newTask.name = name };
        if (description){ newTask.description = description };
        if (duration){ newTask.duration = duration };
        if (remain){ newTask.remain = remain };
        if (inprogress){ newTask.inprogress = inprogress }else{newTask.inprogress = false };
        if (index){ newTask.index = index };
        if (status){ newTask.status = status; newTask.completeAt = Date.now()  }else{newTask.status = false };

        // guardar nueva tarea
        const task = await Tarea.findOneAndUpdate({ _id: req.params.id }, newTask,{ new:true })

        resp.status(200).json({ msg: "ok", task });

    } catch (err) {
        resp.status(500).json({ mesg: 'Ha ocurrido un error' })
    }
}

// eliminar tarea

exports.deleteTarea = async (req,resp) =>{
    // extraer proyecto
    const { project } = req.body;

    try {

        // Validar tarea
        const isTarea = await Task.findById(req.params.id);
        if (!isTarea) { return resp.status(404).json({ msg: "tarea no encontrado" }) }


        // Validar proyecto
        const isProyecto = await Proyecto.findById(project);

        // Revisar si la persona tiene el proyecto
        if (isProyecto.user.toString() !== req.usuario.id) {
            return resp.status(401).json({ msg: 'Usuario no autorizado para esta accion' })
        }

        // eliminar  tarea
        const task = await Tarea.findOneAndRemove({ _id: req.params.id })
        

        resp.status(200).json({ msg: "Tarea eliminada con exito", task });

    } catch (err) {
        resp.status(500).json({ mesg: 'Ha ocurrido un error' })
    }
}