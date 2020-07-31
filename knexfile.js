require("dotenv").config();
module.exports = {
  development: {
    client    : "postgresql",
    connection: {
      host    : process.env.PGHOST || "127.0.0.1",
      user    : process.env.PGUSER || "postgres",
      database: process.env.PGDATABASE || "casaone",
      password: process.env.PGPASSWORD,
      options : {
        encrypt: true
      }
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migration"
    }
  },
  test: {
    client    : "postgresql",
    connection: {
      host    : process.env.PGHOST || "postgres",
      user    : process.env.PGUSER || "runner",
      password: process.env.PGPASSWORD,
      database: process.env.PGDATABASE || "casaone",
      options : {
        encrypt: true
      }
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migration"
    }
  }
}
