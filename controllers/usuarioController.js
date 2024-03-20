import Usuario from '../models/Usuario.js'

const registrar = async (req, res) => {
    // Avoid duplicate records
    const { email } = req.body
    const exiteUsuario = await Usuario.findOne({ email: email})

    if(exiteUsuario) {
        const error = new Error('Usuario ya registrado');
        return res.status(400).json({msg: error.message})
    }

    try {
        const usuario = new Usuario(req.body)

        const usuarioAlmacenado = await usuario.save()
        res.send('desde api/usuario y controllers')
        console.log(usuarioAlmacenado)
    } catch (error) {
        console.log(error)
    }

}

export {
    registrar,
}