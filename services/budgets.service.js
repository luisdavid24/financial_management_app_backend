const pool = require('../libs/db');

class BudgetService {
  async getAll() {
    const { rows } = await pool.query('SELECT * FROM Budgets');
    return rows;
  }

  async create(data) {
    const { id_user } = data;
    const { rows } = await pool.query(
      'INSERT INTO Budgets (id_user) VALUES ($1) RETURNING *',
      [id_user]
    );
    return rows[0];
  }
}

module.exports = BudgetService;
