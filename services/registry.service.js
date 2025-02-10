const pool = require('../libs/db.js');

class RegistryService {
  async getAll() {
    const { rows } = await pool.query('SELECT * FROM Registry');
    return rows;
  }

  async create(data) {
    const { description, id_category } = data;
    const { rows } = await pool.query(
      'INSERT INTO Registry (description, id_category) VALUES ($1, $2) RETURNING *',
      [description, id_category]
    );
    return rows[0];
  }
}

module.exports = RegistryService;
