const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "world",
  password: "4128",
  port: 5432,
});

module.exports = {
  pool,
};
