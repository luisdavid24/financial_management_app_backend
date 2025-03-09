module.exports = {
  PORT: process.env.PORT || 3001,
  SALT_ROUNDS: process.env.SALT_ROUNDS || 10,
  SECRET_JWT_KEY: process.env.SECRET_JWT_KEY || 'this-is-an-awesome-secrete'
};

/* require('dotenv').config()

module.exports = {
  PORT: process.env.PORT || 3001,
  SECRET_JWT_KEY: process.env.SECRET_JWT_KEY || 'this-is-an-awesome-secrete',
  DB_CONFIG: {
    user: process.env.DB_USER || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_NAME || 'finance',
    password: process.env.DB_PASSWORD || '12345',
    port: process.env.DB_PORT || 5432
  }
} */
