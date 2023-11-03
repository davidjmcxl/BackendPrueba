const {Schema,model} = require('mongoose');

const VentaSchema = Schema({
    cantidad: {
        type: Number,
        required: [true, 'las cantidad es obligatoria']
    },
    monto: {
        type: Number,
        required: [true, 'el  monto es obligatoria']
    },
    fecha: {
        type: Date,
       
        default: new Date()
    },

    
   
});


VentaSchema.method('toJSON',function(){
    
    const {__v,...object}=this.toObject();

    return object;
})

module.exports = model('Venta', VentaSchema);
