import Proyecto from '../models/Proyecto.js'
import Tarea from '../models/Tarea.js'

const obtenerProyectos = async (req, res) => {
    const proyectos = await Proyecto.find()
        .where('creador')
        .equals(req.usuario._id)
        .select('-tareas')
    res.json(proyectos)
}

const nuevoProyecto = async (req, res) => {
    const proyecto = new Proyecto(req.body)
    proyecto.creador = req.usuario._id

    try {
        const proyectoAlmacenado = await proyecto.save()
        console.log(proyectoAlmacenado)
        res.json({ proyectoAlmacenado })
    } catch (error) {
        console.error(error)
    }
}

const obtenerProyecto = async (req, res) => {
    // acces to url params
    const { id } = req.params

    try {
        // validate if project exists
        // if the id doesn't have the same characters extention, findById() return a error
        const proyecto = await Proyecto.findById(id).populate('tareas')

        // if project doesn't exist
        if (!proyecto) {
            const error = new Error("Proyecto No Encontrado")
            return res.status(404).json({ msg: error.message })
        }
        // validate if user is the same of creator
        if (proyecto.creador.toString() !== req.usuario._id.toString()) {
            const error = new Error('No tienes los permisos necesarios!')
            return res.status(401).json({ msg: error.message })
        }

        return res.status(200).json(proyecto)

    } catch (error) {
        console.log(error.message)
        const errorDb = new Error("Proyecto No Encontrado")
        return res.status(404).json({ msg: errorDb.message })
    }

}

const editarProyecto = async (req, res) => {
    // acces to url params
    const { id } = req.params

    try {
        // validate if project exists
        // if the id doesn't have the same characters extention, findById() return a error
        const proyecto = await Proyecto.findById(id)

        // if project doesn't exist
        if (!proyecto) {
            const error = new Error("Proyecto No Encontrado")
            return res.status(404).json({ msg: error.message })
        }
        // validate if user is the same of creator
        if (proyecto.creador.toString() !== req.usuario._id.toString()) {
            const error = new Error('No tienes los permisos necesarios!')
            return res.status(401).json({ msg: error.message })
        }

        // update project
        proyecto.nombre = req.body.nombre || proyecto.nombre
        proyecto.descripcion = req.body.descripcion || proyecto.descripcion
        proyecto.fechaEntrega = req.body.fechaEntrega || proyecto.fechaEntrega
        proyecto.cliente = req.body.cliente || proyecto.cliente

        const proyectoAlmacenado = await proyecto.save()
        res.json(proyectoAlmacenado)

    } catch (error) {
        console.log(error.message)
        const errorDb = new Error("Proyecto No Encontrado")
        return res.status(404).json({ msg: errorDb.message })
    }
}

const eliminarProyecto = async (req, res) => {
    // acces to url params
    const { id } = req.params

    try {
        // validate if project exists
        // if the id doesn't have the same characters extention, findById() return a error
        const proyecto = await Proyecto.findById(id)

        // if project doesn't exist
        if (!proyecto) {
            const error = new Error("Proyecto No Encontrado")
            return res.status(404).json({ msg: error.message })
        }
        // validate if user is the same of creator
        if (proyecto.creador.toString() !== req.usuario._id.toString()) {
            const error = new Error('No tienes los permisos necesarios!')
            return res.status(401).json({ msg: error.message })
        }

        await proyecto.deleteOne()
        res.json({msg: `Proyecto ${proyecto.nombre} fue eliminado.`})

    } catch (error) {
        console.log(error.message)
        const errorDb = new Error("Proyecto No Encontrado")
        return res.status(404).json({ msg: errorDb.message })
    }
}

const agregarColaborador = async (req, res) => {

}

const eliminarColaborador = async (req, res) => {

}


export {
    obtenerProyectos,
    nuevoProyecto,
    obtenerProyecto,
    editarProyecto,
    eliminarProyecto,
    agregarColaborador,
    eliminarColaborador,
}