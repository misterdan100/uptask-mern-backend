

import mongoose from 'mongoose'

const conectarDB = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })

        const url = `${connection.connection.host}: ${connection.connection.port}`
        console.log(`MongoDB conectado en: ${url}`)
    } catch (error) {
        console.error(`DB error: ${error.message}`)
        process.exit(1) // force to finish all processes when error happen
    }
}

export default conectarDB