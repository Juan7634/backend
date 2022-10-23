const {response} = require('express');
const conexion = require('../database/config');
const bcrypt = require('bcryptjs');
const {generarJWT} = require('../helpers/jwt');


const createUser = async (req, res = response) => {
    const {id, username,password,role} = req.body;
    

    
    try{

        const result = await conexion.query('SELECT * FROM usuarios_sistema WHERE username = ?', [username]);

        if(result.length > 0){
            return res.status(400).json({
                ok: false,
                message: 'El usuario ya existe',
                type:1
            });
        }
        
        const usuarioS = {
            id_empleado: id,
            username,
            password,
            role,

        }

        let resultado = '';
        //Encriptar la contraseña
        const salt = bcrypt.genSaltSync();
        usuarioS.password = bcrypt.hashSync(password, salt);
        //Insertar en la base de datos
        await conexion.query('INSERT INTO usuarios_sistema SET ?', [usuarioS]);

        resultado = await conexion.query('SELECT MAX(id_usuario) AS id FROM usuarios_sistema');

        const nombre = await conexion.query('SELECT p.nombre FROM personas p, empleados e WHERE p.id_persona = e.id_persona AND e.idEmpleados = ?',[id])

        console.log(nombre[0].nombre);
        //Generar JWT

        const token = await generarJWT(resultado[0].id,nombre[0].nombre);
    
        res.status(201).json({
            ok: true,
            message: 'Usuario creado',
            token: token,
            role,
            type:2
        });
    }catch(e){
        console.log(e);
        res.status(500).json({
            message: 'Hable con el administrador',
            ok: false,
            type:3
        });
    }

};


const loginUsuario = async (req, res) => {

    const {username, password} = req.body;

    try{

        //Verificar si el username existe
        const result = await conexion.query('SELECT * FROM usuarios_sistema WHERE username = ?', [username]);
        

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

        const person = await conexion.query('SELECT nombre FROM personas AS p, empleados AS em, usuarios_sistema AS us WHERE p.id_persona = em.id_persona AND em.idEmpleados = ?',[result[0].id_empleado]);
        //Generar JWT
         const token = await generarJWT(result[0].id_usuario,person[0].nombre);



        res.send({
            message: 'Se ha logeado',
            ok: true,
            id: result[0].id_usuario,
            token,
            role: result[0].role
    
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
