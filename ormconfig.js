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
  host: "localhost",
  port: 5432,
  username: "richard",
  password: "",
  database: database[process.env.NODE_ENV],
  synchronize: true,
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