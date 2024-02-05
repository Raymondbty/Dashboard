const pool = require('../db');

const createUser = async (firstName, lastName, email, password) => {
  try {
    const result = await pool.query(
      'INSERT INTO users (first_name, last_name, email, password) VALUES ($1, $2, $3, $4) RETURNING *',
      [firstName, lastName, email, password]
    );

    return result.rows[0];
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createUser,
};