import mongoose from "mongoose";

// defeni schema db
const usuarioSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    token: {
        type: String,
        dafault: false,
    }
}, {
    // crea dos propiedades mas: created and updated
    timestamps: true,
})

// create model Usuario with before schema
const Usuario = mongoose.model('Usuario', usuarioSchema)
export default Usuario