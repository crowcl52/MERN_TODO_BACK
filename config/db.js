const mongoose = require('mongoose');
require('dotenv').config({path : 'variables.env'});

const conectarDB = async () =>{
    try{
        await mongoose.connect( process.env.DB_MONGO,{
            useNewUrlParser:true,
            useUnifiedTopology:true,
            useFindAndModify: false
        });
        console.log( 'DB Connectada!!' )
    }catch(err){
        console.log(err);
        process.exit(1);
    }
}

module.exports = conectarDB;