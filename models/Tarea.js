import mongoose from 'mongoose'

const tareaSchema = mongoose.Schema({
    nombre: {
        type: String,
        trim: true,
        required: true
    },
    descripcion: {
        type: String,
        trim: true,
        required: true
    },
    estado: {
        type: Boolean,
        default: false
    },
    fechaEntrega: {
        type: Date,
        default: Date.now(),
        required: true
    },
    prioridad: {
        type: String,
        required: true,
        // enum => allow only these options
        enum: ['Baja', 'Media', 'Alta']
    },
    proyecto: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Proyecto'
    },
    completado: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Usuario",
        default: null
    }
}, {
    timestamps: true
})

const Tarea = mongoose.model('Tarea', tareaSchema)
export default Tarea