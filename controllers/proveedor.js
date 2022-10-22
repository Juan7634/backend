const conexion = require('../database/config');


const createProveedor = async(req,res)=> {
    const {id_persona, nombre_empresa} = req.body;

    try{

        const proveedor = {
            nombre_empresa,
            id_persona
        }


        await conexion.query('INSERT INTO proveedor SET ?',[proveedor]);

        res.status(201).json({
            ok: true,
            msg: 'Proveedor has been successfully',
            found: 1
        })


    }catch(e){
        console.error(e);
        res.status(500).json({
            ok:false,
            msg: 'Hable con el administrador',
            found:2

        });
    }

}


const getAllProveedores = async(req, res) => {

    try{
        
        const proveedor = await conexion.query('SELECT * FROM proveedor');

        if(proveedor.length == 0){
            return res.status(201).json({
                ok: false,
                msg: 'No proveedor found',
                found:0
            });
        }

        res.status(201).json({
            ok:true,
            proveedor,
            found:1
        });
    
    }catch(e){
        console.error(e);
        res.status(500).json({
            ok:false,
            msg: 'Hable con el administrador',
            found:2
        });
    }

}

const getProveedor = async(req, res) => {
    const id = req.params.id;

    try{

        const proveedor = await conexion.query('SELECT * FROM proveedor WHERE idProveedor = ?',[id]);

        if(proveedor.length == 0){
            return res.status(404).json({
                ok:true, 
                msg: 'No found proveedor',
                found: 1
            });
        }

        res.status(201).json({
            ok:true,
            proveedor, 
            found:2
        });

    }catch(e){
        console.error(e);
        res.status(500).json({
            ok:false,
            msg: 'Hable con el administrador',
            found:2
        });
    }
    
}