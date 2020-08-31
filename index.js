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
const port = process.env.PORT || 8080;

// create normal resp
app.get('/api', (req, res) =>{
    res.send(`
    <h1 style="text-align:center; padding: 2rem 3rem;" > API MEARN Todo arriba </h1>
    `)
} )

// Importar rutas
app.use('/api/usuarios', require('./routes/usuarios') );
app.use('/api/auth', require('./routes/auth') );
app.use('/api/projects', require('./routes/proyectos') );
app.use('/api/task', require('./routes/tareas') );


// arrancar la app
app.listen( port, '0.0.0.0',  ()=> {
    console.log( `El servidor esta arriba! en el puero ${port}` )
} )