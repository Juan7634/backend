const {response} = require('express');
const  conexion = require('../database/config');


const getAllEmployees = async (req, res) => {


    try{

        const employees = await conexion.query('SELECT * FROM empleados e, personas p WHERE e.id_persona = p.id_persona');

        if(employees.length == 0){
            return res.status(404).json({
                ok:true, 
                msg: 'No found employees',
                type:1
            });
        }

        res.status(200).json({
            ok:true, 
            empleados: employees,
            type:2
        })
        

    }catch(e){
        console.log(e);
        res.status(500).json({
            message: 'Hable con el administrado',
            ok: false,
            type:3
        });
    }


}


const getEmployee = async (req, res)=>{

    const id = req.params.id;

    try{

        
        const employee = await conexion.query('SELECT * FROM empleados e, personas p WHERE e.id_persona = p.id_persona AND idEmpleados = ?',[id]);

        if(employee.length == 0){
            return res.status(404).json({
                ok:true, 
                msg: 'No found employees',
                type:1
            });
        }

        res.status(200).json({
            ok:true, 
            empleados: employee,
            type:2
        })


    }catch(e){
        console.log(e);
        res.status(500).json({
            message: 'Hable con el administrado',
            ok: false,
            type:3
        });
    }


}


const createEmployee = async (req, res) => {

    const {puesto,sueldo,fecha_contratacion,fecha_cumpleaños, id_persona} = req.body;
    
    try{

        const empleado = {
            puesto,
            sueldo,
            fecha_contratacion,
            fecha_cumpleaños,
            id_persona
        }

        
        await conexion.query('INSERT INTO empleados SET ?',[empleado]);


        let resultado = await conexion.query('SELECT MAX(idEmpleados) AS id FROM empleados');
        

        res.status(201).json({
            ok:true,
            msg: 'Employee created successfully',
            id: resultado[0].id,
            type:2
        })


    }catch(e){
        console.log(e);
        res.status(500).json({
            message: 'Hable con el administrado',
            ok: false,
            type:3
        });
    }
}


const updateEmployee = async (req, res) => {
    
    const id = req.params.id;
    
    try{

        
        const {
            puesto,
            sueldo,
            fecha_contratacion,
            fecha_cumpleaños,
            id_persona
        } = req.body;


        const employee = await conexion.query('SELECT idEmpleados FROM empleados WHERE idEmpleados = ?',[id]);

        if(employee.length == 0){
            return res.status(404).json({
                ok:true,
                msg:'No found employee',
                type:1
            });
        }

        const empleado = {
            puesto,
            sueldo,
            fecha_contratacion,
            fecha_cumpleaños,
            id_persona
        }
        

        await conexion.query('UPDATE empleados SET ? WHERE idEmpleados = ?',[empleado,id]);

        res.status(200).json({
            ok: true,
            msg: 'Update employee successfully',
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


const deleteEmployee = async (req, res) =>{

    const id = req.params.id;

    try{

        let employee = await conexion.query('SELECT idEmpleados FROM empleados WHERE idEmpleados = ?',[id]);

        if(employee.length == 0){
            return res.status(404).json({
                ok:true,
                msg:'No found employee',
                type:1
            });
        }

        await conexion.query('DELETE FROM empleados WHERE idEmpleados = ?',[id]);

        res.status(200).json({
            ok:true, 
            msg:'Employee deleted successfully',
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
    getEmployee,
    getAllEmployees,
    createEmployee,
    updateEmployee,
    deleteEmployee
}