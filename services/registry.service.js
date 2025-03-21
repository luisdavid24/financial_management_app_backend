const pool = require('../libs/db.js');
const Validation = require('../schemas/validation.js');

class RegistryService {
  static async create({ user_id, category_id, amount, description, date }) {
    Validation.id(user_id, 'User ID');
    Validation.id(category_id, 'Category ID');
    Validation.number(amount, 'Amount');
    Validation.text(description, 'Description');
    Validation.date(date, 'Date');

    const client = await pool.connect();
    try {
      const result = await client.query(
        `INSERT INTO Registry (user_id, category_id, amount, description, date)
         VALUES ($1, $2, $3, $4, $5) RETURNING *`,
        [user_id, category_id, amount, description, date]
      );
      return result.rows[0];
    } finally {
      client.release();
    }
  }

  static async getAll() {
    const client = await pool.connect();
    try {
      const result = await client.query('SELECT * FROM Registry');
      return result.rows;
    } finally {
      client.release();
    }
  }

  static async getById(id) {
    const client = await pool.connect();
    try {
      const result = await client.query('SELECT * FROM Registry WHERE id = $1', [id]);
      if (result.rowCount === 0) throw new Error('Registry not found');
      return result.rows[0];
    } finally {
      client.release();
    }
  }

  static async update(id, { user_id, category_id, amount, description, date }) {
    Validation.id(user_id, 'User ID');
    Validation.id(category_id, 'Category ID');
    Validation.number(amount, 'Amount');
    Validation.text(description, 'Description');
    Validation.date(date, 'Date');

    const client = await pool.connect();
    try {
      const result = await client.query(
        `UPDATE Registry SET user_id = $1, category_id = $2, amount = $3, description = $4, date = $5
         WHERE id = $6 RETURNING *`,
        [user_id, category_id, amount, description, date, id]
      );
      if (result.rowCount === 0) throw new Error('Registry not found');
      return result.rows[0];
    } finally {
      client.release();
    }
  }

  static async delete(id) {
    const client = await pool.connect();
    try {
      const result = await client.query('DELETE FROM Registry WHERE id = $1 RETURNING *', [id]);
      if (result.rowCount === 0) throw new Error('Registry not found');
      return result.rows[0];
    } finally {
      client.release();
    }
  }
}

module.exports = RegistryService;
