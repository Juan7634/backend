const {response} = require('express');
const conexion = require('../database/config');


const getPurchase = async (req, res) => {
    const id = req.params.id;
    try{

        const purchase = await conexion.query('SELECT * FROM compras WHERE id_compra = ?',[id]);
        
        
        if(purchase.length == 0){
            return res.status(201).json({
                ok: true,
                msg: 'No Purchase found',
                type:1
            });
        }

        res.status(201).json({
            ok:true,
            purchase,
            type:2
        });

    }catch(e){
        console.error(e);
        res.status(500).json({
            ok:false,
            msg: 'Hable con el administrador',
            type:3

        });
    }
}


const getAllPurchase = async (req, res) => {
    try{

        const purchase = await conexion.query('SELECT * FROM compras');
        
        if(purchase.length == 0){
            return res.status(201).json({
                ok: true,
                msg: 'No Purchase found',
                type:1
            });
        }

        res.status(201).json({
            ok:true,
            purchase,
            type:2
        });

    }catch(e){
        console.error(e);
        res.status(500).json({
            ok:false,
            msg: 'Hable con el administrador',
            type:3

        });
    }
}

const createPurchase = async (req, res) => {
    const {id_usuario,nombre_compra,costo,stock, tipo, descripcion, id_proveedor, cantidad,id_producto} = req.body;

   
    try{
       
        const purchase = {
            nombre_compra,
            costo,
            stock,
            tipo,
            descripcion,
            cantidad,
            id_proveedor,
            id_usuario
        }

        await conexion.query('INSERT INTO compras SET ?',[purchase]);
        
        res.status(201).json({
            ok: true,
            msg:'Added product successfully',
            type:2

        })
        
    }catch(e){
        console.error(e);
        res.status(500).json({
            ok:false,
            msg: 'Hable con el administrador',
            type:3
        });
    }
}

const updatePurchase = async (req, res) => {

    const id = req.params.id;
        try{

            
            const purchase = await conexion.query('SELECT id_compra FROM compras WHERE id_compra = ?',[id]);
            
            if(purchase.length == 0){
                return res.status(404).json({
                    ok:false,
                    msg:'No found product',
                    type: 1
                });
            }

            const newPurchase = {
                ... req.body
            }


            await conexion.query('UPDATE productos SET ? WHERE idProductos = ?',[newPurchase,id]);

            res.status(200).json({
                ok:true,
                msg:'Update product successfully',
                type:2
            });



        }catch(e){
            console.error(e);
            res.status(500).json({
                ok:false,
                msg: 'Hable con el administrador',
                type:3

            })
        }

}


const deletePurchase = async(req, res) => {
    const id = req.params.id;

    try{

        const purchase = await conexion.query('SELECT id_compra FROM compras WHERE id_compra = ?',[id]);
            
            if(purchase.length == 0){
                return res.status(404).json({
                    ok:false,
                    msg:'No found product'
                });
            }

        await conexion.query('DELETE FROM compras WHERE id_compra = ?',[id]);

        res.status(200).json({
            ok:true,
            msg: 'Delete product successfully',
            type:2
        });


    }catch(e){
    console.error(e);
    res.status(500).json({
        ok:false,
        msg: 'Hable con el administrador',
        type:3
        

    })
}

}


module.exports = {
    getPurchase,
    getAllPurchase,
    createPurchase,
    updatePurchase,
    deletePurchase   
}