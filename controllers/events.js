const {response} = require('express');
const conexion = require('../database/config');


const getEventos = async (req, res) =>{

    const {uid, name} = req;

    try{

        const query = await conexion.query('SELECT name, saldo FROM users, saldo WHERE id_user = ?', [uid]);

        if(query.length == 0){
            return res.status(404).json({
                ok : false,
                ms : 'Dato no encontrado'

            });
        }


        return res.status(200).json({
           ok : true,
           msg: 'Consulta realizada',
           query

        });

    }catch(e){
        console.log(e);
        return res.status(500).json({    
            ok: false,
            msg: 'Error en el servidor'
        })
    }

};

const crearEventos = (req, res) =>{
    return  res.json({
        ok: true,
        msg: 'Crear eventos'
    });

};


const actualizarEventos = (req, res) =>{

    const {uid, name} = req;

    try {

        res.status(201).json({
            ok: true,
            msg: 'Actualizar evento'
        })


    }catch(e){
        return  res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

    

};

const eliminarEventos = (req, res) =>{
    return  res.json({
        ok: true,
        msg: 'Eliminar eventos'
    });

};


module.exports = {
    getEventos,
    crearEventos,
    actualizarEventos,
    eliminarEventos

}