//! have settings of the server

import express from 'express'
import usuarioRoutes from './routes/usuarioRoutes.js'
import proyectoRoutes from './routes/proyectoRoutes.js'
import dotenv from 'dotenv'
import conectarDB from './config/db.js'

const app = express()
app.use(express.json())

// to use envioroment variables
dotenv.config()

conectarDB()

// Routing
app.use('/api/usuarios', usuarioRoutes)
app.use('/api/proyectos', proyectoRoutes)

const PORT = process.env.PORT || 4000


app.listen(PORT, () => {
    console.log(`Servidor corriendo en el purto ${PORT}`)
})