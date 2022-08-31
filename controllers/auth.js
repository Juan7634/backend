const {response} = require('express');
const conexion = require('../database/config');
const bcrypt = require('bcryptjs');
const {generarJWT} = require('../helpers/jwt');


const createUser = async (req, res = response) => {
    const {name, last_name, avatar, username, password} = req.body;
    // const data = req.body;
    // console.log(data);

    
    try{

        const result = await conexion.query('SELECT * FROM users WHERE username = ?', [username]);

        if(result.length > 0){
            return res.status(400).json({
                ok: false,
                message: 'El usuario ya existe'
            });
        }
                

        const newUser = {
            name, 
            last_name,
            avatar, 
            username,
            password
        };

        //Encriptar la contraseña
        const salt = bcrypt.genSaltSync();
        newUser.password = bcrypt.hashSync(password, salt);


        //Insertar en la base de datos
        await conexion.query('INSERT INTO users SET ?', [newUser]);

        //Generar JWT
        const token = await generarJWT('1',newUser.name);


    
        res.status(201).json({
            ok: true,
            message: 'Usuario creado',
            token: token
        });
    }catch(e){
        console.log(e);
        res.status(500).json({
            message: 'Error al crear el usuario',
            ok: false
        });
    }

};


const loginUsuario = async (req, res) => {

    const {username, password} = req.body;

    try{

        //Verificar si el username existe
        const result = await conexion.query('SELECT * FROM users WHERE username = ?', [username]);

        if(result.length == 0){
            return res.status(400).json({
                ok: false,
                message: 'El usuario no existe'
            });
        }

        //Confirmar contraseñas

        const validPassword = bcrypt.compareSync(password, result[0].password);
           
        if(!validPassword){
            return res.status(400).json({
                ok : false,
                message: "User / password is incorrect"
            });
        }


        //Generar JWT
         
         const token = await generarJWT(result[0].id,result[0].name);



        res.send({
            message: 'Se ha logeado',
            ok: true,
            id: result[0].id,
            token
    
        });
    }catch(e){
        console.log(e);
        res.status(500).json({
            message: 'Error al crear el usuario',
            ok: false
        });
    }


};

const revalidarToken = async (req, res)=>{

   const {uid, name} = req;


    const token = await generarJWT(uid, name);



    res.send({
        uid,
        name,
        message: 'Renovar',
        ok: true, 
        token

    });
}


module.exports = {
    createUser,
    loginUsuario,
    revalidarToken
};
