require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  max: 10, // Número máximo de conexiones en el pool
  idleTimeoutMillis: 30000, // Cierra conexiones inactivas después de 30s
  connectionTimeoutMillis: 5000, // Tiempo máximo para conectar (5s)
});

// Manejo de errores al conectar con la BD
pool.on('error', (err) => {
  console.error('🔴 Error en la conexión con la base de datos:', err.message);
});

// Función para probar la conexión
async function testDBConnection() {
  try {
    const client = await pool.connect();
    console.log('✅ Conectado a la base de datos');
    client.release();
  } catch (err) {
    console.error('🔴 No se pudo conectar a la base de datos:', err.message);
    process.exit(1); // Detener la aplicación si no puede conectarse
  }
}

// Ejecutar prueba de conexión al iniciar la app
testDBConnection();

module.exports = pool;

