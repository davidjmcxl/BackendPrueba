const Router = require('express');
const {check}= require('express-validator');

const {validarCampos}=require('../middlewares/validar-campos')
const validarJWT = require('../middlewares/validar-jwt');
const { crearProyecto, getProyectos, actualizarProyecto, deleteProyecto } = require('../controllers/proyectos');

const router = Router();

router.get('/proyectos',validarJWT,getProyectos);
router.post('/proyectos',[
    validarJWT,
    check('descripcion','la  descripcion de proyecto es obligatoria').not().isEmpty(),
    check('longitud','la longitud es obligatoria').not().isEmpty(),
    check('latitud','la latitud es obligatoria').not().isEmpty()
    ,validarCampos
],crearProyecto);

router.put('/proyectos/:id',[
    validarJWT
],actualizarProyecto);
router.delete('/proyectos/:id',validarJWT,deleteProyecto);
module.exports = router;