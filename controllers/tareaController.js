const agregarTarea = async (req, res) => {
    res.json({msg: 'funcion agregarTarea'})
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