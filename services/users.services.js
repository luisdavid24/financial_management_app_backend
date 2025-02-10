const pool = require('../libs/db.js');

const getUsers = async () => {
  const result = await pool.query('SELECT * FROM Users');
  return result.rows;
};

const getUserById = async (id) => {
  const result = await pool.query('SELECT * FROM Users WHERE id = $1', [id]);
  return result.rows[0];
};

const createUser = async (name, email, password) => {
  const result = await pool.query(
    'INSERT INTO Users (name, email, password) VALUES ($1, $2, $3) RETURNING *',
    [name, email, password]
  );
  return result.rows[0];
};

const updateUser = async (id, name, email, password) => {
  const result = await pool.query(
    'UPDATE Users SET name = $1, email = $2, password = $3 WHERE id = $4 RETURNING *',
    [name, email, password, id]
  );
  return result.rows[0];
};

const deleteUser = async (id) => {
  await pool.query('DELETE FROM Users WHERE id = $1', [id]);
  return { message: `Usuario con ID ${id} eliminado` };
};

module.exports = { getUsers, getUserById, createUser, updateUser, deleteUser };
