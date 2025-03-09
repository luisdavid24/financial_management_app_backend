const express = require('express')
const UserService = require('../services/users.services.js')
const  {SECRET_JWT_KEY }= require('../config.js');
const jwt = require('jsonwebtoken')
const router = express.Router()
const verifyUser=require('../middlewares/auth.middleware.js')

// Usa el middleware en todas las rutas
router.use(verifyUser);



router.get('/', (req, res) => {
  res.json({ message: 'API is running' })
})

router.post('/login', async (req, res) => {
  const { username, password } = req.body
  try {
    const user = await UserService.login({ username, password })
    console.log(user);
    /* jwt.sign(payload, secretOrPrivateKey, [options, callback])
    payload=> objecto que contiene informacion que queremos incluir en el token
    secretOrPrivateKey =>Es una clave secreta utilizada para firmar el token. */
    const token = jwt.sign({ id: user.id, username: user.username }, SECRET_JWT_KEY, {
      expiresIn: '1h'
    })
    res
      .cookie('access_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 1000 * 60 * 60
      })
      .json({ user, token })
  } catch (error) {
    res.status(401).json({ error: error.message })
  }
})

router.post('/register', async (req, res) => {
  const { name,username, password } = req.body
  try {
    const id = await UserService.create({ username, password,name })
    res.json({ id })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

router.post('/logout', (req, res) => {
  res.clearCookie('access_token').json({ message: 'Logout successful' })
})

router.get('/protected', (req, res) => {
  if (!req.session.user) return res.status(403).json({ error: 'Access not authorized' })
  res.json({ user: req.session.user })
})



module.exports = router


