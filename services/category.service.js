const pool = require('../libs/db.js');

class CategoryService {
  async getAll() {
    const { rows } = await pool.query('SELECT * FROM Category');
    return rows;
  }

  async create(data) {
    const { name, id_budget } = data;
    const { rows } = await pool.query(
      'INSERT INTO Category (name, id_budget) VALUES ($1, $2) RETURNING *',
      [name, id_budget]
    );
    return rows[0];
  }
}

module.exports = CategoryService;
