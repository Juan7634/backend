const {response} = require('express');
const conexion = require('../database/config');


const getCategories = async (req, res= response) =>{

    try{

        const categories = await conexion.query('SELECT * FROM categorias');
   //     const category = await conexion.query('INSERT INTO categorias SET ?',{})

        if(categories.length == 0){
            return res.status(404).json({
                ok:false,
                msg: 'No found categories',
                found:0
            });
        }

        res.status(200).json({
            ok:true,
            msg: 'Success found',
            found:1
        })


    }catch(err){
        res.status(500).json({
            ok: false,
            msg: 'Error interno, consulte al administrador',
            found:2
        })
    }

}

const createCategory = async (req, res) => {
    const {categoria, image} = req.body;
    
    try{
        const cat = {
            categoria,
            image
        }

        await conexion.query('INSERT INTO categorias SET ?',[cat]);

        res.status(201).json({
            ok: true,
            msg: 'Save is successful'
        });
    }
    catch(err){
        res.status(500).json({
            ok: false,
            msg: 'Error internal, consulte'
        });
    }
}

const updateCategory = async (req, res) => {
    const {idCategoria, categoria,imagen} = req.body;

    try{
        let result;
         result = await conexion.query('SELECT categoria FROM categorias WHERE id_categoria = ?',[{idCategoria}])

        if(result.length == 0){
            return res.status(400).json({
                ok:false,
                msg: 'No found',
                found:0
            });
        }
        const category = {
            categoria,
            imagen
        }

        await conexion.query('UPDATE categorias SET ? WHERE id_categoria = ?',[categoria,idCategoria]);

        res.status(204).json({
           ok:true,
           msg: 'Update isn successful',
        });
    }
    catch(err){
        res.status(500).json({
            ok: false,
            msg: 'Error internal, consulte al administrador'
        });
    }

}

const deleteCategory = async(req, res) => {
    const {idCategoria} = req.body;

    try{
        let result = await conexion.query('SELECT id_categoria FROM categorias WHERE id_categoria = ?',[idCategoria]);
        
        if(result.length == 0){
            return res.status(400).json({
                ok:false,
                msg: 'No found category'
            });
        }

        await conexion.query('DELETE categorias SET ?',[idCategoria]);

        res.status(201).json({
            ok:false,
            msg:'Delete category successfully'
        })

    }
    catch(err){
        res.status(500).json({
            ok: false,
            msg: 'Error internal, consulte al administrador'
        });
    }
}

module.exports = {
    getCategories,
    createCategory,
    updateCategory,
    deleteCategory
}