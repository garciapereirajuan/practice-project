const bcrypt = require('bcrypt-nodejs')
//const jwt = require('jwt-simple')
const User = require('../models/user')

module.exports = {
  signUp: (req, res) => {
    const { name, lastname, email, password, repeatPassword } = req.body
    const data = {
      name,
      lastname,
      email,
      role: 'admin',
      active: false,
    }
    const user = new User(data)

    if (!password || !repeatPassword) {
      res.status(404).send({ message: 'Las contraseñas son obligatorias' })
    } else if (password !== repeatPassword) {
      res.status(404).send({ message: 'Las contraseñas deben coincidir' })
    } else {
      bcrypt.hash(password, null, null, (err, hash) => {
        if (err)
          res.status(500).send({ message: 'Error al encriptar la contraseña.' })
        else {
          user.password = hash

          user.save((err, userStored) => {
            if (err) {
              res
                .status(500)
                .send({ message: `Error: el email '${email}' ya existe.` })
            } else {
              if (!userStored) {
                res.status(404).send({ message: 'Error al crear el usuario.' })
              } else {
                res.status(200).send({ user: userStored })
              }
            }
          })
        }
      })
    }
  },
}
