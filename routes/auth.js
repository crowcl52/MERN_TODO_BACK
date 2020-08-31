// rutas para autenticar usuarios
const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const auth = require('../middleware/auth-mwr');


const authCtrl = require('../controllers/authCtrl');

// Crear un usuario
// /api/auth
router.post('/',
    [
        check('email', 'Agrega un email Valido').isEmail(),
        check('password', 'El password debe ser minimo de 6 caracteres').isLength({ min: 6 })
    ], authCtrl.authUsuario);

router.get('/',auth, authCtrl.usaerAuth)

module.exports = router;