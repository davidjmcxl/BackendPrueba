const { response } = require("express")
const bcrypt =require('bcryptjs');
const Usuario = require("../models/usuario");
const { generarJWT } = require("../helpers/jwt");

const login = async(req ,res =response)=>{
    const {correo,password}=req.body;
    try {

        const usuarioDB = await Usuario.findOne({correo});
        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Email no encontrado'
            });
        }
        //verificar contraseña
        const validPassword = bcrypt.compareSync(password,usuarioDB.password);
        
        if(!validPassword){
            return res.status(400).json({
                ok: false,
                msg: 'Password incorrecto'
            });
        }
        //Generar el TOKEN - JWT
        const token = await generarJWT(usuarioDB.id);
        res.json({
            ok: true,
            token,
           
        })

    } catch (error) {
   
    res.status(500).json({
        ok: false,
        msg: 'Error inesperado'
    });

    }

}
const registerUser= async(req, res=response) => {
    const {correo,password}=req.body;

    

    try {
        const existeEmail = await Usuario.findOne({correo});
        if (existeEmail) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya esta registrado'
            });
        }
        const usuario = new Usuario(req.body);
        //Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password,salt);
        //Guardar usuario
        await usuario.save();
        //Generar el TOKEN - JWT
        const token = await generarJWT(usuario.id);

        res.json({
            ok: true,
            msg: 'usuario creado',
            usuario,
            token
        });   
    } catch (error) {
            console.log(error);
            res.status(500).json({
                ok: false,
                msg: 'Error inesperado'
            });
    }
    
}

const renewToken = async (req , res= response )=>{
    const uid = req.uid;
    //Generar el TOKEN - JWT
    const token = await generarJWT(uid);
    const usuarioDB = await Usuario.findById(uid);
    res.json({
        ok: true,
        msg: 'renew',
        token,
        usuario:usuarioDB, 
    })
}
module.exports = {
    login,
    registerUser
    ,renewToken
}