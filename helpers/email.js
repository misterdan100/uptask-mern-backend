import nodemailer from 'nodemailer'

export const emailRegistro = async (datos) => {
    const { email, nombre, token } = datos

    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    // Email information
    const info = await transport.sendMail({
        from: '"UpTask - Administrador de Proyectos" <cuentas@uptask.com>',
        to: email,
        subject: "UpTask - Comprueba tu cuenta",
        text: "Comprueba tu cuenta en UpTask",
        html: `
        <p>Hola ${nombre}, Comprueba tu cuenta en UpTask</p>
        <p>Tu cuenta ya esta casi lista solo debes comprobarla en el siguiente enlace: </p>
        <a href="${process.env.FRONTEND_URL}/confirmar/${token}" style="
        padding: 0.75rem; 
        margin: 1.25rem; 
        border-radius: 0.25rem; 
        width: 100%; 
        font-weight: 700; 
        color: #ffffff; 
        text-transform: uppercase; 
        background-color: rgb(2, 132,199);
        transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        transition-duration: 300ms;:hover {
         cursor: pointer; 
        box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06); 
         }
        ">Comprobar Cuenta</a>

        <p>Si tu no creaste esta cuenta, ignora este mensaje</p>
        `
    })

}

export const emailOlvidePassword = async (datos) => {
    const { email, nombre, token } = datos

    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    // Email information
    const info = await transport.sendMail({
        from: '"UpTask - Administrador de Proyectos" <cuentas@uptask.com>',
        to: email,
        subject: "UpTask - Reestablece tu Password",
        text: "Reestablece tu Password",
        html: `
        <p>Hola ${nombre}, has solicitado restablecer tu password</p>
        <p>Ve al siguiente enlace para reestablecer tu password: </p>
        <a href="${process.env.FRONTEND_URL}/olvide-password/${token}" style="
        padding: 0.75rem; 
        margin: 1.25rem; 
        border-radius: 0.25rem; 
        width: 100%; 
        font-weight: 700; 
        color: #ffffff; 
        text-transform: uppercase; 
        background-color: rgb(2, 132,199);
        transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        transition-duration: 300ms;:hover {
         cursor: pointer; 
        box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06); 
         }
        ">Reestablecer Password</a>

        <p>Si no solicitaste este email, ignora este mensaje</p>
        `
    })

}