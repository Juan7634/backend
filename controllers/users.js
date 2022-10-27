const conexion = require('../database/config');

const getUsers = async (req, res)=>{
    try{

        const users = await conexion.query('SELECT * FROM usuarios_sistema');
        console.log('User');
        res.status(200).json({
            ok:true,
            users,
            type:2
        })

    }catch(e){
        console.error(e);
        res.status(500).json({
            ok:false,
            msg: 'Hable con el administrador',
            type:3
        })
    }


}

const getUser = async(req, res) => {
    const id = req.params.id;

    try {

        const user = await conexion.query('SELECT * FROM usuarios_sistema u, empleados e, personas p WHERE p.id_persona = e.id_persona AND e.idEmpleados = u.id_empleado AND u.id_usuario = ?',[id])

        if (user.length == 0){
            return res.status(404).json({
                msg: 'No user found',
                type:1
            });
        }

        res.status(200).json({
            user,
            type:2

        })

    }catch(e){
        console.error(e);
        res.status(500).json({
            ok:false,
            msg: 'Hable con el administrador',
            type:3
    })
}


}

const createUser = async (req, res) => {

    const {id_empleado, username, password, role} = req.body;

    try {

        const user = {
            id_empleado,
            username, 
            password, 
            role
        }

        await conexion.query('INSERT INTO usuarios_sistema SET ?',[user]);

        res.status(201).json({
            msg: 'Created User successfully',
            type: 2
        })


    }catch(e){
        console.error(e);
        res.status(500).json({
            ok:false,
            msg: 'Hable con el administrador',
            type:3
        })
    }

}

const updateUser = async(req, res) => {

    const id = req.params.id;
    
    try {

        let user = await conexion.query('SELECT username FROM usuarios_sistema WHERE id = ?', [id]);

        if (user.length === 0) {

            res.status(404).json({
                type: 1,
                msg: 'User not found'
            })
        }

        const {id_empleado, username, password, role} = req.body;

        let newUser = {
            id_empleado,
            username, 
            password,
            role
        }

        await conexion.query('UPDATE usuarios_sistema SET ? WHERE id_usuario = ?',[newUser,id]);

        res.status(200).json({
            msg: 'User updated successfully',
            type: 2
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


const deleteUser = async (req, res) => {
    const id = req.params.id;
    
    try {

        let user = await conexion.query('SELECT username FROM usuarios_sistema WHERE id = ?', [id]);

        if (user.length === 0) {

            res.status(404).json({
                ok: false,
                type: 1,
                msg: 'User not found'
            })
        }

        await conexion.query('DELETE FROM usuarios_sistema WHERE id_usuario = ?', [id]);

        res.status(200).json({
            msg: 'User deleted successfully',
            type: 2
        })

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
    getUser,
    getUsers,
    createUser,
    updateUser,
    deleteUser
}