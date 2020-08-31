// rutas para crear usuarios
const express = require('express');
const router = express.Router();
const usuarioCtrl = require('../controllers/usuarioController');
const {check} = require('express-validator');

// Crear un usuario
// /api/usuarios
router.post( '/', 
[
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'Agrega un email Valido').isEmail(),
    check('password', 'El password debe ser minimo de 6 caracteres').isLength({min:6})
],
usuarioCtrl.crearUsuario )

module.exports = router;