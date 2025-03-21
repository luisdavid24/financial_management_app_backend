const pool = require('../libs/db.js');

class TimeService {
  static async create({ month, year, id_user }) {
    const client = await pool.connect();
    try {
      const result = await client.query(
        'INSERT INTO Time (month, year, id_user) VALUES ($1, $2, $3) RETURNING *',
        [month, year, id_user]
      );
      return result.rows[0];
    } finally {
      client.release();
    }
  }

  static async getAll() {
    const client = await pool.connect();
    try {
      const result = await client.query('SELECT * FROM Time');
      return result.rows;
    } finally {
      client.release();
    }
  }

  static async getById(id) {
    const client = await pool.connect();
    try {
      const result = await client.query('SELECT * FROM Time WHERE id = $1', [id]);
      if (result.rowCount === 0) throw new Error('Time entry not found');
      return result.rows[0];
    } finally {
      client.release();
    }
  }

  static async update(id, { year, month }) {
    const client = await pool.connect();
    try {
      const result = await client.query(
        'UPDATE Time SET year = $1, month = $2 WHERE id = $3 RETURNING *',
        [year, month, id]
      );
      if (result.rowCount === 0) throw new Error('Time entry not found');
      return result.rows[0];
    } finally {
      client.release();
    }
  }

  static async delete(id) {
    const client = await pool.connect();
    try {
      const result = await client.query('DELETE FROM Time WHERE id = $1 RETURNING *', [id]);
      if (result.rowCount === 0) throw new Error('Time entry not found');
      return result.rows[0];
    } finally {
      client.release();
    }
  }
}

module.exports = TimeService;
