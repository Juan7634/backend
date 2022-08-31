const { response} = require('express');
 const jwt = require('jsonwebtoken');


const validarJWT = (req, res = response, next) => {

    //x-token
    const token = req.header('x-token');
    
    if(!token) {
        return res.status(401).json({
            message: 'No hay token',
            ok: false
        });
    }

    try{

        //Se verifica el token que sea valido
        const {uid, name} = jwt.verify(
            token,
            process.env.SECRET_JWT_SED
        );

        req.uid = uid;
        req.name = name;

        //console.log(payload);





    }catch(err){
        return res.status(401).json({
            ok : false,
            msg: 'Token no valido'
        })

    }


    next();

}


module.exports = {
    validarJWT
}