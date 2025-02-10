const express = require('express');
const routerApi = require('./routes/index.js');

const app = express();
const PORT = 3000;

routerApi(app);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
app.get('/', (req, res) => {
  res.send('Hola mi server en express');
});
