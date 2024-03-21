import express from 'express'
import { registrar, autenticar } from '../controllers/usuarioController.js'
const router = express.Router()

//? Authenticate, register and set users
router.post('/', registrar) // create new users
router.post('/login', autenticar)




export default router