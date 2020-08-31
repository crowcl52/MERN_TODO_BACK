const express = require('express');
const router = express.Router();
const tareaCtrl = require('../controllers/tareaCtrl');
const auth = require('../middleware/auth-mwr');
const {check} = require('express-validator');

// Crear proyectos
// api/task
router.post('/', auth, 
[ 
    check('name','El nombre del proyecto es obligatorio').not().isEmpty(),
    check('description','La descripcion es obligatoria').not().isEmpty(),
    check('duration','La duracion es obligatoria').not().isEmpty(),
    check('remain','El tiempo faltante es obligatorio').not().isEmpty(),
    check('inprogress','La tarea actual es obligatoria').not().isEmpty(),
    check('index','El index es obligatorio').not().isEmpty(),
    check('project','El id del proyecto es obligatorio').not().isEmpty(),
]
, tareaCtrl.crearTarea);

// Obtener tareas por proyecto
router.get('/:id', auth, tareaCtrl.getTareas);

router.put('/:id', auth, 
[ 
    check('name','El nombre del proyecto es obligatorio').not().isEmpty(),
    check('description','La descripcion es obligatoria').not().isEmpty(),
    check('duration','La duracion es obligatoria').not().isEmpty(),
    check('remain','El tiempo faltante es obligatorio').not().isEmpty(),
    check('inprogress','La tarea actual es obligatoria').not().isEmpty(),
    check('index','El index es obligatorio').not().isEmpty(),
    check('project','El id del proyecto es obligatorio').not().isEmpty(),
    check('status','El status del proyecto es obligatorio').not().isEmpty(),
]
, tareaCtrl.updateTarea);

router.delete('/:id', auth, tareaCtrl.deleteTarea);

module.exports = router;