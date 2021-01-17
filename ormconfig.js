const database = {
  development: "node_dev",
  production: 'node_prd',
  test: 'node_test'
}

module.exports = {
  "type": "postgres",
  "host": "localhost",
  "port": 5432,
  "username": "richard",
  "password": "",
  "database": database[process.env.NODE_ENV],
  "synchronize": true,
  "entities": [
    "dist/entities/*.js"
  ],
  "subscribers": [
    "dist/subscribers/*.js"
  ],
  "migrations": [
    "dist/migrations/*.js"
  ],
  "cli": {
    "entitiesDir": "src/entities",
    "migrationsDir": "src/migrations",
    "subscribersDir": "src/subscribers"
  }
}