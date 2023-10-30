const { DataSource } = require('typeorm');

const AppDataSource = new DataSource({
  type: 'postgres',
  port: 5432,
  username: 'postgres',
  password: 'pd123',
  database: 'medusa-Cjl1',
  entities: ['dist/models/*.js'],
  migrations: ['dist/migrations/*.js'],
});

module.exports = {
  datasource: AppDataSource,
};
