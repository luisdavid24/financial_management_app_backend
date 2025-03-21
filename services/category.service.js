const pool = require('../libs/db.js');
const Validation = require('../schemas/validation.js');

class CategoryService {
  static async create({ id_Budget, name ,Assets,Liabilities,Equity}) {
    Validation.id(id_Budget);
    Validation.name(name);
    Validation.boolean(Assets);
    Validation.boolean(Liabilities);
    Validation.boolean(Equity);

    const client = await pool.connect();
    try {
      const result = await client.query(
        'INSERT INTO Category (id_Budget, name,Assets,Liabilities,Equity) VALUES ($1, $2,$3,$4,$5) RETURNING *',
        [id_Budget, name,Assets,Liabilities,Equity]
      );
      return result.rows[0];
    } finally {
      client.release();
    }
  }

  static async getAll() {
    const client = await pool.connect();
    try {
      const result = await client.query('SELECT * FROM category');
      return result.rows;
    } finally {
      client.release();
    }
  }

  static async getById(id) {
    const client = await pool.connect();
    try {
      const result = await client.query('SELECT * FROM category WHERE id_Category = $1', [id]);
      if (result.rowCount === 0) throw new Error('Category not found');
      return result.rows[0];
    } finally {
      client.release();
    }
  }

  static async update(id, { name ,Assets,Liabilities,Equity}) {
    Validation.name(name);
    Validation.boolean(Assets);
    Validation.boolean(Liabilities);
    Validation.boolean(Equity);

    const client = await pool.connect();
    try {
      const result = await client.query(
        'UPDATE category SET name = $1,Assets = $2,Liabilities= $3,Equity= $4 WHERE id_Category = $5 RETURNING *',
        [name ,Assets,Liabilities,Equity,id]
      );
      if (result.rowCount === 0) throw new Error('Category not found');
      return result.rows[0];
    } finally {
      client.release();
    }
  }

  static async delete(id) {
    const client = await pool.connect();
    try {
      const result = await client.query('DELETE FROM category WHERE id_Category = $1 RETURNING *', [id]);
      if (result.rowCount === 0) throw new Error('Category not found');
      return result.rows[0];
    } finally {
      client.release();
    }
  }
}

module.exports = CategoryService;
