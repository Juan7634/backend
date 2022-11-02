const {response} = require('express');
const conexion = require('../database/config');


const getProducts = async (req, res) => {
    const id = req.header('id');
    try{

        const products = await conexion.query('SELECT * FROM Productos');
        const user = await conexion.query('SELECT role FROM usuarios_sistema WHERE id_usuario = ?',[id]);
        
        if(products.length == 0){
            return res.status(201).json({
                ok: true,
                msg: 'No products found',
                role:user[0].role,
                type:1

            });
        }

        res.status(201).json({
            ok:true,
            products,
            role:user,
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

const createProduct = async (req, res) => {
    const {id_usuario,nombre_producto,precio,stock, id_proveedor} = req.body;

   // console.log(nombre_producto);
    try{

       

        const {id_Empleado} = await conexion.query('SELECT id_Empleado FROM usuarios_sistema WHERE id_usuario = ?',[id_usuario]);

       
        const product = {
            nombre_producto,
            precio,
            stock,
            id_proveedor,
            id_empleado: id_Empleado
        }

        await conexion.query('INSERT INTO Productos SET ?',[product]);
        
        res.status(201).json({
            ok: true,
            msg:'Added product successfully',
            

        })
        
    }catch(e){
        console.error(e);
        res.status(500).json({
            ok:false,
            msg: 'Hable con el administrador'

        });
    }
}

const updateProduct = async (req, res) => {

    const idProductos = req.params.id;
    
        try{

            

            const producto = await conexion.query('SELECT idProductos FROM productos WHERE idProductos = ?',[idProductos]);
            
            if(producto.length == 0){
                return res.status(404).json({
                    ok:false,
                    msg:'No found product'
                });
            }

            const newProducto = {
                ... req.body
            }


            await conexion.query('UPDATE productos SET ? WHERE idProductos = ?',[newProducto,idProductos]);

            res.status(200).json({
                ok:true,
                msg:'Update product successfully'
            });



        }catch(e){
            console.error(e);
            res.status(500).json({
                ok:false,
                msg: 'Hable con el administrador'

            })
        }

}


const deleteProduct = async(req, res) => {
    const idProductos = req.params.id;

    try{

        const producto = await conexion.query('SELECT idProductos FROM productos WHERE idProductos = ?',[idProductos]);

        if(producto.length == 0){
            return  res.status(404).json({
                ok:false,
                msg: 'No found product',
                found: 0,
            });
        }
        await conexion.query('DELETE FROM productos WHERE idProductos = ?',[idProductos]);

        res.status(200).json({
            ok:true,
            msg: 'Delete product successfully',
            found:1
        });


    }catch(e){
    console.error(e);
    res.status(500).json({
        ok:false,
        msg: 'Hable con el administrador',
        found:2

    })
}

}


module.exports = {
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct,
}