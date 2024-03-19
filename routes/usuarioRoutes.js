import express from 'express'
import { registrar } from '../controllers/usuarioController.js'
const router = express.Router()

//? Authenticate, register and set users
router.post('/', registrar) // create new users




export default router