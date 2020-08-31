const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken')

exports.authUsuario = async (req, res) => {

    // revisar si hay errores
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ msg: errors.array() })
    }

    // extraer email y password
    const { email, password } = req.body;


    try {

        // Validar el email del usuario
        let usuario = await Usuario.findOne({ email });

        if (!usuario) {
            return res.status(400).json({ msg: 'El usuario no existe' });
        }

        // Revisar passwors
        const sucPassword = await bcrypt.compare(password, usuario.password)

        if (!sucPassword) {
            return res.status(400).json({ msg: 'Password Incorrecto' });
        }

        // Crear y firmar el JWT
        const payload = {
            usuario: {
                id: usuario.id,
                name: usuario.name
            }
        }
        // firmar JTW
        jwt.sign(payload, process.env.SECRETA, {
            expiresIn: 60 * 60 * 24
        }, (err, token) => {
            if (err) throw err;
            // mensaje de confirmación
            let user = {
                name: usuario.name,
                email: usuario.email
            }
            res.status(200).json({ msg:'Inicio session exitoso' ,user, token })
        })


    } catch (err) {
        console.log(err)
        res.status(400).json({ msg: err });
    }
}
// obtener el usuario autenticado
exports.usaerAuth = async (req, res) => {


    try {
        const user = await Usuario.findById(req.usuario.id).select('-password');
        res.status(200).json({ user })
    } catch (err) {
        console.log(err)
        res.status(500).json({ msg: 'Hubo un error' });
    }
}