const { Pool } = require('pg');

const pool = new Pool({
  user: 'amaury',
  host: 'localhost',
  database: 'dashboard',
  password: 'DASHBOARD',
  port: 5432,
});

module.exports = pool