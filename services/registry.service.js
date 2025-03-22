const pool = require('../libs/db.js');
const Validation = require('../schemas/validation.js');

class RegistryService {
  static async create({ id_Category, name, Description,Amount}) {
    Validation.id(id_Category);
    Validation.name(name);
    Validation.description(Description);
    Validation.amount(Amount);
    const client = await pool.connect();
    try {
      const result = await client.query(
        `INSERT INTO Registry (id_Category, name,  Description, Amount)
         VALUES ($1, $2, $3, $4) RETURNING *`,
        [id_Category, name, Description, Amount]
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
      const result = await client.query('SELECT * FROM Registry WHERE id_registry = $1', [id]);
      if (result.rowCount === 0) throw new Error('Registry not found');
      return result.rows[0];
    } finally {
      client.release();
    }
  }

  static async update(id_Registry, { name, Description, Amount }) {
    Validation.id(id_Registry);
    Validation.name(name);
    Validation.description(Description);
    Validation.amount(Amount);
    const client = await pool.connect();
    try {
      const result = await client.query(
        `UPDATE Registry SET name = $1, Description = $2, Amount = $3
         WHERE id_Registry = $4 RETURNING *`,
        [name, Description, Amount,id_Registry]
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
      const result = await client.query('DELETE FROM Registry WHERE id_registry = $1 RETURNING *', [id]);
      if (result.rowCount === 0) throw new Error('Registry not found');
      return result.rows[0];
    } finally {
      client.release();
    }
  }
}

module.exports = RegistryService;
