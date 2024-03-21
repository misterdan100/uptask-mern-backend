import Usuario from '../models/Usuario.js'
import generarId from '../helpers/generarId.js'
import generarJWT from '../helpers/generarJWT.js'

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
            email: usuario.email,
            token: generarJWT(usuario._id,)
        })
        
    } else {
        const error = new Error('El password es incorrecto')
        return res.status(403).json({msg: error.message})
    }
}

const confirmar = async (req, res) => {
    //TODO: read token from url
    //TODO: look for user in db and create instance
    //TODO: switch confirmado and reset token
    //TODO: save user in db 

    const { token } = req.params
    const usuarioConfirmar = await Usuario.findOne({token})

    if(!usuarioConfirmar) {
        const error = new Error('Token no valido')
        return res.status(403).json({msg: error.message})
    }

    try {
        usuarioConfirmar.confirmado = true
        usuarioConfirmar.token = ''

        // as usuarioConfirmado is a instance of user in db you can use save() to save in db
        await usuarioConfirmar.save()
        res.json({msg: 'Usuario Confirmado Correctamente'})

    } catch (error) {
        console.error(error)
    }
}

const olvidePassword = async (req, res) => {
    const { email } = req.body

    const usuario = await Usuario.findOne({ email: email})
    if(!usuario) {
        const error = new Error('El Usuario no existe')
        return res.status(404).json({msg: error.message})
    }

    try {
        usuario.token = generarId()
        await usuario.save()
        res.json({msg: 'Hemos enviado un email con las instrucciones'})

    } catch (error) {
        console.error(error)
    }
}

const comprobarToken = async (req, res) => {
    const { token } = req.params

    const tokenValido = await Usuario.findOne({token})
    if(!tokenValido) {
        const error = new Error('Token no Valido')
        return res.status(404).json({msg: error.message})
    } 

    res.json({msg: 'Token valido, El usuario existe'})

}

const nuevoPassword = async (req, res) => {
    const { token } = req.params
    const { password } = req.body


    const usuario = await Usuario.findOne({token})
    if(!usuario) {
        const error = new Error('Token no Valido')
        return res.status(404).json({msg: error.message})
    } 

    usuario.token = ''
    usuario.password = password

    try {
        await usuario.save()
        res.json({msg: 'Password modificado correctamente'})
    } catch (error) {
        console.error(error)
    }
}

const perfil = async (req, res) => {
    const { usuario } = req
    
    // res.json({usuario})
    console.log(usuario)
}



export {
    registrar,
    autenticar,
    confirmar,
    olvidePassword,
    comprobarToken,
    nuevoPassword,
    perfil
}