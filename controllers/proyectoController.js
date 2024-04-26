import Proyecto from '../models/Proyecto.js'
import Tarea from '../models/Tarea.js'
import Usuario from '../models/Usuario.js'

const obtenerProyectos = async (req, res) => {
    const proyectos = await Proyecto.find({
        '$or': [
            {'colaboradores': { $in: req.usuario}},
            {'creador': { $in: req.usuario}}
        ]
    }).select('-tareas')
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
        const proyecto = await Proyecto.findById(id)
        .populate({ path: 'tareas', populate: {path: 'completado', select: "nombre "}})
        .populate('colaboradores', 'nombre email')

        // if project doesn't exist
        if (!proyecto) {
            const error = new Error("Proyecto No Encontrado")
            return res.status(404).json({ msg: error.message })
        }
        // validate if user is the same of creator
        if (proyecto.creador.toString() !== req.usuario._id.toString() && !proyecto.colaboradores.some( colaborador => colaborador._id.toString() === req.usuario._id.toString())) {
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

const buscarColaborador = async (req, res) => {
    const { email } = req.body
    const usuario = await Usuario.findOne({email}).select('-confirmado -createdAt -password -token -updatedAt -__v')

    if(!usuario) {
        const error = new Error('Usuario no encontrado')
        return res.status(404).json({msg: error.message})
    }

    res.status(200).json(usuario)
}

const agregarColaborador = async (req, res) => {

    const { id } = req.params

    const proyecto = await Proyecto.findById(id)
    if(!proyecto) {
        const error = new Error('Proyecto no encontrado')
        return res.status(404).json({msg: error.message})
    }

    if(proyecto.creador.toString() !== req.usuario._id.toString()) {
        const error = new Error('Accion no valida.')
        return res.status(404).json({msg: error.message})
    }

    const { email } = req.body
    const usuario = await Usuario.findOne({email}).select(
        "-confirmado -createdAd -password -token -updatedAt -__v"
    )

    if(!usuario) {
        const error = new Error('Usuario no encontrado')
        return res.status(404).json({msg: error.message})
    }

    // Colaborator is not the project's admin
    if(proyecto.creador.toString() === usuario._id.toString()) {
        const error = new Error('El creador del proyecto no puede ser colaborador.')
        return res.status(404).json({msg: error.message})
    }

    // check colaborator is no already as a colaborator
    if(proyecto.colaboradores.includes(usuario._id)) {
        const error = new Error('El usuario ya es colaborador en el proyecto.')
        return res.status(404).json({msg: error.message})
    }

    proyecto.colaboradores.push(usuario._id)
    await proyecto.save()
    return res.status(202).json({msg: 'Colaborador agregado correctamente.'})

}

const eliminarColaborador = async (req, res) => {

    const { id } = req.params

    const proyecto = await Proyecto.findById(id)
    if(!proyecto) {
        const error = new Error('Proyecto no encontrado')
        return res.status(404).json({msg: error.message})
    }

    if(proyecto.creador.toString() !== req.usuario._id.toString()) {
        const error = new Error('Accion no valida.')
        return res.status(404).json({msg: error.message})
    }
    
    proyecto.colaboradores.pull(req.body.id)
    await proyecto.save()
    res.status(200).json({msg: 'Colaborador eliminado correctamente'})
}


export {
    obtenerProyectos,
    nuevoProyecto,
    obtenerProyecto,
    editarProyecto,
    eliminarProyecto,
    buscarColaborador,
    agregarColaborador,
    eliminarColaborador,
}