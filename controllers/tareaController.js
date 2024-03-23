import Proyecto from "../models/Proyecto.js"
import Usuario from "../models/Usuario.js"
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
            return res.status(401).json({msg: error.message})
        }

        const tareaAlmacenada = await Tarea.create(req.body)
        res.status(201).json('Tarea creada con exito')
        
    } catch (error) {
        res.json({msg: "Hubo un error!"})
        return console.log(error.message)
    }
}

const obtenerTarea = async (req, res) => {
    const { id } = req.params
    try {
        const tarea = await Tarea.findById(id).populate("proyecto")

        if(!tarea) {
            const error = new Error('Tarea no encontrada.')
            return res.status(404).json({msg: error.message})
        }

        if(tarea.proyecto.creador.toString() !== req.usuario._id.toString()) {
            const error = new Error('No tienes permisos para esta tarea.')
            return res.status(401).json({msg: error.message})
        }

        return res.status(200).json(tarea)
    } catch (error) {
        const error2 = new Error('Hubo un error!')
        res.status(404).json({msg: error2.message})
        return console.log(error.message) 
    }
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