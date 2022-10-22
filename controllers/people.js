const {response} = require('express');
const conexion = require('../database/config');


const getAllPeople = async(req, res= response, ) =>{

    try{
        const allPeople = await conexion.query('SELECT * FROM personas');

        if(allPeople.length == 0){
            return res.status(404).json({
                ok: true,
                msg:'No found people',
                type:1

            });
        }

        res.status(200).json({
            ok: true,
            personas : allPeople,
            type:3
        })

    }catch(e){
        console.log(e);
        res.status(500).json({
            ok:false,
            msg:'Hable con el administrador',
            type: 3

        });
    }

}


const getPeople = async(req, res) =>{
    const id = req.params.id;
    
    try{

        const people = await conexion.query('SELECT * FROM personas WHERE id_persona = ?',[id]);
    
        if(people.length == 0){
            return res.status(404).json({
                ok:false,
                msg: 'No found people',
                type: 1
            });
        }

        res.status(200).json({
            ok:true,
            personas: people,
            type: 2
        });

    }catch(e){
        console.log(e);
        res.status(500).json({
            ok:false,
            msg:'Hable con el administrador',
            type: 3

        });
    }
}

const createPeople = async (req, res) => {
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
        } = req.body;
    

    
    try{

        
        const personas = {
            nombre, 
            apellido1,
            apellido2,
            CP,
            numero,
            ciudad,
            estado,
            pais,
            telefono
        }

        

        //Insertar a la persona a la base de datos
        await conexion.query('INSERT INTO personas SET ?',[personas]);
        let resultado = await conexion.query('SELECT MAX(id_persona) AS id FROM personas');
        
        
        res.status(201).json({
            ok: true,
            message: 'Registro completado',
            type:2,
            id: resultado
        });
    }catch(e){
        console.log(e);
        res.status(500).json({
            message: 'Hable con el administrador',
            ok: false,
            type:3
        });
    }


}



const updatePeople = async(req, res) => {

    const id = req.params.id;

    try {


        const people = await conexion.query('SELECT id_persona FROM personas WHERE id_persona = ?',[id]);


        if (people.length == 0){
            return res.status(404).json({
                ok: true,
                msg:'No found people',
                type: 1
            });
        }



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
            } = req.body;




            const newData = {
                nombre,
                apellido1,
                apellido2,
                CP,
                numero,
                ciudad,
                estado,
                pais,
                telefono
            }

            await conexion.query('UPDATE personas SET ? WHERE id_persona = ?',[newData,id]);

            res.status(201).json({
                ok: true,
                msg: 'Update people successfully',
                type:2
            
            });




    }catch(e){
        console.log(e);
        res.status(500).json({
            message: 'Hable con el administrado',
            ok: false,
            type:3
        });
    }
}



const deletePeople = async(req, res) => {

    const id = req.params.id;

    try {


        const people = await conexion.query('SELECT id_persona FROM personas WHERE id_persona = ?',[id]);


        if (people.length == 0){
            return res.status(404).json({
                ok: true,
                msg:'No found people',
                type: 1
            });
        }            

            await conexion.query('DELETE FROM personas WHERE id_persona = ?',[id]);

            res.status(201).json({
                ok: true,
                msg: 'Update people successfully',
                type:2
            
            });




    }catch(e){
        console.log(e);
        res.status(500).json({
            message: 'Hable con el administrado',
            ok: false,
            type:3
        });
    }
}


module.exports = { 
    getAllPeople,
    getPeople,
    createPeople,
    updatePeople,
    deletePeople,
}
