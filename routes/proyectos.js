const express = require('express');
const router = express.Router();
const proyectoCtrl = require('../controllers/proyectoCtrl');
const auth = require('../middleware/auth-mwr');

const {check} = require('express-validator');

// Crear proyectos
// api/projects
router.post('/', auth, 
[ 
    check('name','El nombre del proyecto es obligatorio').not().isEmpty()
]
, proyectoCtrl.crearProyecto );

// Obtener todos los proyectos de usuario
router.get('/', auth, proyectoCtrl.getProyects);


// Actualizar proyecto
router.put('/:id', auth, 
[ 
    check('name','El nombre del proyecto es obligatorio').not().isEmpty()
],
 proyectoCtrl.actualizarProyecto )

 // eliminar proyecto
router.delete('/:id', auth, proyectoCtrl.eliminarProyecto )

module.exports = router;