const conexion = require('../database/config');

const getProducts = async (req, res) => {
    try{

        const products = await conexion.query('SELECT * FROM Productos');
         
        if(products.length == 0){
            return res.status(201).json({
                ok: false,
                msg: 'No products found',
                found:0
            });
        }

        res.status(201).json({
            ok:true,
            products,
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

module.exports = {
    getProducts
}


