// Update with your config settings.
require('dotenv').config({ path: './.env' })

let DBConnection = {
      host: process.env.DEV_DB_HOST,
      database: process.env.DEV_DB_NAME,
      user: process.env.DEV_DB_USR,
      port: process.env.DEV_DB_PORT,
      password: process.env.DEV_DB_PWD
    };

module.exports = {
  client: 'pg',
  connection: DBConnection,
  cwd: "../DB/",
  migrations: {
    directory: '../DB/migrations'
  },
  seeds: { directory: '../DB/seeds' }
};
