const express = require('express')
const UserService = require('../services/users.services.js')
const  {SECRET_JWT_KEY }= require('../config.js');
const jwt = require('jsonwebtoken')
const router = express.Router()


router.use((req, res, next) => {
  const token = req.cookies.access_token
  req.session = { user: null }

  if (token) {
    try {
      const data = jwt.verify(token, SECRET_JWT_KEY)
      req.session.user = data
    } catch (error) {
      console.error('Invalid token:', error.message)
    }
  }
  next()
})

router.get('/', (req, res) => {
  res.json({ message: 'API is running' })
})

router.post('/login', async (req, res) => {
  const { username, password } = req.body
  try {
    const user = await UserService.login({ username, password })
    const token = jwt.sign({ id: user._id, username: user.username }, SECRET_JWT_KEY, {
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


