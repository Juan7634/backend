const {response} = require('express');
const conexion = require('../database/config');
const bcrypt = require('bcryptjs');
const {generarJWT} = require('../helpers/jwt');


const createUser = async (req, res = response) => {
    const { 
        nombre, 
        apellido1,
        apellido2,
        CP,
        numero,
        ciudad,
        estado,
        pais,
        telefono,
        puesto,
        sueldo,
        fecha_contratacion,
        fecha_cumpleaños,
        username,
        password} = req.body;
    

    
    try{

        const result = await conexion.query('SELECT * FROM usuarios_sistema WHERE username = ?', [username]);

        if(result.length > 0){
            return res.status(400).json({
                ok: false,
                message: 'El usuario ya existe'
            });
        }
        
        const personas = {
            nombre, 
            apellido1,
            apellido2,
            CP,
            numero,
            ciudad,
            estado,
            pais,
            telefono:'4311084195'
        }

        //console.log(personas);
        let resultado;


        //Insertar a la persona a la base de datos
        await conexion.query('INSERT INTO personas SET ?',[personas]);
        resultado = await conexion.query('SELECT MAX(id_persona) AS id FROM personas');
        //console.log(resultado[0].id);
        const empleado = {
            puesto,
            sueldo,
            fecha_contratacion,
            fecha_cumpleaños,
            id_persona: resultado[0].id
        };

        await conexion.query('INSERT INTO empleados SET ?',[empleado],);

        resultado = await conexion.query('SELECT MAX(idEmpleados) AS id FROM empleados');
        const usuarioS = {
            id_empleado: resultado[0].id,
            username,
            password
        }

        //Encriptar la contraseña
        const salt = bcrypt.genSaltSync();
        usuarioS.password = bcrypt.hashSync(password, salt);
        //Insertar en la base de datos
        await conexion.query('INSERT INTO usuarios_sistema SET ?', [usuarioS]);

        resultado = await conexion.query('SELECT MAX(id_usuario) AS id FROM usuarios_sistema');
        console.log(resultado[0].id);
        //Generar JWT
        const token = await generarJWT(resultado[0].id,personas.nombre);
    
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
