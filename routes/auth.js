/*
    Ruta: /api/auth
*/

const {Router} = require('express');
const {check}= require('express-validator');
const {validarCampos}=require('../middlewares/validar-campos')
const {login, renewToken, registerUser}=require('../controllers/auth');
const validarJWT = require('../middlewares/validar-jwt');
const router = Router();

router.post('/login',
[
    check('correo','El correo es obligatorio').isEmail(),
    check('password','El password es obligatorio').not().isEmpty(),
    validarCampos
],
login);
router.post('/register',
[   check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('correo','El correo es obligatorio').isEmail(),
    check('password','El password es obligatorio').not().isEmpty(),
    validarCampos
],
registerUser
);

router.get('/renew',validarJWT,renewToken
)


module.exports = router;