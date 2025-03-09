/* const userRoutes = require('./routes/user.routes') */
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken')
const { PORT, SECRET_JWT_KEY } = require('./config.js')
const routerApi = require('./routes/index.js');

const app = express()

app.use(cors({ origin: 'http://localhost:5173', credentials: true }))
app.use(express.json())
app.use(cookieParser())



app.get('/', (req, res) => {
  res.json({ message: 'API is running' })
})

routerApi(app);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

