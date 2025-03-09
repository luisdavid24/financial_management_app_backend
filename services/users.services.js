const pool = require('../libs/db.js');
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const Validation = require('../schemas/validation.js');

class UserService {
  static async create({ username, password,name  }) {
    Validation.username(username);
    Validation.name(name);
    Validation.password(password);

    const client = await pool.connect();
    try {
      // Verificar si el usuario o el nombre ya existen
      const userExists = await client.query('SELECT username FROM Users WHERE username = $1 OR name = $2', [username, name]);
      if (userExists.rowCount > 0) throw new Error('username or name already exists');

      // Hashear la contraseña antes de guardarla
      const hashedPassword = await bcrypt.hash(password, 10);

      // Insertar el usuario en la base de datos
      await client.query(
        'INSERT INTO Users (username, name, password) VALUES ($1, $2, $3)',
        [username, name, hashedPassword]
      );

      return { username, name };
    } finally {
      client.release();
    }
  }

  static async login({ username, password }) {
    Validation.username(username);
    Validation.password(password);

    const client = await pool.connect();
    try {
      const result = await client.query('SELECT * FROM Users WHERE username = $1', [username]);
      if (result.rowCount === 0) throw new Error('User not found');

      const user = result.rows[0];
      const isValid = await bcrypt.compare(password, user.password);

      if (!isValid) throw new Error('Password is invalid');

      // Retornar la información sin la contraseña
      const { password: _, ...publicUser } = user;
      return publicUser;
    } finally {
      client.release();
    }
  }
}

module.exports = UserService;
