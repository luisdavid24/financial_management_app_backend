const express = require('express');
const cors = require('cors');
const routerApi = require('./routes/index.js');

const app = express();
const PORT = 3001;
app.use(express.json());

const whitelist = ['http://localhost:3000'];
const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('no permitido'));
    }
  },
};
app.use(cors(options));

routerApi(app);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
app.get('/', (req, res) => {
  res.send('Hola mi server en express');
});
