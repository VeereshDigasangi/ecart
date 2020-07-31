const { Pool } = require("pg")
  , dotenv = require("dotenv");

dotenv.config();
if (process.env.NODE_ENV=="test") {
  process.env.PGHOST = "postgres";
  process.env.PGUSER = "runner";
  process.env.PGDATABASE = "ecart";
}

const pool = new Pool();

module.exports = {
  query: async (text, params) => {
    let res = await pool.query(text, params)
    return res;
  }
};