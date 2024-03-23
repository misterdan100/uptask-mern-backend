import Proyecto from "../models/Proyecto.js"
import Tarea from "../models/Tarea.js"

const agregarTarea = async (req, res) => {
    // check if project exist
    const { proyecto } = req.body
    try {
        const existeProyecto = await Proyecto.findById(proyecto)
        if(!existeProyecto) {
            const error = new Error('El proyecto no existe')
            return res.status(404).json({msg: error.message})
        }

        if(existeProyecto.creador.toString() !== req.usuario._id.toString()) {
            const error = new Error('No tienes los permisos para agregar tareas a este proyecto.')
            return res.status(404).json({msg: error.message})
        }

        const tareaAlmacenada = await Tarea.create(req.body)
        res.json('Tarea creada con exito')
        
    } catch (error) {
        res.json({msg: "Hubo un error!"})
        return console.log(error.message)
    }
}

const obtenerTarea = async (req, res) => {
    res.json({msg: 'funcion obtenerTarea'})
}

const actualizarTarea = async (req, res) => {
    res.json({msg: 'funcion actualizarTarea'})
}

const eliminarTarea = async (req, res) => {
    res.json({msg: 'funcion eliminarTarea'})
}

const cambiarEstado = async (req, res) => {
    res.json({msg: 'funcion cambiarEstado'})
}

export {
    agregarTarea,
    obtenerTarea,
    actualizarTarea,
    eliminarTarea,
    cambiarEstado,
}