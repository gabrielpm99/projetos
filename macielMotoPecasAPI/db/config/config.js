module.exports = {
  development: {
    username: "root",
    password: null,
    database: "macielMotoPecas",
    host: "127.0.0.1",
    dialect: "sqlite",
    storage: "./db/macielMotoPecas.sqlite"
  },
  test: {
    username: "root",
    password: null,
    database: "macielMotoPecas",
    host: "127.0.0.1",
    dialect: "sqlite",
    storage: "./db/macielMotoPecas.sqlite"
  },
  production: {
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    host: process.env.DATABASE_HOST,
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  }
}