const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken')

exports.crearUsuario = async (req, res) => {

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

        if (usuario) {
            return res.status(400).json({ msg: 'El usuario ya existe' });
        }

        // crear nuevo usuario
        usuario = new Usuario(req.body);
        // Hashear el password
        const salt = await bcrypt.genSalt(10);
        usuario.password = await bcrypt.hash(password, salt);

        // guardar nuevo usuario
        await usuario.save();

        // Crear y firmar el JWT
        const payload = {
            usuario:{
                id: usuario.id,
                name: usuario.name
            }
        }
        // firmar JTW
        jwt.sign(payload, process.env.SECRETA, {
            expiresIn:  60 * 60 * 24
        }, (err, token) => {
            if (err) throw err;
            // mensaje de confirmación
            res.status(200).json({ token, user:usuario })
        })

    } catch (err) {
        console.log(err);
        res.status(400).json({ msg: 'ha ocurrido un error' });
    }
}