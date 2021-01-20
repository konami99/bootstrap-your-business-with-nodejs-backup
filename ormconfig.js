const database = {
  development: "node_dev",
  production: 'node_prd',
  test: 'node_test'
}

const entities = {
  development: [
    "dist/entities/*.js"
  ],
  production: [
    "dist/entities/*.js"
  ],
  test: [
    "src/entities/*.ts"
  ],
}

module.exports = {
  type: "postgres",
  host: process.env.POSTGRES_HOST,
  port: 5432,
  username: process.env.POSTGRES_USERNAME,
  password: process.env.POSTGRES_PASSWORD,
  database: database[process.env.NODE_ENV],
  entities: entities[process.env.NODE_ENV],
  subscribers: [
    "dist/subscribers/*.js"
  ],
  migrations: [
    "dist/migrations/*.js"
  ],
  cli: {
    "entitiesDir": "src/entities",
    "migrationsDir": "src/migrations",
    "subscribersDir": "src/subscribers"
  }
}