const {response}=require('express');

const Proyecto = require('../models/proyecto');

const getProyectos = async(req ,res=response)=>{
    const proyectos = await Proyecto.find();
    res.json({
        ok: true,
        proyectos
    });
}
const crearProyecto= async(req ,res=response)=>{
    const uid = req.uid;
    
    const proyecto = new Proyecto( {...req.body});
    try {
        const proyectoDB = await proyecto.save();
        
        res.json({
            ok: true,
            proyecto: proyectoDB
        });   
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'error inesperado'
        });
    }
   
}
const  actualizarProyecto = async (req ,res=response)=>{
    const id = req.params.id;
    const uid = req.uid;
    try {
        
     const proyectoDB = await Proyecto.findById(id);
        if (!proyectoDB) {
            return res.status(404).json({
                ok: false,
                msg: 'proyecto no encontrado'
            });
        }
        const cambiosProyecto = {
            ...req.body
        }
        const   proyectoActualizado = await Proyecto.findByIdAndUpdate(id,cambiosProyecto,{new:true});

        res.json({
            ok: true,
            msg: 'actualizacion exitosa',
            proyectoActualizado
        });
    } catch (error) {
        res.status(500).json({ 
            ok: false,
            msg: 'error inesperado'
        });

    }
    
   
}
const deleteProyecto = async(req ,res=response)=>{
    const id = req.params.id;
   
    try {
        
     const proyectoDB = await Proyecto.findById(id);
        if (!proyectoDB) {
            return res.status(404).json({
                ok: false,
                msg: 'proyecto no encontrado'
            });
        }
        await Proyecto.findByIdAndDelete(id);
        

        res.json({
            ok: true,
            msg: 'proyecto eliminado',
        
        });
    } catch (error) {
        res.status(500).json({ 
            ok: false,
            msg: 'error inesperado'
        });

    }
}
module.exports = {
    getProyectos,
    crearProyecto,
    actualizarProyecto,
    deleteProyecto

}