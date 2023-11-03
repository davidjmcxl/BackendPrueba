const Router = require('express');
const {check}= require('express-validator');

const {validarCampos}=require('../middlewares/validar-campos')
const validarJWT = require('../middlewares/validar-jwt');
const { getVentas, crearVenta, deleteVenta } = require('../controllers/estadistica');

const router = Router();

router.get('/estadisticas'  ,getVentas);

router.post('/estadisticas',[
   
    check('cantidad','la  cantidad es obligatoria').not().isEmpty()
    ,validarCampos
],crearVenta);


router.delete('/estadisticas/:id',validarJWT,deleteVenta);
module.exports = router;
