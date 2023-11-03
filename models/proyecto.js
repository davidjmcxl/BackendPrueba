const {Schema,model} = require('mongoose');

const ProyectoSchema = Schema({
    descripcion: {
        type: String,
        required: [true, 'la descripcion es requerida']
    },
    longitud: {
        type: Number,
        required: [true, 'la longitud es requerida']
    },
    latitud: {
        type: Number,
        required: [true, 'la latitud es requerida']
    },
   
   
  
},{collection:'proyectos'});


ProyectoSchema.method('toJSON',function(){
    
    const {__v,...object}=this.toObject();
    
    return object;
})

module.exports = model('Proyecto', ProyectoSchema);
