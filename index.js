const express = require('express');
const conectarDB = require('./config/db');
const cors = require('cors');

// crear servidor
const app = express();
// conectar la db
conectarDB();
// habilitar cors
app.use(cors());

// Habilitar express.json
app.use( express.json({extended:true}) )

// puerto de la app
const PORT = process.env.PORT || 8080;

// Importar rutas
app.use('/api/usuarios', require('./routes/usuarios') );
app.use('/api/auth', require('./routes/auth') );
app.use('/api/projects', require('./routes/proyectos') );
app.use('/api/task', require('./routes/tareas') );


// arrancar la app
app.listen( PORT,  ()=> {
    console.log( `El servidor esta arriba! en el puero ${PORT}` )
} )