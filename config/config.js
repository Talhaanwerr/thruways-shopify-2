

const configurations = {
  development: {
    username: "root",
    password: null,
    database: "test-shopify",
    host: "127.0.0.1",
    dialect: 'mysql',
  },
  test: {
    username: process.env.TEST_USERNAME,
    password: process.env.TEST_PASSWORD,
    database: process.env.TEST_DATABASE,
    host: process.env.TEST_HOST,
    dialect: 'mysql',
  },
  production: {
    username: "sstime",
    password: "sstime",
    database: "sstime",
    host: "localhost:3306",
    dialect: 'mysql',
  }
};

module.exports = configurations;
