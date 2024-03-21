import express from 'express'
import { registrar, autenticar, confirmar, olvidePassword, comprobarToken, nuevoPassword } from '../controllers/usuarioController.js'
const router = express.Router()

//? Authenticate, register and set users
router.post('/', registrar) // create new users
router.post('/login', autenticar)
router.get('/confirmar/:token', confirmar)
router.post('/olvide-password', olvidePassword)
router.route('/olvide-password/:token').get(comprobarToken).post(nuevoPassword)




export default router