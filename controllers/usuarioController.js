import Usuario from '../models/Usuario.js'
import generarId from '../helpers/generarId.js'

const registrar = async (req, res) => {
    // Avoid duplicate records
    const { email } = req.body
    const exiteUsuario = await Usuario.findOne({ email: email})

    if(exiteUsuario) {
        const error = new Error('Usuario ya registrado')
        return res.status(400).json({msg: error.message})
    }

    try {
        const usuario = new Usuario(req.body)
        usuario.token = generarId()

        const usuarioAlmacenado = await usuario.save()
        res.send('desde api/usuario y controllers')
    } catch (error) {
        console.log(error)
    }

}

const autenticar = async (req, res) => {
    const { email, password } = req.body

    // validate if user exist
    const usuario = await Usuario.findOne({ email: email})
    if(!usuario) {
        const error = new Error('El Usuario no existe')
        return res.status(404).json({msg: error.message})
    }

    // validate user is comfirmed
    if(!usuario.confirmado) {
        const error = new Error('Tu cuenta no ha sido confirmada')
        return res.status(403).json({msg: error.message})
    }

    // validate password
    if(await usuario.comprobarPassword(password)) {
        res.json({
            _id: usuario._id,
            nombre: usuario.nombre,
            email: usuario.email
        })
    } else {
        const error = new Error('El password es incorrecto')
        return res.status(403).json({msg: error.message})
    }
}

export {
    registrar,
    autenticar,
}