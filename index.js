//! have settings of the server

import express from 'express'
import dotenv from 'dotenv'
import conectarDB from './config/db.js'

const app = express()

// to use envioroment variables
dotenv.config()

conectarDB()

const PORT = process.env.PORT || 4000


app.listen(PORT, () => {
    console.log(`Servidor corriendo en el purto ${PORT}`)
})