const generarId = () => {

    // Math.random() generate a random number under 1
    // toString(32) become numbers to letters and numbers
    // substring(2) delete two first caracters
    const random = Math.random().toString(32).substring(2)

    // date.now() current date in milliseconds from 1972
    const fecha = Date.now().toString(32)

    return random + fecha
}

export default generarId