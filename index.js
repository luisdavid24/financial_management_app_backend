/* const userRoutes = require('./routes/user.routes') */
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken')
const { PORT, SECRET_JWT_KEY } = require('./config.js')
const routerApi = require('./routes/index.js');

const app = express()


const whitelist = ['http://localhost:3000']; // Solo el frontend
const options = {
  origin: whitelist,
  credentials: true, // 💡 Habilita el uso de cookies
};

app.use(cors(options));


app.use(express.json())
app.use(cookieParser())



app.get('/', (req, res) => {
  res.json({ message: 'API is running' })
})

routerApi(app);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

