const pool = require('../libs/db.js');
const Validation = require('../schemas/validation.js');

class BudgetService {
  static async create({ id_time, name }) {
    Validation.id(id_time);
    Validation.name(name);

    const client = await pool.connect();
    try {
      const result = await client.query(
        'INSERT INTO Budget (id_time, name) VALUES ($1, $2) RETURNING *',
        [id_time, name]
      );
      return result.rows[0];
    } finally {
      client.release();
    }
  }

  static async getAll() {
    const client = await pool.connect();
    try {
      const result = await client.query('SELECT * FROM Budget');
      return result.rows;
    } finally {
      client.release();
    }
  }

  static async getById(id) {
    const client = await pool.connect();
    try {
      const result = await client.query('SELECT * FROM Budget WHERE id = $1', [id]);
      if (result.rowCount === 0) throw new Error('Budget not found');
      return result.rows[0];
    } finally {
      client.release();
    }
  }

  static async update(id, { name }) {
    Validation.name_Budget(name);

    const client = await pool.connect();
    try {
      const result = await client.query(
        'UPDATE Budget SET name = $1 WHERE id = $2 RETURNING *',
        [name, id]
      );
      if (result.rowCount === 0) throw new Error('Budget not found');
      return result.rows[0];
    } finally {
      client.release();
    }
  }

  static async delete(id) {
    const client = await pool.connect();
    try {
      const result = await client.query('DELETE FROM Budget WHERE id = $1 RETURNING *', [id]);
      if (result.rowCount === 0) throw new Error('Budget not found');
      return result.rows[0];
    } finally {
      client.release();
    }
  }
}

module.exports = BudgetService;
