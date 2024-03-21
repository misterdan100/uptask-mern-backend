import jwt from 'jsonwebtoken'

const generarJWT = (id) => {
    // .sign generate the jwt
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: '30d',
    })
}

export default generarJWT