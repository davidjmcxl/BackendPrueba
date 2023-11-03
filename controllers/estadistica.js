const {response}=require('express');

const Venta = require('../models/venta');

const getVentas = async (req, res) => {
    try {
      const fechaActual = new Date();
      const fechaUnAnoAtras = new Date();
      fechaUnAnoAtras.setFullYear(fechaActual.getFullYear() - 1);
  
      const ventasPorMes = await Venta.aggregate([
        {
          $match: {
            fecha: { $gte: fechaUnAnoAtras, $lte: fechaActual },
          },
        },
        {
          $group: {
            _id: { mes: { $month: '$fecha' } },
            total: { $sum: '$monto' },
            cantidadtotal: { $sum: '$cantidad' },
          },

        },

      ]);
  
      const VentasPorMes = ventasPorMes.map((venta) => {
        const mes = venta._id.mes;
        const total = venta.total;
        const cantidadtotal = venta.cantidadtotal;
        const nombreMes = new Date(0, mes - 1).toLocaleString('es-ES', { month: 'long' });
  
        return { mes: nombreMes, total ,cantidadtotal};
      });
  
      res.json(
        {
          ventas:VentasPorMes});
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al obtener las ventas por mes.' });
    }
  }
const crearVenta= async(req ,res=response)=>{
   
    console.log(req.body);
    const venta = new Venta( {...req.body});
   
    try {
        const ventaDB = await venta.save();
        console.log(ventaDB);
        res.json({
            ok: true,
            venta: ventaDB
        });   
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'error inesperado'
        });
    }
   
}

const deleteVenta = async(req ,res=response)=>{
    const id = req.params.id;
   
    try {
        
     const ventaDB = await Venta.findById(id);
        if (!ventaDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Venta no encontrada'
            });
        }
        await Venta.findByIdAndDelete(id);
        

        res.json({
            ok: true,
            msg: 'Venta eliminado',
        
        });
    } catch (error) {
        res.status(500).json({ 
            ok: false,
            msg: 'error inesperado'
        });

    }
}
module.exports = {
    getVentas,
    crearVenta,
    deleteVenta,

}