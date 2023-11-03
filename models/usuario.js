const {Schema,model} = require('mongoose');

const usuarioSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    correo: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria']
    },
   
    
});


usuarioSchema.method('toJSON',function(){
    
    const {__v,_id,password,...object}=this.toObject();
    object.uid=_id;
    return object;
})

module.exports = model('Usuario', usuarioSchema);
